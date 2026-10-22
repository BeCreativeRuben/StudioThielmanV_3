import type { VercelRequest, VercelResponse } from '@vercel/node'
import { initializeDatabase, dbRun, dbAll } from '../../../server/database/postgres.js'
import { requireAuth } from '../../_utils/auth.js'
import { sendChatMessageNotification } from '../../../server/services/emailService.js'
import { randomUUID } from 'crypto'
import { applyCors, clientIp, isHoneypotFilled, rateLimit } from '../../_utils/http.js'

let dbInitPromise: Promise<void> | null = null

async function ensureDb() {
  if (dbInitPromise) {
    return dbInitPromise
  }
  
  dbInitPromise = initializeDatabase().catch((error: any) => {
    console.error('Database initialization failed:', error)
    dbInitPromise = null
    throw error
  })
  
  return dbInitPromise
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res)

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
      if (!rateLimit(`chat:${clientIp(req)}`, 10, 10 * 60 * 1000)) {
        return res.status(429).json({ error: 'Too many requests. Try again later.' })
      }

      const { sessionId, userName, userEmail, message, locale, website } = req.body

      if (isHoneypotFilled(website)) {
        return res.status(201).json({ success: true, sessionId: sessionId || randomUUID() })
      }

      if (typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' })
      }
      if (message.length > 4000 || (typeof userName === 'string' && userName.length > 200) || (typeof userEmail === 'string' && userEmail.length > 254)) {
        return res.status(400).json({ error: 'A field is too long' })
      }

      // Generate sessionId if not provided
      const finalSessionId = sessionId || randomUUID()

      // Insert message
      const result = await dbRun(
        `INSERT INTO chat_messages (sessionId, userName, userEmail, message)
         VALUES (?, ?, ?, ?)`,
        [finalSessionId, userName || null, userEmail || null, message.trim()]
      )

      let emailDelivery: Awaited<ReturnType<typeof sendChatMessageNotification>> | undefined
      const trimmedEmail = typeof userEmail === 'string' ? userEmail.trim() : ''
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
      try {
        emailDelivery = await sendChatMessageNotification({
          userName: typeof userName === 'string' ? userName : undefined,
          userEmail: emailOk ? trimmedEmail : undefined,
          message: message.trim(),
          locale: locale === 'nl' ? 'nl' : 'en',
        })
      } catch (err) {
        console.error('Email notification error:', err)
        emailDelivery = {
          configured: false,
          notification: 'failed',
          autoReply: 'failed',
        }
      }

      const publicEmail = emailDelivery
        ? { configured: emailDelivery.configured, notification: emailDelivery.notification, autoReply: emailDelivery.autoReply }
        : undefined
      return res.status(201).json({
        success: true,
        id: result.lastID,
        sessionId: finalSessionId,
        message: 'Message saved successfully',
        ...(publicEmail && { email: publicEmail }),
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
