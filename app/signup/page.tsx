'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  BookOpen,
  User,
  Phone,
  Building2,
  Briefcase
} from 'lucide-react'
import AuthNavbar from '@/components/layout/AuthNavbar'
import { useAuth } from '@/lib/context/AuthContext'
import { useRegistration } from '@/lib/hooks/useRegistration'
import { UserRole } from '@/lib/types/auth'

const SignupPage = () => {
  const { login } = useAuth()
  const { register, isLoading, error } = useRegistration()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    industrialProgram: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  // Pre-fill form with inquiry data if available
  useEffect(() => {
    const inquiryData = localStorage.getItem('studentInquiry')
    if (inquiryData) {
      const data = JSON.parse(inquiryData)
      setFormData(prev => ({
        ...prev,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        college: data.college || '',
        industrialProgram: data.industrialProgram || ''
      }))
      // Clear inquiry data after use
      localStorage.removeItem('studentInquiry')
    }

    // Check if we came from an enrollment flow via URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const fromEnrollment = urlParams.get('from') === 'enrollment'

    if (!fromEnrollment) {
      // Clear all enrollment-related data if not coming from enrollment flow
      localStorage.removeItem('enrollCourseId')
      localStorage.removeItem('enrollCourseTitle')
      localStorage.removeItem('redirectAfterLogin')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    try {
      // Register the user
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'student' // Default role for signup
      })

      // Auto-login after successful signup
      const userRole = await login(formData.email, formData.password)

      // Determine redirect path
      const redirectPath = localStorage.getItem('redirectAfterLogin')

      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin')
        window.location.replace(redirectPath)
      } else if (userRole === UserRole.ADMIN) {
        window.location.replace('/admin')
      } else {
        window.location.replace('/dashboard')
      }
    } catch (error) {
      console.error('Signup error:', error)
      // Error is already handled by the useRegistration hook and displayed in the form
      // No need to show alert here as the error will be displayed in the UI
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const checked = 'checked' in e.target ? e.target.checked : false
    const type = 'type' in e.target ? e.target.type : ''
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex flex-col">
      {/* Auth Navbar */}
      <AuthNavbar />

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center p-4 pt-20 overflow-y-auto">
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-xl p-6 shadow-xl mt-4 mb-8"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-text-primary mb-1">Create Your Account</h1>
              <p className="text-text-secondary text-sm">Join thousands of learners worldwide</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-glow w-full pl-12"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-glow w-full pl-12"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-glow w-full pl-12"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              {/* College */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  College/University
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="input-glow w-full pl-12"
                    placeholder="Your institution name"
                    required
                  />
                </div>
              </div>

              {/* Industrial Program */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Industrial Program
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <select
                    name="industrialProgram"
                    value={formData.industrialProgram}
                    onChange={handleInputChange}
                    className="input-glow w-full pl-12 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a program</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science & Analytics</option>
                    <option value="ai-ml">Artificial Intelligence & ML</option>
                    <option value="cloud-computing">Cloud Computing</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="mobile-development">Mobile App Development</option>
                    <option value="devops">DevOps Engineering</option>
                    <option value="blockchain">Blockchain Technology</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-glow w-full pl-12 pr-12"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-accent-blue transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-glow w-full pl-12 pr-12"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-accent-blue transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent-blue bg-dark-card border-dark-border rounded focus:ring-accent-blue mt-1"
                  required
                />
                <label className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <Link href="/terms" className="text-accent-blue hover:text-accent-blue/80 transition-colors">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-accent-blue hover:text-accent-blue/80 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-3">{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-dark-border"></div>
              <span className="px-3 text-text-muted text-xs">or</span>
              <div className="flex-1 border-t border-dark-border"></div>
            </div>

            {/* Google Signup */}
            <button className="w-full flex items-center justify-center px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-300">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign up with Google</span>
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-text-secondary text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-accent-blue hover:text-accent-blue/80 transition-colors font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage