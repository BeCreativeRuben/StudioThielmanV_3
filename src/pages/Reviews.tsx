import { motion } from 'framer-motion'
import BookCallLink from '../components/BookCallLink'
import Button from '../components/Button'
import { useLocale } from '../i18n/LocaleProvider'
import { getPublishedReviews } from '../data/reviews'
import type { ReviewLocale } from '../data/reviews'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-cta" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const { locale, messages } = useLocale()
  const copy = messages.reviews
  const published = getPublishedReviews()
  const quoteLocale: ReviewLocale = locale === 'nl-BE' ? 'nl-BE' : 'en'
  const countLabel =
    published.length === 1
      ? copy.list.countOne
      : copy.list.countMany.replace('{{count}}', String(published.length))

  return (
    <div>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div
          className="absolute left-0 right-0 w-full bg-gray-900"
          style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        />
        <div
          className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0"
          style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{copy.hero.label}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{copy.hero.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-4">{copy.hero.subtitle}</p>
          <p className="text-sm text-white/60">{countLabel}</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {published.length === 0 ? (
            <motion.div
              className="text-center max-w-xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-primary mb-4">{copy.empty.title}</h2>
              <p className="text-body text-text-secondary mb-8">{copy.empty.body}</p>
              <BookCallLink>
                <Button variant="primary">{copy.empty.cta}</Button>
              </BookCallLink>
            </motion.div>
          ) : (
            <ul className="space-y-8">
              {published.map((review, index) => (
                <motion.li
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <Stars rating={review.rating} />
                    <time className="text-sm text-text-secondary" dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString(locale === 'nl-BE' ? 'nl-BE' : 'en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <blockquote className="text-body-lg text-text-primary mb-4">
                    “{review.quote[quoteLocale] || review.quote.en}”
                  </blockquote>
                  <div className="text-sm font-semibold text-primary">{review.authorName}</div>
                  {review.authorContext ? (
                    <div className="text-sm text-text-secondary">{review.authorContext}</div>
                  ) : null}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {published.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">{copy.cta.title}</h2>
            <p className="text-body text-text-secondary mb-8">{copy.cta.body}</p>
            <BookCallLink>
              <Button variant="primary">{copy.cta.button}</Button>
            </BookCallLink>
          </div>
        </section>
      ) : null}
    </div>
  )
}
