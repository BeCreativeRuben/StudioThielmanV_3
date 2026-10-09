import { motion } from 'framer-motion'
import Button from '../components/Button'
import BookCallLink from '../components/BookCallLink'
import FaqAccordion from '../components/FaqAccordion'
import LinkedInPostCard from '../components/LinkedInPostCard'
import WorkshopWaitlistForm from '../components/WorkshopWaitlistForm'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

function scrollToWaitlist() {
  const el = document.getElementById('waitlist')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Workshops() {
  const { messages } = useLocale()
  const h = messages.workshops.hub

  const tracks = [
    { ...h.tracks.incompany, key: 'incompany', to: '/workshops/incompany', badge: undefined as string | undefined },
    { ...h.tracks.oneOnOne, key: 'oneOnOne', to: '/workshops/1-1', badge: undefined as string | undefined },
    { ...h.tracks.group, key: 'group', to: null as string | null },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{h.hero.label}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{h.hero.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{h.hero.subtitle}</p>
        </motion.div>
      </section>

      {/* Tracks */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track, index) => (
              <motion.div
                key={track.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="text-sm text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-3">
                  {track.label}
                  {track.badge && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium normal-case tracking-normal">
                      {track.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{track.title}</h2>
                <p className="text-body text-text-primary leading-relaxed mb-4 flex-grow">{track.description}</p>
                <p className="text-sm text-text-secondary mb-6">{track.facts}</p>
                <div className="text-lg font-semibold text-primary mb-1">{track.price}</div>
                <p className="text-sm text-text-secondary mb-6">{track.priceNote}</p>
                {track.to ? (
                  <LocalizedLink to={track.to}>
                    <Button variant="cta" size="md" className="w-full">
                      {track.cta}
                    </Button>
                  </LocalizedLink>
                ) : (
                  <Button variant="outline" size="md" className="w-full" onClick={scrollToWaitlist}>
                    {track.cta}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          {/* AI talks & lectures */}
          <p className="mt-10 text-center text-body text-text-primary">
            {h.talks.text}{' '}
            <LocalizedLink to="/ai-talks" className="text-cta font-semibold underline underline-offset-4 hover:no-underline">
              {h.talks.cta} →
            </LocalizedLink>
          </p>

          {/* Developers & AI agents */}
          <motion.p
            className="mt-10 text-center text-body text-text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {h.developers.text}{' '}
            <BookCallLink
              notes="Workshop developers & AI-agents"
              metadata={{ source: 'workshops-developers' }}
              className="text-cta font-semibold underline underline-offset-4 hover:no-underline"
            >
              {h.developers.cta} →
            </BookCallLink>
          </motion.p>
        </div>
      </section>

      {/* Social proof (compact) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.proof.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">{h.proof.title}</h2>
          </motion.div>
          <LinkedInPostCard
            href={h.proof.postUrl}
            author={h.proof.postAuthor}
            date={h.proof.postDate}
            quote={h.proof.quote}
            attribution={h.proof.attribution}
            linkLabel={h.proof.linkLabel}
            className="bg-white"
          />
          <div className="mt-6">
            <LocalizedLink to="/workshops/incompany" className="text-sm font-semibold text-primary hover:text-cta transition-colors">
              {h.proof.moreLabel} →
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* Group class waitlist */}
      <section id="waitlist" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.waitlist.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{h.waitlist.title}</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">{h.waitlist.subtitle}</p>
          </motion.div>
          <WorkshopWaitlistForm />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.faq.label}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{h.faq.title}</h2>
            <p className="text-body-lg text-text-primary max-w-2xl mx-auto">{h.faq.subtitle}</p>
          </motion.div>
          <FaqAccordion items={h.faq.items} />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{h.cta.label}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{h.cta.title}</h2>
          <p className="text-lg text-white/80 mb-8">{h.cta.subtitle}</p>
          <BookCallLink notes={h.cta.bookingNote} metadata={{ source: 'workshops-hub' }}>
            <Button variant="cta" size="lg">
              {h.cta.button}
            </Button>
          </BookCallLink>
        </motion.div>
      </section>
    </div>
  )
}
