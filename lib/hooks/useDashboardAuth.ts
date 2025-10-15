'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'

export function useDashboardAuth() {
  const { user, isAuthenticated, isAdmin, isStudent, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (isLoading) return

    // Only redirect if not already on the target page
    if (!isAuthenticated && pathname !== '/login') {
      router.replace('/login')
    } else if (isAuthenticated && isAdmin && !pathname.startsWith('/admin')) {
      // Redirect admins to admin dashboard instead of student dashboard
      router.replace('/admin')
    }
  }, [isAuthenticated, isAdmin, isLoading, pathname, router])

  return { user, isStudent, isLoading }
}
