/**
 * Get the API URL based on environment
 * - Uses VITE_API_URL if set
 * - On production (studiothielman.com or vercel.app), uses same domain (relative URLs)
 * - Otherwise defaults to localhost:3001 for development
 */
export function getApiUrl(): string {
  // If explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  // If on production (custom domain or Vercel), use same domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname.includes('studiothielman.com') || hostname.includes('vercel.app')) {
      return '' // Empty string = same domain (relative URLs)
    }
  }

  // Development default
  return 'http://localhost:3001'
}
