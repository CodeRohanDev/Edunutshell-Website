import { API_CONFIG, getAuthHeaders } from './config'

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Token management
class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = 'access_token'
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token'

  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static setAccessToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
  }

  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }
}

// API Client class
class ApiClient {
  private baseURL: string

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const token = TokenManager.getAccessToken()

    const config: RequestInit = {
      ...options,
      headers: {
        ...getAuthHeaders(token || undefined),
        ...options.headers
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        // Handle token refresh if needed
        if (response.status === 401 && token) {
          const refreshed = await this.refreshToken()
          if (refreshed) {
            // Retry the original request with new token
            const newToken = TokenManager.getAccessToken()
            const retryConfig: RequestInit = {
              ...options,
              headers: {
                ...getAuthHeaders(newToken || undefined),
                ...options.headers
              }
            }
            const retryResponse = await fetch(url, retryConfig)
            const retryData = await retryResponse.json()
            
            if (!retryResponse.ok) {
              throw new ApiError(retryData.message || 'Request failed', retryResponse.status, retryData)
            }
            
            return { success: true, data: retryData }
          }
        }
        
        throw new ApiError(data.message || 'Request failed', response.status, data)
      }

      // Wrap the response in our standard format
      return { success: true, data }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network error occurred')
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = TokenManager.getRefreshToken()
      if (!refreshToken) return false

      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ refreshToken })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.accessToken) {
          TokenManager.setAccessToken(data.accessToken)
          return true
        }
      }
      
      // If refresh fails, clear tokens
      TokenManager.clearTokens()
      return false
    } catch {
      TokenManager.clearTokens()
      return false
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // Token management methods
  setTokens(accessToken: string, refreshToken?: string): void {
    TokenManager.setAccessToken(accessToken)
    if (refreshToken) {
      TokenManager.setRefreshToken(refreshToken)
    }
  }

  clearTokens(): void {
    TokenManager.clearTokens()
  }

  getAccessToken(): string | null {
    return TokenManager.getAccessToken()
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
export { TokenManager }