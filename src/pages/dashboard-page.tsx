import { useEffect, useState } from "react"
import { useUser } from "@/hooks/use-user"
import { postService, type Post } from "@/services/post.service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import PostCard from "@/components/feed/post-card"
import { useNavigate } from "react-router-dom"

type DashboardStats = {
  totalPosts: number
  totalDistance: number
  totalDuration: number
  averageDistance: number
  thisWeekPosts: number
  thisMonthPosts: number
}

const DashboardPage = () => {
  const navigate = useNavigate()
  const { currentUser, fetchCurrentUser, isLoading: userLoading } = useUser()
  const [posts, setPosts] = useState<Post[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const calculateStats = (posts: Post[]): DashboardStats => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const totalDistance = posts.reduce((sum, post) => sum + parseFloat(post.distance), 0)
    const totalDuration = posts.reduce((sum, post) => {
      const match = post.duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
      if (!match) return sum
      const hours = parseInt(match[1] || "0", 10)
      const minutes = parseInt(match[2] || "0", 10)
      const seconds = parseInt(match[3] || "0", 10)
      return sum + hours * 3600 + minutes * 60 + seconds
    }, 0)

    const thisWeekPosts = posts.filter(
      (post) => new Date(post.createdAt) >= oneWeekAgo
    ).length

    const thisMonthPosts = posts.filter(
      (post) => new Date(post.createdAt) >= oneMonthAgo
    ).length

    return {
      totalPosts: posts.length,
      totalDistance: Math.round(totalDistance * 10) / 10,
      totalDuration,
      averageDistance: posts.length > 0 ? Math.round((totalDistance / posts.length) * 10) / 10 : 0,
      thisWeekPosts,
      thisMonthPosts,
    }
  }

  const formatTotalDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    const parts: string[] = []
    if (hours > 0) parts.push(`${hours}h`)
    if (minutes > 0) parts.push(`${minutes}min`)
    
    return parts.join(' ') || '0min'
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        if (!currentUser) {
          await fetchCurrentUser()
        }

        const myPosts = await postService.getMyPosts()
        setPosts(myPosts)
        
        const calculatedStats = calculateStats(myPosts)
        setStats(calculatedStats)
        
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Error loading dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleViewProfile = () => {
    navigate(`/account`)
  }

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto pt-6 pb-6 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto pt-6 pb-6 px-4 sm:px-6 lg:px-8">
          <p className="text-red-600 dark:text-red-400 py-8">{error}</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto pt-6 pb-6 px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 dark:text-gray-400 py-8">Please log in to view your dashboard</p>
        </div>
      </div>
    )
  }

  const recentPosts = posts.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-4 pb-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to your dashboard, {currentUser.fullName}!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Here's your orienteering activity overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {/* Total Posts */}
          <Card className="bg-linear-to-br from-blue-500 to-blue-600 border-0 text-white">
            <CardHeader className="pb-2 sm:pb-6">
              <CardDescription className="text-blue-100 text-xs sm:text-sm">Total Activities</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold">{stats?.totalPosts || 0}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-blue-100">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs sm:text-sm">All time</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Distance */}
          <Card className="bg-linear-to-br from-green-500 to-green-600 border-0 text-white">
            <CardHeader className="pb-2 sm:pb-6">
              <CardDescription className="text-green-100 text-xs sm:text-sm">Total Distance</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold">{stats?.totalDistance || 0}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-green-100">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs sm:text-sm">kilometers</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Duration */}
          <Card className="bg-linear-to-br from-purple-500 to-purple-600 border-0 text-white">
            <CardHeader className="pb-2 sm:pb-6">
              <CardDescription className="text-purple-100 text-xs sm:text-sm">Total Time</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold">{formatTotalDuration(stats?.totalDuration || 0)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-purple-100">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs sm:text-sm">in motion</span>
              </div>
            </CardContent>
          </Card>

          {/* Average Distance */}
          <Card className="bg-linear-to-br from-orange-500 to-orange-600 border-0 text-white">
            <CardHeader className="pb-2 sm:pb-6">
              <CardDescription className="text-orange-100 text-xs sm:text-sm">Avg Distance</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold">{stats?.averageDistance || 0}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-orange-100">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs sm:text-sm">per activity</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* This Week */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">This Week</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Last 7 days activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
                    {stats?.thisWeekPosts || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">activities</p>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* This Month */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">This Month</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Last 30 days activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400">
                    {stats?.thisMonthPosts || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">activities</p>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Action */}
          <Card className="sm:col-span-2 lg:col-span-1 bg-linear-to-br from-pink-500 to-rose-500 border-0 text-white cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all duration-300" onClick={handleViewProfile}>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Your Profile</CardTitle>
              <CardDescription className="text-pink-100 text-xs sm:text-sm">View and edit your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base sm:text-lg font-medium">@{currentUser.username}</p>
                  <p className="text-xs sm:text-sm text-pink-100 mt-1">Tap to view</p>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        {recentPosts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Recent Activities
              </h2>
              <button
                onClick={handleViewProfile}
                className="text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recentPosts.map((post) => (
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
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <Card className="text-center py-8 sm:py-12">
            <CardContent>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No activities yet
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Start your orienteering journey by creating your first activity!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DashboardPage