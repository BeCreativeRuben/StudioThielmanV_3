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
          'INSERT INTO admin_users (username, passwordHash) VALUES (?, ?)',
          ['admin', defaultHash]
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
  await ensureDb()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    // Get admin user
    const admin = await dbGet<{ id: number; username: string; passwordHash: string }>(
      'SELECT id, username, passwordHash FROM admin_users WHERE username = ?',
      [username]
    )

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, admin.passwordHash)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(admin.id, admin.username)

    return res.json({
      success: true,
      token,
      username: admin.username
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Failed to process login' })
  }
}
