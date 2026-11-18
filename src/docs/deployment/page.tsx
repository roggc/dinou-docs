import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Rocket,
  CheckCircle2,
  Zap,
  Server,
  Cloud,
  Globe,
  Terminal,
  Layers,
  ShieldCheck,
  Sparkles,
  Flame,
  Binary,
  Database,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Deploy Everywhere with Dinou", level: 2 },
  { id: "targets-summary", title: "2. Supported Deployment Targets", level: 2 },
  { id: "node-vps-docker", title: "3. Node.js Targets & Standalone Binaries", level: 2 },
  { id: "node-standard", title: "3.1 Standard Node.js Server (build:node)", level: 3 },
  { id: "node-compile", title: "3.2 Node Standalone Binary (build:node:compile)", level: 3 },
  { id: "node-pure", title: "3.3 Pure Bun Runner (build:node:pure)", level: 3 },
  { id: "node-pure-compile", title: "3.4 Pure Standalone Binary (build:node:pure:compile)", level: 3 },
  { id: "netlify-serverless", title: "4. Netlify (Serverless Functions v2)", level: 2 },
  { id: "cloudflare-workers", title: "5. Cloudflare Workers & Pages", level: 2 },
  { id: "deno-deploy-compile", title: "6. Deno Deploy (deno-edge) & Standalone Binaries", level: 2 },
  { id: "bun-runtime-compile", title: "7. Bun Runtime & Standalone Executables", level: 2 },
  { id: "static-export", title: "8. Static Export (GitHub Pages, S3, CDN)", level: 2 },
  { id: "docker-guide", title: "9. Production Docker Setup", level: 2 },
  { id: "docker-pure-binary", title: "9.1 Ultra-Lightweight Standalone Binary Container (Recommended)", level: 3 },
  { id: "docker-standard-node", title: "9.2 Standard Node.js Multi-Stage Container", level: 3 },
  { id: "distributed-cache-scaling", title: "10. Horizontal Scaling & Distributed ISR Cache", level: 2 },
  { id: "environment-secrets", title: "11. Managing Production Environment Secrets", level: 2 },
  { id: "deployment-checklist", title: "12. Production Pre-Flight Checklist", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Deployment Guide | Dinou Docs</title>
      <meta
        name="description"
        content="Universal deployment flexibility: deploy as a standalone Node.js server, Docker container, Netlify Functions v2, Cloudflare Workers, Deno Deploy, Bun, static export, or single native binary."
      />
      <link rel="canonical" href="https://dinou.dev/docs/deployment" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Multi-Target Architecture
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou v9.4 Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Deployment Guide
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features universal deployment flexibility: deploy as an in-process Node.js server, on Netlify Serverless Functions v2, at the edge with Cloudflare Workers or Deno Deploy, on Bun, exported as 100% static HTML, or compiled into single zero-dependency native binaries.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* 1. Overview */}
            <section id="overview">
              <h2>1. Deploy Everywhere with Dinou</h2>
              <p>
                Historically, deploying React Server Components to serverless and edge platforms was difficult because Node.js required runtime flags such as <code>--conditions=react-server</code>, custom JSX/TypeScript module loaders, or dual child processes. On managed serverless and V8 isolate runtimes, you rarely control how the underlying runtime process is spawned.
              </p>
              <p>
                <strong>Dinou solves this at build time</strong> through its <strong>Ahead-of-Time (AOT) Dual-Bundle Engine</strong>: Pass A compiles your Server Components, layouts, Server Functions, <Link href="/docs/plugins">plugins</Link>, and <code>setupFiles</code> with <code>react-server</code> conditions pre-resolved, while Pass B compiles streaming HTML SSR with client component manifests in isolated module scope. Production runtimes execute pure standard JavaScript with zero runtime transpilers and zero Node CLI flags:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 not-prose my-6">
                <Card className="border-slate-500/20 bg-slate-50/50 dark:bg-slate-900/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      <Server className="h-4 w-4" />
                      <span>Node.js &amp; Containers</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    In-process AOT servers and native binaries on Railway, Fly.io, Render, DigitalOcean, AWS, or Docker.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Netlify Serverless v2</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Self-contained Functions v2 bundle with <code>preferStatic: true</code> CDN routing and read-only Lambda safety.
                  </CardContent>
                </Card>

                <Card className="border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                      <Cloud className="h-4 w-4" />
                      <span>Cloudflare Workers</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Sub-millisecond global cold starts on <code>workerd</code> with Workers Static Assets, KV, D1, and R2.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Globe className="h-4 w-4" />
                      <span>Deno &amp; Bun Runtimes</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Deno Deploy global edge with native Deno KV, high-throughput Bun servers, and single-file executables.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Targets Summary */}
            <section id="targets-summary" className="mt-12">
              <h2>2. Supported Deployment Targets</h2>
              <p>
                Every production build command defaults to <strong>Esbuild</strong> and accepts explicit bundler suffixes (<code>:esbuild</code>, <code>:rollup</code>, or <code>:webpack</code> — see the <Link href="/docs/bundlers">Bundlers &amp; Dual-Mode Vendoring</Link> guide):
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3.5">Deployment Target</th>
                      <th className="p-3.5">Build Command</th>
                      <th className="p-3.5">Start / Output</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card text-xs">
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Node.js Server</td>
                      <td className="p-3.5 font-mono">dinou build / dinou build:node</td>
                      <td className="p-3.5 font-mono">dinou start / dinou start:node</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Node.js Standalone Binary</td>
                      <td className="p-3.5 font-mono">dinou build:node:compile</td>
                      <td className="p-3.5 font-mono">./dist/server</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Node.js (Pure Bun Build)</td>
                      <td className="p-3.5 font-mono">dinou build:node:pure</td>
                      <td className="p-3.5 font-mono">dinou start:node</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Node.js Pure Standalone Binary</td>
                      <td className="p-3.5 font-mono">dinou build:node:pure:compile</td>
                      <td className="p-3.5 font-mono">./dist/server</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Netlify (Functions v2)</td>
                      <td className="p-3.5 font-mono">dinou build / dinou build:netlify</td>
                      <td className="p-3.5 text-muted-foreground">Automated via <code>netlify.toml</code> (<code>.dinou/netlify/functions</code>)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Cloudflare Workers</td>
                      <td className="p-3.5 font-mono">dinou build:cloudflare</td>
                      <td className="p-3.5 font-mono">wrangler deploy</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Deno Deploy (Edge / Cloud)</td>
                      <td className="p-3.5 font-mono">dinou build:deno</td>
                      <td className="p-3.5 font-mono">deno deploy --project=&lt;app&gt; --include=.dinou/deno,.dinou/dist2,.dinou/dist3 .dinou/deno/main.js</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Deno Standalone Server</td>
                      <td className="p-3.5 font-mono">dinou build:deno</td>
                      <td className="p-3.5 font-mono">dinou start:deno</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Deno Standalone Binary</td>
                      <td className="p-3.5 font-mono">dinou build:deno:compile</td>
                      <td className="p-3.5 font-mono">./dist/deno-server</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Bun Runtime</td>
                      <td className="p-3.5 font-mono">dinou build:bun / dinou build:bun:pure</td>
                      <td className="p-3.5 font-mono">dinou start:bun</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Bun Standalone Binary</td>
                      <td className="p-3.5 font-mono">dinou build:bun:compile / dinou build:bun:pure:compile</td>
                      <td className="p-3.5 font-mono">./dist/server</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Static HTML Export (SSG)</td>
                      <td className="p-3.5 font-mono">dinou export-static</td>
                      <td className="p-3.5 font-mono">out/ (HTML, Assets &amp; .rsc Flight Payloads)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Node.js Targets & Standalone Binaries */}
            <section id="node-vps-docker" className="mt-12">
              <h2>3. Node.js Targets &amp; Standalone Binaries</h2>
              <p>
                Dinou provides four production compilation and packaging pipelines for Node.js environments, scaling from traditional PaaS and VPS deployments to zero-dependency standalone native executables:
              </p>

              <div className="space-y-8 my-6">
                {/* 3.1 Standard Node.js Server */}
                <div id="node-standard" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-500" />
                    <h3 className="text-lg font-bold">3.1 Standard Node.js Server (build:node)</h3>
                  </div>
                  <p>
                    Compiles your application into an in-process Dual-Bundle HTTP orchestrator at <code>.dinou/node/server.mjs</code> alongside pre-rendered SSG artifacts in <code>.dinou/dist2</code> and public static assets in <code>.dinou/dist3</code>:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Compile for standard Node.js production (alias: dinou build)
dinou build:node

# 2. Start the production server (respects PORT=3000 and optional HOST=0.0.0.0)
dinou start:node`}
                  </CodeBlock>

                  <div className="p-4 rounded-lg border bg-card space-y-1.5 not-prose">
                    <div className="font-semibold text-sm text-foreground">PaaS &amp; Cloud Hosts (Railway, Render, Fly.io, DigitalOcean App Platform)</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Set <strong>Build Command</strong> to <code>npm run build</code> (or <code>npx dinou build:node</code>) and <strong>Start Command</strong> to <code>npm start</code> (or <code>npx dinou start:node</code>). Dinou automatically binds to <code>process.env.PORT</code> (and <code>process.env.HOST</code> when specified), serves static assets with zero-copy streams and HTTP <code>Range</code> support, and executes without special Node flags.
                    </p>
                  </div>
                </div>

                {/* 3.2 Node Standalone Binary */}
                <div id="node-compile" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Binary className="h-4 w-4 text-indigo-500" />
                    <h3 className="text-lg font-bold">3.2 Node Standalone Binary (build:node:compile)</h3>
                  </div>
                  <p>
                    Uses <strong>Node.js</strong> to build your application and then compiles <code>.dinou/node/server.mjs</code> (including both RSC and SSR engines) into a single self-contained native executable at <code>dist/server</code> via Bun&apos;s standalone compiler:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Compile standalone binary for current OS (dist/server)
dinou build:node:compile

# Run the single binary directly (no Node or Bun required on the production host!)
./dist/server`}
                  </CodeBlock>

                  <p>
                    Unlike <code>build:bun:compile</code> (which runs on <code>Bun.serve</code>), <code>build:node:compile</code> packages Dinou&apos;s <strong>Node.js HTTP server architecture</strong> (<code>http.createServer()</code>), preserving full compatibility with Node <code>configureServer</code> hooks, WebSockets (<code>ws</code> / Socket.IO), and Express/Connect middlewares.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground font-medium">
                        <tr>
                          <th className="p-3.5">Cross-Compilation Target</th>
                          <th className="p-3.5">Architecture &amp; Target Flag</th>
                          <th className="p-3.5">Generated Binary</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-xs">
                        <tr>
                          <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile</td>
                          <td className="p-3.5">Host Architecture (Default)</td>
                          <td className="p-3.5 font-mono text-muted-foreground">dist/server</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile:linux</td>
                          <td className="p-3.5">Linux x86_64 (<code>--target=bun-linux-x64</code>)</td>
                          <td className="p-3.5 font-mono text-muted-foreground">dist/server-linux</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-foreground font-semibold">dinou build:node:compile:linux_arm</td>
                          <td className="p-3.5">Linux ARM64 / AWS Graviton (<code>--target=bun-linux-arm64</code>)</td>
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
                </div>

                {/* 3.3 Pure Bun Runner */}
                <div id="node-pure" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <h3 className="text-lg font-bold">3.3 Pure Bun Runner (build:node:pure)</h3>
                  </div>
                  <p>
                    Executes the entire build pipeline (Esbuild, Rollup, or Webpack + SSG + Dual-Engine bundling) using <strong>100% Bun</strong> without requiring Node.js on the build machine, emitting the standard Node orchestrator at <code>.dinou/node/server.mjs</code>:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Build Node orchestrator using 100% Bun (zero Node.js required in CI)
dinou build:node:pure

# 2. Run the resulting Node server
dinou start:node`}
                  </CodeBlock>
                </div>

                {/* 3.4 Pure Standalone Binary */}
                <div id="node-pure-compile" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <h3 className="text-lg font-bold">3.4 Pure Standalone Binary (build:node:pure:compile)</h3>
                  </div>
                  <p>
                    Combines the <strong>100% Bun build pipeline</strong> with <strong>standalone native binary compilation</strong>:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Compile standalone binary using 100% Bun pipeline
dinou build:node:pure:compile

# Cross-compilation targets (also support :esbuild, :rollup, :webpack):
dinou build:node:pure:compile:linux      # Linux x86_64
dinou build:node:pure:compile:linux_arm  # Linux ARM64 (AWS Graviton)
dinou build:node:pure:compile:mac        # Apple macOS (ARM64)
dinou build:node:pure:compile:win        # Windows executable (.exe)`}
                  </CodeBlock>

                  <div className="border rounded-xl p-4 bg-muted/20 not-prose text-xs text-muted-foreground space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      Minimal Runtime Footprint
                    </div>
                    <p>
                      At runtime, <code>dist/server</code> only needs <code>.dinou/dist2</code> (pre-rendered SSG cache) and <code>.dinou/dist3</code> (public static assets)—no <code>node_modules</code>, no <code>src/</code>, and no Node or Bun installation on the host. See <a href="#docker-pure-binary" className="text-primary underline">Section 9.1</a> for the production Docker recipe.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Netlify Target */}
            <section id="netlify-serverless" className="mt-12">
              <h2>4. Netlify (Serverless Functions v2)</h2>
              <p>
                Netlify is a first-class serverless target in Dinou. During <code>npm run build</code> (or <code>npx dinou build:netlify</code>), Dinou compiles a self-contained <strong>AOT Dual-Bundle Netlify Functions v2</strong> entry into <code>.dinou/netlify/functions/ssr.mjs</code>, physically isolated from the public static webroot in <code>.dinou/dist3</code>.
              </p>

              <div className="space-y-4 my-4">
                <p>
                  <strong>Step 1:</strong> Create a <code>netlify.toml</code> file in your repository root:
                </p>
                <CodeBlock
                  language="toml"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# netlify.toml
