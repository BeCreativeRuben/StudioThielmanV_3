import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  hover?: boolean
  className?: string
}

export default function Card({ children, hover = false, className = '' }: CardProps) {
  const baseClasses = 'bg-secondary border border-border rounded-lg p-6'
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
  
  if (hover) {
    return (
      <motion.div
        className={`${baseClasses} ${hoverClasses} ${className}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    )
  }
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  )
}
