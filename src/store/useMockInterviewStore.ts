import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MockSession } from '@/types'

interface MockInterviewState {
  sessions: MockSession[]
  addSession: (session: MockSession) => void
}

export const useMockInterviewStore = create<MockInterviewState>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (session) => set((s) => ({ sessions: [session, ...s.sessions].slice(0, 40) })),
    }),
    { name: 'amazon-l6-mock' },
  ),
)
