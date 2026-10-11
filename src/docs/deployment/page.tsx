"use client";

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
  Rocket,
  CheckCircle2,
  Zap,
  Cpu,
  Server,
  Cloud,
  Globe,
  Terminal,
  Layers,
  ShieldCheck,
  Boxes,
  Sparkles,
  ArrowRight,
  Flame,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Deploy Everywhere with Dinou v7", level: 2 },
  { id: "targets-summary", title: "Supported Deployment Targets", level: 2 },
  { id: "node-vps-docker", title: "1. Node.js (Docker, Fly.io, Railway, Render)", level: 3 },
  { id: "netlify-serverless", title: "2. Netlify (Serverless Functions v2)", level: 3 },
  { id: "cloudflare-workers", title: "3. Cloudflare Workers & Pages", level: 3 },
  { id: "deno-deploy-compile", title: "4. Deno Deploy (deno-edge) & Standalone Binaries", level: 3 },
  { id: "bun-runtime-compile", title: "5. Bun Runtime & Standalone Executables", level: 3 },
  { id: "static-export", title: "6. Static Export (GitHub Pages, S3, CDN)", level: 3 },
  { id: "docker-guide", title: "Production Docker Setup", level: 2 },
  { id: "environment-secrets", title: "Managing Production Environment Secrets", level: 2 },
  { id: "deployment-checklist", title: "Production Pre-Flight Checklist", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Deployment Guide
              </h1>
              <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                Deploy Everywhere
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou v7 features universal deployment flexibility: deploy as a standalone Node.js server, on Netlify Serverless Functions v2, at the edge with Cloudflare Workers, on Deno or Bun, or compiled into single native binaries.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Deploy Everywhere with Dinou v7</h2>
              <p>
                Before Dinou v7, deploying React Server Components to serverless platforms (like Netlify) was impossible due to the need to pass the <code>--conditions react-server</code> flag. While on a VPS or custom server (like DigitalOcean) you could configure Node runtime flags, serverless and edge environments offered no control over them.
              </p>
              <p>
                <strong>Dinou v7 solves this completely</strong>: through its pre-bundled dual-engine architecture, server bundles are compiled with all React Server conditions pre-resolved at build time. You can now deploy Dinou to virtually any infrastructure:
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
                    Standalone servers on Railway, Fly.io, Render, DigitalOcean, AWS, or Docker.
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
                    Native Functions v2 adapter with zero-config edge routing and static CDN caching.
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
                    Global sub-millisecond cold starts on Cloudflare Workers and Pages with KV &amp; D1.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-900/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Globe className="h-4 w-4" />
                      <span>Deno Deploy (Edge)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Multi-region edge runtime targeting <code>deno-edge</code> with built-in Deno KV persistence.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Targets Summary */}
            <section id="targets-summary" className="mt-12">
              <h2>Supported Deployment Targets</h2>
              <p>
                Dinou provides dedicated build commands and adapters for each target runtime:
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
                      <td className="p-3.5 font-mono">dinou build:node</td>
                      <td className="p-3.5 font-mono">dinou start:node</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Netlify (Functions v2)</td>
                      <td className="p-3.5 font-mono">dinou build:node</td>
                      <td className="p-3.5 text-muted-foreground">Automated via <code>netlify.toml</code></td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Cloudflare Workers</td>
                      <td className="p-3.5 font-mono">dinou build:cloudflare</td>
                      <td className="p-3.5 font-mono">wrangler deploy</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Deno Deploy (Edge / Cloud)</td>
                      <td className="p-3.5 font-mono">dinou build:deno</td>
                      <td className="p-3.5 font-mono">deno deploy --project=&lt;app&gt; .dinou/deno/main.js</td>
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
                      <td className="p-3.5 font-mono">out/ (Static HTML &amp; Assets)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 1. Node.js Target */}
            <section id="node-vps-docker" className="mt-12">
              <h2>1. Node.js (Docker, Fly.io, Railway, Render, DigitalOcean)</h2>
              <p>
                The Node.js target compiles your application into a pre-bundled, standalone production server in <code>.dinou/node/server.mjs</code>:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# 1. Compile for Node.js
