'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Lock,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Shield
} from 'lucide-react'
import Image from 'next/image'
import { useAdminAuth } from '@/lib/hooks/useAdminAuth'
import { useRouter } from 'next/navigation'

const AdminProfile = () => {
  const { user, isAdmin } = useAdminAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = () => {
    // Validate passwords if changing
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match!' })
        return
      }
      if (formData.newPassword.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters!' })
        return
      }
    }

    // In a real app, this would make an API call
    setMessage({ type: 'success', text: 'Profile updated successfully!' })
    setIsEditing(false)
    
    // Clear password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
      {/* Top Navigation */}
      <nav className="bg-dark-card/50 backdrop-blur-xl border-b border-dark-border sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-text-primary" />
              </button>
              <div className="flex items-center space-x-3">
                <Image 
                  src="/edunutshelllogo.jpeg" 
                  alt="edunutshelllogo" 
                  width={40} 
                  height={40}
                  className="rounded-lg"
                />
                <h1 className="text-2xl font-bold text-text-primary">Admin Profile</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{user?.name?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 lg:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-8"
        >
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-dark-border">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{user?.name?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-2">{user?.name}</h2>
              <div className="flex items-center space-x-2 text-text-muted">
                <Shield className="w-4 h-4" />
                <span>Administrator</span>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Profile Form */}
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-4 py-3 bg-dark-secondary/50 border border-dark-border rounded-lg text-text-primary focus:outline-none focus:border-accent-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-4 py-3 bg-dark-secondary/50 border border-dark-border rounded-lg text-text-primary focus:outline-none focus:border-accent-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Section - Only visible when editing */}
            {isEditing && (
              <div className="pt-6 border-t border-dark-border space-y-6">
                <h3 className="text-xl font-semibold text-text-primary">Change Password</h3>
                
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 bg-dark-secondary/50 border border-dark-border rounded-lg text-text-primary focus:outline-none focus:border-accent-blue transition-colors"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 bg-dark-secondary/50 border border-dark-border rounded-lg text-text-primary focus:outline-none focus:border-accent-blue transition-colors"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 bg-dark-secondary/50 border border-dark-border rounded-lg text-text-primary focus:outline-none focus:border-accent-blue transition-colors"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-6">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      })
                      setMessage({ type: '', text: '' })
                    }}
                    className="px-6 py-3 bg-dark-secondary text-text-primary rounded-lg hover:bg-dark-border transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default AdminProfile
