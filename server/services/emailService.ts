import nodemailer from 'nodemailer'
import { addContactToMailchimp, getAutoReplyTemplate } from './mailchimpService.js'

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

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.warn('Gmail credentials not configured. Email notifications will be disabled.')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD
  }
})

/**
 * Send friendly auto-reply to user
 */
async function sendAutoReply(email: string, userName?: string): Promise<void> {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log('Auto-reply skipped - Gmail not configured')
    return
  }

  try {
    const template = getAutoReplyTemplate(userName)
    
    await transporter.sendMail({
      from: `"Ruben Thielman" <${GMAIL_USER}>`,
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    })
    
    console.log(`Auto-reply sent to: ${email}`)
  } catch (error) {
    console.error('Failed to send auto-reply:', error)
    // Don't throw - we don't want auto-reply failures to break form submission
  }
}

export async function sendSubmissionNotification(data: SubmissionData): Promise<void> {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log('Email notification skipped - Gmail not configured')
    return
  }

  const packageText = data.package === 'Other' && data.packageOther 
    ? `${data.package} (${data.packageOther})`
    : data.package

  const websiteInfo = data.hasExistingWebsite === 'yes' && data.existingWebsiteUrl
    ? `Yes - ${data.existingWebsiteUrl}`
    : data.hasExistingWebsite === 'yes'
    ? 'Yes (URL not provided)'
    : 'No'

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Business Name:</strong> ${escapeHtml(data.businessName)}</p>
    <p><strong>Contact Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Package Interest:</strong> ${escapeHtml(packageText)}</p>
    <p><strong>Business Description:</strong></p>
    <p>${escapeHtml(data.businessDescription)}</p>
    <p><strong>Existing Website:</strong> ${escapeHtml(websiteInfo)}</p>
    <hr>
    <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
  `

  const textBody = `
New Contact Form Submission

Business Name: ${data.businessName}
Contact Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Package Interest: ${packageText}
Business Description: ${data.businessDescription}
Existing Website: ${websiteInfo}

Submitted at: ${new Date().toLocaleString()}
  `

  try {
    // Send notification to admin
    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission: ${data.businessName}`,
      text: textBody,
      html: htmlBody,
      replyTo: data.email // So you can reply directly
    })
    console.log('Submission notification email sent successfully')

    // Send auto-reply to user
    await sendAutoReply(data.email, data.name).catch(err => {
      console.error('Auto-reply error:', err)
    })

    // Add to Mailchimp
    await addContactToMailchimp(data.email, data.name, undefined, ['Contact Form', 'Lead']).catch(err => {
      console.error('Mailchimp error:', err)
    })
  } catch (error) {
    console.error('Failed to send submission notification email:', error)
    // Don't throw - we don't want email failures to break form submission
  }
}

/**
 * Send notification for chat messages
 */
export async function sendChatMessageNotification(data: ChatMessageData): Promise<void> {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log('Chat notification skipped - Gmail not configured')
    return
  }

  const htmlBody = `
    <h2>New Chat Message</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.userName || 'Anonymous')}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.userEmail || 'Not provided')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message)}</p>
    <hr>
    <p><small>Received at: ${new Date().toLocaleString()}</small></p>
  `

  const textBody = `
New Chat Message

Name: ${data.userName || 'Anonymous'}
Email: ${data.userEmail || 'Not provided'}
Message: ${data.message}

Received at: ${new Date().toLocaleString()}
  `

  try {
    // Send notification to admin
    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `New Chat Message${data.userName ? ` from ${data.userName}` : ''}`,
      text: textBody,
      html: htmlBody,
      replyTo: data.userEmail || undefined
    })
    console.log('Chat notification email sent successfully')

    // Send auto-reply to user if email provided
    if (data.userEmail) {
      await sendAutoReply(data.userEmail, data.userName).catch(err => {
        console.error('Auto-reply error:', err)
      })

      // Add to Mailchimp
      await addContactToMailchimp(data.userEmail, data.userName, undefined, ['Chat Message', 'Lead']).catch(err => {
        console.error('Mailchimp error:', err)
      })
    }
  } catch (error) {
    console.error('Failed to send chat notification email:', error)
    // Don't throw - we don't want email failures to break chat submission
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
