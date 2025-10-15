'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Brain, 
  Users, 
  BookOpen, 
  Award, 
  MessageSquare, 
  BarChart3,
  Shield,
  Zap,
  Globe
} from 'lucide-react'

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths with intelligent recommendations and adaptive content.',
      color: 'from-neon-blue to-neon-teal',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with peers, join study groups, and learn together in virtual classrooms.',
      color: 'from-neon-teal to-neon-purple',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Courses',
      description: 'Access 750+ courses across multiple domains with expert-curated content.',
      color: 'from-neon-purple to-neon-pink',
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Earn recognized certificates that boost your career prospects.',
      color: 'from-neon-pink to-neon-blue',
    },
    {
      icon: MessageSquare,
      title: '24/7 AI Support',
      description: 'Get instant help with our intelligent chatbot and expert mentors.',
      color: 'from-neon-blue to-neon-purple',
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and insights.',
      color: 'from-neon-teal to-neon-pink',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with data protection and privacy compliance.',
      color: 'from-neon-purple to-neon-blue',
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Lightning-fast loading times and seamless user experience.',
      color: 'from-neon-pink to-neon-teal',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Learn from anywhere with multi-language support and offline capabilities.',
      color: 'from-neon-blue to-neon-pink',
    },
  ]

  return (
    <section ref={ref} className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span> for Modern Learning
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Discover the cutting-edge features that make EDUNUTSHELL the preferred choice
            for learners and educators worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="card-dark group relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                              group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl
                              bg-gradient-to-br ${feature.color} mb-6 relative z-10`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue/30 
                            rounded-2xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-card rounded-3xl p-8 md:p-12 border border-dark-border">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience the Future of Learning?
            </h3>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already transforming their careers
              with our innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <button className="btn-secondary">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection