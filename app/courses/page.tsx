'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Clock, Users, BookOpen, ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import { useCourses } from '@/lib/hooks/useCourses'

const PublicCoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { courses, isLoading } = useCourses()

  const categories = [
    'All',
    'Cloud Computing',
    'Cybersecurity',
    'Machine Learning',
    'Web Development',
    'Data Analytics',
    'Management',
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.level === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              Discover industry-leading courses designed to accelerate your career growth
              and help you master in-demand skills.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-glow pl-12 w-full text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-dark-secondary/50 border-y border-dark-border">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-text-muted" />
              <span className="text-text-secondary">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'bg-dark-card border border-dark-border text-text-secondary hover:border-accent-blue'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
              <span className="ml-4 text-text-secondary text-lg">Loading courses...</span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="card-dark group overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Course Image */}
                <div className="relative h-48 rounded-xl mb-6 overflow-hidden group">
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 to-transparent" />
                  <div className="absolute top-4 right-4 bg-dark-card/80 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-accent-blue">{course.level || 'All Levels'}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-gradient-primary/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-xs font-bold">₹{course.price}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-dark-primary/20 flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Course Info */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-accent-blue font-medium">{course.level || 'Course'}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-text-secondary">4.8</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-blue transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>1.2k</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>8-12 weeks</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-accent-blue">
                      ₹{course.price}
                    </div>
                    <div className="text-sm text-text-muted line-through">
                      ₹{Math.round(course.price * 1.5)}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/courses/${course._id}`}
                    className="btn-primary-sm w-full group"
                  >
                    <span className="mr-2">View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}

          {/* No Results */}
          {!isLoading && filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">No courses found</h3>
              <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default PublicCoursesPage
