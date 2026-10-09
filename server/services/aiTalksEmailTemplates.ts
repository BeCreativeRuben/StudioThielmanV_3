import {
  EMAIL_BRAND,
  emailButton,
  emailCallout,
  emailFieldTable,
  emailParagraph,
  escapeHtml,
  wrapEmailLayout,
} from './emailBrand.js'

/** Structured AI Talks inquiry, as sent by src/components/aiTalks/AiTalksRequestForm.tsx (source: 'ai-talks'). */
export interface AiTalkInquiry {
  name: string
  organisation: string
  email: string
  phone: string
  audience: string
  format: string
  theme: string
  groupSize: string
  /** ISO dates YYYY-MM-DD */
  dates: string[]
  period: string
  message: string
  coaching: boolean
  language: 'nl-BE' | 'en'
  pageUrl: string
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Validates/normalises untrusted input. Returns null when it is not a usable AI Talks payload. */
export function parseAiTalkInquiry(raw: unknown, fallback: { name: string; email: string; phone: string }): AiTalkInquiry | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const dates = Array.isArray(r.dates)
    ? [...new Set(r.dates.filter((d): d is string => typeof d === 'string' && ISO_DATE.test(d)))].sort().slice(0, 12)
    : []
  const pageUrl = clip(r.pageUrl, 300)
  return {
    name: clip(r.name, 120) || fallback.name,
    organisation: clip(r.organisation, 160),
    email: fallback.email,
    phone: clip(r.phone, 60) || (fallback.phone === '-' ? '' : fallback.phone),
    audience: clip(r.audience, 120),
    format: clip(r.format, 120),
    theme: clip(r.theme, 200),
    groupSize: clip(r.groupSize, 40),
    dates,
    period: clip(r.period, 300),
    message: clip(r.message, 1500),
    coaching: r.coaching === true,
    language: r.language === 'en' ? 'en' : 'nl-BE',
    pageUrl: /^https:\/\/([a-z0-9-]+\.)*(studiothielman\.com|vercel\.app)\//i.test(pageUrl) ? pageUrl : `${EMAIL_BRAND.siteUrl}/${r.language === 'en' ? '' : 'nl/'}ai-talks`,
  }
}

