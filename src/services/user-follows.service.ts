import { apiDelete, apiGet, apiPost } from "@/api/api"
import { apiRoutes } from "@/api/api-routes"


class UserFollowService {
    async exists(followingId: number | string): Promise<boolean> {
        return apiGet<boolean>(apiRoutes.userFollows.exists(followingId))
    }

    async follow(followingId: number | string): Promise<void> {
        return apiPost<void>(apiRoutes.userFollows.create(), { followingId })
    }

    async unfollow(followingId: number | string): Promise<void> {
        return apiDelete<void>(apiRoutes.userFollows.delete(followingId))
    }
}

export const userFollowService = new UserFollowService()
