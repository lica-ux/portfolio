/** 'below' = not yet reached · 'visible' = in view · 'above' = scrolled past */
export type StatState = 'below' | 'visible' | 'above'

export interface StatsSectionProps {
  imageSrc: string
  imageAlt: string
}
