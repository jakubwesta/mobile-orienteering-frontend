import PostCard from "@/components/feed/post-card"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "@/hooks/use-user"
import type { User } from "@/services/user.service"
import type { Post } from "@/services/post.service"
import { userFollowService } from "@/services/user-follows.service"
import { followRequestService } from "@/services/follow-request.service"


/*
API TO DO:
getPostsByUserId(userId) done
getMyPosts() done

deleteUserFollowsByFollowerIdAndFollowingId
deleteFollowRequestByFollowerIdAndFollowingId
saveFollowRequest
createUserFollows

*/

const userPosts: Post[] = [
    { id: 1, title: "Morning run", userFullName: "John Doe", username: "johndoe", date: "10.01.2025", distance: "5.2km", duration: "28min" },
    { id: 2, title: "Easy run", userFullName: "John Doe", username: "johndoe", date: "09.01.2025", distance: "3.5km", duration: "20min" },
    { id: 3, title: "Speed training", userFullName: "John Doe", username: "johndoe", date: "09.01.2025", distance: "8km", duration: "35min" },
    { id: 4, title: "Long run", userFullName: "John Doe", username: "johndoe", date: "08.01.2025", distance: "12km", duration: "1h 10min" },
    { id: 5, title: "Recovery jog", userFullName: "John Doe", username: "johndoe", date: "08.01.2025", distance: "4km", duration: "25min" },
    { id: 6, title: "Hill workout", userFullName: "John Doe", username: "johndoe", date: "07.01.2025", distance: "6.5km", duration: "40min" },
    { id: 7, title: "Evening run", userFullName: "John Doe", username: "johndoe", date: "07.01.2025", distance: "7km", duration: "32min" },
    { id: 8, title: "Track session", userFullName: "John Doe", username: "johndoe", date: "06.01.2025", distance: "10km", duration: "48min" },
    { id: 9, title: "Tempo run", userFullName: "John Doe", username: "johndoe", date: "06.01.2025", distance: "9km", duration: "42min" },
]


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

                    if (followed) {
                        setFollowButtonStatus(FollowButtonStatus.Unfollow)

                        //wczytaj posty o visability follower i public

                        const posts = userPosts
                        setPosts(posts)

                    } else {
                        const isPending = await followRequestService.existsFromRequester(parId)

                        if (isPending) {
                            setFollowButtonStatus(FollowButtonStatus.WithdrawRequest)
                        } else {
                            setFollowButtonStatus(FollowButtonStatus.Follow)
                        }

                        //wczytaj posty o visability public

                        const posts = userPosts
                        setPosts(posts)
                    }

                } else {

                    //wczytaj wszystkie posty (private, followers, public)
                    const posts = userPosts
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

                switch (followButtonStatus) {
                    case FollowButtonStatus.Unfollow:
                        //wczytaj posty o visability follower i public i ustaw

                        break;

                    case FollowButtonStatus.WithdrawRequest:
                        //wczytaj posty o visability public i ustaw

                        break;

                    case FollowButtonStatus.Follow:
                        //wczytaj posty o visability public i ustaw

                        break;
                }
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
        if (followButtonStatus === FollowButtonStatus.Unfollow) {
            // delete userfollows connection between current user and user with par id
            setFollowButtonStatus(FollowButtonStatus.Follow)
        } else if (followButtonStatus === FollowButtonStatus.WithdrawRequest) {
            // delete follow request send by current user to user with par id
            setFollowButtonStatus(FollowButtonStatus.Follow)
        } else if (followButtonStatus === FollowButtonStatus.Follow) {
            if (userToShow?.private!) {
                // create follow request by current user to user with par id
                setFollowButtonStatus(FollowButtonStatus.WithdrawRequest)
            } else {
                // create userfollows connection between curretn user and user with par id
                setFollowButtonStatus(FollowButtonStatus.Unfollow)
            }
        }
    }

    const handleFollowRequestButtonClick = () => {
        alert("info click")
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
                    {userPosts.map((post) => (
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