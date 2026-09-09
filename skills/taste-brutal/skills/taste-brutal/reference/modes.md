# taste-brutal: The Two Modes

This file absorbs what used to be a separate `industrial-brutalist-ui` skill. Two brutalist skills that never referenced each other produced exactly the conflict `_core` exists to prevent, so they are now one skill with two committed modes.

**Pick ONE mode per project and commit.** Do not alternate, do not mix substrates, do not blend the type systems. Declare the mode in the output header:

```text
STYLE: taste-brutal, MODE: neo
STYLE: taste-brutal, MODE: industrial (substrate: dark telemetry)
```

Everything in `_core` still applies, and the accessibility floor in Section 4 of this file is HARD. Brutalism is a look, not an excuse.

---

## MODE: neo

Loud, flat, fluorescent, poster-like. Web-native neo-brutalism: thick black borders, hard offset shadows, saturated flat color, system and grotesk type, deliberate asymmetry.

Use it for campaigns, launches, portfolios with attitude, and brands that want to be seen rather than trusted.

The main `SKILL.md` in this package covers this mode in full. Nothing further is needed here.

---

## MODE: industrial

Swiss print meets tactical telemetry. Rigid grids, extreme type-scale contrast, utilitarian color, simulated analog degradation. Reads as a declassified document rather than a poster.

### 1. Substrate: pick one, never mix

**Swiss Industrial Print (light).**

```css
--bg:     #F4F4F0;   /* unbleached documentation paper */
--fg:     #0B0B0B;   /* carbon ink */
--accent: #C81414;   /* hazard red, darkened from #E61919 to clear 4.5:1 on the paper */
```

**Tactical Telemetry (dark).**

```css
--bg:     #0A0A0A;   /* deactivated CRT, never pure #000 */
--fg:     #EAEAEA;   /* white phosphor */
--accent: #FF3B3B;   /* hazard red, lightened to clear 4.5:1 on the CRT */
--signal: #4AF626;   /* terminal green: at most ONE element on the page, or omit */
```

The red is the only accent. It marks alerts, structural rules, and vital data, and nothing else. **HARD**: the accent values above are the measured versions of the classic ones. If you change a hue, re-measure. The original `#E61919` on `#F4F4F0` is roughly 4.2:1 and fails for body-size text.

### 2. Type

**Macro (structural headers).** Heavy neo-grotesque: Archivo Black, Neue Haas Grotesk Black, Roboto Flex Heavy, Monument Extended. Fluid scale via `clamp(4rem, 10vw, 15rem)`. Tracking `-0.03em` to `-0.06em`. Line height `0.85` to `0.95`. Uppercase.

**Micro (data and telemetry).** Monospace: JetBrains Mono, IBM Plex Mono, Space Mono. Tracking `0.05em` to `0.1em`. Uppercase for metadata, navigation, unit IDs, coordinates.

**HARD, and this is where the original failed:**

- Micro type floor is **14px**, not 10px. Below that, uppercase monospace with wide tracking is unreadable for a large share of users, and the aesthetic survives 14px fine.
- Body prose is **16px minimum and never all-caps**. Uppercase is for headlines, labels, and data of five words or fewer. An all-caps paragraph is a reading failure, not a design decision.
- Tracking on uppercase micro type is a legibility aid here, so keep it at `0.05em` or more; tight uppercase at small sizes is the worst combination available.

**Textural serif.** Used sparingly, heavily degraded by halftone or dithering, as texture rather than as reading matter. Never for body copy.

### 3. Layout

- Strict CSS Grid. Elements anchor to tracks, never float.
- Visible compartmentalization: `1px` or `2px` solid borders delineating zones; full-width rules between operational units.
- Bimodal density: tightly packed monospace clusters against vast negative space framing macro type.
- **Zero border radius.** Every corner is 90 degrees.
- Grid hairlines trick: `display: grid; gap: 1px;` with contrasting parent and child backgrounds gives mathematically exact dividers with no border declarations.

### 4. Symbology

- ASCII framing: `[ DELIVERY SYSTEMS ]`, `< RE-IND >`, `>>>`, `///`.
- Registration and trademark glyphs used as geometric structure.
- Crosshairs at grid intersections, barcode rules, hazard stripes, revision strings such as `REV 2.6` or `UNIT / D-01`.

**HARD**: decorative ASCII and glyph clusters carry `aria-hidden="true"`. A screen reader reading `>>> /// [ SECTION ]` aloud is the accessibility cost of this aesthetic, and it is avoidable in one attribute. Revision strings and unit IDs are decoration unless they are real; if they are invented, that is fine, but do not present invented telemetry as live system data.

### 5. Analog degradation, safely

Halftone, 1-bit dithering, CRT scanlines, and global noise are the point of this mode. They are also the fastest way to fail contrast and to burn a mobile GPU.

**HARD:**

- Overlay layers are `position: fixed; inset: 0; pointer-events: none;` and never attached to a scrolling container.
- Scanline and noise opacity is capped at 0.10 over any region containing text, and the text contrast is measured **through** the overlay, on the composited result.
- All degradation effects are disabled under `prefers-reduced-motion: reduce` if they move, and under `prefers-contrast: more` regardless.
- Dithered or halftoned type is decorative. The same words exist as real text somewhere reachable, or they are not information.

Scanline reference:

```css
@media (prefers-contrast: no-preference) {
  .crt::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px
    );
  }
}
```

### 6. Semantics

Use the real technical elements: `<data>`, `<samp>`, `<kbd>`, `<output>`, `<dl>`. They describe the content correctly and they cost nothing.

### 7. Mode pre-flight

- [ ] One substrate declared, never mixed?
- [ ] Accent red measured against the chosen substrate?
- [ ] Micro type at 14px or above, body at 16px, no all-caps paragraphs?
- [ ] Uppercase limited to headlines, labels, and data under five words?
- [ ] Zero border radius throughout?
- [ ] Decorative ASCII and glyph structure marked `aria-hidden`?
- [ ] Overlays fixed, `pointer-events: none`, capped at 0.10 over text, contrast measured on the composite?
- [ ] Degradation effects disabled under `prefers-contrast: more`, motion effects under `prefers-reduced-motion`?
- [ ] Terminal green used on at most one element, or omitted?
- [ ] Invented telemetry not presented as live data?
