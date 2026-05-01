export interface CityTier {
  tier: 1 | 2 | 3
  name: string
  metroPopM?: string
  notes?: string
}

export const JAPAN_CITY_TIERS: Record<1 | 2 | 3, CityTier[]> = {
  1: [
    {
      tier: 1,
      name: 'Tokyo–Yokohama',
      metroPopM: '~38M',
      notes: '~40% national AMXL volume; very high density; elevator constraints.',
    },
    {
      tier: 1,
      name: 'Osaka–Kobe–Kyoto',
      metroPopM: '~19M',
      notes: 'Extremely dense cores; strong partner availability.',
    },
    {
      tier: 1,
      name: 'Nagoya',
      metroPopM: '~10M',
      notes: 'Growing metro; strong infrastructure vs many Indian Tier-2 cities.',
    },
  ],
  2: [
    { tier: 2, name: 'Fukuoka–Kitakyushu', metroPopM: '~5.5M' },
    { tier: 2, name: 'Sapporo', metroPopM: '~2.7M', notes: 'Cold climate considerations.' },
    { tier: 2, name: 'Sendai', metroPopM: '~2.3M' },
    { tier: 2, name: 'Hiroshima', metroPopM: '~2.0M' },
    { tier: 2, name: 'Kobe', metroPopM: '~1.5M' },
    { tier: 2, name: 'Kyoto', metroPopM: '~1.5M', notes: 'Heritage preservation constraints.' },
    { tier: 2, name: 'Kawasaki', metroPopM: '~1.5M' },
  ],
  3: [
    {
      tier: 3,
      name: 'Regional centers (30+)',
      notes: '200k–1M population examples: Kanazawa, Niigata, Kumamoto.',
    },
  ],
}

export const INDIA_CITY_SUMMARY = {
  tier1: [
    'Mumbai (~25M)',
    'Delhi NCR (~32M)',
    'Bangalore (~13M)',
    'Hyderabad (~10M)',
    'Chennai (~11M)',
    'Kolkata (~15M)',
    'Pune (~7M)',
    'Ahmedabad (~8M)',
  ],
  tier2: ['50+ cities at 1–5M population (Jaipur, Chandigarh, Lucknow, Kochi, Indore, …)'],
  tier3: ['100+ cities at 100k–1M'],
}
