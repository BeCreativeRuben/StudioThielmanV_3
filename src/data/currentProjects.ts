import type { AppLocale } from '../i18n/config'
import { currentProjectsEn, finishedProjectsEn } from './currentProjects/items.en'
import { currentProjectsNl, finishedProjectsNl } from './currentProjects/items.nl-BE'

export type { CurrentProject } from './currentProjects/types'

export function getCurrentProjects(locale: AppLocale) {
  return locale === 'nl-BE' ? currentProjectsNl : currentProjectsEn
}

export function getFinishedProjects(locale: AppLocale) {
  return locale === 'nl-BE' ? finishedProjectsNl : finishedProjectsEn
}

export function getCurrentProjectById(id: string, locale: AppLocale) {
  return getCurrentProjects(locale).find((project) => project.id === id)
}

/** @deprecated Use getCurrentProjects(locale) */
export const currentProjects = currentProjectsEn

/** @deprecated Use getFinishedProjects(locale) */
export const finishedProjects = finishedProjectsEn
