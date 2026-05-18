import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

const stepIcons = [
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
]

export default function HowItWorks() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [expandedStep, setExpandedStep] = useState<number>(0)
  const { messages } = useLocale()
  const h = messages.howItWorks

  return (
    <div>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{h.hero.label}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{h.hero.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{h.hero.subtitle}</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.processSection.label}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">{h.processSection.title}</h2>
            <p className="text-lg text-text-primary max-w-2xl mx-auto leading-relaxed">{h.processSection.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden"
          >
            {h.steps.map((step, index) => {
              const isExpanded = expandedStep === index
              return (
                <div key={index} className={index !== h.steps.length - 1 ? 'border-b border-gray-200' : ''}>
                  <button
                    onClick={() => setExpandedStep(isExpanded ? -1 : index)}
                    className="w-full px-8 py-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1 flex items-center gap-4">
                      <div className="hidden sm:flex flex-shrink-0 w-10 h-10 items-center justify-center text-cta">
                        {stepIcons[index]}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:text-cta transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-6">
                      {isExpanded ? (
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 45 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-8 h-8 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.div>
                      ) : (
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-cta transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-lg text-text-primary leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.timelineSection.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{h.timelineSection.title}</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">{h.timelineSection.subtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h.timelines.map((timeline, index) => {
              const highlighted = 'highlighted' in timeline && timeline.highlighted
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div
                    className={`bg-white border-2 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl ${
                      highlighted ? 'border-cta shadow-lg' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {highlighted && (
                      <div className="bg-cta text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 uppercase tracking-wider">
                        {h.timelineSection.mostPopular}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-primary mb-3">{timeline.package}</h3>
                    <div className="text-3xl font-bold text-cta mb-4">{timeline.duration}</div>
                    <p className="text-body-sm text-text-primary">{timeline.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.faqSection.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{h.faqSection.title}</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">{h.faqSection.subtitle}</p>
          </motion.div>
          <div className="space-y-4">
            {h.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-primary pr-4">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-cta flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-body-sm text-text-primary leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{h.cta.title}</h2>
          <p className="text-lg text-white/80 mb-8">{h.cta.subtitle}</p>
          <LocalizedLink to="/contact#contact-form">
            <Button variant="cta" size="lg">
              {h.cta.button}
            </Button>
          </LocalizedLink>
        </motion.div>
      </section>
    </div>
  )
}
