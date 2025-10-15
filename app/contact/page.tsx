'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Star,
  Users,
  Globe,
  Headphones,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    preferredContact: 'email'
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Contact form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const officeInfo = {
    city: 'Bangalore',
    address: '456 Innovation Hub, Koramangala, Bangalore - 560034',
    phone: '+91 98765 43211',
    email: 'bangalore@edunutshell.com',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
  }

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'You can enroll by visiting the course page and clicking the "Enroll Now" button. Choose your preferred learning plan and complete the payment process.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and EMI options. We also offer flexible payment plans for our programs.'
    },
    {
      question: 'Do you provide certificates?',
      answer: 'Yes, we provide industry-recognized certificates upon successful completion of courses. These certificates are verified and can be shared on LinkedIn.'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'We offer a 7-day money-back guarantee for all our courses. If you\'re not satisfied, you can request a full refund within the first week.'
    },
    {
      question: 'Do you provide job placement assistance?',
      answer: 'Yes, our premium programs include dedicated job placement support, resume building, interview preparation, and connections with our hiring partners.'
    }
  ]

  const supportStats = [
    { label: 'Response Time', value: '< 2 hours', icon: Clock },
    { label: 'Satisfaction Rate', value: '98%', icon: Star },
    { label: 'Support Agents', value: '50+', icon: Users },
    { label: 'Languages', value: '10+', icon: Globe }
  ]

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(107,114,128,0.15)_0%,transparent_50%)]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-primary/20 backdrop-blur-sm 
                         border border-accent-blue/30 rounded-full px-6 py-3 mb-8"
            >
              <Headphones className="w-5 h-5 text-accent-blue" />
              <span className="text-accent-blue font-medium">24/7 Support Available</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              Have questions about our courses or need help with your learning journey?
              Our expert support team is here to assist you every step of the way.
            </p>

            {/* Support Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {supportStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-accent-blue" />
                  </div>
                  <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Send us a Message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-text-primary mb-2">Message Sent!</h4>
                  <p className="text-text-secondary">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-glow w-full"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-glow w-full"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-glow w-full"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="input-glow w-full"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="courses">Course Information</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="input-glow w-full"
                      placeholder="Brief subject of your message"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="input-glow w-full resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-accent-blue bg-dark-card border-dark-border focus:ring-accent-blue"
                        />
                        <span className="ml-2 text-text-secondary">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-accent-blue bg-dark-card border-dark-border focus:ring-accent-blue"
                        />
                        <span className="ml-2 text-text-secondary">Phone</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full group">
                    <span className="mr-3">Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Our Office</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-text-primary mb-4">{officeInfo.city}</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{officeInfo.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-accent-blue flex-shrink-0" />
                      <span className="text-text-secondary">{officeInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-accent-blue flex-shrink-0" />
                      <span className="text-text-secondary">{officeInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-text-secondary">{officeInfo.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-8">
              <h4 className="text-lg font-semibold text-text-primary mb-4">Find Us</h4>
              <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-dark-border/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6537076839!2d77.6270233!3d12.9352818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144ed898fc2d%3A0x1681f38e8c00ae56!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EduNutshell Office Location - Koramangala, Bangalore"
                  className="grayscale-[30%] contrast-[1.1] brightness-[0.9]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom py-20 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gray/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-primary/20 backdrop-blur-sm 
                         border border-accent-blue/30 rounded-full px-6 py-3 mb-8"
            >
              <HelpCircle className="w-5 h-5 text-accent-blue" />
              <span className="text-accent-blue font-medium">Quick Answers</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Find quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div 
                  className={`
                    bg-dark-card/60 backdrop-blur-xl border border-dark-border rounded-2xl 
                    transition-all duration-500 ease-out cursor-pointer
                    hover:border-accent-blue/50 hover:shadow-glow hover:bg-dark-card/80
                    ${openFaq === index ? 'border-accent-blue/60 shadow-glow bg-dark-card/80' : ''}
                  `}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg md:text-xl font-semibold text-text-primary pr-4 leading-relaxed">
                        {faq.question}
                      </h4>
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary/20 
                        flex items-center justify-center transition-all duration-300
                        group-hover:bg-gradient-primary/30 group-hover:scale-110
                        ${openFaq === index ? 'bg-gradient-primary/40 scale-110' : ''}
                      `}>
                        {openFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-accent-blue transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-accent-blue transition-transform duration-300" />
                        )}
                      </div>
                    </div>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === index ? 'auto' : 0,
                        opacity: openFaq === index ? 1 : 0,
                        marginTop: openFaq === index ? 24 : 0
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-dark-border/50 pt-6">
                        <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-dark-card/40 backdrop-blur-xl border border-dark-border rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Still have questions?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Our support team is available 24/7 to help you with any questions or concerns you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary group">
                  <span className="mr-3">View All FAQs</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
                <button className="btn-secondary group">
                  <span className="mr-3">Contact Support</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  )
}

export default ContactPage