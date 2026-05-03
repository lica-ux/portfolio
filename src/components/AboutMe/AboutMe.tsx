import RevealImage from '../RevealImage'

// TODO: replace with local .webp images (max 2080×2080px, max 940kb)
const portraitSrc = 'https://www.figma.com/api/mcp/asset/be608bd1-b3bb-4715-9f68-317e7fcc7467'
const knitSrc = 'https://www.figma.com/api/mcp/asset/71be2b76-763d-47da-96a8-25c014060220'

export default function AboutMe() {
  return (
    <>
      {/* Section 1: bio text + portrait */}
      <section className="snap-start snap-always flex flex-col gap-10 px-4 md:px-10 py-16 md:py-24 min-h-[100svh]">
        <h2
          className="text-[32px] md:text-[56px] font-medium leading-[1.1]"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)' }}
        >
          About me
        </h2>
        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
          <div className="flex-1 min-w-0 md:pr-10">
            <div
              className="text-[20px] md:text-[24px] font-normal leading-[1.18] space-y-[1.18em] max-w-[1024px]"
              style={{ color: 'var(--color-hero-subtitle)' }}
            >
              <p>I started in UX, taught myself UI, and never stopped learning.</p>
              <p>
                Over six years I've grown into leading projects, mentoring designers, and defining
                how we work as a team. I often bridge the gap between design, tech, and business and
                step into product roles when no one else does.
              </p>
              <p>
                I believe great design is about clarity. Colour, structure, and interaction aren't
                decoration. They're how products communicate.
              </p>
            </div>
          </div>
          <div className="w-full md:w-[30vw] shrink-0 aspect-[3/4] relative rounded-[2px] overflow-hidden">
            <RevealImage
              src={portraitSrc}
              alt="Lisa Caspersson"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: hobby photo + hobby text */}
      <section className="snap-start snap-always flex flex-col md:flex-row gap-10 items-start md:items-center px-4 md:px-10 py-16 md:py-24 min-h-[100svh]">
        <div className="w-full md:flex-1 aspect-square relative rounded-[2px] overflow-hidden">
          <RevealImage
            src={knitSrc}
            alt="Folded textured wool yarns in warm earthy tones"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 md:pr-10">
          <p
            className="text-[20px] md:text-[24px] font-normal leading-[1.18]"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            Outside of work I paint, play piano by ear, and knit, which unsurprisingly isn't
            that different from product design: patience, iteration, and attention to detail.
          </p>
        </div>
      </section>
    </>
  )
}
