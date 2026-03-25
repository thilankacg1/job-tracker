'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition text-sm font-medium"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text-secondary)',
      }}
      suppressHydrationWarning
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span suppressHydrationWarning>
        {isDark ? (
          <>
            <Sun className="w-4 h-4 text-yellow-400" />
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-indigo-400" />
          </>
        )}
      </span>
      <span className="hidden sm:inline" suppressHydrationWarning>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}