import axios from 'axios'
import { useAuthStore } from '../store'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.PROD
  ? '/api'
  : 'http://localhost:5000/api'



const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong'
    
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      toast.error('Session expired. Please login again.')
      window.location.href = '/login'
    } else {
      toast.error(message)
    }
    
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getMe: () => apiClient.get('/auth/me'),
  updateProfile: (data) => apiClient.put('/auth/updateprofile', data),
  updatePassword: (data) => apiClient.put('/auth/updatepassword', data),
}

// Claims API
export const claimsAPI = {
  processClaim: (formData) => 
    apiClient.post('/claims/process', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAllClaims: (params) => apiClient.get('/claims', { params }),
  getClaimById: (id) => apiClient.get(`/claims/${id}`),
  updateClaimStatus: (id, data) => apiClient.patch(`/claims/${id}/status`, data),
  runFraudAnalysis: (id) => apiClient.post(`/claims/${id}/fraud-check`),
  generateSummary: (id) => apiClient.get(`/claims/${id}/summary`),
  deleteClaim: (id) => apiClient.delete(`/claims/${id}`),
}

// Analytics API
export const analyticsAPI = {
  getDashboard: (params) => apiClient.get('/analytics/dashboard', { params }),
  getTrends: (params) => apiClient.get('/analytics/trends', { params }),
  getPerformance: () => apiClient.get('/analytics/performance'),
}

export default apiClient
