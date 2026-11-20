import { Link } from "dinou";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Hammer,
  Sparkles,
  FolderTree,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Layers,
  Server,
  Cloud,
  RotateCcw,
  Sliders,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Badge } from "@/docs/components/ui/badge";

const tocItems = [
  { id: "eject-dinou", title: "Ejecting Dinou: Framework Sovereignty", level: 2 },
  { id: "how-to-eject", title: "How to Eject (CLI & Scripts)", level: 2 },
  { id: "what-happens", title: "What Happens When You Eject?", level: 2 },
  { id: "directory-anatomy", title: "Anatomy of the Ejected dinou/ Directory", level: 2 },
  { id: "ejected-vendoring", title: "Dual-Mode Vendoring (-u & build:vendors)", level: 2 },
  { id: "when-to-eject", title: "When to Consider Ejecting", level: 2 },
  { id: "agentic-era", title: "Ejection in the Agentic Era", level: 2 },
  { id: "customization-examples", title: "Practical Customization Examples", level: 2 },
  { id: "custom-middleware", title: "1. Low-Level HTTP Pipeline & Edge Guards", level: 3 },
  { id: "custom-bundler", title: "2. Extending the Bundler Pipeline", level: 3 },
  { id: "reverting-eject", title: "Reverting an Eject (npm run uneject)", level: 2 },
  { id: "best-practices", title: "Best Practices for Ejected Projects", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Eject Dinou | Dinou Docs</title>
      <meta
        name="description"
        content="Gain complete ownership over your technology stack. Eject Dinou into ./dinou to customize the React 19 Dual-Bundle compiler, runtime adapters, and HTTP engine—and revert anytime with npm run uneject."
      />
      <link rel="canonical" href="https://dinou.dev/docs/eject" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Framework Sovereignty
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                100% Reversible
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Eject Dinou
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Gain complete ownership over your technology stack. Eject Dinou to unpack the entire React 19 Dual-Bundle compiler, runtime adapters, and server streaming engine directly into your repository—and revert anytime with a single command.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview & Philosophy */}
            <section id="eject-dinou" className="scroll-mt-20">
              <h2>Ejecting Dinou: Framework Sovereignty</h2>
              <p>
                In most modern web frameworks, the server runtime, bundling logic, and React Server Component compiler are hidden behind opaque <code>node_modules</code> dependencies. If you encounter an edge-case bug, need a bespoke compilation transform, or want to deploy to an unsupported infrastructure, you are forced to wait for upstream releases or maintain fragile monkey-patches.
              </p>
              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-6">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>100% Configurable, Hackable &amp; Reversible</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ejecting extracts the entire framework into a local <code>./dinou</code> directory at the root of your project, making your tech stack 100% transparent and editable—while keeping your application code in <code>src/</code> untouched and allowing you to revert back to <code>node_modules/dinou</code> whenever you want via <code>npm run uneject</code>.
                </p>
              </div>
            </section>

            {/* How to Eject */}
            <section id="how-to-eject" className="mt-12 scroll-mt-20">
              <h2>How to Eject (CLI &amp; Scripts)</h2>
              <p>
                You can eject Dinou at any point in your project lifecycle with a single command:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# Using the Dinou CLI directly (npm, pnpm, yarn, or bun)
npx dinou eject

# Or using your package.json script (included in create-dinou starters)
npm run eject`}
              </CodeBlock>
              <p className="text-xs text-muted-foreground mt-2">
                Once ejected, running <code>dinou eject</code> again safely exits without overwriting your local <code>./dinou</code> customizations.
              </p>
            </section>

            {/* What Happens When You Eject */}
            <section id="what-happens" className="mt-12 scroll-mt-20">
              <h2>What Happens When You Eject?</h2>
              <p>
                When you run <code>dinou eject</code>, Dinou executes five automated steps across <code>npm</code>, <code>pnpm</code>, <code>yarn</code>, and <code>bun</code>:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose space-y-4 my-4">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Framework Source Extraction</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Copies the complete Dinou engine into <code>./dinou</code> at your project root—including the universal HTTP handler, Dual-Bundle RSC/SSR compilers, all three client bundlers (<Link href="/docs/bundlers" className="underline underline-offset-4 hover:text-foreground">Esbuild, Rollup, and Webpack</Link>), all <Link href="/docs/deployment" className="underline underline-offset-4 hover:text-foreground">five runtime targets</Link>, TypeScript <code>.d.ts</code> definitions, and the 31 pre-compiled ESM toolchain vendors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Selective Script Rewriting (Preserving Your <code>package.json</code>)</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Inspects your existing <code>package.json</code> <code>&quot;scripts&quot;</code> and rewrites <strong>only</strong> the Dinou scripts you already had (e.g. <code>&quot;dev&quot;: &quot;node dinou/cli.js dev&quot;</code>, <code>&quot;build&quot;: &quot;node dinou/cli.js build&quot;</code>, <code>&quot;start&quot;: &quot;node dinou/cli.js start&quot;</code>)—leaving custom scripts like <code>lint</code> or <code>test</code> untouched—while replacing <code>&quot;eject&quot;</code> with <code>&quot;build:vendors&quot;</code> and <code>&quot;uneject&quot;</code>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Local Workspace Linking (<code>&quot;dinou&quot;: &quot;file:./dinou&quot;</code>)</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Points <code>dependencies.dinou</code> to <code>&quot;file:./dinou&quot;</code>, cleans up any duplicate entry in <code>devDependencies</code>, and automatically detects your package manager (<code>npm</code>, <code>pnpm</code>, <code>yarn</code>, or <code>bun</code>) to link all transitive peer/runtime dependencies and IDE TypeScript types.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Direct Live Module Resolution Across All Bundlers</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Esbuild, Rollup, Webpack, and the server Dual-Bundle compilers automatically detect <code>./dinou</code> and resolve <code>&quot;dinou&quot;</code>, <code>&quot;dinou/server&quot;</code>, <code>&quot;dinou/config&quot;</code>, and <code>&quot;dinou/adapters/*&quot;</code> directly to your local <code>./dinou</code> source files—even under <code>pnpm</code> or <code>yarn</code> where <code>file:./dinou</code> creates a static snapshot in <code>node_modules</code>. Every edit inside <code>./dinou</code> takes effect immediately without reinstalling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Zero Application Disruption</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Your routes, layouts, slots, Server Functions, and styles in <code>src/</code> remain 100% unchanged, and your root <code>package.json</code> stays completely clean.
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock
                language="json"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// Example package.json after running "npx dinou eject" on a minimal project:
{
  "scripts": {
    "dev": "node dinou/cli.js dev",
    "build": "node dinou/cli.js build",
    "start": "node dinou/cli.js start",
    "lint": "eslint src",
    "build:vendors": "node dinou/cli.js build:vendors",
    "uneject": "node dinou/cli.js uneject"
  },
  "dependencies": {
    "dinou": "file:./dinou",
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  }
}`}
              </CodeBlock>
            </section>

            {/* Anatomy of Ejected Directory */}
            <section id="directory-anatomy" className="mt-12 scroll-mt-20">
              <h2>Anatomy of the Ejected <code>dinou/</code> Directory</h2>
              <p>
                Once ejected, your repository contains a self-contained <code>dinou/</code> package with its own encapsulated <code>package.json</code>, TypeScript declarations, and runtime modules:
              </p>

              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`dinou/
├── cli.js                          # Unified CLI orchestrator (dev, build, start, export-static, typegen, uneject)
├── index.js / index.d.ts           # Public client & universal exports (Link, hooks, defineConfig, getContext)
├── server.js / server.d.ts         # Server-only exports (DinouCacheSlot, revalidate*, StorageAdapters)
├── package.json                    # Encapsulated #... subpath imports & runtime dependencies
│
├── core/                           # Universal Web-Standards Framework Engine
│   ├── handler.js                  # HTTP request pipeline, routing, ISR, PPR & Server Functions
│   ├── edge-ssr.js                 # Streaming Flight-to-HTML SSR renderer
│   ├── cache-slot.js               # 3D Layered Micro-ISR (<DinouCacheSlot>) & surgical splicing
│   ├── cache-revalidate.js         # O(1) path/page/layout/tag revalidation & lazy HTML re-composition
│   ├── storage-adapter.js          # Pluggable KV & filesystem ISR cache adapters
│   ├── load-dinou-config.js        # dinou.config.* & setupFiles loader + AOT server bootstrap
│   ├── resolve-contextual-dinou.js # Contextual "./dinou" route helpers & ejected specifier resolver
│   └── uneject.js                  # Transactional uneject engine & selective script rewriter
│
├── compiled/                       # 31 Pre-bundled ESM Toolchain Vendors (Instant Cold Starts)
│   ├── babel-core/                 # Bundled Babel AST & React Compiler bridge
│   ├── tailwindcss-postcss/        # Pre-compiled PostCSS & Tailwind v4 CSS pipeline
│   └── vendors-manifest.json       # Vendor build sizes & timestamp manifest
│
├── scripts/
│   └── build-vendors.js            # Multi-root compiler for regenerating ./dinou/compiled/
│
├── adapters/                       # Thin Production Runtime Entrypoints
│   ├── node.js                     # Standalone Node.js HTTP streaming server
│   ├── netlify.js                  # Netlify Functions v2 entry wrapper (.dinou/netlify/functions/ssr.mjs)
│   ├── cloudflare.js               # Cloudflare Workers Fetch handler (.dinou/cloudflare/worker.js)
│   ├── bun.js                      # Native Bun.serve() adapter (.dinou/bun/server.js)
│   └── deno.js                     # Native Deno.serve() adapter (.dinou/deno/main.js)
│
├── esbuild/ · rollup/ · webpack/   # Client Bundler Pipelines & Custom Plugins/Loaders
│
└── node/ · bun/ · deno/ · cloudflare/
    └── ...                         # Dual-Bundle RSC/SSR compilers (bundle-dual-engine.js, dev.js, build.js)`}
              </CodeBlock>

              <div className="mt-4 p-4 rounded-xl border bg-card not-prose flex items-start gap-3">
                <FolderTree className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Explore with your AI coding agent:</strong> Every module inside <code>./dinou</code> is unminified, readable ESM JavaScript built on standard Web <code>Request</code> / <code>Response</code> streams. Point Gemini Antigravity, Claude Code, Cursor, or Copilot directly at <code>./dinou</code> to trace execution flows or implement custom runtime features with zero guesswork.
                </div>
              </div>
            </section>

            {/* Dual-Mode Vendoring in Ejected Projects */}
            <section id="ejected-vendoring" className="mt-12 scroll-mt-20">
              <h2>Dual-Mode Vendoring in Ejected Projects (<code>-u</code> &amp; <code>build:vendors</code>)</h2>
              <p>
                Ejected projects preserve Dinou&apos;s <strong>Dual-Mode Additive Vendoring</strong> through Node.js Subpath Imports (<code>#commander</code>, <code>#babel/core</code>, <code>#postcss</code>, etc.) encapsulated inside <code>./dinou/package.json</code>—never polluting your root <code>package.json</code>:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <span>1. Default Vendorized Mode</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Running <code>npm run dev</code> or <code>npm run build</code> loads all <strong>31</strong> internal toolchain dependencies directly from <code>./dinou/compiled/</code> for instant cold starts across Node.js and Bun.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Sliders className="h-4 w-4 text-blue-500" />
                    <span>2. Unvendorized Mode (<code>-u</code>)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Passing <code>-u</code> / <code>--unvendorized</code> (or setting <code>DINOU_UNVENDORIZED=true</code>) activates <code>--conditions=unvendorized</code>, bypassing <code>./dinou/compiled/</code> and resolving live packages from <code>node_modules</code>.
                  </p>
                </div>
              </div>

              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# 1. Override or upgrade a toolchain package in your root package.json (e.g. autoprefixer or @babel/core),
#    then test it live from node_modules with -u:
npm run dev -- -u

# 2. Recompile all 31 ESM bundles in ./dinou/compiled/ (resolving overrides from your project root first):
npm run build:vendors`}
              </CodeBlock>
            </section>

            {/* When to Eject */}
            <section id="when-to-eject" className="mt-12 scroll-mt-20">
              <h2>When to Consider Ejecting</h2>
              <p>
                Most applications never need to eject—Dinou&apos;s <Link href="/docs/plugins">Configuration &amp; Plugin System (<code>dinou.config.ts</code>)</Link> deliberately covers <code>onRequest</code> middleware, Node <code>configureServer</code> hooks, <code>setupFiles</code>, pluggable <code>storage</code> adapters, custom <code>assetExtensions</code>, <code>ppr</code>, <code>allowISG</code>, <code>reactCompiler</code>, and <code>reactStrictMode</code> without adding configuration bloat. Ejecting becomes genuinely valuable when you need capabilities that live below <code>dinou.config.ts</code>:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Layers className="h-4 w-4 text-emerald-500" />
                    <span>Bundlers, PostCSS, Babel &amp; Source Maps</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Add specialized compiler plugins and loaders—such as <strong>MDX</strong>, <strong>SVGR</strong> (importing <code>.svg</code> as React components), <code>.graphql</code>, Sass/Less, bundle analyzers, or advanced <code>babel-plugin-react-compiler</code> options—or enable <strong>production source maps</strong> (for Sentry/Datadog) and custom JS targets directly inside <code>dinou/esbuild/</code>, <code>dinou/rollup/</code>, <code>dinou/webpack/</code>, and <code>dinou/core/postcss-pipeline.js</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Server className="h-4 w-4 text-amber-500" />
                    <span>HTML Bootstrap, Streaming, Router &amp; Internal Policies</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Inject strict <strong>CSP <code>nonce</code> attributes</strong> onto Dinou&apos;s inline bootstrap scripts and <code>importmap</code>, attach post-stream <code>Server-Timing</code> headers, customize the client SPA router in <code>dinou/core/client.jsx</code> (scroll restoration, View Transitions, stale-chunk recovery after deploys), or tune internal <code>Cache-Control</code>, CSRF origin, and anti-bot policies in <code>dinou/core/handler.js</code> and <code>dinou/core/static-assets.js</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Cloud className="h-4 w-4 text-emerald-500" />
                    <span>Unsupported Deployment Targets</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Package your app for <strong>Vercel</strong>, <strong>AWS Lambda Response Streaming</strong>, <strong>Fastly Compute</strong>, <strong>Electron / Tauri</strong> desktop shells, or custom internal microVMs by writing a dedicated runtime adapter in <code>dinou/adapters/</code> and Dual-Bundle build script.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Hammer className="h-4 w-4 text-amber-500" />
                    <span>Instant Hotfixes, Deep Debugging &amp; Compliance Audits</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Trace subtle hydration, PPR, or cache-slot edge cases straight into readable repository files instead of <code>node_modules</code>, satisfy regulated environments requiring 100% auditable server code in Git, or ship a critical framework hotfix immediately—then run <code>npm run uneject</code> once the upstream release lands.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5 sm:col-span-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    <span>Reversible AI-Assisted Inspection &amp; Prototyping</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Give your coding agent full, grounded visibility into the exact server and compiler code your app runs—eliminating black-box guesswork during complex debugging or architectural prototyping—knowing you can cleanly return to the managed npm package anytime with <code>npm run uneject</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* Ejection in the Agentic Era */}
            <section id="agentic-era" className="mt-12 scroll-mt-20">
              <h2>Ejection in the Agentic Era</h2>
              <p>
                In the era of autonomous coding agents (<strong>Gemini Antigravity</strong>, <strong>Claude Code</strong>, <strong>Cursor</strong>, and <strong>Copilot</strong>), framework ejection evolves from a legacy last resort into a <strong>strategic superpower</strong>.
              </p>

              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-5 bg-card not-prose space-y-4 my-6">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                  <span>Unlocking End-to-End Agent Autonomy</span>
                </div>
                <div className="text-xs leading-relaxed text-muted-foreground space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Breaking the <code>node_modules</code> Boundary:</strong> Coding agents operate best on tracked source files inside your workspace. Ejecting places the entire RSC/SSR compiler and HTTP runtime inside your agent&apos;s editable workspace.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Grounded Reasoning, Zero Hallucinations:</strong> Rather than guessing how a black-box meta-framework schedules Suspense boundaries or caches Flight payloads, your agent reads clean, deterministic Web Standards code directly on disk.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Safe Exploration Loop:</strong> Eject so your agent can inspect or prototype deep runtime changes, verify them against your test suite, and run <code>npm run uneject</code> anytime if you decide to stay on the managed package.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Customization Examples */}
            <section id="customization-examples" className="mt-12 scroll-mt-20">
              <h2>Practical Customization Examples</h2>
              <p>
                Here are two real-world ways teams customize an ejected Dinou codebase:
              </p>

              {/* Example 1 */}
              <section id="custom-middleware" className="my-6 scroll-mt-20">
                <h3>1. Low-Level HTTP Pipeline &amp; Edge Guards</h3>
                <p>
                  While standard auth guards and request hooks are best implemented via <Link href="/docs/plugins"><code>plugin.onRequest</code> in <code>dinou.config.ts</code></Link>, ejecting lets you customize the raw Web <code>Request</code> / <code>Response</code> pipeline in <code>dinou/core/handler.js</code>—even ahead of static asset lookup or RSC Flight routing:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou/core/handler.js
// Rename the built-in handleRequest() to runCorePipeline(), then wrap it:
async function handleRequest(request, platformContext = {}) {
  const url = new URL(request.url);

  // 1. Ultra-fast zero-allocation health probe before static/RSC routing
  if (url.pathname === "/healthz") {
    return Response.json({ status: "ok", region: platformContext?.env?.REGION ?? "local" });
  }

  // 2. Attach custom Server-Timing telemetry around the entire RSC/SSR stream
  const t0 = performance.now();
  const response = await runCorePipeline(request, platformContext);
  const headers = new Headers(response.headers);
  headers.append("Server-Timing", \`dinou;dur=\${(performance.now() - t0).toFixed(2)}\`);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}`}
                </CodeBlock>
              </section>

              {/* Example 2 */}
              <section id="custom-bundler" className="my-6 scroll-mt-20">
                <h3>2. Extending the Bundler Pipeline</h3>
                <p>
                  To register a custom Esbuild plugin (such as a build-time SVG sprite compiler or MDX transform) across all client production builds, edit <code>dinou/esbuild/helpers-esbuild/get-config-esbuild-prod.js</code>:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou/esbuild/helpers-esbuild/get-config-esbuild-prod.js
