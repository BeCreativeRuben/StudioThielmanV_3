import mailchimp from '@mailchimp/mailchimp_marketing'
import { createHash } from 'crypto'

// Initialize Mailchimp
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1'
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID

if (MAILCHIMP_API_KEY) {
  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER_PREFIX,
  })
} else {
  console.warn('Mailchimp API key not configured. Contact management will be disabled.')
}

function getSubscriberHash(email: string): string {
  // Mailchimp requires MD5 hash of lowercase email
  return createHash('md5').update(email.toLowerCase()).digest('hex')
}

export type MailchimpMergeFields = Record<string, any>

/**
 * Upsert a Mailchimp member and (optionally) apply tags.
 * Throws on failure so callers can accurately detect acceptance.
 */
export async function upsertMailchimpMember(params: {
  email: string
  statusIfNew?: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending'
  mergeFields?: MailchimpMergeFields
  tags?: string[]
}): Promise<void> {
  const { email, statusIfNew = 'subscribed', mergeFields = {}, tags = [] } = params

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    throw new Error('Mailchimp not configured')
  }

  const subscriberHash = getSubscriberHash(email)

  // Upsert member
  await mailchimp.lists.setListMember(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
    email_address: email,
    status_if_new: statusIfNew,
    merge_fields: mergeFields,
  })

  // Apply tags (Mailchimp requires a separate tags endpoint)
  if (tags.length > 0) {
    await mailchimp.lists.updateListMemberTags(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
      tags: tags.map((name) => ({ name, status: 'active' })),
    })
  }
}

/**
 * Add or update a contact in Mailchimp audience
 */
export async function addContactToMailchimp(
  email: string,
  firstName?: string,
  lastName?: string,
  tags?: string[]
): Promise<void> {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.log('Mailchimp not configured - skipping contact addition')
    return
  }

  try {
    const nameParts = firstName ? firstName.split(' ') : []
    const fName = nameParts[0] || firstName || ''
    const lName = nameParts.slice(1).join(' ') || lastName || ''

    await mailchimp.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fName,
        LNAME: lName,
      },
    })

    if (tags && tags.length > 0) {
      const subscriberHash = getSubscriberHash(email)
      await mailchimp.lists.updateListMemberTags(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
        tags: tags.map((name) => ({ name, status: 'active' })),
      })
    }

    console.log(`Contact added to Mailchimp: ${email}`)
  } catch (error: any) {
    // If contact already exists, that's okay
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      console.log(`Contact already exists in Mailchimp: ${email}`)
      
      // Update existing contact with tags if provided
      if (tags && tags.length > 0) {
        try {
          const subscriberHash = getSubscriberHash(email)
          await mailchimp.lists.updateListMemberTags(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
            tags: tags.map((name) => ({ name, status: 'active' })),
          })
        } catch (updateError) {
          console.error('Failed to update Mailchimp contact tags:', updateError)
        }
      }
    } else {
      console.error('Failed to add contact to Mailchimp:', error)
    }
  }
}

/**
 * Get friendly auto-reply email template
 */
export function getAutoReplyTemplate(userName?: string): { subject: string; html: string; text: string } {
  const name = userName ? ` ${userName}` : ''
  
  const subject = 'Thank you for reaching out! 🎉'
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Thank You${name}! ✨</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Hi${name},
              </p>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you so much for reaching out! I'm excited to learn more about your project and how we can work together to bring your vision to life.
              </p>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: #333333; font-size: 16px; font-weight: 600;">
                  ⚡ Quick Response Guarantee
                </p>
                <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6;">
                  I guarantee a response within <strong>24 hours</strong>. I'm committed to getting back to you quickly so we can start moving forward!
                </p>
              </div>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                To make our conversation as smooth and productive as possible, it would be incredibly helpful if you could have the following ready:
              </p>
              
              <ul style="margin: 20px 0; padding-left: 25px; color: #333333; font-size: 16px; line-height: 1.8;">
                <li style="margin-bottom: 10px;">Your project goals and vision</li>
                <li style="margin-bottom: 10px;">Any specific features or requirements you have in mind</li>
                <li style="margin-bottom: 10px;">Your ideal timeline or deadline</li>
                <li style="margin-bottom: 10px;">Any questions or concerns you'd like to discuss</li>
              </ul>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Don't worry if you don't have everything figured out yet—we can work through it together! Having these details ready will just help us hit the ground running. 🚀
              </p>
              
              <p style="margin: 30px 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                I'll be in touch soon, and I'm looking forward to learning more about what you're building!
              </p>
              
              <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #667eea;">Ruben Thielman</strong><br>
                <span style="color: #888888; font-size: 14px;">Founder & Developer, Studio Thielman</span>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #888888; font-size: 14px;">
                Studio Thielman
              </p>
              <p style="margin: 0; color: #aaaaaa; font-size: 12px;">
                Building exceptional digital experiences
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
  
  const text = `
Thank You${name}!

Hi${name},

Thank you so much for reaching out! I'm excited to learn more about your project and how we can work together to bring your vision to life.

⚡ Quick Response Guarantee
I guarantee a response within 24 hours. I'm committed to getting back to you quickly so we can start moving forward!

To make our conversation as smooth and productive as possible, it would be incredibly helpful if you could have the following ready:

• Your project goals and vision
• Any specific features or requirements you have in mind
• Your ideal timeline or deadline
• Any questions or concerns you'd like to discuss

Don't worry if you don't have everything figured out yet—we can work through it together! Having these details ready will just help us hit the ground running.

I'll be in touch soon, and I'm looking forward to learning more about what you're building!

Best regards,
Ruben Thielman
Founder & Developer, Studio Thielman

---
Studio Thielman
Building exceptional digital experiences
  `
  
  return { subject, html, text }
}
