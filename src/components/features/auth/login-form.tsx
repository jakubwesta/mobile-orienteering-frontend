import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

type LoginFormProps = {
  username: string
  password: string
  errorMessage: string | null
  isSubmitting: boolean
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onGoogleSignIn: () => void
}

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const LoginForm = ({
  username,
  password,
  errorMessage,
  isSubmitting,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onGoogleSignIn,
}: LoginFormProps) => {
  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col"
    >
      {/* Title section at top */}
      <div className="mb-8">
        <div className="text-4xl font-bold leading-tight">Log in</div>
        <div className="text-muted-foreground mt-3 text-lg">
          Use your username and password to continue.
        </div>
      </div>

      {/* Form in the middle - flex-1 to push button to bottom */}
      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <FieldGroup className="flex-1">
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <FieldContent>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                placeholder="your_username"
                value={username}
                disabled={isSubmitting}
                onChange={(e) => onUsernameChange(e.target.value)}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldContent>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                disabled={isSubmitting}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </FieldContent>
          </Field>

          {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="mr-2" /> : null}
            Log in
          </Button>

          {/* Or separator */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Google sign-in button */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </FieldGroup>
      </form>

      {/* Navigation button at bottom */}
      <div className="mt-auto pt-4">
        <div className="text-muted-foreground mb-2 text-center text-sm">
          Don't have an account?
        </div>
        <Link to="/register">
          <Button variant="outline" className="w-full">
            Create account
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}