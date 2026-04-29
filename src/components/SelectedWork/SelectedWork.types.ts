export interface Project {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  slug: string
}

export interface SelectedWorkProps {
  projects?: Project[]
}
