import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { logoImage } from '../images/media'
import { useLocale } from '../i18n/LocaleProvider'
import LocalizedLink from '../i18n/LocalizedLink'
import { BUSINESS } from '../seo/site'
import LanguageSwitcher from './LanguageSwitcher'
import BookCallLink from './BookCallLink'
import NewTabLocalizedLink from './NewTabLocalizedLink'

function ClientPortalLink({
  isScrolled,
  fullWidth = false,
  onClick,
}: {
  isScrolled: boolean
  fullWidth?: boolean
  onClick?: () => void
}) {
  const { t } = useLocale()
  const label = t('common.cta.clientPortal')

  return (
    <a
      href={BUSINESS.clientPortalLogin}
      target="_blank"
      rel="noopener"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 ${
        fullWidth ? 'w-full' : ''
      } ${
        isScrolled
          ? 'border-black text-black hover:bg-black hover:text-white focus:ring-black/20'
          : 'border-white text-white hover:bg-white hover:text-black focus:ring-white/50'
      }`}
    >
      {label}
    </a>
  )
}

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      
      // Find the first section (hero section) to determine when header should change
      // For Home page: hero is min-h-screen (full viewport)
      // For other pages: hero is py-20 md:py-32 (much smaller, ~300-400px)
      const main = document.querySelector('main')
      const heroSection = main?.querySelector('section:first-of-type') as HTMLElement
      
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const heroTop = heroSection.getBoundingClientRect().top + window.scrollY
        // Header changes when we've scrolled past most of the hero section
        // For small hero sections (other pages), change earlier (at 60% of height)
        // For large hero sections (home page), change at 80% of height
        const isLargeHero = heroHeight > window.innerHeight * 0.7
        const percentage = isLargeHero ? 0.8 : 0.6
        const threshold = heroTop + (heroHeight * percentage)
        setIsScrolled(scrollPosition > threshold)
      } else {
        // Fallback: use a smaller threshold for pages without hero section
        setIsScrolled(scrollPosition > 200)
      }
    }

    // Use requestAnimationFrame for better performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Check initial position after a short delay to ensure DOM is ready
    setTimeout(handleScroll, 100)

    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])
  
  const { t, pathWithoutLocale, messages } = useLocale()
  const serviceNav = messages.offerOverview.nav
  const serviceCards = messages.offerOverview.cards
  const onServicePage = serviceCards.some((c) => c.href === pathWithoutLocale)

  const navLinks: { path: string; label: string; newTab?: boolean }[] = [
    { path: '/', label: t('common.nav.home') },
    { path: '/portfolio', label: t('common.nav.portfolio') },
    { path: '/about', label: t('common.nav.about') },
  ]

  const isActive = (path: string) => pathWithoutLocale === path
  
  return (
    <motion.header
      className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 border-border' 
          : mobileMenuOpen
            ? 'bg-black/95 border-white/20'
            : 'bg-transparent border-white/20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <LocalizedLink to="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={logoImage.src}
              alt={t('common.a11y.logoAlt')}
              width={logoImage.width}
              height={logoImage.height}
              className="h-12 w-auto"
            />
            <span className={`font-bold text-xl tracking-tight hidden xl:block whitespace-nowrap transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              {t('common.brand')}
            </span>
          </LocalizedLink>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link, idx) => {
              const className = `${idx === 0 ? 'order-0' : 'order-2'} inline-flex items-center min-h-6 whitespace-nowrap text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                isActive(link.path)
                  ? isScrolled
                    ? 'text-primary font-semibold'
                    : 'text-white font-semibold'
                  : isScrolled
                    ? 'text-text-primary hover:text-primary'
                    : 'text-white/80 hover:text-white'
              }`
              return link.newTab ? (
                <NewTabLocalizedLink key={link.path} to={link.path} className={className}>
                  {link.label}
                </NewTabLocalizedLink>
              ) : (
                <LocalizedLink key={link.path} to={link.path} className={className}>
                  {link.label}
                </LocalizedLink>
              )
            })}
            <div className="relative group order-1">
              <LocalizedLink
                to="/#diensten"
                aria-haspopup="true"
                className={`inline-flex items-center gap-1 min-h-6 whitespace-nowrap text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isScrolled ? (onServicePage ? 'text-primary font-semibold' : 'text-text-primary hover:text-primary') : onServicePage ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                {serviceNav.services}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </LocalizedLink>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block group-focus-within:block">
                <div className="w-[34rem] grid grid-cols-2 gap-1 p-3 rounded-xl bg-white shadow-2xl border border-gray-200">
                  {serviceCards.map((card) => (
                    <LocalizedLink key={card.href} to={card.href} className="block p-3 rounded-lg hover:bg-accent normal-case tracking-normal">
                      <span className="block text-sm font-semibold text-primary">{card.title}</span>
                      <span className="block text-xs text-text-secondary mt-1 whitespace-normal">{card.meta}</span>
                    </LocalizedLink>
                  ))}
                  <LocalizedLink to="/#diensten" className="block p-3 rounded-lg bg-accent text-sm font-semibold text-primary">{serviceNav.allServices} →</LocalizedLink>
                </div>
              </div>
            </div>
          </div>
          
          {/* Language + CTA - Desktop */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher className={isScrolled ? 'text-text-primary' : 'text-white/90'} />
            <ClientPortalLink isScrolled={isScrolled} />
            <BookCallLink>
              {isScrolled ? (
                <motion.button
                  type="button"
                  className="font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black/20 bg-black text-white hover:bg-gray-900 border-2 border-black shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm relative z-10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF', backgroundColor: '#000000' }}
                >
                  <span style={{ color: '#FFFFFF' }}>{t('common.cta.bookCall')}</span>
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  className="font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-primary hover:bg-white/90 border-2 border-white shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm relative z-10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ color: '#1F2937', WebkitTextFillColor: '#1F2937' }}
                >
                  <span style={{ color: '#1F2937' }}>{t('common.cta.bookCall')}</span>
                </motion.button>
              )}
            </BookCallLink>
          </div>
          
          {/* Language + menu - Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher className={isScrolled ? 'text-text-primary' : 'text-white/90'} />
            <button
            type="button"
            className={`inline-flex items-center justify-center min-h-11 min-w-11 transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('common.a11y.toggleMenu')}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 1000 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={`lg:hidden overflow-hidden border-t transition-colors duration-300 ${
                isScrolled 
                  ? 'border-border bg-white/95 backdrop-blur-sm' 
                  : 'border-white/10 bg-black/95 backdrop-blur-sm'
              }`}
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => {
                  const className = `flex items-center min-h-11 px-4 text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isActive(link.path)
                      ? isScrolled
                        ? 'text-primary font-semibold'
                        : 'text-white font-semibold'
                      : isScrolled
                        ? 'text-text-primary hover:text-primary'
                        : 'text-white/80 hover:text-white'
                  }`
                  return link.newTab ? (
                    <NewTabLocalizedLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={className}
                    >
                      {link.label}
                    </NewTabLocalizedLink>
                  ) : (
                    <LocalizedLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={className}
                    >
                      {link.label}
                    </LocalizedLink>
                  )
                })}
                <div className="px-4">
                  <p className={`text-xs uppercase tracking-wider mb-2 ${isScrolled ? 'text-text-secondary' : 'text-white/50'}`}>{serviceNav.services}</p>
                  <div className="grid grid-cols-1 gap-1">
                    {serviceCards.map((card) => (
                      <LocalizedLink key={card.href} to={card.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center min-h-11 pl-3 text-sm font-medium ${isScrolled ? 'text-text-primary' : 'text-white/90'} ${isActive(card.href) ? 'font-semibold' : ''}`}>
                        {card.title}
                      </LocalizedLink>
                    ))}
                  </div>
                </div>
                <div className="px-4 pt-2 space-y-3">
                  <ClientPortalLink isScrolled={isScrolled} fullWidth onClick={() => setMobileMenuOpen(false)} />
                  <BookCallLink onClick={() => setMobileMenuOpen(false)}>
                    {isScrolled ? (
                      <motion.button
                        type="button"
                        className="w-full font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black/20 bg-black text-white hover:bg-gray-900 border-2 border-black shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm relative z-10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF', backgroundColor: '#000000' }}
                      >
                        <span style={{ color: '#FFFFFF' }}>{t('common.cta.bookCall')}</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        className="w-full font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-primary hover:bg-white/90 border-2 border-white shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm relative z-10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ color: '#1F2937', WebkitTextFillColor: '#1F2937' }}
                      >
                        <span style={{ color: '#1F2937' }}>{t('common.cta.bookCall')}</span>
                      </motion.button>
                    )}
                  </BookCallLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
