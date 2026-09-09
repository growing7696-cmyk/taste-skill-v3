#!/usr/bin/env node
// taste-brutal repo check. Run with: npm run check
// Zero dependencies. Exits non-zero if any check fails, so it can gate a commit or CI.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_DIR = join(ROOT, "skills", "taste-brutal");
const SKILL_MD = join(SKILL_DIR, "SKILL.md");
const BLOCKS_DIR = join(SKILL_DIR, "blocks");
const ORIG_CLAUDE = join(ROOT, "for-original-taste-skill", "CLAUDE.md");

const EM_DASH = "\u2014";
const EN_DASH = "\u2013";

let failures = 0;
let checks = 0;
const fail = (msg) => { failures++; console.log(`  \u2717 ${msg}`); };
const pass = (msg) => { console.log(`  \u2713 ${msg}`); };
const section = (name) => console.log(`\n${name}`);

// Walk all .md files under a dir
function mdFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...mdFiles(p));
    else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

const rel = (p) => p.replace(ROOT + "/", "");

// ---------------------------------------------------------------------------
// 1. Em-dash / en-dash ban across every .md in the repo
// ---------------------------------------------------------------------------
section("1. Em-dash ban (the skill's own #1 rule)");
{
  // A dash inside inline code (`...`) or right after a U+XXXX code point label is the
  // skill DOCUMENTING its own em-dash ban, not using one. Strip those before checking,
  // so we only flag real prose separators.
  const stripAllowed = (line) =>
    line
      .replace(/`[^`]*`/g, "")               // inline code spans
      .replace(/U\+201[34]\)?/g, "");         // "U+2014" / "U+2013" labels
  const all = mdFiles(ROOT).filter((p) => !p.includes("/node_modules/") && !p.includes("/.git/"));
  let clean = true;
  for (const f of all) {
    checks++;
    const lines = readFileSync(f, "utf8").split("\n");
    const hits = [];
    lines.forEach((l, i) => {
      const s = stripAllowed(l);
      if (s.includes(EM_DASH) || s.includes(EN_DASH)) hits.push(i + 1);
    });
    if (hits.length) {
      clean = false;
      fail(`${rel(f)} uses a real em/en-dash separator at line(s) ${hits.join(", ")}`);
    }
  }
  if (clean) pass(`${all.length} markdown files, no prose em/en-dash separators`);
}

// ---------------------------------------------------------------------------
// 2. SKILL.md internal section references must exist
// ---------------------------------------------------------------------------
section("2. SKILL.md section references resolve");
{
  checks++;
  const txt = readFileSync(SKILL_MD, "utf8");
  // headers actually present: "## 1.5 ...", "## 14. ...", "### 1.5.A ..."
  const present = new Set();
  for (const m of txt.matchAll(/^#+\s+(\d+(?:\.\d+)?(?:\.[A-Z])?)\b/gm)) present.add(m[1].replace(/\.$/, ""));
  for (const m of txt.matchAll(/^#+\s+(Appendix [ABC])\b/gm)) present.add(m[1]);
  // references like "Section 1.5.C" or "Section 14"
  const refs = new Set();
  for (const m of txt.matchAll(/Section\s+(\d+(?:\.\d+)?(?:\.[A-Z])?)\b/g)) refs.add(m[1].replace(/\.$/, ""));
  const missing = [...refs].filter((r) => {
    // a ref like 1.5.C resolves if 1.5.C or its parent 1.5 header exists
    if (present.has(r)) return false;
    const parent = r.split(".").slice(0, 2).join(".");
    return !present.has(parent) && !present.has(r.split(".")[0]);
  });
  if (missing.length) fail(`SKILL.md references missing sections: ${missing.join(", ")}`);
  else pass(`all ${refs.size} distinct "Section X" references resolve to real headers`);
}

// ---------------------------------------------------------------------------
// 3. Block files honor the 8-part contract + frontmatter
// ---------------------------------------------------------------------------
section("3. Block files honor the Section 12 contract");
{
  const REQUIRED_FM = ["name:", "category:", "dial_compatibility:", "when_to_use:", "not_for:", "stack:"];
  const blocks = mdFiles(BLOCKS_DIR);
  if (blocks.length === 0) fail("no block files found under blocks/");
  for (const f of blocks) {
    checks++;
    const txt = readFileSync(f, "utf8");
    const fm = txt.match(/^---\n([\s\S]*?)\n---/);
    const name = f.split("/").pop();
    if (!fm) { fail(`${name}: no frontmatter`); continue; }
    const missingKeys = REQUIRED_FM.filter((k) => !fm[1].includes(k));
    const bodyCount = (txt.match(/^##\s+\d\./gm) || []).length;
    if (missingKeys.length) fail(`${name}: frontmatter missing ${missingKeys.join(", ")}`);
    else if (bodyCount < 8) fail(`${name}: only ${bodyCount}/8 body sections`);
    else pass(`${name}: frontmatter OK, ${bodyCount}/8 sections`);
  }
}

// ---------------------------------------------------------------------------
// 4. Shipped-block index in SKILL.md points at files that exist
// ---------------------------------------------------------------------------
section("4. Block index points at real files");
{
  const txt = readFileSync(SKILL_MD, "utf8");
  const refs = [...txt.matchAll(/blocks\/[A-Za-z0-9/_-]+\.md/g)].map((m) => m[0]);
  const uniq = [...new Set(refs)];
  if (uniq.length === 0) { checks++; fail("SKILL.md references no block files"); }
  for (const r of uniq) {
    checks++;
    if (existsSync(join(SKILL_DIR, r))) pass(`${r} exists`);
    else fail(`${r} referenced in SKILL.md but file is missing`);
  }
}

// ---------------------------------------------------------------------------
// 5. for-original CLAUDE.md references only sections real in a base skill
// ---------------------------------------------------------------------------
section("5. Original-skill CLAUDE.md references are plausible");
{
  checks++;
  if (!existsSync(ORIG_CLAUDE)) { pass("no base-skill CLAUDE.md in this repo (not applicable), skipped"); }
  else {
    const txt = readFileSync(ORIG_CLAUDE, "utf8");
    // just sanity: every "Section X" here should look like a real section number, and
    // the file must NOT reference v3-only sections (1.6, 15) since base skill lacks them
    const v3only = [...txt.matchAll(/Section\s+(1\.6|15)\b/g)].map((m) => m[1]);
    if (v3only.length) fail(`CLAUDE.md for the base skill references v3-only sections: ${[...new Set(v3only)].join(", ")}`);
    else pass("references no v3-only sections (safe to drop onto the base skill)");
  }
}

// ---------------------------------------------------------------------------
// summary
// ---------------------------------------------------------------------------
console.log("\n" + "-".repeat(48));
if (failures === 0) {
  console.log(`All checks passed (${checks} checks). Safe to commit.`);
  process.exit(0);
} else {
  console.log(`${failures} failure(s) across ${checks} checks. Fix before committing.`);
  process.exit(1);
}
