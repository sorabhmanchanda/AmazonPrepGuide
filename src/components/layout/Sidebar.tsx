import { NavLink } from 'react-router-dom'
import { SECTIONS, BONUS_ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import { BookOpen, Sparkles } from 'lucide-react'

const linkClass =
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-card-hover hover:text-ink'

export function Sidebar() {
  return (
    <aside className="no-print flex w-64 shrink-0 flex-col border-r border-amazon-muted/25 bg-amazon/80">
      <div className="flex items-center gap-2 border-b border-amazon-muted/25 px-4 py-4">
        <Sparkles className="h-6 w-6 text-brand" />
        <div>
          <div className="font-serif text-lg font-semibold text-ink">AMXL L6 Prep</div>
          <div className="text-xs text-ink-faint">Sorabh · study hub</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) => cn(linkClass, isActive && 'bg-card text-brand')}
        >
          <BookOpen className="h-4 w-4" />
          Dashboard
        </NavLink>
        <div className="pt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Sections</div>
        {SECTIONS.map((s) => (
          <NavLink
            key={s.id}
            to={s.path}
            className={({ isActive }) => cn(linkClass, isActive && 'bg-card text-brand')}
          >
            <span className="w-5 shrink-0 text-right font-mono text-xs text-ink-faint">{s.number}</span>
            {s.short}
          </NavLink>
        ))}
        <div className="pt-3 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Bonus</div>
        {BONUS_ROUTES.map((s) => (
          <NavLink
            key={s.id}
            to={s.path}
            className={({ isActive }) => cn(linkClass, isActive && 'bg-card text-brand')}
          >
            {s.short}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
