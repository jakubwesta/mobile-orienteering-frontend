import { apiGet, apiDelete, apiPost } from "@/api/api"
import { apiRoutes } from "@/api/api-routes"

export type PendingFollowRequest = {
    id: number
    requesterId: number
    requesterFullName: string
    requesterUserName: string
}


class FollowRequestService {
    async findMyPending() {
        return apiGet<PendingFollowRequest[]>(
            apiRoutes.followRequests.pending(),
        )
    }


    async rejectRequest(requestId: number) {
        return apiDelete<void>(
            apiRoutes.followRequests.reject(requestId),
        )
    }

    async acceptRequest(requestId: number) {
        return apiPost<void>(
            apiRoutes.followRequests.accept(requestId),
        )
    }

    async existsToTarget(targetId: number | string): Promise<boolean> {
        return apiGet<boolean>(apiRoutes.followRequests.existsToTarget(targetId))
    }

    async withdraw(targetUserId: number | string): Promise<void> {
        return apiDelete<void>(apiRoutes.followRequests.withdraw(targetUserId))
    }

    async create(targetUserId: number | string): Promise<void> {
        return apiPost<void>(apiRoutes.followRequests.create(), {
            targetUserId,
        })
    }
}

export const followRequestService = new FollowRequestService()
