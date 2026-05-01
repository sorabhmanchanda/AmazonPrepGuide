export type StorySource = 'verified' | 'adapted' | 'constructed' | 'user-modified'

export type LeadershipPrincipleId =
  | 'deliver-results'
  | 'ownership'
  | 'bias-for-action'
  | 'dive-deep'
  | 'earn-trust'
  | 'think-big'
  | 'invent-and-simplify'
  | 'customer-obsession'
  | 'are-right-a-lot'
  | 'learn-and-be-curious'
  | 'hire-and-develop-the-best'
  | 'insist-on-the-highest-standards'
  | 'frugality'
  | 'have-backbone'
  | 'strive-earth-best-employer'
  | 'success-scale-broad-responsibility'

export interface LeadershipPrinciple {
  id: LeadershipPrincipleId
  name: string
  short: string
  topPriority: boolean
  description: string
  whyMatters?: string
  storyHints?: string
}

export interface StarSection {
  label: 'situation' | 'task' | 'action' | 'result' | 'learning'
  title: string
  content: string
  /** Approximate share of total talk time */
  timingPct?: number
}

export interface Story {
  id: string
  title: string
  company: string
  primaryLpIds: LeadershipPrincipleId[]
  /** Additional LPs this story supports in interview mapping */
  secondaryLpIds?: LeadershipPrincipleId[]
  sections: StarSection[]
  killerAmxl: string
  estimatedMinutes: number
  /** Original template snapshot for reset */
  templateFingerprint?: string
  /** Template / CV-based vs constructed scenario */
  storySource?: StorySource
  /** When true, show authenticity banner (still personalize before interviews) */
  isConstructed?: boolean
  /** Extra caution text for constructed templates */
  constructedNote?: string
  /** Set when user edits content from template */
  userEdited?: boolean
  /** For constructed stories: your real names, numbers, and specifics */
  constructedAdaptation?: string
}

export interface PracticeSession {
  id: string
  storyId: string
  at: string
  durationSec: number
  rating: 1 | 2 | 3 | 4 | 5
  notes?: string
}

export interface QuizQuestion {
  id: string
  section: string
  question: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
}

export interface QuizAttempt {
  id: string
  at: string
  mode: 'full' | 'section' | 'random10' | 'failed'
  score: number
  total: number
  bySection: Record<string, { correct: number; total: number }>
}

export interface ChecklistCategory {
  id: string
  title: string
  itemIds: string[]
}

export interface Note {
  id: string
  title: string
  body: string
  tags: string[]
  pinned: boolean
  updatedAt: string
}

export type InterviewerType = 'hm' | 'bar-raiser' | 'peer' | 'technical' | 'sr-leader'

export interface MockQuestion {
  id: string
  type: InterviewerType
  text: string
  tags?: string[]
}

export interface MockSessionAnswer {
  questionId: string
  rating: 1 | 2 | 3 | 4 | 5
  notes?: string
  secondsUsed: number
}

export interface MockSession {
  id: string
  at: string
  interviewerType: InterviewerType
  durationMin: 30 | 45 | 60
  difficulty: 'easy' | 'medium' | 'hard'
  answers: MockSessionAnswer[]
}
