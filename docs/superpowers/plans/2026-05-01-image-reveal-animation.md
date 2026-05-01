# Image Reveal Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a scroll-triggered blur+fade reveal animation to all content images on the site via a reusable `RevealImage` component.

**Architecture:** A `RevealImage` component wraps `<img>`, uses `IntersectionObserver` to detect when the image enters the viewport (≥15%), then applies a CSS animation class. A `delay` prop enables stagger for grouped images. Decorative background images (gradient textures with `aria-hidden`) are left untouched.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, `@keyframes` in `src/index.css`, `bun test` + `@testing-library/react`

---

### Task 1: Add CSS animation to `src/index.css`

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add keyframe and utility classes**

Open `src/index.css`. Find the block around line 80 (near `.stat-transition`). Add the following directly below the existing `@media (prefers-reduced-motion: no-preference)` block:

```css
@keyframes revealImage {
  from { opacity: 0; filter: blur(12px); }
  to   { opacity: 1; filter: blur(0px); }
}

.img-reveal {
  opacity: 0;
}

.img-revealed {
  animation: revealImage 0.8s ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  .img-reveal {
    opacity: 1;
  }
  .img-revealed {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify dev server still compiles**

```bash
bun run dev
```

Expected: no errors in terminal, site loads normally.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add revealImage keyframe and CSS classes"
```

---

### Task 2: Write failing tests for `RevealImage`

**Files:**
- Create: `src/components/RevealImage/RevealImage.test.tsx`

- [ ] **Step 1: Create the test file**

Create `src/components/RevealImage/RevealImage.test.tsx` with this content:

```tsx
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

test('has img-reveal class before intersection', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" />
  )
  expect(getByRole('img')).toHaveClass('img-reveal')
})

test('adds img-revealed class after intersection', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" />
  )
  triggerIntersection(true)
  expect(getByRole('img')).toHaveClass('img-revealed')
})

test('does not add img-revealed when isIntersecting is false', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" />
  )
  triggerIntersection(false)
  expect(getByRole('img')).not.toHaveClass('img-revealed')
})

test('disconnects observer after intersection', () => {
  render(<RevealImage src="/test.webp" alt="Test image" />)
  triggerIntersection(true)
  expect(disconnectMock).toHaveBeenCalled()
})

test('applies animationDelay from delay prop', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" delay={150} />
  )
  const img = getByRole('img') as HTMLImageElement
  expect(img.style.animationDelay).toBe('150ms')
})

test('forwards className to img element', () => {
  const { getByRole } = render(
    <RevealImage src="/test.webp" alt="Test image" className="w-full h-full object-cover" />
  )
  expect(getByRole('img')).toHaveClass('w-full')
})
```

- [ ] **Step 2: Run tests and confirm they fail**

```bash
bun test src/components/RevealImage/RevealImage.test.tsx
```

Expected: tests fail with "Cannot find module './RevealImage'"

---

### Task 3: Implement `RevealImage` component

**Files:**
- Create: `src/components/RevealImage/RevealImage.tsx`
- Create: `src/components/RevealImage/index.ts`

- [ ] **Step 1: Create the component**

Create `src/components/RevealImage/RevealImage.tsx`:

```tsx
import { useEffect, useRef } from 'react'

interface RevealImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  delay?: number
}

export default function RevealImage({ delay = 0, className = '', style, ...props }: RevealImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      el.classList.add('img-revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('img-revealed')
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      className={`img-reveal ${className}`}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...props}
    />
  )
}
```

- [ ] **Step 2: Create barrel export**

Create `src/components/RevealImage/index.ts`:

```ts
export { default } from './RevealImage'
```

- [ ] **Step 3: Run tests**

```bash
bun test src/components/RevealImage/RevealImage.test.tsx
```

Expected: all 7 tests pass.

- [ ] **Step 4: Run full test suite to check for regressions**

```bash
bun test
```

