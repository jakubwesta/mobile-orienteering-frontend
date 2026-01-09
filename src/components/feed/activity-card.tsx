import MapCard from "./map-card"

type ActivityCardProps = {
    title: string
    userFullName: string
    username: string
    date: string
    distance: string
    duration: string
}

function ActivityCard({ title, userFullName, username, date, distance, duration }: ActivityCardProps) {
    return (
        <div>
            <MapCard />
            <p>{title}</p>
            <p>{userFullName}</p>
            <p>@{username}</p>
            <p>{date}</p>
            <p>Distance</p>
            <p>{distance}</p>
            <p>Duration</p>
            <p>{duration}</p>
        </div >
    )
}

export default ActivityCard