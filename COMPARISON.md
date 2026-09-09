# v3 vs the base skill

A rule-level comparison against [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), based on the files shipped in this repository.

## Package shape

```text
skills/_core/                 shared governance contract, inherited by every skill
skills/taste-skill-v3/        engine: design read, dials, layout cast, pre-flight
skills/GPT-taste/             GPT and Codex packaging of the engine
skills/taste-brutal/          style: neo and industrial brutalism, two modes
skills/taste-minimal/         style: flat editorial surface
skills/taste-soft/            style: layered tactile surface
skills/taste-redesign/        workflow: audit, change, prove nothing broke
skills/taste-image-to-code/   workflow: reference-first, gated
skills/taste-output/          workflow: completeness without over-blocking
skills/taste-imagegen-web/    asset: budgeted web comps
skills/taste-imagegen-mobile/ asset: budgeted screen sets
skills/taste-brandkit/        asset: vector-first identity kits
skills/taste-stitch/          export: DESIGN.md for Google Stitch
scripts/verify/               the runnable gates
```

## Systemic differences

| Area | Base skill collection | Here |
| --- | --- | --- |
| Skills interacting | Each skill is standalone and unaware of the others, so a flat skill and a bezelled skill can both be loaded and silently fight | Skills are typed. One style skill at a time, enforced, and a precedence ladder settles every remaining conflict |
| Rule strength | Aesthetic bans stated absolutely: no Inter, no Lucide, no centered hero, no three-column cards, no gradients, no serif, no `rounded-full` | Three tiers. Nearly every aesthetic ban is DEFAULT and yields to brand tokens or an explicit request, with a logged override. HARD is reserved for accessibility, security, licensing, and honesty |
| Scope | Marketing-only scope stated, then product design systems and dashboard guidance mixed into the same file | Scope router. Product systems are named only to route work away, and a passage that reads like product-UI guidance is treated as a leak |
| Image generation | One image per section, always, no exceptions; landing pages default to eight or more; image-first mandatory for visual work | Budgeted: NONE, SPOT, SECTION, FULL, declared before generating. NONE by default on edits. Image-first gated by a trigger matrix |
| Verification | Pre-flight checklists the model ticks about its own work | Four gates with real scripts: responsive assertions, axe with a zero-serious bar, Lighthouse on a production build, plus a redesign regression diff. Claiming an unmeasured score is a HARD violation |
| Accessibility | Mentioned, ranked below aesthetics, largely absent from the image-generation skills | A HARD floor that outranks every style skill, with per-style fixes that preserve each look, and text-in-image banned family-wide |

## Per-skill differences

| Skill | What changed |
| --- | --- |
| Engine | Layout Casting before markup, multi-variant mode, UX writing pass, XSS guardrails, measured performance gate, real block library. Now also carries the core contract, the scope note, the asset budget, and the gate boxes in pre-flight |
| `taste-minimal` | The `rounded-full` ban and the pill-shaped-tag rule no longer contradict each other. Muted grays darkened to clear 4.5:1. Dark mode added, since the original was light-only. Component states required |
| `taste-soft` | "$150k agency" replaced by a four-level elevation scale with values. Bezels budgeted at two per page and one nesting level. Font stacks require a real fallback and a license status. Glass requires a contrast measurement and a `@supports` fallback. Nested icon buttons keep a 44px target |
| `taste-brutal` | Absorbs the separate industrial brutalism skill as `MODE: industrial`. Type floors: 16px body, 14px micro, no all-caps paragraphs. Overlays capped and contrast measured on the composite. Decorative ASCII marked `aria-hidden` |
| `taste-redesign` | Baseline capture before the first edit, a regression diff for URLs, meta, structured data, analytics hooks, and alt coverage. Legal and cookie items are reported with jurisdiction reasoning instead of installed by reflex, and compliance is never claimed |
| `taste-image-to-code` | Image-first is conditional. A written spec is extracted before implementation, states are designed explicitly, and rendering artifacts are never reproduced as design |
| `taste-imagegen-web` | Per-section generation is a tier, not a mandate. Mobile frames required. Critical text never baked in. An implementation spec ships with the images |
| `taste-imagegen-mobile` | Screen counts budgeted, depth preferred over breadth, and a token and spec handoff is mandatory so screens convert into a build |
| `taste-brandkit` | The logo is authored as SVG geometry rather than generated as a raster. Minimum size, clearspace, variants, color tokens with contrast pairs, and type license status are deliverables. A trademark risk checklist reports risk and never claims clearance |
| `taste-stitch` | Motion capped at two continuous elements with reduced-motion counterparts written inline. A required accessibility section in `DESIGN.md`. A three-revision feedback loop plus a post-pass list for what Stitch cannot express |
| `taste-output` | Completeness enforcement kept, with an allowlist so test fixtures, labeled intentional stubs, tracked TODOs, and generated files are not blocked. Silent truncation is a defect; a resume marker is required |

## How to verify the difference

1. Load two style skills at once and watch the contract force a choice instead of blending them.
2. Put an `Inter` brand token in `tailwind.config.ts` and confirm the engine keeps it and logs the override rather than fighting it.
3. Ask for a one-line copy change and confirm the asset budget stays at NONE.
4. Run `npm run verify:a11y` against the result and confirm the bar is zero serious, not "looks accessible".
5. Run a redesign with `verify:baseline` before and `verify:diff` after, then break an analytics hook on purpose and watch the diff catch it.
6. Run `npm run check`.

The important difference is not a screenshot. It is that the rules now know about each other, know when to yield, and get checked by something other than the model that wrote them.
