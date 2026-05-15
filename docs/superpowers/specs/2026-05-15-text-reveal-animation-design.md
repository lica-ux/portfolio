# Text reveal animation — design spec

**Date:** 2026-05-15

---

## Summary

A standard scroll-triggered entrance animation for text elements across the portfolio. Fade up: `opacity 0→1` + `translateY(8px→0)`, 1.0–1.1s ease, triggered by IntersectionObserver when the element enters the viewport. Excludes StatsSection (has its own scroll animation).

---

## Component

### `RevealText`

`src/components/RevealText/RevealText.tsx`

Mirrors the structure of `RevealImage` exactly — same IntersectionObserver logic, same `prefers-reduced-motion` handling, same `delay` prop pattern.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `'h1'…'h6' \| 'p' \| 'span' \| 'li' \| 'div'` | `'p'` | HTML element to render |
| `delay` | `number` | `0` | Animation start delay in ms |
| `className` | `string` | `''` | Forwarded to the element |
| `...rest` | HTML attributes | — | Spread onto the element |

**Animation values:**

```
translateY: 8px → 0
opacity: 0 → 1
duration: 1.0s (tag/body), 1.1s (heading)
easing: ease
```

**Reduced motion:** when `prefers-reduced-motion: reduce` matches, skip the animation and render the element fully visible immediately (same as `RevealImage`).

**IntersectionObserver threshold:** `0.15` (same as `RevealImage`).

---

## Stagger convention

Within each section, stagger elements by these fixed delays:

| Position in group | Delay |
|---|---|
| 1st element (tag, label) | 0 ms |
| 2nd element (heading) | 120 ms |
| 3rd element (body / meta) | 240 ms |
| 4th element (CTA / button area) | 360 ms |

---

## Application map

### `src/pages/Home.tsx` — Hero section

| Element | Current tag | Delay |
|---|---|---|
| "Hi, I'm Lisa." | `<p>` | 0 ms |
| h1 heading | `<h1>` | 120 ms |
| `<Button>` | `<RevealText as="div">` wrapping the Button | 240 ms |

### `src/pages/Home.tsx` — About section

| Element | Delay |
|---|---|
| brödtext `<p>` | 0 ms |
| `<Button>` | `<RevealText as="div">` wrapping the Button | 180 ms |

### `src/components/SelectedWork/SelectedWork.tsx`

| Element | Delay |
|---|---|
| "Selected work" rubrik | 0 ms |

### `src/components/MoreWork/MoreWork.tsx`

| Element | Delay |
|---|---|
| "More work, briefly." rubrik | 0 ms |

### `src/components/AboutMe/AboutMe.tsx`

| Element | Delay |
|---|---|
| Rubrik sektion 1 | 0 ms |
| Brödtext sektion 1 | 120 ms |
| Rubrik sektion 2 | 0 ms |
| Brödtext sektion 2 | 120 ms |

### `src/components/Footer/Footer.tsx` — contact section

| Element | Delay |
|---|---|
| "Let's talk" rubrik | 0 ms |
| Underrubrik / subtitle | 120 ms |
| `<Button>` | `<RevealText as="div">` wrapping the Button | 260 ms |

### `src/components/CaseIntro/CaseIntro.tsx`

| Element | Delay |
|---|---|
| Tag-pills wrapper | 0 ms |
| Headline | 120 ms |
| Meta-lines | 260 ms |

### `src/pages/CasePage.tsx` — content sections

| Element | Delay |
|---|---|
| Sektionsrubrik | 0 ms |
| Brödtext | 150 ms |

### Excluded

- `StatsSection` — har befintlig scroll-driven fade-animation, lämnas orörd.
- `Nav` — persistent layout, animeras inte.
- Dekorativa bakgrundselement (gradient.webp etc.) — animeras inte.

---

## File structure

```
src/components/RevealText/
  RevealText.tsx
  RevealText.test.tsx   (minst 5 tester)
  index.ts
```

---

## Tests (minimum)

1. Renderar children utan animation när `prefers-reduced-motion: reduce`
2. Startar med opacity 0 och övergår till 1 när IntersectionObserver triggar
3. `as`-prop renderar rätt HTML-element
4. `delay`-prop sätter transition-delay korrekt
5. `className` vidarebefordras till elementet
