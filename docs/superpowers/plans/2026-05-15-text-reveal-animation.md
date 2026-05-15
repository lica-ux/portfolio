# Text Reveal Animation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `RevealText` component (scroll-triggered fade-up entrance) and apply it to all text elements across the portfolio except `StatsSection`.

**Architecture:** `RevealText` mirrors `RevealImage` exactly — IntersectionObserver at 0.15 threshold, inline `opacity` + `translateY(8px→0)`, `delay` prop for stagger, `prefers-reduced-motion` respected. Uses an `as` prop for polymorphic element rendering via a `React.ElementType` cast.

**Tech Stack:** React 19, TypeScript, Bun test + @testing-library/react

---

## File Map

| Action | File |
|---|---|
| Create | `src/components/RevealText/RevealText.tsx` |
| Create | `src/components/RevealText/RevealText.test.tsx` |
| Create | `src/components/RevealText/index.ts` |
| Modify | `src/pages/Home.tsx` |
| Modify | `src/components/SelectedWork/SelectedWork.tsx` |
| Modify | `src/components/MoreWork/MoreWork.tsx` |
| Modify | `src/components/AboutMe/AboutMe.tsx` |
| Modify | `src/components/Footer/Footer.tsx` |
| Modify | `src/components/CaseIntro/CaseIntro.tsx` |
| Modify | `src/pages/CasePage.tsx` |
| Modify | `docs/status.md` |

---

## Task 1: RevealText component

**Files:**
- Create: `src/components/RevealText/RevealText.tsx`
- Create: `src/components/RevealText/index.ts`

- [ ] **Step 1: Create `src/components/RevealText/RevealText.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'li' | 'div'

interface RevealTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TagName
  delay?: number
}

export default function RevealText({ as = 'p', delay = 0, className = '', style, ...rest }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [noMotion, setNoMotion] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reducedMotion) {
      setNoMotion(true)
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setVisible(true))
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: noMotion ? 'none' : `opacity 1.0s ease ${delay}ms, transform 1.1s ease ${delay}ms`,
        ...style,
      }}
      {...rest}
    />
  )
}
```

- [ ] **Step 2: Create `src/components/RevealText/index.ts`**

```ts
export { default } from './RevealText'
```

- [ ] **Step 3: Commit**

```bash
git add src/components/RevealText/RevealText.tsx src/components/RevealText/index.ts
git commit -m "feat: RevealText component (scroll-triggered fade-up)"
```

---

## Task 2: RevealText tests

**Files:**
- Create: `src/components/RevealText/RevealText.test.tsx`

- [ ] **Step 1: Create `src/components/RevealText/RevealText.test.tsx`**

```tsx
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
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  })
  const { getByText } = render(<RevealText>Hello</RevealText>)
  const el = getByText('Hello') as HTMLElement
  expect(el.style.opacity).toBe('1')
  expect(observeMock).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Run tests**

```bash
bun test src/components/RevealText/RevealText.test.tsx
```

Expected: 9 tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/RevealText/RevealText.test.tsx
git commit -m "test: RevealText component tests"
```

---

## Task 3: Apply to Home.tsx — Hero section

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Add RevealText import to `src/pages/Home.tsx`**

After the existing `import RevealImage from '../components/RevealImage'` line, add:
```tsx
import RevealText from '../components/RevealText'
```

- [ ] **Step 2: Replace hero text elements**

Replace the `<div className="flex flex-col gap-2 md:flex-1 min-w-0 md:pb-6 md:justify-end">` block:

```tsx
{/* before */}
<div className="flex flex-col gap-2 md:flex-1 min-w-0 md:pb-6 md:justify-end">
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
```

```tsx
{/* after */}
<div className="flex flex-col gap-2 md:flex-1 min-w-0 md:pb-6 md:justify-end">
  <RevealText
    as="p"
    delay={0}
    className="text-[18px] md:text-[40px] leading-[1.1] font-normal"
    style={{ color: 'var(--color-hero-subtitle)' }}
  >
    Hi, I'm Lisa.
  </RevealText>
  <RevealText
    as="h1"
    delay={120}
    className="text-[48px] md:text-[88px] font-medium leading-none tracking-[-0.02em] w-full"
    style={{
      color: 'var(--color-nav-text)',
      fontFamily: 'var(--font-display)',
    }}
  >
    I turn complex problems into real products.
  </RevealText>
</div>
```

