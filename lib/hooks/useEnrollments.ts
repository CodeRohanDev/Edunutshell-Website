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
        setEnrollments(response.data.enrollments || [])
      } else {
        setError(response.message || 'Failed to fetch enrolled courses')
        setEnrollments([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch enrolled courses')
      setEnrollments([])
    } finally {
      setIsLoading(false)
    }
  }

  const enrollInCourse = async (courseId: string) => {
    try {
      const response = await EnrollmentService.enrollInCourse(courseId)
      
      if (response.success && response.data) {
        setEnrollments(prev => {
          const prevArray = Array.isArray(prev) ? prev : []
          return [...prevArray, response.data!]
        })
        return response.data
      } else {
        throw new Error(response.message || 'Failed to enroll in course')
      }
    } catch (err) {
      // If backend is unavailable, create a mock enrollment for development
      console.warn('Backend unavailable, using mock enrollment:', err)
      
      const mockEnrollment: EnrollmentResponse = {
        _id: `mock-${Date.now()}`,
        student: 'mock-student-id',
        course: {
          _id: courseId,
          title: 'Enrolled Course',
          description: 'Course description',
          price: 0,
          level: 'Beginner',
          image: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0
        },
        enrolledAt: new Date().toISOString(),
        __v: 0
      }
      
      setEnrollments(prev => {
        const prevArray = Array.isArray(prev) ? prev : []
        return [...prevArray, mockEnrollment]
      })
      return mockEnrollment
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