---
name: taste-minimal
description: Style skill for flat, editorial, document-style interfaces. Warm monochrome canvas, typographic contrast rather than decoration, hairline structure, muted pastel accents, near-zero elevation. Use for trust-first, editorial, developer-facing, and information-dense marketing surfaces. One style skill per build; this one is mutually exclusive with taste-soft and taste-brutal.
---

# taste-minimal: Flat Editorial Surface

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD. A brand token or an explicit user instruction beats any DEFAULT, with a logged override.

This is a **style skill**. It decides surface: color, type, depth, corner, motion feel. It does not decide process. The engine (`design-taste-frontend-v3`) still owns the design read, the dials, the layout cast, and the pre-flight.

**Mutually exclusive with `taste-soft` and `taste-brutal`.** If two look applicable, pick one and say why in one line.

---

## 1. When this style is right

Reach for it when the content is the point and the interface should get out of the way.

- Developer tools, technical products, documentation-adjacent marketing.
- Trust-first work: public sector, health, finance, legal.
- Editorial and writing-led pages.
- Information-dense marketing where a decorated surface would compete with the content.
- Any brand whose existing tokens define no elevation scale.

**Do not** reach for it when the brief wants presence, warmth, or spectacle, or when the product's whole pitch is visual. That is `taste-soft` or `taste-brutal` territory. Minimal is not the safe default; it is a specific choice, and a pure-text page is not minimalism, it is unfinished work.

---

## 2. The surface contract

### 2.1 Depth: near zero, but not none

- Elevation is expressed by **borders and space**, not shadows.
- Structural border: exactly one hairline, `1px solid` at roughly 6 percent of the foreground color. One value across the whole page.
- Shadows are allowed only as a hover response, ultra-diffuse, opacity below 0.06. Never as a resting state, never `shadow-md` or heavier.
- **Sections are not empty planes.** Depth without shadow comes from a low-opacity background image, a very soft radial warm spot below 0.04 opacity, or a fine geometric line pattern. One such device per page, not per section.

### 2.2 Corners: one system, one exception

The old rule "no `rounded-full`" contradicted the old rule "tags are pill-shaped". Here is the resolved version.

- Radius scale: `4px` for controls, `8px` or `12px` for cards and panels. Pick one card value and use it everywhere.
- **Full radius is allowed only for**: avatars, status dots, and chips or tags whose height is under 32px.
- Buttons, cards, inputs, panels, and media containers never use full radius.

### 2.3 Color

Warm monochrome canvas, color reserved for meaning.

```css
--canvas:        #FBFBFA;   /* or #FFFFFF, or #F7F6F3 for a warmer read */
--surface:       #FFFFFF;
--border:        rgba(0,0,0,0.06);
--text:          #111111;   /* never #000 */
--text-muted:    #6B6A66;   /* darkened from the classic #787774 to clear 4.5:1 on canvas */
--accent-bg:     /* one pastel pair, see below */
```

Pastel accent pairs. Each pair is text-on-tint and clears 4.5:1. Use **one** pair per page unless the pastels are carrying semantic status, in which case use the set.

| Use | Tint | Text on tint |
| --- | --- | --- |
| Neutral info | `#E1F3FE` | `#155A85` |
| Positive | `#EDF3EC` | `#2C562F` |
| Caution | `#FBF3DB` | `#7A5200` |
| Negative | `#FDEBEC` | `#8E2A28` |

**HARD**: measure any color you change. The muted grays and pastels in this style sit close to the contrast floor by design, so a small lightness tweak breaks them. `npm run verify:a11y` is the check.

Dark mode is not optional (the original version of this style was light-only, which is a defect). Invert with the same structure: near-black canvas that is not `#000`, off-white text that is not `#fff`, hairline borders at 10 percent of foreground, pastels re-derived at low chroma with the same measured contrast.

### 2.4 Type

Typographic contrast is the entire decoration budget.

- **Sans for body, UI, and buttons.** Geometric or system-native with character. Any of Geist Sans, Switzer, Helvetica Neue, or the system stack. Inter is a DEFAULT-tier avoid, overridden by brand tokens.
- **Serif for hero headings and pull quotes only,** and only when the work is genuinely editorial. Tracking `-0.02em` to `-0.04em`, line height `1.1`.
- **Mono for metadata, code, and keys.** Minimum 13px, never below.
- Body: 16px minimum, line height 1.6, measure 60 to 75 characters.
- The whole page uses at most three faces. Two is better.

