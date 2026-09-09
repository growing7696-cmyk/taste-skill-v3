# v3 vs the base skill

This is a rule-level comparison. It is based on the files currently shipped in this repository, especially the included v3 skill packages and their `SKILL.md`, `reference/`, and `blocks/` files.

## Current Package Shape

This repo includes three skill packages:

```text
skills/taste-skill-v3/   primary v3 skill package
skills/GPT-taste/        GPT/OpenAI-oriented package of the v3 skill
skills/taste-brutal/     neo-brutalist companion skill package
```

The comparison below focuses on the v3 frontend taste skill. `skills/GPT-taste` packages the same v3 direction for GPT/OpenAI use, while `skills/taste-brutal` is a separate included skill that reuses the engine with a neo-brutalist aesthetic.

## What v3 Adds

| Area | Base skill | v3 in this repo |
| --- | --- | --- |
| Layout variety | Repetition is mostly controlled by bans and review after the page exists. | Layout is cast before markup. The agent states a hero paradigm, layout seed, and section-by-section layout families before building. |
| Same brief twice | Can converge on the same safe structure. | Uses hero rotation and a layout seed to make repeat runs diverge while staying faithful to the brief. |
| Multiple directions | One brief usually produces one page. | Multi-Variant Mode creates separate design directions and compares them when the user asks for variants. |
| UX writing | Mostly focused on visual polish and a few wording tells. | Adds a copy-quality pass: concrete facts over empty adjectives, native-language rhythm, checkable headlines, and fewer setup phrases. |
| Security | Not a design-skill concern. | Adds XSS guardrails for user HTML, markdown, URLs, scripts, and unsafe React escape hatches. |
| Performance | Encourages good performance practices. | Requires final builds to measure production performance when possible, with Lighthouse targets. |
| Block library | Defines the concept of reusable blocks. | Ships four actual block files that match the contract. |

## Included Skill Files

Primary v3 package:

- `skills/taste-skill-v3/SKILL.md`
- `skills/taste-skill-v3/reference/appendix-canonical-sources.md`
- `skills/taste-skill-v3/reference/appendix-install-commands.md`
- `skills/taste-skill-v3/reference/appendix-liquid-glass.md`
- `skills/taste-skill-v3/reference/block-library-contract.md`
- `skills/taste-skill-v3/reference/pattern-vocabulary.md`
- `skills/taste-skill-v3/reference/redesign-protocol.md`
- `skills/taste-skill-v3/reference/scroll-skeletons.md`
- `skills/taste-skill-v3/blocks/hero/editorial-manifesto.md`
- `skills/taste-skill-v3/blocks/feature/sticky-stack.md`
- `skills/taste-skill-v3/blocks/feature/editorial-asymmetric.md`
- `skills/taste-skill-v3/blocks/feature/bento-grid.md`

Root support files:

- `CLAUDE.md`
- `CODEX.md`
- `prompts/greenfield.md`
- `prompts/redesign.md`
- `prompts/variants-and-perf.md`
- `scripts/check.mjs`

GPT/OpenAI-oriented package:

- `skills/GPT-taste/SKILL.md`
- `skills/GPT-taste/agents/openai.yaml`
- `skills/GPT-taste/reference/`
- `skills/GPT-taste/blocks/`

Neo-brutalist companion package:

- `skills/taste-brutal/README.md`
- `skills/taste-brutal/CLAUDE.md`
- `skills/taste-brutal/.claude-plugin/plugin.json`
- `skills/taste-brutal/skills/taste-brutal/SKILL.md`
- `skills/taste-brutal/skills/taste-brutal/reference/`
- `skills/taste-brutal/skills/taste-brutal/blocks/`

## How To Verify

1. Compare the base skill's `SKILL.md` against `skills/taste-skill-v3/SKILL.md`.
2. Check that v3 asks for a design read, dial posture, and layout cast before markup.
3. Ask for three variants from one brief and confirm that v3 produces distinct directions instead of palette swaps.
4. Inspect the four block files under `skills/taste-skill-v3/blocks/`.
5. Run `npm run check` to validate the included repository structure.

The important difference is not a screenshot. It is the workflow: v3 makes structure explicit before implementation.