[build]
  command = "npm run build"
  publish = ".dinou/dist3"

[build.environment]
  NODE_VERSION = "22"

[environment]
  NODE_ENV = "production"

[functions]
  directory = ".dinou/netlify/functions"
  node_bundler = "none"
  included_files = [".dinou/dist2/**"]`}
                </CodeBlock>

                <p>
                  <strong>Step 2:</strong> Deploy via Git push or Netlify CLI:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Option A: Automatic Git-based CI/CD (Recommended)
git push origin main

# Option B: Manual deployment using Netlify CLI
npx dinou build:netlify
npx netlify deploy --prod`}
                </CodeBlock>
              </div>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>How Netlify Functions v2 Works in Dinou</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The compiled <code>.dinou/netlify/functions/ssr.mjs</code> bundle embeds Pass A (RSC) and Pass B (Streaming SSR) together with your routes, Server Functions, and plugins—so <code>included_files</code> only needs <code>.dinou/dist2/**</code> (~1–2 MB instead of shipping <code>node_modules/**</code> or <code>src/**</code>). Because it exports <code>config = &#123; path: &quot;/*&quot;, preferStatic: true &#125;</code>, Netlify serves client chunks, CSS, and <code>public/</code> files directly from its global CDN at zero compute cost. On AWS Lambda&apos;s read-only <code>/var/task</code> filesystem, Dinou automatically uses <code>MemoryStorage(&#123; hydrateFromDisk: true &#125;)</code> (unless you configure <a href="#distributed-cache-scaling" className="text-primary underline">RedisStorage</a>), hydrating pre-rendered SSG pages from <code>.dinou/dist2</code> while running background ISR via <code>context.waitUntil()</code> and unifying <code>Netlify.env</code> with <code>getContext().env</code>.
                </p>
              </div>
            </section>

            {/* 5. Cloudflare Workers Target */}
            <section id="cloudflare-workers" className="mt-12">
              <h2>5. Cloudflare Workers &amp; Pages</h2>
              <p>
                Dinou compiles Server Components and streaming HTML SSR directly for Cloudflare&apos;s V8-based <code>workerd</code> runtime using standard W3C Web Streams:
              </p>

              <div className="space-y-4 my-4">
                <p>
                  <strong>Step 1:</strong> Build the Cloudflare Workers bundle and static asset staging tree:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Build edge worker (.dinou/cloudflare/worker.js) & staged assets (.dinou/cloudflare/assets)
