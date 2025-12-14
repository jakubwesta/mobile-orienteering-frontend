import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios"

export type ApiError = {
  message: string
  status?: number
  code?: string
  details?: unknown
  isNetworkError: boolean
}

export const api: AxiosInstance = axios.create({
  timeout: 15_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

let getAuthState: (() => { token: string | null; refresh: () => Promise<void> }) | null = null

export function initializeApiAuth(
  getState: () => { token: string | null; refresh: () => Promise<void> }
) {
  getAuthState = getState
}

// Request interceptor - attach token from store
api.interceptors.request.use((config) => {
  if (getAuthState) {
    const { token } = getAuthState()
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const details = error.response?.data

    let message = error.message
    if (typeof details === "string") message = details
    if (details && typeof details === "object") {
      const maybeMessage = (details as { message?: unknown; error?: unknown }).message
      const maybeError = (details as { message?: unknown; error?: unknown }).error
      if (typeof maybeMessage === "string") message = maybeMessage
      else if (typeof maybeError === "string") message = maybeError
    }

    return {
      message,
      status,
      code: error.code,
      details,
      isNetworkError: !error.response,
    }
  }

  if (error instanceof Error) {
    return { 
      message: error.message, 
      details: error, 
      isNetworkError: true 
    }
  }

  return { message: String(error), details: error, isNetworkError: true }
}

// Response interceptor - handle 401 with automatic token refresh
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: ApiError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (res) => res,
  async (err: unknown) => {
    const error = toApiError(err)
    
    if (axios.isAxiosError(err) && err.config) {
      const originalRequest = err.config as InternalAxiosRequestConfig & { _retry?: boolean }
      
      // Handle 401 - attempt token refresh
      if (error.status === 401 && !originalRequest._retry && getAuthState) {
        const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh')
        if (isRefreshEndpoint) {
          return Promise.reject(error)
        }

        if (isRefreshing) {
          // Queue this request while refresh is in progress
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(() => api(originalRequest))
            .catch((err) => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          const { refresh } = getAuthState()
          await refresh()
          
          isRefreshing = false
          processQueue(null)
          
          // Retry the original request with new token
          return api(originalRequest)
        } catch {
          isRefreshing = false
          processQueue(error)
          return Promise.reject(error)
        }
      }
    }

    return Promise.reject(error)
  },
)

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig
) {
  const res = await api.get<T>(url, config)
  return res.data
}

export async function apiPost<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
) {
  const res = await api.post<TResponse>(url, body, config)
  return res.data
}

export async function apiPut<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
) {
  const res = await api.put<TResponse>(url, body, config)
  return res.data
}

export async function apiPatch<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
) {
  const res = await api.patch<TResponse>(url, body, config)
  return res.data
}

export async function apiDelete<T>(
  url: string, 
  config?: AxiosRequestConfig
) {
  const res = await api.delete<T>(url, config)
  return res.data
}
