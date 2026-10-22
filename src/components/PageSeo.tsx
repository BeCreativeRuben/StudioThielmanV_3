import { Helmet } from 'react-helmet-async'
import type { PageSeoMeta } from '../seo/routes'
import { canonicalUrl } from '../seo/routes'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../seo/site'
import { LOCALE_HTML_LANG, LOCALE_HREFLANG } from '../i18n/config'
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '../seo/ogImages'

interface PageSeoProps {
  meta: PageSeoMeta
}

function imageSize(url: string): { width: number; height: number } {
  const width = url.match(/[?&]w=(\d+)/)?.[1]
  const height = url.match(/[?&]h=(\d+)/)?.[1]
  if (width && height) return { width: Number(width), height: Number(height) }
  return { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }
}

export default function PageSeo({ meta }: PageSeoProps) {
  const canonical = canonicalUrl(meta.path)
  const ogImage = meta.ogImage?.startsWith('http')
    ? meta.ogImage
    : meta.ogImage
      ? `${SITE_URL}${meta.ogImage}`
      : DEFAULT_OG_IMAGE

  const size = imageSize(ogImage)
  const htmlLang = LOCALE_HTML_LANG[meta.locale]
  const enUrl = meta.alternateEnPath ? canonicalUrl(meta.alternateEnPath) : undefined
  const nlUrl = meta.alternateNlPath ? canonicalUrl(meta.alternateNlPath) : undefined
  // Both targets must exist. x-default follows the English URL, which is only emitted in that pair.
  const emitHreflang = !meta.noindex && Boolean(enUrl && nlUrl)

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {!meta.noindex && <link rel="canonical" href={canonical} />}
      {emitHreflang && enUrl && nlUrl ? (
        <link rel="alternate" hrefLang={LOCALE_HREFLANG.en} href={enUrl} />
      ) : null}
      {emitHreflang && enUrl && nlUrl ? (
        <link rel="alternate" hrefLang={LOCALE_HREFLANG['nl-BE']} href={nlUrl} />
      ) : null}
      {emitHreflang && enUrl && nlUrl ? (
        <link rel="alternate" hrefLang="x-default" href={enUrl} />
      ) : null}
      {meta.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content={meta.ogType || 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={meta.locale === 'nl-BE' ? 'nl_BE' : 'en_US'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(size.width)} />
      <meta property="og:image:height" content={String(size.height)} />
      <meta property="og:image:alt" content={meta.title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
