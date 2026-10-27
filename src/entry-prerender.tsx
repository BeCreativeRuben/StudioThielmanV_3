/**
 * Build-time prerender entry (bundled with `vite build --ssr`, used by scripts/prerender.mjs).
 * Renders the same route tree as the client so every sitemap URL has a full HTML body.
 */
import './ssrPages'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { LocaleProvider } from './i18n/LocaleProvider'
import AppRoutes from './AppRoutes'

export function renderRoute(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {}

  const body = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <LocaleProvider>
          <AppRoutes />
        </LocaleProvider>
      </StaticRouter>
    </HelmetProvider>
  )

  const h = helmetContext.helmet!
  const head = [h.title, h.priority, h.meta, h.link, h.script].map((part) => part.toString()).filter(Boolean).join('\n    ')
  return {
    head,
    htmlAttributes: h.htmlAttributes.toString(),
    body,
  }
}

export { getOgSpecs } from './seo/ogSpecs'
