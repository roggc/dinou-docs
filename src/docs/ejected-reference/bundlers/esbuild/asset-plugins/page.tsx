"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Palette, Settings, Cpu, Image } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "assets-flow", title: "📊 Assets Plugin Flow", level: 2 },
  { id: "css-flow", title: "📊 CSS Processor Flow", level: 2 },
  { id: "code-assets", title: "⚙️ assets-plugin.mjs", level: 2 },
  { id: "code-css", title: "⚙️ css-processor-plugin.mjs", level: 2 },
  { id: "code-extractor", title: "⚙️ postcss-extract-plugin.js", level: 2 },
];

const ASSETS_DIAGRAM = `                             esbuild Compiles assets
                                       │
                      onResolve: Intercept asset formats
                                       │
             ┌─────────────────────────┴─────────────────────────┐
             ▼                                                   ▼
       [kind = entry-point]                                [Import/Require]
     Namespace: "dinou-asset-entry"                       Namespace: "dinou-asset"
             │                                                   │
             └─────────────────────────┬─────────────────────────┘
                                       │
                                       ▼
                             onEnd: Collect outputs
                                       │
             ┌─────────────────────────┴─────────────────────────┐
             ▼                                                   ▼
     [Normal Asset Chunks]                               [Inlined JS Chunks]
     Rename to scoped paths                              Locate "// dinou-asset:..." comment
     e.g., assets/scoped-hash.png                        Extract asset binary contents
                                                         Write asset to assets/scoped-hash.png
                                                         Replace chunk var to point to asset`;

const CSS_DIAGRAM = `                           esbuild imports .css file
                                       │
                                       ▼
                       postcss([ ...plugins, extractor ])
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
     [postcssImport]           [postCssModules]             [extractor]
     Resolve alias using       Scoped module names        OnceExit: append rules,
     getAbsPathWithExt()       e.g. .button-scoped        root.removeAll()
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       ▼
                             [File Type Evaluation]
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
          [module.css]                                   [global.css]
     export default { button: ... }                  /* global: styles */`;

