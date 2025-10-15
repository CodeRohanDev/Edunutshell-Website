'use client'

import { useState, useEffect } from 'react'
import { CourseService, CourseResponse, CourseRequest, CourseUpdateRequest } from '@/lib/api'

export function useCourses() {
  const [courses, setCourses] = useState<CourseResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await CourseService.getCourses()
      
      if (response.success && response.data) {
        setCourses(response.data)
      } else {
        setError(response.message || 'Failed to fetch courses')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses')
    } finally {
      setIsLoading(false)
    }
  }

  const addCourse = async (courseData: CourseRequest) => {
    try {
      const response = await CourseService.addCourse(courseData)
      
      if (response.success && response.data) {
        setCourses(prev => [...prev, response.data!])
        return response.data
      } else {
        throw new Error(response.message || 'Failed to add course')
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add course')
    }
  }

  const updateCourse = async (courseId: string, courseData: CourseUpdateRequest) => {
    try {
      const response = await CourseService.updateCourse(courseId, courseData)
      
      if (response.success && response.data) {
        setCourses(prev => 
          prev.map(course => 
            course._id === courseId ? response.data! : course
          )
        )
        return response.data
      } else {
        throw new Error(response.message || 'Failed to update course')
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update course')
    }
  }

  const deleteCourse = async (courseId: string) => {
    try {
      const response = await CourseService.deleteCourse(courseId)
      
      if (response.success) {
        setCourses(prev => prev.filter(course => course._id !== courseId))
      } else {
        throw new Error(response.message || 'Failed to delete course')
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete course')
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    addCourse,
    updateCourse,
    deleteCourse
  }
}