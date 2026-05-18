import type { AppLocale } from '../i18n/config'
import { portfolioItemsEn } from './portfolio/items.en'
import { portfolioItemsNl } from './portfolio/items.nl-BE'

export type { PortfolioItem } from './portfolio/types'

export function getPortfolioItems(locale: AppLocale) {
  return locale === 'nl-BE' ? portfolioItemsNl : portfolioItemsEn
}

export function getPortfolioItemBySlug(slug: string, locale: AppLocale) {
  return getPortfolioItems(locale).find((i) => i.slug === slug)
}

/** @deprecated Use getPortfolioItems(locale) */
export const portfolioItems = portfolioItemsEn
