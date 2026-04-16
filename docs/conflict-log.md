# conflict-log.md — WCAG and design conflicts

# Read by check-wcag and pre-push skills before flagging a conflict.

# If a conflict is already resolved here, do not flag it again.

# Never delete entries — keep all history.

---

## Open

<!-- Conflicts awaiting a decision -->
<!-- Claude adds entries here and moves them to Resolved when decided -->

---

## Resolved

### CONFLICT-001 — 2026-04-16
**Component:** StatsSection
**Type:** Color contrast / Dark mode

**Problem:**
`--color-nav-text` (#491129) has no `[data-theme="dark"]` override. In dark mode, maroon text on `--color-bg` dark (#111827) = 1.17:1 — FAIL for large text (requires 3:1).

**Decision:** Not applicable — the site has no dark mode. Dark mode token exists in the codebase but is not exposed to visitors. Conflict dismissed 2026-04-16.

**Action:** No code change. Note added to wcag-checklist.md.

<!-- Template — copy for each new conflict

### CONFLICT-[number] — [DATE]
**Component:** [name]
**Figma node:** [node-id]
**Type:** Color contrast / Semantic HTML / Focus indicator / Other

**Problem:**
[Token name] ([hex]) on [background token] ([hex]) = [X.X]:1
Required: [4.5 or 3.0]:1 — FAIL

**Figma intention:**
[Quote the variable or component description if available]

**Options:**

#### A — [label] ⭐ recommended
[What changes] → [X.X]:1 ✅
Visual impact: [minimal / moderate / significant]

#### B — [label]
[What changes] → [X.X]:1 ✅
Visual impact: [minimal / moderate / significant]

#### C — [label]
[What changes] → [X.X]:1 ✅
Visual impact: [minimal / moderate / significant]

**Decision:** [OPEN / Option X — [name], [DATE]]
**Action:** [What was changed]
**Code comment added:** yes / no

-->
