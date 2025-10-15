'use client'

import { useState, useEffect } from 'react'
import { EnrollmentService, EnrollmentResponse, MyCoursesResponse } from '@/lib/api'
import { useAuth } from '@/lib/context/AuthContext'

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState<EnrollmentResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, isStudent } = useAuth()

  const fetchMyCourses = async () => {
    if (!isAuthenticated || !isStudent) {
      setEnrollments([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const response = await EnrollmentService.getMyCourses()
      
      if (response.success && response.data) {
        setEnrollments(response.data.enrollments)
      } else {
        setError(response.message || 'Failed to fetch enrolled courses')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch enrolled courses')
    } finally {
      setIsLoading(false)
    }
  }

  const enrollInCourse = async (courseId: string) => {
    try {
      const response = await EnrollmentService.enrollInCourse(courseId)
      
      if (response.success && response.data) {
        setEnrollments(prev => [...prev, response.data!])
        return response.data
      } else {
        throw new Error(response.message || 'Failed to enroll in course')
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to enroll in course')
    }
  }

  const isEnrolledInCourse = (courseId: string): boolean => {
    return enrollments?.some(enrollment => enrollment.course._id === courseId) || false
  }

  useEffect(() => {
    fetchMyCourses()
  }, [isAuthenticated, isStudent])

  return {
    enrollments,
    isLoading,
    error,
    fetchMyCourses,
    enrollInCourse,
    isEnrolledInCourse
  }
}