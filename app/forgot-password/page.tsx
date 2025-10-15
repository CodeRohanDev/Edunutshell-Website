'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, CheckCircle, Shield, Lock, Sparkles, BookOpen } from 'lucide-react'
import AuthNavbar from '@/components/layout/AuthNavbar'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Password reset request for:', email)
    setIsSubmitted(true)
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
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-text-primary mb-1">
                  Forgot Password?
                </h1>
                <p className="text-text-secondary text-sm">
                  No worries! Enter your email to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-glow w-full pl-12"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full group"
                >
                  <span className="mr-3">Send Reset Link</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Security Note */}
              <div className="mt-4 p-3 bg-dark-secondary/50 rounded-lg border border-dark-border">
                <div className="flex items-center space-x-2 text-accent-blue">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Secure Reset Process</span>
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  The reset link will expire in 1 hour for your security.
                </p>
              </div>

              {/* Back to Login */}
              <div className="text-center mt-6">
                <Link 
                  href="/login" 
                  className="inline-flex items-center text-text-secondary hover:text-accent-blue transition-colors font-medium text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-glow">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-text-primary mb-3">
                  Check Your Email
                </h1>
                <p className="text-text-secondary text-sm mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-accent-blue font-semibold text-sm mb-4">
                  {email}
                </p>
                
                <div className="bg-dark-secondary/50 border border-dark-border rounded-lg p-3 mb-6">
                  <div className="flex items-center space-x-2 text-accent-blue mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium text-sm">What's Next?</span>
                  </div>
                  <ul className="text-xs text-text-secondary space-y-1 text-left">
                    <li>• Check your email inbox</li>
                    <li>• Click the reset link (expires in 1 hour)</li>
                    <li>• Create your new password</li>
                    <li>• Sign in with your new credentials</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-dark-secondary hover:bg-dark-secondary/80 text-text-primary py-2.5 px-4 rounded-lg font-medium transition-all duration-300 text-sm border border-dark-border"
                  >
                    Try Different Email
                  </button>
                  <Link 
                    href="/login" 
                    className="btn-primary w-full block text-center"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </>
          )}
          </motion.div>

          {/* Help Text */}
          <div className="text-center mt-6">
            <p className="text-text-secondary text-sm">
              Need help?{' '}
              <Link href="/contact" className="text-accent-blue hover:text-accent-blue/80 transition-colors font-medium">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage