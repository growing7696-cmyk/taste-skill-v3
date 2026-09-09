# Verification: The Four Gates

Self-graded checklists are not verification. These gates run code and produce numbers.

Scripts live in `scripts/verify/` at the repo root. They are dependency-light and degrade honestly: each one detects whether its tool is installed and, if not, prints what is missing and exits with a status the caller can report rather than pretending to pass.

---

## G0. Structural

**When**: always, before delivering anything.

```bash
npm run check
```

Validates this repository: dash rules, section references, block contract shape, skill inheritance lines, required files. Zero failures required.

For a build outside this repo, G0 is the skill's written pre-flight, run honestly, every box marked Pass or Fail with a one-line reason.

---

## G1. Responsive

**When**: any page build, DRAFT or FINAL.

```bash
npm run verify:screens -- --url http://localhost:3000
```

Captures 390, 768, 1280, and 1536 wide, full page, and asserts:

- No horizontal overflow at any width (document scroll width <= viewport width + 1).
- The hero region fits the first viewport at 390 and 1280.
- No element overlaps the viewport edge or is clipped out of view.
- Primary CTA is visible without scrolling at every width.

Screenshots land in `.verify/screens/`. **Look at them.** The assertions catch overflow; only your eyes catch a hero that technically fits and reads as broken.

---

## G2. Accessibility

**When**: any page build, DRAFT or FINAL.

```bash
npm run verify:a11y -- --url http://localhost:3000
```

Runs axe-core against the page at desktop and mobile widths. **Bar: zero serious and zero critical violations.** Not "a few". Zero.

Moderate and minor violations are reported and either fixed or listed with a reason in the output. The manual items in `accessibility-floor.md` still need the written pass; axe covers roughly a third of the floor.

When it fails: fix the violation, do not suppress the rule. The most common four in this family are contrast on muted text, missing accessible names on icon-only buttons, heading order broken by a decorative element, and inputs labeled only by a placeholder.

---

## G3. Performance

**When**: FINAL builds only. Drafts skip it by design.

```bash
npm run build && npm run start   # production build, never a dev server
npm run verify:lighthouse -- --url http://localhost:3000
```

Bars: **Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95.** 89 is a fail.

Report the category scores plus LCP, CLS, and TBT, and the conditions of the run.

When it fails, in priority order:

1. LCP image not prioritized, not sized, or served in a heavy format.
2. CLS from images without reserved aspect ratio, or font swap.
3. TBT from eagerly loaded motion or 3D libraries.
4. Render-blocking resources that are not needed for first paint.

Fix the specific failing metric, rebuild, re-measure, and report the delta.

---

## When a gate cannot run

This happens: no browser in the sandbox, no network, no dev server, a static file with no host. The required behavior is one line in the output naming the gate and the reason:

```text
DEFERRED: G3 Lighthouse not run (no Chrome binary in this environment). Not claiming a performance score.
```

**Claiming a score without a run is a HARD violation of the core contract.** Reporting a failing score is fine. Reporting a deferred gate is fine. Inventing a passing score is not.

---

## Installing the tooling

The verify scripts use optional dependencies so the repo stays installable without them:

```bash
npm i -D playwright @axe-core/playwright lighthouse chrome-launcher
npx playwright install chromium
```

If `playwright` is already available in the environment (many agent sandboxes ship it), the scripts use it directly and skip the install.

---

## Gate reporting format

Every build closes with this block:

```text
G0 structural   PASS
G1 responsive   PASS   (390/768/1280/1536, screenshots in .verify/screens)
G2 a11y         PASS   (axe: 0 critical, 0 serious, 2 minor: listed below)
G3 performance  PASS   (Perf 94 / A11y 100 / BP 96 / SEO 100, LCP 1.4s CLS 0.01 TBT 40ms)
```

or, honestly:

```text
G3 performance  DEFERRED (no Chrome binary available). No score claimed.
```
