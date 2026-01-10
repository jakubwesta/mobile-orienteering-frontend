import type { UserResult } from "@/types/user-results"
import { useNavigate } from "react-router-dom";

type UserCardProps = {
    user: UserResult;
};

function UserCard({ user }: UserCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        alert("info clik")
        navigate(`/user/${user.id}`)
    }
    return (
        <div onClick={handleClick}>
            <p>{user.fullName}</p>
            <p>@{user.username}</p>
        </div>
    )
}

export default UserCard