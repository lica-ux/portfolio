import type { SelectedWorkProps, Project } from './SelectedWork.types'

// TODO: replace with local .webp images (max 2080×2080px, max 940kb)
const imgBaribuddy = 'https://www.figma.com/api/mcp/asset/9615129a-6fbb-4fc7-a565-ab5796c9d142'
const imgBooky = 'https://www.figma.com/api/mcp/asset/005d71f0-4e8e-4d0d-820b-7c91d138841c'
const imgSejfa = 'https://www.figma.com/api/mcp/asset/0826ff24-784a-4a87-befb-9420e5f08a6a'

const defaultProjects: Project[] = [
  {
    title: 'Baribuddy',
    description: 'Scalin from 200 to 50 000 active users, and an acquisition.',
    imageSrc: imgBaribuddy,
    imageAlt: 'Baribuddy app screenshot',
  },
  {
    title: 'Booky',
    description: 'More than a redesign. We solved the wrong problem. - A problem redefinition',
    imageSrc: imgBooky,
    imageAlt: 'Booky app screenshot',
  },
  {
    title: 'Sejfa',
    description: 'Making insurance relevant to a generation that ignores it.',
    imageSrc: imgSejfa,
    imageAlt: 'Sejfa app screenshot',
  },
]

export default function SelectedWork({ projects = defaultProjects }: SelectedWorkProps) {
  return (
    <section
      id="work"
      className="snap-start flex flex-col gap-10 items-start py-16 md:py-24 px-4 md:px-10 w-full"
    >
      <div className="flex items-center justify-center w-full">
        <h2
          className="flex-1 text-[40px] md:text-[56px] font-medium leading-[1.1]"
          style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
        >
          Selected work
        </h2>
      </div>

      <div className="flex flex-wrap gap-8 items-start w-full">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col gap-6 items-start flex-1 min-w-[240px]"
          >
            <div className="aspect-[384/536] overflow-hidden relative shrink-0 w-full rounded-[2px]">
              <img
                src={project.imageSrc}
                alt={project.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5 items-start px-1 w-full">
              <p
                className="text-2xl font-medium leading-[1.1] w-full"
                style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </p>
              <p
                className="text-[18px] font-normal leading-[1.18] w-full"
                style={{ color: 'var(--color-hero-subtitle)' }}
              >
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
