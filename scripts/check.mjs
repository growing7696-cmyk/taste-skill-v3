#!/usr/bin/env node
// taste-skill-v3 repo check. Run with: npm run check
// Zero dependencies. Exits non-zero if any check fails, so it can gate a commit or CI.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const SKILL_DIR = join(SKILLS, "taste-skill-v3");
const SKILL_MD = join(SKILL_DIR, "SKILL.md");
const BLOCKS_DIR = join(SKILL_DIR, "blocks");

const EM_DASH = "\u2014";
const EN_DASH = "\u2013";

let failures = 0;
let checks = 0;
const fail = (msg) => { failures++; console.log(`  ✗ ${msg}`); };
const pass = (msg) => { console.log(`  ✓ ${msg}`); };
const section = (name) => console.log(`\n${name}`);

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

// Every skill package in the family, and whether it must carry the inheritance line.
// `_core` is the contract itself, so it is exempt.
const PACKAGES = [
  { dir: "skills/_core", md: "SKILL.md", core: true },
  { dir: "skills/taste-skill-v3", md: "SKILL.md" },
  { dir: "skills/GPT-taste", md: "SKILL.md" },
  { dir: "skills/taste-brutal/skills/taste-brutal", md: "SKILL.md" },
  { dir: "skills/taste-minimal", md: "SKILL.md" },
  { dir: "skills/taste-soft", md: "SKILL.md" },
  { dir: "skills/taste-redesign", md: "SKILL.md" },
  { dir: "skills/taste-image-to-code", md: "SKILL.md" },
  { dir: "skills/taste-output", md: "SKILL.md" },
  { dir: "skills/taste-imagegen-web", md: "SKILL.md" },
  { dir: "skills/taste-imagegen-mobile", md: "SKILL.md" },
  { dir: "skills/taste-brandkit", md: "SKILL.md" },
  { dir: "skills/taste-stitch", md: "SKILL.md" },
];

