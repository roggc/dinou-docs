"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Play, Settings, RefreshCw, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "import-flow", title: "📊 Module Import Flow", level: 2 },
  { id: "cache-busting", title: "⚡ Dynamic Cache-Busting", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const IMPORT_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '16px' }}}%%
graph TD
    Start["importModule(modulePath)<br/>(Entry function call)"] --> Resolve["Resolve Absolute Path<br/>(path.isAbsolute ? path : path.resolve)"]
    Resolve --> WebpackCheck{"isWebpack?<br/>(Check build tool)"}
    
    WebpackCheck -->|"Yes"| CJS["CommonJS Context<br/>(Webpack bundles)"]
    CJS --> EnvCheck{"Check NODE_ENV"}
    EnvCheck -->|"production"| RequireProd["require(absPath)<br/>(Uses cached CJS module)"]
    EnvCheck -->|"development"| RequireDev["Delete require.cache[path]<br/>(Busts cache & requires fresh module)"]
    RequireProd --> FallbackESM["Error Fallback (ERR_REQUIRE_ESM)<br/>(Falls back to dynamic import)"]
    RequireDev --> FallbackESM

    WebpackCheck -->|"No"| ESM["ESM Context<br/>(Node.js native loader)"]
    FallbackESM --> ESM
    ESM --> EnvCheck2{"Check NODE_ENV"}
    EnvCheck2 -->|"production"| ImportProd["import(fileUrl)<br/>(Uses Node's native module cache)"]
    EnvCheck2 -->|"development"| ImportDev["import(fileUrl + '?t=timestamp')<br/>(Dynamic timestamp query busts ESM cache)"]`;

const IMPORT_CODE = `const { pathToFileURL } = require("url");
const path = require("path");
const isWebpack = process.env.DINOU_BUILD_TOOL === "webpack";

async function importModule(modulePath) {
  const absPath = path.isAbsolute(modulePath)
    ? modulePath
    : path.resolve(process.cwd(), modulePath);

  // 1. ESM Mode: Node.js standard imports
  if (!isWebpack) {
    let fileUrl = pathToFileURL(absPath).href;
    if (process.env.NODE_ENV !== "production") {
      // Append current timestamp query parameter to bust Node's ESM cache
      fileUrl += \`?t=\${Date.now()}\`;
    }
    const mod = await import(fileUrl);
    return mod;
  }

  // 2. Webpack Mode: CommonJS require loops
  try {
    if (process.env.NODE_ENV !== "production") {
      try {
        const resolved = require.resolve(absPath);
        delete require.cache[resolved]; // Prune cache to load updated code
      } catch (e) {}
    }
    return require(absPath);
  } catch (err) {
    // 3. Fallback: If require fails with ESM module error, import dynamically
    if (
      err.code === "ERR_REQUIRE_ESM" ||
      /require\\(\\)/.test(err.message)
    ) {
      let fileUrl = pathToFileURL(absPath).href;
      if (process.env.NODE_ENV !== "production") {
        fileUrl += \`?t=\${Date.now()}\`;
      }
      const mod = await import(fileUrl);
      return mod;
    }
    throw err;
  }
}

module.exports = importModule;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Play className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Module Importer (import-module.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the dynamic module loader, require cache-busters, and ESM vs CommonJS import wrappers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/import-module.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In development environments, when a developer modifies a page or component, the server must reload the code immediately. Node.js, however, caches loaded modules in memory. Subsequent imports return the cached code, ignoring file changes.
              </p>
              <p>
                The <code>import-module.js</code> utility resolves this restriction. It implements dynamic cache-busting logic for both standard ES modules and CommonJS structures.
              </p>
            </section>

            <hr className="my-8" />

            {/* IMPORT FLOW */}
            <section id="import-flow">
              <h2>📊 Module Import Flow</h2>
              <p>
                The flowchart below shows how modules are imported based on the bundler type and environment state:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="950px">{IMPORT_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CACHE BUSTING */}
            <section id="cache-busting">
              <h2>⚡ Dynamic Cache-Busting</h2>
              <p>
                The utility handles cache clearing using two techniques:
              </p>
              <ul>
                <li>
                  <strong>CommonJS require.cache:</strong> If running Webpack in development, queries <code>require.resolve(path)</code> and deletes the matched entry from <code>require.cache</code>, forcing Node to reread the file.
                </li>
                <li>
                  <strong>ESM query timestamping:</strong> Node's native <code>import()</code> cache cannot be deleted. The importer bypasses this by appending a dynamic timestamp query parameter (<code>?t=[timestamp]</code>) to the file URL. Node treats this as a new module URL, bypassing the cache.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>import-module.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{IMPORT_CODE}</CodeBlock>
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
