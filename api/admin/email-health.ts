import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  getResendConfigStatus,
  isResendConfigured,
  sendSubmissionNotification,
} from '../../server/services/emailService.js'
import { requireAuth } from '../_utils/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const user = requireAuth(req.headers.authorization, res)
  if (!user) return

  if (req.method === 'GET') {
    return res.json({
      resend: getResendConfigStatus(),
      hint: isResendConfigured()
        ? 'POST to this endpoint (admin auth) to send a test notification email.'
        : 'Set RESEND_API_KEY, RESEND_FROM, and RESEND_NOTIFY_EMAIL in Vercel, then redeploy.',
    })
  }

  if (req.method === 'POST') {
    if (!isResendConfigured()) {
      return res.status(503).json({
        error: 'Resend not configured',
        resend: getResendConfigStatus(),
      })
    }

    const notifyEmail = process.env.RESEND_NOTIFY_EMAIL!

    try {
      const delivery = await sendSubmissionNotification({
        businessName: 'Resend Health Check',
        name: 'Admin Test',
        email: notifyEmail,
        phone: '0000000000',
        businessDescription: 'Test submission from /api/admin/email-health',
        package: 'Starter',
        hasExistingWebsite: 'no',
      })

      return res.json({
        ok: delivery.notification === 'sent',
        delivery,
        resend: getResendConfigStatus(),
      })
    } catch (error: any) {
      return res.status(500).json({
        error: 'Test email failed',
        message: error?.message || 'Unknown error',
        resend: getResendConfigStatus(),
      })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
