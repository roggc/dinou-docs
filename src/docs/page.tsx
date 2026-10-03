import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Button } from "@/docs/components/ui/button";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Cpu,
  Zap,
  Route,
  Database,
  FolderTree,
  ArrowRight,
  RefreshCw,
  Boxes,
  ShieldCheck,
  Terminal,
  Layers,
  Globe,
  Sparkles,
  Box,
  Split,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "what-is-dinou", title: "1. What is Dinou v7?", level: 2 },
  { id: "layered-segmentation", title: "2. 2D Layered Segmentation & PPR", level: 2 },
  { id: "horizontal-segmentation", title: "2.1. Horizontal Layout ISR", level: 3 },
  { id: "vertical-segmentation", title: "2.2. Vertical <DinouCacheSlot>", level: 3 },
  { id: "partial-prerendering", title: "2.3. Partial Prerendering (PPR)", level: 3 },
  { id: "dual-bundle-engine", title: "3. 0-Fork Dual-Bundle Engine", level: 2 },
  { id: "unified-caching", title: "4. Unified Caching & Data Contract", level: 2 },
  { id: "core-pillars", title: "5. Core Architectural Pillars", level: 2 },
  { id: "quick-start", title: "6. Quick Start in 60 Seconds", level: 2 },
  { id: "project-structure", title: "7. Project Structure & Conventions", level: 2 },
  { id: "next-steps", title: "8. Next Steps & Guides", level: 2 },
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
                Full-Stack React 19 Framework
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Introduction to Dinou v7
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A modern, lightweight, and ejectable Full-Stack React 19 Framework.
              Featuring 2D Layered Segmentation, Partial Prerendering (PPR), an in-process 0-fork dual-bundle engine, and a universal multi-runtime architecture.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: What is Dinou v7 */}
            <section id="what-is-dinou" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. What is Dinou v7?
              </h2>
              <p>
                <strong>Dinou v7</strong> is engineered from first principles to
                deliver the full power of <strong>React 19</strong> without the
                complexity, vendor lock-in, or hidden abstractions of traditional
                meta-frameworks.
              </p>
              <p>
                Every feature—from <strong>React Server Components (RSC)</strong> and{" "}
                <strong>Server Functions (<code>&apos;use server&apos;</code>)</strong> to
                Suspense streaming, <strong>Partial Prerendering (PPR)</strong>, and <strong>Two-Dimensional Layered Segmentation</strong>—is implemented
                using transparent Web standards (W3C Request, Response, and ReadableStream).
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="text-blue-600 dark:text-blue-400 font-mono font-bold text-base mb-1">
                    React 19 Native
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    First-class RSC, Server Actions, Suspense streaming, and direct server data access.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="text-cyan-600 dark:text-cyan-400 font-mono font-bold text-base mb-1">
                    Layered Segmentation
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    PPR, horizontal layout ISR via <code>layout_functions</code>, and vertical micro-caching.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="text-purple-600 dark:text-purple-400 font-mono font-bold text-base mb-1">
                    Deploy Everywhere
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Compile identical code to Cloudflare Workers, Bun, Deno, Node.js, or static SSG.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-base mb-1">
                    100% Ejectable
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Run <code>npm run eject</code> to inspect, customize, or own the entire framework engine.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: 2D Layered Segmentation & PPR */}
            <section id="layered-segmentation" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Two-Dimensional Layered Segmentation &amp; PPR
              </h2>
              <p>
                Dinou v7 eliminates all-or-nothing caching models. Instead of forcing an entire route to be either 100% static or 100% dynamic, Dinou divides rendering and caching across two independent dimensions:
              </p>

              {/* Subsection 2.1: Horizontal */}
              <div id="horizontal-segmentation" className="mt-8 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  <span>2.1. Horizontal Segmentation (Routes &amp; Layouts)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  In Dinou v7, layouts and pages operate on decoupled architectural planes. Layouts can declare their own data fetching and independent cache lifetimes using <code>layout_functions.ts</code>:
                </p>

                <div className="not-prose my-4">
                  <CodeBlock language="typescript">
                    {`// src/dashboard/layout_functions.ts
export const revalidate = 3600; // Cache layout shell for 1 hour
export const tags = ["dashboard-shell", "nav-stats"];

export async function getProps() {
  const globalStats = await fetchGlobalStats();
  return { globalStats };
}`}
                  </CodeBlock>
                </div>

                <div className="not-prose grid gap-3 sm:grid-cols-2 my-4">
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Decoupled Layout Invalidation
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Calling <code>revalidateTag(&quot;dashboard-shell&quot;)</code> purges only the layout shell without forcing the re-rendering of dozens of underlying child pages.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Persistent State via &lt;DinouPageSlot /&gt;
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      When navigating between sibling routes, the layout never unmounts. Audio/video players continue playing and sidebar search inputs remain filled.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subsection 2.2: Vertical */}
              <div id="vertical-segmentation" className="mt-8 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Box className="h-5 w-5 text-emerald-500" />
                  <span>2.2. Vertical Segmentation (&lt;DinouCacheSlot&gt;)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Vertical segmentation allows component-level micro-caching within a single page or layout. Wrap expensive Server Components in <code>&lt;DinouCacheSlot&gt;</code> for independent TTLs and client-driven in-place refreshes:
                </p>

                <div className="not-prose my-4">
                  <CodeBlock language="tsx">
                    {`// src/dashboard/page.tsx
import { DinouCacheSlot } from "dinou";
import LiveMetrics from "./metrics";
import RefreshButton from "./refresh-button";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 🎯 Micro-ISR: Cached independently for 60 seconds */}
      <DinouCacheSlot id="metrics" tag="metrics-tag" revalidate={60}>
        <LiveMetrics />
      </DinouCacheSlot>

      {/* 🔄 In-place client refresh button (Zero page reload) */}
      <RefreshButton slotId="metrics" />
    </div>
  );
}

// Client Component: Refresh only this slot without reloading the page!
// import { refreshSlot } from "dinou";
// <button onClick={() => refreshSlot("metrics")}>Refresh Metrics Only</button>`}
                  </CodeBlock>
                </div>
              </div>

              {/* Subsection 2.3: PPR */}
              <div id="partial-prerendering" className="mt-8 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-500" />
                  <span>2.3. Partial Prerendering (PPR)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Partial Prerendering delivers an instant static shell at <strong>&lt; 20ms TTFB</strong> from edge CDN cache, while dynamic components wrapped in React 19 <code>&lt;Suspense&gt;</code> execute concurrently and stream in over the wire to atomically replace fallbacks:
                </p>

                <div className="not-prose my-4">
                  <CodeBlock language="tsx">
                    {`// src/feed/page_functions.ts
export const ppr = true; // Enable PPR on this route

// src/feed/page.tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserProfileFeed from "./user-feed";

export default function FeedPage() {
  return (
    <div>
      {/* ⚡ Static Shell: Served instantly in < 20ms */}
      <h1 className="text-3xl font-bold">Your Activity</h1>

      {/* 🌊 Dynamic Hole: Streamed concurrently in the background */}
      <Suspense fallback={<Skeleton className="h-48 w-full" />}>
        <UserProfileFeed />
      </Suspense>
    </div>
  );
}`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* Section 3: 0-Fork Dual-Bundle Engine */}
            <section id="dual-bundle-engine" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. The 0-Fork Dual-Bundle Engine
              </h2>
              <p>
                React 19 imposes strict dual export conditions: Server Components must resolve under <code>&quot;react-server&quot;</code>, while Client Components and SSR require <code>&quot;browser&quot;</code> / client conditions.
              </p>
              <p>
                Legacy meta-frameworks solved this by spawning separate processes via <code>child_process.fork()</code>, causing IPC serialization latency, doubling memory consumption, and breaking compatibility with edge runtimes (Cloudflare Workers, single-binary Bun).
              </p>
              <p>
                <strong>Dinou v7 standardizes an in-process 3-pass Ahead-of-Time (AOT) dual-bundle pipeline across all runtimes:</strong>
              </p>

              <div className="not-prose grid gap-4 md:grid-cols-3 my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <Badge variant="outline" className="mb-2 text-blue-500 border-blue-500/20">Pass A: RSC Engine</Badge>
                  <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-slate-100">react-server Condition</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Compiles Server Components, binds Server Functions (<code>&apos;use server&apos;</code>), and converts Client Components to lightweight reference descriptors.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <Badge variant="outline" className="mb-2 text-purple-500 border-purple-500/20">Pass B: SSR Engine</Badge>
                  <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-slate-100">browser / Edge Condition</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Bundles <code>react-dom/server.edge</code> and client manifests with physical component implementations for streaming HTML and hydration.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <Badge variant="outline" className="mb-2 text-emerald-500 border-emerald-500/20">Pass C: Orchestrator</Badge>
                  <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-slate-100">W3C Web Streams</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Zero-overhead in-memory connection piping RSC payloads directly into SSR via native <code>ReadableStream</code> primitives.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Unified Caching & Data Contract */}
            <section id="unified-caching" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Unified Caching &amp; Data Contract
              </h2>
              <p>
                Dinou v7 establishes clean, unambiguous contracts for data fetching and caching:
              </p>

              <div className="not-prose space-y-4 my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    1. Direct Props Return in <code>getProps</code>
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    The legacy v6 <code>&#123; page: ... &#125;</code> wrapper is completely removed. In Dinou v7, <code>getProps</code> directly returns the component props object:
                  </p>
                  <CodeBlock language="typescript">
                    {`// ✅ Dinou v7: Direct props return
export async function getProps({ params }) {
  const user = await fetchUser(params.id);
  return {
    user,
    title: \`Profile of \${user.name}\`,
  };
}`}
                  </CodeBlock>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                    2. Single Source of Truth: <code>revalidate</code> in Seconds (<code>s</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    The <code>dynamic</code> keyword is removed. <code>revalidate</code> in <strong>seconds</strong> governs all rendering and caching behaviors:
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-blue-600 dark:text-blue-400 font-bold block">revalidate = 0</span>
                      <span className="text-muted-foreground font-sans">Live SSR on every request</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold block">revalidate &gt;= 1</span>
                      <span className="text-muted-foreground font-sans">ISR with background SWR (e.g. 60s)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-purple-600 dark:text-purple-400 font-bold block">revalidate = false</span>
                      <span className="text-muted-foreground font-sans">Permanent Static SSG</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Core Pillars */}
            <section id="core-pillars" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-6">
                5. Core Architectural Pillars
              </h2>
              <div className="grid gap-5 md:grid-cols-2 not-prose">
                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-blue-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 mb-2">
                      <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">React 19 &amp; RSC Core</CardTitle>
                    <CardDescription>
                      Server-first rendering with zero bundle overhead.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Components render on the server by default. Client JavaScript is only sent
                      for interactive components marked with <code>&apos;use client&apos;</code>.
                      Execute server-side logic seamlessly with React 19 Server Functions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-purple-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 mb-2">
                      <Route className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-lg">File-System Based Router</CardTitle>
                    <CardDescription>
                      Nested layouts, route groups, and parallel slots.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Organize your application intuitively inside <code>src/</code>. Build complex interfaces
                      with nested <code>layout.tsx</code> hierarchies, dynamic parameters (<code>[slug]</code>),
                      route groups (<code>(group)</code>), parallel slots (<code>@modal</code>), and layout resets.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/60 mb-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-lg">Universal Middleware &amp; Context</CardTitle>
                    <CardDescription>
                      Edge-ready request interception and context enrichment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Intercept requests before React executes with the <code>onRequest()</code> hook in{" "}
                      <code>dinou.config.ts</code>. Fast-path webhooks (Stripe, Clerk), enforce auth guards,
                      and share typed request context across your Server Components via <code>getContext()</code>.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-amber-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/60 mb-2">
                      <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardTitle className="text-lg">Deploy Everywhere</CardTitle>
                    <CardDescription>
                      Single codebase across all major JavaScript runtimes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Compile your application for traditional Node.js servers, fast Bun
                      standalone servers, single native executable binaries, Deno Deploy, or Cloudflare Workers at the edge without
                      changing a single line of application code.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950/60 mb-2">
                      <Boxes className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <CardTitle className="text-lg">Triple Bundler Agility</CardTitle>
                    <CardDescription>
                      esbuild, Rollup, or Webpack on your terms.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Choose <strong>esbuild</strong> for blazing fast development bundling, or switch
                      to <strong>Rollup</strong> or <strong>Webpack</strong> for specialized enterprise plugins
                      with complete performance parity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800/80 hover:border-rose-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950/60 mb-2">
                      <RefreshCw className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <CardTitle className="text-lg">Zero-Disk Dev DX</CardTitle>
                    <CardDescription>
                      100% in-memory serving with instant HMR and CSS injection.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Development builds emit directly to memory buffers (<code>globalThis.__DINOU_MEM_FILES__</code>), bypassing disk I/O entirely. Features instant Hot CSS swapping, React Fast Refresh, and fast SWC caching.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 6: Quick Start */}
            <section id="quick-start" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Quick Start in 60 Seconds
              </h2>
              <p>
                Get a fully configured Dinou v7 application with React 19, Tailwind CSS, and
                file-system routing running in seconds:
              </p>

              <div className="not-prose space-y-4 my-6">
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">
                    1. Initialize project with create-dinou-app:
                  </div>
                  <CodeBlock language="bash">
                    {`npx create-dinou-app@latest my-app`}
                  </CodeBlock>
                </div>

                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">
                    2. Enter directory and launch development server:
                  </div>
                  <CodeBlock language="bash">
                    {`cd my-app
npm run dev`}
                  </CodeBlock>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                The development server will boot on <code>http://localhost:3000</code> with instant
                React Fast Refresh and live CSS injection.
              </p>
            </section>

            {/* Section 7: Project Structure */}
            <section id="project-structure" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Project Structure &amp; Conventions
              </h2>
              <p>
                Dinou v7 uses intuitive file-system conventions. All routes, layouts, and private
                implementation folders reside cleanly inside <code>src/</code>:
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
├── src/
│   ├── page.tsx               # Root page (/)
│   ├── layout.tsx             # Root layout & ThemeProvider
│   ├── layout_functions.ts    # Independent layout data fetching & ISR (v7)
│   ├── globals.css            # Tailwind / global styles
│   ├── _components/           # 🔒 Private folder (ignored by router)
│   │   ├── hero.tsx
│   │   └── navbar.tsx
│   └── docs/
│       ├── page.tsx           # /docs documentation root
│       ├── page_functions.ts  # Route revalidate (seconds) & getProps (v7)
│       ├── layout.tsx         # /docs dedicated layout & sidebar
│       ├── layout_functions.ts# /docs layout cache lifetime & tags
│       └── [slug]/
│           ├── page.tsx       # Dynamic route segment (/docs/:slug)
│           └── page_functions.ts # Dynamic param validation & ISR
├── dinou.config.ts            # Optional framework configuration (ppr: true)
├── package.json
└── tsconfig.json`}</code>
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 p-4 not-prose">
                <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  Key Rule in v7: Private Folders (_ prefix)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Any folder prefixed with <code>_</code> (such as <code>_components</code> or <code>_drafts</code>) is
                  completely ignored by the router and static build scanner,{" "}
                  <strong>even if it contains valid <code>page.tsx</code> files</strong>. This makes it
                  invaluable for colocating components, archiving previous architectures, or isolating work-in-progress routes without causing routing conflicts.
                </p>
              </div>
            </section>

            {/* Section 8: Next Steps */}
            <section id="next-steps" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                8. Next Steps &amp; Guides
              </h2>
              <p>
                Explore the documentation to dive deeper into the architecture, routing, and deployment guides:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/migration/v6-to-v7" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        v6 to v7 Migration Guide
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Breaking changes, direct props, and upgrade instructions.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/rendering" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Rendering Strategies &amp; PPR
                      </div>
                      <div className="text-xs text-muted-foreground">
                        PPR, static bailout, micro-caching, and ISR.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/layouts" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Layouts &amp; layout_functions
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Horizontal segmentation and persistent navigation slots.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-between border-slate-200 dark:border-slate-800 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                  asChild
                >
                  <Link href="/docs/deployment" className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Universal Deployment
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Deploying to Cloudflare Workers, Bun, Deno, and Node.js.
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-2" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop with independent left-scroll */}
      <aside className="hidden xl:block w-64 pl-8 py-8 lg:py-10 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
