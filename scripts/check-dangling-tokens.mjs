/**
 * Fail on any var(--token) that nothing defines.
 *
 * A dangling custom property is silent: the declaration is dropped and the
 * element inherits instead. That is how renaming --pdmn-espresso turned the
 * primary call-to-action into a white box with an invisible label — ivory text
 * inherited onto an ivory fill, with no error anywhere.
 *
 * Run after any token rename:  node scripts/check-dangling-tokens.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

/* Set from a style attribute or JS at runtime, so they are never declared in
   a stylesheet and are not errors. */
const RUNTIME = new Set(["--aspect", "--float-delay", "--float-duration", "--px", "--py"]);

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (/\.(css|tsx|ts)$/.test(e.name)) yield full;
  }
}

const defined = new Set();
const used = new Map();
for await (const f of walk("src")) {
  /* Strip comments first. Documentation that NAMES a retired token — such as
     the note on .shade-climax .accent-fill explaining this very bug — is not a
     reference, and counting it makes this check fail forever on its own
     explanation. */
  const t = (await fs.readFile(f, "utf8"))
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  for (const m of t.matchAll(/(--[A-Za-z0-9-]+)\s*:/g)) defined.add(m[1]);
  for (const m of t.matchAll(/var\(\s*(--[A-Za-z0-9-]+)/g)) {
    if (!used.has(m[1])) used.set(m[1], new Set());
    used.get(m[1]).add(path.relative(process.cwd(), f));
  }
}

const missing = [...used].filter(([k]) => !defined.has(k) && !RUNTIME.has(k));
if (!missing.length) {
  console.log(`\n  ${used.size} tokens referenced, all defined.\n`);
} else {
  console.log("");
  for (const [k, files] of missing) {
    console.log(`  DANGLING ${k}`);
    for (const f of [...files].sort()) console.log(`      ${f}`);
  }
  console.log("");
  process.exitCode = 1;
}
