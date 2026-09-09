# Multi-variant + performance-gated prompt (v3 exclusive)

This prompt uses the two things the base skill cannot do: three directions from one brief (Section 1.6) and a measured performance guarantee on the chosen one (Section 15). Paste after the v3 skill is loaded.

## Prompt

```
I have loaded taste-skill v3 (design-taste-frontend-v3) as my only source of design rules.

MODE: variants (3)

Brief:
- Page kind: <landing / portfolio / marketing>
- Product: <name and one-line description>
- Audience: <who reads this, concrete adjectives>
- Vibe words: <2 to 4 concrete adjectives>
- References: <real URLs or product names>
- Avoid: <slop patterns to not default to>

Step 1. One Design Read and one set of dials for the brief. Stop.

Step 2 (after my OK). Post THREE Layout Casts (Variant A/B/C), each with a different layout seed and a different hero paradigm, as one comparison table. No two variants share a hero family; each differs on at least two axes (hero, structural spine, dial posture). Stop.

Step 3 (after my OK). Build all three at DRAFT fidelity (real structure and layout, Picsum images, no production build, no full audit). Then post the Section 1.6.C comparison table (hero / spine / dial posture / best-for / trade-off) and a one-paragraph recommendation. Stop.

Step 4 (after I pick one). Take the chosen variant to FINAL fidelity:
- Full Pre-Flight Check (Section 14), every box Pass or Fail.
- Performance Gate (Section 15): production build, run Lighthouse, report real Performance / A11y / Best Practices / SEO plus LCP / CLS / TBT. If Performance < 90 or any of A11y/BP/SEO < 95, fix the specific failing metric, rebuild, re-measure, and report the before to after numbers. If Lighthouse cannot run here, say so explicitly and list the deferred checks rather than claiming a score.

Any Fail blocks completion.
```

## Notes

- The draft-first flow is deliberate: building three full pages with full audits is expensive, so the variants are cheap drafts and only the winner pays for the gate.
- The recommendation in Step 3 is a suggestion. You choose in Step 4.
- The performance numbers in Step 4 are measured, not asserted. That is the whole point of the gate: a green-tier score you can trust, or an explicit statement that it was not measured.
