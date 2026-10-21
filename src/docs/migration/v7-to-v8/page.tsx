import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";
import { Badge } from "@/docs/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Boxes,
  Globe,
  Terminal,
  Layers,
  FileCode2,
  Zap,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  FolderTree,
  ArrowRight,
  Server,
  Lock,
  Binary,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Overview & Architectural Leap", level: 2 },
  { id: "pure-esm", title: "2. Pure ESM Architecture (type: module)", level: 2 },
  { id: "type-module", title: "2.1 Adoption of \"type\": \"module\"", level: 3 },
  { id: "source-extensions", title: "2.2 Source Extensions Unification (.js)", level: 3 },
  { id: "exports-map", title: "2.3 Modernized Exports Map", level: 3 },
  { id: "cli-eject", title: "2.4 Modernized CLI & Modular Ejector", level: 3 },
  { id: "config-cleanup", title: "2.5 Canonical Config Resolution", level: 3 },
  { id: "edge-renderer-singleton", title: "3. Universal Edge Renderer Singleton", level: 2 },
  { id: "handler-fix", title: "4. Handler Fix: allowISG: false in Layouts", level: 2 },
  { id: "upgrade-steps", title: "5. Step-by-Step Upgrade Guide", level: 2 },
  { id: "upgrade-apps", title: "5.1 Standard Applications", level: 3 },
  { id: "upgrade-ejected", title: "5.2 Ejected Projects (dinou eject)", level: 3 },
  { id: "verification-checklist", title: "6. Production Health Checklist", level: 2 },
];

