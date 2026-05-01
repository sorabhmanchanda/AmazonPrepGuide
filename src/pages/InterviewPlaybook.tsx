import { useEffect, useMemo, useState } from 'react'
import { SectionChrome } from '@/components/common/SectionChrome'
import { MarkdownBody } from '@/components/guide/MarkdownBody'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePrepGuide } from '@/hooks/usePrepGuide'
import { extractGuideSection, stripLeadingH1 } from '@/utils/markdown'
import { useProgressStore } from '@/store/useProgressStore'
import { QUESTIONS_TO_ASK } from '@/data/interviewQuestions'
import type { InterviewerType } from '@/types'

export function InterviewPlaybookPage() {
  const { markdown, loading, error } = usePrepGuide()
  const markVisited = useProgressStore((s) => s.markSectionVisited)
  const logActivity = useProgressStore((s) => s.logActivity)
  const [fav, setFav] = useState<string[]>([])

  useEffect(() => {
    markVisited('playbook')
    logActivity({ label: 'Opened Interview Playbook', href: '/interview-playbook' })
  }, [markVisited, logActivity])

  const md = useMemo(() => {
    if (!markdown) return ''
    return stripLeadingH1(extractGuideSection(markdown, 12))
  }, [markdown])

  const toggleFav = (id: string) => {
    setFav((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* ignore */
    }
  }

  if (loading) return <div className="text-ink-muted">Loading…</div>
  if (error) return <div className="text-danger">{error}</div>

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SectionChrome sectionId="playbook" sectionNumber={12} />
      <Tabs defaultValue="guide">
        <TabsList>
          <TabsTrigger value="guide">Playbook (guide)</TabsTrigger>
          <TabsTrigger value="ask">Questions to ask</TabsTrigger>
        </TabsList>
        <TabsContent value="guide">
          <MarkdownBody content={md} />
        </TabsContent>
        <TabsContent value="ask" className="space-y-3">
          {(['hm', 'bar-raiser', 'peer', 'technical', 'sr-leader'] as InterviewerType[]).map((t) => (
            <Card key={t}>
              <CardHeader>
                <CardTitle className="text-base capitalize">{t.replace('-', ' ')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {QUESTIONS_TO_ASK.filter((q) => q.type === t).map((q) => (
                  <div key={q.id} className="flex flex-col gap-2 rounded-lg border border-amazon-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-ink-muted">{q.text}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copy(q.text)}>
                        Copy
                      </Button>
                      <Button size="sm" variant={fav.includes(q.id) ? 'default' : 'secondary'} onClick={() => toggleFav(q.id)}>
                        {fav.includes(q.id) ? 'Favorited' : 'Favorite'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
