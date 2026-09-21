import { useEffect, useMemo, useState } from 'react'
import { useLocale } from '../i18n/LocaleProvider'
import LocalizedLink from '../i18n/LocalizedLink'

type ConsentChoice = 'accept' | 'reject'

const STORAGE_KEY = 'st_cookie_consent_v1'
const OPEN_EVENT_NAME = 'st:open-cookie-preferences'
export const COOKIE_BANNER_STATE_EVENT = 'st:cookie-banner-state'

function setStoredChoice(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // ignore (private mode / blocked storage)
  }
}

function getStoredChoice(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'accept' || value === 'reject' ? value : null
  } catch {
    return null
  }
}

function updateGtagConsent(choice: ConsentChoice) {
  const update =
    choice === 'accept'
      ? {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        }
      : {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        }

  const gtag = (window as any).gtag as undefined | ((...args: any[]) => void)
  if (typeof gtag === 'function') {
    gtag('consent', 'update', update)
    return
  }

  const dataLayer = ((window as any).dataLayer ||= [])
  dataLayer.push(['consent', 'update', update])
}

function publishBannerState(open: boolean) {
  document.documentElement.dataset.cookieBanner = open ? 'open' : 'closed'
  window.dispatchEvent(new CustomEvent(COOKIE_BANNER_STATE_EVENT, { detail: { open } }))
}

export default function CookieConsentBanner() {
  const { t } = useLocale()
  const savedChoice = useMemo(() => getStoredChoice(), [])
  const [isOpen, setIsOpen] = useState(savedChoice === null)

  useEffect(() => {
    const onOpen = () => setIsOpen(true)
    window.addEventListener(OPEN_EVENT_NAME, onOpen)
    return () => window.removeEventListener(OPEN_EVENT_NAME, onOpen)
  }, [])

  useEffect(() => {
    if (savedChoice) {
      updateGtagConsent(savedChoice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    publishBannerState(isOpen)
    return () => {
      publishBannerState(false)
    }
  }, [isOpen])

  const acceptAll = () => {
    setStoredChoice('accept')
    updateGtagConsent('accept')
    setIsOpen(false)
  }

  const rejectAll = () => {
    setStoredChoice('reject')
    updateGtagConsent('reject')
    setIsOpen(false)
  }

  if (!isOpen) return null

  // z-30: below header (z-50) and primary page CTAs; left-aligned so chat (right) stays free.
  // Bottom padding on html[data-cookie-banner=open] keeps footer Cookie Preferences clickable.
  return (
    <div
      className="fixed bottom-0 left-0 z-30 w-full max-w-xl px-4 pb-4 pointer-events-none sm:pb-6"
      role="dialog"
      aria-label={t('common.cookie.title')}
    >
      <div className="pointer-events-auto rounded-xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          <div className="text-sm text-gray-700">
            <div className="font-semibold text-gray-900">{t('common.cookie.title')}</div>
            <p className="mt-1 text-gray-600">
              {t('common.cookie.description')}{' '}
              <LocalizedLink to="/privacy" className="font-semibold underline hover:no-underline">
                {t('common.cookie.privacyLink')}
              </LocalizedLink>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={rejectAll}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              {t('common.cookie.reject')}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="w-full rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 sm:w-auto"
            >
              {t('common.cookie.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
