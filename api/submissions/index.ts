import type { VercelRequest, VercelResponse } from '@vercel/node'
import { initializeDatabase, dbRun, dbAll } from '../../server/database/postgres.js'
import { sendAiTalksInquiryEmails, sendGroupWorkshopSignupEmails, sendSubmissionNotification } from '../../server/services/emailService.js'
import { INTEREST_LIST_SOURCES, parseGroupWorkshopSignup } from '../../server/services/groupWorkshopEmailTemplates.js'
import { parseAiTalkInquiry } from '../../server/services/aiTalksEmailTemplates.js'
import { requireAuth } from '../_utils/auth.js'
import { applyCors, clientIp, isHoneypotFilled, rateLimit } from '../_utils/http.js'

// Initialize database (PostgreSQL - idempotent, safe to call multiple times)
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

  // Wrap everything in try-catch to ensure JSON responses
  try {
    try {
      await ensureDb()
    } catch (dbError: any) {
      console.error('Database initialization error:', dbError)
      console.error('Error message:', dbError.message)
      console.error('Error stack:', dbError.stack)
      return res.status(500).json({ error: 'Database initialization failed' })
    }

    if (req.method === 'POST') {
      try {
        const ip = clientIp(req)
        if (!rateLimit(`submissions:${ip}`, 10, 10 * 60 * 1000)) {
          return res.status(429).json({ error: 'Too many requests. Try again later.' })
        }

        const {
          businessName,
          name,
          email,
          phone,
          businessDescription,
          package: packageName,
          packageOther,
          hasExistingWebsite,
          existingWebsiteUrl,
          source,
          aiTalk,
          waitlist,
          website: honeypot,
          locale,
        } = req.body
        const waitlistKind = typeof source === 'string' ? INTEREST_LIST_SOURCES[source] : undefined
        const isWaitlist = Boolean(waitlistKind)
        const pageLocale = locale === 'nl' ? 'nl' : 'en'

        if (isHoneypotFilled(honeypot)) {
          return res.status(201).json({ success: true })
        }

        const tooLong =
          (typeof businessName === 'string' && businessName.length > 200) ||
          (typeof name === 'string' && name.length > 200) ||
          (typeof email === 'string' && email.length > 254) ||
          (typeof phone === 'string' && phone.length > 40) ||
          (typeof packageOther === 'string' && packageOther.length > 2000) ||
          (typeof existingWebsiteUrl === 'string' && existingWebsiteUrl.length > 500)
        if (tooLong) {
          return res.status(400).json({ error: 'A field is too long' })
        }

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

        if (isWaitlist) {
          // Already on the list: don't store or mail twice.
          const existing = await dbAll(`SELECT id FROM submissions WHERE package = ? AND lower(email) = lower(?) LIMIT 1`, [
            source,
            String(email).trim(),
          ])
          if (existing.length) {
            return res.status(200).json({ success: true, id: existing[0].id, duplicate: true })
          }
        }

        // Insert submission first (database is more reliable)
        let submissionId: number | undefined
        try {
          const result = await dbRun(
            `INSERT INTO submissions 
             (businessName, name, email, phone, businessDescription, package, packageOther, hasExistingWebsite, existingWebsiteUrl)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              businessName,
              name,
              email,
              phone,
              businessDescription,
              packageName,
              packageOther || null,
              hasExistingWebsite || null,
              existingWebsiteUrl || null,
            ]
          )
          submissionId = result.lastID
        } catch (dbError: any) {
          console.error('Database insert error:', dbError)
          return res.status(500).json({ error: 'Failed to save submission' })
        }

        // Await email so Vercel does not terminate the function before Resend finishes
        let emailDelivery: Awaited<ReturnType<typeof sendSubmissionNotification>> | undefined
        try {
          const aiTalkInquiry = source === 'ai-talks' ? parseAiTalkInquiry(aiTalk, { name, email, phone }) : null
          emailDelivery = isWaitlist
            ? await sendGroupWorkshopSignupEmails(parseGroupWorkshopSignup(waitlist, String(email).trim(), waitlistKind))
            : aiTalkInquiry ? await sendAiTalksInquiryEmails(aiTalkInquiry) : await sendSubmissionNotification({
            businessName,
            name,
            email,
            phone,
            businessDescription,
            package: packageName,
            packageOther,
            hasExistingWebsite,
            existingWebsiteUrl,
            locale: pageLocale,
          })
        } catch (err) {
          console.error('Email notification error:', err)
          emailDelivery = {
            configured: false,
            notification: 'failed',
            autoReply: 'failed',
            error: err instanceof Error ? err.message : 'Email send failed',
          }
        }

        const publicEmail = emailDelivery
          ? { configured: emailDelivery.configured, notification: emailDelivery.notification, autoReply: emailDelivery.autoReply }
          : undefined
        return res.status(201).json({
          success: true,
          id: submissionId,
          message: 'Submission received successfully',
          ...(publicEmail && { email: publicEmail }),
        })
      } catch (error: any) {
        console.error('Submission error:', error)
        console.error('Error stack:', error.stack)
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
  } catch (error: any) {
    // Catch any unexpected errors and return JSON
    console.error('Unexpected error in submissions handler:', error)
    return res.status(500).json({ error: 'An unexpected error occurred' })
  }
}
