/** Trim a meta string to `max` characters on a word boundary, keeping the leading keywords. */
export function fitMeta(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const slice = clean.slice(0, max)
  const space = slice.lastIndexOf(' ')
  const cut = (space >= Math.min(24, max - 8) ? slice.slice(0, space) : slice).replace(/[\s,;:|–—-]+$/u, '')
  return cut
}

export function pageTitle(siteName: string, primary: string): string {
  const suffix = ` | ${siteName}`
  const full = `${primary}${suffix}`
  if (full.length <= 60) return full
  const room = 60 - suffix.length
  if (room < 16) return fitMeta(full, 60)
  return `${fitMeta(primary, room)}${suffix}`
}
