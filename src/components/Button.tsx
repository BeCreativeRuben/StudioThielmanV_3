import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cta/50 relative overflow-hidden'
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-gray-900',
    secondary: 'bg-accent text-primary border-2 border-primary hover:bg-gray-200',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-accent',
    cta: 'bg-cta text-white hover:bg-cta/90 border-2 border-cta shadow-lg hover:shadow-xl font-bold !text-white',
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      style={{ 
        color: variant === 'cta' || variant === 'primary' ? '#FFFFFF' : undefined,
        WebkitTextFillColor: variant === 'cta' || variant === 'primary' ? '#FFFFFF' : undefined,
        backgroundColor: variant === 'cta' ? '#000000' : undefined,
      }}
    >
      <span 
        className={variant === 'cta' || variant === 'primary' ? 'relative z-10' : ''}
        style={{ 
          color: variant === 'cta' || variant === 'primary' ? '#FFFFFF' : 'inherit',
          WebkitTextFillColor: variant === 'cta' || variant === 'primary' ? '#FFFFFF' : 'inherit',
        }}
      >
        {children}
      </span>
    </motion.button>
  )
}
