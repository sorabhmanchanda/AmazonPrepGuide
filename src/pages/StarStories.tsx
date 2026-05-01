import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SectionChrome } from '@/components/common/SectionChrome'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useStoriesStore } from '@/store/useStoriesStore'
import { useProgressStore } from '@/store/useProgressStore'
import { LEADERSHIP_PRINCIPLES } from '@/data/leadershipPrinciples'
import { useTimer } from '@/hooks/useTimer'
import { formatSeconds, estimateSpeakingSeconds } from '@/utils/formatTime'
import { computeStoryStrength } from '@/utils/storyStrength'
import type { Story } from '@/types'
import { Shuffle, Timer } from 'lucide-react'

type SourceFilter = 'all' | 'resume' | 'constructed' | 'real-only'
type CompanyFilter = 'all' | string
type PracticeBias = 'weighted' | 'equal' | 'real-only'

function lpName(id: string) {
  return LEADERSHIP_PRINCIPLES.find((l) => l.id === id)?.name ?? id
}

function wordCount(st: Story) {
  return st.sections.reduce((n, s) => n + s.content.split(/\s+/).filter(Boolean).length, 0)
}

function timerColor(sec: number) {
  if (sec < 120) return 'text-success'
  if (sec < 150) return 'text-emerald-300'
  if (sec < 210) return 'text-warn'
  return 'text-danger'
}

function storyHasLp(st: Story, lpId: string) {
  return st.primaryLpIds.includes(lpId as never) || st.secondaryLpIds?.includes(lpId as never)
}

function sourceBadge(st: Story) {
  if (st.userEdited) return { label: 'User-modified', variant: 'purple' as const }
  if (st.isConstructed) return { label: 'Constructed', variant: 'warn' as const }
  if (st.storySource === 'adapted') return { label: 'Adapted', variant: 'default' as const }
  return { label: 'Verified', variant: 'success' as const }
}

function pickPracticeStory(pool: Story[], bias: PracticeBias): Story | null {
  if (!pool.length) return null
  const real = pool.filter((s) => !s.isConstructed)
  const cons = pool.filter((s) => s.isConstructed)
  if (bias === 'real-only' && real.length) {
    return real[Math.floor(Math.random() * real.length)]!
  }
  if (bias === 'equal') {
    return pool[Math.floor(Math.random() * pool.length)]!
  }
  if (bias === 'weighted') {
    if (real.length && Math.random() < 0.8) return real[Math.floor(Math.random() * real.length)]!
    if (cons.length) return cons[Math.floor(Math.random() * cons.length)]!
    return pool[Math.floor(Math.random() * pool.length)]!
  }
  return pool[Math.floor(Math.random() * pool.length)]!
}

