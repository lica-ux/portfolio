# StatsSection Scroll-Snap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the desktop StatsSection a self-contained scroll-snap container so each stat snaps to the center of the screen.

**Architecture:** The right column becomes a `height: 100svh; overflow-y: scroll` container with `scroll-snap-type: y mandatory`. Each stat row gets `scroll-snap-align: start; scroll-snap-stop: always`. The outer section wrapper shrinks from `min-height: 400svh` to `height: 100svh`. The window scroll listener moves to the right column element.

**Tech Stack:** React 19, Tailwind CSS v4, Happy DOM / bun test / @testing-library/react

---

## Files

- Modify: `src/components/StatsSection/StatsSection.tsx`
- Modify: `src/components/StatsSection/StatsSection.test.tsx`
- Modify: `src/index.css`

---

### Task 1: Add failing tests for new layout structure

**Files:**
- Modify: `src/components/StatsSection/StatsSection.test.tsx`

- [ ] **Step 1: Add two failing tests at the end of the test file**

Open `src/components/StatsSection/StatsSection.test.tsx` and append:

```tsx
test('desktop right column has scroll-snap classes', () => {
  const { getByTestId } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa" />
  )
  const rightCol = getByTestId('stats-right-col')
  expect(rightCol).toHaveClass('snap-y')
  expect(rightCol).toHaveClass('snap-mandatory')
  expect(rightCol).toHaveClass('overflow-y-scroll')
})

test('desktop stat rows have snap classes', () => {
  const { getAllByTestId } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa" />
  )
  const rows = getAllByTestId('stat-row-desktop')
  expect(rows).toHaveLength(4)
  rows.forEach(row => {
    expect(row).toHaveClass('snap-start')
    expect(row).toHaveClass('snap-always')
  })
})
```

- [ ] **Step 2: Run the new tests to confirm they fail**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun test src/components/StatsSection/StatsSection.test.tsx
```

Expected: 2 failing tests (`Unable to find an element by: [data-testid="stats-right-col"]`)

- [ ] **Step 3: Commit the failing tests**

```bash
git add src/components/StatsSection/StatsSection.test.tsx
git commit -m "test: add failing scroll-snap layout tests for StatsSection"
```

---

### Task 2: Update layout and add scroll-snap to StatsSection

**Files:**
- Modify: `src/components/StatsSection/StatsSection.tsx`

- [ ] **Step 1: Add `rightColRef` to the component**

In `StatsSection.tsx`, add one line after the existing `mobileRefs` declaration:

```tsx
const mobileRefs = useRef<(HTMLDivElement | null)[]>([])
const rightColRef = useRef<HTMLDivElement>(null)   // ← add this line
```

- [ ] **Step 2: Update the outer desktop wrapper**

Find this line (line ~82):
```tsx
<div
  className="hidden md:flex"
  style={{ minHeight: `${STATS.length * 100}svh` }}
>
```

Replace with:
```tsx
<div
  className="hidden md:flex"
  style={{ height: '100svh' }}
>
```

- [ ] **Step 3: Update the left column**

Find (line ~86):
```tsx
<div className="w-1/2 sticky top-0 p-4 md:p-10" style={{ height: '100svh' }}>
```

Replace with:
```tsx
<div className="w-1/2 p-4 md:p-10" style={{ height: '100svh' }}>
```

(`sticky top-0` removed — no longer needed since the container is 100svh itself.)

- [ ] **Step 4: Update the right column**

Find (line ~97):
```tsx
<div className="w-1/2 flex flex-col">
```

Replace with:
```tsx
<div
  ref={rightColRef}
  className="w-1/2 flex flex-col overflow-y-scroll snap-y snap-mandatory stats-scroll-container"
  style={{ height: '100svh' }}
  data-testid="stats-right-col"
>
```

- [ ] **Step 5: Update each desktop stat row**

Find (lines ~98–105):
```tsx
{STATS.map((stat, i) => (
  <div
    key={stat}
    ref={el => { desktopRefs.current[i] = el }}
    className="flex items-center px-[10%]"
    style={{ height: '100svh' }}
  >
```

Replace with:
```tsx
{STATS.map((stat, i) => (
  <div
    key={stat}
    ref={el => { desktopRefs.current[i] = el }}
    className="flex items-center px-[10%] snap-start snap-always"
    style={{ height: '100svh' }}
    data-testid="stat-row-desktop"
  >
```

- [ ] **Step 6: Run tests — should now pass**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun test src/components/StatsSection/StatsSection.test.tsx
```

Expected: all 7 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/StatsSection/StatsSection.tsx
git commit -m "feat: convert StatsSection desktop to scroll-snap container"
```

---

### Task 3: Move scroll listener from window to right column element

**Files:**
- Modify: `src/components/StatsSection/StatsSection.tsx`

- [ ] **Step 1: Update the scroll event wiring in `useEffect`**

Inside the `useEffect`, find this block (lines ~44–52):

```tsx
checkDesktopPositions()
window.addEventListener('scroll', onScroll, { passive: true })

const mobileObservers = mobileRefs.current.map((el, i) => {
```

Replace the `window.addEventListener` line and the preceding `checkDesktopPositions()` call with:

```tsx
checkDesktopPositions()
const scrollEl = rightColRef.current
scrollEl?.addEventListener('scroll', onScroll, { passive: true })

const mobileObservers = mobileRefs.current.map((el, i) => {
```

- [ ] **Step 2: Update the cleanup**

In the `return () => { ... }` block, find:

```tsx
window.removeEventListener('scroll', onScroll)
```

Replace with:

```tsx
scrollEl?.removeEventListener('scroll', onScroll)
```

(`scrollEl` is captured in the closure before the cleanup runs, so it references the correct element.)

- [ ] **Step 3: Run all tests**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun test src/components/StatsSection/StatsSection.test.tsx
```

Expected: all 7 tests pass (no test covers the window listener directly; that's fine).

- [ ] **Step 4: Commit**

```bash
git add src/components/StatsSection/StatsSection.tsx
git commit -m "feat: move StatsSection scroll listener to right column element"
```

---

### Task 4: Hide scrollbar on the scroll container

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add scrollbar-hiding CSS after the `.stat-transition` block**

In `src/index.css`, after the closing `}` of the `@media (prefers-reduced-motion: no-preference)` block (currently line ~84), add:

```css
/* Hide scrollbar for stats section scroll container */
.stats-scroll-container {
  scrollbar-width: none;
}
.stats-scroll-container::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 2: Run all tests to confirm nothing broke**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun test
```

Expected: all tests pass (45+ tests, 0 failures).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: hide scrollbar on StatsSection scroll container"
```

---

### Task 5: Manual verification in the browser

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun run dev
```

- [ ] **Step 2: Open `http://localhost:5173` in a browser**

- [ ] **Step 3: Scroll to the StatsSection and verify**

- Right column scrolls independently of the left image column
- Each stat text snaps to the center of the right-column viewport
- `scroll-snap-stop: always` prevents skipping a stat
- Scrollbar is not visible
- Fade-in/fade-out animation still triggers for each stat

- [ ] **Step 4: Update `docs/status.md`**

Add to "Completed this session":
```
- **StatsSection scroll-snap** — right column converted to self-contained scroll-snap container (desktop); each stat snaps to viewport center; window scroll listener moved to column element
```
