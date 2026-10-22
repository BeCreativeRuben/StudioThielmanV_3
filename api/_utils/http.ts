import type { VercelRequest, VercelResponse } from '@vercel/node'

const ALLOWED_ORIGIN =
  /^https:\/\/(www\.)?studiothielman\.com$|^https:\/\/[a-z0-9-]+\.vercel\.app$|^http:\/\/localhost(:\d+)?$|^http:\/\/127\.0\.0\.1(:\d+)?$/i

export function clientIp(req: VercelRequest): string {
  const xf = req.headers['x-forwarded-for']
  const raw = Array.isArray(xf) ? xf[0] : xf
  return (raw?.split(',')[0] || req.socket?.remoteAddress || 'unknown').trim()
}

/** Reflect only first-party origins. Same-origin browser calls still send Origin. */
export function applyCors(req: VercelRequest, res: VercelResponse): void {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : ''
  if (origin && ALLOWED_ORIGIN.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
}

const buckets = new Map<string, { count: number; reset: number }>()

/** Returns true when the request is still within the limit. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return true
  }
  bucket.count += 1
  return bucket.count <= limit
}

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}
