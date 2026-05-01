import { Link } from 'react-router-dom'
import { useUIStore } from '@/store/useUIStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SECTIONS } from '@/constants'
import { CheckCircle2 } from 'lucide-react'

const checklist = [
  'Skim your Profile Analysis and killer stats.',
  'Memorize the top 7 LPs and your story coverage.',
  'Run one STAR practice session with the timer (18 stories in the library).',
  'Take a 10-question quiz pass to surface weak areas.',
  'Walk the 48-hour checklist the day before.',
]

export function OnboardingModal() {
  const done = useUIStore((s) => s.onboardingDone)
  const setDone = useUIStore((s) => s.setOnboardingDone)

  return (
    <Dialog open={!done} onOpenChange={(v) => setDone(!v)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Welcome to your prep hub</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-ink-muted">
          Everything here syncs locally in your browser—your notes, quiz history, checklist, and story edits stay on
          this device.
        </p>
        <ul className="my-4 space-y-2">
          {checklist.map((c) => (
            <li key={c} className="flex gap-2 text-sm text-ink-muted">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {c}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.slice(0, 6).map((s) => (
            <Button key={s.id} variant="secondary" size="sm" asChild>
              <Link to={s.path} onClick={() => setDone(true)}>
                {s.number}. {s.short}
              </Link>
            </Button>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDone(true)}>
            Skip
          </Button>
          <Button onClick={() => setDone(true)}>Start prepping</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
