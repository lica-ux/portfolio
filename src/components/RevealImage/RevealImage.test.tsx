import { afterEach, test, expect, mock, beforeEach } from 'bun:test'
import { render, cleanup, act } from '@testing-library/react'
import RevealImage from './RevealImage'

afterEach(cleanup)

// IntersectionObserver mock
let observerCallback: IntersectionObserverCallback
const observeMock = mock(() => {})
const disconnectMock = mock(() => {})

beforeEach(() => {
  observeMock.mockClear()
  disconnectMock.mockClear()
  ;(globalThis as unknown as Record<string, unknown>).IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      observerCallback = cb
    }
    observe = observeMock
    disconnect = disconnectMock
  }
})

function triggerIntersection(isIntersecting: boolean) {
  act(() => {
    observerCallback(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
  })
}

test('renders an img with correct src and alt', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" />
  )
  const img = getByRole('img')
  expect(img).toHaveAttribute('src', '/test.webp')
  expect(img).toHaveAttribute('alt', 'Test image')
})

test('image is initially hidden', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" />
  )
  const img = getByRole('img') as HTMLImageElement
  expect(img.style.opacity).toBe('0')
})

test('image becomes visible after intersection', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" />
  )
  triggerIntersection(true)
  const img = getByRole('img') as HTMLImageElement
  expect(img.style.opacity).toBe('1')
})

test('does not reveal when isIntersecting is false', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" />
  )
  triggerIntersection(false)
  const img = getByRole('img') as HTMLImageElement
  expect(img.style.opacity).toBe('0')
})

test('disconnects observer after intersection', () => {
  render(<RevealImage src="/test.webp" alt="Test image" />)
  triggerIntersection(true)
  expect(disconnectMock).toHaveBeenCalled()
})

test('applies transition delay from delay prop', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" delay={150} />
  )
  const img = getByRole('img') as HTMLImageElement
  expect(img.style.transition).toContain('150ms')
})

test('forwards className to img element', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" className="w-full h-full object-cover" />
  )
  expect(getByRole('img')).toHaveClass('w-full')
})

test('reveals immediately when prefers-reduced-motion is active', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  })
  const { getByRole } = render(<RevealImage src="/test.webp" alt="Test image" />)
  const img = getByRole('img') as HTMLImageElement
  expect(img.style.opacity).toBe('1')
  expect(observeMock).not.toHaveBeenCalled()
})
