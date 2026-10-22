import jwt from 'jsonwebtoken'
import type { VercelResponse } from '@vercel/node'

const INSECURE_SECRET = 'change-this-secret'

export interface AuthUser {
  userId: number
  username: string
}

export function jwtSecret(): string | null {
  const secret = process.env.JWT_SECRET
  if (!secret || secret === INSECURE_SECRET) return null
  return secret
}

export function verifyToken(token: string): AuthUser | null {
  const secret = jwtSecret()
  if (!secret) return null
  try {
    const decoded = jwt.verify(token, secret) as { userId?: unknown; username?: unknown }
    if (typeof decoded.userId !== 'number' || typeof decoded.username !== 'string') return null
    return {
      userId: decoded.userId,
      username: decoded.username,
    }
  } catch {
    return null
  }
}

export function requireAuth(authHeader: string | undefined, res: VercelResponse): AuthUser | null {
  if (!jwtSecret()) {
    res.status(500).json({ error: 'Authentication is not configured' })
    return null
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return null
  }

  const token = authHeader.substring(7)
  const user = verifyToken(token)

  if (!user) {
    res.status(401).json({ error: 'Invalid token' })
    return null
  }

  return user
}
