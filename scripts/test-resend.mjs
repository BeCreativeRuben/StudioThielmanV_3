/**
 * Local Resend smoke test.
 * Usage (from project root):
 *   $env:RESEND_API_KEY="re_..."; $env:RESEND_FROM="Studio Thielman <hello@yourdomain.com>"; $env:RESEND_NOTIFY_EMAIL="you@yourdomain.com"; node scripts/test-resend.mjs
 */
import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const from = process.env.RESEND_FROM
const to = process.env.RESEND_NOTIFY_EMAIL

function fail(msg) {
  console.error('FAIL:', msg)
  process.exit(1)
}

if (!apiKey) fail('RESEND_API_KEY is missing')
if (!from) fail('RESEND_FROM is missing')
if (!to) fail('RESEND_NOTIFY_EMAIL is missing')

console.log('Config OK')
console.log('  FROM:', from)
console.log('  TO:  ', to)

const resend = new Resend(apiKey)
const { data, error } = await resend.emails.send({
  from,
  to,
  subject: 'Studio Thielman — Resend local test',
  text: 'If you receive this, Resend credentials and domain are working.',
  html: '<p>If you receive this, <strong>Resend</strong> credentials and domain are working.</p>',
})

if (error) {
  fail(error.message)
}

console.log('SUCCESS — email id:', data?.id)
