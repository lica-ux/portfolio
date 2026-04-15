---
name: check-wcag
description: Use after implementing any component to verify WCAG AA 2.1 accessibility compliance. Trigger phrases: "check-wcag", "run check-wcag on [component]", "verify WCAG", "accessibility check".
---

# Skill: check-wcag

# Usage: "Run check-wcag on [ComponentName]"

# When: After implementing a component.

---

## Step 1 — Check conflict history

Read docs/conflict-log.md.
If a conflict for this component is already resolved: do not flag it again.

## Step 2 — Read the component

Read src/components/[Name]/ files.

## Step 3 — Check each criterion

### Color contrast

For each color pair (text/bg, icon/bg, border/bg) used in the component:
Look up hex values from `@theme {}` blocks in `src/index.css`.

- Normal text (< 18px regular / < 14px bold): 4.5:1 minimum
- Large text (≥ 18px regular / ≥ 14px bold): 3:1 minimum
- UI elements and icons: 3:1 minimum

If any pair fails and is not already in conflict-log.md:
"⚠️ WCAG conflict:
[token] ([hex]) on [background] ([hex]) = [X.X]:1
Required: [4.5 or 3.0]:1 — FAIL

A) Darken to [hex] → [X.X]:1 ✅ (minimal visual change)
B) Use [other token] → [X.X]:1 ✅
C) Change background to [hex] → [X.X]:1 ✅
Which do you choose?"
Log decision in docs/conflict-log.md.

### Semantic HTML

- Correct element used (button, a, input, label, etc.)
- No div or span with onClick

### Keyboard navigation

- All interactive elements reachable by Tab
- Enter and Space trigger actions where expected
- Escape closes overlays and dropdowns
- No keyboard traps

### Focus indicator

- :focus-visible not removed or overridden without replacement
- Focus ring visible — uses `focus-visible:outline-2 focus-visible:outline-offset-2` Tailwind utilities

### ARIA

- Icon-only buttons have aria-label
- Form fields have associated label via htmlFor + id
- Error messages use aria-describedby
- Loading states use aria-busy or aria-live
- Modals use aria-modal and trap focus

### Touch targets

- All interactive elements minimum 44×44px

### Animations

- All animations wrapped in @media (prefers-reduced-motion: no-preference)
- Only transform and opacity animated — never width, height, top, left

### Figma description match

If a Figma description exists on the component:
Verify the implementation matches it.

## Step 4 — Report results

For each criterion: ✅ Pass / ❌ Fail / N/A
If failures: present clearly and wait for instruction before fixing.

## Step 5 — Update wcag-checklist.md

Add or update the checklist block for this component.
Update the summary table row.
