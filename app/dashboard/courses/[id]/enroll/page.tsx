'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import EnrollmentForm from '@/components/forms/EnrollmentForm'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { UserRole } from '@/lib/types/auth'
import { motion } from 'framer-motion'

// Mock course data - replace with actual API call
const getCourseData = (id: string) => ({
  id,
  title: 'Complete Web Development Bootcamp',
  instructor: 'Dr. Sarah Johnson',
  price: 2999
})

export default function StudentEnrollPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [courseData, setCourseData] = useState<any>(null)

  useEffect(() => {
    // Fetch course details
    const course = getCourseData(courseId)
    setCourseData(course)
  }, [courseId])

  const handleClose = () => {
    // Redirect back to course detail page
    router.push(`/dashboard/courses/${courseId}`)
  }

  if (!courseData) {
    return (
      <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
        <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading course details...</p>
          </motion.div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
      <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-16">
        <EnrollmentForm
          courseId={courseId}
          courseTitle={courseData.title}
          coursePrice={courseData.price}
          onClose={handleClose}
        />
      </div>
    </ProtectedRoute>
  )
}
