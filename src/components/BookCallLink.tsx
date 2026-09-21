import type { ReactNode, AnchorHTMLAttributes } from 'react'
import LocalizedLink from '../i18n/LocalizedLink'

const BOOKING_URL = (import.meta.env.VITE_BOOKING_URL || '').trim()

type BookCallLinkProps = {
  children: ReactNode
  className?: string
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
  /** Fallback contact path when VITE_BOOKING_URL is unset */
  fallbackTo?: string
}

/**
 * "Book a Call" CTA: uses VITE_BOOKING_URL when set (external booking page),
 * otherwise links to the contact form.
 */
export default function BookCallLink({
  children,
  className,
  onClick,
  fallbackTo = '/contact#contact-form',
}: BookCallLinkProps) {
  if (BOOKING_URL) {
    return (
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <LocalizedLink to={fallbackTo} className={className} onClick={onClick as any}>
      {children}
    </LocalizedLink>
  )
}

export function getBookingUrlOrNull(): string | null {
  return BOOKING_URL || null
}
