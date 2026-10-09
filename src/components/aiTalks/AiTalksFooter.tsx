const logoImage = '/images/ai-talks/st-mark-light.png'
import LocalizedLink from '../../i18n/LocalizedLink'
import { useLocale } from '../../i18n/LocaleProvider'
import { BUSINESS } from '../../seo/site'

/** Compact footer for the AI talks shell, linking back into the main Studio Thielman site. */
export default function AiTalksFooter() {
  const { messages, t } = useLocale()
  const f = messages.aiTalks.footer
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <img src={logoImage} alt={t('common.a11y.logoAlt')} className="h-10 w-auto" />
          <p className="text-sm text-white/60 max-w-xs">{f.tagline}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:justify-center">
          <li><LocalizedLink to="/" className="text-white/80 hover:text-white">{f.links.studio}</LocalizedLink></li>
          <li><LocalizedLink to="/workshops" className="text-white/80 hover:text-white">{f.links.workshops}</LocalizedLink></li>
          <li><LocalizedLink to="/contact" className="text-white/80 hover:text-white">{f.links.contact}</LocalizedLink></li>
          <li><LocalizedLink to="/privacy" className="text-white/80 hover:text-white">{f.links.privacy}</LocalizedLink></li>
        </ul>
        <div className="text-sm text-white/60 md:text-right space-y-1">
          <p><a href={`mailto:${BUSINESS.email}`} className="hover:text-white">{BUSINESS.email}</a></p>
          <p>{BUSINESS.address.street}, {BUSINESS.address.postalCode} {BUSINESS.address.locality}</p>
          <p>{f.companyNumber} {BUSINESS.enterpriseNumber}</p>
          <p className="pt-2 text-white/60">© {year} Studio Thielman</p>
        </div>
      </div>
    </footer>
  )
}
