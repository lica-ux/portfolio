import { render, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import Nav from './Nav'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider><MemoryRouter>{children}</MemoryRouter></ThemeProvider>
}

test('renders nav links', () => {
  const { getByRole } = render(<Nav />, { wrapper: Wrapper })
  expect(getByRole('link', { name: 'Home' })).toBeInTheDocument()
  expect(getByRole('link', { name: 'Components' })).toBeInTheDocument()
})

test('renders theme toggle button', () => {
  const { getByRole } = render(<Nav />, { wrapper: Wrapper })
  expect(getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
})

test('theme toggle button switches label from Light to Dark', () => {
  const { getByRole } = render(<Nav />, { wrapper: Wrapper })
  const btn = getByRole('button', { name: /toggle theme/i })
  act(() => { btn.click() })
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
})
