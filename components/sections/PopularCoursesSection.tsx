'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCourses } from '@/lib/hooks/useCourses'

const PopularCoursesSection = () => {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isPaused, setIsPaused] = useState(false)
  const { courses, isLoading } = useCourses()

  // Right to left auto-scroll animation for courses
  useEffect(() => {
    const wrapper = scrollRef.current
    if (!wrapper || !isInView) return

    // Calculate responsive card width
    const getCardWidth = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 640) return 300 // Mobile: 280px card + 20px gap
      if (screenWidth < 1024) return 320 // Tablet: 300px card + 20px gap
      return 340 // Desktop: 320px card + 20px gap
    }

    const cardWidth = getCardWidth()
    const totalCards = courses.length
    const duration = 40000 // 40 seconds for one complete cycle (slower for better readability)

    let animationId: number
    let startTime: number | null = null
    let pausedAt: number | null = null
    let totalPausedTime = 0

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      if (!isPaused) {
        // If we just resumed from pause, add the pause duration to total paused time
        if (pausedAt !== null) {
          totalPausedTime += currentTime - pausedAt
          pausedAt = null
        }

        const elapsed = currentTime - startTime - totalPausedTime
        const progress = (elapsed % duration) / duration
        // Negative translateX for right to left movement
        const translateX = -(progress * totalCards * cardWidth)

        // Apply smooth transform with hardware acceleration
        wrapper.style.transform = `translate3d(${translateX}px, 0px, 0px)`
        wrapper.style.transitionDuration = '0ms'
        wrapper.style.transitionDelay = '0ms'
      } else {
        // Mark when we paused
        if (pausedAt === null) {
          pausedAt = currentTime
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    // Start animation after a short delay
    const startDelay = setTimeout(() => {
      animationId = requestAnimationFrame(animate)
    }, 1000)

    // Handle resize
    const handleResize = () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      startTime = null
      pausedAt = null
      totalPausedTime = 0
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(startDelay)
      window.removeEventListener('resize', handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isInView, isPaused, courses.length])

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // Show loading state if courses are still loading
  if (isLoading || courses.length === 0) {
    return (
      <section ref={ref} className="section-padding bg-dark-secondary">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular <span className="gradient-text">Courses</span>
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
                <span className="ml-3 text-text-secondary">Loading courses...</span>
              </div>
            ) : (
              <p className="text-text-secondary">No courses available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="section-padding bg-dark-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover our most popular courses that have helped thousands of students
            advance their careers and master new skills.
          </p>
        </motion.div>

        {/* Horizontal Auto-scroll Courses */}
        <div className="relative overflow-hidden w-full">
          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-dark-secondary to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-dark-secondary to-transparent z-10 pointer-events-none"></div>

          <div
            className="auto-scroll-container w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={scrollRef}
              className="flex space-x-5 md:space-x-6 pb-4 px-2 md:px-4"
              style={{
                width: 'max-content',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Duplicate courses for seamless loop */}
              {[...courses, ...courses].map((course, index) => (
                <motion.div
                  key={`${course._id}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: (index % courses.length) * 0.1 }}
                  className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-xl p-4 group hover:shadow-xl hover:border-accent-blue/30 transition-all duration-300 cursor-pointer flex-shrink-0"
                  whileHover={{ y: -4 }}
                  style={{
                    width: 'clamp(280px, 25vw, 320px)',
                    minWidth: '280px',
                    maxWidth: '320px'
                  }}
                >
                  {/* Compact Course Image */}
                  <div className="relative h-32 rounded-lg mb-4 overflow-hidden bg-dark-primary">
                    <motion.img
                      src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      whileHover={{ scale: 1.05 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-dark-primary/20 to-transparent" />

                    {/* Compact Badges */}
                    <div className="absolute top-2 right-2 bg-dark-card/90 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs font-semibold text-accent-blue">{course.level || 'Course'}</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-gradient-primary backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-white text-xs font-bold">POPULAR</span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-2 left-2 bg-dark-card/90 backdrop-blur-sm rounded px-2 py-1 flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-semibold text-white">4.8</span>
                    </div>
                  </div>

                  {/* Compact Course Info */}
                  <div className="space-y-3">
                    {/* Course Title */}
                    <div>
                      <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-300 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Enrollment Button */}
                    <div>
                      <Link
                        href={`/courses/${course._id}`}
                        className="btn-primary w-full group relative overflow-hidden"
                      >
                        <span className="relative mr-2">Enroll Now</span>
                        <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Courses Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/courses" className="btn-secondary inline-flex">
            <span className="mr-3">View All Courses</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PopularCoursesSection