Expected: same number of passing tests as before (50 passing, 1 pre-existing failure in StatsSection unrelated to this change).

- [ ] **Step 5: Commit**

```bash
git add src/components/RevealImage/
git commit -m "feat: add RevealImage component with scroll-triggered blur-fade reveal"
```

---

### Task 4: Apply `RevealImage` to hero image in `Home.tsx`

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Replace the hero `<img>` with `<RevealImage>`**

In `src/pages/Home.tsx`, add the import at the top (after existing imports):

```tsx
import RevealImage from '../components/RevealImage'
```

Find this block (around line 38–44):

```tsx
<div className="flex-1 w-full md:flex-1 md:h-auto md:w-auto md:min-w-0 relative rounded-[2px] overflow-hidden">
  <img
    src={statsImage}
    alt="Lisa Caspersson working at her desk"
    className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
  />
</div>
```

Replace `<img` with `<RevealImage` and close with `/>` (self-closing):

```tsx
<div className="flex-1 w-full md:flex-1 md:h-auto md:w-auto md:min-w-0 relative rounded-[2px] overflow-hidden">
  <RevealImage
    src={statsImage}
    alt="Lisa Caspersson working at her desk"
    className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
  />
</div>
```

- [ ] **Step 2: Run tests**

```bash
bun test
```

Expected: all tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: reveal animation on hero image"
```

---

### Task 5: Apply `RevealImage` to `StatsSection.tsx`

**Files:**
- Modify: `src/components/StatsSection/StatsSection.tsx`

- [ ] **Step 1: Add import**

In `src/components/StatsSection/StatsSection.tsx`, add after the existing imports:

```tsx
import RevealImage from '../RevealImage'
```

- [ ] **Step 2: Replace desktop sticky image (around line 93–97)**

Find:

```tsx
<img
  src={imageSrc}
  alt={imageAlt}
  className="absolute inset-0 w-full h-full object-cover"
/>
```

(Inside the `{/* Left: image */}` sticky block.) Replace with:

```tsx
<RevealImage
  src={imageSrc}
  alt={imageAlt}
  className="absolute inset-0 w-full h-full object-cover"
/>
```

- [ ] **Step 3: Replace mobile image (around line 148–152)**

Find the second `<img>` block (inside `{/* Mobile layout */}`):

```tsx
<img
  src={imageSrc}
  alt={imageAlt}
  className="w-full h-full object-cover"
/>
```

Replace with:

```tsx
<RevealImage
  src={imageSrc}
  alt={imageAlt}
  className="w-full h-full object-cover"
/>
```

- [ ] **Step 4: Run tests**

```bash
bun test
```

Expected: all tests still pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/StatsSection/StatsSection.tsx
git commit -m "feat: reveal animation on StatsSection images"
```

---

### Task 6: Apply `RevealImage` to `CaseHero.tsx`

**Files:**
- Modify: `src/components/CaseHero/CaseHero.tsx`

- [ ] **Step 1: Add import and replace `<img>`**

In `src/components/CaseHero/CaseHero.tsx`, replace the entire file content:

```tsx
import type { CaseHeroProps } from './CaseHero.types'
import RevealImage from '../RevealImage'

// TODO: replace imageSrc with local .webp (max 2080×2080px, max 940kb)
export default function CaseHero({ imageSrc, imageAlt }: CaseHeroProps) {
  return (
    <div className="w-full overflow-hidden rounded-[2px] h-[240px] md:h-[640px]">
      <RevealImage
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
```

- [ ] **Step 2: Run tests**

```bash
bun test
```

