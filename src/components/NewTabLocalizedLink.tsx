import type { ReactNode } from 'react'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

type NewTabLocalizedLinkProps = {
  to: string
  className?: string
  onClick?: () => void
  children: ReactNode
}

/** Same-site route that leaves the current page shell, so it opens in a new tab. */
export default function NewTabLocalizedLink({ to, className, onClick, children }: NewTabLocalizedLinkProps) {
  const { t } = useLocale()

  return (
    <LocalizedLink to={to} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
      <span className="sr-only normal-case"> {t('common.a11y.opensInNewTab')}</span>
    </LocalizedLink>
  )
}
