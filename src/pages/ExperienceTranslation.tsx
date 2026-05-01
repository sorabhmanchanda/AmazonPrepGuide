import { useState } from 'react'
import { MarkdownSectionPage } from '@/pages/MarkdownSectionPage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { COMPANY_COMPARISONS, JAPANESE_GLOSSARY } from '@/data/companyComparisons'
import { Input } from '@/components/ui/input'

export function ExperienceTranslationPage() {
  const [open, setOpen] = useState<string | null>(COMPANY_COMPARISONS[0]?.id ?? null)
  const [glossQ, setGlossQ] = useState('')

  const filteredGloss = JAPANESE_GLOSSARY.filter(
    (g) =>
      !glossQ.trim() ||
      g.term.toLowerCase().includes(glossQ.toLowerCase()) ||
      g.meaning.toLowerCase().includes(glossQ.toLowerCase()),
  )

  return (
    <MarkdownSectionPage
      sectionNumber={10}
      sectionId="translation"
      prepend={
        <div className="mb-8 space-y-6">
          <div>
            <h3 className="mb-3 font-serif text-xl text-ink">Company comparison cards</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {COMPANY_COMPARISONS.map((c) => (
                <Card key={c.id} className="cursor-pointer" onClick={() => setOpen(open === c.id ? null : c.id)}>
                  <CardHeader>
                    <CardTitle className="text-base">{c.indian}</CardTitle>
                    <p className="text-xs text-ink-faint">{c.tagline}</p>
                  </CardHeader>
                  <CardContent className="text-sm text-ink-muted">
                    {open === c.id ? (
                      <>
                        <p className="mb-2 font-medium text-ink">Japanese parallels</p>
                        <ul className="mb-2 list-disc pl-4">
                          {c.japaneseEquivalents.map((j) => (
                            <li key={j}>{j}</li>
                          ))}
                        </ul>
                        <p>{c.script}</p>
                      </>
                    ) : (
                      <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); setOpen(c.id); }}>
                        Expand
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-serif text-xl text-ink">Japanese glossary</h3>
            <Input className="mb-3 max-w-md" placeholder="Filter…" value={glossQ} onChange={(e) => setGlossQ(e.target.value)} />
            <ul className="space-y-2 text-sm text-ink-muted">
              {filteredGloss.map((g) => (
                <li key={g.term} className="rounded-lg border border-amazon-muted/30 bg-card px-3 py-2">
                  <strong className="text-ink">{g.term}</strong>
                  {g.reading && <span className="text-ink-faint"> · {g.reading}</span>}
                  <div>{g.meaning}</div>
                  <div className="text-xs text-warn">When: {g.when}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  )
}
