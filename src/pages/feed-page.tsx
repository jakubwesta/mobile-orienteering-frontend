import PostCard from "@/components/feed/post-card"
import type { Post } from "@/types/post"
import { useEffect, useState } from "react"

/*
API TO DO:
fetchFeed()
*/

const postsDemo: Post[] = [
  {
    id: 1,
    title: "Morning run",
    userFullName: "Anna Kowalska",
    username: "annaK",
    date: "10.01.2025",
    distance: "5.2km",
    duration: "28min"
  },
  {
    id: 2,
    title: "Easy run",
    userFullName: "Jan Nowak",
    username: "janN",
    date: "09.01.2025",
    distance: "3.5km",
    duration: "20min"
  },
  {
    id: 3,
    title: "Speed training",
    userFullName: "Piotr Wiśniewski",
    username: "piotrW",
    date: "09.01.2025",
    distance: "8km",
    duration: "35min"
  },
  {
    id: 4,
    title: "Long run",
    userFullName: "Karolina Zielińska",
    username: "karolinaZ",
    date: "08.01.2025",
    distance: "12km",
    duration: "1h 10min"
  },
  {
    id: 5,
    title: "Recovery jog",
    userFullName: "Michał Lewandowski",
    username: "michalL",
    date: "08.01.2025",
    distance: "4km",
    duration: "25min"
  },
  {
    id: 6,
    title: "Hill workout",
    userFullName: "Ewa Dąbrowska",
    username: "ewaD",
    date: "07.01.2025",
    distance: "6.5km",
    duration: "40min"
  },
  {
    id: 7,
    title: "Evening run",
    userFullName: "Tomasz Kamiński",
    username: "tomaszK",
    date: "07.01.2025",
    distance: "7km",
    duration: "32min"
  },
  {
    id: 8,
    title: "Track session",
    userFullName: "Magdalena Kowal",
    username: "magdalenaK",
    date: "06.01.2025",
    distance: "10km",
    duration: "48min"
  },
  {
    id: 9,
    title: "Tempo run",
    userFullName: "Krzysztof Szymański",
    username: "krzysztofS",
    date: "06.01.2025",
    distance: "9km",
    duration: "42min"
  },
  {
    id: 10,
    title: "Easy pace",
    userFullName: "Agnieszka Woźniak",
    username: "agnieszkaW",
    date: "05.01.2025",
    distance: "5km",
    duration: "30min"
  }
]

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      //const posts = await fetchFeed()
      setPosts(postsDemo)
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
          date={post.date}
          distance={post.distance}
          duration={post.duration}
        />
      ))}
    </div>
  )
}

export default FeedPage