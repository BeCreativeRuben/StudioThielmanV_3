import { useEffect, useState } from 'react'
const logoImage = '/images/ai-talks/st-mark-light.png'
import LanguageSwitcher from '../LanguageSwitcher'
import LocalizedLink from '../../i18n/LocalizedLink'
import { useLocale } from '../../i18n/LocaleProvider'
import { scrollToSection } from './scroll'

/** Dedicated header for the AI talks shell: own nav (in-page anchors), language switch, request CTA. */
export default function AiTalksHeader() {
  const { messages, t } = useLocale()
  const s = messages.aiTalks.shell
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'audiences', label: s.nav.audiences },
    { id: 'themes', label: s.nav.themes },
    { id: 'formats', label: s.nav.formats },
    { id: 'process', label: s.nav.process },
    { id: 'about', label: s.nav.about },
    { id: 'faq', label: s.nav.faq },
  ]

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-black/90 backdrop-blur border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <LocalizedLink to="/ai-talks" className="flex items-center gap-3 text-white min-w-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logoImage} alt={t('common.a11y.logoAlt')} className="h-9 md:h-10 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-bold tracking-tight text-sm md:text-base">STUDIO THIELMAN</span>
            <span className="font-mono text-[11px] md:text-xs tracking-[0.25em] text-white/60 mt-1">{s.brandTag}</span>
          </span>
        </LocalizedLink>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => go(l.id)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="text-white hidden sm:flex" />
          <button
            type="button"
            onClick={() => go('request')}
            className="hidden sm:inline-flex items-center rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            {s.navCta}
          </button>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 text-white"
            aria-label={s.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black px-4 pb-6 pt-2">
          <div className="flex flex-col">
            {links.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="text-left py-3 font-mono text-sm uppercase tracking-[0.18em] text-white/80 border-b border-white/10"
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 mt-5">
            <LanguageSwitcher className="text-white" />
            <button
              type="button"
              onClick={() => go('request')}
              className="inline-flex items-center rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold"
            >
              {s.navCta}
            </button>
          </div>
          <LocalizedLink to="/" className="block mt-5 text-sm text-white/60 hover:text-white">
            {s.backToStudio}
          </LocalizedLink>
        </div>
      )}
    </header>
  )
}
