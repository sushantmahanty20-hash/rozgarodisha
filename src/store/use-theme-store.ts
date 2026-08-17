import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Theme } from '@/types'

interface ThemeState {
  theme: Theme
  mode: 'light' | 'dark'
  primaryColor: string
  accentColor: string
  setTheme: (theme: Theme) => void
  setMode: (mode: 'light' | 'dark') => void
  setPrimaryColor: (color: string) => void
  setAccentColor: (color: string) => void
}

function getSystemMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveMode(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') return getSystemMode()
  return theme
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system' as Theme,
      mode: getSystemMode(),
      primaryColor: '#3b82f6',
      accentColor: '#8b5cf6',

      setTheme: (theme) =>
        set({ theme, mode: resolveMode(theme) }),

      setMode: (mode) =>
        set({ mode }),

      setPrimaryColor: (color) =>
        set({ primaryColor: color }),

      setAccentColor: (color) =>
        set({ accentColor: color }),
    }),
    {
      name: 'jobportal-theme',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        primaryColor: state.primaryColor,
        accentColor: state.accentColor,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setMode(resolveMode(state.theme))
        }
      },
    }
  )
)
