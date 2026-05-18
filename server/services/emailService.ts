import { Resend } from 'resend'
import {
  getAutoReplyTemplate,
  getChatNotificationTemplate,
  getSubmissionNotificationTemplate,
} from './emailTemplates.js'

interface SubmissionData {
  businessName: string
  name: string
  email: string
  phone: string
  businessDescription: string
  package: string
  packageOther?: string
  hasExistingWebsite?: string
  existingWebsiteUrl?: string
}

interface ChatMessageData {
  userName?: string
  userEmail: string
  message: string
}

export type EmailStepStatus = 'sent' | 'skipped' | 'failed'

export interface EmailDeliveryResult {
  configured: boolean
  notification: EmailStepStatus
  autoReply: EmailStepStatus
  error?: string
}

let resendClient: Resend | null = null

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

export function isResendConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM &&
    process.env.RESEND_NOTIFY_EMAIL
  )
}

export function getResendConfigStatus(): {
  hasApiKey: boolean
  hasFrom: boolean
  hasNotifyEmail: boolean
  ready: boolean
} {
  return {
    hasApiKey: Boolean(process.env.RESEND_API_KEY),
    hasFrom: Boolean(process.env.RESEND_FROM),
    hasNotifyEmail: Boolean(process.env.RESEND_NOTIFY_EMAIL),
    ready: isResendConfigured(),
  }
}

if (!isResendConfigured()) {
  console.warn(
    'Resend not fully configured (RESEND_API_KEY, RESEND_FROM, RESEND_NOTIFY_EMAIL). Email notifications will be disabled.'
  )
}

async function sendEmail(params: {
  to: string | string[]
  subject: string
  html: string
  text: string
  replyTo?: string
}): Promise<void> {
  const resend = getResend()
  const from = process.env.RESEND_FROM

  if (!resend || !from) {
    throw new Error('Resend not configured')
  }

  const { data, error } = await resend.emails.send({
    from,
    to: params.to,
    subject: params.subject,
    html: params.html,
    text: params.text,
    replyTo: params.replyTo,
  })

  if (error) {
    throw new Error(error.message)
  }

  console.log('Resend email sent:', { id: data?.id, to: params.to, subject: params.subject })
}

async function sendAutoReply(email: string, userName?: string): Promise<void> {
  const template = getAutoReplyTemplate(userName)

  await sendEmail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  })

  console.log(`Auto-reply sent to: ${email}`)
}

function formatSubmittedAt(): string {
  return new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Brussels',
  })
}

export async function sendSubmissionNotification(data: SubmissionData): Promise<EmailDeliveryResult> {
  const result: EmailDeliveryResult = {
    configured: isResendConfigured(),
    notification: 'skipped',
    autoReply: 'skipped',
  }

  if (!result.configured) {
    result.error = 'Missing RESEND_API_KEY, RESEND_FROM, or RESEND_NOTIFY_EMAIL'
    console.log('Email notification skipped - Resend not configured')
    return result
  }

  const notifyEmail = process.env.RESEND_NOTIFY_EMAIL!
  const packageText =
    data.package === 'Other' && data.packageOther
      ? `${data.package} (${data.packageOther})`
      : data.package

  const websiteInfo =
    data.hasExistingWebsite === 'yes' && data.existingWebsiteUrl
      ? data.existingWebsiteUrl
      : data.hasExistingWebsite === 'yes'
        ? 'Yes (URL not provided)'
        : 'No'

  const template = getSubmissionNotificationTemplate({
    businessName: data.businessName,
    name: data.name,
    email: data.email,
    phone: data.phone,
    packageText,
    businessDescription: data.businessDescription,
    websiteInfo,
    submittedAt: formatSubmittedAt(),
  })

  try {
    await sendEmail({
      to: notifyEmail,
      subject: template.subject,
      text: template.text,
      html: template.html,
      replyTo: data.email,
    })
    result.notification = 'sent'
    console.log('Submission notification email sent successfully')
  } catch (error) {
    result.notification = 'failed'
    result.error = error instanceof Error ? error.message : 'Notification email failed'
    console.error('Failed to send submission notification email:', error)
    return result
  }

  try {
    await sendAutoReply(data.email, data.name)
    result.autoReply = 'sent'
  } catch (error) {
    result.autoReply = 'failed'
    const autoReplyError = error instanceof Error ? error.message : 'Auto-reply failed'
    result.error = result.error ? `${result.error}; ${autoReplyError}` : autoReplyError
    console.error('Failed to send auto-reply:', error)
  }

  return result
}

export async function sendChatMessageNotification(data: ChatMessageData): Promise<EmailDeliveryResult> {
  const result: EmailDeliveryResult = {
    configured: isResendConfigured(),
    notification: 'skipped',
    autoReply: 'skipped',
  }

  if (!result.configured) {
    result.error = 'Missing RESEND_API_KEY, RESEND_FROM, or RESEND_NOTIFY_EMAIL'
    console.log('Chat notification skipped - Resend not configured')
    return result
  }

  if (!data.userEmail) {
    result.error = 'No visitor email provided'
    return result
  }

  const notifyEmail = process.env.RESEND_NOTIFY_EMAIL!
  const template = getChatNotificationTemplate({
    userName: data.userName || 'Anonymous',
    userEmail: data.userEmail,
    message: data.message,
    receivedAt: formatSubmittedAt(),
  })

  try {
    await sendEmail({
      to: notifyEmail,
      subject: template.subject,
      text: template.text,
      html: template.html,
      replyTo: data.userEmail,
    })
    result.notification = 'sent'
    console.log('Chat notification email sent successfully')
  } catch (error) {
    result.notification = 'failed'
    result.error = error instanceof Error ? error.message : 'Chat notification failed'
    console.error('Failed to send chat notification email:', error)
    return result
  }

  try {
    await sendAutoReply(data.userEmail, data.userName)
    result.autoReply = 'sent'
  } catch (error) {
    result.autoReply = 'failed'
    const autoReplyError = error instanceof Error ? error.message : 'Auto-reply failed'
    result.error = result.error ? `${result.error}; ${autoReplyError}` : autoReplyError
    console.error('Failed to send chat auto-reply:', error)
  }

  return result
}
