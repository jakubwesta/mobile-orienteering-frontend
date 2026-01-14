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
        <div onClick={handleClick} className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {user.fullName.charAt(0)}
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.fullName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard