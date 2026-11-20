import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Boxes,
  Zap,
  Server,
  Cpu,
  Layers,
  Terminal,
  Cloud,
  Globe,
  Binary,
  Sliders,
  Lock,
  FolderTree,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Overview: Bundlers in Dinou", level: 2 },
  { id: "the-three-bundlers", title: "2. esbuild, Rollup, & Webpack Compared", level: 2 },
  { id: "esbuild", title: "2.1 esbuild (Default & Lightning Fast)", level: 3 },
  { id: "rollup", title: "2.2 Rollup (Optimized Tree-Shaking)", level: 3 },
  { id: "webpack", title: "2.3 Webpack (Enterprise Ecosystem & Interop)", level: 3 },
  { id: "dual-bundle-engine", title: "3. Dual-Bundle Engine & .dinou/ Topology", level: 2 },
  { id: "dinou-directory-topology", title: "3.1 Build Output Topology (.dinou/)", level: 3 },
  { id: "three-pass-aot", title: "3.2 Three-Pass AOT Runtime Packaging", level: 3 },
  { id: "dual-mode-vendoring", title: "4. Dual-Mode Vendoring (Vendorized vs. -u)", level: 2 },
  { id: "vendorized-default", title: "4.1 Vendorized Mode (Default)", level: 3 },
  { id: "unvendorized-mode", title: "4.2 Unvendorized Mode (-u / --unvendorized)", level: 3 },
  { id: "vendor-catalog", title: "4.3 Compiled Vendors vs. External Exceptions", level: 3 },
  { id: "cli-commands", title: "5. Complete Dinou Scripts Matrix", level: 2 },
  { id: "dev-scripts", title: "5.1 Development Scripts (dinou dev)", level: 3 },
  { id: "node-scripts", title: "5.2 Node.js Standard Build & Start (build:node)", level: 3 },
  { id: "node-compile-scripts", title: "5.3 Node Standalone Binary Compilation (build:node:compile)", level: 3 },
  { id: "node-pure-scripts", title: "5.4 Pure Bun Engine for Node.js (build:node:pure)", level: 3 },
  { id: "node-pure-compile-scripts", title: "5.5 Pure Standalone Binary Compilation (build:node:pure:compile)", level: 3 },
  { id: "node-build-matrix", title: "5.6 Node Build Architecture & Execution Matrix", level: 3 },
  { id: "cloudflare-scripts", title: "5.7 Cloudflare Workers & Pages", level: 3 },
  { id: "deno-scripts", title: "5.8 Deno & Standalone Compiles", level: 3 },
  { id: "bun-scripts", title: "5.9 Bun Runtime & Standalone Compiles", level: 3 },
  { id: "netlify-scripts", title: "5.10 Netlify Functions v2 (build:netlify)", level: 3 },
  { id: "static-export-scripts", title: "5.11 Static HTML Export & Utilities", level: 3 },
  { id: "package-json-setup", title: "6. Recommended package.json Setup", level: 2 },
  { id: "bundler-selection-guide", title: "7. Which Bundler & Target Should You Choose?", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Bundlers &amp; Build Tooling | Dinou Docs</title>
      <meta
        name="description"
        content="Dinou features first-class multi-bundler architecture supporting esbuild, Rollup, and Webpack across Node.js, Cloudflare Workers, Deno, Bun, Netlify Functions v2, and standalone compiled binaries."
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
                Dinou v10 Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bundlers &amp; Build Tooling
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features a first-class multi-bundler architecture supporting{" "}
              <strong>esbuild</strong>, <strong>Rollup</strong>, and{" "}
              <strong>Webpack</strong> across Node.js, Cloudflare Workers, Deno,
              Bun, Netlify Functions v2, static exports, and standalone compiled
              binaries.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>1. Overview: Bundlers in Dinou</h2>
              <p>
                Unlike rigid meta-frameworks that lock you into a single
                proprietary bundler, Dinou separates its React 19 RSC/SSR
                runtime from client compilation. Out of the box, Dinou provides
                feature-complete, zero-config pipelines for three JavaScript
                bundlers with full parity across{" "}
                <Link href="/docs/styles">CSS &amp; Tailwind v4</Link>,{" "}
                <Link href="/docs/assets">static media fingerprinting</Link>,{" "}
                <Link href="/docs/alias">tsconfig path aliases</Link>,{" "}
                <Link href="/docs/env-vars">environment variables</Link>, and
                the <Link href="/docs/compiler">React Compiler</Link>:
              </p>
              <ul>
                <li>
                  <strong>esbuild (Default):</strong> Written in Go. Delivers
                  near-instant startup, sub-second incremental HMR in local
                  development, and native ESM chunks with browser Import Maps.
                </li>
                <li>
                  <strong>Rollup:</strong> The industry benchmark for clean ES
                  Module output, scope hoisting, and surgical tree-shaking.
                </li>
                <li>
                  <strong>Webpack:</strong> Battle-tested enterprise bundler
                  with broad legacy CommonJS/ESM package compatibility and
                  dedicated vendor chunk splitting.
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
                    10&times;&ndash;100&times; faster cold start. Default for{" "}
                    <code>dinou dev</code> and <code>dinou build</code>.
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
                    Maximum dead-code elimination and ultra-clean native ESM
                    chunks for lean client payloads.
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
                    Universal npm CJS/ESM interop, dedicated{" "}
                    <code>vendor-react</code> chunking, and enterprise tooling.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. The Three Bundlers Compared */}
            <section id="the-three-bundlers" className="mt-12 scroll-mt-20">
              <h2>2. esbuild, Rollup, &amp; Webpack Compared</h2>
              <p>
                All three bundlers follow Dinou&apos;s unified two-tier
                transpilation strategy: fast native Go/Rust transforms during{" "}
                <code>dinou dev</code> for instant Fast Refresh, and{" "}
                <code>babel-plugin-react-compiler</code> across your entire
                client component subgraph during production builds (configurable
                via <code>reactCompiler?: boolean</code> in{" "}
                <code>dinou.config.ts</code>; see{" "}
                <Link href="/docs/compiler">React Compiler &amp; StrictMode</Link>
                ).
              </p>

              <div id="esbuild" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  2.1 esbuild (Default &amp; Lightning Fast)
                </h3>
                <p>
                  <code>esbuild</code> is Dinou&apos;s default bundler. Compiled
                  to native Go machine code, it pairs an SWC disk mirror in
                  development with multi-core ESM bundling in production.
                </p>
                <ul>
                  <li>
                    <strong>Flight Wire Protocol:</strong> Native browser ESM
                    with an inline HTML{" "}
                    <code>&lt;script type=&quot;importmap&quot;&gt;</code> and{" "}
                    <code>@roggc/react-server-dom-esm</code>.
                  </li>
                  <li>
                    <strong>Transpilation &amp; React Compiler:</strong> Uses
                    SWC + native esbuild in <code>dinou dev</code>; runs{" "}
                    <code>babel-plugin-react-compiler</code> across all client
                    components and custom hooks in <code>dinou build</code>.
                  </li>
                  <li>
                    <strong>Best Used For:</strong> Daily local development and
                    fast CI/CD production builds.
                  </li>
                </ul>
              </div>

              <div id="rollup" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  2.2 Rollup (Optimized Tree-Shaking)
                </h3>
                <p>
                  <code>Rollup</code> performs deep static ES Module graph
                  analysis and scope hoisting to produce minimal browser chunks.
                </p>
                <ul>
                  <li>
                    <strong>Flight Wire Protocol:</strong> Native browser ESM
                    with HTML{" "}
                    <code>&lt;script type=&quot;importmap&quot;&gt;</code> and{" "}
                    <code>@roggc/react-server-dom-esm</code>, preserving strict
                    entry signatures.
                  </li>
                  <li>
                    <strong>Transpilation &amp; React Compiler:</strong> Uses
                    Dinou&apos;s in-memory <code>rollup-plugin-swc</code> cache
                    in <code>dinou dev:rollup</code>; runs Babel + React
                    Compiler in production builds.
                  </li>
                  <li>
                    <strong>Best Used For:</strong> Production and edge builds
                    where minimal client bundle size and tree-shaking matter
                    most.
                  </li>
                </ul>
              </div>

              <div id="webpack" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  2.3 Webpack (Enterprise Ecosystem &amp; Interop)
                </h3>
                <p>
                  <code>Webpack</code> provides deep compatibility with complex
                  third-party CommonJS/ESM packages, automatic{" "}
                  <code>runtimeChunk: &quot;single&quot;</code> module sharing,
                  and a dedicated <code>vendor-react</code> cache group.
                </p>
                <ul>
                  <li>
                    <strong>Flight Wire Protocol:</strong> Webpack chunk runtime
                    paired with <code>react-server-dom-webpack</code>.
                  </li>
                  <li>
                    <strong>Transpilation &amp; React Compiler:</strong> Uses
                    Dinou&apos;s custom Rust-backed <code>swc-loader</code> in{" "}
                    <code>dinou dev:webpack</code> for fast rebuilds, and
                    switches to <code>babel-loader</code> + React Compiler in
                    production builds.
                  </li>
                  <li>
                    <strong>Best Used For:</strong> Enterprise applications
                    integrating legacy CommonJS libraries or non-standard npm
                    packages.
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Dual Bundle Engine Architecture */}
            <section id="dual-bundle-engine" className="mt-12 scroll-mt-20">
              <h2>3. Dual-Bundle Engine &amp; <code>.dinou/</code> Topology</h2>
              <p>
                React 19 Server Components require strict module isolation
                between the <code>&quot;react-server&quot;</code> graph and the{" "}
                <code>&quot;browser&quot;</code> SSR/client graph. Dinou
                achieves this cleanly in two coordinated stages:
              </p>

              <div
                id="dinou-directory-topology"
                className="mt-6 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  3.1 Build Output Topology (<code>.dinou/</code>)
                </h3>
                <p>
                  Regardless of whether you choose <code>esbuild</code>,{" "}
                  <code>rollup</code>, or <code>webpack</code>, Dinou writes
                  deterministic artifacts into physically isolated directories
                  inside <code>.dinou/</code>:
                </p>
                <div className="border rounded-xl p-5 bg-card not-prose my-4 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <FolderTree className="h-4 w-4 text-blue-500" />
                    <span>Physical Directory Isolation</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="p-3 rounded-lg border bg-muted/30 space-y-1">
                      <div className="font-mono font-semibold text-foreground">
                        .dinou/dist1/
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Internal Build &amp; Server Artifacts</strong>{" "}
                        (never served publicly): <code>manifest.json</code>,{" "}
                        <code>react-client-manifest.json</code>,{" "}
                        <code>server-functions-manifest.json</code>, and{" "}
                        <code>server/&#123;handler.js,netlify.js&#125;</code>.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border bg-muted/30 space-y-1">
                      <div className="font-mono font-semibold text-foreground">
                        .dinou/dist2/
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Pre-Rendered SSG / ISR / PPR Cache</strong>:{" "}
                        <code>index.html</code>, <code>shell.html</code>,
                        segmented RSC payloads (<code>page.rsc</code>,{" "}
                        <code>layout.rsc</code>, <code>shell.rsc</code>),{" "}
                        <code>slots/*</code>, and{" "}
                        <code>status-manifest.json</code>.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border bg-muted/30 space-y-1">
                      <div className="font-mono font-semibold text-foreground">
                        .dinou/dist3/
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Pure Public Static Webroot</strong>: hashed
                        client JS chunks, compiled <code>styles.css</code>,
                        fingerprinted <code>assets/[name]-[8hex].[ext]</code>,
                        and copied <Link href="/docs/public">public/</Link>{" "}
                        files.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border bg-muted/30 space-y-1">
                      <div className="font-mono font-semibold text-foreground">
                        .dinou/node-dev/
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>In-Memory Dev Workspace</strong>:{" "}
                        <code>dinou dev</code> serves client chunks and
                        manifests 100% from memory by default. Set{" "}
                        <code>DINOU_WRITE_TO_DISK=true</code> to inspect{" "}
                        <code>.dinou/public/</code> and{" "}
                        <code>.dinou/node-dev/</code> on disk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="three-pass-aot" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  3.2 Three-Pass AOT Runtime Packaging
                </h3>
                <p>
                  After the selected client bundler finishes populating{" "}
                  <code>.dinou/dist1/</code>, <code>.dinou/dist2/</code>, and{" "}
                  <code>.dinou/dist3/</code>, Dinou&apos;s Dual-Bundle Engine
                  compiles your server runtime in three AOT passes within a
                  single process—eliminating React singleton collisions across
                  Node.js, Cloudflare Workers, Bun, Deno, and Netlify:
                </p>

                <div className="border rounded-xl p-5 bg-card not-prose my-4 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Cpu className="h-4 w-4 text-amber-500" />
                    <span>Dual-Bundle Server Compilation Flow</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3 text-xs">
                    <div className="p-3 rounded-lg border bg-muted/30 space-y-1.5">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Server className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Pass A: RSC Engine</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Bundles Server Components,{" "}
                        <code>&quot;use server&quot;</code> actions,{" "}
                        <code>dinou.config.*</code>, and{" "}
                        <code>setupFiles</code> under{" "}
                        <code>&quot;react-server&quot;</code> export conditions,
                        replacing <code>&quot;use client&quot;</code> imports
                        with Flight client module proxies.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border bg-muted/30 space-y-1.5">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Pass B: SSR Engine</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Bundles Client Components and{" "}
                        <code>ssr-client-manifest</code> under{" "}
                        <code>&quot;browser&quot;</code> export conditions to
                        stream initial HTML via{" "}
                        <code>renderToReadableStream</code> while enforcing
                        public-only <code>process.env</code> isolation.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border bg-muted/30 space-y-1.5">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-blue-500" />
                        <span>Pass C: Orchestrator</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Emits the target server entrypoint:{" "}
                        <code>.dinou/node/server.mjs</code>,{" "}
                        <code>.dinou/cloudflare/worker.js</code>,{" "}
                        <code>.dinou/bun/server.js</code>,{" "}
                        <code>.dinou/deno/main.js</code>, or{" "}
                        <code>.dinou/netlify/functions/ssr.mjs</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Dual-Mode Additive Vendoring */}
            <section id="dual-mode-vendoring" className="mt-12 scroll-mt-20">
              <h2>
                4. Dual-Mode Additive Vendoring (Vendorized vs. <code>-u</code>)
              </h2>
              <p>
                Dinou ships with a{" "}
                <strong>Dual-Mode Additive Vendoring System</strong> powered by
                native Node.js and Bun Subpath Imports (<code>#...</code>).
                Internal compiler, AST, styling, and file-discovery dependencies
                are pre-compiled into standalone ESM bundles inside{" "}
                <code>dinou/compiled/</code> while also remaining declared in
                standard <code>node_modules</code>.
              </p>

              <div
                id="vendorized-default"
                className="mt-6 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  4.1 Vendorized Mode (Default — Instant Cold Starts)
                </h3>
                <p>
                  Whenever you run <code>npm run dev</code>,{" "}
                  <code>npm run build</code>, or <code>npm start</code> without
                  extra flags, Dinou executes in{" "}
                  <strong>Vendorized Mode</strong>:
                </p>
                <ul>
                  <li>
                    <strong>Zero File-System Bottlenecks:</strong> Avoids
                    traversing and parsing thousands of small CommonJS/ESM files
                    inside deep <code>node_modules</code> trees during startup.
                  </li>
                  <li>
                    <strong>Strict Package Manager Isolation:</strong> Works
                    seamlessly under strict non-hoisted <code>pnpm</code>{" "}
                    workspaces and{" "}
                    <Link href="/docs/eject">ejected projects</Link> without
                    requiring users to hoist Babel, PostCSS, or Webpack loaders.
                  </li>
                </ul>
              </div>

              <div
                id="unvendorized-mode"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  4.2 Unvendorized Mode (<code>-u</code> /{" "}
                  <code>--unvendorized</code>)
                </h3>
                <p>
                  Because Dinou&apos;s vendoring is strictly{" "}
                  <strong>additive</strong>, all 31 vendorized packages also
                  reside in <code>node_modules</code>. If you want to debug an
                  upstream package, test a local patch, or use an upgraded
                  dependency directly from <code>node_modules</code> without
                  rebuilding <code>dinou/compiled/</code>, pass{" "}
                  <strong>
                    <code>-u</code>
                  </strong>{" "}
                  (or <code>--unvendorized</code>), or set{" "}
                  <code>DINOU_UNVENDORIZED=true</code> (via CLI or{" "}
                  <code>.env.local</code>):
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="npm-flag"
                    tabs={[
                      {
                        id: "npm-flag",
                        label: "npm run (-- -u)",
                        language: "bash",
                        code: `# Start dev server resolving directly from node_modules
npm run dev -- -u

# Run a specific bundler in unvendorized mode
npm run dev:webpack -- -u

# Build or start production server in unvendorized mode
npm run build -- -u
npm start -- -u`,
                      },
                      {
                        id: "direct-cli",
                        label: "npx dinou (-u)",
                        language: "bash",
                        code: `# Pass -u or --unvendorized directly to any Dinou CLI command
npx dinou dev -u
npx dinou build:node:rollup --unvendorized
npx dinou build:bun:pure:webpack -u
npx dinou typegen -u`,
                      },
                      {
                        id: "env-var",
                        label: "Environment Variable / .env",
                        language: "bash",
                        code: `# Opt out of pre-compiled vendors in CI / Docker
DINOU_UNVENDORIZED=true npm run build

# Windows PowerShell:
$env:DINOU_UNVENDORIZED="true"; npm run dev

# Or persist locally in .env.local:
# DINOU_UNVENDORIZED=true`,
                      },
                    ]}
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground space-y-1.5 not-prose">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-blue-500" />
                    <span>
                      How <code>-u</code> Works Across Node.js &amp; Bun
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    When <code>-u</code>, <code>--unvendorized</code>, or{" "}
                    <code>DINOU_UNVENDORIZED=true</code> is detected, Dinou
                    activates conditional subpath resolution (
                    <code>--conditions=unvendorized</code> in both{" "}
                    <code>execArgv</code> and <code>NODE_OPTIONS</code>),
                    routing internal <code>#...</code> imports directly to{" "}
                    <code>node_modules</code> across Node.js and Pure Bun
                    executions alike.
                  </p>
                </div>
              </div>

              <div id="vendor-catalog" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  4.3 Compiled Vendors vs. External Exceptions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
                  <Card className="border-blue-500/20 bg-blue-50/10 dark:bg-blue-950/10">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                        <Boxes className="h-4 w-4" />
                        <span>31 Pre-Compiled Packages (dinou/compiled/)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-1.5">
                      <p>Bundled into standalone ESM for instant cold starts:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          <strong>Babel &amp; React Compiler (9):</strong>{" "}
                          <code>@babel/core</code>, <code>@babel/parser</code>,{" "}
                          <code>@babel/traverse</code>,{" "}
                          <code>@babel/generator</code>,{" "}
                          <code>@babel/types</code>,{" "}
                          <code>@babel/preset-react</code>,{" "}
                          <code>@babel/preset-typescript</code>,{" "}
                          <code>@babel/plugin-syntax-import-meta</code>,{" "}
                          <code>babel-plugin-react-compiler</code>
                        </li>
                        <li>
                          <strong>PostCSS &amp; Styling (6):</strong>{" "}
                          <code>postcss</code>, <code>postcss-import</code>,{" "}
                          <code>postcss-modules</code>,{" "}
                          <code>autoprefixer</code>, <code>generic-names</code>,{" "}
                          <code>@tailwindcss/postcss</code>
                        </li>
                        <li>
                          <strong>Rollup &amp; Webpack Plugins (11):</strong>{" "}
                          <code>@rollup/plugin-*</code>,{" "}
                          <code>rollup-plugin-delete</code>,{" "}
                          <code>rollup-plugin-postcss</code>,{" "}
                          <code>babel-loader</code>, <code>css-loader</code>,{" "}
                          <code>mini-css-extract-plugin</code>,{" "}
                          <code>copy-webpack-plugin</code>
                        </li>
                        <li>
                          <strong>CLI &amp; Core Utilities (5):</strong>{" "}
                          <code>commander</code>, <code>chokidar</code>,{" "}
                          <code>fast-glob</code>, <code>resolve</code>,{" "}
                          <code>ws</code>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/20 bg-amber-50/10 dark:bg-amber-950/10">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 text-sm">
                        <Lock className="h-4 w-4" />
                        <span>External Exceptions (Always in node_modules)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-1.5">
                      <p>
                        Kept external to preserve native binaries and
                        singletons:
                      </p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          <strong>Native Platform Binaries:</strong>{" "}
                          <code>esbuild</code> (Go binary),{" "}
                          <code>@swc/core</code>,{" "}
                          <code>@tailwindcss/oxide</code>, and{" "}
                          <code>lightningcss</code> (native Rust{" "}
                          <code>.node</code> bindings)
                        </li>
                        <li>
                          <strong>React Singletons:</strong> <code>react</code>,{" "}
                          <code>react-dom</code>,{" "}
                          <code>@roggc/react-server-dom-esm</code>, and{" "}
                          <code>react-server-dom-webpack</code>
                        </li>
                        <li>
                          <strong>Core Bundler Engines:</strong>{" "}
                          <code>webpack</code>, <code>webpack-cli</code>,{" "}
                          <code>webpack-dev-server</code>, <code>rollup</code>,
                          and <code>postcss-loader</code>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* 5. Complete Dinou Scripts Matrix */}
            <section id="cli-commands" className="mt-12 scroll-mt-20">
              <h2>5. Complete Dinou Scripts Matrix</h2>
              <p>
                Every Dinou CLI command supports selecting your bundler (
                <code>:esbuild</code>, <code>:rollup</code>,{" "}
                <code>:webpack</code>) or omitting the suffix to use{" "}
                <code>esbuild</code> by default:
              </p>

              {/* 5.1 Dev Scripts */}
              <div id="dev-scripts" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  5.1 Development Scripts (dinou dev)
                </h3>
                <p>
                  Starts the incremental Dual-Bundle development server with Hot
                  Module Replacement (HMR) and in-memory VFS compilation:
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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou dev
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild (Default)
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Fastest cold start with SWC + esbuild Fast Refresh.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou dev:esbuild
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Explicit esbuild development command.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou dev:rollup
                        </td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">
                          Rollup
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Rollup watcher with SWC transforms and native ESM HMR.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou dev:webpack
                        </td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                          Webpack
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Webpack Dev Server with SWC transpilation and maximum
                          npm package compatibility.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5.2 Node Standard Build */}
              <div id="node-scripts" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  5.2 Node.js Standard Build &amp; Start (build:node)
                </h3>
                <p>
                  Compiles your Dinou application into{" "}
                  <code>.dinou/node/server.mjs</code> (plus{" "}
                  <code>.dinou/netlify/functions/ssr.mjs</code> and{" "}
                  <code>.dinou/dist1/server/</code> handlers):
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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build
                        </td>
                        <td className="p-3.5">
                          Default alias for <code>dinou build:node</code>
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild (Default)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node
                        </td>
                        <td className="p-3.5">
                          Compile for Node.js production server
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild (Default)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:esbuild
                        </td>
                        <td className="p-3.5">
                          Compile for Node.js production server
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:rollup
                        </td>
                        <td className="p-3.5">
                          Compile for Node.js production server
                        </td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">
                          Rollup
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:webpack
                        </td>
                        <td className="p-3.5">
                          Compile for Node.js production server
                        </td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                          Webpack
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou start / dinou start:node
                        </td>
                        <td className="p-3.5">
                          Run built Node.js server (<code>PORT=3000</code>)
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          Default
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou start:node:esbuild
                        </td>
                        <td className="p-3.5">
                          Run built Node.js server (esbuild bundle)
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou start:node:rollup
                        </td>
                        <td className="p-3.5">
                          Run built Node.js server (Rollup bundle)
                        </td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">
                          Rollup
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou start:node:webpack
                        </td>
                        <td className="p-3.5">
                          Run built Node.js server (Webpack bundle)
                        </td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                          Webpack
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Runtime Tip:</strong>{" "}
                  <code>.dinou/node/server.mjs</code> (paired with{" "}
                  <code>rsc-engine.mjs</code> and <code>ssr-engine.mjs</code>)
                  is pre-bundled and can also be started directly via{" "}
                  <code>node .dinou/node/server.mjs</code> on Node.js v20.6+
                  (keep <code>node_modules</code> if you invoke{" "}
                  <code>dinou start</code> or use native binary addons like
                  Prisma).
                </p>
              </div>

              {/* 5.3 Node Compile Scripts */}
              <div
                id="node-compile-scripts"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  5.3 Node Standalone Binary Compilation (build:node:compile)
                </h3>
                <p>
                  <strong>How it works:</strong> Dinou uses{" "}
                  <strong>Node.js</strong> to build your application, and then
                  invokes <strong>Bun&apos;s native compiler</strong> (
                  <code>bun build --compile</code>) to package{" "}
                  <code>.dinou/node/server.mjs</code> into a single executable
                  binary in <code>dist/</code>:
                </p>
                <div className="border rounded-xl p-4 bg-muted/20 not-prose text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                    <Binary className="h-4 w-4 text-blue-500" />
                    <span>The Node Orchestrator in a Single Binary</span>
                  </div>
                  <p>
                    Unlike Bun runtime targets (<code>build:bun:compile</code>)
                    which serve through <code>Bun.serve</code>,{" "}
                    <code>build:node:compile</code> compiles Dinou&apos;s{" "}
                    <strong>Node.js HTTP server architecture</strong> (
                    <code>http.createServer()</code>):
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Full Node Plugin Compatibility:</strong> Direct
                      support for{" "}
                      <Link href="/docs/plugins">
                        <code>configureServer</code>
                      </Link>
                      , WebSockets (Socket.IO, <code>ws</code>), and{" "}
                      <code>(req, res, next)</code> middlewares.
                    </li>
                    <li>
                      <strong>Zero Runtime Dependencies:</strong> Ships as a
                      single binary executable alongside{" "}
                      <code>.dinou/dist2</code> and <code>.dinou/dist3</code>{" "}
                      without requiring Node.js on the production host.
                    </li>
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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:compile
                        </td>
                        <td className="p-3.5">
                          Host Architecture (Default bundler)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:compile:linux
                        </td>
                        <td className="p-3.5">
                          Linux x64 (<code>--target=bun-linux-x64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-linux
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:compile:linux_arm
                        </td>
                        <td className="p-3.5">
                          Linux ARM64 / Graviton (
                          <code>--target=bun-linux-arm64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-linux-arm
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:compile:mac
                        </td>
                        <td className="p-3.5">
                          macOS ARM64 / Apple Silicon (
                          <code>--target=bun-darwin-arm64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-mac
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:compile:win
                        </td>
                        <td className="p-3.5">
                          Windows x64 (<code>--target=bun-windows-x64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-win.exe
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Every command accepts bundler suffixes for explicit control
                  (e.g. <code>dinou build:node:compile:linux:rollup</code> or{" "}
                  <code>dinou build:node:compile:webpack</code>).
                </p>
              </div>

              {/* 5.4 Pure Bun Runner */}
              <div
                id="node-pure-scripts"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  5.4 Pure Bun Engine for Node.js (build:node:pure)
                </h3>
                <p>
                  <strong>How it works:</strong> While standard{" "}
                  <code>build:node</code> executes build scripts under Node.js,{" "}
                  <code>build:node:pure</code> runs the entire build pipeline (
                  <code>esbuild</code>, <code>rollup</code>, or{" "}
                  <code>webpack</code>, SSG pre-rendering, and Dual-Bundle
                  packaging) directly under <strong>100% Bun</strong>—with zero{" "}
                  <code>npx</code> or Node.js runtime dependency—while still
                  emitting the Node.js production server at{" "}
                  <code>.dinou/node/server.mjs</code>.
                </p>

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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">
                          100% Bun
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild (Default)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/node/server.mjs
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:esbuild
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">
                          100% Bun
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/node/server.mjs
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:rollup
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">
                          100% Bun
                        </td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">
                          Rollup
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/node/server.mjs
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:webpack
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">
                          100% Bun
                        </td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                          Webpack
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/node/server.mjs
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5.5 Pure Compile Scripts */}
              <div
                id="node-pure-compile-scripts"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  5.5 Pure Standalone Binary Compilation
                  (build:node:pure:compile)
                </h3>
                <p>
                  <strong>The Zero-Node Pipeline:</strong> Combines 100% Bun
                  build execution with <code>bun build --compile</code>.{" "}
                  <strong>
                    Node.js is not required in either the build image or the
                    production container
                  </strong>
                  .
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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:compile
                        </td>
                        <td className="p-3.5">Host Architecture (100% Bun)</td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:compile:linux
                        </td>
                        <td className="p-3.5">
                          Linux x64 (<code>--target=bun-linux-x64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-linux
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:compile:linux_arm
                        </td>
                        <td className="p-3.5">
                          Linux ARM64 (<code>--target=bun-linux-arm64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-linux-arm
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:compile:mac
                        </td>
                        <td className="p-3.5">
                          macOS ARM64 (<code>--target=bun-darwin-arm64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-mac
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:node:pure:compile:win
                        </td>
                        <td className="p-3.5">
                          Windows x64 (<code>--target=bun-windows-x64</code>)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          dist/server-win.exe
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 mt-5">
                  <p className="font-semibold text-foreground text-sm">
                    Production Multi-Stage Dockerfile Recipe:
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Compiles Dinou using <strong>100% Bun</strong> in the
                    builder stage (<code>bun --bun run</code> executes the{" "}
                    <code>dinou</code> CLI shebang directly through Bun without
                    installing Node.js) and copies only the standalone binary
                    plus <code>.dinou/dist2</code> (SSG/ISR/PPR cache) and{" "}
                    <code>.dinou/dist3</code> (public static webroot) into a
                    minimal Debian Slim runner:
                  </p>
                  <CodeBlock
                    language="dockerfile"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Compilation Stage (100% Bun, Zero Node.js required)
FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json bun.lock* package-lock.json* ./
RUN bun install

COPY . .
RUN bun --bun run build:node:pure:compile

# 2. Minimal Production Runner Stage
FROM debian:bookworm-slim AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy standalone executable and runtime static/SSG directories
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/.dinou/dist2 ./.dinou/dist2
COPY --from=builder /app/.dinou/dist3 ./.dinou/dist3

RUN chmod +x ./server

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["./server"]`}
                  </CodeBlock>
                </div>
              </div>

              {/* 5.6 Comparison Matrix */}
              <div
                id="node-build-matrix"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  5.6 Node Build Architecture &amp; Execution Matrix
                </h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Command Family</th>
                        <th className="p-3">Build Runner</th>
                        <th className="p-3">Binary Compiler</th>
                        <th className="p-3">Output Artifact</th>
                        <th className="p-3">Production Host Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">
                          build:node
                        </td>
                        <td className="p-3">
                          Node.js (<code>node</code>)
                        </td>
                        <td className="p-3">None (ESM bundle)</td>
                        <td className="p-3 font-mono">.dinou/node/server.mjs</td>
                        <td className="p-3">
                          Node.js v20.6+ (+ <code>.dinou/dist2</code> &amp;{" "}
                          <code>dist3</code>)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">
                          build:node:compile
                        </td>
                        <td className="p-3">
                          Node.js (<code>node</code>)
                        </td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">
                          <code>bun build --compile</code>
                        </td>
                        <td className="p-3 font-mono">dist/server</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                          Self-contained binary (Zero Node required)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">
                          build:node:pure
                        </td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">
                          Bun (<code>bun</code>)
                        </td>
                        <td className="p-3">None (ESM bundle)</td>
                        <td className="p-3 font-mono">.dinou/node/server.mjs</td>
                        <td className="p-3">Node.js v20.6+ or Bun runtime</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">
                          build:node:pure:compile
                        </td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">
                          Bun (<code>bun</code>)
                        </td>
                        <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">
                          <code>bun build --compile</code>
                        </td>
                        <td className="p-3 font-mono">dist/server</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                          Self-contained binary (Zero Node &amp; Zero Bun on
                          runner)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5.7 Cloudflare Scripts */}
              <div
                id="cloudflare-scripts"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  5.7 Cloudflare Workers &amp; Pages
                </h3>
                <p>
                  Compiles your application into a <code>workerd</code>-native
                  Dual-Bundle worker (<code>.dinou/cloudflare/worker.js</code>)
                  and synchronizes static assets into{" "}
                  <code>.dinou/cloudflare/assets/</code> (isolating SSG cache
                  files inside{" "}
                  <code>.dinou/cloudflare/assets/__dinou_dist2/</code>):
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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:cloudflare
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild (Default)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/cloudflare/worker.js
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:cloudflare:esbuild
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/cloudflare/worker.js
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:cloudflare:rollup
                        </td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">
                          Rollup
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/cloudflare/worker.js
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:cloudflare:webpack
                        </td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                          Webpack
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/cloudflare/worker.js
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5.8 Deno Scripts */}
              <div id="deno-scripts" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  5.8 Deno &amp; Standalone Compiles
                </h3>
                <p>
                  Builds <code>.dinou/deno/main.js</code>, pre-seeds Deno KV (
                  <code>.dinou/kv.db</code> or remote <code>DENO_KV_URL</code>)
                  with SSG/ISR/PPR payloads, and optionally cross-compiles a
                  standalone native binary:
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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:deno
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Builds Deno bundle + seeds KV cache (also{" "}
                          <code>:esbuild</code>, <code>:rollup</code>,{" "}
                          <code>:webpack</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou start:deno
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Runs the compiled Deno server with{" "}
                          <code>--unstable-kv</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:deno:compile
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Produces a standalone binary (
                          <code>dist/deno-server</code>) for your host OS.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:deno:compile:linux
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Cross-compiles x86_64 Linux executable (
                          <code>dist/deno-server-linux</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:deno:compile:linux_arm
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Cross-compiles ARM64 Linux executable (
                          <code>dist/deno-server-linux-arm</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:deno:compile:mac
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Cross-compiles Apple Silicon macOS binary (
                          <code>dist/deno-server-mac</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:deno:compile:win
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          Cross-compiles Windows x64 executable (
                          <code>dist/deno-server-win.exe</code>).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Every compile command supports bundler suffixes (e.g.{" "}
                  <code>dinou build:deno:compile:linux:rollup</code>).
                </p>
              </div>

              {/* 5.9 Bun Scripts */}
              <div id="bun-scripts" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">
                  5.9 Bun Runtime &amp; Standalone Compiles
                </h3>
                <p>
                  Target Bun&apos;s native <code>Bun.serve</code> + zero-copy{" "}
                  <code>Bun.file</code> runtime (
                  <code>.dinou/bun/server.js</code>) with standard or 100% Pure
                  Bun build runners:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Commands</th>
                        <th className="p-3.5">Build Runner</th>
                        <th className="p-3.5">Output &amp; Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">
                          Standard Bun
                        </td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun
                          <br />
                          dinou start:bun
                        </td>
                        <td className="p-3.5 font-semibold text-muted-foreground">
                          Node.js
                        </td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Executes build scripts under Node.js and outputs{" "}
                          <code>.dinou/bun/server.js</code>. Supports{" "}
                          <code>:esbuild</code>, <code>:rollup</code>, and{" "}
                          <code>:webpack</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">
                          Standard Bun Compile
                        </td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:compile
                        </td>
                        <td className="p-3.5 font-semibold text-muted-foreground">
                          Node.js + Bun Compiler
                        </td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Builds with Node.js, then runs{" "}
                          <code>bun build --compile</code> into{" "}
                          <code>dist/server</code> (supports{" "}
                          <code>:linux</code>, <code>:linux_arm</code>,{" "}
                          <code>:mac</code>, <code>:win</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">
                          Pure Bun Mode
                        </td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:pure
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">
                          100% Bun
                        </td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Runs <code>esbuild</code>, <code>rollup</code>, or{" "}
                          <code>webpack</code> natively under Bun with zero
                          Node.js required, outputting{" "}
                          <code>.dinou/bun/server.js</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-foreground">
                          Pure Bun Compile
                        </td>
                        <td className="p-3.5 font-mono text-foreground">
                          dinou build:bun:pure:compile
                        </td>
                        <td className="p-3.5 font-semibold text-purple-600 dark:text-purple-400">
                          100% Bun (Build &amp; Compile)
                        </td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          100% Bun pipeline end-to-end into a standalone native
                          binary in <code>dist/server</code> (supports{" "}
                          <code>:linux</code>, <code>:linux_arm</code>,{" "}
                          <code>:mac</code>, <code>:win</code>).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5.10 Netlify Functions v2 Scripts */}
              <div
                id="netlify-scripts"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  5.10 Netlify Functions v2 (build:netlify)
                </h3>
                <p>
                  Compiles your application for Netlify Serverless Functions v2,
                  emitting the standalone AOT handler at{" "}
                  <code>.dinou/netlify/functions/ssr.mjs</code> (with{" "}
                  <code>preferStatic: true</code> and{" "}
                  <code>MemoryStorage(&#123; hydrateFromDisk: true &#125;)</code>{" "}
                  for read-only AWS Lambda filesystems) while publishing{" "}
                  <code>.dinou/dist3</code> to Netlify&apos;s edge CDN:
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
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:netlify
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild (Default)
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/netlify/functions/ssr.mjs
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:netlify:esbuild
                        </td>
                        <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                          esbuild
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/netlify/functions/ssr.mjs
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:netlify:rollup
                        </td>
                        <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">
                          Rollup
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/netlify/functions/ssr.mjs
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-foreground font-semibold">
                          dinou build:netlify:webpack
                        </td>
                        <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                          Webpack
                        </td>
                        <td className="p-3.5 font-mono text-muted-foreground">
                          .dinou/netlify/functions/ssr.mjs
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5.11 Static Export & Utility Scripts */}
              <div
                id="static-export-scripts"
                className="mt-8 space-y-3 scroll-mt-20"
              >
                <h3 className="text-lg font-bold">
                  5.11 Static HTML Export &amp; Framework Utilities
                </h3>
                <p>
                  Generates a 100% serverless static export in <code>out/</code>{" "}
                  (combining <code>.dinou/dist3</code> public assets with
                  allowlisted <code>index.html</code>, <code>page.rsc</code>,
                  and <code>layout.rsc</code> from <code>.dinou/dist2</code> so
                  both React 19 hydration and <code>&lt;Link&gt;</code> SPA
                  navigation work on any static host), plus type generation and{" "}
                  <Link href="/docs/eject">eject / uneject</Link> helpers:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Static export into out/ (default esbuild, or explicit bundler)
dinou export-static
dinou export-static:esbuild
dinou export-static:rollup
dinou export-static:webpack

# Generate .dinou/types/routes.d.ts and contextual "./dinou" modules
dinou typegen

# Eject into ./dinou, rebuild vendors, or revert back to node_modules
dinou eject
dinou uneject
dinou build:vendors`}
                </CodeBlock>
              </div>
            </section>

            {/* 6. Recommended package.json Setup */}
            <section id="package-json-setup" className="mt-12 scroll-mt-20">
              <h2>6. Recommended package.json Setup</h2>
              <p>
                Copy and paste the complete <code>&quot;scripts&quot;</code>{" "}
                block directly into your project&apos;s{" "}
                <code>package.json</code>:
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
  "build:netlify": "dinou build:netlify",
  "build:netlify:esbuild": "dinou build:netlify:esbuild",
  "build:netlify:rollup": "dinou build:netlify:rollup",
  "build:netlify:webpack": "dinou build:netlify:webpack",
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
  "typegen": "dinou typegen",
  "eject": "dinou eject",
  "uneject": "dinou uneject"
}`}
              </CodeBlock>
            </section>

            {/* 7. Bundler Selection Guide */}
            <section
              id="bundler-selection-guide"
              className="mt-12 scroll-mt-20"
            >
              <h2>7. Which Bundler &amp; Target Should You Choose?</h2>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Daily Development &amp; Fast CI &rarr; esbuild</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Use <code>dinou dev</code> and <code>dinou build</code>{" "}
                    (esbuild) by default. Sub-second compilation, in-memory VFS
                    caching, and full production{" "}
                    <Link href="/docs/compiler" className="underline">
                      React Compiler
                    </Link>{" "}
                    optimization deliver the fastest workflow.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Cloud className="h-4 w-4 text-rose-500" />
                    <span>Smallest Client Bundles &amp; Edge &rarr; Rollup</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For{" "}
                    <Link href="/docs/deployment" className="underline">
                      Cloudflare Workers
                    </Link>{" "}
                    or bandwidth-sensitive apps where dead-code elimination
                    matters most, <code>dinou build:cloudflare:rollup</code> or{" "}
                    <code>dinou build:node:rollup</code> produces surgical ESM
                    chunks.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Boxes className="h-4 w-4 text-emerald-500" />
                    <span>Complex Legacy npm Interop &rarr; Webpack</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When integrating enterprise libraries with complex CommonJS
                    patterns or custom module resolution,{" "}
                    <code>dinou dev:webpack</code> and{" "}
                    <code>dinou build:node:webpack</code> provide universal
                    compatibility.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Terminal className="h-4 w-4 text-purple-500" />
                    <span>
                      Distroless Containers &amp; Bare-Metal &rarr; Pure Compile
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To ship full Node.js apps (with WebSockets and{" "}
                    <code>configureServer</code> middlewares) into minimal
                    containers with zero Node.js installed, use{" "}
                    <code>dinou build:node:pure:compile</code>.
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
