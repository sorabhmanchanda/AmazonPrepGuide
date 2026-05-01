import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  theme: 'dark' | 'light'
  onboardingDone: boolean
  searchOpen: boolean
  shortcutsOpen: boolean
  setTheme: (t: 'dark' | 'light') => void
  toggleTheme: () => void
  setOnboardingDone: (v: boolean) => void
  setSearchOpen: (v: boolean) => void
  setShortcutsOpen: (v: boolean) => void
}

export function applyThemeClass(theme: 'dark' | 'light') {
  const root = document.documentElement
  root.classList.toggle('light', theme === 'light')
  root.classList.toggle('dark', theme === 'dark')
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      onboardingDone: false,
      searchOpen: false,
      shortcutsOpen: false,

      setTheme: (t) => {
        applyThemeClass(t)
        set({ theme: t })
      },

      toggleTheme: () =>
        set((s) => {
          const t = s.theme === 'dark' ? 'light' : 'dark'
          applyThemeClass(t)
          return { theme: t }
        }),

      setOnboardingDone: (v) => set({ onboardingDone: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
      setShortcutsOpen: (v) => set({ shortcutsOpen: v }),
    }),
    {
      name: 'amazon-l6-ui',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyThemeClass(state.theme)
      },
    },
  ),
)
