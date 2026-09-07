# Taste Skill v3

An anti-slop frontend skill for AI coding agents (Claude Code, Cursor, Codex). It gives the agent design taste so it stops shipping generic, templated-looking landing pages, portfolios, and redesigns.

v3 is a **fork of the v2 skill** by [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill). It keeps the entire v2 rule set and adds one focused change: an active **Layout Casting** pass that fixes the "every page looks the same" problem.

> Not affiliated with or endorsed by the original taste-skill author. This is an independent fork. All v2 content is credited to the original project (MIT).

## What v3 changes

The original skill controls layout almost entirely through *bans*: no centered hero, no three equal cards, no third zigzag, one layout family per section. Bans stop the worst repeats, but they do not create variety. An agent that only avoids the banned set converges on the small pool of safe, un-banned structures, so every page still rhymes: split hero, bento, zigzag, logo wall, CTA.

v3 adds **Section 1.5 Layout Casting**, which makes layout an explicit, up-front decision that is rotated across builds, the same way v2 already rotates color palettes:

1. **Cast the section list before writing any markup.** Each section commits to a layout family. No family is used twice, an 8-section page uses at least 5 distinct families, and at least 2 must come from a "structural variety" tier (full-bleed, horizontal-pan, sticky-stack, editorial-asymmetric, marquee-band, split-screen-scroll).
2. **Cast the hero paradigm explicitly and rotate it.** v2 lists six hero paradigms but never forces a choice, so the agent defaults to Asymmetric Split almost every time. v3 requires picking one and using a *different* one from the previous build.
3. **Layout seed** derives a deterministic-but-varied cast from the brief, so the same brief does not always produce the same structure.

Three new boxes in the Pre-Flight Check (Section 14) enforce all of the above, so casting is not skippable.

Everything else (the three dials, the design-system map, the AI-tell bans, the em-dash ban, the redesign protocol, the full pre-flight matrix) is inherited from v2 unchanged.

## Two things the base skill structurally cannot do

Everything above competes with the base skill on its own turf (layout variety, AI-tell removal) and wins narrowly, because the base skill is already good there. These two features change the axis: they do things the base skill has no concept of.

**Multi-Variant Mode (Section 1.6).** Ask for variants and one brief yields three genuinely different directions, each with a different hero, structural spine, and dial posture, built fast at draft fidelity, ending in a comparison table and a recommendation. The base skill is one-brief-one-page by construction, so this is not a feature it does worse, it is a feature it does not have. Matches how real design work actually happens: bring three directions, choose together.

**Performance Gate (Section 15).** A page is not FINAL until Lighthouse is actually run on a production build and clears Performance >= 90 (green tier) with Accessibility, Best Practices and SEO >= 95, real numbers reported, specific fixes applied when it falls short. The base skill sets up good-performance inputs but never measures, and says so in its own audit. v3 measures and guarantees. A DRAFT/FINAL fidelity switch keeps exploration cheap and reserves the expensive gate for the chosen direction.

**UX Writing / Anti-AI-Copy (Section 9.5).** A page can have flawless layout and still read as AI-written the second the copy loads: empty adjectives, uniform sentence rhythm, "elevate / seamless / 특별한 / 혁신적인" filler, headlines that describe a feeling instead of stating a fact. The base skill bans a few cliche words; v3 corrects the *structure* of the copy (trade adjectives for facts, vary sentence length, headlines must state something checkable), in any language natively (English and Korean shown as examples), not translated. This is the verbal half of anti-slop, which most design skills ignore entirely.

**Security Guardrails (Section 6.5).** A page can look perfect and still ship a cross-site-scripting hole, because XSS is invisible in a screenshot and in a Lighthouse score. AI-written React/Next leaks it often: an unsanitized `dangerouslySetInnerHTML`, a `javascript:` URL in an `href`, an unsanitized markdown preview. v3 makes the safe path the required one and enforces it in the Pre-Flight Check. Neither the base skill nor other design skills touch this; a design skill that also refuses to ship an exploitable page is a real differentiator.

## Real blocks (v2's empty contract, now filled)

v2 defines a Block Library contract in Section 12 (an eight-part schema for each reusable block) but ships zero blocks: the section is a promise to populate "iteratively." So when the agent is told to use a Sticky-Stack, it has no implementation to reach for and falls back to its default. v3 ships real blocks against that same schema, focused on the layout-variety families the cast reaches for most:

- `blocks/hero/editorial-manifesto.md` - the first-choice alternative to the over-used Asymmetric Split hero.
- `blocks/feature/sticky-stack.md` - structural-variety tier, motion-gated.
- `blocks/feature/editorial-asymmetric.md` - structural-variety tier, needs no motion, so a low-motion page can still hit the variety floor.
- `blocks/feature/bento-grid.md` - the safe-tier workhorse, with the exact-cell-count and varied-surface rules baked in.

