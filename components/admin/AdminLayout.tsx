'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Users,
  BookOpen,
  IndianRupee,
  BarChart3,
  LogOut,
  Menu,
  X,
  Search,
  Bell
} from 'lucide-react'
import { useAdminAuth } from '@/lib/hooks/useAdminAuth'
import { useAuth } from '@/lib/context/AuthContext'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user } = useAdminAuth()
  const { logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    // Navigation is handled by AuthContext
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
      {/* Top Navigation */}
      <nav className="bg-dark-card/50 backdrop-blur-xl border-b border-dark-border sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-dark-secondary rounded-lg transition-colors lg:hidden"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-text-primary" /> : <Menu className="w-6 h-6 text-text-primary" />}
              </button>
              <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-dark-secondary/50 hover:bg-dark-secondary rounded-lg transition-colors text-text-secondary hover:text-accent-blue"
              >
                <span className="text-sm font-medium">Back to Website</span>
              </button>
              
              <button className="p-2 hover:bg-dark-secondary rounded-lg transition-colors relative">
                <Bell className="w-6 h-6 text-text-muted" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button 
                onClick={() => router.push('/admin/profile')}
                className="flex items-center space-x-3 pl-4 border-l border-dark-border hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                  <p className="text-xs text-text-muted">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{user?.name?.charAt(0)}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-dark-card/50 backdrop-blur-xl border-r border-dark-border transition-transform duration-300 z-40`}>
          <div className="p-6 space-y-2">
            {/* Logo Section */}
            <div className="flex items-center justify-center mb-6 pb-6 border-b border-dark-border">
              <Image 
                src="/edunutshelllogo.jpeg" 
                alt="EDUNUTSHELL" 
                width={120} 
                height={120}
                className="rounded-xl"
              />
            </div>
            
            <button
              onClick={() => router.push('/admin')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive('/admin')
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-text-secondary hover:bg-dark-secondary hover:text-text-primary'
              }`}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">Overview</span>
            </button>
            
            <button
              onClick={() => router.push('/admin/user-management')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive('/admin/user-management')
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-text-secondary hover:bg-dark-secondary hover:text-text-primary'
              }`}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm whitespace-nowrap">User Management</span>
            </button>
            
            <button
              onClick={() => router.push('/admin/courses-management')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive('/admin/courses-management')
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-text-secondary hover:bg-dark-secondary hover:text-text-primary'
              }`}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm whitespace-nowrap">Course Management</span>
            </button>
            
            <button
              onClick={() => router.push('/admin/payment-management')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive('/admin/payment-management')
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-text-secondary hover:bg-dark-secondary hover:text-text-primary'
              }`}
            >
              <IndianRupee className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm whitespace-nowrap">Payment Management</span>
            </button>

            <div className="pt-6 mt-6 border-t border-dark-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
