import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Note } from '@/types'

interface NotesState {
  notes: Note[]
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => Note
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  searchNotes: (query: string) => Note[]
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (note) => {
        const n: Note = {
          ...note,
          id: crypto.randomUUID(),
          updatedAt: new Date().toISOString(),
        }
        set((s) => ({ notes: [n, ...s.notes] }))
        return n
      },

      updateNote: (id, updates) =>
        set((s) => ({
          notes: s.notes.map((x) =>
            x.id === id ? { ...x, ...updates, updatedAt: new Date().toISOString() } : x,
          ),
        })),

      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((x) => x.id !== id) })),

      searchNotes: (query) => {
        const q = query.trim().toLowerCase()
        if (!q) return get().notes
        return get().notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.body.toLowerCase().includes(q) ||
            n.tags.some((t) => t.toLowerCase().includes(q)),
        )
      },
    }),
    { name: 'amazon-l6-notes' },
  ),
)
