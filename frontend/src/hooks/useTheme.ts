import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'buzz9ja-theme'
const THEME_COLOR: Record<Theme, string> = {
  light: '#F5F1E8',
  dark: '#0A2517',
}

function readStored(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function syncThemeColor(theme: Theme) {
  const tag = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  tag?.setAttribute('content', THEME_COLOR[theme])
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = readStored()
    const initial: Theme = stored ?? (systemPrefersDark() ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    syncThemeColor(initial)
  }, [])

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme')
    const effectiveDark = current ? current === 'dark' : systemPrefersDark()
    const next: Theme = effectiveDark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    setTheme(next)
    syncThemeColor(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }, [])

  return { theme, toggleTheme }
}
