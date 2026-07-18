"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import {
  Cpu,
  Boxes,
  Zap,
  Server,
  ShieldCheck,
  RefreshCw,
  Route,
  FolderTree,
  Terminal,
} from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "module-system", title: "📦 1. The Module System", level: 2 },
  { id: "esm-loader", title: "⚙️ 2. The ESM Loader", level: 2 },
  { id: "router", title: "🚏 3. File-System Router", level: 2 },
  { id: "ssr-pipeline", title: "🔄 4. Two-Process SSR Pipeline", level: 2 },
  { id: "ssg-pipeline", title: "💾 5. The SSG Pipeline", level: 2 },
  { id: "isg-isr", title: "⚡ 6. ISG and ISR Architecture", level: 2 },
  { id: "server-functions", title: "🚀 7. Server Functions", level: 2 },
  { id: "client-router", title: "⚛️ 8. Client Entry Point & SPA Runtime", level: 2 },
  { id: "bundler-integration", title: "📦 9. Bundler Integration", level: 2 },
  { id: "bundler-esbuild", title: "⚡ 9.1 esbuild Configuration", level: 3 },
  { id: "bundler-rollup", title: "🔄 9.2 Rollup Configuration", level: 3 },
  { id: "bundler-webpack", title: "🕸️ 9.3 Webpack Configuration", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Dinou Internals & Architecture
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Deep dive into how Dinou implements React Server Components, Server-Side Rendering (SSR), Incremental Static Generation (ISG), and Server Functions under the hood.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>This guide is written for developers who have ejected the framework or want to understand exactly how a custom React Server Components framework is implemented from scratch using Express.js.</strong>
            </blockquote>

            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg my-6 not-prose">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-600 dark:text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">⚠️ Disclaimer & Source of Truth</h3>
                  <div className="mt-1 text-sm text-amber-700 dark:text-amber-300 space-y-2">
                    <p>
                      The goal of this page is to bring the details of the ejected framework closer to the end developer to facilitate its understanding. However, given the high complexity of the internal engine, this analysis has been prepared with the assistance of an Artificial Intelligence (AI) agent and may contain inaccuracies or conceptual errors. <strong>The ultimate source of truth is always the actual code inside your ejected folder.</strong>
                    </p>
                    <p className="pt-1 border-t border-amber-500/20">
                      💡 <strong>Tip:</strong> If you want to explore the ejected codebase yourself, we highly encourage feeding your local <code>./dinou/</code> folder to an AI coding assistant. Refer to the <a href="/docs/ejected-reference" className="underline font-semibold hover:text-amber-900 dark:hover:text-amber-100">Ejected Folder Reference</a> for a comprehensive file-by-file breakdown, or read more in <a href="/docs/why-dinou#why-ai" className="underline font-semibold hover:text-amber-900 dark:hover:text-amber-100">AI-Friendly Design</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8" />

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview & Architecture Blueprint</h2>
              <p>
                Dinou is built on standard, vanilla Node.js primitives. There are no black boxes; when you run <code>npm run eject</code>, the entire framework code (found under the <code>./dinou/</code> directory, including the core engine under <code>./dinou/core/</code> and the bundler integrations under <code>./dinou/esbuild/</code>, <code>./dinou/rollup/</code>, and <code>./dinou/webpack/</code>) is copied into your repository, giving you complete freedom to inspect and modify it. For a quick map of what each generated file does, see the <a href="/docs/ejected-reference" className="underline font-semibold">Ejected Folder Reference</a>.
              </p>
              <p>
                Under the hood, Dinou coordinates a dual module system (CommonJS and ES Modules) and splits execution across two distinct Node.js processes to render pages. The blueprint below visualizes this request lifecycle:
              </p>

              <div className="not-prose my-6 border rounded-xl p-6 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto">
                <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre">{` 🌐 Browser Request
         │
         │ 1. GET /route
         ▼
┌────────────────────────────────────────────────────────┐
│  Parent Process: server.js                             │
│  (CommonJS Environment, --conditions=react-server)     │
│                                                        │
│  ┌───────────────────────┐                             │
│  │ Express Route Handler │                             │
│  └──────────┬────────────┘                             │
│             │ 2. Resolve target path                   │
│             ▼                                          │
│  ┌───────────────────────┐                             │
│  │ import-module.js      ├──────┐                      │
│  └───────────────────────┘      │ 3. await import()    │
│                                 ▼                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ESM Custom Loader Thread (babel-esm-loader.js)   │  │
│  │                                                  │  │
│  │  a. resolve() hook: maps TSConfig path aliases   │  │
│  │  b. load() hook: transpiles JSX & TS via Babel   │  │
│  └──────────────────────┬───────────────────────────┘  │
│                         │ 4. Executable JS returned    │
│                         ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ V8 Engine RSC Graph (Executes Server Components) │  │
│  └──────────────────────┬───────────────────────────┘  │
│                         │ 5. RSC Flight Stream JSON    │
│                         ▼                              │
└─────────────────────────┼──────────────────────────────┘
                          │
                          │ 6. Send Flight payload via Pipe (fd:4)
                          ▼
┌────────────────────────────────────────────────────────┐
│  Child Process: render-html.js                         │
│  (Standard SSR Environment, Client React)              │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Deserializer & SSR HTML compiler                 │  │
│  │ (react-dom/server -> renderToPipeableStream)     │  │
│  └──────────────────────┬───────────────────────────┘  │
│                         │ 7. HTML stdout stream        │
│                         ▼                              │
└─────────────────────────┼──────────────────────────────┘
                          │
                          │ 8. Express pipes stdout directly
                          ▼
                 🌐 Browser (HTML Response)`}</pre>
              </div>

              <h3>1. The CJS-to-ESM Bridge (The Code Jump)</h3>
              <p>
                The main server (<code>server.js</code>) is written in <strong>CommonJS (CJS)</strong> using standard <code>require()</code> statements. However, all page components and layouts are written in <strong>ES Modules (ESM)</strong> containing JSX and TypeScript.
              </p>
              <p>
                Because CJS cannot synchronously load ESM files, Dinou implements <code>import-module.js</code>. When a route is requested, Express triggers a dynamic asynchronous <code>await import(fileUrl)</code>. This call acts as the boundary jump from the CJS server execution loop to the asynchronous ES Module registry.
              </p>
              <p>
                This dynamic import instantly fires the custom <code>babel-esm-loader.js</code>, which intercepts the request, transpiles JSX/TS on the fly via Babel, parses exports, and delivers executable JS back to the process.
              </p>

              <h3>2. The Two-Process SSR Pipeline (The Process Separation)</h3>
              <p>
                React 19 ships two incompatible module graphs: a server-side variant for rendering RSC (<code>react.react-server.js</code>) and a standard client-side variant for rendering HTML (<code>react-dom/server</code>). Loading both in the same Node.js process causes V8 memory collisions.
              </p>
              <p>
                Dinou resolves this by running two isolated Node.js processes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Parent Process (<code>server.js</code>)</strong>: Launched with the <code>--conditions=react-server</code> flag. It evaluates page components in the ESM graph and produces the binary <strong>RSC Flight Stream</strong>.
                </li>
                <li>
                  <strong>Child Process (<code>render-html.js</code>)</strong>: Forked dynamically without conditions. It receives the Flight Stream from the parent via a dedicated data pipe (file descriptor <code>fd:4</code>), deserializes it with client-side React, renders the final HTML shell via <code>renderToPipeableStream</code>, and streams the HTML back to the parent's <code>stdout</code> to be flushed to the browser.
                </li>
              </ul>
            </section>

            {/* 1. THE MODULE SYSTEM */}
            <section id="module-system" className="mt-12 pt-8 border-t">
              <h2>📦 1. The Module System</h2>
              <p>
                Node.js by default is unaware of React Server Components (RSC) build constraints and JSX specifiers. React 19 ships two incompatible module graphs:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><code>react</code> (standard client-side variant)</li>
                <li><code>react.react-server</code> (server-side variant for rendering RSC payloads)</li>
              </ul>
              <p>
                Running both graphs in the same Node.js process causes naming and execution boundary conflicts (such as V8 loading two mismatched, duplicate instances of React in memory, which crashes the rendering engine).
              </p>
              <p>
                Dinou resolves this conflict by forcing the entire server process to run strictly under the <strong>React Server (RSC) graph</strong>. To achieve this, it overrides module resolution in both environments:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>ES Modules (ESM) Resolver</strong>: Native imports (like <code>import react from "react"</code>) are routed to the <code>.react-server</code> builds natively by running Node.js with the <code>--conditions=react-server</code> flag.</li>
                <li><strong>CommonJS (CJS) Resolver</strong>: Any synchronous require calls (like <code>require("react")</code>) inside the Express server or the ESM loader thread are intercepted by overriding Node's internal <code>Module._resolveFilename</code> to redirect them to the <code>.react-server</code> entry points.</li>
              </ul>
              <p className="mt-4">
                Inside the CommonJS environment (used by Express to resolve dependencies, require paths, and parse style module JSON structures), Dinou hooks into the runtime through three main pillars:
              </p>

              <h3>A. Overriding <code>Module._resolveFilename</code></h3>
              <p>
                To direct React imports to their RSC equivalent, Dinou intercepts Node's module resolution pipeline in <code>server.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/server.js
Module._resolveFilename = function (request, parent, isMain, options) {
  if (!isWebpack) { // Webpack resolves its own graph using manifests
    if (request === "react") return reactServerPath;
    if (request === "react-dom") return reactDomServerPath;
    if (request === "react/jsx-runtime") return reactJsxRuntimePath;
    if (request === "react/jsx-dev-runtime") return reactJsxDevRuntimePath;
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};`}</CodeBlock>
              </div>
              <p>
                This resolution mapping is skipped if using Webpack (<code>isWebpack = true</code>) because the <code>react-server-dom-webpack/node-register</code> package automatically hooks the runtime loader.
              </p>

              <h3>B. Runtime TSConfig Paths Registration</h3>
              <p>
                Before requiring components, Dinou imports <code>dinou/core/register-paths.js</code>. This file dynamically reads the project's <code>tsconfig.json</code> or <code>jsconfig.json</code> at startup, extracts the <code>compilerOptions.paths</code> configurations, and registers them using the <code>tsconfig-paths</code> library:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/register-paths.js
