"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Hammer, Settings, Cpu, HardDrive } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "entries-flow", title: "📊 Entries Crawler Flow", level: 2 },
  { id: "manifest-update-flow", title: "📊 Manifest Updater Flow", level: 2 },
  { id: "writer-flow", title: "📊 Stub Stripper Writer Flow", level: 2 },
  { id: "code-entries", title: "⚙️ get-esbuild-entries.mjs", level: 2 },
  { id: "code-update", title: "⚙️ update-manifest-for-module.mjs", level: 2 },
  { id: "code-write", title: "⚙️ write.mjs", level: 2 },
  { id: "code-write-plugin", title: "⚙️ write-plugin.mjs & write-metafile-plugin.mjs", level: 2 },
];

const ENTRIES_DIAGRAM = `graph TD
    Start[Crawl src/ folder] --> Loop[Files found: loop recursively]
    
    Loop --> TypeCheck{Component Type?}
    TypeCheck -->|Client Component| Client[parse exports via Babel AST & update manifest.json & extract imports recursively]
    TypeCheck -->|Page / Layout / CSS| Structure[Parse recursively to gather CSS stylesheets & gather static assets]
    
    Client --> ComputeHash[Compute SHA-1 hash of all files absolute path]
    Structure --> ComputeHash
    
    ComputeHash --> MapName[Map unique chunk output names e.g. client-f273b18d.js]`;

const MANIFEST_UPDATE_DIAGRAM = `graph TD
    Start[updateManifestForModule path] --> StripStale[Strips previous stale mappings]
    StripStale --> Parse[parseExports clientModuleCode]
    Parse --> LoopExports[Loop exports list]
    LoopExports --> UpdateRecords[Update manifest object records:<br/>file:///...#exp -> relative file path]`;

const WRITER_DIAGRAM = `graph TD
    Start[esbuild finishes build] --> Extract[Extract result.metafile.outputs]
    Extract --> Identify[Identify output formats]
    
    Identify --> FormatCheck{Format type?}
    FormatCheck -->|CSS / Asset stubs| Stubs[Add file.js and file.map to skipSet list]
    FormatCheck -->|Client/Server JS| JS[Write output contents to disk via fs.writeFile]`;

