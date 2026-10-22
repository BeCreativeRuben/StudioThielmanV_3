import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleProvider'
import { LOCALE_HTML_LANG } from '../i18n/config'
import { stripLocalePrefix } from '../i18n/paths'
import { getBlogPostBySlug } from '../data/blog'
import { getPortfolioItemBySlug } from '../data/portfolio'
import { BUSINESS, SITE_NAME, SITE_URL } from '../seo/site'
import { canonicalUrl } from '../seo/routes'
import { blogDateToIso } from '../seo/dates'
import { localizedPath } from '../i18n/paths'

type Faq = { question: string; answer: string }

function faqGraph(items: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export default function StructuredData() {
  const { pathname } = useLocation()
  const { locale, messages } = useLocale()
  const inLanguage = LOCALE_HTML_LANG[locale]
  const areaServed = messages.seo.structured.areaServed
  const serviceDescription = messages.seo.structured.serviceDescription
  const path = stripLocalePrefix(pathname)

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    taxID: BUSINESS.enterpriseNumber,
    vatID: BUSINESS.vatNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      postalCode: BUSINESS.address.postalCode,
      addressLocality: BUSINESS.address.locality,
      addressCountry: 'BE',
    },
    areaServed,
    sameAs: [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.linkedIn],
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
    taxID: BUSINESS.enterpriseNumber,
    vatID: BUSINESS.vatNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      postalCode: BUSINESS.address.postalCode,
      addressLocality: BUSINESS.address.locality,
      addressCountry: 'BE',
    },
    areaServed: {
      '@type': 'Country',
      name: locale === 'nl-BE' ? 'Belgium' : 'Worldwide',
    },
    priceRange: '€€',
    description: serviceDescription,
  }

  const graphs: object[] = [organization, website, professionalService]

  if (path === '/packages') {
    graphs.push(faqGraph(messages.packages.faqs))
  }
  if (path === '/workshops') {
    graphs.push(faqGraph(messages.workshops.hub.faq.items))
  }

  const portfolioMatch = path.match(/^\/portfolio\/([^/]+)$/)
  if (portfolioMatch) {
    const project = getPortfolioItemBySlug(portfolioMatch[1], locale)
    if (project && !project.comingSoon) {
      const pageUrl = canonicalUrl(localizedPath(path, locale))
      const image = project.screenshots[0]
      graphs.push({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: pageUrl,
        image: image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : undefined,
        creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        author: { '@type': 'Person', name: 'Ruben Thielman' },
        inLanguage,
      })
    }
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const post = getBlogPostBySlug(blogMatch[1], locale === 'nl-BE' ? 'nl-BE' : 'en')
    if (post) {
      const pageUrl = canonicalUrl(localizedPath(path, locale))
      const image = post.featuredImage
      const datePublished = blogDateToIso(post.date)
      graphs.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-image.png`,
        datePublished,
        author: { '@type': 'Person', name: 'Ruben Thielman' },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` },
        },
        inLanguage,
      })
    }
  }

  return (
    <Helmet>
      {graphs.map((graph, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(graph)}
        </script>
      ))}
    </Helmet>
  )
}
