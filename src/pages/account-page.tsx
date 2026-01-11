import PostCard from "@/components/feed/post-card"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "@/hooks/use-user"
import type { User } from "@/services/user.service"
import { postService, type Post } from "@/services/post.service"
import { userFollowService } from "@/services/user-follows.service"
import { followRequestService } from "@/services/follow-request.service"


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
                        const isPending = await followRequestService.existsFromRequester(parId)

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

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!userToShow) return <p>User not found</p>

    return (
        <div>
            <div>
                {userToShow.private && !parId && <button type="button" onClick={handleFollowRequestButtonClick}>handle pending follow request</button>}
                <p>posts</p>
                <p>{posts.length}</p>
                <p>{userToShow.fullName}</p>
                <p>@{userToShow.username}</p>
                {parId && <button type="button" onClick={handleMainButtonClick}>{followButtonText[followButtonStatus]}</button>}
                <div>
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            userFullName={post.userFullName}
                            username={post.username}
                            date={post.date}
                            distance={post.distance}
                            duration={post.duration}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}