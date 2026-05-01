export interface CompanyCard {
  id: string
  indian: string
  tagline: string
  japaneseEquivalents: string[]
  script: string
}

export const COMPANY_COMPARISONS: CompanyCard[] = [
  {
    id: 'shadowfax',
    indian: 'Shadowfax',
    tagline: 'On-demand logistics & hyperlocal delivery at scale.',
    japaneseEquivalents: ['Yamato Transport', 'Sagawa Express', 'Demae-can'],
    script:
      'Shadowfax is similar to Yamato Transport meets Uber Eats in India—asset-light, tech-enabled last mile for e-commerce and food.',
  },
  {
    id: 'delhivery',
    indian: 'Delhivery',
    tagline: 'India’s largest integrated logistics company.',
    japaneseEquivalents: ['Yamato Transport', 'Sagawa Express', 'Japan Post', 'Seino Holdings'],
    script:
      'Delhivery is India’s equivalent to Yamato or Japan Post for e-commerce logistics—end-to-end network with owned assets.',
  },
  {
    id: 'flipkart',
    indian: 'Flipkart',
    tagline: 'India’s largest homegrown e-commerce (Walmart-owned).',
    japaneseEquivalents: ['Rakuten', 'Amazon Japan', 'Yahoo! Shopping', 'Mercari'],
    script:
      'Flipkart is India’s Rakuten—largest homegrown e-commerce and Amazon India’s primary competitor.',
  },
  {
    id: 'flipkart-large',
    indian: 'Flipkart Large',
    tagline: 'Heavy/bulky business unit—India’s AMXL analog.',
    japaneseEquivalents: ['AMXL JP', 'Nitori delivery', 'IKEA Japan', 'Bic Camera / Yamada Denki'],
    script:
      'Flipkart Large is essentially India’s AMXL—2-person teams, installation, large appliances.',
  },
  {
    id: 'flipkart-minutes',
    indian: 'Flipkart Minutes',
    tagline: 'Quick commerce (10–15 minute) darkstore network.',
    japaneseEquivalents: ['Uber Eats model', 'Quick-commerce players'],
    script:
      'Flipkart Minutes is quick-commerce from darkstores—different from AMXL but strong on tools and optimization.',
  },
]

export const JAPANESE_GLOSSARY: {
  term: string
  reading?: string
  meaning: string
  when: string
}[] = [
  {
    term: 'Yamato Transport',
    reading: 'ヤマト運輸 / Kuroneko',
    meaning: '#1 parcel player; reliability benchmark.',
    when: 'Explaining Delhivery / national network quality.',
  },
  {
    term: 'Rakuten',
    reading: '楽天市場',
    meaning: 'Major marketplace ecosystem.',
    when: 'Positioning Flipkart vs local e-commerce context.',
  },
  {
    term: 'Nitori',
    reading: 'ニトリ',
    meaning: 'Large furniture retailer with its own delivery footprint.',
    when: 'Discussing AMXL competition and service expectations.',
  },
]
