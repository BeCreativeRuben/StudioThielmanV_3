import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import { getPortfolioItemBySlug, PortfolioItem } from '../data/portfolio'

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { locale, messages, localizedPath } = useLocale()
  const d = messages.portfolio.detail
  const [project, setProject] = useState<PortfolioItem | null>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  useEffect(() => {
    if (slug) {
      const foundProject = getPortfolioItemBySlug(slug, locale)
      if (foundProject) {
        setProject(foundProject)
      } else {
        navigate(localizedPath('/portfolio'))
      }
    }
  }, [slug, locale, navigate, localizedPath])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-primary">{d.loading}</p>
        </div>
      </div>
    )
  }

  if (project.comingSoon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{project.title}</h1>
            <p className="text-xl text-text-primary mb-8">{project.description}</p>
            <LocalizedLink to="/portfolio">
              <Button variant="primary">{d.back}</Button>
            </LocalizedLink>
          </motion.div>
        </div>
      </div>
    )
  }

  const similarSubtitle = d.similarSubtitle.replace('{{package}}', project.package)
  const isNarrative = (project.caseStudy?.sections?.length ?? 0) > 0

  return (
    <motion.div>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: '400px' }} />
        <motion.div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: '400px' }} />
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <LocalizedLink
              to="/portfolio"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2 mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {d.back}
            </LocalizedLink>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-cta text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {project.package}
            </span>
            <span className="text-white/60 text-sm uppercase tracking-wider">{project.clientType}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
          {project.caseStudy?.subtitle && (
            <p className="text-lg md:text-xl text-white/70 mb-4 max-w-3xl">{project.caseStudy.subtitle}</p>
          )}
          <p className="text-xl text-white/90 max-w-3xl">{project.description}</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {isNarrative ? d.howIBuiltIt : project.caseStudy ? d.inBrief : d.overview}
            </h2>
            <div className="prose prose-lg max-w-none">
              {!isNarrative && (
                <p className="text-body-lg text-text-primary leading-relaxed mb-4">{project.longDescription}</p>
              )}
              {project.caseStudy?.meta && project.caseStudy.meta.length > 0 && (
                <div className={`grid grid-cols-1 gap-4 mb-8 ${project.caseStudy.meta.length > 1 ? 'sm:grid-cols-3' : 'max-w-sm'}`}>
                  {project.caseStudy.meta.map((item) => (
                    <div key={item.label} className="bg-accent rounded-lg p-4 border border-border">
                      <div className="text-sm text-text-secondary uppercase tracking-wider mb-1">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body text-primary font-semibold hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-body text-text-primary font-semibold">{item.value}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">{d.date}</div>
                  <div className="text-body text-text-primary font-semibold">{project.date}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">{d.packageTier}</div>
                  <div className="text-body text-text-primary font-semibold">{project.package}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {isNarrative &&
        project.caseStudy!.sections!.map((section, index) => (
          <section key={section.title} className={index % 2 === 0 ? 'py-20 bg-accent' : 'py-20 bg-white'}>
            <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">{section.title}</h3>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-body-lg text-text-primary leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>
        ))}

      {project.screenshots.length > 0 && (
        <section className="py-20 bg-accent">
          <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">{d.screenshots}</h2>
              <div className={`grid gap-8 ${project.screenshots.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                {project.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg"
                  >
                    <div className={`w-full bg-gray-100 flex items-center justify-center ${project.screenshots.length === 1 ? '' : 'h-64'}`}>
                      <img
                        src={encodeURI(screenshot)}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className={project.screenshots.length === 1 ? 'w-full h-auto' : 'w-full h-full object-cover object-top'}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<span class="text-text-secondary">${d.comingSoon}</span>`
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      <section className="py-20 bg-white">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{d.livePreview}</h2>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-cta transition-colors flex items-center gap-2 font-semibold"
              >
                {d.openInNewTab}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-xl">
              {!iframeLoaded && !iframeError && (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-text-secondary">{d.loadingPreview}</p>
                  </div>
                </div>
              )}
              {iframeError && (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-text-primary mb-4">{d.previewError}</p>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cta hover:underline"
                    >
                      {d.visitLiveSite}
                    </a>
                  </div>
                </div>
              )}
              <iframe
                src={project.liveUrl}
                className={`w-full transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'} ${iframeError ? 'hidden' : ''}`}
                style={{ height: '800px', minHeight: '600px' }}
                title={`Live preview of ${project.title}`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                onLoad={() => setIframeLoaded(true)}
                onError={() => {
                  setIframeError(true)
                  setIframeLoaded(false)
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {project.keyFeatures.length > 0 && (
        <section className="py-20 bg-white">
          <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">{d.keyFeatures}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-accent p-4 rounded-lg border border-border"
                  >
                    <span className="text-cta font-bold mt-1">✓</span>
                    <span className="text-body text-text-primary">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {project.packageFitExplanation && (
        <section className="py-20 bg-white">
          <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                {project.caseStudy ? d.scope : d.packageFit}
              </h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                <p className="text-body-lg text-text-primary leading-relaxed">{project.packageFitExplanation}</p>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {project.results && (
        <section className="py-20 bg-accent">
          <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-green-50 border border-green-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-4">{d.results}</h3>
                <p className="text-body-lg text-green-900">{project.results}</p>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      <section className="py-20 bg-gray-900">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{d.similarTitle}</h2>
            <p className="text-lg text-white/80 mb-8">{similarSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <LocalizedLink to="/contact#contact-form">
                <Button variant="cta" size="lg">{d.getStarted}</Button>
              </LocalizedLink>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {d.viewGithub}
                </a>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                {d.visitSite}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}
