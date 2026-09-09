# The Accessibility Floor

Every item here is HARD. It outranks every style skill, every aesthetic preference, and every engine default. The target is WCAG 2.2 AA plus a few product-usability items that AA does not cover but that decide whether a page actually works.

Each item names the check that verifies it. Items marked `[auto]` are covered by `scripts/verify/a11y.mjs`. Items marked `[manual]` need a human or a scripted assertion, and belong in the written pre-flight.

---

## 1. Contrast

- Body text and UI text: **>= 4.5:1** against its actual rendered background. `[auto]`
- Large text (>= 24px, or >= 19px bold): **>= 3:1**. `[auto]`
- Meaningful non-text: icon carrying meaning, input border, focus ring, chart mark, toggle state: **>= 3:1**. `[manual]`
- Text over an image, gradient, video, noise, grain, or scanline overlay: measured against the **worst** region it sits over, not the average. Use a scrim, a solid plate, or move the text. `[manual]`
- Disabled controls are exempt from the ratio but must not be the only way to communicate why they are disabled.

The generated-image aesthetics fail this item more than any other. Composite the actual rendered pixels before claiming a pass.

## 2. Focus

- Visible focus indicator on every interactive element, **>= 3:1** against the adjacent background, at least 2px thick or equivalent. `[auto]` partial, `[manual]` for custom controls
- `outline: none` is only acceptable when a visible replacement is defined in the same rule.
- Focus visible in both light and dark themes.
- Focus order follows visual order. `[manual]`
- No focus trap outside of a modal that intentionally traps and releases on close. `[manual]`

## 3. Target size and spacing

- Interactive targets **>= 24x24 CSS px** with no overlapping neighbours (WCAG 2.2 AA). `[auto]`
- Primary actions and anything touch-first: **>= 44x44**. `[manual]`
- Adjacent targets separated by at least 8px, or made larger.

## 4. Keyboard

- Every action reachable and operable by keyboard. `[manual]`
- Custom carousels, accordions, tabs, and menus implement their expected key handling, or are replaced with native elements.
- Scroll-pinned and scroll-hijacked sections must not prevent keyboard scrolling or skip focusable content. `[manual]`
- A skip link to `main` on any page with more than a handful of nav items. `[auto]`

## 5. Motion and flashing

- Everything above a simple opacity or transform transition honors `prefers-reduced-motion: reduce`. Under reduce: infinite loops stop, parallax stops, scroll pinning releases, autoplay stops, entrance animations become instant. `[manual]`
- Nothing flashes more than three times per second. `[manual]`
- Auto-advancing content has a pause control.
- Motion is never the only way state is communicated.

## 6. Text is text

- Critical text is never baked into a generated or photographic image: no value proposition, price, CTA label, form field, navigation, or legal text inside an image. `[manual]`
- Every `img` has an `alt` that says what the image communicates, or `alt=""` when purely decorative. `[auto]`
- Text can be resized to 200 percent without loss of content or function, and reflows at 320px width without horizontal scrolling. `[auto]` via the 390 viewport screenshot plus a zoom pass

## 7. Semantics

- Exactly one `h1`. No skipped heading levels. `[auto]`
- Landmarks present: `header`, `nav`, `main`, `footer`. `[auto]`
- Buttons are `button`, links are `a` with an `href`. A `div` with an onClick is a defect. `[auto]`
- Lists are `ul` or `ol`. Tables use `th`, `scope`, and a caption when the data needs one.
- `lang` set on `html`, and on any element that switches language. `[auto]`
- Accessible name on every control, including icon-only buttons. `[auto]`

## 8. Forms

- Every input has a programmatically associated label. Placeholder is not a label. `[auto]`
- Errors are announced (`aria-live` or an error summary that receives focus), identify the field, and say how to fix it. `[manual]`
- Error state is never communicated by color alone. `[manual]`
- Required fields are marked in text, not only with a red asterisk.
- Autocomplete attributes on personal-data fields.

## 9. States

- Empty, loading, error, and success states exist for anything that fetches or submits. `[manual]`
- A loading state that is only a spinner on a blank page is acceptable only under one second of expected wait.
- Nothing communicates exclusively on hover. Hover-only content is unreachable by touch and keyboard. `[manual]`

## 10. Color is never the only channel

- Status, validity, chart series, and category all carry a second cue: label, icon, pattern, or position. `[manual]`

## 11. Internationalization reality

- Layouts survive text expansion of at least 30 percent. German and Finnish break tight buttons; Korean and Japanese break tight line heights. `[manual]`
- Line height at least 1.5 for body copy in CJK and Latin alike.
- No layout that depends on a specific character count.

---

## How this floor interacts with each style skill

| Style | The item it usually breaks | The fix that keeps the look |
| --- | --- | --- |
| `taste-minimal` | Muted pastel text and hairline borders under 3:1 | Keep the hue, drop the lightness until it measures. Borders can be light if they are not the only boundary cue |
| `taste-soft` | Glass and low-opacity text over photography, tiny nested labels | Solid scrim behind text, or move text off the image. Keep bezels, raise the type size |
| `taste-brutal` | Small monospace body, all-caps paragraphs, scanline overlays over text, pure black on fluorescent | 16px body floor, all-caps only for headlines and labels under 5 words, overlay opacity capped and disabled under reduce, measure the fluorescent pairs |

Every one of these fixes preserves the aesthetic. None of them require abandoning the style. That is the point: the floor is not a tax on design, it is the part of design that was skipped.
