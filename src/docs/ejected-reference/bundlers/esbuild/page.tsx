"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Zap, Terminal, FileCode, Cpu, Settings, RefreshCw } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "core-scripts", title: "⚙️ 1. Core Build Runners", level: 2 },
  { id: "helpers", title: "🛠️ 2. Helpers (helpers-esbuild/)", level: 2 },
  { id: "esbuild-plugins", title: "🔌 3. Custom Plugins (plugins-esbuild/)", level: 2 },
  { id: "hmr-refresh", title: "🔄 4. ESM React Refresh (react-refresh/)", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-yellow-600 dark:text-yellow-500">
                esbuild Integration Guide
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An exhaustive file-by-file breakdown of the scripts, helpers, and custom compile plugins running inside the <code>dinou/esbuild/</code> directory.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Folder Path:</strong> <code>./dinou/esbuild/</code> <br />
              <strong>Role:</strong> Compiles assets for development and production, watches filesystem changes under <code>src/</code>, runs Babel compilers on demand, and broadcasts hot-reload frames via WebSockets.
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                esbuild compiles and bundles code extremely fast. Dinou uses esbuild as its default local development runner, orchestrating a file-watching live server and custom React Server Components plugins.
              </p>
            </section>

            <hr className="my-8" />

            {/* CORE SCRIPTS */}
            <section id="core-scripts">
              <h2>⚙️ 1. Core Build Runners</h2>
              <p>
                These files bootstrap the compiler process:
              </p>
              <ul>
                <li>
                  <strong><code>build.mjs</code> (Production Builder):</strong> Compiles client assets for production. It reads esbuild configurations, resolves layout chunks, and triggers tree-shaking optimizations.
                </li>
                <li>
                  <strong><code>dev.mjs</code> (Development Server):</strong> Monitors the workspace for code updates. It starts a local WebSocket server (port <code>3001</code>) and configures watch channels to broadcast reload frames when files change:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`const ctx = await esbuild.context({
  entryPoints: ["dinou/core/client.jsx"],
  bundle: true,
  outfile: "public/main.js",
  plugins: [esbuildReactRefreshPlugin(), postcssPlugin()],
});
await ctx.watch();`}</CodeBlock>
                  </div>
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* HELPERS */}
            <section id="helpers">
              <h2>🛠️ 2. Helpers (<code>helpers-esbuild/</code>)</h2>
              <p>
                Utilities to compute configurations and compile targets:
              </p>
              <ul>
                <li>
                  <strong><code>get-esbuild-entries.mjs</code>:</strong> Scans the directory structural maps of your pages (e.g. <code>src/app/</code>) and exports eligible bundle entrypoints.
                </li>
                <li>
                  <strong><code>get-config-esbuild.mjs</code> / <code>get-config-esbuild-prod.mjs</code>:</strong> Declares basic compilation configs (sourcemaps, targets, global definitions).
                </li>
                <li>
                  <strong><code>update-manifest-for-module.mjs</code>:</strong> Utility to modify hydration manifests.
                </li>
                <li>
                  <strong><code>write.mjs</code>:</strong> Concurrent writer script that checks file collisions before writing assets to disk.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* ESBUILD PLUGINS */}
            <section id="esbuild-plugins">
              <h2>🔌 3. Custom Plugins (<code>plugins-esbuild/</code>)</h2>
              <p>
                esbuild has no native loaders for CSS Modules, manifests, or React Server Components. Dinou implements 10 specialized plugins:
              </p>
              
              <div className="space-y-4 not-prose my-6 text-sm">
                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-yellow-600 dark:text-yellow-400">assets-plugin.mjs</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Intercepts media formats (images, fonts) imported inside scripts, copies them to the public assets directory, and returns hashed filenames.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-yellow-600 dark:text-yellow-400">react-client-manifest-plugin.mjs</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Detects components prefixed with `"use client"`, bypasses server compiling for their code bodies, and maps reference hashes inside `react-client-manifest.json`.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-yellow-600 dark:text-yellow-400">server-functions-plugin.mjs</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Scans methods prefixed with `"use server"`, isolates their references, and registers whitelisted IDs inside `server-functions-manifest.json` for remote execution postbacks.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-yellow-600 dark:text-yellow-400">css-processor-plugin.mjs</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Compiles local CSS Module imports using PostCSS, generates hashed class names, and exports CSS key-value maps to components.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-yellow-600 dark:text-yellow-400">stable-chunk-names-and-maps-plugin.mjs</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Ensures esbuild chunk names stay deterministic across incremental rebuilds to prevent browser caching conflicts.
                  </p>
                </div>
              </div>
            </section>

            <hr className="my-8" />

            {/* HMR REFRESH */}
            <section id="hmr-refresh">
              <h2>🔄 4. ESM React Refresh (<code>react-refresh/</code>)</h2>
              <p>
                To enable Hot Module Replacement (HMR) without reloading the browser page:
              </p>
              <ul>
                <li>
                  <strong><code>esm-hmr-plugin.mjs</code>:</strong> Injects an ESM-compatible HMR envelope around client modules, enabling them to establish hot boundaries.
                </li>
                <li>
                  <strong><code>react-refresh-runtime.mjs</code>:</strong> Injects standard React Refresh runtime routines, hooks component mount hooks, and performs atomic state rehydration.
                </li>
                <li>
                  <strong><code>is-react-refresh-boundary.mjs</code>:</strong> Determines if a module exports only React Components, qualifying it for hot updates.
                </li>
              </ul>
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
