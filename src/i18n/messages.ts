import type { AppLocale } from './config'
import { enMessages } from '../locales/en'
import { nlBEMessages } from '../locales/nl-BE'

const catalogs: Record<AppLocale, typeof enMessages> = {
  en: enMessages,
  'nl-BE': nlBEMessages,
}

export function getMessages(locale: AppLocale) {
  return catalogs[locale]
}

export type Messages = typeof enMessages
