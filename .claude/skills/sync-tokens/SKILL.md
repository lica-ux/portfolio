---
name: sync-tokens
description: Use during project setup, after Figma variables are updated, or when a new token is found. Trigger phrases: "sync-tokens", "sync tokens from Figma", "update tokens", "sync design tokens".
---

# Skill: sync-tokens

# Usage: "Run sync-tokens"

# When: Project setup, after Figma variables are updated, or when a new token is found.

---

## Rules

- All design tokens live in `@theme {}` blocks in `src/index.css` — no JSON files, no src/variables/
- Components use Tailwind utility classes — never import token values directly
- Semantic color aliases (light/dark aware) go in `:root` and `[data-theme="dark"]` blocks in `src/index.css`
- Never hardcode values in component files

---

## Step 1 — Get Figma file URL

Read PROJECT_SETUP.md for the Figma file URL.
If not set: stop and ask "What is the Figma file URL?"

## Step 2 — Sync color tokens

Run search_design_system for color variables.
Map to `--color-*` custom properties in the `@theme {}` block in `src/index.css`.

Naming convention:
- Palette scales: `--color-primary-50` through `--color-primary-900`
- Neutral scale: `--color-neutral-0` (white) through `--color-neutral-900`
- Semantic singles: `--color-success`, `--color-warning`, `--color-error`, `--color-info`

Semantic aliases (light/dark aware) go in `:root` / `[data-theme="dark"]`:
- `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`

## Step 3 — Sync spacing tokens

Run search_design_system for spacing variables.
Map to `--spacing-*` in `@theme {}`.
If not found in Figma: use standard scale (1→4px, 2→8px, 3→12px, 4→16px, 6→24px, 8→32px, 12→48px, 16→64px).

## Step 4 — Sync radius tokens

Run search_design_system for border radius variables.
Map to `--radius-*` in `@theme {}`.
If not found: use standard scale: none→0, sm→4px, md→8px, lg→12px, xl→16px, full→9999px.

## Step 5 — Sync typography tokens

Run search_design_system for typography variables.
Map font family to `--font-sans`, `--font-serif`, `--font-mono` in `@theme {}`.
Font sizes, weights, and line-heights use Tailwind's built-in scale unless overrides are needed.

## Step 6 — Flag new tokens

If any Figma value cannot be mapped to an existing token: run new-token skill for each one.

## Step 7 — Report

List all tokens added or updated in `src/index.css`.
Note any tokens skipped or flagged.
