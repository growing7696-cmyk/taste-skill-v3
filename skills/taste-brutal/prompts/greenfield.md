# Greenfield prompt (new build)

Paste this into a Claude Code / Cursor / Codex session after the v3 skill is loaded. Fill the brief, then run it. The prompt forces the v3 Layout Cast step so structure does not collapse to the same defaults.

## Blank prompt (fill the brief)

```
I have loaded taste-skill v3 (design-taste-frontend-v3) as my only source of design rules.

Brief:
- Page kind: <landing / portfolio / marketing>
- Product: <name and one-line description>
- Audience: <who reads this, concrete adjectives>
- Vibe words: <2 to 4 concrete adjectives, e.g. "editorial, restrained, monochrome">
- References: <real URLs or product names that anchor the aesthetic>
- Avoid: <explicit slop patterns this build should NOT default to>

Step 1. Design read: state it in one sentence, then the three dial values with one-line reasoning each. Stop.

Step 2 (after my OK). LAYOUT CAST (Section 1.5). Post, in writing, before any code:
- Layout seed: <derive from the product name>
- Hero paradigm: <one of the 6 in 1.5.B, and NOT the one you used last build>
- Section cast table: every section with its layout family. No family used twice. At least 5 distinct families for an 8-section page. At least 2 families from the structural-variety tier (1.5.C). At most 2 image+text splits.
Stop.

Step 3 (after my OK). Ship a single Next.js page built exactly to the cast. Use real images (gen tool first, then Picsum-seed). Lock one theme for the whole page.

Step 4. Run in writing:
- Layout Cast audit (list each section's family, confirm no duplicates, confirm the structural-variety floor)
- Hero paradigm audit (which paradigm, why it differs from a default split)
- Em-dash audit (zero U+2014 and U+2013 anywhere)
- Pre-Flight Check (Section 14, every box Pass or Fail with one-line justification)

Any Fail blocks completion.
```

## Filled example (portfolio)

```
I have loaded taste-skill v3 (design-taste-frontend-v3) as my only source of design rules.

Brief:
- Page kind: portfolio
- Product: Mara Vieno, independent motion designer, 6 years, works with music labels and indie games
- Audience: creative directors and studio hiring leads who scan fast and judge on craft, want to see range without reading much
- Vibe words: kinetic, confident, dark, precise
- References: the feel of Aristide Benoist and Cuberto case-study pages, not their exact layout
- Avoid: centered hero over a gradient, three equal project cards in a row, an eyebrow above every section, agency locale/time strips

Step 1. Design read: state it in one sentence, then the three dial values with one-line reasoning each. Stop.

Step 2 (after my OK). LAYOUT CAST (Section 1.5). Post, in writing, before any code:
- Layout seed: derive from "Mara Vieno"
- Hero paradigm: one of the 6 in 1.5.B, and NOT a default Asymmetric Split unless you justify it
- Section cast table: every section with its layout family. No family used twice. At least 5 distinct families. At least 2 from the structural-variety tier. At most 2 image+text splits.
Stop.

Step 3 (after my OK). Ship a single Next.js page built exactly to the cast. Real project thumbnails (gen tool first, then Picsum-seed). One dark theme, locked.

Step 4. Run in writing: Layout Cast audit, Hero paradigm audit, Em-dash audit, Pre-Flight Check (Section 14). Any Fail blocks completion.
```

## Why the two-stop structure

The cast is posted and approved BEFORE any markup exists. That is the whole point of v3: if the agent free-forms the sections and only checks for repetition afterward, it has already reached for its safe defaults. Reviewing the cast at Step 2 is your cheapest chance to push for variety. If the cast looks safe (split hero, bento, zigzag, logo wall, CTA), say so and ask for a reroll of the seed or a different hero paradigm before it writes a single line.
