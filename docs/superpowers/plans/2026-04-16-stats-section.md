# Stats Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a scroll-driven stats section to the Home page with a sticky image on desktop and four animated stats ("6+ years", "30+ products", "2 acquisitions", "2 design awards") that fade in and out one at a time.

**Architecture:** A new `StatsSection` component manages two separate ref arrays — one for desktop phase divs, one for mobile stat rows — each with their own `IntersectionObserver` instances. Desktop uses a three-state `'below' | 'visible' | 'above'` system to drive directional fade transitions; mobile uses a simpler one-way boolean (stats stay visible once entered). The section is wired into `Home.tsx` after the existing About section.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, `useRef` + `useEffect` + `useState`, native `IntersectionObserver` API, Bun test + @testing-library/react

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `src/components/StatsSection/StatsSection.types.ts` | `StatState` type + `StatsSectionProps` interface |
| Create | `src/components/StatsSection/StatsSection.tsx` | Component: sticky image + scroll-phase stats |
| Create | `src/components/StatsSection/StatsSection.test.tsx` | Unit tests (static render + IntersectionObserver mock) |
| Modify | `src/pages/Home.tsx` | Import and render `<StatsSection>` after `#about` |

---

## Task 1: Types

**Files:**
- Create: `src/components/StatsSection/StatsSection.types.ts`

- [ ] **Step 1: Create the types file**

```ts
// src/components/StatsSection/StatsSection.types.ts

/** 'below' = not yet reached · 'visible' = in view · 'above' = scrolled past */
export type StatState = 'below' | 'visible' | 'above'

export interface StatsSectionProps {
  imageSrc: string
  imageAlt: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StatsSection/StatsSection.types.ts
git commit -m "feat: add StatsSection types"
```

---

## Task 2: Static render (TDD)

**Files:**
- Create: `src/components/StatsSection/StatsSection.test.tsx`
- Create: `src/components/StatsSection/StatsSection.tsx` (shell)

- [ ] **Step 1: Write the failing tests**

```tsx
// src/components/StatsSection/StatsSection.test.tsx
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

test('renders all four stats', () => {
  const { getByText } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa at her desk" />
  )
  expect(getByText('6+ years')).toBeInTheDocument()
  expect(getByText('30+ products')).toBeInTheDocument()
  expect(getByText('2 acquisitions')).toBeInTheDocument()
  expect(getByText('2 design awards')).toBeInTheDocument()
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
  expect(mockDisconnect).toHaveBeenCalled()
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
bun test src/components/StatsSection/StatsSection.test.tsx
```

Expected: `Cannot find module './StatsSection'`

- [ ] **Step 3: Create the component shell**

```tsx
// src/components/StatsSection/StatsSection.tsx
import { useEffect, useRef, useState } from 'react'
import type { StatsSectionProps, StatState } from './StatsSection.types'

const STATS = ['6+ years', '30+ products', '2 acquisitions', '2 design awards']

export default function StatsSection({ imageSrc, imageAlt }: StatsSectionProps) {
  const [desktopStates, setDesktopStates] = useState<StatState[]>(
    STATS.map(() => 'below')
  )
  const [mobileVisible, setMobileVisible] = useState<boolean[]>(
    STATS.map(() => false)
  )
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const desktopObservers = desktopRefs.current.map((el, i) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          setDesktopStates(prev => {
            const next = [...prev]
            if (entry.isIntersecting) {
              next[i] = 'visible'
            } else if (entry.boundingClientRect.top < 0) {
              next[i] = 'above'
            } else {
              next[i] = 'below'
            }
            return next
          })
        },
        { threshold: 0.5 }
      )
      observer.observe(el)
      return observer
    })

    const mobileObservers = mobileRefs.current.map((el, i) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMobileVisible(prev => {
              const next = [...prev]
              next[i] = true
              return next
            })
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    })

    return () => {
      desktopObservers.forEach(o => o?.disconnect())
      mobileObservers.forEach(o => o?.disconnect())
    }
  }, [])

  return (
    <section id="stats" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Desktop */}
      <div
        className="hidden md:flex"
        style={{ minHeight: `${STATS.length * 100}svh` }}
      >
        {/* Left: sticky image */}
        <div className="w-1/2 sticky top-0 overflow-hidden" style={{ height: '100svh' }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: scroll phases */}
        <div className="w-1/2 flex flex-col">
          {STATS.map((stat, i) => (
            <div
              key={stat}
              ref={el => { desktopRefs.current[i] = el }}
              className="flex items-center px-[10%]"
              style={{ height: '100svh' }}
            >
              <span
                data-testid="stat-text"
                className="text-[64px] font-semibold leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-nav-text)',
                  letterSpacing: '-0.02em',
                  opacity: desktopStates[i] === 'visible' ? 1 : 0,
                  transform:
                    desktopStates[i] === 'visible'
                      ? 'translateY(0)'
                      : desktopStates[i] === 'above'
                      ? 'translateY(-24px)'
                      : 'translateY(24px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          {STATS.map((stat, i) => (
            <div
              key={stat}
              ref={el => { mobileRefs.current[i] = el }}
              className="px-6 py-12"
              style={{
                borderBottom: i < STATS.length - 1 ? '1px solid var(--color-border)' : undefined,
              }}
            >
              <span
                data-testid="stat-text"
                className="text-[40px] font-semibold leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-nav-text)',
                  letterSpacing: '-0.02em',
                  opacity: mobileVisible[i] ? 1 : 0,
                  transform: mobileVisible[i] ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
bun test src/components/StatsSection/StatsSection.test.tsx
```

