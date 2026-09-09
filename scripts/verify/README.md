# scripts/verify

Runnable checks behind the `_core` verification gates. The point is that a gate produces a number from a real run, not a checkbox the model ticks about its own work.

## Install

The tools are optional dependencies so this repo stays installable without them:

```bash
npm i -D playwright axe-core lighthouse chrome-launcher
npx playwright install chromium
```

If a tool is missing, the script says so and exits with code **3**, which means "could not run". It never prints a pass it did not earn.

Two environment variables help in sandboxes that already ship a browser:

```bash
export PLAYWRIGHT_CHROMIUM_PATH=/path/to/chromium   # used by the playwright-based scripts
export CHROME_PATH=/path/to/chrome                  # required by chrome-launcher for Lighthouse
```

Exit codes: `0` pass, `1` fail, `2` bad usage, `3` could not run.

## Gates

| Gate | Command | Bar |
| --- | --- | --- |
| G1 Responsive | `npm run verify:screens -- --url <url>` | No horizontal overflow at 390 / 768 / 1280 / 1536, hero fits, first action above the fold |
| G2 Accessibility | `npm run verify:a11y -- --url <url>` | Zero critical, zero serious |
| G3 Performance | `npm run verify:lighthouse -- --url <url>` | Perf >= 90, A11y / BP / SEO >= 95, production build only |

## Redesign regression

```bash
npm run verify:baseline -- --url https://live-site.example --out .verify/baseline
# ... do the redesign ...
npm run verify:baseline -- --url http://localhost:3000 --out .verify/after
npm run verify:diff -- --before .verify/baseline --after .verify/after
```

The diff reports the surface a redesign breaks quietly: title, description, canonical, Open Graph, structured data types, internal link targets, analytics hooks and endpoints, heading structure, and image alt coverage.

## What these do not cover

Roughly two thirds of the accessibility floor is not automatable: keyboard order, focus visibility on custom controls, reduced-motion behavior, hover-only content, contrast of text over imagery, state design, and text expansion. Those stay in the written pre-flight. See `skills/_core/reference/accessibility-floor.md`, where each item is marked `[auto]` or `[manual]`.

Output goes to `.verify/`, which is gitignored.
