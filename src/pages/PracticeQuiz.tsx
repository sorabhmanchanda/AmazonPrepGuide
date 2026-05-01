import { useCallback, useEffect, useMemo, useState } from 'react'
import { SectionChrome } from '@/components/common/SectionChrome'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { QUIZ_QUESTIONS } from '@/data/quizQuestions'
import type { QuizQuestion } from '@/types'
import { useQuizStore } from '@/store/useQuizStore'
import { useProgressStore } from '@/store/useProgressStore'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

type Mode = 'full' | 'section' | 'random10' | 'failed'

export function PracticeQuizPage() {
  const [mode, setMode] = useState<Mode>('random10')
  const [section, setSection] = useState('LPs')
  const [pool, setPool] = useState<QuizQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [summary, setSummary] = useState<{ score: number; total: number } | null>(null)

  const recordAttempt = useQuizStore((s) => s.recordAttempt)
  const registerFailures = useQuizStore((s) => s.registerFailures)
  const clearFailures = useQuizStore((s) => s.clearFailures)
  const failed = useQuizStore((s) => s.failedQuestions)
  const attempts = useQuizStore((s) => s.attempts)
  const markVisited = useProgressStore((s) => s.markSectionVisited)
  const logActivity = useProgressStore((s) => s.logActivity)

  useEffect(() => {
    markVisited('quiz')
    logActivity({ label: 'Opened Practice Quiz', href: '/practice-quiz' })
  }, [markVisited, logActivity])

  const sections = useMemo(() => [...new Set(QUIZ_QUESTIONS.map((q) => q.section))], [])

  const start = useCallback(() => {
    let list = [...QUIZ_QUESTIONS]
    if (mode === 'section') list = list.filter((q) => q.section === section)
    if (mode === 'random10') list = [...list].sort(() => Math.random() - 0.5).slice(0, 10)
    if (mode === 'failed') {
      list = list.filter((q) => failed.includes(q.id))
      if (!list.length) list = QUIZ_QUESTIONS.slice(0, 5)
    }
    if (mode === 'full') list = [...QUIZ_QUESTIONS]
    setPool(list)
    setIdx(0)
    setPick(null)
    setAnswers([])
    setSummary(null)
  }, [mode, section, failed])

  const q = pool[idx]

  const choose = (i: number) => {
    if (!q || pick !== null) return
    setPick(i)
    if (i !== q.correctIndex) registerFailures([q.id])
  }

  const next = () => {
    if (!q || pick === null) return
    const ok = pick === q.correctIndex
    const nextAnswers = [...answers, ok]
    setAnswers(nextAnswers)
    setPick(null)
    if (idx + 1 >= pool.length) {
      const bySection: Record<string, { correct: number; total: number }> = {}
      pool.forEach((qq, i) => {
        bySection[qq.section] ??= { correct: 0, total: 0 }
        bySection[qq.section].total += 1
        if (nextAnswers[i]) bySection[qq.section].correct += 1
      })
      const score = nextAnswers.filter(Boolean).length
      recordAttempt({
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        mode,
        score,
        total: pool.length,
        bySection,
      })
      logActivity({ label: `Quiz ${score}/${pool.length}`, href: '/practice-quiz' })
      setSummary({ score, total: pool.length })
      return
    }
    setIdx((x) => x + 1)
  }

  const chartData = [...attempts]
    .reverse()
    .slice(0, 12)
    .map((a, i) => ({
      name: `${i + 1}`,
      pct: Math.round((a.score / a.total) * 100),
    }))

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SectionChrome sectionId="quiz" sectionNumber={13} />

      <Card>
        <CardHeader>
          <CardTitle>Quiz setup</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {(['full', 'random10', 'section', 'failed'] as Mode[]).map((m) => (
              <Button key={m} size="sm" variant={mode === m ? 'default' : 'secondary'} onClick={() => setMode(m)}>
                {m === 'full' ? 'Full (30)' : m === 'random10' ? 'Random 10' : m === 'section' ? 'By section' : 'Failed only'}
              </Button>
            ))}
          </div>
          {mode === 'section' && (
            <select
              className="h-10 max-w-xs rounded-lg border border-amazon-muted/40 bg-surface px-3 text-sm text-ink"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              {sections.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
          <div className="flex flex-wrap gap-2">
            <Button onClick={start}>Start</Button>
            {failed.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => clearFailures(failed)}>
                Clear failed bank ({failed.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Last round</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-ink-muted">
            <p className="text-2xl font-semibold text-ink">
              {summary.score}/{summary.total} ({Math.round((summary.score / summary.total) * 100)}%)
            </p>
          </CardContent>
        </Card>
      )}

      {pool.length > 0 && !summary && q && (
        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge>
                {idx + 1}/{pool.length}
              </Badge>
              <Badge variant="purple">{q.section}</Badge>
            </div>
            <CardTitle className="text-lg">{q.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((opt, i) => {
              const wrong = pick !== null && pick === i && i !== q.correctIndex
              const right = pick !== null && i === q.correctIndex
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={pick !== null}
                  onClick={() => choose(i)}
                  className={`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    right
                      ? 'border-success bg-success/10 text-ink'
                      : wrong
                        ? 'border-danger bg-danger/10 text-ink'
                        : 'border-amazon-muted/40 bg-surface hover:border-brand/40'
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              )
            })}
            {pick !== null && (
              <>
                <div className="rounded-lg bg-amazon/50 p-3 text-sm text-ink-muted">
                  <strong className="text-ink">Explanation:</strong> {q.explanation}
                </div>
                <Button onClick={next}>{idx + 1 >= pool.length ? 'Finish' : 'Next'}</Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent scores</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#37475A" />
                <XAxis dataKey="name" stroke="#9aa0a6" />
                <YAxis domain={[0, 100]} stroke="#9aa0a6" />
                <Tooltip contentStyle={{ background: '#1a2332', border: '1px solid #37475A' }} />
                <Line type="monotone" dataKey="pct" stroke="#FF9900" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
