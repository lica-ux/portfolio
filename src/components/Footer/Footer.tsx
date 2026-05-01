import { Link } from 'react-router-dom'
import gradientImage from '../../images/gradient.webp'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="snap-start snap-always relative w-full"
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
      <div className="relative flex flex-col gap-8 pt-32 md:pt-[168px] pb-24 md:pb-[112px] px-4 md:px-10">
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
          <a
            href="mailto:lisa@caspersson.biz"
            className="inline-flex items-center justify-center px-4 py-3 rounded-full border text-[24px] font-medium leading-[1.1] whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity duration-100 hover:opacity-70 motion-reduce:transition-none"
            style={{
              borderColor: 'var(--color-nav-text)',
              color: 'var(--color-nav-text)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/lisa-caspersson-01231787/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-3 rounded-full border text-[24px] font-medium leading-[1.1] whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity duration-100 hover:opacity-70 motion-reduce:transition-none"
            style={{
              borderColor: 'var(--color-nav-text)',
              color: 'var(--color-nav-text)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Linkedin
          </a>
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
          <div className="flex-1 min-w-[280px]">
            <p
              className="text-[40px] font-medium leading-[1]"
              style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
            >
              Lisa<br />Caspersson
            </p>
          </div>

          <div className="flex flex-1 gap-8 min-w-[280px]">
            {/* Let's talk */}
            <div className="flex flex-col gap-2 flex-1">
              <p
                className="px-1 text-[16px] font-medium leading-[0.94] tracking-[-0.02em]"
                style={{ color: 'var(--color-hero-subtitle)', fontFamily: 'var(--font-display)' }}
              >
                Let's talk
              </p>
              <nav aria-label="Contact links">
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="mailto:lisa@caspersson.biz"
                      className="inline-block px-1 py-2 text-[16px] font-normal leading-[1.4] focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap"
                      style={{ color: 'var(--color-nav-text)' }}
                    >
                      lisa@caspersson.biz
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/lisa-caspersson-01231787/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-1 py-2 text-[16px] font-normal leading-[1.4] focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap"
                      style={{ color: 'var(--color-nav-text)' }}
                    >
                      Linkedin
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-2 flex-1">
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
                      <Link
                        to={to}
                        className="inline-block px-1 py-2 text-[16px] font-normal leading-[1.4] focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap no-underline"
                        style={{ color: 'var(--color-nav-text)' }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href="/#more-work"
                      className="inline-block px-1 py-2 text-[16px] font-normal leading-[1.4] focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap"
                      style={{ color: 'var(--color-nav-text)' }}
                    >
                      More work
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2 flex-1">
              <p
                className="px-1 text-[16px] font-medium leading-[0.94] tracking-[-0.02em]"
                style={{ color: 'var(--color-hero-subtitle)', fontFamily: 'var(--font-display)' }}
              >
                Navigation
              </p>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col">
                  {['Work', 'About', 'Contact'].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="inline-block px-1 py-2 text-[16px] font-normal leading-[1.4] focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap"
                        style={{ color: 'var(--color-nav-text)' }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
