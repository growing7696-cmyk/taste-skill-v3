# Precedence: Worked Conflicts

The ladder from `SKILL.md` Section 2, applied to the collisions that actually happen. Lower level number wins.

```text
L1 safety / law / licensing
L2 accessibility floor
L3 explicit user instruction
L4 existing project reality (design system, brand tokens, repo conventions)
L5 active style skill
L6 engine defaults
L7 model preference
```

---

## 1. Two style skills look applicable

**Case.** The brief says "clean and premium". `taste-minimal` wants flat surfaces, hairline borders, no shadow. `taste-soft` wants layered elevation and a bezel on the primary card.

**Resolution.** Both sit at L5, so the ladder cannot separate them. Pick one, in writing, using this order:

1. If the brief names a reference product or site, pick the skill whose surface matches it.
2. If the project has brand tokens with an elevation scale, `taste-soft`. If its tokens have no shadows at all, `taste-minimal`.
3. If neither, pick by audience: dense information and trust-first audiences get `taste-minimal`, consumer and product-launch audiences get `taste-soft`.

Then say so: `STYLE: taste-minimal (taste-soft lost: brand tokens define no elevation scale)`.

**Never** blend them. A flat page with one bezelled card looks like a mistake, not a hybrid.

---

## 2. The brand ships a banned thing

**Case.** `tailwind.config.ts` sets `fontFamily.sans` to Inter. The engine bans Inter.

**Resolution.** L4 beats L6. Keep Inter. Log it:

```text
OVERRIDE: Inter is an engine DEFAULT ban -> keeping Inter (source: L4, tailwind.config.ts fontFamily.sans)
```

Then spend the taste budget where the brand is silent: type scale, measure, rhythm, layout cast, density, copy. A page can be excellent in Inter. It cannot be excellent while fighting its own design system.

Same shape for a brand gradient, a brand serif, a three-column card grid that is the design system's own grid, and `rounded-full` when the radius token set is fully round.

---

## 3. The user asked for a banned thing

**Case.** "Make the hero centered over a dark background."

**Resolution.** L3 beats L6. Build it. Log it. Then apply the skill where it still helps: the centered hero still has a two-line headline cap, a real visual, a legible CTA, and a contrast-checked overlay.

The wrong move is a lecture followed by an off-brief page. The other wrong move is silent compliance that drops every other rule because one was overridden.

---

## 4. The aesthetic breaks accessibility

**Case.** `taste-brutal` industrial mode wants 10px monospace body text over a scanline overlay. `taste-soft` wants glass panels with 40 percent white text over a photograph.

**Resolution.** L2 beats L5, always, and this is the collision the floor exists for. Fix the surface, keep the intent:

- Raise body to 16px, keep the monospace and the tight tracking. The look survives.
- Cap overlay opacity, add a solid scrim behind the text, or move the text off the busiest region. Measure the contrast; do not eyeball it.

If the style cannot survive the fix, the style was not usable for that content, and saying so is the correct output.

---

## 5. The task is out of scope but wearing a marketing hat

**Case.** "Redesign our admin dashboard so it looks like our landing page."

**Resolution.** L1 to L4 are silent, so the scope router decides. Split the task:

- Shell, marketing surfaces, empty states, onboarding, and the sign-in page: taste skills apply.
- Tables, filters, bulk actions, forms, settings, and anything with dense state: route to a product design system and say so.

Deliver the split explicitly. A dashboard built out of landing-page rules is the single most expensive failure in this family.

---

## 6. A workflow skill and a style skill disagree

**Case.** `taste-redesign` says preserve the existing structure. `taste-soft` wants nested elevation the existing site does not have.

**Resolution.** Workflow skills constrain, style skills decorate. In preserve mode the existing structure is L4 project reality, so it wins. Apply the style only to surface treatment inside the preserved structure, and state the ceiling: `STYLE: taste-soft, surface only, structure preserved`.

In overhaul mode, structure is explicitly released by the user (L3), and the style skill regains its normal range.

---

## 7. Nothing in the ladder settles it

Then it is a real design choice, not a rule conflict. Make it, state it in one line with the reason, and move on. The ladder exists to end arguments about rules, not to remove judgement.
