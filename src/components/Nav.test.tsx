import { render } from '@testing-library/react'
import Nav from './Nav'

test('renders nav links', () => {
  const { getByRole } = render(<Nav />)
  expect(getByRole('link', { name: 'Work' })).toBeInTheDocument()
  expect(getByRole('link', { name: 'About' })).toBeInTheDocument()
  expect(getByRole('link', { name: 'Contact' })).toBeInTheDocument()
})

test('links point to correct anchors', () => {
  const { getByRole } = render(<Nav />)
  expect(getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
  expect(getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
  expect(getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
})
