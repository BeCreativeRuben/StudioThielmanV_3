import { getBlogPostBySlug } from '../data/blog'
import { getPortfolioItemBySlug } from '../data/portfolio'
import type { AppLocale } from '../i18n/config'
import { DEFAULT_LOCALE } from '../i18n/config'
import { localizedPath, stripLocalePrefix } from '../i18n/paths'
import { getMessages } from '../i18n/messages'
import { SITE_URL } from './site'
import { ogImageForPath } from './ogImages'

export interface PageSeoMeta {
  title: string
  description: string
  path: string
  noindex?: boolean
  ogImage?: string
  locale: AppLocale
  /** Set together, and only when that language version is an indexable 200 page. */
  alternateEnPath?: string
  alternateNlPath?: string
}

function pageTitle(siteName: string, primary: string): string {
  return `${primary} | ${siteName}`
}

/**
 * Localized paths that actually resolve to an indexable page.
 * A language is omitted when that version does not exist (or is intentionally noindex,
 * such as coming-soon portfolio items).
 */
function indexableLanguagePaths(strippedPath: string): { en?: string; nl?: string } {
  const en = localizedPath(strippedPath, 'en')
  const nl = localizedPath(strippedPath, 'nl-BE')

  const blogMatch = strippedPath.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const slug = blogMatch[1]
    return {
      en: getBlogPostBySlug(slug, 'en') ? en : undefined,
      nl: getBlogPostBySlug(slug, 'nl-BE') ? nl : undefined,
    }
  }

  const portfolioMatch = strippedPath.match(/^\/portfolio\/([^/]+)$/)
  if (portfolioMatch) {
    const slug = portfolioMatch[1]
    const enItem = getPortfolioItemBySlug(slug, 'en')
    const nlItem = getPortfolioItemBySlug(slug, 'nl-BE')
    return {
      en: enItem && !enItem.comingSoon ? en : undefined,
      nl: nlItem && !nlItem.comingSoon ? nl : undefined,
    }
  }

  const enRoutes = getMessages('en').seo.routes
  const nlRoutes = getMessages('nl-BE').seo.routes
  const key = strippedPath as keyof typeof enRoutes
  return {
    en: Object.prototype.hasOwnProperty.call(enRoutes, key) ? en : undefined,
    nl: Object.prototype.hasOwnProperty.call(nlRoutes, key) ? nl : undefined,
  }
}

/** hreflang only when both languages have an indexable page. A lone alternate has nothing to point at. */
function reciprocalAlternates(strippedPath: string): Pick<PageSeoMeta, 'alternateEnPath' | 'alternateNlPath'> {
  const versions = indexableLanguagePaths(strippedPath)
  if (!versions.en || !versions.nl) return {}
  return { alternateEnPath: versions.en, alternateNlPath: versions.nl }
}

export function resolvePageSeo(pathname: string): PageSeoMeta {
  const locale =
    pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl-BE' : DEFAULT_LOCALE
  const path = stripLocalePrefix(pathname.replace(/\/+$/, '') || '/')
  const messages = getMessages(locale)
  const siteName = messages.seo.siteName
  const routeMeta = messages.seo.routes[path as keyof typeof messages.seo.routes]
  const alternates = reciprocalAlternates(path)

  const portfolioMatch = path.match(/^\/portfolio\/([^/]+)$/)
  if (portfolioMatch) {
    const slug = portfolioMatch[1]
    const project = getPortfolioItemBySlug(slug, locale)
    if (project && !project.comingSoon) {
      return {
        path: localizedPath(path, locale),
        locale,
        ...alternates,
        title: pageTitle(siteName, project.title),
        description: project.description,
        ogImage: project.screenshots[0]?.startsWith('http') ? project.screenshots[0] : ogImageForPath(path, locale),
      }
    }
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const slug = blogMatch[1]
    const post = getBlogPostBySlug(slug, locale === 'nl-BE' ? 'nl-BE' : 'en')
    if (post) {
      return {
        path: localizedPath(path, locale),
        locale,
        ...alternates,
        title: pageTitle(siteName, post.title),
        description: post.excerpt,
        ogImage: post.featuredImage || ogImageForPath(path, locale),
      }
    }
  }

  if (routeMeta) {
    return {
      path: localizedPath(path, locale),
      locale,
      ...alternates,
      title: pageTitle(siteName, routeMeta.title),
      description: routeMeta.description,
      ogImage: ogImageForPath(path, locale),
    }
  }

  if (path === '/admin') {
    return {
      path,
      locale,
      title: pageTitle(siteName, 'Admin'),
      description: 'Studio Thielman admin area.',
      noindex: true,
    }
  }

  if (path === '/hackers-and-ravers') {
    const h = messages.hackersAndRavers
    return {
      path: localizedPath(path, locale),
      locale,
      title: pageTitle(siteName, h.seo.title),
      description: h.seo.description,
      ogImage: '/images/portfolio/hackers-and-ravers/team.webp',
      noindex: true,
    }
  }

  return {
    path: localizedPath(path, locale),
    locale,
    title: pageTitle(siteName, messages.seo.tagline),
    description: messages.seo.defaultDescription,
    noindex: true,
  }
}

export function canonicalUrl(path: string): string {
  const normalized = path === '/' ? '' : path
  return `${SITE_URL}${normalized}`
}
