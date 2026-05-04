export interface Project {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  slug: string
  imagePosition?: string
}

export interface SelectedWorkProps {
  projects?: Project[]
}
