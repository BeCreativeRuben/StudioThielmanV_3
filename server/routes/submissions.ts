import express from 'express'
import rateLimit from 'express-rate-limit'
import { dbRun, dbGet, dbAll } from '../database/db.js'
import { sendSubmissionNotification } from '../services/emailService.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Rate limiting for form submissions
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many submission attempts, please try again later.'
})

// POST /api/submissions - Submit contact form
router.post('/', submissionLimiter, async (req, res) => {
  try {
    const {
      businessName,
      name,
      email,
      phone,
      businessDescription,
      package: packageName,
      packageOther,
      hasExistingWebsite,
      existingWebsiteUrl
    } = req.body

    // Validation
    if (!businessName || !name || !email || !phone || !businessDescription || !packageName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Business description length validation
    if (businessDescription.length > 100) {
      return res.status(400).json({ error: 'Business description must be 100 characters or less' })
    }

    // Insert submission
    const result = await dbRun(
      `INSERT INTO submissions 
       (businessName, name, email, phone, businessDescription, package, packageOther, hasExistingWebsite, existingWebsiteUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [businessName, name, email, phone, businessDescription, packageName, packageOther || null, hasExistingWebsite || null, existingWebsiteUrl || null]
    )

    const submissionId = result.lastID

    // Send email notification (non-blocking)
    sendSubmissionNotification({
      businessName,
      name,
      email,
      phone,
      businessDescription,
      package: packageName,
      packageOther,
      hasExistingWebsite,
      existingWebsiteUrl
    }).catch(err => {
      console.error('Email notification error:', err)
    })

    res.status(201).json({
      success: true,
      id: submissionId,
      message: 'Submission received successfully'
    })
  } catch (error: any) {
    console.error('Submission error:', error)
    res.status(500).json({ error: 'Failed to process submission' })
  }
})

// GET /api/submissions - Get all submissions (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, limit = 100, offset = 0 } = req.query

    let query = 'SELECT * FROM submissions'
    const params: any[] = []

    if (status) {
      query += ' WHERE status = ?'
      params.push(status)
    }

    query += ' ORDER BY submittedAt DESC LIMIT ? OFFSET ?'
    params.push(parseInt(limit as string), parseInt(offset as string))

    const submissions = await dbAll(query, params)

    res.json(submissions)
  } catch (error: any) {
    console.error('Get submissions error:', error)
    res.status(500).json({ error: 'Failed to fetch submissions' })
  }
})

// GET /api/submissions/:id - Get single submission (admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const submission = await dbGet('SELECT * FROM submissions WHERE id = ?', [id])

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    res.json(submission)
  } catch (error: any) {
    console.error('Get submission error:', error)
    res.status(500).json({ error: 'Failed to fetch submission' })
  }
})

// PATCH /api/submissions/:id - Update submission (admin only)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
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

    res.json(updated)
  } catch (error: any) {
    console.error('Update submission error:', error)
    res.status(500).json({ error: 'Failed to update submission' })
  }
})

export default router