### 2.5 Space

- Section rhythm: 96px to 128px vertical at desktop, 56px to 72px at mobile.
- Card padding: 24px to 40px.
- Content column: 640px to 768px for prose, up to 1152px for grids.
- Space is the layout tool of last resort in other styles and the first tool here.

---

## 3. Components

Every component below ships with its states. **HARD**: a component with no focus, disabled, empty, loading, and error treatment is unfinished.

**Primary button.** Solid `--text` background, `--canvas` text, radius 4 to 6px, no shadow. Hover shifts the background one step lighter. Active applies `scale(0.98)`. Focus shows a 2px ring at 3:1 against the surrounding surface. Minimum hit area 44x44 including padding.

**Secondary button.** Hairline border, transparent background, same geometry and same focus ring.

**Card and bento cell.** Hairline border, chosen card radius, generous internal padding, no shadow at rest. In a multi-cell grid, at least two cells carry real visual variation: an image, a tint, or a pattern. A grid of identical white cells with text in them is the flat-style version of slop.

**Tag and status chip.** Full radius allowed, height under 32px, 12px type, uppercase with `0.05em` tracking, pastel pair from the table. Status is never communicated by tint alone: include a word or an icon.

**Accordion and FAQ.** No container boxes. Items separated by one hairline. `+` and `-` for state, plus `aria-expanded`. Full keyboard operation.

**Keyboard shortcut.** Real `<kbd>`, hairline border, 4px radius, tinted background, mono face.

**Faux window chrome.** Allowed for product mockups. Three small gray circles, hairline frame. **HARD**: what is inside the frame is a real screenshot or a real mini-version of the UI. A `div`-built fake dashboard with invented rows is banned at every tier of this family.

**Input.** Hairline border with at least 3:1 against the surface (a 6 percent border fails this and is only acceptable when the input has another boundary cue such as a filled background). Real label above, never placeholder-as-label. Error state carries an icon and text, not just a red border.

---

## 4. Imagery

Budget comes from `_core` Section 5. Default SPOT.

- Photography: desaturated, warm, with a grain overlay at or below 0.04 opacity so it sits in the monochrome palette.
- Illustration: monochrome continuous-line, with a single offset shape filled in one pastel.
- Placeholders when the budget is NONE: `https://picsum.photos/seed/{descriptive-seed}/1200/800`, seeded per section.
- **HARD**: no critical text baked into an image.
- Icons: one family, consistent weight, from a maintained library. Phosphor and Radix suit this style. Lucide is a DEFAULT-tier avoid here only because its hairline weight collapses against hairline borders, and it is fine when the project already standardizes on it.

---

## 5. Motion

Invisible, present, never a performance.

- Scroll entry: `translateY(12px)` plus opacity, 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`, via `IntersectionObserver`. Never a scroll event listener.
- Stagger: 80ms per item, capped at 6 items, then the rest appear together.
- Hover: shadow appears from nothing to `0 2px 8px rgba(0,0,0,0.04)` over 200ms.
- Ambient: at most one very slow radial drift, 20s or longer, opacity 0.02 to 0.04, on a fixed `pointer-events: none` layer.
- **HARD**: everything above collapses to static under `prefers-reduced-motion: reduce`. Animate only `transform` and `opacity`.

---

## 6. Pre-flight additions

Run the engine's pre-flight, then these:

- [ ] One radius value for cards, one for controls, full radius only on avatars, dots, and sub-32px chips?
- [ ] Zero resting shadows? Hover shadows below 0.06 opacity?
- [ ] Every muted gray and pastel pair measured, not eyeballed? (`npm run verify:a11y`)
- [ ] Dark mode defined and checked, not light-only?
- [ ] At most three type faces, body at 16px or more, mono at 13px or more?
- [ ] Focus ring visible on every control in both themes?
- [ ] At least two cells in any multi-cell grid carrying real visual variation?
- [ ] Sections carry depth from imagery, soft light, or pattern, and are not blank planes?
- [ ] Every component's empty, loading, and error state defined?
- [ ] Status never communicated by tint alone?
