import { motion } from 'framer-motion'

type Props = {
  href: string
  author: string
  date: string
  quote: string
  linkLabel: string
  /** Optional attribution under the quote (e.g. "Aeriez"). */
  attribution?: string
  className?: string
}

/** LinkedIn post card — originally the social-proof card on /workshops/incompany. */
export default function LinkedInPostCard({
  href,
  author,
  date,
  quote,
  linkLabel,
  attribution,
  className = '',
}: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
        <div>
          <span className="font-semibold text-primary block">{author}</span>
          <span className="text-sm text-text-secondary">{date}</span>
        </div>
      </div>
      <blockquote className={`text-body text-text-primary leading-relaxed italic ${attribution ? 'mb-2' : 'mb-4'}`}>
        "{quote}"
      </blockquote>
      {attribution && <p className="text-sm font-semibold text-primary mb-4">— {attribution}</p>}
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A66C2] group-hover:underline">
        {linkLabel}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </motion.a>
  )
}
