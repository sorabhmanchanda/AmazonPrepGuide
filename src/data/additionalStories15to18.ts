import type { StarSection, Story } from '@/types'

const sec = (label: StarSection['label'], title: string, timingPct: number, content: string): StarSection => ({
  label,
  title,
  content,
  timingPct,
})

export const STORIES_15_TO_18: Story[] = [
  {
    id: 'story-15',
    title: 'Forecast Accuracy Standards at Flipkart Large',
    company: 'Flipkart Large',
    primaryLpIds: ['insist-on-the-highest-standards', 'are-right-a-lot'],
    secondaryLpIds: ['dive-deep', 'deliver-results'],
    storySource: 'constructed',
    isConstructed: true,
    constructedNote:
      'Constructed scenario aligned to realistic role scope—replace numbers and specifics with your true experience before using live in interviews.',
    estimatedMinutes: 2.75,
    killerAmxl:
      'Shows raising the bar on forecast accuracy—core to AMXL JP planning—and using milestones to make ambitious goals believable for the team.',
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"At Flipkart Large, monthly supply forecasts were directionally OK but inconsistent at route level. The team accepted about ±15% variance as 'good enough'—but downstream, procurement over- and under-stocked lanes. I believed our standard wasn't high enough."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"I challenged the team to target about ±5% accuracy at route level instead of ±15%. Many felt that was unrealistic at granular level."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"**Vision:** Showed cost of error—each ~1% accuracy improvement was roughly ₹15 lakh/month—making ±5% vs ±15% about ₹1.5 Cr/year meaningful.

**Diagnosis:** Six months of forecast vs actual—route seasonality missing, client promotions propagating slowly, stale truck-mix assumptions.

**Iterative pushes:** Month-by-month improvements (seasonality, promotion feed, refreshed truck mix, outlier route logic) stepping accuracy from ~±12% toward ~±5% over ~8 months.

**Governance:** Monthly accuracy reviews; persistent outliers investigated; forecast accuracy became a team OKR."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"Hit about ±5% route-level accuracy within ~8 months; procurement mismatch costs improved; estimated ~₹1.5 Cr/year from better capacity alignment; framework copied by other Flipkart units."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"High standards land when you show what's possible milestone by milestone—not only by demanding better."`,
      ),
    ],
  },
  {
    id: 'story-16',
    title: 'Vendor Strategy Decision at Flipkart Large',
    company: 'Flipkart Large',
    primaryLpIds: ['are-right-a-lot', 'have-backbone'],
    secondaryLpIds: ['dive-deep', 'earn-trust'],
    storySource: 'constructed',
    isConstructed: true,
    constructedNote:
      'Constructed scenario—swap in your real stakeholder names, numbers, and outcome before using as a live interview story.',
    estimatedMinutes: 2.75,
    killerAmxl:
      'Have Backbone; Disagree and Commit with data—exactly the judgment AMXL JP expects from a single-threaded owner on partner strategy.',
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"Leadership wanted to consolidate to three large national linehaul vendors for simplicity and leverage. Procurement strongly agreed. I believed regional diversity would yield better cost and resilience than a pure 'big three' model."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"I needed to align or make a compelling case for a regional-heavy hybrid instead of three nationals only."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"**Case (two weeks):** Lane-level performance showed regional specialists 8–12% cheaper on their lanes; single-vendor failure risk modeling; external benchmarks; hybrid of top 5 national + top 15 regional (~20 vendors) with savings vs three-vendor model.

**Disagree with respect:** 1:1 with VP with data, not opinions; acknowledged procurement's leverage argument; asked whether 20 vendors could still be operated well.

**Decision:** Hybrid ~17 vendors (5 national + 12 regional). I committed fully to execution—including parts I had debated.

**Execution:** Onboarded network with procurement; shifted volume within 24 hours when one vendor wobbled—no customer impact."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"~₹2.4 Cr/year better than the three-vendor projection; reduced single-vendor concentration risk; later vendor issue absorbed within 24 hours; strengthened credibility for future strategic debates."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"Backbone means prepared disagreement; Commitment after the call is what builds trust."`,
      ),
    ],
  },
  {
    id: 'story-17',
    title: 'Building & Developing the Planning Team',
    company: 'Delhivery / Shadowfax',
    primaryLpIds: ['hire-and-develop-the-best', 'earn-trust'],
    secondaryLpIds: ['ownership', 'think-big'],
    storySource: 'verified',
    estimatedMinutes: 2.75,
    killerAmxl:
      'Hire and Develop the Best with outcomes—important for L6 scope; also strengthens “Earth’s Best Employer” angle via development and retention (still complement with explicit inclusion/wellbeing examples if asked).',
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"Across Delhivery and Shadowfax I led teams of about six designers, planners, and analysts. Most were early-to-mid career and talented but needed development. Work—network design, optimization, supply planning—was complex, and I needed the unit to grow into senior contributors, not just executors."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"Beyond project delivery, I owned developing people—capabilities, career paths, and a high-performing team culture."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"**Stretch assignments:** Projects slightly beyond current skill—with safety nets and coaching (e.g., junior analyst owning vendor scorecard and first stakeholder presentations).

**Skill plans:** Tailored growth areas—communication, network design path, Python depth; weekly 1:1s split current work vs development; monthly skill shares.

**Career visibility:** Mapped next-level skills with HR; honest gap conversations.

**Recognition / feedback:** Public wins; private constructive feedback on gaps.

**Hard moments:** Two promotion pushes where readiness wasn't there—specific gaps and plans; one person frustrated then later thanked the directness."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"Within a year: two promotions to senior roles; ~40% more programs without headcount add; strong retention in a high-churn market; alumni now in senior planning roles elsewhere."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"Developing people is the highest-leverage work—4 hours coaching beats 1 hour doing, compounding over a year."`,
      ),
    ],
  },
  {
    id: 'story-18',
    title: 'Linehaul Network Revamp — SLA Improvement at Shadowfax',
    company: 'Shadowfax',
    primaryLpIds: ['frugality', 'deliver-results', 'customer-obsession'],
    secondaryLpIds: ['dive-deep', 'invent-and-simplify'],
    storySource: 'verified',
    estimatedMinutes: 2.75,
    killerAmxl:
      'Frugality + service: faster SLA without higher cost per order—exactly the dual mandate AMXL JP cares about.',
    sections: [
      sec(
        'situation',
        'Situation (~30s)',
        30,
        `"Linehaul had grown organically—national SLA ~5.4 days vs ~3.5–4 day benchmarks. Clients questioned speed. Leadership wanted SLA improvement without raising service cost per order."`,
      ),
      sec(
        'task',
        'Task (~15s)',
        15,
        `"Improve SLA without increasing cost per order—do more with the same envelope."`,
      ),
      sec(
        'action',
        'Action (~90s)',
        90,
        `"**Diagnostic:** Most SLA time was waiting (sort centers, connections)—not linehaul transit.

**Initiatives:** (1) Direct lanes for ~30 high O-D pairs removing unnecessary hub hops. (2) Connection synchronization—align inbound/outbound schedules at major hubs to cut 12–24h waits. (3) Selective rail on a few long lanes to free truck capacity for time-sensitive freight.

**Cost neutrality:** Each change cost-tested; e.g., direct lanes +₹3 lakh/month linehaul but −₹4 lakh/month consolidation handling—net neutral or better.

**Execution:** Corridor-by-corridor rollout with weekly SLA and cost monitoring and fast rollback if needed."`,
      ),
      sec(
        'result',
        'Result (~30s)',
        30,
        `"SLA improved 5.4 → 4.7 days (~13%) in ~8 months with ~flat service cost per order (slightly down ~1.2%). NPS +9; two clients reversed volume declines. Internal case study on 'frugal SLA improvement'."`,
      ),
      sec(
        'learning',
        'Learning',
        0,
        `"Constraints force creativity—60% of time was waiting waste. Small schedule sync beats adding trucks blindly."`,
      ),
    ],
  },
]
