import type { ChecklistCategory } from '@/types'

export const CHECKLIST_BY_CATEGORY: ChecklistCategory[] = [
  {
    id: 'day-before',
    title: 'Day Before',
    itemIds: [
      'cb-lp-list',
      'cb-stories-8',
      'cb-tech-scenarios',
      'cb-linkedin',
      'cb-questions-prep',
      'cb-tech-test',
      'cb-outfit',
      'cb-resume-print',
      'cb-setup-supplies',
      'cb-sleep',
    ],
  },
  {
    id: 'morning-of',
    title: 'Morning of Interview',
    itemIds: [
      'cb-wake-early',
      'cb-breakfast',
      'cb-story-titles',
      'cb-exercise',
      'cb-shower-dress',
      'cb-why-amazon',
      'cb-tech-retest',
      'cb-bathroom',
      'cb-join-early',
      'cb-breathe',
    ],
  },
  {
    id: 'during',
    title: 'During Each Interview',
    itemIds: ['cb-open-strong', 'cb-listen', 'cb-pause', 'cb-star', 'cb-metrics', 'cb-time', 'cb-close'],
  },
  {
    id: 'after-each',
    title: 'After Each Interview',
    itemIds: ['cb-break', 'cb-jot-notes', 'cb-no-overthink', 'cb-reset', 'cb-breathe-smile'],
  },
  {
    id: 'within-4h',
    title: 'Within 4 Hours (All Done)',
    itemIds: ['cb-thank-recruiter'],
  },
  {
    id: 'within-24h',
    title: 'Within 24 Hours',
    itemIds: ['cb-thank-interviewers'],
  },
  {
    id: 'reflection',
    title: 'Then: Debrief',
    itemIds: [
      'cb-debrief-remember',
      'cb-debrief-asked',
      'cb-debrief-stories',
      'cb-debrief-good',
      'cb-debrief-improve',
      'cb-relax',
      'cb-followup-week',
    ],
  },
]

export const CHECKLIST_META: { id: string; label: string }[] = CHECKLIST_BY_CATEGORY.flatMap((c) =>
  c.itemIds.map((id) => ({ id, label: humanLabel(id) })),
)

function humanLabel(id: string): string {
  const map: Record<string, string> = {
    'cb-lp-list': 'Review all 16 LPs—can you list them?',
    'cb-stories-8': 'Practice 8 core STAR stories out loud',
    'cb-tech-scenarios': 'Review technical scenarios',
    'cb-linkedin': 'Research interviewers on LinkedIn (if names known)',
    'cb-questions-prep': 'Prepare 3–5 questions per interviewer type',
    'cb-tech-test': 'Test camera, mic, internet, lighting',
    'cb-outfit': 'Pick outfit (business casual minimum)',
    'cb-resume-print': 'Print 2 copies of resume',
    'cb-setup-supplies': 'Water, notepad, pen, charger ready',
    'cb-sleep': 'Sleep ≥ 8 hours',
    'cb-wake-early': 'Wake 2 hours early',
    'cb-breakfast': 'Protein + complex carbs breakfast',
    'cb-story-titles': 'Quick review: 8 story titles',
    'cb-exercise': 'Short walk or exercise',
    'cb-shower-dress': 'Shower and dress professionally',
    'cb-why-amazon': 'Review “Why Amazon? Why this role?”',
    'cb-tech-retest': 'Re-test tech setup',
    'cb-bathroom': 'Use bathroom before loop',
    'cb-join-early': 'Join meeting ~10 minutes early',
    'cb-breathe': 'Three deep breaths before start',
    'cb-open-strong': 'First 30s: smile, greet, enthusiasm',
    'cb-listen': 'Listen fully before answering',
    'cb-pause': 'Take ~5 seconds to think when needed',
    'cb-star': 'Use STAR structure',
    'cb-metrics': 'Include specific metrics',
    'cb-time': 'Watch time (2–3 min per story)',
    'cb-close': 'Close professionally + ask next steps',
    'cb-break': 'Take 2–5 minute break between rounds',
    'cb-jot-notes': 'Jot 1–2 quick notes after each',
    'cb-no-overthink': "Don't overthink—reset mentally",
    'cb-reset': 'Reset for next interviewer',
    'cb-breathe-smile': 'Breathe, smile, go again',
    'cb-thank-recruiter': 'Send thank-you email to recruiter',
    'cb-thank-interviewers': 'Brief, specific thank-yous to interviewers',
    'cb-debrief-remember': 'Write everything you remember',
    'cb-debrief-asked': 'Note questions they asked',
    'cb-debrief-stories': 'Note which stories you used',
    'cb-debrief-good': 'What went well?',
    'cb-debrief-improve': 'What would you improve?',
    'cb-relax': 'Relax—you did your best',
    'cb-followup-week': 'Follow up if no update in 5–7 business days',
  }
  return map[id] ?? id
}

export function checklistLabel(id: string): string {
  return humanLabel(id)
}
