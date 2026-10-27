import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import { getPortfolioItems } from '../data/portfolio'
import { getApiUrl } from '../utils/api'
import { useLocale } from '../i18n/LocaleProvider'
import LocalizedLink from '../i18n/LocalizedLink'
import BookCallLink from '../components/BookCallLink'
import ServiceCard from '../components/services/ServiceCard'
import SectionHeader from '../components/services/SectionHeader'
import CtaBand from '../components/services/CtaBand'
import FaqAccordion from '../components/FaqAccordion'
import { getPublishedReviews } from '../data/reviews'
import { BUSINESS } from '../seo/site'
import { Helmet } from 'react-helmet-async'
import { heroMedia, rubenPortrait } from '../images/media'

export default function Home() {
  const { locale, messages, t } = useLocale()
  const offer = messages.offerOverview
  const hl = offer.highlights
  const reviewItems = [
    { id: 'aeriez', text: hl.workshops.quote, author: hl.workshops.attribution },
    ...getPublishedReviews().map((r) => ({ id: r.id, text: r.quote[locale], author: r.authorContext ? `${r.authorName} — ${r.authorContext}` : r.authorName })),
  ]
  const h = messages.home
  const c = messages.common
  const [showChatWidget, setShowChatWidget] = useState(false)
  const [showHelpMessage, setShowHelpMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [playHeroVideo, setPlayHeroVideo] = useState(false)
  const [chatWebsite, setChatWebsite] = useState('')

  // Initialize sessionId from localStorage or create new one
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId')
    if (storedSessionId) {
      setSessionId(storedSessionId)
    } else {
      // Generate a simple session ID (UUID-like)
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('chatSessionId', newSessionId)
      setSessionId(newSessionId)
    }
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
    if (reduce || slow) return
    const start = () => {
      window.setTimeout(() => setPlayHeroVideo(true), 2500)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [])

  // Show "Can I help?" message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpMessage(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Function to handle sending message
  const handleSendMessage = async () => {
    if (!message.trim() || !sessionId) return
    
    setIsSendingMessage(true)
    const messageToSend = message.trim()
    setMessage('') // Clear input immediately for better UX
    
    try {
      const API_URL = getApiUrl()
      const response = await fetch(`${API_URL}/api/chat/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          userName: userName || null,
          userEmail: userEmail || null,
          message: messageToSend,
          locale: locale === 'nl-BE' ? 'nl' : 'en',
          website: chatWebsite,
        }),
      })

      if (!response.ok) {
        // Read as text first, then try to parse as JSON
        let errorMessage = 'Failed to send message'
        try {
          const errorText = await response.text()
          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use text as-is
            errorMessage = errorText || errorMessage
          }
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log('Message sent successfully:', result)
      
      // Show success feedback
      alert(h.chat.sent)
    } catch (error: any) {
      console.error('Send message error:', error)
      const errorMessage = error.message || h.chat.sendFailed
      alert(`${h.chat.sendFailed}: ${errorMessage}`)
      setMessage(messageToSend) // Restore message on error
    } finally {
      setIsSendingMessage(false)
    }
  }

  // Social Media Links - Easy to add more in the future
  const socialLinks = [
    {
      name: 'Instagram',
      url: BUSINESS.instagram,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: BUSINESS.facebook,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/32493505641',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: BUSINESS.linkedIn,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    // Add more social links here in the future
    // Example:
    // {
    //   name: 'Twitter',
    //   url: 'https://twitter.com/yourhandle',
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="..."/>
    //     </svg>
    //   )
    // },
  ]

  const showcaseSlugs = ['the-antwerp-pianist', 'tr-car-detail', 'la-vie-nomade']
  const catalog = getPortfolioItems(locale)
  const portfolioItems = showcaseSlugs.flatMap((slug) => {
    const item = catalog.find((entry) => entry.slug === slug)
    return item ? [item] : []
  })

  return (
    <div className="relative">
      {/* Floating Message Button - Always visible */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
        {/* "Can I help?" Message Bubble */}
        <AnimatePresence>
          {showHelpMessage && !showChatWidget && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="mb-2 relative bg-white border-2 border-gray-200 rounded-lg shadow-lg px-4 py-2 text-sm text-primary font-medium whitespace-nowrap"
            >
              {h.chat.help}
              {/* Arrow pointing down to button */}
              <div className="absolute bottom-0 right-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-gray-200"></div>
                <div className="absolute top-[-2px] left-[-6px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            setShowChatWidget(!showChatWidget)
            setShowHelpMessage(false) // Hide message when opening chat
          }}
          className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-cta transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={h.chat.toggle}
        >
          {showChatWidget ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </motion.button>
      </div>

      <Helmet>
        <link rel="preload" as="image" href={heroMedia.posterAvif} type="image/avif" {...{ fetchpriority: 'high' }} />
      </Helmet>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden -mt-20 pt-20">
        <picture>
          <source srcSet={heroMedia.posterAvif} type="image/avif" />
          <img
            src={heroMedia.poster}
            alt=""
            width={heroMedia.posterWidth}
            height={heroMedia.posterHeight}
            {...{ fetchpriority: 'high' }}
            decoding="async"
            className="absolute left-0 right-0 w-full object-cover z-0"
            style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
          />
        </picture>
        {playHeroVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={heroMedia.poster}
            className="absolute left-0 right-0 w-full object-cover z-0"
            style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
          >
            <source src={heroMedia.webm} type="video/webm" />
            <source src={heroMedia.mp4} type="video/mp4" />
          </video>
        )}
        {/* Background Overlay */}
        <div className="absolute left-0 right-0 w-full bg-black/50 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/60 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {h.hero.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {h.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <BookCallLink>
                  <Button size="lg" variant="cta">{c.cta.bookCall}</Button>
                </BookCallLink>
                <a href="#diensten">
                  <Button size="lg" variant="secondary">{offer.heroSecondary}</Button>
                </a>
              </div>
              {/* Social Media Section */}
              <div className="mt-8 mb-8 md:mb-0">
                <p className="text-white/80 text-sm mb-4 font-medium">{h.hero.connect}</p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200 group"
                      aria-label={`Visit our ${social.name}`}
                    >
                      <div className="text-white/80 group-hover:text-white transition-colors">
                        {social.icon}
                      </div>
                      <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Chat Widget - Fixed Position */}
      <AnimatePresence>
        {showChatWidget && (
          <motion.div
            initial={{ 
              scale: 0.8,
              opacity: 0,
              y: 20
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              y: 20
            }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.4
            }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-4 max-w-xs text-left"
          >
                  {/* Chat Header */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src={rubenPortrait.webp}
                          alt="Ruben Thielman"
                          width={rubenPortrait.width}
                          height={rubenPortrait.height}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary text-sm truncate">Ruben Thielman</div>
                      <div className="text-body-sm text-text-secondary text-xs">{h.chat.founder}</div>
                    </div>
                    <button 
                      onClick={() => setShowChatWidget(false)}
                      className="text-text-secondary hover:text-primary transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Chat Message */}
                  <div className="mb-3">
                    <p className="text-body-sm text-text-primary mb-2 leading-snug">
                      {h.chat.greeting}
                    </p>
                    <div className="flex items-center gap-1.5 text-body-sm text-text-secondary">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">{h.chat.replyTime}</span>
                    </div>
                  </div>
                  
                  {/* Chat Input Box */}
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    {/* Optional: User info fields */}
                    <div className="mb-3 space-y-2">
                      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                        <label>
                          Website
                          <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={chatWebsite}
                            onChange={(e) => setChatWebsite(e.target.value)}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder={h.chat.namePlaceholder}
                        aria-label={h.chat.namePlaceholder}
                        className="w-full px-3 py-2 text-sm text-text-primary bg-gray-50 border border-gray-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-all duration-200 placeholder:text-text-secondary/60"
                      />
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder={h.chat.emailPlaceholder}
                        aria-label={h.chat.emailPlaceholder}
                        className="w-full px-3 py-2 text-sm text-text-primary bg-gray-50 border border-gray-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-all duration-200 placeholder:text-text-secondary/60"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            if (message.trim()) {
                              handleSendMessage()
                            }
                          }
                        }}
                        placeholder={h.chat.messagePlaceholder}
                        aria-label={h.chat.messagePlaceholder}
                        className="w-full min-h-[90px] max-h-[140px] px-4 py-3 pr-12 text-sm text-text-primary bg-gray-50 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-all duration-200 resize-none placeholder:text-text-secondary/60"
                        rows={3}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isSendingMessage}
                        className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md disabled:shadow-none"
                        aria-label={h.chat.send}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-text-secondary/70">{c.pressEnter}</span>
                      <LocalizedLink to="/contact#contact-form" className="text-xs text-cta hover:text-cta/80 transition-colors font-medium">
                        {c.contactDirectly}
                      </LocalizedLink>
                    </div>
                  </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offer overview — Wat wij doen */}
      <section id="diensten" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={offer.label} title={offer.title} intro={offer.intro} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offer.cards.map((card) => (
              <ServiceCard
                key={card.href}
                href={card.href}
                tag={card.tag}
                title={card.title}
                description={card.description}
                meta={card.meta}
                linkLabel={card.linkLabel}
                badge={(card as { badge?: string }).badge}
              />
            ))}
            <div className="group h-full flex flex-col p-6 md:p-8 rounded-xl border border-dashed border-gray-300 bg-accent">
              <span className="block text-xs uppercase tracking-wider text-text-secondary mb-2">{offer.unsure.tag}</span>
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">{offer.unsure.title}</h3>
              <p className="text-body text-text-primary mb-4 flex-grow">{offer.unsure.description}</p>
              <p className="text-body-sm text-text-secondary mb-4">{offer.unsure.meta}</p>
              <BookCallLink notes="Home — wat wij doen" metadata={{ source: 'home-offer-unsure' }}>
                <span className="text-sm font-semibold text-primary cursor-pointer">{offer.unsure.linkLabel}</span>
              </BookCallLink>
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="py-16 bg-gray-900" id="bewijs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="shrink-0 text-center md:text-left">
              <div className="text-5xl md:text-6xl font-semibold text-white">{offer.proofStrip.num}</div>
              <div className="text-sm uppercase tracking-wider text-white/60 mt-2">{offer.proofStrip.lbl}</div>
            </div>
            <div className="text-white/80 text-body">
              <p className="mb-2">{offer.proofStrip.names}</p>
              <p className="text-sm text-white/45">{offer.proofStrip.extra}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight: websites */}
      <section id="websites" className="py-20 bg-accent scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-text-secondary uppercase tracking-wider mb-4">{hl.websites.label}</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">{hl.websites.title}</h2>
            <p className="text-body-lg text-text-primary mb-8">{hl.websites.intro}</p>
            <LocalizedLink to="/websites#plannen"><Button variant="primary" size="lg">{hl.websites.link}</Button></LocalizedLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {hl.websites.plans.map((plan, i) => (
              <LocalizedLink key={plan.name} to="/websites#plannen" className={`block p-6 rounded-xl border bg-white hover:shadow-lg transition-shadow ${i === 1 ? 'border-primary' : 'border-gray-200'}`}>
                <h3 className="text-lg font-semibold text-primary mb-2">{plan.name}</h3>
                <p className="text-2xl font-semibold text-primary mb-1">{plan.price}</p>
                <p className="text-body-sm text-text-secondary">{plan.note}</p>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight: workshops */}
      <section id="workshops" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-text-secondary uppercase tracking-wider mb-4">{hl.workshops.label}</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">{hl.workshops.title}</h2>
            <p className="text-body-lg text-text-primary mb-8">{hl.workshops.intro}</p>
            <LocalizedLink to="/workshops#formats"><Button variant="primary" size="lg">{hl.workshops.link}</Button></LocalizedLink>
          </div>
          <figure className="p-8 rounded-xl bg-gray-900 text-white">
            <blockquote className="text-2xl md:text-3xl font-semibold leading-snug mb-4">“{hl.workshops.quote}”</blockquote>
            <figcaption className="text-white/60 text-sm uppercase tracking-wider">{hl.workshops.attribution}</figcaption>
          </figure>
        </div>
      </section>

      {/* Highlight: start-ups + platformen */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="start-ups" className="p-8 rounded-xl bg-white border border-gray-200 flex flex-col scroll-mt-24">
            <p className="text-sm text-text-secondary uppercase tracking-wider mb-4">{hl.startUps.label}</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">{hl.startUps.title}</h2>
            <p className="text-body text-text-primary mb-4">{hl.startUps.intro}</p>
            <ul className="mb-6 space-y-2 flex-grow">
              {hl.startUps.points.map((pt) => (<li key={pt} className="text-body text-text-primary">✓ {pt}</li>))}
            </ul>
            <LocalizedLink to="/start-ups"><Button variant="secondary">{hl.startUps.link}</Button></LocalizedLink>
          </div>
          <div id="platformen" className="p-8 rounded-xl bg-white border border-gray-200 flex flex-col scroll-mt-24">
            <p className="text-sm text-text-secondary uppercase tracking-wider mb-4">{hl.platforms.label}</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">{hl.platforms.title}</h2>
            <p className="text-body text-text-primary mb-4">{hl.platforms.intro}</p>
            <div className="flex flex-wrap gap-2 mb-6 flex-grow content-start">
              {hl.platforms.clients.map((cl) => (<span key={cl} className="px-3 py-1 rounded-full bg-accent text-sm text-primary">{cl}</span>))}
            </div>
            <LocalizedLink to="/platformen"><Button variant="secondary">{hl.platforms.link}</Button></LocalizedLink>
          </div>
        </div>
      </section>

      {/* Highlight: AI agents teaser */}
      <section id="ai-agents" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center p-8 rounded-xl border border-dashed border-gray-300">
          <p className="text-sm text-text-secondary uppercase tracking-wider mb-4">{hl.aiAgents.label}</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">{hl.aiAgents.title}</h2>
          <p className="text-body text-text-primary mb-6">{hl.aiAgents.intro}</p>
          <LocalizedLink to="/ai-agents"><Button variant="secondary">{hl.aiAgents.link}</Button></LocalizedLink>
        </div>
      </section>

      {/* Selected portfolio */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={offer.portfolio.label} title={offer.portfolio.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <a key={item.slug} href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="bg-white rounded-lg h-64 mb-4 overflow-hidden border border-gray-200">
                  {item.screenshots && item.screenshots.length > 0 ? (
                    <img src={item.screenshots[0]} alt={item.title} width={1400} height={875} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
                  ) : null}
                </div>
                <h3 className="text-h3 text-primary mb-2 group-hover:text-cta transition-colors">
                  {item.title}
                  <span className="sr-only"> {t('common.a11y.opensInNewTab')}</span>
                </h3>
                <p className="text-body text-text-primary">{item.description}</p>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <LocalizedLink to="/portfolio"><Button variant="primary" size="lg">{offer.portfolio.more}</Button></LocalizedLink>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={offer.reviews.label} title={offer.reviews.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewItems.map((r) => (
              <figure key={r.id} className="p-6 rounded-xl border border-gray-200 bg-white">
                <blockquote className="text-body-lg text-text-primary mb-4">“{r.text}”</blockquote>
                <figcaption className="text-sm text-text-secondary uppercase tracking-wider">{r.author}</figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-10">
            <LocalizedLink to="/reviews"><Button variant="secondary">{offer.reviews.more}</Button></LocalizedLink>
          </div>
        </div>
      </section>

      {/* Cross-service FAQ */}
      <section className="py-20 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={offer.faq.label} title={offer.faq.title} />
          <FaqAccordion items={offer.faq.items} />
        </div>
      </section>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: offer.faq.items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
        })}</script>
      </Helmet>

      <span id="cta" />
      <CtaBand title={offer.cta.title} subtitle={offer.cta.subtitle}>
        <BookCallLink notes="Home — CTA band" metadata={{ source: 'home-cta-band' }}>
          <Button size="lg" variant="cta">{offer.cta.button}</Button>
        </BookCallLink>
        <LocalizedLink to="/contact#contact-form"><Button size="lg" variant="secondary">{c.contactDirectly}</Button></LocalizedLink>
      </CtaBand>
    </div>
  )
}
