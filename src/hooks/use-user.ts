import { useUserStore } from "@/stores/user.store"

export const useUser = () => {
  // State
  const currentUser = useUserStore((state) => state.currentUser)
  const viewedUser = useUserStore((state) => state.viewedUser)
  const isLoading = useUserStore((state) => state.isLoading)
  const error = useUserStore((state) => state.error)

  // Actions
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser)
  const fetchUserById = useUserStore((state) => state.fetchUserById)
  const updateCurrentUser = useUserStore((state) => state.updateCurrentUser)
  const deleteCurrentUser = useUserStore((state) => state.deleteCurrentUser)
  const clearViewedUser = useUserStore((state) => state.clearViewedUser)
  const clearError = useUserStore((state) => state.clearError)

  // Derived state
  const hasError = error !== null

  return {
    // State
    currentUser,
    viewedUser,
    isLoading,
    error,
    hasError,

    // Actions
    fetchCurrentUser,
    fetchUserById,
    updateCurrentUser,
    deleteCurrentUser,
    clearViewedUser,
    clearError,
  }
}
