import { AppLocale, DEFAULT_LOCALE, NL_ROUTE_PREFIX } from './config'

export function getLocaleFromPathname(pathname: string): AppLocale {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === NL_ROUTE_PREFIX || path.startsWith(`${NL_ROUTE_PREFIX}/`)) {
    return 'nl-BE'
  }
  return DEFAULT_LOCALE
}

export function stripLocalePrefix(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === NL_ROUTE_PREFIX) return '/'
  if (path.startsWith(`${NL_ROUTE_PREFIX}/`)) {
    return path.slice(NL_ROUTE_PREFIX.length) || '/'
  }
  return path
}

export function localizedPath(path: string, locale: AppLocale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return normalized
  if (normalized === '/') return NL_ROUTE_PREFIX
  return `${NL_ROUTE_PREFIX}${normalized}`
}

export function alternateLocalePath(pathname: string, targetLocale: AppLocale): string {
  const base = stripLocalePrefix(pathname)
  return localizedPath(base, targetLocale)
}
