import { Link } from "dinou";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Layers,
  Globe,
  Boxes,
  Brain,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  FolderPlus,
  Terminal,
  Sparkles,
  Server,
  Code2,
  Split,
  Box,
  Clock,
  Cloud,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "philosophy", title: "1. Core Philosophy", level: 2 },
  { id: "radical-transparency", title: "1.1. Radical Transparency", level: 3 },
  { id: "react-primitives", title: "1.2. React 19 Primitives First", level: 3 },
  { id: "total-ownership", title: "1.3. Total Stack Ownership & Eject", level: 3 },
  { id: "why-dinou-v7", title: "2. The Dinou v7 Paradigm", level: 2 },
  { id: "layered-segmentation", title: "2.1. 2D Layered Segmentation", level: 3 },
  { id: "partial-prerendering", title: "2.2. Partial Prerendering (PPR)", level: 3 },
  { id: "zero-fork-engine", title: "2.3. Zero-Fork In-Process Engine", level: 3 },
  { id: "architectural-pillars", title: "3. Architectural Pillars", level: 2 },
  { id: "pillar-rsc", title: "3.1. React 19 & RSC First", level: 3 },
  { id: "pillar-bundlers", title: "3.2. Triple-Bundler Freedom", level: 3 },
  { id: "pillar-multi-runtime", title: "3.3. Multi-Runtime & Binaries", level: 3 },
  { id: "pillar-caching", title: "3.4. Unified Data Contract & ISR", level: 3 },
  { id: "ai-friendly", title: "4. AI-Friendly by Design", level: 2 },
  { id: "ai-context", title: "4.1. Complete Context Ingestion", level: 3 },
  { id: "ai-diagnosis", title: "4.2. Deterministic Bug Diagnosis", level: 3 },
  { id: "ai-ejected-customization", title: "4.3. Autonomous Ejected Customization", level: 3 },
  { id: "feature-catalog", title: "5. Feature Catalog", level: 2 },
  { id: "comparison-table", title: "6. Dinou v7 vs Traditional Frameworks", level: 2 },
  { id: "next-steps", title: "7. Next Steps & Architecture Guides", level: 2 },
];

