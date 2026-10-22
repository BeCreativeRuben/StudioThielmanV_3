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
  /** Null when that language version does not exist (NL-only or EN-only URLs). */
  alternateEnPath: string | null
  alternateNlPath: string | null
}

export function resolvePageSeo(pathname: string): PageSeoMeta {
  const locale =
    pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl-BE' : DEFAULT_LOCALE
  const path = stripLocalePrefix(pathname.replace(/\/+$/, '') || '/')
  const messages = getMessages(locale)
  const siteName = messages.seo.siteName
  const routeMeta = messages.seo.routes[path as keyof typeof messages.seo.routes]

  const both = {
    alternateEnPath: localizedPath(path, 'en'),
    alternateNlPath: localizedPath(path, 'nl-BE'),
  }

  const portfolioMatch = path.match(/^\/portfolio\/([^/]+)$/)
  if (portfolioMatch) {
    const slug = portfolioMatch[1]
    const project = getPortfolioItemBySlug(slug, locale)
    const enProject = getPortfolioItemBySlug(slug, 'en')
    const nlProject = getPortfolioItemBySlug(slug, 'nl-BE')
    if (project && !project.comingSoon) {
      const detailPath = `/portfolio/${slug}`
      return {
        path: localizedPath(detailPath, locale),
        locale,
        alternateEnPath: enProject && !enProject.comingSoon ? localizedPath(detailPath, 'en') : null,
        alternateNlPath: nlProject && !nlProject.comingSoon ? localizedPath(detailPath, 'nl-BE') : null,
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
        alternateEnPath: enPost ? localizedPath(detailPath, 'en') : null,
        alternateNlPath: nlPost ? localizedPath(detailPath, 'nl-BE') : null,
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
      ...both,
      title: pageTitle(siteName, routeMeta.title),
      description: fitMeta(routeMeta.description, 155),
      ogImage: ogImageForPath(path, locale),
    }
  }

  if (path === '/admin') {
    return {
      path,
      locale,
      alternateEnPath: '/admin',
      alternateNlPath: '/admin',
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
      alternateEnPath: '/hackers-and-ravers',
      alternateNlPath: '/nl/hackers-and-ravers',
      title: pageTitle(siteName, h.seo.title),
      description: fitMeta(h.seo.description, 155),
      ogImage: '/images/portfolio/hackers-and-ravers/team.webp',
      noindex: true,
    }
  }

  return {
    path: localizedPath(path, locale),
    locale,
    alternateEnPath: null,
    alternateNlPath: null,
    title: pageTitle(siteName, messages.common.notFound?.title || 'Page not found'),
    description: messages.common.notFound?.body || messages.seo.defaultDescription,
    noindex: true,
  }
}

export function canonicalUrl(path: string): string {
  const normalized = path === '/' ? '' : path
  return `${SITE_URL}${normalized}`
}
