import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { visibleBlogPosts } from '../src/data/blog'
import { portfolioItems } from '../src/data/portfolio'

const SITE_URL = 'https://studiothielman.com'

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

const lastmod = new Date().toISOString().slice(0, 10)

function urlEntry(path: string, changefreq: string, priority: string): string {
  const loc = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const urls: string[] = [
  ...staticPaths.map((path) =>
    urlEntry(path, path === '/' ? 'weekly' : 'monthly', path === '/' ? '1.0' : '0.8')
  ),
  ...portfolioItems
    .filter((item) => !item.comingSoon)
    .map((item) => urlEntry(`/portfolio/${item.slug}`, 'monthly', '0.7')),
  ...visibleBlogPosts.map((post) => urlEntry(`/blog/${post.slug}`, 'monthly', '0.6')),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outPath = join(process.cwd(), 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf8')
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`)
