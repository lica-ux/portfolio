import Button from '../components/Button'
import StatsSection from '../components/StatsSection/StatsSection'
import SelectedWork from '../components/SelectedWork'
import MoreWork from '../components/MoreWork'
import AboutMe from '../components/AboutMe'
import Footer from '../components/Footer'
import RevealImage from '../components/RevealImage'
import RevealText from '../components/RevealText'
import statsImage from '../images/DSC03053-Enhanced-NR (1).webp'
import gradientImage from '../images/gradient.webp'

export default function Home() {
  return (
    <main>

      {/* Hero */}
      <section
        id="hero"
        className="md:snap-start md:snap-always flex flex-col md:flex-row gap-6 md:gap-8 pt-16 md:pt-[104px] pb-32 md:pb-[104px] px-4 md:px-10 min-h-screen md:min-h-[calc(100svh+64px)]"
      >
        <div className="flex flex-col gap-2 md:flex-1 min-w-0 md:pb-6 md:justify-end">
          <RevealText
            as="p"
            delay={0}
            className="text-[18px] md:text-[40px] leading-[1.1] font-normal"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            Hi, I'm Lisa.
          </RevealText>
          <RevealText
            as="h1"
            delay={120}
            className="text-[48px] md:text-[88px] font-medium leading-none tracking-[-0.02em] w-full"
            style={{
              color: 'var(--color-nav-text)',
              fontFamily: 'var(--font-display)',
            }}
          >
            I turn complex problems into real products.
          </RevealText>
        </div>
        <div className="flex-1 w-full md:flex-1 md:h-auto md:w-auto md:min-w-0 relative rounded-xs overflow-hidden">
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
        style={{ backgroundColor: 'var(--color-about-bg)' }}
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
        <RevealText
          as="p"
          delay={0}
          className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px]"
          style={{ color: 'var(--color-hero-subtitle)' }}
        >
          With 6+ years at the same agency, I've grown from UX designer to leading both projects
          and people. I work across mobile, web, and connected hardware, and I'm most at home when
          the problem is messy and the solution needs to be simple.
        </RevealText>

        <RevealText as="div" delay={180} className="relative self-start">
          <Button href="#work">View my work</Button>
        </RevealText>
      </section>

      {/* Stats */}
      <StatsSection
        id="stats"
        variant="number"
        imageSrc={statsImage}
        imageAlt="Lisa Caspersson working at her desk"
      />

      {/* Selected work */}
      <SelectedWork />

      {/* More work */}
      <MoreWork />

      {/* About me */}
      <AboutMe />

      {/* Footer */}
      <Footer />

    </main>
  )
}
