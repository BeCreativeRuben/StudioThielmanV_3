/**
 * Edge middleware — locale is chosen by URL (/ vs /nl/) or the header language switcher.
 * No geo-based redirects: BE/NL visitors default to English unless they use NL or land on /nl/* (e.g. Dutch SEO).
 */
export const config = {
  matcher: ['/((?!api|assets|.*\\..*).*)'],
}

export default function middleware() {
  // Intentionally empty: routing and LocaleProvider handle language.
}
