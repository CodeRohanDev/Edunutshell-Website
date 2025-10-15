'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'

export function useAdminAuth() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (isLoading) return

    // Only redirect if not already on the target page
    if (!isAuthenticated && pathname !== '/login') {
      router.replace('/login')
    } else if (isAuthenticated && !isAdmin && !pathname.startsWith('/dashboard')) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isAdmin, isLoading, pathname, router])

  return { user, isAdmin, isLoading }
}
