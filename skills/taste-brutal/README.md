# Taste Brutal

A neo-brutalist frontend skill for AI coding agents (Claude Code, Cursor, Codex). It makes the agent build interfaces that are loud, raw, and deliberately unpolished: hard edges, thick black borders, flat fluorescent color, system and monospace type, brutal contrast.

It is the **anti-polish counterpart** to the taste-skill family. Where the original taste-skill refines and softens, this inverts every one of those instincts on purpose.

> Built on the taste-skill engine (MIT). Not affiliated with or endorsed by the original author. This is an independent, opinionated fork with a different aesthetic goal.

## The idea

Most AI-generated frontends look the same: soft shadows, rounded corners, one tasteful accent, safe sans-serif. The original taste-skill made that polish better. This skill goes the other way. It reuses that skill's engine (active Layout Casting, a real block library, multi-variant mode, a measured performance gate) but replaces the aesthetic rulebook with a brutalist one:

- Pure black and pure white, required not banned
- Flat fluorescent accents (electric yellow, hot magenta, cyan, red), fully saturated, no gradients
- `border-radius: 0` everywhere, thick 2 to 4px solid black borders
- Hard offset shadows (`6px 6px 0 #000`), never soft blur
- System and monospace fonts as display faces, set huge
- Contrast so high it is almost rude

The rules that keep it from looking *accidentally broken* are the whole point: brutalism reads as intentional only when every hard choice is applied with total consistency. That consistency is what the skill enforces.

## What it keeps from the engine

Only the look is inverted. These still run exactly as in the base engine:

- **Layout Casting** picks a varied, rotated structure per build (a brutalist page is not one endless scroll of black boxes).
- **Multi-variant mode** turns one brief into three different brutalist directions with a comparison table.
- **Performance gate** still requires a measured Lighthouse Performance >= 90. Flat color and hard borders are cheap to render, so brutalism should score high.
- **Accessibility is not sacrificed.** Loud fluorescents must still pass WCAG AA contrast. Loud is fine; unreadable is not.
- **The em-dash ban, real-images rule, reduced-motion and hero discipline** all still hold.

## Installing

```
npx skills add https://github.com/<your-username>/taste-brutal --skill "design-taste-brutalist"
```

Or copy `skills/taste-brutal/SKILL.md` (with its `blocks/` and `reference/` folders) into your project, or paste it into a session.

## Repo checks

```
npm run check
```

Validates the em-dash ban, that all section references resolve, that block files honor the contract, and that the block index points at real files.

## License

MIT. See [LICENSE](./LICENSE). Engine credit to the original taste-skill project.
