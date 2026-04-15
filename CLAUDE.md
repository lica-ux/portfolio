# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Bun, Vite + React 19, React Router v7, Tailwind CSS v4

## Architecture

```
src/
  components/    # React components (check here before creating)
  context/       # React context providers (ThemeContext)
  icons/         # SVG source files (read-only)
  images/        # .webp images only
  pages/         # Route-level pages
```

Routing is defined in `src/App.tsx` using BrowserRouter with four top-level routes (`/`, `/components`, `/tokens`, `/about`). `Nav` is a persistent layout component above all routes. SVGs are imported as React components via `vite-plugin-svgr`.

## Token system

Design tokens live in `@theme {}` blocks in `src/index.css`. Use Tailwind utility classes — do **not** import from `src/variables/` (deleted).

Color tokens: `--color-primary-*`, `--color-neutral-*`, `--color-success`, `--color-warning`, `--color-error`, `--color-info`
Semantic colors (light/dark aware): `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`
Radius tokens: `--radius-sm` through `--radius-full`

Dark mode uses `data-theme="dark"` on `<html>`. Toggle via `useTheme()` from `src/context/ThemeContext.tsx`.

Docs in `docs/`:
`figma-map.md` · `status.md` · `wcag-checklist.md` · `conflict-log.md`

## Commands

```
bun run dev      # Dev server
bun run build    # Production build
bun run preview  # Preview production build locally
bun run lint     # ESLint
bun test         # Run tests
```

## Session start

1. Read docs/status.md
2. Summarize what is in progress and ask what to start with
3. Do NOT write any code until the user confirms direction

---

## Skills — always use these, never improvise

| Task                           | Skill           |
| ------------------------------ | --------------- |
| First time setup               | project-setup   |
| Sync tokens from Figma         | sync-tokens     |
| Register icons                 | sync-icons      |
| Implement component from Figma | build-component |
| Build component not in Figma   | new-component   |
| Add a new token                | new-token       |
| Verify WCAG on a component     | check-wcag      |
| Prepare for production         | pre-push        |

---

## Rules

### Tokens

- Never hardcode colors, spacing, radius or typography values
- Use Tailwind utility classes that map to `@theme` tokens in `src/index.css`
- Missing token: run new-token skill first, then implement

### Components

- Always check src/components/ and docs/figma-map.md before creating anything
- Never add variants or new components without user confirmation
- Third-party components must always be wrapped to use project tokens

### Icons

- SVG files in src/icons/ are read-only — never edit them
- Only size (single value, always square 1:1) and color may change
- All icon control goes through the Icon wrapper component
- Missing icon: stop, report, wait for decision

### Images

- .webp only — max 2080×2080px — max 940kb
- Non-compliant image: stop and report

### WCAG AA 2.1

- Run check-wcag skill on every completed component
- Never remove focus indicators
- Never use color as the only way to convey information
- Failing contrast: stop, run WCAG conflict protocol in check-wcag skill

### Scope

- Do exactly what is asked — nothing more
- Never refactor code outside the current task
- Never install packages without asking
- Spot a problem: mention it, do not fix it unless asked

### End of session

Update docs/status.md before ending any session.
