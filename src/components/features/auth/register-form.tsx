import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

type RegisterFormProps = {
  username: string
  fullName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  errorMessage: string | null
  isSubmitting: boolean
  onUsernameChange: (value: string) => void
  onFullNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneNumberChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const RegisterForm = ({
  username,
  fullName,
  email,
  phoneNumber,
  password,
  confirmPassword,
  errorMessage,
  isSubmitting,
  onUsernameChange,
  onFullNameChange,
  onEmailChange,
  onPhoneNumberChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: RegisterFormProps) => {
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
        <div className="text-4xl font-bold leading-tight">Create account</div>
        <div className="text-muted-foreground mt-3 text-lg">
          Fill in your details to create a new account.
        </div>
      </div>

      {/* Form in the middle - flex-1 to push button to bottom */}
      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-3">
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
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <FieldContent>
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                placeholder="John Doe"
                value={fullName}
                disabled={isSubmitting}
                onChange={(e) => onFullNameChange(e.target.value)}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                disabled={isSubmitting}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
            <FieldContent>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="+1 234 567 890"
                value={phoneNumber}
                disabled={isSubmitting}
                onChange={(e) => onPhoneNumberChange(e.target.value)}
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
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                disabled={isSubmitting}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <FieldContent>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                disabled={isSubmitting}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
              />
            </FieldContent>
          </Field>

          {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="mr-2" /> : null}
            Create account
          </Button>
        </div>
      </form>

      {/* Navigation button at bottom */}
      <div className="mt-auto pt-4">
        <div className="text-muted-foreground mb-2 text-center text-sm">
          Already have an account?
        </div>
        <Link to="/login">
          <Button variant="outline" className="w-full">
            Log in
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}