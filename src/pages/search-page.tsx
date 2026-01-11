import { useState } from "react"

import UserCard from "@/components/search/user-card"
import { userService, type UserSearchResult } from "@/services/user.service";


export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserSearchResult[]>([])


    const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setUsers([])
            return
        }
        setLoading(true);
        try {
            const fetchedUserResults = await userService.searchUsers(searchQuery)
            setUsers(fetchedUserResults);
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