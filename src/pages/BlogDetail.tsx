import { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import { getBlogPostBySlug, BlogPost } from '../data/blog'

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const htmlSectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPostBySlug(slug)
      if (foundPost) {
        setPost(foundPost)
      } else {
        // Redirect to blog if post not found
        navigate('/blog')
      }
    }
  }, [slug, navigate])

  // Execute scripts in HTML sections after they're rendered
  useEffect(() => {
    if (!post) return

    // Load Mailchimp CSS if not already loaded
    const mailchimpCSS = '//cdn-images.mailchimp.com/embedcode/classic-061523.css'
    if (!document.querySelector(`link[href="${mailchimpCSS}"]`)) {
      const link = document.createElement('link')
      link.href = mailchimpCSS
      link.rel = 'stylesheet'
      link.type = 'text/css'
      document.head.appendChild(link)
    }

    // Load jQuery if not already loaded (required for Mailchimp validation)
    if (typeof window.jQuery === 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
      script.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4='
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
      
      script.onload = () => {
        // Execute Mailchimp scripts after jQuery loads
        executeMailchimpScripts()
      }
    } else {
      executeMailchimpScripts()
    }

    function executeMailchimpScripts() {
      // Execute scripts in all HTML sections
      Object.values(htmlSectionRefs.current).forEach((container) => {
        if (!container) return

        const scripts = container.querySelectorAll('script')
        scripts.forEach((oldScript) => {
          // Skip if script already executed
          if (oldScript.dataset.executed === 'true') return
          
          const newScript = document.createElement('script')
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value)
          })
          newScript.textContent = oldScript.textContent
          oldScript.dataset.executed = 'true'
          oldScript.parentNode?.replaceChild(newScript, oldScript)
        })
      })
    }
  }, [post])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-primary">Loading blog post...</p>
        </div>
      </div>
    )
  }

  const renderSection = (section: typeof post.sections[0], index: number) => {
    switch (section.type) {
      case 'heading':
        const HeadingTag = section.level === 2 ? 'h2' : section.level === 3 ? 'h3' : 'h2'
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mt-12 mb-6 first:mt-0"
          >
            {HeadingTag === 'h2' ? (
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{section.content}</h2>
            ) : (
              <h3 className="text-2xl md:text-3xl font-bold text-primary">{section.content}</h3>
            )}
          </motion.div>
        )
      case 'paragraph':
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-body-lg text-text-primary leading-relaxed mb-6"
          >
            {section.content}
          </motion.p>
        )
      case 'image':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="my-8"
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={section.content}
                alt={section.alt || 'Blog image'}
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-64 bg-gray-100 flex items-center justify-center"><span class="text-text-secondary">Image not available</span></div>'
                  }
                }}
              />
            </div>
          </motion.div>
        )
      case 'html':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="my-8"
            ref={(el) => {
              htmlSectionRefs.current[index] = el
            }}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: '400px' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: '400px' }}></div>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <Link
              to="/blog"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2 mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white/60 text-sm uppercase tracking-wider">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{post.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{post.excerpt}</p>
        </motion.div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-lg max-w-none">
              {post.sections.map((section, index) => renderSection(section, index))}
            </div>
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
              {post.cta.text}
            </h2>
            <Link to={post.cta.link}>
              <Button variant="cta" size="lg">
                Contacteer Studio Thielman
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
