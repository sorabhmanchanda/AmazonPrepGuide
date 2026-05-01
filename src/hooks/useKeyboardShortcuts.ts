import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '@/store/useUIStore'
import { SECTIONS } from '@/constants'

export function useKeyboardShortcuts() {
  const navigate = useNavigate()
  const setSearchOpen = useUIStore((s) => s.setSearchOpen)
  const setShortcutsOpen = useUIStore((s) => s.setShortcutsOpen)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      const typing =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setShortcutsOpen(false)
      }
      if (e.key === '?' && !mod && !typing) {
        e.preventDefault()
        setShortcutsOpen(true)
      }
      if (!mod && !typing && e.key >= '1' && e.key <= '9') {
        const n = Number(e.key)
        const sec = SECTIONS[n - 1]
        if (sec) {
          e.preventDefault()
          navigate(sec.path)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, setSearchOpen, setShortcutsOpen])
}
