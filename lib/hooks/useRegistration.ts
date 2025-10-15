'use client'

import { useState } from 'react'
import { AuthService, RegisterRequest } from '@/lib/api'

export function useRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await AuthService.register(userData)
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    isLoading,
    error
  }
}