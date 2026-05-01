import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-2', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand to-success transition-all duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  )
}

export function ProgressLabel({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-1 flex justify-between text-xs text-ink-muted', className)}>{children}</div>
}
