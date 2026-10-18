import { EMAIL_BRAND, emailCallout, emailFieldTable, emailParagraph, escapeHtml, wrapEmailLayout } from './emailBrand.js'

/** Interest-list signup: group AI workshop ('group-workshop-waitlist') or AI masterclass ('masterclass-waitlist'). */
export type InterestListKind = 'group-workshop' | 'masterclass'

export const INTEREST_LIST_SOURCES: Record<string, InterestListKind> = {
  'group-workshop-waitlist': 'group-workshop',
  'masterclass-waitlist': 'masterclass',
}

const PATHS: Record<InterestListKind, { nl: string; en: string }> = {
  'group-workshop': { nl: '/nl/groepsworkshop', en: '/group-workshop' },
  masterclass: { nl: '/nl/masterclass-ai', en: '/ai-masterclass' },
}

export interface GroupWorkshopSignup {
  kind: InterestListKind
  email: string
  firstName: string
  roleLabel: string
  language: 'nl-BE' | 'en'
  pageUrl: string
}

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max) : '')

export function parseGroupWorkshopSignup(raw: unknown, email: string, kind: InterestListKind = 'group-workshop'): GroupWorkshopSignup {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const language = r.language === 'en' ? 'en' : 'nl-BE'
  const pageUrl = clip(r.pageUrl, 300)
  return {
    kind,
    email,
    firstName: clip(r.firstName, 80),
    roleLabel: clip(r.roleLabel, 60),
    language,
    pageUrl: /^https:\/\/([a-z0-9-]+\.)*(studiothielman\.com|vercel\.app)\//i.test(pageUrl)
      ? pageUrl
      : `${EMAIL_BRAND.siteUrl}${language === 'en' ? PATHS[kind].en : PATHS[kind].nl}`,
  }
}

/** Short notification to Studio Thielman (Dutch). */
const NOTIFY = {
  'group-workshop': {
    list: 'interesselijst groepsworkshop',
    badge: 'Interesselijst groepsworkshop',
    intro: 'Er schreef iemand in op de interesselijst voor de AI-groepsworkshop. Je vindt alle inschrijvingen in admin (filter: Groepsworkshop interesselijst).',
    roleLabel: 'Ik ben',
  },
  masterclass: {
    list: 'interesselijst masterclass AI',
    badge: 'Interesselijst masterclass AI',
    intro: 'Er schreef iemand in op de interesselijst voor de masterclass AI. Je vindt alle inschrijvingen in admin (filter: Masterclass AI interesselijst).',
    roleLabel: 'Ik gebruik AI',
  },
} as const

export function getGroupWorkshopNotificationTemplate(d: GroupWorkshopSignup, submittedAt: string, isTest = false) {
  const n = NOTIFY[d.kind]
  const subject = `${isTest ? '[TEST] ' : ''}Nieuwe inschrijving ${n.list}: ${d.email}`
  const rows = [
    { label: 'E-mail', value: d.email },
    { label: 'Voornaam', value: d.firstName || '—' },
    { label: n.roleLabel, value: d.roleLabel || '—' },
    { label: 'Taal', value: d.language === 'en' ? 'Engels' : 'Nederlands' },
    { label: 'Pagina', value: d.pageUrl },
    { label: 'Ontvangen', value: submittedAt },
  ]
  const html = wrapEmailLayout({
    title: subject,
    lang: 'nl-BE',
    preheader: `${d.email}${d.roleLabel ? ` · ${d.roleLabel}` : ''}`,
    badge: isTest ? `TEST · ${n.badge}` : n.badge,
    heading: 'Nieuwe inschrijving',
    subheading: d.email,
    bodyHtml: [
      emailParagraph(n.intro),
      emailFieldTable(rows),
      emailParagraph(
        '<span style="font-size:13px;color:#666666;">Beloofd aan de inschrijver: één mail zodra datum en locatie vastliggen, verder niets. Niet toevoegen aan een nieuwsbrief.</span>',
        { marginBottom: '0' }
      ),
    ].join(''),
    showLogo: true,
    tagline: 'AI-lezingen & workshops',
    footerCta: { label: 'Open de pagina', href: `${EMAIL_BRAND.siteUrl}${PATHS[d.kind].nl}` },
  })
  const text = [subject, '', ...rows.map((r) => `${r.label}: ${r.value}`)].join('\n')
  return { subject, html, text }
}

