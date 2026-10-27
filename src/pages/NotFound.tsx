import { Helmet } from 'react-helmet-async'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import Button from '../components/Button'

export default function NotFound() {
  const { t, messages } = useLocale()
  const title = `${t('common.notFound.title')} | ${messages.seo.siteName}`

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-32">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-white/60 uppercase tracking-wider mb-4">404</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('common.notFound.title')}</h1>
          <p className="text-xl text-white/80 mb-10">{t('common.notFound.body')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink to="/">
              <Button variant="secondary">{t('common.notFound.home')}</Button>
            </LocalizedLink>
            <LocalizedLink to="/websites#plannen">
              <Button variant="secondary">{t('common.notFound.packages')}</Button>
            </LocalizedLink>
            <LocalizedLink to="/contact">
              <Button variant="cta">{t('common.notFound.contact')}</Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  )
}
