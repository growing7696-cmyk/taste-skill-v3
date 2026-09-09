# Taste Skill v3

An anti-slop frontend skill for AI coding agents. It helps agents build landing pages, portfolios, marketing pages, editorial brand pages, and redesigns that feel intentionally designed instead of templated.

v3 is an independent fork inspired by [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill). It keeps the taste-skill goal, then adds one core mechanism: **Layout Casting**, an up-front structure pass that stops repeated default layouts before code is written.

> Not affiliated with or endorsed by the original taste-skill author. Original project credit remains with Leonxlnx/taste-skill under the MIT license.

## What Is In This Repo

This repository includes three skill packages:

```text
skills/taste-skill-v3/   primary v3 skill package
skills/GPT-taste/        GPT/OpenAI-oriented package of the v3 skill
skills/taste-brutal/     neo-brutalist companion skill package
```

Supporting files:

- `CLAUDE.md` - project instruction file for Claude Code.
- `CODEX.md` - project instruction file for Codex.
- `prompts/` - ready-to-paste demo prompts for greenfield builds, redesigns, and variants.
- `scripts/check.mjs` - repository validation for markdown rules, skill references, and block files.
- `COMPARISON.md` - rule-level comparison against the base skill.
- `CHANGELOG.md` - changes by version.

The root plugin manifest points at `skills/taste-skill-v3`. The other two folders are included skill packages and are intentionally kept in the repo.

## What v3 Adds

### Layout Casting

The base skill mostly prevents repetition with after-the-fact bans. v3 turns structure into a deliberate planning step:

1. State the design read.
2. Set `DESIGN_VARIANCE`, `MOTION_INTENSITY`, and `VISUAL_DENSITY`.
3. Cast the page sections before markup, including hero paradigm, layout families, and a layout seed.
4. Build to that cast.
5. Run pre-flight before calling the work done.

The cast requires distinct layout families, limits repeated split sections, and draws from structural-variety families such as `full-bleed`, `sticky-stack`, `editorial-asymmetric`, `marquee-band`, and `split-screen-scroll`.

### Multi-Variant Mode

When the user asks for options or variants, v3 can produce multiple design directions from one brief. Each variant needs a different structural spine, hero paradigm, dial posture, or visual language, followed by a comparison table and recommendation.

### UX Writing

The skill treats AI-looking copy as part of design quality. It asks the agent to replace empty adjectives with facts, vary sentence rhythm, write in the brief's language natively, and make headlines state something checkable.

### Security Guardrails

The skill includes frontend XSS guardrails for the common mistakes AI agents make: unsafe `dangerouslySetInnerHTML`, direct `innerHTML`, unvalidated URLs, unsanitized markdown, string-built scripts, and similar vectors.

### Performance Gate

Final web builds should run a production build and Lighthouse when the environment allows it. The target is Performance >= 90 and Accessibility, Best Practices, and SEO >= 95.

### Block Library

v3 includes real reusable block files:

- `skills/taste-skill-v3/blocks/hero/editorial-manifesto.md`
- `skills/taste-skill-v3/blocks/feature/sticky-stack.md`
- `skills/taste-skill-v3/blocks/feature/editorial-asymmetric.md`
- `skills/taste-skill-v3/blocks/feature/bento-grid.md`

Each block follows the block-library contract and gives the agent a concrete implementation pattern instead of only a rule.

## Compatible Agents

`SKILL.md` is plain markdown, so it can be used by multiple coding agents.

| Agent | How to load it |
| --- | --- |
| Claude Code | Install the skill, or copy `CLAUDE.md` into your project root for project instructions. |
| Codex | Install the skill when available, or copy `CODEX.md` into your project root for project instructions. |
| Cursor | Add `SKILL.md` contents to a project rule, or reference the file from a rule. |
| Other agents | Paste `SKILL.md` into the session before the build request. |

The full skill lives in `skills/taste-skill-v3/SKILL.md`. The agent instruction files are short project leashes that keep the highest-risk rules visible in every session.

## Installing

The install name is the `name:` field in the skill frontmatter:

```bash
npx skills add https://github.com/<your-username>/taste-skill-v3 --skill "design-taste-frontend-v3"
```

You can also copy the package folder you need into your skill directory, or paste its `SKILL.md` into a session manually.

Included package paths:

- `skills/taste-skill-v3` - primary `design-taste-frontend-v3` package.
- `skills/GPT-taste` - GPT/OpenAI-oriented `design-taste-frontend-v3` package with `agents/openai.yaml`.
- `skills/taste-brutal` - separate `design-taste-brutalist` package.

## Zero-Setup Project Instructions

For Claude Code:

```bash
cp CLAUDE.md /path/to/your-project/CLAUDE.md
```

For Codex:

```bash
cp CODEX.md /path/to/your-project/CODEX.md
```

Both files front-load the same v3 habits: state the design read, set the dials, cast the layout before markup, avoid common AI visual tells, and run pre-flight honestly.

## Demo Prompts

Ready-to-paste prompts live in `prompts/`:

- `prompts/greenfield.md` - blank template plus a filled portfolio example.
- `prompts/redesign.md` - audit-first redesign prompt.
- `prompts/variants-and-perf.md` - multi-variant and final performance-gate workflow.

## Repository Checks

Run:

```bash
npm run check
```

The check validates markdown dash rules, section references, block contract shape, block index paths, and required project files for the included package layout.

## License

MIT. See `LICENSE`.
