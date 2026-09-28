export type ShowcaseLocale = 'en' | 'nl-BE'

export type OneOnOneShowcaseItem = {
  id: string
  /** Only published items are rendered on /workshops/1-1. */
  published: boolean
  /** Participant name */
  name: string
  /** Project name (per locale) */
  projectName: Record<ShowcaseLocale, string>
  /** Live project URL */
  url: string
  /** One-line description (per locale) */
  description: Record<ShowcaseLocale, string>
  /** Optional screenshot/image URL or imported asset */
  image?: string
}

/**
 * Projects built after a 1:1 workshop, shown on /workshops/1-1.
 *
 * TODO(Simon van Huët): waiting for Simon's permission before publishing.
 * When approved: double-check the fields below, optionally add `image`
 * (e.g. a screenshot in src/images/ or /public/images/), then set `published: true`.
 * Fields: name, projectName, url, description (one line, EN + NL), image (optional).
 * Context: built after his 1:1 workshop on 9 Jul 2026, live by 22 Aug 2026, first booking 24 Aug 2026.
 */
export const oneOnOneShowcase: OneOnOneShowcaseItem[] = [
  {
    id: 'simon-van-huet-mailsupport',
    published: false,
    name: 'Simon van Huët',
    projectName: {
      en: 'MailSupport — European AI for your inbox',
      'nl-BE': 'MailSupport — Europese AI voor je inbox',
    },
    url: 'https://mail-support-two.vercel.app/',
    description: {
      en: 'Labels incoming emails and drafts replies from your own FAQ and context — you review, edit and send.',
      'nl-BE': 'Labelt inkomende mails en schrijft antwoordvoorstellen op basis van je eigen FAQ en context — jij kijkt na, past aan en verstuurt.',
    },
    image: undefined,
  },
]

export function getPublishedOneOnOneShowcase(): OneOnOneShowcaseItem[] {
  return oneOnOneShowcase.filter((item) => item.published)
}
