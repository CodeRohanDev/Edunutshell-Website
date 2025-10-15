'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  Camera,
  Award,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Download,
  Share2
} from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useEnrollments } from '@/lib/hooks/useEnrollments'

export default function ProfilePage() {
  const { user: authUser, isLoading: authLoading } = useAuth()
  const { enrollments, isLoading: enrollmentsLoading } = useEnrollments()
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState({
    name: authUser?.name || '',
    email: authUser?.email || '',
    phone: authUser?.phone || '',
    location: '',
    joinDate: '',
    bio: '',
    college: '',
    degree: '',
    year: '',
    skills: [] as string[]
  })

  useEffect(() => {
    if (authUser) {
      setUser(prev => ({
        ...prev,
        name: authUser.name,
        email: authUser.email,
        phone: authUser.phone || '',
        joinDate: authUser.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''
      }))
    }
  }, [authUser])

  const coursesCompleted = enrollments?.length || 0

  const stats = [
    { label: 'Courses Enrolled', value: coursesCompleted.toString(), icon: BookOpen, color: 'from-violet-500/20 to-purple-500/20', iconColor: 'text-purple-400', borderColor: 'border-purple-500/20' },
    { label: 'Study Hours', value: '0', icon: Clock, color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-teal-400', borderColor: 'border-teal-500/20' },
    { label: 'Certificates', value: '0', icon: Award, color: 'from-amber-500/20 to-yellow-500/20', iconColor: 'text-yellow-400', borderColor: 'border-yellow-500/20' },
    { label: 'Learning Streak', value: '0 days', icon: Target, color: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-400', borderColor: 'border-orange-500/20' }
  ]

  const achievements = [
    { title: 'Fast Learner', description: 'Completed 5 courses in a month', icon: TrendingUp, earned: false, color: 'from-slate-500/10 to-slate-600/10', iconColor: 'text-slate-500' },
    { title: 'Perfect Score', description: 'Scored 100% in a quiz', icon: Award, earned: false, color: 'from-slate-500/10 to-slate-600/10', iconColor: 'text-slate-500' },
    { title: 'Consistent Learner', description: '30-day learning streak', icon: Target, earned: false, color: 'from-slate-500/10 to-slate-600/10', iconColor: 'text-slate-500' },
    { title: 'Course Master', description: 'Complete 10 courses', icon: BookOpen, earned: false, color: 'from-slate-500/10 to-slate-600/10', iconColor: 'text-slate-500' }
  ]

  const handleSave = () => {
    setEditMode(false)
    // Save logic here
  }

  if (authLoading || enrollmentsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-28 pb-16 flex items-center justify-center">
        <div className="text-text-muted">Loading profile...</div>
      </div>
    )
  }

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-28 pb-16 flex items-center justify-center">
        <div className="text-text-muted">Please log in to view your profile</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-28 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Profile Header */}
          <div className="relative bg-gradient-to-br from-dark-card/40 to-dark-card/20 backdrop-blur-xl border border-dark-border/20 rounded-3xl p-10 mb-10 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex items-center space-x-7">
                  <div className="relative group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-28 h-28 bg-gradient-to-br from-accent-blue/20 to-accent-gray/20 rounded-3xl flex items-center justify-center border border-accent-blue/20 backdrop-blur-sm relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <User className="w-14 h-14 text-accent-blue relative z-10" />
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent-blue hover:bg-accent-blue/80 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-dark-primary"
                    >
                      <Camera className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-text-primary">{user.name}</h1>
                    <p className="text-text-secondary text-base">{user.college} • {user.degree}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-accent-blue font-semibold px-4 py-1.5 bg-accent-blue/10 rounded-xl border border-accent-blue/20">{user.year}</span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-secondary">Joined {user.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-dark-secondary/60 hover:bg-dark-secondary border border-dark-border/30 hover:border-accent-blue/30 text-text-secondary hover:text-text-primary px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => editMode ? handleSave() : setEditMode(true)}
                    className="bg-gradient-to-r from-accent-blue to-accent-blue/80 hover:from-accent-blue/90 hover:to-accent-blue/70 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-glow"
                  >
                    {editMode ? (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className={`relative bg-gradient-to-br ${stat.color} backdrop-blur-xl border ${stat.borderColor} rounded-2xl p-7 text-center hover:border-accent-blue/30 transition-all duration-300 group-hover:translate-y-[-4px]`}>
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-gradient-to-br from-dark-card/60 to-dark-card/30 rounded-2xl flex items-center justify-center border border-accent-blue/20 mx-auto mb-5"
                      >
                        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                      </motion.div>
                      <div className="text-4xl font-bold text-text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Enhanced Personal Information */}
            <div className="md:col-span-2 space-y-7">
              <div className="bg-gradient-to-br from-dark-card/40 to-dark-card/20 backdrop-blur-xl border border-dark-border/20 rounded-3xl p-9">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center border border-accent-blue/20">
                    <User className="w-5 h-5 text-accent-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">Personal Information</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-text-primary focus:border-slate-500/50 focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-text-primary">
                        <User className="w-4.5 h-4.5 text-slate-400" />
                        <p>{user.name}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-text-primary focus:border-slate-500/50 focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-text-primary">
                        <Mail className="w-4.5 h-4.5 text-slate-400" />
                        <p>{user.email}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">Phone</label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="w-full bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-text-primary focus:border-slate-500/50 focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-text-primary">
                        <Phone className="w-4.5 h-4.5 text-slate-400" />
                        <p>{user.phone}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">Location</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={user.location}
                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                        className="w-full bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-text-primary focus:border-slate-500/50 focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-text-primary">
                        <MapPin className="w-4.5 h-4.5 text-slate-400" />
                        <p>{user.location}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">Bio</label>
                    {editMode ? (
                      <textarea
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        rows={3}
                        className="w-full bg-dark-secondary/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-text-primary focus:border-slate-500/50 focus:outline-none transition-colors resize-none"
                      />
                    ) : (
                      <p className="text-text-primary leading-relaxed">{user.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Skills */}
              <div className="bg-gradient-to-br from-dark-card/40 to-dark-card/20 backdrop-blur-xl border border-dark-border/20 rounded-3xl p-9">
                <div className="flex items-center space-x-3 mb-7">
                  <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center border border-accent-blue/20">
                    <Target className="w-5 h-5 text-accent-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-5 py-3 bg-accent-blue/10 text-accent-blue rounded-xl text-sm font-semibold border border-accent-blue/20 hover:border-accent-blue/40 hover:bg-accent-blue/20 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {editMode && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-3 border-2 border-dashed border-accent-blue/30 rounded-xl text-accent-blue hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all text-sm font-semibold"
                    >
                      + Add Skill
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-7">
              {/* Enhanced Achievements */}
              <div className="bg-gradient-to-br from-dark-card/40 to-dark-card/20 backdrop-blur-xl border border-dark-border/20 rounded-3xl p-7">
                <div className="flex items-center space-x-3 mb-7">
                  <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center border border-accent-blue/20">
                    <Award className="w-5 h-5 text-accent-blue" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">Achievements</h2>
                </div>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: achievement.earned ? 1.02 : 1 }}
                        className={`p-5 rounded-2xl border transition-all duration-300 ${achievement.earned
                          ? 'bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border-accent-blue/20 hover:border-accent-blue/40'
                          : 'bg-dark-secondary/20 border-dark-border/20 opacity-50'
                          }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.earned
                            ? 'bg-accent-blue/10 border border-accent-blue/20'
                            : 'bg-dark-border/30'
                            }`}>
                            <Icon className={`w-6 h-6 ${achievement.earned ? 'text-accent-blue' : 'text-text-muted'}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold mb-1.5 text-sm ${achievement.earned ? 'text-text-primary' : 'text-text-muted'
                              }`}>
                              {achievement.title}
                            </h3>
                            <p className="text-xs text-text-secondary leading-relaxed">{achievement.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Enhanced Quick Actions */}
              <div className="bg-gradient-to-br from-dark-card/40 to-dark-card/20 backdrop-blur-xl border border-dark-border/20 rounded-3xl p-7">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center border border-accent-blue/20">
                    <TrendingUp className="w-5 h-5 text-accent-blue" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">Quick Actions</h2>
                </div>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-dark-secondary/60 hover:bg-dark-secondary border border-dark-border/30 hover:border-accent-blue/30 text-text-secondary hover:text-text-primary px-5 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 group"
                  >
                    <Download className="w-5 h-5 group-hover:text-accent-blue transition-colors" />
                    <span>Download Certificates</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-dark-secondary/60 hover:bg-dark-secondary border border-dark-border/30 hover:border-accent-blue/30 text-text-secondary hover:text-text-primary px-5 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 group"
                  >
                    <Calendar className="w-5 h-5 group-hover:text-accent-blue transition-colors" />
                    <span>View Schedule</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
