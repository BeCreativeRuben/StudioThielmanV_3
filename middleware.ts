const NL_PREFIX = '/nl'
const LOCALE_COOKIE = 'st_locale'
const BOT_UA =
  /bot|crawl|spider|google|bing|yandex|baidu|duckduck|slurp|facebookexternalhit|linkedinbot|twitterbot|embedly|quora link preview|slackbot|whatsapp/i

export const config = {
  matcher: ['/((?!api|assets|.*\\..*).*)'],
}

export default function middleware(request: Request) {
  const url = new URL(request.url)
  const { pathname } = url

  if (pathname.startsWith('/api') || pathname.startsWith('/admin')) {
    return
  }

  const ua = request.headers.get('user-agent') ?? ''
  if (BOT_UA.test(ua)) {
    return
  }

  const cookie = request.headers.get('cookie') ?? ''
  if (cookie.includes(`${LOCALE_COOKIE}=en`) || cookie.includes(`${LOCALE_COOKIE}=nl`)) {
    return
  }

  if (pathname.startsWith(NL_PREFIX)) {
    return
  }

  const country = request.headers.get('x-vercel-ip-country')
  if (country === 'BE' || country === 'NL') {
    const target = pathname === '/' ? NL_PREFIX : `${NL_PREFIX}${pathname}`
    return Response.redirect(new URL(target, url), 302)
  }

}
