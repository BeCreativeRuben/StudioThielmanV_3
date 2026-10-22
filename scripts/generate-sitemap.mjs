import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://studiothielman.com'
const NL_PREFIX = '/nl'
/** Keep in sync with NL_SLUGS in src/i18n/paths.ts */
const NL_SLUGS = { '/group-workshop': '/groepsworkshop', '/ai-masterclass': '/masterclass-ai' }
const nlPath = (p) => (p === '/' ? NL_PREFIX : `${NL_PREFIX}${NL_SLUGS[p] ?? p}`)
const EN_FROM_NL = Object.fromEntries(Object.entries(NL_SLUGS).map(([en, nl]) => [nl, en]))

const staticPaths = [
  '/',
  '/packages',
  '/portfolio',
  '/blog',
  '/current-projects',
  '/how-it-works',
  '/reviews',
  '/about',
  '/contact',
  '/workshops',
  '/workshops/incompany',
  '/workshops/1-1',
  '/ai-talks',
  '/group-workshop',
  '/ai-masterclass',
  '/privacy',
  '/terms',
]

function normalize(source) {
  return source.replace(/\r\n/g, '\n')
}

function extractSlugsFromBlock(block, { skipComingSoon = false, respectVisibleFrom = false } = {}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const slugs = []
  const parts = block.split(/slug:\s*'/)

  for (let i = 1; i < parts.length; i++) {
    const slug = parts[i].split("'")[0]
    const segment = parts[i].slice(0, 4000)

    if (!slug) continue
    if (skipComingSoon && /comingSoon:\s*true/.test(segment)) continue

    if (respectVisibleFrom) {
      const visibleFrom = segment.match(/visibleFrom:\s*'([^']+)'/)?.[1]
      if (visibleFrom) {
        const visibleDate = new Date(visibleFrom)
        visibleDate.setHours(0, 0, 0, 0)
        if (today < visibleDate) continue
      }
    }

    slugs.push(slug)
  }

  return slugs
}

function parsePortfolioSlugs(filePath) {
  const source = normalize(readFileSync(join(process.cwd(), filePath), 'utf8'))
  const start = source.indexOf('export const portfolioItems')
  // Fall back to the whole file so a renamed export cannot drop case studies.
  const block = start === -1 ? source : source.slice(start)
  return extractSlugsFromBlock(block, { skipComingSoon: true })
}

function parseVisibleBlogSlugsFromFile(filePath) {
  const source = normalize(readFileSync(join(process.cwd(), filePath), 'utf8'))
  const markers = ['export const postsNl', 'export const postsEn', 'export const newBlogPosts', 'export const blogPosts']
  const slugs = []

  for (const marker of markers) {
    const start = source.indexOf(marker)
    if (start === -1) continue
    const end = source.indexOf('\n]', start)
    const block = end === -1 ? source.slice(start) : source.slice(start, end + 2)
    slugs.push(...extractSlugsFromBlock(block, { respectVisibleFrom: true }))
  }

  return [...new Set(slugs)]
}

const lastmod = new Date().toISOString().slice(0, 10)

const abs = (path) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)
const enPathOf = (path) => {
  if (path === NL_PREFIX) return '/'
  if (!path.startsWith(`${NL_PREFIX}/`)) return path
  const rest = path.slice(NL_PREFIX.length)
  return EN_FROM_NL[rest] ?? rest
}

/** hreflang only when both language versions are indexable pages included in this sitemap. */
function hasBothLanguages(en) {
  if (staticPaths.includes(en)) return true
  const blogSlug = en.match(/^\/blog\/([^/]+)$/)?.[1]
  if (blogSlug) return blogEn.has(blogSlug) && blogNl.has(blogSlug)
  const portfolioSlug = en.match(/^\/portfolio\/([^/]+)$/)?.[1]
  if (portfolioSlug) return portfolioEn.has(portfolioSlug) && portfolioNl.has(portfolioSlug)
  return false
}

