# CLAUDE.md

This project uses the **taste-skill** frontend design skill (`design-taste-frontend`) for landing pages, portfolios, marketing pages, and redesigns. The full rule set lives in the skill's `SKILL.md`. This file does not replace it. It is a short leash that makes the skill perform closer to its ceiling by doing two things the skill leaves to chance:

1. Front-loading the handful of rules the skill itself flags as the ones the agent violates most, so they are hard gates instead of buried lines.
2. Turning the skill's layout and palette variety rules from passive bans (discovered at audit time) into an active declaration the agent must post before writing any markup.

Read this before writing any UI. When it conflicts with your defaults, this file wins. Every rule below points at a section that already exists in the skill; nothing here invents new policy.

## Before you write a single line of JSX

The skill tells you to state a Design Read (Section 0.B) and set the three dials (Section 1). Good. Do not stop there. Also post, in writing, a **structure plan** before any code. This is the single highest-leverage habit for this skill, because the skill's variety rules (Section 4.7 Section-Layout-Repetition Ban, Section 4.3 anti-center, Section 10 hero paradigms) are written as things to check afterward, and by the time you check, you have already reached for your safe defaults.

Post these four things and stop for approval before writing markup:

1. **Design Read** (Section 0.B) - one sentence: page kind, audience, vibe, leaning-toward aesthetic.
2. **Dials** (Section 1) - `DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY`, each with one line of reasoning from the brief. Do not silently use the baseline.
3. **Hero paradigm** - pick ONE from the skill's Section 10 hero list (Asymmetric Split, Editorial Manifesto, Media-Mask, Kinetic-Type, Curtain-Reveal, Scroll-Pinned). Do not default to Asymmetric Split. It is the skill's most-overused hero; if you pick it, justify why the brief needs it rather than falling back to it.
4. **Section plan** - list every section with the layout family you will use for it, drawn from the skill's Section 10 vocabulary. Before writing code, confirm against Section 4.7: no layout family used twice, at least 4 distinct families across an 8-section page, at most 2 consecutive image+text splits (the Zigzag Cap), and at least one non-obvious structural section (full-bleed, sticky-stack, horizontal-pan, editorial-asymmetric, marquee) so the page is not just hero + card grids + zigzag + CTA.

If you are typing a `<section>` and you have not posted the plan, stop and post it first. Reviewing this plan is the cheapest moment to catch a page that is about to look like every other AI build.

## The mistakes to not make (the skill's own most-violated rules)

These are the exact rules the skill marks as most-violated or most-recurring. Treat each as a hard gate.

- **Zero em-dashes** (Section 9.G, "the single most-violated Tell"). No `—` (U+2014) and no `–` (U+2013) as a separator, anywhere: headlines, eyebrows, body, quotes, attribution, captions, buttons, alt text. Use a hyphen `-`, a comma, a period, a colon, or parentheses. One em-dash anywhere means the output fails the Pre-Flight Check.
- **Max 1 eyebrow per 3 sections** (Section 4.7 Eyebrow Restraint, "the #1 violated rule in production tests"). The small uppercase tracking label above a headline is the templated-rhythm tell. Do not put one above every section header. Count instances of `uppercase tracking` labels: must be <= ceil(sectionCount / 3), hero counted as one. Usually the headline alone is enough.
- **Do not reach for serif because a brief "feels creative"** (Section 4.1, "the single most-tested AI tell"). Serif is only for genuinely editorial / luxury / publication / heritage work with a stated reason. Default to a sans display face. Never `Fraunces` or `Instrument_Serif`.
- **Premium-consumer briefs: no default beige + brass + oxblood + espresso palette** (Section 4.2, "second-most-recurring AI-tell"). That warm-craft palette makes every such brand invisible. Rotate to a different family and name which one. It is allowed only when the brand brief explicitly names those colors.
- **Do not repeat the palette or the hero across consecutive builds** (Section 4.2 palette-rotation rule). The skill already says to rotate palettes build to build; apply the same discipline to the hero paradigm, since that is where structural sameness starts.

## The rules that quietly wreck a build

Not flagged as "most-violated" in the skill, but they are the ones that turn a promising page into an obvious AI build:

- **No AI-purple / neon glow** (Section 4.2 THE LILA RULE). One accent color, locked across the whole page (Color Consistency Lock). No pure `#000` or `#fff` (Section 9.A).
- **No div-based fake product screenshots, no hand-rolled decorative SVG, no pure-text "minimalism"** (Section 4.8). Real images: generate them if a tool exists, else use `picsum.photos/seed/...`, else leave a labeled TODO slot and say so at the end. A hero with just text and a gradient blob is a placeholder, not a hero.
- **Hero fits the viewport** (Section 4.7): headline <= 2 lines, subtext <= 20 words, CTA visible without scroll, `pt-24` cap, max 4 text elements. No trust strip, tagline, or logo wall stuffed inside the hero; those go in sections below it.
- **No section-number eyebrows** (`00 / INDEX`, `001 · Capabilities`), **no scroll cues** (`Scroll ↓`), **no locale / time / weather strips**, **no decorative status dots**, **no version labels in the hero** unless the brief is literally a launch (Section 9.F). These are the production-test tells the skill bans outright.
- **Long lists (> 5 items) do not get a plain `<ul>` with `divide-y`** (Section 4.9). Use a card grid, tabs, accordion, scroll-snap, or grouped chunks. A 10-row spec table with a hairline under every row is the laziest layout.
- **One theme for the whole page** (Section 4.11). No section flips to inverted mode mid-scroll.

## Stack defaults (from the skill, the ones most often ignored)

- Next.js + React Server Components. Motion (`motion/react`) isolated in `'use client'` leaf components (Section 3.A). Tailwind v4.
- Icons from Phosphor / HugeIcons / Radix / Tabler only. Never hand-roll icon SVG paths. One family per project (Section 3.C).
- `min-h-[100dvh]`, never `h-screen`. Grid over flex percentage math (Section 3.E). Animate only `transform` and `opacity` (Section 6.A).
- Any motion above `MOTION_INTENSITY 3` honors `prefers-reduced-motion` (Section 6.B). Never `window.addEventListener('scroll')`; use `useScroll` / ScrollTrigger / IntersectionObserver / CSS scroll-driven animation (Section 5.D).
- If `MOTION_INTENSITY > 4`, the page must actually animate; if you cannot ship working motion, drop the dial to 3 and ship clean static (Section 5). Do not claim motion you did not build.
- Before importing any library, check `package.json` and output the install command if it is missing (Section 3.F).

## Before you say it is done

Run the skill's Final Pre-Flight Check (Section 14) in writing, every box marked Pass or Fail with a one-line justification. Do not summarize it as "looks good." The check is long on purpose; the em-dash box, the eyebrow-count box, the Section-Layout-Repetition box, and the hero-discipline box are the ones that actually fail real builds, so tick those honestly. If a single box cannot be honestly ticked, the page is not done. Fix it before delivering.
