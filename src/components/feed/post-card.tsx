import { useState } from "react"
import ActivityCard from "./activity-card"

type PostCardProps = {
    title: string
    userFullName: string
    username: string
    date: string
    distance: string
    duration: string
}

function PostCard({ title, userFullName, username, date, distance, duration }: PostCardProps) {
    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked((prev) => !prev)
    }

    return (
        <div>
            <ActivityCard
                title={title}
                userFullName={userFullName}
                username={username}
                date={date}
                distance={distance}
                duration={duration}
            />
            <div>
                <button
                    type="button"
                    onClick={handleLike}
                >
                    {liked ? "♥ Liked" : "♡ Like"}
                </button>
            </div>
        </div>
    )
}

export default PostCard