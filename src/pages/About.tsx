import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import rubenImage from '../images/WhatsApp Image 2026-01-11 at 13.25.54.jpeg'

export default function About() {
  const values = [
    {
      title: 'Professionalism',
      description: 'We are experts. Our work speaks. No compromises on quality.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: 'Accessibility',
      description: 'Enterprise-grade solutions at startup prices. Everyone deserves a professional web presence.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Innovation',
      description: 'AI-powered solutions that give you a competitive edge. We stay ahead of the curve.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Partnership',
      description: 'We\'re invested in your success. Personal support included. Your growth is our success.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ]

  const team = [
    {
      name: 'Ruben Thielman',
      role: 'Founder & Developer',
      bio: '22-year-old passionate developer building web solutions. Dedicated to creating exceptional digital experiences with clean code, innovative solutions, and user-centered design.',
      photo: rubenImage
    }
  ]

  return (
    <div>
      {/* Hero Section - Dark Background */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">ABOUT US</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">We're Here to Make Web Simple</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">And Powerful. Building exceptional digital experiences with passion and expertise.</p>
        </motion.div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-40 h-40 rounded-full mx-auto mb-8 overflow-hidden border-4 border-cta shadow-lg">
              <img 
                src={rubenImage} 
                alt="Ruben Thielman"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">FOUNDER</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">Ruben Thielman</h2>
            <div className="space-y-6 text-body-lg text-text-primary max-w-3xl mx-auto">
              <p>
                I'm a passionate software and web developer dedicated to creating exceptional digital experiences. 
                With a focus on clean code, innovative solutions, and user-centered design, I bring ideas to life through technology.
              </p>
              <p>
                My work combines technical expertise with creative problem-solving to deliver projects that make an impact. 
                Whether it's building responsive web applications, developing robust software solutions, or crafting intuitive 
                user interfaces, I approach each project with attention to detail and a commitment to excellence.
              </p>
              <p>
                At 22 years old, I bring fresh energy and modern approaches to web development, ensuring your business 
                gets cutting-edge solutions that actually work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">OUR TEAM</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Meet the Team</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">
              Young, passionate, dedicated to excellence
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden border-4 border-cta shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-cta transition-colors">{member.name}</h3>
                  <p className="text-body-sm text-text-secondary mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-body-sm text-text-primary leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">OUR VALUES</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What We Stand For</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-cta/10 rounded-lg flex items-center justify-center mb-4 text-cta group-hover:bg-cta group-hover:text-white transition-all duration-300">
                    <div className="flex-shrink-0 w-6 h-6">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-cta transition-colors">{value.title}</h3>
                  <p className="text-body-sm text-text-primary leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let's bring your vision to life with a website that stands out.
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
