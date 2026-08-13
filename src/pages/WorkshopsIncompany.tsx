import { motion } from 'framer-motion'
import Button from '../components/Button'
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
          <motion.a
            href={w.socialProof.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 mb-10 hover:shadow-lg transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-primary block">{w.socialProof.postAuthor}</span>
                <span className="text-sm text-text-secondary">{w.socialProof.postDate}</span>
              </div>
            </div>
            <blockquote className="text-body text-text-primary leading-relaxed mb-4 italic">
              "{w.socialProof.postExcerpt}"
            </blockquote>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A66C2] group-hover:underline">
              {w.socialProof.postLinkLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.a>

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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{w.price.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{w.price.title}</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">{w.price.subtitle}</p>
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
          <LocalizedLink to="/contact#contact-form">
            <Button variant="cta" size="lg">
              {w.cta.button}
            </Button>
          </LocalizedLink>
        </motion.div>
      </section>
    </div>
  )
}
