// User roles
export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  INSTRUCTOR = 'instructor'
}

// User interface
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

// Auth context type
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isStudent: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<UserRole>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}
