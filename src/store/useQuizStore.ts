import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuizAttempt } from '@/types'

interface QuizState {
  attempts: QuizAttempt[]
  bestScore: number
  failedQuestions: string[]
  recordAttempt: (attempt: QuizAttempt) => void
  registerFailures: (questionIds: string[]) => void
  clearFailures: (questionIds: string[]) => void
  getWeakAreas: () => string[]
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      attempts: [],
      bestScore: 0,
      failedQuestions: [],

      recordAttempt: (attempt) =>
        set((s) => {
          const best = Math.max(s.bestScore, Math.round((attempt.score / attempt.total) * 100))
          return { attempts: [attempt, ...s.attempts].slice(0, 50), bestScore: best }
        }),

      registerFailures: (questionIds) =>
        set((s) => ({
          failedQuestions: [...new Set([...s.failedQuestions, ...questionIds])],
        })),

      clearFailures: (questionIds) =>
        set((s) => ({
          failedQuestions: s.failedQuestions.filter((id) => !questionIds.includes(id)),
        })),

      getWeakAreas: () => {
        const last = get().attempts[0]
        if (!last) return []
        return Object.entries(last.bySection)
          .filter(([, v]) => v.total > 0 && v.correct / v.total < 0.6)
          .map(([k]) => k)
      },
    }),
    { name: 'amazon-l6-quiz' },
  ),
)
