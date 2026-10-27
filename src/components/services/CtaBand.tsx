import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  title: string
  subtitle: string
  children: ReactNode
}

/** Dark CTA band — Book-a-Call / contact. */
export default function CtaBand({ title, subtitle, children }: Props) {
  return (
    <section className="py-20 bg-gray-900">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">{title}</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">{children}</div>
      </motion.div>
    </section>
  )
}
