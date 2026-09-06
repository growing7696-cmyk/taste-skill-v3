# Changelog

## v3.0.0

Fork of the upstream v2 skill (`design-taste-frontend`). Install name is `design-taste-frontend-v3`.

### Added

- **Section 1.5 Layout Casting** - a new pass that runs after the design read and dials, before any markup. It turns layout from a set of bans into an explicit, up-front assignment:
  - **1.5.A Section cast** - write the section list first, assign each section a layout family, no family used twice, at least 5 distinct families across an 8-section page, at least 2 from a structural-variety tier.
  - **1.5.B Hero paradigm cast** - pick one of the six hero paradigms explicitly, with a rotation rule that forbids repeating the previous build's paradigm and demotes Asymmetric Split from default to justify-it-first.
  - **1.5.C Layout family pool** - a named pool split into a safe tier and a structural-variety tier, with motion-gated families guarded by `MOTION_INTENSITY`.
  - **1.5.D Layout seed** - a deterministic tie-breaker so the same brief can produce different structures.
  - **1.5.E Redesign interaction** - how casting behaves in Preserve vs Overhaul mode.
- **Section 4.3** - a "CAST FIRST" line linking layout diversification back to Section 1.5.
- **Section 14 Pre-Flight** - three new mandatory boxes enforcing the cast, the hero-paradigm rotation, and the structural-variety floor.
- **`CLAUDE.md`** - a drop-in project file for Claude Code that auto-loads every session. Front-loads taste-skill's own most-violated rules as hard gates and guarantees the Layout Cast step runs.
- **`prompts/`** - ready-to-paste demo prompts. `greenfield.md` (blank template plus a filled portfolio example) and `redesign.md` (audit-first, cast-against-existing).
- **Multi-Variant Mode (Section 1.6)** - one brief produces N genuinely different design directions (different hero, spine, and dial posture), built at draft fidelity, with a comparison table and a recommendation. The base skill is one-brief-one-page by construction; this is the thing it cannot do. Runs only when asked (`MODE: variants`).
- **Security Guardrails / XSS (Section 6.5)** - hard rules against the XSS vectors AI actually introduces in frontend code: unsanitized `dangerouslySetInnerHTML`/`innerHTML`, unvalidated URL schemes in `href`/`src` (`javascript:`), unsanitized markdown/rich-text, string-built dynamic script. Enforced by a new Pre-Flight box. Covers the one bug class that is invisible to both the screenshot and the Lighthouse score.
- **Performance Gate (Section 15)** - a page is not FINAL until Lighthouse is actually run on a production build and clears Performance >= 90 and A11y/BP/SEO >= 95, with real numbers reported and specific fixes applied when it falls short. Closes the base skill's gap of asserting performance without measuring it. Paired with a DRAFT/FINAL fidelity switch for cost control, and enforced by two new Pre-Flight boxes.
- **Real Block Library blocks** - v2's Section 12 defines the block schema but ships nothing. v3 ships four real blocks against that schema: `hero/editorial-manifesto`, `feature/sticky-stack`, `feature/editorial-asymmetric`, `feature/bento-grid`. Each follows the full eight-part body contract and is indexed in a new Section 12.0 that the Layout Cast points to. Casting a structural-variety family or a non-default hero now resolves to a real implementation instead of the agent's fallback.

### Rationale

v2 prevents the worst layout repeats but does not actively create variety, so output converges on a small pool of safe structures (split hero, bento, zigzag, logo wall, CTA). Color already had an anti-repetition rotation rule in v2 (Section 4.2); v3 gives structure the same treatment.

### Unchanged

Everything else is inherited from v2 verbatim: the three dials, the brief-to-design-system map, architecture conventions, the design-engineering directives, the AI-tell bans, the em-dash ban, performance and accessibility guardrails, the redesign protocol, the block-library contract, and the rest of the Pre-Flight matrix.
