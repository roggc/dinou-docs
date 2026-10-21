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
  Binary,
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
  { id: "environment-secrets", title: "10. Managing Production Environment Secrets", level: 2 },
  { id: "deployment-checklist", title: "11. Production Pre-Flight Checklist", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Deployment Guide | Dinou Docs</title>
      <meta
        name="description"
        content="Universal deployment flexibility: deploy as standalone Node.js server, Docker container, Cloudflare Workers, Netlify v2, Deno, Bun, or single binary."
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
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Deployment Guide
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features universal deployment flexibility: deploy as a standalone Node.js server, on Netlify Serverless Functions v2, at the edge with Cloudflare Workers, on Deno or Bun, or compiled into single native binaries.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>1. Deploy Everywhere with Dinou</h2>
              <p>
                Historically, deploying React Server Components to serverless platforms (like Netlify) was impossible due to the need to pass the <code>--conditions react-server</code> flag. While on a VPS or custom server (like DigitalOcean) you could configure Node runtime flags, serverless and edge environments offered no control over them.
              </p>
              <p>
                <strong>Dinou solves this completely</strong>: through its pre-bundled dual-engine architecture, server bundles are compiled with all React Server conditions pre-resolved at build time. You can now deploy Dinou to virtually any infrastructure:
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
              <h2>2. Supported Deployment Targets</h2>
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

            {/* 3. Node.js Targets & Standalone Binaries */}
            <section id="node-vps-docker" className="mt-12">
              <h2>3. Node.js Targets &amp; Standalone Binaries</h2>
              <p>
                Dinou provides four production compilation and packaging pipelines for Node.js environments, catering from traditional PaaS and VPS setups to zero-dependency standalone binaries:
              </p>

              <div className="space-y-8 my-6">
                {/* 3.1 Standard Node.js Server */}
                <div id="node-standard" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-500" />
                    <h3 className="text-lg font-bold">3.1 Standard Node.js Server (build:node)</h3>
                  </div>
                  <p>
                    The standard Node.js pipeline compiles your application into a pre-bundled orchestrator at <code>.dinou/node/server.mjs</code> using Node.js:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Compile for standard Node.js production
dinou build:node

# 2. Start the production server (defaults to PORT 3000)
dinou start:node`}
                  </CodeBlock>

                  <div className="p-4 rounded-lg border bg-card space-y-1.5 not-prose">
                    <div className="font-semibold text-sm text-foreground">PaaS &amp; Cloud Hosts (Railway, Render, Fly.io, DigitalOcean App Platform)</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Set <strong>Build Command</strong> to <code>npm run build:node</code> and <strong>Start Command</strong> to <code>npm run start:node</code>. Dinou automatically respects platform-assigned ports via <code>process.env.PORT</code>, and all React Server conditions are pre-resolved at build time.
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
                    Dinou uses <strong>Node.js</strong> to build your application, then compiles the Node HTTP server orchestrator into a single, self-contained native executable in <code>dist/server</code> using Bun&apos;s compiler under the hood:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Compile standalone binary for current OS (dist/server)
dinou build:node:compile

# Run the single binary directly (no Node or Bun required on the host!)
./dist/server`}
                  </CodeBlock>

                  <p>
                    Unlike pure Bun runtime binaries which execute through Bun&apos;s HTTP engine, <code>build:node:compile</code> packages Dinou&apos;s <strong>Node.js server architecture</strong> (<code>http.createServer()</code>). This provides complete compatibility with Node WebSockets (<code>configureServer</code>), Connect/Express middlewares, and Node native modules.
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
                    While standard <code>build:node</code> requires Node.js on the build host, <code>build:node:pure</code> runs the compilation pipeline using <strong>100% Bun</strong> to generate the Node orchestrator at <code>.dinou/node/server.mjs</code>:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# 1. Build Node orchestrator using 100% Bun (zero Node.js required)
dinou build:node:pure

