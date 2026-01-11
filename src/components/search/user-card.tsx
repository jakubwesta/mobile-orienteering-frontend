import type { UserSearchResult } from "@/services/user.service";
import { useNavigate } from "react-router-dom";

type UserCardProps = {
    user: UserSearchResult;
};

function UserCard({ user }: UserCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
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