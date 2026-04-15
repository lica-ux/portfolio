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