export default function MigrationV7ToV8Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Migration from v7 to v8 | Dinou Docs</title>
      <meta
        name="description"
        content="Complete migration guide for upgrading to Dinou v8: pure ECMAScript Modules (ESM), source extension unifications, Edge Renderer singleton, and critical routing handler stability."
      />
      <link rel="canonical" href="https://dinou.dev/docs/migration/v7-to-v8" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
                Migration Guide
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                v7 &rarr; v8
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migration from v7 to v8
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Complete migration specification for upgrading to Dinou v8: Pure ECMAScript Modules (<code>&quot;type&quot;: &quot;module&quot;</code>), source extensions unification (<code>.mjs</code> &rarr; <code>.js</code>), universal Edge Renderer singleton, and critical bug fixes in the routing handler for static layouts with <code>allowISG: false</code>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Architectural Leap
              </h2>
              <p>
                <strong>Dinou v8</strong> consolidates the maturity of the framework around two fundamental architectural pillars:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Full Migration to Pure ECMAScript Modules (ESM)</strong>: Complete elimination of extension fragmentation (<code>.mjs</code> vs <code>.js</code>), adoption of <code>&quot;type&quot;: &quot;module&quot;</code> in the package root, modernization of the <code>exports</code> subpath map, and native ESM refactoring of both the CLI (<code>cli.js</code>) and ejector engine (<code>eject.js</code>).
                </li>
                <li>
                  <strong>Critical Stability in Hybrid Routing (Handler)</strong>: Resolution of a critical bug in the request handler when resolving static layouts configured with <code>allowISG: false</code>, eliminating false 404 errors and ensuring seamless execution of Server Components and Server Functions.
                </li>
              </ol>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden not-prose my-6 shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="min-w-[640px]">
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/60">
                      <TableRow>
                        <TableHead className="w-[24%] font-semibold text-slate-900 dark:text-slate-100 text-xs">
                          Architecture Area
                        </TableHead>
                        <TableHead className="w-[38%] text-xs font-semibold text-amber-600 dark:text-amber-400">
                          Dinou v7.3.0
                        </TableHead>
                        <TableHead className="w-[38%] text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Dinou v8.0.0 (Current)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs divide-y">
                      <TableRow>
                        <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                          Package Module Format
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono">
                          Hybrid (CommonJS + explicit .mjs files)
                        </TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                          &quot;type&quot;: &quot;module&quot; (Pure ESM)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                          Framework Source Files
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono">
                          Scattered .mjs files (build.mjs, adapters, cli)
                        </TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                          Unified standard .js files across dinou/
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                          Package Exports Map
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono">
                          Conditional bifurcations (import vs require)
                        </TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                          Direct ESM resolution (.js) with typed subpaths
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                          Edge Renderer Resolution
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Dynamic <code>require()</code> resolution in Node dev server
                        </TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          <code>globalThis.__DINOU_EDGE_RENDERER__</code> singleton
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                          Layouts with allowISG: false
                        </TableCell>
                        <TableCell className="text-rose-600 dark:text-rose-400">
                          Immediate 404 on pre-rendered or authorized routes
                        </TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Checks <code>staticPathsSet</code> &amp; physical <code>layout.rsc</code>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                          Application Syntax &amp; APIs
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          React 19, RSC, Server Functions, layout_functions
                        </TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          100% Backwards Compatible (Zero API breakages)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>

            {/* Section 2: Pure ESM */}
            <section id="pure-esm" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Pure ESM Architecture (&quot;type&quot;: &quot;module&quot;)
              </h2>

              {/* 2.1 type: module */}
              <div id="type-module" className="space-y-3 mt-6">
                <h3 className="text-lg font-bold">2.1 Adoption of &quot;type&quot;: &quot;module&quot; in package.json</h3>
                <p>
                  In Dinou v7, the framework operated as a hybrid package. This necessitated the <code>.mjs</code> extension for any module requiring explicit ESM behavior in Node.js while coexisting with CommonJS files.
                </p>
                <p>
                  In <strong>Dinou v8</strong>, the root <code>package.json</code> of the framework declares:
                </p>
                <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`{
  "name": "dinou",
  "version": "8.0.0",
  "type": "module",
  "main": "./dinou/index.js",
  "bin": {
    "dinou": "./cli.js"
  }
}`}
                </CodeBlock>
                <div className="p-4 rounded-lg border bg-card space-y-1.5 not-prose text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Pragmatic Retention of &quot;main&quot;:</span> Although Node.js and modern runtimes prioritize <code>&quot;exports&quot;</code>, <code>&quot;main&quot;: &quot;./dinou/index.js&quot;</code> is retained intentionally (following Vite, Astro, and Hono) to support static analysis tools, IDE extensions, and monorepo scripts that inspect the main field directly.
                </div>
              </div>

              {/* 2.2 Source Extensions Unification */}
              <div id="source-extensions" className="space-y-3 mt-8">
                <h3 className="text-lg font-bold">2.2 Source Extensions Unification (.mjs &rarr; .js)</h3>
                <p>
                  All source files, bundler scripts, adapters, and entry points within the framework have been unified from <code>.mjs</code> to standard <code>.js</code>:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium text-xs">
                      <tr>
                        <th className="p-3">Dinou v7 (Legacy Path)</th>
                        <th className="p-3">Dinou v8 (Standard ESM)</th>
                        <th className="p-3">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/node/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/node/build.js</td>
                        <td className="p-3">Production bundler for Node.js orchestrator</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/cloudflare/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/cloudflare/build.js</td>
                        <td className="p-3">Production bundler for Cloudflare Workers</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/deno/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/deno/build.js</td>
                        <td className="p-3">Production bundler for Deno Deploy</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/bun/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/bun/build.js</td>
                        <td className="p-3">Production bundler for Bun runtime</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/esbuild/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/esbuild/build.js</td>
                        <td className="p-3">Client compiler for esbuild</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/core/export-static.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/core/export-static.js</td>
                        <td className="p-3">Static SSG export pipeline</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/adapters/node.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/adapters/node.js</td>
                        <td className="p-3">Node.js HTTP server adapter</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/index.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/index.js</td>
                        <td className="p-3">Unified framework entry point</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/server.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/server.js</td>
                        <td className="p-3">Server utilities and on-demand revalidation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border p-4 bg-muted/20 not-prose space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Deliberate Exception: Compiled Artefact (.dinou/node/server.mjs)</span>
                  </div>
                  <p>
                    The generated production server output file at <code>.dinou/node/server.mjs</code> retains the <code>.mjs</code> extension deliberately. This guarantees that Node.js and Bun always execute the generated orchestrator as an ES module regardless of whether the consumer project has <code>&quot;type&quot;: &quot;module&quot;</code> in their package.json.
                  </p>
                </div>
              </div>

              {/* 2.3 Exports Map */}
              <div id="exports-map" className="space-y-3 mt-8">
                <h3 className="text-lg font-bold">2.3 Modernized Exports Map</h3>
                <p>
                  The package export map has been streamlined. Conditional CommonJS bifurcations have been removed in favor of clean ESM subpaths with complete TypeScript declaration maps:
                </p>
                <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`"exports": {
  ".": {
    "types": "./dinou/index.d.ts",
    "import": "./dinou/index.js",
    "default": "./dinou/index.js"
  },
  "./env": {
    "types": "./dinou/env.d.ts"
  },
  "./server": {
    "types": "./dinou/server.d.ts",
    "import": "./dinou/server.js",
    "default": "./dinou/server.js"
  },
  "./config": {
    "types": "./dinou/index.d.ts",
    "import": "./dinou/core/config.js",
    "default": "./dinou/core/config.js"
  },
  "./adapters/node": "./dinou/adapters/node.js",
  "./adapters/bun": "./dinou/adapters/bun.js",
  "./adapters/deno": "./dinou/adapters/deno.js",
  "./adapters/cloudflare": "./dinou/adapters/cloudflare.js",
  "./adapters/netlify": "./dinou/adapters/netlify.js"
}`}
                </CodeBlock>
              </div>

              {/* 2.4 CLI & Ejector */}
              <div id="cli-eject" className="space-y-3 mt-8">
                <h3 className="text-lg font-bold">2.4 Modernized CLI (cli.js) &amp; Modular Ejector (eject.js)</h3>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>
                    <strong>Native ESM CLI (<code>cli.js</code>)</strong>: All legacy <code>require(...)</code> calls have been replaced with static ESM imports (<code>import &#123; program &#125; from &quot;commander&quot;</code>, <code>fileURLToPath(import.meta.url)</code>). All internal CLI script invocations (<code>dinou dev</code>, <code>dinou build</code>, <code>dinou start</code>) invoke the updated <code>.js</code> scripts.
                  </li>
                  <li>
                    <strong>Modular Ejector (<code>eject.js</code>)</strong>: The ejector script no longer executes loose side-effects on load. It encapsulates the extraction logic into an explicit export:
                    <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg my-2">
{`export function eject() { /* ... */ }
export default eject;`}
                    </CodeBlock>
                    When running <code>dinou eject</code>, <code>cli.js</code> imports and executes the function dynamically. Furthermore, all scripts generated in the ejected project&apos;s <code>package.json</code> have been updated to target the new <code>.js</code> file paths.
                  </li>
                </ol>
              </div>

              {/* 2.5 Config Cleanup */}
              <div id="config-cleanup" className="space-y-3 mt-8">
                <h3 className="text-lg font-bold">2.5 Elimination of Redundant Bridge (dinou/config.js)</h3>
                <p>
                  In previous versions, a bridge file existed at <code>dinou/config.js</code> to support CommonJS resolution of <code>import &quot;dinou/config&quot;</code>.
                </p>
                <p>
                  In Dinou v8, <code>dinou/config.js</code> has been <strong>definitively removed</strong>. The single canonical source of truth is <code>dinou/core/config.js</code>. Both of the following import styles are fully supported, typed, and equivalent:
                </p>
                <CodeBlock language="typescript" containerClassName="w-full overflow-hidden rounded-lg">
{`// Option A: Direct config subpath import
import { defineConfig } from "dinou/config";

// Option B: Named import from root package
import { defineConfig } from "dinou";`}
                </CodeBlock>
              </div>
            </section>

            {/* Section 3: Universal Edge Renderer Singleton */}
            <section id="edge-renderer-singleton" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Universal Edge Renderer Singleton
              </h2>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">The Technical Challenge in Node.js Dev Server</h3>
                <p>
                  Dinou executes a <strong>0-Fork Dual-Bundle</strong> architecture where the React Server Components (RSC) engine and the Server-Side Rendering (SSR) HTML engine operate within the same Node process.
                </p>
                <p>
                  Under CommonJS, Node resolved <code>react-server-dom-webpack/server.edge</code> dynamically with <code>require()</code>. In pure ESM, dynamically importing the React Server DOM edge renderer during hot module recompilations caused module context mismatches between Esbuild-compiled server bundles and the Node HTTP server.
                </p>

                <h3 className="text-lg font-bold">The Architectural Solution</h3>
                <p>
                  In <code>dinou/node/dev.js</code> and <code>dinou/node/bundle-dual-engine.js</code>, Dinou imports the native React edge renderer once at boot time and registers it as a shared global singleton:
                </p>
                <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`import * as edgeRenderer from "react-server-dom-webpack/server.edge";
globalThis.__DINOU_EDGE_RENDERER__ = edgeRenderer;`}
                </CodeBlock>
                <p>
                  Inside the internal server bundle, the renderer is consumed with zero latency:
                </p>
                <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`const edgeRenderer = globalThis.__DINOU_EDGE_RENDERER__ || await import("react-server-dom-webpack/server.edge");`}
                </CodeBlock>

                <div className="grid gap-4 sm:grid-cols-3 not-prose my-4">
                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                        <Lock className="h-4 w-4 text-emerald-500" />
                        <span>Single Context</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Prevents duplicate React Server DOM instances from polluting memory or breaking flight streams.
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span>Zero Latency</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Eliminates dynamic import re-evaluations on incoming HTTP requests.
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                        <ShieldCheck className="h-4 w-4 text-blue-500" />
                        <span>Cross-Platform</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      100% test suite passing across Windows and Linux with Esbuild, Rollup, and Webpack.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Section 4: Handler Fix */}
            <section id="handler-fix" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Critical Routing Handler Fix: allowISG: false in Layouts
              </h2>

              <div className="space-y-4">
                <p>
                  In Dinou, routes and layouts can configure static generation and caching policies in <code>layout_functions.ts</code> / <code>layout_functions.js</code>:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li><code>revalidate = false</code>: Complete Static Site Generation (SSG).</li>
                  <li><code>allowISG = false</code>: Prohibits dynamic fallback generation on the fly for paths that were not pre-rendered during build or authorized by <code>getStaticPaths</code>.</li>
                </ul>

                <h3 className="text-lg font-bold">The Bug in v7.3.0</h3>
                <p>
                  In v7.3.0, the request handler (<code>dinou/core/handler.js</code>) contained an overly strict condition in production:
                </p>
                <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`// ❌ Buggy code in v7.3.0:
if (!isDevelopment && lConfig.allowISG === false) {
  return new Response("Not Found", { status: 404 });
}`}
                </CodeBlock>
                <p className="text-sm text-muted-foreground">
                  This caused <strong>any request to a route descending from a layout with <code>allowISG: false</code> to return an immediate 404 Not Found</strong>, ignoring whether the route was authorized via <code>getStaticPaths</code> or if its pre-rendered <code>layout.rsc</code> payload already existed on disk.
                </p>

                <h3 className="text-lg font-bold">The Implemented Fix in v8.0.0</h3>
                <p>
                  In Dinou v8, <code>dinou/core/handler.js</code> comprehensively verifies whether the route is permitted before blocking it:
                </p>
                <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`// ✅ Corrected logic in Dinou v8.0.0:
let isPathAllowed = false;

// 1. Check if the URL matches an authorized path returned by getStaticPaths
if (lConfig.staticPathsSet) {
  const sortedEntries = Object.entries(lParams || {})
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => {
      if (Array.isArray(v)) return [k, v.join(",")];
      return [k, String(v)];
    });
  const serializedQuery = JSON.stringify(sortedEntries);
  const singleVal = Object.values(lParams || {})[0];
  const singleValStr = Array.isArray(singleVal) ? singleVal.join(",") : String(singleVal);
  isPathAllowed = lConfig.staticPathsSet.has(serializedQuery) || lConfig.staticPathsSet.has(singleValStr);
}

// 2. If not matched in staticPathsSet, verify if the pre-rendered layout artifact exists on disk
if (!isPathAllowed) {
  const cleanReq = reqPath.replace(/^\\//, "").replace(/\\/$/, "");
  const rscPath = path.join(process.cwd(), ".dinou/dist2", cleanReq, "layout.rsc");
  if (!existsSync(rscPath)) {
    isPathBlocked = true; // Block only if the artifact physically does not exist
    break;
  }
}`}
                </CodeBlock>

                <div className="rounded-xl border p-4 bg-emerald-500/10 border-emerald-500/20 not-prose space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Key Benefits Restored</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    The entire <strong>SSR &rarr; Loading &rarr; Streaming &rarr; Client Hydration</strong> flow in static layouts functions smoothly. Server Functions (<code>&quot;use server&quot;</code>) invoked from client components inside static layouts are resolved with 100% reliability.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Upgrade Steps */}
            <section id="upgrade-steps" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Step-by-Step Upgrade Guide (v7 to v8)
              </h2>

              {/* 5.1 Standard Applications */}
              <div id="upgrade-apps" className="space-y-4 mt-6">
                <h3 className="text-lg font-bold">5.1 For Standard Applications (using dependencies: &#123; &quot;dinou&quot;: &quot;^8.0.0&quot; &#125;)</h3>

                <div className="space-y-3">
                  <p className="font-semibold text-sm">
                    Step 1: Declare <code>&quot;type&quot;: &quot;module&quot;</code> in your project&apos;s <code>package.json</code>
                  </p>
                  <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`{
  "name": "my-dinou-app",
  "type": "module",
  "dependencies": {
    "dinou": "^8.0.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0"
  }
}`}
                  </CodeBlock>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-sm">
                    Step 2: Rename <code>dinou.config.mjs</code> (Optional but Recommended)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Because your project now declares <code>&quot;type&quot;: &quot;module&quot;</code>, you can rename your configuration file to <code>dinou.config.js</code> or <code>dinou.config.ts</code>:
                  </p>
                  <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`// dinou.config.js
import { defineConfig } from "dinou/config"; // or import { defineConfig } from "dinou";

export default defineConfig({
  // Your Dinou v8 configuration
});`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-sm">
                    Step 3: Zero Code Changes in Your Application Routes
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-xs text-muted-foreground">
                    <li>Your route files (<code>page.tsx</code>, <code>layout.tsx</code>, <code>page_functions.ts</code>, <code>layout_functions.ts</code>) require <strong>zero changes</strong>.</li>
                    <li>React Server Components (RSC), Client Components (<code>&quot;use client&quot;</code>), Server Functions (<code>&quot;use server&quot;</code>), navigation hooks (<code>useRouter</code>, <code>usePathname</code>, <code>useSearchParams</code>), and cache slots (<code>&lt;DinouCacheSlot&gt;</code>) are 100% backwards compatible.</li>
                  </ul>
                </div>
              </div>

              {/* 5.2 Ejected Projects */}
              <div id="upgrade-ejected" className="space-y-4 mt-8">
                <h3 className="text-lg font-bold">5.2 For Ejected Projects (dinou eject)</h3>

                <div className="rounded-xl border p-4 bg-amber-500/10 border-amber-500/20 not-prose space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Caution: Re-ejecting Overwrites Local Framework Modifications</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Executing <code>npx dinou@8.0.0 eject</code> will overwrite the local <code>./dinou/</code> folder with the fresh v8 core. If you applied custom modifications to your ejected core in v7, follow the recommendations below.
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <p>Choose the strategy that matches your maintenance requirements:</p>
                  <ol className="list-decimal pl-6 space-y-3 text-xs text-muted-foreground">
                    <li>
                      <strong className="text-foreground">Keep your current ejected v7 setup:</strong> If your project is operating smoothly, there is no requirement to manually convert your local ejected code to ESM. Ejected projects are 100% self-contained.
                    </li>
                    <li>
                      <strong className="text-foreground">Apply only the handler bug fix:</strong> If you use <code>allowISG: false</code> in layouts, simply patch your local <code>./dinou/core/handler.js</code> file using the logic described in <a href="#handler-fix" className="text-primary underline">Section 4</a>.
                    </li>
                    <li>
                      <strong className="text-foreground">Migrate to the new v8 ESM core:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Commit or back up your existing <code>./dinou/</code> directory.</li>
                        <li>Update the dependency to <code>&quot;dinou&quot;: &quot;^8.0.0&quot;</code> and run <code>npx dinou eject</code>.</li>
                        <li>Re-apply your custom core changes over the clean v8 ESM foundation.</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 6: Verification Checklist */}
            <section id="verification-checklist" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Production Health &amp; Verification Checklist
              </h2>
              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Dinou v8 Verification Checklist</span>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>type: module:</strong> Ensure your project&apos;s <code>package.json</code> contains <code>&quot;type&quot;: &quot;module&quot;</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Clean Extension References:</strong> Ensure any scripts or imports reference <code>.js</code> rather than <code>.mjs</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Config Subpath:</strong> Confirm <code>dinou.config.js</code> imports from <code>&quot;dinou/config&quot;</code> or <code>&quot;dinou&quot;</code> cleanly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Static Layouts Tested:</strong> Verify any routes with <code>allowISG: false</code> render pre-rendered static layouts without 404 errors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Production Build:</strong> Execute <code>npm run build:node &amp;&amp; npm run start:node</code> locally to confirm clean compilation and startup.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </main>

      {/* Sidebar TOC */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
