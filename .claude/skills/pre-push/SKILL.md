---
name: pre-push
description: Use before every push to production to run a full readiness check. Trigger phrases: "pre-push", "prepare for production", "ready to push", "pre-deploy check".
---

# Skill: pre-push

# Usage: "Run pre-push"

# When: Before every push to production.

---

## Step 1 — WCAG status

Read docs/wcag-checklist.md.
List any components missing a completed checklist.

## Step 2 — Open conflicts

Read docs/conflict-log.md.
List any conflicts with status OPEN.
If any open: warn and ask how to proceed before continuing.

## Step 3 — Environment variables

Read PROJECT_SETUP.md for the confirmed env variable list.
Check .env is in .gitignore.
Check no secret variables are referenced in client-side code.

## Step 4 — Image check

Scan src/images/.
Report any non-.webp files or files exceeding 2080px or 940kb.
Do not delete without confirmation.

## Step 5 — Metadata and page titles

For each page or route in the project:
Suggest <title> and <meta name="description"> based on page content and purpose.
Do not write marketing copy — suggest functional, descriptive values.
Present for user approval before applying.

## Step 6 — Favicon and app icon

Check if favicon.ico exists in the project root or public folder.
If missing:
"⚠️ No favicon or app icon found.
Recommended files:

- favicon.ico (32×32)
- favicon.svg (scalable)
- apple-touch-icon.png (180×180)
- og-image.png (1200×630)
  Add now or skip until next push?"
  If present: skip silently.

## Step 7 — Reminder

"Before deploying: verify no console errors and no axe-core warnings in development."

## Step 8 — Summary

WCAG: [all clear / X components need review]
CONFLICTS: [none open / X open]
ENV VARS: [confirmed / issues found]
IMAGES: [all .webp / issues found]
METADATA: [suggestions provided]
FAVICON: [present / missing / skipped]

Ready to push: [yes / no — reason]

## Step 9 — Update status.md
