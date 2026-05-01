import type { Story } from '@/types'
import { INITIAL_STORIES } from '@/data/starStories.generated'
import { STORIES_11_TO_14 } from '@/data/additionalStories11to14'
import { STORIES_15_TO_18 } from '@/data/additionalStories15to18'

/** Canonical templates (generated CV stories + additional curated stories). */
export const ALL_STORY_TEMPLATES: Story[] = [
  ...INITIAL_STORIES.map((s) => ({
    ...s,
    storySource: (s.storySource ?? 'verified') as Story['storySource'],
  })),
  ...STORIES_11_TO_14,
  ...STORIES_15_TO_18,
]

export function getStoryTemplateById(id: string): Story | undefined {
  return ALL_STORY_TEMPLATES.find((s) => s.id === id)
}
