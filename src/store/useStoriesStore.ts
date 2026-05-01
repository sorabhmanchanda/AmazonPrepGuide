import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ALL_STORY_TEMPLATES, getStoryTemplateById } from '@/data/allStories'
import type { PracticeSession, Story } from '@/types'

export interface StoryRevision {
  at: string
  snapshot: Story
}

interface StoriesState {
  stories: Story[]
  practiceHistory: PracticeSession[]
  revisions: Record<string, StoryRevision[]>
  updateStory: (id: string, updates: Partial<Story>) => void
  resetStory: (id: string) => void
  addPracticeSession: (session: PracticeSession) => void
  pushRevision: (id: string) => void
  getStoriesByLp: (lpId: string) => Story[]
}

const MAX_REVISIONS = 5

export const useStoriesStore = create<StoriesState>()(
  persist(
    (set, get) => ({
      stories: ALL_STORY_TEMPLATES,
      practiceHistory: [],
      revisions: {},

      updateStory: (id, updates) =>
        set((s) => ({
          stories: s.stories.map((st) => {
            if (st.id !== id) return st
            const next = { ...st, ...updates }
            if (
              'sections' in updates ||
              'title' in updates ||
              'killerAmxl' in updates ||
              'constructedAdaptation' in updates
            ) {
              next.userEdited = true
            }
            return next
          }),
        })),

      resetStory: (id) =>
        set((s) => ({
          stories: s.stories.map((st) => {
            const tmpl = getStoryTemplateById(id)
            if (st.id !== id) return st
            return tmpl ? { ...tmpl } : st
          }),
        })),

      addPracticeSession: (session) =>
        set((s) => ({ practiceHistory: [session, ...s.practiceHistory].slice(0, 200) })),

      pushRevision: (id) =>
        set((s) => {
          const current = s.stories.find((x) => x.id === id)
          if (!current) return s
          const prev = s.revisions[id] ?? []
          const snap: StoryRevision = { at: new Date().toISOString(), snapshot: { ...current } }
          return { revisions: { ...s.revisions, [id]: [snap, ...prev].slice(0, MAX_REVISIONS) } }
        }),

      getStoriesByLp: (lpId) =>
        get().stories.filter(
          (st) => st.primaryLpIds.includes(lpId as never) || st.secondaryLpIds?.includes(lpId as never),
        ),
    }),
    { name: 'amazon-l6-stories-v2' },
  ),
)
