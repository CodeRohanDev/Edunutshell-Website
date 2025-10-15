import { apiClient } from '../client'
import { API_CONFIG } from '../config'
import {
  FeedbackRequest,
  FeedbackResponse,
  CourseFeedbackResponse,
  ApiResponse
} from '@/lib/types/api'

export class FeedbackService {
  /**
   * Submit feedback for a course
   */
  static async submitFeedback(data: FeedbackRequest): Promise<ApiResponse<FeedbackResponse>> {
    return apiClient.post<FeedbackResponse>(API_CONFIG.ENDPOINTS.FEEDBACK.SUBMIT, data)
  }

  /**
   * Get all feedbacks for a specific course
   */
  static async getCourseFeedback(courseId: string): Promise<ApiResponse<CourseFeedbackResponse>> {
    return apiClient.get<CourseFeedbackResponse>(
      `${API_CONFIG.ENDPOINTS.FEEDBACK.GET_BY_COURSE}/${courseId}`
    )
  }
}