const ASSETS_CODE = `import fs from "node:fs/promises";
import path from "node:path";
import createScopedName from "../../core/createScopedName.js";
import { regex } from "../../core/asset-extensions.js";
import { getAbsPathWithExt } from "../../core/get-abs-path-with-ext.js";
import { pathToFileURL } from "node:url";

const escapeRegExp = (string) => string.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");

export default function assetsPlugin({ include = regex } = {}) {
  return {
    name: "assets-plugin",
    setup(build) {
      const outdir = build.initialOptions.outdir;
      if (!outdir) {
        throw new Error("assetsPlugin requires outdir to be set");
      }

      build.initialOptions.assetNames = "assets/[name]-[hash]";

      // 1. Intercept asset references
      build.onResolve({ filter: include }, (args) => {
        const resolvedAlias =
          args.kind === "entry-point"
            ? args.path
            : getAbsPathWithExt(args.path, {
                parentURL: pathToFileURL(args.importer).href,
              });

        if (args.kind === "entry-point") {
          return { path: resolvedAlias, namespace: "dinou-asset-entry" };
        }
        return { path: resolvedAlias, namespace: "dinou-asset" };
      });

      // 2. Read asset buffers and load them
      build.onLoad({ filter: /.*/, namespace: "dinou-asset" }, async (args) => {
        const contents = await fs.readFile(args.path);
        return { contents, loader: "file" };
      });

      build.onLoad({ filter: /.*/, namespace: "dinou-asset-entry" }, async (args) => {
        const contents = await fs.readFile(args.path);
        return { contents, loader: "file" };
      });

      // 3. Process outputs, rename hashed files, and extract inlined assets from JS chunks
      build.onEnd(async (result) => {
        if (!result.metafile || !result.outputFiles?.length) return;

        const renames = new Map();
        const normalizeRel = (p) => p.replace(/\\\\/g, "/");
        const processedSourceFiles = new Set();

        // Pass 1: Normal static assets (images, icons)
        for (const [oldRelPath, info] of Object.entries(result.metafile.outputs)) {
          if (info.entryPoint || Object.keys(info.inputs).length !== 1) continue;

          const inputPath = Object.keys(info.inputs)[0];
          const sourceFile = inputPath.replace(/^dinou-asset:/, "").replace(/^dinou-asset-entry:/, "");
          if (!include.test(sourceFile)) continue;

          const ext = path.extname(sourceFile);
          if (!oldRelPath.endsWith(ext)) continue;
          const base = path.basename(sourceFile, ext);
          const scoped = createScopedName(base, sourceFile);
          const newLocal = \`assets/\${scoped}\${ext}\`;
          const oldLocal = normalizeRel(path.relative(outdir, oldRelPath));

          renames.set(oldLocal, newLocal);
          processedSourceFiles.add(sourceFile);
        }

        // Pass 2: Extract inlined assets from within JS files
        for (const [outputPath, info] of Object.entries(result.metafile.outputs)) {
          if (!outputPath.endsWith(".js") || info.entryPoint) continue;

          for (const inputPath of Object.keys(info.inputs)) {
            if (!inputPath.startsWith("dinou-asset:")) continue;

            const sourceFile = inputPath.replace(/^dinou-asset:/, "");
            if (!include.test(sourceFile) || processedSourceFiles.has(sourceFile)) continue;

            try {
              const ext = path.extname(sourceFile);
              const base = path.basename(sourceFile, ext);
              const scoped = createScopedName(base, sourceFile);
              const newLocal = \`assets/\${scoped}\${ext}\`;

              const assetContent = await fs.readFile(sourceFile);
              const newOutputFile = {
                path: path.join(outdir, newLocal),
                contents: assetContent,
                get text() { return new TextDecoder().decode(this.contents); }
              };

              result.outputFiles.push(newOutputFile);
              processedSourceFiles.add(sourceFile);

              const chunkFile = result.outputFiles.find(
                (f) => normalizeRel(path.relative(process.cwd(), f.path)) === outputPath
              );

              if (chunkFile) {
                let chunkContent = new TextDecoder().decode(chunkFile.contents);
                const assetComment = \`// \${inputPath}\`;
                const commentIndex = chunkContent.indexOf(assetComment);

                if (commentIndex !== -1) {
                  const nextLineStart = chunkContent.indexOf("\\n", commentIndex) + 1;
                  const nextLineEnd = chunkContent.indexOf("\\n", nextLineStart);
                  const assignmentLine = chunkContent.substring(nextLineStart, nextLineEnd);
                  const varMatch = assignmentLine.match(/var (\\w+)_default = "([^"]+)"/);

                  if (varMatch) {
                    const varName = varMatch[1];
                    const newAssignmentLine = \`var \${varName}_default = "/\${newLocal}";\`;
                    chunkContent = chunkContent.substring(0, nextLineStart) + newAssignmentLine + chunkContent.substring(nextLineEnd);
                  }
                }
                chunkFile.contents = new TextEncoder().encode(chunkContent);
              }
            } catch (error) {
              console.error(\`Error extracting asset \${sourceFile} from chunk:\`, error);
            }
          }
        }

        // Pass 3: Rewrite paths across JS/CSS output files
        for (const file of result.outputFiles) {
          const relPath = normalizeRel(path.relative(process.cwd(), file.path));
          if (!relPath.endsWith(".js") && !relPath.endsWith(".css")) continue;

          let content = new TextDecoder().decode(file.contents);
          for (const [oldLocal, newLocal] of renames) {
            const patterns = [
              [\`"./\${escapeRegExp(oldLocal)}"\`, \`"/\${newLocal}"\`],
              [\`"\${escapeRegExp(oldLocal)}"\`, \`"\${newLocal}"\`],
            ];
            for (const [oldPattern, newPattern] of patterns) {
              content = content.replace(new RegExp(oldPattern, "g"), newPattern);
            }
          }
          file.contents = new TextEncoder().encode(content);
        }

        // Apply final paths
        for (const file of result.outputFiles) {
          const relPath = normalizeRel(path.relative(process.cwd(), file.path));
          const oldLocal = normalizeRel(path.relative(outdir, relPath));
          const newLocal = renames.get(oldLocal);

          if (newLocal) {
            file.path = path.join(outdir, newLocal);
          }
        }
      });
    },
  };
}`;

