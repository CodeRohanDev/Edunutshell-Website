import { UserRole } from './auth'

// Course interface
export interface Course {
  id: string
  title: string
  description: string
  category: string
  price: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  instructor: string
  thumbnail: string
  isPublished: boolean
  enrolledCount: number
  createdAt: Date
  updatedAt: Date
}

// Payment/Transaction interface
export interface Transaction {
  id: string
  userId: string
  userName: string
  userEmail: string
  courseId: string
  courseTitle: string
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: string
  transactionDate: Date
}

// User management interface
export interface UserManagement {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  isActive: boolean
  enrolledCourses: number
  totalSpent: number
  joinDate: Date
  lastActive: Date
}