/** "di 14 okt 2026" (nl-BE) or "Tue 14 Oct 2026" (en). */
export function formatInquiryDates(dates: string[], language: 'nl-BE' | 'en'): string[] {
  const fmt = new Intl.DateTimeFormat(language === 'nl-BE' ? 'nl-BE' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  return dates.map((iso) => fmt.format(new Date(`${iso}T12:00:00Z`)).replace(/,/g, '').replace(/\.(?=\s|$)/g, ''))
}

export function calBookingUrl(): string {
  const link = (process.env.VITE_CAL_LINK || 'ruben-thielman-a0h3f0/30min').trim().replace(/^\/+/, '')
  return `https://cal.com/${link}`
}

const dash = (v: string) => v || '—'

/** Notification to Studio Thielman (always Dutch; Ruben's inbox). */
export function getAiTalksNotificationTemplate(d: AiTalkInquiry, submittedAt: string, isTest = false) {
  const tag = isTest ? '[TEST] ' : ''
  const subject = `${tag}Nieuwe AI Talks-aanvraag: ${d.name} – ${d.format}`
  const dates = formatInquiryDates(d.dates, 'nl-BE')
  const replySubject = d.language === 'en' ? 'Re: your AI talk / workshop request' : 'Re: je aanvraag voor een AI-lezing / workshop'
  const mailtoReply = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent(replySubject)}`
  const rows: Array<{ label: string; value: string; valueIsHtml?: boolean }> = [
    { label: 'Naam', value: d.name },
    { label: 'Organisatie', value: dash(d.organisation) },
    { label: 'E-mail', value: `<a href="mailto:${escapeHtml(d.email)}" style="color:#000000;">${escapeHtml(d.email)}</a>`, valueIsHtml: true },
    { label: 'Telefoon', value: d.phone ? `<a href="tel:${escapeHtml(d.phone.replace(/\s+/g, ''))}" style="color:#000000;">${escapeHtml(d.phone)}</a>` : '—', valueIsHtml: true },
    { label: 'Publiek', value: dash(d.audience) },
    { label: 'Format / pakket', value: dash(d.format) },
    { label: 'Thema', value: dash(d.theme) },
    { label: 'Aantal deelnemers', value: dash(d.groupSize) },
    { label: 'Voorkeursdata', value: dates.length ? dates.join(', ') : '—' },
    { label: 'Periode / opmerkingen', value: dash(d.period) },
    { label: 'Bericht', value: d.message ? escapeHtml(d.message).replace(/\n/g, '<br>') : '—', valueIsHtml: true },
    { label: 'Opvolgcoaching', value: d.coaching ? 'Ja, interesse' : 'Niet aangevinkt' },
    { label: 'Taal', value: d.language === 'en' ? 'Engels (EN-pagina)' : 'Nederlands (NL-pagina)' },
    { label: 'Pagina', value: `<a href="${escapeHtml(d.pageUrl)}" style="color:#000000;">${escapeHtml(d.pageUrl)}</a>`, valueIsHtml: true },
    { label: 'Ontvangen', value: submittedAt },
  ]
  const bodyHtml = [
    isTest ? emailCallout('TEST', 'Dit is een testaanvraag. Niet beantwoorden.') : '',
    emailParagraph('Er kwam een nieuwe aanvraag binnen via de AI talks-pagina.'),
    emailFieldTable(rows),
    emailButton(`Antwoord ${d.name.split(' ')[0]}`, mailtoReply),
    emailParagraph(
      `<span style="font-size:13px;color:#666666;">Reply-To staat op <strong>${escapeHtml(d.email)}</strong>, dus gewoon op beantwoorden klikken werkt ook. De aanvrager kreeg automatisch een bevestiging in het ${d.language === 'en' ? 'Engels' : 'Nederlands'}.</span>`,
      { marginBottom: '0' }
    ),
  ].join('')
  const html = wrapEmailLayout({
    title: subject,
    lang: 'nl-BE',
    preheader: `${d.name}${d.organisation ? ` (${d.organisation})` : ''} · ${d.format}${dates.length ? ` · ${dates.join(', ')}` : ''}`,
    badge: isTest ? 'TEST · AI talks-aanvraag' : 'AI talks-aanvraag',
    heading: d.organisation || d.name,
    subheading: `${d.name} · ${d.format}`,
    bodyHtml,
    showLogo: true,
    tagline: 'AI-lezingen & workshops',
    footerCta: { label: 'Open AI talks-pagina', href: `${EMAIL_BRAND.siteUrl}/nl/ai-talks` },
  })
  const text = [
    `${tag}Nieuwe AI Talks-aanvraag`,
    '',
    ...rows.map((r) => `${r.label}: ${r.valueIsHtml ? r.value.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '') : r.value}`),
    '',
    `Antwoorden: ${d.email}`,
  ].join('\n')
  return { subject, html, text }
}

const COPY = {
  'nl-BE': {
    subject: 'Je aanvraag voor een AI-lezing of workshop is binnen',
    badge: 'Aanvraag ontvangen',
    heading: (first: string) => `Bedankt, ${first}`,
    sub: 'Je aanvraag voor een AI-lezing of workshop is goed aangekomen.',
    intro: 'Fijn dat je aan een AI-sessie denkt. Dit is wat je me doorstuurde:',
    labels: { format: 'Format', theme: 'Thema', dates: 'Voorkeursdata', period: 'Periode / opmerkingen', group: 'Aantal deelnemers' },
    calloutTitle: 'Antwoord binnen 2 werkdagen',
    callout: 'Ik lees elke aanvraag zelf en kom binnen <strong>2 werkdagen</strong> bij je terug met een voorstel of een paar gerichte vragen.',
    callIntro: 'Liever meteen even bellen? Plan een kort gesprek van 30 minuten in:',
    callCta: 'Plan een gesprek',
    contact: 'Vragen of iets toe te voegen? Beantwoord gewoon deze mail of bel',
    sign: 'Tot snel,',
    role: 'Studio Thielman · AI-lezingen & workshops',
    tagline: 'AI-lezingen & workshops uit Lokeren',
    footer: 'Bekijk de AI talks-pagina',
    path: '/nl/ai-talks',
  },
  en: {
    subject: 'Your AI talk or workshop request is in',
    badge: 'Request received',
    heading: (first: string) => `Thank you, ${first}`,
    sub: 'Your request for an AI talk or workshop has arrived safely.',
    intro: 'Great that you are planning an AI session. Here is what you sent me:',
    labels: { format: 'Format', theme: 'Theme', dates: 'Preferred dates', period: 'Period / remarks', group: 'Group size' },
    calloutTitle: 'Reply within 2 working days',
    callout: 'I read every request myself and will get back to you within <strong>2 working days</strong> with a proposal or a few focused questions.',
    callIntro: 'Rather talk right away? Book a short 30-minute call:',
    callCta: 'Book a call',
    contact: 'Questions or anything to add? Just reply to this email or call',
    sign: 'Speak soon,',
    role: 'Studio Thielman · AI talks & workshops',
    tagline: 'AI talks & workshops from Belgium',
    footer: 'View the AI talks page',
    path: '/ai-talks',
  },
} as const

/** Confirmation to the requester, in the language of the page they used. */
export function getAiTalksConfirmationTemplate(d: AiTalkInquiry, isTest = false) {
  const c = COPY[d.language]
  const first = d.name.split(/\s+/)[0] || d.name
  const subject = `${isTest ? '[TEST] ' : ''}${c.subject}`
  const dates = formatInquiryDates(d.dates, d.language)
  const cal = calBookingUrl()
  const phone = '+32\u00a0493\u00a050\u00a056\u00a041'
  const rows = [
    { label: c.labels.format, value: dash(d.format) },
    { label: c.labels.theme, value: dash(d.theme) },
    ...(dates.length ? [{ label: c.labels.dates, value: dates.join(', ') }] : []),
    ...(d.period ? [{ label: c.labels.period, value: d.period }] : []),
    ...(d.groupSize ? [{ label: c.labels.group, value: d.groupSize }] : []),
  ]
  const bodyHtml = [
    emailParagraph(escapeHtml(c.intro)),
    emailFieldTable(rows),
    emailCallout(c.calloutTitle, c.callout),
    emailParagraph(escapeHtml(c.callIntro), { marginBottom: '0' }),
    emailButton(c.callCta, cal),
    emailParagraph(
      `${escapeHtml(c.contact)} <a href="tel:+32493505641" style="color:#000000;">${phone}</a>. <a href="mailto:info@studiothielman.com" style="color:#000000;">info@studiothielman.com</a>`,
      { marginBottom: '24px' }
    ),
    emailParagraph(
      `${escapeHtml(c.sign)}<br><strong>Ruben Thielman</strong><br><span style="color:#666666;font-size:14px;">${escapeHtml(c.role)}</span>`,
      { marginBottom: '0' }
    ),
  ].join('')
  const html = wrapEmailLayout({
    title: subject,
    lang: d.language,
    preheader: c.sub,
    badge: c.badge,
    heading: c.heading(first),
    subheading: c.sub,
    bodyHtml,
    showLogo: true,
    tagline: c.tagline,
    footerCta: { label: c.footer, href: `${EMAIL_BRAND.siteUrl}${c.path}` },
  })
  const text = [
    `${c.heading(first)}`,
    '',
    c.intro,
    ...rows.map((r) => `${r.label}: ${r.value}`),
    '',
    `${c.calloutTitle}. ${c.callout.replace(/<[^>]+>/g, '')}`,
    '',
    `${c.callIntro} ${cal}`,
    '',
    `${c.contact} ${phone} · info@studiothielman.com`,
    '',
    c.sign,
    'Ruben Thielman',
    c.role,
  ].join('\n')
  return { subject, html, text }
}
