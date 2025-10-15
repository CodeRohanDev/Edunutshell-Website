'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, User, Mail, Phone, BookOpen, Calendar, CreditCard, CheckCircle } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useEnrollments } from '@/lib/hooks/useEnrollments'

interface EnrollmentFormProps {
  courseId: string
  courseTitle: string
  coursePrice: number
  onClose: () => void
  onSuccess?: () => void
}

const EnrollmentForm = ({ courseId, courseTitle, coursePrice, onClose, onSuccess }: EnrollmentFormProps) => {
  const { user } = useAuth()
  const { enrollInCourse } = useEnrollments()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    learningMode: 'self-paced',
    startDate: '',
    paymentMethod: 'card'
  })

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Handle enrollment submission
      try {
        setIsSubmitting(true)
        setError(null)
        
        await enrollInCourse(courseId)
        
        // Clear any stored enrollment data
        localStorage.removeItem('enrollCourseId')
        localStorage.removeItem('enrollCourseTitle')
        localStorage.removeItem('redirectAfterLogin')
        
        // Show success
        setStep(4)
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess()
        }
        
        // Auto close after 2 seconds
        setTimeout(() => {
          onClose()
        }, 2000)
        
      } catch (error) {
        console.error('Enrollment error:', error)
        setError(error instanceof Error ? error.message : 'Failed to enroll in course')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-dark-card border border-dark-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-dark-card border-b border-dark-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Enroll in Course</h2>
            <p className="text-text-secondary text-sm mt-1">{courseTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s
                        ? 'bg-accent-blue text-white'
                        : 'bg-dark-secondary text-text-muted'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        step > s ? 'bg-accent-blue' : 'bg-dark-secondary'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">Personal Information</h3>
              
              <div>
                <label className="block text-text-secondary mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-glow pl-10 w-full"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-glow pl-10 w-full"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-glow pl-10 w-full"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Course Preferences */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">Course Preferences</h3>
              
              <div>
                <label className="block text-text-secondary mb-2">Learning Mode *</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <select
                    name="learningMode"
                    value={formData.learningMode}
                    onChange={handleChange}
                    required
                    className="input-glow pl-10 w-full appearance-none"
                  >
                    <option value="self-paced">Self-Paced Learning</option>
                    <option value="mentor-guided">Mentor-Guided Learning</option>
                    <option value="live-classes">Live Classes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-text-secondary mb-2">Preferred Start Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="input-glow pl-10 w-full"
                  />
                </div>
              </div>

              <div className="bg-dark-secondary/50 rounded-xl p-4">
                <h4 className="font-semibold text-text-primary mb-2">What's Included:</h4>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Lifetime course access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>24/7 support access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Hands-on projects</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">Payment Method</h3>
              
              <div>
                <label className="block text-text-secondary mb-2">Select Payment Method *</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                    className="input-glow pl-10 w-full appearance-none"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="wallet">Digital Wallet</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent-blue/8 to-neon-purple/8 border border-accent-blue/20 rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4">Order Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-text-secondary">
                    <span>Course Fee</span>
                    <span>₹{coursePrice}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Discount (20%)</span>
                    <span className="text-green-400">-₹{Math.round(coursePrice * 0.2)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>GST (18%)</span>
                    <span>₹{Math.round((coursePrice * 0.8) * 0.18)}</span>
                  </div>
                  <div className="border-t border-dark-border pt-3 flex justify-between text-text-primary font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{Math.round((coursePrice * 0.8) * 1.18)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Enrollment Successful!</h3>
              <p className="text-text-secondary">
                You've successfully enrolled in {courseTitle}. Check your email for confirmation.
              </p>
            </motion.div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-border">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={isSubmitting}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : (step === 3 ? 'Complete Enrollment' : 'Continue')}
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  )
}

export default EnrollmentForm