Expected: all tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseHero/CaseHero.tsx
git commit -m "feat: reveal animation on CaseHero image"
```

---

### Task 7: Apply `RevealImage` to `SelectedWork.tsx` with stagger

**Files:**
- Modify: `src/components/SelectedWork/SelectedWork.tsx`

- [ ] **Step 1: Add import**

In `src/components/SelectedWork/SelectedWork.tsx`, add after existing imports:

```tsx
import RevealImage from '../RevealImage'
```

- [ ] **Step 2: Add index to map and replace `<img>` with stagger delay**

Find this block (around line 49–61):

```tsx
{projects.map((project) => (
  <Link
    key={project.title}
    to={`/work/${project.slug}`}
    className="flex flex-col gap-6 items-start flex-1 min-w-[240px] no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)]"
  >
    <div className="overflow-hidden relative w-full rounded-[2px] aspect-[3/4] md:aspect-auto md:flex-1">
      <img
        src={project.imageSrc}
        alt={project.imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
```

Replace with (add `index` to map, pass `delay`):

```tsx
{projects.map((project, index) => (
  <Link
    key={project.title}
    to={`/work/${project.slug}`}
    className="flex flex-col gap-6 items-start flex-1 min-w-[240px] no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)]"
  >
    <div className="overflow-hidden relative w-full rounded-[2px] aspect-[3/4] md:aspect-auto md:flex-1">
      <RevealImage
        src={project.imageSrc}
        alt={project.imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        delay={index * 150}
      />
    </div>
```

- [ ] **Step 3: Run tests**

```bash
bun test
```

Expected: all tests still pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/SelectedWork/SelectedWork.tsx
git commit -m "feat: reveal animation on SelectedWork project images with stagger"
```

---

### Task 8: Apply `RevealImage` to content images in `CasePage.tsx`

**Files:**
- Modify: `src/pages/CasePage.tsx`

- [ ] **Step 1: Add import**

In `src/pages/CasePage.tsx`, add after existing imports:

```tsx
import RevealImage from '../components/RevealImage'
```

- [ ] **Step 2: Replace all three section `<img>` elements**

There are three identical blocks in CasePage.tsx (lines ~60–64, ~87–91, ~113–117). Each looks like:

```tsx
<img
  src={placeholderImage}
  alt=""
  className="absolute inset-0 w-full h-full object-cover"
/>
```

Replace all three with `<RevealImage>` (no stagger — each section scrolls in independently):

```tsx
<RevealImage
  src={placeholderImage}
  alt=""
  className="absolute inset-0 w-full h-full object-cover"
/>
```

Do **not** change the decorative `<img>` that uses `gradientImage` (line ~43–47, inside `aria-hidden="true"` div).

- [ ] **Step 3: Run full test suite**

```bash
bun test
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/pages/CasePage.tsx
git commit -m "feat: reveal animation on CasePage content images"
```

---

### Task 9: Manual smoke test in browser

- [ ] **Step 1: Start dev server**

```bash
bun run dev
```

- [ ] **Step 2: Check each location**

Visit `http://localhost:5173` and verify:

| Location | What to check |
|---|---|
| Hero section | Portrait fades in with blur on load |
| About section | Gradient background does NOT animate (stays visible) |
| StatsSection | Image fades in with blur when scrolled into view |
| SelectedWork | 3 project cards stagger in (Baribuddy → Booky → Sejfa, 150ms apart) |
| `/work/baribuddy` | Case hero image animates on load |
| Case content sections | Each section image animates as it scrolls in |

- [ ] **Step 3: Check reduced motion**

In Chrome DevTools → Rendering tab → enable "Emulate CSS media feature prefers-reduced-motion". Verify all images appear instantly without blur.

- [ ] **Step 4: Update `docs/status.md`**

Add to the "Completed this session" block:

```
- **Image reveal animation** — `RevealImage` component in `src/components/RevealImage/`; scroll-triggered blur+fade (0.8s) via IntersectionObserver; stagger on SelectedWork (0/150/300ms); `prefers-reduced-motion` respected; applied to: hero, StatsSection, CaseHero, SelectedWork, CasePage content sections
```

- [ ] **Step 5: Final commit**

```bash
git add docs/status.md
git commit -m "docs: update status after image reveal animation"
```
