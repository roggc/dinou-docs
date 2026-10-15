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
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Bundlers in Dinou", level: 2 },
  { id: "the-three-bundlers", title: "esbuild, Rollup, & Webpack Compared", level: 2 },
  { id: "esbuild", title: "1. esbuild (Default & Lightning Fast)", level: 3 },
  { id: "rollup", title: "2. Rollup (Optimized Tree-Shaking)", level: 3 },
  { id: "webpack", title: "3. Webpack (Enterprise & React Compiler)", level: 3 },
  { id: "dual-bundle-engine", title: "The Dual-Bundle Engine Architecture", level: 2 },
  { id: "cli-commands", title: "Complete Dinou v7 Scripts Matrix", level: 2 },
  { id: "dev-scripts", title: "Development Scripts (dinou dev)", level: 3 },
  { id: "node-scripts", title: "Node.js Build & Start", level: 3 },
  { id: "cloudflare-scripts", title: "Cloudflare Workers & Pages", level: 3 },
  { id: "deno-scripts", title: "Deno & Standalone Compiles", level: 3 },
  { id: "bun-scripts", title: "Bun Runtime & Standalone Compiles", level: 3 },
  { id: "static-export-scripts", title: "Static HTML Export (dinou export-static)", level: 3 },
  { id: "package-json-setup", title: "Recommended package.json Setup", level: 2 },
  { id: "bundler-selection-guide", title: "Which Bundler & Target Should You Choose?", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Bundlers & Build Tooling | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Dinou features first-class multi-bundler architecture supporting esbuild, Rollup, and Webpack across Node.js, Cloudflare, Deno, Bun, and binaries."
      />
      <link rel="canonical" href="https://dinou.dev/docs/bundlers" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
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
              <h2>Bundlers in Dinou</h2>
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
              <h2>esbuild, Rollup, &amp; Webpack Compared</h2>

              <div id="esbuild" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">1. esbuild (Default &amp; Lightning Fast)</h3>
                <p>
                  <code>esbuild</code> is Dinou&apos;s default bundler. Because it is compiled to native Go machine code, it avoids JavaScript runtime overhead during compilation.
                </p>
                <ul>
                  <li><strong>Strengths:</strong> Near-instant cold start, sub-second incremental rebuilds, and low memory usage.</li>
                  <li><strong>React Compiler Behavior:</strong> In Dinou v7, esbuild skips the React Compiler in development for speed, but runs it during production builds.</li>
                  <li><strong>Best Used For:</strong> Daily local development and rapid feature building.</li>
                </ul>
              </div>

              <div id="rollup" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">2. Rollup (Optimized Tree-Shaking)</h3>
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
                <h3 className="text-lg font-bold">3. Webpack (Enterprise &amp; React Compiler)</h3>
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
              <h2>The Dual-Bundle Engine Architecture</h2>
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

            {/* Complete Dinou v7 Scripts Matrix */}
            <section id="cli-commands" className="mt-12">
              <h2>Complete Dinou v7 Scripts Matrix</h2>
              <p>
                Dinou v7 exposes a complete set of CLI commands. Every command supports specifying your bundler (<code>:esbuild</code>, <code>:rollup</code>, <code>:webpack</code>) or omitting it to use the default:
              </p>

              {/* Dev Scripts */}
              <div id="dev-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Development Scripts (dinou dev)</h3>
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

              {/* Node Scripts */}
              <div id="node-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Node.js Build &amp; Start (Node Target)</h3>
                <p>
                  Compiles and runs the standalone Node.js server from <code>.dinou/node/server.mjs</code>:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Command</th>
                        <th className="p-3.5">Action</th>
                        <th className="p-3.5">Bundler</th>
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
              </div>

              {/* Cloudflare Scripts */}
              <div id="cloudflare-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Cloudflare Workers &amp; Pages</h3>
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
                <h3 className="text-lg font-bold">Deno &amp; Standalone Compiles</h3>
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
                <h3 className="text-lg font-bold">Bun Runtime &amp; Standalone Compiles</h3>
                <p>
                  Target the ultra-fast Bun JavaScript runtime with standard or pure native modes:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Commands</th>
                        <th className="p-3.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-semibold">Standard Bun</td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun<br />
                          dinou start:bun
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Builds and runs your app with Bun runtime. Supports <code>:esbuild</code>, <code>:rollup</code>, <code>:webpack</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold">Bun Standalone Binary</td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:compile
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Compiles your app into a standalone binary using <code>bun build --compile</code>. Supports cross-compilation (<code>:linux</code>, <code>:linux_arm</code>, <code>:mac</code>, <code>:win</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold">Pure Bun Mode</td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:pure<br />
                          dinou build:bun:pure:compile
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Uses Bun&apos;s native pure bundler pipeline and compiles single-file binaries across Linux, Mac, and Windows.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Static Export Scripts */}
              <div id="static-export-scripts" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Static HTML Export (dinou export-static)</h3>
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
              <h2>Recommended package.json Setup</h2>
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
              <h2>Which Bundler &amp; Target Should You Choose?</h2>

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
                    <span>Self-Contained Shipments &rarr; Deno / Bun Compile</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To deploy to bare-metal servers or minimal Docker containers without installing Node.js, run <code>dinou build:deno:compile</code> or <code>dinou build:bun:compile</code> to produce a single binary file.
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
