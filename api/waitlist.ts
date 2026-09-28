import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import {
  emailButton,
  emailCallout,
  emailFieldTable,
  emailParagraph,
  escapeHtml,
  wrapEmailLayout,
  EMAIL_BRAND,
} from '../server/services/emailBrand.js'

/**
 * Workshop group-class ("Groepsles") waitlist.
 *
 * POST /api/waitlist
 *  1. Adds the subscriber as a contact to the Resend segment "Workshop groepsles wachtlijst"
 *  2. Sends a notification to info@studiothielman.com
 *  3. Sends a short confirmation email to the subscriber (from RESEND_FROM, verified studiothielman.com domain)
 *
 * Env: RESEND_API_KEY, RESEND_FROM (both already used by the contact form).
 * Optional overrides: RESEND_WAITLIST_SEGMENT_ID, WAITLIST_NOTIFY_EMAIL.
 */

// Resend segment "Workshop groepsles wachtlijst" (not a secret; created 28 Sep 2026)
const DEFAULT_SEGMENT_ID = '68c7305c-3a06-4a51-80da-613926d45d92'
const DEFAULT_NOTIFY_EMAIL = 'info@studiothielman.com'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_FILL_TIME_MS = 1500

type Lang = 'nl' | 'en'
type StepStatus = 'sent' | 'added' | 'existing' | 'skipped' | 'failed'

function str(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max)
}

function splitName(full: string): { firstName: string; lastName?: string } {
  const parts = full.split(/\s+/).filter(Boolean)
  if (parts.length <= 1) return { firstName: full }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function formatNow(): string {
  return new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Brussels',
  })
}

function confirmationTemplate(lang: Lang, name: string) {
  const firstName = splitName(name).firstName
  const workshopsUrl = `${EMAIL_BRAND.siteUrl}${lang === 'nl' ? '/nl' : ''}/workshops`

  if (lang === 'nl') {
    const subject = 'Je staat op de wachtlijst — Groepsles AI-workshop'
    const bodyHtml = [
      emailParagraph(`<strong>Hoi ${escapeHtml(firstName)},</strong>`, { marginBottom: '16px' }),
      emailParagraph(
        'Bedankt voor je interesse in de groepsles. Je staat op de wachtlijst.'
      ),
      emailCallout(
        'Wat nu?',
        'Zodra er genoeg interesse is, plannen we een datum. Je hoort het dan als eerste via mail. Geen interesse meer? Antwoord gewoon op deze mail.'
      ),
      emailButton('Bekijk de workshops', workshopsUrl),
      emailParagraph(
        '<strong>Ruben Thielman</strong><br><span style="color:#666666;font-size:14px;">Studio Thielman</span>',
        { marginBottom: '0' }
      ),
    ].join('')
    const text = `Hoi ${firstName},

Bedankt voor je interesse in de groepsles. Je staat op de wachtlijst.

Zodra er genoeg interesse is, plannen we een datum. Je hoort het dan als eerste via mail. Geen interesse meer? Antwoord gewoon op deze mail.

Bekijk de workshops: ${workshopsUrl}

Ruben Thielman
Studio Thielman
`
    return {
      subject,
      text,
      html: wrapEmailLayout({
        title: subject,
        preheader: 'Je staat op de wachtlijst voor de groepsles.',
        badge: 'Wachtlijst',
        heading: 'Je staat op de wachtlijst',
        subheading: 'Groepsles AI-workshop',
        bodyHtml,
      }),
    }
  }

  const subject = "You're on the waitlist — AI workshop group class"
  const bodyHtml = [
    emailParagraph(`<strong>Hi ${escapeHtml(firstName)},</strong>`, { marginBottom: '16px' }),
    emailParagraph("Thanks for your interest in the group class. You're on the waitlist."),
    emailCallout(
      "What's next?",
      "Once there is enough interest, we'll set a date — you'll be the first to hear by email. Changed your mind? Just reply to this email."
    ),
    emailButton('View the workshops', workshopsUrl),
    emailParagraph(
      '<strong>Ruben Thielman</strong><br><span style="color:#666666;font-size:14px;">Studio Thielman</span>',
      { marginBottom: '0' }
    ),
  ].join('')
  const text = `Hi ${firstName},

Thanks for your interest in the group class. You're on the waitlist.

Once there is enough interest, we'll set a date — you'll be the first to hear by email. Changed your mind? Just reply to this email.

View the workshops: ${workshopsUrl}

Ruben Thielman
Studio Thielman
`
  return {
    subject,
    text,
    html: wrapEmailLayout({
      title: subject,
      preheader: "You're on the waitlist for the group class.",
      badge: 'Waitlist',
      heading: "You're on the waitlist",
      subheading: 'AI workshop group class',
      bodyHtml,
    }),
  }
}

