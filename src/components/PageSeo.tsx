import { Helmet } from 'react-helmet-async'
import type { PageSeoMeta } from '../seo/routes'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../seo/site'

interface PageSeoProps {
  meta: PageSeoMeta
}

export default function PageSeo({ meta }: PageSeoProps) {
  const canonicalUrl = `${SITE_URL}${meta.path === '/' ? '' : meta.path}`
  const ogImage = meta.ogImage?.startsWith('http')
    ? meta.ogImage
    : meta.ogImage
      ? `${SITE_URL}${meta.ogImage}`
      : DEFAULT_OG_IMAGE

  return (
    <Helmet>
      <html lang="nl-BE" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonicalUrl} />
      {meta.noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
