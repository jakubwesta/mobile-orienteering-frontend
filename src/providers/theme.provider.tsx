import { useThemeStore } from '@/stores/theme.store'
import { useEffect } from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, applyTheme } = useThemeStore()

  // Initialize theme on app startup
  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  return <>{children}</>
}
