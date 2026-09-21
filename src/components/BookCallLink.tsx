import type { ReactNode } from 'react'
import CalBookButton from './CalBookButton'

type BookCallLinkProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  fallbackTo?: string
}

/** "Book a Call" CTA — Cal.com modal when configured, else contact form. */
export default function BookCallLink({
  children,
  className,
  onClick,
  fallbackTo = '/contact#contact-form',
}: BookCallLinkProps) {
  return (
    <CalBookButton className={className} onClick={onClick} fallbackTo={fallbackTo}>
      {children}
    </CalBookButton>
  )
}

export function getBookingUrlOrNull(): string | null {
  const explicit = (import.meta.env.VITE_BOOKING_URL || '').trim()
  if (explicit) return explicit
  const link = (import.meta.env.VITE_CAL_LINK || '').trim().replace(/^\/+/, '')
  return link ? `https://cal.com/${link}` : null
}
