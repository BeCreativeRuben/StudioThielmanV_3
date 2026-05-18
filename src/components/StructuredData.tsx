import { Helmet } from 'react-helmet-async'
import { useLocale } from '../i18n/LocaleProvider'
import { LOCALE_HTML_LANG } from '../i18n/config'
import { BUSINESS, SITE_NAME, SITE_URL } from '../seo/site'

export default function StructuredData() {
  const { locale, messages } = useLocale()
  const inLanguage = LOCALE_HTML_LANG[locale]
  const areaServed = messages.seo.structured.areaServed
  const serviceDescription = messages.seo.structured.serviceDescription

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    areaServed,
    sameAs: [BUSINESS.instagram, BUSINESS.linkedIn],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  }

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    areaServed: {
      '@type': 'Country',
      name: locale === 'nl-BE' ? 'Belgium' : 'Worldwide',
    },
    priceRange: '€€',
    description: serviceDescription,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(professionalService)}</script>
    </Helmet>
  )
}
