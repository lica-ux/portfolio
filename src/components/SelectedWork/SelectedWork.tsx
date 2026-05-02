import { Link } from 'react-router-dom'
import type { SelectedWorkProps, Project } from './SelectedWork.types'
import RevealImage from '../RevealImage'
import sejfaMock2 from '../../images/Sejfa_mock2.webp'

// TODO: replace with local .webp images (max 2080×2080px, max 940kb)
const imgBaribuddy = 'https://www.figma.com/api/mcp/asset/9615129a-6fbb-4fc7-a565-ab5796c9d142'
const imgBooky = 'https://www.figma.com/api/mcp/asset/005d71f0-4e8e-4d0d-820b-7c91d138841c'
const imgSejfa = sejfaMock2

const defaultProjects: Project[] = [
  {
    title: 'Baribuddy',
    description: 'Scalin from 200 to 50 000 active users, and an acquisition.',
    imageSrc: imgBaribuddy,
    imageAlt: 'Baribuddy app screenshot',
    slug: 'baribuddy',
  },
  {
    title: 'Booky',
    description: 'More than a redesign. We solved the wrong problem. - A problem redefinition',
    imageSrc: imgBooky,
    imageAlt: 'Booky app screenshot',
    slug: 'booky',
  },
  {
    title: 'Sejfa',
    description: 'Making insurance relevant to a generation that ignores it.',
    imageSrc: imgSejfa,
    imageAlt: 'Sejfa app screenshot',
    slug: 'sejfa',
  },
]

export default function SelectedWork({ projects = defaultProjects }: SelectedWorkProps) {
  return (
    <section
      id="work"
      className="snap-start snap-always flex flex-col gap-10 items-start py-16 md:py-24 px-4 md:px-10 w-full md:min-h-[100svh]"
    >
      <div className="flex items-center justify-center w-full">
        <h2
          className="flex-1 text-[40px] md:text-[56px] font-medium leading-[1.1]"
          style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
        >
          Selected work
        </h2>
      </div>

      <div className="flex flex-col gap-14 md:flex-row md:gap-8 items-stretch w-full flex-1">
        {projects.map((project, index) => (
          <Link
            key={project.title}
            to={`/work/${project.slug}`}
            className="group flex flex-col gap-6 items-start w-full md:flex-1 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)]"
          >
            <div className="overflow-hidden relative w-full rounded-[2px] aspect-[3/4] md:aspect-auto md:flex-1">
              <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105">
                <RevealImage
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover"
                  delay={index * 150}
                />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out bg-[rgba(73,17,41,0.24)]" />
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
          </Link>
        ))}
      </div>
    </section>
  )
}
