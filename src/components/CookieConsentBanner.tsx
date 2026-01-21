import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

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

  // Fallback: queue into dataLayer if gtag isn't ready yet
  const dataLayer = ((window as any).dataLayer ||= [])
  dataLayer.push(['consent', 'update', update])
}

export default function CookieConsentBanner() {
  const savedChoice = useMemo(() => getStoredChoice(), [])
  const [isOpen, setIsOpen] = useState(savedChoice === null)

  useEffect(() => {
    const onOpen = () => setIsOpen(true)
    window.addEventListener(OPEN_EVENT_NAME, onOpen)
    return () => window.removeEventListener(OPEN_EVENT_NAME, onOpen)
  }, [])

  // Ensure consent state matches persisted choice on boot
  useEffect(() => {
    if (savedChoice) {
      updateGtagConsent(savedChoice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-700">
            <div className="font-semibold text-gray-900">Cookies & tracking</div>
            <p className="mt-1 text-gray-600">
              We use cookies to measure site usage and improve performance. You can accept all cookies or reject them.
              See our{' '}
              <Link to="/privacy" className="font-semibold underline hover:no-underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={rejectAll}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="w-full rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 sm:w-auto"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

