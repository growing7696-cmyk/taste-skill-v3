---
name: taste-core
description: Shared governance contract for the taste skill family. Resolves conflicts between design skills with a precedence ladder, replaces blanket bans with a three-tier rule system that brands can override, sets a non-negotiable accessibility floor, budgets image generation instead of mandating it, and defines the runnable verification gates every other taste skill reports against. Load this first whenever any taste-* skill is in play.
---

# taste-core: The Shared Contract

Every skill in this family inherits this file. It exists because a pile of strong-opinioned design skills that do not know about each other produces three failures: they contradict each other, their bans fire in situations where they are wrong, and nobody ever checks the result.

This file fixes those three at the family level, so no individual skill has to.

Read this before the style skill, not after.

---

## 1. THE SKILL MAP (Roles, and How Many You Load)

Skills in this family are typed. The type decides how many can be active at once.

| Layer | Skills | How many active |
| --- | --- | --- |
| Engine | `design-taste-frontend-v3` | exactly 1 |
| Style | `taste-minimal`, `taste-soft`, `taste-brutal` | at most 1 |
| Workflow | `taste-redesign`, `taste-image-to-code`, `taste-output` | any number |
| Asset | `taste-imagegen-web`, `taste-imagegen-mobile`, `taste-brandkit` | any number, budget-gated |
| Export | `taste-stitch`, `design-taste-frontend-v3` GPT package | at most 1 |

**One style skill per build. This is a hard rule.** `taste-minimal` wants flat surfaces and hairline borders. `taste-soft` wants nested bezels and layered elevation. `taste-brutal` wants hard edges and raw contrast. Loading two of them does not average them, it produces a page that argues with itself. If two style skills look applicable, name the one you are using in the output header and say in one line why the other lost.

The engine (`design-taste-frontend-v3`) owns process: design read, dials, layout cast, pre-flight. Style skills own surface: color, type, depth, corner, motion feel. A style skill never redefines the process, and the engine never dictates surface. When a style skill and the engine appear to collide, it is almost always a surface question and the style skill wins (see the ladder below).

### 1.A The output header (post this before code)

Every build that loads any taste skill opens with this block, in writing, before the first line of markup:

```text
SKILLS:    engine=<skill> style=<skill or none> workflow=<list or none> asset=<list or none>
FIDELITY:  DRAFT | FINAL
ASSETS:    NONE | SPOT | SECTION | FULL   (budget, see Section 5)
OVERRIDES: <one line per precedence override, or "none">
```

No header, no build. The header is what makes conflicts and costs visible before they are paid for.

---

## 2. PRECEDENCE LADDER (What Wins When Two Rules Collide)

Lower number wins. Always. No exceptions, no "but the aesthetic".

1. **Safety, law, and licensing.** Security holes, XSS, trademark infringement, unlicensed fonts, privacy violations, scraped brand assets. Nothing outranks this.
2. **The accessibility floor** (Section 4). A design rule never wins against the floor. If an aesthetic cannot be built above the floor, the aesthetic changes.
3. **Explicit instruction from the user in this conversation.** They asked for a centered hero, they get a centered hero.
4. **Existing project reality.** The installed design system, the shipped brand tokens, the repo's conventions, the component library already in `package.json`. A skill's taste does not get to fight a codebase.
5. **The active style skill.** Surface decisions inside the space the levels above leave open.
6. **Engine defaults.** The dials, the layout cast, the anti-slop bans.
7. **Model preference.** Whatever the model would have reached for by itself. Lowest priority by definition, and the reason this family exists.

### 2.A Overrides are logged, not silent

Whenever a level overrides a lower one, print one line in the output header:

```text
OVERRIDE: Inter is banned by engine default -> keeping Inter (source: L4, brand token in tailwind.config.ts)
OVERRIDE: centered hero is a default-tier ban -> centered hero (source: L3, user asked for it)
```

A silent override is indistinguishable from the model ignoring the skill. The log is what makes the difference legible.

### 2.B Worked conflicts

Full worked examples, including the classic style-skill collisions, live in `reference/precedence.md`. Read it when two skills genuinely disagree and the ladder alone does not settle it.

---

## 3. RULE TIERS (The Fix for Blanket Bans)

The old failure mode: a skill bans Inter, Lucide, centered heroes, three-column card grids, gradients, serifs, and `rounded-full`. Useful when generating from nothing. Actively harmful when the project already ships Inter as a brand token, or the design system's card grid is three columns.

Every rule in every taste skill carries exactly one tier.

