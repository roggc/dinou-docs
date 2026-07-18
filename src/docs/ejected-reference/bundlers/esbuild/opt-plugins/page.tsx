"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Gauge, Settings, Cpu, HardDrive } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "stable-chunks-flow", title: "📊 Stable Chunks Plugin Flow", level: 2 },
  { id: "skip-entries-flow", title: "📊 Skip Missing Entries Flow", level: 2 },
  { id: "manifest-flow", title: "📊 Manifest Generator Flow", level: 2 },
  { id: "code-stable", title: "⚙️ stable-chunk-names-and-maps-plugin.mjs", level: 2 },
  { id: "code-skip", title: "⚙️ skip-missing-entry-points-plugin.mjs", level: 2 },
  { id: "code-manifest", title: "⚙️ manifest-generator-plugin.mjs", level: 2 },
];

const STABLE_CHUNKS_DIAGRAM = `graph TD
    Start[metafile.outputs from esbuild] --> Loop[Loop through output chunks]
    Loop --> Calc[Stable chunk name calculation<br/>src/components/Button.tsx -> chunk-components-Button.js]
    
    Calc --> Rename[Rename Chunk: Update key to chunk-stable.js]
    Calc --> RenameMap[Rename Map: Update sourceMappingURL references]
    
    Rename --> Replace[Replace import specifiers inside compiled javascript chunks]
    RenameMap --> Replace`;

const SKIP_ENTRIES_DIAGRAM = `graph TD
    Start[esbuild starts build] --> EntryCheck[Check build.entryPoints]
    EntryCheck --> DiskCheck{Are all files present on disk?}
    DiskCheck -->|Yes| Continue[Continue compilation]
    DiskCheck -->|No| Warn[Emit warning block & Halt/Abort build]`;

const MANIFEST_DIAGRAM = `graph TD
    Start[esbuild finishes build] --> ReadEntries[Read metafile.outputs entrypoints]
    ReadEntries --> Filter[Filter framework entries:<br/>main, error, serverFunctionProxy]
    Filter --> Extract[Extract hashed output filename<br/>e.g. main -> main-1a2b3c4d.js]
    Extract --> Write[Write manifest.json metadata]`;

const STABLE_CHUNKS_CODE = `import path from "node:path";

export default function stableChunkNamesAndMapsPlugin({ dev = true } = {}) {
  return {
    name: "stable-chunk-names",
    setup(build) {
      build.onEnd(async (result) => {
        if (!result.metafile || !result.outputFiles?.length) return;
        const outdir = build.initialOptions.outdir;
        if (!outdir) return;

        const renames = new Map();
        const normalizeRel = (p) => p.replace(/\\\\/g, "/");

        // 1. Calculate stable names for chunks based on their source input path
        for (const [oldRelPath, info] of Object.entries(result.metafile.outputs)) {
          if (info.entryPoint || !oldRelPath.endsWith(".js")) continue;
          const inputs = Object.keys(info.inputs);
          const sourceFile = inputs.find((f) => f.startsWith("src/") && /\\.(js|jsx|ts|tsx)$/.test(f));
          if (!sourceFile) continue;

          const rel = path.relative("src", sourceFile);
          const normalizedRel = rel.replace(/\\\\/g, "/");
          const dir = path.dirname(normalizedRel);
          const base = path.basename(normalizedRel, path.extname(normalizedRel));
          const stableName = dir === "." ? base : \`\${dir.replace(/\\//g, "-")}-\${base}\`;

          let finalName = dev ? \`\${stableName}.js\` : \`\${stableName}-\${oldRelPath.match(/-([A-Z0-9]+)\\./)?.[1] || ""}.js\`;
          renames.set(path.basename(oldRelPath), \`chunk-\${finalName}\`);
        }

        // 2. Rename associated sourcemaps
        for (const [oldRelPath] of Object.entries(result.metafile.outputs)) {
          if (!oldRelPath.endsWith(".js.map")) continue;
          const jsLocal = path.basename(oldRelPath.replace(".map", ""));
          if (renames.has(jsLocal)) {
            renames.set(path.basename(oldRelPath), renames.get(jsLocal).replace(/\\.js$/, ".js.map"));
          }
        }

        // 3. Rewrite import statements inside JS chunks to match the new stable filenames
        const outputs = result.metafile.outputs;
        const escapeRegExp = (string) => string.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");

        for (const relPath in outputs) {
          const output = outputs[relPath];
          if (!output.imports || !relPath.endsWith(".js")) continue;

          const importerFile = result.outputFiles.find((f) => normalizeRel(path.relative(process.cwd(), f.path)) === relPath);
          if (!importerFile) continue;

          let content = new TextDecoder().decode(importerFile.contents);
          for (const imp of output.imports) {
            const oldImportedLocal = path.basename(imp.path);
            const newImportedLocal = renames.get(oldImportedLocal);
            if (!newImportedLocal) continue;

            const pattern = new RegExp(\`"\?\\./\${escapeRegExp(oldImportedLocal)}"\?\`, "g");
            content = content.replace(pattern, \`"./\${newImportedLocal}"\`);
          }
          importerFile.contents = new TextEncoder().encode(content);
        }

        // 4. Update sourceMappingURL annotations in JavaScript files
        for (const file of result.outputFiles) {
          if (!file.path.endsWith(".js")) continue;
          const oldLocal = path.basename(normalizeRel(path.relative(process.cwd(), file.path)));
          if (!renames.has(oldLocal)) continue;

          const newLocal = renames.get(oldLocal);
          const oldMapLocal = oldLocal.replace(/\\.js$/, ".js.map");
          const newMapLocal = newLocal.replace(/\\.js$/, ".js.map");
          let content = new TextDecoder().decode(file.contents);

          content = content.replace(new RegExp(\`sourceMappingURL=\\./\${escapeRegExp(oldMapLocal)}\`, "g"), \`sourceMappingURL=./\${newMapLocal}\`);
          file.contents = new TextEncoder().encode(content);
        }

        // Apply updated paths to the build output object
        for (const file of result.outputFiles) {
          const oldLocal = path.basename(normalizeRel(path.relative(process.cwd(), file.path)));
          const newLocal = renames.get(oldLocal);
          if (newLocal) {
            file.path = path.join(path.dirname(file.path), newLocal);
          }
        }
      });
    },
  };
}`;

