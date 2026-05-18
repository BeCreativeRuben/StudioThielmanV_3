import { getBlogPostBySlug } from '../data/blog'
import { getPortfolioItemBySlug } from '../data/portfolio'
import type { AppLocale } from '../i18n/config'
import { DEFAULT_LOCALE } from '../i18n/config'
import { localizedPath, stripLocalePrefix } from '../i18n/paths'
import { getMessages } from '../i18n/messages'
import { SITE_URL } from './site'

export interface PageSeoMeta {
  title: string
  description: string
  path: string
  noindex?: boolean
  ogImage?: string
  locale: AppLocale
  alternateEnPath: string
  alternateNlPath: string
}

function pageTitle(siteName: string, primary: string): string {
  return `${primary} | ${siteName}`
}

export function resolvePageSeo(pathname: string): PageSeoMeta {
  const locale =
    pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl-BE' : DEFAULT_LOCALE
  const path = stripLocalePrefix(pathname.replace(/\/+$/, '') || '/')
  const messages = getMessages(locale)
  const siteName = messages.seo.siteName
  const routeMeta = messages.seo.routes[path as keyof typeof messages.seo.routes]

  const alternateEnPath = localizedPath(path, 'en')
  const alternateNlPath = localizedPath(path, 'nl-BE')

  const portfolioMatch = path.match(/^\/portfolio\/([^/]+)$/)
  if (portfolioMatch) {
    const slug = portfolioMatch[1]
    const project = getPortfolioItemBySlug(slug)
    if (project && !project.comingSoon) {
      return {
        path: localizedPath(path, locale),
        locale,
        alternateEnPath,
        alternateNlPath,
        title: pageTitle(siteName, project.title),
        description: project.description,
        ogImage: project.screenshots[0]?.startsWith('http') ? project.screenshots[0] : undefined,
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
        alternateEnPath,
        alternateNlPath,
        title: pageTitle(siteName, post.title),
        description: post.excerpt,
        ogImage: post.featuredImage,
      }
    }
  }

  if (routeMeta) {
    return {
      path: localizedPath(path, locale),
      locale,
      alternateEnPath,
      alternateNlPath,
      title: pageTitle(siteName, routeMeta.title),
      description: routeMeta.description,
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

  return {
    path: localizedPath(path, locale),
    locale,
    alternateEnPath,
    alternateNlPath,
    title: pageTitle(siteName, messages.seo.tagline),
    description: messages.seo.defaultDescription,
    noindex: true,
  }
}

export function canonicalUrl(path: string): string {
  const normalized = path === '/' ? '' : path
  return `${SITE_URL}${normalized}`
}
