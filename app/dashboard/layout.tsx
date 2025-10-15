'use client'

import { useDashboardAuth } from '@/lib/hooks/useDashboardAuth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isStudent, isLoading } = useDashboardAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  // If not a student (e.g., admin), the hook will redirect
  // Return null while redirecting
  if (!isStudent) {
    return null
  }

  return <>{children}</>
}
