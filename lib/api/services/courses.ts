import { apiClient } from '../client'
import { API_CONFIG } from '../config'
import {
  CourseRequest,
  CourseResponse,
  CourseUpdateRequest,
  ApiResponse
} from '@/lib/types/api'

export class CourseService {
  /**
   * Add a new course (Admin only)
   */
  static async addCourse(data: CourseRequest): Promise<ApiResponse<CourseResponse>> {
    return apiClient.post<CourseResponse>(API_CONFIG.ENDPOINTS.COURSES.ADD, data)
  }

  /**
   * Get all available courses
   */
  static async getCourses(): Promise<ApiResponse<CourseResponse[]>> {
    return apiClient.get<CourseResponse[]>(API_CONFIG.ENDPOINTS.COURSES.LIST)
  }

  /**
   * Update an existing course (Admin only)
   */
  static async updateCourse(
    courseId: string, 
    data: CourseUpdateRequest
  ): Promise<ApiResponse<CourseResponse>> {
    return apiClient.patch<CourseResponse>(
      `${API_CONFIG.ENDPOINTS.COURSES.UPDATE}/${courseId}`,
      data
    )
  }

  /**
   * Delete a course (Admin only)
   */
  static async deleteCourse(courseId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(
      `${API_CONFIG.ENDPOINTS.COURSES.DELETE}/${courseId}`
    )
  }
}