dinou build:cloudflare`}
                </CodeBlock>

                <p>
                  <strong>Step 2:</strong> Configure <code>wrangler.toml</code> in your repository root:
                </p>
                <CodeBlock
                  language="toml"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`#:schema node_modules/wrangler/config-schema.json
name = "dinou-cloudflare-app"
main = ".dinou/cloudflare/worker.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# Serves public static assets from .dinou/cloudflare/assets while keeping
# internal SSG/ISR/PPR cache files isolated under /__dinou_dist2/*.
[assets]
directory = ".dinou/cloudflare/assets"
binding = "ASSETS"
run_worker_first = true

# Optional: Bind a Cloudflare KV namespace for persistent global ISR/ISG caching
# [[kv_namespaces]]
# binding = "DINOU_CACHE"
# id = "<YOUR_KV_NAMESPACE_ID>"`}
                </CodeBlock>

                <p>
                  <strong>Step 3:</strong> Preview locally or deploy to the Cloudflare edge:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Preview locally with Wrangler
npx wrangler dev

# Deploy globally to Cloudflare Workers
npx wrangler deploy`}
                </CodeBlock>
              </div>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-rose-600 dark:text-rose-400">
                  <Zap className="h-4 w-4" />
                  <span>How Cloudflare Workers Works in Dinou</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dinou emits <code>.dinou/cloudflare/worker.js</code> alongside <code>.dinou/cloudflare/assets</code> (leaving <code>.dinou/dist3</code> untouched). Public client bundles and <code>public/</code> files are served via <code>env.ASSETS</code>, while pre-rendered SSG/ISR/PPR cache artifacts live inside <code>.dinou/cloudflare/assets/__dinou_dist2</code> (blocked from direct external HTTP access). When <code>env.DINOU_CACHE</code> is bound, Dinou activates <code>CloudflareKVStorage</code> automatically; secrets, KV namespaces, D1 databases, and R2 buckets are all accessible via <code>getContext().env</code>.
                </p>
              </div>
            </section>

            {/* 6. Deno Deploy (deno-edge) & Compile Target */}
            <section id="deno-deploy-compile" className="mt-12">
              <h2>6. Deno Deploy (deno-edge) &amp; Standalone Binaries</h2>
              <p>
                Dinou provides native compilation for <strong>Deno Deploy</strong>, self-hosted Deno servers, and <strong>single-file native executables</strong> via <code>deno compile</code>:
              </p>

              <div className="space-y-6 my-6 not-prose">
                {/* Deno Deploy Edge */}
                <div className="rounded-xl border p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Globe className="h-4 w-4 text-amber-500" />
                    <span>A. Deno Deploy (Serverless Global Edge - <code>deno-edge</code>)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <code>dinou build:deno</code> compiles your RSC and SSR engines into <code>.dinou/deno/main.js</code> and integrates natively with <strong>Deno KV</strong> (<code>Deno.openKv()</code>). Because <code>.dinou</code> is typically listed in <code>.gitignore</code>, pass <code>--include=.dinou/deno,.dinou/dist2,.dinou/dist3</code> when deploying with the Deno CLI so static assets and pre-rendered SSG cache files are uploaded alongside <code>main.js</code>:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Build Deno bundle (.dinou/deno/main.js) & seed local KV (.dinou/kv.db)
#    (Optional: set DENO_KV_URL=... to pre-seed remote Deno Deploy KV at build time)
dinou build:deno

# 2. Deploy to Deno Deploy (explicitly including gitignored .dinou build artifacts)
deno deploy --project=<my-project> --include=.dinou/deno,.dinou/dist2,.dinou/dist3 .dinou/deno/main.js`}
                  </CodeBlock>
                </div>

                {/* Deno Standalone Server */}
                <div className="rounded-xl border p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Server className="h-4 w-4 text-amber-500" />
                    <span>B. Deno Standalone Server (VPS / Docker)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Run your pre-bundled application with the standard Deno runtime locally or in Linux containers (respects <code>PORT</code>, <code>HOST</code>, and <code>DENO_KV_PATH</code>):
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`dinou build:deno
dinou start:deno`}
                  </CodeBlock>
                </div>

                {/* Deno Standalone Binaries */}
                <div className="rounded-xl border p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Terminal className="h-4 w-4 text-emerald-500" />
                    <span>C. Zero-Dependency Standalone Binaries (<code>deno compile</code>)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Package your Dinou app, V8, the Deno runtime, and embedded Deno KV support into a single executable:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Compile standalone binary for current OS
