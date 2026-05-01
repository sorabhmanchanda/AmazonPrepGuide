import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { INTERVIEW_DATE_ISO, SECTIONS } from '@/constants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProgressBar } from '@/components/ui/progress'
import { useProgressStore } from '@/store/useProgressStore'
import { useStoriesStore } from '@/store/useStoriesStore'
import { useQuizStore } from '@/store/useQuizStore'
import { useChecklistStore } from '@/store/useChecklistStore'
import { useNotesStore } from '@/store/useNotesStore'
import { ArrowRight, Flame, Sparkles } from 'lucide-react'

function daysUntilInterview(): number {
  const t = new Date(INTERVIEW_DATE_ISO + 'T09:00:00')
  const now = new Date()
  return Math.ceil((t.getTime() - now.getTime()) / (24 * 3600 * 1000))
}

function computeOverall(
  sectionRatio: number,
  practiceCount: number,
  quizAttempts: number,
  checklistChecked: number,
  checklistTotal: number,
  notesCount: number,
): number {
  const checklistRatio = checklistTotal ? checklistChecked / checklistTotal : 0
  const storyScore = Math.min(1, practiceCount * 0.15 + 0.15)
  const quizScore = Math.min(1, quizAttempts * 0.2 + 0.1)
  const notesScore = Math.min(1, notesCount * 0.15 + 0.05)
  const raw =
    sectionRatio * 0.45 + storyScore * 0.2 + quizScore * 0.15 + checklistRatio * 0.12 + notesScore * 0.08
  return Math.round(Math.min(1, raw) * 100)
}

export function Dashboard() {
  const ratio = useProgressStore((s) => s.sectionCompletionRatio())
  const streak = useProgressStore((s) => s.studyStreak)
  const recent = useProgressStore((s) => s.recentActivity)
  const lastVisited = useProgressStore((s) => s.lastVisited)
  const completedSections = useProgressStore((s) => s.completedSections)
  const practiceHistory = useStoriesStore((s) => s.practiceHistory)
  const attempts = useQuizStore((s) => s.attempts)
  const checked = useChecklistStore((s) => s.checkedItems)
  const notes = useNotesStore((s) => s.notes)

  const checklistTotal = 41
  const d = daysUntilInterview()
  const overall = useMemo(
    () =>
      computeOverall(
        ratio,
        practiceHistory.length,
        attempts.length,
        checked.length,
        checklistTotal,
        notes.length,
      ),
    [ratio, practiceHistory.length, attempts.length, checked.length, notes.length],
  )

  const continueHref =
    (lastVisited && SECTIONS.find((s) => s.id === lastVisited)?.path) || '/leadership-principles'

  const focus = useMemo(
    () => SECTIONS.find((s) => !completedSections.includes(s.id)) ?? SECTIONS[0],
    [completedSections],
  )

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink md:text-4xl">Good to see you, Sorabh</h2>
            <p className="mt-1 text-ink-muted">
              Interview day: <span className="font-medium text-brand">{INTERVIEW_DATE_ISO}</span> ·{' '}
              {d >= 0 ? (
                <>
                  <span className="text-ink">{d}</span> day{d === 1 ? '' : 's'} to go
                </>
              ) : (
                'Interview window — stay sharp.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="brand" className="gap-1">
              <Flame className="h-3 w-3" /> {streak} day streak
            </Badge>
            <Badge variant="success">Overall {overall}%</Badge>
          </div>
        </div>
        <ProgressBar value={overall} className="h-3" />
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick stats</CardTitle>
            <CardDescription>What you have touched in this hub</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-2xl font-semibold text-ink">{practiceHistory.length}</div>
              <div className="text-ink-faint">Story practices</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-ink">{attempts.length}</div>
              <div className="text-ink-faint">Quiz attempts</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-ink">{checked.length}</div>
              <div className="text-ink-faint">Checklist ticks</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-ink">{notes.length}</div>
              <div className="text-ink-faint">Notes</div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-brand/30 bg-gradient-to-br from-card to-amazon/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-brand" />
              Today’s focus
            </CardTitle>
            <CardDescription>Suggested next block based on completion</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium text-ink">{focus.title}</p>
              <p className="text-sm text-ink-muted">Work the material, then mark the section complete.</p>
            </div>
            <Button asChild>
              <Link to={focus.path}>
                Go there <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="secondary">
          <Link to={continueHref}>
            Continue where you left off <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/practice-quiz">Take a quiz pass</Link>
        </Button>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-xl text-ink">Sections</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <Link to={s.path}>
                <Card className="h-full hover:border-brand/40">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="default">{s.number}</Badge>
                      {completedSections.includes(s.id) ? (
                        <Badge variant="success">Done</Badge>
                      ) : (
                        <Badge variant="warn">Open</Badge>
                      )}
                    </div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {recent.length > 0 && (
        <div>
          <h3 className="mb-3 font-serif text-xl text-ink">Recent activity</h3>
          <Card>
            <CardContent className="divide-y divide-amazon-muted/20 p-0">
              {recent.slice(0, 5).map((r) => (
                <Link key={r.id} to={r.href} className="block px-4 py-3 text-sm hover:bg-card-hover">
                  <div className="font-medium text-ink">{r.label}</div>
                  <div className="text-xs text-ink-faint">{new Date(r.at).toLocaleString()}</div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