const SKIP_ENTRIES_CODE = `import { existsSync } from "node:fs";

export default function skipMissingEntryPointsPlugin() {
  return {
    name: "skip-missing-entry-points",
    setup(build) {
      // Intercept build initialization to perform files existence checks
      build.onStart(async () => {
        const entryPoints = build.initialOptions.entryPoints;
        if (!entryPoints || typeof entryPoints === "string") return;

        const missingEntries = [];
        for (const [name, path] of Object.entries(entryPoints)) {
          if (!existsSync(path)) {
            missingEntries.push({ name, path });
          }
        }

        // Halt compiler to avoid dumping fatal stack traces if a target component is missing
        if (missingEntries.length > 0) {
          return {
            warnings: [{ text: "Missing entry points, skipping build. Neglect following error logs if any." }],
          };
        }
      });
    },
  };
}`;

const MANIFEST_CODE = `import fs from "node:fs/promises";
import path from "node:path";

const frameworkEntryNames = ["main", "error", "serverFunctionProxy"];

export default function manifestGeneratorPlugin(manifestData) {
  return {
    name: "manifest-generator",
    setup(build) {
      const outdir = build.initialOptions.outdir || ".";

      build.onEnd(async (result) => {
        const meta = result.metafile;
        if (!meta) return;

        // Loop through entrypoints to extract framework script filenames
        for (const [outputFile, info] of Object.entries(meta.outputs)) {
          const entryPoint = info.entryPoint;
          if (entryPoint) {
            if (!/\\.(js|jsx|ts|tsx|mjs)$/.test(entryPoint)) continue;

            const entryName = outputFile.split("/").pop().split("-").shift();
            if (!frameworkEntryNames.includes(entryName)) continue;

            manifestData[entryName + ".js"] = outputFile.split("/").pop(); // Save filename mapping
          }
        }

        try {
          const outDir = path.resolve(process.cwd(), outdir);
          await fs.mkdir(outDir, { recursive: true });
          await fs.writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifestData, null, 2), "utf8");
        } catch (e) {
          console.error("Error writing manifest.json: ", e.message);
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
              <Gauge className="h-6 w-6 text-primary text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Optimization Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the optimization plugins that organize cache-stable chunk names, manage build skips, and generate manifest JSONs.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • Chunks Stabilizer: <code>./dinou/esbuild/plugins-esbuild/stable-chunk-names-and-maps-plugin.mjs</code> <br />
              • Skip Aborter: <code>./dinou/esbuild/plugins-esbuild/skip-missing-entry-points-plugin.mjs</code> <br />
              • manifest.json Writer: <code>./dinou/esbuild/plugins-esbuild/manifest-generator-plugin.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a dynamic React Server Component server, file names must remain stable across code edits during local runs to prevent browser cache invalidation and load failure crashes. Conversely, production releases require hashed manifests to prevent client-side CDN caching of outdated code.
              </p>
            </section>

            <hr className="my-8" />

            {/* STABLE FLOW */}
            <section id="stable-chunks-flow">
              <h2>📊 Stable Chunks Plugin Flow</h2>
              <p>
                The flowchart below traces the hash stripping and reference renaming steps of the stable chunk names plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="650px">{STABLE_CHUNKS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SKIP FLOW */}
            <section id="skip-entries-flow">
              <h2>📊 Skip Missing Entries Flow</h2>
              <p>
                The flowchart below shows how compilation is aborted if a required entry file is missing:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{SKIP_ENTRIES_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* MANIFEST FLOW */}
            <section id="manifest-flow">
              <h2>📊 Manifest Generator Flow</h2>
              <p>
                The flowchart below shows how entrypoint names are mapped to final hashed filenames in the build manifest:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{MANIFEST_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE STABLE */}
            <section id="code-stable">
              <h2>⚙️ stable-chunk-names-and-maps-plugin.mjs</h2>
              <p>
                Below is the full code of the stable chunk names resolver:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{STABLE_CHUNKS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE SKIP */}
            <section id="code-skip">
              <h2>⚙️ skip-missing-entry-points-plugin.mjs</h2>
              <p>
                Below is the full code of the skip missing entrypoints checker:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{SKIP_ENTRIES_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE MANIFEST */}
            <section id="code-manifest">
              <h2>⚙️ manifest-generator-plugin.mjs</h2>
              <p>
                Below is the full code of the output manifest generator:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{MANIFEST_CODE}</CodeBlock>
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