const configFile = getConfigFileIfExists(); // checks tsconfig.json -> jsconfig.json
if (configFile) {
  const config = require(configFile);
  const { baseUrl, paths } = config.compilerOptions || {};
  if (baseUrl && paths) {
    tsconfigPaths.register({
      baseUrl: path.resolve(process.cwd(), baseUrl),
      paths,
    });
  }
}`}</CodeBlock>
              </div>
              <p>
                This enables Node's CJS runtime to resolve clean path aliases (e.g. <code>require("@/components/Header")</code>) without crashing.
              </p>

              <h3>C. Require Extensions Hooks (CSS & Assets)</h3>
              <p>
                In the CJS environment, importing non-JavaScript files normally causes crashes. Dinou overrides Node's native <code>require.extensions</code> to dynamically preprocess style modules and media assets at import time:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>CSS Modules Hook (<code>css-require-hook.js</code>)</strong>: Intercepts <code>require.extensions[".css"]</code>. It reads the file, parses class names synchronously using <strong>PostCSS</strong>, hashes local class names deterministically via a custom hashing utility, and exports a JSON object mapping original classes to hashed classes (mimicking webpack's CSS modules):
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`require.extensions[".css"] = function (module, filename) {
  const cssContent = fs.readFileSync(filename, "utf8");
  const jsonResult = {};
  // PostCSS plugin traverses rules, matches local class selectors,
  // hashes them and writes mapping to jsonResult...
  module.exports = jsonResult;
};`}</CodeBlock>
                  </div>
                </li>
                <li>
                  <strong>Asset Loader Hook (<code>asset-require-hook.js</code>)</strong>: Intercepts media extensions (like <code>.png</code>, <code>.svg</code>, <code>.jpg</code>). It reads the asset, generates a hashed URL prefix (e.g. <code>/assets/logo-xyz.png</code>) via <code>loader-utils</code>, and registers the string as the default export:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`require.extensions[".png"] = function (module, filename) {
  const url = compile(filename); // Returns e.g. "/assets/logo-[hash].png"
  module._compile("module.exports = " + JSON.stringify(url), filename);
};`}</CodeBlock>
                  </div>
                </li>
              </ul>

              <h3>D. The CommonJS-to-ESM Bridge (<code>import-module.js</code>)</h3>
              <p>
                In a standard Node.js environment, CommonJS modules cannot synchronously load ES Modules using <code>require()</code> (doing so throws a <code>ERR_REQUIRE_ESM</code> exception).
              </p>
              <p>
                Initially, Dinou resolved this by attempting a <code>require()</code> first and falling back to a dynamic <code>await import()</code> if it failed. The current refactored version segregates this logic based on the active bundler (Webpack vs. Rollup / esbuild) for two critical reasons:
              </p>
              
              <ol className="list-decimal pl-6 space-y-3 text-sm text-muted-foreground my-4">
                <li>
                  <strong>Ensuring ESM Loader Interception (Rollup & esbuild)</strong>: 
                  For Rollup and esbuild builds, Dinou utilizes a custom Node.js ESM loader (<code>babel-esm-loader.js</code>) to handle runtime TS/JSX transpilation and Server Component reference registration (via <code>registerServerReference</code>). Node.js only runs custom ESM loader hooks on modules fetched via <code>import</code> statements. If the engine attempted a <code>require()</code> first, it would either crash or bypass the loader entirely (using legacy CJS transpilation registers), breaking React Server Component hydration. Forcing <code>await import()</code> directly ensures the compilation pipeline is consistently intercepted.
                </li>
                <li>
                  <strong>Webpack Cache Invalidation & Hybrid Module Loading</strong>: 
                  Webpack produces a hybrid CommonJS/ESM module output. To allow Hot Module Replacement (HMR) in development, Dinou must invalidate the server modules from memory when they change.
                  <br />
                  <em>Bypassing vs. Clearing Cache</em>: In Node.js, V8's native ESM registry is immutable and does not provide an API to delete entries. While we can <strong>bypass</strong> this in Rollup/esbuild by appending a query timestamp (e.g. <code>?t=timestamp</code>), this forces V8 to instantiate a new module side-by-side in memory (a controlled development memory leak). In Webpack, however, this timestamp bypass breaks Webpack's internal dependency resolution and manifests. Webpack requires a <strong>physical cache clearance</strong> of Node's CommonJS module registry:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`delete require.cache[require.resolve(absPath)];`}</CodeBlock>
                  </div>
                  Attempting <code>require()</code> first on Webpack configurations allows Dinou to purge the physical file cache cleanly in development. If the resource is a native ESM bundle, the caught exception safely redirects it to a dynamic <code>import()</code>.
                </li>
              </ol>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/import-module.js
async function importModule(modulePath) {
  const absPath = path.isAbsolute(modulePath) ? modulePath : path.resolve(process.cwd(), modulePath);

  if (!isWebpack) {
    let fileUrl = pathToFileURL(absPath).href;
    if (process.env['NODE_ENV'] !== "production") {
      fileUrl += \`?t=\${Date.now()}\`; // Cache-busting for ESM modules
    }
    const mod = await import(fileUrl); // Direct ESM Loader entry
    return mod;
  }

  try {
    if (process.env['NODE_ENV'] !== "production") {
      try {
        const resolved = require.resolve(absPath);
        delete require.cache[resolved]; // CJS Cache clearing
      } catch (e) {}
    }
    return require(absPath);
  } catch (err) {
    if (err.code === "ERR_REQUIRE_ESM" || /require\\(\\) of ES Module/.test(err.message)) {
      let fileUrl = pathToFileURL(absPath).href;
      if (process.env['NODE_ENV'] !== "production") {
        fileUrl += \`?t=\${Date.now()}\`;
      }
      const mod = await import(fileUrl); // Fallback for ES bundles
      return mod;
    }
    throw err;
  }
}`}</CodeBlock>
              </div>
            </section>

            {/* 2. THE ESM LOADER */}
            <section id="esm-loader" className="mt-12 pt-8 border-t">
              <h2>⚙️ 2. The ESM Loader</h2>
              <p>
                When using native ES Modules (<code>import/export</code>), Node.js bypasses CommonJS's CJS-specific require overrides (like <code>tsconfig-paths</code> and <code>require.extensions</code>). Dinou solves this by registering a custom Node.js ESM loader (<code>babel-esm-loader.js</code>) via Node's official <code>module.register()</code> inside <code>register-loader.mjs</code>.
              </p>
              <p>
                The loader hooks into the ESM resolution and loading lifecycles through two hooks: <code>resolve</code> and <code>load</code>.
              </p>
              <blockquote>
                <strong>CJS/ESM Synergy:</strong> To avoid duplicate parsing logic, the ESM loader coordinates directly with CJS hooks. For instance, when loading CSS modules inside the ESM graph, the loader calls CJS <code>require()</code> internally to trigger the CJS PostCSS Require Hook (Section 1.C), captures the returned class name JSON map, and wraps it into an ESM-compliant virtual default export.
              </blockquote>

              <h3>A. The <code>resolve</code> Hook: Alias & Extension Resolution</h3>
              <p>
                Because Node.js ES Modules strictly require explicit file extensions (unlike CommonJS) and do not natively support path aliases, the <code>resolve</code> hook intercepts import specifiers and resolves them dynamically using <code>get-abs-path-with-ext.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/babel-esm-loader.js -> resolve hook
