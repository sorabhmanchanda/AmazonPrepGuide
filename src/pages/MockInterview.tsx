import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { MOCK_QUESTION_BANK } from '@/data/interviewQuestions'
import type { InterviewerType, MockSessionAnswer } from '@/types'
import { useMockInterviewStore } from '@/store/useMockInterviewStore'
import { useTimer } from '@/hooks/useTimer'
import { formatSeconds } from '@/utils/formatTime'

const TYPES: { id: InterviewerType; label: string }[] = [
  { id: 'hm', label: 'Hiring Manager' },
  { id: 'bar-raiser', label: 'Bar Raiser' },
  { id: 'peer', label: 'Peer' },
  { id: 'technical', label: 'Technical' },
  { id: 'sr-leader', label: 'Sr Leader' },
]

export function MockInterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'review'>('setup')
  const [type, setType] = useState<InterviewerType>('hm')
  const [duration, setDuration] = useState<30 | 45 | 60>(45)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [queue, setQueue] = useState<typeof MOCK_QUESTION_BANK>([])
  const [qi, setQi] = useState(0)
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [notes, setNotes] = useState('')
  const [answers, setAnswers] = useState<MockSessionAnswer[]>([])
  const addSession = useMockInterviewStore((s) => s.addSession)
  const sessions = useMockInterviewStore((s) => s.sessions)

  const { seconds, reset } = useTimer(step === 'session')

  const q = queue[qi]

  const start = () => {
    const pool = MOCK_QUESTION_BANK.filter((x) => x.type === type)
    const base = pool.length ? pool : MOCK_QUESTION_BANK
    const count = duration === 30 ? 4 : duration === 45 ? 6 : 8
    const shuffled = [...base].sort(() => Math.random() - 0.5).slice(0, count)
    setQueue(shuffled)
    setQi(0)
    setAnswers([])
    setStep('session')
    reset()
  }

  const submitAnswer = () => {
    if (!q) return
    const a: MockSessionAnswer = {
      questionId: q.id,
      rating,
      notes: notes || undefined,
      secondsUsed: seconds,
    }
    const nextAnswers = [...answers, a]
    setAnswers(nextAnswers)
    setNotes('')
    setRating(3)
    reset()
    if (qi + 1 >= queue.length) {
      addSession({
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        interviewerType: type,
        durationMin: duration,
        difficulty,
        answers: nextAnswers,
      })
      setStep('review')
      return
    }
    setQi((x) => x + 1)
  }

  const last = sessions[0]

  const avgRating = useMemo(() => {
    if (!last?.answers.length) return 0
    return last.answers.reduce((s, x) => s + x.rating, 0) / last.answers.length
  }, [last])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="font-serif text-2xl text-ink">Mock interview</h2>
      <p className="text-sm text-ink-muted">
        No audio recording—practice speaking out loud, self-rate each answer, and keep light notes.
      </p>

      {step === 'setup' && (
        <Card>
          <CardHeader>
            <CardTitle>Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-xs text-ink-faint">Interviewer</p>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <Button key={t.id} size="sm" variant={type === t.id ? 'default' : 'secondary'} onClick={() => setType(t.id)}>
                    {t.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-ink-faint">Duration</p>
              <div className="flex gap-2">
                {([30, 45, 60] as const).map((d) => (
                  <Button key={d} size="sm" variant={duration === d ? 'default' : 'secondary'} onClick={() => setDuration(d)}>
                    {d} min
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-ink-faint">Difficulty</p>
              <div className="flex gap-2">
                {(['easy', 'medium', 'hard'] as const).map((d) => (
                  <Button key={d} size="sm" variant={difficulty === d ? 'default' : 'secondary'} onClick={() => setDifficulty(d)}>
                    {d}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={start}>Begin session</Button>
          </CardContent>
        </Card>
      )}

      {step === 'session' && q && (
        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge>
                Q{qi + 1}/{queue.length}
              </Badge>
              <Badge variant="purple">{type}</Badge>
              <Badge variant="warn">≤3:00 suggested cap</Badge>
            </div>
            <CardTitle className="text-lg">{q.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`font-mono text-3xl ${seconds > 180 ? 'text-danger' : 'text-brand'}`}>{formatSeconds(seconds)}</div>
            <div>
              <p className="mb-1 text-xs text-ink-faint">Self rating</p>
              <div className="flex gap-1">
                {([1, 2, 3, 4, 5] as const).map((r) => (
                  <Button key={r} size="sm" variant={rating === r ? 'default' : 'outline'} onClick={() => setRating(r)}>
                    {r}
                  </Button>
                ))}
              </div>
            </div>
            <Textarea rows={3} placeholder="Notes after you speak…" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button onClick={submitAnswer}>Submit & next</Button>
          </CardContent>
        </Card>
      )}

      {step === 'review' && last && (
        <Card>
          <CardHeader>
            <CardTitle>Session saved</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-ink-muted">
            <p>
              Questions: {last.answers.length} · Avg self-rating: {avgRating.toFixed(1)}/5
            </p>
            <Button variant="secondary" onClick={() => setStep('setup')}>
              New session
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-amazon-muted/20 p-0 text-sm">
          {sessions.length === 0 && <p className="p-4 text-ink-muted">No sessions yet.</p>}
          {sessions.map((s) => (
            <div key={s.id} className="px-4 py-3">
              <div className="font-medium text-ink">
                {s.interviewerType} · {s.durationMin}m · {new Date(s.at).toLocaleString()}
              </div>
              <div className="text-xs text-ink-faint">{s.answers.length} answers logged</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
