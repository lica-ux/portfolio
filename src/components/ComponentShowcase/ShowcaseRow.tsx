import type { ReactNode } from 'react'

interface ShowcaseRowProps {
  label: string
  children: ReactNode
}

export default function ShowcaseRow({ label, children }: ShowcaseRowProps) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[var(--color-border)] last:border-0">
      <span className="w-32 shrink-0 text-sm text-[var(--color-text-muted)] font-sans">
        {label}
      </span>
      <div className="flex items-center gap-3 flex-wrap">
        {children}
      </div>
    </div>
  )
}
