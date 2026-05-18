import { Helmet } from 'react-helmet-async'
import { BUSINESS, SITE_NAME, SITE_URL } from '../seo/site'

export default function StructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    areaServed: BUSINESS.areaServed,
    sameAs: [BUSINESS.instagram, BUSINESS.linkedIn],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'nl-BE',
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
      name: 'Belgium',
    },
    priceRange: '€€',
    description:
      'Web design and development studio offering professional websites, SEO, and AI integrations for Belgian businesses.',
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(professionalService)}</script>
    </Helmet>
  )
}
