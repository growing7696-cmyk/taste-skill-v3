---
name: taste-stitch
description: Export skill that writes a DESIGN.md for Google Stitch from this family's rules, then closes the loop by inspecting what Stitch actually returns and revising the brief. Motion instructions are capped for performance and accessibility, an accessibility section is required in the generated file, and the fallback path is defined for rules Stitch does not honor.
---

# taste-stitch: A Brief for Stitch, Plus the Loop That Checks It

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.

This skill translates the family's rules into Stitch's natural-language design vocabulary and produces a `DESIGN.md`. The previous version stopped there, which leaves two gaps: it depended entirely on Stitch honoring prose rules, with no check, and it asked for perpetual micro-motion on every active component, which is expensive on device and hostile to motion-sensitive users. Both are addressed.

---

## 1. What this produces

A `DESIGN.md` that acts as the single source of truth when prompting Stitch. Stitch reads visual descriptions well and precise values well; it reads long conditional rule systems poorly. So the file is short, concrete, and repetitive on the things that matter.

**Write for the reader you have**: descriptive sentences paired with exact values. `Cards sit flat on the canvas with a single hairline border, 1px, rgba(0,0,0,0.06), and a 12px radius` outperforms `Cards must not use elevation`.

---

## 2. The DESIGN.md structure

```markdown
# Design System: <Project>

## 1. Atmosphere
Two or three sentences on the feeling, the reference world, and what it must not feel like.

## 2. Color
Canvas, surface, text, muted text, accent, border. Hex values with roles, plus one line
per pairing stating the contrast ratio.

## 3. Typography
Display, heading, body, label. Family, weight, size range, tracking, line height,
and the measure for body copy.

## 4. Layout
Container width, grid columns, section rhythm, the alignment logic, and the mobile behavior
stated explicitly rather than left to inference.

## 5. Components
Per component: anatomy, geometry, and every state, including focus and disabled.

## 6. Motion
See Section 4 of this skill. Short, budgeted, with the reduced-motion behavior written in.

## 7. Accessibility (required)
Contrast floors, target sizes, focus treatment, and the states every component must have.

## 8. Anti-patterns
The specific things this project must not produce, phrased as visual descriptions
rather than as abstract bans.
```

---

## 3. Translating family rules into Stitch language

| Family rule | How to write it for Stitch |
| --- | --- |
| One accent color across the page | "A single accent color, `#RRGGBB`, appears on primary buttons, active states, and links. No other saturated color appears anywhere." |
| Eyebrow restraint | "Section headlines stand alone. Small uppercase labels above a headline appear at most twice in the whole screen set." |
| No fake dashboards | "Product imagery is photography or a real screenshot. Never an illustrated interface built from rectangles." |
| Hero discipline | "The hero holds at most four text elements: headline of two lines, one supporting line under twenty words, and the buttons. Everything fits above the fold on a 390px screen." |
| Contrast floor | "Body text measures at least 4.5:1 against its background. Muted text is `#RRGGBB` on `#RRGGBB`, which measures 4.7:1." |

Concrete descriptions with values survive the round trip. Abstract prohibitions do not.

---

## 4. Motion, capped (HARD)

The previous version asked for perpetual micro-motion on every active component. Replace with:

- **At most two continuously animating elements per screen**, and neither is behind text.
- Everything else animates on interaction or on entry only.
- Every motion instruction in `DESIGN.md` is written with its reduced-motion counterpart in the same sentence: "Cards lift 4px on hover over 200ms; under reduced-motion preference the lift is removed and only the border color changes."
- No infinite loop behind readable content, ever.
- Durations: 150 to 250ms for state, 400 to 800ms for entrance.

---

## 5. The loop (the part that was missing)

Generating a brief is half the job. Stitch is a model, and models partially honor prose.

1. **Generate** screens from `DESIGN.md`.
2. **Inspect what came back**, against a short diff list: accent count, type scale adherence, hero element count, eyebrow count, contrast of the muted text, component states present or absent, motion elements.
3. **Classify each miss**: Stitch did not understand the phrasing, Stitch cannot express the rule, or the rule was ambiguous.
4. **Revise the brief for the first and third case.** Rephrase as a visual description with values, move the rule earlier in the file, and repeat it in the component section where it applies.
5. **For the second case, plan the post-pass.** Some rules Stitch will not honor: exact focus ring specifications, `prefers-reduced-motion` behavior, semantic markup, and ARIA. Those get fixed in code afterwards, and the handoff says so explicitly.
6. Cap the loop at three revisions. If a rule has survived three rephrasings unhonored, it belongs in the post-pass list, not in the brief.

---

## 6. Handoff

Deliver `DESIGN.md`, the generated screens, and a short handoff note:

```text
HONORED:      accent discipline, type scale, layout rhythm, hero discipline
PARTIAL:      component states (default and hover present, focus and disabled missing)
POST-PASS:    focus rings, reduced-motion behavior, semantic markup, ARIA names,
              keyboard order, target sizes below 44px on the filter chips
```

**HARD**: never present Stitch output as accessible or production-ready. It is a design starting point, and the post-pass list is what stands between it and a shippable page.

---

## 7. Pre-flight additions

- [ ] `DESIGN.md` contains all eight sections, including the required accessibility section?
- [ ] Every rule written as a visual description with values, not as an abstract ban?
- [ ] Motion capped at two continuous elements, none behind text, each with its reduced-motion counterpart?
- [ ] Loop run: output inspected, misses classified, brief revised at most three times?
- [ ] Post-pass list delivered for everything Stitch cannot express?
- [ ] Output labeled as a design starting point, not as production-ready?
