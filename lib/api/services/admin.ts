import { apiClient } from '../client'
import { API_CONFIG } from '../config'
import {
  UserResponse,
  UsersResponse,
  ApiResponse
} from '@/lib/types/api'

export class AdminService {
  /**
   * Get all users (Admin only)
   * Returns an array of users directly
   */
  static async getAllUsers(): Promise<ApiResponse<UsersResponse>> {
    return apiClient.get<UsersResponse>(API_CONFIG.ENDPOINTS.ADMIN.USERS)
  }

  /**
   * Delete a user (Admin only)
   */
  static async deleteUser(userId: string): Promise<ApiResponse<any>> {
    return apiClient.delete<any>(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${userId}`)
  }
}