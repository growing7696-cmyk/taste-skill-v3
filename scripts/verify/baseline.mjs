#!/usr/bin/env node
// Redesign baseline capture. Run BEFORE any change, then again after, then diff.
// Captures the surface that a redesign silently breaks: URLs, meta, headings,
// structured data, analytics wiring, image alt coverage, and link targets.
//
//   node scripts/verify/baseline.mjs --url https://example.com --out .verify/baseline

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs, requireUrl, optional, missing, ok, note, launch } from "./lib.mjs";

const args = parseArgs(process.argv);
const url = requireUrl(args, "baseline.mjs");
const outDir = String(args.out || ".verify/baseline");

const playwright = await optional("playwright");
if (!playwright) missing("playwright", "npm i -D playwright && npx playwright install chromium");

mkdirSync(outDir, { recursive: true });

const browser = await launch(playwright);
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const requests = [];
page.on("request", (r) => {
  const u = r.url();
  if (/google-analytics|googletagmanager|segment|plausible|posthog|mixpanel|amplitude|hotjar|clarity|matomo|fathom/i.test(u)) {
    requests.push(u.split("?")[0]);
  }
});

console.log(`\nBaseline capture: ${url}`);
const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

const data = await page.evaluate(() => {
  const attr = (sel, name) => document.querySelector(sel)?.getAttribute(name) ?? null;
  const metas = {};
  for (const m of document.querySelectorAll("meta[name], meta[property]")) {
    const k = m.getAttribute("name") || m.getAttribute("property");
    metas[k] = m.getAttribute("content");
  }

  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    level: Number(h.tagName[1]),
    text: (h.textContent || "").trim().slice(0, 120),
  }));

  const structured = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    try { return JSON.parse(s.textContent || "{}"); } catch { return { parseError: true }; }
  });

  const links = [...document.querySelectorAll("a[href]")].map((a) => ({
    href: a.getAttribute("href"),
    text: (a.textContent || "").trim().slice(0, 60),
  }));

  const images = [...document.querySelectorAll("img")];
  const altCoverage = {
    total: images.length,
    withAlt: images.filter((i) => i.hasAttribute("alt")).length,
    emptyAlt: images.filter((i) => i.getAttribute("alt") === "").length,
  };

  // Elements that look like analytics hooks, so a rename shows up in the diff.
  const hooks = [...document.querySelectorAll("[data-analytics],[data-event],[data-track],[data-testid],[data-gtm]")]
    .map((el) => ({
      tag: el.tagName.toLowerCase(),
      attrs: Object.fromEntries(
        [...el.attributes]
          .filter((a) => /^data-(analytics|event|track|testid|gtm)/.test(a.name))
          .map((a) => [a.name, a.value])
      ),
      text: (el.textContent || "").trim().slice(0, 40),
    }));

  return {
    title: document.title,
    lang: document.documentElement.getAttribute("lang"),
    canonical: attr('link[rel="canonical"]', "href"),
    metas,
    headings,
    h1Count: document.querySelectorAll("h1").length,
    structured,
    links,
    altCoverage,
    hooks,
  };
});

const baseline = {
  url,
  capturedAt: new Date().toISOString(),
  status: response?.status() ?? null,
  ...data,
  analyticsRequests: [...new Set(requests)],
};

writeFileSync(join(outDir, "page.json"), JSON.stringify(baseline, null, 2));
await page.screenshot({ path: join(outDir, "page-1280.png"), fullPage: true });
await page.close();
await browser.close();

ok(`captured: ${baseline.headings.length} headings, ${baseline.links.length} links, ${baseline.hooks.length} analytics hooks, ${baseline.analyticsRequests.length} analytics endpoints`);
note(`written to ${outDir}/page.json`);
note("Run this again after the redesign, into a different --out, then: npm run verify:diff");
console.log("\nStill to capture by hand if this environment cannot: sitemap, redirect table, 404 behavior,");
console.log("and the conversion goals configured outside the page. Say which parts are missing.");
