import { afterEach, test, expect, mock, beforeEach } from 'bun:test'
import React from 'react'
import { render, cleanup, act } from '@testing-library/react'
import RevealText from './RevealText'

afterEach(cleanup)

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
  ;(globalThis as unknown as Record<string, unknown>).requestAnimationFrame = (cb: FrameRequestCallback) => { cb(0); return 0 }
})

function triggerIntersection(isIntersecting: boolean) {
  act(() => {
    observerCallback(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
  })
}

test('renders children inside the element', () => {
  const { getByText } = render(<RevealText>Hello world</RevealText>)
  expect(getByText('Hello world')).toBeTruthy()
})

test('element is initially hidden (opacity 0, translateY 8px)', () => {
  const { getByText } = render(<RevealText>Hello</RevealText>)
  const el = getByText('Hello') as HTMLElement
  expect(el.style.opacity).toBe('0')
  expect(el.style.transform).toBe('translateY(8px)')
})

test('element becomes visible after intersection', () => {
  const { getByText } = render(<RevealText>Hello</RevealText>)
  triggerIntersection(true)
  const el = getByText('Hello') as HTMLElement
  expect(el.style.opacity).toBe('1')
  expect(el.style.transform).toBe('translateY(0)')
})

test('does not reveal when isIntersecting is false', () => {
  const { getByText } = render(<RevealText>Hello</RevealText>)
  triggerIntersection(false)
  const el = getByText('Hello') as HTMLElement
  expect(el.style.opacity).toBe('0')
})

test('disconnects observer after intersection', () => {
  render(<RevealText>Hello</RevealText>)
  triggerIntersection(true)
  expect(disconnectMock).toHaveBeenCalled()
})

test('as prop renders the correct HTML element', () => {
  const { container } = render(<RevealText as="h2">Heading</RevealText>)
  expect(container.querySelector('h2')).toBeTruthy()
  expect(container.querySelector('p')).toBeNull()
})

test('delay prop is included in transition style', () => {
  const { getByText } = render(<RevealText delay={200}>Hello</RevealText>)
  const el = getByText('Hello') as HTMLElement
  expect(el.style.transition).toContain('200ms')
})

test('className is forwarded to the element', () => {
  const { getByText } = render(<RevealText className="text-xl font-bold">Hello</RevealText>)
  expect(getByText('Hello')).toHaveClass('text-xl')
})

test('reveals immediately when prefers-reduced-motion is active', () => {
  const original = window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  })
  try {
    const { getByText } = render(<RevealText>Hello</RevealText>)
    const el = getByText('Hello') as HTMLElement
    expect(el.style.opacity).toBe('1')
    expect(observeMock).not.toHaveBeenCalled()
  } finally {
    Object.defineProperty(window, 'matchMedia', { writable: true, value: original })
  }
})
