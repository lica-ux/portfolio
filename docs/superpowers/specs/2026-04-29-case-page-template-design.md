# Case Page Template — Design Spec

Date: 2026-04-29

## Goal

Create empty subpage routes for each Selected Work case, each with a back button that returns to the homepage.

## Routes

| Path | Case |
|------|------|
| `/work/baribuddy` | Baribuddy |
| `/work/booky` | Booky |
| `/work/sejfa` | Sejfa |

## Components

### `src/pages/CasePage.tsx`

Shared template used by all three routes. Accepts a `project` prop (title at minimum) to differentiate pages. Content area is empty — sections added later from Figma.

Layout:
- Full page, uses `--color-bg` background
- Back button top-left, `px-4 md:px-10 py-6` padding
- Rest of page is empty content area for future sections

### Back button

- Label: `← Selected work`  
- Navigation: `<Link to="/">` (always goes to homepage)
- Styling: uses `--color-text-muted` color, existing typography tokens, no underline, hover state uses `--color-text`
- Not a `<button>` — it's a navigation link, so `<Link>` from react-router-dom

## App.tsx changes

Add three new routes:
```
/work/baribuddy  → <CasePage project="baribuddy" />
/work/booky      → <CasePage project="booky" />
/work/sejfa      → <CasePage project="sejfa" />
```

## SelectedWork changes

Each `<article>` card wrapped in `<Link to="/work/{slug}">` so cards are clickable.

## Out of scope (this task)

- Page content/sections (added after Figma review)
- Scroll restoration
- Transition animations