dinou build:node

# 2. Start the production server (defaults to PORT 3000)
dinou start:node`}
              </CodeBlock>

              <div className="p-4 rounded-lg border bg-card space-y-1.5 not-prose my-6">
                <div className="font-semibold text-sm text-foreground">PaaS & Cloud Hosts (Railway, Render, Fly.io, DigitalOcean App Platform)</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Set <strong>Build Command</strong> to <code>npm run build:node</code> and <strong>Start Command</strong> to <code>npm run start:node</code>. All platform-assigned ports (<code>PORT</code>) are detected automatically, and Dinou&apos;s pre-bundled architecture eliminates any need for manual Node flags.
                </p>
              </div>
            </section>

            {/* 2. Netlify Target */}
            <section id="netlify-serverless" className="mt-12">
              <h2>2. Netlify (Serverless Functions v2)</h2>
              <p>
                In <strong>Dinou v7</strong>, Netlify is a first-class supported serverless target. During <code>npm run build</code>, Dinou automatically pre-bundles a specialized <strong>Netlify Functions v2 Adapter</strong> directly into <code>.dinou/dist3/server/netlify.js</code>.
              </p>
              
              <div className="space-y-4 my-4">
                <p>
                  <strong>Step 1:</strong> Configure your project with a <code>netlify.toml</code> file in the repository root:
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
  directory = ".dinou/dist3/server"
  node_bundler = "none"
  included_files = [
    "package.json",
    "tsconfig.json",
    "dinou.config.*",
    "src/**",
    "dinou/**",
    ".dinou/**",
    "node_modules/**",
    "!node_modules/@swc/**",
    "!node_modules/typescript/**",
    "!node_modules/webpack*/**",
    "!node_modules/@esbuild/**",
    "!node_modules/esbuild/**",
    "!node_modules/@rollup/**",
    "!node_modules/rollup/**",
    "!node_modules/.cache/**",
    "!node_modules/@types/**"
  ]`}
                </CodeBlock>

                <p>
                  <strong>Step 2:</strong> Deploy to Netlify:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Option A: Automatic Git-based CI/CD (Recommended)
git push origin main

# Option B: Manual deployment using Netlify CLI (requires local build)
npm run build
npx netlify deploy --prod`}
                </CodeBlock>
              </div>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>How Netlify Functions v2 Works in Dinou</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The pre-bundled adapter in <code>.dinou/dist3/server/netlify.js</code> exports <code>config = &#123; path: &quot;/*&quot;, preferStatic: true &#125;</code>. Because <code>preferStatic: true</code> is active, Netlify serves all client assets, CSS, images, and pre-rendered pages directly from <code>.dinou/dist3</code> through its global edge CDN with zero compute cost. Dynamic routes, SSR streaming, and React Server Functions are routed to the serverless function automatically. With <code>node_bundler = &quot;none&quot;</code>, Netlify runs the pre-bundled adapter cleanly without double-bundling conflicts.
                </p>
              </div>
            </section>

            {/* 3. Cloudflare Workers Target */}
            <section id="cloudflare-workers" className="mt-12">
              <h2>3. Cloudflare Workers &amp; Pages</h2>
              <p>
                Dinou provides native ahead-of-time compilation for Cloudflare&apos;s V8-based <code>workerd</code> edge runtime. It compiles Server Components and SSR into standard W3C Web Streams with sub-millisecond cold starts across 300+ cities:
              </p>

              <div className="space-y-4 my-4">
                <p>
                  <strong>Step 1:</strong> Compile your application for Cloudflare Workers:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Build edge worker bundle (.dinou/cloudflare/worker.js)
npm run build:cloudflare`}
                </CodeBlock>

                <p>
                  <strong>Step 2:</strong> Configure your project with a <code>wrangler.toml</code> file in the repository root:
                </p>
                <CodeBlock
                  language="toml"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# wrangler.toml
