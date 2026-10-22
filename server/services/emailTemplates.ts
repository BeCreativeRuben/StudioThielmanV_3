import {
  EMAIL_BRAND,
  emailButton,
  emailCallout,
  emailFieldTable,
  emailList,
  emailParagraph,
  escapeHtml,
  wrapEmailLayout,
} from './emailBrand.js'

export function getAutoReplyTemplate(userName?: string, lang: 'nl' | 'en' = 'en'): { subject: string; html: string; text: string } {
  if (lang === 'nl') return getAutoReplyTemplateNl(userName)
  const greeting = userName ? `Hi ${userName},` : 'Hi there,'
  const subject = 'Thanks for reaching out — Studio Thielman'

  const bodyHtml = [
    emailParagraph(`<strong>${escapeHtml(greeting)}</strong>`, { marginBottom: '16px' }),
    emailParagraph(
      "Thank you for contacting Studio Thielman. I'm looking forward to learning more about your project and how we can help you grow online."
    ),
    emailCallout(
      'Response within 24 hours',
      'You will hear back from me within <strong>24 hours</strong>. I keep communication clear and personal — no generic autoresponder chains.'
    ),
    emailParagraph('To make our first conversation productive, it helps if you can share:'),
    emailList([
      'Your goals and vision for the project',
      'Features or pages you already have in mind',
      'Your ideal timeline',
      'Any questions you want answered upfront',
    ]),
    emailParagraph(
      "No worries if you don't have everything figured out yet — we'll work through it together.",
      { marginBottom: '24px' }
    ),
    emailParagraph(
      '<strong>Ruben Thielman</strong><br><span style="color:#666666;font-size:14px;">Founder &amp; Developer</span>',
      { marginBottom: '0' }
    ),
  ].join('')

  const html = wrapEmailLayout({
    title: subject,
    preheader: 'We received your message and will reply within 24 hours.',
    badge: 'Message received',
    heading: 'Thank you for reaching out',
    subheading: "We've received your details and will be in touch soon.",
    bodyHtml,
    lang: 'en',
  })

  const text = `${greeting}

Thank you for contacting Studio Thielman. I'm looking forward to learning more about your project.

Response within 24 hours
You will hear back from me within 24 hours.

To prepare for our conversation:
• Your goals and vision for the project
• Features or pages you have in mind
• Your ideal timeline
• Any questions you want answered

Best regards,
Ruben Thielman
Founder & Developer, Studio Thielman

${EMAIL_BRAND.siteUrl}
`

  return { subject, html, text }
}

function getAutoReplyTemplateNl(userName?: string): { subject: string; html: string; text: string } {
  const greeting = userName ? `Hoi ${userName},` : 'Hoi,'
  const subject = 'Bedankt voor je bericht — Studio Thielman'

  const bodyHtml = [
    emailParagraph(`<strong>${escapeHtml(greeting)}</strong>`, { marginBottom: '16px' }),
    emailParagraph(
      'Bedankt dat je Studio Thielman contacteert. Ik kijk ernaar uit om meer te horen over je project en hoe we je online kunnen helpen groeien.'
    ),
    emailCallout(
      'Antwoord binnen 24 uur',
      'Je hoort binnen <strong>24 uur</strong> van me. Ik hou communicatie helder en persoonlijk.'
    ),
    emailParagraph('Om het eerste gesprek vlot te maken, helpt het als je dit al kunt delen:'),
    emailList([
      'Je doelen en visie voor het project',
      'Pagina’s of functies die je al in gedachten hebt',
      'Je ideale timing',
      'Vragen die je meteen beantwoord wil zien',
    ]),
    emailParagraph(
      'Geen probleem als nog niet alles vastligt — dat werken we samen uit.',
      { marginBottom: '24px' }
    ),
    emailParagraph(
      '<strong>Ruben Thielman</strong><br><span style="color:#666666;font-size:14px;">Oprichter &amp; developer</span>',
      { marginBottom: '0' }
    ),
  ].join('')

  const html = wrapEmailLayout({
    title: subject,
    preheader: 'We ontvingen je bericht en antwoorden binnen 24 uur.',
    badge: 'Bericht ontvangen',
    heading: 'Bedankt voor je bericht',
    subheading: 'We hebben je gegevens ontvangen en nemen snel contact op.',
    bodyHtml,
    lang: 'nl',
    footerCta: { label: 'Naar de website', href: 'https://studiothielman.com/nl' },
  })

  const text = `${greeting}

Bedankt dat je Studio Thielman contacteert. Ik kijk ernaar uit om meer te horen over je project.

Antwoord binnen 24 uur
Je hoort binnen 24 uur van me.

Ter voorbereiding:
• Je doelen en visie voor het project
• Pagina’s of functies die je in gedachten hebt
• Je ideale timing
• Vragen die je meteen beantwoord wil zien

Met vriendelijke groet,
Ruben Thielman
Oprichter & developer, Studio Thielman

https://studiothielman.com/nl
`

  return { subject, html, text }
}

