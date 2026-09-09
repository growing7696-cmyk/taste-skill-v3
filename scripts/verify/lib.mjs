// Shared helpers for the verify scripts.
// Zero required dependencies. Optional tools are detected, never assumed.

export const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1536, height: 900 },
];

export function parseArgs(argv) {
  const args = {};
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = rest[i + 1];
      if (next && !next.startsWith("--")) { args[key] = next; i++; }
      else args[key] = true;
    }
  }
  return args;
}

export function requireUrl(args, script) {
  if (!args.url) {
    console.error(`usage: node scripts/verify/${script} --url <url> [options]`);
    process.exit(2);
  }
  return String(args.url);
}

// Import an optional dependency. Returns null instead of throwing, so a missing
// tool is reported honestly rather than turning into a fake pass.
export async function optional(spec) {
  try { return await import(spec); }
  catch { return null; }
}

export function missing(tool, install) {
  console.log(`\nDEFERRED: ${tool} is not available in this environment.`);
  console.log(`Install it with: ${install}`);
  console.log("No result claimed. Report this gate as DEFERRED, never as PASS.\n");
  process.exit(3); // 3 = could not run, distinct from 1 = failed
}

export const ok = (m) => console.log(`  PASS  ${m}`);
export const bad = (m) => console.log(`  FAIL  ${m}`);
export const note = (m) => console.log(`        ${m}`);

export function summarize(failures, gate) {
  console.log("\n" + "-".repeat(56));
  if (failures === 0) { console.log(`${gate}: PASS`); process.exit(0); }
  console.log(`${gate}: FAIL (${failures} issue(s))`);
  process.exit(1);
}

export async function launch(playwright) {
  const chromium = playwright.chromium;
  try {
    return await chromium.launch();
  } catch {
    // Many agent sandboxes ship a chromium at a known path.
    const path = process.env.PLAYWRIGHT_CHROMIUM_PATH || "/opt/pw-browsers/chromium";
    return await chromium.launch({ executablePath: path });
  }
}
