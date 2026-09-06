---
name: bento-grid-feature
category: feature
dial_compatibility:
  variance: [4, 9]
  motion: [1, 8]
  density: [3, 7]
when_to_use: "A set of related features or facts of unequal weight, where one or two deserve more room. The workhorse feature layout when you want structure without motion dependency."
not_for: "Items that are all equal weight and equal size (that is just a card grid; do not fake a bento). Fewer than 4 items."
stack: ["react", "next", "tailwind"]
---

# Bento Grid Feature

An asymmetric tile grid (the Apple Control Center pattern). Tiles vary in span so the important ones get more room. Cast it when you want a dense, structured feature section that does not depend on motion.

## 1. Visual sketch

```
+-----------+-------+
|           |       |
|   big     | small |
|   tile    +-------+
|           | small |
+-----+-----+-------+
|small| wide tile   |
+-----+-------------+
   exact N cells for N items, no empty filler cells
```

## 2. Props API

```ts
interface BentoGridFeatureProps {
  items: {
    title: string;
    body?: string;
    media?: React.ReactNode;
    span?: "sm" | "md" | "lg"; // controls grid span; at least one "lg"
  }[];                          // exact cell count == items.length
  heading?: string;
}
```

## 3. Code sketch

Pure Server Component; no client island needed unless a tile has its own interaction.

```tsx
export function BentoGridFeature(props: BentoGridFeatureProps) {
  const spanClass = { sm: "md:col-span-1", md: "md:col-span-2", lg: "md:col-span-2 md:row-span-2" };
  return (
    <section className="px-6 py-24 md:px-12">
      {props.heading && (
        <h2 className="mb-12 text-4xl font-semibold tracking-tight md:text-5xl">{props.heading}</h2>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(180px,auto)]">
        {props.items.map((item, i) => (
          <article
            key={i}
            className={`rounded-2xl border border-[--border] p-6 ${spanClass[item.span ?? "sm"]}
                        ${i % 3 === 0 ? "bg-[--surface]" : i % 3 === 1 ? "bg-[--surface-2]" : "bg-[--bg]"}`}
          >
            <h3 className="text-xl font-medium">{item.title}</h3>
            {item.body && <p className="mt-2 text-sm text-[--muted]">{item.body}</p>}
            {item.media && <div className="mt-4 overflow-hidden rounded-lg">{item.media}</div>}
          </article>
        ))}
      </div>
    </section>
  );
}
```

## 4. Mobile fallback (`< 768px`)

- Collapse to a single column (`grid-cols-1`). All spans reset to full width. Order matters: put the `lg` tiles first so the important content leads on mobile.
- Keep the varied tile backgrounds; they are what stop the mobile view from reading as a plain list.

## 5. Motion variants

- **1-3:** static. Optional fade-up stagger of tiles on scroll-in (`opacity` + small `y`), 60ms stagger. This is the reduced-motion-safe default.
- **4-7:** the stagger, plus a subtle hover lift on interactive tiles (`translate-y-0.5`).
- **8-10:** add a spotlight-border or gradient-edge on hover for feature tiles, but only if the page's accent supports it. Never animate every tile continuously; the grid should be calm at rest.
- **Reduced motion:** disable stagger and hover translate; tiles render in place.

## 6. Dark-mode notes

- The three background tokens (`--surface`, `--surface-2`, `--bg`) must stay distinguishable in dark mode; if they collapse to the same near-black, the bento looks like one flat block. Tune `--surface-2` to a hair more lightness.
- Borders carry the grid structure in dark mode more than shadows do; keep `--border` visible.

## 7. Anti-patterns

- **Empty filler cells.** Exact N cells for N items (Section 4.7). If the grid has a hole, change the spans, do not add a decorative empty tile.
- **All-equal tiles.** If every tile is the same size, it is a card grid, not a bento. At least one `lg`.
- **Uniform tile backgrounds.** Same bg on every tile flattens the effect; vary across at least two surface tokens (Section 4.7).
- **Cramming.** A bento with 12 tiny tiles is noise. Above ~7 items, group or split.

## 8. References

- Apple's Control Center and marketing bento sections are the canonical reference for span variety and calm-at-rest density.
