import type { ReactNode } from 'react'
import { Heading, Text } from '../Typography'

interface ComponentShowcaseProps {
  title: string
  description: string
  children: ReactNode
}

export default function ComponentShowcase({
  title,
  description,
  children,
}: ComponentShowcaseProps) {
  return (
    <section className="text-left">
      <Heading as="h2" className="mb-1">{title}</Heading>
      <Text size="sm" className="text-[var(--color-text-muted)] mb-4">{description}</Text>
      <div className="border border-[var(--color-border)] rounded-lg px-4">
        {children}
      </div>
    </section>
  )
}
