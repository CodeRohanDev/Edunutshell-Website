'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import AuthNavbar from '@/components/layout/AuthNavbar'
import StudentNavbar from '@/components/layout/StudentNavbar'
import Footer from '@/components/layout/Footer'
import ChatBot from '@/components/ui/ChatBot'
import LenisScroll from '@/components/LenisScroll'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Check if current page is an auth page, dashboard, or admin page
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password'
  const isDashboardPage = pathname?.startsWith('/dashboard')
  const isAdminPage = pathname?.startsWith('/admin')
  
  // Determine which navbar to show
  const getNavbar = () => {
    if (isAdminPage) return null
    if (isAuthPage) return <AuthNavbar />
    if (isDashboardPage) return <StudentNavbar />
    return <Navbar />
  }
  
  return (
    <div className="w-full overflow-x-hidden">
      {/* Smooth Scroll */}
      <LenisScroll />
      
      {/* Conditional Navbar */}
      {getNavbar()}
      
      {/* Main Content */}
      <main className="min-h-screen w-full">
        {children}
      </main>
      
      {/* Conditional Footer - Hide on auth pages, dashboard, and admin pages */}
      {!isAuthPage && !isDashboardPage && !isAdminPage && <Footer />}
      
      {/* AI Learning Mentor - Hide on auth pages, dashboard, and admin pages */}
      {!isAuthPage && !isDashboardPage && !isAdminPage && <ChatBot />}
    </div>
  )
}