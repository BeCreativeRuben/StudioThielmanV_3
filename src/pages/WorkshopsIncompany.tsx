import { motion } from 'framer-motion'
import Button from '../components/Button'
import BookCallLink from '../components/BookCallLink'
import LinkedInPostCard from '../components/LinkedInPostCard'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

export default function WorkshopsIncompany() {
  const { messages } = useLocale()
  const w = messages.workshops.incompany

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
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-4">{w.hero.subtitle}</p>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{w.hero.subtitle2}</p>
        </motion.div>
      </section>

      {/* What you leave with */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.takeaways.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{w.takeaways.title}</h2>
          </motion.div>

          <div className="space-y-4">
            {w.takeaways.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <span className="text-cta font-bold text-lg flex-shrink-0 mt-0.5">✓</span>
                <p className="text-body text-text-primary leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How a session runs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.session.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{w.session.title}</h2>
          </motion.div>

          <div className="space-y-6">
            {w.session.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-cta/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-cta">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-body text-text-primary leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.socialProof.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{w.socialProof.title}</h2>
            {w.socialProof.intro && (
              <p className="text-lg text-text-secondary max-w-2xl">{w.socialProof.intro}</p>
            )}
          </motion.div>

          {/* LinkedIn post card */}
          <LinkedInPostCard
            href={w.socialProof.postUrl}
            author={w.socialProof.postAuthor}
            date={w.socialProof.postDate}
            quote={w.socialProof.postExcerpt}
            linkLabel={w.socialProof.postLinkLabel}
            className="mb-10"
          />

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {w.socialProof.testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300"
              >
                <svg className="w-8 h-8 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                </svg>
                <p className="text-body text-text-primary leading-relaxed mb-4 italic">"{t.quote}"</p>
                <p className="text-sm font-semibold text-primary">— {t.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Prominent LinkedIn link under the testimonials */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href={w.socialProof.postUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md">
                {w.socialProof.linkedInCta} →
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.audience.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{w.audience.title}</h2>
            <div className="space-y-4 text-lg text-text-primary leading-relaxed max-w-3xl">
              <p>{w.audience.p1}</p>
              <p className="text-text-secondary italic">{w.audience.p2}</p>
              <p>
                <BookCallLink
                  notes="Workshop developers & AI-agents"
                  metadata={{ source: 'workshops-developers' }}
                  className="text-cta font-semibold underline underline-offset-4 hover:no-underline"
                >
                  {w.audience.devCta} →
                </BookCallLink>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practical + pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.practical.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{w.practical.title}</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {w.practical.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <span className="text-cta font-bold text-lg flex-shrink-0 mt-0.5">✓</span>
                <p className="text-body text-text-primary leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.price.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{w.price.title}</h2>
            <p className="text-lg text-text-primary max-w-2xl mx-auto mb-2">{w.price.subtitle}</p>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">{w.price.note}</p>
          </motion.div>
        </div>
      </section>

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
          <BookCallLink notes={w.cta.bookingNote} metadata={{ source: 'workshops-incompany' }}>
            <Button variant="cta" size="lg">
              {w.cta.button}
            </Button>
          </BookCallLink>
          <div className="mt-6">
            <LocalizedLink to="/workshops#waitlist" className="text-sm text-white/70 hover:text-white underline underline-offset-4">
              {w.cta.waitlistLink} →
            </LocalizedLink>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
