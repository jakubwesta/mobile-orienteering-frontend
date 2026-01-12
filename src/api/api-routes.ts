import { LOCAL_API_URL as API_PREFIX } from "@/env"

export const apiRoutes = {
  auth: {
    register: () => `${API_PREFIX}/auth/register`,
    login: () => `${API_PREFIX}/auth/login`,
    loginGoogle: () => `${API_PREFIX}/auth/login/google`,
    refresh: () => `${API_PREFIX}/auth/refresh`,
  },

  users: {
    me: () => `${API_PREFIX}/users/me`,
    getById: (id: string | number) => `${API_PREFIX}/users/${id}`,
    update: (id: string | number) => `${API_PREFIX}/users/${id}`,
    delete: (id: string | number) => `${API_PREFIX}/users/${id}`,
    search: (query: string) => `${API_PREFIX}/users?query=${encodeURIComponent(query)}`,
  },

  userFollows: {
    create: () => `${API_PREFIX}/user-follows`,
    delete: (followingId: number | string) =>
      `${API_PREFIX}/user-follows/${followingId}`,
    exists: (followingId: number | string) => `${API_PREFIX}/user-follows/${followingId}/exists`,
  },

  followRequests: {
    create: () => `${API_PREFIX}/follow-requests`,
    pending: () => `${API_PREFIX}/follow-requests/pending`,
    accept: (requestId: string | number) => `${API_PREFIX}/follow-requests/${requestId}/accept`,
    reject: (requestId: string | number) => `${API_PREFIX}/follow-requests/${requestId}/reject`,
    existsToTarget: (targetId: number | string) => `${API_PREFIX}/follow-requests/to/${targetId}/exists`,
    withdraw: (targetUserId: number | string) =>
      `${API_PREFIX}/follow-requests/to/${targetUserId}`,
  },

  posts: {
    getFeed: () => `${API_PREFIX}/posts/feed`,
    byUser: (userId: string | number) => `${API_PREFIX}/posts/users/${userId}`,
    myPosts: () => `${API_PREFIX}/posts/me`,
  },
} as const

export type ApiRoutes = typeof apiRoutes
