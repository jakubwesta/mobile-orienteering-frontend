import { useState } from "react"
import type { UserResult } from "@/types/user-results"
import UserCard from "@/components/search/user-card"

const allUsers: UserResult[] = [
    { id: 1, fullName: "Anna Kowalska", username: "annaK" },
    { id: 2, fullName: "Jan Nowak", username: "janN" },
    { id: 3, fullName: "Piotr Wiśniewski", username: "piotrW" },
    { id: 4, fullName: "Karolina Zielińska", username: "karolinaZ" },
    { id: 5, fullName: "Michał Lewandowski", username: "michalL" },
    { id: 6, fullName: "Ewa Dąbrowska", username: "ewaD" },
    { id: 7, fullName: "Tomasz Kamiński", username: "tomaszK" },
    { id: 8, fullName: "Magdalena Kowal", username: "magdalenaK" },
]

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by nickname or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div>
                {searchQuery === "" ? (
                    <p>
                        Start typing to search for users
                    </p>
                ) : filteredUsers.length === 0 ? (
                    <p>
                        No users found
                    </p>
                ) : (
                    filteredUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))
                )}
            </div>
        </div>
    )
}