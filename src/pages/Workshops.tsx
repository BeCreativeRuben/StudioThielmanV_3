import { motion } from 'framer-motion'
import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

export default function Workshops() {
  const { messages } = useLocale()
  const h = messages.workshops.hub

  const tracks = [
    {
      ...h.tracks.incompany,
      to: '/workshops/incompany',
    },
    {
      ...h.tracks.oneOnOne,
      to: '/workshops/1-1',
    },
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

      {/* Two tracks */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {tracks.map((track, index) => (
              <motion.div
                key={track.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="text-sm text-text-secondary uppercase tracking-wider mb-3">{track.label}</div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{track.title}</h2>
                <p className="text-body text-text-primary leading-relaxed mb-6 flex-grow">{track.description}</p>
                <div className="text-lg font-semibold text-primary mb-6">{track.price}</div>
                <LocalizedLink to={track.to}>
                  <Button variant="cta" size="md" className="w-full">
                    {track.cta}
                  </Button>
                </LocalizedLink>
              </motion.div>
            ))}
          </div>
        </div>
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
          <LocalizedLink to="/contact#contact-form">
            <Button variant="cta" size="lg">
              {h.cta.button}
            </Button>
          </LocalizedLink>
        </motion.div>
      </section>
    </div>
  )
}
