import { getBlogPostBySlug } from '../data/blog'
import { getPortfolioItemBySlug } from '../data/portfolio'
import type { AppLocale } from '../i18n/config'
import { DEFAULT_LOCALE } from '../i18n/config'
import { localizedPath, stripLocalePrefix } from '../i18n/paths'
import { getMessages } from '../i18n/messages'
import { SITE_URL } from './site'
import { ogImageForPath } from './ogImages'
import { fitMeta, pageTitle } from './text'

function absoluteImage(src?: string): string | undefined {
  if (!src) return undefined
  if (src.startsWith('http')) return src
  if (src.startsWith('/')) return `${SITE_URL}${src}`
  return undefined
}

export interface PageSeoMeta {
  title: string
  description: string
  path: string
  noindex?: boolean
  ogImage?: string
  ogType?: 'website' | 'article'
  locale: AppLocale
  /** Set together, and only when that language version is an indexable page. */
  alternateEnPath?: string
  alternateNlPath?: string
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
      const detailPath = `/portfolio/${slug}`
      return {
        path: localizedPath(detailPath, locale),
        locale,
        ...alternates,
        title: pageTitle(siteName, project.title),
        description: fitMeta(project.description, 155),
        ogImage: absoluteImage(project.screenshots[0]) || ogImageForPath(path, locale),
      }
    }
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const slug = blogMatch[1]
    const enPost = getBlogPostBySlug(slug, 'en')
    const nlPost = getBlogPostBySlug(slug, 'nl-BE')
    const post = locale === 'nl-BE' ? nlPost : enPost
    if (post) {
      const detailPath = `/blog/${slug}`
      return {
        path: localizedPath(detailPath, locale),
        locale,
        ...alternates,
        title: pageTitle(siteName, post.title),
        description: fitMeta(post.excerpt, 155),
        ogImage: absoluteImage(post.featuredImage) || ogImageForPath(path, locale),
        ogType: 'article',
      }
    }
  }

  if (routeMeta) {
    return {
      path: localizedPath(path, locale),
      locale,
      ...alternates,
      title: pageTitle(siteName, routeMeta.title),
      description: fitMeta(routeMeta.description, 155),
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
      description: fitMeta(h.seo.description, 155),
      ogImage: '/images/portfolio/hackers-and-ravers/team.webp',
      noindex: true,
    }
  }

  return {
    path: localizedPath(path, locale),
    locale,
    title: pageTitle(siteName, messages.common.notFound?.title || 'Page not found'),
    description: messages.common.notFound?.body || messages.seo.defaultDescription,
    noindex: true,
  }
}

export function canonicalUrl(path: string): string {
  const normalized = path === '/' ? '' : path
  return `${SITE_URL}${normalized}`
}
