import type { UserResult } from "@/types/user-results"

function UserCard({ user }: { user: UserResult }) {
    return (
        <div>
            <p>{user.fullName}</p>
            <p>@{user.username}</p>
        </div>
    )
}

export default UserCard