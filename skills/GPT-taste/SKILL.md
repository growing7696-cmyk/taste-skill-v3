---
name: design-taste-frontend-v3
description: Use for building or redesigning visually distinctive landing pages, portfolios, marketing sites, and editorial brand pages. Triggers on frontend visual design, anti-slop UI, layout casting, design variants, or page redesign requests; not for dashboards, admin panels, dense data tables, wizards, code editors, or native mobile apps.
metadata:
  short-description: Anti-slop frontend design for landing pages, portfolios, and redesigns.
---

# Design Taste Frontend v3

Use this skill to help ChatGPT or Codex ship frontend pages that feel designed instead of templated. It is optimized for greenfield landing pages, portfolios, marketing pages, editorial brand pages, and redesigns of those surfaces.

This skill is not a general product-UI system. If the task is primarily a dashboard, admin panel, dense data table, wizard, code editor, or native mobile app, say the fit is limited and use this skill only for marketing, home, about, launch, or editorial surfaces.

## 1. First Read

Before touching code, infer the brief:

- Page kind: SaaS landing, consumer landing, agency page, portfolio, redesign, editorial, launch page.
- Audience: buyer, recruiter, fan/customer, founder, internal stakeholder, public-sector user.
- Vibe: minimal, premium, playful, editorial, trust-first, experimental, dark tech, brand-led.
- Constraints: accessibility, SEO preservation, existing brand tokens, existing design system, regulated content, available assets.

Output one line before implementation:

```text
Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>.
```

Ask exactly one clarifying question only when two plausible design reads would produce meaningfully different work. Otherwise, state the read and proceed.

## 2. Dial Posture

Set these three dials from the brief and keep them visible in your own reasoning:

- `DESIGN_VARIANCE`: 1 is symmetrical and predictable; 10 is intentionally asymmetric.
- `MOTION_INTENSITY`: 1 is static; 10 is cinematic or scroll-driven.
- `VISUAL_DENSITY`: 1 is sparse and gallery-like; 10 is packed and operational.

Useful baselines:

- Mainstream SaaS landing: `7 / 6 / 4`
- Creative agency or experimental portfolio: `9 / 8 / 3`
- Premium consumer brand: `7 / 6 / 3`
- Developer portfolio: `6 / 5 / 4`
- Editorial or blog: `6 / 4 / 3`
- Public-sector or regulated trust-first page: `3 / 2 / 5`
- Redesign preserve: match the existing page, then add at most one point of motion polish
- Redesign overhaul: treat visuals as greenfield, but preserve IA, slugs, and critical content

## 3. Layout Cast

Cast the page structure before writing section markup. This is the v3 core behavior.

```text
SECTION CAST
Layout seed: "<product, brand, or brief word>"
1. Hero -> hero paradigm: <one of the hero paradigms>
2. <section> -> layout family: <family>
3. <section> -> layout family: <family>
...
```

Hero paradigms:

- Asymmetric Split
- Editorial Manifesto
- Media-Mask
- Kinetic-Type
- Curtain-Reveal
- Scroll-Pinned

Layout families:

- Safe: `card-grid`, `bento`, `zigzag`, `logo-wall`, `cta-band`, `stat-row`, `accordion`, `tabs`
- Structural variety: `full-bleed`, `horizontal-pan`, `sticky-stack`, `editorial-asymmetric`, `marquee-band`, `split-screen-scroll`

Cast rules:

- Do not reuse a layout family on the same page unless the brief truly requires it.
- For an 8-section page, use at least 5 distinct families.
- Use at least 2 structural-variety families unless the page is tiny.
- Use at most 2 image-and-text split sections.
- Use at most 1 marquee.
- Treat Asymmetric Split as a choice that needs a reason, not the fallback.
- Derive the layout seed from the product name or another brief word. Use it only to break ties, never to override the audience or brand.

For ordinary single-page work, post the read, dials, and cast, then keep building. Stop for approval only when the user asks to choose a direction, the task is a multi-variant set, or the cast changes IA, slugs, brand identity, or other high-risk material.

## 4. Multi-Variant Mode

Run this only when the user asks for options, variants, comparisons, multiple directions, or `MODE: variants`.

- Default to 3 variants unless the user asks for a different number.
- Give one design read, then separate casts for Variant A, Variant B, and Variant C.
- Each variant must differ on at least two axes: hero paradigm, structural spine, dial posture, visual language, or content rhythm.
- Build variants at DRAFT fidelity first unless the user asks for production-ready variants.
- Present a comparison table with hero paradigm, structural spine, dial posture, best use, trade-off, and one recommendation.
- If the brief honestly supports only one good direction, say that and build the one strong direction.

## 5. Implementation Defaults

Follow the existing project stack when one exists. For new builds:

- Prefer React or Next.js, with static/server components by default and client islands for motion.
- Prefer Tailwind v4 unless the project already uses another system.
- Use `motion/react` for UI motion; use GSAP only for real scroll storytelling; use Three.js only for real 3D.
- Use self-hosted fonts or `next/font`. Do not link Google Fonts directly in production.
- Check `package.json` before importing any third-party package. If a dependency is missing, install it or tell the user the needed install command.
- Use the project's existing icon library. If none exists, use a maintained icon library instead of hand-drawn SVG paths.
- Use real visual assets. Prefer available image-generation tools, then real supplied assets or stable placeholder photography. Do not ship fake screenshots built from decorative divs.