# 2. Run the resulting Node server
dinou start:node`}
                  </CodeBlock>
                  <p className="text-xs text-muted-foreground">
                    This mode is ideal for continuous integration pipelines and Docker builder stages where Bun is installed for hyper-fast dependency resolution and script execution.
                  </p>
                </div>

                {/* 3.4 Pure Standalone Binary */}
                <div id="node-pure-compile" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <h3 className="text-lg font-bold">3.4 Pure Standalone Binary (build:node:pure:compile)</h3>
                  </div>
                  <p>
                    The ultimate production deployment pipeline: <strong>100% Bun build pipeline</strong> combined with <strong>Bun&apos;s standalone binary compiler</strong>. It compiles Dinou&apos;s Node.js orchestrator into a single zero-dependency native executable:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Compile standalone binary using 100% Bun pipeline
dinou build:node:pure:compile

# Cross-compilation targets:
dinou build:node:pure:compile:linux      # Linux x86_64
dinou build:node:pure:compile:linux_arm  # Linux ARM64 (AWS Graviton)
dinou build:node:pure:compile:mac        # Apple macOS
dinou build:node:pure:compile:win        # Windows executable (.exe)`}
                  </CodeBlock>

                  <div className="border rounded-xl p-4 bg-muted/20 not-prose text-xs text-muted-foreground space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      Zero Node.js Runtime Required Anywhere
                    </div>
                    <p>
                      Neither the build machine nor the production target require Node.js or Bun installed. The final binary in <code>dist/server</code> contains the entire JavaScript runtime and server logic. This is the <strong>recommended pattern for Docker deployments</strong> (see <a href="#docker-pure-binary" className="text-primary underline">Section 9.1</a>).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Netlify Target */}
            <section id="netlify-serverless" className="mt-12">
              <h2>4. Netlify (Serverless Functions v2)</h2>
              <p>
                In <strong>Dinou</strong>, Netlify is a first-class supported serverless target. During <code>npm run build</code>, Dinou automatically pre-bundles a specialized <strong>Netlify Functions v2 Adapter</strong> directly into <code>.dinou/dist3/server/netlify.js</code>.
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

            {/* 5. Cloudflare Workers Target */}
            <section id="cloudflare-workers" className="mt-12">
              <h2>5. Cloudflare Workers &amp; Pages</h2>
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
{`#:schema node_modules/wrangler/config-schema.json
name = "dinou-cloudflare-app"
main = ".dinou/cloudflare/worker.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# ====================================================================
# Cloudflare Workers Static Assets
# ====================================================================
# Serves client JS/CSS bundles and pre-rendered SSG pages directly from
# Cloudflare's global edge network before requests hit the worker.
[assets]
directory = ".dinou/dist3"
binding = "ASSETS"
run_worker_first = true

# ====================================================================
# Incremental Static Regeneration (ISR / ISG) Cache
# ====================================================================
# Un-comment to enable edge-cached pages across all Cloudflare POPs
# [[kv_namespaces]]
# binding = "DINOU_CACHE"
# id = "<YOUR_KV_NAMESPACE_ID>"`}
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
                  <span>How Cloudflare Workers Works in Dinou</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dinou generates a self-contained Dual-Bundle orchestrator at <code>.dinou/cloudflare/worker.js</code>. Static assets and pre-rendered pages are served instantly by Cloudflare&apos;s global CDN through <code>env.ASSETS</code>. When bound to <code>env.DINOU_CACHE</code>, Dinou automatically activates <code>CloudflareKVStorage</code> to persist Incremental Static Regeneration (ISR) route caches across the edge. Secrets, D1 databases, and R2 buckets are injected seamlessly into Server Components via <code>getContext().env</code>.
                </p>
              </div>
            </section>

            {/* 6. Deno Deploy (deno-edge) & Compile Target */}
            <section id="deno-deploy-compile" className="mt-12">
              <h2>6. Deno Deploy (deno-edge) &amp; Standalone Binaries</h2>
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

            {/* 7. Bun Target */}
            <section id="bun-runtime-compile" className="mt-12">
              <h2>7. Bun Runtime &amp; Standalone Executables</h2>
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

            {/* 8. Static Export Target */}
            <section id="static-export" className="mt-12">
              <h2>8. Static Export (GitHub Pages, S3, CDN)</h2>
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

            {/* 9. Production Docker Setup */}
            <section id="docker-guide" className="mt-12">
              <h2>9. Production Docker Setup</h2>
              <p>
                Containerization with Dinou offers multiple strategies depending on your architecture. You can choose between an <strong>ultra-lightweight compiled binary container</strong> (zero Node.js runtime, tiny image footprint) or a <strong>standard multi-stage Node container</strong>.
              </p>

              <div className="space-y-8 my-6">
                {/* 9.1 Ultra-Lightweight Standalone Binary Container */}
                <div id="docker-pure-binary" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-emerald-500" />
                    <h3 className="text-lg font-bold">9.1 Ultra-Lightweight Standalone Binary Container (Recommended)</h3>
                  </div>
                  <p>
                    This modern recipe uses <strong>Bun in the build stage</strong> with the <code>build:node:pure:compile</code> command, and drops into an ultra-lean <strong>Debian Bookworm Slim</strong> runner. It eliminates the Node.js runtime entirely from both build and production images, while providing full support for Prisma and OpenSSL:
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

