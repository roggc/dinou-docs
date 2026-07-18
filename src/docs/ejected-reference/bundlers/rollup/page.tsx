"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { RefreshCw, Settings, FileCode, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "rollup-pipeline", title: "📊 Rollup Build Pipeline", level: 2 },
  { id: "rollup-config", title: "🛠️ 1. rollup.config.js Options", level: 2 },
  { id: "postcss-config", title: "🎨 2. postcss.config.js Options", level: 2 },
];

const ROLLUP_PIPELINE_DIAGRAM = `graph TD
    Start[rollup.config.js] --> ResolvePaths[tsconfigPaths:<br/>Resolve tsconfig shortcuts]
    ResolvePaths --> ResolveDeps[nodeResolve:<br/>Resolve standard node modules]
    ResolveDeps --> CommonJS[commonjs:<br/>Convert CommonJS modules to ESM]
    CommonJS --> Assets[dinouAssetPlugin:<br/>Scopes & copies static assets]
    Assets --> Transpile[babel:<br/>react-compiler / react-refresh / typescript]
    Transpile --> PostCSS[postcss:<br/>Tailwind / CSS Modules scoping]
    PostCSS --> RSC[reactClientManifest:<br/>Scans imports recursively & maps client chunks]
    RSC --> HMR[reactRefreshWrapModules & esmHmrPlugin:<br/>Injects dev HMR frames]
    HMR --> Manifest[manifestGeneratorPlugin:<br/>Generates production bundle mapping]
    Manifest --> ServerFunc[serverFunctionsPlugin:<br/>Replaces 'use server' with client proxies]`;

const ROLLUP_CONFIG_CODE = `const path = require("path");
const fs = require("fs");
const postcss = require("rollup-plugin-postcss");
const babel = require("@rollup/plugin-babel").default;
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const copy = require("rollup-plugin-copy");
const reactClientManifest = require("./rollup-plugins/rollup-plugin-react-client-manifest.js");
const createScopedName = require("../core/createScopedName.js");
const replace = require("@rollup/plugin-replace");
const json = require("@rollup/plugin-json");
const reactRefreshWrapModules = require("./react-refresh/react-refresh-wrap-modules.js");
const { esmHmrPlugin } = require("./react-refresh/rollup-plugin-esm-hmr.js");
const dinouAssetPlugin = require("./rollup-plugins/dinou-asset-plugin.js");
const tsconfigPaths = require("rollup-plugin-tsconfig-paths");
const serverFunctionsPlugin = require("./rollup-plugins/rollup-plugin-server-functions");
const { regex } = require("../core/asset-extensions.js");
const manifestGeneratorPlugin = require("./rollup-plugins/manifest-generator-plugin.js");

const isDevelopment = process.env.NODE_ENV !== "production";
const outputDirectory = isDevelopment ? "public" : "dist3";

const localDinouPath = path.resolve(process.cwd(), "dinou");
const isEjected = fs.existsSync(localDinouPath);

module.exports = async function () {
  const del = (await import("rollup-plugin-delete")).default;
  return {
    input: isDevelopment
      ? {
        runtime: path.resolve(__dirname, "react-refresh/react-refresh-runtime.js"),
        refresh: path.resolve(__dirname, "react-refresh/react-refresh-entry.js"),
        main: path.resolve(__dirname, "../core/client.jsx"),
        error: path.resolve(__dirname, "../core/client-error.jsx"),
        serverFunctionProxy: path.resolve(__dirname, "../core/server-function-proxy.js"),
        dinouClientRedirect: path.resolve(__dirname, "../core/client-redirect.jsx"),
        dinouLink: path.resolve(__dirname, "../core/link.jsx"),
      }
      : {
        main: path.resolve(__dirname, "../core/client.jsx"),
        error: path.resolve(__dirname, "../core/client-error.jsx"),
        serverFunctionProxy: path.resolve(__dirname, "../core/server-function-proxy.js"),
        dinouClientRedirect: path.resolve(__dirname, "../core/client-redirect.jsx"),
        dinouLink: path.resolve(__dirname, "../core/link.jsx"),
      },
    output: {
      dir: outputDirectory,
      format: "esm",
      entryFileNames: isDevelopment ? "[name].js" : "[name]-[hash].js",
      chunkFileNames: isDevelopment ? "[name].js" : "[name]-[hash].js",
      minifyInternalExports: false,
    },
    preserveEntrySignatures: "strict",
    external: [
      "/refresh.js",
      "/__hmr_client__.js",
      "/__SERVER_FUNCTION_PROXY__",
    ],
    plugins: [
      del({
        targets: [
          \`\${outputDirectory}/*\`,
          "react_client_manifest/*",
          "server_functions_manifest/*",
        ],
        runOnce: true,
        hook: "buildStart",
      }),
      tsconfigPaths(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(
          isDevelopment ? "development" : "production"
        ),
      }),
      json(),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        browser: true,
        preferBuiltins: false,
      }),
      commonjs({
        include: isEjected ? [/node_modules/, /dinou/] : /node_modules/,
      }),
      dinouAssetPlugin({
        include: regex,
      }),
      babel({
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
        plugins: [
          "babel-plugin-react-compiler",
          isDevelopment && require.resolve("react-refresh/babel"),
          "@babel/plugin-syntax-import-meta",
        ].filter(Boolean),
        exclude: /node_modules[\\\\/](?!dinou|react-refresh)/,
      }),
      postcss({
        modules: {
          generateScopedName: (name, filename) =>
            createScopedName(name, filename),
        },
        extract: "styles.css",
        minimize: !isDevelopment,
        config: {
          path: path.resolve(__dirname, "postcss.config.js"),
        },
      }),
      copy({
        targets: [
          {
            src: "favicons/*",
            dest: outputDirectory,
          },
        ],
        flatten: true,
      }),
      reactClientManifest({
        manifestPath: path.join(
          "react_client_manifest",
          "react-client-manifest.json"
        ),
      }),
      isDevelopment && reactRefreshWrapModules(),
      isDevelopment && esmHmrPlugin(),
      !isDevelopment && manifestGeneratorPlugin(),
      serverFunctionsPlugin(),
    ].filter(Boolean),
    watch: {
      exclude: [
        "public/**",
        "react_client_manifest/**",
        "server_functions_manifest/**",
      ],
    },
  };
};`;

