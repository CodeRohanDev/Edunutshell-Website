'use client'

import { motion } from 'framer-motion'
import {
  Users,
  BookOpen,
  IndianRupee,
  TrendingUp
} from 'lucide-react'
import { useAdmin } from '@/lib/hooks/useAdmin'
import { useCourses } from '@/lib/hooks/useCourses'

const AdminDashboard = () => {
  const { users, isLoading: usersLoading } = useAdmin()
  const { courses, isLoading: coursesLoading } = useCourses()

  // Calculate stats from API data
  const totalUsers = users?.length || 0
  const totalCourses = courses?.length || 0
  const activeStudents = users?.filter(u => u.role === 'student')?.length || 0

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      label: 'Active Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      label: 'Total Revenue',
      value: '₹0',
      icon: IndianRupee,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      label: 'Active Students',
      value: activeStudents,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ]

  const isLoading = usersLoading || coursesLoading

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-6 hover:shadow-xl hover:border-accent-blue/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-dark-secondary/50 rounded w-20 mb-2"></div>
                <div className="h-4 bg-dark-secondary/50 rounded w-24"></div>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Info Message */}
      <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-accent-blue" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Dashboard Overview</h3>
          <p className="text-text-secondary">
            View real-time statistics and manage your platform. Navigate to specific sections using the sidebar to manage users, courses, and payments.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
