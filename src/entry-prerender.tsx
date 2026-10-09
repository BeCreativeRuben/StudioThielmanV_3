/**
 * Build-time prerender entry (bundled with `vite build --ssr`, used by scripts/prerender.mjs).
 * - Every route: renders the existing <SeoRouteSync/> (title, meta, canonical, hreflang, OG/Twitter, JSON-LD)
 *   so link-preview bots and crawlers get per-route head tags without running JS.
 * - Routes in FULL_BODY_ROUTES additionally get their page body rendered to real HTML.
 * The client still mounts with createRoot(), so SPA behaviour is unchanged.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { LocaleProvider } from './i18n/LocaleProvider'
import SeoRouteSync from './components/SeoRouteSync'
import AiTalks from './pages/AiTalks'
import { stripLocalePrefix } from './i18n/paths'

const FULL_BODY_ROUTES: Record<string, () => JSX.Element> = {
  '/ai-talks': () => <AiTalks />,
}

export function renderRoute(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {}
  const bare = stripLocalePrefix(url)
  const Body = FULL_BODY_ROUTES[bare] as (() => JSX.Element) | undefined

  const body = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <LocaleProvider>
          <SeoRouteSync />
          {Body ? <Body /> : null}
        </LocaleProvider>
      </StaticRouter>
    </HelmetProvider>
  )

  const h = helmetContext.helmet!
  const head = [h.title, h.meta, h.link, h.script].map((part) => part.toString()).filter(Boolean).join('\n    ')
  return {
    head,
    htmlAttributes: h.htmlAttributes.toString(),
    body: Body ? body : '',
  }
}
export { getOgSpecs } from './seo/ogSpecs'
