# Rule Tiers: The Full Table

Three tiers, from `SKILL.md` Section 3.

- **HARD**: never overridable.
- **DEFAULT**: correct unless L3 (user) or L4 (project reality) says otherwise, with a logged override.
- **PREFERENCE**: a nudge, overridable by any stated reason.

An unlabeled rule anywhere in this family reads as DEFAULT.

---

## 1. HARD rules (the whole list)

If it is not on this list, it is not HARD.

| Rule | Why it is HARD |
| --- | --- |
| The accessibility floor in `accessibility-floor.md` | The page has to be usable. Taste does not outrank use. |
| No XSS vector: unsanitized HTML injection, string-built script, unvalidated URL schemes | Invisible in a screenshot, invisible in Lighthouse, catastrophic in production |
| No unlicensed font, image, icon, or brand asset | Legal exposure for the user |
| No claimed measurement that was not taken | Destroys the value of every other claim in the output |
| No draft delivered as final, no comp delivered as an implementation | Same reason |
| No invented statistics, customers, awards, or testimonials presented as real | Fabricated trust signals are a real harm, not a design flourish |
| No trademark-risky mark presented as cleared | Only a lawyer clears a mark |
| States exist: empty, loading, error, success, wherever something loads or submits | A UI without them is unfinished, not minimal |

---

## 2. DEFAULT rules (the re-tiered aesthetic bans)

Each row: the rule, why it is usually right, and the specific condition that overrides it.

| Rule | Usually right because | Overridden when |
| --- | --- | --- |
| Not Inter as the default face | It is the single most recognizable AI-default face | Brand tokens, design system, or user names it |
| One icon family, from a maintained library | Mixed icon families read as unfinished | Project already standardizes on another maintained set, Lucide included |
| No hand-rolled icon SVG paths | Hand-drawn paths are inconsistent and usually wrong at small sizes | The brief asks for a custom mark, or the shape is simple and geometric |
| No centered hero over a dark gradient | The most-generated AI landing composition | User asks, brand pattern, or a single-message launch page where centering is the point |
| No three equal feature cards as the only feature layout | The default that makes every page rhyme | The design system's own grid, or there are exactly three real items of equal weight |
| No gradient meshes or AI-purple | The clearest generated-look tell | Brand gradient exists in the token set |
| No serif unless the work is editorial | Serif gets reached for as a shortcut to "premium" | Brand type stack, or genuine editorial, publication, luxury, or heritage work |
| No `rounded-full` on buttons and cards | Full-round everything reads as a template | Radius tokens say otherwise. Always allowed for avatars, status dots, and chips under 32px tall |
| No em dash in visible page copy | It is the most reliable generated-text tell in English | Locale or brand style guide requires it. Note: this repo's own markdown keeps the ban, enforced by `npm run check` |
| Max 1 eyebrow per 3 sections | Eyebrow-above-every-headline is the templated-rhythm tell | Brand pattern that uses category labels systematically |
| No section-number eyebrows, scroll cues, fake locale or weather strips, decorative status dots, decorative version labels | Pure generated decoration, zero information | Genuinely informational: a real build number on a changelog page, a real location on a store page |
| Hero fits the viewport: headline <= 2 lines, subtext <= 20 words, CTA visible without scroll | Heroes that overflow are the most common generated layout defect | Content-first pages where the hero is a full editorial spread and the user asked for it |
| No div-based fake screenshots or fake dashboards | They look fake at any size and age badly | A real mini-version of the actual UI, built from the real components |
| One accent color, one radius system, one theme, one icon family per page | Consistency is most of what reads as designed | Design system defines more than one, deliberately |
| No pure `#000` or `#fff` | Flat black and flat white are harsh and read as unconsidered | Brand tokens specify them, or the aesthetic is deliberately raw (see `taste-brutal`) |
| Long lists (> 5 items) use a real component, not a bulleted list with a rule under every row | The `divide-y` spec sheet is the laziest available layout | The content genuinely is a reference table and the user wants a table |

---

## 3. PREFERENCE rules

Follow unless anything suggests otherwise. No override log needed.

- Specific font recommendations beyond the brand's stack.
- Specific palette families ("rotate away from beige and brass on premium consumer briefs").
- Specific motion libraries. Motion, GSAP, and CSS scroll-driven animation are all acceptable; the choice follows the project, not the skill.
- Specific stack choices (Next.js, Tailwind version, server components). Follow the repo.
- Named layout families and block choices, when the cast rules are already satisfied.
- Copy tone guidance beyond the honesty rules.

---

## 4. How to write a new rule

When adding a rule to any skill in this family:

1. Pick a tier and write it in the rule. `**HARD**`, `**DEFAULT**`, or `**PREFERENCE**`.
2. If it is HARD, it must map to safety, accessibility, licensing, or honesty. Aesthetics are never HARD.
3. If it is DEFAULT, name the override condition in the same sentence. A DEFAULT with no stated escape hatch is a HARD rule wearing a disguise.
4. If it is a ban, say what to do instead. A ban without an alternative just narrows the output.
