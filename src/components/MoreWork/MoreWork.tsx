import gradientImage from '../../images/gradient.webp'

interface Project {
  title: string
  tags: string[]
  description: string
}

const PROJECTS: Project[] = [
  {
    title: 'Zeeds',
    tags: ['Mental health', 'Behaviour design'],
    description:
      "A researcher's 56-page behavioural science methodology, distilled into a mental health app. The challenge: preserving the depth of the process while designing a pausable, returnable flow for users in a vulnerable place in their lives.",
  },
  {
    title: 'Tiimo',
    tags: ['Desktop', 'PWA', 'Accessibility'],
    description:
      'iPhone App of the Year 2025, Tiimo helps people on the spectrum manage daily life. I translated their mobile app to desktop, owned the design in Figma, and guided big visions into realistic first-version solutions within a tight timeline.',
  },
  {
    title: 'Clean Connect',
    tags: ['Hardware integration', 'Subscription', 'White-label'],
    description:
      'Built from scratch for Bryte, a subscription carwash app using license plate recognition to activate the wash automatically. Acquired by Constant Clean shortly after launch and re-platformed as a white-label solution. Since then rolled out to partners including OKQ8.',
  },
  {
    title: 'WeightTrainer',
    tags: ['Health', 'B2B2C', 'MVP to scale'],
    description:
      'Coaches and users were split across multiple platforms. I designed both the user app and coach PWA from scratch, consolidating everything into one service. Started as an MVP and grew over 2–3 years. Coaches could take on more users while staying on top of everyone\'s progress.',
  },
  {
    title: 'Ecoride',
    tags: ['Hardware integration', 'IoT', 'UX audit'],
    description:
      "Ecoride's smart e-bike app, used across the Nordics by a Red Dot Award-winning brand, had false positives on critical states like alarm activation. We solved it visually with loading states, sync failure messages, and recovery guidance. Brief was 'make it stable' and we proposed a full UX review while we were at it.",
  },
  {
    title: 'Acerna',
    tags: ['IoT', 'Hardware integration', 'Geo-fencing'],
    description:
      'Designed from scratch alongside unfinished hardware. A connected app for farmers to monitor fences, track animal location via GPS, and get alerted to breaches in real time. Expanded to golf courses monitoring wildlife intrusion.',
  },
  {
    title: 'FlexQube',
    tags: ['Tablet', 'B2B', 'Hardware integration'],
    description:
      'Redesigned a tablet app for controlling autonomous warehouse robots, simplifying conditional logic (if A, then B, unless X) into an interface operable by warehouse workers, not engineers.',
  },
  {
    title: 'Yohrs',
    tags: ['Web platform', 'B2C', 'Community'],
    description:
      "A platform connecting individuals with independent HR support. Designed around the core insight that people need HR advice that isn't constrained by their employer's interests.",
  },
  {
    title: 'Kappa Bar',
    tags: ['Consumer app', 'Gamification'],
    description:
      'Designed an all-in-one venue app covering newsletters, menus, food ordering, quizzes, and a gamified loyalty system, consolidating fragmented customer touch-points into one experience.',
  },
]

export default function MoreWork() {
  return (
    <section
      id="more-work"
      className="snap-start snap-always w-full md:h-[100svh] md:overflow-y-auto"
      style={{ backgroundColor: '#ffe8db' }}
    >
      {/* Padding wrapper — carries the padding so its height = full content height, letting the gradient fill it all */}
      <div className="relative pt-[120px] pb-20 min-h-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            alt=""
            src={gradientImage}
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative flex flex-col gap-20">
          {/* Heading */}
          <div className="px-4 md:px-10">
            <h2
              className="text-[40px] font-medium leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)' }}
            >
              More work, <span style={{ color: 'var(--color-hero-subtitle)' }}>briefly.</span>
            </h2>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-20 lg:gap-y-28 gap-x-8 px-4 md:px-10">
            {PROJECTS.map((project) => (
              <article
                key={project.title}
                className="flex flex-col gap-2"
              >
                <h3
                  className="text-[32px] font-medium leading-[1.1]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)' }}
                >
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full border text-[14px] font-medium leading-none lowercase tracking-[-0.02em] whitespace-nowrap"
                      style={{
                        borderColor: 'rgba(73,17,41,0.3)',
                        color: 'var(--color-nav-text)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p
                  className="text-[18px] font-normal leading-[1.48]"
                  style={{ color: 'var(--color-hero-subtitle)' }}
                >
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
