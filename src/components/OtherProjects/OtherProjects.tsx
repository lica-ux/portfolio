import { Link } from 'react-router-dom'
import type { OtherProjectsProps } from './OtherProjects.types'
import RevealImage from '../RevealImage'
import sejfaMock2 from '../../images/Sejfa_mock2.webp'
import imgBaribuddy from '../../images/BaribuddyHero.webp'
import imgBooky from '../../images/BookyHero.webp'

const imgSejfa = sejfaMock2

const ALL_PROJECTS = [
  {
    title: 'Baribuddy',
    description: 'Scaling from 200 to 50 000 active users, and an acquisition.',
    imageSrc: imgBaribuddy,
    imageAlt: 'Baribuddy app screenshot',
    slug: 'baribuddy',
    imagePosition: 'object-right',
  },
  {
    title: 'Booky',
    description: 'More than a redesign. We solved the wrong problem.',
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

export default function OtherProjects({ currentSlug }: OtherProjectsProps) {
  const projects = ALL_PROJECTS.filter((p) => p.slug !== currentSlug)

  return (
    <section
      aria-label="Other projects"
      className="snap-start snap-always flex flex-col md:flex-row md:items-stretch gap-8 px-4 md:px-10 pt-10 pb-[104px] md:min-h-[100svh]"
    >
      <h2
        className="flex-1 basis-0 min-w-[200px] text-[40px] lg:text-[72px] font-medium leading-[1.04]"
        style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
      >
        Other projects
      </h2>

      {projects.map((project, index) => (
        <Link
          key={project.slug}
          to={`/work/${project.slug}`}
          className="group flex flex-col gap-6 flex-1 basis-0 min-w-[200px] md:min-h-0 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)] motion-reduce:transition-none"
        >
          <div className="overflow-hidden relative w-full rounded-xs aspect-[3/4] md:aspect-auto md:flex-1">
            <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105">
              <RevealImage
                src={project.imageSrc}
                alt={project.imageAlt}
                className={`absolute inset-0 w-full h-full object-cover${project.imagePosition ? ` ${project.imagePosition}` : ''}`}
                delay={index * 150}
              />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out bg-[rgba(73,17,41,0.24)]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <p
              className="text-2xl font-medium leading-[1.1]"
              style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </p>
            <p
              className="text-[18px] font-normal leading-[1.48]"
              style={{ color: 'var(--color-hero-subtitle)' }}
            >
              {project.description}
            </p>
          </div>
        </Link>
      ))}
    </section>
  )
}
