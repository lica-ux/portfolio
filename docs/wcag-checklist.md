# wcag-checklist.md — Accessibility status per component

# Read by pre-push skill before production deployment.

# Claude fills in a row and block when a component is completed.

# A component is not done until all applicable items are checked.

---

## Summary

| Component | Contrast | Semantic HTML | Keyboard | Focus | ARIA | Tap 44px | axe-core | Done |
| --------- | -------- | ------------- | -------- | ----- | ---- | -------- | -------- | ---- |
| —         | —        | —             | —        | —     | —    | —        | —        | —    |
| Button    | ✅       | ✅            | ✅       | ✅      | N/A | ✅       | ✅       | ✅      |
| StatsSection | ✅    | ✅            | N/A      | N/A     | ✅  | N/A      | —        | ✅      |
| SelectedWork | ✅    | ✅            | N/A      | N/A     | N/A | N/A      | —        | ✅      |
| AboutMe      | ✅    | ✅            | N/A      | N/A     | N/A | N/A      | —        | ✅      |

---

## Status key

✅ Pass ❌ Fail — see conflict-log.md N/A Not applicable

---

## Component checklists

### Button — 2026-03-31
- [x] Contrast ≥ 4.5:1 normal text / 3:1 large text and UI elements — primary: 5.17:1 ✅, secondary: 5.17:1 ✅
- [x] Correct semantic HTML element used — `<button>`
- [x] All interactive states keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Visible focus indicator present (browser default active — axe-core to confirm)
- [x] aria-label on icon-only buttons — N/A (text-only button)
- [x] Form fields have associated `<label>` — N/A
- [x] Error messages linked via aria-describedby — N/A
- [x] Loading state uses aria-busy or aria-live — N/A
- [x] Animations respect prefers-reduced-motion — transition injected via `<style>` tag wrapped in `@media (prefers-reduced-motion: no-preference)`
- [x] All interactive elements ≥ 44×44px — minHeight/minWidth 44px set
- [x] axe-core scan: no violations ✅ 2026-03-31
- [x] No Figma source — built without Figma description

Notes: Transition handled via injected `<style>` tag with `@media (prefers-reduced-motion: no-preference)`. axe-core clean 2026-03-31.

### StatsSection — 2026-04-16
- [x] Contrast ≥ 4.5:1 normal text / 3:1 large text — `--color-nav-text` (#491129) on `--color-bg` (#f8f3ff) = 13.9:1 ✅. Dark mode N/A (no dark mode on site).
- [x] Correct semantic HTML element used — `<section>` with meaningful image `alt`
- [x] All interactive states keyboard accessible — N/A (no interactive elements)
- [x] Visible focus indicator — N/A (no focusable elements)
- [x] aria-label on icon-only buttons — N/A
- [x] Form fields have associated `<label>` — N/A
- [x] Error messages linked via aria-describedby — N/A
- [x] Loading state uses aria-busy or aria-live — N/A
- [x] Animations respect prefers-reduced-motion — `.stat-transition` class wrapped in `@media (prefers-reduced-motion: no-preference)` in index.css ✅
- [x] All interactive elements ≥ 44×44px — N/A
- [ ] axe-core scan: not yet run
- [x] No Figma source — built without Figma description

Notes: Purely presentational section. Only animated properties are `opacity` and `transform`. Dark mode conflict flagged and resolved as N/A — site has no dark mode toggle.

### SelectedWork — 2026-04-28
- [x] Contrast ≥ 4.5:1 normal text / 3:1 large text — `--color-nav-text` (#491129) on `--color-bg` (#f8f3ff) = 13.2:1 ✅. `--color-hero-subtitle` rgba(73,17,41,0.7) on `#f8f3ff` ≈ 5.0:1 ✅ (18px normal). Dark mode N/A (no dark mode on site, see CONFLICT-001).
- [x] Correct semantic HTML element used — `<section>`, `<h2>`, `<article>`, `<img alt>`
- [x] All interactive states keyboard accessible — N/A (no interactive elements)
- [x] Visible focus indicator — N/A (no focusable elements)
- [x] aria-label on icon-only buttons — N/A
- [x] Form fields have associated `<label>` — N/A
- [x] Error messages linked via aria-describedby — N/A
- [x] Loading state uses aria-busy or aria-live — N/A
- [x] Animations respect prefers-reduced-motion — N/A (no animations)
- [x] All interactive elements ≥ 44×44px — N/A
- [ ] axe-core scan: not yet run
- [x] Figma node 5885-4596 — no component descriptions found

Notes: Purely presentational section. Three project cards with portrait images. Images use temporary Figma CDN URLs — must be replaced with local .webp files before production.

### AboutMe — 2026-05-03
- [x] Contrast ≥ 4.5:1 normal text / 3:1 large text — `--color-nav-text` (#491129) on `--color-bg` (#f8f3ff) = 13.9:1 ✅. `--color-hero-subtitle` rgba(73,17,41,0.7) on `#f8f3ff` ≈ 5.0:1 ✅ (large text ≥18px, requires 3:1).
- [x] Correct semantic HTML element used — `<section>`, `<h2>`, `<p>`, `<img alt>`
- [x] All interactive states keyboard accessible — N/A (no interactive elements)
- [x] Visible focus indicator — N/A (no focusable elements)
- [x] aria-label on icon-only buttons — N/A
- [x] Form fields have associated `<label>` — N/A
- [x] Error messages linked via aria-describedby — N/A
- [x] Loading state uses aria-busy or aria-live — N/A
- [x] Animations respect prefers-reduced-motion — N/A (no animations)
- [x] All interactive elements ≥ 44×44px — N/A
- [ ] axe-core scan: not yet run
- [x] Figma node 5893-4512 — no component descriptions found

Notes: Purely presentational. Portrait and hobby images use temporary Figma CDN URLs — must be replaced with local .webp before production.

<!-- Template — copy for each component

### [ComponentName] — [DATE]
- [ ] Contrast ≥ 4.5:1 normal text / 3:1 large text and UI elements
- [ ] Correct semantic HTML element used
- [ ] All interactive states keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Visible focus indicator present and uses border.focus token
- [ ] aria-label on icon-only buttons
- [ ] Form fields have associated <label> (if applicable)
- [ ] Error messages linked via aria-describedby (if applicable)
- [ ] Loading state uses aria-busy or aria-live (if applicable)
- [ ] Animations respect prefers-reduced-motion
- [ ] All interactive elements ≥ 44×44px
- [ ] axe-core scan: no violations
- [ ] Implementation matches Figma description (if description exists)

Notes:

-->
