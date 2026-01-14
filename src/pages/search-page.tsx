import { useState } from "react"

import UserCard from "@/components/search/user-card"
import { userService, type UserSearchResult } from "@/services/user.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


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

    if (loading) return <p className="text-left ml-8 text-gray-600 dark:text-gray-400 py-8">Loading...</p>
    if (error) return <p className="text-left ml-8 text-red-600 dark:text-red-400 py-8">{error}</p>

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="max-w-4xl pt-6 pb-6 pl-12">
                <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 mb-6">
                    <form onSubmit={onSearchSubmit}>
                        <div className="flex w-full max-w-sm items-centers gap-2">
                            <Input
                                type="text"

                                placeholder="Type there..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit">
                                Search
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="space-y-4">
                    {(users.length !== 0) &&
                        (users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        )))
                    }
                </div>
            </div>
        </div>
    )
}