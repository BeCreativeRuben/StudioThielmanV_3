import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createHash, timingSafeEqual } from 'crypto'
import { jwtSecret } from '../_utils/auth.js'
import { applyCors, clientIp, rateLimit } from '../_utils/http.js'

function safeEqual(a: string, b: string): boolean {
  const ah = createHash('sha256').update(a).digest()
  const bh = createHash('sha256').update(b).digest()
  return timingSafeEqual(ah, bh)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secret = jwtSecret()
  if (!secret) {
    console.error('JWT_SECRET is missing or still the insecure fallback')
    return res.status(500).json({ error: 'Authentication is not configured' })
  }

  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  if (!username || (!password && !passwordHash)) {
    console.error('Admin login refused: set ADMIN_USERNAME and ADMIN_PASSWORD or ADMIN_PASSWORD_HASH')
    return res.status(503).json({ error: 'Admin login is not configured' })
  }

  const ip = clientIp(req)
  if (!rateLimit(`admin-login:${ip}`, 8, 15 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many attempts. Try again later.' })
  }

  await new Promise((resolve) => setTimeout(resolve, 300))

  const bodyUser = typeof req.body?.username === 'string' ? req.body.username : ''
  const bodyPass = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!bodyUser || !bodyPass) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const userOk = safeEqual(bodyUser, username)
  let passOk = false
  try {
    if (passwordHash) {
      passOk = await bcrypt.compare(bodyPass, passwordHash)
    } else if (password) {
      passOk = safeEqual(bodyPass, password)
    }
  } catch (error) {
    console.error('Password verification error:', error)
    return res.status(500).json({ error: 'Password verification failed' })
  }

  if (!userOk || !passOk) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  try {
    const token = jwt.sign({ userId: 1, username }, secret, { expiresIn: '7d' })
    return res.json({ success: true, token, username })
  } catch (error) {
    console.error('Token generation error:', error)
    return res.status(500).json({ error: 'Token generation failed' })
  }
}
