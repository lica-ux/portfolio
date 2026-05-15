import gradientImage from '../../images/gradient.webp'
import Button from '../Button'
import TextLink from '../TextLink'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="snap-start relative w-full md:min-h-[100svh] md:flex md:flex-col"
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

      {/* Contact section */}
      <div className="relative flex flex-col gap-8 pt-32 md:flex-1 md:justify-center md:pt-0 pb-24 md:pb-0 px-4 md:px-10">
        <div className="flex flex-col gap-4">
          <h2
            className="text-[40px] md:text-[64px] font-medium leading-[1.1]"
            style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
          >
            Contact
          </h2>
          <p
            className="text-[22px] md:text-[32px] font-normal leading-[1.18]"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            Want to work together or just talk design?<br />
            I'd love to hear from you.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button href="mailto:lisa@caspersson.biz">Email</Button>
          <Button
            href="https://www.linkedin.com/in/lisa-caspersson-01231787/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </Button>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative">
        <div className="px-4 md:px-10">
          <div
            className="w-full h-px"
            style={{ backgroundColor: 'rgba(73,17,41,0.2)' }}
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-wrap gap-8 px-4 md:px-10 pt-10 pb-[104px] md:pb-10">
          <div className="flex-1 min-w-[280px] max-w-[40%]">
            <p
              className="text-[40px] font-medium leading-[1]"
              style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
            >
              Lisa<br />Caspersson
            </p>
          </div>

          <div className="flex flex-col md:flex-row flex-1 gap-8 min-w-[280px]">
            {/* Let's talk */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <p
                className="px-1 text-[16px] font-medium leading-[0.94] tracking-[-0.02em]"
                style={{ color: 'var(--color-hero-subtitle)', fontFamily: 'var(--font-display)' }}
              >
                Let's talk
              </p>
              <nav aria-label="Contact links">
                <ul className="flex flex-col">
                  <li>
                    <TextLink href="mailto:lisa@caspersson.biz">lisa@caspersson.biz</TextLink>
                  </li>
                  <li>
                    <TextLink href="https://www.linkedin.com/in/lisa-caspersson-01231787/" target="_blank" rel="noopener noreferrer">Linkedin</TextLink>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Projects + Navigation row on mobile */}
            <div className="flex gap-8 flex-1 min-w-0">
            {/* Projects */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <p
                className="px-1 text-[16px] font-medium leading-[0.94] tracking-[-0.02em]"
                style={{ color: 'var(--color-hero-subtitle)', fontFamily: 'var(--font-display)' }}
              >
                Projects
              </p>
              <nav aria-label="Projects">
                <ul className="flex flex-col">
                  {[
                    { label: 'Baribuddy', to: '/work/baribuddy' },
                    { label: 'Booky', to: '/work/booky' },
                    { label: 'Sejfa', to: '/work/sejfa' },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <TextLink to={to}>{label}</TextLink>
                    </li>
                  ))}
                  <li>
                    <TextLink href="/#more-work">More work</TextLink>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <p
                className="px-1 text-[16px] font-medium leading-[0.94] tracking-[-0.02em]"
                style={{ color: 'var(--color-hero-subtitle)', fontFamily: 'var(--font-display)' }}
              >
                Navigation
              </p>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col">
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'Work', href: '/#work' },
                    { label: 'About', href: '/#about-me' },
                    { label: 'Contact', href: '/#contact' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <TextLink href={href}>{label}</TextLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