export default function WhyDinouPage() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Dinou v7 Architecture
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                React 19 Native
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why Dinou?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the core philosophy, architectural pillars, and the freedom of a truly transparent, multi-runtime React 19 framework.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            <blockquote className="border-l-4 border-l-blue-600 dark:border-l-blue-400 bg-blue-50/50 dark:bg-blue-950/20 py-3 px-4 rounded-r-lg my-6 not-italic">
              <strong className="text-foreground">
                Dinou is a lightweight, 100% ejectable, multi-runtime React 19 framework with triple-bundler freedom, 2D Layered Segmentation, and native PPR, built directly on official React primitives without proprietary lock-in.
              </strong>
            </blockquote>

            <p className="lead text-base sm:text-lg text-muted-foreground">
              Instead of wrapping React in layers of proprietary macros, synthetic abstractions, and vendor-centric hosting contracts, Dinou embraces React as it is. It gives you complete architectural visibility, extreme performance, and true portability across every major JavaScript runtime.
            </p>

            {/* Section 1: Philosophy */}
            <section id="philosophy" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Core Philosophy
              </h2>
              <p>
                Modern web frameworks have grown increasingly complex, often acting as closed black boxes designed to funnel projects toward specific proprietary hosting platforms. Dinou is engineered around three foundational principles:
              </p>

              <div className="space-y-6 not-prose mt-6">
                <div id="radical-transparency" className="scroll-mt-20 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      1.1. Radical Architectural Transparency
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Zero magic, zero hidden AST transforms, and no proprietary compiler tricks. The entire routing and compilation pipeline is straightforward enough that any developer or AI assistant can inspect, reason about, and customize every single line of code.
                  </p>
                </div>

                <div id="react-primitives" className="scroll-mt-20 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    <Cpu className="h-5 w-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      1.2. React 19 Primitives First
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use official React 19 APIs directly (React Server Components, Server Functions with <code>&quot;use server&quot;</code>, Suspense streaming, metadata hoisting, and React Compiler compatibility). If you know React, you already know Dinou—there are no vendor-specific dialects to learn.
                  </p>
                </div>

                <div id="total-ownership" className="scroll-mt-20 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    <ShieldCheck className="h-5 w-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      1.3. Total Stack Ownership &amp; Eject
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Never be trapped in a framework you cannot modify. With <code>dinou eject</code>, the complete core engine, dual-bundle compilation pipelines, and runtime adapters live directly inside your repository under your 100% control.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: The Dinou v7 Paradigm */}
            <section id="why-dinou-v7" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. The Dinou v7 Paradigm
              </h2>
              <p>
                Dinou v7 introduces architectural breakthroughs that solve fundamental challenges in full-stack React: how to achieve sub-millisecond edge response times, granular caching, and instantaneous local development.
              </p>

              <div className="space-y-8 not-prose mt-6">
                {/* 2.1 Layered Segmentation */}
                <div id="layered-segmentation" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <Split className="h-5 w-5 text-blue-500" />
                    2.1. 2D Layered Segmentation
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    In traditional frameworks, caching is an all-or-nothing proposition: if a single dynamic widget updates on a page, the entire page and all its parent layouts must be re-rendered. Dinou v7 introduces <strong>2D Layered Segmentation</strong>, decoupling cache invalidation across two distinct axes:
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                      <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        Axis 1: Horizontal Segmentation
                      </div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                        Layout-Level ISR Isolation
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Layouts declare their own independent data fetching and caching contracts via <code>layout_functions.ts</code>. A root navigation bar can be cached for 24 hours while an inner page updates every 10 seconds. When the page revalidates, parent layouts are preserved untouched.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                      <div className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 mb-1">
                        Axis 2: Vertical Segmentation
                      </div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                        Granular &lt;DinouCacheSlot&gt;
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Wrap any sub-tree in a React Server Component with <code>&lt;DinouCacheSlot duration=&#123;60&#125; tags=&#123;[&quot;pricing&quot;]&#125;&gt;</code>. Each slot caches its serialized RSC flight payload independently with dedicated TTL and on-demand invalidation tags.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2.2 Partial Prerendering */}
                <div id="partial-prerendering" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    2.2. Partial Prerendering (PPR)
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Partial Prerendering unifies the instant delivery of static sites with the personalized interactivity of dynamic server rendering. When a user requests a route:
                  </p>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-5">
                    <li>
                      <strong>0ms TTFB Static Shell:</strong> The pre-rendered HTML document shell, navigation bars, and Suspense fallback skeletons are served instantly from the edge cache.
                    </li>
                    <li>
                      <strong>Streamed Dynamic Holes:</strong> While the user views the static shell, dynamic server components wrapped in <code>&lt;Suspense&gt;</code> execute concurrently and stream into the open HTTP chunked response, replacing fallbacks seamlessly.
                    </li>
                  </ol>
                </div>

                {/* 2.3 Zero-Fork Engine */}
                <div id="zero-fork-engine" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-emerald-500" />
                    2.3. Zero-Fork In-Process Dual-Engine
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Traditional dev servers run multiple child processes, IPC communication sockets, and background workers that consume gigabytes of memory and frequently disconnect.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In Dinou v7, development runs in a single Node.js process using native ECMAScript customization hooks (<code>module.register</code>). The Dual-Bundle engine compiles client chunks and RSC/SSR server trees simultaneously in memory at startup. Every route is immediately hot and ready—no on-demand route compilation delays or navigation lag.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Architectural Pillars */}
            <section id="architectural-pillars" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Architectural Pillars
              </h2>
              <p>
                Dinou v7 is anchored by four rock-solid architectural pillars engineered for maximum flexibility, raw execution speed, and deployment freedom:
              </p>

              <div className="space-y-6 not-prose mt-6">
                {/* 3.1 RSC */}
                <div id="pillar-rsc" className="scroll-mt-20 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    <Cpu className="h-5 w-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      3.1. React 19 &amp; RSC First
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Zero-JS-by-default server components, direct database access, async component rendering, Server Functions with <code>&quot;use server&quot;</code>, and full React Compiler optimization out of the box.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Only interactive leaves marked with <code>&quot;use client&quot;</code> generate browser JavaScript bundles.
                  </p>
                </div>

                {/* 3.2 Bundlers */}
                <div id="pillar-bundlers" className="scroll-mt-20 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
                    <Boxes className="h-5 w-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      3.2. Triple-Bundler Parity (esbuild, Rollup, Webpack)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Choose freely between <strong>esbuild</strong>, <strong>Rollup</strong>, and <strong>Webpack</strong> with 100% feature parity. Switch bundlers with a single command without modifying your application code.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fast esbuild for sub-second dev cycles, Rollup for clean tree-shaken ESM distribution, or Webpack for enterprise plugin ecosystems.
                  </p>
                </div>

                {/* 3.3 Multi-Runtime */}
                <div id="pillar-multi-runtime" className="scroll-mt-20 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    <Globe className="h-5 w-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      3.3. Multi-Runtime &amp; Standalone Executables
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Deploy to <strong>Node.js</strong>, <strong>Cloudflare Workers</strong>, <strong>Netlify</strong>, <strong>Deno</strong>, or <strong>Bun</strong>. Furthermore, compile single-file standalone binaries for Linux, ARM, macOS, and Windows with zero external runtime dependencies.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    A single <code>dist/my-app</code> binary contains your server, React 19 runtime, and assets.
                  </p>
                </div>

                {/* 3.4 Caching */}
                <div id="pillar-caching" className="scroll-mt-20 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    <RefreshCw className="h-5 w-5" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      3.4. Unified Data Contract &amp; Dynamic ISR
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    Clean, transparent signatures: <code>getProps</code> returns data directly without synthetic wrapper objects. Revalidation intervals are defined as direct numbers in seconds (<code>export const revalidate = 60</code>), with tag-based invalidation via <code>revalidateTag</code> and path-based revalidation via <code>revalidatePath</code>.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Consistent across SSG static export, SSR on-demand generation, and ISR background revalidation.
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
                In the era of AI coding assistants (such as Google Antigravity, Claude, ChatGPT, and Cursor), framework architecture must be re-evaluated. Large, monolithic frameworks with deeply nested abstractions require excessive context exploration and frequently lead to hallucinations when asking AI agents to debug or extend them.
              </p>
              <p>
                <strong>Dinou is engineered to be readily analyzed and mastered by both humans and AI agents.</strong> Its engine is lean and adheres strictly to standard React and web platform primitives.
              </p>

              <div className="space-y-4 not-prose mt-6">
                <div id="ai-context" className="scroll-mt-20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-sm font-bold">4.1. Complete Context Ingestion</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    AI assistants can easily ingest and comprehend Dinou&apos;s entire router, dual-bundle compilation engine, and runtime adapters within a single conversation session, eliminating guesswork.
                  </p>
                </div>

                <div id="ai-diagnosis" className="scroll-mt-20 p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <h4 className="text-sm font-bold">4.2. Deterministic Bug Diagnosis</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Transparent execution paths and standard web primitives (Web Fetch <code>Request</code>/<code>Response</code>, standard streams) enable AI agents to diagnose issues and propose exact patches without breaking hidden framework macros.
                  </p>
                </div>

                <div id="ai-ejected-customization" className="scroll-mt-20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="text-sm font-bold">4.3. Autonomous Ejected Customization</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When you run <code>dinou eject</code>, an AI assistant can immediately help you implement custom edge middlewares, tailor compilation plugins, or build custom streaming handlers directly in your <code>dinou/adapters/</code> directory.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Feature Catalog */}
            <section id="feature-catalog" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Feature Catalog
              </h2>
              <p>
                Dinou provides a complete, modern stack for building production-ready full-stack web applications with world-class developer experience:
              </p>

              <div className="space-y-4 mt-6 not-prose">
                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      React 19 Server Components (RSC)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Render data-heavy components on the server for instant page loads and zero client bundle size. Fetch from databases or backend services directly inside your React components without boilerplate API endpoints.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      2D Layered Segmentation &amp; &lt;DinouCacheSlot&gt;
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Isolate layout caching horizontally via <code>layout_functions.ts</code>, and segment page sub-trees vertically with <code>&lt;DinouCacheSlot&gt;</code> for surgical cache revalidation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      Partial Prerendering (PPR)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Serve static shells instantly from edge cache with 0ms TTFB while dynamic Suspense boundaries stream content over an open HTTP connection.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      Server Functions (<code>&quot;use server&quot;</code>) &amp; Actions
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Execute server-side logic directly from client interactive buttons and forms. Dinou automatically provisions the RPC networking layer, serialization, and React 19 action states.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      Dual-Bundle In-Memory Dev Engine
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compiles both client chunks and RSC/SSR server bundles simultaneously in memory within a single process. Enjoy fast Hot Module Replacement (HMR) and immediate route availability with zero disk churn.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      Triple-Bundler Parity (esbuild, Rollup, Webpack)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use fast esbuild for day-to-day rapid development, Rollup for compact tree-shaken ESM distribution, or Webpack for complex enterprise asset configurations—all running identical application code.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      Multi-Runtime &amp; Standalone Binaries
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Deploy seamlessly to Node.js, Cloudflare Workers, Netlify Functions, Deno, or Bun. Compile self-contained executable binaries (<code>dinou build:deno:compile</code>, <code>dinou build:bun:compile</code>) that run on servers without requiring Node, Deno, or Bun installed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      Granular Error Boundaries &amp; Slot Isolation
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Route-level <code>error.tsx</code> and <code>not-found.tsx</code> isolate exceptions locally. Parallel slot layouts (e.g. <code>@modal</code>, <code>@analytics</code>) fail gracefully without breaking the primary page or stopping compiler pipelines.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      Fast Client-Side Router with SPA Transitions
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Smooth client-side navigation with hover-based prefetching, cache busting via the <code>fresh</code> prop, and active loading indicators with the <code>useNavigationLoading</code> hook.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Comparison Table */}
            <section id="comparison-table" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Dinou v7 vs Traditional Frameworks
              </h2>
              <p>
                How does Dinou v7 compare against traditional full-stack React frameworks?
              </p>

              <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-900/80 text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Feature</th>
                      <th className="py-3 px-4 text-blue-600 dark:text-blue-400 font-bold">Dinou v7</th>
                      <th className="py-3 px-4 text-muted-foreground">Traditional Frameworks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">React 19 Integration</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Direct React 19 primitives (RSC, Actions, Suspense)</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Proprietary wrappers &amp; synthetic APIs</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">2D Layered Segmentation</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Horizontal (Layout ISR) + Vertical (&lt;DinouCacheSlot&gt;)</td>
                      <td className="py-3.5 px-4 text-muted-foreground">All-or-nothing page level caching</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">Partial Prerendering (PPR)</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Native static shell + HTTP chunked dynamic streaming</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Complex proprietary hosting requirement</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">Bundler Support</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Triple-Bundler: esbuild, Rollup, Webpack (100% parity)</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Locked into a single proprietary bundler</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">Multi-Runtime Portability</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Node.js, Cloudflare, Netlify, Deno, Bun &amp; Binaries</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Targeted heavily at specific cloud vendors</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">Ejectability</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">100% ejectable to clean source code (<code>dinou eject</code>)</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Black-box compiled binaries; non-ejectable</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">Dev Compilation Model</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Dual-Bundle in-memory; all routes ready instantly</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Lazy compiling with cold-start route delays</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">AI Context &amp; Transparency</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Compact codebase; fits easily in AI context windows</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Massive codebases leading to AI hallucinations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 7: Next Steps */}
            <section id="next-steps" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Next Steps &amp; Architecture Guides
              </h2>
              <p>
                Ready to experience the freedom and performance of Dinou v7? Jump into these essential guides:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose mt-6">
                <Card className="hover:border-blue-500/40 transition-colors group">
                  <Link href="/docs/getting-started" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <Terminal className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      Getting Started
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Create your first Dinou v7 app with <code>create-dinou-app</code> or configure it manually.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-purple-500/40 transition-colors group">
                  <Link href="/docs/routing" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                        <FolderPlus className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                      Routing &amp; Layouts
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Explore nested layouts, parallel slots, route groups, and private folders.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-cyan-500/40 transition-colors group">
                  <Link href="/docs/bundlers" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                        <Boxes className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                      Triple-Bundler Freedom
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Discover how esbuild, Rollup, and Webpack achieve complete feature parity in Dinou.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-emerald-500/40 transition-colors group">
                  <Link href="/docs/server-client-components" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
                      Server &amp; Client Components
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Master the boundary between React Server Components and interactive client components.
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
