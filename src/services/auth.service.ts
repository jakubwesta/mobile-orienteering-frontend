import { apiPost } from "@/api/api"
import { apiRoutes } from "@/api/api-routes"

export type RegisterRequest = {
  username: string
  fullName: string
  email: string
  phoneNumber: string
  password: string
  private: boolean
}

export type RegisterResponse = {
  token: string
  username: string
  refreshToken: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  username: string
  refreshToken: string
}

export type LoginGoogleRequest = {
  idToken: string
}

export type LoginGoogleResponse = {
  token: string
  username: string
  refreshToken: string
}

export type RefreshRequest = {
  refreshToken: string
}

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

class AuthService {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return apiPost<RegisterResponse, RegisterRequest>(
      apiRoutes.auth.register(),
      data,
    )
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return apiPost<LoginResponse, LoginRequest>(
      apiRoutes.auth.login(),
      data,
    )
  }

  async loginGoogle(data: LoginGoogleRequest): Promise<LoginGoogleResponse> {
    return apiPost<LoginGoogleResponse, LoginGoogleRequest>(
      apiRoutes.auth.loginGoogle(),
      data,
    )
  }

  async refresh(data: RefreshRequest): Promise<RefreshResponse> {
    return apiPost<RefreshResponse, RefreshRequest>(
      apiRoutes.auth.refresh(),
      data,
    )
  }
}

export const authService = new AuthService()
