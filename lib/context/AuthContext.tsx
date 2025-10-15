'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserRole, AuthContextType } from '@/lib/types/auth'
import { AuthService } from '@/lib/api'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session and valid token
    const storedUser = localStorage.getItem('user')
    const hasToken = AuthService.isAuthenticated()
    
    if (storedUser && hasToken) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setIsAuthenticated(true)
    } else {
      // Clear invalid session
      localStorage.removeItem('user')
      AuthService.clearAuth()
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await AuthService.login({ email, password })
      
      if (response.success && response.data) {
        const apiUser = response.data.user
        const user: User = {
          id: apiUser.id,
          name: apiUser.name,
          email: apiUser.email,
          role: apiUser.role === 'admin' ? UserRole.ADMIN : UserRole.STUDENT,
          createdAt: apiUser.createdAt ? new Date(apiUser.createdAt) : new Date(),
          updatedAt: apiUser.updatedAt ? new Date(apiUser.updatedAt) : new Date(),
          isActive: true
        }

        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(user))
        
        return user.role
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // Call API logout (don't wait for response as we want to logout regardless)
      AuthService.logout().catch(console.error)
    } finally {
      // Always clear local state
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem('user')
      AuthService.clearAuth()
      
      // Force redirect to home and clear history
      window.location.replace('/')
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isAdmin: user?.role === UserRole.ADMIN,
    isStudent: user?.role === UserRole.STUDENT,
    isLoading,
    login,
    logout,
    updateUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
