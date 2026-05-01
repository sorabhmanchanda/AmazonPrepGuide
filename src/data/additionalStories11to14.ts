import type { StarSection, Story } from '@/types'

const sec = (label: StarSection['label'], title: string, timingPct: number, content: string): StarSection => ({
  label,
  title,
  content,
  timingPct,
})

export const STORIES_11_TO_14: Story[] = [
  {
    id: 'story-11',
    title: 'Owned End-to-End Ecom Network Planning at Shadowfax',
    company: 'Shadowfax',
    primaryLpIds: ['ownership', 'think-big', 'deliver-results'],
    secondaryLpIds: ['dive-deep', 'bias-for-action'],
    storySource: 'verified',
    estimatedMinutes: 2.75,
    killerAmxl:
      "Maps to owning mid-to-long-term last mile network planning and roadmaps balancing productivity, cost, and operational excellence—national e-com scope comparable to AMXL JP's planning surface.",
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"At Shadowfax, the e-commerce delivery network was experiencing rapid growth but lacked unified planning. National, zonal, local, Same-Day Delivery (SDD), and Next-Day Delivery (NDD) operations were being managed in silos. There was no scalable supply planning model—decisions were reactive rather than strategic. As we onboarded more clients, this became unsustainable."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"As Senior Planning Manager, I was given end-to-end ownership of the entire e-commerce network planning and design—covering national, zonal, local, SDD, and NDD operations. I needed to build scalable supply planning and forecasting models, plus drive warehouse, middle-mile, and last-mile expansion based on volume projections."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"This was the broadest scope I'd ever owned.

**Building the Foundation (Months 1-2):** I mapped the entire network end-to-end—every FC, sortation center, delivery hub, and lane. Created a single source of truth dashboard that hadn't existed before. Identified that we had no integrated forecasting—each region planned independently, often with conflicting assumptions.

**Forecasting Model (Months 2-4):** Built a unified forecasting model in Python for client-level demand (top 20 clients = 80% of volume), service tier breakdown (SDD vs NDD vs standard), geographic granularity to pin code, seasonality, and periodic refresh (monthly base + weekly adjustments).

**Network Expansion Planning (Months 3-6):** For each region, projected 6-month volumes against current capacity—warehouses, middle-mile lanes, last-mile hubs. Built a phased expansion roadmap prioritized by utilization risk and client commitments.

**Cross-functional execution:** Worked with ops for ground truth, finance for budgets, tech for integration, and weekly regional reviews.

**Governance:** Monthly S&OP cadence, plan-vs-actual tracking, escalation for capacity breaches."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"Within 6 months: forecast accuracy improved from ~70% to 88%. Capacity issues surfaced 4–6 weeks earlier vs reactive firefighting. Launched 8 new delivery hubs and 3 new middle-mile cross-docks aligned to growth. Onboarded 2.5 lakh additional monthly orders without service degradation. Linehaul CPS held at ₹4.3. Unified planning became the standard operating model."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"Owning broad scope means finding the highest-leverage levers—forecast accuracy and capacity-volume alignment. Cross-functional alignment took more time than spreadsheets."`,
      ),
    ],
  },
  {
    id: 'story-12',
    title: 'Owned Flipkart Large & Bulky Supply Chain End-to-End',
    company: 'Flipkart Large',
    primaryLpIds: ['ownership', 'deliver-results', 'think-big'],
    secondaryLpIds: ['dive-deep', 'invent-and-simplify'],
    storySource: 'verified',
    estimatedMinutes: 2.75,
    killerAmxl:
      "Closest analog to AMXL JP on your CV: heavy/bulky, single-threaded ownership, network + linehaul design, capacity, and serviceability expansion—skills transfer 1:1 into Japan's context.",
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"At Flipkart Large and Bulky, I was the single-threaded owner for the entire supply chain—Network Design and Linehaul Design for ACs, refrigerators, TVs, washing machines, and other large appliances. The business was growing fast with seasonality spikes, but optimization was siloed—linehaul vs last-mile without an integrated view."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"I owned end-to-end accountability: monthly vehicle plan forecasting, periodic network optimization, and long- and short-term planning of middle-mile FCs and last-mile hubs—balancing utilization (storage and grid), volume projections, and serviceability expansion."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"Three pillars:

**Integrated forecasting:** Monthly vehicle plans with CPS, truck count, and CFT per shipment at route level—1-month operational, 3-month tactical, 12-month strategic horizons feeding procurement and ops.

**Periodic network optimization:** Quarterly cycles on 3 months of flow, suboptimal routing, VRP-backed alternatives, controlled rollouts—e.g. adding 2 hops on certain routes to consolidate partials for ~₹40 lakh/month on those routes.

**FC and hub expansion:** Long-term (6–18 months) volume by serviceability area, saturation points, new FCs/hubs/lanes; short-term (1–6 weeks) utilization hotspots and tactical temp capacity.

**Cross-functional ownership:** Procurement, ops, tech, finance, product—with monthly VP-level reviews."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"12% CPS reduction (₹112 → ₹99) in one year—₹4.8 Cr/month (~₹57.6 Cr/year). 94%+ on-time maintained. Expanded serviceability to 50+ new pin codes. Network utilization improved 68% → 81%. Approach became a template for other Flipkart business units."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"Single-threaded ownership forces trade-offs only you can make—linehaul wants capacity, last-mile wants smaller hubs, finance wants cost. I used customer experience as the tiebreaker."`,
      ),
    ],
  },
  {
    id: 'story-13',
    title: 'Diwali Peak Sale Season Capacity Build-out at Shadowfax',
    company: 'Shadowfax',
    primaryLpIds: ['bias-for-action', 'ownership', 'think-big'],
    secondaryLpIds: ['deliver-results', 'dive-deep'],
    storySource: 'verified',
    estimatedMinutes: 2.75,
    killerAmxl:
      'Bias for Action with strategic ownership during peak—directly relevant to Prime Day-style surges and committing capacity ahead of imperfect information.',
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"Peak sale season (Big Billion Days / Great Indian Festival) drove ~3x volume in 6 weeks. Five strategic clients (~70% of peak volume) had locked commitments, but network capacity wasn't ready—risk of turning away volume or failing execution."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"I had to drive warehouse, middle-mile, and last-mile expansion from projected peak volumes on very tight timelines—act now or face peak disaster."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"**Week 1 – Rapid diagnostic:** Client projections vs internal forecast; ~40% national capacity gap localized to Bangalore, Hyderabad, Pune, Delhi.

**Week 2 – Commitment:** Phased build—4 new middle-mile cross-docks (Surat, Lucknow, Indore, Coimbatore), 12 new last-mile hubs in stress markets, +30% linehaul capacity via contracts. 12 weeks to peak; ₹40 lakh setup with ~₹2 Cr projected peak savings. Accepted risk of 20% lower volume = short idle post-peak vs client churn.

**Weeks 3–10:** Parallel hub setup, vendors, partners; 10+ hour days; daily go/no-go.

**Weeks 11–12:** Mock peak at 1.5x; fixed two cross-dock issues before live peak.

**Peak:** Daily war room, real-time dashboards; labor strike at a key cross-dock in week 14—backup plan live within 12 hours."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"Navigated peak: ad-hoc costs −18% vs prior year; CPS within ~8% of normal vs historical 25% spike; 95% on-time in peak weeks; strategic clients renewed with more volume; Mr. Dependable Award; 'commit early, build ahead' became standard."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"Bias for action means moving at ~70% information, not 100%. Pre-commitments from clients made the investment case clearer."`,
      ),
    ],
  },
  {
    id: 'story-14',
    title: 'Crisis Recovery & Strategic Partnership with Porter',
    company: 'Shadowfax',
    primaryLpIds: ['customer-obsession', 'bias-for-action', 'ownership'],
    secondaryLpIds: ['earn-trust', 'invent-and-simplify'],
    storySource: 'verified',
    estimatedMinutes: 2.75,
    killerAmxl:
      'Bar Raiser–friendly bundle: Customer Obsession (personal spend to protect SLAs), Bias for Action (hours), Ownership beyond process, Invent and Simplify (failover model), Earn Trust with a new partner.',
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"I was managing the SDD network. Three new strategic clients had big volume potential, but hubs escalated: riders not showing despite incentives. SDD had a strict 6–9pm window—misses meant SLA breaches climbing daily."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"On a critical day, three Bangalore hubs called: riders hadn't shown; shipments had to move within hours to protect customer promises."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"**Hour 1:** With no time for formal POs, I personally booked Porter as a pilot, coordinated with shift managers, and used my own money for immediate charges to move shipments inside the SDD window.

**That evening:** Recognized systemic rider no-shows (~5–8% of slots). Built a one-pager: yesterday's crisis, estimated breach cost, and a structural backup.

**Next morning:** Pitched leadership for a Porter partnership with committed volume pricing.

**4 weeks:** Negotiated partnership, integrations, auto-trigger when riders no-show.

**Reimbursement:** Expensed the personal outlay; bigger win was fixing process so heroics weren't the default."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"Porter became strategic backup across SDD. No-show slot breaches dropped from ~5–8% to under 1%. The three escalating clients expanded long-term. Estimated ₹15–20 lakh/month penalty avoidance; auto-failover became standard."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"Customer obsession can mean breaking process once—then immediately harden the process so you don't rely on heroics."`,
      ),
    ],
  },
]
