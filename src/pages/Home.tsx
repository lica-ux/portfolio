import StatsSection from '../components/StatsSection/StatsSection'
import SelectedWork from '../components/SelectedWork'
import MoreWork from '../components/MoreWork'
import AboutMe from '../components/AboutMe'
import Footer from '../components/Footer'
import RevealImage from '../components/RevealImage'
import statsImage from '../images/DSC03053-Enhanced-NR (1).webp'
import gradientImage from '../images/gradient.webp'

// TODO: replace with local .webp image (max 2080×2080px, max 940kb)
const heroImage = 'https://www.figma.com/api/mcp/asset/7b5bc51c-a56f-4c04-99d2-b68011959e2f'
const aboutTexture = 'https://www.figma.com/api/mcp/asset/becf3c32-1203-42b8-8ad0-873d63b0d5a6'

export default function Home() {
  return (
    <main>

      {/* Hero */}
      <section
        id="hero"
        className="md:snap-start md:snap-always flex flex-col md:flex-row gap-6 md:gap-8 pt-16 md:pt-[104px] pb-32 md:pb-[104px] px-4 md:px-10 min-h-screen md:min-h-[calc(100svh+64px)]"
      >
        <div className="flex flex-col gap-2 md:flex-1 min-w-0 md:pb-6 md:justify-end">
          <p
            className="text-[18px] md:text-[40px] leading-[1.1] font-normal"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            Hi, I'm Lisa.
          </p>
          <h1
            className="text-[48px] md:text-[88px] font-medium leading-none tracking-[-0.02em] w-full"
            style={{
              color: 'var(--color-nav-text)',
              fontFamily: 'var(--font-display)',
            }}
          >
            I turn complex problems into real products.
          </h1>
        </div>
        <div className="flex-1 w-full md:flex-1 md:h-auto md:w-auto md:min-w-0 relative rounded-[2px] overflow-hidden">
          <RevealImage
            src={statsImage}
            alt="Lisa Caspersson working at her desk"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          />
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="snap-start snap-always relative flex flex-col justify-center gap-6 py-24 md:py-48 px-4 md:px-10 min-h-[100svh]"
        style={{ backgroundColor: '#FFE8DB' }}
      >
        {/* Background gradient */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            alt=""
            src={gradientImage}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Content */}
        <p
          className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px]"
          style={{ color: 'var(--color-hero-subtitle)' }}
        >
          With 6+ years at the same agency, I've grown from UX designer to leading both projects
          and people. I work across mobile, web, and connected hardware, and I'm most at home when
          the problem is messy and the solution needs to be simple.
        </p>

        <a
          href="#work"
          className="relative self-start inline-flex items-center justify-center px-4 py-3 rounded-full border whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            borderColor: 'var(--color-nav-text)',
            color: 'var(--color-nav-text)',
            fontFamily: 'var(--font-display)',
          }}
        >
          <span className="text-[20px] md:text-2xl font-medium leading-[1.1]">View my work</span>
        </a>
      </section>

      {/* Stats */}
      <StatsSection
        imageSrc={statsImage}
        imageAlt="Lisa Caspersson working at her desk"
      />

      {/* Selected work */}
      <SelectedWork />

      {/* More work */}
      <MoreWork />

      {/* About me */}
      <AboutMe />

      {/* Stats (copy) */}
      <StatsSection
        id="stats-2"
        imageSrc={statsImage}
        imageAlt="Lisa Caspersson working at her desk"
      />

      {/* Footer */}
      <Footer />

    </main>
  )
}
