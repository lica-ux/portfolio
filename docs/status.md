# status.md — Project snapshot

# The only file Claude reads at session start.

# Claude updates this at the end of every session.

LAST UPDATED: 2026-04-17

---

## In progress

NONE

## Completed this session (2026-04-17, continued)

- **StatsSection scroll-snap (Approach A)** — page-level `scroll-snap-type: y proximity` on `html` (desktop, `@media min-width: 768px`); each stat row has `snap-start snap-always`; sticky left image and tall 400svh layout preserved; no scroll-trap (right column is normal block flow)

---

## Completed this session (2026-04-17)

- **StatsSection scroll transition fix** — replaced `IntersectionObserver` with scroll event listener + `getBoundingClientRect` for reliable 30%-from-top/bottom fade triggers
- **Image swap** — `DSC03053-Enhanced-NR (1).webp` added to `src/images/`, used in both hero and StatsSection
- **About section background** — `gradient.webp` (scaled to 2080×2080) at 30% opacity, `#FFE8DB` base color
- **StatsSection image padding** — sticky image now has `p-4 md:p-10` + `rounded-[2px]` matching hero section

## Known — not blocking

- `<title>` updated to "Lisa Caspersson — Product Designer and Product Lead" ✅
- Missing `favicon.ico`, `apple-touch-icon.png`, `og-image.png`
- `hero.png` was removed from `src/images/` (non-compliant PNG)

---

## Completed this session

- **Tailwind CSS v4 migration** — replaced `src/variables/` token system with Tailwind v4 `@theme {}` blocks in `src/index.css`
  - All token files deleted (`colors.ts`, `spacing.ts`, `radius.ts`, `typografi.ts`, `animations.ts`, `breakpoints.ts`, `theme.ts`)
  - Dark mode via `data-theme="dark"` on `<html>` using `@custom-variant dark`
  - `ThemeProvider` + `useTheme()` hook in `src/context/ThemeContext.tsx`
  - Theme toggle button added to `Nav`
  - `Button` component migrated to Tailwind utility classes

- **Typography primitives** — `src/components/Typography/`
  - `Heading` (h1–h6, size xl/2xl/3xl/4xl, element defaults, native HTML attrs)
  - `Text` (p/span/label/li, size sm/base/lg, htmlFor support, native HTML attrs)
  - WCAG AA compliant

- **Input component** — `src/components/Input/`
  - Props: id, label, type, placeholder, disabled, value, onChange, error, className
  - WCAG AA: visible label, focus-visible ring, aria-invalid + aria-describedby, 44px tap target
  - Error state uses both color and text message

- **ComponentShowcase** — `src/components/ComponentShowcase/`
  - `ComponentShowcase` (title, description, children) + `ShowcaseRow` (label, children)
  - Documentation utility for `/components` page

- **`/components` page** updated to use ComponentShowcase with all new components

- **Test infrastructure** — `bun test` + `@testing-library/react` + `@happy-dom/global-registrator`
  - 41 tests across 6 files, all passing

- **StatsSection** — `src/components/StatsSection/`
  - Scroll-driven stats section: sticky bild desktop, fade in/out per stat via IntersectionObserver
  - 4 stats: "6+ years", "30+ products", "2 acquisitions", "2 design awards"
  - Mobil: bild överst, stats staplade med fade-in
  - `prefers-reduced-motion` hanterat via `.stat-transition` i `index.css`
  - Inbyggd i `Home.tsx` efter About-sektionen
  - 5 tester, WCAG AA godkänt (45 tester totalt)

---

## Blocked

NONE

---

## Open conflicts

NONE

---

## Key decisions

- Token system: Tailwind v4 `@theme {}` in `src/index.css` — no more `src/variables/`
- Dark mode: `data-theme="dark"` on `<html>`, not `prefers-color-scheme` (explicit toggle only)
- No localStorage persistence for theme — teams add per-project if needed
- Test runner: `bun test` (not Vitest) with `@happy-dom/global-registrator` for DOM env
- `@testing-library/react` requires explicit `afterEach(cleanup)` with Happy DOM

---

## Notes for next session

NONE
