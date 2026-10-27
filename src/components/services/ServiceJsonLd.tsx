import { Helmet } from 'react-helmet-async'
import { BUSINESS, SITE_NAME, SITE_URL } from '../../seo/site'
import { canonicalUrl } from '../../seo/routes'
import { useLocale } from '../../i18n/LocaleProvider'
import { LOCALE_HTML_LANG } from '../../i18n/config'
import { localizedPath } from '../../i18n/paths'

type Faq = { question: string; answer: string }
type Offer = {
  name: string
  price?: string
  priceCurrency?: string
  description?: string
  /** When price is TBD / free call, omit numeric Offer */
  priceNumeric?: number
}

type Props = {
  /** Internal EN path, e.g. /websites */
  path: string
  serviceName: string
  serviceDescription: string
  faqs?: readonly Faq[]
  offers?: readonly Offer[]
  breadcrumbName: string
}

/** Per-service JSON-LD: Service (+ Offers when priced), FAQPage, BreadcrumbList. */
export default function ServiceJsonLd({
  path,
  serviceName,
  serviceDescription,
  faqs,
  offers,
  breadcrumbName,
}: Props) {
  const { locale } = useLocale()
  const pageUrl = canonicalUrl(localizedPath(path, locale))
  const homeUrl = canonicalUrl(localizedPath('/', locale))
  const inLanguage = LOCALE_HTML_LANG[locale]

  const graphs: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description: serviceDescription,
      url: pageUrl,
      inLanguage,
      provider: {
        '@type': 'ProfessionalService',
        name: SITE_NAME,
        url: SITE_URL,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.address.street,
          postalCode: BUSINESS.address.postalCode,
          addressLocality: BUSINESS.address.locality,
          addressCountry: 'BE',
        },
        areaServed: { '@type': 'AdministrativeArea', name: 'Oost-Vlaanderen' },
      },
      areaServed: [
        { '@type': 'City', name: 'Lokeren' },
        { '@type': 'AdministrativeArea', name: 'Oost-Vlaanderen' },
        { '@type': 'Country', name: 'BE' },
      ],
      ...(offers && offers.length
        ? {
            offers: offers
              .filter((o) => typeof o.priceNumeric === 'number')
              .map((o) => ({
                '@type': 'Offer',
                name: o.name,
                price: o.priceNumeric,
                priceCurrency: o.priceCurrency || 'EUR',
                description: o.description || o.price,
                url: pageUrl,
              })),
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: breadcrumbName, item: pageUrl },
      ],
    },
  ]

  if (faqs && faqs.length) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return (
    <Helmet>
      {graphs.map((graph, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(graph)}
        </script>
      ))}
    </Helmet>
  )
}