| Tier | Meaning | Overridable by |
| --- | --- | --- |
| **HARD** | Never overridable. Safety, accessibility floor, licensing, honesty. | Nothing. |
| **DEFAULT** | The right call when nothing says otherwise. This is where nearly all aesthetic bans belong. | L3 or L4 of the ladder, with a logged override line. |
| **PREFERENCE** | A nudge. Follow it unless anything at all suggests otherwise. | Any stated reason. |

**Unlabeled rules read as DEFAULT.** A skill that writes "banned" without a tier is stating a DEFAULT, and a brand token beats it.

### 3.A The re-tiered ban list

These are the bans that most often fire wrongly. Their tier is now fixed family-wide.

| Rule | Old status | Tier now | Override condition |
| --- | --- | --- | --- |
| No Inter as the type face | hard ban | DEFAULT | Brand or design system already specifies it |
| One icon family, from an approved list | hard ban | DEFAULT | Project already uses another maintained library (Lucide included) |
| No centered hero | hard ban | DEFAULT | Brand pattern, user request, or a single-message launch page |
| No three equal feature cards | hard ban | DEFAULT | The design system's own grid, or exactly three real items |
| No gradients | hard ban | DEFAULT | Brand gradient exists in the token set |
| No serif unless editorial | hard ban | DEFAULT | Brand type stack, or genuine editorial or heritage work |
| No `rounded-full` | hard ban | DEFAULT | Radius token set says otherwise; always allowed for avatars, status dots, and chips under 32px tall |
| No em dash in visible copy | hard ban | DEFAULT | Locale or brand style guide requires it; still banned in this repo's own markdown |
| Hand-rolled decorative SVG | hard ban | DEFAULT | Brief asks for it, or the mark is simple and geometric |
| Contrast, focus, target size, motion safety | soft mention | HARD | Nothing |
| Do not claim a score you did not measure | absent | HARD | Nothing |

The full table, with the reasoning per row, is in `reference/rule-tiers.md`.

### 3.B Brand Override Protocol

When the project carries a brand or design system, run this before applying any style rule:

1. **Detect.** Look for `tailwind.config.*`, `theme.css`, `tokens.json`, a `design-system` or `ui` package, an existing `<ThemeProvider>`, a brand guideline file in the repo, or fonts already loaded.
2. **Extract.** Write down what it fixes: type stack, color tokens, radius scale, spacing scale, elevation, icon set, motion timing.
3. **Yield.** Every extracted value beats the equivalent DEFAULT rule in every taste skill. Log each one.
4. **Apply the rest.** Taste rules still apply everywhere the system is silent, which is usually layout, rhythm, density, copy, and composition. That is where these skills add value on a branded project.

A skill that overrides a live design system to satisfy its own aesthetic has made the project worse, not better. The correct move on a branded project is to be excellent inside the constraint.

---

## 4. THE ACCESSIBILITY FLOOR (HARD, Outranks Every Aesthetic)

Taste is a DEFAULT. This floor is HARD. If a style skill's look cannot clear it, the look bends.

- **Contrast.** Body and UI text at least 4.5:1, large text (>= 24px, or >= 19px bold) at least 3:1, meaningful non-text UI (icons carrying meaning, input borders, focus rings, chart marks) at least 3:1. This applies to text over images and over noise or grain overlays too, which is where these aesthetics usually fail.
- **Focus.** Every interactive element has a visible focus indicator at 3:1 against its background, never `outline: none` without a replacement, and it is visible in both themes.
- **Targets.** Interactive targets at least 24x24 CSS px with adequate spacing (WCAG 2.2 AA), and at least 44x44 for anything primary or touch-first.
- **Keyboard.** Everything reachable and operable by keyboard, in a sane order. Scroll-jacking, custom carousels, and pinned sections must not trap focus.
- **Motion.** Anything above a subtle transition honors `prefers-reduced-motion: reduce`. Infinite loops, parallax, autoplay, and scroll-driven pinning collapse to static. Nothing flashes more than three times per second.
- **Text is text.** Critical text is never baked into a generated image. Images carry mood, not the value proposition, the price, or the CTA label.
- **Semantics.** One `h1`, no heading levels skipped, landmarks present (`header`, `nav`, `main`, `footer`), lists are lists, buttons are buttons, links are links, `lang` set on `html`.
- **Forms.** Every input has a real label, errors are announced and not color-only, no placeholder-as-label.
- **States.** Empty, loading, error, and success states exist for anything that loads or submits. A state that only exists as a hover effect does not exist.
- **Color is never the only channel.** Status, validity, and chart series carry a second cue.

The full floor, with the checks that verify each item, is in `reference/accessibility-floor.md`. The runnable version is `scripts/verify/a11y.mjs`.

---

## 5. ASSET BUDGET (The Fix for Mandatory Image Generation)

