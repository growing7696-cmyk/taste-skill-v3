---
name: taste-brandkit
description: Asset skill for brand identity work. The logo is built as vector geometry rather than generated as a raster image, generated imagery is reserved for mood and application boards, and the deliverable is a usable kit: SVG logo set, measured color tokens, licensed type, clearspace and minimum sizes, usage rules, and a trademark-risk checklist that never claims a mark is cleared.
---

# taste-brandkit: Identity Deliverables, Not Identity Pictures

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.

The previous version produced beautiful single-image brand worlds. As a mood exercise that works. As a brand kit it fails in four specific ways, all of which are fixed here: a generated raster logo cannot be used, small sizes fall apart, the type has no license status, and nobody checked whether the mark collides with an existing one.

---

## 1. What gets generated and what gets built (HARD)

| Deliverable | How it is produced | Never |
| --- | --- | --- |
| Logo mark and wordmark | **Vector, authored as SVG geometry**: constructed shapes, real paths, real type outlines or a licensed font reference | Generated as a raster image and traced |
| Color tokens | Written values with measured contrast pairs | Eyedropped from a generated board |
| Type system | Named families with license status and fallbacks | "Assume a premium font is available" |
| Mood and world boards | Generated imagery, budgeted | Presented as final brand assets |
| Application mockups | Generated imagery, or real templates | Presented as real photographs of shipped products |

The logo is the one artifact that must survive being 16px in a tab, embroidered, engraved, and printed in one color. A raster generation cannot do any of that. Build it as geometry.

---

## 2. Strategy before marks

Two or three sentences, not a deck:

- **What the company does**, in plain language, and for whom.
- **The one attribute** the identity must communicate, chosen over the other candidates.
- **The competitive set** and what its identities look like, so the new mark differs on purpose.
- **Constraints**: existing equity to keep, regulated context, cultural considerations, required languages and scripts.

Then a written direction: `Direction: geometric monogram, high-contrast, built from the counter of the letterform, single weight, mono type support.`

---

## 3. Logo construction methods

Pick one and build it as geometry:

1. **Monogram with meaning**: initial letterforms where the construction says something about the product.
2. **Product action**: the verb the product performs, reduced to a shape.
3. **Metaphor fusion**: two related forms sharing an edge or a stroke.
4. **Negative space**: the meaning lives in the counter, not the mass.
5. **Construction geometry**: a grid, a circle set, and a fixed stroke, with the construction shown.

Deliver for each concept: the mark, the wordmark, the lockup, and the construction drawing.

---

## 4. Technical requirements (HARD)

- **SVG, optimized, with a `viewBox`**, no embedded raster, no text elements that depend on a font being installed. Outline the type or ship the font.
- **Variants**: full color, single color on light, single color on dark, and a solid one-color version for stamps and embroidery.
- **Minimum size**: state it, in px and in mm, and show the mark at that size. If detail disappears, ship a simplified small-size variant.
- **Clearspace**: expressed as a fraction of a mark dimension, shown in a diagram.
- **Favicon and app icon**: 16, 32, 180, 512, and a maskable version. Test the 16px rendering; that is where over-detailed marks die.
- **Color tokens**: hex plus a perceptual space (OKLCH or LCH), with contrast ratios for every text-on-brand pairing, and a documented fallback pairing when a brand color fails against white or black.
- **Type**: family names, weights actually used, **license status per family** (open, purchased, needs purchase, system fallback), a webfont plan, and a fallback stack that still looks correct.

---

## 5. Trademark risk (HARD)

**Never state or imply that a mark is cleared, safe, available, or non-infringing.** That is a lawyer's determination and an unqualified assurance here is a real harm.

Do run the checklist, and report it as risk, not as clearance:

- [ ] The mark does not resemble a well-known logo in the same or an adjacent category.
- [ ] The name is not an existing brand in the target category, by a plain search.
- [ ] It does not incorporate a protected symbol: national emblems, the red cross, standards bodies, certification marks.
- [ ] It does not resemble a celebrity likeness, a fictional character, or a mascot.
- [ ] The name has no obvious negative reading in the target languages.
- [ ] The domain and primary social handles are at least plausibly available.

Report as: `Risk check run. No obvious collisions found in <categories searched>. This is not a clearance search. A trademark attorney should run a formal search before filing or launching.`

---

## 6. Boards, budgeted

Generated imagery is for mood, application, and world-building. Budget from `_core` Section 5, default SPOT.

- **Mood board**: one image, the visual world.
- **Application board**: one or two images, the identity in context.
- **Panel systems** (3x3 or 2x3) are allowed at SECTION or FULL, when the user asked for a presentation artifact.

**HARD**: no board is presented as a real photograph of a real product, and the logo shown on any board is the actual SVG composited in, not a re-generated approximation. A board with a hallucinated variant of the mark makes the whole kit untrustworthy.

---

## 7. Deliverable manifest

Every kit ships with a file list, so the user knows what they have:

```text
logo/  mark.svg, mark-mono-light.svg, mark-mono-dark.svg, wordmark.svg, lockup-h.svg, lockup-v.svg
icon/  favicon-16, favicon-32, apple-touch-180, icon-512, icon-maskable-512
docs/  usage.md (clearspace, minimum size, do and do not, misuse examples)
       tokens.md or tokens.json (color with contrast pairs, type with licenses, spacing, radius)
       risk-check.md (the checklist above, with what was searched)
boards/ mood-01.png, application-01.png
```

---

## 8. Pre-flight additions

- [ ] Logo authored as SVG geometry, not generated raster?
- [ ] All four color variants present, minimum size stated and shown?
- [ ] 16px rendering checked?
- [ ] Clearspace diagram included?
- [ ] Color tokens with measured contrast pairs, including the failure fallbacks?
- [ ] Type license status stated per family, with a real fallback stack?
- [ ] Trademark risk checklist run and reported as risk, with no clearance claimed?
- [ ] Boards budgeted, labeled as mood, and composited with the real mark?
- [ ] File manifest delivered?