exports.resolve = async function resolve(specifier, context, defaultResolve) {
  const absPathWithExt = getAbsPathWithExt(specifier, context);
  if (absPathWithExt) {
    return {
      url: pathToFileURL(absPathWithExt).href,
      shortCircuit: true,
    };
  }
  return defaultResolve(specifier, context, defaultResolve);
};`}</CodeBlock>
              </div>
              <p>
                <strong>How <code>getAbsPathWithExt</code> resolves paths:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>Alias Mapping</strong>: Parses <code>tsconfig.json</code> or <code>jsconfig.json</code> once at startup. If a specifier matches an alias (e.g. <code>@/components/Welcome</code>), it maps it to the target absolute base directory.</li>
                <li><strong>Extension Probing</strong>: Probes for files by checking for standard extensions in order: <code>.js</code>, <code>.ts</code>, <code>.jsx</code>, <code>.tsx</code>. If the target is a directory, it automatically probes for <code>/index.[ext]</code> files inside it.</li>
              </ol>

              <h3>B. Thread Isolation & Resolution Dualism (Why <code>Module._resolveFilename</code> is in both files)</h3>
              <p>
                You will notice that <code>Module._resolveFilename</code> is overridden in both <code>server.js</code> (main thread) and <code>babel-esm-loader.js</code> (ESM loader context). This duplication is critical:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>ESM Native Resolution</strong>: For native ES Module imports (e.g. <code>import react from "react"</code>), Node.js uses its built-in ESM resolver. Since Dinou is launched with the <code>--conditions=react-server</code> flag, Node automatically directs these imports to the <code>react-server</code> conditions defined in the package exports.
                </li>
                <li>
                  <strong>CommonJS Resolution Fallback</strong>: However, both the main Express server and the ESM loader thread frequently execute legacy CommonJS code (such as compiling stylesheets with PostCSS or running Babel register). When these modules execute a síncrone <code>require("react")</code>, they bypass the ESM conditions resolver and fall back to the CommonJS registry.
                </li>
                <li>
                  <strong>Process Safety</strong>: Because Node.js handles ESM custom loaders in a separate execution context (or worker thread), the loader thread has its own separate CommonJS resolution cache. Overriding <code>Module._resolveFilename</code> in <strong>both</strong> contexts guarantees that neither thread ever mistakenly imports standard client React, preventing V8 environment conflicts or duplicate runtime crashes.
                </li>
              </ul>

              <h3>C. The <code>load</code> Hook: Asset Transformation & Transpilation</h3>
              <p>
                The <code>load</code> hook intercepts the file URLs resolved in the previous stage, reads the contents, and compiles them into compatible ESM format on the fly.
              </p>

              <div className="space-y-6 not-prose mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <Boxes className="h-5 w-5 text-purple-500" />
                      <span>CSS Modules & Assets loader</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      To load CSS modules inside the ESM graph, Dinou leverages an elegant CJS-ESM synergy. Instead of re-implementing the PostCSS parser, the loader calls the CJS <code>require()</code> hook on the stylesheet, which outputs the hashed JSON class map. The loader then wraps this class map in a virtual ESM export:
                    </p>
                    <CodeBlock language="javascript">{`if (ext === ".css") {
  const classMap = require(fileURLToPath(url)); // Triggers CJS css-require-hook
  return {
    format: "module",
    source: \`export default \${JSON.stringify(classMap)};\`,
    shortCircuit: true,
  };
}`}</CodeBlock>
                    <p>
                      For media files, the loader reads the file path and outputs a virtual default export string pointing to the public hashed asset path (e.g., <code>export default "/assets/logo-abc.png";</code>).
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                      <Cpu className="h-5 w-5" />
                      <span>Client Component Reference Stubbing ("use client")</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      If the loaded file is executed under the <code>react-server</code> environment (detected by checking if <code>react-server</code> exists in <code>process.execArgv</code>) and contains a <code>"use client"</code> header:
                    </p>
                    <ol className="list-decimal pl-6 space-y-1">
                      <li>The loader parses the file's AST with Babel to isolate all exported symbols.</li>
                      <li>It builds and returns a mock ESM module where every symbol is a registered client component reference stub using React's official <code>registerClientReference</code> utility:</li>
                    </ol>
                    <CodeBlock language="javascript">{`// Generated on-the-fly by the loader for esbuild/rollup builds:
import pkg from "@roggc/react-server-dom-esm/server.node.js";
const { registerClientReference } = pkg;

export const myComponent = registerClientReference(
  function() { throw new Error("Attempted to call myComponent() from server but it is on the client."); },
  "file:///src/components/myComponent.tsx",
  "myComponent"
);

export default registerClientReference(
  function() { throw new Error("Attempted to call the default export of myComponent from server..."); },
  "file:///src/components/myComponent.tsx",
  "default"
);`}</CodeBlock>
                    <p>
                      This stubbing prevents the server from executing client React code, while providing React's serializer with the metadata required to generate the correct client hydration references in the RSC Flight payload.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span>TypeScript & JSX Transpilation</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      If a file does not trigger a <code>"use client"</code> bailout, the loader compiles JSX and TypeScript code synchronously using Babel with <code>@babel/preset-react</code> (configured with <code>runtime: "automatic"</code> to inject standard JSX runtime modules) and <code>@babel/preset-typescript</code>.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. FILE-SYSTEM ROUTER */}
            <section id="router" className="mt-12 pt-8 border-t">
              <h2>🚏 3. File-System Router</h2>

              <h3>A. Gatekeeper: Anti-Bot Shield (DoS Mitigation)</h3>
              <p>
                Before matching URL paths to the filesystem, Dinou runs an Express-level gatekeeper middleware in <code>server.js</code>. This middleware checks the request path against common scanner target extensions (like <code>.php</code>, <code>.env</code>, or <code>wp-admin</code>) to terminate malicious bot requests instantly with a raw <code>404 Not Found</code>. This prevents bot traffic from touching routing code, compiling pages, or spawning expensive child processes:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// server.js -> Anti-bot middleware
const botGarbagePatterns = [
  /\\.php$/i, /\\.env$/i, /\\.git\\b/i, /\\.sql$/i, /\\.bak$/i, /\\.log$/i,
  /wp-admin/i, /wp-content/i, /wp-includes/i, /xmlrpc\\.php/i,
  /\\.asp$/i, /\\.jsp$/i, /\\.cgi$/i
];

app.use((req, res, next) => {
  const isGarbage = botGarbagePatterns.some(pattern => pattern.test(req.path));
  if (isGarbage) {
    return res.status(404).send("Not Found"); // Terminate instantly
  }
  next();
});`}</CodeBlock>
              </div>

              <h3>B. Route Pattern Resolution</h3>
              <p>
                Dinou traverses the <code>src/</code> directory recursively (using <code>get-file-path-and-dynamic-params.js</code>) to match URL paths to page files:
              </p>
              <table className="min-w-full divide-y divide-border border rounded-lg not-prose my-6">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Pattern</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Example Folder</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm text-muted-foreground">
                  <tr>
                    <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">Static</td>
                    <td className="px-4 py-2 font-mono">src/about/</td>
                    <td className="px-4 py-2">Matches <code>/about</code> directly.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">Dynamic Parameter</td>
                    <td className="px-4 py-2 font-mono">src/[slug]/</td>
                    <td className="px-4 py-2">Captures a route segment (e.g. <code>params.slug</code>).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">Optional Parameter</td>
                    <td className="px-4 py-2 font-mono">src/[[id]]/</td>
                    <td className="px-4 py-2">Matches optionally (with or without <code>id</code> segment).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">Catch-all</td>
                    <td className="px-4 py-2 font-mono">src/[...rest]/</td>
                    <td className="px-4 py-2">Captures all trailing route segments as an array.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-slate-800 dark:text-slate-200">Route Group</td>
                    <td className="px-4 py-2 font-mono">src/(marketing)/</td>
                    <td className="px-4 py-2">Organizes code structure without affecting public URLs.</td>
                  </tr>
                </tbody>
              </table>

              <h3>C. The Recursive Segment Crawler (<code>getFilePathAndDynamicParams</code>)</h3>
              <p>
                Dinou's routing matches incoming URL paths to page layouts dynamically using the recursive crawler function <code>getFilePathAndDynamicParams</code>. Here is how the traversal algorithm resolves files:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Segment Splitting</strong>: The router splits the pathname by slashes (e.g., <code>/blog/post-1</code> becomes <code>["blog", "post-1"]</code>) and initiates the crawler at <code>index = 0</code>, starting inside the <code>src/</code> root directory.
                </li>
                <li>
                  <strong>Static Matching (Precedence 1)</strong>: First, the crawler probes for an exact folder match. If <code>src/blog</code> exists, it enters the directory and calls itself with <code>index = 1</code>.
                </li>
                <li>
                  <strong>Route Group Resolution (Precedence 2)</strong>: If no static folder exists, it checks if any directories are wrapped in parentheses (e.g., <code>src/(auth)</code>). If found, the crawler recursively walks into that folder <strong>without</strong> incrementing the <code>index</code> cursor, keeping the route group invisible to the public URL.
                </li>
                <li>
                  <strong>Dynamic Single Parameter (Precedence 3)</strong>: Next, it probes for folders matching the single bracket syntax (e.g. <code>src/[id]</code>). It extracts the variable name (<code>"id"</code>), URL-decodes the active segment (<code>"post-1"</code>), writes it to the parameters registry (<code>dParams.id = "post-1"</code>), and enters the directory.
                </li>
                <li>
                  <strong>Catch-All & Optional Catch-All (Precedence 4)</strong>:
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Catch-All (<code>[...rest]</code>)</strong>: Binds all remaining segments from the active <code>index</code> to the end of the URL array, saving them as a string array parameter.</li>
                    <li><strong>Optional Catch-All (<code>[[...rest]]</code>)</strong>: Behaves identically to catch-all, but matches even if the <code>index</code> has exceeded the URL segments (returning an empty array instead of failing).</li>
                  </ul>
                </li>
              </ol>

              <h4>Crawler Signature & Parameter Breakdown</h4>
              <p>
                The recursive crawler is signatured as follows in <code>get-file-path-and-dynamic-params.js</code>:
              </p>
              <div className="not-prose my-2">
                <CodeBlock language="javascript">{`function getFilePathAndDynamicParams(
  reqSegments, query, currentPath, fileName = "page",
  withExtension = true, finalDestination = true, lastFound = undefined,
  index = 0, dParams = {}, accumulative = false, accumulate = [],
  isFound = { value: false }, possibleExtensions = [".tsx", ".ts", ".jsx", ".js"]
)`}</CodeBlock>
              </div>
              <p>
                Each parameter drives a specific aspect of the routing and compilation lifecycle:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>reqSegments</code></strong> (Array): The segments of the requested URL split by slashes (e.g. <code>["blog", "hello"]</code>).
                </li>
                <li>
                  <strong><code>query</code></strong> (Object): Parsed URL query parameters (e.g. <code>?search=react</code>). <em>Note:</em> While this parameter is actively passed down through the recursive crawler walks and into <code>getSlots()</code>, it is currently a <strong>vestige / dead parameter</strong> inside the framework's codebase. It is neither read for resolving slots nor passed down to page or layout components as props (components access query parameters directly using the Request Context instead).
                </li>
                <li>
                  <strong><code>currentPath</code></strong> (String): The absolute file path of the directory reached at the current step of the recursive resolution.
                </li>
                <li>
                  <strong><code>fileName</code></strong> (String): The file target base name we are searching for (defaults to <code>"page"</code> to find endpoints, but set to <code>"layout"</code> when compiling layout trees, <code>"page_functions"</code> for route configurations, or <code>"error"</code>/<code>"not-found"</code> for error boundaries).
                </li>
                <li>
                  <strong><code>withExtension</code></strong> (Boolean): Toggles file extension appending. If false, searches directories or folders matching the raw name.
                </li>
                <li>
                  <strong><code>finalDestination</code></strong> (Boolean): If true, returns a match only if V8 completely exhausts the URL segments cursor. If false, permits returning the nearest parent file match (e.g. locating layout wrappers).
                </li>
                <li>
                  <strong><code>lastFound</code></strong> (String): A rolling accumulator that tracks the nearest ancestor matching file found during the descent. When <code>finalDestination</code> is <code>false</code> (such as when searching for the closest <code>error.tsx</code> boundary or <code>not-found.tsx</code> fallback along a route path), <code>lastFound</code> acts as a bubble fallback. If the target folder at the end of the URL doesn't contain the requested file, the crawler returns the closest ancestor file recorded in <code>lastFound</code> in a single pass.
                </li>
                <li>
                  <strong><code>index</code></strong> (Number): The segment cursor pointer. Tells the crawler which segment of the <code>reqSegments</code> array is currently being evaluated.
                </li>
                <li>
                  <strong><code>dParams</code></strong> (Object): An accumulator dictionary of resolved dynamic route parameters (e.g. <code>{"{ slug: 'hello' }"}</code>).
                </li>
                <li>
                  <strong><code>accumulative</code></strong> (Boolean): If true, changes the return behavior to collect all layouts found along the path instead of returning only the final leaf page.
                </li>
                <li>
                  <strong><code>accumulate</code></strong> (Array): The list accumulator for Layouts. Aggregates tuples of <code>[layoutPath, params, slots]</code> found on the descent.
                </li>
                <li>
                  <strong><code>isFound</code></strong> (Object): A mutable reference object (<code>{"{ value: boolean }"}</code>) shared across calls to instantly halt search branches once a route resolves.
                </li>
                <li>
                  <strong><code>possibleExtensions</code></strong> (Array): Probe extensions list. Defaults to <code>[".tsx", ".ts", ".jsx", ".js"]</code>.
                </li>
              </ul>

              <h3>D. Nested Layouts & Parallel Slots</h3>
              <p>
                Dinou's router operates in two modes. In <strong>accumulative mode</strong>, it descends the folder hierarchy toward the target route page. At each step, it records any co-located <code>layout.tsx</code> module and compiles them into a nested React component hierarchy automatically.
              </p>
              <p>
                During this layout accumulation, the router scans directory siblings using a <code>getSlots</code> crawler. If it finds directories prefixed with an <code>@</code> symbol (representing <strong>Parallel Slots</strong>), it compiles the slot target and instantiates it dynamically:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// get-file-path-and-dynamic-params.js -> getSlots helper
function getSlots(currentPath, reqSegments, query) {
  let slots = {};
  const entries = readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith("@")) {
      // Find the page file inside the slot folder
      const [slotPath, slotParams] = getFilePathAndDynamicParams(
        reqSegments, query, path.join(currentPath, entry.name), "page", ...
      );
      if (slotPath) {
        const SlotComponent = require(slotPath).default;
        const slotName = entry.name.slice(1); // e.g. "@sidebar" -> "sidebar"
        
        // Dynamically instantiate the parallel slot as a React element
        slots[slotName] = React.createElement(SlotComponent, {
          params: slotParams,
          key: slotName,
        });
      }
    }
  }
  return slots;
}`}</CodeBlock>
              </div>
              <p>
                These instantiated slots are passed down directly as React props to the parent <code>layout.tsx</code> (e.g. <code>props.sidebar</code>).
              </p>

              <h3>E. Virtual Filesystem (<code>vfs.js</code>) in Production</h3>
              <p>
                Performing recursive disk reads (using <code>fs.existsSync</code> and <code>fs.readdirSync</code>) on every request would degrade server performance.
              </p>
              <p>
                In production mode (<code>process.env['NODE_ENV'] === "production"</code>), Dinou initializes a Virtual Filesystem (<code>vfs.js</code>) at startup. It crawls the <code>src/</code> directory recursively once, building a nested, in-memory directory representation. The routing engine intercepts all filesystem calls and resolves paths synchronously against this in-memory tree:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/vfs.js
