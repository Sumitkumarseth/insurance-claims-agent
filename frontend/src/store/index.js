import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (userData, token) => set({ 
        user: userData, 
        token, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
      
      updateUser: (userData) => set({ user: userData }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useClaimStore = create((set) => ({
  selectedClaim: null,
  filters: {
    status: '',
    queue: '',
    dateRange: null,
  },
  
  setSelectedClaim: (claim) => set({ selectedClaim: claim }),
  
  setFilters: (filters) => set({ filters }),
  
  clearFilters: () => set({ 
    filters: { status: '', queue: '', dateRange: null } 
  }),
}))
