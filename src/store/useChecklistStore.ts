import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CHECKLIST_BY_CATEGORY } from '@/data/checklistItems'

interface ChecklistState {
  checkedItems: string[]
  toggleItem: (id: string) => void
  resetCategory: (categoryId: string) => void
  getProgress: (categoryId: string) => number
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      checkedItems: [],

      toggleItem: (id) =>
        set((s) => ({
          checkedItems: s.checkedItems.includes(id)
            ? s.checkedItems.filter((x) => x !== id)
            : [...s.checkedItems, id],
        })),

      resetCategory: (categoryId) =>
        set((s) => {
          const cat = CHECKLIST_BY_CATEGORY.find((c) => c.id === categoryId)
          if (!cat) return s
          const remove = new Set(cat.itemIds)
          return { checkedItems: s.checkedItems.filter((x) => !remove.has(x)) }
        }),

      getProgress: (categoryId) => {
        const cat = CHECKLIST_BY_CATEGORY.find((c) => c.id === categoryId)
        if (!cat || cat.itemIds.length === 0) return 0
        const checked = get().checkedItems.filter((id) => cat.itemIds.includes(id)).length
        return checked / cat.itemIds.length
      },
    }),
    { name: 'amazon-l6-checklist' },
  ),
)