Also replace the hero Button:
```tsx
{/* before */}
<Button href="#work" className="relative self-start">View my work</Button>
```
```tsx
{/* after */}
<RevealText as="div" delay={240} className="relative self-start">
  <Button href="#work">View my work</Button>
</RevealText>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: RevealText on hero section"
```

---

## Task 4: Apply to Home.tsx — About section

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Replace about section text elements**

In the about `<section id="about">`, replace:
```tsx
{/* before */}
<p
  className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px]"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  With 6+ years at the same agency, I've grown from UX designer to leading both projects
  and people. I work across mobile, web, and connected hardware, and I'm most at home when
  the problem is messy and the solution needs to be simple.
</p>

<Button href="#work" className="relative self-start">View my work</Button>
```

```tsx
{/* after */}
<RevealText
  as="p"
  delay={0}
  className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px]"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  With 6+ years at the same agency, I've grown from UX designer to leading both projects
  and people. I work across mobile, web, and connected hardware, and I'm most at home when
  the problem is messy and the solution needs to be simple.
</RevealText>

<RevealText as="div" delay={180} className="relative self-start">
  <Button href="#work">View my work</Button>
</RevealText>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: RevealText on about section"
```

---

## Task 5: Apply to SelectedWork

**Files:**
- Modify: `src/components/SelectedWork/SelectedWork.tsx`

- [ ] **Step 1: Add import**

After existing imports, add:
```tsx
import RevealText from '../RevealText'
```

- [ ] **Step 2: Replace the heading**

```tsx
{/* before */}
<h2
  className="flex-1 text-[40px] md:text-[56px] font-medium leading-[1.1]"
  style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
>
  Selected work
</h2>
```

```tsx
{/* after */}
<RevealText
  as="h2"
  delay={0}
  className="flex-1 text-[40px] md:text-[56px] font-medium leading-[1.1]"
  style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
>
  Selected work
</RevealText>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SelectedWork/SelectedWork.tsx
git commit -m "feat: RevealText on SelectedWork heading"
```

---

## Task 6: Apply to MoreWork

**Files:**
- Modify: `src/components/MoreWork/MoreWork.tsx`

- [ ] **Step 1: Add import**

After existing imports, add:
```tsx
import RevealText from '../RevealText'
```

- [ ] **Step 2: Replace the heading**

```tsx
{/* before */}
<h2
  className="text-[40px] font-medium leading-[1.1]"
  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)' }}
>
  More work, <span style={{ color: 'var(--color-hero-subtitle)' }}>briefly.</span>
</h2>
```

```tsx
{/* after */}
<RevealText
  as="h2"
  delay={0}
  className="text-[40px] font-medium leading-[1.1]"
  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)' }}
>
  More work, <span style={{ color: 'var(--color-hero-subtitle)' }}>briefly.</span>
</RevealText>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/MoreWork/MoreWork.tsx
git commit -m "feat: RevealText on MoreWork heading"
```

---

## Task 7: Apply to AboutMe

**Files:**
- Modify: `src/components/AboutMe/AboutMe.tsx`

- [ ] **Step 1: Add import**

After existing imports, add:
```tsx
import RevealText from '../RevealText'
```

- [ ] **Step 2: Section 1 — wrap h2 and body div**

Replace the `<h2>`:
```tsx
{/* before */}
<h2
  className="text-[32px] md:text-[56px] font-medium leading-[1.1]"
  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)' }}
>
  About me
</h2>
```
```tsx
{/* after */}
<RevealText
  as="h2"
  delay={0}
  className="text-[32px] md:text-[56px] font-medium leading-[1.1]"
  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)' }}
>
  About me
</RevealText>
```

Replace the body `<div>` containing three `<p>` tags:
```tsx
{/* before */}
<div
  className="text-[20px] md:text-[24px] font-normal leading-[1.18] space-y-[1.18em] max-w-[1024px]"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  <p>I started in UX, taught myself UI, and never stopped learning.</p>
  <p>
    Over six years I've grown into leading projects, mentoring designers, and defining
    how we work as a team. I often bridge the gap between design, tech, and business and
    step into product roles when no one else does.
  </p>
  <p>
    I believe great design is about clarity. Colour, structure, and interaction aren't
    decoration. They're how products communicate.
  </p>
</div>
```
```tsx
{/* after */}
<RevealText
  as="div"
  delay={120}
  className="text-[20px] md:text-[24px] font-normal leading-[1.18] space-y-[1.18em] max-w-[1024px]"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  <p>I started in UX, taught myself UI, and never stopped learning.</p>
  <p>
    Over six years I've grown into leading projects, mentoring designers, and defining
    how we work as a team. I often bridge the gap between design, tech, and business and
    step into product roles when no one else does.
  </p>
  <p>
    I believe great design is about clarity. Colour, structure, and interaction aren't
    decoration. They're how products communicate.
  </p>
</RevealText>
```

