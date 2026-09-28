import { motion } from 'framer-motion'
import Button from '../components/Button'
import BookCallLink from '../components/BookCallLink'
import { useLocale } from '../i18n/LocaleProvider'
import { getPublishedOneOnOneShowcase } from '../data/workshopShowcase'

export default function WorkshopsOneOnOne() {
  const { locale, messages } = useLocale()
  const w = messages.workshops.oneOnOne
  const showcaseLocale = locale === 'nl-BE' ? 'nl-BE' : 'en'
  // Hidden until an item is marked `published: true` (see src/data/workshopShowcase.ts)
  const showcase = getPublishedOneOnOneShowcase()

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{w.hero.label}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{w.hero.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{w.hero.subtitle}</p>
        </motion.div>
      </section>

      {/* Day 1 + Day 2 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.body.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{w.body.title}</h2>
          </motion.div>

          <div className="space-y-6">
            {[w.body.day1, w.body.day2].map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-cta/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-cta">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">{day.title}</h3>
                    <p className="text-body text-text-primary leading-relaxed">{day.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.pricing.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{w.pricing.title}</h2>
            <p className="text-lg text-text-secondary">{w.pricing.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.audience.label}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary max-w-3xl">{w.audience.title}</h2>
          </motion.div>
        </div>
      </section>

      {/* Built after a 1:1 (hidden until published) */}
      {showcase.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.showcase.label}</div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">{w.showcase.title}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {showcase.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.image && (
                    <div className="bg-accent h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.projectName[showcaseLocale]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">{item.name}</div>
                    <h3 className="text-h3 text-primary mb-2 group-hover:text-cta transition-colors">
                      {item.projectName[showcaseLocale]}
                    </h3>
                    <p className="text-body text-text-primary mb-4">{item.description[showcaseLocale]}</p>
                    <span className="text-sm font-semibold text-cta">{w.showcase.visit} →</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{w.cta.label}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{w.cta.title}</h2>
          <p className="text-lg text-white/80 mb-8">{w.cta.subtitle}</p>
          <BookCallLink notes={w.cta.bookingNote} metadata={{ source: 'workshops-1-1' }}>
            <Button variant="cta" size="lg">
              {w.cta.button}
            </Button>
          </BookCallLink>
        </motion.div>
      </section>
    </div>
  )
}
