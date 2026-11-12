import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Button } from "@/docs/components/ui/button";
import { Badge } from "@/docs/components/ui/badge";
import {
  Cpu,
  Zap,
  ArrowRight,
  Boxes,
  Layers,
  Globe,
  Sparkles,
  Box,
  Package,
  Rocket,
  RefreshCw,
  FolderTree,
  Clock,
  Brain,
  ShieldCheck,
} from "lucide-react";
import { Link } from "./dinou";
import { DocsPager } from "@/docs/components/docs-pager";

const tocItems = [
  { id: "quick-start", title: "1. Quick Start in 30 Seconds", level: 2 },
  { id: "core-capabilities", title: "2. Core Capabilities", level: 2 },
  { id: "why-dinou-preview", title: "3. Why Dinou? Origin & Evolution", level: 2 },
  { id: "ai-friendly", title: "4. AI-Friendly by Design", level: 2 },
  { id: "project-structure", title: "5. Project Anatomy & Conventions", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Introduction | Dinou Docs</title>
      <meta
        name="description"
        content="Official introduction to Dinou: the lightweight, ejectable React 19 full-stack framework with React Server Components and zero vendor lock-in."
      />
      <link rel="canonical" href="https://dinou.dev/docs" />

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
                Dinou
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
              <Badge variant="secondary" className="text-xs font-mono">3D Caching &amp; PPR</Badge>
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
npx create-dinou@latest my-app
# or
npm create dinou@latest my-app

# Navigate to project and launch dev server
cd my-app
npm run dev`}
                </CodeBlock>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 not-prose">
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 block sm:inline">Instant Dev Server:</span>{" "}
                  Boots on <code>http://localhost:3000</code> with zero-fork in-process execution, WebSocket HMR, and instant CSS reload.
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
                {/* 2.1 React 19 & RSC */}
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

                {/* 2.2 Suspense-Wrapped Server Functions */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Suspense-Wrapped Server Functions from Client Components</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Seamlessly call asynchronous server functions directly from client components (<code>&apos;use client&apos;</code>) wrapped inside <code>&lt;Suspense&gt;</code> boundaries.</li>
                    <li>Eliminates boilerplate API routes, manual <code>fetch</code> calls, and manual loading state management.</li>
                    <li>The server executes the logic and streams the response directly to the client fallback.</li>
                  </ul>
                </div>

                {/* 2.3 Static by Default (SSG), ISG, ISR & Dynamic SSR */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Static by Default (SSG), ISG, ISR &amp; Dynamic SSR</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Routes are pre-rendered statically by default (SSG) for maximum performance and instant CDN delivery, with <code>getStaticPaths</code> pre-generating known dynamic routes at build time.</li>
                    <li><strong>On-Demand Incremental Static Generation (ISG):</strong> Unseen dynamic parameters are generated and cached on first request by default (configurable globally via <code>allowISG</code> in <code>dinou.config.*</code> or per segment, paired with <code>validateParams</code>).</li>
                    <li>Incremental Static Regeneration (ISR) is declared simply with <code>revalidate</code> in <strong>seconds</strong> (e.g. <code>revalidate = 60</code>) in companion <code>page_functions.ts</code> or <code>layout_functions.ts</code> files.</li>
                    <li>Live on-demand server rendering (SSR) activates whenever <code>revalidate = 0</code> or dynamic request APIs are read, while <code>getProps</code> passes typed server data directly to your component.</li>
                  </ul>
                </div>

                {/* 2.4 3D Layered Segmentation */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Layers className="w-4 h-4 text-cyan-500" />
                    <span>3D Layered Segmentation</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li><strong>Horizontal layout caching:</strong> Layouts define their own TTLs via <code>layout_functions.ts</code>, preserving layout state across route transitions without unmounting or re-rendering child trees.</li>
                    <li><strong>Vertical component caching:</strong> Micro-cache expensive Server Components with <code>&lt;DinouCacheSlot&gt;</code> (<code>dinou/server</code>) and refresh individual slots on demand from the client via <code>refreshSlot()</code>.</li>
                    <li><strong>Temporal segmentation — Partial Prerendering (PPR):</strong> Enabled globally in <code>dinou.config.*</code> or independently per layout/page segment, serving an instant cached static shell (~2.42ms TTFB) while dynamic components concurrently stream into <code>&lt;Suspense&gt;</code> holes.</li>
                  </ul>
                </div>

                {/* 2.5 Intuitive File-System Router */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <FolderTree className="w-4 h-4 text-indigo-500" />
                    <span>Intuitive File-System Router</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Clean file structure inside <code>src/</code> where only folders containing <code>page.tsx</code> become URL routes—so active helper folders like <code>src/components/</code> stay clean without prefixes.</li>
                    <li>First-class support for nested layouts (<code>layout.tsx</code> and <code>reset_layout</code>), dynamic segments (<code>[slug]</code>, optional <code>[[slug]]</code>, catch-all <code>[...slug]</code>, optional catch-all <code>[[...slug]]</code>), route groups (<code>(group)</code>), and parallel routes (<code>@slot</code>).</li>
                    <li>Parked folders prefixed with <code>_</code> (e.g. <code>_draft</code>, <code>_legacy</code>) completely escape routing, bundlers, manifests, VFS, and Server Functions—letting you archive WIP or legacy routes safely inside <code>src/</code>.</li>
                  </ul>
                </div>

                {/* 2.6 Type-Safe Routing & Contextual "./dinou" */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    <span>Type-Safe Routing &amp; Zero-Boilerplate Contextual <code>&quot;./dinou&quot;</code></span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Automatic TypeScript route generation (<code>npx dinou typegen</code>, synced live in dev and builds) emits <code>.dinou/types/routes.d.ts</code> and route-contextual <code>./dinou</code> modules mapped seamlessly via TypeScript <code>rootDirs</code>.</li>
                    <li>Import <code>Link</code>, <code>useRouter</code>, <code>ROUTE</code>, <code>PageProps</code>, <code>LayoutProps</code> (with automatic sibling <code>@slot</code> prop inference), <code>SlotProps</code>, and <code>PageFunctions</code> directly from <code>&quot;./dinou&quot;</code> with zero manual route string literals.</li>
                    <li>Compile-time dead-link detection, validated dynamic <code>params</code> interpolation, and strict relative navigation (<code>to=&quot;sub&quot;</code> / <code>from</code>) with zero type-declaration overhead in client bundles.</li>
                  </ul>
                </div>

                {/* 2.7 Universal Multi-Runtime Deployment */}
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

                {/* 2.8 Single-Process Dual-Bundle Engine (0-Fork) */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Cpu className="w-4 h-4 text-emerald-500" />
                    <span>Single-Process Dual-Bundle Engine (0-Fork)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2.5 leading-relaxed">
                    React 19 requires conflicting module conditions: <code>&quot;react-server&quot;</code> for Server Components vs. <code>&quot;browser&quot;</code> for SSR. Instead of spawning separate Node.js subprocesses via <code>child_process.fork()</code>, Dinou compiles both in a <strong>single in-memory process</strong> through a 3-pass pipeline:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li><strong>Pass A (RSC Engine):</strong> Bundles via bundler with <code>[&quot;react-server&quot;]</code> package export conditions, binding Server Functions and generating client reference descriptors.</li>
                    <li><strong>Pass B (SSR Engine):</strong> Bundles via bundler with <code>[&quot;browser&quot;]</code> package export conditions, packaging <code>react-dom/server.edge</code> and client hydration manifests.</li>
                    <li><strong>Pass C (Orchestration):</strong> Bridges RSC and SSR via standard W3C <code>ReadableStream</code> with zero disk I/O and zero IPC serialization latency.</li>
                    <li><strong>Deploy Anywhere:</strong> Halves memory consumption and enables native execution on edge runtimes (Cloudflare Workers, Deno, Bun) where process spawning is strictly prohibited. <Link href="/docs/migration/v6-to-v7#dual-bundle-engine" className="text-blue-500 hover:underline font-medium">Read architectural specification &rarr;</Link></li>
                  </ul>
                </div>

                {/* 2.9 Zero-Fork In-Process Dev DX */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <RefreshCw className="w-4 h-4 text-rose-500" />
                    <span>Zero-Fork In-Process Dev Experience (DX)</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Runs RSC and SSR inside a single unified Node.js process with zero <code>child_process.fork()</code> overhead and persistent SWC transform caching.</li>
                    <li>Instant React Fast Refresh over WebSockets, FOUC-free live CSS replacement, and automatic route type synchronization.</li>
                  </ul>
                </div>

                {/* 2.10 Tri-Bundler Freedom */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    <Boxes className="w-4 h-4 text-teal-500" />
                    <span>Tri-Bundler Freedom (esbuild, Rollup, Webpack)</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>Default to <strong>esbuild</strong> (<code>dinou dev</code>, <code>dinou build:node</code>) for blazing-fast development bundling and lightning-quick compilation.</li>
                    <li>Switch seamlessly to <strong>Rollup</strong> (<code>dinou dev:rollup</code>, <code>dinou build:node:rollup</code>) or <strong>Webpack</strong> (<code>dinou dev:webpack</code>, <code>dinou build:node:webpack</code>) via CLI scripts whenever your application needs specialized plugins or legacy transforms with complete feature parity.</li>
                  </ul>
                </div>

                {/* 2.11 100% Ejectable Architecture */}
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
                    Other frameworks either did not support this pattern directly or required extra boilerplate—creating separate API routes, calling <code>fetch</code> manually, and managing <code>isLoading</code> state by hand in the client.
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
                    Dinou began as a focused Node.js and Express framework with file-system routing and Webpack, progressively expanding to support all three major bundlers (esbuild, Rollup, and Webpack), client-side soft navigation, and native React Flight stream deserialization.
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    A major architectural leap later replaced Express with standard Web APIs (<code>Request</code>, <code>Response</code>, <code>ReadableStream</code>), making Dinou deployable everywhere (Node.js, Bun, Deno, Cloudflare Workers, Netlify, and standalone binaries). Today, running on a pure ESM core with pre-bundled vendor dependencies, it delivers true orthogonal 3D Layered Segmentation—combining horizontal layout caching (<code>layout_functions.ts</code>), vertical component caching (<code>&lt;DinouCacheSlot&gt;</code>), and Partial Prerendering (PPR) simultaneously.
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

              <div className="not-prose my-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <span>Effortless Context Ingestion &amp; Full Ejectability</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  While common needs like custom middlewares, request lifecycle hooks, and plugins are handled cleanly through <code>dinou.config.ts</code> (or <code>dinou.config.js</code>), Dinou offers an unmatched advantage for AI-assisted workflows:
                </p>
                <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-5 leading-relaxed">
                  <li>
                    <strong>Immediate Context Comprehension:</strong> Because Dinou avoids layers of hidden macros and convoluted runtime indirection, coding assistants can ingest the entire execution flow in a single prompt, diagnosing errors deterministically without hallucinations.
                  </li>
                  <li>
                    <strong>Ejection for Edge-Case Fixes &amp; Unreleased Features:</strong> In the rare scenario where your application encounters an internal engine bug or requires an unreleased low-level feature, running <code>npm run eject</code> copies the complete, readable engine into your repository. Thanks to Dinou&apos;s lean codebase, an AI agent can ingest the internal engine in seconds, inspect the exact execution flow, and autonomously patch or implement the required feature directly in your project.
                  </li>
                </ul>
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
│   ├── components/            # Shared UI helpers (not routed: no page.tsx)
│   ├── _draft/                # 🚫 Parked folder (ignored by router & bundlers)
│   │   └── page.tsx           # Excluded from routes, bundles & Server Functions
│   └── docs/
│       ├── page.tsx           # /docs route (imports types/Link from "./dinou")
│       ├── page_functions.ts  # Server data fetching, PPR & revalidate seconds
│       ├── layout.tsx         # /docs nested layout & sidebar
│       └── [slug]/
│           ├── page.tsx       # Dynamic segment (/docs/:slug)
│           └── page_functions.ts # getStaticPaths, allowISG, validateParams & ISR
├── dinou.config.ts            # Optional config (.ts/.mjs/.js/.cjs: ppr, allowISG, storage, plugins)
├── package.json
└── tsconfig.json              # Includes rootDirs: ["src", ".dinou/routes"]`}</code>
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 p-4 not-prose">
                <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  Parked / Ignored Folders (_ prefix)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Any folder inside <code>src/</code> prefixed with an underscore <code>_</code> (such as <code>_draft</code> or <code>_legacy</code>) is{" "}
                  <strong>completely excluded from Dinou&apos;s router, bundlers, manifests, VFS, and Server Functions</strong> (with a compile-time guard preventing active modules from importing from <code>_*</code>). Because only folders containing a <code>page.tsx</code> file become URL routes, active helper folders like <code>src/components/</code> never need a leading underscore—reserving <code>_</code> cleanly for parking work-in-progress or legacy routes.
                </p>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