- [ ] **Step 3: Section 2 — wrap hobby text**

```tsx
{/* before */}
<p
  className="text-[20px] md:text-[24px] font-normal leading-[1.18]"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  Outside of work I paint, play piano by ear, and knit, which unsurprisingly isn't
  that different from product design: patience, iteration, and attention to detail.
</p>
```
```tsx
{/* after */}
<RevealText
  as="p"
  delay={0}
  className="text-[20px] md:text-[24px] font-normal leading-[1.18]"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  Outside of work I paint, play piano by ear, and knit, which unsurprisingly isn't
  that different from product design: patience, iteration, and attention to detail.
</RevealText>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutMe/AboutMe.tsx
git commit -m "feat: RevealText on AboutMe sections"
```

---

## Task 8: Apply to Footer — contact section

**Files:**
- Modify: `src/components/Footer/Footer.tsx`

Only the contact section (above the footer bar) gets RevealText. The footer bar (name, nav columns) is not animated.

- [ ] **Step 1: Add import**

After existing imports, add:
```tsx
import RevealText from '../RevealText'
```

- [ ] **Step 2: Replace contact section elements**

Replace the `<div className="flex flex-col gap-4">` block and the buttons div:

```tsx
{/* before */}
<div className="flex flex-col gap-4">
  <h2
    className="text-[40px] md:text-[64px] font-medium leading-[1.1]"
    style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
  >
    Contact
  </h2>
  <p
    className="text-[22px] md:text-[32px] font-normal leading-[1.18]"
    style={{ color: 'var(--color-hero-subtitle)' }}
  >
    Want to work together or just talk design?<br />
    I'd love to hear from you.
  </p>
</div>

<div className="flex gap-4 flex-wrap">
  <Button href="mailto:lisa@caspersson.biz">Email</Button>
  <Button
    href="https://www.linkedin.com/in/lisa-caspersson-01231787/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Linkedin
  </Button>
</div>
```

```tsx
{/* after */}
<div className="flex flex-col gap-4">
  <RevealText
    as="h2"
    delay={0}
    className="text-[40px] md:text-[64px] font-medium leading-[1.1]"
    style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
  >
    Contact
  </RevealText>
  <RevealText
    as="p"
    delay={120}
    className="text-[22px] md:text-[32px] font-normal leading-[1.18]"
    style={{ color: 'var(--color-hero-subtitle)' }}
  >
    Want to work together or just talk design?<br />
    I'd love to hear from you.
  </RevealText>
</div>

<RevealText as="div" delay={260} className="flex gap-4 flex-wrap">
  <Button href="mailto:lisa@caspersson.biz">Email</Button>
  <Button
    href="https://www.linkedin.com/in/lisa-caspersson-01231787/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Linkedin
  </Button>
</RevealText>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer/Footer.tsx
git commit -m "feat: RevealText on Footer contact section"
```

---

## Task 9: Apply to CaseIntro

**Files:**
- Modify: `src/components/CaseIntro/CaseIntro.tsx`

- [ ] **Step 1: Rewrite `src/components/CaseIntro/CaseIntro.tsx`**

```tsx
import type { CaseIntroProps } from './CaseIntro.types'
import RevealText from '../RevealText'

export default function CaseIntro({ title, tags, headline, metaLines }: CaseIntroProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 py-10 md:py-14">
        <RevealText
          as="p"
          delay={0}
          className="font-display font-normal leading-[0.94] text-[48px] md:text-[104px]"
          style={{ color: 'var(--color-nav-text)' }}
        >
          {title}
        </RevealText>
        <RevealText as="div" delay={0} className="flex gap-1 items-start md:pt-2 shrink-0">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center justify-center px-2 py-[6px] rounded-full border text-[14px] font-medium lowercase tracking-[-0.02em]"
              style={{
                borderColor: 'rgba(73, 17, 41, 0.3)',
                color: 'var(--color-nav-text)',
              }}
            >
              {tag}
            </span>
          ))}
        </RevealText>
      </div>

      <div className="flex flex-col md:flex-row gap-8 pb-20 md:pb-52">
        <RevealText
          as="p"
          delay={120}
          className="md:flex-1 font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em] md:max-w-[640px] whitespace-pre-line"
          style={{ color: 'var(--color-nav-text)' }}
        >
          {headline}
        </RevealText>
        <RevealText
          as="div"
          delay={260}
          className="flex flex-col gap-1 text-base md:text-[24px] leading-[1.24] md:flex-1"
          style={{ color: 'var(--color-hero-subtitle)' }}
        >
          {metaLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </RevealText>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CaseIntro/CaseIntro.tsx
git commit -m "feat: RevealText on CaseIntro"
```

