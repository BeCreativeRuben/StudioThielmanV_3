import { useLocale } from '../i18n/LocaleProvider'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, switchLocale, t } = useLocale()

  return (
    <div
      className={`flex items-center rounded-lg border border-current/25 px-1 py-0.5 text-xs font-semibold uppercase tracking-wider ${className}`}
      role="group"
      aria-label={t('common.lang.label')}
    >
      <button
        type="button"
        onClick={() => switchLocale('nl-BE')}
        className={`rounded-md px-2.5 py-1 transition-colors ${
          locale === 'nl-BE' ? 'bg-cta text-white' : 'opacity-80 hover:opacity-100'
        }`}
        aria-pressed={locale === 'nl-BE'}
      >
        NL
      </button>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        className={`rounded-md px-2.5 py-1 transition-colors ${
          locale === 'en' ? 'bg-cta text-white' : 'opacity-80 hover:opacity-100'
        }`}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  )
}
