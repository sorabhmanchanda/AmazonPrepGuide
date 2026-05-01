import { useEffect, useMemo } from 'react'
import { SectionChrome } from '@/components/common/SectionChrome'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ProgressBar, ProgressLabel } from '@/components/ui/progress'
import { CHECKLIST_BY_CATEGORY, checklistLabel } from '@/data/checklistItems'
import { MarkdownBody } from '@/components/guide/MarkdownBody'
import { usePrepGuide } from '@/hooks/usePrepGuide'
import { extractGuideSection } from '@/utils/markdown'
import { useChecklistStore } from '@/store/useChecklistStore'
import { useProgressStore } from '@/store/useProgressStore'
export function FinalChecklistPage() {
  const { markdown, loading, error } = usePrepGuide()
  const checked = useChecklistStore((s) => s.checkedItems)
  const toggle = useChecklistStore((s) => s.toggleItem)
  const getProgress = useChecklistStore((s) => s.getProgress)
  const markVisited = useProgressStore((s) => s.markSectionVisited)
  const logActivity = useProgressStore((s) => s.logActivity)

  const redFlags = useMemo(() => {
    if (!markdown) return ''
    const block = extractGuideSection(markdown, 14)
    const i = block.indexOf('## Red Flags')
    if (i === -1) return ''
    return block.slice(i)
  }, [markdown])

  useEffect(() => {
    markVisited('checklist')
    logActivity({ label: 'Opened Final Checklist', href: '/final-checklist' })
  }, [markVisited, logActivity])

  if (loading) return <div className="text-ink-muted">Loading…</div>
  if (error) return <div className="text-danger">{error}</div>

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SectionChrome sectionId="checklist" sectionNumber={14} />

      {CHECKLIST_BY_CATEGORY.map((cat) => {
        const pct = Math.round(getProgress(cat.id) * 100)
        return (
          <Card key={cat.id}>
            <CardHeader>
              <CardTitle className="text-base">{cat.title}</CardTitle>
              <ProgressLabel>
                <span />
                <span>{pct}%</span>
              </ProgressLabel>
              <ProgressBar value={pct} />
            </CardHeader>
            <CardContent className="space-y-2">
              {cat.itemIds.map((id) => (
                <label key={id} className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-card-hover">
                  <Checkbox checked={checked.includes(id)} onCheckedChange={() => toggle(id)} />
                  <span className="text-sm text-ink-muted">{checklistLabel(id)}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        )
      })}

      {redFlags && (
        <Card className="border-danger/30">
          <CardHeader>
            <CardTitle className="text-danger">Red flags (from guide)</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownBody content={redFlags} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