Generating one image per section, always, no exceptions, is a real cost in time, quota, and money, and it is wrong for most tasks. Image volume is now a budget declared up front.

| Budget | What gets generated | Default for |
| --- | --- | --- |
| **NONE** | Nothing. Use existing assets, real photography URLs, or labeled placeholder slots. | Bug fixes, copy edits, CSS tweaks, accessibility work, performance work, any change under roughly 50 lines, and any project with an existing asset library |
| **SPOT** | 1 to 3 images: hero plus at most two supporting. | The default for a new page build |
| **SECTION** | One image per section that genuinely needs a distinct visual. | A visual-direction pass the user asked for |
| **FULL** | Every section, plus detail and state views. | Only when the user explicitly asks for a full visual comp set |

Rules that hold at every tier:

- **The budget is declared in the output header before the first generation call.** Include the count and, if known, the quota cost.
- **Never escalate silently.** Going from SPOT to SECTION needs a sentence saying why, and it is the user's call if the jump is more than double.
- **A small change never triggers generation.** If the task is an edit to an existing page, the budget is NONE unless the user asks otherwise.
- **Reuse before you regenerate.** A generated asset is reusable across sections with different crops and treatments.
- **Generated images are references, not the product,** unless the deliverable is explicitly imagery. Implementation reads the image for composition, spacing, and hierarchy, then writes real text in real markup.
- **Always deliver at least one mobile-shaped frame** when the deliverable is a comp set. A set of wide desktop crops hides every layout problem that actually matters.

Details and the decision matrix live in `reference/asset-budget.md`.

---

## 6. VERIFICATION GATES (The Fix for Self-Graded Checklists)

A checklist the model ticks about its own work is not verification. These gates are.

| Gate | When | What runs | Bar |
| --- | --- | --- | --- |
| **G0 Structural** | Always, before delivering | `npm run check` in this repo, or the skill's own written pre-flight | Zero failures |
| **G1 Responsive** | Any page build | `scripts/verify/screenshots.mjs` at 390, 768, 1280, 1536 | No horizontal scroll, no overlap, no clipped CTA, hero fits at 390 |
| **G2 Accessibility** | Any page build | `scripts/verify/a11y.mjs` (axe-core) | Zero serious or critical violations. Zero, not "few" |
| **G3 Performance** | FINAL builds only | `scripts/verify/lighthouse.mjs` | Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95 |

### 6.A Honest reporting is HARD

- Report real numbers, from a real run, on a production build. Never a dev server.
- If a gate cannot run in this environment, say exactly that, name the gate, and list it as deferred. **Claiming a score you did not measure is a HARD violation of this contract**, worse than reporting a failing score.
- Report before and after when you fix a failure: `A11y: 4 serious -> 0 after labeling the filter inputs and raising the placeholder contrast`.

### 6.B DRAFT versus FINAL

- **DRAFT**: real structure, placeholder imagery, G0 and G1 only. Cheap, fast, made for choosing a direction.
- **FINAL**: all four gates. Run once, on the direction the user picked.

Label every output. A draft handed over as finished work is the same lie as an unmeasured score.

Commands, install notes, and what to do when a gate fails are in `reference/verification.md`.

---

## 7. SCOPE ROUTER (The Fix for Scope Blur)

These skills are for **marketing and brand surfaces**: landing pages, portfolios, product marketing pages, editorial and launch pages, and redesigns of those.

They are **not** a product UI system. When the task is a dashboard, an admin panel, a dense data table, a wizard, a settings surface, a code editor, or a native app, say so in one line, then reach for the real thing: Fluent, Carbon, Material, Atlassian, Polaris, Radix Primitives, TanStack Table, Apple HIG.

Mentioning a product design system inside a taste skill is allowed for exactly one purpose: routing a task away from the skill. It is never a licence to build a dashboard with these rules.

The full routing table, including the mixed cases (a marketing page with one embedded data view, a portfolio with a working demo app), is in `reference/scope-router.md`.

---

## 8. HONESTY RULES (HARD)

- Do not claim a measurement you did not take.
- Do not present a draft as final, or a comp as an implementation.
- Do not describe a generated logo as trademark-safe. That is a lawyer's call.
- Do not invent statistics, customer names, awards, or review quotes for a page. Placeholder content is labeled as placeholder.
- Do not claim a page is accessible because the rules were read. Claim it when the axe run is clean and say which run.
- When you skip a rule, say which one and why. An unexplained skip is a defect.

---

## 9. THE INHERITANCE LINE

Every other skill in this family carries this line near the top of its SKILL.md:

```text
Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.
```

If a skill in this family does not carry that line, it has not been updated to this contract and its bans should be read as PREFERENCE until it is.
