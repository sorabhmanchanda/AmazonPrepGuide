import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Plus, StickyNote, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function QuickActionsFab() {
  const [open, setOpen] = useState(false)

  return (
    <div className="no-print fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col gap-2 rounded-xl border border-amazon-muted/40 bg-card p-2 shadow-xl">
          <Button variant="secondary" size="sm" asChild>
            <Link to="/practice-quiz" onClick={() => setOpen(false)}>
              <BookOpen className="h-4 w-4" /> Quiz
            </Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/star-stories" onClick={() => setOpen(false)}>
              Practice story
            </Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/my-notes" onClick={() => setOpen(false)}>
              <StickyNote className="h-4 w-4" /> New note
            </Link>
          </Button>
        </div>
      )}
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        aria-expanded={open}
        aria-label="Quick actions"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </Button>
    </div>
  )
}
