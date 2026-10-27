import { motion } from 'framer-motion'

type Props = {
  label?: string
  title: string
  intro?: string
  names?: string[]
  quote?: { text: string; attribution: string }
  variant?: 'light' | 'dark'
}

/** Named proof above price — only real repo proof. */
export default function ProofStrip({ label, title, intro, names, quote, variant = 'light' }: Props) {
  const isDark = variant === 'dark'
  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {label ? (
            <p className={`text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-white/60' : 'text-text-secondary'}`}>
              {label}
            </p>
          ) : null}
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-primary'}`}>
            {title}
          </h2>
          {intro ? (
            <p className={`text-body-lg max-w-2xl mx-auto ${isDark ? 'text-white/80' : 'text-text-primary'}`}>{intro}</p>
          ) : null}
        </motion.div>

        {quote ? (
          <motion.blockquote
            className={`max-w-3xl mx-auto mb-10 border-l-4 pl-6 ${isDark ? 'border-white/30' : 'border-gray-300'}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className={`text-xl md:text-2xl font-medium italic mb-3 ${isDark ? 'text-white' : 'text-primary'}`}>
              “{quote.text}”
            </p>
            <cite className={`not-italic text-sm ${isDark ? 'text-white/60' : 'text-text-secondary'}`}>
              {quote.attribution}
            </cite>
          </motion.blockquote>
        ) : null}

        {names && names.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-3">
            {names.map((name) => (
              <span
                key={name}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm border ${
                  isDark
                    ? 'border-white/20 bg-white/5 text-white/90'
                    : 'border-gray-200 bg-accent text-text-primary'
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
