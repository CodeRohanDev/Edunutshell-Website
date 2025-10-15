'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Star,
    Clock,
    Users,
    BookOpen,
    Play,
    Award,
    CheckCircle,
    ArrowLeft,
    Calendar,
    Globe,
    Share2,
    Heart,
    User,
    Target
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { useCourse } from '@/lib/hooks/useCourse'
import { useEnrollments } from '@/lib/hooks/useEnrollments'
import EnrollmentForm from '@/components/forms/EnrollmentForm'

const CourseDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string
    const { isAuthenticated, isAdmin } = useAuth()
    const { course, isLoading, error } = useCourse(courseId)
    const { isEnrolledInCourse } = useEnrollments()

    const [isLiked, setIsLiked] = useState(false)
    const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)

    const handleEnrollClick = () => {
        if (!course) return
        
        // Prevent admins from enrolling
        if (isAdmin) {
            alert('Admins cannot enroll in courses. Please use a student account.')
            return
        }
        
        if (!isAuthenticated) {
            // Store intended course for redirect after login
            localStorage.setItem('enrollCourseId', courseId)
            localStorage.setItem('enrollCourseTitle', course.title)
            localStorage.setItem('redirectAfterLogin', `/courses/${courseId}/enroll`)
            router.push('/login?from=enrollment')
        } else {
            setShowEnrollmentForm(true)
        }
    }

    const isEnrolled = course ? isEnrolledInCourse(course._id) : false

    // Loading state
    if (isLoading) {
        return (
            <div className="pt-16 min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
                <div className="container-custom py-16">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
                        <p className="text-text-secondary">Loading course details...</p>
                    </div>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !course) {
        return (
            <div className="pt-16 min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
                <div className="container-custom py-16">
                    <div className="text-center">
                        <BookOpen className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-text-primary mb-2">Course Not Found</h1>
                        <p className="text-text-secondary mb-6">{error || 'The course you are looking for does not exist.'}</p>
                        <Link href="/courses" className="btn-primary">
                            Browse All Courses
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-16 min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
            {/* Breadcrumb */}
            <div className="bg-dark-card/50 backdrop-blur-xl border-b border-dark-border">
                <div className="container-custom py-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/courses" className="text-accent-blue hover:text-accent-blue/80 transition-colors flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Courses
                        </Link>
                        <span className="text-text-muted">/</span>
                        <span className="text-text-secondary">{course.level || 'Course'}</span>
                        <span className="text-text-muted">/</span>
                        <span className="text-text-primary">{course.title}</span>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Course Info */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            {/* Course Header */}
                            <div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm font-medium">
                                        {course.level || 'Course'}
                                    </span>
                                    <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                                        ₹{course.price}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                                    {course.title}
                                </h1>
                                <p className="text-lg text-text-secondary mb-6">
                                    {course.description}
                                </p>
                            </div>

                            {/* Course Stats */}
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center space-x-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="text-text-primary font-medium">4.8</span>
                                    <span className="text-text-secondary">(1,247 reviews)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="w-5 h-5 text-accent-blue" />
                                    <span className="text-text-secondary">2,500 students</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-accent-blue" />
                                    <span className="text-text-secondary">48 hours</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5 text-accent-blue" />
                                    <span className="text-text-secondary">12 weeks</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Globe className="w-5 h-5 text-accent-blue" />
                                    <span className="text-text-secondary">English</span>
                                </div>
                            </div>

                            {/* Course Image */}
                            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                                <img
                                    src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        <Play className="w-10 h-10 text-white ml-1" />
                                    </motion.button>
                                </div>
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                                            isLiked ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Enrollment Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-6 sticky top-24"
                        >
                            <div className="space-y-6">
                                {/* Price */}
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-text-primary mb-2">₹{course.price}</div>
                                    <div className="text-sm text-text-muted line-through">₹{Math.round(course.price * 1.5)}</div>
                                </div>

                                {/* Key Features */}
                                <div>
                                    <h4 className="font-semibold text-text-primary mb-3">What you'll get:</h4>
                                    <div className="space-y-2">
                                        {[
                                            'Lifetime course access',
                                            'Certificate of completion',
                                            '24/7 support access',
                                            'Hands-on projects',
                                            'Mobile & desktop learning',
                                            'Downloadable resources'
                                        ].map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                <span className="text-sm text-text-secondary">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="space-y-3">
                                    {isEnrolled ? (
                                        <Link href="/dashboard" className="btn-primary w-full">
                                            <Play className="w-4 h-4 mr-2" />
                                            Continue Learning
                                        </Link>
                                    ) : (
                                        <button onClick={handleEnrollClick} className="btn-primary w-full">
                                            <Play className="w-4 h-4 mr-2" />
                                            Enroll Now
                                        </button>
                                    )}
                                </div>

                                {/* Course Stats */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-border">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-text-primary">2.5k</div>
                                        <div className="text-xs text-text-muted">Students</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-text-primary">4.8</div>
                                        <div className="text-xs text-text-muted">Rating</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Course Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-8"
                >
                    <div className="space-y-8">
                        {/* Course Description */}
                        <div>
                            <h3 className="text-2xl font-semibold text-text-primary mb-4">About This Course</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                {course.description}
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                This comprehensive course will take you from beginner to advanced level with hands-on projects, 
                                real-world scenarios, and industry best practices. Perfect for anyone looking to advance their 
                                career or build practical skills.
                            </p>
                        </div>

                        {/* Learning Objectives */}
                        <div>
                            <h3 className="text-xl font-semibold text-text-primary mb-4">What You'll Learn</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Master core concepts and fundamentals',
                                    'Build real-world projects',
                                    'Learn industry best practices',
                                    'Prepare for certifications',
                                    'Develop practical skills',
                                    'Get career guidance'
                                ].map((objective, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <Target className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                                        <span className="text-text-secondary">{objective}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Prerequisites */}
                        <div>
                            <h3 className="text-xl font-semibold text-text-primary mb-4">Prerequisites</h3>
                            <div className="bg-dark-secondary/50 rounded-xl p-4">
                                <ul className="space-y-2 text-text-secondary">
                                    <li>• Basic computer knowledge</li>
                                    <li>• Willingness to learn</li>
                                    <li>• No prior experience required</li>
                                    <li>• Access to a computer with internet</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Enrollment Form Modal */}
            {showEnrollmentForm && (
                <EnrollmentForm
                    courseId={courseId}
                    courseTitle={course.title}
                    coursePrice={course.price}
                    onClose={() => setShowEnrollmentForm(false)}
                    onSuccess={() => {
                        // Refresh enrollments or redirect to dashboard
                        router.push('/dashboard')
                    }}
                />
            )}
        </div>
    )
}

export default CourseDetailPage
