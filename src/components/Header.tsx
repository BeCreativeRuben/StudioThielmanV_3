import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoImage from '../images/fulllogo copy.png'
import { useLocale } from '../i18n/LocaleProvider'
import LocalizedLink from '../i18n/LocalizedLink'
import LanguageSwitcher from './LanguageSwitcher'
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
  
  const { t, pathWithoutLocale } = useLocale()

  const navLinks = [
    { path: '/', label: t('common.nav.home') },
    { path: '/packages', label: t('common.nav.packages') },
    { path: '/portfolio', label: t('common.nav.portfolio') },
    { path: '/blog', label: t('common.nav.blog') },
    { path: '/how-it-works', label: t('common.nav.howItWorks') },
    { path: '/about', label: t('common.nav.about') },
    { path: '/contact', label: t('common.nav.contact') },
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
          <LocalizedLink to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img 
              src={logoImage} 
              alt={t('common.a11y.logoAlt')} 
              className="h-12 w-auto"
            />
            <span className={`font-bold text-xl tracking-tight hidden sm:block transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              {t('common.brand')}
            </span>
          </LocalizedLink>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <LocalizedLink
                key={link.path}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isActive(link.path)
                    ? isScrolled 
                      ? 'text-primary font-semibold' 
                      : 'text-white font-semibold'
                    : isScrolled
                      ? 'text-text-primary hover:text-primary'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </LocalizedLink>
            ))}
          </div>
          
          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LocalizedLink to="/contact#contact-form">
              {isScrolled ? (
                <motion.button
                  type="button"
                  className="font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black/20 bg-black text-white hover:bg-gray-900 border-2 border-black shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF', backgroundColor: '#000000' }}
                >
                  <span style={{ color: '#FFFFFF' }}>{t('common.cta.bookCall')}</span>
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  className="font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-primary hover:bg-white/90 border-2 border-white shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ color: '#1F2937', WebkitTextFillColor: '#1F2937' }}
                >
                  <span style={{ color: '#1F2937' }}>{t('common.cta.bookCall')}</span>
                </motion.button>
              )}
            </LocalizedLink>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
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
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 400 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={`md:hidden overflow-hidden border-t transition-colors duration-300 ${
                isScrolled 
                  ? 'border-border bg-white/95 backdrop-blur-sm' 
                  : 'border-white/10 bg-black/95 backdrop-blur-sm'
              }`}
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <LocalizedLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isActive(link.path)
                        ? isScrolled
                          ? 'text-primary font-semibold'
                          : 'text-white font-semibold'
                        : isScrolled
                          ? 'text-text-primary hover:text-primary'
                          : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </LocalizedLink>
                ))}
                <div className="px-4">
                  <LanguageSwitcher className={isScrolled ? 'text-text-primary' : 'text-white/90'} />
                </div>
                <div className="px-4 pt-2">
                  <LocalizedLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    {isScrolled ? (
                      <motion.button
                        type="button"
                        className="w-full font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black/20 bg-black text-white hover:bg-gray-900 border-2 border-black shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF', backgroundColor: '#000000' }}
                      >
                        <span style={{ color: '#FFFFFF' }}>{t('common.cta.bookCall')}</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        className="w-full font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-primary hover:bg-white/90 border-2 border-white shadow-lg hover:shadow-xl font-bold px-4 py-2 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ color: '#1F2937', WebkitTextFillColor: '#1F2937' }}
                      >
                        <span style={{ color: '#1F2937' }}>{t('common.cta.bookCall')}</span>
                      </motion.button>
                    )}
                  </LocalizedLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
