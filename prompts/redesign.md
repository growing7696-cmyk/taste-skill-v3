# Redesign prompt (existing site)

Paste this after the v3 skill is loaded. The agent audits first, declares the mode, casts against the existing structure (not from scratch), then implements without silently breaking URLs or brand.

## Blank prompt (fill the brief)

```
I have loaded taste-skill v3 (design-taste-frontend-v3) as my only source of design rules.

Brief:
- Site: <URL or repo path>
- Mode: <preserve brand / overhaul / unsure>
- Audience: <who reads this>
- What works today: <2 to 3 specifics to keep>
- What is broken today: <2 to 3 specifics to fix>
- SEO constraint: <routes, headings, or anchors that must not change>

Step 1. Run the Section 11.B audit:
- Brand tokens in use (primary, accent, type stack, radii)
- Information architecture (page tree, nav, conversion paths)
- Patterns to preserve, patterns to retire
- Inferred dials of the current site (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY)
- Current layout inventory: list the layout family of every existing section, and flag repeats
- SEO baseline (ranking pages, titles, anchors)
Post the audit in writing. Stop.

Step 2 (after my OK). Declare the mode. Then LAYOUT CAST against the audited structure (Section 1.5.E), not from scratch:
- Preserve mode: keep the existing hero paradigm and section order, use the cast to retire repeated families and introduce at most one structural-variety family
- Overhaul mode: cast fresh as greenfield, but keep IA, slugs, nav labels
Post the cast and the modernisation levers (Section 11.D) you will apply, in priority order. Stop.

Step 3 (after my OK). Implement. Keep URL structure, primary nav labels, form field names, brand logo, and legal copy unchanged unless I explicitly approve a change.

Step 4. Run in writing:
- Layout Cast audit (families before vs after, confirm repeats retired)
- Em-dash audit
- Pre-Flight Check (Section 14)
- Preservation audit: list every URL, nav label, form field, anchor changed. Empty unless I approved.
- Brand fidelity audit: brand accent, type stack, logo treatment survived.

Any Fail blocks completion.
```

## Note on redesigns

v3 casting behaves differently on a redesign than on a greenfield build. In Preserve mode the cast is a scalpel: it retires the families that repeat and adds at most one structural-variety section, so the page is modernized without being silently rebuilt. In Overhaul mode it casts fresh, but the preservation rules in Section 11.F (URLs, nav labels, form fields, logo, legal copy) still hold. If the audit shows the current site already has healthy layout variety, do not add structural-variety families just to hit a number; the floor is for pages that are too uniform, not a quota to force onto pages that are already fine.
