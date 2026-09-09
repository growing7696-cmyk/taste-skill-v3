---
name: taste-redesign
description: Workflow skill for upgrading an existing site or app without breaking it. Audit-first, with a captured baseline of SEO, analytics, accessibility, and performance that gets diffed after the work, jurisdiction-aware compliance checks instead of blanket legal assumptions, and a rollback plan. Composes with the engine and one style skill.
---

# taste-redesign: Audit, Change, Prove Nothing Broke

Inherits `skills/_core/SKILL.md`: precedence ladder, rule tiers, accessibility floor, asset budget, verification gates.
Rules below are DEFAULT tier unless marked HARD.

This is a **workflow skill**. It composes with the engine and at most one style skill. In preserve mode it constrains that style skill; see `_core/reference/precedence.md` Section 6.

A redesign is not a greenfield build with extra steps. The site already works, already ranks, already converts at some rate, and the failure mode is not an ugly page, it is a beautiful page that lost half its organic traffic.

---

## 1. Mode, declared first

- **Preserve**: visual and interaction upgrade inside the existing structure. Information architecture, URLs, nav labels, and content stay. Default when the user says "modernize", "polish", "clean up".
- **Overhaul**: structure is released. IA, slugs, and nav labels still carry over unless the user explicitly retires them, because those are SEO assets. Default when the user says "redesign from scratch" or "rebuild".

Say which mode, and what it means for this specific site, before touching anything.

---

## 2. Capture the baseline (HARD, before any change)

Nothing gets edited until the baseline exists. This is the single step that separates a redesign from a gamble.

```bash
npm run verify:baseline -- --url <live-url> --out .verify/baseline
```

The baseline captures, per page in scope:

- **SEO surface**: `title`, meta description, canonical, `robots`, Open Graph and Twitter tags, `h1` and heading outline, structured data blocks, internal link targets, image `alt` coverage.
- **Routing**: the URL list, existing redirects, sitemap entries, and the 404 behavior.
- **Analytics**: every event name, tag manager container, and conversion goal wired into the current pages, plus the elements they fire from.
- **Accessibility**: an axe run, saved as JSON, so the after-state can be compared rather than asserted.
- **Performance**: a Lighthouse run on the production site.
- **Screenshots**: 390, 768, 1280, 1536, full page.

If the tooling cannot run in this environment, capture what you can by reading the source and say explicitly which parts of the baseline are missing. A redesign with no baseline is possible, but the user should know they are flying without instruments.

---

## 3. Audit

Read the codebase first: framework, styling method, component structure, token source, dependency list. Work with that stack. **HARD**: do not migrate frameworks or styling systems as part of a redesign unless the user asked for a migration.

Then diagnose. The full audit checklist, grouped by area, lives in `reference/audit-checklist.md`. It covers typography, color and surface, layout, states and interactivity, content, components, iconography, code quality, and the things AI-built sites systematically forget.

Output the diagnosis as a list of findings with a severity and a fix, not as prose. Findings that touch the accessibility floor are fixed first and are not negotiable against aesthetics.

---

## 4. Jurisdiction-aware compliance (the fix for blanket legal rules)

The old version of this skill told every site to add a cookie banner and legal links. That is wrong often enough to be dangerous: it adds a consent banner to sites that do not need one, in jurisdictions where the specific banner pattern is itself non-compliant, and it implies legal coverage the page does not have.

**HARD**: never assert that a site is compliant. That is a lawyer's call, not a design skill's.

Instead:

1. **Ask or infer the jurisdiction and audience.** EU or UK, California, Brazil, Korea, and "internal tool behind a login" all have different answers.
2. **Check what already exists.** Many sites already have consent handled at the tag-manager level. Adding a second banner is a defect.
3. **Report, do not install.** Produce a findings line: `No consent mechanism detected; the site sets analytics cookies and serves EU traffic. This likely needs consent before those scripts load. Recommend confirming with counsel.`
4. **Only implement when asked**, and when implementing, wire it to actually gate the scripts it claims to gate. A banner that sets a flag while the analytics tag already fired is worse than no banner, because it looks like compliance.

The same posture applies to accessibility statements, terms and privacy links, age gates, and regional pricing disclosures: detect, report, recommend, implement on request.

---

## 5. Fix order

Highest impact for lowest risk, and it is deliberately not "start with the hero":

1. Accessibility floor violations found in the baseline axe run.
2. Type system: face, scale, measure, weights.
3. Color and surface cleanup: one accent, one gray family, no pure black canvas.
4. States: hover, active, focus, empty, loading, error.
5. Layout and spacing: container, grid, rhythm, alignment across sibling cards.
6. Component replacement: the generic patterns named in the audit checklist.
7. Motion and polish.

Keep changes reviewable. Small, targeted commits beat one enormous rewrite that nobody can bisect.

---

## 6. Prove nothing broke (HARD)

After the work, run the same capture and diff it:

```bash
npm run verify:baseline -- --url <new-url> --out .verify/after
npm run verify:diff -- --before .verify/baseline --after .verify/after
```

The diff report must show, explicitly:

- **URLs**: every baseline URL still resolves, or has a 301 to its replacement. A removed URL with no redirect is a regression, full stop.
- **Titles, descriptions, canonicals, structured data**: changed intentionally or unchanged. An accidental blank meta description is the classic redesign traffic loss.
- **Heading outline**: still has one `h1` per page and no skipped levels.
- **Analytics**: every baseline event still fires from an element that still exists. A redesign that renames the CTA class and silently kills conversion tracking is the most common invisible failure of this workflow.
- **Accessibility**: violations count went down, never up.
- **Performance**: Lighthouse categories at or above baseline, and above the `_core` G3 bars on a final build.

Report the diff as a table with before and after values. "Looks fine" is not a diff.

---

## 7. Rollback plan

Every redesign delivery includes, in one short block:

- What changed, by file or route.
- How to revert (branch, tag, or commit range).
- Which changes are behavior-affecting versus purely visual.
- What is still deferred, and why.

---

## 8. Pre-flight additions

- [ ] Mode declared, and the user agreed with the interpretation?
- [ ] Baseline captured before the first edit, or the missing parts named?
- [ ] Existing stack preserved, no unrequested migration?
- [ ] Accessibility violations from the baseline all resolved, count strictly down?
- [ ] URL, meta, structured data, and analytics diff produced and clean?
- [ ] Compliance items reported with jurisdiction reasoning, not installed by reflex or claimed as compliant?
- [ ] Performance at or above baseline?
- [ ] Rollback plan included?
