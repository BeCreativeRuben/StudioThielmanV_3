import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { AppLocale } from './config'
import { LOCALE_COOKIE } from './config'
import { getMessages, type Messages } from './messages'
import { alternateLocalePath, getLocaleFromPathname, localizedPath, stripLocalePrefix } from './paths'

interface LocaleContextValue {
  locale: AppLocale
  pathWithoutLocale: string
  t: (key: string) => string
  messages: Messages
  localizedPath: (path: string) => string
  switchLocale: (target: AppLocale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function resolveKey(messages: Messages, key: string): string {
  const parts = key.split('.')
  let current: unknown = messages
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return key
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === 'string' ? current : key
}

function setLocaleCookie(locale: AppLocale) {
  const value = locale === 'nl-BE' ? 'nl' : 'en'
  document.cookie = `${LOCALE_COOKIE}=${value};path=/;max-age=31536000;SameSite=Lax`
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const locale = getLocaleFromPathname(pathname)
  const pathWithoutLocale = stripLocalePrefix(pathname)
  const messages = getMessages(locale)

  const t = useCallback((key: string) => resolveKey(messages, key), [messages])

  const lp = useCallback((path: string) => localizedPath(path, locale), [locale])

  const switchLocale = useCallback(
    (target: AppLocale) => {
      setLocaleCookie(target)
      navigate(alternateLocalePath(pathname, target))
    },
    [navigate, pathname]
  )

  const value = useMemo(
    () => ({
      locale,
      pathWithoutLocale,
      t,
      messages,
      localizedPath: lp,
      switchLocale,
    }),
    [locale, pathWithoutLocale, t, messages, lp, switchLocale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function useT() {
  return useLocale().t
}