const ENTRIES_CODE = `import { readFileSync } from "fs";
import path from "node:path";
import glob from "fast-glob";
import { pathToFileURL } from "node:url";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import crypto from "node:crypto";
import { regex as assetRegex, globPattern as assetGlobPattern } from "../../core/asset-extensions.js";
import { getAbsPathWithExt } from "../../core/get-abs-path-with-ext.js";
import normalizePath from "./normalize-path.mjs";
import { useClientRegex, useServerRegex } from "../../constants.js";
import { updateManifestForModule } from "./update-manifest-for-module.mjs";

function hashFilePath(absPath) {
  return crypto.createHash("sha1").update(absPath).digest("hex").slice(0, 8);
}

export default async function getEsbuildEntries({
  srcDir = path.resolve("src"),
  assetInclude = assetRegex,
  manifest = {},
} = {}) {
  const detectedClientEntries = new Set();
  const detectedCSSEntries = new Set();
  const detectedAssetEntries = new Set();
  const serverModules = new Set();

  // Recursive AST analyzer to gather sub-component imports and styles
  async function getImportsAndAssetsAndCsss(code, baseFilePath, visited = new Set(), isTopLevelClientComponent = false) {
    if (visited.has(baseFilePath)) return { imports: [], assets: [], csss: [] };
    visited.add(baseFilePath);

    const ast = parser.parse(code, { sourceType: "module", plugins: ["jsx", "typescript"] });
    const imports = new Set();
    const assets = new Set();
    const csss = new Set();
    const importNodes = [];

    traverse.default(ast, {
      ImportDeclaration(nodePath) { importNodes.push(nodePath); },
    });

    for (const nodePath of importNodes) {
      const source = nodePath.node.source.value;
      const absImportPathWithExt = getAbsPathWithExt(source, { parentURL: pathToFileURL(baseFilePath).href });
      if (!absImportPathWithExt) continue;

      let importedCode;
      try {
        importedCode = readFileSync(absImportPathWithExt, "utf8");
      } catch (err) {
        continue;
      }

      if (!isTopLevelClientComponent) {
        if (useClientRegex.test(importedCode.trim())) continue; // Stop recursing at client component boundaries
      } else {
        if (useServerRegex.test(importedCode.trim())) continue;
      }

      if (/\\.(css|scss|less)$/i.test(absImportPathWithExt)) {
        csss.add(absImportPathWithExt);
        continue;
      }

      if (assetInclude.test(absImportPathWithExt)) {
        assets.add(absImportPathWithExt);
        continue;
      }

      if (absImportPathWithExt.endsWith(".json")) {
        imports.add(absImportPathWithExt);
        continue;
      }

      imports.add(absImportPathWithExt);

      const nested = await getImportsAndAssetsAndCsss(importedCode, absImportPathWithExt, visited, isTopLevelClientComponent);
      nested.imports.forEach((p) => imports.add(p));
      nested.assets.forEach((p) => assets.add(p));
      nested.csss.forEach((p) => csss.add(p));
    }

    return { imports: Array.from(imports), assets: Array.from(assets), csss: Array.from(csss) };
  }

  const files = await glob(["**/*.{js,jsx,ts,tsx}"], { cwd: srcDir, absolute: true });

  for (const absPath of files) {
    const code = readFileSync(absPath, "utf8");
    const isClientModule = useClientRegex.test(code.trim());
    const normalizedPath = normalizePath(absPath);

    if (isClientModule) {
      const name = path.basename(absPath, path.extname(absPath));
      updateManifestForModule(absPath, code, true, manifest);
      detectedClientEntries.add({ absPath: normalizedPath, name });

      const { imports } = await getImportsAndAssetsAndCsss(code, absPath, new Set(), true);
      imports.forEach((imp) => {
        if (/\\.(js|jsx|ts|tsx)$/i.test(imp) && !imp.includes("node_modules")) {
          detectedClientEntries.add({ absPath: normalizePath(imp), name: path.basename(imp, path.extname(imp)) });
        }
      });
    } else if (path.basename(absPath).startsWith("page.") || path.basename(absPath).startsWith("layout.")) {
      serverModules.add(normalizedPath);
      const { imports, assets, csss } = await getImportsAndAssetsAndCsss(code, absPath, new Set());

      csss.forEach((c) => detectedCSSEntries.add({ absPath: normalizePath(c), name: path.basename(c, path.extname(c)) }));
      assets.forEach((a) => detectedAssetEntries.add({ absPath: normalizePath(a), name: path.basename(a, path.extname(a)) }));
      imports.forEach((imp) => {
        if (/\\.(js|jsx|ts|tsx)$/i.test(imp) && !imp.includes("node_modules")) {
          serverModules.add(normalizePath(imp));
        }
      });
    }
  }

  const csss = await glob(["**/*.css"], { cwd: srcDir, absolute: true });
  csss.forEach((c) => detectedCSSEntries.add({ absPath: normalizePath(c), name: path.basename(c, path.extname(c)) }));

  const assets = await glob([assetGlobPattern], { cwd: srcDir, absolute: true });
  assets.forEach((a) => detectedAssetEntries.add({ absPath: normalizePath(a), name: path.basename(a, path.extname(a)) }));

  // Generate unique content hashes based on paths to make output chunks stable
  for (const dCE of detectedClientEntries) {
    const hash = hashFilePath(dCE.absPath);
    dCE.outfileName = \`\${dCE.name}-\${hash}\`;
  }
  for (const dCSSE of detectedCSSEntries) {
    const hash = hashFilePath(dCSSE.absPath);
    dCSSE.outfileName = \`\${dCSSE.name}-\${hash}\`;
  }
  for (const dAE of detectedAssetEntries) {
    const hash = hashFilePath(dAE.absPath);
    dAE.outfileName = \`\${dAE.name}-\${hash}\`;
  }

  return [detectedClientEntries, detectedCSSEntries, detectedAssetEntries, Array.from(serverModules)];
}`;

const UPDATE_CODE = `import parseExports from "../../core/parse-exports.js";
import { pathToFileURL } from "node:url";
import path from "node:path";

export function updateManifestForModule(absPath, code, isClientModule, manifest) {
  const fileUrl = pathToFileURL(absPath).href;
  const relPath = "./" + path.relative(process.cwd(), absPath).replace(/\\\\/g, "/");

  // Remove stale mappings for this module file URL
  for (const key in manifest) {
    if (key.startsWith(fileUrl)) delete manifest[key];
  }

  // Parse and record exports in the manifest configuration
  if (isClientModule) {
    const exports = parseExports(code);
    for (const expName of exports) {
      const manifestKey = expName === "default" ? fileUrl : \`\${fileUrl}#\${expName}\`;
      manifest[manifestKey] = {
        id: relPath,
        chunks: expName,
        name: expName,
      };
    }
  }
}`;