---

## Task 10: Apply to CasePage — text sections

**Files:**
- Modify: `src/pages/CasePage.tsx`

CasePage has these text blocks to animate:
1. Peach intro paragraph (the big context quote)
2. Three (or four for Booky) content sections, each with `<h2>` + `<p>`
3. Closing paragraph

- [ ] **Step 1: Add import to `src/pages/CasePage.tsx`**

After the existing `import RevealImage from '../components/RevealImage'` line, add:
```tsx
import RevealText from '../components/RevealText'
```

- [ ] **Step 2: Wrap the peach intro `<p>`**

```tsx
{/* before */}
<p
  className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px] whitespace-pre-line"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  {slug === 'sejfa'
    ? <>...</>
    : slug === 'booky'
    ? <>...</>
    : <>...</>
  }
</p>
```

```tsx
{/* after */}
<RevealText
  as="p"
  delay={0}
  className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px] whitespace-pre-line"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  {slug === 'sejfa'
    ? <>...</>
    : slug === 'booky'
    ? <>...</>
    : <>...</>
  }
</RevealText>
```

Keep all JSX content inside unchanged — only the outer tag changes.

- [ ] **Step 3: Wrap h2 + p in each content section**

There are 4 content section divs with class `"md:flex-1 flex flex-col gap-4 md:justify-center"`. In each one, replace the `<h2>` and `<p>`:

```tsx
{/* before — pattern in each of the 4 text-column divs */}
<h2 className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]" style={{ color: 'var(--color-nav-text)' }}>
  {headingContent}
</h2>
<p className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line" style={{ color: 'var(--color-hero-subtitle)' }}>
  {bodyContent}
</p>
```

```tsx
{/* after — same pattern in each of the 4 text-column divs */}
<RevealText as="h2" delay={0} className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]" style={{ color: 'var(--color-nav-text)' }}>
  {headingContent}
</RevealText>
<RevealText as="p" delay={150} className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line" style={{ color: 'var(--color-hero-subtitle)' }}>
  {bodyContent}
</RevealText>
```

Apply to all 4 text-column divs (3 shared + 1 Booky-only section).

- [ ] **Step 4: Wrap the closing `<p>`**

```tsx
{/* before */}
<p
  className="text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px] whitespace-pre-line"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  {slug === 'sejfa' ? `...` : slug === 'booky' ? `...` : `...`}
</p>
```

```tsx
{/* after */}
<RevealText
  as="p"
  delay={0}
  className="text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px] whitespace-pre-line"
  style={{ color: 'var(--color-hero-subtitle)' }}
>
  {slug === 'sejfa' ? `...` : slug === 'booky' ? `...` : `...`}
</RevealText>
```

Keep all string content unchanged — only the outer tag changes.

- [ ] **Step 5: Commit**

```bash
git add src/pages/CasePage.tsx
git commit -m "feat: RevealText on CasePage text sections"
```

---

## Task 11: Full test suite + status update

- [ ] **Step 1: Run all tests**

```bash
bun test
```

Expected: all existing tests pass + 9 new RevealText tests. Total should be previous count + 9.

- [ ] **Step 2: Update `docs/status.md`**

Under "Completed this session (2026-05-15)", add:

```
- **RevealText component** — `src/components/RevealText/` built
  - Scroll-triggered fade-up: `translateY(8px→0)` + `opacity 0→1`, 1.0–1.1s ease
  - Same IntersectionObserver pattern as RevealImage (threshold 0.15)
  - `as` prop for polymorphic rendering (h1–h6, p, span, li, div)
  - `delay` prop for stagger control
  - `prefers-reduced-motion` respected — renders visible immediately
  - Applied to: Hero, About, SelectedWork, MoreWork, AboutMe, Footer contact, CaseIntro, CasePage content sections
  - Excluded: StatsSection (has own scroll animation), Nav, decorative backgrounds
  - 9 tests, all passing
```

- [ ] **Step 3: Commit**

```bash
git add docs/status.md
git commit -m "docs: update status after RevealText implementation"
```
