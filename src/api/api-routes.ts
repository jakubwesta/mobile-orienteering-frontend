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
  },

  userFollows: {
    create: () => `${API_PREFIX}/user-follows`,
    exists: () => `${API_PREFIX}/user-follows/exists`,
    delete: (followerId: string | number, followingId: string | number) =>
      `${API_PREFIX}/user-follows/${followerId}/${followingId}`,
  },

  followRequests: {
    create: () => `${API_PREFIX}/follow-requests`,
    getById: (id: string | number) => `${API_PREFIX}/follow-requests/${id}`,
    delete: (id: string | number) => `${API_PREFIX}/follow-requests/${id}`,
    accept: (id: string | number) => `${API_PREFIX}/follow-requests/${id}/accept`,
    reject: (id: string | number) => `${API_PREFIX}/follow-requests/${id}/reject`,
    pendingForTarget: (id: string | number) =>
      `${API_PREFIX}/follow-requests/targets/${id}/pending`,
    byRequesterAndTarget: (
      requesterId: string | number,
      targetId: string | number,
    ) => `${API_PREFIX}/follow-requests/requester/${requesterId}/target/${targetId}`,
  },

  posts: {
    create: () => `${API_PREFIX}/posts`,
    getById: (id: string | number) => `${API_PREFIX}/posts/${id}`,
    delete: (id: string | number) => `${API_PREFIX}/posts/${id}`,
    byUser: (userId: string | number) => `${API_PREFIX}/posts/users/${userId}`,
    publicByUser: (userId: string | number) =>
      `${API_PREFIX}/posts/users/${userId}/public`,
  },

  maps: {
    create: () => `${API_PREFIX}/maps`,
    getById: (id: string | number) => `${API_PREFIX}/maps/${id}`,
    delete: (id: string | number) => `${API_PREFIX}/maps/${id}`,
    byUser: (userId: string | number) => `${API_PREFIX}/maps/user/${userId}`,
  },

  activities: {
    create: () => `${API_PREFIX}/activities`,
    getById: (id: string | number) => `${API_PREFIX}/activities/${id}`,
    delete: (id: string | number) => `${API_PREFIX}/activities/${id}`,
    byUser: (userId: string | number) => `${API_PREFIX}/activities/user/${userId}`,
    byMap: (mapId: string | number) => `${API_PREFIX}/activities/map/${mapId}`,
  },
} as const

export type ApiRoutes = typeof apiRoutes
