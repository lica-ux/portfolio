import { Link } from 'react-router-dom'

interface CasePageProps {
  slug: string
}

export default function CasePage({ slug: _slug }: CasePageProps) {
  return (
    <main className="min-h-[100svh] px-4 md:px-10 py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-base font-medium font-display focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)]"
        style={{ color: 'var(--color-hero-subtitle)' }}
      >
        ← Selected work
      </Link>
    </main>
  )
}
