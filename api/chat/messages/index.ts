import type { VercelRequest, VercelResponse } from '@vercel/node'
import { initializeDatabase, dbRun, dbAll } from '../../../server/database/db.js'
import { requireAuth } from '../../_utils/auth.js'
import { sendChatMessageNotification } from '../../../server/services/emailService.js'
import { randomUUID } from 'crypto'

let dbInitialized = false
async function ensureDb() {
  if (!dbInitialized) {
    process.env.DATABASE_PATH = process.env.DATABASE_PATH || '/tmp/submissions.db'
    await initializeDatabase()
    dbInitialized = true
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    await ensureDb()
  } catch (dbError: any) {
    console.error('Database initialization error:', dbError)
    return res.status(500).json({ error: 'Database initialization failed' })
  }

  if (req.method === 'POST') {
    try {
      const { sessionId, userName, userEmail, message } = req.body

      if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' })
      }

      // Generate sessionId if not provided
      const finalSessionId = sessionId || randomUUID()

      // Insert message
      const result = await dbRun(
        `INSERT INTO chat_messages (sessionId, userName, userEmail, message)
         VALUES (?, ?, ?, ?)`,
        [finalSessionId, userName || null, userEmail || null, message.trim()]
      )

      // Send email notification (non-blocking)
      if (userEmail) {
        sendChatMessageNotification({
          userName: userName || undefined,
          userEmail,
          message: message.trim()
        }).catch(err => {
          console.error('Email notification error:', err)
        })
      }

      return res.status(201).json({
        success: true,
        id: result.lastID,
        sessionId: finalSessionId,
        message: 'Message saved successfully'
      })
    } catch (error: any) {
      console.error('Chat message error:', error)
      return res.status(500).json({ error: 'Failed to save message' })
    }
  }

  if (req.method === 'GET') {
    try {
      // Check authentication
      const user = requireAuth(req.headers.authorization, res)
      if (!user) return // Response already sent

      const { limit = 100, offset = 0 } = req.query

      const messages = await dbAll(
        'SELECT * FROM chat_messages ORDER BY sentAt DESC LIMIT ? OFFSET ?',
        [parseInt(limit as string), parseInt(offset as string)]
      )

      return res.json(messages)
    } catch (error: any) {
      console.error('Get chat messages error:', error)
      return res.status(500).json({ error: 'Failed to fetch messages' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
