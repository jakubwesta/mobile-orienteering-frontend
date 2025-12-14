import { initializeApiAuth, type ApiError } from "@/api/api"
import {
  authService,
  type LoginRequest,
  type LoginGoogleRequest,
  type RegisterRequest,
} from "@/services/auth.service"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useUserStore } from "@/stores/user.store"

interface AuthState {
  // State
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: ApiError | null

  // Actions
  register: (data: RegisterRequest) => Promise<void>
  login: (data: LoginRequest) => Promise<void>
  loginGoogle: (data: LoginGoogleRequest) => Promise<void>
  logout: () => void
  refresh: () => Promise<void>
  clearError: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Register action
      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(data)
          set({
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error as ApiError,
            isLoading: false,
            isAuthenticated: false,
          })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Login action
      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(data)
          set({
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error as ApiError,
            isLoading: false,
            isAuthenticated: false,
          })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Google login action
      loginGoogle: async (data: LoginGoogleRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.loginGoogle(data)
          set({
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error as ApiError,
            isLoading: false,
            isAuthenticated: false,
          })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Logout action
      logout: () => {
        useUserStore.getState().clearAll()
        
        set({
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },

      // Refresh token action
      refresh: async () => {
        const { refreshToken } = get()
        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        try {
          const response = await authService.refresh({ refreshToken })
          set({
            token: response.accessToken,
            refreshToken: response.refreshToken,
          })
        } catch (error) {
          set({
            error: error as ApiError,
          })
          // If refresh fails, logout the user
          get().logout()
          throw error
        }
      },

      // Clear error action
      clearError: () => {
        set({ error: null })
      },

      // Initialize action
      initialize: () => {
        initializeApiAuth(() => {
          const state = get()
          return {
            token: state.token,
            refresh: () => state.refresh(),
          }
        })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initialize()
        }
      },
    },
  ),
)