export function StarStoriesPage() {
  const stories = useStoriesStore((s) => s.stories)
  const updateStory = useStoriesStore((s) => s.updateStory)
  const resetStory = useStoriesStore((s) => s.resetStory)
  const addPracticeSession = useStoriesStore((s) => s.addPracticeSession)
  const pushRevision = useStoriesStore((s) => s.pushRevision)
  const practiceHistory = useStoriesStore((s) => s.practiceHistory)
  const markVisited = useProgressStore((s) => s.markSectionVisited)
  const logActivity = useProgressStore((s) => s.logActivity)

  const [selectedId, setSelectedId] = useState(stories[0]?.id ?? '')
  const selected = stories.find((s) => s.id === selectedId) ?? stories[0]
  const [lpFilter, setLpFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all')
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>('all')
  const [practiceBias, setPracticeBias] = useState<PracticeBias>('weighted')
  const [practiceStory, setPracticeStory] = useState<Story | null>(null)
  const [practiceNote, setPracticeNote] = useState('')
  const [practiceRating, setPracticeRating] = useState<1 | 2 | 3 | 4 | 5>(3)
  const { seconds, reset } = useTimer(!!practiceStory)

  useEffect(() => {
    if (practiceStory) reset()
  }, [practiceStory?.id, reset])

  const autosave = useRef<number | null>(null)

  useEffect(() => {
    markVisited('stories')
    logActivity({ label: 'Opened STAR Stories', href: '/star-stories' })
  }, [markVisited, logActivity])

  useEffect(() => {
    if (selectedId && !stories.some((s) => s.id === selectedId)) {
      setSelectedId(stories[0]?.id ?? '')
    }
  }, [stories, selectedId])

  const companies = useMemo(() => [...new Set(stories.map((s) => s.company))].sort(), [stories])

  const filtered = useMemo(() => {
    let list = stories
    if (lpFilter !== 'all') list = list.filter((s) => storyHasLp(s, lpFilter))
    if (sourceFilter === 'resume' || sourceFilter === 'real-only') list = list.filter((s) => !s.isConstructed)
    if (sourceFilter === 'constructed') list = list.filter((s) => s.isConstructed)
    if (companyFilter !== 'all') list = list.filter((s) => s.company === companyFilter)
    return list
  }, [stories, lpFilter, sourceFilter, companyFilter])

  const scheduleAutosave = useCallback(() => {
    if (!selected) return
    if (autosave.current) window.clearTimeout(autosave.current)
    autosave.current = window.setTimeout(() => {
      pushRevision(selected.id)
    }, 30_000)
  }, [selected, pushRevision])

  const updateSection = (label: string, text: string) => {
    if (!selected) return
    const sections = selected.sections.map((s) => (s.label === label ? { ...s, content: text } : s))
    updateStory(selected.id, { sections })
    scheduleAutosave()
  }

  const startRandomPractice = () => {
    const pool = filtered.length ? filtered : stories
    const st = pickPracticeStory(pool, practiceBias)
    if (!st) return
    setPracticeStory(st)
    setPracticeNote('')
    setPracticeRating(3)
  }

  const endPractice = () => {
    if (!practiceStory) return
    addPracticeSession({
      id: crypto.randomUUID(),
      storyId: practiceStory.id,
      at: new Date().toISOString(),
      durationSec: seconds,
      rating: practiceRating,
      notes: practiceNote || undefined,
    })
    setPracticeStory(null)
  }

  const strength = useMemo(
    () => (selected ? computeStoryStrength(selected) : { score: 0, breakdown: ['No story selected'] }),
    [selected],
  )

  if (!selected) return <div className="text-ink-muted">No stories loaded.</div>

  const wc = wordCount(selected)
  const est = estimateSpeakingSeconds(wc)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <SectionChrome sectionId="stories" sectionNumber={3} />

      <Card className="border-warn/40 bg-warn/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-warn">Bar Raiser note</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-ink-muted">
          Amazon Bar Raisers will ask follow-ups: exact budgets, names, metrics, and trade-offs. Use stories you can
          defend in detail. Treat <strong className="text-ink">constructed</strong> items as outlines—personalize with
          real facts before using them as live answers.
        </CardContent>
      </Card>

      <Tabs defaultValue="library">
        <TabsList className="flex-wrap">
          <TabsTrigger value="library">Library ({stories.length})</TabsTrigger>
          <TabsTrigger value="editor">Editor & timer</TabsTrigger>
          <TabsTrigger value="practice">Practice mode</TabsTrigger>
          <TabsTrigger value="history">Practice history</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="w-full text-xs font-medium uppercase tracking-wide text-ink-faint">Source</span>
            {(['all', 'resume', 'constructed', 'real-only'] as SourceFilter[]).map((f) => (
              <Button key={f} size="sm" variant={sourceFilter === f ? 'default' : 'secondary'} onClick={() => setSourceFilter(f)}>
                {f === 'all' ? 'All' : f === 'resume' ? 'Resume-based' : f === 'constructed' ? 'Constructed' : 'Real only'}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="w-full text-xs font-medium uppercase tracking-wide text-ink-faint">Company</span>
            <Button size="sm" variant={companyFilter === 'all' ? 'default' : 'secondary'} onClick={() => setCompanyFilter('all')}>
              All companies
            </Button>
            {companies.map((c) => (
              <Button key={c} size="sm" variant={companyFilter === c ? 'default' : 'secondary'} onClick={() => setCompanyFilter(c)}>
                {c}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="w-full text-xs font-medium uppercase tracking-wide text-ink-faint">Leadership Principle</span>
            <Button size="sm" variant={lpFilter === 'all' ? 'default' : 'secondary'} onClick={() => setLpFilter('all')}>
              All LPs
            </Button>
            {LEADERSHIP_PRINCIPLES.filter((l) => stories.some((s) => storyHasLp(s, l.id))).map((l) => (
              <Button key={l.id} size="sm" variant={lpFilter === l.id ? 'default' : 'secondary'} onClick={() => setLpFilter(l.id)}>
                {l.short}
              </Button>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((st) => {
              const b = sourceBadge(st)
              return (
                <Card
                  key={st.id}
                  className={st.id === selectedId ? 'border-brand/50' : ''}
                  onClick={() => setSelectedId(st.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{st.company}</Badge>
                      <Badge variant={b.variant}>{b.label}</Badge>
                      {st.primaryLpIds.map((id) => (
                        <Badge key={id} variant="purple">
                          {lpName(id)}
                        </Badge>
                      ))}
                      {st.secondaryLpIds?.map((id) => (
                        <Badge key={id} variant="default">
                          +{lpName(id)}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-base">{st.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-ink-faint">
                    ~{st.estimatedMinutes} min · {wordCount(st)} words · practices:{' '}
                    {practiceHistory.filter((p) => p.storyId === st.id).length}
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {selected.isConstructed && (
            <Card className="border-warn/50 bg-warn/10">
              <CardHeader>
                <CardTitle className="text-base text-warn">Constructed scenario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-ink-muted">
                <p>{selected.constructedNote}</p>
                <p className="text-xs text-ink-faint">
                  Best practice: replace with your own real examples before using in interviews.
                </p>
              </CardContent>
            </Card>
          )}
          <Card className="border-brand/30 bg-amazon/30">
            <CardHeader>
              <CardTitle className="text-base text-brand">Why this is killer for AMXL JP</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-ink-muted">{selected.killerAmxl}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="space-y-4">
          {selected.isConstructed && (
            <Card className="border-warn/50 bg-warn/10">
              <CardHeader>
                <CardTitle className="text-base text-warn">⚠ Constructed scenario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-ink-muted">
                <p>{selected.constructedNote}</p>
                <div>
                  <p className="mb-1 text-xs font-medium text-ink">Adapt to your experience (saved with the story)</p>
                  <Textarea
                    rows={3}
                    placeholder="Your real names, numbers, stakeholder titles, and outcomes…"
                    value={selected.constructedAdaptation ?? ''}
                    onChange={(e) => updateStory(selected.id, { constructedAdaptation: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          <div className="flex flex-wrap gap-2">
            {stories.map((st) => (
              <Button key={st.id} size="sm" variant={st.id === selectedId ? 'default' : 'secondary'} onClick={() => setSelectedId(st.id)}>
                {st.company}: {st.title.slice(0, 24)}
                {st.title.length > 24 ? '…' : ''}
              </Button>
            ))}
            <Button size="sm" variant="outline" onClick={() => resetStory(selected.id)}>
              Reset to template
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-2">
              {selected.sections.map((sec) => (
                <div key={sec.label}>
                  <div className="mb-1 flex justify-between text-xs text-ink-faint">
                    <span>{sec.title}</span>
                    <span>{sec.content.split(/\s+/).filter(Boolean).length} words</span>
                  </div>
                  <Textarea
                    value={sec.content}
                    onChange={(e) => updateSection(sec.label, e.target.value)}
                    rows={sec.label === 'action' ? 10 : 5}
                  />
                </div>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Timer className="h-4 w-4 text-brand" /> Rehearsal & analyzer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <StoryTimerPanel />
                <p>
                  Total words: <strong>{wc}</strong>
                </p>
                <p>
                  Est. speaking time @140 wpm: <strong>{Math.round(est / 60)}m {est % 60}s</strong>
                </p>
                <div className="rounded-lg border border-amazon-muted/30 bg-surface-2 p-3">
                  <p className="mb-1 font-medium text-ink">Story strength (heuristic)</p>
                  <p className="text-2xl font-semibold text-brand">{strength.score}</p>
                  <ul className="mt-2 space-y-1 text-xs text-ink-faint">
                    {strength.breakdown.map((line) => (
                      <li key={line}>· {line}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-ink-faint">Auto-snapshots for version history every 30s while you edit.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          {!practiceStory ? (
            <Card>
              <CardContent className="flex flex-col items-start gap-3 p-6">
                <p className="text-sm text-ink-muted">
                  Random story, content hidden—speak out loud. Default: ~80% resume-based, ~20% constructed (when
                  present). Change weighting below.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="w-full text-xs text-ink-faint">Practice pool weighting</span>
                  {(['weighted', 'equal', 'real-only'] as PracticeBias[]).map((b) => (
                    <Button key={b} size="sm" variant={practiceBias === b ? 'default' : 'secondary'} onClick={() => setPracticeBias(b)}>
                      {b === 'weighted' ? '80/20 weighted' : b === 'equal' ? 'All equal' : 'Real stories only'}
                    </Button>
                  ))}
                </div>
                <Button onClick={startRandomPractice}>
                  <Shuffle className="h-4 w-4" /> Random story
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{practiceStory.title}</CardTitle>
                <p className="text-sm text-ink-muted">{practiceStory.company}</p>
                {practiceStory.isConstructed && (
                  <Badge variant="warn">Constructed — speak your personalized version</Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`font-mono text-4xl font-bold ${timerColor(seconds)}`}>{formatSeconds(seconds)}</div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={endPractice}>Finish & save session</Button>
                  <Button variant="secondary" onClick={() => setPracticeStory(null)}>
                    Cancel
                  </Button>
                </div>
                <div>
                  <p className="mb-1 text-xs text-ink-faint">Self rating</p>
                  <div className="flex gap-1">
                    {([1, 2, 3, 4, 5] as const).map((r) => (
                      <Button key={r} size="sm" variant={practiceRating === r ? 'default' : 'outline'} onClick={() => setPracticeRating(r)}>
                        {r}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs text-ink-faint">Notes</p>
                  <Textarea rows={3} value={practiceNote} onChange={(e) => setPracticeNote(e.target.value)} />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="divide-y divide-amazon-muted/20 p-0">
              {practiceHistory.length === 0 && <p className="p-4 text-sm text-ink-muted">No sessions yet.</p>}
              {practiceHistory.map((p) => {
                const st = stories.find((s) => s.id === p.storyId)
                return (
                  <div key={p.id} className="px-4 py-3 text-sm">
                    <div className="font-medium text-ink">{st?.title ?? p.storyId}</div>
                    <div className="text-xs text-ink-faint">
                      {new Date(p.at).toLocaleString()} · {formatSeconds(p.durationSec)} · rating {p.rating}/5
                    </div>
                    {p.notes && <p className="mt-1 text-ink-muted">{p.notes}</p>}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StoryTimerPanel() {
  const [run, setRun] = useState(false)
  const { seconds, reset } = useTimer(run)
  return (
    <div>
      <div className={`mb-2 font-mono text-3xl font-semibold ${timerColor(seconds)}`}>{formatSeconds(seconds)}</div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setRun(true)}>
          Start
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setRun(false)}>
          Pause
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setRun(false)
            reset()
          }}
        >
          Reset
        </Button>
      </div>
      <p className="mt-2 text-xs text-ink-faint">Green &lt;2m · lime 2–2.5m · yellow 2.5–3.5m · red 3.5m+</p>
    </div>
  )
}
