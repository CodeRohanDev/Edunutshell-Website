'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  MoreVertical,
  X,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  Users
} from 'lucide-react'
import { useAdmin } from '@/lib/hooks/useAdmin'
import { UserResponse } from '@/lib/types/api'

const UserManagement = () => {
  const { users, isLoading, error, fetchUsers, deleteUser, createAdmin } = useAdmin()
  const [isFetchingUsers, setIsFetchingUsers] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as 'admin' | 'student'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const filteredUsers = (users || []).filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleAddUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setSubmitError('Please fill in all fields')
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitError(null)

      if (formData.role === 'admin') {
        await createAdmin({ name: formData.name, email: formData.email, password: formData.password })
      } else {
        // Use register endpoint for creating students
        const { AuthService } = await import('@/lib/api')
        const response = await AuthService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })

        if (!response.success) {
          throw new Error(response.message || 'Failed to create user')
        }

        // Manually refresh users list
        setIsFetchingUsers(true)
        await fetchUsers()
        setIsFetchingUsers(false)
      }

      setShowAddModal(false)
      resetForm()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create user')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) {
      return
    }

    try {
      await deleteUser(userId)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete user')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'student'
    })
    setSelectedUser(null)
    setSubmitError(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">User Management</h2>
          <p className="text-text-secondary mt-1">Manage all users and their roles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary-sm"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Create User
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-medium">Error loading users</p>
            <p className="text-red-400/80 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glow w-full pl-12"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="input-glow w-full md:w-48"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-accent-blue animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="w-12 h-12 text-text-muted mb-4" />
            <p className="text-text-primary font-medium">No users found</p>
            <p className="text-text-muted text-sm mt-1">
              {searchTerm || filterRole !== 'all'
                ? 'Try adjusting your filters'
                : 'No users available'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-secondary/50 border-b border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Created</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-dark-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-muted">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${user.role === 'admin'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-green-500/20 text-green-400'
                        }`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user._id, user.name)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => {
                setShowAddModal(false)
                resetForm()
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-dark-card border border-dark-border rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Create New User</h3>
                    <p className="text-text-muted text-sm mt-1">Add a new user or administrator account</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      resetForm()
                    }}
                    className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>

                {submitError && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Role <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'student' })}
                      className="input-glow w-full"
                      disabled={isSubmitting}
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                    <p className="text-text-muted text-xs mt-1">
                      {formData.role === 'admin'
                        ? 'Admins have full access to manage users, courses, and payments'
                        : 'Students can enroll in courses and provide feedback'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-glow w-full"
                      placeholder="Enter full name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-glow w-full"
                      placeholder={formData.role === 'admin' ? 'admin@example.com' : 'student@example.com'}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input-glow w-full"
                      placeholder="Enter secure password"
                      disabled={isSubmitting}
                    />
                    <p className="text-text-muted text-xs mt-1">Minimum 6 characters</p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleAddUser}
                      disabled={isSubmitting}
                      className="flex-1 btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Create {formData.role === 'admin' ? 'Admin' : 'Student'}
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddModal(false)
                        resetForm()
                      }}
                      disabled={isSubmitting}
                      className="flex-1 btn-secondary-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserManagement
