import { useMemo } from 'react'
import { MarkdownSectionPage } from '@/pages/MarkdownSectionPage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const STATS = [
  { name: 'Urban %', Japan: 92, India: 35 },
  { name: 'Top-3 demand %', Japan: 60, India: 45 },
]

export function JapanVsIndiaPage() {
  const chart = useMemo(() => STATS, [])
  return (
    <MarkdownSectionPage
      sectionNumber={8}
      sectionId="japan"
      prepend={
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick comparison (from your guide)</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#37475A" />
                  <XAxis dataKey="name" stroke="#9aa0a6" />
                  <YAxis stroke="#9aa0a6" />
                  <Tooltip contentStyle={{ background: '#1a2332', border: '1px solid #37475A' }} />
                  <Legend />
                  <Bar dataKey="Japan" fill="#FF9900" />
                  <Bar dataKey="India" fill="#4da3ff" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      }
    />
  )
}
