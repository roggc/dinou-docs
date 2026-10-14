"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Settings, FileCode, Cpu, Shield, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "config-comparison", title: "📊 Dev vs Prod Configuration", level: 2 },
  { id: "config-dev", title: "🛠️ Dev Config (get-config-esbuild.mjs)", level: 2 },
  { id: "config-prod", title: "🚀 Prod Config (get-config-esbuild-prod.mjs)", level: 2 },
  { id: "normalize-path", title: "📂 Path Normalizer (normalize-path.mjs)", level: 2 },
];

const CONFIGS_DIAGRAM = `graph TD
    Start[Select Build Environment] --> Dev[Development Config<br/>get-config-esbuild.mjs]
    Start --> Prod[Production Config<br/>get-config-esbuild-prod.mjs]

    Dev --> DevProps[outdir: public<br/>sourcemap: true<br/>write: false]
    Prod --> ProdProps[outdir: dist3<br/>sourcemap: false<br/>minify: true]

    DevProps --> DevPlugins[Plugins:<br/>- TsconfigPathsPlugin<br/>- cssProcessorPlugin<br/>- reactClientManifestPlugin<br/>- stableChunkNamesAndMapsPlugin<br/>- serverFunctionsPlugin<br/>- esmHmrPlugin]
    ProdProps --> ProdPlugins[Plugins:<br/>- babelReactCompilerPlugin<br/>- TsconfigPathsPlugin<br/>- cssProcessorPlugin<br/>- reactClientManifestPlugin<br/>- manifestGeneratorPlugin<br/>- serverFunctionsPlugin<br/>- writePlugin]`;

const DEV_CONFIG_CODE = `import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";
import reactClientManifestPlugin from "../plugins-esbuild/react-client-manifest-plugin.mjs";
import serverFunctionsPlugin from "../plugins-esbuild/server-functions-plugin.mjs";
import cssProcessorPlugin from "../plugins-esbuild/css-processor-plugin.mjs";
import esmHmrPlugin from "../react-refresh/esm-hmr-plugin.mjs";
import stableChunkNamesAndMapsPlugin from "../plugins-esbuild/stable-chunk-names-and-maps-plugin.mjs";
import assetsPlugin from "../plugins-esbuild/assets-plugin.mjs";
import skipMissingEntryPointsPlugin from "../plugins-esbuild/skip-missing-entry-points-plugin.mjs";
import copyStaticFiles from "esbuild-copy-static-files";
import { existsSync } from "node:fs";

export default function getConfigEsbuild({
  entryPoints,
  outdir = "public",
  manifest = {},
  changedIds,
  hmrEngine,
}) {
  let plugins = [
    skipMissingEntryPointsPlugin(),
    TsconfigPathsPlugin({}),
    cssProcessorPlugin(),
    reactClientManifestPlugin({ manifest }),
    assetsPlugin(),
    stableChunkNamesAndMapsPlugin(),
    serverFunctionsPlugin(),
    esmHmrPlugin({ entryNames: ["main", "error"], changedIds, hmrEngine }),
  ];

  if (existsSync("favicons")) {
    plugins = [
      copyStaticFiles({
        src: "favicons",
        dest: outdir,
      }),
      ...plugins,
    ];
  }

  return {
    entryPoints,
    outdir,
    format: "esm",
    bundle: true,
    splitting: true,
    sourcemap: true,
    jsx: "automatic",
    target: "es2022",
    write: false, // Write is handled in-memory for HMR performance
    conditions: ["style"],
    metafile: true,
    logLevel: "warning",
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
    external: [
      "/__SERVER_FUNCTION_PROXY__",
      "/serverFunctionProxy.js",
      "/__hmr_client__.js",
      "/react-refresh-entry.js",
    ],
    plugins,
  };
}`;

