import { render } from '@testing-library/react'
import { Heading, Text } from './index'

// Heading
test('Heading renders as h2 by default', () => {
  const { container } = render(<Heading>Title</Heading>)
  expect(container.querySelector('h2')).toBeInTheDocument()
})

test('Heading renders as the specified element', () => {
  const { container } = render(<Heading as="h1">Title</Heading>)
  expect(container.querySelector('h1')).toBeInTheDocument()
})

test('Heading renders children', () => {
  const { getByRole } = render(<Heading as="h1">Hello</Heading>)
  expect(getByRole('heading', { level: 1 })).toHaveTextContent('Hello')
})

test('Heading accepts className', () => {
  const { container } = render(<Heading className="custom">Title</Heading>)
  expect(container.querySelector('h2')).toHaveClass('custom')
})

test('Heading defaults to text-4xl for h1', () => {
  const { container } = render(<Heading as="h1">Title</Heading>)
  expect(container.querySelector('h1')).toHaveClass('text-4xl')
})

test('Heading defaults to text-3xl for h2', () => {
  const { container } = render(<Heading>Title</Heading>)
  expect(container.querySelector('h2')).toHaveClass('text-3xl')
})

test('Heading defaults to text-2xl for h3', () => {
  const { container } = render(<Heading as="h3">Title</Heading>)
  expect(container.querySelector('h3')).toHaveClass('text-2xl')
})

test('Heading defaults to text-xl for h4', () => {
  const { container } = render(<Heading as="h4">Title</Heading>)
  expect(container.querySelector('h4')).toHaveClass('text-xl')
})

test('Heading explicit size overrides element default', () => {
  const { container } = render(<Heading as="h1" size="xl">Title</Heading>)
  expect(container.querySelector('h1')).toHaveClass('text-xl')
})

// Text
test('Text renders as p by default', () => {
  const { container } = render(<Text>Body</Text>)
  expect(container.querySelector('p')).toBeInTheDocument()
})

test('Text renders as the specified element', () => {
  const { container } = render(<Text as="span">Body</Text>)
  expect(container.querySelector('span')).toBeInTheDocument()
})

test('Text renders children', () => {
  const { container } = render(<Text>Hello text</Text>)
  expect(container.querySelector('p')).toHaveTextContent('Hello text')
})

test('Text accepts className', () => {
  const { container } = render(<Text className="custom">Body</Text>)
  expect(container.querySelector('p')).toHaveClass('custom')
})

test('Text defaults to text-base size', () => {
  const { container } = render(<Text>Body</Text>)
  expect(container.querySelector('p')).toHaveClass('text-base')
})

test('Text renders text-sm when size is sm', () => {
  const { container } = render(<Text size="sm">Body</Text>)
  expect(container.querySelector('p')).toHaveClass('text-sm')
})

test('Text renders text-lg when size is lg', () => {
  const { container } = render(<Text size="lg">Body</Text>)
  expect(container.querySelector('p')).toHaveClass('text-lg')
})
