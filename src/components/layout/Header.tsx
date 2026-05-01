import { Moon, Search, Sun, Keyboard, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress'
import { useProgressStore } from '@/store/useProgressStore'
import { useUIStore } from '@/store/useUIStore'
import { SECTIONS } from '@/constants'
import { useIsMdUp } from '@/hooks/useMediaQuery'

export function Header({ title, sectionId }: { title: string; sectionId?: string }) {
  const mdUp = useIsMdUp()
  const ratio = useProgressStore((s) => s.sectionCompletionRatio())
  const toggleTheme = useUIStore((s) => s.toggleTheme)
  const theme = useUIStore((s) => s.theme)
  const setSearchOpen = useUIStore((s) => s.setSearchOpen)
  const setShortcutsOpen = useUIStore((s) => s.setShortcutsOpen)
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const pct = Math.round(ratio * 100)

  return (
    <header className="no-print relative z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-amazon-muted/25 bg-surface/90 px-3 backdrop-blur sm:gap-4 sm:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {!mdUp && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar-nav"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            onClick={() => toggleSidebar()}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-serif text-base font-semibold text-ink sm:text-lg md:text-xl">{title}</h1>
          {sectionId && (
            <p className="truncate text-xs text-ink-faint">
              Section {SECTIONS.find((s) => s.id === sectionId)?.number ?? ''} · Mark done when you own the material
            </p>
          )}
        </div>
      </div>
      <div className="hidden w-48 md:block">
        <div className="mb-1 flex justify-between text-[10px] text-ink-faint">
          <span>Sections complete</span>
          <span>{pct}%</span>
        </div>
        <ProgressBar value={pct} />
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Keyboard shortcuts" onClick={() => setShortcutsOpen(true)}>
          <Keyboard className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => toggleTheme()}>
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  )
}
