'use client'

import { useState, useEffect } from 'react'
import { CourseService, CourseResponse } from '@/lib/api'

export function useCourse(courseId: string) {
  const [course, setCourse] = useState<CourseResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // For now, we'll get the course from the courses list
        // In a real implementation, you'd have a getCourseById endpoint
        const response = await CourseService.getCourses()
        
        if (response.success && response.data) {
          const foundCourse = response.data.find(c => c._id === courseId)
          if (foundCourse) {
            setCourse(foundCourse)
          } else {
            setError('Course not found')
          }
        } else {
          setError(response.message || 'Failed to fetch course')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch course')
      } finally {
        setIsLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  return {
    course,
    isLoading,
    error
  }
}