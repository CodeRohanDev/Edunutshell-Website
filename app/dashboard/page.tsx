'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Play,
  User,
  Bookmark,
  MessageCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/context/AuthContext'
import { useEnrollments } from '@/lib/hooks/useEnrollments'

const DashboardPage = () => {
  const { user } = useAuth()
  const { enrollments, isLoading } = useEnrollments()

  const quickActions = [
    { title: 'Browse Courses', description: 'Explore available courses', icon: BookOpen, href: '/courses', color: 'from-accent-blue/10 to-accent-blue/5', iconColor: 'text-accent-blue' },
    { title: 'My Profile', description: 'Manage your account', icon: User, href: '/dashboard/profile', color: 'from-accent-blue/10 to-accent-blue/5', iconColor: 'text-accent-blue' },
    { title: 'Need Support?', description: 'Get help from our team', icon: MessageCircle, href: '/dashboard/support', color: 'from-accent-blue/10 to-accent-blue/5', iconColor: 'text-accent-blue' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-20">
      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-dark-card/40 via-dark-card/30 to-transparent backdrop-blur-xl border-b border-dark-border/20">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-accent-blue rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-gray rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom py-12 relative z-10">
            {/* Enhanced User Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-start space-x-6"
            >
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-20 h-20 bg-gradient-to-br from-accent-blue/20 to-accent-gray/20 rounded-3xl flex items-center justify-center border border-accent-blue/20 backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <User className="w-10 h-10 text-accent-blue relative z-10" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-dark-secondary flex items-center justify-center shadow-lg"
                >
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </motion.div>
              </div>
              <div className="space-y-3">
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Sparkles className="w-4 h-4 text-accent-blue" />
                    <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider">Dashboard</span>
                  </motion.div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-2 leading-tight">
                    Welcome back,{' '}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-text-primary inline-block"
                    >
                      {user?.name.split(' ')[0] || 'Student'}
                    </motion.span>
                  </h1>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-text-secondary text-base max-w-md leading-relaxed"
                >
                  Ready to continue your learning journey? Let's make today count.
                </motion.p>
              </div>
            </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Enhanced Quick Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={action.href} className="group block h-full">
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className={`relative bg-gradient-to-br ${action.color} backdrop-blur-xl border border-dark-border/30 rounded-2xl p-7 hover:border-accent-blue/30 transition-all duration-300 h-full group-hover:translate-y-[-4px]`}>
                      <div className="flex items-start justify-between mb-5">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="w-14 h-14 bg-gradient-to-br from-dark-card/60 to-dark-card/30 rounded-2xl flex items-center justify-center border border-accent-blue/20 group-hover:border-accent-blue/40 transition-colors duration-300"
                        >
                          <Icon className={`w-7 h-7 ${action.iconColor}`} />
                        </motion.div>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent-blue transition-colors duration-300" />
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-300">
                        {action.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{action.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>



        <div className="grid grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Enhanced Continue Learning Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-gradient-to-br from-dark-card/40 to-dark-card/20 backdrop-blur-xl border border-dark-border/20 rounded-3xl p-10 overflow-hidden"
            >
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-text-primary">Continue Learning</h2>
                    <p className="text-text-secondary text-sm">Pick up where you left off</p>
                  </div>
                  <Link href="/courses" className="group flex items-center space-x-2 text-accent-blue hover:text-accent-blue/80 transition-colors font-medium text-sm bg-accent-blue/10 hover:bg-accent-blue/20 px-5 py-3 rounded-xl border border-accent-blue/20">
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue mx-auto mb-4"></div>
                  <p className="text-text-secondary">Loading your courses...</p>
                </div>
              )}

              {/* Enhanced No Courses State */}
              {!isLoading && (!enrollments || enrollments.length === 0) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative text-center py-16"
                >
                  <div className="relative inline-block mb-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-24 h-24 bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 rounded-3xl flex items-center justify-center border border-accent-blue/20 mx-auto"
                    >
                      <BookOpen className="w-12 h-12 text-accent-blue" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-accent-blue/20 rounded-full blur-md"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">Start Your Learning Journey</h3>
                  <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
                    Discover courses designed to help you grow your skills and advance your career
                  </p>
                  <Link href="/courses" className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-blue to-accent-blue/80 hover:from-accent-blue/90 hover:to-accent-blue/70 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow">
                    <BookOpen className="w-5 h-5" />
                    <span>Browse Courses</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}

              {/* Enhanced Enrolled Courses */}
              <div className="relative z-10 space-y-6">
                {enrollments?.map((enrollment, index) => {
                  const course = enrollment.course
                  return (
                    <motion.div
                      key={enrollment._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative">
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        <div className="relative bg-gradient-to-br from-dark-secondary/50 to-dark-secondary/30 border border-dark-border/20 rounded-3xl p-7 hover:border-accent-blue/30 transition-all duration-300 group-hover:translate-y-[-2px]">
                          <div className="flex flex-col md:flex-row gap-7">
                            {/* Enhanced Course Image */}
                            <div className="relative w-full md:w-56 h-40 rounded-2xl overflow-hidden flex-shrink-0 group/image">
                              <img
                                src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/90 via-dark-primary/40 to-transparent" />
                              
                              {/* Play button overlay */}
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <div className="w-16 h-16 bg-accent-blue/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 shadow-xl">
                                  <Play className="w-7 h-7 text-white ml-1" />
                                </div>
                              </motion.div>

                              {/* Level badge */}
                              <div className="absolute top-3 left-3 bg-dark-card/90 backdrop-blur-md rounded-xl px-3 py-1.5 border border-accent-blue/20">
                                <span className="text-xs font-bold text-accent-blue uppercase tracking-wide">
                                  {course.level || 'Course'}
                                </span>
                              </div>
                            </div>

                            {/* Enhanced Course Content */}
                            <div className="flex-1 space-y-5">
                              <div>
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent-blue transition-colors duration-300 leading-tight">
                                    {course.title}
                                  </h3>
                                  <span className="text-lg font-bold text-accent-blue ml-4">₹{course.price}</span>
                                </div>
                                <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{course.description}</p>
                              </div>

                              {/* Enhanced Progress Section */}
                              <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-text-secondary">Your Progress</span>
                                  <span className="text-accent-blue font-semibold">25% Complete</span>
                                </div>
                                <div className="relative w-full bg-dark-primary/50 rounded-full h-2.5 overflow-hidden border border-dark-border/30">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '25%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                                    className="relative h-full bg-gradient-to-r from-accent-blue to-accent-blue/70 rounded-full"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                                  </motion.div>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-text-muted">Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                  <span className="text-text-muted">Getting Started</span>
                                </div>
                              </div>

                              {/* Enhanced Action Buttons */}
                              <div className="flex space-x-3 pt-2">
                                <Link
                                  href={`/courses/${course._id}`}
                                  className="flex-1 bg-gradient-to-r from-accent-blue to-accent-blue/80 hover:from-accent-blue/90 hover:to-accent-blue/70 text-white px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-glow hover:scale-[1.02]"
                                >
                                  <Play className="w-5 h-5" />
                                  <span>Continue Learning</span>
                                </Link>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-dark-card/60 hover:bg-dark-card border border-dark-border/30 hover:border-accent-blue/30 px-5 py-3.5 rounded-xl transition-all duration-300"
                                >
                                  <Bookmark className="w-5 h-5 text-text-muted hover:text-accent-blue transition-colors" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>


          </div>


        </div>
      </div>
    </div>
  )
}

export default DashboardPage
