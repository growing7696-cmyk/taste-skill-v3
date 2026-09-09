# The Skill Family

Twelve packages, four layers, one contract. This file is the index: what each skill is for, when to load it, and how many of its layer can be active at once.

Read `_core/SKILL.md` first. Everything else inherits it.

---

## Layers

| Layer | How many active | Why |
| --- | --- | --- |
| Contract | always | `_core` is inherited, not chosen |
| Engine | exactly 1 | Process: design read, dials, layout cast, pre-flight |
| Style | at most 1 | Surface skills contradict each other by design. Two loaded at once produce a page that argues with itself |
| Workflow | any number | They constrain the build without deciding surface |
| Asset | any number, budget-gated | Cost is real, so volume is declared before generating |
| Export | at most 1 | Each targets a different destination |

---

## Contract

### `_core` (`taste-core`)

The shared governance layer. Precedence ladder, three rule tiers, the HARD accessibility floor, the asset budget, the verification gates, the scope router, honesty rules.

Load it before the style skill, not after. Without it every rule in the family falls back to PREFERENCE.

Reference files: `precedence.md`, `rule-tiers.md`, `accessibility-floor.md`, `verification.md`, `asset-budget.md`, `scope-router.md`.

---

## Engine

### `taste-skill-v3` (`design-taste-frontend-v3`)

The build process. Brief inference, three dials, **Layout Casting** (structure committed before markup), multi-variant mode, UX writing pass, XSS guardrails, the block library, the full pre-flight, and the measured performance gate.

Use for: landing pages, portfolios, marketing pages, editorial and launch pages, redesign targets.
Not for: dashboards, dense tables, wizards, settings, code editors, native apps. Those route out via the scope router.

### `GPT-taste` (`design-taste-frontend-v3`, GPT and Codex packaging)

The same engine, packaged for ChatGPT and Codex, with `agents/openai.yaml` and a condensed `SKILL.md` that points at `reference/full-rules.md`. Install this **or** the engine, never both.

---

## Style (pick at most one)

### `taste-minimal` (`taste-minimal`)

Flat editorial surface. Warm monochrome canvas, typographic contrast instead of decoration, hairline structure, muted pastel accents, near-zero elevation, dark mode included.

Use for: developer tools, technical products, trust-first work, editorial pages, information-dense marketing.
Skip when: the brief wants presence, warmth, or spectacle.

### `taste-soft` (`taste-soft`)

Layered tactile surface. A four-level elevation scale with real values, a budgeted nested-bezel treatment, physically motivated motion, glass that degrades safely.

Use for: consumer launches, hardware, apps, lifestyle brands, portfolios that need presence.
Skip when: the surface is information-dense, or the project's tokens define no shadows.

### `taste-brutal` (`design-taste-brutalist`)

Two committed modes, declared per project:

- **`MODE: neo`** loud, flat, fluorescent, poster-like. Thick black borders, hard offset shadows, system and grotesk type.
- **`MODE: industrial`** Swiss print meets tactical telemetry. Rigid grids, extreme type-scale contrast, two-color substrate, simulated analog degradation. Spec in `taste-brutal/skills/taste-brutal/reference/modes.md`.

Both obey the accessibility carve-outs: 16px body, 14px micro type, no all-caps paragraphs, overlays capped and measured on the composite, decorative ASCII marked `aria-hidden`.

---

## Workflow (compose freely)

### `taste-redesign` (`taste-redesign`)

Upgrade an existing site without breaking it. Mode declared first (preserve or overhaul), baseline captured before the first edit, regression diff after, jurisdiction-aware compliance reporting instead of blanket legal instructions, rollback plan included.

Pairs with: `verify:baseline` and `verify:diff`.

### `taste-image-to-code` (`taste-image-to-code`)

Build from a visual reference. A trigger matrix decides whether generating a reference is worth it at all; small edits and design-system projects skip it. A written spec is extracted before implementation, and the states a reference cannot show are designed explicitly.

### `taste-output` (`taste-output`)

Completeness without over-blocking. Counted scope, omission markers banned in delivered code, a clean resumable split at the token limit, and an allowlist so fixtures, labeled stubs, and tracked TODOs survive.

---

## Asset (budget-gated)

Budget tiers: NONE, SPOT, SECTION, FULL. Declared before the first generation call. See `_core/reference/asset-budget.md`.

### `taste-imagegen-web` (`taste-imagegen-web`)

Website design references. Per-section generation is a tier, not a mandate. Every set carries mobile-shaped frames, one fixed art direction spine, no critical text baked into images, and an implementation spec so the comps can actually be built.

### `taste-imagegen-mobile` (`taste-imagegen-mobile`)

App screen concepts and flows. Platform mode committed, safe areas and keyboard-up variants required, depth preferred over breadth, and a token and spec handoff that turns screens into a build.

### `taste-brandkit` (`taste-brandkit`)

Identity kits. The logo is authored as SVG geometry, never generated as a raster. Deliverables include variants, clearspace, minimum size, contrast-paired color tokens, type license status, and a trademark risk checklist that reports risk and never claims clearance.

---

## Export

### `taste-stitch` (`taste-stitch`)

Writes a `DESIGN.md` for Google Stitch in its own visual-description vocabulary, caps motion for performance and accessibility, requires an accessibility section in the generated file, then closes the loop: inspect what Stitch returns, classify each miss, revise at most three times, and hand over a post-pass list for what Stitch cannot express.

---

## Choosing, in practice

```text
New landing page, no brand yet
  _core + taste-skill-v3 + one style skill, ASSETS SPOT

Landing page for a brand with a design system
  _core + taste-skill-v3, no style skill (the system is the style), ASSETS NONE
  Every aesthetic DEFAULT yields to the tokens, each override logged

Modernize an existing marketing site
  _core + taste-skill-v3 + taste-redesign, preserve mode, ASSETS NONE
  Baseline first, diff after

Client wants to see three directions
  _core + taste-skill-v3 multi-variant, DRAFT fidelity on all three,
  FINAL gates only on the one they pick

Comps before code
  _core + taste-imagegen-web, then taste-image-to-code for the build

Brand identity from scratch
  _core + taste-brandkit
```

## Verification

Every package reports against the same gates:

```bash
npm run check                                             # repo structure
npm run verify:screens    -- --url http://localhost:3000  # G1 responsive
npm run verify:a11y       -- --url http://localhost:3000  # G2, zero critical, zero serious
npm run verify:lighthouse -- --url http://localhost:3000  # G3, FINAL builds only
```

A gate that cannot run is reported as DEFERRED. Claiming a score you did not measure is a HARD violation of the contract.
