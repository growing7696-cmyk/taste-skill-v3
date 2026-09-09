#!/usr/bin/env node
// G2 Accessibility gate. Runs axe-core at mobile and desktop widths.
// Bar: zero critical and zero serious violations. Not "few". Zero.
//
//   node scripts/verify/a11y.mjs --url http://localhost:3000 [--out .verify/a11y.json]

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { createRequire } from "node:module";
import { parseArgs, requireUrl, optional, missing, ok, bad, note, summarize, launch } from "./lib.mjs";

const require = createRequire(import.meta.url);
const args = parseArgs(process.argv);
const url = requireUrl(args, "a11y.mjs");
const out = String(args.out || ".verify/a11y.json");

const playwright = await optional("playwright");
if (!playwright) missing("playwright", "npm i -D playwright && npx playwright install chromium");

let axeSource = null;
try { axeSource = require("axe-core").source; }
catch { missing("axe-core", "npm i -D axe-core"); }

const widths = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
];

const browser = await launch(playwright);
const results = {};
let failures = 0;

console.log(`\nG2 Accessibility: ${url}`);

for (const vp of widths) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.addScriptTag({ content: axeSource });

  const res = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return await axe.run(document, {
      resultTypes: ["violations"],
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
    });
  });

  const byImpact = { critical: [], serious: [], moderate: [], minor: [] };
  for (const v of res.violations) (byImpact[v.impact] || byImpact.minor).push(v);

  results[vp.name] = res.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
  }));

  const blocking = byImpact.critical.length + byImpact.serious.length;
  const label = `${vp.name} (${vp.width}px)`;

  if (blocking > 0) {
    bad(`${label}: ${byImpact.critical.length} critical, ${byImpact.serious.length} serious`);
    for (const v of [...byImpact.critical, ...byImpact.serious]) {
      note(`${v.impact}: ${v.id} - ${v.help}`);
      for (const n of v.nodes.slice(0, 2)) note(`   at ${n.target.join(" ")}`);
    }
    failures += blocking;
  } else {
    ok(`${label}: 0 critical, 0 serious`);
  }

  if (byImpact.moderate.length || byImpact.minor.length) {
    note(`${label}: ${byImpact.moderate.length} moderate, ${byImpact.minor.length} minor (not blocking, still list them in the report)`);
    for (const v of [...byImpact.moderate, ...byImpact.minor]) note(`   ${v.impact}: ${v.id} - ${v.help}`);
  }

  await page.close();
}

await browser.close();
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(results, null, 2));
console.log(`\nFull results: ${out}`);
console.log("Reminder: axe covers roughly a third of the accessibility floor. The manual items in");
console.log("skills/_core/reference/accessibility-floor.md still need the written pass.");
summarize(failures, "G2 Accessibility");