# Symlink so #!/usr/bin/env node (used by dinou bin & cross-env) executes Bun transparently
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

# Install dependencies respecting package-lock.json versions
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN bun install

# Copy application source, generate Prisma Client, and compile standalone binary
COPY . .
RUN bunx prisma generate
RUN bun run build:node:pure:compile

# ==============================================================================
# 2. Minimal Production Runner Stage
# ==============================================================================
FROM debian:bookworm-slim AS runner
WORKDIR /app

# Install CA certificates for secure HTTPS and OpenSSL for the Prisma engine
RUN apt-get update && apt-get install -y ca-certificates openssl && rm -rf /var/lib/apt/lists/*

# Copy the compiled standalone executable and the full .dinou output directory
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/.dinou ./.dinou

# Copy Prisma runtime and schema (if your project uses Prisma)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

RUN chmod +x ./server

ENV NODE_ENV=production PORT=8080
EXPOSE 8080

CMD ["./server"]`}
                  </CodeBlock>

                  <div className="rounded-xl border p-4 bg-card not-prose space-y-3 my-4">
                    <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>Why This Dockerfile Architecture is Superior:</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-5">
                      <li>
                        <strong>Symlink Trick (<code>ln -s /usr/local/bin/bun /usr/local/bin/node</code>):</strong> NPM CLI tools (such as Dinou CLI and <code>cross-env</code>) specify <code>#!/usr/bin/env node</code> in their shebang. By symlinking Bun to <code>/usr/local/bin/node</code>, Bun executes these commands natively without needing to install Node.js in the builder stage.
                      </li>
                      <li>
                        <strong>Debian Bookworm Slim vs Alpine:</strong> Prisma and other native C++ bindings depend on standard GNU libc and OpenSSL. Debian Bookworm Slim provides official glibc stability, eliminating the musl libc crashes frequently encountered with Alpine Linux, while keeping total image size under ~150MB.
                      </li>
                      <li>
                        <strong>Zero Node.js Runtime in Production:</strong> The runner container does not need Node.js or Bun installed. The executable in <code>./server</code> boots instantaneously with minimal memory footprint and zero external package dependency vulnerabilities.
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
                    If your team relies on standard Node.js base images, use this optimized multi-stage build running <code>dinou build:node</code> and <code>dinou start:node</code>:
                  </p>

                  <CodeBlock
                    language="dockerfile"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`# Multi-Stage Production Dockerfile for Dinou (Standard Node.js)
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies cleanly
COPY package*.json ./
RUN npm ci

# Copy source code and compile Node orchestrator
COPY . .
RUN npm run build:node

# Production Runner Stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000

# Copy minimal production artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.dinou ./.dinou

# Run as non-root user for security
USER node

EXPOSE 3000
CMD ["npm", "run", "start:node"]`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* 10. Environment Secrets */}
            <section id="environment-secrets" className="mt-12">
              <h2>10. Managing Production Environment Secrets</h2>
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

            {/* 11. Production Checklist */}
            <section id="deployment-checklist" className="mt-12">
              <h2>11. Production Pre-Flight Checklist</h2>
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
