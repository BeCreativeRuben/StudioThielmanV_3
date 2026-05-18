import { useLocale } from '../i18n/LocaleProvider'
import LocalizedLink from '../i18n/LocalizedLink'

export default function Footer() {
  const { t } = useLocale()

  const openCookiePreferences = () => {
    window.dispatchEvent(new Event('st:open-cookie-preferences'))
  }

  const year = new Date().getFullYear()
  const copyright = t('common.footer.copyright').replace('{{year}}', String(year))

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{t('common.footer.contactLabel')}</div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">{t('common.footer.tagline')}</h3>
          <LocalizedLink to="/contact#contact-form">
            <button type="button" className="text-white font-semibold underline hover:no-underline transition-all hover:text-white/80">
              {t('common.footer.contactUs')}
            </button>
          </LocalizedLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-h4 text-white font-semibold mb-4">{t('common.footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedLink to="/about" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.footer.aboutUs')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/packages" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.footer.services')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/portfolio" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.footer.projects')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/blog" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.nav.blog')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-h4 text-white font-semibold mb-4">{t('common.footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedLink to="/#service-custom-web" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.footer.customWeb')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/#service-branding" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.footer.branding')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/#service-seo" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.footer.seo')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/#service-ecommerce" className="text-body text-white/80 hover:text-white transition-colors">
                  {t('common.footer.ecommerce')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-h4 text-white font-semibold mb-4">{t('common.footer.socialMedia')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://www.instagram.com/studio_thielman/" target="_blank" rel="noopener noreferrer" className="text-body text-white/80 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61586029966601" target="_blank" rel="noopener noreferrer" className="text-body text-white/80 hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://wa.me/32493505641" target="_blank" rel="noopener noreferrer" className="text-body text-white/80 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ruben-thielman-6a8963256/" target="_blank" rel="noopener noreferrer" className="text-body text-white/80 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-body-sm text-white/60">{copyright}</div>
          <div className="flex gap-6 flex-wrap justify-center">
            <LocalizedLink to="/privacy" className="text-body-sm text-white/60 hover:text-white transition-colors">
              {t('common.footer.privacy')}
            </LocalizedLink>
            <LocalizedLink to="/terms" className="text-body-sm text-white/60 hover:text-white transition-colors">
              {t('common.footer.terms')}
            </LocalizedLink>
            <button type="button" onClick={openCookiePreferences} className="text-body-sm text-white/60 hover:text-white transition-colors">
              {t('common.footer.cookies')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