function existsSync(filePath) {
  if (isDevelopment) return fs.existsSync(filePath);
  const normalized = path.resolve(filePath);
  return !!vfs[normalized]; // Check in-memory index
}`}</CodeBlock>
              </div>
            </section>

            {/* 4. TWO-PROCESS SSR PIPELINE */}
            <section id="ssr-pipeline" className="mt-12 pt-8 border-t">
              <h2>🔄 4. Two-Process SSR Pipeline</h2>
              <p>
                Dinou renders HTML inside a <strong>forked child process</strong> (<code>render-html.js</code>) rather than on the parent Express process.
              </p>
              <p>
                This isolation is mandatory because the parent process executes components in a <code>react-server</code> ESM environment, whereas generating HTML shells requires the regular <code>react-dom/server</code> (which is incompatible with the RSC graph).
              </p>

              <div className="border border-border bg-card rounded-lg p-5 not-prose my-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                  <Server className="h-5 w-5 text-blue-500" />
                  <span>How the RSC Payload Travels</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  1. When a request hits, the parent process obtains the RSC tree and pipes it as a Flight stream to the child process via a dedicated file descriptor (<code>fd: 4</code>).<br />
                  2. The child process receives the Flight stream and deserializes it using <code>createFromNodeStream</code>.<br />
                  3. The child process streams the final compiled HTML shell back to parent <code>stdout</code>, which pipes it straight to the Express response.
                </p>
                <CodeBlock language="javascript">{`// render-app-to-html.js (Parent forks and sets up fd:4 for Flight stream)
const child = fork(renderHtmlPath, [reqPath, ...], {
  stdio: ["ignore", "pipe", "pipe", "ipc", "pipe"], // stdio[4] is the RSC pipe
});

// Parent writes RSC stream into the child's input pipe
renderToPipeableStream(jsx, baseUrl).pipe(child.stdio[4]);

// Parent pipes child's stdout (HTML) to Express client
child.stdout.pipe(res);`}</CodeBlock>
              </div>

              <h3>IPC Context Proxy</h3>
              <p>
                Since Server Components are rendered inside the child process, actions like redirecting the client, setting status codes, or setting cookies must be relayed back to the parent Express response. Dinou achieves this by passing a proxy object via IPC:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function createResponseProxy() {
  function sendCommand(command, args) {
    if (typeof process.send === "function") {
      process.send({ type: "DINOU_CONTEXT_COMMAND", command, args });
    }
  }
  return {
    clearCookie: (name, options) => sendCommand("clearCookie", [name, options]),
    cookie: (name, value, options) => sendCommand("cookie", [name, value, options]),
    setHeader: (name, value) => sendCommand("setHeader", [name, value]),
    redirect: (arg1, arg2) => arg2 ? sendCommand("redirect", [arg1, arg2]) : sendCommand("redirect", [arg1]),
    status: (code) => sendCommand("status", [code]),
  };
}`}</CodeBlock>
              </div>

              <h3>Handling Commands during Streaming</h3>
              <p>
                When a command is received from the child process, the parent process behaves differently depending on whether it has already started sending HTML chunks to the browser:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Scenario A: Headers Not Sent (Before Streaming)</strong>:
                  The parent simply calls the native Express response methods directly (e.g. <code>res.cookie()</code>, <code>res.redirect()</code>, or <code>res.status()</code>).
                </li>
                <li>
                  <strong>Scenario B: Headers Already Sent (During Streaming)</strong>:
                  HTTP headers cannot be mutated once they are committed. Dinou manages this via client-side JavaScript injection:
                  <ul className="list-circle pl-6 mt-2 space-y-2">
                    <li>
                      <strong>Redirects</strong>: Parent injects a <code>&lt;script&gt;window.location.href = "/url";&lt;/script&gt;</code> block into the HTML stream, closes the connection, and kills the child process (<code>child.kill()</code>) to halt further rendering.
                    </li>
                    <li>
                      <strong>Cookies</strong>: Injects <code>&lt;script&gt;document.cookie = "...";&lt;/script&gt;</code> to set the cookie on the client browser.
                    </li>
                    <li>
                      <strong>Statuses</strong>: Ignored (Express logs a developer warning on console).
                    </li>
                  </ul>
                </li>
              </ul>

              <div className="my-4">
                <Alert variant="warning">
                  <AlertTitle>⚠️ Security Limitation: HttpOnly Cookies during Streaming</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    If you attempt to set an <code>HttpOnly</code> cookie after the HTML stream has started (e.g., inside a deeply nested Server Component that renders slowly), the action will fail. Because <code>HttpOnly</code> cookies cannot be read or written by client-side JavaScript, Dinou cannot inject them via <code>document.cookie</code>. Always set critical auth or session cookies inside middlewares or page functions (which execute before headers are sent).
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* 5. THE SSG PIPELINE */}
            <section id="ssg-pipeline" className="mt-12 pt-8 border-t">
              <h2>💾 5. The SSG Pipeline</h2>
              <p>
                Dinou builds and compiles static pages inside <code>build-static-pages.js</code>. The compilation flow coordinates 4 distinct phases:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{`generateStatic()
  → rmSync(dist2/)            // Phase 1: Clean build folder
  → buildStaticPages()        // Phase 2: Traverse folders and register static routes
  → generateStaticRSCs()      // Phase 3: Write client RSC JSON payloads to dist2/
  → generateStaticPages()     // Phase 4: Compile and write static HTML files to dist2/`}</CodeBlock>
              </div>

              <h3>Phase 1: Folder Traversal & Dynamic Parameter Parsing</h3>
              <p>
                To build a complete index of static URL targets, Dinou crawls the <code>src/</code> directory recursively using the async helper <code>collectPages()</code>. This crawler handles the complex task of expanding dynamic routes into concrete static file paths:
              </p>
              
              <blockquote className="my-4">
                <strong>💡 Conceptually: The "Detective Explorer"</strong><br/>
                Think of <code>collectPages()</code> as an explorer mapping all routes in your project.
                For static folders (like <code>src/about</code>), it simply notes down <code>/about</code>.
                However, dynamic folders (like <code>src/blog/[slug]</code>) pose a problem: the compiler cannot create a physical file named <code>[slug]/index.html</code>.
                To resolve this, the explorer imports your <code>page_functions.ts</code> file and runs <code>getStaticPaths()</code>.
                If it returns <code>[{"{ slug: 'hello' }"}, {"{ slug: 'world' }"}]</code>, the explorer <strong>multiplies</strong> that path, translating the dynamic folder into two concrete paths: <code>/blog/hello</code> and <code>/blog/world</code>, then continues recursing down each branch.
              </blockquote>
              
              <div className="space-y-6 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <Cpu className="h-5 w-5 text-indigo-500" />
                      <span>The <code>collectPages()</code> Algorithm</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      The function takes the following parameters:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong><code>currentPath</code></strong> (String): The absolute folder path currently being traversed.</li>
                      <li><strong><code>segments</code></strong> (Array): The accumulated static path segments (e.g., <code>["blog", "first-post"]</code>).</li>
                      <li><strong><code>params</code></strong> (Object): The resolved dynamic parameters dictionary (e.g., <code>{"{ slug: 'first-post' }"}</code>).</li>
                      <li><strong><code>dynamicStructure</code></strong> (Array): The sequence of dynamic parameter names encountered along the route path (e.g., <code>["category", "id"]</code>).</li>
                      <li><strong><code>doNotPushAtEnd</code></strong> (Boolean): A flag to prevent duplicate page mapping when resolving optional catch-all routes.</li>
                    </ul>

                    <p>
                      <strong>How it resolves dynamic directories:</strong>
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        <strong>Bailout for Dynamic Routes</strong>: When the crawler enters a dynamic folder (e.g., <code>src/blog/[slug]</code>), it maps and imports its co-located <code>page_functions</code> file. If the module exports a function <code>dynamic()</code> returning <code>true</code>, the crawler immediately ignores the directory for SSG, marking it as a request-time SSR-only route.
                      </li>
                      <li>
                        <strong>Invoking <code>getStaticPaths()</code></strong>: If the route is static, the crawler executes <code>getStaticPaths()</code>. This function must return an array of path parameter mappings:
                        <CodeBlock language="javascript">{`// Example page_functions.ts
export async function getStaticPaths() {
  const products = await db.getProducts();
  return products.map(p => ({ category: p.cat, id: p.id })); 
}`}</CodeBlock>
                      </li>
                      <li>
                        <strong>The Gap Check (Path Validation)</strong>: For catch-all or nested dynamic segments, the crawler flattens the returned parameter values and performs a strict validation checks:
                        <CodeBlock language="javascript">{`// Detection of prohibited intermediate gaps:
const hasGap = flatSegments.some((seg, index) => {
  const isUndefined = seg === undefined || seg === null || seg === "";
  if (!isUndefined) return false;
  // Gap is invalid if a defined segment exists further to the right
  const remaining = flatSegments.slice(index + 1);
  return remaining.some(s => s !== undefined && s !== null && s !== "");
});`}</CodeBlock>
                        If an intermediate segment parameter is missing (e.g., resolving to <code>[undefined, "something"]</code>), the route path contains a gap and is skipped.
                      </li>
                      <li>
                        <strong>Recursion Expansion</strong>: The resolved segments are appended to the accumulated path, the parameters are normalized, and <code>collectPages()</code> recurses into the subdirectory.
                      </li>
                      <li>
                        <strong>Leaf Page Yielding</strong>: When a static folder containing a <code>page.tsx</code> is reached, the crawler registers the final route path along with its gathered parameters and Layout/Slot structure to the pages build list.
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>

              <h3>What happens next? The Route Processing Pipeline</h3>
              <p>
                Once <code>collectPages()</code> finishes crawling, it returns a flat array of all resolved static page configurations, mapping physical folders to URL segment structures and parameter values:
              </p>
              <div className="not-prose my-2">
                <CodeBlock language="javascript">{`// Result from collectPages:
[
  { path: "c:/project/src/blog/[slug]", segments: ["blog", "hello"], params: { slug: "hello" } },
  { path: "c:/project/src/blog/[slug]", segments: ["blog", "world"], params: { slug: "world" } },
  { path: "c:/project/src/about", segments: ["about"], params: {} }
]`}</CodeBlock>
              </div>
              <p>
                Dinou's compiler loops through this collection and feeds each route configuration through a multi-step compilation pipeline:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Mock Request Context Creation</strong>: For each URL target (e.g. <code>/blog/hello</code>), the engine mocks an Express request and response wrapper so that component rendering stores have access to standard route context variables.
                </li>
                <li>
                  <strong>Bailout Proxy Spying (Phase 2)</strong>: It wraps the mock request's cookies, headers, and query parameters in Javascript <strong>Proxies</strong>.
                </li>
                <li>
                  <strong>Props Resolution & Layout Nesting</strong>: The compiler dynamically requires the page component, executes <code>getProps(params)</code> to resolve its static props, and recursively wraps the page element inside all matching parent layout modules and parallel slots.
                </li>
                <li>
                  <strong>Bailout Checking</strong>: During this tree execution, if any component or middleware attempts to read from cookies or headers, the proxy spy triggers a callback setting <code>isStatic = false</code>. This causes the compiler to instantly abort static compilation for this page—marking it to render as dynamic SSR at request time instead.
                </li>
                <li>
                  <strong>Payload Output</strong>: If the page renders cleanly without triggering a bailout, it is flagged as static:
                  <ul className="list-disc pl-6 space-y-1">
                    <li>The nested React element tree is compiled to standard RSC JSON (Flight stream) via <code>asyncRenderJSXToClientJSX(jsx)</code> and written to the build folder.</li>
                    <li>The route URL and metadata (like revalidation intervals or redirection side-effects) are registered in the global static routes registry, which is later compiled to the final index HTML files.</li>
                  </ul>
                </li>
              </ul>

              <h3>Phase 2: Dry Render with Proxy Spies</h3>
              <p>
                To determine whether a route can be statically pre-rendered or if it relies on request-time inputs (cookies, headers, or query parameters), Dinou performs a dry render. It feeds the page component a mock request context where these inputs are wrapped in JavaScript <strong>Proxies</strong>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// build-static-pages.js -> createBailoutProxy
