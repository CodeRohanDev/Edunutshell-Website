'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, Send, HelpCircle, Book, Video } from 'lucide-react'

export default function SupportPage() {
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Support ticket submitted! We will get back to you within 24 hours.')
    setMessage('')
    setCategory('')
  }

  const faqs = [
    {
      question: 'How do I access my courses?',
      answer: 'Navigate to your dashboard and click on "My Courses" to access all enrolled courses.'
    },
    {
      question: 'Can I download course materials?',
      answer: 'Yes, most course materials are available for download in the course resources section.'
    },
    {
      question: 'How do I get my certificate?',
      answer: 'Certificates are automatically generated upon course completion and available in your profile.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, UPI, and net banking.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-28 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-text-primary">
              How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Help You?</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Get support from our team or find answers in our FAQ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8 text-center hover:border-slate-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 border border-cyan-500/20">
                <MessageCircle className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Live Chat</h3>
              <p className="text-text-muted mb-6 text-sm">Chat with our support team</p>
              <button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border border-slate-500/20 text-sm">
                Start Chat
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8 text-center hover:border-slate-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 border border-purple-500/20">
                <Mail className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Email Support</h3>
              <p className="text-text-muted mb-6 text-sm">support@edunutshell.com</p>
              <button className="bg-dark-secondary/50 hover:bg-dark-secondary border border-dark-border/50 hover:border-slate-500/30 text-text-muted hover:text-text-primary px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm">
                Send Email
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8 text-center hover:border-slate-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 border border-teal-500/20">
                <Phone className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Phone Support</h3>
              <p className="text-text-muted mb-6 text-sm">+1 (555) 123-4567</p>
              <button className="bg-dark-secondary/50 hover:bg-dark-secondary border border-dark-border/50 hover:border-slate-500/30 text-text-muted hover:text-text-primary px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm">
                Call Now
              </button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Support Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-8 text-text-primary">Submit a Ticket</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-text-primary font-medium mb-3 text-sm">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-text-primary focus:border-slate-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="course">Course Content</option>
                    <option value="account">Account Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text-primary font-medium mb-3 text-sm">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="w-full bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-text-primary placeholder-text-muted focus:border-slate-500/50 focus:outline-none transition-colors resize-none"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-500/20 group">
                  <span>Submit Ticket</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-8 text-text-primary">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 bg-dark-secondary/30 rounded-xl border border-dark-border/30 hover:border-slate-500/30 transition-all duration-300">
                    <div className="flex items-start space-x-3.5">
                      <HelpCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-text-primary mb-2.5 text-sm">{faq.question}</h3>
                        <p className="text-text-muted text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Resources */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8 hover:border-slate-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center mb-5 border border-yellow-500/20">
                <Book className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Documentation</h3>
              <p className="text-text-muted mb-6 text-sm leading-relaxed">
                Browse our comprehensive guides and tutorials
              </p>
              <button className="bg-dark-secondary/50 hover:bg-dark-secondary border border-dark-border/50 hover:border-slate-500/30 text-text-muted hover:text-text-primary px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm">
                View Docs
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8 hover:border-slate-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-5 border border-pink-500/20">
                <Video className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Video Tutorials</h3>
              <p className="text-text-muted mb-6 text-sm leading-relaxed">
                Watch step-by-step video guides
              </p>
              <button className="bg-dark-secondary/50 hover:bg-dark-secondary border border-dark-border/50 hover:border-slate-500/30 text-text-muted hover:text-text-primary px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm">
                Watch Videos
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
