---
name: taste-soft
description: Style skill for layered, tactile, premium consumer surfaces. Measurable elevation system, a budgeted nested-bezel treatment, physically-motivated motion, and glass that degrades safely. Use for consumer product launches, brand-led marketing, and portfolio work that needs presence. One style skill per build; mutually exclusive with taste-minimal and taste-brutal.
---

# taste-soft: Layered Tactile Surface

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD. A brand token or an explicit user instruction beats any DEFAULT, with a logged override.

This is a **style skill**: surface only. The engine owns process.

**Mutually exclusive with `taste-minimal` and `taste-brutal`.**

## Note on how this skill is written

The previous version of this style asked for output that reads as a "$150k agency build". That is not a specification, it is a mood, and a model cannot check its work against it. Everything below is stated as a value, a count, or a check. If you cannot verify a rule mechanically or by looking at a named property, it does not belong in this file.

---

## 1. When this style is right

- Consumer product launches, hardware, apps, lifestyle brands.
- Brand-led marketing where the surface itself is part of the pitch.
- Portfolios that need presence rather than restraint.
- Projects whose brand tokens already define an elevation scale.

**Do not** reach for it on dense information surfaces, trust-first work, or any project whose tokens define no shadows. Layered depth on a documentation page is noise.

---

## 2. Elevation: the measurable version of "expensive"

Four levels. Every surface on the page sits at exactly one. Declare the mapping once.

| Level | Use | Light mode | Dark mode |
| --- | --- | --- | --- |
| E0 | Page canvas, full-bleed bands | no shadow | no shadow |
| E1 | Resting cards, panels, list rows | `0 1px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.03)` | `inset 0 1px 0 rgba(255,255,255,0.06)` plus a 1px hairline at 10 percent |
| E2 | Hovered cards, floating nav, popovers | `0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)` | same plus a slightly stronger inner highlight |
| E3 | Modals, command palettes, the single hero object | `0 24px 60px rgba(0,0,0,0.14), 0 6px 16px rgba(0,0,0,0.06)` | same, and the scrim behind it is required |

Rules:

- **At most one E3 element per viewport.** Two competing hero objects is the most common failure of this style.
- Shadows are always neutral or slightly tinted toward the canvas hue. Never pure black at high opacity, never a colored glow.
- Dark mode uses inner highlights and hairlines rather than drop shadows, because a shadow on a dark canvas is invisible and the model always adds one anyway.

---

## 3. The bezel treatment, with a budget

The nested "double-bezel" (an outer tray holding an inner plate) is what makes this style feel like hardware. It is also what makes an over-applied version look like a page of picture frames.

**Budget: at most two bezelled elements per page, and never more than one nesting level.**

Typically: the hero visual, and the single most important card. Everything else is a plain E1 surface. A page where every card is bezelled has spent the whole effect on nothing.

Construction:

- **Outer tray**: subtle fill (`rgba(0,0,0,0.04)` light, `rgba(255,255,255,0.05)` dark), one hairline ring, padding of 6 to 8px, outer radius `R`.
- **Inner plate**: its own background, an inset top highlight (`inset 0 1px 1px rgba(255,255,255,0.15)`), and radius `R - padding` so the curves stay concentric. Compute it, do not guess.
- Nesting stops there. A plate inside a plate inside a tray is the failure this budget exists to prevent.

### 3.1 The nested-icon button

A trailing arrow inside its own circular well is a signature of this style and is allowed on **primary CTAs only**, at most two per page.

**HARD**: the visible circle may be 32px, but the interactive target is at least 44x44. Achieve it with padding or a pseudo-element hit area, never by shrinking the target to match the visual.

---

## 4. Type

- Display face: a geometric or grotesk with real character. Body face may be the same family at a lower weight.
- **HARD: never assume a font is installed.** Every stack ends in a real fallback that the page still looks correct in, and every non-system face is either self-hosted with a checked license or loaded from a source the project already uses. A page that depends on an unlicensed premium font is broken on delivery.

```css
--font-display: "Clash Display", "Geist Sans", ui-sans-serif, system-ui, sans-serif;
--font-body:    "Geist Sans", ui-sans-serif, system-ui, -apple-system, sans-serif;
```

- Display sizes use `clamp()`. Body is 16px minimum, line height 1.5 to 1.6.
- Tracking tightens as size grows: `-0.01em` at 32px, down to `-0.03em` at display sizes. Body stays at 0.
- Eyebrow pills are allowed but rationed by the engine rule: at most one per three sections.

---

## 5. Glass, and when it is not allowed

- `backdrop-filter` only on fixed or sticky elements: navigation, overlays, modals. **HARD**: never on a scrolling container, and never on a large content area. It repaints every frame and destroys mobile performance.
- **HARD**: text over glass must clear the contrast floor against the **worst** underlying region, not the average. If it cannot, add a solid scrim behind the text or move the text out of the glass.
- Provide the no-backdrop fallback: `@supports not (backdrop-filter: blur(1px))` sets a solid background at the same contrast. Roughly one in ten sessions gets the fallback.
- Blur radius between 12px and 32px. Beyond that it stops reading as glass and starts reading as fog.

---

## 6. Motion

Physical, interpolated, budgeted.

- Standard curve: `cubic-bezier(0.32, 0.72, 0, 1)`. Durations 200ms for state, 500 to 800ms for entrance.
- Entrance: fade with `translateY(16px)`. Blur-in is allowed once per page, on the hero only, because it is expensive.
- Press: `scale(0.98)` on `:active`.
- Magnetic and diagonal icon travel: primary CTAs only.
- Staggered nav reveal: 60 to 100ms per item, capped at 8 items.
- **HARD**: `prefers-reduced-motion: reduce` removes entrance transforms, blur-ins, magnetic hover, and any parallax, leaving instant, legible states. Animate only `transform`, `opacity`, and `filter` on isolated fixed layers.
- **HARD**: motion never carries information on its own.

---

## 7. Layout archetypes

Pick one per build, from the engine's layout cast, and note which:

1. **Asymmetric bento.** Varying cell spans. Below 768px every span resets to a single column with a 24px gap.
2. **Z-axis cascade.** Overlapping cards with slight rotation and depth of field. Below 768px all rotations and negative margins are removed; overlapping targets on touch are a defect, not a look.
3. **Editorial split.** Large type on one side, scrollable media on the other. Below 768px it becomes a full-width stack.

**HARD**: `min-h-[100dvh]`, never `h-screen`. Declare the sub-768px behavior in the same component as the desktop layout.

---

## 8. Flat is allowed

This style has a failure mode where every surface acquires depth until the page is exhausting. Deliberately keep at least a third of the page at E0: full-bleed bands, plain type sections, quiet space between the layered moments. Depth reads as premium only when it is scarce.

---

## 9. Pre-flight additions

Run the engine's pre-flight, then these:

- [ ] Every surface mapped to exactly one elevation level, E0 through E3?
- [ ] At most one E3 element per viewport?
- [ ] At most two bezelled elements on the page, and exactly one nesting level?
- [ ] Inner radius computed as outer minus padding, so curves are concentric?
- [ ] Nested icon buttons at a 44x44 interactive target regardless of visual size?
- [ ] Every font stack ends in a real fallback, and every custom face is licensed and self-hosted or already in the project?
- [ ] Backdrop blur only on fixed or sticky layers, with a `@supports` fallback?
- [ ] Text over glass or imagery measured against its worst region?
- [ ] Reduced-motion path removes entrance transforms, blur-ins, and magnetic hover?
- [ ] At least a third of the page left flat at E0?
- [ ] Below 768px: no rotations, no negative-margin overlaps, no overlapping touch targets?
