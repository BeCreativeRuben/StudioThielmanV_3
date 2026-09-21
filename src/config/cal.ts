/**
 * Cal.com booking config.
 * Prefer VITE_CAL_LINK (e.g. "username/30min"). Falls back to parsing VITE_BOOKING_URL.
 */
export function getCalLink(): string | null {
  const explicit = (import.meta.env.VITE_CAL_LINK || '').trim().replace(/^\/+/, '')
  if (explicit) return explicit

  const bookingUrl = (import.meta.env.VITE_BOOKING_URL || '').trim()
  if (!bookingUrl) return null

  try {
    const u = new URL(bookingUrl)
    if (!u.hostname.includes('cal.com')) return null
    const path = u.pathname.replace(/^\/+|\/+$/g, '')
    return path || null
  } catch {
    return null
  }
}

export function getCalBookingUrl(): string | null {
  const link = getCalLink()
  if (!link) {
    const bookingUrl = (import.meta.env.VITE_BOOKING_URL || '').trim()
    return bookingUrl || null
  }
  return `https://cal.com/${link}`
}
