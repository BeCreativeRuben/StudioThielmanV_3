import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://studiothielman.com'
const NL_PREFIX = '/nl'

const staticPaths = [
  '/',
  '/packages',
  '/portfolio',
  '/blog',
  '/current-projects',
  '/how-it-works',
  '/about',
  '/contact',
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

function parsePortfolioSlugs(portfolioSource) {
  const source = normalize(portfolioSource)
  const start = source.indexOf('export const portfolioItems')
  const end = source.indexOf('export const getPortfolioItemBySlug', start)
  const block = source.slice(start, end)
  return extractSlugsFromBlock(block, { skipComingSoon: true })
}

function parseVisibleBlogSlugs(blogSource) {
  const source = normalize(blogSource)
  const markers = ['export const newBlogPosts', 'export const blogPosts']
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

function urlEntry(path, changefreq, priority) {
  const loc = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const portfolioSource = readFileSync(join(process.cwd(), 'src/data/portfolio.ts'), 'utf8')
const blogSource =
  readFileSync(join(process.cwd(), 'src/data/blog.ts'), 'utf8') +
  readFileSync(join(process.cwd(), 'src/data/blog/newPosts.ts'), 'utf8')

const portfolioSlugs = parsePortfolioSlugs(portfolioSource)
const blogSlugs = parseVisibleBlogSlugs(blogSource)

const allPaths = [
  ...staticPaths,
  ...staticPaths.map((p) => (p === '/' ? NL_PREFIX : `${NL_PREFIX}${p}`)),
  ...portfolioSlugs.map((slug) => `/portfolio/${slug}`),
  ...portfolioSlugs.map((slug) => `${NL_PREFIX}/portfolio/${slug}`),
  ...blogSlugs.map((slug) => `${NL_PREFIX}/blog/${slug}`),
]

const urls = allPaths.map((path) =>
  urlEntry(path, path === '/' || path === NL_PREFIX ? 'weekly' : 'monthly', path === '/' || path === NL_PREFIX ? '1.0' : path.includes('/blog/') ? '0.6' : '0.8')
)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outPath = join(process.cwd(), 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf8')
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`)
