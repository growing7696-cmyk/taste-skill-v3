# Taste Brutal

A brutalist frontend skill for AI coding agents (Claude Code, Cursor, Codex). It makes the agent build interfaces that are loud, raw, and deliberately unpolished, in two committed modes.

It is the **anti-polish counterpart** to the taste-skill family. Where the base engine refines and softens, this inverts those instincts on purpose, then keeps every rule that stops the result from looking accidentally broken.

> Built on the taste-skill engine (MIT). Not affiliated with or endorsed by the original author. This is an independent, opinionated fork with a different aesthetic goal.

## Two modes, pick one and commit

This package absorbs what used to be a separate `industrial-brutalist-ui` skill. Two brutalist skills that never referenced each other produced exactly the conflict the core contract exists to prevent, so they are one skill now.

### `MODE: neo`

Web-native neo-brutalism. Loud, flat, poster-like.

- Pure black and pure white, required rather than banned
- Flat fluorescent accents (electric yellow, hot magenta, cyan, red), fully saturated, no gradients
- `border-radius: 0` everywhere, thick 2 to 4px solid black borders
- Hard offset shadows (`6px 6px 0 #000`), never soft blur
- System and monospace faces as display type, set huge

### `MODE: industrial`

Swiss print meets tactical telemetry. Reads as a declassified document rather than a poster.

- One substrate, never mixed: unbleached paper light, or deactivated-CRT dark
- Hazard red as the only accent, measured against the substrate it sits on
- Extreme type-scale contrast: heavy neo-grotesque macro type against small tracked monospace
- Rigid grid, visible compartmentalization, zero radius
- Simulated analog degradation: halftone, dithering, scanlines, grain

Full spec: `skills/taste-brutal/reference/modes.md`.

Declare the mode in the output header: `STYLE: taste-brutal, MODE: neo`.

## It inherits the core contract

This is a **style skill**, so at most one of `taste-minimal`, `taste-soft`, `taste-brutal` is active per build. It decides surface only; the engine still owns process.

It inherits `skills/_core/SKILL.md`: the precedence ladder, the three rule tiers, the accessibility floor, the asset budget, and the verification gates. Its own aesthetic rules are DEFAULT tier, so a brand token or an explicit request beats them, with the override logged in one line.

## The accessibility carve-outs (HARD, both modes)

Brutalism fails the floor in four predictable places, and all four are fixable without softening the look:

- **Type size.** Body prose at 16px minimum, monospace and micro labels at 14px minimum. Never 10px.
- **All caps.** Headlines, labels, and data of five words or fewer. Never a paragraph.
- **Overlays.** Scanlines, halftone, and grain live on a fixed `pointer-events: none` layer, capped at 0.10 opacity over text, with contrast measured on the composited result. Disabled under `prefers-contrast: more`, and under `prefers-reduced-motion` if they move.
- **Fluorescent pairs.** Electric yellow on white fails. Measure every accent against its actual substrate. `npm run verify:a11y` is the check, not your eye.

Decorative ASCII framing, crosshairs, and glyph clusters carry `aria-hidden="true"`. Invented telemetry strings are fine as decoration and are never presented as live system data.

## What it keeps from the engine

Only the look is inverted:

- **Layout Casting** picks a varied, rotated structure per build. A brutalist page is not one endless scroll of black boxes.
- **Multi-variant mode** turns one brief into several brutalist directions with a comparison table.
- **Performance gate** still requires a measured Lighthouse Performance >= 90. Flat color and hard borders are cheap to render, so brutalism should score high.
- **The em-dash ban, the real-images rule, reduced motion, hero discipline, and the one-theme lock** all still hold.

## Installing

```
npx skills add https://github.com/<your-username>/taste-brutal --skill "design-taste-brutalist"
```

Or copy `skills/taste-brutal/` (its `SKILL.md` plus the `blocks/` and `reference/` folders) into your skill directory, or paste `SKILL.md` into a session. Install `taste-core` alongside it; without the contract, every rule here falls back to PREFERENCE.

## Repo checks

```
npm run check
```

Validates the em-dash ban, that all section references resolve, that block files honor the contract, and that the block index points at real files.

## License

MIT. See [LICENSE](./LICENSE). Engine credit to the original taste-skill project.