function notificationTemplate(data: {
  name: string
  email: string
  company: string
  language: string
  pageLocale: string
  contactStatus: StepStatus
  receivedAt: string
}) {
  const subject = `Waitlist groepsles: ${data.name}`
  const mailtoReply = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent('Groepsles AI-workshop')}`
  const rows = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Company / role', value: data.company || '—' },
    { label: 'Preferred language', value: data.language ? data.language.toUpperCase() : '—' },
    { label: 'Signed up via', value: data.pageLocale === 'nl' ? '/nl/workshops' : '/workshops' },
    {
      label: 'Resend segment',
      value:
        data.contactStatus === 'added'
          ? 'Added to "Workshop groepsles wachtlijst"'
          : data.contactStatus === 'existing'
            ? 'Existing contact, added to "Workshop groepsles wachtlijst"'
            : 'FAILED to add to segment — add manually',
    },
    { label: 'Received', value: data.receivedAt },
  ]
  const bodyHtml = [
    emailParagraph('Someone joined the waitlist for the workshop group class.'),
    emailFieldTable(rows),
    emailButton('Reply', mailtoReply),
  ].join('')

  const html = wrapEmailLayout({
    title: subject,
    preheader: `${data.name} joined the group-class waitlist`,
    badge: 'Workshop waitlist',
    heading: data.name,
    subheading: data.email,
    bodyHtml,
    showLogo: true,
  })
  const text = `New workshop group-class waitlist signup

${rows.map((r) => `${r.label}: ${r.value}`).join('\n')}
`
  return { subject, html, text }
}

async function addToSegment(
  resend: Resend,
  segmentId: string,
  payload: { email: string; firstName: string; lastName?: string }
): Promise<StepStatus> {
  const created = await resend.contacts.create({
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  })
  if (!created.error) return 'added'

  // Contact probably exists already: add the existing contact to the segment.
  console.warn('Waitlist: contacts.create failed, trying segments.add:', created.error.message)
  const added = await resend.contacts.segments.add({ email: payload.email, segmentId })
  if (!added.error) return 'existing'

  console.error('Waitlist: segments.add failed:', added.error.message)
  return 'failed'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = (typeof req.body === 'string' ? safeJson(req.body) : req.body) || {}

  // Spam protection: honeypot + minimum fill time. Bots get a fake success.
  const honeypot = str(body.website, 200)
  const startedAt = Number(body.startedAt)
  if (honeypot || (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS)) {
    return res.status(200).json({ success: true })
  }

  const name = str(body.name, 100)
  const email = str(body.email, 254).toLowerCase()
  const company = str(body.company, 150)
  const language = str(body.language, 2).toLowerCase()
  const pageLocale: Lang = str(body.locale, 5).toLowerCase().startsWith('nl') ? 'nl' : 'en'
  const consent = body.consent === true

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = 'required'
  if (!email || !EMAIL_REGEX.test(email)) fieldErrors.email = 'invalid'
  if (language && language !== 'nl' && language !== 'en') fieldErrors.language = 'invalid'
  if (!consent) fieldErrors.consent = 'required'
  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({ error: 'Invalid input', fieldErrors })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) {
    console.error('Waitlist: Resend not configured (RESEND_API_KEY / RESEND_FROM missing)')
    return res.status(503).json({ error: 'Email service not configured' })
  }

  const resend = new Resend(apiKey)
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID || DEFAULT_SEGMENT_ID
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL
  const lang: Lang = (language as Lang) || pageLocale

  let contact: StepStatus = 'failed'
  try {
    contact = await addToSegment(resend, segmentId, { email, ...splitName(name) })
  } catch (err) {
    console.error('Waitlist: contact error', err)
  }

  let notification: StepStatus = 'failed'
  try {
    const tpl = notificationTemplate({
      name,
      email,
      company,
      language,
      pageLocale,
      contactStatus: contact,
      receivedAt: formatNow(),
    })
    const { error } = await resend.emails.send({
      from,
      to: notifyEmail,
      replyTo: email,
      subject: tpl.subject,
      html: tpl.html,
      text: tpl.text,
    })
    notification = error ? 'failed' : 'sent'
    if (error) console.error('Waitlist: notification failed', error.message)
  } catch (err) {
    console.error('Waitlist: notification error', err)
  }

  // Nothing recorded anywhere: tell the user to retry.
  if (contact === 'failed' && notification === 'failed') {
    return res.status(502).json({ error: 'Could not save signup' })
  }

  let confirmation: StepStatus = 'skipped'
  try {
    const tpl = confirmationTemplate(lang, name)
    const { error } = await resend.emails.send({
      from,
      to: email,
      replyTo: notifyEmail,
      subject: tpl.subject,
      html: tpl.html,
      text: tpl.text,
    })
    confirmation = error ? 'failed' : 'sent'
    if (error) console.error('Waitlist: confirmation failed', error.message)
  } catch (err) {
    confirmation = 'failed'
    console.error('Waitlist: confirmation error', err)
  }

  return res.status(200).json({ success: true, contact, notification, confirmation })
}

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}
