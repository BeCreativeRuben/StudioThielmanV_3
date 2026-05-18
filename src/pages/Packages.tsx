import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

export default function Packages() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { messages, t } = useLocale()
  const p = messages.packages

  const packages = p.tiers.map((tier) => ({
    ...tier,
    highlighted: 'highlighted' in tier ? tier.highlighted : false,
    comingSoon: 'comingSoon' in tier ? tier.comingSoon : false,
  }))

  return (
    <div>
      <section className="py-20 md:py-32 relative overflow-hidden -mt-20 pt-20">
        <motion.div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div className="absolute left-0 right-0 w-full bg-gradient-to-b from-black/40 to-black/60" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/80 uppercase tracking-wider mb-4">{p.hero.label}</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{p.hero.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{p.hero.subtitle}</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{p.overview.label}</motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{p.overview.title}</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">{p.overview.subtitle}</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  hover={!pkg.comingSoon}
                  className={`h-full flex flex-col ${pkg.highlighted ? 'border-2 border-cta shadow-xl' : ''} ${pkg.comingSoon ? 'opacity-75' : ''}`}
                >
                  {pkg.highlighted && (
                    <motion.div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-body-sm font-bold px-4 py-2 rounded-full inline-block mb-4 shadow-lg uppercase tracking-wider">
                      {p.mostPopular}
                    </motion.div>
                  )}
                  {pkg.comingSoon && (
                    <motion.div className="bg-gray-500 text-white text-body-sm font-bold px-4 py-2 rounded-full inline-block mb-4 shadow-lg uppercase tracking-wider">
                      {t('common.comingSoon')}
                    </motion.div>
                  )}

                  <motion.div className="flex-grow">
                    <h3 className="text-3xl font-bold text-primary mb-2">{pkg.name}</h3>
                    {!pkg.comingSoon && (
                      <motion.div className="mb-4">
                        <motion.div className="text-4xl font-bold text-primary">{pkg.price}</motion.div>
                        <motion.div className="text-body-sm text-text-secondary mt-1">{pkg.startupFee}</motion.div>
                      </motion.div>
                    )}
                    <p className="text-body text-text-primary mb-6">{pkg.description}</p>

                    <motion.div className="mb-6">
                      <h4 className="text-h4 text-primary mb-3 font-semibold">{p.whatsIncluded}</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="text-body-sm text-text-primary flex items-start">
                            <span className="text-cta mr-2 mt-1 font-bold">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div className="mb-6">
                      <h4 className="text-h4 text-primary mb-3 font-semibold">{p.perfectFor}</h4>
                      <ul className="space-y-2">
                        {pkg.idealFor.map((item, idx) => (
                          <li key={idx} className="text-body-sm text-text-primary flex items-start">
                            <span className="text-cta mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>

                  <motion.div className="mt-auto pt-6">
                    {pkg.comingSoon ? (
                      <Button variant="outline" size="md" className="w-full" disabled>
                        {t('common.comingSoon')}
                      </Button>
                    ) : (
                      <LocalizedLink to="/contact#contact-form">
                        <Button variant={pkg.highlighted ? 'cta' : 'outline'} size="md" className="w-full">
                          {p.choosePackage.replace('{{name}}', pkg.name)}
                        </Button>
                      </LocalizedLink>
                    )}
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{p.faqSection.label}</motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{p.faqTitle}</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">{p.faqSection.subtitle}</p>
          </motion.div>
          <motion.div className="space-y-4">
            {p.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-primary pr-4">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-cta flex-shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <motion.div className="px-6 pb-5 pt-0">
                        <p className="text-body-sm text-text-primary leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-primary">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{p.ctaBottom.title}</h2>
          <p className="text-xl text-white/90 mb-8">{p.ctaBottom.subtitle}</p>
          <LocalizedLink to="/contact#contact-form">
            <Button variant="secondary" size="lg">
              {p.ctaBottom.button}
            </Button>
          </LocalizedLink>
        </motion.div>
      </section>
    </div>
  )
}
