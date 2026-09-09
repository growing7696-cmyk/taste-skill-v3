# CODEX.md

## The Contract Comes First (v4)

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

This project uses **taste-skill v3** (`design-taste-frontend-v3`) for frontend design work: landing pages, portfolios, marketing pages, editorial brand pages, and redesigns. The full rule set lives in `skills/taste-skill-v3/SKILL.md`.

This file is the short project instruction for Codex. Read it before writing UI. When it conflicts with a default habit, this file wins.

## Before Writing JSX

Post these in order before section markup:

1. **Design read** - one sentence naming page kind, audience, vibe, and likely design language.
2. **Dials** - `DESIGN_VARIANCE`, `MOTION_INTENSITY`, and `VISUAL_DENSITY`, each with a short reason from the brief.
3. **Layout Cast** - section list with one layout family per section, one hero paradigm, and one layout seed.

If a `<section>` is being written and there is no cast yet, stop and cast first.

## High-Risk Rules

Treat these as hard gates:

- Do not use em dashes or en dashes in visible page copy.
- Do not default the hero to Asymmetric Split. Pick a hero paradigm deliberately and rotate away from the last one when possible.
- Keep eyebrows rare: max 1 per 3 sections.
- Do not use section-number eyebrows, decorative status dots, scroll cues, fake locale or weather strips, or decorative version labels.
- Do not default to beige, brass, oxblood, and espresso for premium-consumer briefs unless the brand clearly calls for it.
- Do not ship AI-purple gradients, generic dark mesh, three equal feature cards, fake dashboards, generic avatars, or pure-text minimalism.
- Use real supplied or generated assets when visuals matter. If none are available, use an honest placeholder and say what is missing.
- Hero must fit the first viewport: headline max 2 desktop lines, subtext max 20 words, CTAs visible without scrolling, and at most 4 text elements.
- Use one accent color, one theme strategy, one radius system, and one icon family per page.

## Layout Cast Rules

- Do not reuse a layout family on the same page unless the brief truly requires it.
- For an 8-section page, use at least 5 distinct layout families.
- Use at least 2 structural-variety families unless the page is very small.
- Structural-variety families: `full-bleed`, `horizontal-pan`, `sticky-stack`, `editorial-asymmetric`, `marquee-band`, `split-screen-scroll`.
- Use at most 2 image-and-text split sections.
- Use at most 1 marquee.
- `horizontal-pan` and `sticky-stack` require motion that respects `prefers-reduced-motion`.
- On redesigns, audit the existing structure first and cast against it. Preserve IA, URLs, nav labels, and brand assets unless the user asks for an overhaul.

## Stack Defaults

Follow the existing project stack when present. For new frontend builds:

- Prefer React or Next.js with static/server components by default and client islands for motion.
- Prefer Tailwind v4 unless the project already uses another system.
- Use `motion/react` for UI motion; use GSAP only for real scroll storytelling; use Three.js only for real 3D.
- Use `next/font` or self-hosted fonts. Do not link Google Fonts directly in production.
- Use the existing icon library. If none exists, use a maintained icon library instead of hand-drawn SVG paths.
- Check `package.json` before importing dependencies.
- Animate only `transform` and `opacity`; honor `prefers-reduced-motion`.
- Avoid unsanitized `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `javascript:` URLs, and unsanitized markdown or rich text.

## Before Calling It Done

Run the relevant pre-flight in writing:

- For DRAFT fidelity: verify design read, dials, cast, responsive layout, visible copy, obvious accessibility issues, and no major AI tells.
- For FINAL fidelity: run the final pre-flight in `SKILL.md` plus any relevant reference files.
- For FINAL web builds: run a production build and Lighthouse when the environment allows it. Target Performance >= 90 and Accessibility, Best Practices, and SEO >= 95. Report real numbers or clearly say what could not be measured.
