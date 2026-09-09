#!/usr/bin/env node
// G3 Performance gate. FINAL builds only, production server only.
// Bars: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95.
//
//   node scripts/verify/lighthouse.mjs --url http://localhost:3000 [--out .verify/lighthouse.json]

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { parseArgs, requireUrl, optional, missing, ok, bad, note, summarize } from "./lib.mjs";

const args = parseArgs(process.argv);
const url = requireUrl(args, "lighthouse.mjs");
const out = String(args.out || ".verify/lighthouse.json");

const lighthouseMod = await optional("lighthouse");
const launcherMod = await optional("chrome-launcher");
if (!lighthouseMod || !launcherMod) {
  missing("lighthouse / chrome-launcher", "npm i -D lighthouse chrome-launcher");
}

const lighthouse = lighthouseMod.default || lighthouseMod;
const chromeLauncher = launcherMod.default || launcherMod;

const BARS = { performance: 90, accessibility: 95, "best-practices": 95, seo: 95 };

console.log(`\nG3 Performance: ${url}`);
console.log("Reminder: this number is meaningless against a dev server. Production build only.");

let chrome;
try {
  chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
} catch (e) {
  missing(`a Chrome binary (${e.message})`, "install Chrome or Chromium, or run this gate elsewhere");
}

const runnerResult = await lighthouse(url, {
  port: chrome.port,
  output: "json",
  logLevel: "error",
  onlyCategories: Object.keys(BARS),
});
await chrome.kill();

const lhr = runnerResult.lhr;
let failures = 0;
const scores = {};

for (const [cat, bar] of Object.entries(BARS)) {
  const score = Math.round((lhr.categories[cat]?.score ?? 0) * 100);
  scores[cat] = score;
  const label = `${lhr.categories[cat]?.title ?? cat}: ${score} (bar ${bar})`;
  if (score < bar) { bad(label); failures++; } else { ok(label); }
}

const m = lhr.audits;
note(`LCP ${m["largest-contentful-paint"]?.displayValue ?? "n/a"}   CLS ${m["cumulative-layout-shift"]?.displayValue ?? "n/a"}   TBT ${m["total-blocking-time"]?.displayValue ?? "n/a"}`);
note(`Conditions: ${lhr.configSettings?.formFactor ?? "unknown"} form factor, ${lhr.configSettings?.throttlingMethod ?? "unknown"} throttling, lighthouse ${lhr.lighthouseVersion}`);

if (scores.accessibility < BARS.accessibility) {
  console.log("\nAccessibility is short. Run `npm run verify:a11y` for the specific violations;");
  console.log("Lighthouse reports the score, axe reports what to fix.");
}

if (scores.performance < BARS.performance) {
  console.log("\nWhen Performance is short, fix in this order:");
  console.log("  1. LCP image: prioritized, correctly sized, modern format");
  console.log("  2. CLS: reserve aspect ratios, control font swap");
  console.log("  3. TBT: lazy-load motion and 3D, keep interactivity in client leaves");
  console.log("  4. Render-blocking resources not needed for first paint");
  console.log("Fix the failing metric, rebuild, re-measure, and report the delta.");
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(lhr, null, 2));
console.log(`\nFull report: ${out}`);
summarize(failures, "G3 Performance");