// ---------------------------------------------------------------------------
// 1. Em-dash / en-dash ban across every .md in the repo
// ---------------------------------------------------------------------------
section("1. Em-dash ban (the skill's own #1 rule)");
{
  const stripAllowed = (line) =>
    line
      .replace(/`[^`]*`/g, "")
      .replace(/U\+201[34]\)?/g, "");
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
  const present = new Set();
  for (const m of txt.matchAll(/^#+\s+(\d+(?:\.\d+)?(?:\.[A-Z])?)\b/gm)) present.add(m[1].replace(/\.$/, ""));
  for (const m of txt.matchAll(/^#+\s+(Appendix [ABC])\b/gm)) present.add(m[1]);
  const refs = new Set();
  for (const m of txt.matchAll(/Section\s+(\d+(?:\.\d+)?(?:\.[A-Z])?)\b/g)) refs.add(m[1].replace(/\.$/, ""));
  const missing = [...refs].filter((r) => {
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
// 5. Every skill package has frontmatter with a name and a description
// ---------------------------------------------------------------------------
section("5. Skill frontmatter");
{
  const names = new Map();
  for (const pkg of PACKAGES) {
    checks++;
    const p = join(ROOT, pkg.dir, pkg.md);
    if (!existsSync(p)) { fail(`${pkg.dir}/${pkg.md} is missing`); continue; }
    const txt = readFileSync(p, "utf8");
    const fm = txt.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) { fail(`${pkg.dir}: no frontmatter`); continue; }
    const name = fm[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
    const desc = fm[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
    if (!name) { fail(`${pkg.dir}: frontmatter has no name`); continue; }
    if (!desc || desc.length < 40) { fail(`${pkg.dir}: description missing or too short to trigger reliably`); continue; }
    if (names.has(name) && names.get(name) !== pkg.dir) {
      // The GPT package intentionally mirrors the engine's install name.
      const allowed = [names.get(name), pkg.dir].every((d) => d.includes("taste-skill-v3") || d.includes("GPT-taste"));
      if (!allowed) { fail(`${pkg.dir}: duplicate skill name "${name}" (also in ${names.get(name)})`); continue; }
    }
    names.set(name, pkg.dir);
    pass(`${pkg.dir}: name "${name}", description OK`);
  }
}

// ---------------------------------------------------------------------------
// 6. Every skill inherits the core contract
// ---------------------------------------------------------------------------
section("6. Core contract inheritance");
{
  for (const pkg of PACKAGES) {
    if (pkg.core) continue;
    checks++;
    const p = join(ROOT, pkg.dir, pkg.md);
    if (!existsSync(p)) { fail(`${pkg.dir}/${pkg.md} is missing`); continue; }
    const txt = readFileSync(p, "utf8");
    const hasInherit = /skills\/_core\/SKILL\.md/.test(txt);
    const hasTiers = /DEFAULT tier|rule tiers/i.test(txt);
    if (!hasInherit) fail(`${pkg.dir}: does not reference skills/_core/SKILL.md`);
    else if (!hasTiers) fail(`${pkg.dir}: inherits core but never states the rule tier of its own rules`);
    else pass(`${pkg.dir}: inherits the core contract`);
  }
}

// ---------------------------------------------------------------------------
// 7. Core reference files referenced by the contract exist
// ---------------------------------------------------------------------------
section("7. Core reference files");
{
  const coreMd = join(SKILLS, "_core", "SKILL.md");
  const txt = existsSync(coreMd) ? readFileSync(coreMd, "utf8") : "";
  const refs = [...new Set([...txt.matchAll(/reference\/[a-z-]+\.md/g)].map((m) => m[0]))];
  if (refs.length === 0) { checks++; fail("_core/SKILL.md references no reference files"); }
  for (const r of refs) {
    checks++;
    if (existsSync(join(SKILLS, "_core", r))) pass(`_core/${r} exists`);
    else fail(`_core/${r} referenced but missing`);
  }
}

// ---------------------------------------------------------------------------
// 8. Verification harness is present and wired into package.json
// ---------------------------------------------------------------------------
section("8. Verification harness");
{
  const scripts = ["lib.mjs", "screenshots.mjs", "a11y.mjs", "lighthouse.mjs", "baseline.mjs", "diff.mjs", "README.md"];
  for (const s of scripts) {
    checks++;
    if (existsSync(join(ROOT, "scripts", "verify", s))) pass(`scripts/verify/${s} exists`);
    else fail(`scripts/verify/${s} is missing`);
  }
  checks++;
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const needed = ["verify:screens", "verify:a11y", "verify:lighthouse", "verify:baseline", "verify:diff"];
  const missingScripts = needed.filter((n) => !pkg.scripts?.[n]);
  if (missingScripts.length) fail(`package.json missing scripts: ${missingScripts.join(", ")}`);
  else pass("package.json wires every verify script");
}

// ---------------------------------------------------------------------------
// 9. Required package files exist
// ---------------------------------------------------------------------------
section("9. Required package files exist");
{
  const required = [
    "README.md",
    "COMPARISON.md",
    "CHANGELOG.md",
    ".gitignore",
    "CLAUDE.md",
    "CODEX.md",
    "LICENSE",
    "package.json",
    "prompts/greenfield.md",
    "prompts/redesign.md",
    "prompts/variants-and-perf.md",
    ".claude-plugin/plugin.json",
    "skills/README.md",
    "skills/_core/SKILL.md",
    "skills/taste-skill-v3/SKILL.md",
    "skills/GPT-taste/SKILL.md",
    "skills/GPT-taste/agents/openai.yaml",
    "skills/taste-brutal/README.md",
    "skills/taste-brutal/CLAUDE.md",
    "skills/taste-brutal/.claude-plugin/plugin.json",
    "skills/taste-brutal/skills/taste-brutal/SKILL.md",
    "skills/taste-brutal/skills/taste-brutal/reference/modes.md",
    "skills/taste-redesign/reference/audit-checklist.md",
  ];

  for (const r of required) {
    checks++;
    if (existsSync(join(ROOT, r))) pass(`${r} exists`);
    else fail(`${r} is missing`);
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
