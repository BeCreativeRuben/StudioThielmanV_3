import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  label: string
  title: string
  subtitle: string
  actions?: ReactNode
}

/** Dark hero used on every service page — matches brand.md / Packages pattern. */
export default function ServiceHero({ label, title, subtitle, actions }: Props) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden -mt-20 pt-20">
      <div
        className="absolute left-0 right-0 w-full bg-gray-900"
        style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        aria-hidden
      />
      <div
        className="absolute left-0 right-0 w-full bg-gradient-to-b from-black/40 to-black/60"
        style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        aria-hidden
      />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-white/60 uppercase tracking-wider mb-4">{label}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">{title}</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">{subtitle}</p>
        {actions ? <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">{actions}</div> : null}
      </motion.div>
    </section>
  )
}
