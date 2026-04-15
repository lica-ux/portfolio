import { render } from '@testing-library/react'
import Button from './Button'

test('renders children', () => {
  const { getByRole } = render(<Button>Click me</Button>)
  expect(getByRole('button')).toHaveTextContent('Click me')
})

test('defaults to type="button"', () => {
  const { getByRole } = render(<Button>Click</Button>)
  expect(getByRole('button')).toHaveAttribute('type', 'button')
})

test('is disabled when disabled prop is true', () => {
  const { getByRole } = render(<Button disabled>Click</Button>)
  expect(getByRole('button')).toBeDisabled()
})

test('calls onClick when clicked', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Button onClick={onClick}>Click</Button>)
  getByRole('button').click()
  expect(onClick).toHaveBeenCalledOnce()
})

test('does not call onClick when disabled', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Button onClick={onClick} disabled>Click</Button>)
  getByRole('button').click()
  expect(onClick).not.toHaveBeenCalled()
})
