import { useEffect, useMemo, type ReactNode } from 'react'
import { MarkdownBody } from '@/components/guide/MarkdownBody'
import { SectionChrome } from '@/components/common/SectionChrome'
import { usePrepGuide } from '@/hooks/usePrepGuide'
import { extractGuideSection, stripLeadingH1 } from '@/utils/markdown'
import { useProgressStore } from '@/store/useProgressStore'
import type { SectionId } from '@/constants'

export function MarkdownSectionPage({
  sectionNumber,
  sectionId,
  hideChrome,
  prepend,
}: {
  sectionNumber: number
  sectionId: SectionId
  hideChrome?: boolean
  prepend?: ReactNode
}) {
  const { markdown, loading, error } = usePrepGuide()
  const markVisited = useProgressStore((s) => s.markSectionVisited)
  const logActivity = useProgressStore((s) => s.logActivity)

  useEffect(() => {
    markVisited(sectionId)
    logActivity({
      label: `Opened section ${sectionNumber}`,
      href: window.location.pathname,
    })
  }, [markVisited, logActivity, sectionId, sectionNumber])

  const content = useMemo(() => {
    if (!markdown) return ''
    return stripLeadingH1(extractGuideSection(markdown, sectionNumber))
  }, [markdown, sectionNumber])

  if (loading) {
    return <div className="text-ink-muted">Loading your prep guide…</div>
  }
  if (error) {
    return <div className="text-danger">Could not load prep-guide.md: {error}</div>
  }

  return (
    <div className="mx-auto max-w-4xl">
      {prepend}
      {!hideChrome && <SectionChrome sectionId={sectionId} sectionNumber={sectionNumber} />}
      <MarkdownBody content={content} />
    </div>
  )
}
