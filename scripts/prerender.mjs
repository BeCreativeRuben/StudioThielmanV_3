/**
 * Writes one static HTML file per sitemap route (EN + /nl) into dist/, with that route's own
 * <title>, description, canonical, hreflang, Open Graph / Twitter tags and JSON-LD, so social
 * link-preview bots (LinkedIn, Facebook, WhatsApp, X, Slack) and crawlers see the right tags
 * without executing JavaScript. Selected routes also get their full body prerendered.
 *
 * dist/index.html becomes the prerendered home page; the untouched SPA shell is kept as
 * dist/app-shell.html and serves every other (client-only) route via vercel.json.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = join(root, 'dist')
const SITE_URL = 'https://studiothielman.com'

const { renderRoute } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-prerender.js')).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
writeFileSync(join(dist, 'app-shell.html'), template)

// Head tags in index.html that each route replaces with its own.
const STRIP = [
  /\s*<title>[\s\S]*?<\/title>/,
  /\s*<meta name="description"[^>]*>/,
  /\s*<!-- Open Graph \/ Facebook -->/,
  /\s*<meta property="og:[^"]+"[^>]*>/g,
  /\s*<!-- Twitter -->/,
  /\s*<meta name="twitter:[^"]+"[^>]*>/g,
]

const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8')
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const p = m[1].replace(SITE_URL, '')
  return p === '' ? '/' : p
})

function abs(path) {
  return 'https://studiothielman.com' + (path === '/' ? '' : path)
}

function hasAlternate(head, hrefLang, href) {
  return [...head.matchAll(/<link\b[^>]*>/g)].some((match) => {
    const tag = match[0]
    const lang = tag.includes(`hrefLang="${hrefLang}"`) || tag.includes(`hreflang="${hrefLang}"`)
    return tag.includes('rel="alternate"') && lang && tag.includes(`href="${href}"`)
  })
}

function assertSeo(path, { robots, canonical, hreflangEn, hreflangNl }) {
  const { head } = renderRoute(path)
  const actualRobots = head.match(/name="robots" content="([^"]+)"/)?.[1]
  const problems = []
  if (actualRobots !== robots) problems.push(`robots ${actualRobots ?? '(missing)'} !== ${robots}`)
  if (canonical && !head.includes(`href="${canonical}"`)) problems.push(`missing canonical ${canonical}`)
  if (hreflangEn && hreflangNl) {
    if (!hasAlternate(head, 'en', abs(hreflangEn))) problems.push(`missing en hreflang ${abs(hreflangEn)}`)
    if (!hasAlternate(head, 'nl-BE', abs(hreflangNl))) problems.push(`missing nl hreflang ${abs(hreflangNl)}`)
    if (!hasAlternate(head, 'x-default', abs(hreflangEn))) problems.push(`missing x-default ${abs(hreflangEn)}`)
  } else if (/rel="alternate"/.test(head)) {
    problems.push('unexpected hreflang on a page without an indexable counterpart')
  }
  if (problems.length) {
    console.error(`SEO check failed for ${path}:\n  ${problems.join('\n  ')}\n${head}`)
    process.exit(1)
  }
}

const IMPACT = 'hoe-wij-impact-maken-ons-proces-voor-succesvolle-digitale-projecten'
const VISIBILITY = 'waarom-website-online-zichtbaarheid-niet-meer-mogen-ontbreken'
for (const slug of [IMPACT, VISIBILITY]) {
  if (!paths.includes(`/blog/${slug}`) || !paths.includes(`/nl/blog/${slug}`)) {
    console.error(`Sitemap is missing an indexable blog URL for ${slug}`)
    process.exit(1)
  }
  assertSeo(`/blog/${slug}`, {
    robots: 'index, follow',
    canonical: `https://studiothielman.com/blog/${slug}`,
    hreflangEn: `/blog/${slug}`,
    hreflangNl: `/nl/blog/${slug}`,
  })
  assertSeo(`/nl/blog/${slug}`, {
    robots: 'index, follow',
    canonical: `https://studiothielman.com/nl/blog/${slug}`,
    hreflangEn: `/blog/${slug}`,
    hreflangNl: `/nl/blog/${slug}`,
  })
}
assertSeo('/', {
  robots: 'index, follow',
  canonical: 'https://studiothielman.com',
  hreflangEn: '/',
  hreflangNl: '/nl',
})
if (!paths.includes('/portfolio/beauty-by-tischa') || !paths.includes('/nl/portfolio/beauty-by-tischa')) {
  console.error('Sitemap is missing indexable portfolio URLs')
  process.exit(1)
}
assertSeo('/portfolio/beauty-by-tischa', {
  robots: 'index, follow',
  canonical: 'https://studiothielman.com/portfolio/beauty-by-tischa',
  hreflangEn: '/portfolio/beauty-by-tischa',
  hreflangNl: '/nl/portfolio/beauty-by-tischa',
})
assertSeo('/admin', { robots: 'noindex, nofollow' })
assertSeo('/hackers-and-ravers', { robots: 'noindex, nofollow' })
assertSeo('/nl/hackers-and-ravers', { robots: 'noindex, nofollow' })
assertSeo('/blog/this-post-does-not-exist', { robots: 'noindex, nofollow' })
assertSeo('/not-a-real-page', { robots: 'noindex, nofollow' })
if (paths.some((path) => path === '/admin' || path.includes('hackers-and-ravers'))) {
  console.error('Sitemap lists a noindex URL')
  process.exit(1)
}

let count = 0
for (const path of [...new Set(paths)]) {
  const { head, htmlAttributes, body } = renderRoute(path)
  let html = template
  for (const re of STRIP) html = html.replace(re, '')
  html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', (m) => `${m}\n    ${head}`)
  if (htmlAttributes) html = html.replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
  if (body) html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  const out = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  count++
}

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerendered ${count} routes (head tags${''} + full body for selected routes).`)
