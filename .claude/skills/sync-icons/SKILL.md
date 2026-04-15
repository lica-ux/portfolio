---
name: sync-icons
description: Use during project setup or after adding new SVG files to src/icons/ to register them. Trigger phrases: "sync-icons", "register icons", "sync icon registry".
---

# Skill: sync-icons

# Usage: "Run sync-icons"

# When: Project setup or after adding new SVG files to src/icons/

---

## Rules

- SVG files are read-only — never edit, move or rename them
- Registration only — never modify file contents
- Icons are always square — size applies equally to width and height

---

## Step 1 — Scan icon folder

List all files in src/icons/.
Filter: .svg files only. Ignore .gitkeep and non-svg files.

## Step 2 — Compare with registry

Read src/components/Icon/icon-registry.ts.
Find any SVG files not yet registered.

## Step 3 — Register new icons

For each unregistered SVG:

- Key: filename without extension (arrow-right.svg → 'arrow-right')
- Value: full path from src root ('/src/icons/arrow-right.svg')
  Add to the icons object in icon-registry.ts.

## Step 4 — Update IconName type

Update IconName type in src/components/Icon/Icon.types.ts
to include all registered icon names (derived from icon-registry.ts keys).

## Step 5 — Report

List newly registered icons.
List icons already in registry.
Confirm total count.
