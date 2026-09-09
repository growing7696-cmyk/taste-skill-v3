---
name: taste-imagegen-web
description: Asset skill for generating website design references. Volume is budgeted rather than mandated, every set ships mobile-shaped frames alongside wide ones, critical text stays out of the image, and each set is delivered with a written implementation spec so the comps can actually be built.
---

# taste-imagegen-web: Budgeted Web Comps That Can Be Built

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.

The previous version of this skill required one horizontal image per section, always, no exceptions, with a landing page defaulting to eight or more. That produces good-looking sets and three real problems: cost and quota on tasks that never needed it, wide-only framing that hides every mobile layout failure, and comps that no one can implement because a picture is not a spec.

---

## 1. Budget first (HARD: declare before generating)

Tiers and defaults come from `_core` Section 5.

| Situation | Tier | Count |
| --- | --- | --- |
| Small edit, existing page, existing asset library | NONE | 0 |
| New page, no assets | SPOT | 1 to 3 |
| Visual direction pass the user asked for | SECTION | one per section that needs a distinct visual |
| Full comp set the user explicitly requested | FULL | every section plus details |

```text
ASSETS: SECTION, 6 images (hero, product, proof, pricing, and 2 mobile frames). Escalated from SPOT because the user asked to see the whole page.
```

No silent escalation. Doubling the planned count is the user's call.

---

## 2. Frame mix (HARD)

Every set includes at least **one narrow, portrait frame per two wide frames**, and always a mobile hero.

Wide-only comp sets are why generated designs collapse at 390px: the composition was never tested in the shape most people will see it in. A comp set that has never been drawn narrow is an untested design.

Suggested frames:

- Wide: 1600x900 or 1600x1200 for section studies.
- Narrow: 390x844 for mobile screens.
- Detail: 1200x800 for a single component study, only at SECTION or FULL.

---

## 3. One art direction, stated once

Consistency across a set comes from a fixed prompt spine, not from luck. Write it once and reuse verbatim:

```text
ART DIRECTION
palette:      <3 to 5 colors with roles>
light:        <source, quality, direction>
lens:         <focal character, depth of field>
texture:      <grain, paper, none>
type feel:    <weight, width, casing character>
subject:      <what is depicted, and how it is treated>
composition:  <where the eye enters, where it rests>
```

Every generation in the set carries the whole spine. Change one field only when a section deliberately breaks rhythm, and say which field and why.

Vary composition anchor across sections: left-text, right-text, centered, full-bleed, overlap, stacked. A set where every frame is text-left, image-right is one idea generated repeatedly.

---

## 4. Text discipline (HARD)

- No critical text baked into an image: no value proposition, price, CTA label, navigation, form field, or legal text.
- Headline text in a comp is **indicative only**, and the spec restates it as real copy.
- Image models render text badly; a comp whose headline contains malformed glyphs is not usable as a reference for anyone.
- When the composition needs a headline to read correctly, deliver the frame plus the real headline as text in the spec, and let the implementation typeset it.

---

## 5. The implementation spec (this is half the deliverable)

**HARD**: a comp set without a spec is incomplete. Deliver this table alongside the images:

```text
GRID        container width, columns, gutter, section max-width
SPACING     base unit, section rhythm desktop / mobile
TYPE        display / heading / body / meta: relative scale, weight, tracking, measure
COLOR       canvas, surface, text, muted, accent, border, with contrast ratios
DEPTH       how surfaces separate, and the shadow or border values
SHAPE       radius scale
IMAGERY     aspect ratios per slot, and the crop behavior at mobile
STATES      hover, focus, empty, loading, error for every interactive element shown
MOTION      what moves, and the reduced-motion fallback
```

The states row is the one the images cannot show and the implementation cannot guess.

---

## 6. Composition guidance

Keep what made the original good, at a manageable size:

- **Hero**: one message. Headline of two lines maximum, a subline under 20 words, CTAs visible without scrolling. Vary hero scale across projects: giant type, mid-scale with a product, and small restrained heroes are all valid; do not default to the same one every time.
- **Section rhythm**: alternate density. A dense section next to an airy one reads as designed; eight evenly-dense sections read as a template.
- **Second-read moment**: one detail per page that rewards a closer look. One, not one per section.
- **Backgrounds**: full-bleed imagery, tinted planes, and pattern are all valid backgrounds, not just white. Contrast for any text on top still has to be measured on the composite.
- **Avoid**: three identical feature cards, gradient mesh backgrounds, glass on everything, decorative dashboards, invented KPI tiles, marquee strips repeated more than once.

---

## 7. Handoff and verification

- Deliver images plus spec plus the art direction spine.
- Name every file for its section and frame: `hero-wide.png`, `hero-mobile.png`, `proof-wide.png`.
- State clearly that these are references, not an implementation, and what the next step costs.
- When implementation follows, `taste-image-to-code` takes over and its verification gates apply.

---

## 8. Pre-flight additions

- [ ] Budget declared with a count before the first generation?
- [ ] At least one narrow frame per two wide frames, and a mobile hero present?
- [ ] One art direction spine, reused verbatim, deviations named?
- [ ] Composition anchor varied across sections?
- [ ] No critical text baked into any image?
- [ ] Implementation spec delivered, including the states row?
- [ ] Files named by section and frame?
- [ ] Output labeled as reference, not implementation?
