import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import { localizedPath } from '../i18n/paths'
import { getVisibleBlogPostsForLocale } from '../data/blog'

export default function Blog() {
  const { locale, messages, t } = useLocale()
  const copy = messages.blog
  const posts = getVisibleBlogPostsForLocale(locale === 'nl-BE' ? 'nl-BE' : 'en')

  return (
    <motion.div>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <motion.div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="text-sm text-white/60 uppercase tracking-wider mb-4">{copy.hero.label}</motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{copy.hero.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{copy.hero.subtitle}</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <motion.div
              className="max-w-2xl mx-auto text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{copy.empty.title}</h2>
              <p className="text-body-lg text-text-primary mb-8">{copy.empty.description}</p>
              <Link to={localizedPath('/blog', 'nl-BE')}>
                <Button variant="primary">{copy.empty.button}</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <LocalizedLink to={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="relative overflow-hidden">
                        <div className="w-full h-56 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  parent.innerHTML = `<span class="text-text-secondary">${t('common.blogImage')}</span>`
                                }
                              }}
                            />
                          ) : (
                            <span className="text-text-secondary">{t('common.blogImage')}</span>
                          )}
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-text-secondary uppercase tracking-wider">{t('common.article')}</div>
                          <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded">{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-cta transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-body-sm text-text-primary mb-4 flex-grow leading-relaxed line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                          <span className="text-sm font-semibold text-primary group-hover:text-cta transition-colors flex items-center gap-1">
                            {t('common.cta.readMore')}
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
          )}
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{copy.cta.title}</h2>
            <p className="text-lg text-white/80 mb-8">{copy.cta.subtitle}</p>
            <LocalizedLink to="/contact#contact-form">
              <Button variant="cta" size="lg">
                {copy.cta.button}
              </Button>
            </LocalizedLink>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}
