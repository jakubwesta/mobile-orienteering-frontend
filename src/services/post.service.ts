import { apiGet } from "@/api/api"
import { apiRoutes } from "@/api/api-routes"


export type Post = {
    id: number
    userId: number
    content: string
    mapId: number
    activityId: number
    visibility: string
    createdAt: string
    title: string
    userFullName: string
    username: string
    distance: string
    duration: string
}

class PostService {
    async fetchFeed(): Promise<Post[]> {
        return apiGet<Post[]>(apiRoutes.posts.getFeed())
    }

    async getMyPosts(): Promise<Post[]> {
        return apiGet<Post[]>(apiRoutes.posts.myPosts())
    }

    async getPostsByUserId(userId: string | number): Promise<Post[]> {
        return apiGet<Post[]>(apiRoutes.posts.byUser(userId))
    }
}

export const postService = new PostService()
