---
name: editorial-manifesto-hero
category: hero
dial_compatibility:
  variance: [5, 10]
  motion: [1, 7]
  density: [1, 4]
when_to_use: "Launches, brand statements, portfolios, and any brief where the message itself is the design. The first-choice alternative to Asymmetric Split when you want the hero to carry weight through type, not an asset."
not_for: "Product pages that need to show the product in the hero (use Asymmetric Split or Media-Mask). Dense dashboards."
stack: ["react", "next", "tailwind", "motion"]
---

# Editorial Manifesto Hero

A poster-like hero. No product asset. Oversized type does the work, set on a locked single theme, with disciplined restraint below the headline. This is the hero to cast when the Layout Cast rule tells you not to default to Asymmetric Split and the brand has something to say.

## 1. Visual sketch

```
+-------------------------------------------------------+
|  [wordmark]                              [nav] [nav]   |
|                                                       |
|                                                       |
|   We build tools for people                           |
|   who make things.                                    |  <- headline, max 2 lines
|                                                       |
|   One line of subtext, under twenty words,            |  <- subtext
|   doing exactly one job.                              |
|                                                       |
|   [ Primary CTA ]   secondary link                    |  <- <= 4 text elements total
|                                                       |
+-------------------------------------------------------+
        full-bleed, no asset, asymmetric left anchor
```

The headline is anchored left (not centered) unless `DESIGN_VARIANCE <= 4`. The empty right and lower zones are intentional and load-bearing, not a gap to fill.

## 2. Props API

```ts
interface EditorialManifestoHeroProps {
  wordmark: React.ReactNode;
  nav?: { label: string; href: string }[];
  headline: string;          // rendered as 1-2 lines, hard cap 2
  subtext: string;           // <= 20 words, enforced by lint below
  primaryCta: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
  align?: "left" | "center"; // default "left"; "center" only for manifesto/launch briefs
}
```

## 3. Code sketch

Server Component by default. The only client island is the headline reveal, isolated so the rest stays RSC.

```tsx
// hero.tsx  (Server Component)
import { HeadlineReveal } from "./headline-reveal";

export function EditorialManifestoHero(props: EditorialManifestoHeroProps) {
  const align = props.align ?? "left";
  return (
    <section
      className={`relative min-h-[100dvh] px-6 pt-24 pb-16 md:px-12
                  flex flex-col ${align === "center" ? "items-center text-center" : "items-start"}`}
    >
      <nav className="flex w-full items-center justify-between">
        <div className="text-lg font-medium">{props.wordmark}</div>
        <div className="flex gap-6">
          {props.nav?.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-[--muted] hover:text-[--fg]">
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <div className={`flex flex-1 flex-col justify-center ${align === "center" ? "max-w-4xl" : "max-w-5xl"}`}>
        <HeadlineReveal text={props.headline} />
        <p className="mt-6 max-w-xl text-lg text-[--muted]">{props.subtext}</p>
        <div className="mt-10 flex items-center gap-6">
          <a href={props.primaryCta.href}
             className="rounded-full bg-[--fg] px-6 py-3 text-[--bg] transition-transform hover:-translate-y-0.5">
            {props.primaryCta.label}
          </a>
          {props.secondaryLink && (
            <a href={props.secondaryLink.href} className="text-[--fg] underline-offset-4 hover:underline">
              {props.secondaryLink.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
```

```tsx
// headline-reveal.tsx  ('use client')
"use client";
import { motion } from "motion/react";

export function HeadlineReveal({ text }: { text: string }) {
  const lines = text.split("\n").slice(0, 2); // hard cap 2 lines
  return (
    <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
```

## 4. Mobile fallback (`< 768px`)

- Headline drops to `text-5xl`, still hard-capped at 2 lines. If it wraps to 3, shorten the copy, do not shrink further.
- Nav collapses to wordmark plus a single menu affordance; do not stack 5 nav links vertically in the hero.
- `pt-24` becomes `pt-20`; keep the CTA above the fold on a 667px-tall viewport.
- `align="center"` and `align="left"` render identically centered on mobile; the asymmetry is a desktop affordance.

## 5. Motion variants

- **1-3 (restrained):** no line reveal. Headline renders static. Optional single fade of the whole block on mount (`opacity 0 -> 1`, 400ms). This is the reduced-motion fallback too.
- **4-7 (default):** the per-line `y` reveal shown above, stagger 80ms, one-shot on mount. Subtext and CTA fade up 200ms after the last line.
- **8-10 (expressive):** add a slow, subtle scale on the headline (`1.0 -> 1.02` over 1.2s) or a mask-wipe per line. Never add more than one expressive gesture; the manifesto reads as confident, not busy.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` forces the 1-3 static variant. The `motion` initial/animate must collapse to no transform.

## 6. Dark-mode notes

- Drives entirely off `--bg` / `--fg` / `--muted` tokens; never hardcodes `#000` or `#fff`. Use near-black (`oklch(0.16 0 0)`) and near-white, not pure.
- The single accent color appears only on the primary CTA, and it is the same accent used across the whole page (Color Consistency Lock).
- One theme locked for the page (Section 4.11). This hero does not flip theme on scroll.

## 7. Anti-patterns

- **Do not center by default.** Centered manifesto is allowed only for genuine manifesto/launch briefs; otherwise anchor left. Centered-over-gradient is the exact slop this hero exists to replace.
- **Do not add an asset "to fill the space."** The empty zone is the design. A stock image or gradient blob defeats the block.
- **Do not stuff the hero.** No trust strip, no logo wall, no stat row inside the hero. Those are sections below it. Max 4 text elements: headline, subtext, primary CTA, one secondary link.
- **No eyebrow above the headline** unless the whole page's eyebrow budget (Section 4.7, max 1 per 3 sections) can afford it. Usually the headline alone is stronger.
- **No em-dash** in the headline or subtext (Section 9.G). A manifesto headline is exactly where an em-dash sneaks in; use a period or a line break.

## 8. References

- The genre: brand-statement launch pages and independent studio sites that lead with a typographic thesis rather than a product shot. Study the restraint (few elements, large type, locked theme), not any single site's exact layout.
