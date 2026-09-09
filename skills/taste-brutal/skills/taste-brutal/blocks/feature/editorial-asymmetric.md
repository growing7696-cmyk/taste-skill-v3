---
name: editorial-asymmetric-feature
category: feature
dial_compatibility:
  variance: [8, 10]
  motion: [1, 6]
  density: [2, 5]
when_to_use: "High-variance briefs that want an editorial, magazine-like feel. A structural-variety-tier family that needs NO motion budget, so it is how a low-motion page still hits the Layout Cast variety floor."
not_for: "Low-variance / corporate briefs (DESIGN_VARIANCE < 8). Content that needs a strict scannable grid."
stack: ["react", "next", "tailwind"]
---

# Editorial Asymmetric Feature

A magazine-style section built on a fractional column grid with intentional empty zones. Text and media sit off-axis, sized unequally, the way a print spread breathes. Its value in the Layout Cast: it delivers structural variety without any motion, so a page at `MOTION_INTENSITY <= 4` can still escape the safe-default rut.

## 1. Visual sketch

```
+----------------------------------------------+
|            |  large heading spanning          |
|  (empty)   |  a wide fractional column        |
|            +-----------------+----------------+
|  small     |                 |   pull-quote   |
|  caption   |   media block   |   or stat,     |
|  column    |                 |   off-axis     |
+------------+-----------------+----------------+
   columns are 12-track; content uses uneven spans, empty tracks are deliberate
```

## 2. Props API

```ts
interface EditorialAsymmetricFeatureProps {
  heading: string;
  lede?: string;
  media: React.ReactNode;         // real image; this block is media-forward
  aside?: { kind: "quote" | "stat" | "caption"; text: string; attribution?: string };
}
```

## 3. Code sketch

Pure Server Component. The whole effect is grid geometry, not script.

```tsx
export function EditorialAsymmetricFeature(props: EditorialAsymmetricFeatureProps) {
  return (
    <section className="px-6 py-24 md:px-12">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        {/* heading offset into the grid, not flush left */}
        <h2 className="col-span-12 col-start-1 text-4xl font-semibold tracking-tight
                       md:col-span-7 md:col-start-4 md:text-6xl">
          {props.heading}
        </h2>

        {props.lede && (
          <p className="col-span-12 text-lg text-[--muted] md:col-span-4 md:col-start-2">
            {props.lede}
          </p>
        )}

        {/* media block, wide, offset right */}
        <div className="col-span-12 overflow-hidden rounded-2xl md:col-span-7 md:col-start-5">
          {props.media}
        </div>

        {/* aside floats in an otherwise empty track */}
        {props.aside && (
          <aside className="col-span-12 md:col-span-3 md:col-start-1 md:self-end">
            {props.aside.kind === "quote" ? (
              <blockquote className="text-xl leading-snug">
                {props.aside.text}
                {props.aside.attribution && (
                  <cite className="mt-2 block text-sm not-italic text-[--muted]">
                    {props.aside.attribution}
                  </cite>
                )}
              </blockquote>
            ) : (
              <p className="text-sm text-[--muted]">{props.aside.text}</p>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
```

## 4. Mobile fallback (`< 768px`)

- The 12-track asymmetry collapses to a single column in source order: heading, lede, media, aside. The off-axis geometry is a desktop affordance; do not try to preserve empty tracks on mobile, they become awkward gaps.
- Keep the media full-width. Keep the pull-quote larger than body so the editorial voice survives.

## 5. Motion variants

- **1-3:** static, and this is a first-class use of the block. No motion required to justify casting it. Reduced-motion-safe by construction.
- **4-6:** optional scroll-in fade for the media and a line-reveal on the heading; keep it slight. The asymmetry, not motion, is the point.
- **7+:** this block is not the right vehicle for heavy motion; if the page wants expressive motion, cast a motion-tier family instead and keep this one calm.
- **Reduced motion:** nothing to disable in the static case.

## 6. Dark-mode notes

- With so much negative space, the theme lock matters: the empty tracks are `--bg` and must read as intentional, not broken, in both themes.
- The aside (quote/stat) is the one place a single accent-color touch is allowed, matching the page accent.

## 7. Anti-patterns

- **Symmetry creep.** If content drifts back to centered, equal columns, the block loses its reason to exist. Keep spans uneven and at least one deliberately empty track.
- **Filling the empty zones.** The negative space is the design (Section 7, high variance). Do not backfill it with a decorative graphic.
- **Using it at low variance.** On a corporate/low-variance brief this reads as disorganized rather than editorial. Respect the `variance: [8, 10]` gate.
- **Fake media.** Media-forward block; a placeholder div is especially obvious here.

## 8. References

- Print-editorial and magazine web layouts: uneven columns, off-axis headings, load-bearing white space. Study the grid discipline, not decoration.
