# Design: Image Reveal Animation

**Date:** 2026-05-01
**Status:** Approved

---

## Summary

All content images on the site get a scroll-triggered fade + blur reveal animation. When an image enters the viewport, it transitions from `opacity: 0; filter: blur(12px)` to fully visible over 0.8s. Decorative background images are excluded. Groups of images stagger with 150ms delay between each.

---

## Animation Spec

| Property | Value |
|---|---|
| Style | `opacity: 0 → 1` + `filter: blur(12px) → blur(0)` |
| Trigger | IntersectionObserver — fires when image is ≥15% in viewport |
| Duration | `0.8s ease` |
| Fires | Once only — observer disconnects after first intersection |
| Stagger | 150ms delay per image index in grouped sections |
| Reduced motion | Images appear instantly (no animation) when `prefers-reduced-motion: reduce` |

---

## Component: `RevealImage`

**Location:** `src/components/RevealImage/RevealImage.tsx`

**Props:** All standard `<img>` HTML attributes, plus:
- `delay?: number` — animation-delay in ms (default: `0`)

**Behaviour:**
1. Renders `<img>` with class `img-reveal` (sets `opacity: 0`)
2. `useEffect` creates an `IntersectionObserver` with `threshold: 0.15`
3. On intersection: adds class `img-revealed`, disconnects observer
4. `prefers-reduced-motion`: checks `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, adds `img-revealed` immediately without waiting for intersection
5. `delay` is set as inline `animationDelay` style

**Files:**
- `src/components/RevealImage/RevealImage.tsx` — component
- `src/components/RevealImage/index.ts` — barrel export
- `src/components/RevealImage/RevealImage.test.tsx` — tests

---

## CSS

Added to `src/index.css`:

```css
@keyframes revealImage {
  from { opacity: 0; filter: blur(12px); }
  to   { opacity: 1; filter: blur(0); }
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

---

## Scope of Changes

### Images that get `<RevealImage>` (content images)

| File | Image | Delay |
|---|---|---|
| `src/pages/Home.tsx` | `heroImage` (portrait) | 0ms |
| `src/components/StatsSection/StatsSection.tsx` | Desktop sticky image | 0ms |
| `src/components/StatsSection/StatsSection.tsx` | Mobile image | 0ms |
| `src/components/CaseHero/CaseHero.tsx` | Case hero image | 0ms |
| `src/components/SelectedWork/SelectedWork.tsx` | Baribuddy card | 0ms |
| `src/components/SelectedWork/SelectedWork.tsx` | Booky card | 150ms |
| `src/components/SelectedWork/SelectedWork.tsx` | Sejfa card | 300ms |
| `src/pages/CasePage.tsx` | Section image 1 | 0ms |
| `src/pages/CasePage.tsx` | Section image 2 | 0ms |
| `src/pages/CasePage.tsx` | Section image 3 | 0ms |

> CasePage section images are in separate full-height sections that scroll into view one at a time, so no stagger is needed there.

### Images NOT updated (decorative backgrounds)

These use `gradient.webp` or `aboutTexture`, always have `aria-hidden="true"`, and are rendered at low opacity as texture layers. They should remain static.

| File | Image |
|---|---|
| `src/pages/Home.tsx` | `gradientImage` (About bg) |
| `src/pages/Home.tsx` | `aboutTexture` |
| `src/pages/CasePage.tsx` | `gradientImage` (section bg) |
| `src/components/MoreWork/MoreWork.tsx` | `gradientImage` |
| `src/components/Footer/Footer.tsx` | `gradientImage` |

---

## Tests

`RevealImage.test.tsx` covers:
- Renders an `<img>` with the correct `src`, `alt`, and forwarded props
- Has class `img-reveal` before intersection
- Adds class `img-revealed` after mocked intersection
- Applies correct `animationDelay` when `delay` prop is set
- Shows image immediately when `prefers-reduced-motion: reduce` is active
