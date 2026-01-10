import PostCard from "@/components/feed/post-card"
import type { Post } from "@/types/post"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "@/hooks/use-user"
import type { User } from "@/services/user.service"

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
const userData = {
    username: "annaK",
    fullName: "Anna Kowalska",
    followers: 1234,
    following: 567
}

const existsByFollowerIdAndFollowingId = true

export default function AccountPage() {
    const { currentUser, viewedUser, fetchCurrentUser, fetchUserById } = useUser()
    const params = useParams();
    const parId: string | undefined = params.id;
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [followed, setFollowed] = useState(false)
    const userToShow: User | null = parId ? viewedUser : currentUser;


    useEffect(() => {
        const getAccountDetails = async () => {
            try {
                let userId
                if (parId) {
                    userId = parId
                    await fetchUserById(userId)
                } else {
                    if (!currentUser) {
                        await fetchCurrentUser()
                    }
                    userId = currentUser?.id!
                }

                const posts = userPosts
                setPosts(posts)

                const followed = existsByFollowerIdAndFollowingId
                setFollowed(followed)


            } catch (err) {
                console.log(err);
                setError("Error loading account details");
            } finally {
                setLoading(false);
            }
        }
        getAccountDetails()
    }, [])

    const handleClick = () => {
        //send create user follows connection
        // or delete connection 
        setFollowed((prev) => !prev)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!userToShow) return <p>User not found</p>

    return (
        <div>
            <div>
                <p>posts</p>
                <p>{posts.length}</p>
                <p>followers</p>
                <p>{userData.followers}</p>
                <p>following</p>
                <p>{userData.following}</p>
                <p>{userToShow.fullName}</p>
                <p>@{userToShow.username}</p>
                {parId && <button type="button" onClick={handleClick}>{followed ? "unfollow" : "follow"}</button>}
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