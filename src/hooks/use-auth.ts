import { useAuthStore } from "@/stores/auth.store"

export const useAuth = () => {
  // State
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)

  // Actions
  const register = useAuthStore((state) => state.register)
  const login = useAuthStore((state) => state.login)
  const loginGoogle = useAuthStore((state) => state.loginGoogle)
  const logout = useAuthStore((state) => state.logout)
  const refresh = useAuthStore((state) => state.refresh)
  const clearError = useAuthStore((state) => state.clearError)

  // Derived state
  const hasError = error !== null
  const isGuest = !isAuthenticated

  return {
    // State
    isAuthenticated,
    isGuest,
    isLoading,
    error,
    hasError,

    // Actions
    register,
    login,
    loginGoogle,
    logout,
    refresh,
    clearError,
  }
}
