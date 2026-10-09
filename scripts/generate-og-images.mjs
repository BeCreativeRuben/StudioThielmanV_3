/**
 * Generates branded Open Graph cards (1200×630 JPEG, <300 KB for WhatsApp) into public/og/<slug>.<lang>.jpg.
 * Not part of the Vercel build: run locally after changing route titles, then commit the PNGs.
 *
 *   npx vite build --ssr src/entry-prerender.tsx --outDir dist-ssr --emptyOutDir
 *   PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node scripts/generate-og-images.mjs
 */
import { readFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const { getOgSpecs } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-prerender.js')).href)

const b64 = (p, mime) => `data:${mime};base64,${readFileSync(join(root, p)).toString('base64')}`
const mark = b64('public/images/ai-talks/st-mark-light.png', 'image/png')
const stage = b64('public/images/ai-talks/ruben-thielman-ai-spreker-podium-960.webp', 'image/webp')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function card({ label, title, path, slug }) {
  const withPhoto = slug === 'ai-talks'
  const size = title.length > 60 ? 54 : title.length > 40 ? 62 : 70
  return `<html><body style="margin:0;width:1200px;height:630px;background:#000;color:#fff;font-family:-apple-system,'Segoe UI','Helvetica Neue',Arial,sans-serif;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;opacity:.14;background-image:linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse at 25% 30%,black 15%,transparent 75%)"></div>
  ${withPhoto ? `<img src="${stage}" style="position:absolute;right:0;top:0;height:630px;width:560px;object-fit:cover;object-position:35% 30%"><div style="position:absolute;right:0;top:0;height:630px;width:560px;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,0) 40%)"></div>` : `<div style="position:absolute;top:-200px;right:-160px;width:560px;height:560px;border-radius:50%;background:rgba(255,255,255,.10);filter:blur(60px)"></div>`}
  <div style="position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:16px">
    <img src="${mark}" style="height:54px"><div style="font-weight:700;font-size:24px;letter-spacing:-.01em">STUDIO THIELMAN</div></div>
  <div style="position:absolute;left:72px;top:190px;width:${withPhoto ? 600 : 1000}px">
    <div style="font-family:'Courier New',monospace;font-size:20px;letter-spacing:.2em;color:rgba(255,255,255,.65);margin-bottom:24px;text-transform:uppercase">${esc(label)}</div>
    <div style="font-size:${withPhoto ? Math.min(size, 56) : size}px;font-weight:700;line-height:1.06;letter-spacing:-.02em">${esc(title)}</div></div>
  <div style="position:absolute;left:72px;bottom:56px;font-size:21px;color:rgba(255,255,255,.7)">studiothielman.com${path === '/' ? '' : esc(path)}</div>
</body></html>`
}

mkdirSync(join(root, 'public', 'og'), { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const spec of getOgSpecs()) {
  await page.setContent(card(spec), { waitUntil: 'load' })
  await page.screenshot({ path: join(root, 'public', 'og', `${spec.slug}.${spec.lang}.jpg`), type: 'jpeg', quality: 86 })
}
await browser.close()
console.log(`Generated ${getOgSpecs().length} OG images in public/og/`)
