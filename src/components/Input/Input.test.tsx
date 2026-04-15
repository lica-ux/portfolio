import { render } from '@testing-library/react'
import Input from './Input'

test('renders a visible label', () => {
  const { getByLabelText } = render(<Input id="name" label="Full name" />)
  expect(getByLabelText('Full name')).toBeInTheDocument()
})

test('label is associated with input via htmlFor', () => {
  const { getByLabelText } = render(<Input id="email" label="Email" />)
  expect(getByLabelText('Email')).toHaveAttribute('id', 'email')
})

test('renders placeholder', () => {
  const { getByPlaceholderText } = render(
    <Input id="q" label="Search" placeholder="Type here..." />
  )
  expect(getByPlaceholderText('Type here...')).toBeInTheDocument()
})

test('is disabled when disabled prop is true', () => {
  const { getByLabelText } = render(<Input id="x" label="Name" disabled />)
  expect(getByLabelText('Name')).toBeDisabled()
})

test('shows error message when error prop is set', () => {
  const { getByText } = render(
    <Input id="e" label="Email" error="Invalid email address" />
  )
  expect(getByText('Invalid email address')).toBeInTheDocument()
})

test('sets aria-invalid when error is present', () => {
  const { getByLabelText } = render(
    <Input id="e" label="Email" error="Required" />
  )
  expect(getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
})

test('links error message via aria-describedby', () => {
  const { getByLabelText } = render(
    <Input id="e" label="Email" error="Required" />
  )
  expect(getByLabelText('Email')).toHaveAttribute('aria-describedby', 'e-error')
})

test('does not set aria-invalid when no error', () => {
  const { getByLabelText } = render(<Input id="x" label="Name" />)
  expect(getByLabelText('Name')).not.toHaveAttribute('aria-invalid')
})
