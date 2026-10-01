import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Boxes,
  Globe,
  Terminal,
  Layers,
  ArrowRight,
  Cloud,
  Server,
  FileCode2,
  Zap,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Overview & Breaking Changes", level: 2 },
  { id: "updating-dependencies", title: "2. Updating Dependencies", level: 2 },
  { id: "dual-bundle-engine", title: "3. Dual-Bundle Engine & Build-Time Pre-Rendering", level: 2 },
  { id: "cli-scripts", title: "4. CLI Standardization & package.json Scripts", level: 2 },
  { id: "multi-runtime-binaries", title: "5. Multi-Runtime, Serverless & Static Deployments", level: 2 },
  { id: "strict-mode-private-folders", title: "6. StrictMode & Private Folders (_)", level: 2 },
  { id: "gitignore-update", title: "7. Updating .gitignore", level: 2 },
  { id: "verification", title: "8. Verification & Next Steps", level: 2 },
];

export default function MigrationV6ToV7Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
                Migration Guide
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                v6 &rarr; v7
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migration from v6 to v7
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Upgrade your applications to Dinou v7: React 19 primitives, Dual-Bundle in-memory compilation, Triple-Bundler CLI parity, Netlify and multi-runtime deployment, React StrictMode by default, and private folder routing.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Breaking Changes
              </h2>
              <p>
                Dinou v7 is a major release designed to maximize performance, developer ergonomics, and runtime portability.
              </p>

              <Alert className="not-prose my-6 border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <AlertTitle className="text-emerald-700 dark:text-emerald-300 font-semibold">
                  Zero Application Code Changes
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-1">
                  If your project already uses standard React components, nested layouts, and server functions (<code>&quot;use server&quot;</code>), your page and component code requires <strong>zero changes</strong>. All architectural improvements in v7 reside in the underlying build engine, CLI commands, and runtime adapters.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      In Dinou v6
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>• Used multi-process <code>concurrently</code> with <code>[0]</code> and <code>[1]</code> console streams.</p>
                    <p>• Wrote intermediate dev compilation files to disk inside <code>.dinou/</code>.</p>
                    <p>• Static page pre-rendering executed on server startup (<code>dinou start</code>), delaying boot.</p>
                    <p>• Scripts relied on Node.js-specific flags, effectively restricting deployments exclusively to Node.js.</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      In Dinou v7
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>• Single-process Dual-Bundle engine compiling RSC &amp; client in memory simultaneously.</p>
                    <p>• Zero temporary disk churn during development; fast HMR.</p>
                    <p>• Static pre-rendering moved entirely to build time (<code>dinou build</code>); instant server boot (<code>dinou start</code>).</p>
                    <p>• Decoupled from Node-specific flags: true &quot;deploy everywhere&quot; CLI (Node.js, Netlify Functions, Cloudflare, Deno, Bun &amp; binaries).</p>
                    <p>• Full CLI parity across esbuild, Rollup, and Webpack for all targets.</p>
                    <p>• React StrictMode on by default; private folders with <code>_</code> prefix.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 2: Updating Dependencies */}
            <section id="updating-dependencies" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Updating Dependencies
              </h2>
              <p>
                Dinou v7 requires a minimum of <strong>React 19.3.0</strong> (<code>react &gt;= 19.3.0</code> and <code>react-dom &gt;= 19.3.0</code>) as peer dependencies to support its dual-context RSC streaming engine, server functions, and client component hydration.
              </p>
              <p className="mt-2">
                Update React, ReactDOM, and Dinou in your project to their latest versions:
              </p>

              <CodeBlock language="bash" containerClassName="w-full rounded-lg not-prose my-4">
                {`npm install react@^19.3.0 react-dom@^19.3.0 dinou@latest
npm install -D @types/react@^19.3.0 @types/react-dom@^19.3.0`}
              </CodeBlock>

              <p className="text-sm text-muted-foreground mt-2">
                Dinou compiles TypeScript natively out of the box using high-performance SWC transforms, so installing <code>typescript</code> as a build dependency is completely optional.
              </p>
            </section>

            {/* Section 3: Dual-Bundle Engine & Build-Time Pre-Rendering */}
            <section id="dual-bundle-engine" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Dual-Bundle In-Memory Engine &amp; Build-Time Pre-Rendering
              </h2>
              <p>
                In Dinou v6, the development server ran client bundling and server bundling in separate subprocesses managed by <code>concurrently</code>, logging with <code>[0]</code> and <code>[1]</code> prefixes and writing temporary manifests to disk.
              </p>
              <p>
                In Dinou v7, both the development server and production build lifecycle have been fundamentally overhauled:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <span>Single-Process Dual Contexts (Development)</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                    <li><strong>Up-front In-Memory Compilation:</strong> Both client chunk builders and server RSC/SSR modules are compiled in memory on server start, completely eliminating disk I/O churn.</li>
                    <li><strong>Instant Route Navigation in Dev:</strong> Because all routes are pre-compiled up-front, clicking through pages during development is instantaneous—avoiding the on-demand compilation freezes typical of lazy-compiling frameworks.</li>
                    <li><strong>Fast Direct HMR:</strong> Client component updates refresh seamlessly in the browser via WebSocket without full page reloads.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Zap className="h-5 w-5 text-amber-500" />
                    <span>Build-Time Pre-Rendering (Instant Production Server Boot)</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In Dinou v6, static page generation and pre-rendering ran when starting the production server (<code>dinou start</code>). This delayed server boot and port binding while all routes were generated.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In Dinou v7, <strong>static generation and pre-rendering take place strictly at build time</strong> (<code>dinou build</code>). By the time you run <code>dinou start</code>, every pre-rendered HTML file and RSC payload is already baked and ready. The production server boots <strong>instantaneously</strong> with zero startup computation delay.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: CLI Standardization & package.json Scripts */}
            <section id="cli-scripts" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. CLI Standardization &amp; package.json Scripts
              </h2>
              <p>
                Dinou v7 introduces uniform CLI subcommands to select between <strong>esbuild</strong> (default), <strong>Rollup</strong>, and <strong>Webpack</strong> across all runtimes, native binaries, and export modes. Update your <code>package.json</code> scripts to leverage them:
              </p>

              <CodeBlock language="json" containerClassName="w-full rounded-lg not-prose my-4">
                {`{
  "scripts": {
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
  }
}`}
              </CodeBlock>

              <p className="text-sm text-muted-foreground mt-2">
                All three bundlers share 100% feature parity: RSC parsing, client directive splitting, server functions RPC, and CSS Modules.
              </p>
            </section>

            {/* Section 5: Multi-Runtime, Serverless & Static */}
            <section id="multi-runtime-binaries" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Multi-Runtime, Serverless &amp; Static Deployments
              </h2>
              <p>
                Dinou v7 supports traditional Node.js production servers, serverless functions (Netlify, Cloudflare), edge runtimes (Deno Deploy / Edge), standalone binary compilation (Deno, Bun), and static exports:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Server className="h-4 w-4 text-blue-500" />
                    <span>Node.js Production Server</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deploy standard Node.js applications to Docker containers, VPS (Ubuntu, Debian), AWS EC2, DigitalOcean, Railway, or Render with <code>dinou build:node</code> and <code>dinou start:node</code>. Full support for streaming SSR, Server Functions (<code>&quot;use server&quot;</code>), and background ISR.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Cloud className="h-4 w-4 text-teal-500" />
                    <span>Serverless Netlify Functions v2</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deploy serverless functions with official support for Netlify Functions v2 via <code>dinou/adapters/netlify.js</code>. Pre-configured with <code>preferStatic: true</code>, Netlify serves assets directly through its edge CDN, invoking serverless execution only for dynamic SSR and Server Functions.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Globe className="h-4 w-4 text-emerald-500" />
                    <span>Cloudflare Workers</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Build edge-ready serverless bundles with <code>dinou build:cloudflare</code>. Compatible with Cloudflare KV and standard Fetch request handlers.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Boxes className="h-4 w-4 text-cyan-500" />
                    <span>Deno (Deploy / Edge) &amp; Standalone Binaries</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Build for <strong>Deno Deploy</strong> and edge environments (<strong>Deno Edge</strong>) with <code>dinou build:deno</code> and <code>dinou start:deno</code>, featuring native Deno KV storage integration (<code>Deno.openKv()</code>). Additionally, compile single zero-dependency standalone executables for Linux, ARM, macOS, or Windows with <code>dinou build:deno:compile</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Bun &amp; Bun Compile</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leverage Bun&apos;s lightning-fast native HTTP server with <code>dinou build:bun</code> or compile to single-binary with <code>dinou build:bun:compile</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <FileCode2 className="h-4 w-4 text-amber-500" />
                    <span>Static Export (Surge, GitHub Pages, S3)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Generate pure static HTML and assets inside <code>out/</code> using <code>dinou export-static</code>. Perfect for zero-cost hosting on <strong>Surge</strong>, <strong>GitHub Pages</strong>, <strong>Cloudflare Pages</strong>, or <strong>AWS S3</strong>.
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2">
                    ⚠️ <strong>Caveat on Server Functions:</strong> In static exports without an active backend server process, Server Functions (<code>&quot;use server&quot;</code> RPC calls) will not function because there is no backend server listening to process mutations or database calls. For interactive server-side RPCs, deploy to a runtime server (Node, Netlify, Bun, Deno, or Cloudflare Workers).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: React StrictMode & Private Folders */}
            <section id="strict-mode-private-folders" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. React StrictMode &amp; Private Folders (<code>_</code>)
              </h2>
              <p>
                Dinou v7 introduces two developer experience upgrades to make applications cleaner and more resilient:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    React StrictMode by Default (Configurable via dinou/config)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    In development mode (<code>dinou dev</code>), client component roots are automatically wrapped in <code>&lt;React.StrictMode&gt;</code> to detect side-effects early and ensure DEV-PROD parity with React Compiler. You can use Dinou&apos;s typed <code>defineConfig</code> helper from <code>dinou/config</code> in a recommended <code>dinou.config.mjs</code> file to configure or toggle it off:
                  </p>
                  <CodeBlock language="javascript" containerClassName="w-full rounded-lg mt-3">
                    {`// dinou.config.mjs
import { defineConfig } from "dinou/config";

export default defineConfig({
  // Enabled (true) by default in dev mode
  reactStrictMode: false,
});`}
                  </CodeBlock>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    Private Folders with Underscore Prefix (<code>_</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Folders prefixed with an underscore (such as <code>src/_legacy/</code> or <code>src/_drafts/</code>) <strong>completely escape the router scan</strong>. Even if the folder or its nested subdirectories contain <code>page.tsx</code>, <code>page.jsx</code>, or <code>layout.tsx</code>, Dinou will never register them as routes or pre-render them during static builds. Any request to them results in a 404 (Not Found). This is the ideal tool for preserving legacy code, work-in-progress refactors, or archived references inside your repository without exposing them publicly.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Updating .gitignore */}
            <section id="gitignore-update" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Updating .gitignore
              </h2>
              <p>
                With the addition of multi-runtime compilation and static exports, update your <code>.gitignore</code> to ignore the new output directories:
              </p>

              <CodeBlock language="text" containerClassName="w-full rounded-lg not-prose my-4">
                {`node_modules
.dinou
out
dist
.wrangler
.env`}
              </CodeBlock>

              <ul className="text-xs text-muted-foreground mt-3 space-y-1.5 list-disc pl-4 not-prose">
                <li><code>out/</code> stores static HTML and assets exported via <code>dinou export-static</code>.</li>
                <li><code>dist/</code> holds standalone single-executable binaries (e.g., generated with <code>build:deno:compile</code> or <code>build:bun:compile</code>).</li>
                <li><code>.wrangler/</code> is created automatically by Cloudflare when running <code>npx wrangler dev</code> or local worker previews to store local Miniflare runtime cache and simulated KV state.</li>
              </ul>
            </section>

            {/* Section 8: Verification */}
            <section id="verification" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                8. Verification &amp; Next Steps
              </h2>
              <p>
                Start your development server to verify that your routes render with the new v7 engine:
              </p>

              <CodeBlock language="bash" containerClassName="w-full rounded-lg not-prose my-4">
                {`npm run dev`}
              </CodeBlock>

              <p className="mt-4">
                Your application should compile in memory and be available immediately at <code>http://localhost:3000</code>.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose mt-8">
                <Card className="hover:border-blue-500/40 transition-colors group">
                  <Link href="/docs/why-dinou" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      Why Dinou?
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Explore the core philosophy, architectural pillars, and complete feature catalog of Dinou v7.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-purple-500/40 transition-colors group">
                  <Link href="/docs/routing" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                        <Layers className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                      Routing &amp; Layouts
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Learn nested layouts, route groups, parallel slots, and private folder conventions.
                    </p>
                  </Link>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