const PROD_CONFIG_CODE = `import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";
import reactClientManifestPlugin from "../plugins-esbuild/react-client-manifest-plugin.mjs";
import serverFunctionsPlugin from "../plugins-esbuild/server-functions-plugin.mjs";
import cssProcessorPlugin from "../plugins-esbuild/css-processor-plugin.mjs";
import assetsPlugin from "../plugins-esbuild/assets-plugin.mjs";
import copyStaticFiles from "esbuild-copy-static-files";
import manifestGeneratorPlugin from "../plugins-esbuild/manifest-generator-plugin.mjs";
import writePlugin from "../plugins-esbuild/write-plugin.mjs";
import babelReactCompilerPlugin from "../plugins-esbuild/babel-react-compiler-plugin.mjs";
import { existsSync } from "node:fs";

const manifestData = {};

export default function getConfigEsbuildProd({
  entryPoints,
  outdir = "dist3",
  manifest = {},
}) {
  let plugins = [
    babelReactCompilerPlugin(), // Injects Babel React 19 compiler optimizations
    TsconfigPathsPlugin({}),
    cssProcessorPlugin({ outdir }),
    reactClientManifestPlugin({
      manifest,
      manifestPath: \`react_client_manifest/react-client-manifest.json\`,
    }),
    assetsPlugin(),
    manifestGeneratorPlugin(manifestData),
    serverFunctionsPlugin(manifestData),
    writePlugin(), // Writes final files from memory buffers to disk
  ];

  if (existsSync("favicons")) {
    plugins = [
      copyStaticFiles({
        src: "favicons",
        dest: outdir,
      }),
      ...plugins,
    ];
  }

  return {
    entryPoints,
    outdir,
    format: "esm",
    bundle: true,
    splitting: true,
    sourcemap: false,
    chunkNames: "[name]-[hash]",
    entryNames: "[name]-[hash]",
    jsx: "automatic",
    target: "es2022",
    write: false,
    conditions: ["style"],
    metafile: true,
    logLevel: "warning",
    minify: true,
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    external: [
      "/__SERVER_FUNCTION_PROXY__",
      "/serverFunctionProxy.js",
      "/__hmr_client__.js",
      "/react-refresh-entry.js",
    ],
    plugins,
  };
}`;

const NORMALIZE_CODE = `export function normalizePath(filePath) {
  if (typeof filePath !== "string") return filePath;
  
  // Replace Windows backslashes (\\) with standard POSIX forward slashes (/)
  return filePath.replace(/\\\\/g, "/");
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                esbuild Overview & Configs
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore the base configs and normalization utilities that initialize and control esbuild for dev and production.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Mapped:</strong> <br />
              • Dev Config: <code>./dinou/esbuild/helpers-esbuild/get-config-esbuild.mjs</code> <br />
              • Prod Config: <code>./dinou/esbuild/helpers-esbuild/get-config-esbuild-prod.mjs</code> <br />
              • Path Normalizer: <code>./dinou/esbuild/helpers-esbuild/normalize-path.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou chooses <strong>esbuild</strong> as its primary compilation engine during local development runs due to its speed. When compiling components, esbuild packages TSX, CSS, and asset files.
              </p>
              <p>
                The configuration models are split into two baseline builders (Development and Production) located in <code>helpers-esbuild/</code>, mapping variables, optimization flags, and custom loader plugins.
              </p>
            </section>

            <hr className="my-8" />

            {/* CONFIG FLOW */}
            <section id="config-comparison">
              <h2>📊 Dev vs Prod Configuration</h2>
              <p>
                The chart below compares the two configurations:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="700px">{CONFIGS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CONFIG DEV */}
            <section id="config-dev">
              <h2>🛠️ Dev Config (get-config-esbuild.mjs)</h2>
              <p>
                Yields compiler options optimal for local runs. Note that <code>write: false</code> is set to keep outputs in-memory for HMR server pushes, avoiding disk write overhead:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{DEV_CONFIG_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CONFIG PROD */}
            <section id="config-prod">
              <h2>🚀 Prod Config (get-config-esbuild-prod.mjs)</h2>
              <p>
                Extends the base setup for minified, optimized static builds. It enables hashes inside filenames, turns on minification, and attaches <code>writePlugin()</code> to commit memory buffers to files:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PROD_CONFIG_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* NORMALIZE PATH */}
            <section id="normalize-path">
              <h2>📂 Path Normalizer (normalize-path.mjs)</h2>
              <p>
                On Windows drives, absolute paths resolve with backslashes (<code>\</code>). If written directly into JSON chunk manifests, this casing leads to serialization mismatches on browser hydration.
              </p>
              <p>
                The <code>normalize-path.mjs</code> utility standardizes all filepaths to POSIX format before compiling them:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{NORMALIZE_CODE}</CodeBlock>
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
