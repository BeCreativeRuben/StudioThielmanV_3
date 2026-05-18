import { useLocale } from '../i18n/LocaleProvider'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, switchLocale, t } = useLocale()

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <span className="sr-only">{t('common.lang.label')}</span>
      <button
        type="button"
        onClick={() => switchLocale('nl-BE')}
        className={
          locale === 'nl-BE'
            ? 'font-semibold text-cta underline'
            : 'opacity-80 hover:opacity-100 transition-opacity'
        }
      >
        NL
      </button>
      <span className="opacity-40" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        className={
          locale === 'en'
            ? 'font-semibold text-cta underline'
            : 'opacity-80 hover:opacity-100 transition-opacity'
        }
      >
        EN
      </button>
    </div>
  )
}
