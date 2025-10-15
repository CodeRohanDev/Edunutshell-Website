'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, BookOpen, Users, Award, Phone, LogOut } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { useAuth } from '@/lib/context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Courses', href: '/courses', icon: Award },
    { name: 'Contact', href: '/contact', icon: Phone },
  ]

  const handleLogout = () => {
    logout()
    // Navigation is handled by AuthContext
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-primary/90 backdrop-blur-md border-b border-dark-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="lg" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-text-secondary hover:text-accent-blue transition-colors duration-300 font-medium group ${
                    active ? 'text-accent-blue' : ''
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent-blue transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={() => router.push(user?.role === 'admin' ? '/admin' : '/dashboard')}
                className="btn-primary-sm"
              >
                Dashboard
              </button>
            ) : (
              <Link
                href="/login"
                className="btn-primary-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-accent-blue transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-dark-border"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors duration-300 ${
                      active ? 'text-accent-blue' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="relative">
                      {item.name}
                      {active && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-blue" />
                      )}
                    </span>
                  </Link>
                )
              })}
              
              {/* Mobile Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsOpen(false)
                    router.push(user?.role === 'admin' ? '/admin' : '/dashboard')
                  }}
                  className="btn-primary-sm w-full text-center"
                >
                  Dashboard
                </button>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary-sm w-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar