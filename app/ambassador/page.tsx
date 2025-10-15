'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, Phone, Mail, Building2, Users, Award, Target, ArrowRight } from 'lucide-react'

export default function AmbassadorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    college: '',
    year: '',
    experience: '',
    motivation: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store ambassador application data
    localStorage.setItem('ambassadorApplication', JSON.stringify(formData))
    alert('Thank you for applying! We will review your application and get back to you soon.')
    router.push('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-dark-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Become a <span className="gradient-text">Campus Ambassador</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Join our community of student leaders and help transform education at your campus
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-dark text-center">
              <Award className="w-12 h-12 text-accent-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recognition</h3>
              <p className="text-text-secondary">Get certified and build your leadership portfolio</p>
            </div>
            <div className="card-dark text-center">
              <Users className="w-12 h-12 text-accent-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Network</h3>
              <p className="text-text-secondary">Connect with students and industry professionals</p>
            </div>
            <div className="card-dark text-center">
              <Target className="w-12 h-12 text-accent-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rewards</h3>
              <p className="text-text-secondary">Earn incentives and exclusive perks</p>
            </div>
          </div>

          {/* Application Form */}
          <div className="card-dark">
            <h2 className="text-2xl font-bold mb-6">Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="input-glow w-full pl-11"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="input-glow w-full pl-11"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="input-glow w-full pl-11"
                    />
                  </div>
                </div>

                {/* College */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    College/University *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      required
                      placeholder="Your institution name"
                      className="input-glow w-full pl-11"
                    />
                  </div>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Current Year *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="input-glow w-full appearance-none cursor-pointer"
                  >
                    <option value="">Select year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="graduate">Graduate</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">
                    Leadership Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="input-glow w-full appearance-none cursor-pointer"
                  >
                    <option value="">Select experience</option>
                    <option value="none">No prior experience</option>
                    <option value="some">Some experience</option>
                    <option value="moderate">Moderate experience</option>
                    <option value="extensive">Extensive experience</option>
                  </select>
                </div>

                {/* Motivation */}
                <div className="md:col-span-2">
                  <label className="block text-text-primary font-medium mb-2">
                    Why do you want to be a Campus Ambassador? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your motivation and what you hope to achieve..."
                    className="input-glow w-full resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="btn-secondary flex-1 group"
                >
                  <span>Back to Home</span>
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 group"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