dinou build:deno:compile
./dist/deno-server

# Cross-compile for any target OS / architecture:
dinou build:deno:compile:linux      # x86_64 Linux
dinou build:deno:compile:linux_arm  # ARM64 Linux (AWS Graviton, Raspberry Pi)
dinou build:deno:compile:mac        # Apple macOS (ARM64)
dinou build:deno:compile:win        # Windows x64 (.exe)`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* 7. Bun Target */}
            <section id="bun-runtime-compile" className="mt-12">
              <h2>7. Bun Runtime &amp; Standalone Executables</h2>
              <p>
                Run your application directly on <code>Bun.serve</code> with zero-copy <code>Bun.file()</code> static asset delivery (respecting <code>PORT</code>, <code>HOST</code>, and <code>IDLE_TIMEOUT</code>), or compile a native Bun executable:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# 1. Standard Bun build and execution
dinou build:bun
dinou start:bun

# 2. Pure Bun (100% Bun from bundler to runtime, 0 Node.js on the machine)
dinou build:bun:pure
dinou start:bun

# 3. Standalone Bun single-file binary compilation
dinou build:bun:compile
./dist/server

# 4. Pure Bun standalone binary compilation (100% Bun end-to-end)
dinou build:bun:pure:compile
./dist/server

# Cross-compilation targets (also available for build:bun:pure:compile:*):
dinou build:bun:compile:linux      # x86_64 Linux
dinou build:bun:compile:linux_arm  # ARM64 Linux (AWS Graviton)
dinou build:bun:compile:mac        # Apple macOS (Apple Silicon)
dinou build:bun:compile:win        # Windows x64 (.exe)`}
              </CodeBlock>
            </section>

            {/* 8. Static Export Target */}
            <section id="static-export" className="mt-12">
              <h2>8. Static Export (GitHub Pages, S3, CDN)</h2>
              <p>
                When your site consists purely of static routes and pre-rendered dynamic routes (via <code>getStaticPaths</code>), export a self-contained static site into <code>out/</code>:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# Generates complete static site in out/ (also supports :esbuild, :rollup, :webpack)
