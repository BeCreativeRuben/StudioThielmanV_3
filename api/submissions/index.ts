import type { VercelRequest, VercelResponse } from '@vercel/node'
import { initializeDatabase, dbRun, dbGet, dbAll } from '../../server/database/db.js'
import { sendSubmissionNotification } from '../../server/services/emailService.js'
import { requireAuth } from '../_utils/auth.js'

// Initialize database on first import (will be reused across invocations)
let dbInitialized = false
async function ensureDb() {
  if (!dbInitialized) {
    // Use /tmp for Vercel serverless (temporary storage)
    process.env.DATABASE_PATH = process.env.DATABASE_PATH || '/tmp/submissions.db'
    await initializeDatabase()
    dbInitialized = true
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureDb()

  if (req.method === 'POST') {
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

      return res.status(201).json({
        success: true,
        id: submissionId,
        message: 'Submission received successfully'
      })
    } catch (error: any) {
      console.error('Submission error:', error)
      return res.status(500).json({ error: 'Failed to process submission' })
    }
  }

  if (req.method === 'GET') {
    try {
      // Check authentication
      const user = requireAuth(req.headers.authorization, res)
      if (!user) return // Response already sent

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

      return res.json(submissions)
    } catch (error: any) {
      console.error('Get submissions error:', error)
      return res.status(500).json({ error: 'Failed to fetch submissions' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
