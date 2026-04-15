# Design Web Template

A component library and design system starter built with React 19, Vite, Tailwind CSS v4, and React Router v7. Includes a live component showcase, design tokens, and WCAG AA 2.1 compliant components out of the box.

## Stack

- **Runtime & package manager** — [Bun](https://bun.sh)
- **Bundler** — Vite 8
- **UI** — React 19
- **Routing** — React Router v7
- **Styling** — Tailwind CSS v4
- **Language** — TypeScript
- **Testing** — Bun test + @testing-library/react

## Getting started

### 1. Install Bun

If you don't have Bun installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your terminal after installing, then verify:

```bash
bun --version
```

> On Windows, Bun requires WSL2. See [bun.sh/docs/installation](https://bun.sh/docs/installation) for details.

### 2. Clone and install

```bash
git clone <repo-url>
cd design-web-template
bun install
```

### 3. Start the dev server

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Commands

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `bun run dev`     | Start development server       |
| `bun run build`   | Production build               |
| `bun run preview` | Preview production build       |
| `bun run lint`    | Run ESLint                     |
| `bun test`        | Run tests                      |

## Project structure

```
src/
  components/    # Reusable React components
  context/       # React context providers (ThemeContext)
  icons/         # SVG source files (read-only)
  images/        # .webp images only
  pages/         # Route-level pages
  index.css      # Design tokens (@theme blocks) + global styles
  App.tsx        # Router setup
docs/
  figma-map.md   # Figma node to component mapping
  status.md      # Project status snapshot
  wcag-checklist.md
  conflict-log.md
```

### Routes

| Path          | Description                        |
| ------------- | ---------------------------------- |
| `/`           | Home                               |
| `/components` | Live component showcase            |
| `/tokens`     | Design token reference             |
| `/about`      | About page                         |

## Design tokens

Tokens are defined in `src/index.css` using Tailwind CSS v4 `@theme {}` blocks. Use Tailwind utility classes — never hardcode values.

**Color tokens**

```
--color-primary-*       Brand colors (50–950 scale)
--color-neutral-*       Neutral grays (50–950 scale)
--color-success         Semantic green
--color-warning         Semantic amber
--color-error           Semantic red
--color-info            Semantic blue
```

**Semantic tokens** (light/dark aware)

```
--color-bg              Page background
--color-surface         Card/elevated surface
--color-text            Primary text
--color-text-muted      Secondary text
--color-border          Borders and dividers
```

**Radius tokens**

```
--radius-sm  --radius-md  --radius-lg  --radius-xl  --radius-full
```

## Dark mode

Dark mode is toggled by setting `data-theme="dark"` on `<html>`. Use the `useTheme()` hook from `src/context/ThemeContext.tsx`:

```tsx
import { useTheme } from './context/ThemeContext'

const { theme, toggleTheme } = useTheme()
```

## Components

| Component          | Path                                      |
| ------------------ | ----------------------------------------- |
| Button             | `src/components/Button/`                  |
| Heading            | `src/components/Typography/Heading.tsx`   |
| Text               | `src/components/Typography/Text.tsx`      |
| Input              | `src/components/Input/`                   |
| ComponentShowcase  | `src/components/ComponentShowcase/`       |

All components are WCAG AA 2.1 compliant.

## Testing

Tests use `bun test` with `@testing-library/react` and Happy DOM.

```bash
bun test
```

Tests are co-located with components or in `__tests__/` directories. Cleanup must be called explicitly:

```ts
import { cleanup } from '@testing-library/react'
afterEach(cleanup)
```
