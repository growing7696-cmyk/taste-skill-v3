# CLAUDE.md

## The contract comes first (v4)

This project uses the taste skill family. Read `skills/_core/SKILL.md` before the engine. It is short and it decides the questions this file used to answer by reflex.

- **Rule tiers.** Every aesthetic rule below is DEFAULT tier. A brand token, an installed design system, a repo convention, or an explicit request from the user beats it, and the override gets one logged line: `OVERRIDE: <rule> -> <what> (source: L4, tailwind.config.ts)`. HARD rules are only the accessibility floor, security, licensing, and honesty. Fighting a live design system to satisfy a taste rule makes the project worse.
- **One style skill.** At most one of `taste-minimal`, `taste-soft`, `taste-brutal` per build. Never two.
- **Scope.** Marketing and brand surfaces. Dashboards, dense tables, wizards, settings, and native apps route to a product design system, in one line, before starting.
- **Asset budget.** NONE for edits and small changes, SPOT (1 to 3) for a new page, SECTION or FULL only on request. Declare it before generating.
- **Gates.** `npm run verify:screens`, `npm run verify:a11y` (zero critical, zero serious), and on FINAL builds `npm run verify:lighthouse`. A gate that cannot run is reported as DEFERRED. **Never claim a score you did not measure.**

Post the header before any markup:

```text
SKILLS:    engine=design-taste-frontend-v3 style=<skill or none> workflow=<list or none>
SCOPE:     in scope | split | out of scope (routed to <system>)
FIDELITY:  DRAFT | FINAL
ASSETS:    NONE | SPOT | SECTION | FULL, with the planned count
OVERRIDES: <one line each, or "none">
```

This project uses **taste-skill v3** (`design-taste-frontend-v3`) for all frontend design work: landing pages, portfolios, marketing pages, redesigns. The full rule set lives in the skill. This file is the short leash: it exists to stop the mistakes taste-skill's own rules say the agent makes most often, and to guarantee the v3 Layout Cast step never gets skipped.

Read this before writing any UI. When it conflicts with your defaults, this file wins.

## Before you write a single line of JSX

Run these in order. Do not start markup until all three are posted in writing.

1. **Design read** - one sentence: page kind, audience, vibe, leaning-toward aesthetic.
2. **Dials** - `DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY`, each with one line of reasoning from the brief. Do not silently use the baseline.
3. **Layout Cast (v3, the whole reason this project uses v3)** - post the section list with a layout family per section, the hero paradigm, and the layout seed, BEFORE any code. Casting after the fact defeats the purpose.

If you are typing a `<section>` and you have not posted a cast, stop and cast first.

## The mistakes to not make (taste-skill's own most-violated rules)

These are the rules the skill flags as the ones the agent ignores most. Treat each as a hard gate, not a preference.

- **Zero em-dashes.** No `—` (U+2014) and no `–` (U+2013) as a separator, anywhere: headlines, eyebrows, body, quotes, attribution, captions, buttons, alt text. Use a hyphen `-`, a comma, a period, or parentheses. This is the single most-violated tell. One em-dash anywhere = the output fails.
- **Do not default the hero to Asymmetric Split.** It is the most-overused hero. Pick a hero paradigm deliberately (Section 1.5.B) and use a different one from the last build. Split is the option you justify, not the one you fall back to.
- **Max 1 eyebrow per 3 sections.** The small uppercase tracking label above a headline is the #1 templated-rhythm tell. Do not put one above every section. Count them: instances must be <= ceil(sectionCount / 3). Usually the headline alone is enough; drop the eyebrow.
- **Do not reach for serif because a brief "feels creative."** Serif is only for genuinely editorial / luxury / publication / heritage work with a stated reason. Default to a sans display face. Never `Fraunces` or `Instrument_Serif`.
- **Premium-consumer briefs: no beige + brass + oxblood + espresso palette by default.** That exact warm-craft palette is the second-most-recurring tell and makes every such brand invisible. Rotate to a different family and state which.
- **No AI-purple / neon glow, no pure `#000` or `#fff`, one accent color locked across the whole page.**
- **No div-based fake product screenshots, no hand-rolled decorative SVG, no pure-text "minimalism."** Real images: generate them if a tool exists, else Picsum-seed, else leave a labeled TODO slot and say so.
- **Hero fits the viewport:** headline <= 2 lines, subtext <= 20 words, CTA visible without scroll, `pt-24` cap, max 4 text elements. No trust strip or tagline stuffed into the hero.
- **No section-number eyebrows** (`00 / INDEX`, `001 · Capabilities`), **no scroll cues** (`Scroll ↓`), **no locale / time / weather strips**, **no decorative status dots**, **no version labels in the hero** unless the brief is literally a launch.

## Layout Cast rules (v3, do not skip)

- No layout family appears more than once on the page.
- An 8-section page uses at least 5 distinct families.
- At least 2 families come from the structural-variety tier: `full-bleed`, `horizontal-pan`, `sticky-stack`, `editorial-asymmetric`, `marquee-band`, `split-screen-scroll`. A page built only from hero + card grids + zigzag + CTA is the "every page looks the same" failure.
- At most 2 image+text splits (zigzag) across the whole page.
- `horizontal-pan` and `sticky-stack` are only available when `MOTION_INTENSITY > 4`. Below that, hit the structural-variety floor with the non-motion options.
- On a redesign, cast against the audited existing structure, not from scratch (Section 1.5.E). Do not add structural-variety families to a site that already has healthy variety.

## Stack defaults

- Next.js + React Server Components. Motion (`motion/react`) isolated in `'use client'` leaf components. Tailwind v4.
- Icons from Phosphor / HugeIcons / Radix / Tabler only. Never hand-roll icon SVG paths. One family per project.
- `min-h-[100dvh]`, never `h-screen`. Grid over flex percentage math. Animate only `transform` and `opacity`.
- Any motion above `MOTION_INTENSITY 3` honors `prefers-reduced-motion`. Never `window.addEventListener('scroll')`; use `useScroll` / ScrollTrigger / IntersectionObserver / CSS scroll-driven animation.
- Before importing any library, check `package.json` and output the install command if it is missing.

## Before you say it is done

Run the Pre-Flight Check (Section 14 of the skill) in writing, every box marked Pass or Fail with a one-line justification. The v3 boxes are not optional: the Layout Cast must be posted, the hero paradigm cast and rotated, the structural-variety floor met. If a single box cannot be honestly ticked, the page is not done.
