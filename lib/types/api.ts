// API Request/Response types based on the API documentation

// Auth types
export interface RegisterRequest {
  name: string
  email: string
  password: string
  role?: 'admin' | 'student'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  message?: string
  user: {
    id: string
    name: string
    email: string
    role: 'admin' | 'student'
    createdAt?: string
    updatedAt?: string
  }
  accessToken: string
  refreshToken?: string
}

export interface CreateAdminRequest {
  name: string
  email: string
  password: string
}

// Course types
export interface CourseRequest {
  title: string
  description: string
  price: number
  image: string
  level: string
}

export interface CourseResponse {
  _id: string
  title: string
  description: string
  price: number
  image: string
  level: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CourseUpdateRequest {
  title?: string
  description?: string
  price?: number
  image?: string
  level?: string
}

// Enrollment types
export interface EnrollmentResponse {
  _id: string
  student: string
  course: CourseResponse
  enrolledAt: string
  __v: number
}

export interface MyCoursesResponse {
  enrollments: EnrollmentResponse[]
}

// Feedback types
export interface FeedbackRequest {
  course: string
  message: string
  rating: number // 1-5
}

export interface FeedbackResponse {
  _id: string
  student: {
    _id: string
    name: string
    email: string
  }
  course: string
  message: string
  rating: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CourseFeedbackResponse {
  feedbacks: FeedbackResponse[]
}

// Admin types
export interface UserResponse {
  _id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'student'
  createdAt: string
  updatedAt: string
  __v: number
}

// The API returns an array directly, not wrapped in an object
export type UsersResponse = UserResponse[]

// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}