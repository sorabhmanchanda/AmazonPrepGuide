import type { Story } from '@/types'

function fullText(st: Story): string {
  return st.sections.map((s) => s.content).join(' ')
}

/** Heuristic 0–100 “story strength” for prep (not a judgment of truth). */
export function computeStoryStrength(st: Story): { score: number; breakdown: string[] } {
  const text = fullText(st)
  const words = text.split(/\s+/).filter(Boolean)
  const lpCount = st.primaryLpIds.length + (st.secondaryLpIds?.length ?? 0)
  const digits = (text.match(/\d/g) ?? []).length
  const collab = /\b(worked with|partnered with|cross-functional|procurement|product|finance|ops|leadership)\b/gi.test(
    text,
  )
  const iCount = (text.match(/\bI\b/g) ?? []).length
  const weCount = (text.match(/\bwe\b/gi) ?? []).length
  const ratio = weCount > 0 ? iCount / weCount : iCount > 0 ? 2 : 0

  let score = 0
  const breakdown: string[] = []
  score += Math.min(25, lpCount * 5)
  breakdown.push(`LP tags (primary+secondary): +${Math.min(25, lpCount * 5)}`)

  score += Math.min(25, Math.floor(digits / 3))
  breakdown.push(`Quantified digits in narrative: +${Math.min(25, Math.floor(digits / 3))}`)

  score += collab ? 15 : 0
  breakdown.push(collab ? 'Cross-functional signals: +15' : 'Cross-functional signals: +0')

  const ratioPts = Math.min(20, Math.round(ratio * 8))
  score += ratioPts
  breakdown.push(`“I” vs “we” balance (interview voice): +${ratioPts}`)

  score += Math.min(15, Math.floor(words.length / 80))
  breakdown.push(`Length / substance (capped): +${Math.min(15, Math.floor(words.length / 80))}`)

  if (st.isConstructed) {
    score = Math.min(score, 72)
    breakdown.push('Constructed template: capped at 72 until personalized')
  }

  return { score: Math.min(100, Math.round(score)), breakdown }
}
