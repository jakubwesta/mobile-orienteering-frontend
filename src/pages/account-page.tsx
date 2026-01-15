import PostCard from "@/components/feed/post-card"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "@/hooks/use-user"
import type { User } from "@/services/user.service"
import { postService, type Post } from "@/services/post.service"
import { userFollowService } from "@/services/user-follows.service"
import { followRequestService } from "@/services/follow-request.service"
import { Button } from "@/components/ui/button"


const FollowButtonStatus = {
    Follow: "Follow",
    WithdrawRequest: "WithdrawRequest",
    Unfollow: "Unfollow",
} as const;

type FollowButtonStatusType =
    typeof FollowButtonStatus[keyof typeof FollowButtonStatus];

const followButtonText: Record<FollowButtonStatusType, string> = {
    Follow: "Follow",
    WithdrawRequest: "Withdraw request",
    Unfollow: "Unfollow",
};


export default function AccountPage() {
    const navigate = useNavigate()
    const { currentUser, viewedUser, fetchCurrentUser, fetchUserById } = useUser()
    const params = useParams();
    const parId: string | undefined = params.id;
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [followButtonStatus, setFollowButtonStatus] = useState<FollowButtonStatusType>(FollowButtonStatus.Follow)
    const userToShow: User | null = parId ? viewedUser : currentUser;


    useEffect(() => {
        const getAccountDetails = async () => {
            try {
                if (!currentUser) {
                    await fetchCurrentUser()
                }

                if (parId) {
                    await fetchUserById(parId)
                    const followed = await userFollowService.exists(parId)
                    const posts = await postService.getPostsByUserId(parId)
                    setPosts(posts)

                    if (followed) {
                        setFollowButtonStatus(FollowButtonStatus.Unfollow)
                    } else {
                        const isPending = await followRequestService.existsToTarget(parId)

                        if (isPending) {
                            setFollowButtonStatus(FollowButtonStatus.WithdrawRequest)
                        } else {
                            setFollowButtonStatus(FollowButtonStatus.Follow)
                        }
                    }
                } else {
                    const posts = await postService.getMyPosts()
                    setPosts(posts)

                }
            } catch (err) {
                console.log(err);
                setError("Error while loading account details");
            } finally {
                setLoading(false);
            }
        }
        getAccountDetails()
    }, [])

    useEffect(() => {
        if (!parId) return;
        const loadPostsByVisibility = async () => {
            try {
                setLoading(true);
                const posts = await postService.getPostsByUserId(parId)
                setPosts(posts)

            } catch (err) {
                console.log(err);
                setError("Error while loading posts");
            } finally {
                setLoading(false);
            }
        };

        loadPostsByVisibility();
    }, [followButtonStatus])

    const handleMainButtonClick = async () => {
        if (!parId) return;
        try {
            setLoading(true);
            if (followButtonStatus === FollowButtonStatus.Unfollow) {
                await userFollowService.unfollow(parId)
                setFollowButtonStatus(FollowButtonStatus.Follow)

            } else if (followButtonStatus === FollowButtonStatus.WithdrawRequest) {
                await followRequestService.withdraw(parId)
                setFollowButtonStatus(FollowButtonStatus.Follow)

            } else if (followButtonStatus === FollowButtonStatus.Follow) {
                if (userToShow?.private!) {
                    await followRequestService.create(parId)
                    setFollowButtonStatus(FollowButtonStatus.WithdrawRequest)

                } else {
                    await userFollowService.follow(parId)
                    setFollowButtonStatus(FollowButtonStatus.Unfollow)
                }
            }
        } catch (err) {
            setError("Error while main button click");
        } finally {
            setLoading(false);
        }
    }

    const handleFollowRequestButtonClick = () => {
        navigate(`/pending`)
    }

    if (loading) return <p className="text-left px-4 sm:px-6 md:pl-12 text-gray-600 dark:text-gray-400 py-8">Loading...</p>
    if (error) return <p className="text-left px-4 sm:px-6 md:pl-12 text-red-600 dark:text-red-400 py-8">{error}</p>
    if (!userToShow) return <p className="text-left px-4 sm:px-6 md:pl-12 text-gray-600 dark:text-gray-400 py-8">User not found</p>
    if (!currentUser) return <p className="text-left px-4 sm:px-6 md:pl-12 text-gray-600 dark:text-gray-400 py-8">User not logged</p>

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="max-w-4xl pt-4 pb-6 px-4 sm:px-6 md:pl-12">
                {userToShow.private && !parId && (
                    <Button
                        type="button"
                        onClick={handleFollowRequestButtonClick}
                        variant={"outline"}
                        size={"lg"}
                        className="w-full sm:w-auto"
                    >
                        Pending follow requests
                    </Button>
                )}
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 mt-4 sm:mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shrink-0">
                                {userToShow.fullName.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                    {userToShow.fullName}
                                </h1>
                                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
                                    @{userToShow.username}
                                </p>
                                <div className="mt-2 flex items-center justify-center sm:justify-start space-x-4">
                                    <div className="text-center sm:text-left">
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">posts</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            {currentUser.id !== userToShow.id && parId && (
                                <Button
                                    type="button"
                                    onClick={handleMainButtonClick}
                                    variant={followButtonStatus === FollowButtonStatus.Follow ? "default" : "outline"}
                                    size={"lg"}
                                    className="w-full sm:w-auto"
                                >
                                    {followButtonText[followButtonStatus]}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            userFullName={post.userFullName}
                            username={post.username}
                            date={post.createdAt}
                            distance={post.distance}
                            duration={post.duration}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}