'use client'

import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo = ({ 
  size = 'md',
  className = '' 
}: LogoProps) => {
  const sizeClasses = {
    sm: {
      height: 36,
      width: 180,
      className: 'h-9 w-auto'
    },
    md: {
      height: 48,
      width: 240,
      className: 'h-12 w-auto'
    },
    lg: {
      height: 56,
      width: 280,
      className: 'h-14 w-auto'
    }
  }

  const currentSize = sizeClasses[size]

  return (
    <div className={`flex items-center ${className}`}>
      <Image 
        src="/edunutshelllogo.jpeg" 
        alt="edunutshelllogo" 
        width={currentSize.width}
        height={currentSize.height}
        className={`${currentSize.className} object-contain`}
        priority={size === 'lg'} // Prioritize loading for main navbar
      />
    </div>
  )
}

export default Logo