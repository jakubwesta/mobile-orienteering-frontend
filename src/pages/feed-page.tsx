import PostCard from "@/components/feed/post-card"
import { postService, type Post } from "@/services/post.service"

import { useEffect, useState } from "react"


const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const posts = await postService.fetchFeed()
      setPosts(posts)
      setError(null)
    } catch (err) {
      console.log(err);
      setError("Error while loading feed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (loading) return <p className="text-left ml-8 text-gray-600 dark:text-gray-400 py-8">Loading...</p>
  if (error) return <p className="text-left ml-8 text-red-600 dark:text-red-400 py-8">{error}</p>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl pt-6 pb-6 pl-12 space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            userFullName={post.userFullName}
            username={post.username}
            date={post.createdAt}
            distance={post.distance}
            duration={post.duration}
          />
        ))}
      </div>
    </div>
  )
}
export default FeedPage