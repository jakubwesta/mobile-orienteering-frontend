import { useMemo, useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

import { LoginForm } from '@/components/features/auth/login-form'
import { RegisterForm } from '@/components/features/auth/register-form'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-user'

import authBackground from '@/assets/auth_background.jpg'

type LocationState = {
  from?: {
    pathname?: string
  }
}

const AuthPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoginMode = location.pathname === '/login'

  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    error: authError,
    login,
    register,
    clearError: clearAuthError,
  } = useAuth()

  const {
    isLoading: isUserLoading,
    error: userError,
    fetchCurrentUser,
    clearError: clearUserError,
  } = useUser()

  // Login fields
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Register fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [localError, setLocalError] = useState<string | null>(null)

  const isSubmitting = isAuthLoading || isUserLoading
  const fromPathname = (location.state as LocationState | null)?.from?.pathname ?? '/feed'

  const errorMessage = useMemo(() => {
    return localError ?? authError?.message ?? userError?.message ?? null
  }, [localError, authError?.message, userError?.message])

  // Clear errors when switching modes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalError(null)
      clearAuthError()
      clearUserError()
    }, 0)
    return () => clearTimeout(timer)
  }, [isLoginMode, clearAuthError, clearUserError])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    clearAuthError()
    clearUserError()

    if (!username.trim() || !password) {
      setLocalError('Please enter your username and password.')
      return
    }

    try {
      await login({ username: username.trim(), password })
      await fetchCurrentUser()
      navigate(fromPathname, { replace: true })
    } catch {
      // errors handled via errorMessage
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    clearAuthError()
    clearUserError()

    if (!username.trim() || !fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      setLocalError('Please fill out all fields.')
      return
    }

    if (!password) {
      setLocalError('Please enter a password.')
      return
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.')
      return
    }

    try {
      await register({
        username: username.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        password,
        private: false,
      })
      await fetchCurrentUser()
      navigate(fromPathname, { replace: true })
    } catch {
      // errors handled via errorMessage
    }
  }

  const handleGoogleSignIn = () => {
    // Placeholder
  }

  if (isAuthenticated) {
    return <Navigate to="/feed" replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl">
        <motion.div
          layout
          className="relative grid h-[min(95vh,52rem)] grid-cols-1 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm md:grid-cols-2"
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background image - stays in place */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{ 
              zIndex: 0,
              backgroundImage: `url(${authBackground})`
            }} 
          />

          {/* Spacer - switches sides based on mode */}
          {isLoginMode && <div className="relative z-10 hidden md:block" />}

          {/* Form panel */}
          <motion.div
            layout
            className="relative z-20 flex h-full flex-col bg-card p-6"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <AnimatePresence mode="wait">
              {isLoginMode ? (
                <LoginForm
                  key="login-form"
                  username={username}
                  password={password}
                  errorMessage={errorMessage}
                  isSubmitting={isSubmitting}
                  onUsernameChange={setUsername}
                  onPasswordChange={setPassword}
                  onSubmit={handleLoginSubmit}
                  onGoogleSignIn={handleGoogleSignIn}
                />
              ) : (
                <RegisterForm
                  key="register-form"
                  username={username}
                  fullName={fullName}
                  email={email}
                  phoneNumber={phoneNumber}
                  password={password}
                  confirmPassword={confirmPassword}
                  errorMessage={errorMessage}
                  isSubmitting={isSubmitting}
                  onUsernameChange={setUsername}
                  onFullNameChange={setFullName}
                  onEmailChange={setEmail}
                  onPhoneNumberChange={setPhoneNumber}
                  onPasswordChange={setPassword}
                  onConfirmPasswordChange={setConfirmPassword}
                  onSubmit={handleRegisterSubmit}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Spacer for register (form on left, spacer on right) */}
          {!isLoginMode && <div className="relative z-10 hidden md:block" />}
        </motion.div>
      </div>
    </div>
  )
}

export default AuthPage