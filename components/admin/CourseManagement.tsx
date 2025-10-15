'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  Upload
} from 'lucide-react'
import { useCourses } from '@/lib/hooks/useCourses'
import { CourseResponse } from '@/lib/api'

const CourseManagement = () => {
  const { courses, isLoading, error, addCourse, updateCourse, deleteCourse } = useCourses()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    level: '',
    image: ''
  })

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel
    return matchesSearch && matchesLevel
  })

  const handleAddCourse = async () => {
    try {
      setIsSubmitting(true)
      await addCourse(formData)
      setShowAddModal(false)
      resetForm()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add course')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditCourse = async () => {
    if (selectedCourse) {
      try {
        setIsSubmitting(true)
        await updateCourse(selectedCourse._id, formData)
        setShowEditModal(false)
        resetForm()
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to update course')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId)
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to delete course')
      }
    }
  }

  const openEditModal = (course: CourseResponse) => {
    setSelectedCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      level: course.level,
      image: course.image
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      level: '',
      image: ''
    })
    setSelectedCourse(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Course Management</h2>
          <p className="text-text-secondary mt-1">Manage all courses and content</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glow w-full pl-12"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="input-glow w-full md:w-48"
          >
            {levels.map(level => (
              <option key={level} value={level.toLowerCase()}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading courses...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-16">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary-sm">
            Retry
          </button>
        </div>
      )}

      {/* Courses Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-accent-blue/30 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-dark-card/80 backdrop-blur-sm rounded-full text-xs font-medium text-accent-blue">
                    {course.level || 'All Levels'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-text-primary mt-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2">{course.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                  <span>Created: {new Date(course.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(course.updatedAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                  <div>
                    <span className="text-2xl font-bold text-text-primary">₹{course.price}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(course)}
                      className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-accent-blue" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Course Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => {
                setShowAddModal(false)
                setShowEditModal(false)
                resetForm()
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
            >
              <div className="bg-dark-card border border-dark-border rounded-2xl p-6 w-full max-w-2xl my-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-text-primary">
                    {showAddModal ? 'Add New Course' : 'Edit Course'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setShowEditModal(false)
                      resetForm()
                    }}
                    className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-primary mb-2">Course Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="input-glow w-full"
                        placeholder="Enter course title"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="input-glow w-full resize-none"
                        rows={3}
                        placeholder="Enter course description"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Price (₹)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="input-glow w-full"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Level</label>
                      <input
                        type="text"
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="input-glow w-full"
                        placeholder="e.g., Beginner, Intermediate, Advanced"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-primary mb-2">Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="input-glow w-full"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={showAddModal ? handleAddCourse : handleEditCourse}
                      disabled={isSubmitting}
                      className="flex-1 btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Saving...' : (showAddModal ? 'Add Course' : 'Save Changes')}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddModal(false)
                        setShowEditModal(false)
                        resetForm()
                      }}
                      disabled={isSubmitting}
                      className="flex-1 btn-secondary-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CourseManagement