const POSTCSS_CONFIG_CODE = `module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
  ],
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-6 w-6 text-primary text-orange-600 dark:text-orange-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Rollup Overview & Config
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the architecture of Rollup's compilation pipeline and the base config files used to compile assets for production releases.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Folder Location:</strong> <code>./dinou/rollup/</code> <br />
              <strong>Focus Files:</strong> <code>rollup.config.js</code>, <code>postcss.config.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou integrates <strong>Rollup</strong> as its build system for production deployments due to its top-tier treeshaking capabilities and compact ESM code output.
              </p>
              <p>
                In ejected applications, the Rollup configuration coordinates loaders for React Server Components (RSCs), processes TailwindCSS transformations, writes asset lookup tables, and builds hydration manifest endpoints.
              </p>
            </section>

            <hr className="my-8" />

            {/* PIPELINE */}
            <section id="rollup-pipeline">
              <h2>📊 Rollup Build Pipeline</h2>
              <p>
                The flowchart below shows the sequence of plugins executed during the compilation pipeline:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{ROLLUP_PIPELINE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROLLUP CONFIG */}
            <section id="rollup-config">
              <h2>🛠️ 1. <code>rollup.config.js</code> Options</h2>
              <p>
                This script manages chunking targets, applies Babel transpilation (for React Auto-Memoization and React Refresh), and loads customized asset handlers:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ROLLUP_CONFIG_CODE}</CodeBlock>
              </div>
              <p>
                <strong>Key Details:</strong>
              </p>
              <ul>
                <li><strong><code>preserveEntrySignatures: "strict"</code></strong>: Forces Rollup to preserve exact export names for entry points, ensuring hydrate-bound component maps don't break.</li>
                <li><strong><code>minifyInternalExports: false</code></strong>: Prevents internal variables from getting minified into single-letter symbols, retaining standard hydration signatures.</li>
                <li><strong><code>babel-plugin-react-compiler</code></strong>: Optimizes React component trees dynamically by injecting the React 19 memoization compiler at build time.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* POSTCSS CONFIG */}
            <section id="postcss-config">
              <h2>🎨 2. <code>postcss.config.js</code> Options</h2>
              <p>
                Defines PostCSS rules to apply TailwindCSS transformations and compile vendor prefixes during stylesheet build steps:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{POSTCSS_CONFIG_CODE}</CodeBlock>
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
