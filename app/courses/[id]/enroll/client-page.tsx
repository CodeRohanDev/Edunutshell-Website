'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import EnrollmentForm from '@/components/forms/EnrollmentForm'
import { motion } from 'framer-motion'

export default function EnrollPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated, isLoading, isAdmin } = useAuth()
  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const courseId = params.id as string

  useEffect(() => {
    // Don't redirect while still loading authentication state
    if (isLoading) {
      return
    }

    // Redirect admins to admin dashboard
    if (isAdmin) {
      router.push('/admin')
      return
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      localStorage.setItem('enrollCourseId', courseId)
      localStorage.setItem('redirectAfterLogin', `/courses/${courseId}/enroll`)
      router.push('/login?from=enrollment')
      return
    }

    // Get course title and price from localStorage or fetch from API
    const storedTitle = localStorage.getItem('enrollCourseTitle')
    const storedPrice = localStorage.getItem('enrollCoursePrice')
    
    if (storedTitle) {
      setCourseTitle(storedTitle)
      localStorage.removeItem('enrollCourseTitle')
    } else {
      // In a real app, fetch course details from API
      setCourseTitle('Course Enrollment')
    }
    
    if (storedPrice) {
      setCoursePrice(Number(storedPrice))
      localStorage.removeItem('enrollCoursePrice')
    } else {
      // Default price if not available
      setCoursePrice(9999)
    }
  }, [isAuthenticated, isLoading, courseId, router])

  const handleClose = () => {
    // Clear enrollment data
    localStorage.removeItem('enrollCourseId')
    localStorage.removeItem('enrollCourseTitle')
    localStorage.removeItem('enrollCoursePrice')
    // Redirect to course detail page
    router.push(`/courses/${courseId}`)
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </motion.div>
      </div>
    )
  }

  // Redirect admins
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-text-secondary">Admins cannot enroll. Redirecting...</p>
        </motion.div>
      </div>
    )
  }

  // Show loading while redirecting unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-text-secondary">Redirecting to login...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-16">
      <EnrollmentForm
        courseId={courseId}
        courseTitle={courseTitle || 'Course Enrollment'}
        coursePrice={coursePrice}
        onClose={handleClose}
      />
    </div>
  )
}
