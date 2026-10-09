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
