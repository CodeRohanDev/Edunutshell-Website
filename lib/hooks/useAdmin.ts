'use client'

import { useState, useEffect } from 'react'
import { AdminService, UserResponse, AuthService, CreateAdminRequest } from '@/lib/api'
import { useAuth } from '@/lib/context/AuthContext'

export function useAdmin() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, isAdmin } = useAuth()

  const fetchUsers = async () => {
    if (!isAuthenticated || !isAdmin) {
      setUsers([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const response = await AdminService.getAllUsers()
      
      if (response.success && response.data) {
        // API returns array directly, ensure it's an array
        const usersData = Array.isArray(response.data) ? response.data : []
        setUsers(usersData)
      } else {
        setError(response.message || response.error || 'Failed to fetch users')
        setUsers([])
      }
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const response = await AdminService.deleteUser(userId)
      
      if (response.success) {
        setUsers(prev => prev.filter(user => user._id !== userId))
      } else {
        throw new Error(response.message || 'Failed to delete user')
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete user')
    }
  }

  const createAdmin = async (adminData: CreateAdminRequest) => {
    try {
      const response = await AuthService.createAdmin(adminData)
      
      if (response.success && response.data) {
        // Refresh users list to include new admin
        await fetchUsers()
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create admin')
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create admin')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [isAuthenticated, isAdmin])

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    deleteUser,
    createAdmin
  }
}