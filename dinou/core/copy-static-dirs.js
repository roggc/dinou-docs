import fs from "node:fs";
import path from "node:path";

const IGNORED_OS_BASENAMES = new Set([".ds_store", "thumbs.db"]);

function shouldCopyStaticEntry(srcPath) {
  const baseLower = path.basename(srcPath).toLowerCase();
  return !IGNORED_OS_BASENAMES.has(baseLower);
}

/**
 * Recursively copies static asset directories into `outdir`, preserving nested
 * subdirectories and dotfiles (such as `public/.well-known/*` or `public/.nojekyll`).
 * Legacy `favicons/` is copied first if present, followed by `public/` so `public/`
 * always takes precedence on filename collisions.
 */
export function copyStaticDirectoriesToOutdir(projectRoot, outdir) {
  const rootDir = path.resolve(projectRoot || process.cwd());
  const destDir = path.resolve(rootDir, outdir);
  let copiedAny = false;

  for (const dirName of ["favicons", "public"]) {
    const srcDir = path.resolve(rootDir, dirName);
    if (!fs.existsSync(srcDir)) continue;
    try {
      if (!fs.statSync(srcDir).isDirectory()) continue;
      fs.mkdirSync(destDir, { recursive: true });
      fs.cpSync(srcDir, destDir, {
        recursive: true,
        force: true,
        dereference: true,
        preserveTimestamps: true,
        filter: shouldCopyStaticEntry,
      });
      copiedAny = true;
    } catch (e) {}
  }

  return copiedAny;
}

export default copyStaticDirectoriesToOutdir;

