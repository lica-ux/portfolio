import type { CaseHeroProps } from './CaseHero.types'
import RevealImage from '../RevealImage'

// TODO: replace imageSrc with local .webp (max 2080×2080px, max 940kb)
export default function CaseHero({ imageSrc, imageAlt }: CaseHeroProps) {
  return (
    <div className="w-full overflow-hidden rounded-[2px] h-[240px] md:h-[640px]">
      <RevealImage
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
