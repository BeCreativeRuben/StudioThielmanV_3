import { motion } from 'framer-motion'
import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

export default function Workshops() {
  const { messages } = useLocale()
  const w = messages.workshops

  return (
    <div>
      {/* Hero Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{w.audience.title}</h2>
            <div className="space-y-4 text-lg text-text-primary leading-relaxed max-w-3xl">
              <p>{w.audience.p1}</p>
              <p className="text-text-secondary italic">{w.audience.p2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
