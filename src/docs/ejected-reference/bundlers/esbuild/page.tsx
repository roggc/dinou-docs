"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Settings, FileCode, Cpu, Shield, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "config-dev", title: "🛠️ 1. get-config-esbuild.mjs", level: 2 },
  { id: "config-prod", title: "🚀 2. get-config-esbuild-prod.mjs", level: 2 },
  { id: "normalize-path", title: "📂 3. normalize-path.mjs", level: 2 },
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
                1. esbuild Overview & Configs
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the architecture of the esbuild compiler loop and the baseline configuration files that coordinate outputs.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Sub-Folder Location:</strong> <code>./dinou/esbuild/</code> <br />
              <strong>Focus Files:</strong> <code>get-config-esbuild.mjs</code>, <code>get-config-esbuild-prod.mjs</code>, <code>normalize-path.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou chooses esbuild as its primary build tool for local runs due to its speed. When compiled, esbuild uses Go binaries to build JSX, TypeScript, and standard JavaScript files.
              </p>
              <p>
                The base configs defined in <code>helpers-esbuild/</code> structure the compiler options, path definitions, output configurations, and loader bindings.
              </p>
            </section>

            <hr className="my-8" />

            {/* CONFIG DEV */}
            <section id="config-dev">
              <h2>🛠️ 1. <code>get-config-esbuild.mjs</code></h2>
              <p>
                This helper yields the base settings for local development runs. It configures paths and enables source maps to facilitate debugging:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`import path from "node:path";
import assetsPlugin from "../plugins-esbuild/assets-plugin.mjs";
import cssProcessorPlugin from "../plugins-esbuild/css-processor-plugin.mjs";

export default function getConfigEsbuild(entryPoints, outdir) {
  return {
    entryPoints,
    bundle: true,
    outdir,
    format: "esm",
    platform: "browser",
    target: ["es2020"],
    sourcemap: true,
    metafile: true,
    minify: false,
    splitting: true,
    external: ["react", "react-dom", "@roggc/react-server-dom-esm"],
    // ...
  };
}`}</CodeBlock>
              </div>
              <p>
                <strong>Key Details:</strong>
              </p>
              <ul>
                <li><strong><code>splitting: true</code></strong>: Enables code splitting. Crucial for React Server Components so that client components are extracted into separate files that browser runtimes can load asynchronously.</li>
                <li><strong><code>format: "esm"</code></strong>: Generates ES Modules, which are required for standard module loading and dynamic imports.</li>
                <li><strong><code>external</code></strong>: Excludes core React packages (<code>react</code>, <code>react-dom</code>) from client bundles. These modules are resolved by Dinou's browser resolver using import maps, reducing chunk weights.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CONFIG PROD */}
            <section id="config-prod">
              <h2>🚀 2. <code>get-config-esbuild-prod.mjs</code></h2>
              <p>
                Extends the development config to optimize builds for production releases (<code>npm run build</code>):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`import getConfigEsbuild from "./get-config-esbuild.mjs";

export default function getConfigEsbuildProd(entryPoints, outdir) {
  const baseConfig = getConfigEsbuild(entryPoints, outdir);
  return {
    ...baseConfig,
    minify: true,
    sourcemap: false,
    drop: ["console", "debugger"],
    treeShaking: true,
  };
}`}</CodeBlock>
              </div>
              <p>
                <strong>Key Details:</strong>
              </p>
              <ul>
                <li><strong><code>minify: true</code></strong>: Compresses compiled files and renames variables to minimize asset download times.</li>
                <li><strong><code>sourcemap: false</code></strong>: Disables source maps in production to reduce build footprints and protect source code.</li>
                <li><strong><code>drop: ["console", "debugger"]</code></strong>: Strips console statements and debugging triggers from production outputs.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* NORMALIZE PATH */}
            <section id="normalize-path">
              <h2>📂 3. <code>normalize-path.mjs</code></h2>
              <p>
                Coordinates cross-platform path matching. Windows uses backslashes (<code>\\</code>) to define paths, while macOS and Linux use forward slashes (<code>/</code>). 
              </p>
              <p>
                To prevent key mismatch bugs inside the hydration manifest JSON file, this helper normalizes all paths to the UNIX standard:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`export function normalizePath(filePath) {
  if (typeof filePath !== "string") return filePath;
  return filePath.replace(/\\\\/g, "/");
}`}</CodeBlock>
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
