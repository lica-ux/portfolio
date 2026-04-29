import { Link } from 'react-router-dom'
import ChevronLeft from '../icons/chevron_left.svg?react'
import CaseHero from '../components/CaseHero'
import CaseIntro from '../components/CaseIntro'

// TODO: replace with local .webp images per case
const placeholderImage = 'https://www.figma.com/api/mcp/asset/71cd43ec-3dfb-420e-90fd-11aedaa8f51c'

interface CasePageProps {
  slug: string
}

export default function CasePage({ slug: _slug }: CasePageProps) {
  return (
    <main className="min-h-[100svh] px-4 md:px-10 py-6 flex flex-col gap-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-base font-medium font-display focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)]"
        style={{ color: 'var(--color-hero-subtitle)' }}
      >
        <ChevronLeft width={20} height={20} className="[&_path]:fill-[currentColor]" aria-hidden="true" />
        Home
      </Link>
      <CaseHero imageSrc={placeholderImage} imageAlt="" />
      <CaseIntro
        title="Baribuddy"
        tags={['UX', 'UI']}
        headline="Turning around a declining health app from 200 to 50 000 users"
        metaLines={[
          'Client: Baricol / FitForMe',
          'Role: Sole designer - UX & UI',
          'Year: 2021 - 2024',
          'Result: 50 000 active users & acquisition',
        ]}
      />
    </main>
  )
}