function createBailoutProxy(target, label, onBailout) {
  const safeTarget = target || {};
  return new Proxy(safeTarget, {
    get(t, prop, receiver) {
      if (typeof prop === "symbol" || ["inspect", "valueOf", "toString"].includes(prop)) {
        return Reflect.get(t, prop, receiver);
      }
      console.log(\`[StaticBailout] Access to \${label} detected: "\${String(prop)}".\`);
      onBailout(); // Mark page as dynamic -> skip static generation!
      return Reflect.get(t, prop, receiver);
    },
    ownKeys(t) {
      onBailout();
      return Reflect.ownKeys(t);
    },
    has(t, prop) {
      onBailout();
      return Reflect.has(t, prop);
    }
  });
}`}</CodeBlock>
              </div>
              <p>
                If a page reads a cookie (e.g. <code>req.cookies.session</code>) or checks a header (e.g. <code>"Authorization" in req.headers</code>), the proxy fires, executing <code>onBailout()</code>. Dinou immediately marks that page as dynamic and skips writing it to disk. At runtime, this page falls back to full dynamic SSR.
              </p>

              <h3>Phase 3: Side Effect Capturing & Script Block Injection</h3>
              <p>
                What happens if a static page sets a theme cookie or triggers a redirect inside a Server Component during the dry render compilation?
              </p>
              <p>
                Dinou intercepts these side-effects inside a mock response object and saves them under the <code>"effects"</code> key inside <code>metadata.json</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="json">{`// dist2/blog/hello/metadata.json
{
  "revalidate": 3600,
  "generatedAt": 1751234567890,
  "effects": {
    "redirect": "/login",
    "cookies": [
      { "name": "theme", "value": "dark", "options": { "path": "/" } }
    ]
  }
}`}</CodeBlock>
              </div>
              <p>
                When writing the static <code>index.html</code>, Dinou checks for these effects and uses <code>get-ssg-metadata.js</code> to translate them into a self-executing JavaScript block. This script block is injected directly at the top of the static HTML file:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// get-ssg-metadata.js -> processMetadata helper
function processMetadata(effects) {
  if (!effects) return "";
  let script = "";

  if (effects.cookies && effects.cookies.length > 0) {
    effects.cookies.forEach((ck) => {
      const name = JSON.stringify(ck.name);
      const value = JSON.stringify(ck.value || "");
      const path = JSON.stringify(ck.options?.path || "/");
      script += \`document.cookie = \${name} + "=" + \${value} + "; path=" + \${path} + ";";\`;
    });
  }

  if (effects.redirect) {
    script += \`window.location.href = "\${effects.redirect}";\`;
  }
  return script ? \`<script>(function(){ \${script} })();</script>\` : "";
}`}</CodeBlock>
              </div>
              <p>
                When a user loads the static HTML file from disk or CDN, this self-executing script block fires immediately before the browser parses or renders the HTML, replaying the side-effects (cookies or redirects) instantly on the client browser.
              </p>
            </section>

            {/* 6. ISG AND ISR */}
            <section id="isg-isr" className="mt-12 pt-8 border-t">
              <h2>⚡ 6. ISG and ISR Architecture</h2>
              <p>
                Dinou provides native support for <strong>Incremental Static Generation (ISG)</strong> and <strong>Incremental Static Regeneration (ISR)</strong>. These systems enable pages that were not pre-rendered at compile time to build on demand, and existing static pages to update asynchronously in the background.
              </p>

              <h3>A. Key Files & Architectural Roles</h3>
              <p>
                The ISR/ISG engine is distributed across five main files in <code>dinou/core/</code>, each handling a distinct lifecycle phase:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>server.js</code> (The Orchestrator)</strong>: 
                  Intercepts requests. If an HTML cache file doesn't exist, it performs a real-time SSR render and schedules an ISG generation on response finish (<code>res.on("finish")</code>). If a cache file exists, it serves the file instantly and triggers a background ISR revalidation check. It also intercepts calls to serve <code>_old</code> backup assets if a compile lock is active.
                </li>
                <li>
                  <strong><code>generating-isg.js</code> (On-Demand compiler)</strong>: 
                  Manages the first-time generation of static routes in the background. It acquires the compilation lock, copies existing files to backup names, and builds static payloads.
                </li>
                <li>
                  <strong><code>revalidating.js</code> (Stale-While-Revalidate Engine)</strong>: 
                  Handles background revalidation. It reads the page's <code>metadata.json</code>, evaluates whether the revalidation time has expired (<code>Date.now() &gt; generatedAt + revalidate</code>), sets compile locks, and executes re-compilation.
                </li>
                <li>
                  <strong><code>cache-revalidate.js</code> (On-Demand Trigger)</strong>: 
                  Provides hooks for programmatic revalidation (<code>revalidatePath</code> and <code>revalidateTag</code>). For tag revalidation, it crawls all <code>metadata.json</code> files in the <code>dist2/</code> cache directory, reads the tags index, and re-compiles matching paths in parallel.
                </li>
                <li>
                  <strong><code>safe-rename.js</code> (Atomic Committer)</strong>: 
                  Ensures filesystem safety. Instead of writing directly to active files (which would cause Express to serve partial or corrupt files during compilation), the compiler writes to temporary files (e.g. <code>index.html.tmp</code>) and calls <code>safeRename</code>, which performs an atomic OS-level file replacement (<code>fs.renameSync</code>).
                </li>
              </ul>

              <h3>B. Concurrency Locks & Stale-While-Revalidate</h3>
              <p>
                To prevent race conditions where multiple requests try to compile the same page simultaneously, Dinou uses a shared <code>regenerating</code> Set to store active path locks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// revalidating.js & generating-isg.js shared locking mechanism
const regenerating = new Set(); // Global compile lock

function revalidating(reqPath, isDynamicFromServer) {
  if (regenerating.has(reqPath)) return; // Abort if compiler is already active
  
  // 1. Expiration check
  const isExpired = Date.now() > generatedAt + revalidate;
  if (isExpired) {
    // 2. Backup current stable assets
    copyFileSync(htmlPath, htmlPathOld); // index.html -> index._old.html
    copyFileSync(rscPath, rscPathOld);   // rsc.rsc -> rsc._old.rsc
    
    regenerating.add(reqPath); // Lock path
    
    (async () => {
      try {
        const isDynamic = {};
        await buildStaticPage(reqPath, isDynamic); // Compilation dry run
        if (isDynamic.value) {
          isDynamicFromServer.value = true;
          return; // Bail out if page accesses dynamic cookies/headers
        }
        
        // 3. Compile RSC Flight stream first, commit atomically
        const rscResult = await generateStaticRSC(reqPath);
        await safeRename(rscResult.tempPath, rscResult.finalPath);
        
        // 4. Compile HTML page, commit atomically
        const pageResult = await generateStaticPage(reqPath);
        await safeRename(pageResult.tempPath, pageResult.finalPath);
        
        updateStatus(reqPath, pageResult.status);
      } finally {
        regenerating.delete(reqPath); // Release lock
      }
    })();
  }
}`}</CodeBlock>
              </div>
              <p>
                <strong>Serving stale backups</strong>: While the path lock is active in <code>regenerating</code>, <code>server.js</code> directs any concurrent incoming requests to serve the backup assets (<code>index._old.html</code> and <code>rsc._old.rsc</code>). Dinou injects script markers inside the HTML head so the browser client knows it is reading temporary stale data:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="html">{`<script>window.__DINOU_USE_STATIC__=true;</script>
<script>window.__DINOU_USE_OLD_RSC__=true;</script>
<script>window.__DINOU_BUILD_ID__="1751234567890";</script>`}</CodeBlock>
              </div>

              <h3>C. On-Demand Revalidation (Paths & Tags)</h3>
              <p>
                Programmatic revalidations (triggered by <code>revalidatePath(path)</code> or <code>revalidateTag(tag)</code>) bypass the time-expiration checks and force immediate background compilations through <code>cache-revalidate.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// cache-revalidate.js -> revalidateTag implementation
async function revalidateTag(tag) {
  const dist2Folder = path.resolve(process.cwd(), "dist2");
  const metadataFiles = await walkMetadataFiles(dist2Folder); // Crawls all metadata.json
  const revalidatePromises = [];

  for (const fileOfMeta of metadataFiles) {
    const metadata = JSON.parse(await fs.readFile(fileOfMeta, "utf8"));
    if (metadata.tags && metadata.tags.includes(tag)) {
      // Convert physical folder name to relative request path
      const relative = path.relative(dist2Folder, path.dirname(fileOfMeta));
      const reqPath = "/" + relative.replace(/\\\\/g, "/");
      revalidatePromises.push(revalidatePath(reqPath)); // Triggers parallel compilation
    }
  }
  await Promise.all(revalidatePromises);
}`}</CodeBlock>
              </div>
            </section>

            {/* 7. SERVER FUNCTIONS */}
            <section id="server-functions" className="mt-12 pt-8 border-t">
              <h2>🚀 7. Server Functions</h2>
              <p>
                Server Functions (Server Actions) are standard JavaScript functions in files prefixed with the <code>"use server"</code> directive. Under the hood, Dinou implements them through a secure, two-sided lifecycle that spans compilation, serialization, CSRF auditing, and streaming command protocols:
              </p>

              <h3>A. Compilation & Double-Sided Stubbing</h3>
              <p>
                Dinou compiles actions differently depending on where the code is executing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Client-Side Stubbing (Rollup / Webpack)</strong>: During client compilation, bundler plugins (such as <code>rollup-plugin-server-functions.js</code>) completely strip the server-side logic (database queries, private keys, API calls) to prevent code leakage. They replace all exports with stubs generated via <code>createServerFunctionProxy("file:///src/actions.ts#exportName")</code>.
                </li>
                <li>
                  <strong>Server-Side Registration (ESM Loader)</strong>: Inside the parent Node.js Express process, the ESM loader (<code>babel-esm-loader.js</code>) preserves the actual execution code but calls React's native <code>registerServerReference(fn, fileUrl, exportName)</code> on each export. This registers the memory reference with React Server DOM.
                </li>
              </ul>

              <h3>B. Action Reference Generation</h3>
              <p>
                When a Server Component renders a button or form bound to an action:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In a Server Component:
<form action={addTodo}>`}</CodeBlock>
              </div>
              <p>
                React's server serializer detects that the <code>addTodo</code> function is registered. In the RSC Flight Stream, it replaces the function with an action reference tag (e.g. <code>$@1</code>) mapping to the unique identifier <code>file:///src/actions/todo.ts#addTodo</code>. The browser client receives this payload and binds the reference to the local proxy stub created in Step A.
              </p>

              <h3>C. Client-Side Dispatch (The Proxy Trap)</h3>
              <p>
                When a user submits a form or triggers the action directly in JavaScript, the execution flow runs through a three-step client dispatch process:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground mb-4">
                <li>
                  <strong>Proxy Interception</strong>: The call is intercepted by the <code>apply</code> trap of the Javascript <code>Proxy</code> wrapper associated with the action's identifier.
                </li>
                <li>
                  <strong>Argument Packaging</strong>:
                  <ul className="list-disc pl-6 space-y-1">
                    <li><em>FormData Input</em>: If the action is triggered by a form submit (passing a <code>FormData</code> object), the proxy appends the unique action identifier to the fields (<code>__dinou_func_id</code>) and serializes any secondary arguments as a JSON string (<code>__dinou_args</code>). This allows file uploads to pass seamlessly.</li>
                    <li><em>Standard JS Call</em>: If called programmatically with arguments, it formats a clean JSON payload: <code>{"{ id, args }"}</code>.</li>
                  </ul>
                </li>
                <li>
                  <strong>Fetch Dispatch</strong>: It attaches a mandatory CSRF security header (<code>x-server-function-call: 1</code>) and issues a <code>POST</code> request to the framework's internal endpoint <code>/____server_function____</code>.
                </li>
              </ol>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// server-function-proxy.js -> Proxy apply trap
export function createServerFunctionProxy(id) {
  return new Proxy(() => {}, {
    apply: async (_target, _thisArg, args) => {
      let body;
      const headers = { "x-server-function-call": "1" }; // CSRF prevention header

      if (args[0] instanceof FormData) {
        const formData = args[0];
        formData.append("__dinou_func_id", id); // Inject action identifier
        if (args.length > 1) {
          formData.append("__dinou_args", JSON.stringify(args.slice(1)));
        }
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({ id, args });
      }

      const res = await fetch("/____server_function____", {
        method: "POST",
        headers,
        body,
      });
      // ... parse stream
    }
  });
}`}</CodeBlock>
              </div>

              <h3>D. Security Audit & Server Invocation</h3>
              <p>
                When the request hits <code>app.post("/____server_function____")</code> in <code>server.js</code>, it undergoes four strict security audits:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Origin Validation</strong>: In production, the request's <code>Origin</code> header is checked against the server's active <code>Host</code>/<code>x-forwarded-host</code>. If they don't align, the request is rejected with a <code>403 Forbidden</code> status.
                </li>
                <li>
                  <strong>CSRF Check</strong>: Rejects requests missing the <code>x-server-function-call: 1</code> header.
                </li>
                <li>
                  <strong>Sandbox Traversal Prevention</strong>: Parses the action identifier. It ensures it has no <code>..</code> traversals or absolute drive letters, and verifies that the resolved path lies strictly inside the project's <code>src/</code> directory.
                </li>
                <li>
                  <strong>Export Allowance Registry</strong>: Verifies that the targeted export function is registered in the build manifest (<code>server-functions-manifest.json</code>).
                  <ul className="list-disc pl-6 space-y-1 mt-1 text-xs">
                    <li><em>In Development</em>: The Express server reads the file on the fly and runs Babel's AST parser (via <code>parse-exports.js</code>) to verify the exports.</li>
                    <li><em>In Production</em>: At build time, custom bundler plugins (such as <code>rollup-plugin-server-functions.js</code> for esbuild/rollup or <code>WebpackServerFunctionsPluginSimple</code> for Webpack) crawl the codebase, intercept all files with the <code>"use server"</code> directive, collect their exported function names, and write them to <code>server-functions-manifest.json</code>. At startup, the Express server loads this manifest as a read-only registry.</li>
                  </ul>
                </li>
              </ol>
              <p className="mt-4">
                Once validated, the function is executed within a <code>requestStorage.run</code> wrapper, ensuring that calls to <code>getContext()</code> resolve the current request headers and cookies correctly:
              </p>
              <div className="not-prose my-2">
                <CodeBlock language="javascript">{`result = await requestStorage.run(context, async () => {
  return await fn(...args);
});`}</CodeBlock>
              </div>

              <h3>E. Response Return & Stream Redirects</h3>
              <p>
                Dinou allows actions to return either JSON values or React Server Component nodes. The server serializes JSX results using <code>renderToPipeableStream</code> and sends them back as a <code>text/x-component</code> stream.
              </p>
              <p>
                <strong>Handling redirects</strong>: If the action calls <code>redirect("/path")</code>, React throws an internal redirect exception:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Clean Response (Scenario A)</strong>: If headers have not been sent, the server responds with a JSON payload <code>{"{ redirect: '/path' }"}</code> and setting the <code>X-Dinou-Redirect</code> header.
                </li>
                <li>
                  <strong>Active Stream (Scenario B)</strong>: If the response stream is already active, the server writes a custom command line into the stream: <code>D:&#123;"type":"redirect","url":"/path"&#125;\n</code> and closes the socket.
                </li>
              </ul>
              <p className="mt-4">
                <strong>The Stream Command Filtering Algorithm</strong>: Feeding Dinou's raw control commands directly to React's client-side Flight decoder (<code>createFromFetch</code>) would result in a rendering crash. To prevent this, the client-side proxy intercepts the HTTP response stream and wraps the stream reader in a custom <code>ReadableStream</code> filter that parses data chunk-by-chunk:
              </p>

              <div className="space-y-6 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <Cpu className="h-5 w-5 text-yellow-500" />
                      <span>Stream Filtering Step-by-Step</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>
                        <strong>Buffer Accumulation</strong>: As binary chunks (<code>value</code>) are downloaded from the network via <code>reader.read()</code>, they are decoded to text strings and appended to a persistent local string <code>buffer</code>.
                      </li>
                      <li>
                        <strong>Complete Line Slicing</strong>: Network packages can easily slice a text command in half. The algorithm runs <code>buffer.lastIndexOf("\n")</code> to slice out only the completely downloaded lines (<code>completeChunk</code>) for immediate processing, leaving any incomplete trail in the <code>buffer</code> for subsequent chunks.
                      </li>
                      <li>
                        <strong>Prefixed Line Analysis</strong>: The chunk text is split by newlines. The parser loops through each line:
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                          <li><em>Lines starting with <code>D:</code> (Control Commands)</em>: The JSON payload is parsed (e.g. <code>{"{ type: 'redirect', url: '/dashboard' }"}</code>). The proxy triggers the command immediately in the browser (by routing or setting cookies) and <strong>discards the line</strong> entirely from the stream.</li>
                          <li><em>Standard Lines (RSC Flight Data)</em>: The line is appended to <code>cleanChunk</code>.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Enqueuing Clean Data</strong>: Only the <code>cleanChunk</code> string containing pristine, React-compliant Flight tokens is enqueued back into the stream controller (<code>controller.enqueue</code>).
                      </li>
                      <li>
                        <strong>React Decoupling</strong>: The stream is passed to <code>createFromFetch(Promise.resolve(new Response(readableStream)))</code>. For React, the stream is completely clean, ensuring it updates the layout seamlessly in the background.
                      </li>
                    </ol>

                    <CodeBlock language="javascript">{`// server-function-proxy.js -> Executed inside createServerFunctionProxy()
const readableStream = new ReadableStream({
  async start(controller) {
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lastNewlineIndex = buffer.lastIndexOf("\\n");
      if (lastNewlineIndex !== -1) {
        const completeChunk = buffer.slice(0, lastNewlineIndex + 1);
        buffer = buffer.slice(lastNewlineIndex + 1);

        const lines = completeChunk.split("\\n");
        let cleanChunk = "";
        for (const line of lines) {
          if (line.startsWith("D:")) {
            const payload = JSON.parse(line.slice(2));
            if (payload.type === "redirect") executeRedirect(payload.url);
            if (payload.type === "cookie") document.cookie = payload.cookie;
          } else {
            cleanChunk += line + "\\n"; // Enqueue clean RSC Flight data
          }
        }
        if (cleanChunk) controller.enqueue(encoder.encode(cleanChunk));
      }
    }
    controller.close();
  }
});
return createFromFetch(Promise.resolve(new Response(readableStream)));`}</CodeBlock>
                  </CardContent>
                </Card>
              </div>

              <h3>F. Open Redirect Protection (CWE-601 Mitigation)</h3>
              <p>
                Attackers often abuse redirect features to redirect users from a trusted domain to external phishing links (e.g. <code>/login?redirect=https://evil.com</code>).
              </p>
              <p>
                Dinou mitigates this inside its native <code>safeRedirect</code> helper by sanitizing all redirect inputs:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// render-app-to-html.js -> safeRedirect sanitation
const resolvedUrl = resolveRelativeUrl(targetUrl, reqPath);
let finalUrl = "/";

if (typeof resolvedUrl === "string" && resolvedUrl.startsWith("/") && !resolvedUrl.startsWith("//")) {
  finalUrl = resolvedUrl;
} else {
  console.warn(\`[Dinou Security] Blocked unsafe redirect to: \${targetUrl}\`);
}
// Perform redirect using finalUrl...`}</CodeBlock>
              </div>
              <p>
                <strong>Sanitation Rules:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-1 text-sm text-muted-foreground">
                <li><strong>Relative Resolution</strong>: Uses <code>resolveRelativeUrl</code> to convert relative paths (like <code>../profile</code>) into absolute pathnames relative to the referrer's path.</li>
                <li><strong>Internal Only Enforcement</strong>: Verifies that the resolved path starts with a single slash (<code>/</code>) and does NOT start with a double slash (<code>//</code>). Double slashes are blocked because browsers treat <code>//evil.com</code> as a protocol-relative scheme, resolving it as <code>https://evil.com</code>.</li>
                <li><strong>Fallback Redirect</strong>: If these conditions fail, Dinou blocks the redirect, overrides the destination to a safe root path (<code>/</code>), and outputs a warning to the server logs.</li>
              </ol>

              <h3>G. HttpOnly Cookie Assurance</h3>
              <p>
                When a component attempts to set a cookie, Dinou intercepts the call:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  If HTTP headers have not been sent, it sets the cookie securely via standard HTTP <code>Set-Cookie</code> headers.
                </li>
                <li>
                  If headers have already been sent, Dinou falls back to client-side script block injection (appending <code>&lt;script&gt;document.cookie = ...;&lt;/script&gt;</code> to the active stream).
                </li>
              </ul>
              <p className="mt-4">
                However, if the requested cookie options contain <code>httpOnly: true</code> during the streaming phase, the server throws an error and rejects the operation. This prevents silent security failures where developers assume their HttpOnly auth/session cookies are saved, when in fact they are ignored because client-side JavaScript cannot write HttpOnly keys.
              </p>
            </section>

            {/* 8. CLIENT ENTRY POINT & SPA RUNTIME */}
            <section id="client-router" className="mt-12 pt-8 border-t">
              <h2>⚛️ 8. Client Entry Point & SPA Runtime (client.jsx)</h2>
              <p>
                The <code>client.jsx</code> file serves as the main entry point for the browser client. It bridges the gap between the static HTML sent by the server and the live, interactive React single-page application (SPA).
              </p>

              <h3>A. DOM Hydration (<code>hydrateRoot</code>)</h3>
              <p>
                Upon page load, <code>client.jsx</code> initializes by calling React 19's <code>hydrateRoot(document, &lt;Router /&gt;)</code>. This process attaches event listeners to the pre-rendered HTML sent by the server (SSR), bringing the static page to life without reconstructing the DOM from scratch.
              </p>

              <h3>B. SPA Navigation & Client Transitions</h3>
              <p>
                Dinou prevents full-page browser reloads when navigating between internal links. Instead, the client-side <code>&lt;Router /&gt;</code> manages transitions dynamically:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground mb-4">
                <li>
                  <strong>Global Click Listener</strong>: Rather than attaching listeners to every individual anchor, Dinou registers a single click listener on the <code>document</code> root. It intercepts clicks on internal local links (ignoring <code>mailto:</code>, <code>tel:</code>, external URLs, or modified clicks like <code>Ctrl/Cmd + Click</code>) and calls <code>e.preventDefault()</code>.
                </li>
                <li>
                  <strong>Concurrent Transitions (<code>useTransition</code>)</strong>: It triggers navigation inside a <code>startTransition</code> hook. This tells React 19 to download and render the target page's Server Components in the background, keeping the current page interactive and preventing UI freeze during network latency.
                </li>
                <li>
                  <strong>History Synchronization (<code>popstate</code>)</strong>: Listens to the browser's <code>popstate</code> events to capture history back/forward operations and update the active route in React's state.
                </li>
                <li>
                  <strong>Prefetch Hook</strong>: Exposes <code>window.__DINOU_PREFETCH__</code> to pre-fetch RSC Flight payloads into the cache when users hover over links.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// client.jsx -> Global Click listener
document.addEventListener("click", (e) => {
  if (e.defaultPrevented) return;
  const anchor = e.target.closest("a");
  if (!anchor || anchor.target || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || isExternalUrl(href)) return;

  e.preventDefault();
  const finalPath = resolveUrl(href, window.location.pathname);
  window.__DINOU_ROUTER_NAVIGATE__(finalPath);
});`}</CodeBlock>
              </div>

              <h3>C. RSC Payload Fetching & Promise Cache (<code>getRSCPayload</code>)</h3>
              <p>
                To render a new route, the router fetches its RSC Flight Stream from the internal endpoint <code>/____rsc_payload____/route</code>.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground mb-4">
                <li>
                  <strong>Idempotent Promise Cache</strong>: Because React 19 may suspend components and retry rendering multiple times a second during load, standard fetching would trigger duplicate network requests. Dinou resolves this by caching the <strong>network Promise</strong> itself instead of the resolved data. Subsequent suspension retries immediately receive the same active Promise, avoiding network loops.
                </li>
                <li>
                  <strong>Server Action Mapping</strong>: Registers a custom <code>callServer</code> handler within the <code>createFromFetch</code> decoder. This callback routes interactive client actions back to the local action proxy stubs:
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// client.jsx -> cache promise storage
const cache = new Map();

const getRSCPayload = (rscKey, isPrefetch = false) => {
  const url = rscKey.split("::")[0];
  if (cache.has(url)) {
    return cache.get(url); // Returns identical promise -> avoids loop
  }

  // Check server-injected fallback flags for first page load
  let payloadUrl;
  if (window.__DINOU_USE_OLD_RSC__ || window.__DINOU_USE_STATIC__) {
    payloadUrl = window.__DINOU_USE_OLD_RSC__
      ? (window.__DINOU_USE_STATIC__ ? "/____rsc_payload_old_static____" : "/____rsc_payload_old____") + url
      : "/____rsc_payload_static____" + url;

    window.__DINOU_USE_OLD_RSC__ = false;
    window.__DINOU_USE_STATIC__ = false;
  } else {
    payloadUrl = "/____rsc_payload____" + url;
  }

  const promise = createFromFetch(
    fetch(payloadUrl).then((res) => {
      if (res.headers.has("x-rsc-redirect")) {
        const redirectUrl = res.headers.get("x-rsc-redirect");
        cache.delete(url);
        window.__DINOU_ROUTER_NAVIGATE__(redirectUrl, { replace: true });
        return new Promise(() => {}); // Suspends render permanently while navigating
      }
      return res;
    }),
    {
      callServer: async (id, args) => {
        return createServerFunctionProxy(id)(...args); // Hook actions back to stubs
      }
    }
  );
  cache.set(url, promise);
  return promise;
};`}</CodeBlock>
              </div>

              <h3>D. Scroll Restoration & Hash Management</h3>
              <p>
                Dinou provides smooth scroll behavior by hooking into the routing lifecycle via <code>useLayoutEffect</code> and <code>requestAnimationFrame</code>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground mb-4">
                <li>
                  <strong>Scroll Caching</strong>: During navigation, the router captures the current scroll height using <code>window.scrollY</code> and caches it in a global <code>scrollCache</code> map using the active path as the key.
                </li>
                <li>
                  <strong>PopState Restoration</strong>: When navigating backwards or forwards via browser history (triggering <code>PopState</code>), the router retrieves the cached scroll height and uses <code>window.scrollTo(0, savedY)</code> within a <code>requestAnimationFrame</code> wrapper to restore the user's exact scroll position.
                </li>
                <li>
                  <strong>Standard Navigate Reset</strong>: On standard link navigations, the router scrolls the window back to the top (<code>window.scrollTo(0, 0)</code>). If the target URL contains an anchor hash (e.g. <code>#team</code>), it waits for the React render tree to commit and calls <code>element.scrollIntoView()</code> to align the viewport.
                </li>
                <li>
                  <strong>Hash-Only Navigation Bypass</strong>: If a navigation target only modifies the URL hash (e.g. <code>/about#team</code>), Dinou intercepts it, pushes the history state, and scrolls directly without querying the network.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// client.jsx -> isHashChangeOnly check
if (isHashChangeOnly(finalPath)) {
  window.history.pushState(null, "", finalPath);
  const hash = new URL(finalPath, window.location.origin).hash;
  const element = document.getElementById(hash.replace("#", ""));
  if (element) {
    element.scrollIntoView({ behavior: "auto" });
  }
  return; // Stop RSC pipeline execution
}`}</CodeBlock>
              </div>

              <h3>E. Dynamic Error Boundary & Recovery</h3>
              <p>
                The client hydrates inside an <code>ErrorBoundary</code>. If a component encounters a rendering exception, the router intercepts it and fetches a formatted error page from the backend dynamically over RSC (<code>/____rsc_payload_error____</code>):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const getErrorRSCPayload = (route, error) => {
  const payloadUrl = "/____rsc_payload_error____" + route;
  return createFromFetch(
    fetch(payloadUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: { message: error.message, name: error.name, stack: error.stack }
      })
    })
  );
};`}</CodeBlock>
              </div>
            </section>

            {/* 9. BUNDLER INTEGRATION */}
            <section id="bundler-integration" className="mt-12 pt-8 border-t">
              <h2>📦 9. Bundler Integration</h2>
              <p>
                Dinou supports three bundler configurations: <strong>esbuild</strong>, <strong>Rollup</strong>, and <strong>webpack</strong>. Regardless of the bundler chosen, they all must resolve two primary constraints:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Client Manifest Generation</strong>: Map each client component's file path to the output bundle asset path (so the RSC server can resolve references).
                </li>
                <li>
                  <strong>Server Function Proxying</strong>: Scan and replace server action code blocks on the client with fetch stubs.
                </li>
              </ol>

              {/* 10.1 esbuild */}
              {/* 10.1 esbuild */}
              <h3 id="bundler-esbuild" className="mt-8">⚡ 9.1 esbuild Configuration</h3>
              <p>
                Dinou's esbuild integration resides inside <code>dinou/esbuild/</code>. It handles high-performance bundling for both client-side components and server-side assets. Since esbuild lacks native loaders for React 19 Compiler, PostCSS, or ESM-based HMR out of the box, Dinou implements a modular system composed of orchestrator scripts, helpers, custom plugins, and a custom Fast Refresh integration.
              </p>

              <h4>A. The Orchestrator Scripts</h4>
              <p>
                Dinou exposes two entry-point scripts depending on the environment:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>dev.mjs</code> (Development Server)</strong>: 
                  Cleans old assets, crawls the repository to build initial entry points, and boots a Chokidar filesystem watcher on the <code>src/</code> directory. When a file is added or removed, it debounces and recreates the esbuild compilation context. When files are modified, it executes a hot rebuild and broadcasts path updates to the client browser over a WebSocket server for Hot Module Replacement (HMR).
                </li>
                <li>
                  <strong><code>build.mjs</code> (Production Compilation)</strong>: 
                  Executes a single, production-optimized compilation pass using <code>esbuild.build</code>. It triggers asset hashing, CSS extraction, minification, and outputs the production bundle under the <code>dist3/</code> directory.
                </li>
              </ul>

              <h4>B. Directory Crawlers & Configuration Helpers</h4>
              <p>
                To coordinate builds, esbuild requires precise entry points. Dinou resolves this using specialized helpers under <code>helpers-esbuild/</code>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>get-esbuild-entries.mjs</code> (Entry Finder)</strong>: 
                  Unlike Rollup or Webpack, esbuild does not automatically crawl dynamic imports to split client files. Dinou solves this by scanning the source directory recursively at startup. It uses Babel to detect files containing the <code>"use client"</code> directive, stylesheet imports, and public assets, and registers them as independent compile entry points.
                </li>
                <li>
                  <strong><code>get-config-esbuild.mjs</code> and <code>get-config-esbuild-prod.mjs</code></strong>: 
                  Generate the build options for development and production, configuring target environments, loaders, inline sourcemaps, and global plugin chains.
                </li>
                <li>
                  <strong><code>update-manifest-for-module.mjs</code></strong>: 
                  Appends or updates entries in the dynamic asset manifests during development HMR cycles.
                </li>
              </ul>

              <h4>C. Custom esbuild Plugins (<code>plugins-esbuild/</code>)</h4>
              <p>
                Dinou injects a series of custom plugins into the esbuild compilation chain to handle React, CSS, and security features:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong><code>babel-react-compiler-plugin.mjs</code> (React 19 Compiler Bridge)</strong>: 
                  Intercepts <code>.[jt]sx?</code> files and compiles them using Babel. It injects the official <strong>React 19 Compiler</strong> (<code>babel-plugin-react-compiler</code>) to automatically memoize components (removing the need for manual <code>useMemo</code> or <code>useCallback</code>) and wires up Fast Refresh hooks.
                </li>
                <li>
                  <strong><code>css-processor-plugin.mjs</code> (Tailwind & CSS Modules processor)</strong>: 
                  Processes CSS stylesheets using PostCSS. It integrates <code>@tailwindcss/postcss</code> and <code>autoprefixer</code>, processes scoped CSS Modules class names using <code>postcss-modules</code>, and outputs the class mappings into local JS modules while extracting the final styles into <code>public/styles.css</code>.
                </li>
                <li>
                  <strong><code>stable-chunk-names-and-maps-plugin.mjs</code> (Cache Cascade Protection)</strong>: 
                  By default, esbuild generates shared chunks with random hashes (e.g. <code>chunk-AJS98D.js</code>). When files are modified, these names change, breaking browser caches. This plugin computes a stable chunk name based on its primary source path (e.g. <code>src/utils/math.ts</code> compiles to <code>chunk-utils-math.js</code>) and rewrites all import references inside the generated bundles.
                </li>
                <li>
                  <strong><code>react-client-manifest-plugin.mjs</code> (RSC Mapper)</strong>: 
                  Runs on build end to scan generated modules. For every file containing <code>"use client"</code>, it parses its exports and writes to <code>react-client-manifest.json</code> so that React Server Components can map client component declarations to their compiled JavaScript bundle paths.
                </li>
                <li>
                  <strong><code>server-functions-plugin.mjs</code> (Server Actions Shield)</strong>: 
                  Strips server-side code from client-bound bundles by replacing <code>"use server"</code> file exports with stubs calling <code>createServerFunctionProxy</code>, while logging action paths to <code>server-functions-manifest.json</code>.
                </li>
                <li>
                  <strong><code>assets-plugin.mjs</code> (Asset Loader)</strong>: 
                  Intercepts imports of static assets (like images or SVGs) and outputs them under the <code>assets/</code> folder with hashed filenames, returning their public URLs inside the client code.
                </li>
              </ul>

              <h4>D. Fast Refresh HMR Integration (<code>react-refresh/</code>)</h4>
              <p>
                Dinou provides state-preserving Hot Module Replacement in development through a custom integration under <code>react-refresh/</code>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>esm-hmr-plugin.mjs</code></strong>: 
                  Runs inside esbuild to inject HMR boundary checks and runtime scripts into client components. It registers the local WebSocket listener in the browser. When the dev server broadcasts a file change, the client uses dynamic imports to fetch the new code chunk and re-register it.
                </li>
                <li>
                  <strong><code>react-refresh-runtime.mjs</code></strong>: 
                  Wires up React's official Fast Refresh runtime (<code>react-refresh/runtime</code>) into the HMR lifecycle. When a component file is hot-swapped, React triggers an in-place re-render of the component tree, applying the new code without resetting component state (such as inputs, form values, or <code>useState</code> hooks).
                </li>
              </ul>

              {/* 10.2 Rollup */}
              <h3 id="bundler-rollup" className="mt-8">🔄 9.2 Rollup Configuration</h3>
              <p>
                Dinou's Rollup integration resides under <code>dinou/rollup/</code>. Unlike esbuild, Rollup natively traverses the import graph recursively starting from the client entries, so it does not require a pre-scan step. It relies on standard Node CommonJS module syntax to execute compilation configurations.
              </p>

              <h4>A. The Main Configuration (<code>rollup.config.js</code>)</h4>
              <p>
                The primary bundler configuration coordinates transpilation, CSS extraction, and code splitting. It enforces two strict output constraints vital for React 19's serialization:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/rollup/rollup.config.js
module.exports = {
  // ... input settings
  output: {
    dir: outputDirectory,
    format: "esm",
    minifyInternalExports: false, // 1. Prevents Rollup from minifying internal chunk exports to "a", "b", etc.
  },
  preserveEntrySignatures: "strict", // 2. Prevents Rollup from stripping or modifying entry point exports
};`}</CodeBlock>
              </div>
              <p>
                Dinou sets <code>preserveEntrySignatures: "strict"</code> and <code>minifyInternalExports: false</code> because React's runtime client serializer resolves components by matching original export names (e.g. <code>MyComponent</code>) between the server-generated RSC Flight payload and the client's JS bundle. If Rollup minifies internal exports to single-letter variables, the client hydration fails.
              </p>

              <h4>B. Custom Rollup Plugins (<code>rollup-plugins/</code>)</h4>
              <p>
                To replicate React and security functionality in Rollup, Dinou registers four bespoke plugins:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong><code>rollup-plugin-react-client-manifest.js</code> (Client Manifest & Default Export Hack)</strong>: 
                  During the build, this plugin hooks into the <code>transform</code> lifecycle to find files with the <code>"use client"</code> directive and registers them as separate code-split entry points. 
                  <br />
                  <em>The Default Export Hack</em>: Rollup tree-shakes default exports if they are not explicitly imported by client entry points, which breaks React's runtime manifest resolution. In the <code>generateBundle</code> hook, the plugin parses the original module code via Babel AST. If a default export exists but was tree-shaken, it appends a manual alias directly to the chunk code:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`// rollup-plugin-react-client-manifest.js -> generateBundle hook
if (chunk.facadeModuleId && !chunk.exports.includes("default")) {
  const originalCode = readFileSync(chunk.facadeModuleId, "utf8");
  const defaultName = getDefaultExportName(originalCode); // AST search
  if (defaultName && chunk.exports.includes(defaultName)) {
    chunk.code += \`\\nexport { \${defaultName} as default };\\n\`; // Append alias
    chunk.exports.push("default");
  }
}`}</CodeBlock>
                  </div>
                </li>
                <li>
                  <strong><code>rollup-plugin-server-functions.js</code> (Server Actions Shield)</strong>: 
                  Crawls the Rollup module graph. When it encounters a file with a <code>"use server"</code> header, it extracts its exports, deletes the server-side logic from the file, and replaces the module content with client proxies invoking <code>createServerFunctionProxy</code>. It also outputs the <code>server-functions-manifest.json</code> security index.
                </li>
                <li>
                  <strong><code>dinou-asset-plugin.js</code> (Static Asset Resolver)</strong>: 
                  Intercepts imports of static resources (e.g. images, SVGs) within client files, copies them to the public directory with an asset hash, and exports their compiled URLs.
                </li>
                <li>
                  <strong><code>manifest-generator-plugin.js</code> (Asset Hasher Map)</strong>: 
                  Runs on build end in production. It collects all output bundle chunks and writes a lookup JSON mapping original file names (like <code>main.js</code>) to their compiled hashed filenames (like <code>main-h7d9s2.js</code>) to coordinate static index rendering.
                </li>
              </ul>

              <h4>C. Fast Refresh HMR Integration (<code>react-refresh/</code>)</h4>
              <p>
                Like esbuild, Dinou's Rollup configuration implements state-preserving Hot Module Replacement in development through specialized wrappers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>rollup-plugin-esm-hmr.js</code></strong>: 
                  Establishes the WebSocket server in development and injects the ESM HMR client listener (<code>import.meta.hot</code>) into the client-bound JavaScript files.
                </li>
                <li>
                  <strong><code>react-refresh-wrap-modules.js</code></strong>: 
                  Before compiling files, this plugin intercepts client modules and wraps their export declarations with React Fast Refresh runtime registration code.
                </li>
                <li>
                  <strong><code>react-refresh-runtime.js</code>, <code>react-refresh-entry.js</code>, and <code>is-react-refresh-boundary.js</code></strong>: 
                  Integrate React's Fast Refresh registry into the ESM HMR lifecycle, ensuring that when the HMR plugin hot-swaps a module, React re-evaluates the components in-place without resetting browser state.
                </li>
              </ul>

              {/* 10.3 Webpack */}
              <h3 id="bundler-webpack" className="mt-8">🕸️ 9.3 Webpack Configuration</h3>
              <p>
                Dinou's Webpack integration resides inside <code>dinou/webpack/</code>. Unlike esbuild and Rollup, Webpack's architecture leverages official, standard React compilation plugins to build manifests, while using custom loaders and plugins to hook Server Actions and CSS extraction.
              </p>

              <h4>A. The Main Configuration (<code>webpack.config.js</code>)</h4>
              <p>
                The primary configuration manages cleaning target outputs (via the <code>cleanDir</code> helper), compiling entries, and setting up module rules:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/webpack/webpack.config.js
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");
const ServerFunctionsPlugin = require("./plugins/server-functions-plugin");

module.exports = {
  // ... configuration settings
  plugins: [
    new ReactServerWebpackPlugin({ isServer: false }), // Generates react-client-manifest.json
    new ServerFunctionsPlugin(),                       // Consolidates actions allowlist
  ],
};`}</CodeBlock>
              </div>
              <p>
                Unlike other configurations, Dinou delegates React-specific code-splitting and client mapping to Webpack's official <code>ReactServerWebpackPlugin</code>, which intercepts the module graph to output <code>react-client-manifest.json</code> automatically.
              </p>

              <h4>B. Directory Crawlers (<code>helpers/</code>)</h4>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>get-webpack-entries.js</code></strong>: 
                  Crawls the source directory at build start to identify CSS stylesheets and static assets, outputting a flat dictionary mapping entry point names to their absolute file paths.
                </li>
              </ul>

              <h4>C. Custom Webpack Loaders (<code>loaders/</code>)</h4>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong><code>server-functions-loader.js</code> (Actions Stripper)</strong>: 
                  Webpack uses loaders to transform source modules. This loader intercepts files containing the <code>"use server"</code> directive. It strips out the backend logic and replaces it with lazy import proxies pointing to the client proxy helper. It also emits a temporary metadata JSON file detailing the action's exports:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`// server-functions-loader.js -> Loader export
module.exports = function (source) {
  if (!useServerRegex.test(source)) return source;
  const exports = parseExports(source);
  const normalizedPath = path.relative(process.cwd(), this.resourcePath).replace(/\\\\/g, "/");

  // Dynamic stub calling createServerFunctionProxy
  let proxyCode = \`const loadProxy = new Function('return import("/" + "__SERVER_FUNCTION_PROXY__")');\\n\`;
  for (const exp of exports) {
    const key = exp === "default" ? \`file:///\${normalizedPath}#default\` : \`file:///\${normalizedPath}#\${exp}\`;
    proxyCode += exp === "default"
      ? \`export default (...args) => loadProxy().then(m => m.createServerFunctionProxy("\${key}")(...args));\\n\`
      : \`export const \${exp} = (...args) => loadProxy().then(m => m.createServerFunctionProxy("\${key}")(...args));\\n\`;
  }
  // Emit a temporary json record for this file's server actions
  this.emitFile(\`server-functions/\${normalizedPath}.json\`, JSON.stringify({ path: normalizedPath, exports }));
  return proxyCode;
};`}</CodeBlock>
                  </div>
                </li>
              </ul>

              <h4>D. Custom Webpack Plugins (<code>plugins/</code>)</h4>
              <p>
                Dinou registers two custom Webpack plugins to handle asset mapping and action security manifests:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong><code>server-functions-plugin.js</code> (Actions Consolidator)</strong>: 
                  Hooks into Webpack's asset generation phase. It performs two duties:
                  <ul className="list-disc pl-6 space-y-1 mt-1 text-xs">
                    <li><em>Placeholder Replacement</em>: Scans JS assets, finds <code>__SERVER_FUNCTION_PROXY__</code> placeholders, and replaces them with the final compiled, hashed name of the client proxy runtime.</li>
                    <li><em>Manifest Synthesis</em>: Reads the temporary JSON files generated by <code>server-functions-loader.js</code>, compiles them into a unified <code>server-functions-manifest.json</code> allowlist, and deletes the temporary files from the final output assets.</li>
                  </ul>
                </li>
                <li>
                  <strong><code>manifest-generator-plugin.js</code> (Asset Map)</strong>: 
                  Hooks into the asset processing phase in production to compile a flat JSON lookup map linking original source filenames to their final hashed output files (e.g. <code>main.js -&gt; main-a7b89.js</code>).
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
