#!/usr/bin/env node
// G1 Responsive gate.
// Captures 390 / 768 / 1280 / 1536 and asserts the things that are checkable:
// no horizontal overflow, hero fits the first viewport, primary CTA visible
// without scrolling, nothing clipped past the right edge.
//
//   node scripts/verify/screenshots.mjs --url http://localhost:3000 [--out .verify/screens]

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { VIEWPORTS, parseArgs, requireUrl, optional, missing, ok, bad, note, summarize, launch } from "./lib.mjs";

const args = parseArgs(process.argv);
const url = requireUrl(args, "screenshots.mjs");
const outDir = String(args.out || ".verify/screens");

const playwright = await optional("playwright");
if (!playwright) missing("playwright", "npm i -D playwright && npx playwright install chromium");

mkdirSync(outDir, { recursive: true });

let failures = 0;
const browser = await launch(playwright);

console.log(`\nG1 Responsive: ${url}`);

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch (e) {
    bad(`${vp.name} (${vp.width}px): page did not load: ${e.message}`);
    failures++;
    await page.close();
    continue;
  }

  await page.screenshot({ path: join(outDir, `${vp.name}-${vp.width}.png`), fullPage: true });

  const report = await page.evaluate(() => {
    const doc = document.documentElement;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Elements that stick out past the right edge, ignoring intentionally hidden ones.
    const overflowing = [];
    for (const el of document.querySelectorAll("body *")) {
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden" || s.position === "fixed") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > vw + 1) {
        overflowing.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && String(el.className).slice(0, 60)) || "",
          overflowBy: Math.round(r.right - vw),
        });
      }
      if (overflowing.length >= 5) break;
    }

    // Hero: the first section-ish block, or the first heading's nearest section.
    const h1 = document.querySelector("h1");
    const heroEl = h1 ? (h1.closest("section, header, main > div") || h1.parentElement) : null;
    const heroBox = heroEl ? heroEl.getBoundingClientRect() : null;

    // First plausible primary action.
    const cta = document.querySelector(
      "main a[href]:not([href='#']), main button, header a[href]:not([href='#']), a[href]:not([href='#'])"
    );
    const ctaBox = cta ? cta.getBoundingClientRect() : null;

    return {
      scrollWidth: doc.scrollWidth,
      viewportWidth: vw,
      viewportHeight: vh,
      overflowing,
      heroHeight: heroBox ? Math.round(heroBox.height) : null,
      ctaTop: ctaBox ? Math.round(ctaBox.top) : null,
      ctaText: cta ? (cta.textContent || "").trim().slice(0, 40) : null,
    };
  });

  const label = `${vp.name} (${vp.width}px)`;

  if (report.scrollWidth > report.viewportWidth + 1) {
    bad(`${label}: horizontal overflow, scrollWidth ${report.scrollWidth} > viewport ${report.viewportWidth}`);
    for (const o of report.overflowing) note(`<${o.tag} class="${o.cls}"> overflows by ${o.overflowBy}px`);
    failures++;
  } else {
    ok(`${label}: no horizontal overflow`);
  }

  if (report.heroHeight !== null && report.heroHeight > report.viewportHeight * 1.15) {
    bad(`${label}: hero is ${report.heroHeight}px against a ${report.viewportHeight}px viewport`);
    failures++;
  } else if (report.heroHeight !== null) {
    ok(`${label}: hero fits the first viewport (${report.heroHeight}px)`);
  }

  if (report.ctaTop !== null && report.ctaTop > report.viewportHeight) {
    bad(`${label}: first action ("${report.ctaText}") sits below the fold at ${report.ctaTop}px`);
    failures++;
  }

  await page.close();
}

await browser.close();
console.log(`\nScreenshots written to ${outDir}. Look at them: the assertions above catch overflow, your eyes catch everything else.`);
summarize(failures, "G1 Responsive");
