import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import { portfolioItems as allPortfolioItems } from '../data/portfolio'
import { currentProjects } from '../data/currentProjects'
import { getApiUrl } from '../utils/api'
import rubenImage from '../images/WhatsApp Image 2026-01-11 at 13.25.54.jpeg'
import heroVideo from '../images/z_Upload-Image---Internal-Only-Style-6bab5259.mp4'
import officeImage from '../images/c2ea26ea-23d3-4ee1-8710-74211f2d80be.jpeg'

// Service Images - Using Unsplash placeholders that match each service theme
const serviceImages = {
  webDesign: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&q=80', // Web design/development workspace
  branding: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop&q=80', // Branding materials and design
  seo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80', // Analytics and data visualization
  ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&q=80', // Online shopping and e-commerce
  ai: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&q=80', // AI and technology
  cms: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop&q=80' // Content management dashboard
}

// Blog Countdown Component
function BlogCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  })

  useEffect(() => {
    // Target: 18/01/2026 at 14:00 UTC+1 (13:00 UTC)
    const targetDate = new Date('2026-01-18T13:00:00Z')
    
    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          total: distance
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  if (timeLeft.total <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-accent border border-gray-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-primary mb-2">Blog is Live</h3>
          <p className="text-body text-text-primary">The first blog post is now available.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-accent border border-gray-200 rounded-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            First Blog Post Coming Soon
          </h3>
          <p className="text-body text-text-primary">
            Releasing on <span className="font-semibold">January 18, 2026 at 14:00 UTC+1</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="text-center"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-xs text-text-secondary uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [expandedService, setExpandedService] = useState(0)
  const [showChatWidget, setShowChatWidget] = useState(false)
  const [showHelpMessage, setShowHelpMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isSendingMessage, setIsSendingMessage] = useState(false)

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

  // Show "Can I help?" message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpMessage(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const values = [
    {
      title: 'Professionalism',
      description: 'We are experts. Our work speaks. No compromises on quality.'
    },
    {
      title: 'Accessibility',
      description: 'Enterprise-grade solutions at startup prices. Everyone deserves a professional web presence.'
    },
    {
      title: 'Innovation',
      description: 'AI-powered solutions that give you a competitive edge. We stay ahead of the curve.'
    },
    {
      title: 'Partnership',
      description: 'We\'re invested in your success. Personal support included. Your growth is our success.'
    }
  ]


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
        }),
      })

      if (!response.ok) {
        // Try to parse as JSON, fallback to text if it fails
        let errorMessage = 'Failed to send message'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // If response is not JSON, get text
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log('Message sent successfully:', result)
      
      // Show success feedback
      alert('Message sent! We\'ll get back to you soon.')
    } catch (error: any) {
      console.error('Send message error:', error)
      const errorMessage = error.message || 'Failed to send message. Please try again.'
      alert(`Failed to send message: ${errorMessage}`)
      setMessage(messageToSend) // Restore message on error
    } finally {
      setIsSendingMessage(false)
    }
  }

  // Social Media Links - Easy to add more in the future
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourhandle', // Replace with actual URL
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/yourpage', // Replace with actual URL
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/yourphonenumber', // Replace with actual phone number (e.g., +1234567890)
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/yourcompany', // Replace with actual URL
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

  const services = [
    {
      title: 'Custom Web Design',
      description: 'We create unique, responsive websites tailored to your brand and business needs. Every website is built from scratch, ensuring your brand stands out with a design that perfectly represents your vision.',
      features: [
        'Fully responsive design (mobile, tablet, desktop)',
        'Custom UI/UX design based on your brand',
        'Fast loading times and optimized performance',
        'Cross-browser compatibility',
        'Modern animations and interactions',
        'Accessibility compliance (WCAG 2.1 AA)'
      ],
      image: serviceImages.webDesign,
      benefits: 'Get a website that looks professional, loads fast, and works perfectly on every device.'
    },
    {
      title: 'Branding & Graphic Design',
      description: 'Complete branding solutions to establish your visual identity. From logo design to brand guidelines, we help you create a cohesive brand presence that resonates with your audience.',
      features: [
        'Logo design and brand identity',
        'Color palette and typography selection',
        'Brand style guide creation',
        'Social media asset design',
        'Business card and print materials',
        'Brand consistency across all touchpoints'
      ],
      image: serviceImages.branding,
      benefits: 'Build a memorable brand that customers recognize and trust.'
    },
    {
      title: 'SEO & Digital Marketing',
      description: 'Boost your online visibility and reach your target audience effectively. We implement proven SEO strategies and digital marketing tactics to drive organic traffic and conversions.',
      features: [
        'On-page SEO optimization',
        'Keyword research and strategy',
        'Content optimization',
        'Technical SEO audits',
        'Google Analytics integration',
        'Monthly performance reports',
        'Local SEO for businesses',
        'Link building strategies'
      ],
      image: serviceImages.seo,
      benefits: 'Rank higher in search results and attract more qualified visitors to your website.'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Full-featured online stores with secure payment processing. We build e-commerce platforms that make it easy for customers to browse, purchase, and return to your store.',
      features: [
        'Product catalog management',
        'Shopping cart and checkout',
        'Secure payment gateways (Stripe, PayPal)',
        'Inventory management',
        'Order tracking system',
        'Customer account management',
        'Product reviews and ratings',
        'Shipping integration',
        'Tax calculation',
        'Abandoned cart recovery'
      ],
      image: serviceImages.ecommerce,
      benefits: 'Sell products online with a secure, user-friendly platform that converts visitors into customers.'
    },
    {
      title: 'AI Integration & Automation',
      description: 'Leverage the power of AI to automate your business processes. From chatbots to workflow automation, we integrate AI solutions that save time and improve customer experience.',
      features: [
        'AI-powered chatbots',
        'Customer support automation',
        'Workflow automation (N8N)',
        'AI content generation',
        'Predictive analytics',
        'Personalization engines',
        'Email automation sequences',
        'Lead qualification systems'
      ],
      image: serviceImages.ai,
      benefits: 'Automate repetitive tasks and provide 24/7 customer support with AI-powered solutions.'
    },
    {
      title: 'Content Management Systems',
      description: 'Take control of your website content with easy-to-use CMS solutions. Update your website anytime, anywhere, without needing technical knowledge.',
      features: [
        'User-friendly content editor',
        'Media library management',
        'Page builder functionality',
        'Blog and article management',
        'User role permissions',
        'Version control and backups',
        'Multi-language support',
        'Scheduled content publishing'
      ],
      image: serviceImages.cms,
      benefits: 'Manage your website content independently, make updates instantly, and keep your site fresh.'
    }
  ]

  // Filter portfolio items to show only active (non-coming-soon) items, limit to 6 for homepage
  const portfolioItems = allPortfolioItems.filter(item => !item.comingSoon).slice(0, 6)

  return (
    <div className="relative">
      {/* Floating Message Button - Always visible */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
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
              Can I help?
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
          aria-label="Toggle chat"
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

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden -mt-20 pt-20">
        {/* Background Video - extends behind header and covers full section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 right-0 w-full object-cover z-0"
          style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Background Overlay */}
        <div className="absolute left-0 right-0 w-full bg-black/50 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/60 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Innovative web solutions for modern business
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Whether you're a startup, an established business, or an enterprise, we're here to help you reach new heights online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/contact#contact-form">
                  <Button size="lg" variant="cta">Book a Call</Button>
                </Link>
                <Link to="/packages">
                  <Button size="lg" variant="secondary">View Packages</Button>
                </Link>
              </div>
              {/* Social Media Section */}
              <div className="mt-8">
                <p className="text-white/80 text-sm mb-4 font-medium">Connect with us</p>
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
            className="fixed bottom-24 right-6 z-50 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-4 max-w-xs text-left"
          >
                  {/* Chat Header */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                        <img 
                          src={rubenImage} 
                          alt="Ruben Thielman"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary text-sm truncate">Ruben Thielman</div>
                      <div className="text-body-sm text-text-secondary text-xs">Founder & Developer</div>
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
                      Hello! 👋 I'm Ruben, founder of Studio Thielman. How can I help you today?
                    </p>
                    <div className="flex items-center gap-1.5 text-body-sm text-text-secondary">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">Usually replies within 1 hour</span>
                    </div>
                  </div>
                  
                  {/* Chat Input Box */}
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    {/* Optional: User info fields */}
                    <div className="mb-3 space-y-2">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your name (optional)"
                        className="w-full px-3 py-2 text-sm text-text-primary bg-gray-50 border border-gray-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-all duration-200 placeholder:text-text-secondary/60"
                      />
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Your email (optional)"
                        className="w-full px-3 py-2 text-sm text-text-primary bg-gray-50 border border-gray-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-all duration-200 placeholder:text-text-secondary/60"
                      />
                    </div>
                    <div className="relative">
                      <textarea
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
                        placeholder="Type your message..."
                        className="w-full min-h-[90px] max-h-[140px] px-4 py-3 pr-12 text-sm text-text-primary bg-gray-50 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-all duration-200 resize-none placeholder:text-text-secondary/60"
                        rows={3}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isSendingMessage}
                        className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md disabled:shadow-none"
                        aria-label="Send message"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-text-secondary/70">Press Enter to send</span>
                      <Link to="/contact#contact-form" className="text-xs text-cta hover:text-cta/80 transition-colors font-medium">
                        Contact directly →
                      </Link>
                    </div>
                  </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">ABOUT US</div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                We build websites that work.
              </h2>
              <div className="space-y-4 text-lg text-text-primary leading-relaxed">
                <p>
                  No fluff. No overpromising. Just clean, effective websites that help your business grow.
                </p>
                <p>
                  We focus on what matters: your goals, your audience, and results that make a difference.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Image and Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-lg h-96 mb-8 overflow-hidden">
                <img 
                  src={officeImage} 
                  alt="Office workspace" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">30+</div>
                  <div className="text-body text-text-secondary">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">85%</div>
                  <div className="text-body text-text-secondary">Client Satisfaction</div>
                </div>
              </div>
              <Link to="/contact#contact-form">
                <Button variant="primary" className="w-full">Book a Call</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">OUR WORK</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12">
              Explore Our Portfolio Showcase
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/portfolio/${item.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-accent rounded-lg h-64 mb-4 flex items-center justify-center overflow-hidden">
                      {item.screenshots && item.screenshots.length > 0 ? (
                        <img
                          src={item.screenshots[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = '<span class="text-text-secondary">Project Image</span>'
                            }
                          }}
                        />
                      ) : (
                        <span className="text-text-secondary">Project Image</span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">Case Study</div>
                    <h3 className="text-h3 text-primary mb-2 group-hover:text-cta transition-colors">{item.title}</h3>
                    <p className="text-body text-text-primary mb-2">{item.description}</p>
                    <div className="text-body-sm text-text-secondary">{item.date}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/portfolio">
              <Button variant="primary" size="lg">More Projects</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">OUR SERVICES</div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Services We Offer
              </h2>
              <p className="text-body-lg text-text-primary mb-4">
                We provide comprehensive web solutions tailored to your business needs.
              </p>
              <p className="text-body-lg text-text-primary mb-8">
                From custom web design to e-commerce solutions, we've got you covered.
              </p>
              <Link to="/packages">
                <Button variant="primary">Get a Quote</Button>
              </Link>
            </motion.div>

            {/* Right Content - Accordion */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div
                    className={`border border-border rounded-lg overflow-hidden transition-all duration-300 ${
                      expandedService === index ? 'shadow-lg' : ''
                    }`}
                  >
                    <button
                      onClick={() => setExpandedService(expandedService === index ? -1 : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent transition-colors"
                    >
                      <span className="text-h4 text-primary font-semibold">
                        ({String(index + 1).padStart(2, '0')}) {service.title}
                      </span>
                      <svg
                        className={`w-6 h-6 text-primary transition-transform ${
                          expandedService === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {expandedService === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                        <div className="bg-accent rounded-lg h-48 mb-4 overflow-hidden">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-body text-text-primary mb-4 leading-relaxed">{service.description}</p>
                        
                        {service.benefits && (
                          <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                            <div className="text-sm font-semibold text-primary mb-1">Key Benefit</div>
                            <div className="text-body-sm text-text-primary">{service.benefits}</div>
                          </div>
                        )}
                        
                        {service.features.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm font-semibold text-primary mb-3">What's Included:</div>
                            <ul className="space-y-2">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="text-body-sm text-text-primary flex items-start">
                                  <span className="text-cta mr-2 mt-1 font-bold flex-shrink-0">✓</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <Link to="/packages">
                            <Button variant="outline" size="sm">View Packages →</Button>
                          </Link>
                          <Link to="/contact#contact-form">
                            <Button variant="primary" size="sm">Get Started</Button>
                          </Link>
                        </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Stand For
            </h2>
            <div className="w-20 h-1 bg-cta mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 border-l-4 border-cta/50 hover:border-cta rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cta transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-body text-white/80 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Expert Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">BLOG</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our expert insights.
            </h2>
            <p className="text-body-lg text-text-primary mb-8">
              Our blog is still a work in progress. The first blog post will be released soon!
            </p>
          </motion.div>
          
          {/* Countdown Timer */}
          <BlogCountdown />
        </div>
      </section>

      {/* Current Projects Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">WORK IN PROGRESS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              What I'm Building Now
            </h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">
              See my current projects, what I'm learning, and what's coming next. Transparency in progress.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary flex-1">{project.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'testing' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.status === 'in-progress' ? '🚧' : project.status === 'planning' ? '📋' : project.status === 'testing' ? '🧪' : '✨'}
                  </span>
                </div>
                <p className="text-body-sm text-text-primary mb-4">{project.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">Progress</span>
                    <span className="text-xs font-semibold text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-cta rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                  <span>📅 {project.startDate}</span>
                  <span>🔧 {project.technologies.length} tech</span>
                </div>

                <Link to="/current-projects">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details →
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/current-projects">
              <Button variant="primary" size="lg">
                View All Current Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mid-Footer CTA */}
      <section className="py-6 bg-accent overflow-hidden relative">
        <div className="relative w-full overflow-hidden" data-marquee-container>
          <div className="flex text-5xl md:text-7xl font-bold text-text-secondary/30 uppercase tracking-wider marquee-container">
            <div className="flex whitespace-nowrap items-center marquee-content">
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
            </div>
            <div className="flex whitespace-nowrap items-center marquee-content" aria-hidden="true">
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
              <span className="px-20">BUILDING FUTURES TOGETHER</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
