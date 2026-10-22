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

/** hreflang only when the same page really exists in both locales. */
function alternates(path) {
  const en = enPathOf(path)
  let pair = staticPaths.includes(en)
  if (en.startsWith('/portfolio/')) {
    const slug = en.slice('/portfolio/'.length)
    pair = portfolioEn.has(slug) && portfolioNl.has(slug)
  } else if (en.startsWith('/blog/')) {
    const slug = en.slice('/blog/'.length)
    pair = blogEn.has(slug) && blogNl.has(slug)
  }
  if (!pair) return ''
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

const portfolioSlugs = [...new Set([...portfolioEn, ...portfolioNl])]

const allPaths = [
  ...staticPaths,
  ...staticPaths.map(nlPath),
  ...portfolioSlugs.filter((slug) => portfolioEn.has(slug)).map((slug) => `/portfolio/${slug}`),
  ...portfolioSlugs.filter((slug) => portfolioNl.has(slug)).map((slug) => `${NL_PREFIX}/portfolio/${slug}`),
  ...[...blogEn].map((slug) => `/blog/${slug}`),
  ...[...blogNl].map((slug) => `${NL_PREFIX}/blog/${slug}`),
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
