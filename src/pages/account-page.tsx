import PostCard from "@/components/feed/post-card"
import type { Post } from "@/types/post"

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

export default function AccountPage() {
    return (
        <div>
            <div>
                <p>posts</p>
                <p>{userPosts.length}</p>
                <p>followers</p>
                <p>{userData.followers}</p>
                <p>following</p>
                <p>{userData.following}</p>
                <p>{userData.fullName}</p>
                <p>@{userData.username}</p>
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