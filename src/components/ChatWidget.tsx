import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import { COOKIE_BANNER_STATE_EVENT } from './CookieConsentBanner'
import rubenImage from '../images/WhatsApp Image 2026-01-11 at 13.25.54.jpeg'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [cookieOpen, setCookieOpen] = useState(
    () => typeof document !== 'undefined' && document.documentElement.dataset.cookieBanner === 'open'
  )

  useEffect(() => {
    const onState = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail
      setCookieOpen(Boolean(detail?.open))
    }
    window.addEventListener(COOKIE_BANNER_STATE_EVENT, onState)
    return () => window.removeEventListener(COOKIE_BANNER_STATE_EVENT, onState)
  }, [])

  // Sit above the cookie banner when open; keep away from footer Cookie Preferences (bottom-left/center).
  const bottomClass = cookieOpen ? 'bottom-44 sm:bottom-36' : 'bottom-6'

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${bottomClass} right-4 sm:right-6 z-20 w-14 h-14 sm:w-16 sm:h-16 bg-cta rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-cta/90 transition-all`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${cookieOpen ? 'bottom-60 sm:bottom-52' : 'bottom-24'} right-4 sm:right-6 z-20 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden`}
          >
            <div className="bg-gradient-to-r from-cta to-cta/90 p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <img src={rubenImage} alt="Ruben Thielman" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-base">Ruben Thielman</div>
                <div className="text-body-sm text-white/90">Founder & Developer</div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors" type="button">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 bg-accent/30 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img src={rubenImage} alt="Ruben Thielman" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                    <p className="text-body-sm text-text-primary">
                      Hello! 👋 I&apos;m Ruben, founder of Studio Thielman. How can I help you today?
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-text-secondary pl-10">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Usually replies within 1 hour</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-border">
              <Link to="/contact#contact-form" className="block" onClick={() => setIsOpen(false)}>
                <Button variant="cta" size="md" className="w-full">
                  Start Conversation
                </Button>
              </Link>
              <div className="mt-2 flex items-center justify-center gap-1 text-body-sm text-text-secondary">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="ml-2">Online now</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
