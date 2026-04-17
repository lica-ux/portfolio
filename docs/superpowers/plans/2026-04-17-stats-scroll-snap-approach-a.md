# StatsSection Scroll-Snap Approach A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the scroll-trap bug by switching from a self-contained overflow scroll container (Approach B) to page-level scroll snap (Approach A) — the right column becomes a normal block layout again, and CSS `scroll-snap-type: y proximity` on `html` snaps the page to each stat div when scrolling through the stats section.

**Architecture:** Remove `overflow-y-scroll` and snap classes from the right column, restore the outer wrapper to `min-height: 400svh`, restore `sticky top-0` on the left column, keep `snap-start snap-always` only on the stat rows (which remain in page flow). Add `scroll-snap-type: y proximity` to `html` scoped to desktop via a media query in `index.css`. The window scroll listener (already present) handles all fade logic — no changes needed to useEffect logic. Remove now-unused `rightColRef`.

**Tech Stack:** React 19, Tailwind CSS v4, Happy DOM / bun test / @testing-library/react

---

## Files

- Modify: `src/components/StatsSection/StatsSection.tsx`
- Modify: `src/components/StatsSection/StatsSection.test.tsx`
- Modify: `src/index.css`

---

### Task 1: Update the failing test for the right column

The existing test `'desktop right column has scroll-snap classes'` asserts that the right column has `snap-y`, `snap-mandatory`, and `overflow-y-scroll`. These classes are being removed in Approach A. The test must be updated to reflect the new expectation BEFORE the component changes — so it fails first (TDD red), then passes after Task 2.

**Files:**
- Modify: `src/components/StatsSection/StatsSection.test.tsx`

- [ ] **Step 1: Replace the right-column snap test**

In `src/components/StatsSection/StatsSection.test.tsx`, find and replace the entire test on lines 64–72:

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
```

Replace with:

```tsx
test('desktop right column does not trap scroll (no overflow-y-scroll)', () => {
  const { getByTestId } = render(
    <StatsSection imageSrc="/hero.webp" imageAlt="Lisa" />
  )
  const rightCol = getByTestId('stats-right-col')
  expect(rightCol).not.toHaveClass('overflow-y-scroll')
  expect(rightCol).not.toHaveClass('snap-y')
  expect(rightCol).not.toHaveClass('snap-mandatory')
})
```

- [ ] **Step 2: Run tests — new test should fail**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun test src/components/StatsSection/StatsSection.test.tsx
```

Expected: 1 failure — `'desktop right column does not trap scroll'` fails because the right column still has those classes.

- [ ] **Step 3: Commit the updated test**

```bash
git add src/components/StatsSection/StatsSection.test.tsx
git commit -m "test: update right-column test for Approach A (no overflow scroll)"
```

---

### Task 2: Revert StatsSection layout to Approach A

Remove the overflow scroll container, restore the sticky left column and tall outer wrapper, clean up `rightColRef`.

**Files:**
- Modify: `src/components/StatsSection/StatsSection.tsx`

- [ ] **Step 1: Remove `rightColRef`**

Find line 15:
```tsx
  const rightColRef = useRef<HTMLDivElement>(null)
```
Delete this line entirely.

- [ ] **Step 2: Remove `scrollEl` from useEffect**

Find lines 52–53:
```tsx
    const scrollEl = rightColRef.current
    scrollEl?.addEventListener('scroll', onScroll, { passive: true })
```

Delete both lines. The `window.addEventListener` on line 54 stays.

Also find line 75:
```tsx
      scrollEl?.removeEventListener('scroll', onScroll)
```
Delete this line. The `window.removeEventListener` on line 76 stays.

After these deletions, the useEffect scroll section should look like:

```tsx
    checkDesktopPositions()
    window.addEventListener('scroll', onScroll, { passive: true })

    const mobileObservers = mobileRefs.current.map((el, i) => {
```

And the cleanup:

```tsx
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      mobileObservers.forEach(o => o?.disconnect())
    }
```

- [ ] **Step 3: Restore outer wrapper to tall layout**

Find (line ~85–88):
```tsx
      <div
        className="hidden md:flex"
        style={{ height: '100svh' }}
      >
```

Replace with:
```tsx
      <div
        className="hidden md:flex"
        style={{ minHeight: `${STATS.length * 100}svh` }}
      >
```

- [ ] **Step 4: Restore sticky left column**

Find (line ~90):
```tsx
        <div className="w-1/2 p-4 md:p-10" style={{ height: '100svh' }}>
```

Replace with:
```tsx
        <div className="w-1/2 sticky top-0 p-4 md:p-10" style={{ height: '100svh' }}>
```

- [ ] **Step 5: Revert right column — remove overflow scroll classes**

Find (lines ~101–106):
```tsx
        <div
          ref={rightColRef}
          className="w-1/2 flex flex-col overflow-y-scroll snap-y snap-mandatory stats-scroll-container"
          style={{ height: '100svh' }}
          data-testid="stats-right-col"
        >
```

Replace with:
```tsx
        <div
          className="w-1/2 flex flex-col"
          data-testid="stats-right-col"
        >
```

(`ref` removed, overflow/snap classes removed, inline height style removed, `data-testid` kept for tests.)

- [ ] **Step 6: Remove `shrink-0` from stat rows**

Find (line ~111):
```tsx
            className="flex items-center px-[10%] snap-start snap-always shrink-0"
```

Replace with:
```tsx
            className="flex items-center px-[10%] snap-start snap-always"
```

(Remove `shrink-0` only. The `style={{ height: '100svh' }}` on the next line is already present and stays unchanged.)

- [ ] **Step 7: Run tests — all 7 should now pass**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun test src/components/StatsSection/StatsSection.test.tsx
```

Expected: all 7 tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/components/StatsSection/StatsSection.tsx
git commit -m "fix: revert StatsSection to page-flow layout (Approach A)"
```

---

### Task 3: Add page-level scroll-snap to html (desktop only)

Add `scroll-snap-type: y proximity` to `html` scoped to desktop breakpoint. The stat rows already have `snap-start snap-always` from Task 2. No changes to stat rows needed.

`proximity` is used instead of `mandatory` so the hero and about sections scroll freely without being forced to jump to a snap point.

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add scroll-snap-type after the `.stats-scroll-container` block**

In `src/index.css`, after the `.stats-scroll-container` block (currently lines 86–92), add:

```css
/* Page-level scroll snap for stats section — desktop only */
@media (min-width: 768px) {
  html {
    scroll-snap-type: y proximity;
  }
}
```

- [ ] **Step 2: Run all tests**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun test
```

Expected: all tests pass (47 tests, 0 failures).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add page-level scroll-snap proximity for stats section (desktop)"
```

---

### Task 4: Manual browser verification

- [ ] **Step 1: Confirm dev server is running**

```bash
cd /Users/lisacaspersson/GitHub/portfolio && bun run dev
```

- [ ] **Step 2: Verify the following in a real browser**

- Scrolling from hero → about → stats works freely (no snap trap)
- Once in the stats area, each stat text snaps to center of screen
- Can scroll past the stats section without being trapped
- Left image is sticky while scrolling through the 4 stats (desktop)
- Fade-in/fade-out animation still triggers per stat
- Scrollbar is not visible on the right column (CSS class still applied to the div even though there's no overflow scroll — the CSS has no effect, which is fine)
- Mobile layout unchanged

- [ ] **Step 3: Update `docs/status.md`**

Update "Completed this session" to reflect the Approach A fix:

```
- **StatsSection scroll-snap (Approach A)** — reverted to page-flow layout; `scroll-snap-type: y proximity` on html (desktop only); each stat has `snap-start snap-always`; fixes scroll-trap bug from Approach B
```