const COPY_GW = {
  'nl-BE': {
    subject: 'Je staat op de interesselijst voor de AI-groepsworkshop',
    badge: 'Ingeschreven',
    hi: (n: string) => (n ? `Hoi ${n},` : 'Hoi,'),
    heading: 'Je staat op de lijst',
    thanks: 'Bedankt voor je interesse in de hands-on AI-groepsworkshop.',
    promiseTitle: 'Wat nu?',
    promise:
      'Zodra er genoeg inschrijvingen zijn en de datum en locatie vastliggen, krijg je <strong>één mail</strong> met alle info. Je e-mail wordt alleen hiervoor gebruikt: geen nieuwsbrief, geen spam.',
    out: 'Toch geen interesse meer? Antwoord gewoon op deze mail en ik haal je van de lijst.',
    role: 'Studio Thielman · AI-lezingen & workshops',
    tagline: 'AI-lezingen & workshops uit Lokeren',
    footer: 'Bekijk de groepsworkshop',
    path: '/nl/groepsworkshop',
  },
  en: {
    subject: 'You are on the interest list for the group AI workshop',
    badge: 'Signed up',
    hi: (n: string) => (n ? `Hi ${n},` : 'Hi,'),
    heading: 'You are on the list',
    thanks: 'Thanks for your interest in the hands-on group AI workshop.',
    promiseTitle: 'What happens next?',
    promise:
      'As soon as there are enough sign-ups and the date and location are fixed, you get <strong>one email</strong> with all the info. Your email is only used for this: no newsletter, no spam.',
    out: 'Changed your mind? Just reply to this email and I will take you off the list.',
    role: 'Studio Thielman · AI talks & workshops',
    tagline: 'AI talks & workshops from Belgium',
    footer: 'View the group workshop',
    path: '/group-workshop',
  },
} as const

const COPY_MC = {
  'nl-BE': {
    subject: 'Je staat op de interesselijst voor de masterclass AI',
    badge: 'Ingeschreven',
    hi: (n: string) => (n ? `Hoi ${n},` : 'Hoi,'),
    heading: 'Je staat op de lijst',
    thanks: 'Bedankt voor je interesse in de masterclass AI. Die gaat door op dezelfde dag als de groepsworkshop.',
    promiseTitle: 'Wat nu?',
    promise:
      'Zodra er genoeg inschrijvingen zijn en de datum en locatie vastliggen, krijg je <strong>één mail</strong> met alle info. Je e-mail wordt alleen hiervoor gebruikt: geen nieuwsbrief, geen spam.',
    out: 'Toch geen interesse meer? Antwoord gewoon op deze mail en ik haal je van de lijst.',
    role: 'Studio Thielman · AI-lezingen & workshops',
    tagline: 'AI-lezingen & workshops uit Lokeren',
    footer: 'Bekijk de masterclass',
    path: '/nl/masterclass-ai',
  },
  en: {
    subject: 'You are on the interest list for the AI masterclass',
    badge: 'Signed up',
    hi: (n: string) => (n ? `Hi ${n},` : 'Hi,'),
    heading: 'You are on the list',
    thanks: 'Thanks for your interest in the AI masterclass. It takes place on the same day as the group workshop.',
    promiseTitle: 'What happens next?',
    promise:
      'As soon as there are enough sign-ups and the date and location are fixed, you get <strong>one email</strong> with all the info. Your email is only used for this: no newsletter, no spam.',
    out: 'Changed your mind? Just reply to this email and I will take you off the list.',
    role: 'Studio Thielman · AI talks & workshops',
    tagline: 'AI talks & workshops from Belgium',
    footer: 'View the masterclass',
    path: '/ai-masterclass',
  },
} as const

const COPY = { 'group-workshop': COPY_GW, masterclass: COPY_MC } as const

/** Single short confirmation to the signer, in their page language. */
export function getGroupWorkshopConfirmationTemplate(d: GroupWorkshopSignup, isTest = false) {
  const c = COPY[d.kind][d.language]
  const subject = `${isTest ? '[TEST] ' : ''}${c.subject}`
  const html = wrapEmailLayout({
    title: subject,
    lang: d.language,
    preheader: c.promise.replace(/<[^>]+>/g, ''),
    badge: c.badge,
    heading: c.heading,
    subheading: c.thanks,
    bodyHtml: [
      emailParagraph(`<strong>${escapeHtml(c.hi(d.firstName))}</strong>`, { marginBottom: '12px' }),
      emailParagraph(escapeHtml(c.thanks)),
      emailCallout(c.promiseTitle, c.promise),
      emailParagraph(escapeHtml(c.out), { marginBottom: '24px' }),
      emailParagraph(`<strong>Ruben Thielman</strong><br><span style="color:#666666;font-size:14px;">${escapeHtml(c.role)}</span>`, { marginBottom: '0' }),
    ].join(''),
    showLogo: true,
    tagline: c.tagline,
    footerCta: { label: c.footer, href: `${EMAIL_BRAND.siteUrl}${c.path}` },
  })
  const text = [c.hi(d.firstName), '', c.thanks, '', `${c.promiseTitle} ${c.promise.replace(/<[^>]+>/g, '')}`, '', c.out, '', 'Ruben Thielman', c.role].join('\n')
  return { subject, html, text }
}
