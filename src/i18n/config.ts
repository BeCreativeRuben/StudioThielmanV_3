export type AppLocale = 'en' | 'nl-BE'

export const DEFAULT_LOCALE: AppLocale = 'en'
export const NL_ROUTE_PREFIX = '/nl'
export const LOCALE_COOKIE = 'st_locale'

export const LOCALE_HTML_LANG: Record<AppLocale, string> = {
  en: 'en',
  'nl-BE': 'nl-BE',
}

export const LOCALE_HREFLANG: Record<AppLocale, string> = {
  en: 'en',
  'nl-BE': 'nl-BE',
}
