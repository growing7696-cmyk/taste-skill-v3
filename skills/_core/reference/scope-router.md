# Scope Router

What this family is for, what it is not for, and how to handle the mixed cases without quietly building a dashboard out of landing-page rules.

---

## 1. In scope

Marketing and brand surfaces:

- Landing pages: SaaS, consumer, agency, event, launch.
- Portfolios: developer, designer, studio.
- Product marketing pages, pricing pages, about pages, careers pages.
- Editorial and blog surfaces, changelogs, manifestos.
- Redesigns of any of the above.
- Brand identity artifacts (`taste-brandkit`).

## 2. Out of scope, with the correct destination

| Task | Route to |
| --- | --- |
| Dashboard, analytics, admin panel | Fluent, Carbon, Atlassian Design System, Polaris, or the product's own system |
| Dense data tables, sorting, filtering, virtualization | TanStack Table, AG Grid |
| Multi-step forms, wizards, complex validation | The project's form library and design system patterns |
| Settings, permissions, account management | The product design system |
| Code editors, terminals, diff views | Monaco, CodeMirror, and their own theming |
| Native mobile app UI | Apple HIG, Material 3 |
| Realtime collaboration UI: presence, cursors, conflict states | A different problem class entirely |
| Email templates | Email-specific constraints; almost nothing here transfers |
| Accessibility remediation of an existing product | Start from the audit, not from an aesthetic |

**When routing away, say it in one line and keep going with whatever part is in scope.** Do not refuse the whole task, and do not silently apply these rules anyway.

## 3. Why the product design systems are named at all

They appear in these skills for exactly one purpose: to route a task **away** from the family. Naming Fluent or Carbon inside a taste skill is not permission to build a dashboard with taste rules. If a section of a taste skill reads like guidance for building product UI, it is a scope leak and should be cut back to a routing line.

## 4. The mixed cases

**A marketing page with one embedded data view** (a live pricing calculator, a status widget, a small chart).

Taste rules own the page. The embedded view follows product-UI conventions: real labels, real states, accessible table or chart semantics, no decorative fake data. Say which is which.

**A portfolio containing a working demo app.**

Taste rules own the portfolio shell. The demo is a product surface and gets product rules. Do not let the portfolio's motion budget leak into the demo.

**A dashboard whose marketing shell needs a refresh.**

Split the work: shell, navigation chrome, empty states, onboarding, sign-in, and upgrade prompts are in scope. The data surfaces are not. Deliver the split explicitly before starting.

**A design system being built from scratch.**

Out of scope for the engine and the style skills. `taste-brandkit` covers brand identity tokens: color, type, logo, usage. Component architecture, API design, documentation site, and testing strategy are a different discipline and should be said out loud rather than improvised.

## 5. The one-line scope declaration

Every build states scope in its output header, and states it before the design read when the task is near a boundary:

```text
SCOPE: in scope (SaaS landing page)
SCOPE: split. Marketing shell and empty states in scope. Table view routed to the product design system.
SCOPE: out of scope (admin data table). Recommending TanStack Table plus the existing system. Applying only the empty-state and typography guidance.
```