Expected: 5 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/components/StatsSection/StatsSection.tsx src/components/StatsSection/StatsSection.test.tsx
git commit -m "feat: add StatsSection component with scroll-driven stats animation"
```

---

## Task 3: Wire into Home.tsx

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Add import and render StatsSection**

In `src/pages/Home.tsx`, add the import at the top and render `<StatsSection>` after the closing `</section>` of the `#about` section.

The file currently starts with:
```tsx
// TODO: replace both with local .webp images (max 2080×2080px, max 940kb)
const heroImage = 'https://www.figma.com/api/mcp/asset/7b5bc51c-a56f-4c04-99d2-b68011959e2f'
const aboutTexture = 'https://www.figma.com/api/mcp/asset/becf3c32-1203-42b8-8ad0-873d63b0d5a6'
```

Add the import after line 1 (the comment line):
```tsx
import StatsSection from '../components/StatsSection/StatsSection'
```

Then after the closing `</section>` of `#about` (currently the last section before `</main>`), add:
```tsx
      <StatsSection
        imageSrc={heroImage}
        imageAlt="Lisa Caspersson working at her desk"
      />
```

Full result for `Home.tsx`:
```tsx
// TODO: replace both with local .webp images (max 2080×2080px, max 940kb)
import StatsSection from '../components/StatsSection/StatsSection'

const heroImage = 'https://www.figma.com/api/mcp/asset/7b5bc51c-a56f-4c04-99d2-b68011959e2f'
const aboutTexture = 'https://www.figma.com/api/mcp/asset/becf3c32-1203-42b8-8ad0-873d63b0d5a6'

export default function Home() {
  return (
    <main>

      {/* Hero */}
      <section
        id="hero"
        className="flex flex-col md:flex-row gap-8 pt-[104px] pb-[104px] px-4 md:px-10 min-h-[calc(100svh+64px)]"
      >
        <div className="flex flex-col justify-end gap-2 flex-1 min-w-0 pb-6">
          <p
            className="text-[18px] md:text-[40px] leading-[1.1] font-normal"
            style={{ color: 'var(--color-hero-subtitle)' }}
          >
            Hi, I'm Lisa.
          </p>
          <h1
            className="text-[48px] md:text-[88px] font-medium leading-none tracking-[-0.02em] w-full"
            style={{
              color: 'var(--color-nav-text)',
              fontFamily: 'var(--font-display)',
            }}
          >
            I turn complex problems into real products.
          </h1>
        </div>
        <div className="shrink-0 h-64 w-full md:flex-1 md:h-auto md:w-auto md:min-w-0 relative rounded-[2px] overflow-hidden">
          <img
            src={heroImage}
            alt="Lisa Caspersson working at her desk"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative flex flex-col justify-center gap-6 py-24 md:py-48 px-4 md:px-10 min-h-[75svh]"
        style={{ backgroundColor: 'var(--color-about-bg)' }}
      >
        {/* Background texture */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            alt=""
            src={aboutTexture}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Content */}
        <p
          className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px]"
          style={{ color: 'var(--color-hero-subtitle)' }}
        >
          With 6+ years at the same agency, I've grown from UX designer to leading both projects
          and people. I work across mobile, web, and connected hardware, and I'm most at home when
          the problem is messy and the solution needs to be simple.
        </p>

        <a
          href="#work"
          className="relative self-start inline-flex items-center justify-center px-4 py-3 rounded-full border whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            borderColor: 'var(--color-nav-text)',
            color: 'var(--color-nav-text)',
            fontFamily: 'var(--font-display)',
          }}
        >
          <span className="text-[20px] md:text-2xl font-medium leading-[1.1]">View my work</span>
        </a>
      </section>

      {/* Stats */}
      <StatsSection
        imageSrc={heroImage}
        imageAlt="Lisa Caspersson working at her desk"
      />

    </main>
  )
}
```

- [ ] **Step 2: Run all tests**

```bash
bun test
```

Expected: all tests pass (existing 41 + 5 new = 46)

- [ ] **Step 3: Check dev server in browser**

```bash
bun run dev
```

Open `http://localhost:5173` and scroll past the About section. Verify:
- Stats section appears with the hero image on the left (desktop)
- Each stat fades in as you scroll into its phase
- Each stat fades out as you scroll past it
- Sticky image stays put while scrolling through all 4 stats
- On mobile viewport: image on top, stats stacked below, each fades in once

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: wire StatsSection into Home page"
```
