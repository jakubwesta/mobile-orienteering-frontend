import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

interface ProtectedRouteProps {
	children: ReactNode
	requiresAuth?: boolean
	isPublicOnly?: boolean
}

export const ProtectedRoute = ({
	children,
	requiresAuth = false,
	isPublicOnly = false,
}: ProtectedRouteProps) => {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	if (requiresAuth && !isAuthenticated) {
		return <Navigate to='/login' replace state={{ from: location }} />
	}

	if (isPublicOnly && isAuthenticated) {
		return <Navigate to='/feed' replace />
	}

	return <>{children}</>
}

export default ProtectedRoute