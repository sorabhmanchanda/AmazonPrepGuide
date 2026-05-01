import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUIStore } from '@/store/useUIStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { SECTIONS, BONUS_ROUTES } from '@/constants'
import { LEADERSHIP_PRINCIPLES } from '@/data/leadershipPrinciples'
import { QUIZ_QUESTIONS } from '@/data/quizQuestions'
import { useNotesStore } from '@/store/useNotesStore'
import { useStoriesStore } from '@/store/useStoriesStore'

type Hit = { title: string; subtitle?: string; to: string }

export function SearchModal() {
  const open = useUIStore((s) => s.searchOpen)
  const setOpen = useUIStore((s) => s.setSearchOpen)
  const [q, setQ] = useState('')
  const notes = useNotesStore((s) => s.notes)
  const stories = useStoriesStore((s) => s.stories)

  const hits = useMemo(() => {
    const query = q.trim().toLowerCase()
    const out: Hit[] = []
    if (!query) {
      SECTIONS.forEach((s) => out.push({ title: s.title, subtitle: 'Section', to: s.path }))
      return out.slice(0, 12)
    }
    SECTIONS.forEach((s) => {
      if (s.title.toLowerCase().includes(query) || s.short.toLowerCase().includes(query)) {
        out.push({ title: s.title, subtitle: 'Section', to: s.path })
      }
    })
    BONUS_ROUTES.forEach((s) => {
      if (s.title.toLowerCase().includes(query)) out.push({ title: s.title, subtitle: 'Bonus', to: s.path })
    })
    LEADERSHIP_PRINCIPLES.forEach((lp) => {
      if (lp.name.toLowerCase().includes(query) || lp.description.toLowerCase().includes(query)) {
        out.push({ title: lp.name, subtitle: 'Leadership Principle', to: '/leadership-principles' })
      }
    })
    stories.forEach((st) => {
      if (st.title.toLowerCase().includes(query) || st.company.toLowerCase().includes(query)) {
        out.push({ title: st.title, subtitle: st.company, to: '/star-stories' })
      }
    })
    QUIZ_QUESTIONS.forEach((qq) => {
      if (qq.question.toLowerCase().includes(query)) {
        out.push({ title: qq.question.slice(0, 72) + (qq.question.length > 72 ? '…' : ''), subtitle: 'Quiz', to: '/practice-quiz' })
      }
    })
    notes.forEach((n) => {
      if (n.title.toLowerCase().includes(query) || n.body.toLowerCase().includes(query)) {
        out.push({ title: n.title, subtitle: 'Note', to: '/my-notes' })
      }
    })
    return out.slice(0, 24)
  }, [q, notes, stories])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl border-amazon-muted/40">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Search sections, LPs, stories, quiz, notes…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="mb-3"
        />
        <p className="mb-2 text-xs text-ink-faint">Tip: Ctrl / ⌘ + K anytime</p>
        <ul className="max-h-72 space-y-1 overflow-y-auto pr-1">
          {hits.map((h, i) => (
            <li key={`${h.to}-${i}`}>
              <Link
                to={h.to}
                className="block rounded-lg px-2 py-2 text-sm hover:bg-card-hover"
                onClick={() => setOpen(false)}
              >
                <div className="font-medium text-ink">{h.title}</div>
                {h.subtitle && <div className="text-xs text-ink-faint">{h.subtitle}</div>}
              </Link>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