dinou export-static`}
              </CodeBlock>
              <p className="text-xs text-muted-foreground mt-2">
                <code>out/</code> includes pre-rendered <code>index.html</code> files, hashed client bundles, <code>public/</code> assets, and segmented <code>page.rsc</code> / <code>layout.rsc</code> Flight payloads—preserving instant client-side SPA transitions on GitHub Pages, Cloudflare Pages, AWS S3, Surge, or Nginx without any backend server.
              </p>
            </section>

            {/* 9. Production Docker Setup */}
            <section id="docker-guide" className="mt-12">
              <h2>9. Production Docker Setup</h2>
              <p>
                Containerizing Dinou supports two battle-tested patterns: an <strong>ultra-lightweight standalone binary container</strong> (zero JS runtime in the runner image) or a <strong>pruned multi-stage Node.js container</strong>.
              </p>

              <div className="space-y-8 my-6">
                {/* 9.1 Ultra-Lightweight Standalone Binary Container */}
                <div id="docker-pure-binary" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-emerald-500" />
                    <h3 className="text-lg font-bold">9.1 Ultra-Lightweight Standalone Binary Container (Recommended)</h3>
                  </div>
                  <p>
                    Uses <strong>Bun in the builder stage</strong> with <code>build:node:pure:compile</code> (or <code>build:bun:pure:compile</code>) and copies only the compiled executable plus <code>.dinou/dist2</code> and <code>.dinou/dist3</code> into a minimal <strong>Debian Bookworm Slim</strong> image:
                  </p>

                  <CodeBlock
                    language="dockerfile"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# ==============================================================================
# 1. Compilation Stage (100% Bun, Zero Node.js required)
# ==============================================================================
FROM oven/bun:latest AS builder
WORKDIR /app

# Symlink so #!/usr/bin/env node CLI shebangs execute Bun transparently
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

# Install dependencies cleanly
COPY package.json package-lock.json* bun.lock* ./
RUN bun install

# Copy application source and compile standalone binary
COPY . .
RUN bun run build:node:pure:compile

# ==============================================================================
# 2. Minimal Production Runner Stage
# ==============================================================================
FROM debian:bookworm-slim AS runner
WORKDIR /app

# Install CA certificates for outbound HTTPS (add openssl if using Prisma)
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy ONLY the standalone binary, SSG cache (dist2), and static assets (dist3)
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/.dinou/dist2 ./.dinou/dist2
COPY --from=builder /app/.dinou/dist3 ./.dinou/dist3

RUN chmod +x ./server

ENV NODE_ENV=production PORT=8080
EXPOSE 8080

CMD ["./server"]`}
                  </CodeBlock>

                  <div className="rounded-xl border p-4 bg-card not-prose space-y-3 my-4">
                    <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>Why This Dockerfile Architecture Excels</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-5">
                      <li>
                        <strong>Shebang Compatibility (<code>ln -s /usr/local/bin/bun /usr/local/bin/node</code>):</strong> CLI binaries with <code>#!/usr/bin/env node</code> execute directly on Bun without installing Node.js in the builder image.
                      </li>
                      <li>
                        <strong>Debian Bookworm Slim vs. Alpine:</strong> Standard GNU <code>glibc</code> avoids <code>musl</code> native-addon compatibility issues (such as Prisma engines — if your project uses Prisma, install <code>openssl</code> and copy <code>node_modules/.prisma</code>, <code>node_modules/@prisma</code>, and <code>prisma</code>).
                      </li>
                      <li>
                        <strong>Minimal Attack Surface:</strong> Neither Node.js, npm, Bun, <code>node_modules</code>, nor <code>.dinou/node</code> intermediate bundles are present in the final production container.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 9.2 Standard Node.js Container */}
                <div id="docker-standard-node" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-500" />
                    <h3 className="text-lg font-bold">9.2 Standard Node.js Multi-Stage Container</h3>
                  </div>
                  <p>
                    Thanks to Dinou&apos;s <Link href="/docs/bundlers">Dual-Mode Vendoring</Link>, running <code>npm prune --omit=dev</code> strips development packages cleanly while keeping production startup instantaneous:
                  </p>

                  <CodeBlock
                    language="dockerfile"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Multi-Stage Production Dockerfile for Dinou (Standard Node.js)
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:node && npm prune --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.dinou/node ./.dinou/node
COPY --from=builder /app/.dinou/dist2 ./.dinou/dist2
COPY --from=builder /app/.dinou/dist3 ./.dinou/dist3

