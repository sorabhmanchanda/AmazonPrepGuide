import { useUIStore } from '@/store/useUIStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const rows = [
  ['Open search', 'Ctrl / ⌘ + K'],
  ['Close dialogs', 'Esc'],
  ['Shortcuts help', '?'],
]

export function ShortcutsModal() {
  const open = useUIStore((s) => s.shortcutsOpen)
  const setOpen = useUIStore((s) => s.setShortcutsOpen)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
        </DialogHeader>
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([a, b]) => (
              <tr key={a} className="border-b border-amazon-muted/20">
                <td className="py-2 text-ink">{a}</td>
                <td className="py-2 text-right font-mono text-brand">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  )
}
