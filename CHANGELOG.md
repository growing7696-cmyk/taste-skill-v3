# Changelog

## v4.0.0

The release that turns a set of separate opinionated skills into one governed family.

### Added

- `skills/_core`, the shared governance contract every other skill inherits: a precedence ladder, three rule tiers, a HARD accessibility floor, an asset budget, verification gates, a scope router, and honesty rules. Reference files under `skills/_core/reference/`.
- `scripts/verify/`, the runnable gates: responsive screenshots with overflow and hero assertions, an axe run with a zero-serious bar, a Lighthouse gate for final builds, plus a redesign baseline capture and regression diff. Missing tools exit with code 3 and report DEFERRED rather than a false pass.
- `skills/taste-minimal`, remake of the minimalist skill. Radius contradiction resolved, muted grays and pastels darkened to clear 4.5:1, dark mode added, component states required.
- `skills/taste-soft`, remake of the high-end visual design skill. A four-level elevation scale with values replaces subjective agency language, bezels are budgeted at two per page and one nesting level, font stacks require real fallbacks and a license status, glass requires a measured contrast and a `@supports` fallback.
- `skills/taste-redesign`, remake of the redesign skill. Baseline before the first edit, regression diff after, jurisdiction-aware compliance reporting instead of blanket legal instructions.
- `skills/taste-image-to-code`, with a trigger matrix so image-first is conditional, and a written spec extracted before implementation.
- `skills/taste-output`, with an allowlist so fixtures, labeled stubs, and tracked TODOs are not blocked by the completeness rules.
- `skills/taste-imagegen-web` and `skills/taste-imagegen-mobile`, budgeted, with mobile frames and a mandatory implementation or token spec.
- `skills/taste-brandkit`, vector-first, with clearspace, minimum size, contrast-paired color tokens, type license status, and a trademark risk checklist that never claims clearance.
- `skills/taste-stitch`, with capped motion, a required accessibility section in the generated `DESIGN.md`, a three-revision feedback loop, and a post-pass list.
- `skills/taste-brutal/skills/taste-brutal/reference/modes.md`, absorbing the separate industrial brutalism skill as `MODE: industrial`, with the accessibility carve-outs both modes obey.

### Changed

- Every existing package now carries the core contract block: rule tiers, scope note, asset budget, verification gates, and the output header.
- Section 4.8 image strategy is budget-gated rather than mandatory, and baking critical text into images is HARD-banned.
- The final pre-flight gains boxes for the contract header, rule tiers, the accessibility floor, and the three runnable gates.
- Section 13 states that product design systems are named only to route work away from this skill.
- `scripts/check.mjs` validates skill frontmatter, core-contract inheritance, core reference files, and the verification harness wiring.
- `package.json` and `.claude-plugin/plugin.json` moved to 4.0.0 and list the full family.
- `README.md` and `COMPARISON.md` rewritten around the family architecture, including a migration table from the original skill set.

### Notes

- `taste-skill-v1` is retired rather than ported. Its rules are strictly weaker than the engine with low dials.
- The simulated random-number "design plan" from the GPT skill is gone. Structural variety comes from the stated layout seed, which is honest about being a tie-breaker.


## v3.1.0

### Added

- Added `CODEX.md`, a Codex project instruction file matching the role of `CLAUDE.md`.
- Added `.gitignore` to keep `.DS_Store` out of the repo.
- Added README guidance for Claude Code and Codex project-instruction workflows.
- Added repository checks for required root files, included skill packages, and `CODEX.md`.

### Changed

- Updated `README.md` to describe the included package layout.
- Updated `COMPARISON.md` to compare against the active v3 files while preserving the included `GPT-taste` and `taste-brutal` packages.
- Updated `.claude-plugin/plugin.json` to match the package version.
- Updated `scripts/check.mjs` so it validates the current package shape.

### Removed

- Removed `for-original-taste-skill`, which is not part of the current included skill package set.
- Removed macOS `.DS_Store` files from the package tree.

## v3.0.0

Initial v3 release of `design-taste-frontend-v3`.

### Added

- Layout Casting: an up-front section and hero planning pass before markup.
- Multi-Variant Mode: multiple distinct directions for one brief when requested.
- UX Writing: anti-AI-copy rules for visible page text.
- Security Guardrails: XSS-focused frontend safety rules.
- Performance Gate: final-build measurement targets when Lighthouse can run.
- Block Library files:
  - `hero/editorial-manifesto`
  - `feature/sticky-stack`
  - `feature/editorial-asymmetric`
  - `feature/bento-grid`
- Demo prompts under `prompts/`.
- `CLAUDE.md` for Claude Code project instructions.
