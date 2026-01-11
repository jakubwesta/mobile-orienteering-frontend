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


    async deleteRequest(requestId: number) {
        return apiDelete<void>(
            apiRoutes.followRequests.delete(requestId),
        )
    }

    async acceptRequest(requestId: number) {
        return apiPost<void>(
            apiRoutes.followRequests.accept(requestId),
        )
    }

    async existsFromRequester(requesterId: number | string): Promise<boolean> {
        return apiGet<boolean>(apiRoutes.followRequests.existsFromRequester(requesterId))
    }
}

export const followRequestService = new FollowRequestService()
