import express from 'express'
import rateLimit from 'express-rate-limit'
import { dbRun, dbGet, dbAll } from '../database/db.js'
import { authenticateToken } from '../middleware/auth.js'
import { sendChatMessageNotification } from '../services/emailService.js'
import { randomUUID } from 'crypto'

const router = express.Router()

// Rate limiting for chat messages
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 messages per minute
  message: 'Too many messages, please slow down.'
})

// POST /api/chat/messages - Send chatbot message
router.post('/messages', chatLimiter, async (req, res) => {
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

    res.status(201).json({
      success: true,
      id: result.lastID,
      sessionId: finalSessionId,
      message: 'Message saved successfully'
    })
  } catch (error: any) {
    console.error('Chat message error:', error)
    res.status(500).json({ error: 'Failed to save message' })
  }
})

// GET /api/chat/messages - Get all messages (admin only)
router.get('/messages', authenticateToken, async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query

    const messages = await dbAll(
      'SELECT * FROM chat_messages ORDER BY sentAt DESC LIMIT ? OFFSET ?',
      [parseInt(limit as string), parseInt(offset as string)]
    )

    res.json(messages)
  } catch (error: any) {
    console.error('Get chat messages error:', error)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

// GET /api/chat/sessions/:sessionId - Get messages for a session
router.get('/sessions/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params

    const messages = await dbAll(
      'SELECT * FROM chat_messages WHERE sessionId = ? ORDER BY sentAt ASC',
      [sessionId]
    )

    res.json(messages)
  } catch (error: any) {
    console.error('Get session messages error:', error)
    res.status(500).json({ error: 'Failed to fetch session messages' })
  }
})

export default router
