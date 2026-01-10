import { useState } from "react"
import type { UserResult } from "@/types/user-results"
import UserCard from "@/components/search/user-card"

/*
API TO DO:
fetchUsersBySearchQuery
*/


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
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserResult[]>([])


    const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setUsers([])
            return
        }
        setLoading(true);
        try {
            //const fetchedUsers = await fetchUsersBySearchQuery(searchQuery);
            setUsers(allUsers);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Error while loading search results");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>


    return (
        <div>
            <div>
                <form onSubmit={onSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Type there..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        Find
                    </button>
                </form>
            </div>
            <div>
                {(users.length === 0) ? (
                    <p>Search by fullname or username</p>
                ) : (users.map((user) => (
                    <UserCard key={user.id} user={user} />
                )))
                }
            </div>
        </div>
    )
}