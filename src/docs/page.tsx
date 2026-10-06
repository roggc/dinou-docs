import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Button } from "@/docs/components/ui/button";
import { Badge } from "@/docs/components/ui/badge";
import {
  Cpu,
  Zap,
  Route,
  Database,
  ArrowRight,
  Boxes,
  ShieldCheck,
  Layers,
  Globe,
  Sparkles,
  Box,
  Package,
  Rocket,
  CheckCircle2,
  RefreshCw,
  FolderTree,
  Clock,
  Brain,
  Terminal,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "quick-start", title: "1. Quick Start in 30 Seconds", level: 2 },
  { id: "core-capabilities", title: "2. Core Capabilities", level: 2 },
  { id: "why-dinou-preview", title: "3. Why Dinou? Origin & Evolution", level: 2 },
  { id: "ai-friendly", title: "4. AI-Friendly by Design", level: 2 },
  { id: "project-structure", title: "5. Project Anatomy & Conventions", level: 2 },
  { id: "next-steps", title: "6. Next Steps & Guides", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-8 lg:py-10 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Hero Header */}
          <div className="mb-10 space-y-4">
            <div className="inline-flex items-center gap-2">
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 text-xs font-mono font-medium border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 rounded-full"
              >
                <Sparkles className="w-3 h-3 mr-1 text-blue-500" />
                Dinou v7
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                React 19 Framework
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Introduction to Dinou
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A transparent, lightweight, and 100% ejectable React 19 framework.
              Built on web standards with intuitive file-system routing, predictable caching, and multi-runtime freedom.
            </p>

            {/* Badges Bar */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary" className="text-xs font-mono">React 19 Native</Badge>
              <Badge variant="secondary" className="text-xs font-mono">Tri-Bundler (esbuild / Rollup / Webpack)</Badge>
              <Badge variant="secondary" className="text-xs font-mono">2D Caching &amp; PPR</Badge>
              <Badge variant="secondary" className="text-xs font-mono">100% Ejectable</Badge>
              <Badge variant="secondary" className="text-xs font-mono">Universal Deploy</Badge>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: Quick Start */}
            <section id="quick-start" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Quick Start in 30 Seconds
              </h2>
              <p>
                The fastest way to get started with Dinou is using the official CLI starter:
              </p>

              <div className="not-prose my-4 space-y-3">
                <CodeBlock language="bash">
                  {`# Create a new project with the interactive wizard
npx create-dinou-app@latest my-app

# Navigate to project and launch dev server
cd my-app
npm run dev`}
                </CodeBlock>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 not-prose">
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 block sm:inline">Instant Dev Server:</span>{" "}
                  Boots on <code>http://localhost:3000</code> with in-memory Hot Module Replacement (HMR) and instant CSS reload.
                </div>
                <Button variant="outline" size="sm" asChild className="shrink-0 text-xs">
                  <Link href="/docs/getting-started" className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    Installation Guide
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </Button>
              </div>
            </section>

            {/* Section 2: Core Capabilities */}
            <section id="core-capabilities" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-6">
                2. Core Capabilities
              </h2>
              <p className="text-muted-foreground mb-6">
                Dinou provides a complete, modern toolchain focused on clarity, performance, and developer freedom:
              </p>

              <div className="space-y-6 not-prose">
                {/* 3.1 React 19 & RSC */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span>React 19 &amp; RSC First-Class</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Components render on the server by default with zero client JavaScript overhead.</li>
                    <li>Native support for Server Actions and Server Functions (<code>&apos;use server&apos;</code>).</li>
                    <li>Direct integration with React 19 Suspense streaming for fast, progressive UI delivery.</li>
                  </ul>
                </div>

                {/* 3.2 Suspense-Wrapped Server Functions */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Suspense-Wrapped Server Functions from Client Components</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Seamlessly call asynchronous server functions directly from client components (<code>&apos;use client&apos;</code>) wrapped inside <code>&lt;Suspense&gt;</code> boundaries.</li>
                    <li>Eliminates boilerplate API routes, synthetic fetch hooks, and manual loading state management.</li>
                    <li>The server executes the logic and streams the response directly to the client fallback.</li>
                  </ul>
                </div>

                {/* 3.3 Static by Default (SSG), ISR & Dynamic SSR */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Static by Default (SSG), ISR &amp; Dynamic SSR</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Routes are pre-rendered statically by default (SSG) for maximum performance and instant CDN delivery.</li>
                    <li>Incremental Static Regeneration (ISR) is declared simply with <code>revalidate</code> in <strong>seconds</strong> (e.g. <code>revalidate = 60</code>) in companion <code>page_functions.ts</code> files.</li>
                    <li>Live on-demand server rendering (SSR) is activated whenever <code>revalidate = 0</code> or dynamic request parameters are accessed.</li>
                    <li>Clean server data fetching: <code>getProps</code> returns data directly passed to your component as typed props.</li>
                  </ul>
                </div>

                {/* 3.4 2D Layered Caching & PPR */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Layers className="w-4 h-4 text-cyan-500" />
                    <span>2D Layered Caching &amp; Partial Prerendering (PPR)</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li><strong>Horizontal layout caching:</strong> Layouts define their own TTLs via <code>layout_functions.ts</code>, preserving layout state across route transitions without unmounting or re-rendering child trees.</li>
                    <li><strong>Vertical component caching:</strong> Micro-cache expensive Server Components with <code>&lt;DinouCacheSlot&gt;</code> and refresh them independently from the client.</li>
                    <li><strong>Partial Prerendering (PPR):</strong> Serve an instant static shell at edge CDN latency (&lt;20ms) while dynamic components concurrently stream into Suspense holes.</li>
                  </ul>
                </div>

                {/* 3.5 Intuitive File-System Router */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <FolderTree className="w-4 h-4 text-indigo-500" />
                    <span>Intuitive File-System Router</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Clean file structure inside <code>src/</code> where folders directly map to URLs.</li>
                    <li>Support for nested layouts (<code>layout.tsx</code>), dynamic parameter segments (<code>[slug]</code>), and route groups.</li>
                    <li>Routing-ignored folders prefixed with <code>_</code> (e.g. <code>_draft</code>, <code>_legacy</code>) allow you to collocate scratch work or private modules without exposing them as endpoints.</li>
                  </ul>
                </div>

                {/* 3.6 Type-Safe Routing & Compile-Time Autocompletion */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    <span>Type-Safe Routing &amp; Compile-Time Autocompletion</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Automatic TypeScript route generation provides full IDE autocompletion for <code>&lt;Link href=&quot;...&quot;&gt;</code> and navigation hooks.</li>
                    <li>Zero runtime overhead: route type checking happens during compilation with zero bytes added to the client bundle.</li>
                    <li>Compile-time dead-link validation prevents broken links from reaching production.</li>
                  </ul>
                </div>

                {/* 3.7 Universal Multi-Runtime Deployment */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span>Universal Multi-Runtime Deployment (Deploy Everywhere)</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Deploy the exact same application code to Node.js servers, Bun standalone single-binary executables, Deno, or Cloudflare Workers at the edge.</li>
                    <li>Supports pure static site export (SSG) for static hosts like Netlify, Vercel, or GitHub Pages.</li>
                  </ul>
                </div>

                {/* 3.8 Single-Process In-Memory Dual Engine */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Cpu className="w-4 h-4 text-emerald-500" />
                    <span>Single-Process In-Memory Dual Engine</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Runs both the React Server Component (RSC) compiler and the SSR engine concurrently within a <strong>single in-memory process</strong>.</li>
                    <li>Eliminates <code>child_process.fork()</code>, removing inter-process communication (IPC) serialization bottlenecks and halving memory consumption.</li>
                    <li>Enables native compatibility with edge and isolated runtimes (Cloudflare Workers, Bun, Deno) where process spawning is strictly prohibited.</li>
                  </ul>
                </div>

                {/* 3.9 Zero-Disk In-Memory Dev DX */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <RefreshCw className="w-4 h-4 text-rose-500" />
                    <span>Zero-Disk In-Memory Dev Experience (DX)</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Development builds emit directly to in-memory buffers, completely bypassing disk I/O.</li>
                    <li>Instant React Fast Refresh, live CSS injection, and rapid SWC transform caching.</li>
                  </ul>
                </div>

                {/* 3.10 Tri-Bundler Freedom */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Boxes className="w-4 h-4 text-teal-500" />
                    <span>Tri-Bundler Freedom (esbuild, Rollup, Webpack)</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Default to <strong>esbuild</strong> for blazing fast development bundling and lightning-quick compilation.</li>
                    <li>Switch seamlessly to <strong>Rollup</strong> or <strong>Webpack</strong> in <code>dinou.config.ts</code> whenever your application needs specialized enterprise plugins or legacy transforms with complete feature parity.</li>
                  </ul>
                </div>

                {/* 3.11 100% Ejectable Architecture */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Box className="w-4 h-4 text-amber-500" />
                    <span>100% Ejectable Architecture (Total Stack Ownership)</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Run <code>npm run eject</code> at any time: Dinou copies its entire internal engine, server, and bundler configurations directly into your repository.</li>
                    <li>Inspect, customize, or maintain the framework code on your own terms with zero vendor lock-in or dependency on closed-source packages.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Why Dinou? Origin & Evolution */}
            <section id="why-dinou-preview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Why Dinou? Origin &amp; Evolution
              </h2>
              <p>
                To understand Dinou, it helps to understand the real problem that sparked its creation.
              </p>

              <div className="space-y-4 not-prose my-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-base">
                    <Rocket className="w-4 h-4 text-blue-500" />
                    The Origin: Seamless Suspense &amp; Server Functions
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Dinou started with a very concrete need in modern React development: <strong>calling Server Functions (<code>&apos;use server&apos;</code>) wrapped in React <code>Suspense</code> directly from Client Components</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Existing frameworks either did not allow this pattern, treated it as an edge case, or forced developers into heavy workarounds—writing synthetic REST/GraphQL endpoints, manual <code>fetch</code> wrappers, and complex client-side state flags just to stream a server result into a UI fallback.
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    The initial mission of Dinou was simple and direct: build a clean execution engine where a Client Component could invoke an asynchronous server action naturally inside a standard React 19 <code>&lt;Suspense&gt;</code> boundary, letting React handle streaming and fallbacks the way it was designed to.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-base">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    The Evolution: A Transparent Full-Stack Framework
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Solving that core problem cleanly required opening up the framework black box. Rather than piling monkey-patches onto an opaque compiler, Dinou was re-architected from first principles using standard Web APIs (<code>Request</code>, <code>Response</code>, <code>ReadableStream</code>).
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    From that foundation, Dinou naturally evolved into a complete full-stack framework: adding independent layout caching (<code>layout_functions.ts</code>), micro-caching with <code>&lt;DinouCacheSlot&gt;</code>, Partial Prerendering (PPR), multi-runtime portability (Node, Bun, Deno, Cloudflare Workers), and a 100% ejectable codebase.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: AI-Friendly by Design */}
            <section id="ai-friendly" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. AI-Friendly by Design
              </h2>
              <p>
                In the era of AI coding assistants (such as Google Antigravity, Claude, ChatGPT, and Cursor), framework architecture must be re-evaluated. Large, monolithic frameworks with deeply nested proprietary abstractions require excessive context exploration and frequently lead to hallucinations when asking AI models to debug or extend application code.
              </p>
              <p>
                <strong>Dinou is engineered to be readily analyzed, understood, and modified by both human developers and AI agents.</strong> Its engine is lean, transparent, and strictly adheres to standard React and web platform primitives.
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-sm font-bold">Complete Context Ingestion</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    AI assistants can easily ingest and comprehend Dinou&apos;s entire file router, in-process dual-bundle compilation engine, and runtime adapters within a single prompt context, eliminating guesswork and out-of-context hallucinations.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <h4 className="text-sm font-bold">Deterministic Bug Diagnosis</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Transparent execution paths and standard web primitives (W3C Fetch <code>Request</code>/<code>Response</code>, native Web Streams) enable AI agents to diagnose bugs accurately and propose exact, working patches on the first attempt without breaking hidden framework macros.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="text-sm font-bold">Autonomous Ejected Customization</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When you run <code>npm run eject</code>, an AI assistant can immediately help you implement custom edge middlewares, tailor compilation plugins, or build custom streaming handlers directly in your codebase with full visibility into the server engine.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Project Anatomy & Conventions */}
            <section id="project-structure" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Project Anatomy &amp; Conventions
              </h2>
              <p>
                Dinou projects follow clean, predictable directory conventions. All application logic lives inside <code>src/</code>, while public assets are served directly from <code>public/</code>:
              </p>

              <div className="not-prose my-6 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-md">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/60 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-slate-400 font-medium">Directory Tree</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 overflow-x-auto">
                  <pre
                    className="!bg-transparent !p-0 !m-0 font-mono text-xs sm:text-sm leading-relaxed"
                    style={{ color: "#e2e8f0", backgroundColor: "transparent" }}
                  >
                    <code
                      className="!bg-transparent !p-0 !m-0 font-mono text-xs sm:text-sm leading-relaxed"
                      style={{ color: "#e2e8f0", backgroundColor: "transparent" }}
                    >{`my-app/
├── public/                    # Static root assets (served directly at /)
│   ├── favicon.ico
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── page.tsx               # Root page (/)
│   ├── layout.tsx             # Root layout & shell
│   ├── layout_functions.ts    # Independent layout data fetching & caching
│   ├── globals.css            # Global styles & Tailwind
│   ├── _draft/                # 🚫 Routing-ignored folder (escapes router scan)
│   │   └── page.tsx           # Never routed (returns 404 Not Found)
│   └── docs/
│       ├── page.tsx           # /docs documentation route
│       ├── page_functions.ts  # Server data fetching & revalidate seconds
│       ├── layout.tsx         # /docs nested layout & sidebar
│       └── [slug]/
│           ├── page.tsx       # Dynamic segment (/docs/:slug)
│           └── page_functions.ts # Dynamic validation & ISR
├── dinou.config.ts            # Framework configuration (bundler, ppr, onRequest)
├── package.json
└── tsconfig.json`}</code>
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 p-4 not-prose">
                <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  Routing-Ignored Folders (_ prefix)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Any folder prefixed with an underscore <code>_</code> (such as <code>_draft</code> or <code>_legacy</code>) completely{" "}
                  <strong>escapes the Dinou routing system</strong>. Even if these folders contain <code>page.tsx</code> files, they are never exposed as public endpoints. This makes them ideal for staging work-in-progress code or keeping internal helper components collocated near your routes.
                </p>
              </div>
            </section>

            {/* Section 6: Next Steps */}
            <section id="next-steps" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Next Steps &amp; Guides
              </h2>
              <p>
                Ready to build with Dinou? Explore the dedicated guides below to master each part of the framework:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Link
                  href="/docs/getting-started"
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-blue-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                        <Package className="w-4 h-4" />
                      </div>
                      <span>Installation &amp; Setup</span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    CLI scaffolding, manual setup, package scripts, and prerequisites.
                  </p>
                </Link>

                <Link
                  href="/docs/server-client-components"
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-purple-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 shrink-0">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span>Server &amp; Client Components</span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Master the boundary between React Server Components and interactive client components.
                  </p>
                </Link>

                <Link
                  href="/docs/routing"
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-emerald-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                        <Route className="w-4 h-4" />
                      </div>
                      <span>Routing &amp; Layouts</span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    File-system routing, dynamic parameters, and nested layouts.
                  </p>
                </Link>

                <Link
                  href="/docs/data-fetching"
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-cyan-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <span>Data Fetching &amp; ISR</span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Mastering <code>getProps</code>, <code>revalidate</code> in seconds, and cache tags.
                  </p>
                </Link>

                <Link
                  href="/docs/rendering"
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-amber-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span>Rendering Strategies &amp; PPR</span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    PPR, static bailout, micro-caching with <code>&lt;DinouCacheSlot&gt;</code>.
                  </p>
                </Link>

                <Link
                  href="/docs/deployment"
                  className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-rose-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500 shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <span>Universal Deployment</span>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-rose-600 dark:group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Targeting Node.js, Bun standalone, Deno, and Cloudflare Workers.
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-8 lg:py-10 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
