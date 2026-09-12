"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Globe } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "resolver-flow", title: "📊 Entry Resolver Flow", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const ENTRY_RESOLVER_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '18px' }}}%%
graph TD
    Start["getCSSEntries"] --> Scan["Crawl src/ for JS/TS/CSS components"]
    Scan --> LoopFiles["Loop project files"]
    LoopFiles --> CheckClient{"Is Client Component?"}
    
    CheckClient -->|Yes| RegisterClient["Add to detectedClientEntries & extract imports recursively"]
    CheckClient -->|No| CheckPage{"Is Page or Layout?"}
    
    CheckPage -->|Yes| RecurseCSS["Extract imports recursively to gather CSS stylesheets"]
    CheckPage -->|No| Skip["Skip file"]
    
    RegisterClient --> ComputeHash["Hash absolute paths for output stability"]
    RecurseCSS --> ComputeHash
    ComputeHash --> Return["Return detectedCSSEntries & detectedClientEntries"]`;

const RESOLVER_CODE = `const { readFileSync } = require("fs");
const path = require("node:path");
const glob = require("fast-glob");
const { pathToFileURL } = require("node:url");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const crypto = require("node:crypto");
const { regex: assetRegex } = require("../../core/asset-extensions.js");
const { getAbsPathWithExt } = require("../../core/get-abs-path-with-ext.js");
const { useClientRegex, useServerRegex } = require("../../constants.js");

const normalizePath = (p) => p.split(path.sep).join(path.posix.sep);

function hashFilePath(absPath) {
  return crypto.createHash("sha1").update(absPath).digest("hex").slice(0, 8);
}

async function getCSSEntries({
  srcDir = path.resolve("src"),
  assetInclude = assetRegex,
  manifest = {},
} = {}) {
  const detectedClientEntries = new Set();
  const detectedCSSEntries = new Set();

  async function getImportsAndAssetsAndCsss(
    code,
    baseFilePath,
    visited = new Set(),
    isTopLevelClientComponent = false,
  ) {
    if (visited.has(baseFilePath)) {
      return { imports: [], assets: [], csss: [] };
    }
    visited.add(baseFilePath);

    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
    const imports = new Set();
    const assets = new Set();
    const csss = new Set();

    const importNodes = [];
    traverse.default(ast, {
      ImportDeclaration(nodePath) {
        importNodes.push(nodePath);
      },
    });

    for (const nodePath of importNodes) {
      const source = nodePath.node.source.value;

      // Resolve the import to absolute path (with extension) using your helper
      const absImportPathWithExt = getAbsPathWithExt(source, {
        parentURL: pathToFileURL(baseFilePath).href,
      });

      if (!absImportPathWithExt) {
        continue;
      }

      let importedCode;
      try {
        importedCode = readFileSync(absImportPathWithExt, "utf8");
      } catch (err) {
        console.warn(
          \`[get-esbuild-entries] Could not read import: \${absImportPathWithExt}\`,
          err.message,
        );
        continue;
      }

      if (!isTopLevelClientComponent) {
        const isImportedFileClient = useClientRegex.test(importedCode.trim());

        if (isImportedFileClient) {
          continue; // Do not recursively process client components
        }
      } else {
        const isImportedFileServer = useServerRegex.test(importedCode.trim());

        if (isImportedFileServer) {
          continue;
        }
      }

      if (
        absImportPathWithExt.endsWith(".css") ||
        absImportPathWithExt.endsWith(".scss") ||
        absImportPathWithExt.endsWith(".less")
      ) {
        csss.add(absImportPathWithExt);
        continue;
      }

      if (assetInclude.test(absImportPathWithExt)) {
        assets.add(absImportPathWithExt);
        continue;
      }

      imports.add(absImportPathWithExt);

      try {
        const nested = await getImportsAndAssetsAndCsss(
          importedCode,
          absImportPathWithExt,
          visited,
          isTopLevelClientComponent,
        );
        nested.imports.forEach((p) => imports.add(p));
        nested.assets.forEach((p) => assets.add(p));
        nested.csss.forEach((p) => csss.add(p));
      } catch (err) {
        console.warn(
          \`[get-esbuild-entries] Could not process imports of: \${absImportPathWithExt}\`,
          err.message,
        );
      }
    }

    return {
      imports: Array.from(imports),
      assets: Array.from(assets),
      csss: Array.from(csss),
    };
  }

  function isPageOrLayout(absPath) {
    const fileName = path.basename(absPath);
    return fileName.startsWith("page.") || fileName.startsWith("layout.");
  }

  const files = await glob(["**/*.{js,jsx,ts,tsx}"], {
    cwd: srcDir,
    absolute: true,
  });

  for (const absPath of files) {
    const code = readFileSync(absPath, "utf8");
    const isClientModule = useClientRegex.test(code.trim());
    const normalizedPath = normalizePath(absPath);

    if (isClientModule) {
      const name = path.basename(absPath, path.extname(absPath));

      detectedClientEntries.add({
        absPath: normalizedPath,
        name,
      });
      const { imports } = await getImportsAndAssetsAndCsss(
        code,
        absPath,
        new Set(),
        true,
      );
      const clientComponentRegex = /\\.(js|jsx|ts|tsx)$/i;
      imports.forEach((imp) => {
        if (clientComponentRegex.test(imp) && !imp.includes("node_modules")) {
          const name = path.basename(imp, path.extname(imp));
          detectedClientEntries.add({
            absPath: normalizePath(imp),
            name,
          });
        }
      });
    } else if (isPageOrLayout(absPath)) {
      try {
        const { csss } = await getImportsAndAssetsAndCsss(code, absPath);

        if (csss.length > 0) {
          detectedCSSEntries.add(
            ...csss.map((cssPath) => ({
              absPath: normalizePath(cssPath),
              name: path.basename(cssPath, path.extname(cssPath)),
            })),
          );
        }
      } catch (err) {
        /* ignore */
      }
    }
  }

  for (const dCE of detectedClientEntries) {
    const hash = hashFilePath(dCE.absPath);
    const outfileName = \`\${dCE.name}-\${hash}\`;
    dCE.outfile = \`\${outfileName}.js\`;
    dCE.outfileName = outfileName;
  }

  for (const dCSSE of detectedCSSEntries) {
    const hash = hashFilePath(dCSSE.absPath);
    const outfileName = \`\${dCSSE.name}-\${hash}\`;
    dCSSE.outfile = \`\${outfileName}.js\`;
    dCSSE.outfileName = outfileName;
  }

  return [detectedCSSEntries, detectedClientEntries];
}

module.exports = getCSSEntries;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary text-cyan-600 dark:text-cyan-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Dynamic Entry Resolver
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the layout crawling systems and custom import graph builders used to construct Webpack entrypoints.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/webpack/helpers/get-webpack-entries.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Webpack builds dependency graphs from set entry points. Since Dinou's routes and components are created dynamically by developers, this helper scans the workspace to configure Webpack's entry points automatically.
              </p>
              <p>
                The resolver scans the <code>src/</code> directory, traces imports recursively, isolates client component boundaries, gathers required stylesheets, and returns deterministic hashed arrays containing active entrypoints.
              </p>
            </section>

            <hr className="my-8" />

            {/* RESOLVER FLOW */}
            <section id="resolver-flow">
              <h2>📊 Entry Resolver Flow</h2>
              <p>
                The flowchart below shows how directories are scanned and input components are mapped recursively:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="1200px">{ENTRY_RESOLVER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of the Webpack entries resolver helper:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RESOLVER_CODE}</CodeBlock>
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
