import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SECTIONS } from '@/constants'

export interface ActivityItem {
  id: string
  label: string
  href: string
  at: string
}

interface ProgressState {
  visitedSections: string[]
  completedSections: string[]
  lastVisited: string | null
  studyStreak: number
  lastStudyDate: string | null
  totalTimeSpentSec: number
  recentActivity: ActivityItem[]
  markSectionVisited: (id: string) => void
  markSectionComplete: (id: string) => void
  touchStudyDay: () => void
  addTimeSpent: (seconds: number) => void
  logActivity: (item: Omit<ActivityItem, 'id' | 'at'> & { id?: string }) => void
  sectionCompletionRatio: () => number
}

const MAX_ACTIVITY = 8

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(a: string, b: string): number {
  const d1 = new Date(a).getTime()
  const d2 = new Date(b).getTime()
  return Math.round((d2 - d1) / (24 * 3600 * 1000))
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      visitedSections: [],
      completedSections: [],
      lastVisited: null,
      studyStreak: 0,
      lastStudyDate: null,
      totalTimeSpentSec: 0,
      recentActivity: [],

      markSectionVisited: (id) =>
        set((s) => ({
          visitedSections: s.visitedSections.includes(id)
            ? s.visitedSections
            : [...s.visitedSections, id],
          lastVisited: id,
        })),

      markSectionComplete: (id) =>
        set((s) => ({
          completedSections: s.completedSections.includes(id)
            ? s.completedSections
            : [...s.completedSections, id],
          visitedSections: s.visitedSections.includes(id)
            ? s.visitedSections
            : [...s.visitedSections, id],
          lastVisited: id,
        })),

      touchStudyDay: () =>
        set((s) => {
          const t = todayIso()
          if (s.lastStudyDate === t) return s
          let streak = s.studyStreak
          if (!s.lastStudyDate) streak = 1
          else if (daysBetween(s.lastStudyDate, t) === 1) streak += 1
          else if (daysBetween(s.lastStudyDate, t) > 1) streak = 1
          return { lastStudyDate: t, studyStreak: streak }
        }),

      addTimeSpent: (seconds) =>
        set((s) => ({ totalTimeSpentSec: s.totalTimeSpentSec + Math.max(0, seconds) })),

      logActivity: (item) =>
        set((s) => {
          const entry: ActivityItem = {
            id: item.id ?? crypto.randomUUID(),
            label: item.label,
            href: item.href,
            at: new Date().toISOString(),
          }
          const rest = s.recentActivity.filter((e) => e.href !== item.href)
          return { recentActivity: [entry, ...rest].slice(0, MAX_ACTIVITY) }
        }),

      sectionCompletionRatio: () => {
        const s = get()
        return SECTIONS.filter((sec) => s.completedSections.includes(sec.id)).length / SECTIONS.length
      },
    }),
    { name: 'amazon-l6-progress' },
  ),
)
