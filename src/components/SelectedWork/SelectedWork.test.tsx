import { afterEach, test, expect } from 'bun:test'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SelectedWork from './SelectedWork'
import type { Project } from './SelectedWork.types'

afterEach(cleanup)

const projects: Project[] = [
  {
    title: 'Baribuddy',
    description: 'Test description',
    imageSrc: '/test.webp',
    imageAlt: 'Baribuddy screenshot',
    slug: 'baribuddy',
  },
]

test('each project card links to its case page', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <SelectedWork projects={projects} />
    </MemoryRouter>
  )
  expect(getByRole('link', { name: /baribuddy/i })).toHaveAttribute('href', '/work/baribuddy')
})
