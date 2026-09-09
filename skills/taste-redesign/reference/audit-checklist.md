# Redesign Audit Checklist

Findings format: `AREA | severity (floor / high / medium / low) | what is wrong | the fix`.

`floor` means it violates the `_core` accessibility floor. Those are fixed first and are not traded against aesthetics.

---

## Typography

- Browser defaults, or Inter everywhere. Replace with a face that has character, unless brand tokens fix it.
- Headlines without presence: increase size, tighten tracking, reduce line height.
- Body measure over roughly 75 characters. Constrain it.
- Only 400 and 700 in use. Introduce 500 and 600 for real hierarchy.
- Proportional figures in data. Enable `font-variant-numeric: tabular-nums`.
- No tracking adjustment by size: negative for display, slightly positive for small caps and labels.
- All-caps subheads everywhere. Try sentence case; reserve caps for short labels.
- Orphans on the last line. `text-wrap: balance` for headings, `pretty` for body.
- `floor`: body below 16px, line height below 1.5.

## Color and surface

- Pure `#000` canvas. Move to off-black or a tinted dark.
- Accents above roughly 80 percent saturation. Desaturate.
- More than one accent. Pick one.
- Warm and cool grays mixed. Commit to one family.
- Purple-to-blue gradient mesh. The clearest AI fingerprint; replace with a neutral base and one considered accent.
- Untinted black shadows. Tint toward the background hue.
- Zero texture: add subtle grain, noise, or micro-pattern on a fixed layer.
- A single inverted section dropped into an otherwise light or dark page. Commit to one theme; use a shade of the same palette for contrast.
- Flat, empty sections. Add low-opacity imagery, ambient light, or pattern. One device per page.
- `floor`: any text, border, or meaningful icon below its contrast ratio.

## Layout

- Everything centered and symmetrical. Break it deliberately, not randomly.
- Three equal card columns as the only feature layout.
- `height: 100vh`. Replace with `min-height: 100dvh`.
- Flexbox percentage math where Grid belongs.
- No max-width container on wide screens.
- Equal-height cards forced by flex when content varies.
- One radius for everything. Vary: tighter inside, softer outside.
- No overlap, no depth, no layering anywhere.
- Identical top and bottom section padding, where optical balance wants slightly more at the bottom.
- CTAs at random heights across a card row. Pin them to the bottom so they form a line.
- Feature lists starting at different Y positions across pricing columns. Align shared elements.
- Optical versus mathematical centering: icons beside text, glyphs in circles, often need 1 to 2px.
- `floor`: horizontal overflow at 390px, or content that cannot reflow at 320px.

## States and interactivity

- No hover response on interactive elements.
- No pressed feedback. Add `scale(0.98)` or a 1px translate.
- Zero-duration transitions. 150 to 300ms on state changes.
- Spinner-only loading. Use skeletons shaped like the content.
- No empty state. Design the composed "nothing here yet" view.
- No error state. Inline messages, never `window.alert()`.
- Dead links (`href="#"`). Link them or disable them visibly.
- No current-page indication in navigation.
- Animations on `top`, `left`, `width`, `height`. Move to `transform` and `opacity`.
- `floor`: missing focus ring, keyboard-unreachable action, hover-only content, motion that ignores `prefers-reduced-motion`.

## Content

- "John Doe", "Acme Corp", Lorem Ipsum. Replace with realistic contextual content.
- Suspiciously round numbers. Use organic values, or label them as sample data.
- AI copy cliches: elevate, seamless, unleash, next-gen, game-changer, delve, tapestry, "in the world of".
- Exclamation marks in success messages. Be confident, not loud.
- "Oops!" errors. Say what failed and what to do.
- Passive voice in system messages.
- Identical dates across posts, one avatar reused for several people.
- Title Case On Every Header. Sentence case reads better.
- `floor`: invented statistics, customers, awards, or testimonials presented as real. Not a style issue, an honesty issue.

## Components

- Card as border plus shadow plus white background, applied to everything. Cards should exist only where elevation means something.
- Always exactly one filled and one ghost button. Add tertiary text links.
- Pill "New" and "Beta" badges by reflex.
- Accordion FAQ as the default for every list.
- Three-card testimonial carousel with dots.
- Three-tower pricing table where the recommended tier is only taller.
- Modals for simple actions. Inline editing or slide-overs are usually better.
- Circles for every avatar. Squircles exist.
- Sun and moon toggle. System preference plus a settings entry is often enough.
- Four-column footer link farm.

## Iconography and assets

- Lucide or Feather used exclusively, at default weight. Fine if the project standardizes on it; otherwise differentiate.
- Cliche metaphors: rocket for launch, shield for security.
- Mixed stroke widths across the icon set.
- Missing favicon.
- Uncanny stock "diverse team" photography.
- `floor`: meaningful images with no alt text, decorative images with non-empty alt.

## Code quality

- Div soup where semantic elements exist.
- Inline styles mixed with the styling system.
- Hardcoded pixel widths.
- Arbitrary `z-index: 9999`. Establish a scale.
- Commented-out dead code and debug artifacts.
- Imports that do not exist in the dependency file.
- Missing `title`, description, and social meta tags.

## Systematically forgotten

- No skip-to-content link. `floor`.
- No custom 404, no back navigation from dead ends.
- No client-side form validation.
- No `og:image`, so every share looks broken.
- Legal, consent, and accessibility-statement items: **report with jurisdiction reasoning, do not install by reflex, never claim compliance.** See `SKILL.md` Section 4.
