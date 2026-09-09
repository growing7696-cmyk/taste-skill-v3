# Changelog

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
