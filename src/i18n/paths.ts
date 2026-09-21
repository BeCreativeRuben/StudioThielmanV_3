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

/** Localize a path, preserving ?query and #hash. */
export function localizedPath(path: string, locale: AppLocale): string {
  const raw = path.startsWith('/') ? path : `/${path}`
  const match = raw.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/)
  const pathname = match?.[1] || '/'
  const search = match?.[2] || ''
  const hash = match?.[3] || ''

  let localized: string
  if (locale === DEFAULT_LOCALE) {
    localized = pathname || '/'
  } else if (!pathname || pathname === '/') {
    localized = NL_ROUTE_PREFIX
  } else {
    localized = `${NL_ROUTE_PREFIX}${pathname}`
  }

  return `${localized}${search}${hash}`
}

export function alternateLocalePath(pathname: string, targetLocale: AppLocale): string {
  const base = stripLocalePrefix(pathname)
  return localizedPath(base, targetLocale)
}
