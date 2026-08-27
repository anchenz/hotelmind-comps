// scripts/build-hooks.js
import { resolve, dirname } from "path";
import fs from "fs";

const __dirname =
  process.platform === "win32"
    ? new URL(".", import.meta.url).pathname.slice(1)
    : new URL(".", import.meta.url).pathname;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyHooks() {
  const srcDir = resolve(__dirname, "../src/hooks");
  const outDir = resolve(__dirname, "../dist/hooks");

  ensureDir(outDir);

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".js")) {
      const from = resolve(srcDir, entry.name);
      const to = resolve(outDir, entry.name);
      const toDir = dirname(to);
      ensureDir(toDir);
      fs.copyFileSync(from, to);
      console.log("Copied:", entry.name);
    }
  }
  console.log("✓ Hooks copied to dist/hooks");
}

copyHooks();
