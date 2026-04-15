# Template Additions Design

**Date:** 2026-03-31
**Status:** Approved
**Goal:** Make the template a solid team starter for both marketing sites and web apps — addressing inconsistent design, slow setup, and Figma handoff friction.

---

## Context

The template currently has: a TypeScript token system (`src/variables/`), one component (Button), one icon (star.svg), a Nav, and four pages. A team will clone this and immediately start building product UIs.

Three pain points to address:
1. Inconsistent design across team projects
2. Too much boilerplate setup before writing real features
3. Figma designs not matching what gets built

---

## Scope

Four additions:

1. **Tailwind CSS v4** — replaces `src/variables/` as the token system
2. **Typography primitives** — `<Heading>` and `<Text>`
3. **Input** — the most-needed form element after Button
4. **ComponentShowcase** — documentation utility for `/components` page

---

## 1. Tailwind CSS v4

### What changes
- Install `tailwindcss` v4 and `@tailwindcss/vite`
- Move all token values from `src/variables/*.ts` into `@theme {}` blocks in `index.css`
- Delete `src/variables/` folder
- Dark mode via Tailwind `dark:` variant using `[data-theme="dark"]` selector on `<html>`
- `ThemeProvider` context wraps the app; `useTheme()` hook exposes `theme` and `toggleTheme`
- Toggle button added to `Nav`
- Existing `Button` component migrated to Tailwind utility classes
- `CLAUDE.md` updated: token system is now `index.css @theme`, not `src/variables/`

### Token mapping
All six token files migrate to `@theme` in `index.css`:
- `colors.ts` → color tokens (`--color-*`)
- `spacing.ts` → spacing scale (`--spacing-*`)
- `radius.ts` → border radius (`--radius-*`)
- `typografi.ts` → font size/weight/line-height (`--text-*`, `--font-*`)
- `animations.ts` → keyframes and durations (`--animate-*`)
- `breakpoints.ts` → responsive breakpoints (`--breakpoint-*`)

### No localStorage in v1
Theme preference is not persisted. Teams add this per-project if needed.

---

## 2. Typography Primitives

### Heading
`src/components/Typography/Heading.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `as` | `h1`–`h6` | `h2` | Semantic HTML element |
| `size` | `xl` \| `2xl` \| `3xl` \| `4xl` | h1→4xl, h2→3xl, h3→2xl, h4/h5/h6→xl | Tailwind text scale |
| `className` | string | — | Escape hatch |

### Text
`src/components/Typography/Text.tsx`

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `as` | `p` \| `span` \| `label` \| `li` | `p` | Semantic HTML element |
| `size` | `sm` \| `base` \| `lg` | `base` | Tailwind text scale |
| `className` | string | — | Escape hatch |

Both are stateless wrappers. No logic. Purpose: enforce typography tokens and prevent raw font-size hardcoding.

Files: `Heading.tsx`, `Text.tsx`, `index.ts`

---

## 3. Input

`src/components/Input/`

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `id` | string | yes | Links label to input |
| `label` | string | yes | Always visible — no label-less inputs |
| `type` | `text` \| `email` \| `password` \| `search` | no | Defaults to `text` |
| `placeholder` | string | no | — |
| `disabled` | boolean | no | — |
| `value` | string | no | Controlled |
| `onChange` | ChangeEventHandler | no | Controlled |
| `error` | string | no | Renders message below; sets `aria-invalid` + `aria-describedby` |
| `className` | string | no | Escape hatch |

### WCAG AA requirements
- Visible label always present (no placeholder-only patterns)
- Focus ring via Tailwind `focus:` variant (never removed)
- Error state uses both color and text — not color alone
- Tap target minimum 44px height
- Error message linked via `aria-describedby`

Files: `Input.tsx`, `Input.types.ts`, `index.ts`

---

## 4. ComponentShowcase

`src/components/ComponentShowcase/` — documentation utility, `/components` page only.

### ComponentShowcase
| Prop | Type | Notes |
|------|------|-------|
| `title` | string | Component name |
| `description` | string | One-line summary |
| `children` | ReactNode | `ShowcaseRow` instances |

### ShowcaseRow
| Prop | Type | Notes |
|------|------|-------|
| `label` | string | Variant name |
| `children` | ReactNode | Rendered example |

### Usage
```tsx
<ComponentShowcase title="Button" description="Triggers an action">
  <ShowcaseRow label="Primary"><Button variant="primary">Click me</Button></ShowcaseRow>
  <ShowcaseRow label="Secondary"><Button variant="secondary">Click me</Button></ShowcaseRow>
</ComponentShowcase>
```

Files: `ComponentShowcase.tsx`, `ShowcaseRow.tsx`, `index.ts`

---

## Out of scope

- localStorage theme persistence (per-project concern)
- Additional Input types (textarea, select, checkbox, radio) — separate task
- Any component not listed above

---

## Files to create

```
src/
  components/
    Typography/
      Heading.tsx
      Text.tsx
      index.ts
    Input/
      Input.tsx
      Input.types.ts
      index.ts
    ComponentShowcase/
      ComponentShowcase.tsx
      ShowcaseRow.tsx
      index.ts
  context/
    ThemeContext.tsx     ← ThemeProvider + useTheme
```

## Files to modify

```
index.css               ← add @theme blocks, dark mode selector
src/main.tsx            ← wrap app in ThemeProvider
src/App.tsx             ← no change expected
src/components/Nav.tsx  ← add theme toggle button
src/components/Button/Button.tsx  ← migrate to Tailwind classes
src/pages/Components.tsx          ← use ComponentShowcase
CLAUDE.md               ← update token system docs
docs/figma-map.md       ← add new components
```

## Files to delete

```
src/variables/colors.ts
src/variables/spacing.ts
src/variables/radius.ts
src/variables/typografi.ts
src/variables/animations.ts
src/variables/breakpoints.ts
src/variables/theme.ts
```
