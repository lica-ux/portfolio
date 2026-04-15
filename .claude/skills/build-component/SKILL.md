---
name: build-component
description: Use when implementing any component that exists in Figma. Trigger phrases: "build component", "implement component from Figma", "build [name] from Figma node".
---

# Skill: build-component

# Usage: "Build component [name] from Figma node [node-id]"

# When: Implementing any component that exists in Figma.

---

## Rules

### Tokens

- Map every value to a Tailwind utility class — never hardcode colors, spacing, radius or typography
- Token values are defined in `@theme {}` blocks in `src/index.css`
- Use semantic color aliases (`text-[var(--color-text)]`, `bg-[var(--color-bg)]`) for light/dark aware colors
- Missing token: run new-token skill before continuing

### Figma descriptions

- Descriptions on components, properties and variables are binding rules
- Copy as // [Figma] comments in the component file

### Icons

- Only size (always square 1:1) and color may change
- All icon control through Icon wrapper only
- Missing icon protocol:
  Stop and report:
  "⚠️ Missing icon: [name]
  Available: [list from src/icons/]
  A) Upload [name].svg — I will add it to src/icons/
  B) I build a geometric SVG approximation
  Which do you prefer?"
  Do not substitute. Do not proceed until resolved.

### Images

- .webp only — max 2080×2080px — max 940kb
- Non-compliant: stop and report

### WCAG AA 2.1

- Contrast minimums:
  Normal text (< 18px regular / < 14px bold): 4.5:1
  Large text (≥ 18px / ≥ 14px bold): 3:1
  UI elements and icons: 3:1
- Always semantic HTML — never <div onClick>
- All interactive elements keyboard accessible (Tab, Enter, Space, Escape)
- Visible focus indicator — use `focus-visible:outline-2 focus-visible:outline-offset-2`
- aria-label on all icon-only buttons
- Form fields: always associated <label> via htmlFor + id
- Error messages: aria-describedby pointing to the field
- Modals: aria-modal, focus trap, Escape closes
- Minimum tap target 44×44px — use `min-h-[44px] min-w-[44px]`

### Animations

- Use Tailwind transition utilities (`transition-colors`, `duration-100`, etc.)
- Always include `motion-reduce:transition-none` for reduced-motion
- Never animate width, height, top or left — use transform only
- Every entrance animation needs a matching exit animation
- Spinners: button loading states only — skeleton for everything else

### Breakpoints

mobile: 0–767px — single column, touch-first
tablet: 768–1199px — two column max
desktop: 1200px+ — full layout, max content width 1440px

---

## Step 1 — Check if component already exists

Check src/components/ and docs/figma-map.md.
If found: tell the user and stop. Ask if they want to extend it instead.

## Step 2 — Fetch design context

Run get_design_context with the node ID and Figma file key.
Study the screenshot carefully.

## Step 3 — Extract and map values

List all values found and map each to a Tailwind utility or CSS custom property:

- Colors → Tailwind color utilities (`text-primary-600`, `bg-neutral-0`) or semantic vars (`text-[var(--color-text)]`)
- Spacing → Tailwind spacing utilities (`px-6`, `py-3`, `gap-4`)
- Radius → Tailwind radius utilities (`rounded-md`, `rounded-lg`)
- Typography → Tailwind text utilities (`text-sm`, `font-medium`, `leading-normal`)
- Icons → src/icons/

## Step 4 — Handle missing tokens

If any value has no matching Tailwind utility: run new-token skill before continuing.

## Step 5 — Handle missing icons

If any icon is not in the registry: follow missing icon protocol above.

## Step 6 — Check WCAG contrast

Calculate contrast ratio for every color pair (text/bg, icon/bg).
Look up hex values from `@theme {}` blocks in `src/index.css`.
If any pair fails: stop and report:
"⚠️ WCAG conflict:
[token] ([hex]) on [background] ([hex]) = [X.X]:1
Required: [4.5 or 3.0]:1 — FAIL

A) Darken to [hex] → [X.X]:1 ✅ (minimal visual change)
B) Use [other token] → [X.X]:1 ✅
C) Change background to [hex] → [X.X]:1 ✅
Which do you choose?"

Log decision in docs/conflict-log.md.
Add // ⚠️ WCAG adjusted from Figma: [original] → [adjusted] comment in src/index.css near the token.

## Step 7 — Read Figma descriptions

List all descriptions found. Copy as // [Figma] comments in the component file.

## Step 8 — Confirm before implementing

Present summary:
Component: [name]
Variants/props: [list]
Tailwind classes: [list]
Figma descriptions: [list]
WCAG: [pass / conflicts resolved]
New tokens added: [list or none]

Ask: "Confirmed — shall I implement?"
Wait for confirmation.

## Step 9 — Implement

Create src/components/[Name]/:

- [Name].tsx
- [Name].types.ts
- index.ts

## Step 10 — Update docs

- Add row to docs/figma-map.md
- Add checklist block to docs/wcag-checklist.md

## Step 11 — Run check-wcag skill

## Step 12 — Update status.md
