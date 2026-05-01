import type { InterviewerType, MockQuestion } from '@/types'

export const MOCK_QUESTION_BANK: MockQuestion[] = [
  {
    id: 'hm-1',
    type: 'hm',
    text: 'Walk me through your background and why AMXL JP now.',
    tags: ['introduction', 'motivation'],
  },
  {
    id: 'hm-2',
    type: 'hm',
    text: 'Tell me about your most complex cross-functional program.',
    tags: ['Deliver Results', 'Ownership'],
  },
  {
    id: 'hm-3',
    type: 'hm',
    text: 'How would you scale AMXL JP from 1,000 to 3,000 deliveries/day in 24 months?',
    tags: ['network planning', 'scenario'],
  },
  {
    id: 'br-1',
    type: 'bar-raiser',
    text: 'Tell me about a time you failed and what you learned.',
    tags: ['Learn and Be Curious'],
  },
  {
    id: 'br-2',
    type: 'bar-raiser',
    text: 'Describe earning trust with a skeptical stakeholder.',
    tags: ['Earn Trust'],
  },
  {
    id: 'br-3',
    type: 'bar-raiser',
    text: 'Tell me about a decision others disagreed with—how did you handle it?',
    tags: ['Have Backbone'],
  },
  {
    id: 'peer-1',
    type: 'peer',
    text: 'Two teams have conflicting priorities blocking your roadmap—what do you do?',
    tags: ['Earn Trust', 'Bias for Action'],
  },
  {
    id: 'peer-2',
    type: 'peer',
    text: 'How do you communicate the same plan to Ops vs Finance vs Product?',
    tags: ['communication'],
  },
  {
    id: 'tech-1',
    type: 'technical',
    text: 'Design a last-mile network for a new metro with mixed density.',
    tags: ['network design'],
  },
  {
    id: 'tech-2',
    type: 'technical',
    text: 'On-time dropped 3 points in Tokyo—how do you investigate?',
    tags: ['Dive Deep', 'metrics'],
  },
  {
    id: 'tech-3',
    type: 'technical',
    text: 'What metrics would you use to measure planning team success?',
    tags: ['metrics'],
  },
  {
    id: 'sr-1',
    type: 'sr-leader',
    text: 'Where do you see AMXL JP in three years and what is your role in that?',
    tags: ['Think Big'],
  },
]

export const QUESTIONS_TO_ASK: { id: string; type: InterviewerType; text: string }[] = [
  {
    id: 'ask-hm-1',
    type: 'hm',
    text: 'What does success look like in 6 months vs 12 months for this role?',
  },
  { id: 'ask-hm-2', type: 'hm', text: 'What are the top three network constraints AMXL JP faces today?' },
  { id: 'ask-br-1', type: 'bar-raiser', text: 'What do you look for in great Amazonians on this team?' },
  { id: 'ask-peer-1', type: 'peer', text: 'How does last-mile planning partner with your team week to week?' },
  {
    id: 'ask-tech-1',
    type: 'technical',
    text: 'What planning tools and data foundations are most mature vs emerging?',
  },
  {
    id: 'ask-sr-1',
    type: 'sr-leader',
    text: 'How does AMXL JP fit into the broader Asia heavy-bulky strategy?',
  },
]
