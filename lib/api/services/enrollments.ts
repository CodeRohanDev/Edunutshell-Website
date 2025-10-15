import { apiClient } from '../client'
import { API_CONFIG } from '../config'
import {
  EnrollmentResponse,
  MyCoursesResponse,
  ApiResponse
} from '@/lib/types/api'

export class EnrollmentService {
  /**
   * Enroll a student into a course
   */
  static async enrollInCourse(courseId: string): Promise<ApiResponse<EnrollmentResponse>> {
    return apiClient.post<EnrollmentResponse>(
      `${API_CONFIG.ENDPOINTS.ENROLLMENTS.ENROLL}/${courseId}`
    )
  }

  /**
   * Get all courses enrolled by logged-in user
   */
  static async getMyCourses(): Promise<ApiResponse<MyCoursesResponse>> {
    return apiClient.get<MyCoursesResponse>(API_CONFIG.ENDPOINTS.ENROLLMENTS.MY_COURSES)
  }
}