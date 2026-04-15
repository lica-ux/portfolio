# Template Additions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Tailwind CSS v4 as the token system, theme toggle, Typography primitives, Input, and ComponentShowcase to make the template a solid team starter.

**Architecture:** Tailwind v4 replaces `src/variables/` — all design tokens live in `@theme {}` blocks in `index.css`. A `ThemeProvider` context manages light/dark mode by setting `data-theme` on `<html>`, activating Tailwind's `dark:` variant via `@custom-variant`. New components (Typography, Input, ComponentShowcase) use Tailwind utility classes exclusively.

**Tech Stack:** Bun, Vite 8, React 19, Tailwind CSS v4 (`@tailwindcss/vite`), clsx, bun test, @testing-library/react

---

### Task 1: Install packages and configure tooling

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json`
- Modify: `tsconfig.app.json`
- Create: `bunfig.toml`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Install runtime and dev packages**

```bash
bun add tailwindcss @tailwindcss/vite clsx
bun add -d @testing-library/react @testing-library/jest-dom @happy-dom/global-registrator @types/jest
```

- [ ] **Step 2: Update `vite.config.ts`** — add Tailwind plugin, remove any test config

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
})
```

- [ ] **Step 3: Create `bunfig.toml`** in the project root

```toml
[test]
preload = ["./src/test/setup.ts"]
```

- [ ] **Step 4: Create `src/test/setup.ts`**

```ts
import { GlobalRegistrator } from '@happy-dom/global-registrator'
GlobalRegistrator.register()
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add `"types": ["jest"]` to `tsconfig.app.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["jest"]
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Add test script to `package.json`**

Add `"test": "bun test"` to the `scripts` block:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "bun test"
}
```

- [ ] **Step 7: Verify setup runs**

```bash
bun test
```

Expected: "No tests found" (not an error crash).

- [ ] **Step 8: Commit**

```bash
git add vite.config.ts package.json tsconfig.app.json bunfig.toml src/test/setup.ts bun.lockb
git commit -m "feat: add Tailwind v4, clsx, and bun test tooling"
```

---

### Task 2: Replace index.css with Tailwind v4 tokens

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace the entire contents of `src/index.css`**

```css
@import "tailwindcss";

/* Dark mode: activated by data-theme="dark" on any ancestor (including <html>) */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme {
  /* Primary palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* Neutral palette */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;

  /* Semantic colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Border radius — overrides Tailwind defaults to match project scale */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Font families */
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* Semantic color aliases — update automatically with theme toggle */
:root {
  --color-bg: #ffffff;
  --color-surface: #f9fafb;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
}

[data-theme="dark"] {
  --color-bg: #111827;
  --color-surface: #1f2937;
  --color-text: #f3f4f6;
  --color-text-muted: #9ca3af;
  --color-border: #374151;
}

/* Base */
body {
  margin: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  border-inline: 1px solid var(--color-border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: migrate design tokens to Tailwind v4 @theme"
```

---

### Task 3: Remove src/variables/ and clean up main.tsx

**Files:**
- Modify: `src/main.tsx`
- Delete: `src/variables/colors.ts`, `spacing.ts`, `radius.ts`, `typografi.ts`, `animations.ts`, `breakpoints.ts`, `theme.ts`

- [ ] **Step 1: Replace `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 2: Delete `src/variables/`**

```bash
rm -rf src/variables
```

- [ ] **Step 3: Verify the build passes**

```bash
bun run build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/variables
git commit -m "chore: remove src/variables — tokens now live in index.css @theme"
```

---

### Task 4: ThemeProvider + useTheme (TDD)

**Files:**
- Create: `src/context/ThemeContext.tsx`
- Create: `src/context/ThemeContext.test.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Write the failing test — create `src/context/ThemeContext.test.tsx`**

```tsx
import { render, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext'

function Consumer() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme}</button>
}

test('starts in light mode', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  expect(getByRole('button')).toHaveTextContent('light')
})

test('toggleTheme switches to dark', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  act(() => { getByRole('button').click() })
  expect(getByRole('button')).toHaveTextContent('dark')
})

