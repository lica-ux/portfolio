# Case Page Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create empty subpage routes for each Selected Work case with a back-to-homepage link.

**Architecture:** A shared `CasePage` template renders a back link and an empty content area. Three routes (`/work/baribuddy`, `/work/booky`, `/work/sejfa`) each render `CasePage` with a `slug` prop. `SelectedWork` cards are wrapped in `<Link>` components pointing to the correct route.

**Tech Stack:** React 19, React Router v7, Tailwind CSS v4, bun test + @testing-library/react

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/pages/CasePage.tsx` | Template page — back link + empty content area |
| Create | `src/pages/CasePage.test.tsx` | Tests for CasePage |
| Modify | `src/App.tsx` | Add three `/work/:slug` routes |
| Modify | `src/components/SelectedWork/SelectedWork.types.ts` | Add `slug` field to `Project` |
| Modify | `src/components/SelectedWork/SelectedWork.tsx` | Wrap cards in `<Link>` |
| Create | `src/components/SelectedWork/SelectedWork.test.tsx` | Tests for linked cards |

---

### Task 1: CasePage component (TDD)

**Files:**
- Create: `src/pages/CasePage.tsx`
- Create: `src/pages/CasePage.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/pages/CasePage.test.tsx`:

```tsx
import { afterEach } from 'bun:test'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CasePage from './CasePage'

afterEach(cleanup)

function renderCasePage() {
  return render(
    <MemoryRouter>
      <CasePage slug="baribuddy" />
    </MemoryRouter>
  )
}

test('renders back link', () => {
  const { getByRole } = renderCasePage()
  expect(getByRole('link', { name: /selected work/i })).toBeInTheDocument()
})

