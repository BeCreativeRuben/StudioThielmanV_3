import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import { getPortfolioItems } from '../data/portfolio'

const FILTER_KEYS = ['all', 'starter', 'growth', 'promax'] as const
type FilterKey = (typeof FILTER_KEYS)[number]

const PACKAGE_BY_FILTER: Record<Exclude<FilterKey, 'all'>, 'Starter' | 'Growth' | 'Pro Max'> = {
  starter: 'Starter',
  growth: 'Growth',
  promax: 'Pro Max',
}

export default function Portfolio() {
  const { locale, messages, t } = useLocale()
  const p = messages.portfolio
  const [filter, setFilter] = useState<FilterKey>('all')

  const activeItems = getPortfolioItems(locale).filter((item) => !item.comingSoon)

  const filteredItems =
    filter === 'all'
      ? activeItems
      : activeItems.filter((item) => item.package === PACKAGE_BY_FILTER[filter])

  return (
    <motion.div>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="text-sm text-white/60 uppercase tracking-wider mb-4">{p.hero.label}</motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{p.hero.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{p.hero.subtitle}</p>
        </motion.div>
      </section>

      <section className="py-8 bg-white border-b border-border sticky top-20 z-40 backdrop-blur-sm bg-white/95">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="flex flex-wrap justify-center gap-3">
            {FILTER_KEYS.map((filterKey) => (
              <button
                key={filterKey}
                type="button"
                onClick={() => setFilter(filterKey)}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 ${
                  filter === filterKey
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                }`}
              >
                {p.filters[filterKey]}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <LocalizedLink to={`/portfolio/${item.slug}`} className="block h-full">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="relative overflow-hidden">
                        <div className="w-full h-56 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          {item.screenshots && item.screenshots.length > 0 ? (
                            <img
                              src={item.screenshots[0]}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  parent.innerHTML = `<span class="text-text-secondary">${t('common.projectImage')}</span>`
                                }
                              }}
                            />
                          ) : (
                            <span className="text-text-secondary">{t('common.projectImage')}</span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-cta text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            {item.package}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-text-secondary uppercase tracking-wider">{t('common.caseStudy')}</div>
                          <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded">{item.clientType}</span>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-cta transition-colors">{item.title}</h3>
                        <p className="text-body-sm text-text-primary mb-4 flex-grow leading-relaxed">{item.description}</p>

                        {item.keyFeatures && (
                          <div className="mb-4">
                            <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">{p.keyFeatures}</div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.keyFeatures.slice(0, 3).map((feature, idx) => (
                                <span key={idx} className="text-xs bg-accent text-text-primary px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                              {item.keyFeatures.length > 3 && (
                                <span className="text-xs bg-accent text-text-primary px-2 py-1 rounded">
                                  +{item.keyFeatures.length - 3} {p.moreFeatures}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {item.results && (
                          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="text-xs text-green-700 font-semibold mb-1">{p.detail.results}</div>
                            <div className="text-sm text-green-800">{item.results}</div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                          <span className="text-xs text-text-secondary uppercase tracking-wider">{item.date}</span>
                          <span className="text-sm font-semibold text-primary group-hover:text-cta transition-colors flex items-center gap-1">
                            {p.viewProject}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </LocalizedLink>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="py-20 bg-gray-900">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{p.cta.title}</h2>
            <p className="text-lg text-white/80 mb-8">{p.cta.subtitle}</p>
            <LocalizedLink to="/contact#contact-form">
              <Button variant="cta" size="lg">
                {p.cta.button}
              </Button>
            </LocalizedLink>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}