name = "my-dinou-app"
main = ".dinou/cloudflare/worker.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# Serve client bundles, CSS, and static assets directly via Cloudflare CDN
[assets]
directory = ".dinou/dist3"

# Optional: Bind KV namespace for persistent ISR route caching
# [[kv_namespaces]]
# binding = "DINOU_CACHE"
# id = "<your-kv-namespace-id>"`}
                </CodeBlock>

                <p>
                  <strong>Step 3:</strong> Test locally or deploy to Cloudflare:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Preview locally with Wrangler (defaults to port 3000)
npx wrangler dev

# Deploy to Cloudflare Workers edge network
npx wrangler deploy`}
                </CodeBlock>
              </div>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-rose-600 dark:text-rose-400">
                  <Zap className="h-4 w-4" />
                  <span>How Cloudflare Workers Works in Dinou v7</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dinou generates a self-contained Dual-Bundle orchestrator at <code>.dinou/cloudflare/worker.js</code>. Static assets and pre-rendered pages are served instantly by Cloudflare&apos;s global CDN through <code>env.ASSETS</code>. When bound to <code>env.DINOU_CACHE</code>, Dinou automatically activates <code>CloudflareKVStorage</code> to persist Incremental Static Regeneration (ISR) route caches across the edge. Secrets, D1 databases, and R2 buckets are injected seamlessly into Server Components via <code>getContext().env</code>.
                </p>
              </div>
            </section>

            {/* 4. Deno Deploy (deno-edge) & Compile Target */}
            <section id="deno-deploy-compile" className="mt-12">
              <h2>4. Deno Deploy (deno-edge) &amp; Standalone Binaries</h2>
              <p>
                Dinou provides native compilation for the <strong>Deno Deploy</strong> global edge cloud (targeting the <code>deno-edge</code> runtime), standalone Deno server execution, and <strong>zero-dependency single-file binary compilation</strong>:
              </p>

              <div className="space-y-6 my-6 not-prose">
                {/* Deno Deploy Edge */}
                <div className="rounded-xl border p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Globe className="h-4 w-4 text-amber-500" />
                    <span>A. Deno Deploy (Serverless Global Edge - <code>deno-edge</code>)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When running <code>dinou build:deno</code>, Dinou packages your RSC and SSR engines specifically optimized for the <code>deno-edge</code> runtime into <code>.dinou/deno/main.js</code>. Dinou integrates natively with <strong>Deno KV</strong> (<code>Deno.openKv()</code>), allowing ISR-cached pages, dynamic KV stores, and sessions to persist across Deno&apos;s global edge network (35+ regions) with zero database configuration.
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Build bundle targeting Deno Edge (deno-edge)
dinou build:deno

# 2. Deploy directly to Deno Deploy using native Deno CLI (Deno 2+):
deno deploy --project=<my-project> .dinou/deno/main.js

# (Legacy Deno setups used the separate 'deployctl' CLI)
# Or configure GitHub integration to deploy automatically on git push!`}
                  </CodeBlock>
                </div>

                {/* Deno Standalone Server */}
                <div className="rounded-xl border p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Server className="h-4 w-4 text-amber-500" />
                    <span>B. Deno Standalone Server (VPS / Docker)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To run your application using the standard Deno runtime locally or in self-hosted Linux containers:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Build and run with standard Deno runtime
dinou build:deno
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
                    Compile your entire Dinou application, the V8 JavaScript engine, Deno runtime, and embedded Deno KV database into a single self-contained executable file. The target server does not need Node, Deno, or Bun installed:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Compile standalone binary for current OS
dinou build:deno:compile
./dist/deno-server

# Cross-compile for any operating system / architecture:
dinou build:deno:compile:linux      # x86_64 Linux
dinou build:deno:compile:linux_arm  # ARM64 Linux (AWS Graviton, Raspberry Pi)
dinou build:deno:compile:mac        # Apple macOS binary
dinou build:deno:compile:win        # Microsoft Windows executable`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* 5. Bun Target */}
            <section id="bun-runtime-compile" className="mt-12">
              <h2>5. Bun Runtime &amp; Standalone Executables</h2>
              <p>
                Run your application under the high-performance Bun JavaScript runtime:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# 1. Standard Bun build and execution