const WRITE_CODE = `import fs from "node:fs/promises";
import path from "node:path";
import { regex } from "../../core/asset-extensions.js";

export default async function write(result) {
  if (!result.metafile) return;

  const skipSet = new Set();
  const normalizeRel = (p) => p.replace(/\\\\/g, "/");
  const cssRegex = /\\.(css|scss|less)$/i;

  // Filter out redundant javascript stub files created by esbuild for assets/styles
  for (const [relPath, info] of Object.entries(result.metafile.outputs)) {
    if (!info.entryPoint) continue;
    let entryPointNormalized = info.entryPoint.replace("dinou-asset:", "");
    const inputKeys = Object.keys(info.inputs);

    if (regex.test(entryPointNormalized) && inputKeys.length === 1 && inputKeys[0] === info.entryPoint) {
      skipSet.add(normalizeRel(relPath));
      skipSet.add(normalizeRel(relPath.replace(/\\.js$/, ".js.map")));
    }

    if (cssRegex.test(info.entryPoint) && (inputKeys.length === 1 || inputKeys.length === 0)) {
      skipSet.add(normalizeRel(relPath));
      skipSet.add(normalizeRel(relPath + ".map"));
    }
  }

  // Write only the real compiled code and extracted CSS stylesheets to disk
  for (const file of result.outputFiles) {
    const fileRelPath = normalizeRel(path.relative(process.cwd(), file.path));
    if (skipSet.has(fileRelPath)) continue;

    await fs.mkdir(path.dirname(file.path), { recursive: true });
    await fs.writeFile(file.path, file.contents);
  }
}`;

const WRITE_PLUGINS_CODE = `// write-plugin.mjs
import write from "../helpers-esbuild/write.mjs";

export default function writePlugin() {
  return {
    name: "write-plugin",
    setup(build) {
      build.onEnd(write); // Hook writer to onEnd compilation event
    },
  };
}

// write-metafile-plugin.mjs
import fs from "node:fs/promises";

export function writeMetafilePlugin() {
  return {
    name: "write-metafile",
    setup(build) {
      build.onEnd(async (result) => {
        if (result.metafile) {
          await fs.writeFile("./meta.json", JSON.stringify(result.metafile));
        }
      });
    },
  };
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Hammer className="h-6 w-6 text-primary text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                esbuild Entry & File Helpers
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the filesystem crawlers, manifest updates synchronizers, and redundant stub file filter writers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • Entries Crawler: <code>./dinou/esbuild/helpers-esbuild/get-esbuild-entries.mjs</code> <br />
              • Manifest Synchronizer: <code>./dinou/esbuild/helpers-esbuild/update-manifest-for-module.mjs</code> <br />
              • File Writer: <code>./dinou/esbuild/helpers-esbuild/write.mjs</code> <br />
              • Meta/Write Plugins: <code>write-plugin.mjs</code>, <code>write-metafile-plugin.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                A custom compiler needs deep access to build inputs and outputs: finding client component entrypoints, updating references in the development context, and filtering out useless files that esbuild creates when bundling CSS or assets.
              </p>
              <p>
                Dinou provides these features using file helpers that crawl directories, update JSON catalogs, and write clean bundles directly from memory buffers to disk.
              </p>
            </section>

            <hr className="my-8" />

            {/* ENTRIES FLOW */}
            <section id="entries-flow">
              <h2>📊 Entries Crawler Flow</h2>
              <p>
                The flowchart below shows how directories are scanned and input entrypoints are cataloged:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="800px">{ENTRIES_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* UPDATE FLOW */}
            <section id="manifest-update-flow">
              <h2>📊 Manifest Updater Flow</h2>
              <p>
                The flowchart below shows how modules are mapped inside the client hydration manifest:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{MANIFEST_UPDATE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* WRITER FLOW */}
            <section id="writer-flow">
              <h2>📊 Stub Stripper Writer Flow</h2>
              <p>
                The flowchart below shows how compiler-generated JS stubs for assets and styles are filtered out:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="800px">{WRITER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE ENTRIES */}
            <section id="code-entries">
              <h2>⚙️ get-esbuild-entries.mjs</h2>
              <p>
                Below is the full, complete code of the entries resolver:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ENTRIES_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE UPDATE */}
            <section id="code-update">
              <h2>⚙️ update-manifest-for-module.mjs</h2>
              <p>
                Below is the full, complete code of the module path updates synchronizer:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{UPDATE_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WRITE */}
            <section id="code-write">
              <h2>⚙️ write.mjs</h2>
              <p>
                Below is the full, complete code of the redundant JS stub stripper:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{WRITE_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WRITE PLUGINS */}
            <section id="code-write-plugin">
              <h2>⚙️ write-plugin.mjs & write-metafile-plugin.mjs</h2>
              <p>
                Below is the code of the esbuild plugins wrapping file-writing calls:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{WRITE_PLUGINS_CODE}</CodeBlock>
              </div>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
