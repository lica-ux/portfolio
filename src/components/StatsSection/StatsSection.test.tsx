import { render } from '@testing-library/react'
import StatsSection from './StatsSection'

// Mock IntersectionObserver — not available in Happy DOM
const mockObserve = jest.fn()
const mockDisconnect = jest.fn()
beforeEach(() => {
  mockObserve.mockClear()
  mockDisconnect.mockClear()
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
  }))
})

afterEach(() => {
  jest.restoreAllMocks()
})

test('renders all four stats', () => {
  const { getAllByText } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa at her desk" />
  )
  expect(getAllByText('6+ years')).toHaveLength(2)
  expect(getAllByText('30+ products')).toHaveLength(2)
  expect(getAllByText('2 acquisitions')).toHaveLength(2)
  expect(getAllByText('2 design awards')).toHaveLength(2)
})

test('renders the image with the provided alt text', () => {
  const { getAllByAltText } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa at her desk" />
  )
  // Two images: one desktop, one mobile
  const images = getAllByAltText('Lisa at her desk')
  expect(images).toHaveLength(2)
  images.forEach(img => expect(img).toHaveAttribute('src', '/hero.webp'))
})

test('stats are initially hidden (opacity 0)', () => {
  const { getAllByTestId } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa" />
  )
  const stats = getAllByTestId('stat-text')
  stats.forEach(el => {
    expect(el).toHaveStyle({ opacity: '0' })
  })
})

test('sets up IntersectionObserver for each phase', () => {
  render(<StatsSection imageSrc="/hero.webp" imageAlt="Lisa" />)
  // 4 desktop phases + 4 mobile rows = 8 observer.observe calls
  expect(mockObserve).toHaveBeenCalledTimes(8)
})

test('disconnects observers on unmount', () => {
  const { unmount } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa" />
  )
  unmount()
  expect(mockDisconnect).toHaveBeenCalledTimes(8)
})
