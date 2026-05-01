import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const variants = cva('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'border-amazon-muted/40 bg-surface-2 text-ink-muted',
      success: 'border-success/40 bg-success/10 text-success',
      brand: 'border-brand/50 bg-brand/10 text-brand',
      warn: 'border-warn/40 bg-warn/10 text-warn',
      danger: 'border-danger/40 bg-danger/10 text-danger',
      purple: 'border-purple/40 bg-purple/10 text-purple',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof variants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(variants({ variant }), className)} {...props} />
}
