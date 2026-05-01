import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useNotesStore } from '@/store/useNotesStore'

export function MyNotesPage() {
  const notes = useNotesStore((s) => s.notes)
  const addNote = useNotesStore((s) => s.addNote)
  const updateNote = useNotesStore((s) => s.updateNote)
  const deleteNote = useNotesStore((s) => s.deleteNote)
  const searchNotes = useNotesStore((s) => s.searchNotes)

  const [q, setQ] = useState('')
  const [sel, setSel] = useState<string | null>(null)
  const filtered = useMemo(() => searchNotes(q), [searchNotes, q, notes])

  const current = filtered.find((n) => n.id === sel) ?? filtered[0]

  return (
    <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle>Notes</CardTitle>
          <Button
            size="sm"
            onClick={() => {
              const n = addNote({ title: 'New note', body: '', tags: [], pinned: false })
              setSel(n.id)
            }}
          >
            New
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
          <ul className="max-h-[480px] space-y-1 overflow-y-auto">
            {filtered.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => setSel(n.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-card-hover ${n.id === current?.id ? 'bg-card-hover text-brand' : 'text-ink-muted'}`}
                >
                  {n.pinned && <span className="text-warn">📌 </span>}
                  {n.title}
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {current ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={current.title}
              onChange={(e) => updateNote(current.id, { title: e.target.value })}
            />
            <Textarea
              rows={12}
              value={current.body}
              onChange={(e) => updateNote(current.id, { body: e.target.value })}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={current.tags.join(', ')}
              onChange={(e) =>
                updateNote(current.id, {
                  tags: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
            <div className="flex flex-wrap gap-2">
              {current.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => updateNote(current.id, { pinned: !current.pinned })}>
                {current.pinned ? 'Unpin' : 'Pin'}
              </Button>
              <Button variant="danger" size="sm" onClick={() => deleteNote(current.id)}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center p-8 text-sm text-ink-muted">
            {notes.length === 0 ? 'Create your first note to capture reflections after mocks or interviews.' : 'No notes match your search.'}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
