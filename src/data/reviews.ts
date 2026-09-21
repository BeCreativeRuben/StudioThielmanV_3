export type ReviewLocale = 'en' | 'nl-BE'

export type Review = {
  id: string
  authorName: string
  /** Company / role, optional */
  authorContext?: string
  rating: 1 | 2 | 3 | 4 | 5
  /** ISO date string YYYY-MM-DD */
  date: string
  published: boolean
  quote: Record<ReviewLocale, string>
}

/**
 * Client reviews shown on /reviews and counted on the homepage.
 * Add new entries here as clients send feedback (set published: true).
 */
export const reviews: Review[] = [
  // Example (unpublished until you approve):
  // {
  //   id: 'example-1',
  //   authorName: 'Client Name',
  //   authorContext: 'Business name',
  //   rating: 5,
  //   date: '2026-09-01',
  //   published: false,
  //   quote: {
  //     en: '…',
  //     'nl-BE': '…',
  //   },
  // },
]

export function getPublishedReviews(): Review[] {
  return reviews
    .filter((r) => r.published)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPublishedReviewCount(): number {
  return getPublishedReviews().length
}