USER node
EXPOSE 3000
CMD ["npm", "run", "start:node"]`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* 10. Horizontal Scaling & Distributed ISR Cache */}
            <section id="distributed-cache-scaling" className="mt-12">
              <h2>10. Horizontal Scaling &amp; Distributed ISR Cache</h2>
              <p>
                Single-server Node and Bun deployments store Incremental Static Regeneration (ISR), ISG, Partial Prerendering (PPR) shells, and <Link href="/docs/3d-segmentation">Cache Slots</Link> in <code>.dinou/dist2</code> via <code>FileSystemStorage</code>. When scaling horizontally across <strong>multiple container replicas</strong> (Kubernetes, Fly.io, Railway, AWS ECS) or across <strong>serverless Netlify Function instances</strong>, configure <code>RedisStorage</code> in <code>dinou.config.ts</code> so all instances share one coherent cache and instant <Link href="/docs/revalidation"><code>revalidateTag()</code> / <code>revalidatePath()</code></Link> invalidations:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// dinou.config.ts
import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export default defineConfig({
  ...(redis
    ? {
        storage: new RedisStorage(redis, {
          prefix: "dinou:prod:",
        }),
      }
    : {}),
});`}
              </CodeBlock>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-blue-600 dark:text-blue-400">
                  <Database className="h-4 w-4" />
                  <span>Automatic Build-Time SSG Hydration</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  During <code>dinou build</code>, Dinou automatically writes build-time SSG pages to <code>.dinou/dist2</code> without touching your remote Redis cluster. At runtime, <code>RedisStorage</code> (as well as <code>CloudflareKVStorage</code> via <code>/__dinou_dist2</code> and <code>DenoKVStorage</code>) lazily hydrates missing build-time artifacts from disk while respecting tag/path invalidation timestamps across every replica.
                </p>
              </div>
            </section>

            {/* 11. Environment Secrets */}
            <section id="environment-secrets" className="mt-12">
              <h2>11. Managing Production Environment Secrets</h2>
              <p>
                Never commit <code>.env</code> secrets to Git or bake runtime secrets into Docker images. Remember that client-exposed variables prefixed with <code>DINOU_PUBLIC_</code> are statically inlined at build time, while server-only secrets are read dynamically at request time via <code>getContext().env</code> (see <Link href="/docs/env-vars">Environment Variables</Link>):
              </p>
              <ul>
                <li><strong>Railway / Render:</strong> Project Settings &rarr; Environment Variables.</li>
                <li><strong>Fly.io:</strong> <code>fly secrets set DATABASE_URL=&quot;...&quot;</code>.</li>
                <li><strong>Netlify:</strong> Site Configuration &rarr; Environment variables (unified automatically from <code>Netlify.env</code> &amp; <code>process.env</code>).</li>
                <li><strong>Cloudflare Workers:</strong> <code>npx wrangler secret put DATABASE_URL</code>.</li>
                <li><strong>Deno Deploy:</strong> Project Settings &rarr; Environment Variables (or <code>--env-file</code> in <code>deno deploy</code>).</li>
              </ul>
            </section>

            {/* 12. Production Checklist */}
            <section id="deployment-checklist" className="mt-12">
              <h2>12. Production Pre-Flight Checklist</h2>
              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Deployment Checklist</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Validate Production Build Locally:</strong> Run <code>npm run build &amp;&amp; npm start</code> locally to verify SSG routes, Server Functions, and production bundles before deploying.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Build-Time vs. Runtime Env Vars:</strong> Ensure <code>DINOU_PUBLIC_*</code> variables are available in your CI builder stage, and private secrets are set in your runtime platform dashboard.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Immutable Asset Caching:</strong> Content-hashed client JS/CSS bundles and fingerprinted files in <code>/assets/*</code> are served with <code>Cache-Control: public, max-age=31536000, immutable</code> automatically across Dinou&apos;s Node, Bun, and Deno servers and edge CDNs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Distributed Cache for Multi-Replica / Edge:</strong> Bind <code>DINOU_CACHE</code> on Cloudflare Workers, enable Deno KV on Deno Deploy, or configure <code>RedisStorage</code> when running multiple Node/Bun/Netlify instances.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>HTTPS &amp; Reverse Proxy Headers:</strong> Ensure TLS termination is active (automatic on Netlify, Cloudflare, Deno Deploy, Railway, and Fly.io; use Caddy or Nginx with Let&apos;s Encrypt on self-hosted VPS hosts).</span>
                  </li>
                </ul>
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
