import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import AppSidebar from '@/components/features/app-sidebar'
import { ProtectedRoute } from '@/components/features/protected-route'
import { useAuth } from '@/hooks/use-auth'
import DashboardPage from '@/pages/dashboard-page'
import FeedPage from '@/pages/feed-page'
import { ThemeProvider } from '@/providers/theme.provider'
import AuthPage from '@/pages/auth-page'
import SearchPage from './pages/search-page'
import AccountPage from './pages/account-page'

const AppRoutes = () => {
  const location = useLocation()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={isAuthRoute ? 'auth' : location.pathname}>
          <Route
            path="/feed"
            element={
              <ProtectedRoute requiresAuth>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute requiresAuth>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <ProtectedRoute requiresAuth>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiresAuth>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isPublicOnly>
                <AuthPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute isPublicOnly>
                <AuthPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <ProtectedRoute requiresAuth>
                <AccountPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </LayoutGroup>
  )
}

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen overflow-hidden">
          {isAuthenticated ? <AppSidebar /> : null}

          <div className="min-w-0 flex-1 overflow-y-auto">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App