import nodemailer from 'nodemailer'

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
    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission: ${data.businessName}`,
      text: textBody,
      html: htmlBody,
      replyTo: data.email // So you can reply directly
    })
    console.log('Submission notification email sent successfully')
  } catch (error) {
    console.error('Failed to send submission notification email:', error)
    // Don't throw - we don't want email failures to break form submission
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
