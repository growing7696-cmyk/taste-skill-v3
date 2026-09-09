# Asset Budget

Image generation is a cost: quota, wall-clock time, and money. "One image per section, always, no exceptions" spends that cost on tasks that never needed a single image. This file replaces the mandate with a budget.

---

## 1. The four tiers

| Tier | Volume | What it buys |
| --- | --- | --- |
| **NONE** | 0 generated | Existing assets, real photography URLs, or labeled placeholder slots |
| **SPOT** | 1 to 3 | A hero and up to two supporting visuals. Enough to make a page feel real |
| **SECTION** | 1 per section that needs a distinct visual | A visual direction pass across a whole page |
| **FULL** | Every section plus detail and state views | A comp set the user explicitly asked for |

Default for a new page build: **SPOT**. Default for any edit to an existing page: **NONE**.

---

## 2. Decision matrix

| Task | Budget | Why |
| --- | --- | --- |
| Fix a CSS bug, adjust spacing, change a color | NONE | Nothing visual is being decided |
| Copy or content change | NONE | Same |
| Accessibility or performance work | NONE | Generation adds weight to a task that is about removing it |
| Any change under roughly 50 lines | NONE | The cost exceeds the benefit |
| Project already has a photo library, brand assets, or a DAM | NONE | Use what exists. Generating alongside real brand photography produces a mismatched page |
| Existing design system with defined imagery rules | NONE or SPOT | The system already answers the visual question |
| New landing page, no assets available | SPOT | Hero plus two carries a page |
| User asks for a visual direction or a look-and-feel pass | SECTION | This is the task where per-section imagery is the deliverable |
| User asks for full comps, a pitch deck of screens, or a design exploration | FULL | They asked, and they know the cost |
| Redesign in preserve mode | NONE | Existing assets are the constraint |
| Redesign in overhaul mode | SPOT | Unless the user asks for more |

---

## 3. Rules at every tier

1. **Declare before generating.** The output header carries the tier and the planned count. If cost or quota is knowable, say it.
2. **No silent escalation.** Moving up a tier needs a sentence of justification. More than doubling the planned count is the user's decision, not yours.
3. **Reuse first.** One generated image, cropped and treated differently, serves several slots. Regenerating for a variation you can achieve with a crop, a filter, or a mask is waste.
4. **Generated images are references, not the product.** Unless the deliverable is explicitly imagery, the image informs composition, hierarchy, and spacing, and the implementation writes real markup and real text.
5. **Never bake critical text into an image.** Value proposition, price, CTA, navigation, and legal text are markup. This is an accessibility floor item, not a preference.
6. **Ship a mobile-shaped frame.** Any comp set includes at least one portrait or narrow frame. A wall of 16:9 desktop crops hides every layout failure that matters.
7. **State the art direction once.** Lighting, palette, lens, texture, and subject treatment are declared once and reused verbatim across every generation in the set. Consistency comes from a fixed prompt spine, not from luck.
8. **Placeholders are honest.** When the budget is NONE and no asset exists, use a seeded placeholder service or a labeled slot, and list what the page still needs: `Needs: hero product photo 1600x1200, one lifestyle shot 1200x800`.

---

## 4. Failure modes this prevents

- **The 8-image landing page for a one-line copy fix.** Prevented by the NONE default on edits.
- **The quota wall halfway through a set.** Prevented by declaring the count first.
- **The page where every image is a different world.** Prevented by the fixed art direction spine.
- **The comp set that cannot be built.** Prevented by requiring a spec handoff alongside images: the imagegen skills produce a token and spacing table with the imagery, not pictures alone.
- **The beautiful hero with unreadable baked-in text.** Prevented by the text-is-text rule.