dinou build:bun
dinou start:bun

# 2. Pure Bun (100% Bun execution, 0 Node.js on the machine)
dinou build:bun:pure
dinou start:bun

# 3. Standalone Bun single-file binary compilation
dinou build:bun:compile
./dist/server

# 4. Pure Bun standalone binary compilation (100% Bun from build to exe)
dinou build:bun:pure:compile
./dist/server

# Cross-compilation targets:
dinou build:bun:compile:linux      # x86_64 Linux
dinou build:bun:compile:linux_arm  # ARM64 Linux (AWS Graviton)
dinou build:bun:compile:mac        # Apple macOS (Apple Silicon)
dinou build:bun:compile:win        # Windows executable (.exe)`}
              </CodeBlock>
            </section>

            {/* 6. Static Export Target */}
            <section id="static-export" className="mt-12">
              <h2>6. Static Export (GitHub Pages, S3, CDN)</h2>
              <p>
                If your application consists purely of static or pre-rendered pages without dynamic server-side computation, you can export 100% static HTML:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# Generates complete static site in out/
dinou export-static`}
              </CodeBlock>
              <p className="text-xs text-muted-foreground mt-2">
                Deploy the generated <code>out/</code> directory directly to GitHub Pages, Cloudflare Pages, Amazon S3, Surge, or any static file server (Nginx/Apache).
              </p>
            </section>

            {/* Docker Guide */}
            <section id="docker-guide" className="mt-12">
              <h2>Production Docker Setup</h2>
              <p>
                Here is an optimized, multi-stage production <code>Dockerfile</code> for deploying Dinou on any container orchestration platform:
              </p>

              <CodeBlock
                language="dockerfile"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# Multi-Stage Production Dockerfile for Dinou
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build:node

# Production Runner Stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy minimal production artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.dinou ./.dinou
# (Optional) Only include if your project is ejected:
# COPY --from=builder /app/dinou ./dinou

# Run as non-root user for security
USER node

EXPOSE 3000
CMD ["npm", "run", "start:node"]`}
              </CodeBlock>
            </section>

            {/* Environment Secrets */}
            <section id="environment-secrets" className="mt-12">
              <h2>Managing Production Environment Secrets</h2>
              <p>
                In production, never ship a <code>.env</code> file inside your Docker container or git repository. Configure secrets directly in your hosting provider&apos;s dashboard or CLI:
              </p>
              <ul>
                <li><strong>Railway:</strong> Project Settings &rarr; Variables.</li>
                <li><strong>Fly.io:</strong> <code>fly secrets set DATABASE_URL=&quot;...&quot;</code>.</li>
                <li><strong>Netlify:</strong> Site Configuration &rarr; Environment variables.</li>
                <li><strong>Cloudflare:</strong> <code>wrangler secret put MY_SECRET</code>.</li>
                <li><strong>Deno Deploy:</strong> Project Settings &rarr; Environment Variables (or via <code>deno deploy</code>).</li>
              </ul>
            </section>

            {/* Production Checklist */}
            <section id="deployment-checklist" className="mt-12">
              <h2>Production Pre-Flight Checklist</h2>
              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Deployment Checklist</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Validate Build Locally:</strong> Run <code>npm run build:node &amp;&amp; npm run start:node</code> locally to verify clean compilation before pushing to CI/CD.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Environment Variables Configured:</strong> Verify database connection strings and third-party API keys are set in your platform dashboard.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Static Asset Caching:</strong> Fast browser caching for instant subsequent loads (handled automatically by Dinou for all hashed bundles in <code>/assets/*</code>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>SSL / HTTPS Active:</strong> Ensure your production domain uses HTTPS (automatic on Netlify, Cloudflare, Railway, and Fly.io; configure via Caddy or Nginx with Let&apos;s Encrypt if using a self-hosted VPS).</span>
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