export function getSubmissionNotificationTemplate(data: {
  businessName: string
  name: string
  email: string
  phone: string
  packageText: string
  businessDescription: string
  websiteInfo: string
  submittedAt: string
}): { subject: string; html: string; text: string } {
  const subject = `New lead: ${data.businessName}`
  const mailtoReply = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: Your inquiry — ${data.businessName}`)}`

  const bodyHtml = [
    emailParagraph('A new contact form submission just came in. Details below.'),
    emailFieldTable([
      { label: 'Business', value: data.businessName },
      { label: 'Contact', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Phone', value: data.phone },
      { label: 'Package', value: data.packageText },
      { label: 'Description', value: data.businessDescription },
      { label: 'Existing website', value: data.websiteInfo },
      { label: 'Submitted', value: data.submittedAt },
    ]),
    emailButton('Reply to lead', mailtoReply),
    emailParagraph(
      `<span style="font-size:13px;color:#666666;">Reply-To is set to <strong>${escapeHtml(data.email)}</strong> — you can also hit reply in your mail client.</span>`,
      { marginBottom: '0' }
    ),
  ].join('')

  const html = wrapEmailLayout({
    title: subject,
    preheader: `${data.name} from ${data.businessName} — ${data.packageText}`,
    badge: 'New contact form',
    heading: data.businessName,
    subheading: `${data.name} · ${data.packageText}`,
    bodyHtml,
    showLogo: true,
  })

  const text = `New contact form submission

Business: ${data.businessName}
Contact: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Package: ${data.packageText}
Description: ${data.businessDescription}
Existing website: ${data.websiteInfo}
Submitted: ${data.submittedAt}

Reply: ${data.email}
`

  return { subject, html, text }
}

export function getChatNotificationTemplate(data: {
  userName: string
  userEmail: string
  message: string
  receivedAt: string
}): { subject: string; html: string; text: string } {
  const subject = data.userName !== 'Anonymous'
    ? `New chat message from ${data.userName}`
    : 'New chat message'
  const mailtoReply = `mailto:${encodeURIComponent(data.userEmail)}?subject=${encodeURIComponent('Re: Your message — Studio Thielman')}`

  const bodyHtml = [
    emailParagraph('Someone sent a message through the website chat widget.'),
    emailFieldTable([
      { label: 'Name', value: data.userName },
      { label: 'Email', value: data.userEmail },
      { label: 'Message', value: data.message },
      { label: 'Received', value: data.receivedAt },
    ]),
    emailButton('Reply via email', mailtoReply),
  ].join('')

  const html = wrapEmailLayout({
    title: subject,
    preheader: data.message.slice(0, 80) + (data.message.length > 80 ? '…' : ''),
    badge: 'Chat widget',
    heading: data.userName !== 'Anonymous' ? data.userName : 'New chat message',
    subheading: data.userEmail,
    bodyHtml,
    showLogo: true,
  })

  const text = `New chat message

Name: ${data.userName}
Email: ${data.userEmail}
Message: ${data.message}
Received: ${data.receivedAt}

Reply: ${data.userEmail}
`

  return { subject, html, text }
}
