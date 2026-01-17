import type { VercelRequest, VercelResponse } from '@vercel/node'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { initializeDatabase, dbGet, dbRun } from '../../../server/database/db.js'

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

function generateToken(userId: number, username: string): string {
  return jwt.sign(
    { userId, username },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

let dbInitialized = false
let dbInitPromise: Promise<void> | null = null

async function ensureDb() {
  if (dbInitialized) {
    return
  }
  
  if (dbInitPromise) {
    await dbInitPromise
    return
  }
  
  dbInitPromise = (async () => {
    try {
      const dbPath = process.env.DATABASE_PATH || '/tmp/submissions.db'
      process.env.DATABASE_PATH = dbPath
      console.log('Initializing database at:', dbPath)
      await initializeDatabase()
      
      // Initialize admin user if needed
      const admin = await dbGet('SELECT * FROM admin_users WHERE username = ?', ['admin'])
      if (!admin) {
        const defaultHash = await bcrypt.hash('admin123', 10)
        await dbRun(
          'INSERT INTO admin_users (username, passwordHash, email) VALUES (?, ?, ?)',
          ['admin', defaultHash, 'admin@studiothielman.com']
        )
      }
      
      dbInitialized = true
      console.log('Database initialized successfully')
    } catch (error: any) {
      console.error('Database initialization failed:', error)
      dbInitialized = false
      dbInitPromise = null
      throw error
    }
  })()
  
  await dbInitPromise
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Wrap everything in try-catch to ensure JSON responses
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
      await ensureDb()
    } catch (dbError: any) {
      console.error('Database initialization error:', dbError)
      console.error('Error stack:', dbError.stack)
      return res.status(500).json({ 
        error: 'Database initialization failed',
        message: dbError.message || 'Unknown database error'
      })
    }

    try {
      const { username, password } = req.body

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' })
      }

      // Get admin user with error handling
      let admin: { id: number; username: string; passwordHash: string } | undefined
      try {
        admin = await dbGet<{ id: number; username: string; passwordHash: string }>(
          'SELECT id, username, passwordHash FROM admin_users WHERE username = ?',
          [username]
        )
      } catch (dbQueryError: any) {
        console.error('Database query error:', dbQueryError)
        return res.status(500).json({ 
          error: 'Database query failed',
          message: dbQueryError.message || 'Unknown database query error'
        })
      }

      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Verify password
      let isValid = false
      try {
        isValid = await bcrypt.compare(password, admin.passwordHash)
      } catch (bcryptError: any) {
        console.error('Password comparison error:', bcryptError)
        return res.status(500).json({ error: 'Password verification failed' })
      }

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Generate token
      let token: string
      try {
        token = generateToken(admin.id, admin.username)
      } catch (tokenError: any) {
        console.error('Token generation error:', tokenError)
        return res.status(500).json({ error: 'Token generation failed' })
      }

      return res.json({
        success: true,
        token,
        username: admin.username
      })
    } catch (error: any) {
      console.error('Login processing error:', error)
      console.error('Error stack:', error.stack)
      return res.status(500).json({ 
        error: 'Failed to process login',
        message: error.message || 'Unknown error'
      })
    }
  } catch (error: any) {
    // Catch any unexpected errors and return JSON
    console.error('Unexpected error in login handler:', error)
    console.error('Error stack:', error.stack)
    return res.status(500).json({ 
      error: 'An unexpected error occurred',
      message: error.message || 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