test('toggleTheme sets data-theme on <html>', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  act(() => { getByRole('button').click() })
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
})

test('toggling back to light removes data-theme attribute', () => {
  const { getByRole } = render(<ThemeProvider><Consumer /></ThemeProvider>)
  act(() => { getByRole('button').click() }) // → dark
  act(() => { getByRole('button').click() }) // → light
  expect(document.documentElement).not.toHaveAttribute('data-theme')
})

test('useTheme throws when used outside ThemeProvider', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<Consumer />)).toThrow('useTheme must be used within ThemeProvider')
  spy.mockRestore()
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
bun test src/context/ThemeContext.test.tsx
```

Expected: FAIL — "Cannot find module './ThemeContext'"

- [ ] **Step 3: Create `src/context/ThemeContext.tsx`**

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      if (next === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
bun test src/context/ThemeContext.test.tsx
```

Expected: 5 passing

- [ ] **Step 5: Wrap app in ThemeProvider — update `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

- [ ] **Step 6: Commit**

```bash
git add src/context/ThemeContext.tsx src/context/ThemeContext.test.tsx src/main.tsx
git commit -m "feat: add ThemeProvider and useTheme hook"
```

---

### Task 5: Theme toggle in Nav (TDD)

**Files:**
- Create: `src/components/Nav.test.tsx`
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Write the failing test — create `src/components/Nav.test.tsx`**

```tsx
import { render, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import Nav from './Nav'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider><MemoryRouter>{children}</MemoryRouter></ThemeProvider>
}

test('renders nav links', () => {
  const { getByRole } = render(<Nav />, { wrapper: Wrapper })
  expect(getByRole('link', { name: 'Home' })).toBeInTheDocument()
  expect(getByRole('link', { name: 'Components' })).toBeInTheDocument()
})

