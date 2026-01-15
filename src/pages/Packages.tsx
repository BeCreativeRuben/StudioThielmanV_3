import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Packages() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const packages = [
    {
      name: 'Starter',
      price: '€25/month',
      startupFee: 'No startup fee',
      description: 'Get online without breaking the bank. A professional web presence for anyone.',
      features: [
        '3-5 static pages OR one-pager',
        'Responsive Design (Mobile-optimized)',
        'Email Service (500 emails/month)',
        'Simple booking systems, basic contact forms',
        'Simple animations',
        'Basic on-page SEO optimization',
        'Email support, documentation'
      ],
      idealFor: [
        'Freelancers & personal brands',
        'Small local businesses',
        'Portfolio websites',
        'Simple service businesses'
      ],
      highlighted: false
    },
    {
      name: 'Growth',
      price: '€40/month',
      startupFee: '+ €250 startup',
      description: 'Scale your online presence. Convert visitors into customers. Stay ahead of competitors.',
      features: [
        'All Starter Features',
        'Dynamic website with interactive elements',
        'Advanced Email Service (unlimited for clients & customers)',
        'Optimized conversion funnels',
        'Automated monthly follow-ups, lead tracking',
        'Simple CMS system (content management without coding)',
        'Complex animations',
        'Full SEO optimization (keywords, meta, structure, speed)',
        'Basic analytics & monthly reports',
        'Priority email & chat support'
      ],
      idealFor: [
        'Established small businesses (10-50 employees)',
        'E-service providers (consultants, trainers)',
        'Businesses with customer acquisition focus',
        'Companies looking to modernize'
      ],
      highlighted: true
    },
    {
      name: 'Pro Max',
      price: '€80/month',
      startupFee: '+ €500 startup',
      description: 'Go all-in. Automate your business. Let AI work for you while you focus on growth.',
      features: [
        'All Growth Features',
        'Full CMS System (complete content, media, site management)',
        'E-commerce Integration (Shopify, WooCommerce, or custom)',
        'AI Conversions (real-time customer data, continuous A/B testing)',
        'AI Integrations (Chatbots, Call support, Custom assistants, N8N workflows)',
        'Custom animations (advanced, bespoke interactions)',
        'Advanced Analytics (heat maps, user behavior, custom dashboards)',
        'White-Glove Service (bi-monthly reviews, quarterly strategy, dedicated manager)',
        '24/5 priority support, dedicated contact'
      ],
      idealFor: [
        'E-commerce businesses',
        'SaaS platforms',
        'AI-powered service platforms',
        'Businesses requiring advanced automation'
      ],
      highlighted: false
    }
  ]

  const faqs = [
    {
      question: 'Can I upgrade or downgrade my package later?',
      answer: 'Yes! You can upgrade or downgrade your package at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'What happens if I need features not in my package?',
      answer: 'We offer custom add-ons and can upgrade your package. Contact us to discuss your specific needs.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. The prices shown are what you pay. Startup fees are one-time only for Growth and Pro Max packages.'
    },
    {
      question: 'How long does it take to build my website?',
      answer: 'Starter: 1-2 weeks, Growth: 2-4 weeks, Pro Max: 4-6 weeks. Timeline depends on complexity and your responsiveness.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-b from-black/40 to-black/60" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/80 uppercase tracking-wider mb-4">OUR PACKAGES</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Choose Your Plan</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Everything you need to grow online. Transparent pricing, no hidden fees.</p>
        </motion.div>
      </section>

      {/* Packages Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">PRICING</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Simple, Transparent Pricing</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">
              Choose the package that fits your needs. All packages include ongoing support and updates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  hover 
                  className={`h-full flex flex-col ${pkg.highlighted ? 'border-2 border-cta shadow-xl' : ''}`}
                >
                  {pkg.highlighted && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-body-sm font-bold px-4 py-2 rounded-full inline-block mb-4 shadow-lg uppercase tracking-wider">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="flex-grow">
                    <h3 className="text-3xl font-bold text-primary mb-2">{pkg.name}</h3>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-primary">{pkg.price}</div>
                      <div className="text-body-sm text-text-secondary mt-1">{pkg.startupFee}</div>
                    </div>
                    <p className="text-body text-text-primary mb-6">{pkg.description}</p>

                    <div className="mb-6">
                      <h4 className="text-h4 text-primary mb-3 font-semibold">What's Included:</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="text-body-sm text-text-primary flex items-start">
                            <span className="text-cta mr-2 mt-1 font-bold">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-h4 text-primary mb-3 font-semibold">Perfect For:</h4>
                      <ul className="space-y-2">
                        {pkg.idealFor.map((item, idx) => (
                          <li key={idx} className="text-body-sm text-text-primary flex items-start">
                            <span className="text-cta mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <Link to="/contact#contact-form">
                      <Button 
                        variant={pkg.highlighted ? 'cta' : 'outline'} 
                        size="md" 
                        className="w-full"
                      >
                        Choose {pkg.name}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">FAQ</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">
              Everything you need to know about our packages
            </p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                <AnimatePresence>
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
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Have questions? Let's discuss which package is right for you.
          </p>
          <Link to="/contact#contact-form">
            <Button variant="secondary" size="lg">Book a Free Consultation</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
