---
name: new-component
description: Use when a component is needed that does not exist in Figma. Trigger phrases: "new-component", "build component not in Figma", "create component without Figma source".
---

# Skill: new-component

# Usage: "Run new-component [description]"

# When: A component is needed that does not exist in Figma.

---

## Rules

Same token, WCAG, animation and breakpoint rules as build-component skill.
Read that skill's Rules section before implementing.

---

## Step 1 — Check if something similar exists

Read docs/figma-map.md and check src/components/.
If a close match exists:
"⚠️ Similar component found: [name]
Does not fully fit because: [reason]
A) Extend [name] with a new variant
B) Build a new component
Which do you prefer?"
Wait for answer.

## Step 2 — Propose the component

"⚠️ New component — not in Figma:
Name: [name]
Purpose: [what it does]
Variants: [list]
Tokens:
Color: [token names]
Spacing: [token names]
Radius: [token names]
Typography: [token names]
Similar to: [any related existing component or none]

Should this be added to Figma first, or shall I build it now?"
Wait for confirmation.

## Step 3 — Handle missing tokens

If any proposed token does not exist: run new-token skill first.

## Step 4 — Implement

Create src/components/[Name]/:

- [Name].tsx
- [Name].types.ts
- index.ts

## Step 5 — Update docs

- Add row to docs/figma-map.md with note: "No Figma source — built [DATE]"
- Add checklist block to docs/wcag-checklist.md

## Step 6 — Run check-wcag skill

## Step 7 — Update status.md
