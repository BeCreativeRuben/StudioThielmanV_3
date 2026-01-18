import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { blogPosts } from '../data/blog'

export default function Blog() {
  return (
    <div>
      {/* Hero Section - Dark Background */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">BLOG</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Expert Insights</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Tips, insights, and strategies to help your business thrive online.</p>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
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
                                parent.innerHTML = '<span class="text-text-secondary">Blog Image</span>'
                              }
                            }}
                          />
                        ) : (
                          <span className="text-text-secondary">Blog Image</span>
                        )}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-text-secondary uppercase tracking-wider">Article</div>
                        <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-cta transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-body-sm text-text-primary mb-4 flex-grow leading-relaxed line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                        <span className="text-sm font-semibold text-primary group-hover:text-cta transition-colors flex items-center gap-1">
                          Read More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Boost Your Online Presence?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let's discuss how we can help your business stand out online.
            </p>
            <Link to="/contact#contact-form">
              <Button variant="cta" size="lg">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
