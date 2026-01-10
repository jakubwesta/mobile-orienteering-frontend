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
        </div>
    )
}

export default PostCard