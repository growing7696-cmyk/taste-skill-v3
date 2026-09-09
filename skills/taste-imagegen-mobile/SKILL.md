---
name: taste-imagegen-mobile
description: Asset skill for generating mobile app screen concepts and flows. Budgeted screen counts, platform-aware safe areas and system regions, flow consistency rules, and a mandatory token and spec handoff so the screens convert into an implementable design rather than a gallery.
---

# taste-imagegen-mobile: Screens That Convert Into a Build

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.

The previous version was strong on safe areas, flow consistency, and platform awareness, and weak in two places: it pushed toward generating many screens, which burns quota and makes consistency harder, and it stopped at pictures, with no bridge to tokens and specs. Both are fixed here.

---

## 1. Budget and screen count

| Situation | Tier | Screens |
| --- | --- | --- |
| Concept check, one idea | SPOT | 1 to 3 |
| A single flow, end to end | SECTION | 4 to 6 |
| Multi-flow app direction the user asked for | FULL | 8 to 12, split into named flows |

**HARD**: declare the count before generating. More than 12 screens in one pass is a consistency problem as much as a cost problem, so split into flows and confirm direction after the first flow before continuing.

Prefer **depth over breadth**: one flow shown completely, including its empty, loading, and error states, is more useful than twelve unrelated hero screens.

---

## 2. Platform mode (pick one, commit)

- **iOS native**: system type scale, 44pt minimum touch target, native navigation patterns, bottom tab bar, back gesture affordance, SF-style type character.
- **Android native**: Material 3 patterns, 48dp minimum touch target, top app bar behavior, navigation bar, FAB where it fits.
- **Cross-platform neutral**: a consistent custom language that does not pretend to be either, with target sizes at the larger of the two floors.

Declare it. Mixing an iOS tab bar with a Material FAB in one set is the fastest way to make a concept unbuildable.

---

## 3. Safe areas and system regions (HARD)

Every screen respects:

- Top: status bar and, where applicable, the dynamic island or notch cutout. Nothing meaningful under it.
- Bottom: home indicator or gesture bar, plus the tab bar height if one exists.
- Side insets on landscape and on curved-edge devices.
- Keyboard-covered region for any screen with an input: show the keyboard-up variant for at least one screen with a form.

A screen whose CTA sits under the home indicator is not a design, it is a picture of one.

---

## 4. Flow consistency

Across a set:

- One type scale, one spacing unit, one radius scale, one icon family, one palette. Stated once, reused.
- The same component looks the same on every screen. A card that gains a shadow on screen four is a defect.
- Navigation is coherent: the same tab bar, the same back affordance, the same header height.
- Screen names carry the flow: `onboarding-01-welcome`, `onboarding-02-permissions`, `home-empty`, `home-loaded`, `home-error`.

---

## 5. Text and readability (HARD)

- Body text at 16pt or above in the concept, not 11pt "for density". Screens generated with tiny type produce apps with tiny type.
- No critical text baked as image content in the eventual build; in the comps, treat all rendered text as indicative and restate it in the spec.
- Text over photography needs a scrim, and the contrast is measured on the composite.
- Touch targets at the platform floor, and the spec states the target size, since a comp cannot show it.

---

## 6. The token and spec handoff (this is the missing bridge)

**HARD**: a screen set ships with this, or it is incomplete.

```text
TOKENS
  color:    canvas, surface, surface-variant, text, text-muted, accent, border, plus contrast ratios
  type:     role -> size / weight / line-height / tracking  (display, title, body, label, caption)
  spacing:  base unit and the scale actually used
  radius:   the scale, and where full radius appears
  elevation: levels and their values per platform

LAYOUT
  safe area handling per screen
  grid or list metrics: item height, gutter, section spacing
  scroll behavior, sticky regions, keyboard avoidance

COMPONENTS
  per component shown: anatomy, sizes, states (default, pressed, disabled, focused, loading, error)

FLOW
  screen order, entry and exit points, what each action does, what happens on failure

ASSETS
  icon set name, illustration style, image aspect ratios and crop behavior
```

---

## 7. Category character

Keep the visual direction honest to the category rather than defaulting to the same premium-neutral app every time: fintech leans dense and precise, health leans calm and legible, productivity leans structural, social leans image-led, commerce leans product-first, wellness leans soft and spacious. Pick one and let it decide type scale, density, and imagery, not just the accent color.

---

## 8. Pre-flight additions

- [ ] Screen count declared before generating, flows split rather than sprawled?
- [ ] Platform mode declared and consistent across the set?
- [ ] Safe areas respected on every screen, keyboard-up variant present where there is a form?
- [ ] One type scale, spacing unit, radius scale, icon family, and palette across the set?
- [ ] Body text at 16pt or above, contrast measured over imagery?
- [ ] Empty, loading, and error screens present for the main flow?
- [ ] Token and spec handoff delivered?
- [ ] Screens named by flow and step?
- [ ] Output labeled as concept, not implementation?
