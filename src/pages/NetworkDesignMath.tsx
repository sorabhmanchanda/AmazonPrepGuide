import { useMemo, useState } from 'react'
import { MarkdownSectionPage } from '@/pages/MarkdownSectionPage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'

export function NetworkDesignMathPage() {
  const [cost, setCost] = useState([40])
  const [service, setService] = useState([35])
  const cap = useMemo(() => {
    const c = cost[0] ?? 0
    const s = service[0] ?? 0
    const rest = Math.max(0, 100 - c - s)
    return { c, s, b: rest }
  }, [cost, service])

  return (
    <MarkdownSectionPage
      sectionNumber={9}
      sectionId="math"
      prepend={
        <div className="mb-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Interactive trade-off (illustrative weights)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-ink-muted">
              <p>Adjust emphasis on cost vs service; the remainder maps to “capacity / flexibility” for discussion practice.</p>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Cost weight</span>
                  <span>{cost[0]}%</span>
                </div>
                <Slider value={cost} min={10} max={70} step={5} onValueChange={setCost} />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Service weight</span>
                  <span>{service[0]}%</span>
                </div>
                <Slider value={service} min={10} max={70} step={5} onValueChange={setService} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Cost {cap.c}%</Badge>
                <Badge variant="success">Service {cap.s}%</Badge>
                <Badge variant="purple">Other {cap.b}%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    />
  )
}
