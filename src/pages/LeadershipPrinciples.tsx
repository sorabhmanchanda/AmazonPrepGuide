import { useEffect, useMemo, useState } from 'react'
import { MarkdownBody } from '@/components/guide/MarkdownBody'
import { SectionChrome } from '@/components/common/SectionChrome'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LEADERSHIP_PRINCIPLES } from '@/data/leadershipPrinciples'
import { usePrepGuide } from '@/hooks/usePrepGuide'
import { extractGuideSection, stripLeadingH1 } from '@/utils/markdown'
import { useProgressStore } from '@/store/useProgressStore'
import { useStoriesStore } from '@/store/useStoriesStore'
import type { LeadershipPrinciple } from '@/types'
import { coverageTier, lpStoryCount, lpWeightedScore } from '@/utils/storyCoverage'
import { Shuffle } from 'lucide-react'

const GAP_LPS = [
  {
    id: 'strive-earth-best-employer',
    title: "Strive to be Earth's Best Employer",
    plan: 'Add Story 17 (team development) plus explicit inclusion/wellbeing examples; TMS super-users and zonal VRP training still anchor capability-building.',
  },
  {
    id: 'success-scale-broad-responsibility',
    title: 'Success and Scale Bring Broad Responsibility',
    plan: 'Connect vendor selection (labor/safety) and peak planning (driver welfare) to responsible trade-offs at scale.',
  },
] as const

