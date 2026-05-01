import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { SearchModal } from '@/components/features/search/SearchModal'
import { ShortcutsModal } from '@/components/features/search/ShortcutsModal'
import { OnboardingModal } from '@/components/features/onboarding/OnboardingModal'
import { QuickActionsFab } from '@/components/features/quick-actions/QuickActionsFab'
import { useProgressStore } from '@/store/useProgressStore'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { SECTIONS } from '@/constants'

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  ...Object.fromEntries(SECTIONS.map((s) => [s.path, s.title])),
  '/mock-interview': 'Mock Interview',
  '/my-notes': 'My Notes',
}

export function Layout() {
  const loc = useLocation()
  const touchStudyDay = useProgressStore((s) => s.touchStudyDay)
  useKeyboardShortcuts()

  useEffect(() => {
    touchStudyDay()
  }, [touchStudyDay, loc.pathname])

  const title = TITLES[loc.pathname] ?? 'AMXL L6 Prep'
  const sec = SECTIONS.find((s) => s.path === loc.pathname)

  return (
    <div className="flex h-full min-h-0">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col">
        <Header title={title} sectionId={sec?.id} />
        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      <SearchModal />
      <ShortcutsModal />
      <OnboardingModal />
      <QuickActionsFab />
    </div>
  )
}
