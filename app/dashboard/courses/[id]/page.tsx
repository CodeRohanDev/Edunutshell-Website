'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import {
    Star,
    Clock,
    Users,
    BookOpen,
    Play,
    CheckCircle,
    ArrowLeft,
    Calendar,
    Globe,
    Share2,
    Heart,
    ChevronDown,
    ChevronUp,
    Download,
    Award,
    Target,
    User
} from 'lucide-react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { UserRole } from '@/lib/types/auth'
import Link from 'next/link'

// Mock course data - replace with actual API call
const getCourseData = (id: string) => ({
    id,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    reviews: 2847,
    students: 15420,
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    language: 'English',
    lastUpdated: 'January 2025',
    price: 2999,
    thumbnail: '/api/placeholder/800/400',
    description: 'Master web development from scratch with this comprehensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, and more.',
    whatYouLearn: [
        'Build responsive websites with HTML5 and CSS3',
        'Master JavaScript and modern ES6+ features',
        'Create dynamic web apps with React',
        'Build backend APIs with Node.js and Express',
        'Work with databases (MongoDB, PostgreSQL)',
        'Deploy applications to production'
    ],
    curriculum: [
        {
            title: 'Introduction to Web Development',
            lessons: 8,
            duration: '2 hours',
            topics: ['HTML Basics', 'CSS Fundamentals', 'Dev Tools']
        },
        {
            title: 'JavaScript Essentials',
            lessons: 12,
            duration: '4 hours',
            topics: ['Variables & Data Types', 'Functions', 'DOM Manipulation']
        },
        {
            title: 'React Framework',
            lessons: 15,
            duration: '6 hours',
            topics: ['Components', 'Hooks', 'State Management']
        }
    ],
    requirements: [
        'A computer with internet connection',
        'Basic computer skills',
        'Willingness to learn and practice'
    ],
    enrolled: false
})

const CourseDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string
    const course = getCourseData(courseId)
    const [expandedSection, setExpandedSection] = useState<number | null>(0)
    const [isFavorite, setIsFavorite] = useState(false)

    const toggleSection = (index: number) => {
        setExpandedSection(expandedSection === index ? null : index)
    }

    const handleEnroll = () => {
        router.push(`/dashboard/courses/${courseId}/enroll`)
    }

    return (
        <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
                {/* Breadcrumb */}
                <div className="bg-dark-card/50 backdrop-blur-xl border-b border-dark-border">
                    <div className="container-custom py-4">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link href="/dashboard/courses" className="text-accent-blue hover:text-accent-blue/80 transition-colors flex items-center">
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Courses
                            </Link>
                            <span className="text-text-muted">/</span>
                            <span className="text-text-primary">{course.title}</span>
                        </div>
                    </div>
                </div>

                <div className="container-custom py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Course Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card-dark p-8"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className="bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm font-medium">
                                                Web Development
                                            </span>
                                            <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                                                {course.level}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl font-bold text-text-primary mb-2">
                                            {course.title}
                                        </h1>
                                        <p className="text-text-secondary mb-4">{course.description}</p>

                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold text-text-primary">{course.rating}</span>
                                                <span className="text-text-secondary">({course.reviews} reviews)</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-text-secondary">
                                                <Users className="w-5 h-5" />
                                                <span>{course.students.toLocaleString()} students</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className="p-2 rounded-full hover:bg-dark-secondary transition-colors"
                                    >
                                        <Heart
                                            className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-text-muted'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center gap-6 text-sm text-text-secondary flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-accent-blue" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-accent-blue" />
                                        <span>{course.level}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-accent-blue" />
                                        <span>{course.language}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-accent-blue" />
                                        <span>Updated {course.lastUpdated}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* What You'll Learn */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="card-dark p-8"
                            >
                                <h2 className="text-2xl font-bold text-text-primary mb-6">What You'll Learn</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {course.whatYouLearn.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-text-secondary">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Course Curriculum */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="card-dark p-8"
                            >
                                <h2 className="text-2xl font-bold text-text-primary mb-6">Course Curriculum</h2>
                                <div className="space-y-3">
                                    {course.curriculum.map((section, index) => (
                                        <div key={index} className="border border-dark-border rounded-lg overflow-hidden bg-dark-secondary/30">
                                            <button
                                                onClick={() => toggleSection(index)}
                                                className="w-full flex items-center justify-between p-4 hover:bg-dark-secondary/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <BookOpen className="w-5 h-5 text-accent-blue" />
                                                    <div className="text-left">
                                                        <h3 className="font-semibold text-text-primary">{section.title}</h3>
                                                        <p className="text-sm text-text-muted">
                                                            {section.lessons} lessons • {section.duration}
                                                        </p>
                                                    </div>
                                                </div>
                                                {expandedSection === index ? (
                                                    <ChevronUp className="w-5 h-5 text-text-muted" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-text-muted" />
                                                )}
                                            </button>

                                            {expandedSection === index && (
                                                <div className="px-4 pb-4 bg-dark-secondary/50">
                                                    <ul className="space-y-2">
                                                        {section.topics.map((topic, topicIndex) => (
                                                            <li key={topicIndex} className="flex items-center gap-2 text-text-secondary">
                                                                <Play className="w-4 h-4 text-accent-blue" />
                                                                <span>{topic}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Requirements */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="card-dark p-8"
                            >
                                <h2 className="text-2xl font-bold text-text-primary mb-6">Requirements</h2>
                                <ul className="space-y-3">
                                    {course.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2" />
                                            <span className="text-text-secondary">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="sticky top-24 space-y-4"
                            >
                                {/* Course Card */}
                                <div className="card-dark p-6">
                                    <div className="aspect-video bg-gradient-primary rounded-lg mb-6 flex items-center justify-center">
                                        <Play className="w-16 h-16 text-white" />
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-3xl font-bold text-text-primary">
                                                ₹{course.price}
                                            </span>
                                            <span className="text-text-muted line-through">₹4999</span>
                                        </div>
                                        <p className="text-sm text-red-400 font-medium">40% off - Limited time offer!</p>
                                    </div>

                                    {course.enrolled ? (
                                        <button
                                            onClick={() => router.push(`/dashboard/courses/${courseId}/learn`)}
                                            className="btn-primary w-full"
                                        >
                                            Continue Learning
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleEnroll}
                                            className="btn-primary w-full"
                                        >
                                            Enroll Now
                                        </button>
                                    )}

                                    <div className="mt-4 space-y-3 text-sm text-text-secondary">
                                        <div className="flex items-center justify-between">
                                            <span>30-day money-back guarantee</span>
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Lifetime access</span>
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Certificate of completion</span>
                                            <Award className="w-4 h-4 text-accent-blue" />
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-dark-border flex gap-2">
                                        <button className="flex-1 border border-dark-border py-2 rounded-lg hover:bg-dark-secondary transition-colors flex items-center justify-center gap-2 text-text-secondary">
                                            <Share2 className="w-4 h-4" />
                                            <span className="text-sm">Share</span>
                                        </button>
                                        <button className="flex-1 border border-dark-border py-2 rounded-lg hover:bg-dark-secondary transition-colors flex items-center justify-center gap-2 text-text-secondary">
                                            <Download className="w-4 h-4" />
                                            <span className="text-sm">Save</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Instructor Card */}
                                <div className="card-dark p-6">
                                    <h3 className="font-semibold text-text-primary mb-4">Instructor</h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-primary">{course.instructor}</p>
                                            <p className="text-sm text-text-muted">Senior Developer</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-text-secondary">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <span>4.9 Instructor Rating</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-accent-blue" />
                                            <span>50,000+ Students</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-accent-blue" />
                                            <span>12 Courses</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default CourseDetailPage
