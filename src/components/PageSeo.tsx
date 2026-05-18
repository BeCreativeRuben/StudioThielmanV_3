import { Helmet } from 'react-helmet-async'
import type { PageSeoMeta } from '../seo/routes'
import { canonicalUrl } from '../seo/routes'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../seo/site'
import { LOCALE_HTML_LANG, LOCALE_HREFLANG } from '../i18n/config'

interface PageSeoProps {
  meta: PageSeoMeta
}

export default function PageSeo({ meta }: PageSeoProps) {
  const canonical = canonicalUrl(meta.path)
  const ogImage = meta.ogImage?.startsWith('http')
    ? meta.ogImage
    : meta.ogImage
      ? `${SITE_URL}${meta.ogImage}`
      : DEFAULT_OG_IMAGE

  const enUrl = canonicalUrl(meta.alternateEnPath)
  const nlUrl = canonicalUrl(meta.alternateNlPath)
  const htmlLang = LOCALE_HTML_LANG[meta.locale]

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang={LOCALE_HREFLANG.en} href={enUrl} />
      <link rel="alternate" hrefLang={LOCALE_HREFLANG['nl-BE']} href={nlUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      {meta.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={meta.locale === 'nl-BE' ? 'nl_BE' : 'en_US'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
