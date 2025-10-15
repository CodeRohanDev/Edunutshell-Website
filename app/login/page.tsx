'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  BookOpen
} from 'lucide-react'
import AuthNavbar from '@/components/layout/AuthNavbar'
import { useAuth } from '@/lib/context/AuthContext'
import { UserRole } from '@/lib/types/auth'

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  useEffect(() => {
    // Check if we came from an enrollment flow via URL parameter
    const fromEnrollment = searchParams.get('from') === 'enrollment'
    
    if (!fromEnrollment) {
      // Clear all enrollment-related data if not coming from enrollment flow
      localStorage.removeItem('enrollCourseId')
      localStorage.removeItem('enrollCourseTitle')
      localStorage.removeItem('redirectAfterLogin')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear any previous errors
    setError(null)
    setIsSubmitting(true)
    
    try {
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
      console.error('Login error:', error)
      
      // Set user-friendly error message
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Login failed. Please check your credentials and try again.')
      }
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
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
      <div className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-xl p-6 shadow-xl"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-text-primary mb-1">Welcome Back!</h1>
              <p className="text-text-secondary text-sm">Continue your learning journey</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
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
                    placeholder="Enter your password"
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-text-secondary">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-accent-blue bg-dark-card border-dark-border rounded focus:ring-accent-blue"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-accent-blue hover:text-accent-blue/80 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span className="mr-3">Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-dark-border"></div>
              <span className="px-3 text-text-muted text-xs">or</span>
              <div className="flex-1 border-t border-dark-border"></div>
            </div>

            {/* Google Login */}
            <button className="w-full flex items-center justify-center px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-300">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-text-secondary text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-accent-blue hover:text-accent-blue/80 transition-colors font-medium">
                  Sign up here
                </Link>
              </p>
              <div className="mt-4 p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                <p className="text-xs text-accent-blue">
                  <strong>New to EduNutshell?</strong> Create a student account to start learning or contact admin for instructor access.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const LoginPage = () => {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage