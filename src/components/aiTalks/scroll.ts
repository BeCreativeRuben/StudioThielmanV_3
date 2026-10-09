/** Smooth-scroll to an in-page section of the AI talks shell (fixed header offset handled via scroll-mt). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (window.history?.replaceState) {
    window.history.replaceState(null, '', `#${id}`)
  }
}
