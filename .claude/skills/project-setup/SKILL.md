---
name: project-setup
description: Use for first-time setup of a new project. Trigger phrases: "project-setup", "first time setup", "set up the project", "initialize project".
---

# Skill: project-setup

# Usage: "Run project-setup"

# When: First time only on a new project.

---

## Step 1 — Read rules

Read CLAUDE.md in full. Confirm before continuing.

## Step 2 — Check setup status

Read PROJECT_SETUP.md.
If status is [COMPLETE]: tell the user and stop.

## Step 3 — Collect missing information

For every field marked [NOT SET], ask all questions in one message.
Do not guess. Wait for answers before continuing.

Questions to ask:

1. Typography
   - Which font (sans-serif)?
   - Where loaded from — Google Fonts / local / npm?
   - Fallback font?
   - Monospace font needed?

2. Color modes
   - Light only, or also dark mode?
   - If dark: tokens from Figma or auto-generated?

3. Integrations
   - Version control: GitHub / GitLab / other / none
   - Project management: Jira / Notion / Linear / none
   - Backend: Firebase / Supabase / custom API / none
   - Auth: yes / no — which service?
   - Analytics: yes / no — which tool?

4. Security
   - Which environment variables will this project use?
   - Which are safe to use client-side?
   - Which must stay server-side only?

5. Deployment target: Vercel / Netlify / other / unknown

6. Figma file URL?

## Step 4 — Fill in PROJECT_SETUP.md

Write answers into PROJECT_SETUP.md.
Set status to: [COMPLETE — DATE]

## Step 5 — Validate token setup

Read `src/index.css` and verify:

- `@import "tailwindcss"` is present at the top
- `@theme {}` block exists with at minimum `--color-primary-*`, `--color-neutral-*`, `--radius-*` tokens
- `:root {}` block exists with semantic color aliases (`--color-bg`, `--color-text`, etc.)
- `[data-theme="dark"] {}` block exists if dark mode was confirmed in Step 3
- No raw hex values directly in component files

Report issues. Fix only if confirmed by user.

## Step 6 — Run sync-tokens skill

## Step 7 — Set up Google Fonts

Using the font confirmed in step 3:

1. Find the Google Fonts URL including all weights needed.
   Always include display=swap.
2. Add to index.html:
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="[GOOGLE FONTS URL]" rel="stylesheet">
3. Update `--font-sans` in the `@theme {}` block in `src/index.css`:
   --font-sans: "[Font Name]", [fallback], ui-sans-serif, system-ui, sans-serif;
4. Repeat for monospace font (`--font-mono`) if set.

If font not on Google Fonts:
"⚠️ [font] not found on Google Fonts.
Closest alternative: [suggestion]
Or provide a local file for src/fonts/
How would you like to proceed?"

## Step 8 — Verify base token coverage

Check `src/index.css` `@theme {}` block and add if missing:

- Breakpoints: `--breakpoint-sm`, `--breakpoint-md`, `--breakpoint-lg` (or use Tailwind defaults)
- Animation durations: `--animate-fast: 150ms`, `--animate-normal: 250ms`, `--animate-slow: 400ms`
- Animation easing: `--ease-default: cubic-bezier(0.4, 0, 0.2, 1)`, `--ease-enter`, `--ease-exit`
- `body` styles in `src/index.css` outside `@theme`: margin reset, font-family, font-size, color
- .gitignore: .env, .env.local, .env.\*.local, wrong image formats, node_modules

## Step 9 — Run sync-icons skill

## Step 10 — Create Icon component

Create src/components/Icon/:

Icon.tsx — mask technique for color control:

- Always square: size prop applies equally to width and height
- Missing icon shows hot pink placeholder (#FF0080) and console warning
- Console warning format:
  "[Icon] Missing icon: [name]
  Registered: [list]
  Resolution: Upload SVG or ask Claude to build geometric approximation"

Icon.types.ts:

- IconName type built from src/components/Icon/icon-registry.ts
- Props: name, size (number, default 24), color (default currentColor), label (for accessibility)

index.ts — barrel export

## Step 11 — Update status.md

Fill in Key decisions from setup answers.
Set LAST UPDATED to today.

## Step 12 — Summary

PROJECT: [name]
FIGMA: [connected / not connected]
FONT: [name] via Google Fonts ✅ / ⚠️ [issue]
MONOSPACE: [name or none]
COLOR MODES: [light only / light + dark]
TOKENS: [list files created]
ICONS REGISTERED: [number]
INTEGRATIONS: [list or none]
ISSUES: [anything flagged]

Then ask: "What do you want to build first?"
