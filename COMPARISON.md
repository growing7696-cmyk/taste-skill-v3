# v3 vs the base skill: what actually differs

This is a rule-level comparison, not a screenshot. Every claim here can be checked against the two `SKILL.md` files directly, so nothing depends on trusting a rendered image. The base skill (`design-taste-frontend`) is public; diff it against this repo's `skills/taste-skill-v3/SKILL.md` and every row below holds.

## Sections v3 adds (the base skill has none of these)

Both skills share the same section numbering for everything inherited. These four section numbers exist ONLY in v3:

| Section | Name | What it does | Why the base skill can't match it |
| --- | --- | --- | --- |
| **1.5** | Layout Casting | Assigns a deliberate, rotated layout set per build before any markup, with a hero-paradigm rotation rule and a structural-variety floor. | The base skill controls layout only through bans (Section 4.7 repetition ban), which are checked after the fact. It has no active up-front casting step, so it converges on safe defaults. Run the base skill twice on one brief and it returns effectively the same page. |
| **1.6** | Multi-Variant Mode | One brief produces N genuinely different directions (different hero, spine, dial posture), with a comparison table and a recommendation. | The base skill is one-brief-one-page by construction. "Several deliberately different directions" is not a concept it has. |
| **6.5** | Security Guardrails (XSS) | Hard rules against the XSS vectors AI actually ships: unsanitized `dangerouslySetInnerHTML`/`innerHTML`, `javascript:` URLs in `href`, unsanitized markdown, string-built dynamic script. Enforced in Pre-Flight. | The base skill (and other design skills) never touch security. XSS is invisible in a screenshot and in a Lighthouse score, so the polish loop never catches it. |
| **9.5** | UX Writing (Anti-AI-Copy) | Corrects the four structural tells of AI copy (empty adjectives instead of facts, uniform sentence rhythm, feeling-first headlines, setup-phrase habit) as a rewrite discipline, language-agnostic. | The base skill bans a few cliche words but never corrects copy structure. A page can pass every visual check and still read as AI-written the moment the copy loads. |
| **15** | Performance Gate | A FINAL build is not done until Lighthouse is actually run on a production build and clears Performance >= 90 and A11y/BP/SEO >= 95, with real numbers reported and specific fixes when it falls short. | The base skill sets up good-performance inputs but never measures. Its own audit says it did not run Lighthouse. v3 measures and gates. |

## A section the base skill leaves empty, v3 fills

| Section | Base skill | v3 |
| --- | --- | --- |
| **12. Block Library** | Defines an 8-part block schema, then ships zero blocks ("populated iteratively"). When told to use a Sticky-Stack, the agent has no implementation and falls back to its default. | Ships four real blocks against the same schema (`editorial-manifesto` hero, `sticky-stack`, `editorial-asymmetric`, `bento-grid`), each with props, Server/Client split, mobile fallback, motion variants, dark-mode notes, anti-patterns. |

## Inherited unchanged

Sections 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14 and the appendices are inherited from the base skill. v3 does not weaken them; it adds the rows above on top. That is why v3 ties the base skill on the shared aesthetic rules and pulls ahead only where it adds new machinery.

## How to verify this yourself (the part that matters)

Do not trust the table. Reproduce it:

1. Install the base skill (`design-taste-frontend`) and run `prompts/greenfield.md`'s Mara Vieno brief twice. The two pages come out structurally the same: same Asymmetric Split hero, same spine, new text.
2. Install this repo's v3 and run the same brief twice. The two pages come out structurally different (different hero paradigm each time), because of Section 1.5's seed and hero rotation.
3. Build each to production and run Lighthouse in an incognito window. v3's Section 15 gate targets Performance >= 90; in the reference build it measured 91 against the base skill's 84 (green tier vs yellow tier) on the same brief.

Steps 1 and 2 need no screenshots and no trust: the divergence is the evidence, and anyone can produce it in about five minutes.
