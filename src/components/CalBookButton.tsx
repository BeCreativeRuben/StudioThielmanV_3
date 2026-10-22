import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
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
 * Opens Cal.com in a modal on click. The embed script is not loaded until then.
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

  if (!calLink) {
    return (
      <LocalizedLink to={fallbackTo} className={className} onClick={onClick as () => void}>
        {children}
      </LocalizedLink>
    )
  }

  const open = async () => {
    onClick?.()
    const { getCalApi } = await import('@calcom/embed-react')
    const cal = await getCalApi()
    cal('ui', {
      theme: 'light',
      cssVarsPerTheme: {
        light: { 'cal-brand': '#111111' },
        dark: { 'cal-brand': '#111111' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
    const config: Record<string, string> = {
      layout: 'month_view',
      theme: 'light',
      locale: locale === 'nl-BE' ? 'nl' : 'en',
    }
    if (notes) config.notes = notes
    if (metadata) {
      for (const [key, value] of Object.entries(metadata)) {
        config[`metadata[${key}]`] = value
      }
    }
    cal('modal', { calLink, config })
  }

  // A wrapper <button> around a button child is invalid HTML. The parser closes the
  // outer button, so hydration cannot match. Attach the handler to the child instead.
  if (isValidElement(children)) {
    const child = children as ReactElement<{ onClick?: (event: unknown) => void }>
    return cloneElement(child, {
      onClick: (event: unknown) => {
        child.props.onClick?.(event)
        void open()
      },
    })
  }

  return (
    <button type="button" className={className} onClick={() => void open()}>
      {children}
    </button>
  )
}
