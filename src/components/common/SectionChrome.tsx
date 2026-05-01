import { CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProgressStore } from '@/store/useProgressStore'
import type { SectionId } from '@/constants'

export function SectionChrome({ sectionId, sectionNumber }: { sectionId: SectionId; sectionNumber: number }) {
  const completed = useProgressStore((s) => s.completedSections.includes(sectionId))
  const markComplete = useProgressStore((s) => s.markSectionComplete)
  const logActivity = useProgressStore((s) => s.logActivity)

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amazon-muted/30 bg-card/60 p-4">
      <p className="text-sm text-ink-muted">
        Section {sectionNumber} · Mark complete when you can teach this block cold.
      </p>
      <Button
        variant={completed ? 'secondary' : 'default'}
        size="sm"
        onClick={() => {
          markComplete(sectionId)
          logActivity({
            label: `Completed section ${sectionNumber}`,
            href: window.location.pathname,
          })
        }}
      >
        {completed ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-success" /> Completed
          </>
        ) : (
          <>
            <Circle className="h-4 w-4" /> Mark section complete
          </>
        )}
      </Button>
    </div>
  )
}
