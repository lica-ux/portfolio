# Stats Section — Design Spec

**Date:** 2026-04-16
**Status:** Approved

---

## Overview

A new section on the Home page, placed after the About section. Displays four career stats one at a time using scroll-driven fade animations. On desktop, the image is sticky while the user scrolls through the stats. On mobile, the image sits above the stats in normal document flow.

---

## Content

Stats displayed in order:

1. 6+ years
2. 30+ products
3. 2 acquisitions
4. 2 design awards

No sub-labels for now. May be added later without structural changes.

---

## Desktop layout (≥768px)

- Section height: `400vh` (4 × viewport height — one phase per stat)
- Two columns, 50/50 split
- **Left column:** hero image (`src` same as existing `heroImage` in `Home.tsx`), `position: sticky; top: 0; height: 100svh; overflow: hidden`
- **Right column:** 4 phase divs, each `height: 100svh`, flex-centered
- Background: `var(--color-bg)` (#f8f3ff)

### Animation (desktop)

- Each phase div has a ref attached to an `IntersectionObserver` with `threshold: 0.5`
- When ≥50% visible: stat fades **in** — `opacity: 0 → 1`, `translateY(24px) → translateY(0)`
- When <50% visible (leaving): stat fades **out** — `opacity: 1 → 0`, `translateY(0) → translateY(-24px)`
- CSS transition: `opacity 0.6s ease, transform 0.6s ease`
- State: each phase tracks its own `visible: boolean` via `useState`

---

## Mobile layout (<768px)

- Section height: natural document flow
- Stack: image on top (full width, `aspect-ratio: 4/3`, no sticky), stats below
- Each stat row: `padding: 48px 24px`, `border-bottom: 1px solid var(--color-border)`
- Animation: fade-in only (no fade-out) — stats stay visible once they enter the viewport
- `IntersectionObserver` with `threshold: 0.3` (lower threshold for earlier trigger on small screens)

---

## Typography

- Font: `var(--font-display)` (Syne)
- Weight: 600
- Desktop size: 64px
- Mobile size: 40px
- Letter-spacing: `-0.02em`
- Color: `var(--color-nav-text)` (#491129)

---

## Component

**New file:** `src/components/StatsSection/StatsSection.tsx`

Props:
```ts
interface StatsSectionProps {
  imageSrc: string
  imageAlt: string
}
```

Stats are hardcoded inside the component (not passed as props — content is fixed for this portfolio).

The component uses:
- `useRef` array for the 4 phase elements
- `useEffect` to set up `IntersectionObserver` instances
- `useState` array for `visible[]` booleans (one per stat)
- `useEffect` cleanup to disconnect observers on unmount

---

## Placement in Home.tsx

Added as a new `<section id="stats">` after the existing `#about` section.

The `heroImage` URL already defined in `Home.tsx` is passed down as `imageSrc`.

---

## Tokens used

| Token | Usage |
|---|---|
| `--color-bg` | Section background |
| `--color-nav-text` | Stat text color |
| `--color-border` | Divider lines on mobile |
| `--font-display` | Stat typography |

No new tokens needed.

---

## Out of scope

- Sub-labels under stats (deferred)
- Dark mode specific overrides (existing tokens handle it)
- Scroll progress indicator (approach C, not chosen)
