import type { VercelRequest, VercelResponse } from '@vercel/node'
import { initializeDatabase, dbGet, dbAll } from '../../../server/database/db.js'
import { requireAuth } from '../_utils/auth.js'

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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check authentication
  const user = requireAuth(req.headers.authorization, res)
  if (!user) return // Response already sent

  try {
    const [totalSubmissions, pendingSubmissions, totalMessages] = await Promise.all([
      dbGet<{ count: number }>('SELECT COUNT(*) as count FROM submissions'),
      dbGet<{ count: number }>("SELECT COUNT(*) as count FROM submissions WHERE status = 'pending'"),
      dbGet<{ count: number }>('SELECT COUNT(*) as count FROM chat_messages')
    ])

    return res.json({
      submissions: {
        total: totalSubmissions?.count || 0,
        pending: pendingSubmissions?.count || 0
      },
      messages: {
        total: totalMessages?.count || 0
      }
    })
  } catch (error: any) {
    console.error('Stats error:', error)
    return res.status(500).json({ error: 'Failed to fetch stats' })
  }
}
