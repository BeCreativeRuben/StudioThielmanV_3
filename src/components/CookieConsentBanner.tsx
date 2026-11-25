import { useEffect, useState } from 'react'
import { useLocale } from '../i18n/LocaleProvider'
import LocalizedLink from '../i18n/LocalizedLink'
import { clearAnalyticsCookies, loadMailchimp } from '../utils/consent'

type ConsentChoice = 'accept' | 'reject'

const STORAGE_KEY = 'st_cookie_consent_v1'
const OPEN_EVENT_NAME = 'st:open-cookie-preferences'

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
          functionality_storage: 'granted',
          personalization_storage: 'granted',
        }
      : {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          functionality_storage: 'denied',
          personalization_storage: 'denied',
        }

  const gtag = (window as any).gtag as undefined | ((...args: any[]) => void)
  if (typeof gtag === 'function') {
    gtag('consent', 'update', update)
    return
  }

  const dataLayer = ((window as any).dataLayer ||= [])
  dataLayer.push(['consent', 'update', update])
}

/**
 * The banner is part of the prerendered HTML so first-time visitors see it with the first paint
 * (no late pop-in). For visitors who already chose, the inline script in index.html marks <html>
 * with `st-consent-chosen` before paint, which hides it via CSS until this component removes it.
 */
export default function CookieConsentBanner() {
  const { t } = useLocale()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const onOpen = () => {
      // Re-opened from "cookie preferences": make sure the pre-paint hide rule no longer applies.
      document.documentElement.classList.remove('st-consent-chosen')
      setIsOpen(true)
    }
    window.addEventListener(OPEN_EVENT_NAME, onOpen)
    return () => window.removeEventListener(OPEN_EVENT_NAME, onOpen)
  }, [])

  useEffect(() => {
    const savedChoice = getStoredChoice()
    if (savedChoice === 'accept') {
      updateGtagConsent('accept')
      loadMailchimp()
      setIsOpen(false)
      return
    }
    if (savedChoice === 'reject') {
      updateGtagConsent('reject')
      clearAnalyticsCookies()
      setIsOpen(false)
      return
    }
  }, [])

  const markChosen = () => {
    document.documentElement.classList.add('st-consent-chosen')
  }

  const acceptAll = () => {
    setStoredChoice('accept')
    markChosen()
    updateGtagConsent('accept')
    loadMailchimp()
    setIsOpen(false)
  }

  const rejectAll = () => {
    setStoredChoice('reject')
    markChosen()
    updateGtagConsent('reject')
    clearAnalyticsCookies()
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="st-cookie-banner fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
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
