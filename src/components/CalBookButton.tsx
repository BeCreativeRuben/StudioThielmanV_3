import { useEffect, type ReactNode } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { getCalLink } from '../config/cal'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  fallbackTo?: string
  /** Prefills the "Additional notes" field in the Cal.com booking form (e.g. "Workshop incompany"). */
  notes?: string
  /** Extra booking metadata passed to Cal.com as metadata[key]=value. */
  metadata?: Record<string, string>
}

/**
 * Opens Cal.com booking UI (modal) via official data-cal-link attributes.
 * Falls back to the contact form when VITE_CAL_LINK / VITE_BOOKING_URL is unset.
 */
export default function CalBookButton({
  children,
  className,
  onClick,
  fallbackTo = '/contact#contact-form',
  notes,
  metadata,
}: Props) {
  const { locale } = useLocale()
  const calLink = getCalLink()

  useEffect(() => {
    if (!calLink) return
    void getCalApi().then((cal) => {
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#111111' },
          dark: { 'cal-brand': '#111111' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })
  }, [calLink])

  if (!calLink) {
    return (
      <LocalizedLink to={fallbackTo} className={className} onClick={onClick as any}>
        {children}
      </LocalizedLink>
    )
  }

  const configObject: Record<string, string> = {
    layout: 'month_view',
    theme: 'light',
    locale: locale === 'nl-BE' ? 'nl' : 'en',
  }
  if (notes) configObject.notes = notes
  if (metadata) {
    for (const [key, value] of Object.entries(metadata)) {
      configObject[`metadata[${key}]`] = value
    }
  }
  const config = JSON.stringify(configObject)

  return (
    <button
      type="button"
      className={className}
      data-cal-link={calLink}
      data-cal-config={config}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
