---
name: new-token
description: Use when a new design token is needed that doesn't exist yet. Trigger phrases: "new-token", "add token", "missing token", called automatically when a token is missing during component work.
---

# Skill: new-token

# Usage: "Run new-token" (called automatically) or "Add token [name] [value] [category]"

# When: A new token is discovered in Figma or needed for a component.

---

## Rules

- All tokens live in `@theme {}` blocks in `src/index.css` — no JSON files, no src/variables/
- Semantic color aliases (light/dark aware) go in `:root` and `[data-theme="dark"]` blocks
- Components use Tailwind utility classes — never write token values directly in a component
- Before adding: check if a token for this use case already exists in `src/index.css`

---

## Step 1 — Identify token

Confirm:

- Name (as it appears in Figma if available)
- Value (hex, px, rem)
- Category: color / spacing / radius / typography / animation

## Step 2 — Color tokens: check for existing

Read `src/index.css` and check if:

a) The palette value already exists (e.g. `--color-primary-600: #2563eb`)
   Yes → reuse it via Tailwind utility (e.g. `text-primary-600`)
   No → continue

b) A semantic alias for this use case already exists (e.g. `--color-text-muted`)
   Yes → tell user, stop — reuse the existing alias
   No → continue

## Step 3 — Confirm before adding

"⚠️ New token:
Name: [name]
Category: [category]
Value: [value]
CSS property: [--color-*, --spacing-*, etc.]
Block: [@theme, :root, [data-theme="dark"]]
Description: [proposed usage rule]
Shall I add this?"
Wait for confirmation.

## Step 4 — Add to src/index.css

Color palette → `@theme {}` block as `--color-[group]-[scale]: [hex]`
Semantic color (light) → `:root {}` as `--color-[alias]: [value]`
Semantic color (dark) → `[data-theme="dark"] {}` as `--color-[alias]: [value]`
Spacing → `@theme {}` as `--spacing-[key]: [px]`
Radius → `@theme {}` as `--radius-[key]: [px]`
Animation → `@theme {}` as `--animate-[key]: [value]`

## Step 5 — Update status.md

Note the new token under Key decisions if it represents a significant addition.
