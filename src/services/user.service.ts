import { apiGet, apiPatch, apiDelete } from "@/api/api"
import { apiRoutes } from "@/api/api-routes"

export type User = {
  id: number
  username: string
  fullName: string
  email: string
  phoneNumber: string
  private: boolean
}

export type UpdateUserRequest = {
  username?: string
  fullName?: string
  email?: string
  phoneNumber?: string
  isPrivate?: boolean
  currentPassword?: string
  newPassword?: string
}

class UserService {
  async getCurrentUser(): Promise<User> {
    return apiGet<User>(apiRoutes.users.me())
  }

  async getUserById(id: number | string): Promise<User> {
    return apiGet<User>(apiRoutes.users.getById(id))
  }

  async updateUser(id: number | string, data: UpdateUserRequest): Promise<User> {
    return apiPatch<User, UpdateUserRequest>(
      apiRoutes.users.update(id),
      data,
    )
  }

  async deleteUser(id: number | string): Promise<void> {
    return apiDelete<void>(apiRoutes.users.delete(id))
  }
}

export const userService = new UserService()