function alternates(path) {
  const en = enPathOf(path)
  if (!hasBothLanguages(en)) return ''
  const nl = nlPath(en)
  return `
    <xhtml:link rel="alternate" hreflang="en" href="${abs(en)}"/>
    <xhtml:link rel="alternate" hreflang="nl-BE" href="${abs(nl)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(en)}"/>`
}

function urlEntry(path, changefreq, priority) {
  const loc = abs(path)
  return `  <url>
    <loc>${loc}</loc>${alternates(path)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const portfolioEn = new Set(parsePortfolioSlugs('src/data/portfolio/items.en.ts'))
const portfolioNl = new Set(parsePortfolioSlugs('src/data/portfolio/items.nl-BE.ts'))
const blogSlugsNl = [
  ...parseVisibleBlogSlugsFromFile('src/data/blog/posts.nl-BE.ts'),
  ...parseVisibleBlogSlugsFromFile('src/data/blog/posts.nl-BE.additional.ts'),
]
const blogSlugsEn = [
  ...parseVisibleBlogSlugsFromFile('src/data/blog/posts.en.ts'),
  ...parseVisibleBlogSlugsFromFile('src/data/blog/posts.en.additional.ts'),
]
const blogEn = new Set(blogSlugsEn)
const blogNl = new Set(blogSlugsNl)

/**
 * Permanent redirects for a URL whose only indexable version is the other language.
 * Keep in sync with vercel.json redirects (checked below).
 */
function requiredOneLanguageRedirects() {
  const required = []
  for (const slug of blogNl) {
    if (!blogEn.has(slug)) required.push({ source: `/blog/${slug}`, destination: `${NL_PREFIX}/blog/${slug}` })
  }
  for (const slug of blogEn) {
    if (!blogNl.has(slug)) required.push({ source: `${NL_PREFIX}/blog/${slug}`, destination: `/blog/${slug}` })
  }
  for (const slug of portfolioNl) {
    if (!portfolioEn.has(slug)) required.push({ source: `/portfolio/${slug}`, destination: `${NL_PREFIX}/portfolio/${slug}` })
  }
  for (const slug of portfolioEn) {
    if (!portfolioNl.has(slug)) required.push({ source: `${NL_PREFIX}/portfolio/${slug}`, destination: `/portfolio/${slug}` })
  }
  return required
}

const vercel = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'))
const permanentRedirects = new Set(
  (vercel.redirects ?? [])
    .filter((rule) => rule.permanent)
    .map((rule) => `${rule.source} -> ${rule.destination}`)
)
const missingRedirects = requiredOneLanguageRedirects().filter(
  (rule) => !permanentRedirects.has(`${rule.source} -> ${rule.destination}`)
)
if (missingRedirects.length) {
  console.error('Indexable pages that exist in only one language need a permanent redirect in vercel.json:')
  for (const rule of missingRedirects) console.error(`  ${rule.source} -> ${rule.destination}`)
  process.exit(1)
}

const allPaths = [
  ...staticPaths,
  ...staticPaths.map(nlPath),
  ...[...portfolioEn].map((slug) => `/portfolio/${slug}`),
  ...[...portfolioNl].map((slug) => `${NL_PREFIX}/portfolio/${slug}`),
  ...blogSlugsEn.map((slug) => `/blog/${slug}`),
  ...blogSlugsNl.map((slug) => `${NL_PREFIX}/blog/${slug}`),
]

const urls = allPaths.map((path) =>
  urlEntry(path, path === '/' || path === NL_PREFIX ? 'weekly' : 'monthly', path === '/' || path === NL_PREFIX ? '1.0' : path.endsWith('/ai-talks') ? '0.9' : /\/(group-workshop|groepsworkshop|ai-masterclass|masterclass-ai)$/.test(path) ? '0.7' : path.includes('/blog/') ? '0.6' : '0.8')
)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

const outPath = join(process.cwd(), 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf8')
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`)
