---
name: taste-output
description: Workflow skill that prevents silent truncation and placeholder-shaped deliverables. Enforces a counted scope, bans omission markers in production code, defines a clean resumable split when output hits a limit, and keeps a narrow allowlist so legitimate stubs, fixtures, and generated files are not blocked.
---

# taste-output: Complete, or Honestly Paused

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.

Two failures, not one. The obvious one is truncated output: a file that stops with "rest of the code follows the same pattern". The less obvious one is a blanket ban on every `TODO` string, which breaks test fixtures, intentional stubs, and generated code. This version fixes both.

---

## 1. Scope, counted before building

Read the whole request. Write the count of distinct deliverables and lock it:

```text
SCOPE: 5 deliverables
  1. components/PricingTable.tsx      full
  2. components/PricingTier.tsx       full
  3. lib/pricing.ts                   full
  4. app/pricing/page.tsx             full
  5. pricing.test.ts                  full
```

Before responding, compare what exists against that list. A deliverable that is present but partial counts as missing.

---

## 2. Banned in delivered production code (HARD)

These are omission markers, and they turn a deliverable into a description of a deliverable:

- In code: `// ...`, `// rest of code`, `// implement here`, `/* ... */`, `// similar to above`, `// continue the pattern`, `// add more as needed`, and a bare `...` standing in for a body.
- In prose: "for brevity", "the rest follows the same pattern", "similarly for the remaining", "and so on" replacing content, "let me know if you want me to continue", "left as an exercise".
- Structural: a skeleton where an implementation was requested; first and last section shown with the middle skipped; one example plus a description of the other four; a description of what the code should do instead of the code.

---

## 3. The allowlist (the fix for over-blocking)

These are legitimate and are **not** violations. Blocking them makes the output worse.

- **Test fixtures and mocks** that intentionally contain placeholder data or names.
- **An intentional stub the user asked for**, written as a real construct rather than a comment: a function that throws `new Error("not implemented: <what and why>")`, or a typed interface with no implementation yet. It is visible, it fails loudly, and it is in the scope list marked `stub` on purpose.
- **A `TODO` that carries an owner and a tracking reference**, such as `// TODO(#412): swap to the streaming endpoint once it ships`. That is a work record, not an omission.
- **Generated or vendored files** that legitimately contain ellipses or machine-written markers.
- **Documentation and examples** that deliberately elide code for teaching, where the full version exists elsewhere and is linked.
- **Content placeholders the user asked to keep**, clearly labeled as placeholder.

The distinguishing test: does the marker stand in for work the user asked for and expected to receive? If yes, it is banned. If it is a deliberate, visible, labeled artifact, it is fine.

---

## 4. Hitting the limit

Output limits are real. Compressing to fit is the wrong response, and so is stopping mid-function.

1. Write at full quality to a clean breakpoint: end of a function, file, or section. Never mid-body.
2. Close with the resume marker:

```text
[PAUSED: 3 of 5 complete. Delivered: PricingTable.tsx, PricingTier.tsx, lib/pricing.ts.
 Next: app/pricing/page.tsx, then pricing.test.ts. Send "continue" to resume.]
```

3. On continue, resume exactly there. No recap, no re-emitting what was already delivered, no restating the plan.
4. **HARD**: never silently stop. An output that ends without either the full scope or a pause marker is a defect, and the pause marker is what makes it recoverable.

When the deliverable is large enough that a split is predictable, say so before starting and propose the split, so the user can reduce scope instead of paying for two rounds.

---

## 5. Delivering files rather than chat text

When the deliverable is code or documents, write actual files. A long code block in a chat message is the least useful shape for something the user has to run. Files also sidestep most of the truncation pressure this skill exists to manage.

---

## 6. Final check

- [ ] Deliverable count locked at the start, and every item present and finished?
- [ ] No omission markers anywhere in delivered production code?
- [ ] Every intentional stub is on the allowlist, visible, labeled, and in the scope list?
- [ ] If paused, a resume marker with counts and the exact next item?
- [ ] Nothing compressed to fit?
- [ ] Code blocks contain real runnable code, not a description of code?
