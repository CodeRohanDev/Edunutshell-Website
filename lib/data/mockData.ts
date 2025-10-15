import { UserManagement, Course, Transaction } from '@/lib/types/admin'
import { UserRole } from '@/lib/types/auth'

// Mock users data
export const mockUsers: UserManagement[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@edunutshell.com',
    role: UserRole.ADMIN,
    isActive: true,
    enrolledCourses: 0,
    totalSpent: 0,
    joinDate: new Date('2024-01-01'),
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    role: UserRole.STUDENT,
    isActive: true,
    enrolledCourses: 3,
    totalSpent: 597,
    joinDate: new Date('2024-01-15'),
    lastActive: new Date()
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '+1 (555) 234-5678',
    role: UserRole.STUDENT,
    isActive: true,
    enrolledCourses: 5,
    totalSpent: 995,
    joinDate: new Date('2024-02-01'),
    lastActive: new Date('2024-10-05')
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    role: UserRole.STUDENT,
    isActive: false,
    enrolledCourses: 1,
    totalSpent: 199,
    joinDate: new Date('2024-03-10'),
    lastActive: new Date('2024-09-20')
  }
]

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Cloud Computing Mastery',
    description: 'Master AWS, Azure, and Google Cloud Platform',
    category: 'Cloud Computing',
    price: 199,
    duration: '12 weeks',
    level: 'Intermediate',
    instructor: 'Dr. Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
    isPublished: true,
    enrolledCount: 245,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Machine Learning Pro',
    description: 'Deep dive into ML algorithms and neural networks',
    category: 'AI & ML',
    price: 249,
    duration: '16 weeks',
    level: 'Advanced',
    instructor: 'Prof. Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    isPublished: true,
    enrolledCount: 189,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Web Development Bootcamp',
    description: 'Full-stack web development with React and Node.js',
    category: 'Web Development',
    price: 149,
    duration: '10 weeks',
    level: 'Beginner',
    instructor: 'Alex Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
    isPublished: true,
    enrolledCount: 412,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date()
  }
]

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    userId: '2',
    userName: 'Alex Johnson',
    userEmail: 'alex.johnson@email.com',
    courseId: '1',
    courseTitle: 'Cloud Computing Mastery',
    amount: 199,
    status: 'completed',
    paymentMethod: 'Credit Card',
    transactionDate: new Date('2024-09-15')
  },
  {
    id: 'TXN002',
    userId: '2',
    userName: 'Alex Johnson',
    userEmail: 'alex.johnson@email.com',
    courseId: '2',
    courseTitle: 'Machine Learning Pro',
    amount: 249,
    status: 'completed',
    paymentMethod: 'PayPal',
    transactionDate: new Date('2024-09-20')
  },
  {
    id: 'TXN003',
    userId: '3',
    userName: 'Sarah Williams',
    userEmail: 'sarah.w@email.com',
    courseId: '3',
    courseTitle: 'Web Development Bootcamp',
    amount: 149,
    status: 'completed',
    paymentMethod: 'Credit Card',
    transactionDate: new Date('2024-10-01')
  }
]
