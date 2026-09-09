---
name: taste-image-to-code
description: Workflow skill for building a page from a visual reference. Image generation is conditional, not mandatory, gated by a trigger matrix so small edits and design-system work never pay for it. Extracts a written spec from the reference before writing code, then verifies the implementation against the reference and against the accessibility floor.
---

# taste-image-to-code: Reference First, When a Reference Is Worth It

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.

The previous version of this workflow made "generate images, analyze them, then implement" mandatory for every visually important task. That is right for a new visual direction and badly wrong for a padding fix, a design-system project, or an accessibility pass. This version keeps the method and gates the cost.

---

## 1. Trigger matrix (run this before generating anything)

**Use the image-first path when at least two of these hold:**

- The task is a new page or a new visual direction, with no existing design system to inherit from.
- The user supplied a reference image, screenshot, or link and wants it matched.
- The brief is visually ambiguous, and two reasonable readings would produce very different pages.
- The user explicitly asked for comps, mockups, or a look-and-feel pass first.

**Skip it, budget NONE, and go straight to code when any of these hold:**

- The change is small: a CSS fix, a copy edit, a spacing adjustment, a bug.
- The project has a design system, a component library, or brand tokens. The system is the reference.
- The task is accessibility, performance, SEO, or refactoring work.
- The user is iterating on a page that already exists and looks the way they want.
- The user is time or quota constrained and said so.

**The cheap middle path**: collect references instead of generating them. Existing screenshots, the brand's own site, a named product the user pointed at, an image the user already has. A reference you did not pay to generate is worth exactly as much for extraction purposes.

Declare the decision in one line:

```text
IMAGE-FIRST: yes (new direction, no design system, user asked to see it first). Budget SPOT, 3 images.
IMAGE-FIRST: no (existing design system in packages/ui). Building directly from tokens.
```

---

## 2. If generating: the reference set

Budget rules come from `_core` Section 5. Defaults for this workflow:

- **SPOT (default)**: hero plus at most two key sections.
- **SECTION**: only when the user asked to see the whole page as comps.
- Always include **one narrow, portrait frame** alongside the wide ones. A page designed only from 16:9 crops fails at 390px, and that is where most traffic is.

Fix the art direction once, in writing (palette, lighting, lens, type character, texture, subject treatment), and reuse it verbatim across every generation so the set holds together.

**HARD**: no critical text baked into a generated image. The image carries composition, hierarchy, and mood. Real text lives in markup.

---

## 3. Extraction: the reference becomes a spec, in writing

This is the step that makes the workflow worth anything, and the step models skip. Before any JSX, write the spec:

```text
LAYOUT     grid columns, gutters, container width, section order, alignment logic
TYPE       roles (display / heading / body / meta), relative scale, weight, tracking, measure
SPACING    the base unit and the section rhythm, expressed as a scale, not as pixels-per-element
COLOR      canvas, surface, text, muted, accent, border, as tokens, each measured for contrast
DEPTH      how surfaces separate: border, shadow level, or space alone
SHAPE      radius scale, and where full radius appears
MOTION     what appears to move, and what that implies for reduced motion
STATES     what the reference does not show and you must design: hover, focus, empty, loading, error
```

The last line matters most. A reference image never shows a focus ring, an error state, or an empty list. **HARD**: those get designed explicitly, they are not inferred later.

---

## 4. Implementation discipline

- Build from the spec, not by squinting at the picture repeatedly.
- **HARD**: never reproduce a rendering artifact. Generated images contain warped glyphs, impossible shadows, and text that is not real language. If something in the image cannot be explained as a design decision, it is an artifact, and you drop it.
- Use real components, real content, and real images. `div`-built fake dashboards and fake screenshots are banned family-wide.
- When the reference and the accessibility floor disagree, the floor wins and the deviation gets one line: `Reference shows 12px muted labels at 2.9:1. Implemented at 14px and 4.6:1.`
- When the reference and an existing design system disagree, the system wins (L4 beats L5).

---

## 5. Verification against the reference

Run the `_core` gates, plus this one:

```bash
npm run verify:screens -- --url http://localhost:3000
```

Then put the screenshot next to the reference and check, in writing:

- Section order and count match.
- Type hierarchy matches in relative terms, not in absolute pixels.
- Spacing rhythm matches.
- Density matches; the most common drift is a page that is 30 percent tighter than its reference.
- What deliberately differs, and why.

Then confirm the parts the reference could not show: focus rings, keyboard order, states, reduced motion, 390px layout.

---

## 6. Pre-flight additions

- [ ] Trigger matrix run and the decision stated, with a budget?
- [ ] Reference set includes at least one narrow frame?
- [ ] Written spec produced before implementation?
- [ ] States designed explicitly rather than inferred?
- [ ] No rendering artifacts reproduced as design?
- [ ] Deviations from the reference listed with reasons?
- [ ] Screenshot compared against reference, side by side, in writing?
- [ ] Accessibility floor clear even where the reference was below it?
