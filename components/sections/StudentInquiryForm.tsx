'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, Phone, Mail, Building2, Briefcase, ArrowRight } from 'lucide-react'

const StudentInquiryForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    college: '',
    industrialProgram: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store inquiry data in localStorage for registration
    localStorage.setItem('studentInquiry', JSON.stringify(formData))
    // Navigate to signup with inquiry data
    router.push('/signup')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="section-padding bg-dark-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your <span className="gradient-text">Learning Journey</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Fill in your details and take the first step towards excellence
            </p>
          </div>

          <div className="card-dark">
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

                {/* Industrial Program */}
                <div className="md:col-span-2">
                  <label className="block text-text-primary font-medium mb-2">
                    Industrial Program of Interest *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <select
                      name="industrialProgram"
                      value={formData.industrialProgram}
                      onChange={handleChange}
                      required
                      className="input-glow w-full pl-11 appearance-none cursor-pointer"
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
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="btn-secondary w-full group"
                >
                  <span>Student Login</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="submit"
                  className="btn-primary w-full group"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Campus Ambassador Link */}
              <div className="text-center pt-4 border-t border-dark-border">
                <p className="text-text-secondary mb-3">
                  Want to become a Campus Ambassador?
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/ambassador')}
                  className="text-accent-blue hover:underline font-medium"
                >
                  Apply as Campus Ambassador →
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StudentInquiryForm
