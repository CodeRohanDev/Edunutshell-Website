import { apiClient } from '../client'
import { API_CONFIG } from '../config'
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  CreateAdminRequest,
  ApiResponse
} from '@/lib/types/api'

export class AuthService {
  /**
   * Register a new student
   */
  static async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data)
  }

  /**
   * Login as student or admin
   */
  static async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, data)
    
    // Store tokens if login successful
    if (response.success && response.data) {
      apiClient.setTokens(
        response.data.accessToken,
        response.data.refreshToken
      )
    }
    
    return response
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    return apiClient.post<{ accessToken: string }>(API_CONFIG.ENDPOINTS.AUTH.REFRESH)
  }

  /**
   * Logout user
   */
  static async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post<void>(API_CONFIG.ENDPOINTS.AUTH.LOGOUT)
    
    // Clear tokens regardless of response
    apiClient.clearTokens()
    
    return response
  }

  /**
   * Create a new admin (Admin only)
   */
  static async createAdmin(data: CreateAdminRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.CREATE_ADMIN, data)
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!apiClient.getAccessToken()
  }

  /**
   * Clear authentication tokens
   */
  static clearAuth(): void {
    apiClient.clearTokens()
  }
}