test('renders theme toggle button', () => {
  const { getByRole } = render(<Nav />, { wrapper: Wrapper })
  expect(getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
})

test('theme toggle button switches label from Light to Dark', () => {
  const { getByRole } = render(<Nav />, { wrapper: Wrapper })
  const btn = getByRole('button', { name: /toggle theme/i })
  act(() => { btn.click() })
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
bun test src/components/Nav.test.tsx
```

Expected: FAIL — "Unable to find role button with name /toggle theme/i"

- [ ] **Step 3: Update `src/components/Nav.tsx`**

```tsx
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/',           label: 'Home' },
  { to: '/components', label: 'Components' },
  { to: '/tokens',     label: 'Tokens' },
  { to: '/about',      label: 'About' },
]

export default function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
      <div className="flex gap-6">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="px-3 py-1.5 rounded-md text-sm border border-[var(--color-border)] cursor-pointer"
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </nav>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
bun test src/components/Nav.test.tsx
```

Expected: 3 passing

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "feat: add theme toggle to Nav"
```

---

### Task 6: Migrate Button to Tailwind (TDD)

**Files:**
- Create: `src/components/Button/Button.test.tsx`
- Modify: `src/components/Button/Button.tsx`

- [ ] **Step 1: Write the failing tests — create `src/components/Button/Button.test.tsx`**

```tsx
import { render } from '@testing-library/react'
import Button from './Button'

test('renders children', () => {
  const { getByRole } = render(<Button>Click me</Button>)
  expect(getByRole('button')).toHaveTextContent('Click me')
})

test('defaults to type="button"', () => {
  const { getByRole } = render(<Button>Click</Button>)
  expect(getByRole('button')).toHaveAttribute('type', 'button')
})

test('is disabled when disabled prop is true', () => {
  const { getByRole } = render(<Button disabled>Click</Button>)
  expect(getByRole('button')).toBeDisabled()
})

test('calls onClick when clicked', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Button onClick={onClick}>Click</Button>)
  getByRole('button').click()
  expect(onClick).toHaveBeenCalledOnce()
})

test('does not call onClick when disabled', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Button onClick={onClick} disabled>Click</Button>)
  getByRole('button').click()
  expect(onClick).not.toHaveBeenCalled()
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
bun test src/components/Button/Button.test.tsx
```

Expected: FAIL — "Cannot find module '../../variables/colors'" because Button.tsx still imports from the deleted `src/variables/` folder.

- [ ] **Step 3: Rewrite `src/components/Button/Button.tsx`**

```tsx
import clsx from 'clsx'
import type { ButtonProps } from './Button.types'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center',
        'min-h-[44px] min-w-[44px] px-6 py-3',
        'rounded-md font-sans text-sm font-medium leading-normal',
        'border border-transparent cursor-pointer',
        'transition-colors duration-100 ease-out',
        'motion-reduce:transition-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
        'disabled:cursor-not-allowed',
        variant === 'primary' && [
          'bg-primary-600 text-neutral-0 border-primary-600',
          'hover:bg-primary-700 hover:border-primary-700',
          'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-neutral-200',
        ],
        variant === 'secondary' && [
          'bg-neutral-0 text-primary-600 border-primary-600',
          'hover:bg-primary-50',
          'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-neutral-200',
        ],
      )}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
bun test src/components/Button/Button.test.tsx
```

Expected: 5 passing

- [ ] **Step 5: Commit**

```bash
git add src/components/Button/Button.tsx src/components/Button/Button.test.tsx
git commit -m "feat: migrate Button to Tailwind v4 utility classes"
```

---

### Task 7: Heading and Text components (TDD)

**Files:**
- Create: `src/components/Typography/Heading.tsx`
- Create: `src/components/Typography/Text.tsx`
- Create: `src/components/Typography/index.ts`
- Create: `src/components/Typography/Typography.test.tsx`

- [ ] **Step 1: Write the failing tests — create `src/components/Typography/Typography.test.tsx`**

```tsx
import { render } from '@testing-library/react'
import { Heading, Text } from './index'

// Heading
test('Heading renders as h2 by default', () => {
  const { container } = render(<Heading>Title</Heading>)
  expect(container.querySelector('h2')).toBeInTheDocument()
})

test('Heading renders as the specified element', () => {
  const { container } = render(<Heading as="h1">Title</Heading>)
  expect(container.querySelector('h1')).toBeInTheDocument()
})

test('Heading renders children', () => {
  const { getByRole } = render(<Heading as="h1">Hello</Heading>)
  expect(getByRole('heading', { level: 1 })).toHaveTextContent('Hello')
})

test('Heading accepts className', () => {
  const { container } = render(<Heading className="custom">Title</Heading>)
  expect(container.querySelector('h2')).toHaveClass('custom')
})

// Text
test('Text renders as p by default', () => {
  const { container } = render(<Text>Body</Text>)
  expect(container.querySelector('p')).toBeInTheDocument()
})

test('Text renders as the specified element', () => {
  const { container } = render(<Text as="span">Body</Text>)
  expect(container.querySelector('span')).toBeInTheDocument()
})

test('Text renders children', () => {
  const { container } = render(<Text>Hello text</Text>)
  expect(container.querySelector('p')).toHaveTextContent('Hello text')
})

test('Text accepts className', () => {
  const { container } = render(<Text className="custom">Body</Text>)
  expect(container.querySelector('p')).toHaveClass('custom')
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
bun test src/components/Typography/Typography.test.tsx
```

Expected: FAIL — "Cannot find module './index'"

- [ ] **Step 3: Create `src/components/Typography/Heading.tsx`**

```tsx
import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'

const sizeMap: Record<string, string> = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-xl',
  h6: 'text-xl',
}

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xl' | '2xl' | '3xl' | '4xl'
  children: ReactNode
  className?: string
}

export default function Heading({
  as: Tag = 'h2',
  size,
  children,
  className,
}: HeadingProps) {
  const sizeClass = size ? `text-${size}` : sizeMap[Tag]
  return (
    <Tag className={clsx('font-sans font-medium leading-tight', sizeClass, className)}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 4: Create `src/components/Typography/Text.tsx`**

```tsx
import clsx from 'clsx'
import type { ReactNode } from 'react'

const sizeMap = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
} as const

interface TextProps {
  as?: 'p' | 'span' | 'label' | 'li'
  size?: keyof typeof sizeMap
  children: ReactNode
  className?: string
}

export default function Text({
  as: Tag = 'p',
  size = 'base',
  children,
  className,
}: TextProps) {
  return (
    <Tag className={clsx('font-sans leading-normal', sizeMap[size], className)}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 5: Create `src/components/Typography/index.ts`**

```ts
export { default as Heading } from './Heading'
export { default as Text } from './Text'
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
bun test src/components/Typography/Typography.test.tsx
```

Expected: 8 passing

- [ ] **Step 7: Commit**

```bash
git add src/components/Typography/
git commit -m "feat: add Heading and Text typography primitives"
```

---

### Task 8: Input component (TDD)

**Files:**
- Create: `src/components/Input/Input.types.ts`
- Create: `src/components/Input/Input.tsx`
- Create: `src/components/Input/index.ts`
- Create: `src/components/Input/Input.test.tsx`

- [ ] **Step 1: Write the failing tests — create `src/components/Input/Input.test.tsx`**

```tsx
import { render } from '@testing-library/react'
import Input from './Input'

test('renders a visible label', () => {
  const { getByLabelText } = render(<Input id="name" label="Full name" />)
  expect(getByLabelText('Full name')).toBeInTheDocument()
})

test('label is associated with input via htmlFor', () => {
  const { getByLabelText } = render(<Input id="email" label="Email" />)
  expect(getByLabelText('Email')).toHaveAttribute('id', 'email')
})

test('renders placeholder', () => {
  const { getByPlaceholderText } = render(
    <Input id="q" label="Search" placeholder="Type here..." />
  )
  expect(getByPlaceholderText('Type here...')).toBeInTheDocument()
})

test('is disabled when disabled prop is true', () => {
  const { getByLabelText } = render(<Input id="x" label="Name" disabled />)
  expect(getByLabelText('Name')).toBeDisabled()
})

test('shows error message when error prop is set', () => {
  const { getByText } = render(
    <Input id="e" label="Email" error="Invalid email address" />
  )
  expect(getByText('Invalid email address')).toBeInTheDocument()
})

test('sets aria-invalid when error is present', () => {
  const { getByLabelText } = render(
    <Input id="e" label="Email" error="Required" />
  )
  expect(getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
})

test('links error message via aria-describedby', () => {
  const { getByLabelText } = render(
    <Input id="e" label="Email" error="Required" />
  )
  expect(getByLabelText('Email')).toHaveAttribute('aria-describedby', 'e-error')
})

test('does not set aria-invalid when no error', () => {
  const { getByLabelText } = render(<Input id="x" label="Name" />)
  expect(getByLabelText('Name')).not.toHaveAttribute('aria-invalid')
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
bun test src/components/Input/Input.test.tsx
```

Expected: FAIL — "Cannot find module './Input'"

- [ ] **Step 3: Create `src/components/Input/Input.types.ts`**

```ts
import type { ChangeEventHandler } from 'react'

export interface InputProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'search'
  placeholder?: string
  disabled?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  error?: string
  className?: string
}
```

- [ ] **Step 4: Create `src/components/Input/Input.tsx`**

```tsx
import clsx from 'clsx'
import type { InputProps } from './Input.types'

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  value,
  onChange,
  error,
  className,
}: InputProps) {
  const errorId = `${id}-error`

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium font-sans"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          'min-h-[44px] px-3 py-2 rounded-md text-sm font-sans',
          'border bg-neutral-0',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
          'disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed',
          error
            ? 'border-error'
            : 'border-neutral-300',
        )}
      />
      {error && (
        <span id={errorId} className="text-sm text-error font-sans">
          {error}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Create `src/components/Input/index.ts`**

```ts
export { default } from './Input'
export type { InputProps } from './Input.types'
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
bun test src/components/Input/Input.test.tsx
```

Expected: 8 passing

- [ ] **Step 7: Commit**

```bash
git add src/components/Input/
git commit -m "feat: add Input component with WCAG AA compliance"
```

---

### Task 9: ComponentShowcase (TDD)

**Files:**
- Create: `src/components/ComponentShowcase/ComponentShowcase.tsx`
- Create: `src/components/ComponentShowcase/ShowcaseRow.tsx`
- Create: `src/components/ComponentShowcase/index.ts`
- Create: `src/components/ComponentShowcase/ComponentShowcase.test.tsx`

- [ ] **Step 1: Write the failing tests — create `src/components/ComponentShowcase/ComponentShowcase.test.tsx`**

```tsx
import { render } from '@testing-library/react'
import { ComponentShowcase, ShowcaseRow } from './index'

test('renders the component title', () => {
  const { getByText } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Default"><button>Click</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByText('Button')).toBeInTheDocument()
})

test('renders the component description', () => {
  const { getByText } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Default"><button>Click</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByText('Triggers an action')).toBeInTheDocument()
})

test('ShowcaseRow renders its label', () => {
  const { getByText } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Primary variant"><button>Click</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByText('Primary variant')).toBeInTheDocument()
})

test('ShowcaseRow renders its children', () => {
  const { getByRole } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Default"><button>Click me</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
bun test src/components/ComponentShowcase/ComponentShowcase.test.tsx
```

Expected: FAIL — "Cannot find module './index'"

- [ ] **Step 3: Create `src/components/ComponentShowcase/ShowcaseRow.tsx`**

```tsx
import type { ReactNode } from 'react'

interface ShowcaseRowProps {
  label: string
  children: ReactNode
}

export default function ShowcaseRow({ label, children }: ShowcaseRowProps) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[var(--color-border)] last:border-0">
      <span className="w-32 shrink-0 text-sm text-[var(--color-text-muted)] font-sans">
        {label}
      </span>
      <div className="flex items-center gap-3 flex-wrap">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/ComponentShowcase/ComponentShowcase.tsx`**

```tsx
import type { ReactNode } from 'react'

interface ComponentShowcaseProps {
  title: string
  description: string
  children: ReactNode
}

export default function ComponentShowcase({
  title,
  description,
  children,
}: ComponentShowcaseProps) {
  return (
    <section className="mb-12 text-left">
      <h2 className="text-2xl font-medium font-sans mb-1">{title}</h2>
      <p className="text-sm text-[var(--color-text-muted)] font-sans mb-4">{description}</p>
      <div className="border border-[var(--color-border)] rounded-lg px-4">
        {children}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `src/components/ComponentShowcase/index.ts`**

```ts
export { default as ComponentShowcase } from './ComponentShowcase'
export { default as ShowcaseRow } from './ShowcaseRow'
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
bun test src/components/ComponentShowcase/ComponentShowcase.test.tsx
```

Expected: 4 passing

- [ ] **Step 7: Commit**

```bash
git add src/components/ComponentShowcase/
git commit -m "feat: add ComponentShowcase and ShowcaseRow for /components page"
```

---

### Task 10: Update /components page

**Files:**
- Modify: `src/pages/Components.tsx`

- [ ] **Step 1: Update `src/pages/Components.tsx`**

```tsx
import { ComponentShowcase, ShowcaseRow } from '../components/ComponentShowcase'
import Button from '../components/Button'
import { Heading, Text } from '../components/Typography'
import Input from '../components/Input'
import StarIcon from '../icons/star.svg?react'

export default function Components() {
  return (
    <main className="px-8 py-12">
      <h1 className="text-4xl font-medium font-sans mb-10">Components</h1>

      <ComponentShowcase title="Button" description="Triggers an action or event">
        <ShowcaseRow label="Primary"><Button variant="primary">Primary</Button></ShowcaseRow>
        <ShowcaseRow label="Secondary"><Button variant="secondary">Secondary</Button></ShowcaseRow>
        <ShowcaseRow label="Disabled"><Button disabled>Disabled</Button></ShowcaseRow>
      </ComponentShowcase>

      <ComponentShowcase title="Heading" description="Semantic headings using the type scale">
        <ShowcaseRow label="h1 / 4xl"><Heading as="h1">The quick brown fox</Heading></ShowcaseRow>
        <ShowcaseRow label="h2 / 3xl"><Heading as="h2">The quick brown fox</Heading></ShowcaseRow>
        <ShowcaseRow label="h3 / 2xl"><Heading as="h3">The quick brown fox</Heading></ShowcaseRow>
        <ShowcaseRow label="h4 / xl"><Heading as="h4">The quick brown fox</Heading></ShowcaseRow>
      </ComponentShowcase>

      <ComponentShowcase title="Text" description="Body copy and inline text">
        <ShowcaseRow label="lg"><Text size="lg">The quick brown fox jumps over the lazy dog</Text></ShowcaseRow>
        <ShowcaseRow label="base"><Text size="base">The quick brown fox jumps over the lazy dog</Text></ShowcaseRow>
        <ShowcaseRow label="sm"><Text size="sm">The quick brown fox jumps over the lazy dog</Text></ShowcaseRow>
      </ComponentShowcase>

      <ComponentShowcase title="Input" description="Text input field with label and optional error">
        <ShowcaseRow label="Default"><Input id="demo-1" label="Full name" placeholder="Jane Smith" /></ShowcaseRow>
        <ShowcaseRow label="With error"><Input id="demo-2" label="Email" error="Invalid email address" /></ShowcaseRow>
        <ShowcaseRow label="Disabled"><Input id="demo-3" label="Username" disabled value="johndoe" /></ShowcaseRow>
      </ComponentShowcase>

      <ComponentShowcase title="Icons" description="SVG icons via the Icon wrapper">
        <ShowcaseRow label="star"><StarIcon width={24} height={24} /></ShowcaseRow>
      </ComponentShowcase>
    </main>
  )
}
```

- [ ] **Step 2: Start dev server and verify visually**

```bash
bun run dev
```

Open `http://localhost:5173/components` — confirm all sections render correctly in both light and dark mode (use the toggle in Nav).

- [ ] **Step 3: Run all tests**

```bash
bun test
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Components.tsx
git commit -m "feat: update /components page with ComponentShowcase"
```

---

### Task 11: Update docs

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/figma-map.md`
- Modify: `docs/status.md`

- [ ] **Step 1: Update the token system section in `CLAUDE.md`**

Replace the token rules block. The new token system is `@theme` in `index.css`. Remove references to `src/variables/`. Replace the `sync-tokens` skill row since tokens now live in CSS. Updated rules section:

```markdown
### Tokens

- Never hardcode colors, spacing, radius or typography
- All tokens live in `@theme {}` in `src/index.css` — do not import from any JS/TS file
- Missing token: run new-token skill first, then add to @theme in index.css
```

Also remove the `sync-tokens` row from the Skills table (it was for syncing from TS files, which no longer exist).

- [ ] **Step 2: Update `docs/figma-map.md` — add new components**

Add to the Components table:

```markdown
| Heading    | —       | src/components/Typography/ | 2026-03-31 | No Figma source — built 2026-03-31 |
| Text       | —       | src/components/Typography/ | 2026-03-31 | No Figma source — built 2026-03-31 |
| Input      | —       | src/components/Input/      | 2026-03-31 | No Figma source — built 2026-03-31 |
| ComponentShowcase | — | src/components/ComponentShowcase/ | 2026-03-31 | Docs utility only — not for production use |
```

- [ ] **Step 3: Update `docs/status.md`**

Mark everything from this session as completed. Clear "In progress". Note that Tailwind v4 is now the token system.

- [ ] **Step 4: Final build check**

```bash
bun run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md docs/figma-map.md docs/status.md
git commit -m "docs: update CLAUDE.md and figma-map for Tailwind v4 migration"
```

---

### Task 12: Update skills in `.claude/skills/`

The token system has changed from `src/variables/*.ts` imports to Tailwind utility classes + `@theme {}` in `index.css`. Six skills contain stale references that must be updated.

**Files:**
- Rewrite: `.claude/skills/sync-tokens/SKILL.md`
- Rewrite: `.claude/skills/new-token/SKILL.md`
- Modify: `.claude/skills/build-component/SKILL.md`
- Modify: `.claude/skills/check-wcag/SKILL.md`
- Modify: `.claude/skills/project-setup/SKILL.md`
- Modify: `.claude/skills/sync-icons/SKILL.md`

- [ ] **Step 1: Rewrite `.claude/skills/sync-tokens/SKILL.md`**

The old skill synced from Figma JSON files to `src/variables/*.ts`. The new skill updates `@theme {}` values directly in `src/index.css`.

```markdown
---
name: sync-tokens
description: Use during project setup, after Figma variables are updated, or when a new token is found. Trigger phrases: "sync-tokens", "sync tokens from Figma", "update tokens", "sync design tokens".
---

# Skill: sync-tokens

# Usage: "Run sync-tokens"

# When: Project setup, after Figma variables are updated, or when a new token is found.

---

## Rules

- All tokens live in `@theme {}` in `src/index.css` — never in separate TS/JSON files
- Never hardcode values directly in components — always use Tailwind utility classes
- Semantic color aliases (bg, text, border) live in `:root` and `[data-theme="dark"]` blocks in `src/index.css`

---

## Step 1 — Get Figma file URL

Read PROJECT_SETUP.md for the Figma file URL.
If not set: stop and ask "What is the Figma file URL?"

## Step 2 — Fetch and compare tokens

For each token category (colors, spacing, radius, typography, animations, breakpoints):
Run search_design_system with the Figma file key.
Compare each value against the corresponding `--color-*`, `--radius-*`, etc. in the `@theme {}` block of `src/index.css`.

## Step 3 — Update @theme in index.css

For any value that differs from the current `@theme {}` entry:
Update the corresponding CSS custom property in the `@theme {}` block.
Do not remove existing tokens — only add or update.

## Step 4 — Update dark mode aliases

If semantic color aliases exist in `[data-theme="dark"]` in `src/index.css`:
Verify they still reference valid palette tokens after any color changes.
Update if needed.

## Step 5 — Flag new tokens

If any Figma value has no matching `@theme` entry: run new-token skill for each one.

## Step 6 — Report

List all `@theme` entries updated.
Note any tokens skipped or flagged.
```

- [ ] **Step 2: Rewrite `.claude/skills/new-token/SKILL.md`**

The old skill added values to JSON files and updated `colors.ts`. The new skill adds directly to `@theme {}` in `src/index.css`.

```markdown
---
name: new-token
description: Use when a new design token is needed that doesn't exist yet. Trigger phrases: "new-token", "add token", "missing token", called automatically when a token is missing during component work.
---

# Skill: new-token

# Usage: "Run new-token" (called automatically) or "Add token [name] [value] [category]"

# When: A new token is discovered in Figma or needed for a component.

---

## Rules

- All tokens live in `@theme {}` in `src/index.css` — never in separate files
- Semantic color aliases (bg, text, border) live in `:root` / `[data-theme="dark"]` in `src/index.css`
- Never write a raw token value directly in a component — always use the Tailwind utility class

---

## Step 1 — Identify token

Confirm:
- Name (as it appears in Figma if available)
- Value (hex, px, rem, or easing)
- Category: color / spacing / radius / typography / animation

## Step 2 — Color tokens: check for duplicates

If category is color:

a) Does a token with this hex value already exist in `@theme {}`?
   Yes → tell user, stop — reuse the existing token and its utility class
   No → continue

b) Does a semantic alias for this use case already exist in `:root`?
   Yes → tell user, stop — reuse the existing alias
   No → continue

## Step 3 — Confirm before adding

"⚠️ New token:
Name: [--color-* / --radius-* / etc.]
Category: [category]
Value: [value]
Tailwind class: [bg-primary-600 / rounded-md / etc.]
Description: [proposed usage rule]
Shall I add this?"
Wait for confirmation.

## Step 4 — Add to @theme in src/index.css

Add the new CSS custom property to the correct section inside `@theme {}`:

- Color: add under the appropriate palette group (`--color-primary-*`, `--color-neutral-*`, etc.)
- Spacing: add `--spacing-*` (only if the value is not already on Tailwind's default scale)
- Radius: add `--radius-*`
- Typography: add `--text-*`, `--font-*`, or `--leading-*`
- Animation: add `--duration-*` or `--ease-*`

For dark mode semantic aliases: also add or update the value in `[data-theme="dark"]` block.

## Step 5 — Update status.md

Note the new token under Key decisions if it represents a significant addition.
```

- [ ] **Step 3: Update token references in `.claude/skills/build-component/SKILL.md`**

Replace the Tokens rules section and the token mapping table in Step 3:

Old Tokens rules:
```
- Import from src/variables/ only (colors.ts, spacing.ts, radius.ts, etc.)
```

New Tokens rules:
```
- Use Tailwind utility classes only — never import from JS/TS files, never inline styles
- All token values come from `@theme {}` in `src/index.css` via Tailwind utility classes
- Missing token: run new-token skill before continuing
```

Old Step 3 token mapping:
```
- Colors → src/variables/colors.ts
- Spacing → src/variables/spacing.ts
- Radius → src/variables/radius.ts
- Typography → src/variables/typografi.ts
- Animations → src/variables/animations.ts (duration + easing primitives only)
```

New Step 3 token mapping:
```
- Colors → Tailwind color utilities (bg-primary-600, text-neutral-900, etc.)
- Spacing → Tailwind spacing utilities (p-4, gap-6, mx-auto, etc.)
- Radius → Tailwind radius utilities (rounded-md, rounded-lg, etc.)
- Typography → Tailwind text utilities (text-sm, font-medium, leading-normal, etc.)
- Animations → Tailwind transition/duration utilities (transition-colors, duration-100, ease-out, motion-reduce:transition-none)
```

Also update the Animations rules section:
Old:
```
- Use values from src/variables/animations.ts only (duration + easing primitives)
```
New:
```
- Use Tailwind transition utilities only (transition-colors, duration-100, ease-out)
- Always add motion-reduce:transition-none alongside any transition class
```

- [ ] **Step 4: Fix stale path in `.claude/skills/check-wcag/SKILL.md`**

In Step 3, Color contrast section, replace:

Old:
```
Calculate contrast ratio from values in src/tokens/colors.ts.
```

New:
```
Calculate contrast ratio from color values in the `@theme {}` block of `src/index.css`.
```

- [ ] **Step 5: Update `.claude/skills/project-setup/SKILL.md`**

Three sections need updating:

**Step 5** — Replace the entire step:

Old Step 5 validates `src/variables/colors.ts`, `typografi.ts`, `theme.ts`.

New Step 5:
```markdown
## Step 5 — Validate token setup

Read `src/index.css`.
Confirm:
- `@import "tailwindcss"` is present
- `@custom-variant dark` is defined
- `@theme {}` block exists and contains color, radius, and font-family tokens
- `:root` and `[data-theme="dark"]` blocks exist with semantic color aliases

Report issues. Fix only if confirmed by user.
```

**Step 6** — Keep "Run sync-tokens skill" (the skill has been rewritten, it still applies).

**Step 8** — Remove creation of `src/variables/breakpoints.ts` and `src/variables/animations.ts` (these no longer exist). Keep `.gitignore` creation. Updated Step 8:
```markdown
## Step 8 — Create missing base files

Create if not present:

- `.gitignore`
  .env, .env.local, .env.\*.local, wrong image formats, node_modules
```

- [ ] **Step 6: Update `.claude/skills/sync-icons/SKILL.md`**

The icon registry will live at `src/components/Icon/icon-registry.ts` (co-located with the Icon component), not `src/variables/icon-registry.ts`.

In Step 2, replace:
```
Read src/variables/icon-registry.ts.
```
with:
```
Read src/components/Icon/icon-registry.ts.
```

In Step 3, replace:
```
Add to the icons object in icon-registry.ts.
```
with:
```
Add to the icons object in src/components/Icon/icon-registry.ts.
If the file does not exist yet, create it:

export const icons = {
  // 'icon-name': '/src/icons/icon-name.svg',
} as const

export type IconName = keyof typeof icons
```

- [ ] **Step 7: Commit**

```bash
git add .claude/skills/
git commit -m "chore: update skills for Tailwind v4 token system migration"
```
