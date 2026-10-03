import { Moon, Sun } from 'lucide-react'
import { useLocale } from '@/hooks/useLocale'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLocale()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = t.common.switchTheme(next)
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === 'dark' ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  )
}