Each block is self-contained (props API, Server/Client split, mobile fallback, one motion variant per dial band, dark-mode notes, anti-patterns) and passes the Pre-Flight Check. The set is deliberately small and grows against the schema; it is the part of v3 a drop-in CLAUDE.md cannot replicate, because a CLAUDE.md can only reference rules, not carry implementations.

## Is it actually better than the base skill?

Rule-level comparison (verifiable against the two SKILL.md files, no screenshots required): [COMPARISON.md](./COMPARISON.md). Short version: v3 adds four sections the base skill has no equivalent of (Layout Casting 1.5, Multi-Variant 1.6, Security 6.5, Performance Gate 15), fills the block library the base skill left empty (Section 12), and ties it everywhere else. The strongest evidence is reproducible in five minutes: run the same brief twice on each skill and watch the base skill repeat itself while v3 diverges.

## Compatible coding agents

`SKILL.md` is plain markdown rules, so it works across agents, not just Claude Code. The Layout Casting, block library, multi-variant, security, and performance-gate rules are all agent-neutral. Point your agent at `skills/taste-skill-v3/SKILL.md` (or paste it) and prefix your build request with a line like "use this as your only source of design rules."

| Agent | How to load it |
| --- | --- |
| **Claude Code** | `npx skills add` (below), or drop `CLAUDE.md` into your project root for auto-load |
| **Codex / OpenCode** | Paste `SKILL.md` into the session, or add it to your project's instructions file |
| **Cursor** | Add `SKILL.md`'s contents to `.cursorrules` (or reference the file in a rule) |
| **Gemini CLI / AI Studio** | Paste `SKILL.md` as system/context before the build request |
| **v0 / Lovable** | Paste the relevant sections (Layout Cast + AI-tell bans) into the prompt |

Claude Code gets the richest integration (auto-loaded rules, on-demand block/reference files, the `CLAUDE.md` drop-in). Other agents get the same rules with a manual paste or a rules-file entry.

## Installing

The `npx skills add` CLI scans the `skills/` folder in this repo.

```
npx skills add https://github.com/growing7696-cmyk/taste-skill-v3
```

Install just this skill by its install name (the `name:` field in the SKILL frontmatter):

```
npx skills add https://github.com/growing7696-cmyk/taste-skill-v3 --skill "design-taste-frontend-v3"
```

You can also copy `skills/taste-skill-v3/SKILL.md` into your project, or paste it into a Claude Code / Cursor / Codex session directly.

### Zero-setup option: drop in CLAUDE.md

If you use Claude Code, copy [`CLAUDE.md`](./CLAUDE.md) into your project root. Claude Code reads it every session automatically, so you get the v3 rules without running any install command. It is written as a short leash on top of the skill: it front-loads the mistakes taste-skill's own rules say the agent makes most often (em-dash tells, default Asymmetric Split hero, eyebrow-on-every-section, the beige-brass premium palette) and guarantees the Layout Cast step is never skipped.

## Demo prompts

Ready-to-paste prompts live in [`prompts/`](./prompts):

- [`prompts/greenfield.md`](./prompts/greenfield.md) - new build. Includes a blank template and a filled portfolio example. Forces the Layout Cast step so structure does not collapse to defaults.
- [`prompts/redesign.md`](./prompts/redesign.md) - existing site. Audit first, cast against the existing structure, preserve URLs and brand.

## Already using the original taste-skill? Boost it without switching

If you do not want to switch skills, there is a drop-in [`CLAUDE.md`](./for-original-taste-skill) that boosts the **original** taste-skill (`design-taste-frontend`) in place. It front-loads the skill's own most-violated rules as hard gates and makes the agent post a hero-paradigm + section plan before writing markup, turning the skill's passive variety rules into an active up-front declaration. It references only sections that exist in the original skill, so it works on top of v2 as-is. See [`for-original-taste-skill/`](./for-original-taste-skill).

## Using it

Load the skill once at the top of a session (or drop in `CLAUDE.md`), then paste a brief. On a fresh build the agent will:

1. State a one-line design read.
2. Post a **section cast** (the v3 addition): the section list with a layout family per section, plus the hero paradigm and layout seed.
3. Stop for your OK.
4. Build to the cast, then run the Pre-Flight Check in writing.

Read the cast before you approve it. If the structure looks safe, that is the moment to push: "use a different hero paradigm", "give me two structural-variety sections", "reroll the seed".

## Credit

Forked from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (v2, MIT). The Layout Casting section and the associated Pre-Flight boxes are the only additions in v3.

## License

MIT. See [LICENSE](./LICENSE).