Design-system routing:

- Microsoft or enterprise SaaS: Fluent UI
- Google or Material-style product: Material 3
- IBM-style enterprise analytics: Carbon
- Shopify admin surfaces: Polaris
- Atlassian product surfaces: Atlassian design system
- GitHub-style devtool pages: Primer
- UK public-sector: GOV.UK Frontend
- US public-sector: USWDS
- Owned modern SaaS components: shadcn/ui or Radix Themes, customized beyond defaults

Use one design system per project.

## 6. Taste Rules

The complete rulebook is in [reference/full-rules.md](reference/full-rules.md). Read it before substantial implementation, before final QA, or whenever a rule below is not enough.

Always enforce these high-signal rules:

- Hero fits the first viewport: headline max 2 desktop lines, subtext max 20 words, CTAs visible without scrolling.
- Hero uses at most 4 text elements: optional eyebrow or brand strip, headline, subtext, CTAs.
- Logo walls live under the hero, not inside it, and show logos only.
- Navigation stays one line on desktop and no taller than 80px.
- Do not default to centered heroes, AI-purple gradients, Inter, three equal feature cards, fake dashboards, generic avatars, or startup names like Acme.
- Use one accent color, one theme strategy, and one radius system per page.
- Avoid beige/brass/espresso as the default premium-consumer palette unless the brand actually calls for it.
- Keep eyebrows rare: max 1 per 3 sections.
- Do not use section-number eyebrows, decorative status dots, scroll cues, version labels, fake locale/weather strips, or decorative bottom text strips.
- Do not put pills or labels over images unless they convey real product data.
- Do not use em dashes or en dashes in visible page copy. Use a normal hyphen, comma, period, colon, or line break.
- Buttons must pass contrast, keep CTA labels on one desktop line, and avoid duplicate CTA intent.
- Forms need real labels above inputs, not placeholders-as-labels.
- Motion must animate only transform and opacity, respect `prefers-reduced-motion`, and have cleanup when implemented in effects.
- User-controlled HTML, markdown, URLs, and script-like inputs must be escaped, sanitized, or allow-listed. Never use unsanitized `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or `javascript:` URLs.

## 7. UX Writing

Write in the brief's language natively. Do not translate an English marketing rhythm into Korean, Japanese, Spanish, or another language.

Before final delivery, re-read every visible string:

- Replace empty adjectives with facts, numbers, nouns, or concrete verbs.
- Vary sentence rhythm.
- Make headlines state something checkable.
- Cut setup phrases like "Introducing", "We are on a mission", and their equivalents in the target language.
- Avoid filler such as "elevate", "seamless", "next-gen", "특별한", "혁신적인", "압도적인", and similar empty intensifiers unless a real fact earns the word.

## 8. On-Demand References

Read only what the current task needs:

- [reference/full-rules.md](reference/full-rules.md): complete v3 rulebook and final pre-flight matrix.
- [reference/redesign-protocol.md](reference/redesign-protocol.md): redesign mode detection, audit, preservation rules, SEO and IA risks.
- [reference/pattern-vocabulary.md](reference/pattern-vocabulary.md): pattern names for heroes, grids, scroll effects, typography, cards, and interactions.
- [reference/scroll-skeletons.md](reference/scroll-skeletons.md): canonical sticky-stack, horizontal-pan, scroll-reveal, and forbidden animation patterns.
- [reference/block-library-contract.md](reference/block-library-contract.md): read only when authoring a new reusable block.
- [reference/appendix-install-commands.md](reference/appendix-install-commands.md): concrete install commands for design systems.
- [reference/appendix-canonical-sources.md](reference/appendix-canonical-sources.md): canonical source links before reinventing named systems.
- [reference/appendix-liquid-glass.md](reference/appendix-liquid-glass.md): honest web approximation for Apple Liquid Glass requests.

Shipped block files:

- [blocks/hero/editorial-manifesto.md](blocks/hero/editorial-manifesto.md)
- [blocks/feature/sticky-stack.md](blocks/feature/sticky-stack.md)
- [blocks/feature/editorial-asymmetric.md](blocks/feature/editorial-asymmetric.md)
- [blocks/feature/bento-grid.md](blocks/feature/bento-grid.md)

Open a block file before using that block. Adapt copy, tokens, layout scale, motion, and mobile behavior to the brief.

## 9. Final Pre-Flight

Before calling a page done:

- For DRAFT fidelity: verify the design read, dials, cast, responsive layout, visible copy, obvious accessibility issues, and no major AI tells.
- For FINAL fidelity: run the complete matrix in [reference/full-rules.md](reference/full-rules.md), including UX writing, XSS guardrails, reduced motion, dark mode, mobile collapse, image rendering, and page-level consistency.
- For FINAL web builds: run a production build and Lighthouse when the environment allows it. Target Performance >= 90 and Accessibility, Best Practices, SEO >= 95. Report real numbers. If Lighthouse cannot run, say so plainly and list the deferred verification.

Do not claim a page is production-ready until final pre-flight and measurement are actually done.
