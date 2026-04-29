# Mobile Bottom Nav — Design Spec

Date: 2026-04-29

## Goal

Move the nav pill to the bottom of the screen on mobile for easier thumb reach. Desktop (md+) keeps nav at top, unchanged.

## Change

**File:** `src/components/Nav.tsx`

The `<nav>` element currently has:
```
fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-10 py-4
```

Change to:
```
fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:px-10 py-4 md:top-4 md:bottom-auto
```

- `bottom-4` — positions pill near bottom on mobile
- `md:top-4` — restores top position on desktop (768px+)
- `md:bottom-auto` — cancels the bottom offset on desktop

No other changes. Pill appearance, links, tokens, and Nav.test.tsx assertions are all unaffected.
