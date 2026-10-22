import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function jwtSecret(): string | null {
  const secret = process.env.JWT_SECRET
  if (!secret || secret === 'change-this-secret') return null
  return secret
}

export interface AuthRequest extends Request {
  userId?: number
  username?: string
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  const secret = jwtSecret()
  if (!secret) {
    res.status(500).json({ error: 'Authentication is not configured' })
    return
  }

  if (!token) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  jwt.verify(token, secret, (err, decoded: any) => {
    if (err) {
      res.status(403).json({ error: 'Invalid or expired token' })
      return
    }
    
    req.userId = decoded.userId
    req.username = decoded.username
    next()
  })
}

export function generateToken(userId: number, username: string): string {
  const secret = jwtSecret()
  if (!secret) {
    throw new Error('JWT_SECRET is not configured')
  }
  return jwt.sign(
    { userId, username },
    secret,
    { expiresIn: '7d' }
  )
}
