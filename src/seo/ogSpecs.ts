import { getMessages } from '../i18n/messages'
import type { AppLocale } from '../i18n/config'
import { OG_IMAGE_SECTIONS } from './ogImages'

const LABELS: Record<string, { en: string; nl: string }> = {
  home: { en: 'Web studio · Belgium', nl: 'Webstudio · België' },
  packages: { en: 'Packages & pricing', nl: 'Pakketten & prijzen' },
  portfolio: { en: 'Portfolio', nl: 'Portfolio' },
  blog: { en: 'Blog & insights', nl: 'Blog & inzichten' },
  'current-projects': { en: 'Current projects', nl: 'Lopende projecten' },
  'how-it-works': { en: 'How we work', nl: 'Werkwijze' },
  reviews: { en: 'Client reviews', nl: 'Reviews' },
  about: { en: 'About', nl: 'Over ons' },
  contact: { en: 'Contact', nl: 'Contact' },
  workshops: { en: 'AI workshops', nl: 'AI-workshops' },
  'workshops-incompany': { en: 'AI workshops · in-company', nl: 'AI-workshops · incompany' },
  'workshops-1-1': { en: 'AI workshops · 1:1', nl: 'AI-workshops · 1:1' },
  'ai-talks': { en: 'AI talks & workshops', nl: 'AI-lezingen & workshops' },
  privacy: { en: 'Privacy policy', nl: 'Privacy' },
  terms: { en: 'Terms of service', nl: 'Voorwaarden' },
}

/** Data for scripts/generate-og-images.mjs (one branded 1200×630 card per section and language). */
export function getOgSpecs() {
  const specs: { slug: string; lang: 'en' | 'nl'; label: string; title: string; path: string }[] = []
  for (const [path, slug] of Object.entries(OG_IMAGE_SECTIONS)) {
    for (const locale of ['en', 'nl-BE'] as AppLocale[]) {
      const lang = locale === 'nl-BE' ? 'nl' : 'en'
      const m = getMessages(locale)
      const route = m.seo.routes[path as keyof typeof m.seo.routes] as { title: string } | undefined
      const title = slug === 'ai-talks' ? m.aiTalks.hero.title : route?.title ?? m.seo.tagline
      specs.push({ slug, lang, label: LABELS[slug]?.[lang] ?? slug, title, path: lang === 'nl' ? (path === '/' ? '/nl' : `/nl${path}`) : path })
    }
  }
  return specs
}
