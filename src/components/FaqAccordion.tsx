import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type FaqItem = { question: string; answer: string }

type Props = {
  items: readonly FaqItem[]
}

/** Accordion FAQ list — same markup/style as the original Packages FAQ. */
export default function FaqAccordion({ items }: Props) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <motion.div className="space-y-4">
      {items.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            aria-expanded={expandedFaq === index}
          >
            <h3 className="text-lg font-semibold text-primary pr-4">{faq.question}</h3>
            <svg
              className={`w-5 h-5 text-cta flex-shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}
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
                <motion.div className="px-6 pb-5 pt-0">
                  <p className="text-body-sm text-text-primary leading-relaxed">{faq.answer}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )
}
