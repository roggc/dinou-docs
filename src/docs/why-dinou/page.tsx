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
} from "lucide-react";

const tocItems = [
  { id: "philosophy", title: "💡 Core Philosophy", level: 2 },
  { id: "pillars", title: "🏛️ Architectural Pillars", level: 2 },
  { id: "why-ai", title: "🤖 AI-Friendly by Design", level: 2 },
  { id: "features", title: "📦 Feature Catalog", level: 2 },
  { id: "comparison", title: "⚖️ Dinou vs Traditional Frameworks", level: 2 },
  { id: "next-steps", title: "🚀 Next Steps", level: 2 },
];

export default function WhyDinouPage() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
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

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote className="border-l-4 border-l-blue-600 dark:border-l-blue-400 bg-blue-50/50 dark:bg-blue-950/20 py-2 px-4 rounded-r-lg my-6 not-italic">
              <strong className="text-foreground">
                Dinou is a lightweight, 100% ejectable, multi-runtime React 19 framework with triple-bundler freedom, built directly on official React primitives without proprietary lock-in.
              </strong>
            </blockquote>

            <p className="lead text-base sm:text-lg text-muted-foreground">
              Instead of wrapping React in layers of proprietary macros, synthetic abstractions, and vendor-centric hosting contracts, Dinou embraces React as it is. It gives you complete architectural visibility, extreme performance, and true portability across every major JavaScript runtime.
            </p>

            {/* Section 1: Philosophy */}
            <section id="philosophy" className="scroll-mt-20 mt-10 sm:mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                💡 Core Philosophy
              </h2>
              <p>
                Modern web frameworks have grown increasingly complex, often acting as closed black boxes designed to funnel projects toward specific proprietary hosting platforms. Dinou is engineered around three foundational principles:
              </p>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Radical Transparency</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Zero magic, zero hidden AST transforms. The entire routing and compilation pipeline is straightforward enough that any agent can inspect and understand it.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    <Cpu className="h-4 w-4" />
                    <span>React Primitives First</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We use official React 19 APIs directly (RSC, Actions, Suspense streaming, metadata hoisting). If you know React, you already know Dinou.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Total Stack Ownership</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Never be trapped in a framework you cannot modify. With <code>dinou eject</code>, the entire core source code lives inside your repo under your full control.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Architectural Pillars */}
            <section id="pillars" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                🏛️ Architectural Pillars
              </h2>
              <p>
                Dinou v7 is built around six core architectural pillars engineered for maximum flexibility, raw execution speed, and unmatched deployment freedom:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="hover:border-blue-500/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Cpu className="h-5 w-5" />
                      <span>React 19 &amp; RSC Core</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    First-class React Server Components, Server Functions (<code>&quot;use server&quot;</code>), Suspense streaming, and direct server-side data access. Dinou generates static HTML and RSC payloads natively without extra bundle overhead.
                  </CardContent>
                </Card>

                <Card className="hover:border-cyan-500/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold">
                      <Boxes className="h-5 w-5" />
                      <span>Triple-Bundler Freedom</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Choose freely between <strong>esbuild</strong>, <strong>Rollup</strong>, and <strong>Webpack</strong> with 100% feature parity. Switch bundlers with a single CLI flag (<code>dinou dev:rollup</code>, <code>dinou build:webpack</code>) whenever your project demands it.
                  </CardContent>
                </Card>

                <Card className="hover:border-emerald-500/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Globe className="h-5 w-5" />
                      <span>Deploy Everywhere &amp; Binaries</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Write your application once and deploy to <strong>Node.js</strong>, <strong>Cloudflare Workers</strong>, <strong>Netlify Functions</strong>, <strong>Deno</strong>, or <strong>Bun</strong>. Furthermore, compile single-file standalone binaries for Linux, ARM, macOS, and Windows with zero external runtime dependencies.
                  </CardContent>
                </Card>

                <Card className="hover:border-amber-500/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                      <ShieldCheck className="h-5 w-5" />
                      <span>100% Ejectable Engine</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Zero lock-in. Run <code>dinou eject</code> to copy the complete framework engine, dual-bundle compilation pipelines, and runtime adapters directly into your repository. From that moment on, you have total ownership of your build tools.
                  </CardContent>
                </Card>

                <Card className="hover:border-purple-500/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <RefreshCw className="h-5 w-5" />
                      <span>Static-First ISR &amp; ISG</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Static compilation (SSG) with automatic runtime SSR fallback, on-demand Incremental Static Generation (ISG) for unbuilt dynamic paths, background ISR revalidation, and tag-based invalidation with <code>revalidatePath</code> and <code>revalidateTag</code>.
                  </CardContent>
                </Card>

                <Card className="hover:border-rose-500/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                      <Layers className="h-5 w-5" />
                      <span>File-System Based Router</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Intuitive directory-based routing with nested <code>layout.tsx</code>, route groups <code>(group)</code>, parallel slots <code>@modal</code>, private folders <code>_folder</code>, dynamic params <code>[id]</code>, catch-all <code>[...slug]</code>, and isolated error boundaries.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 3: AI-Friendly by Design */}
            <section id="why-ai" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                🤖 AI-Friendly by Design
              </h2>
              <p>
                In the era of AI coding assistants (such as Google Antigravity, Claude, ChatGPT, and Cursor), framework architecture must be re-evaluated. Large, monolithic frameworks with deeply nested abstractions require excessive context exploration and frequently lead to hallucinations when asking AI agents to debug or extend them.
              </p>
              <p>
                <strong>Dinou is engineered to be readily analyzed and mastered by both humans and AI agents.</strong> Its engine is lean and adheres strictly to standard React and web platform primitives.
              </p>

              <div className="border border-blue-200 dark:border-blue-900/60 rounded-xl p-5 bg-blue-50/30 dark:bg-blue-950/20 not-prose my-6 border-l-4 border-l-blue-500">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>How Transparency Empowers AI Pair Programming</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-3 list-disc pl-4">
                  <li>
                    <strong className="text-foreground">Complete Context Ingestion:</strong> AI assistants can easily ingest and comprehend Dinou&apos;s entire router, dual-bundle compilation engine, and runtime adapters within a single conversation session.
                  </li>
                  <li>
                    <strong className="text-foreground">Precise Bug Diagnosis:</strong> Transparent execution paths and standard web primitives (Web Fetch <code>Request</code>/<code>Response</code>, standard streams) enable AI agents to diagnose issues and propose exact patches without breaking hidden framework macros.
                  </li>
                  <li>
                    <strong className="text-foreground">Autonomous Ejected Customization:</strong> When you run <code>dinou eject</code>, an AI assistant can immediately help you implement custom edge middlewares, tailor compilation plugins, or build custom streaming handlers directly in your <code>dinou/adapters/</code> directory.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: Feature Catalog */}
            <section id="features" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                📦 Feature Catalog
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
                      Hybrid Rendering (SSG, SSR, ISG, ISR)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Static Site Generation compiles HTML and RSC payloads at build time; on-demand SSR activates when dynamic headers/cookies are inspected; unvisited dynamic paths generate and cache on demand via ISG; and stale pages revalidate in the background via ISR.
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

                <div className="flex gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">
                      React StrictMode by Default (Configurable)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Client roots are automatically wrapped in <code>&lt;React.StrictMode&gt;</code> in development mode to enforce React best practices and ensure DEV-PROD parity with React Compiler. Easily configured or toggled via <code>reactStrictMode</code> in <code>dinou.config.mjs</code>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Comparison Table */}
            <section id="comparison" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                ⚖️ Dinou vs Traditional Frameworks
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
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">Bundler Support</td>
                      <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-semibold">Triple-Bundler: esbuild, Rollup, Webpack</td>
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

            {/* Section 6: Next Steps */}
            <section id="next-steps" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                🚀 Next Steps
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
