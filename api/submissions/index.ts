import type { VercelRequest, VercelResponse } from '@vercel/node'
import { initializeDatabase, dbRun, dbGet, dbAll } from '../../server/database/postgres.js'
import { sendSubmissionNotification } from '../../server/services/emailService.js'
import { upsertMailchimpMember } from '../../server/services/mailchimpService.js'
import { requireAuth } from '../_utils/auth.js'

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

function sanitizeMailchimpText(input: string): string {
  return (input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^A-Za-z0-9 ]+/g, ' ') // replace everything else with spaces
    .replace(/\s+/g, ' ')
    .trim()
}

function sanitizeMailchimpPhone(input: string): string {
  return (input || '').replace(/\D+/g, '').trim()
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
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

  // Wrap everything in try-catch to ensure JSON responses
  try {
    try {
      await ensureDb()
    } catch (dbError: any) {
      console.error('Database initialization error:', dbError)
      console.error('Error message:', dbError.message)
      console.error('Error stack:', dbError.stack)
      return res.status(500).json({ 
        error: 'Database initialization failed',
        message: dbError.message || 'Unknown database error',
        details: process.env.NODE_ENV === 'development' ? dbError.stack : undefined
      })
    }

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

        // Upsert into Mailchimp first so the frontend can trust success == Mailchimp accepted it
        const nameParts = String(name).trim().split(/\s+/)
        const firstName = sanitizeMailchimpText(nameParts[0] || '')
        const lastName = sanitizeMailchimpText(nameParts.slice(1).join(' ') || '')

        const safeBusinessName = sanitizeMailchimpText(String(businessName))
        const safePhone = sanitizeMailchimpPhone(String(phone))
        const safeBusinessDescription = sanitizeMailchimpText(String(businessDescription))
        const safePackage = sanitizeMailchimpText(String(packageName))
        const safePackageOther = packageOther ? sanitizeMailchimpText(String(packageOther)) : ''
        const safeHasExistingWebsite = hasExistingWebsite ? sanitizeMailchimpText(String(hasExistingWebsite)) : ''

        const rawExistingWebsiteUrl = String(existingWebsiteUrl || '').trim()
        const safeExistingWebsiteUrl = rawExistingWebsiteUrl && isValidHttpUrl(rawExistingWebsiteUrl)
          ? rawExistingWebsiteUrl
          : ''

        await upsertMailchimpMember({
          email,
          statusIfNew: 'subscribed',
          mergeFields: {
            FNAME: firstName,
            LNAME: lastName,
            MMERGE1: safeBusinessName,
            MMERGE2: safePhone,
            MMERGE3: safeBusinessDescription,
            MMERGE4: safePackage,
            ...(safePackageOther ? { MMERGE5: safePackageOther } : {}),
            ...(safeHasExistingWebsite ? { MMERGE6: safeHasExistingWebsite } : {}),
            ...(safeExistingWebsiteUrl ? { MMERGE7: safeExistingWebsiteUrl } : {}),
          },
          tags: ['Contact Form', 'Lead'],
        })

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
          mailchimpAccepted: true,
          message: 'Submission received successfully'
        })
      } catch (error: any) {
        console.error('Submission error:', error)
        return res.status(500).json({ 
          error: 'Failed to process submission',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
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
    return res.status(500).json({ 
      error: 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
