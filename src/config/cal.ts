/**
 * Cal.com booking config.
 * Prefer VITE_CAL_LINK (e.g. "username/30min"). Falls back to parsing VITE_BOOKING_URL,
 * then to Studio Thielman's public discovery call.
 */
const DEFAULT_CAL_LINK = 'ruben-thielman-a0h3f0/30min'

export function getCalLink(): string | null {
  const explicit = (import.meta.env.VITE_CAL_LINK || '').trim().replace(/^\/+/, '')
  if (explicit) return explicit

  const bookingUrl = (import.meta.env.VITE_BOOKING_URL || '').trim()
  if (bookingUrl) {
    try {
      const u = new URL(bookingUrl)
      if (u.hostname.includes('cal.com')) {
        const path = u.pathname.replace(/^\/+|\/+$/g, '')
        if (path) return path
      }
    } catch {
      // ignore
    }
  }

  return DEFAULT_CAL_LINK
}

export function getCalBookingUrl(): string | null {
  const link = getCalLink()
  return link ? `https://cal.com/${link}` : null
}
