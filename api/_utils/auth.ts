import jwt from 'jsonwebtoken'
import type { VercelResponse } from '@vercel/node'

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

export interface AuthUser {
  userId: number
  username: string
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      userId: decoded.userId,
      username: decoded.username
    }
  } catch (error) {
    return null
  }
}

export function requireAuth(authHeader: string | undefined, res: VercelResponse): AuthUser | null {
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
