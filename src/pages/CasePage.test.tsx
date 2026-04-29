import { afterEach, test, expect } from 'bun:test'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CasePage from './CasePage'

afterEach(cleanup)

function renderCasePage() {
  return render(
    <MemoryRouter>
      <CasePage slug="baribuddy" />
    </MemoryRouter>
  )
}

test('renders back link', () => {
  const { getByRole } = renderCasePage()
  expect(getByRole('link', { name: /home/i })).toBeInTheDocument()
})

test('back link points to homepage', () => {
  const { getByRole } = renderCasePage()
  expect(getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
})