import { mySvgSpritePlugin } from "../plugins-esbuild/my-svg-sprite-plugin.js";

export default function getConfigEsbuildProd(options) {
  // ...existing Dinou plugins (contextual ./dinou, tsconfig aliases, CSS, RSC manifest, React Compiler)
  let plugins = [
    mySvgSpritePlugin(),
    esbuildContextualDinouPlugin({ projectRoot }),
    // ...rest of pipeline
  ].filter(Boolean);

  return {
    // ...standard Esbuild ESM splitting configuration
    plugins,
  };
}`}
                </CodeBlock>
              </section>
            </section>

            {/* Reverting an Eject */}
            <section id="reverting-eject" className="mt-12 scroll-mt-20">
              <h2>Reverting an Eject (<code>npm run uneject</code>)</h2>
              <p>
                In traditional frameworks, ejecting is an irreversible one-way door. In Dinou, <strong>reverting an eject takes a single command</strong>.
              </p>

              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# Revert to the latest published dinou release on npm (prompts for y/N confirmation):
npm run uneject

# Skip the interactive (y/N) prompt in CI or automated scripts with -y / --yes:
npm run uneject -- -y

# Or pin a specific version, tag, or local tarball:
node dinou/cli.js uneject 9.4.0
node dinou/cli.js uneject file:../dinou-9.4.0.tgz -y`}
              </CodeBlock>

              <div className="border rounded-xl p-5 bg-card not-prose space-y-3 my-6">
                <div className="flex items-center gap-2 font-semibold text-sm text-blue-600 dark:text-blue-400">
                  <RotateCcw className="h-4 w-4" />
                  <span>What <code>dinou uneject</code> Does Automatically (Transactionally)</span>
                </div>
                <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside leading-relaxed">
                  <li>
                    <strong className="text-foreground">Confirms Before Deleting <code>./dinou</code>:</strong> Prompts <code>Are you sure you want to uneject? This will permanently delete your local ./dinou directory. (y/N)</code> (defaulting safely to <code>N</code> unless you confirm with <code>y</code> or pass <code>-y</code> / <code>--yes</code>).
                  </li>
                  <li>
                    <strong className="text-foreground">Restores <code>package.json</code> Scripts:</strong> Rewrites every <code>node dinou/cli.js &lt;cmd&gt;</code> script back to <code>dinou &lt;cmd&gt;</code>, removes <code>uneject</code> and <code>build:vendors</code>, and restores <code>&quot;eject&quot;: &quot;dinou eject&quot;</code>—preserving all your custom scripts untouched.
                  </li>
                  <li>
                    <strong className="text-foreground">Installs Upstream <code>dinou</code>:</strong> Detects your package manager (<code>npm</code>, <code>pnpm</code>, <code>yarn</code>, or <code>bun</code>) and installs <code>dinou@latest</code> (or your requested version/tarball) into <code>node_modules</code>. If installation fails (for example, while offline), Dinou automatically rolls back <code>package.json</code> and leaves <code>./dinou</code> intact!
                  </li>
                  <li>
                    <strong className="text-foreground">Removes <code>./dinou</code>:</strong> Deletes the local <code>./dinou</code> directory once the package installation succeeds (pass <code>--keep-dinou</code> if you prefer to keep a local copy for reference, or <code>--skip-install</code> in offline CI environments).
                  </li>
                </ol>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 not-prose flex items-start gap-3 my-6">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    True Zero Lock-In &amp; Framework Sovereignty
                  </p>
                  <p>
                    Eject anytime to inspect an internal flow, benchmark custom compiler tweaks, or pair-program on the runtime with your AI coding agent—then run <code>npm run uneject</code> whenever you want to return to upstream releases. You never risk getting trapped in a dead-end fork.
                  </p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mt-12 scroll-mt-20">
              <h2>Best Practices for Ejected Projects</h2>
              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Ejected Project Recommendations</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Commit <code>dinou/</code> to Git:</strong> Track your ejected <code>./dinou</code> directory in version control so teammates, CI pipelines, and production Docker builds run identical framework code—and so <code>git diff dinou/</code> gives you an instant changelog of your custom patches.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Prefer <code>dinou.config.ts</code> Plugins First:</strong> Keep standard request middleware, auth redirects, and startup hooks in <Link href="/docs/plugins" className="underline underline-offset-4 hover:text-foreground"><code>dinou.config.ts</code></Link> so they survive <code>npm run uneject</code> automatically, reserving <code>./dinou</code> edits for deep compiler or runtime changes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Validate Target Bundlers &amp; Vendors:</strong> After upgrading toolchain packages or modifying bundler configs, verify your target pipeline (e.g. <code>npm run build:node:esbuild</code>) and run <code>npm run build:vendors</code> if you want updated dependencies baked into <code>./dinou/compiled/</code>.</span>
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
