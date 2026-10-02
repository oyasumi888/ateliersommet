import type { ReactNode } from 'react'
import { ThemeContext, useThemeState } from '@/hooks/useTheme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useThemeState()
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
