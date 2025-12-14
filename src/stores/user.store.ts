import { type ApiError } from "@/api/api"
import {
  userService,
  type User,
  type UpdateUserRequest,
} from "@/services/user.service"
import { create } from "zustand"

interface UserState {
  // State
  currentUser: User | null
  viewedUser: User | null
  isLoading: boolean
  error: ApiError | null

  // Actions
  fetchCurrentUser: () => Promise<void>
  fetchUserById: (id: number | string) => Promise<void>
  updateCurrentUser: (data: UpdateUserRequest) => Promise<void>
  deleteCurrentUser: () => Promise<void>
  clearViewedUser: () => void
  clearError: () => void
	clearAll: () => void
}

export const useUserStore = create<UserState>()((set, get) => ({
  // Initial state
  currentUser: null,
  viewedUser: null,
  isLoading: false,
  error: null,

  // Fetch current user (me)
  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null })
    try {
      const user = await userService.getCurrentUser()
      set({
        currentUser: user,
      })
    } catch (error) {
      set({
        error: error as ApiError,
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  // Fetch user by ID (for viewing profiles)
  fetchUserById: async (id: number | string) => {
    set({ isLoading: true, error: null })
    try {
      const user = await userService.getUserById(id)
      set({
        viewedUser: user,
      })
    } catch (error) {
      set({
        error: error as ApiError,
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  // Update current user
  updateCurrentUser: async (data: UpdateUserRequest) => {
    const { currentUser } = get()
    if (!currentUser) {
      throw new Error("No current user to update")
    }

    set({ isLoading: true, error: null })
    try {
      const updatedUser = await userService.updateUser(currentUser.id, data)
      set({
        currentUser: updatedUser,
      })
    } catch (error) {
      set({
        error: error as ApiError,
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  // Delete current user
  deleteCurrentUser: async () => {
    const { currentUser } = get()
    if (!currentUser) {
      throw new Error("No current user to delete")
    }

    set({ isLoading: true, error: null })
    try {
      await userService.deleteUser(currentUser.id)
      set({
        currentUser: null,
      })
    } catch (error) {
      set({
        error: error as ApiError,
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  // Clear viewed user
  clearViewedUser: () => {
    set({ viewedUser: null })
  },

  // Clear error
  clearError: () => {
    set({ error: null })
  },

  // Clear all
  clearAll: () => {
		set({
			currentUser: null,
			viewedUser: null,
			isLoading: false,
			error: null,
		})
	},
}))
