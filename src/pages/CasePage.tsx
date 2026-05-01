import { Link } from 'react-router-dom'
import ChevronLeft from '../icons/chevron_left.svg?react'
import CaseHero from '../components/CaseHero'
import CaseIntro from '../components/CaseIntro'
import RevealImage from '../components/RevealImage'
import gradientImage from '../images/gradient.webp'

// TODO: replace with local .webp images per case
const placeholderImage = 'https://www.figma.com/api/mcp/asset/71cd43ec-3dfb-420e-90fd-11aedaa8f51c'

interface CasePageProps {
  slug: string
}

export default function CasePage({ slug: _slug }: CasePageProps) {
  return (
    <main className="min-h-[100svh] px-4 md:px-10 pt-6 flex flex-col">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-base font-medium font-display focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)] pb-6"
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
          Baricol makes supplements for people who've had gastric bypass surgery. After the procedure, the body absorbs certain vitamins and minerals significantly worse, meaning patients need to supplement every day for the rest of their lives.{'\n\n'}They had an app, but it had started life as a general journal with no daily behaviour to anchor it. Users downloaded it, came back a few times, and disappeared. They came to us to understand why.
        </p>
      </section>

      <section className="flex flex-col md:flex-row -mx-4 md:-mx-10 p-4 md:p-10 pb-12 md:min-h-[100svh] gap-6 md:gap-10">
        {/* Image */}
        <div className="relative w-full h-[56vw] md:h-auto md:flex-1 rounded-[2px] overflow-hidden z-10">
          <RevealImage
            src={placeholderImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="md:flex-1 flex flex-col gap-4 md:justify-center">
          <h2
            className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]"
            style={{ color: 'var(--color-nav-text)' }}
          >
            Starting with the people who left
          </h2>
          <p
            className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            The most useful conversations were with users who had already stopped. What came back wasn't a list of missing features. It was a motivation problem. There was no compelling reason to open the app tomorrow if you'd already opened it today.{'\n\n'}The real design challenge wasn't functionality. It was making a daily health behaviour feel worth maintaining.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse -mx-4 md:-mx-10 p-4 md:p-10 pb-12 md:min-h-[100svh] gap-6 md:gap-10">
        {/* Image */}
        <div className="relative w-full h-[56vw] md:h-auto md:flex-1 rounded-[2px] overflow-hidden z-10">
          <RevealImage
            src={placeholderImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="md:flex-1 flex flex-col gap-4 md:justify-center">
          <h2
            className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]"
            style={{ color: 'var(--color-nav-text)' }}
          >
            Designing for the actual user, not the clinical default
          </h2>
          <p
            className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            The core audience was women over 40 recovering from a major medical procedure. The obvious direction would have been clean and clinical. I went the other way — warm, inviting, and built for someone who deserved an experience that felt genuinely on their side. User feedback confirmed it landed.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row -mx-4 md:-mx-10 p-4 md:p-10 pb-12 md:min-h-[100svh] gap-6 md:gap-10">
        {/* Image */}
        <div className="relative w-full h-[56vw] md:h-auto md:flex-1 rounded-[2px] overflow-hidden z-10">
          <RevealImage
            src={placeholderImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="md:flex-1 flex flex-col gap-4 md:justify-center">
          <h2
            className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]"
            style={{ color: 'var(--color-nav-text)' }}
          >
            Building the habit loop
          </h2>
          <p
            className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            I designed the product around one non-negotiable behaviour: logging supplements daily. Completing that action unlocks relevant content. Missing it triggers a gentle end-of-day reminder.{'\n\n'}On top of that I added weight tracking, a post-op food journey with doctor-approved recipes, and social challenges tied to goals users already had from their doctors. The challenges addressed something users told us directly: they wanted to feel less alone in this.
          </p>
        </div>
      </section>
    </main>
  )
}
