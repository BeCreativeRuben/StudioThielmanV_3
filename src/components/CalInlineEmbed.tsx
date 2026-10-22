import { useEffect, useRef, useState } from 'react'
import { getCalLink } from '../config/cal'
import { useLocale } from '../i18n/LocaleProvider'

type Props = {
  className?: string
  calLink?: string
}

type CalComponent = typeof import('@calcom/embed-react').default

/**
 * Cal.com embed loads only when this block is near the viewport, and only on pages that render it.
 */
export default function CalInlineEmbed({ className = '', calLink: calLinkProp }: Props) {
  const { locale } = useLocale()
  const calLink = calLinkProp || getCalLink()
  const holder = useRef<HTMLDivElement>(null)
  const [CalEmbed, setCalEmbed] = useState<CalComponent | null>(null)

  useEffect(() => {
    if (!calLink || !holder.current) return
    const node = holder.current
    let cancelled = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        void import('@calcom/embed-react').then((mod) => {
          if (!cancelled) setCalEmbed(() => mod.default)
        })
      },
      { rootMargin: '240px' }
    )
    observer.observe(node)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [calLink])

  if (!calLink) {
    return (
      <div
        className={`rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-text-secondary ${className}`}
      >
        Cal.com is not configured yet. Set <code className="text-sm">VITE_CAL_LINK</code> (e.g.{' '}
        <code className="text-sm">your-user/discovery</code>).
      </div>
    )
  }

  return (
    <div ref={holder} className={`w-full min-h-[700px] ${className}`}>
      {CalEmbed ? (
        <CalEmbed
          calLink={calLink}
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{
            layout: 'month_view',
            theme: 'light',
            locale: locale === 'nl-BE' ? 'nl' : 'en',
          }}
        />
      ) : null}
    </div>
  )
}
