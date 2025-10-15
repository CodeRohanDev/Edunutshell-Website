// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://edunutshell-lms.onrender.com',
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
      REFRESH: '/api/auth/refresh',
      LOGOUT: '/api/auth/logout',
      CREATE_ADMIN: '/api/auth/create-admin'
    },
    // Course endpoints
    COURSES: {
      ADD: '/api/courses/add',
      LIST: '/api/courses/list',
      UPDATE: '/api/courses',
      DELETE: '/api/courses/delete'
    },
    // Enrollment endpoints
    ENROLLMENTS: {
      ENROLL: '/api/enrollments/enroll',
      MY_COURSES: '/api/enrollments/my-courses'
    },
    // Feedback endpoints
    FEEDBACK: {
      SUBMIT: '/api/feedback',
      GET_BY_COURSE: '/api/feedback/course'
    },
    // Admin endpoints
    ADMIN: {
      USERS: '/api/admin/users'
    }
  }
}

// Request headers helper
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  return headers
}