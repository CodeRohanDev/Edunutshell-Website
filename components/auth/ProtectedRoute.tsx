'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { UserRole } from '@/lib/types/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requireAuth?: boolean
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles,
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push('/login')
      return
    }

    // If specific roles are required, check if user has the right role
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect based on user role
      if (user.role === UserRole.ADMIN) {
        router.push('/admin')
      } else if (user.role === UserRole.STUDENT) {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    }
  }, [isAuthenticated, user, allowedRoles, requireAuth, router])

  // Show loading or nothing while checking authentication
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  // If roles are specified and user doesn't have access, show nothing while redirecting
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
