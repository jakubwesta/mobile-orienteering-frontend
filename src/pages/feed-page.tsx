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

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
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
  )
}

export default FeedPage