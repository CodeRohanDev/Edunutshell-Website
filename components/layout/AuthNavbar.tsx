'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const AuthNavbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-primary/95 backdrop-blur-md border-b border-dark-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Compact Version */}
          <Link href="/" className="group transition-all duration-300 hover:scale-105">
            <Logo size="md" className="transition-all duration-300 group-hover:shadow-glow" />
          </Link>

          {/* Back to Home Link - Compact */}
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-text-secondary hover:text-accent-blue 
                     transition-all duration-300 font-medium text-sm group
                     hover:bg-dark-card/30 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AuthNavbar