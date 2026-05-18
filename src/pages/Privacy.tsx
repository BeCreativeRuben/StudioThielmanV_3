import { motion } from 'framer-motion'
import LegalDocument from '../components/LegalDocument'
import { useLocale } from '../i18n/LocaleProvider'

export default function Privacy() {
  const { messages } = useLocale()
  const copy = messages.legal.privacy

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div
          className="absolute left-0 right-0 w-full bg-gray-900"
          style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        />
        <motion.div
          className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0"
          style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{messages.legal.label}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{copy.title}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{copy.intro}</p>
            <p className="text-sm text-white/60 mt-4">{copy.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <LegalDocument sections={copy.sections} />
          </div>
        </div>
      </section>
    </motion.div>
  )
}
