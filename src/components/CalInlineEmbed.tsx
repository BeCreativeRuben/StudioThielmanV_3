import { useMemo } from 'react'
import Cal from '@calcom/embed-react'
import { getCalLink } from '../config/cal'
import { useLocale } from '../i18n/LocaleProvider'

type Props = {
  className?: string
  calLink?: string
}

export default function CalInlineEmbed({ className = '', calLink: calLinkProp }: Props) {
  const { locale } = useLocale()
  const calLink = calLinkProp || getCalLink()

  const config = useMemo(
    () => ({
      layout: 'month_view' as const,
      theme: 'light' as const,
      locale: locale === 'nl-BE' ? 'nl' : 'en',
    }),
    [locale]
  )

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
    <div className={`w-full min-h-[700px] ${className}`}>
      <Cal
        calLink={calLink}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={config}
      />
    </div>
  )
}