const CSS_CODE = `import fs from "node:fs/promises";
import path from "node:path";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import createScopedName from "../../core/createScopedName.js";
import postCssModules from "postcss-modules";
import postcss from "postcss";
import postcssImport from "postcss-import";
import { getAbsPathWithExt } from "../../core/get-abs-path-with-ext.js";
import { pathToFileURL } from "node:url";
import resolve from "resolve";
import createPostCSSExtractPlugin from "../plugins-postcss/postcss-extract-plugin.js";

export default function cssProcessorPlugin({ outdir = "public" } = {}) {
  const { finalize, plugin: extractor } = createPostCSSExtractPlugin({
    outputFile: \`\${outdir}/styles.css\`,
  });

  return {
    name: "css-processor",
    setup(build) {
      build.onLoad({ filter: /\\.css$/ }, async (args) => {
        const filePath = args.path;
        const source = await fs.readFile(filePath, "utf8");
        let map = {};

        // Process CSS using PostCSS chain
        await postcss([
          postcssImport({
            resolve: (id, basedir) => {
              const resolvedAlias = getAbsPathWithExt(id, {
                parentURL: pathToFileURL(basedir).href,
              });
              if (resolvedAlias) return resolvedAlias;
              if (id.startsWith("tailwindcss/")) {
                return resolve.sync(id, { basedir, extensions: [".css"] });
              }
              return resolve.sync(id, { basedir, extensions: [".css"] });
            },
          }),
          tailwindcss(),
          autoprefixer,
          postCssModules({
            generateScopedName: (name, filename) => {
              if (!filename.endsWith(".module.css")) return name;
              return createScopedName(name, filename);
            },
            getJSON: (_, json) => { map = json; },
          }),
          extractor, // Extract rules and strip duplicate injections
        ]).process(source, { from: filePath });

        // If it is a CSS module, return class mapper exports to javascript
        if (filePath.endsWith(".module.css")) {
          return {
            contents: \`export default \${JSON.stringify(map)};\`,
            loader: "js",
          };
        } else {
          return {
            contents: \`/* global: \${path.basename(filePath)} */\`,
            loader: "js",
          };
        }
      });

      build.onEnd(() => {
        finalize();
      });
    },
  };
}`;

const EXTRACTOR_CODE = `const fs = require("fs");
const path = require("path");

const createPostCSSExtractPlugin = (options = {}) => {
  const { outputFile = "styles.css", shouldExtract = () => true } = options;
  let extractedCSS = "";

  const postcssPlugin = {
    postcssPlugin: "postcss-extract",

    OnceExit(root, { result }) {
      const filePath = result.opts.from;

      if (shouldExtract(filePath, root)) {
        extractedCSS += root.toString();
        extractedCSS += "\\n";

        // Remove CSS rules from raw file to prevent duplicate injections in JS
        root.removeAll();
      }
    },
  };

  const finalize = () => {
    if (!extractedCSS) return;
    const outputDir = path.dirname(outputFile);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, extractedCSS);
    extractedCSS = "";
  };

  return {
    plugin: postcssPlugin,
    finalize,
  };
};

module.exports = createPostCSSExtractPlugin;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Palette className="h-6 w-6 text-primary text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Style & Asset Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the asset loader, custom scoping classifiers, PostCSS processors, and global stylesheet extractors.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • Asset Manager: <code>./dinou/esbuild/plugins-esbuild/assets-plugin.mjs</code> <br />
              • CSS Processor: <code>./dinou/esbuild/plugins-esbuild/css-processor-plugin.mjs</code> <br />
              • Style Extractor: <code>./dinou/esbuild/plugins-postcss/postcss-extract-plugin.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Handling stylesheets and image files in a custom bundler environment requires extra steps. When components import stylesheets (like <code>import "./theme.css"</code>) or reference assets (like <code>import logo from "./logo.png"</code>), esbuild must route, extract, and rewrite paths so files can be resolved by browser requests.
              </p>
            </section>

            <hr className="my-8" />

            {/* ASSETS FLOW */}
            <section id="assets-flow">
              <h2>📊 Assets Plugin Flow</h2>
              <p>
                The flowchart below shows how static files are intercepted, scoped, and resolved from JavaScript chunks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{ASSETS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CSS FLOW */}
            <section id="css-flow">
              <h2>📊 CSS Processor Flow</h2>
              <p>
                The flowchart below shows how CSS Modules and tailwind styles are parsed and compiled into `styles.css`:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{CSS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH ASSETS */}
            <section id="code-assets">
              <h2>⚙️ assets-plugin.mjs</h2>
              <p>
                Below is the full, complete code of the esbuild assets extraction plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ASSETS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH CSS */}
            <section id="code-css">
              <h2>⚙️ css-processor-plugin.mjs</h2>
              <p>
                Below is the full, complete code of the PostCSS compilation plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CSS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH EXTRACTOR */}
            <section id="code-extractor">
              <h2>⚙️ postcss-extract-plugin.js</h2>
              <p>
                Below is the full, complete code of the PostCSS stylesheet extractor:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{EXTRACTOR_CODE}</CodeBlock>
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
