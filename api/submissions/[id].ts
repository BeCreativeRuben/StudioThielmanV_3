import type { VercelRequest, VercelResponse } from '@vercel/node'
import { initializeDatabase, dbGet, dbRun } from '../../../server/database/db.js'
import { requireAuth } from '../../_utils/auth.js'

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

  const { id } = req.query

  // Check authentication
  const user = requireAuth(req.headers.authorization, res)
  if (!user) return // Response already sent

  if (req.method === 'GET') {
    try {
      const submission = await dbGet('SELECT * FROM submissions WHERE id = ?', [id])

      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' })
      }

      return res.json(submission)
    } catch (error: any) {
      console.error('Get submission error:', error)
      return res.status(500).json({ error: 'Failed to fetch submission' })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { status, notes, internalNotes } = req.body

      const updates: string[] = []
      const params: any[] = []

      if (status) {
        updates.push('status = ?')
        params.push(status)
      }

      if (notes !== undefined) {
        updates.push('notes = ?')
        params.push(notes)
      }

      if (internalNotes !== undefined) {
        updates.push('internalNotes = ?')
        params.push(internalNotes)
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' })
      }

      params.push(id)

      await dbRun(
        `UPDATE submissions SET ${updates.join(', ')} WHERE id = ?`,
        params
      )

      const updated = await dbGet('SELECT * FROM submissions WHERE id = ?', [id])

      return res.json(updated)
    } catch (error: any) {
      console.error('Update submission error:', error)
      return res.status(500).json({ error: 'Failed to update submission' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
