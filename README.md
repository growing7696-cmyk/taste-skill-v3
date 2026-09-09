# Taste Skill v3

An anti-slop frontend skill family for AI coding agents. It helps agents build landing pages, portfolios, marketing pages, editorial brand pages, and redesigns that feel intentionally designed instead of templated, without shipping inaccessible, unverified, or over-expensive work in the process.

v3 is an independent fork inspired by [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill). It keeps the taste-skill goal and adds two things the original did not have: **Layout Casting**, an up-front structure pass, and **a governance contract** that makes a pile of opinionated skills behave like one system.

> Not affiliated with or endorsed by the original taste-skill author. Original project credit remains with Leonxlnx/taste-skill under the MIT license.

## The problem this release solves

A collection of strong-opinioned design skills that do not know about each other fails in five predictable ways. Version 4.0.0 of this repo addresses each one structurally rather than by editing prose.

| Failure | Fix |
| --- | --- |
| Skills contradict each other (flat versus bezelled, marketing scope versus product UI) | `skills/_core`: a precedence ladder, typed skill layers, one style skill at a time |
| Blanket bans misfire on branded projects (no Inter, no gradients, no `rounded-full`) | Three rule tiers: HARD, DEFAULT, PREFERENCE, plus a Brand Override Protocol with a logged override line |
| Image generation mandated per section, at real cost | An asset budget: NONE, SPOT, SECTION, FULL, declared before generating, NONE by default on edits |
| Verification is a checklist the model ticks about itself | Four gates with runnable scripts in `scripts/verify/`, and a HARD rule against claiming an unmeasured score |
| Accessibility ranked below taste | A HARD accessibility floor that outranks every style skill, with per-style fixes that preserve the look |

## Skill map

Skills are typed, and the type decides how many can be active at once.

```text
Engine      skills/taste-skill-v3          design read, dials, layout cast, pre-flight   exactly 1
Contract    skills/_core                   inherited by everything else                  always
Style       skills/taste-minimal           flat editorial surface                        at most 1
            skills/taste-soft              layered tactile surface
            skills/taste-brutal            neo and industrial brutalism, two modes
Workflow    skills/taste-redesign          audit, change, prove nothing broke            any number
            skills/taste-image-to-code     reference-first, gated by a trigger matrix
            skills/taste-output            completeness without over-blocking stubs
Asset       skills/taste-imagegen-web      budgeted web comps with an implementation spec
            skills/taste-imagegen-mobile   budgeted screen sets with a token handoff
            skills/taste-brandkit          vector-first identity kits
Export      skills/taste-stitch            DESIGN.md for Google Stitch, plus the feedback loop
            skills/GPT-taste               GPT and Codex packaging of the engine
```

Every build posts a header before any markup:

```text
SKILLS:    engine=design-taste-frontend-v3 style=taste-minimal workflow=none
SCOPE:     in scope (developer tool landing page)
FIDELITY:  DRAFT
ASSETS:    SPOT, 3 images
OVERRIDES: Inter is an engine DEFAULT ban -> keeping Inter (source: L4, tailwind.config.ts)
```

## The core contract

`skills/_core/SKILL.md` is short and is read first. Its reference files carry the detail:

- `reference/precedence.md` - the ladder, with worked conflicts.
- `reference/rule-tiers.md` - every re-tiered ban, with its override condition.
- `reference/accessibility-floor.md` - the HARD floor, item by item, each marked auto or manual.
- `reference/verification.md` - the four gates, their bars, and honest reporting.
- `reference/asset-budget.md` - the four budget tiers and the decision matrix.
- `reference/scope-router.md` - what these skills are not for, and where to route it.

## Verification

```bash
npm run check                                          # repo structure, dash rules, inheritance
npm run verify:screens     -- --url http://localhost:3000
npm run verify:a11y        -- --url http://localhost:3000
npm run verify:lighthouse  -- --url http://localhost:3000   # FINAL builds, production server only
```

Redesign regression:

```bash
npm run verify:baseline -- --url https://live-site.example --out .verify/baseline
npm run verify:baseline -- --url http://localhost:3000      --out .verify/after
npm run verify:diff     -- --before .verify/baseline --after .verify/after
```

The tools are optional dependencies. A missing tool exits with code 3 and prints DEFERRED. It never prints a pass it did not earn.

```bash
npm i -D playwright axe-core lighthouse chrome-launcher
npx playwright install chromium
```

## What the engine adds

**Layout Casting.** Structure is cast before markup: hero paradigm, a layout family per section, a layout seed, with a distinct-family floor and a structural-variety floor. Bans stop the worst repeats; casting creates variety.

**Multi-variant mode.** On request, one brief becomes several genuinely different directions, compared in a table, with only the chosen one paying for the full gates.

**UX writing.** Copy quality treated as design quality: concrete facts over empty adjectives, native-language rhythm, checkable headlines.

**Security guardrails.** Frontend XSS vectors that AI code introduces most often.

**Block library.** Real block files that match the block contract, not just the concept of one.

## Migration from the original skill set

| Original | Here |
| --- | --- |
| `taste-skill` / `design-taste-frontend` | `skills/taste-skill-v3` (engine) |
| `taste-skill-v1` | retired. The v1 rules are strictly weaker; use the engine with the dials set low for a restrained build |
| `gpt-tasteskill` | `skills/GPT-taste`. The simulated random-number "design plan" is gone; variety comes from the stated layout seed, and GSAP and AIDA are PREFERENCE, not requirements |
| `minimalist-skill` | `skills/taste-minimal`, with the pill-versus-`rounded-full` contradiction resolved and dark mode added |
| `soft-skill` | `skills/taste-soft`, with a measurable elevation scale replacing "$150k agency", and a bezel budget |
| `brutalist-skill` | merged into `skills/taste-brutal` as `MODE: industrial` |
| `redesign-skill` | `skills/taste-redesign`, with a captured baseline, a regression diff, and jurisdiction-aware compliance reporting |
| `image-to-code-skill` | `skills/taste-image-to-code`, image-first gated by a trigger matrix |
| `imagegen-frontend-web` | `skills/taste-imagegen-web`, budgeted, with mobile frames and a required implementation spec |
| `imagegen-frontend-mobile` | `skills/taste-imagegen-mobile`, budgeted, with a token and spec handoff |
| `brandkit` | `skills/taste-brandkit`, vector-first, with a trademark risk checklist that never claims clearance |
| `stitch-skill` | `skills/taste-stitch`, with a verification loop and a post-pass list |
| `output-skill` | `skills/taste-output`, with an allowlist so fixtures and intentional stubs are not blocked |

## Compatible agents

`SKILL.md` is plain markdown, so several agents can use it.

| Agent | How to load it |
| --- | --- |
| Claude Code | Install the plugin, or copy `CLAUDE.md` into your project root |
| Codex | Install the skill, or copy `CODEX.md` into your project root |
| Cursor | Reference `skills/_core/SKILL.md` and the engine `SKILL.md` from a project rule |
| Other agents | Paste `skills/_core/SKILL.md` then the engine `SKILL.md` before the build request |

## Installing

```bash
npx skills add https://github.com/<your-username>/taste-skill-v3 --skill "design-taste-frontend-v3"
```

Install `taste-core` alongside it. The engine assumes the contract is present; without it, every rule falls back to PREFERENCE.

## Demo prompts

`prompts/greenfield.md`, `prompts/redesign.md`, and `prompts/variants-and-perf.md`.

## License

MIT. See `LICENSE`.
