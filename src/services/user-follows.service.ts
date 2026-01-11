// src/services/user-follow.service.ts
import { apiGet, apiPost } from "@/api/api"
import { apiRoutes } from "@/api/api-routes"

type CreateUserFollowRequest = {
    followingId: number
}

class UserFollowService {
    async createFollow(data: CreateUserFollowRequest) {
        return apiPost<void>(
            apiRoutes.userFollows.create(),
            data,
        )
    }

    async exists(followingId: number | string): Promise<boolean> {
        return apiGet<boolean>(apiRoutes.userFollows.exists(followingId))
    }
}

export const userFollowService = new UserFollowService()
