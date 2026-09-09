---
name: sticky-stack-feature
category: feature
dial_compatibility:
  variance: [5, 10]
  motion: [5, 10]
  density: [2, 6]
when_to_use: "A short sequence of 3 to 5 related points (features, steps, principles) that benefit from being read one at a time. A structural-variety-tier layout: cast it to break a page out of the hero + card-grid + zigzag rut."
not_for: "Long unordered lists (> 6 items). Low-motion pages (MOTION_INTENSITY <= 4): pinning needs motion budget. Content with no natural sequence."
stack: ["react", "next", "tailwind", "motion"]
---

# Sticky-Stack Feature

Cards pin to the viewport and physically stack as the user scrolls, each new one settling over the last. It turns a flat feature list into a paced, one-at-a-time reveal. This is a structural-variety-tier family in the Layout Cast: it exists to make a page stop looking like every other AI build.

## 1. Visual sketch

```
scroll ->   card 1 pins ......... card 2 slides up and pins over 1 ....... card 3 over 2
          +-------------+       +-------------+                          +-------------+
          |   feature 1 |  -->  |   feature 2 |  (1 still visible below)  |  feature 3  |
          +-------------+       +-------------+                          +-------------+
                                    stack grows; slight y-offset + scale on the buried ones
```

Each card is full-width or a wide centered column. The buried cards get a small `scale` and `y` offset so the stack reads as depth, not a glitch.

## 2. Props API

```ts
interface StickyStackFeatureProps {
  items: {
    title: string;
    body: string;
    media?: React.ReactNode; // real image/video, not a placeholder div
  }[];                       // 3 to 5 items; more than 5 fails the block
  intro?: { heading: string; sub?: string };
}
```

## 3. Code sketch

The pinning is a client concern, isolated in one island. The section wrapper stays a Server Component.

```tsx
// sticky-stack.tsx  (Server Component)
import { StickyStackClient } from "./sticky-stack-client";

export function StickyStackFeature(props: StickyStackFeatureProps) {
  if (props.items.length > 5) {
    throw new Error("sticky-stack-feature: max 5 items; split or choose another family");
  }
  return (
    <section className="px-6 py-24 md:px-12">
      {props.intro && (
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{props.intro.heading}</h2>
          {props.intro.sub && <p className="mt-4 text-[--muted]">{props.intro.sub}</p>}
        </div>
      )}
      <StickyStackClient items={props.items} />
    </section>
  );
}
```

```tsx
// sticky-stack-client.tsx  ('use client')
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function StickyStackClient({ items }: { items: StickyStackFeatureProps["items"] }) {
  return (
    <div className="mx-auto max-w-4xl">
      {items.map((item, i) => (
        <Card key={i} index={i} total={items.length} item={item} />
      ))}
    </div>
  );
}

function Card({ index, total, item }: { index: number; total: number; item: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <div ref={ref} className="sticky top-24" style={{ marginBottom: index === total - 1 ? 0 : 24 }}>
      <motion.article
        style={{ scale }}
        className="rounded-2xl border border-[--border] bg-[--surface] p-8 md:p-12 shadow-sm"
      >
        <span className="text-sm text-[--muted]">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{item.title}</h3>
        <p className="mt-3 max-w-prose text-[--muted]">{item.body}</p>
        {item.media && <div className="mt-6 overflow-hidden rounded-xl">{item.media}</div>}
      </motion.article>
    </div>
  );
}
```

## 4. Mobile fallback (`< 768px`)

- Below 768px, drop the pinning. Render the cards as a plain vertical stack with normal flow (`static`, not `sticky`), full-width, generous `gap`. Pinning on small touch viewports fights native scroll and feels broken.
- Keep the numbered index and the scale-in on mount, but no `sticky top`.
- Media collapses to full-width above the text.

## 5. Motion variants

- **1-3:** do not cast this block. It is motion-dependent; below the motion floor use `card-grid` or `zigzag` instead. If forced, render the mobile static-stack version at all widths.
- **4-7:** the sticky pin plus a subtle `scale` on entry as shown. This is the default.
- **8-10:** add depth to the buried cards (progressive `y` offset and dimming via `opacity` on the stack below the active card) and a slightly longer settle. Never add rotation or parallax on the media inside; one gesture per card.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables the pin and the scale; render the static vertical stack. Content parity is mandatory.

## 6. Dark-mode notes

- Cards use `--surface` against the page `--bg` so the stack has a readable seam in both themes. In dark mode `--surface` is a hair lighter than `--bg`, not pure black on black.
- Border uses `--border` token; never a hardcoded gray. Shadow is near-invisible in dark mode; lean on the surface/bg contrast instead of drop shadows.

## 7. Anti-patterns

- **More than 5 cards.** The stack stops reading as a stack and becomes a scroll trap. Split into two sections or pick another family.
- **Pinning on mobile.** The single most common way this block ships broken. Always drop to static flow on small screens.
- **Fake media.** A `div` with a gradient standing in for a screenshot. Use a real image or leave a labeled slot (Section 4.8).
- **Casting it below the motion floor.** If `MOTION_INTENSITY <= 4` this block is unavailable in the Layout Cast; do not fake the motion.
- **Using it for an unordered list.** If the items have no reason to be read in sequence, a bento or card grid is more honest.

## 8. References

- The canonical version is the pinned, stacking-card scroll section popularized by studio and product sites over the last few years. Study the settle timing and the restraint (one gesture per card), not any single implementation.
