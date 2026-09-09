#!/usr/bin/env node
// Redesign regression diff. Compares two baseline captures and reports what changed
// in the surface that silently costs traffic and conversion tracking.
//
//   node scripts/verify/diff.mjs --before .verify/baseline --after .verify/after

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parseArgs, ok, bad, note, summarize } from "./lib.mjs";

const args = parseArgs(process.argv);
const beforeDir = String(args.before || ".verify/baseline");
const afterDir = String(args.after || ".verify/after");

for (const d of [beforeDir, afterDir]) {
  if (!existsSync(join(d, "page.json"))) {
    console.error(`missing ${join(d, "page.json")}. Run scripts/verify/baseline.mjs first.`);
    process.exit(2);
  }
}

const before = JSON.parse(readFileSync(join(beforeDir, "page.json"), "utf8"));
const after = JSON.parse(readFileSync(join(afterDir, "page.json"), "utf8"));

let failures = 0;
console.log("\nRedesign regression diff");

// --- SEO surface -----------------------------------------------------------
const seoFields = [
  ["title", before.title, after.title],
  ["canonical", before.canonical, after.canonical],
  ["meta description", before.metas?.description, after.metas?.description],
  ["og:title", before.metas?.["og:title"], after.metas?.["og:title"]],
  ["og:image", before.metas?.["og:image"], after.metas?.["og:image"]],
  ["robots", before.metas?.robots, after.metas?.robots],
  ["lang", before.lang, after.lang],
];

for (const [name, b, a] of seoFields) {
  if (b && !a) { bad(`${name} was present and is now missing`); failures++; }
  else if (!b && a) { note(`${name} added: ${String(a).slice(0, 80)}`); }
  else if (b !== a) { note(`${name} changed: "${String(b).slice(0, 50)}" -> "${String(a).slice(0, 50)}" (intentional?)`); }
  else if (b) { ok(`${name} unchanged`); }
}

// --- Headings --------------------------------------------------------------
if (after.h1Count !== 1) { bad(`h1 count is ${after.h1Count}, expected exactly 1`); failures++; }
else ok("exactly one h1");

const levels = after.headings.map((h) => h.level);
let skipped = false;
for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) skipped = true;
if (skipped) { bad("heading levels skip a step somewhere"); failures++; }
else ok("no skipped heading levels");

// --- Structured data -------------------------------------------------------
const bTypes = new Set(before.structured.flatMap((s) => [].concat(s["@type"] || [])));
const aTypes = new Set(after.structured.flatMap((s) => [].concat(s["@type"] || [])));
const lostTypes = [...bTypes].filter((t) => !aTypes.has(t));
if (lostTypes.length) { bad(`structured data types lost: ${lostTypes.join(", ")}`); failures++; }
else if (bTypes.size) ok(`structured data types preserved (${[...aTypes].join(", ")})`);

// --- Internal links --------------------------------------------------------
const internal = (l) => l.href && !/^(https?:)?\/\//.test(l.href) && !l.href.startsWith("#") && !l.href.startsWith("mailto:");
const bHrefs = new Set(before.links.filter(internal).map((l) => l.href));
const aHrefs = new Set(after.links.filter(internal).map((l) => l.href));
const lostLinks = [...bHrefs].filter((h) => !aHrefs.has(h));
if (lostLinks.length) {
  bad(`${lostLinks.length} internal link target(s) no longer linked from this page`);
  for (const h of lostLinks.slice(0, 10)) note(h);
  note("Each one needs a 301 to its replacement, or a reason it was intentionally dropped.");
  failures++;
} else ok("every internal link target still linked");

// --- Analytics hooks -------------------------------------------------------
const hookKey = (h) => Object.entries(h.attrs).map(([k, v]) => `${k}=${v}`).sort().join("|");
const bHooks = new Set(before.hooks.map(hookKey).filter(Boolean));
const aHooks = new Set(after.hooks.map(hookKey).filter(Boolean));
const lostHooks = [...bHooks].filter((h) => !aHooks.has(h));
if (lostHooks.length) {
  bad(`${lostHooks.length} analytics or test hook(s) disappeared`);
  for (const h of lostHooks.slice(0, 10)) note(h);
  note("This is the classic invisible redesign failure: the page looks better and stops reporting.");
  failures++;
} else if (bHooks.size) ok("analytics and test hooks preserved");

const lostEndpoints = before.analyticsRequests.filter((r) => !after.analyticsRequests.includes(r));
if (lostEndpoints.length) {
  bad(`analytics endpoints no longer called: ${lostEndpoints.join(", ")}`);
  failures++;
} else if (before.analyticsRequests.length) ok("analytics endpoints still called");

// --- Image alt coverage ----------------------------------------------------
const bCov = before.altCoverage, aCov = after.altCoverage;
const bRate = bCov.total ? bCov.withAlt / bCov.total : 1;
const aRate = aCov.total ? aCov.withAlt / aCov.total : 1;
if (aRate < bRate) { bad(`image alt coverage dropped from ${Math.round(bRate * 100)}% to ${Math.round(aRate * 100)}%`); failures++; }
else if (aCov.total && aRate < 1) { ok(`image alt coverage did not drop (${aCov.withAlt}/${aCov.total})`); note(`still below 100%: ${aCov.total - aCov.withAlt} image(s) without an alt attribute. Floor item, fix them.`); }
else ok(`image alt coverage ${Math.round(aRate * 100)}% (${aCov.withAlt}/${aCov.total})`);

console.log("\nNot covered here, check by hand: sitemap entries, redirect table, 404 behavior,");
console.log("conversion goals configured outside the page, and the axe and Lighthouse before/after numbers.");
summarize(failures, "Redesign diff");
