'use client'

import { useState } from 'react'
import { FeedbackService, FeedbackResponse, FeedbackRequest } from '@/lib/api'

export function useFeedback() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitFeedback = async (feedbackData: FeedbackRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await FeedbackService.submitFeedback(feedbackData)
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || 'Failed to submit feedback')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit feedback'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const getCourseFeedback = async (courseId: string): Promise<FeedbackResponse[]> => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await FeedbackService.getCourseFeedback(courseId)
      
      if (response.success && response.data) {
        return response.data.feedbacks
      } else {
        throw new Error(response.message || 'Failed to fetch course feedback')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch course feedback'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    submitFeedback,
    getCourseFeedback
  }
}