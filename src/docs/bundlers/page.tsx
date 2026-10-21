import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Boxes,
  Zap,
  Package,
  Server,
  Cpu,
  Layers,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Cloud,
  ShieldCheck,
  Sparkles,
  Globe,
  RefreshCw,
  Binary,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Overview: Bundlers in Dinou", level: 2 },
  { id: "the-three-bundlers", title: "2. esbuild, Rollup, & Webpack Compared", level: 2 },
  { id: "esbuild", title: "2.1 esbuild (Default & Lightning Fast)", level: 3 },
  { id: "rollup", title: "2.2 Rollup (Optimized Tree-Shaking)", level: 3 },
  { id: "webpack", title: "2.3 Webpack (Enterprise & React Compiler)", level: 3 },
  { id: "dual-bundle-engine", title: "3. The Dual-Bundle Engine Architecture", level: 2 },
  { id: "cli-commands", title: "4. Complete Dinou Scripts Matrix", level: 2 },
  { id: "dev-scripts", title: "4.1 Development Scripts (dinou dev)", level: 3 },
  { id: "node-scripts", title: "4.2 Node.js Standard Build & Start (build:node)", level: 3 },
  { id: "node-compile-scripts", title: "4.3 Node Standalone Binary Compilation (build:node:compile)", level: 3 },
  { id: "node-pure-scripts", title: "4.4 Pure Bun Engine for Node.js (build:node:pure)", level: 3 },
  { id: "node-pure-compile-scripts", title: "4.5 Pure Standalone Binary Compilation (build:node:pure:compile)", level: 3 },
  { id: "node-build-matrix", title: "4.6 Node Build Architecture & Execution Matrix", level: 3 },
  { id: "cloudflare-scripts", title: "4.7 Cloudflare Workers & Pages", level: 3 },
  { id: "deno-scripts", title: "4.8 Deno & Standalone Compiles", level: 3 },
  { id: "bun-scripts", title: "4.9 Bun Runtime & Standalone Compiles", level: 3 },
  { id: "static-export-scripts", title: "4.10 Static HTML Export (dinou export-static)", level: 3 },
  { id: "package-json-setup", title: "5. Recommended package.json Setup", level: 2 },
  { id: "bundler-selection-guide", title: "6. Which Bundler & Target Should You Choose?", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Bundlers & Build Tooling | Dinou Docs</title>
      <meta
        name="description"
        content="Dinou features first-class multi-bundler architecture supporting esbuild, Rollup, and Webpack across Node.js, Cloudflare, Deno, Bun, and binaries."
      />
      <link rel="canonical" href="https://dinou.dev/docs/bundlers" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Tri-Bundler Engine
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bundlers &amp; Build Tooling
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features first-class multi-bundler architecture supporting <strong>esbuild</strong>, <strong>Rollup</strong>, and <strong>Webpack</strong> across Node.js, Cloudflare, Deno, Bun, and standalone compiled binaries.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>1. Overview: Bundlers in Dinou</h2>
              <p>
                Unlike rigid meta-frameworks that lock you into a single proprietary bundler, Dinou is architected with a pluggable, agnostic build core. Dinou provides native, pre-configured pipelines for three premier JavaScript bundlers:
              </p>
              <ul>
                <li>
                  <strong>esbuild (Default):</strong> Written in Go. Delivers sub-millisecond build cycles and instant HMR feedback loops in local development.
                </li>
                <li>
                  <strong>Rollup:</strong> The industry benchmark for clean ES Module output, advanced tree-shaking, and surgical code splitting.
                </li>
                <li>
                  <strong>Webpack:</strong> The most battle-tested enterprise bundler with universal package compatibility and built-in React Compiler integration in dev and prod.
                </li>
              </ul>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>esbuild (Default)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    10&times;&ndash;100&times; faster startup. The default for <code>dinou dev</code> and rapid local iterations.
                  </CardContent>
                </Card>

                <Card className="border-rose-500/20 bg-rose-50/50 dark:bg-rose-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                      <Layers className="h-4 w-4" />
                      <span>Rollup</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Maximum tree-shaking and ultra-clean ESM chunks. Ideal for modern edge deployments.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <Boxes className="h-4 w-4" />
                      <span>Webpack</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Universal package compatibility and automatic React Compiler optimization in dev and prod.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* The Three Bundlers Compared */}
            <section id="the-three-bundlers" className="mt-12">
              <h2>2. esbuild, Rollup, &amp; Webpack Compared</h2>

              <div id="esbuild" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">2.1 esbuild (Default &amp; Lightning Fast)</h3>
                <p>
                  <code>esbuild</code> is Dinou&apos;s default bundler. Because it is compiled to native Go machine code, it avoids JavaScript runtime overhead during compilation.
                </p>
                <ul>
                  <li><strong>Strengths:</strong> Near-instant cold start, sub-second incremental rebuilds, and low memory usage.</li>
                  <li><strong>React Compiler Behavior:</strong> In Dinou, esbuild skips the React Compiler in development for speed, but runs it during production builds.</li>
                  <li><strong>Best Used For:</strong> Daily local development and rapid feature building.</li>
                </ul>
              </div>

              <div id="rollup" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">2.2 Rollup (Optimized Tree-Shaking)</h3>
                <p>
                  <code>Rollup</code> excels at analyzing ES Module import/export graphs to eliminate dead code and produce minimal client payloads.
                </p>
                <ul>
                  <li><strong>Strengths:</strong> Cleanest chunk output, excellent scope hoisting, and strict standard ESM alignment.</li>
                  <li><strong>React Compiler Behavior:</strong> Runs the React Compiler during production builds.</li>
                  <li><strong>Best Used For:</strong> Production builds where bundle size and edge execution efficiency are paramount.</li>
                </ul>
              </div>

              <div id="webpack" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">2.3 Webpack (Enterprise &amp; React Compiler)</h3>
                <p>
                  <code>Webpack</code> provides deep compatibility with legacy npm packages, complex module interop, and full compiler transforms.
                </p>
                <ul>
                  <li><strong>Strengths:</strong> Broadest package compatibility, robust source-map generation, and granular chunk splitting.</li>
                  <li><strong>React Compiler Behavior:</strong> Runs the React Compiler in <strong>both development and production</strong>. If you want to test React Compiler memoization locally, use <code>dinou dev:webpack</code>.</li>
                  <li><strong>Best Used For:</strong> Enterprise projects with diverse npm dependencies or teams validating React Compiler in dev.</li>
                </ul>
              </div>
            </section>

            {/* Dual Bundle Engine Architecture */}
            <section id="dual-bundle-engine" className="mt-12">
              <h2>3. The Dual-Bundle Engine Architecture</h2>
              <p>
                React Server Components (RSC) require a specialized build architecture. For every build or development run, Dinou orchestrates two parallel pipelines:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose my-4 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Cpu className="h-4 w-4 text-amber-500" />
                  <span>Dual Pipeline Flow</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 text-xs">
                  <div className="p-3 rounded-lg border bg-muted/30 space-y-1.5">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Server className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span>1. Server Pipeline (RSC &amp; Node)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Compiles Server Components, Server Functions (<code>&quot;use server&quot;</code>), and Page Functions for Node.js, Cloudflare, Deno, or Bun runtimes.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-muted/30 space-y-1.5">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-emerald-500" />
                      <span>2. Client Pipeline (Browser &amp; CSS)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Extracts Client Components (<code>&quot;use client&quot;</code>), processes styles into <code>/styles.css</code>, fingerprints assets, and produces the React Client Manifest.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  The <strong>React Client Manifest</strong> connects the two: when the server encounters a <code>&lt;ClientComponent /&gt;</code>, it serializes a reference that the client browser hydrates seamlessly over Flight RPC.
                </p>
              </div>
            </section>

            {/* Complete Dinou Scripts Matrix */}
            <section id="cli-commands" className="mt-12">
              <h2>4. Complete Dinou Scripts Matrix</h2>
              <p>
                Dinou exposes a complete set of CLI commands. Every command supports specifying your bundler (<code>:esbuild</code>, <code>:rollup</code>, <code>:webpack</code>) or omitting it to use the default:
              </p>

              {/* Dev Scripts */}
              <div id="dev-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.1 Development Scripts (dinou dev)</h3>
                <p>
                  Starts the development server with Hot Module Replacement (HMR) and in-memory compilation:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Bundler Engine</th>
                        <th className="p-3.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou dev</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild (Default)</td>
                        <td className="p-3.5 text-muted-foreground">Fastest dev server startup with instant Fast Refresh.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou dev:esbuild</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild</td>
                        <td className="p-3.5 text-muted-foreground">Explicit esbuild development command.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou dev:rollup</td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">Rollup</td>
                        <td className="p-3.5 text-muted-foreground">Rollup-powered development server with ESM HMR.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou dev:webpack</td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Webpack</td>
                        <td className="p-3.5 text-muted-foreground">Webpack dev server with React Compiler active in dev.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4.2 Node Standard Build */}
              <div id="node-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.2 Node.js Standard Build &amp; Start (build:node)</h3>
                <p>
                  Compiles your Dinou application for a standard Node.js production server environment:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Action</th>
                        <th className="p-3.5">Bundler Engine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node</td>
                        <td className="p-3.5">Compile for Node.js production server</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild (Default)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:esbuild</td>
                        <td className="p-3.5">Compile for Node.js production server</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:rollup</td>
                        <td className="p-3.5">Compile for Node.js production server</td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">Rollup</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:webpack</td>
                        <td className="p-3.5">Compile for Node.js production server</td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Webpack</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou start:node</td>
                        <td className="p-3.5">Run built Node.js server (PORT=3000)</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">Default</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou start:node:esbuild</td>
                        <td className="p-3.5">Run built Node.js server (esbuild bundle)</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou start:node:rollup</td>
                        <td className="p-3.5">Run built Node.js server (Rollup bundle)</td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">Rollup</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou start:node:webpack</td>
                        <td className="p-3.5">Run built Node.js server (Webpack bundle)</td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Webpack</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Runtime Requirement:</strong> Requires Node.js (v18+) and your application&apos;s external <code>node_modules</code> dependencies on the host server.
                </p>
              </div>

              {/* 4.3 Node Compile Scripts */}
              <div id="node-compile-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.3 Node Standalone Binary Compilation (build:node:compile)</h3>
                <p>
                  <strong>How it works:</strong> Dinou uses <strong>Node.js</strong> to build your application, and then invokes <strong>Bun&apos;s native compiler</strong> (<code>bun build --compile</code>) to package the resulting server into a single, self-contained executable binary in <code>dist/</code>:
                </p>
                <div className="border rounded-xl p-4 bg-muted/20 not-prose text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                    <Binary className="h-4 w-4 text-blue-500" />
                    <span>The Node Orchestrator in a Single Binary</span>
                  </div>
                  <p>
                    Unlike Bun runtime targets (<code>build:bun:compile</code>) which execute through Bun&apos;s HTTP engine, <code>build:node:compile</code> compiles Dinou&apos;s <strong>Node.js server architecture</strong> (<code>http.createServer()</code>). This provides the best of both worlds:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Full Node API Compatibility:</strong> Direct support for <code>configureServer</code>, WebSockets (Socket.IO, <code>ws</code>), and native Node HTTP middlewares <code>(req, res, next)</code>.</li>
                    <li><strong>Zero Runtime Dependencies:</strong> Ships as a single binary executable (e.g. <code>dist/server</code> or <code>dist/server-win.exe</code>). The production container or bare-metal host does <strong>not</strong> need Node.js or <code>node_modules</code> installed.</li>
                  </ul>
                </div>

                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Target Architecture</th>
                        <th className="p-3.5">Output Binary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile</td>
                        <td className="p-3.5">Host Architecture (Default bundler)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile:linux</td>
                        <td className="p-3.5">Linux x64 (<code>--target=bun-linux-x64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-linux</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile:linux_arm</td>
                        <td className="p-3.5">Linux ARM64 / Graviton (<code>--target=bun-linux-arm64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-linux-arm</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile:mac</td>
                        <td className="p-3.5">macOS ARM64 / Apple Silicon (<code>--target=bun-darwin-arm64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-mac</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile:win</td>
                        <td className="p-3.5">Windows x64 (<code>--target=bun-windows-x64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-win.exe</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Every command accepts bundler suffixes for explicit control (e.g. <code>dinou build:node:compile:linux:rollup</code> or <code>dinou build:node:compile:webpack</code>).
                </p>
              </div>

              {/* 4.4 Pure Bun Runner */}
              <div id="node-pure-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.4 Pure Bun Engine for Node.js (build:node:pure)</h3>
                <p>
                  <strong>How it works:</strong> While standard <code>build:node</code> uses Node.js to execute the build, <code>build:node:pure</code> runs the build process using <strong>100% Bun</strong> to generate the Node.js production server.
                </p>
                <div className="border rounded-xl p-4 bg-muted/20 not-prose text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Why Use Pure Bun Mode?</span>
                  </div>
                  <p>
                    In modern CI/CD pipelines and Docker builder containers where Bun is used as the primary package manager and runtime, you do <strong>not</strong> need to install Node.js inside the build image just to compile your project. Bun executes the build scripts with significantly reduced cold-start time and memory consumption while still generating the standard Node.js orchestrator bundle at <code>.dinou/node/server.mjs</code>.
                  </p>
                </div>

                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Build Execution Runner</th>
                        <th className="p-3.5">Bundler Engine</th>
                        <th className="p-3.5">Output Artifact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure</td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">100% Bun</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild (Default)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">.dinou/node/server.mjs</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:esbuild</td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">100% Bun</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild</td>
                        <td className="p-3.5 font-mono text-muted-foreground">.dinou/node/server.mjs</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:rollup</td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">100% Bun</td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">Rollup</td>
                        <td className="p-3.5 font-mono text-muted-foreground">.dinou/node/server.mjs</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:webpack</td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">100% Bun</td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Webpack</td>
                        <td className="p-3.5 font-mono text-muted-foreground">.dinou/node/server.mjs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4.5 Pure Compile Scripts */}
              <div id="node-pure-compile-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.5 Pure Standalone Binary Compilation (build:node:pure:compile)</h3>
                <p>
                  <strong>The Ultimate Zero-Dependency Pipeline:</strong> Combines 100% Bun build execution with Bun binary compilation. Bun builds the Node orchestrator and Bun compiles it into a standalone executable binary.
                </p>
                <p className="text-xs text-muted-foreground">
                  With <code>build:node:pure:compile</code>, <strong>Node.js is completely eliminated from both the build phase and the runtime phase</strong>. Your build stage requires only Bun, and your runtime stage requires only the standalone binary.
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Cross-Compile Target</th>
                        <th className="p-3.5">Output Binary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:compile</td>
                        <td className="p-3.5">Host Architecture (100% Bun)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:compile:linux</td>
                        <td className="p-3.5">Linux x64 (<code>--target=bun-linux-x64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-linux</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:compile:linux_arm</td>
                        <td className="p-3.5">Linux ARM64 (<code>--target=bun-linux-arm64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-linux-arm</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:compile:mac</td>
                        <td className="p-3.5">macOS ARM64 (<code>--target=bun-darwin-arm64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-mac</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:pure:compile:win</td>
                        <td className="p-3.5">Windows x64 (<code>--target=bun-windows-x64</code>)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">dist/server-win.exe</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 mt-5">
                  <p className="font-semibold text-foreground text-sm">Production Multi-Stage Dockerfile Recipe:</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This production Dockerfile compiles Dinou using <strong>100% Bun</strong> in the builder stage (using a symlink so that Node shebangs in CLI binaries run through Bun without installing Node.js), and produces an ultra-lean Debian Slim runner containing only the standalone binary, the <code>.dinou</code> build folder, and necessary runtime assets (such as Prisma Client and SSL certificates):
                  </p>
                  <CodeBlock
                    language="dockerfile"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Compilation Stage (100% Bun, Zero Node.js required)
FROM oven/bun:latest AS builder
WORKDIR /app

# Symlink so that #!/usr/bin/env node (used by dinou CLI and cross-env) executes through bun
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

# Install dependencies respecting package-lock.json
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN bun install

# Copy application source, generate Prisma Client, and compile standalone binary
COPY . .
RUN bunx prisma generate
RUN bun run build:node:pure:compile

# 2. Minimal Production Runner Stage
FROM debian:bookworm-slim AS runner
WORKDIR /app

# CA certificates for outgoing HTTPS requests and OpenSSL for database engines
RUN apt-get update && apt-get install -y ca-certificates openssl && rm -rf /var/lib/apt/lists/*

# Copy the standalone executable binary and the .dinou runtime artifacts
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/.dinou ./.dinou

# Copy generated Prisma Client & query engine (if using Prisma ORM)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

RUN chmod +x ./server

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["./server"]`}
                  </CodeBlock>
                </div>
              </div>

              {/* 4.6 Comparison Matrix */}
              <div id="node-build-matrix" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.6 Node Build Architecture &amp; Execution Matrix</h3>
                <p>
                  Summary comparison of all Node.js build strategies supported by Dinou:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Command Family</th>
                        <th className="p-3">Build Script Runner</th>
                        <th className="p-3">Compilation Phase</th>
                        <th className="p-3">Output Artifact</th>
                        <th className="p-3">Production Requirements</th>
                        <th className="p-3">Ideal Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">build:node</td>
                        <td className="p-3">Node.js (<code>node</code>)</td>
                        <td className="p-3">None (ESM bundle)</td>
                        <td className="p-3 font-mono">.dinou/node/server.mjs</td>
                        <td className="p-3">Node.js runtime + <code>node_modules</code></td>
                        <td className="p-3">Standard Node.js hosting, PM2, Docker with full Node runtime.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">build:node:compile</td>
                        <td className="p-3">Node.js (<code>node</code>)</td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">Bun Compiler (<code>bun build --compile</code>)</td>
                        <td className="p-3 font-mono">dist/server</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Self-contained executable (Zero Node required)</td>
                        <td className="p-3">CI with Node.js needing single-file binary deployments without Node on production servers.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">build:node:pure</td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">Bun (<code>bun</code>)</td>
                        <td className="p-3">None (ESM bundle)</td>
                        <td className="p-3 font-mono">.dinou/node/server.mjs</td>
                        <td className="p-3">Node.js or Bun runtime</td>
                        <td className="p-3">Bun-only CI/CD environments that build for standard Node server targets.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">build:node:pure:compile</td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">Bun (<code>bun</code>)</td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">Bun Compiler (<code>bun build --compile</code>)</td>
                        <td className="p-3 font-mono">dist/server</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Self-contained executable (Zero Node &amp; Zero Bun on runner)</td>
                        <td className="p-3">Ultra-minimal Alpine/Distroless Docker images, bare-metal servers, embedded Linux/IoT.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cloudflare Scripts */}
              <div id="cloudflare-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.7 Cloudflare Workers &amp; Pages</h3>
                <p>
                  Compiles your application into an edge-native worker bundle:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Bundler</th>
                        <th className="p-3.5">Output Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:cloudflare</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild (Default)</td>
                        <td className="p-3.5 text-muted-foreground">.dinou/cloudflare/</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:cloudflare:esbuild</td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">esbuild</td>
                        <td className="p-3.5 text-muted-foreground">.dinou/cloudflare/</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:cloudflare:rollup</td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">Rollup</td>
                        <td className="p-3.5 text-muted-foreground">.dinou/cloudflare/</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:cloudflare:webpack</td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">Webpack</td>
                        <td className="p-3.5 text-muted-foreground">.dinou/cloudflare/</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deno Scripts */}
              <div id="deno-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.8 Deno &amp; Standalone Compiles</h3>
                <p>
                  Build for Deno KV runtime, or compile directly into a <strong>self-contained standalone executable binary</strong> with zero system dependencies:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:deno</td>
                        <td className="p-3.5 text-muted-foreground">Builds Deno bundle with KV storage support. (Also <code>:esbuild</code>, <code>:rollup</code>, <code>:webpack</code>)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou start:deno</td>
                        <td className="p-3.5 text-muted-foreground">Runs the compiled Deno server with <code>--unstable-kv</code>.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:deno:compile</td>
                        <td className="p-3.5 text-muted-foreground">Produces a standalone binary (<code>dist/deno-server</code>) for your current OS.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:deno:compile:linux</td>
                        <td className="p-3.5 text-muted-foreground">Cross-compiles x86_64 Linux standalone executable.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:deno:compile:linux_arm</td>
                        <td className="p-3.5 text-muted-foreground">Cross-compiles ARM64 Linux standalone executable (Raspberry Pi / Graviton).</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:deno:compile:mac</td>
                        <td className="p-3.5 text-muted-foreground">Cross-compiles macOS standalone binary (Apple Silicon / Intel).</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:deno:compile:win</td>
                        <td className="p-3.5 text-muted-foreground">Cross-compiles Windows standalone executable (<code>dist/deno-server-win.exe</code>).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Every compile command supports bundler suffixes (e.g. <code>dinou build:deno:compile:linux:rollup</code>).
                </p>
              </div>

              {/* Bun Scripts */}
              <div id="bun-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.9 Bun Runtime &amp; Standalone Compiles</h3>
                <p>
                  Target the ultra-fast Bun JavaScript runtime with standard or pure native modes:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Commands</th>
                        <th className="p-3.5">Build Script Runner</th>
                        <th className="p-3.5">Output &amp; Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">Standard Bun</td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun<br />
                          dinou start:bun
                        </td>
                        <td className="p-3.5 font-semibold text-muted-foreground">Node.js</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Uses Node.js to execute the build scripts, generating the Bun adapter bundle at <code>.dinou/bun/server.js</code>. Run with <code>dinou start:bun</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">Standard Bun Compile</td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:compile
                        </td>
                        <td className="p-3.5 font-semibold text-muted-foreground">Node.js + Bun Compiler</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Uses Node.js for the build phase, then invokes <code>bun build --compile</code> to produce a standalone executable binary in <code>dist/server</code>. Supports cross-compilation (<code>:linux</code>, <code>:linux_arm</code>, <code>:mac</code>, <code>:win</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">Pure Bun Mode</td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:pure
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">100% Bun</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Runs the entire build process using Bun without requiring Node.js in the build environment. Generates the Bun runtime bundle at <code>.dinou/bun/server.js</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">Pure Bun Compile</td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:pure:compile
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">100% Bun (Build &amp; Compile)</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          100% Bun pipeline from start to finish. Bun executes the build scripts and Bun compiles the standalone native binary in <code>dist/server</code>. Zero Node.js required at build-time or runtime. Supports cross-compilation (<code>:linux</code>, <code>:linux_arm</code>, <code>:mac</code>, <code>:win</code>).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Standard vs. Pure in Bun:</strong> Standard Bun commands (<code>build:bun</code>) require Node.js installed in your build machine to execute the build scripts. In contrast, Pure Bun commands (<code>build:bun:pure</code>) run the entire build process natively with Bun—ideal for Bun-only CI/CD environments or Docker images (<code>FROM oven/bun</code>) where Node.js is not present.
                </p>
              </div>

              {/* Static Export Scripts */}
              <div id="static-export-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4.10 Static HTML Export (dinou export-static)</h3>
                <p>
                  Crawls and generates a 100% static HTML/CSS/JS export in <code>out/</code> ready to host on Surge.sh, GitHub Pages, Cloudflare Pages, AWS S3, Netlify, or Apache/Nginx:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Static export with default bundler (esbuild)
dinou export-static

# Static export with specific bundlers
dinou export-static:esbuild
dinou export-static:rollup
dinou export-static:webpack`}
                </CodeBlock>
              </div>
            </section>

            {/* Recommended package.json Setup */}
            <section id="package-json-setup" className="mt-12">
              <h2>5. Recommended package.json Setup</h2>
              <p>
                Copy and paste the complete <code>&quot;scripts&quot;</code> block directly into your project&apos;s <code>package.json</code>:
              </p>
              <CodeBlock
                language="json"
                containerClassName="w-full overflow-hidden rounded-lg"
                className="max-h-80 !overflow-y-auto"
                customStyle={{ maxHeight: "360px", overflowY: "auto" }}
              >
{`"scripts": {
  "dev": "dinou dev",
  "build": "dinou build",
  "start": "dinou start",
  "dev:esbuild": "dinou dev:esbuild",
  "dev:rollup": "dinou dev:rollup",
  "dev:webpack": "dinou dev:webpack",
  "build:node": "dinou build:node",
  "build:node:esbuild": "dinou build:node:esbuild",
  "build:node:rollup": "dinou build:node:rollup",
  "build:node:webpack": "dinou build:node:webpack",
  "build:node:compile": "dinou build:node:compile",
  "build:node:compile:esbuild": "dinou build:node:compile:esbuild",
  "build:node:compile:rollup": "dinou build:node:compile:rollup",
  "build:node:compile:webpack": "dinou build:node:compile:webpack",
  "build:node:compile:linux": "dinou build:node:compile:linux",
  "build:node:compile:linux:esbuild": "dinou build:node:compile:linux:esbuild",
  "build:node:compile:linux:rollup": "dinou build:node:compile:linux:rollup",
  "build:node:compile:linux:webpack": "dinou build:node:compile:linux:webpack",
  "build:node:compile:linux_arm": "dinou build:node:compile:linux_arm",
  "build:node:compile:linux_arm:esbuild": "dinou build:node:compile:linux_arm:esbuild",
  "build:node:compile:linux_arm:rollup": "dinou build:node:compile:linux_arm:rollup",
  "build:node:compile:linux_arm:webpack": "dinou build:node:compile:linux_arm:webpack",
  "build:node:compile:mac": "dinou build:node:compile:mac",
  "build:node:compile:mac:esbuild": "dinou build:node:compile:mac:esbuild",
  "build:node:compile:mac:rollup": "dinou build:node:compile:mac:rollup",
  "build:node:compile:mac:webpack": "dinou build:node:compile:mac:webpack",
  "build:node:compile:win": "dinou build:node:compile:win",
  "build:node:compile:win:esbuild": "dinou build:node:compile:win:esbuild",
  "build:node:compile:win:rollup": "dinou build:node:compile:win:rollup",
  "build:node:compile:win:webpack": "dinou build:node:compile:win:webpack",
  "build:node:pure": "dinou build:node:pure",
  "build:node:pure:esbuild": "dinou build:node:pure:esbuild",
  "build:node:pure:rollup": "dinou build:node:pure:rollup",
  "build:node:pure:webpack": "dinou build:node:pure:webpack",
  "build:node:pure:compile": "dinou build:node:pure:compile",
  "build:node:pure:compile:esbuild": "dinou build:node:pure:compile:esbuild",
  "build:node:pure:compile:rollup": "dinou build:node:pure:compile:rollup",
  "build:node:pure:compile:webpack": "dinou build:node:pure:compile:webpack",
  "build:node:pure:compile:linux": "dinou build:node:pure:compile:linux",
  "build:node:pure:compile:linux:esbuild": "dinou build:node:pure:compile:linux:esbuild",
  "build:node:pure:compile:linux:rollup": "dinou build:node:pure:compile:linux:rollup",
  "build:node:pure:compile:linux:webpack": "dinou build:node:pure:compile:linux:webpack",
  "build:node:pure:compile:linux_arm": "dinou build:node:pure:compile:linux_arm",
  "build:node:pure:compile:linux_arm:esbuild": "dinou build:node:pure:compile:linux_arm:esbuild",
  "build:node:pure:compile:linux_arm:rollup": "dinou build:node:pure:compile:linux_arm:rollup",
  "build:node:pure:compile:linux_arm:webpack": "dinou build:node:pure:compile:linux_arm:webpack",
  "build:node:pure:compile:mac": "dinou build:node:pure:compile:mac",
  "build:node:pure:compile:mac:esbuild": "dinou build:node:pure:compile:mac:esbuild",
  "build:node:pure:compile:mac:rollup": "dinou build:node:pure:compile:mac:rollup",
  "build:node:pure:compile:mac:webpack": "dinou build:node:pure:compile:mac:webpack",
  "build:node:pure:compile:win": "dinou build:node:pure:compile:win",
  "build:node:pure:compile:win:esbuild": "dinou build:node:pure:compile:win:esbuild",
  "build:node:pure:compile:win:rollup": "dinou build:node:pure:compile:win:rollup",
  "build:node:pure:compile:win:webpack": "dinou build:node:pure:compile:win:webpack",
  "start:node": "dinou start:node",
  "start:node:esbuild": "dinou start:node:esbuild",
  "start:node:rollup": "dinou start:node:rollup",
  "start:node:webpack": "dinou start:node:webpack",
  "build:cloudflare": "dinou build:cloudflare",
  "build:cloudflare:esbuild": "dinou build:cloudflare:esbuild",
  "build:cloudflare:rollup": "dinou build:cloudflare:rollup",
  "build:cloudflare:webpack": "dinou build:cloudflare:webpack",
  "build:deno": "dinou build:deno",
  "build:deno:esbuild": "dinou build:deno:esbuild",
  "build:deno:rollup": "dinou build:deno:rollup",
  "build:deno:webpack": "dinou build:deno:webpack",
  "build:deno:compile": "dinou build:deno:compile",
  "build:deno:compile:esbuild": "dinou build:deno:compile:esbuild",
  "build:deno:compile:rollup": "dinou build:deno:compile:rollup",
  "build:deno:compile:webpack": "dinou build:deno:compile:webpack",
  "build:deno:compile:linux": "dinou build:deno:compile:linux",
  "build:deno:compile:linux:esbuild": "dinou build:deno:compile:linux:esbuild",
  "build:deno:compile:linux:rollup": "dinou build:deno:compile:linux:rollup",
  "build:deno:compile:linux:webpack": "dinou build:deno:compile:linux:webpack",
  "build:deno:compile:linux_arm": "dinou build:deno:compile:linux_arm",
  "build:deno:compile:linux_arm:esbuild": "dinou build:deno:compile:linux_arm:esbuild",
  "build:deno:compile:linux_arm:rollup": "dinou build:deno:compile:linux_arm:rollup",
  "build:deno:compile:linux_arm:webpack": "dinou build:deno:compile:linux_arm:webpack",
  "build:deno:compile:mac": "dinou build:deno:compile:mac",
  "build:deno:compile:mac:esbuild": "dinou build:deno:compile:mac:esbuild",
  "build:deno:compile:mac:rollup": "dinou build:deno:compile:mac:rollup",
  "build:deno:compile:mac:webpack": "dinou build:deno:compile:mac:webpack",
  "build:deno:compile:win": "dinou build:deno:compile:win",
  "build:deno:compile:win:esbuild": "dinou build:deno:compile:win:esbuild",
  "build:deno:compile:win:rollup": "dinou build:deno:compile:win:rollup",
  "build:deno:compile:win:webpack": "dinou build:deno:compile:win:webpack",
  "start:deno": "dinou start:deno",
  "build:bun": "dinou build:bun",
  "build:bun:esbuild": "dinou build:bun:esbuild",
  "build:bun:rollup": "dinou build:bun:rollup",
  "build:bun:webpack": "dinou build:bun:webpack",
  "build:bun:compile": "dinou build:bun:compile",
  "build:bun:compile:esbuild": "dinou build:bun:compile:esbuild",
  "build:bun:compile:rollup": "dinou build:bun:compile:rollup",
  "build:bun:compile:webpack": "dinou build:bun:compile:webpack",
  "build:bun:compile:linux": "dinou build:bun:compile:linux",
  "build:bun:compile:linux:esbuild": "dinou build:bun:compile:linux:esbuild",
  "build:bun:compile:linux:rollup": "dinou build:bun:compile:linux:rollup",
  "build:bun:compile:linux:webpack": "dinou build:bun:compile:linux:webpack",
  "build:bun:compile:linux_arm": "dinou build:bun:compile:linux_arm",
  "build:bun:compile:linux_arm:esbuild": "dinou build:bun:compile:linux_arm:esbuild",
  "build:bun:compile:linux_arm:rollup": "dinou build:bun:compile:linux_arm:rollup",
  "build:bun:compile:linux_arm:webpack": "dinou build:bun:compile:linux_arm:webpack",
  "build:bun:compile:mac": "dinou build:bun:compile:mac",
  "build:bun:compile:mac:esbuild": "dinou build:bun:compile:mac:esbuild",
  "build:bun:compile:mac:rollup": "dinou build:bun:compile:mac:rollup",
  "build:bun:compile:mac:webpack": "dinou build:bun:compile:mac:webpack",
  "build:bun:compile:win": "dinou build:bun:compile:win",
  "build:bun:compile:win:esbuild": "dinou build:bun:compile:win:esbuild",
  "build:bun:compile:win:rollup": "dinou build:bun:compile:win:rollup",
  "build:bun:compile:win:webpack": "dinou build:bun:compile:win:webpack",
  "build:bun:pure": "dinou build:bun:pure",
  "build:bun:pure:esbuild": "dinou build:bun:pure:esbuild",
  "build:bun:pure:rollup": "dinou build:bun:pure:rollup",
  "build:bun:pure:webpack": "dinou build:bun:pure:webpack",
  "build:bun:pure:compile": "dinou build:bun:pure:compile",
  "build:bun:pure:compile:esbuild": "dinou build:bun:pure:compile:esbuild",
  "build:bun:pure:compile:rollup": "dinou build:bun:pure:compile:rollup",
  "build:bun:pure:compile:webpack": "dinou build:bun:pure:compile:webpack",
  "build:bun:pure:compile:linux": "dinou build:bun:pure:compile:linux",
  "build:bun:pure:compile:linux:esbuild": "dinou build:bun:pure:compile:linux:esbuild",
  "build:bun:pure:compile:linux:rollup": "dinou build:bun:pure:compile:linux:rollup",
  "build:bun:pure:compile:linux:webpack": "dinou build:bun:pure:compile:linux:webpack",
  "build:bun:pure:compile:linux_arm": "dinou build:bun:pure:compile:linux_arm",
  "build:bun:pure:compile:linux_arm:esbuild": "dinou build:bun:pure:compile:linux_arm:esbuild",
  "build:bun:pure:compile:linux_arm:rollup": "dinou build:bun:pure:compile:linux_arm:rollup",
  "build:bun:pure:compile:linux_arm:webpack": "dinou build:bun:pure:compile:linux_arm:webpack",
  "build:bun:pure:compile:mac": "dinou build:bun:pure:compile:mac",
  "build:bun:pure:compile:mac:esbuild": "dinou build:bun:pure:compile:mac:esbuild",
  "build:bun:pure:compile:mac:rollup": "dinou build:bun:pure:compile:mac:rollup",
  "build:bun:pure:compile:mac:webpack": "dinou build:bun:pure:compile:mac:webpack",
  "build:bun:pure:compile:win": "dinou build:bun:pure:compile:win",
  "build:bun:pure:compile:win:esbuild": "dinou build:bun:pure:compile:win:esbuild",
  "build:bun:pure:compile:win:rollup": "dinou build:bun:pure:compile:win:rollup",
  "build:bun:pure:compile:win:webpack": "dinou build:bun:pure:compile:win:webpack",
  "start:bun": "dinou start:bun",
  "start:bun:esbuild": "dinou start:bun:esbuild",
  "start:bun:rollup": "dinou start:bun:rollup",
  "start:bun:webpack": "dinou start:bun:webpack",
  "export-static": "dinou export-static",
  "export-static:esbuild": "dinou export-static:esbuild",
  "export-static:rollup": "dinou export-static:rollup",
  "export-static:webpack": "dinou export-static:webpack",
  "eject": "dinou eject"
}`}
              </CodeBlock>
            </section>

            {/* Bundler Selection Guide */}
            <section id="bundler-selection-guide" className="mt-12">
              <h2>6. Which Bundler &amp; Target Should You Choose?</h2>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Local Development &rarr; esbuild</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Always use <code>dinou dev</code> (esbuild) for daily work. Its sub-millisecond compilation and memory caching provide the fastest iteration feedback.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Cloud className="h-4 w-4 text-rose-500" />
                    <span>Edge Deployments &rarr; Rollup</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For Cloudflare Workers or serverless edge targets where cold start and payload size matter most, <code>dinou build:cloudflare:rollup</code> yields optimal tree-shaking.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Boxes className="h-4 w-4 text-emerald-500" />
                    <span>Enterprise &amp; React Compiler &rarr; Webpack</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    If testing React Compiler memoization in dev or migrating enterprise code with non-standard CommonJS modules, <code>dinou dev:webpack</code> is your best choice.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Terminal className="h-4 w-4 text-emerald-500" />
                    <span>Node Binaries &amp; Minimal Containers &rarr; Bun Compile</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To deploy full Node.js apps (with WebSockets and middlewares) to bare-metal servers or minimal distroless Docker containers without Node installed, use <code>dinou build:node:pure:compile</code> or <code>dinou build:bun:compile</code> to produce a single binary file.
                  </p>
                </div>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
