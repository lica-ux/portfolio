# Mobile Bottom Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the nav pill to the bottom of the screen on mobile, keeping it at the top on desktop.

**Architecture:** Single className change on the `<nav>` element in `Nav.tsx`. Tailwind responsive prefixes handle the breakpoint — no JS, no extra components.

**Tech Stack:** React 19, Tailwind CSS v4, bun test + @testing-library/react

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/components/Nav.tsx` | Change nav positioning classes |
| Modify | `src/components/Nav.test.tsx` | Add test for bottom positioning on mobile |

---

### Task 1: Move nav to bottom on mobile

**Files:**
- Modify: `src/components/Nav.tsx`
- Modify: `src/components/Nav.test.tsx`

- [ ] **Step 1: Write the failing test**

Open `src/components/Nav.test.tsx` and add this test at the bottom:

```tsx
test('nav is positioned at bottom on mobile and top on desktop', () => {
  const { container } = render(<Nav />)
  const nav = container.querySelector('nav')
  expect(nav?.className).toContain('bottom-4')
  expect(nav?.className).toContain('md:top-4')
  expect(nav?.className).toContain('md:bottom-auto')
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
bun test src/components/Nav.test.tsx
```

Expected: 2 pass, 1 fail — new test fails because `bottom-4` is not in className yet.

- [ ] **Step 3: Update Nav.tsx**

In `src/components/Nav.tsx`, change the `<nav>` className from:

```tsx
<nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-10 py-4">
```

to:

```tsx
<nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:px-10 py-4 md:top-4 md:bottom-auto">
```

- [ ] **Step 4: Run all tests**

```bash
bun test src/components/Nav.test.tsx
```

Expected: 3 pass, 0 fail.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "feat: move nav to bottom on mobile"
```
