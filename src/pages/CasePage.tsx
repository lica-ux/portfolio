import { Link } from 'react-router-dom'
import ChevronLeft from '../icons/chevron_left.svg?react'
import CaseHero from '../components/CaseHero'
import CaseIntro from '../components/CaseIntro'
import gradientImage from '../images/gradient.webp'

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
        tags={['Health', 'Behaviour design']}
        headline={"Turning around a declining health app.\nFrom 200 to 50 000 users and a company acquisition"}
        metaLines={[
          'Client: Baricol / FitForMe',
          'Role: Sole designer',
          'Year: 2021 - 2024',
          'Result: 50 000 active users & acquisition',
        ]}
      />

      <section
        className="relative flex flex-col justify-center gap-6 py-24 md:py-48 -mx-4 md:-mx-10 px-4 md:px-10 min-h-[100svh]"
        style={{ backgroundColor: '#FFE8DB' }}
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            alt=""
            src={gradientImage}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </div>
        <p
          className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px] whitespace-pre-line"
          style={{ color: 'var(--color-hero-subtitle)' }}
        >
          Baricol makes supplements for people who've had gastric bypass surgery. After the procedure, the body absorbs certain vitamins and minerals significantly worse, meaning patients need to supplement every day for the rest of their lives.{'\n'}They had an app, but it had started life as a general journal with no daily behaviour to anchor it. Users downloaded it, came back a few times, and disappeared. They came to us to understand why.
        </p>
      </section>
    </main>
  )
}
