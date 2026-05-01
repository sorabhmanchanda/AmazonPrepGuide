import type { LeadershipPrincipleId, Story } from '@/types'

/** Primary = 1, secondary = 0.5 toward LP coverage strength */
export function lpWeightedScore(stories: Story[], lpId: LeadershipPrincipleId): number {
  let w = 0
  for (const st of stories) {
    if (st.primaryLpIds.includes(lpId)) w += 1
    else if (st.secondaryLpIds?.includes(lpId)) w += 0.5
  }
  return Math.round(w * 10) / 10
}

/** How many stories tag this LP (primary or secondary) */
export function lpStoryCount(stories: Story[], lpId: LeadershipPrincipleId): number {
  return stories.filter((st) => st.primaryLpIds.includes(lpId) || st.secondaryLpIds?.includes(lpId)).length
}

export function coverageTier(w: number): 'strong' | 'adequate' | 'weak' | 'gap' {
  if (w >= 4) return 'strong'
  if (w >= 2) return 'adequate'
  if (w >= 0.5) return 'weak'
  return 'gap'
}
