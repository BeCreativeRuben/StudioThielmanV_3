import type { AppLocale } from '../i18n/config'

export function formatProjectsLastUpdated(isoDate: string, locale: AppLocale): string {
  const date = new Date(`${isoDate}T12:00:00`)
  return date.toLocaleDateString(locale === 'nl-BE' ? 'nl-BE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
