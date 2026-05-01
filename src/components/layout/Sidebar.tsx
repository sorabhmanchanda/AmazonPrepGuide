import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SECTIONS, BONUS_ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import { BookOpen, Sparkles } from 'lucide-react'
import { useIsMdUp } from '@/hooks/useMediaQuery'
import { useUIStore } from '@/store/useUIStore'

const linkClass =
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-card-hover hover:text-ink'

export function Sidebar() {
  const mdUp = useIsMdUp()
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)
  const loc = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [mdUp, loc.pathname, setSidebarOpen])

  const showDrawer = !mdUp && sidebarOpen

  return (
    <>
      {showDrawer && (
        <button
          type="button"
          className="no-print fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] md:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          'no-print flex flex-col border-r border-amazon-muted/25 bg-amazon/95 backdrop-blur-md',
          /* Mobile: off-canvas drawer */
          'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[min(20rem,calc(100vw-2.5rem))] max-md:max-w-[88vw] max-md:transition-transform max-md:duration-200 max-md:ease-out max-md:shadow-2xl',
          !mdUp && !sidebarOpen && 'max-md:pointer-events-none max-md:-translate-x-full',
          !mdUp && sidebarOpen && 'max-md:translate-x-0',
          /* Desktop: in-flow column */
          'md:relative md:z-0 md:h-full md:w-64 md:max-w-none md:shrink-0 md:translate-x-0 md:shadow-none md:pointer-events-auto',
        )}
      >
        <div className="flex items-center gap-2 border-b border-amazon-muted/25 px-4 py-4">
          <Sparkles className="h-6 w-6 shrink-0 text-brand" />
          <div className="min-w-0">
            <div className="font-serif text-lg font-semibold text-ink">AMXL L6 Prep</div>
            <div className="truncate text-xs text-ink-faint">Sorabh · study hub</div>
          </div>
        </div>
        <nav
          id="app-sidebar-nav"
          className="flex min-h-0 flex-1 flex-col space-y-1 overflow-y-auto overscroll-contain p-3"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) => cn(linkClass, isActive && 'bg-card text-brand')}
            onClick={() => !mdUp && setSidebarOpen(false)}
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            Dashboard
          </NavLink>
          <div className="pt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Sections</div>
          {SECTIONS.map((s) => (
            <NavLink
              key={s.id}
              to={s.path}
              className={({ isActive }) => cn(linkClass, isActive && 'bg-card text-brand')}
              onClick={() => !mdUp && setSidebarOpen(false)}
            >
              <span className="w-5 shrink-0 text-right font-mono text-xs text-ink-faint">{s.number}</span>
              <span className="min-w-0 truncate">{s.short}</span>
            </NavLink>
          ))}
          <div className="pt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Bonus</div>
          {BONUS_ROUTES.map((s) => (
            <NavLink
              key={s.id}
              to={s.path}
              className={({ isActive }) => cn(linkClass, isActive && 'bg-card text-brand')}
              onClick={() => !mdUp && setSidebarOpen(false)}
            >
              <span className="min-w-0 truncate">{s.short}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