export function LeadershipPrinciplesPage() {
  const { markdown, loading, error } = usePrepGuide()
  const markVisited = useProgressStore((s) => s.markSectionVisited)
  const logActivity = useProgressStore((s) => s.logActivity)
  const stories = useStoriesStore((s) => s.stories)

  const [filter, setFilter] = useState<'all' | 'top' | 'practice'>('all')
  const [known, setKnown] = useState<Record<string, boolean>>({})
  const [expanded, setExpanded] = useState<string | null>(null)
  const [order, setOrder] = useState<LeadershipPrinciple[]>(() => [...LEADERSHIP_PRINCIPLES])

  useEffect(() => {
    markVisited('lps')
    logActivity({ label: 'Opened Leadership Principles', href: '/leadership-principles' })
  }, [markVisited, logActivity])

  const md = useMemo(() => {
    if (!markdown) return ''
    return stripLeadingH1(extractGuideSection(markdown, 2))
  }, [markdown])

  const coverage = useMemo(() => {
    const m = new Map<string, number>()
    LEADERSHIP_PRINCIPLES.forEach((lp) => m.set(lp.id, lpWeightedScore(stories, lp.id)))
    return m
  }, [stories])

  const flashList = useMemo(() => {
    let list = order
    if (filter === 'top') list = list.filter((lp) => lp.topPriority)
    if (filter === 'practice') list = list.filter((lp) => !known[lp.id])
    return list
  }, [order, filter, known])

  const [flipId, setFlipId] = useState<string | null>(null)

  if (loading) return <div className="text-ink-muted">Loading…</div>
  if (error) return <div className="text-danger">{error}</div>

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionChrome sectionId="lps" sectionNumber={2} />

      <Tabs defaultValue="interactive">
        <TabsList>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="guide">Full guide (Section 2)</TabsTrigger>
        </TabsList>
        <TabsContent value="guide">
          <MarkdownBody content={md} />
        </TabsContent>
        <TabsContent value="interactive" className="space-y-8">
          <div>
            <h3 className="mb-3 font-serif text-xl text-ink">All 16 LPs</h3>
            <p className="mb-3 text-xs text-ink-faint">
              Coverage uses primary tags (1.0) + secondary tags (0.5) across your 18 STAR stories. Badge = weighted strength.
            </p>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {LEADERSHIP_PRINCIPLES.map((lp) => {
                const w = coverage.get(lp.id) ?? 0
                const tier = coverageTier(w)
                const covVariant =
                  tier === 'strong'
                    ? ('success' as const)
                    : tier === 'adequate'
                      ? ('default' as const)
                      : tier === 'weak'
                        ? ('warn' as const)
                        : ('danger' as const)
                const n = lpStoryCount(stories, lp.id)
                return (
                  <Card
                    key={lp.id}
                    className={lp.topPriority ? 'border-success/50 ring-1 ring-success/20' : ''}
                    onClick={() => setExpanded(expanded === lp.id ? null : lp.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-base">{lp.name}</CardTitle>
                        {lp.topPriority && <Badge variant="success">Top 7</Badge>}
                        <Badge variant={covVariant}>
                          {n} stor{n === 1 ? 'y' : 'ies'} · w={w.toFixed(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-ink-muted">
                      <p>{lp.description}</p>
                      {expanded === lp.id && (
                        <div className="mt-3 space-y-2 border-t border-amazon-muted/30 pt-3 text-xs">
                          {lp.whyMatters && <p className="text-ink">{lp.whyMatters}</p>}
                          {lp.storyHints && <p>Story hooks: {lp.storyHints}</p>}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-xl text-ink">Flashcards</h3>
              <div className="flex flex-wrap gap-2">
                {(['all', 'top', 'practice'] as const).map((f) => (
                  <Button key={f} size="sm" variant={filter === f ? 'default' : 'secondary'} onClick={() => setFilter(f)}>
                    {f === 'all' ? 'All' : f === 'top' ? 'Top 7' : 'Need practice'}
                  </Button>
                ))}
                <Button size="sm" variant="outline" onClick={() => setOrder([...LEADERSHIP_PRINCIPLES].sort(() => Math.random() - 0.5))}>
                  <Shuffle className="h-4 w-4" /> Shuffle
                </Button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {flashList.map((lp) => (
                <Card
                  key={lp.id}
                  className="min-h-[160px] cursor-pointer"
                  onClick={() => setFlipId(flipId === lp.id ? null : lp.id)}
                >
                  <CardContent className="flex h-full flex-col justify-between p-5">
                    <div>
                      <Badge variant="brand" className="mb-2">
                        {lp.short}
                      </Badge>
                      {flipId === lp.id ? (
                        <p className="text-sm text-ink-muted">{lp.description}</p>
                      ) : (
                        <p className="font-serif text-lg text-ink">What does “{lp.name}” mean for you?</p>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          setKnown((k) => ({ ...k, [lp.id]: true }))
                        }}
                      >
                        Known
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setKnown((k) => ({ ...k, [lp.id]: false }))
                        }}
                      >
                        More practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-serif text-xl text-ink">LP coverage map (18 stories)</h3>
            <div className="mb-2 flex flex-wrap gap-3 text-xs text-ink-faint">
              <span className="flex items-center gap-1">
                <span className="h-2 w-4 rounded bg-success" /> Strong (w≥4)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-4 rounded bg-info" /> Adequate (2–4)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-4 rounded bg-warn" /> Weak (0.5–2)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-4 rounded bg-danger" /> Gap (&lt;0.5)
              </span>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {LEADERSHIP_PRINCIPLES.map((lp) => {
                const w = coverage.get(lp.id) ?? 0
                const tier = coverageTier(w)
                const color =
                  tier === 'strong' ? 'bg-success' : tier === 'adequate' ? 'bg-info' : tier === 'weak' ? 'bg-warn' : 'bg-danger'
                const n = lpStoryCount(stories, lp.id)
                return (
                  <div key={lp.id} className="flex items-center gap-3 rounded-lg border border-amazon-muted/30 bg-card px-3 py-2">
                    <div className={`h-8 w-2 rounded-full ${color}`} />
                    <div className="flex-1 text-sm">
                      <div className="font-medium text-ink">{lp.name}</div>
                      <div className="text-xs text-ink-faint">
                        {n} stor{n === 1 ? 'y' : 'ies'} · weighted {w.toFixed(1)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-serif text-xl text-ink">LP gap focus</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {GAP_LPS.map((g) => (
                <Card key={g.id} className="border-danger/30">
                  <CardHeader>
                    <CardTitle className="text-base text-danger">{g.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-ink-muted">{g.plan}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
