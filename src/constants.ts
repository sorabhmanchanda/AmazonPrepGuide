/** Canonical interview day for countdown and “today’s focus” scheduling. */
export const INTERVIEW_DATE_ISO = '2026-05-08'

export type SectionKind = 'markdown' | 'leadership' | 'stories' | 'quiz' | 'checklist'

export const SECTIONS = [
  { id: 'profile', path: '/profile-analysis', number: 1, title: 'Profile Analysis', short: 'Profile', kind: 'markdown' as const },
  { id: 'lps', path: '/leadership-principles', number: 2, title: 'Leadership Principles', short: 'LPs', kind: 'leadership' as const },
  {
    id: 'stories',
    path: '/star-stories',
    number: 3,
    title: 'STAR Stories (18)',
    short: 'Stories',
    kind: 'stories' as const,
  },
  { id: 'tools', path: '/tools-systems', number: 4, title: 'Tools & Systems', short: 'Tools', kind: 'markdown' as const },
  { id: 'planning', path: '/network-planning', number: 5, title: 'Network Planning', short: 'Planning', kind: 'markdown' as const },
  { id: 'optimization', path: '/network-optimization', number: 6, title: 'Network Optimization', short: 'Optimize', kind: 'markdown' as const },
  { id: 'strategy', path: '/business-strategy', number: 7, title: 'Business Strategy', short: 'Strategy', kind: 'markdown' as const },
  { id: 'japan', path: '/japan-vs-india', number: 8, title: 'Japan vs India', short: 'Japan', kind: 'markdown' as const },
  { id: 'math', path: '/network-design-math', number: 9, title: 'Network Design Math', short: 'Math', kind: 'markdown' as const },
  { id: 'translation', path: '/experience-translation', number: 10, title: 'Experience Translation', short: 'Translate', kind: 'markdown' as const },
  { id: 'english', path: '/english-communication', number: 11, title: 'English Communication', short: 'English', kind: 'markdown' as const },
  { id: 'playbook', path: '/interview-playbook', number: 12, title: 'Interview Playbook', short: 'Playbook', kind: 'markdown' as const },
  { id: 'quiz', path: '/practice-quiz', number: 13, title: 'Practice Quiz', short: 'Quiz', kind: 'quiz' as const },
  { id: 'checklist', path: '/final-checklist', number: 14, title: 'Final Checklist', short: '48h', kind: 'checklist' as const },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const BONUS_ROUTES = [
  { id: 'mock', path: '/mock-interview', title: 'Mock Interview', short: 'Mock' },
  { id: 'notes', path: '/my-notes', title: 'My Notes', short: 'Notes' },
] as const
