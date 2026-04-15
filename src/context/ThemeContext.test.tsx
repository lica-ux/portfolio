import { render, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext'

function Consumer() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme}</button>
}

test('starts in light mode', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  expect(getByRole('button')).toHaveTextContent('light')
})

test('toggleTheme switches to dark', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  act(() => { getByRole('button').click() })
  expect(getByRole('button')).toHaveTextContent('dark')
})

test('toggleTheme sets data-theme on <html>', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  act(() => { getByRole('button').click() })
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
})

test('toggling back to light removes data-theme attribute', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  act(() => { getByRole('button').click() }) // → dark
  act(() => { getByRole('button').click() }) // → light
  expect(document.documentElement).not.toHaveAttribute('data-theme')
})

test('useTheme throws when used outside ThemeProvider', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<Consumer />)).toThrow('useTheme must be used within ThemeProvider')
  spy.mockRestore()
})