test('back link points to homepage', () => {
  const { getByRole } = renderCasePage()
  expect(getByRole('link', { name: /selected work/i })).toHaveAttribute('href', '/')
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
bun test src/pages/CasePage.test.tsx
```

Expected: FAIL — `Cannot find module './CasePage'`

- [ ] **Step 3: Implement CasePage**

Create `src/pages/CasePage.tsx`:

```tsx
import { Link } from 'react-router-dom'

interface CasePageProps {
  slug: string
}

export default function CasePage({ slug: _slug }: CasePageProps) {
  return (
    <main className="min-h-[100svh] px-4 md:px-10 py-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}
      >
        ← Selected work
      </Link>
    </main>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
bun test src/pages/CasePage.test.tsx
```

Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/pages/CasePage.tsx src/pages/CasePage.test.tsx
git commit -m "feat: add empty CasePage template with back link"
```

---

### Task 2: Add routes in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the three case routes**

Edit `src/App.tsx` — add import and three routes:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Components from './pages/Components'
import Tokens from './pages/Tokens'
import About from './pages/About'
import CasePage from './pages/CasePage'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/components"        element={<Components />} />
        <Route path="/tokens"            element={<Tokens />} />
        <Route path="/about"             element={<About />} />
        <Route path="/work/baribuddy"    element={<CasePage slug="baribuddy" />} />
        <Route path="/work/booky"        element={<CasePage slug="booky" />} />
        <Route path="/work/sejfa"        element={<CasePage slug="sejfa" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 2: Run all tests to confirm nothing broke**

```bash
bun test
```

Expected: all tests pass (same count as before + 2 new from Task 1)

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: register /work/* routes for case pages"
```

---

### Task 3: Link SelectedWork cards to case pages (TDD)

**Files:**
- Modify: `src/components/SelectedWork/SelectedWork.types.ts`
- Modify: `src/components/SelectedWork/SelectedWork.tsx`
- Create: `src/components/SelectedWork/SelectedWork.test.tsx`

- [ ] **Step 1: Add `slug` to the Project type**

Edit `src/components/SelectedWork/SelectedWork.types.ts`:

```ts
export interface Project {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  slug: string
}

export interface SelectedWorkProps {
  projects?: Project[]
}
```

- [ ] **Step 2: Write the failing tests**

Create `src/components/SelectedWork/SelectedWork.test.tsx`:

```tsx
import { afterEach } from 'bun:test'
import { render, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SelectedWork from './SelectedWork'
import type { Project } from './SelectedWork.types'

afterEach(cleanup)

const projects: Project[] = [
  {
    title: 'Baribuddy',
    description: 'Test description',
    imageSrc: '/test.webp',
    imageAlt: 'Baribuddy screenshot',
    slug: 'baribuddy',
  },
]

test('each project card links to its case page', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <SelectedWork projects={projects} />
    </MemoryRouter>
  )
  expect(getByRole('link', { name: /baribuddy/i })).toHaveAttribute('href', '/work/baribuddy')
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
bun test src/components/SelectedWork/SelectedWork.test.tsx
```

Expected: FAIL — cards are not links yet

- [ ] **Step 4: Update SelectedWork to use Link and add slugs**

Edit `src/components/SelectedWork/SelectedWork.tsx` — add `Link` import, add slugs to `defaultProjects`, wrap article in `<Link>`:

```tsx
import { Link } from 'react-router-dom'
import type { SelectedWorkProps, Project } from './SelectedWork.types'

// TODO: replace with local .webp images (max 2080×2080px, max 940kb)
const imgBaribuddy = 'https://www.figma.com/api/mcp/asset/9615129a-6fbb-4fc7-a565-ab5796c9d142'
const imgBooky = 'https://www.figma.com/api/mcp/asset/005d71f0-4e8e-4d0d-820b-7c91d138841c'
const imgSejfa = 'https://www.figma.com/api/mcp/asset/0826ff24-784a-4a87-befb-9420e5f08a6a'

const defaultProjects: Project[] = [
  {
    title: 'Baribuddy',
    description: 'Scalin from 200 to 50 000 active users, and an acquisition.',
    imageSrc: imgBaribuddy,
    imageAlt: 'Baribuddy app screenshot',
    slug: 'baribuddy',
  },
  {
    title: 'Booky',
    description: 'More than a redesign. We solved the wrong problem. - A problem redefinition',
    imageSrc: imgBooky,
    imageAlt: 'Booky app screenshot',
    slug: 'booky',
  },
  {
    title: 'Sejfa',
    description: 'Making insurance relevant to a generation that ignores it.',
    imageSrc: imgSejfa,
    imageAlt: 'Sejfa app screenshot',
    slug: 'sejfa',
  },
]

export default function SelectedWork({ projects = defaultProjects }: SelectedWorkProps) {
  return (
    <section
      id="work"
      className="snap-start snap-always flex flex-col gap-10 items-start py-16 md:py-24 px-4 md:px-10 w-full min-h-[100svh]"
    >
      <div className="flex items-center justify-center w-full">
        <h2
          className="flex-1 text-[40px] md:text-[56px] font-medium leading-[1.1]"
          style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
        >
          Selected work
        </h2>
      </div>

      <div className="flex flex-wrap gap-8 items-stretch w-full flex-1">
        {projects.map((project) => (
          <Link
            key={project.title}
            to={`/work/${project.slug}`}
            className="flex flex-col gap-6 items-start flex-1 min-w-[240px] no-underline"
          >
            <div className="overflow-hidden relative w-full rounded-[2px] flex-1">
              <img
                src={project.imageSrc}
                alt={project.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5 items-start px-1 w-full">
              <p
                className="text-2xl font-medium leading-[1.1] w-full"
                style={{ color: 'var(--color-nav-text)', fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </p>
              <p
                className="text-[18px] font-normal leading-[1.18] w-full"
                style={{ color: 'var(--color-hero-subtitle)' }}
              >
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run all tests**

```bash
bun test
```

Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add src/components/SelectedWork/SelectedWork.types.ts src/components/SelectedWork/SelectedWork.tsx src/components/SelectedWork/SelectedWork.test.tsx
git commit -m "feat: link SelectedWork cards to case page routes"
```
