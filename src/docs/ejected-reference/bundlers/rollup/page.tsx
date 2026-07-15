"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { RefreshCw, FileCode, Cpu, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "config-setup", title: "⚙️ 1. rollup.config.js Orchestration", level: 2 },
  { id: "rollup-plugins", title: "🔌 2. Custom Plugins (rollup-plugins/)", level: 2 },
  { id: "styles-config", title: "🎨 3. PostCSS Styles Setup", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orange-600 dark:text-orange-500">
                Rollup Integration Guide
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An exhaustive file-by-file breakdown of the build configuration and compile plugins inside the <code>dinou/rollup/</code> directory.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Folder Path:</strong> <code>./dinou/rollup/</code> <br />
              <strong>Role:</strong> Bundles client-side hydration entries and processes stylesheet modules for production outputs using advanced tree-shaking logic.
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Rollup excels at tree-shaking and dead-code elimination, making it the choice for production builds in Dinou. The Rollup setup processes React hydration entries, hooks stylesheet configs, and generates the module manifest graphs.
              </p>
            </section>

            <hr className="my-8" />

            {/* CONFIG SETUP */}
            <section id="config-setup">
              <h2>⚙️ 1. rollup.config.js Orchestration</h2>
              <p>
                The <code>rollup.config.js</code> file defines the client compilation paths. It aggregates entrypoints, registers plugins, and splits layout files into optimal chunks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`export default {
  input: "dinou/core/client.jsx", // Hydration loader
  output: {
    dir: "dist3",
    format: "esm",
    entryFileNames: "main.js",
    chunkFileNames: "chunks/[name]-[hash].js",
  },
  plugins: [
    nodeResolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    commonjs(),
    babel({ ...BabelConfig }),
    postcss({ ...PostCSSConfig }),
    dinouAssetPlugin(),
    reactClientManifestPlugin(),
  ],
};`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROLLUP PLUGINS */}
            <section id="rollup-plugins">
              <h2>🔌 2. Custom Plugins (<code>rollup-plugins/</code>)</h2>
              <p>
                Rollup uses 4 custom plugins to handle React Server Components features:
              </p>
              
              <div className="space-y-4 not-prose my-6 text-sm">
                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-orange-600 dark:text-orange-400">rollup-plugin-react-client-manifest.js</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    The core RSC plugin. It scans all imported modules, identifies files containing the `"use client"` directive, registers their exports, and outputs the `react-client-manifest.json` file detailing client reference chunks.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-orange-600 dark:text-orange-400">rollup-plugin-server-functions.js</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Scans files containing `"use server"`, extracts their action function names, and registers action keys inside `server-functions-manifest.json` to enable secure browser-side action postbacks.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-orange-600 dark:text-orange-400">dinou-asset-plugin.js</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Asset copy loader. It copies binary files (images, audio) imported inside scripts to the public build directory and outputs their hashed static paths.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-orange-600 dark:text-orange-400">manifest-generator-plugin.js</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Aggregates chunk mappings and outputs the SSR require map file: `react-ssr-manifest.json`.
                  </p>
                </div>
              </div>
            </section>

            <hr className="my-8" />

            {/* STYLES CONFIG */}
            <section id="styles-config">
              <h2>🎨 3. PostCSS Styles Setup</h2>
              <p>
                The <code>postcss.config.js</code> file sets up stylesheet plugins (like <code>autoprefixer</code> or CSS modules) used during compilation to process CSS Module scopes inside Rollup.
              </p>
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
