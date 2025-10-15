'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  User,
  LogOut,
  Bell
} from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { useAuth } from '@/lib/context/AuthContext'

const StudentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Courses', href: '/dashboard/courses' },
    { name: 'Demo Session', href: '/dashboard/demo-session' },
    { name: 'Payment', href: '/dashboard/payment' },
    { name: 'Support', href: '/dashboard/support' },
  ]

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    // Navigation is handled by AuthContext
  }

  const isActive = (href: string) => pathname === href

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-slate-950/98 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20'
          : 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/40'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="hover:opacity-90 transition-all duration-300 hover:scale-105 transform"
          >
            <Logo size="lg" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2 rounded-lg font-medium transition-all duration-300 group ${active
                      ? 'text-white bg-slate-800/60'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                >
                  <span className="text-[13px] tracking-wide relative z-10">{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-lg border border-slate-600/30"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </Link>
              )
            })}
            
            {/* Back to Website Button */}
            <Link
              href="/"
              className="px-5 py-2 rounded-lg font-medium transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-slate-700/40 hover:border-slate-600/60"
            >
              <span className="text-[13px] tracking-wide">Back to Website</span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 bg-slate-800/40 rounded-lg hover:bg-slate-700/50 transition-all duration-300 group border border-slate-700/40 hover:border-slate-600/60"
              >
                <Bell className="w-[18px] h-[18px] text-slate-400 group-hover:text-slate-200 transition-colors duration-300" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-80 bg-slate-900/98 backdrop-blur-xl border border-slate-700/60 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-800/60 bg-slate-800/30">
                      <h3 className="font-semibold text-white text-sm tracking-wide">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="p-3.5 hover:bg-slate-800/40 cursor-pointer border-b border-slate-800/40 transition-all duration-200">
                        <p className="text-[13px] text-slate-200 font-medium">New course available!</p>
                        <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                      </div>
                      <div className="p-3.5 hover:bg-slate-800/40 cursor-pointer border-b border-slate-800/40 transition-all duration-200">
                        <p className="text-[13px] text-slate-200 font-medium">Assignment due tomorrow</p>
                        <p className="text-xs text-slate-500 mt-1">5 hours ago</p>
                      </div>
                      <div className="p-3.5 hover:bg-slate-800/40 cursor-pointer transition-all duration-200">
                        <p className="text-[13px] text-slate-200 font-medium">Certificate ready for download</p>
                        <p className="text-xs text-slate-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-slate-700/50"></div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              {/* Clickable Profile Card */}
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 bg-slate-800/40 rounded-lg hover:bg-slate-700/50 border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 group"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center border border-slate-500/30 group-hover:border-slate-400/50 transition-all duration-300 group-hover:scale-105 transform">
                  <User className="w-[18px] h-[18px] text-slate-100" />
                </div>
                <div className="hidden xl:block">
                  <p className="text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors leading-tight">{user?.name || 'Student'}</p>
                  <p className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">View Profile</p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2.5 bg-slate-800/40 rounded-lg hover:bg-red-500/10 border border-slate-700/40 hover:border-red-500/40 transition-all duration-300 group"
                title="Logout"
              >
                <LogOut className="w-[18px] h-[18px] text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 bg-slate-800/40 rounded-lg hover:bg-slate-700/50 border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-slate-300" />
            ) : (
              <Menu className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-slate-800/60"
            >
              <div className="py-5 flex flex-col gap-2">
                {/* Clickable User Profile Card */}
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 p-3.5 bg-slate-800/40 rounded-lg mb-2 hover:bg-slate-700/50 border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-11 h-11 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center border border-slate-500/30 group-hover:border-slate-400/50 transition-all duration-300">
                    <User className="w-5 h-5 text-slate-100" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{user?.name || 'Student'}</p>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">View Profile</p>
                  </div>
                </Link>

                {/* Nav Items */}
                {navItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center p-3.5 rounded-lg transition-all duration-300 ${active
                          ? 'bg-slate-800/60 text-white border border-slate-600/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium text-[13px] tracking-wide">{item.name}</span>
                    </Link>
                  )
                })}

                {/* Back to Website */}
                <Link
                  href="/"
                  className="flex items-center p-3.5 rounded-lg transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-slate-700/40 hover:border-slate-600/60"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-medium text-[13px] tracking-wide">Back to Website</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/30 transition-all duration-300 mt-2 pt-4 border-t border-slate-800/60"
                >
                  <LogOut className="w-[18px] h-[18px]" />
                  <span className="font-medium text-[13px] tracking-wide">Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default StudentNavbar
