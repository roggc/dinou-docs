import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Boxes,
  Globe,
  Terminal,
  Layers,
  ArrowRight,
  Cloud,
  Server,
  FileCode2,
  Zap,
  RefreshCw,
  ShieldCheck,
  Split,
  Clock,
  Sliders,
  XCircle,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Overview & Architectural Leap", level: 2 },
  { id: "breaking-changes", title: "2. Breaking Changes (v6 vs v7)", level: 2 },
  { id: "breaking-getprops", title: "2.1. getProps Direct Props Return", level: 3 },
  { id: "breaking-revalidate", title: "2.2. revalidate in Seconds (s)", level: 3 },
  { id: "breaking-dynamic", title: "2.3. Elimination of dynamic Keyword", level: 3 },
  { id: "layered-segmentation", title: "3. Layered Segmentation Architecture", level: 2 },
  { id: "horizontal-segmentation", title: "3.1. Horizontal Segmentation & Layout Preservation", level: 3 },
  { id: "layout-functions", title: "3.2. layout_functions for Decoupled Layout ISR", level: 3 },
  { id: "vertical-segmentation", title: "3.3. Vertical Segmentation (DinouCacheSlot)", level: 3 },
  { id: "ppr-engine", title: "3.4. Partial Prerendering (PPR) Engine", level: 3 },
  { id: "resilience-error-handling", title: "4. Resilience & React 19 Error Handling", level: 2 },
  { id: "error-double-wrap", title: "4.1. Elimination of HTML Double-Wrapping", level: 3 },
  { id: "suspense-exception", title: "4.2. Handling SuspenseException with use()", level: 3 },
  { id: "two-level-boundaries", title: "4.3. Two-Level Error Boundaries", level: 3 },
  { id: "dual-bundle-engine", title: "5. Dual-Bundle In-Memory Engine (0-Fork)", level: 2 },
  { id: "updating-dependencies", title: "6. Updating Dependencies & StrictMode", level: 2 },
  { id: "cli-scripts", title: "7. CLI Standardization & Scripts", level: 2 },
  { id: "multi-runtime-binaries", title: "8. Multi-Runtime, Serverless & Static Deployments", level: 2 },
  { id: "gitignore-update", title: "9. Updating .gitignore", level: 2 },
  { id: "verification", title: "10. Verification & Next Steps", level: 2 },
];

export default function MigrationV6ToV7Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
                Migration Guide
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                v6 &rarr; v7
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migration from v6 to v7
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Complete migration specification for upgrading to Dinou v7: breaking changes in data fetching contracts, horizontal and vertical layered segmentation (<code>layout_functions</code> and <code>DinouCacheSlot</code>), Partial Prerendering (PPR), React 19 resilience primitives, 0-Fork Dual-Bundle in-memory compilation, and multi-runtime edge deployments.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Architectural Leap
              </h2>
              <p>
                Dinou v7 represents a quantum leap in the framework&apos;s lifecycle. It shifts from a Node-centric development server reliant on subprocess forking and disk manifests to a <strong>universal, 0-fork in-memory Dual-Bundle engine</strong> that runs identically across Node.js, Bun, Deno, Cloudflare Workers, and Netlify Functions.
              </p>

              <Alert className="not-prose my-6 border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-700 dark:text-amber-300 font-semibold">
                  Action Required: 3 Contract Breaking Changes
                </AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground mt-1">
                  While standard React component trees, layouts, and Server Functions (<code>&quot;use server&quot;</code>) remain fully compatible, Dinou v7 introduces <strong>three breaking changes</strong> in data-fetching and route caching signatures: the <code>getProps</code> return format, the <code>revalidate</code> time unit (now strictly in seconds), and the elimination of the <code>dynamic</code> keyword in favor of <code>revalidate</code> as the single source of truth.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      In Dinou v6
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>• <code>getProps</code> required returning <code>&#123; page: &#123; ... &#125; &#125;</code>.</p>
                    <p>• <code>revalidate</code> was declared in <strong>milliseconds</strong> (e.g. <code>60000</code>).</p>
                    <p>• Ambiguous route flags: <code>dynamic = true</code> vs <code>revalidate</code>.</p>
                    <p>• Subprocess <code>child_process.fork()</code> with IPC overhead and double memory.</p>
                    <p>• Layouts re-evaluated and re-rendered on route transitions.</p>
                    <p>• No component-level caching or live in-place refresh.</p>
                    <p>• TTFB blocked on dynamic routes until the slowest database query completes (no PPR).</p>
                    <p>• Restricted to Node.js environments due to process spawning.</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      In Dinou v7
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>• <code>getProps</code> directly returns top-level props <code>&#123; user, title &#125;</code>.</p>
                    <p>• <code>revalidate</code> is strictly in <strong>seconds</strong> (e.g. <code>60</code>).</p>
                    <p>• Single source of truth: <code>revalidate = 0</code> (SSR), <code>&gt;= 1</code> (ISR), <code>false</code> (SSG).</p>
                    <p>• 0-Fork Dual-Bundle in-memory pipeline connecting RSC and SSR via W3C Web Streams.</p>
                    <p>• Horizontal segmentation: 100% layout state preservation across sibling routes (zero layout remounting).</p>
                    <p>• Vertical segmentation: <code>&lt;DinouCacheSlot&gt;</code> Micro-ISR and client <code>refreshSlot()</code>.</p>
                    <p>• <strong>0ms TTFB with PPR (Partial Prerendering):</strong> Static shell prelude + React 19 <code>&lt;Suspense&gt;</code> dynamic streaming.</p>
                    <p>• True &quot;Deploy Everywhere&quot;: Node, Bun, Deno, Cloudflare Workers, Netlify v2, and Static.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 2: Breaking Changes */}
            <section id="breaking-changes" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Breaking Changes (v6 vs v7)
              </h2>
              <p>
                Before launching your migrated application, audit your <code>page_functions.ts</code> (or <code>.js</code>) files and route segment exports against these three contract adjustments:
              </p>

              {/* 2.1 getProps */}
              <div id="breaking-getprops" className="mt-8 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.1
                  </span>
                  <span><code>getProps</code> Contract: Direct Props Object Return</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, <code>getProps</code> required wrapping the returned data under a <code>page</code> key. In Dinou v7, this artificial wrapper is completely eliminated. <code>getProps</code> directly returns the object that will be passed as props to your page component:
                </p>

                <div className="grid gap-4 md:grid-cols-2 not-prose my-4">
                  <div>
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5">
                      ❌ Dinou v6 (Deprecated)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/users/[id]/page_functions.ts
export async function getProps({ params }) {
  const user = await fetchUser(params.id);
  return {
    page: {
      user,
      title: \`Profile of \${user.name}\`,
    },
  };
}`}
                    </CodeBlock>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5">
                      ✅ Dinou v7 (Current)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/users/[id]/page_functions.ts
export async function getProps({ params }) {
  const user = await fetchUser(params.id);
  return {
    user,
    title: \`Profile of \${user.name}\`,
  };
}`}
                    </CodeBlock>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  The corresponding Page component receives <code>user</code> and <code>title</code> directly as top-level props:
                </p>
                <CodeBlock language="tsx" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// src/users/[id]/page.tsx
export default function UserProfilePage({ user, title }: { user: User; title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              {/* 2.2 revalidate Unit */}
              <div id="breaking-revalidate" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.2
                  </span>
                  <span><code>revalidate</code> Time Unit: Strictly Seconds (<code>s</code>)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, cache revalidation intervals were specified in milliseconds (<code>ms</code>). In Dinou v7, <code>revalidate</code> is <strong>strictly defined in seconds (<code>s</code>)</strong>. This aligns with HTTP standards (RFC 7234 <code>Cache-Control: max-age=N</code>), edge CDN providers, and component-level cache slots:
                </p>

                <div className="grid gap-4 md:grid-cols-2 not-prose my-4">
                  <div>
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5">
                      ❌ Dinou v6 (Milliseconds)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// 60,000 milliseconds (1 minute)
export const revalidate = 60000;

// or function form
export function revalidate() {
  return 60000;
}`}
                    </CodeBlock>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5">
                      ✅ Dinou v7 (Seconds)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// 60 seconds (1 minute)
export const revalidate = 60;

// or function form
export function revalidate() {
  return 60;
}`}
                    </CodeBlock>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  💡 <strong>Tip:</strong> If you leave <code>revalidate = 60000</code> in v7, your route will be cached for 60,000 seconds (over 16 hours) instead of 1 minute! Be sure to divide existing millisecond numbers by <code>1000</code>.
                </p>
              </div>

              {/* 2.3 Elimination of dynamic */}
              <div id="breaking-dynamic" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.3
                  </span>
                  <span>Elimination of <code>dynamic</code>: Single Source of Truth via <code>revalidate</code></span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, routes could declare both <code>dynamic = true / false</code> and <code>revalidate = N</code>, which introduced conflicting semantics. Dinou v7 completely removes the <code>dynamic</code> export. <code>revalidate</code> is the <strong>single source of truth</strong> for route caching:
                </p>

                <div className="overflow-x-auto not-prose my-4">
                  <table className="w-full text-xs border border-slate-200 dark:border-slate-800 rounded-lg">
                    <thead className="bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300">
                      <tr>
                        <th className="p-3 text-left font-semibold border-b">Value of <code>revalidate</code></th>
                        <th className="p-3 text-left font-semibold border-b">Rendering Strategy</th>
                        <th className="p-3 text-left font-semibold border-b">Runtime Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-blue-600 dark:text-blue-400">0 (or &lt; 1)</td>
                        <td className="p-3 font-medium text-slate-900 dark:text-slate-100">Dynamic (Live SSR)</td>
                        <td className="p-3">Rendered on every incoming request. Bypasses static and ISR cache.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">&gt;= 1 (e.g. 60, 300)</td>
                        <td className="p-3 font-medium text-slate-900 dark:text-slate-100">Incremental Static (ISR)</td>
                        <td className="p-3">Cached with background stale-while-revalidate expiring after <i>N</i> seconds.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-purple-600 dark:text-purple-400">false (or omitted)</td>
                        <td className="p-3 font-medium text-slate-900 dark:text-slate-100">Static Forever (SSG)</td>
                        <td className="p-3">Pre-rendered at build time. Cached indefinitely until on-demand revalidation.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 md:grid-cols-2 not-prose my-4">
                  <div>
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5">
                      ❌ Dinou v6 (Conflicting Flags)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/random/page_functions.ts
export function dynamic() {
  return true; // Deprecated!
}`}
                    </CodeBlock>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5">
                      ✅ Dinou v7 (Unified revalidate)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/random/page_functions.ts
export const revalidate = 0; // Live SSR on every request`}
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Layered Segmentation Architecture */}
            <section id="layered-segmentation" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Layered Segmentation Architecture
              </h2>
              <p>
                Dinou v7 introduces a two-dimensional rendering model: <strong>Horizontal Segmentation</strong> (decoupling layout shells from dynamic child pages) and <strong>Vertical Segmentation</strong> (micro-caching individual components inside a page with <code>&lt;DinouCacheSlot&gt;</code> and PPR).
              </p>

              {/* 3.1 Horizontal Segmentation */}
              <div id="horizontal-segmentation" className="mt-8 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Split className="h-5 w-5 text-blue-500" />
                  <span>3.1. Horizontal Segmentation &amp; Layout State Preservation</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In earlier meta-frameworks, navigating between sibling routes (e.g. <code>/dashboard/analytics</code> to <code>/dashboard/settings</code>) frequently caused the entire layout to re-evaluate, resetting video playback, collapsing open menus, and wiping sidebar search inputs.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dinou v7 splits client requests into two decoupled endpoints:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 my-2">
                  <li><strong>Layout Plane (<code>____rsc_layout____</code>):</strong> Renders exclusively the outer layout shell and parallel slots, embedding a dynamic marker (<code>&lt;DinouPageSlot /&gt;</code>) where child content will reside.</li>
                  <li><strong>Page Plane (<code>____rsc_page____</code>):</strong> Renders exclusively the leaf page component (<code>&lt;Page /&gt;</code>).</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">
                  When navigating between sibling routes sharing a layout, the layout <strong>never unmounts or re-executes</strong>. State is 100% preserved. Furthermore, the layout cache is query-string aware (<code>searchPart</code>), so modifying query parameters (e.g. <code>?tab=billing</code>) updates layout slots in real time without tearing down the shell.
                </p>
              </div>

              {/* 3.2 layout_functions */}
              <div id="layout-functions" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  <span>3.2. <code>layout_functions</code> for Decoupled Layout ISR</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Layouts can now declare independent cache lifetimes, cache tags, and parameter validations via <code>layout_functions.ts</code> (or <code>layout.functions.ts</code>):
                </p>

                <CodeBlock language="typescript" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// src/dashboard/layout_functions.ts
export const revalidate = 3600; // Cache the layout shell for 1 hour
export const tags = ["dashboard-shell", "nav-links"];
export const allowISG = true;

export async function validateParams(params) {
  return true;
}`}
                </CodeBlock>

                <p className="text-xs text-muted-foreground">
                  🚀 <strong>Granular Purging:</strong> Calling <code>revalidateTag(&quot;dashboard-shell&quot;)</code> purges only the layout shell without forcing the re-rendering of all nested sub-pages.
                </p>
              </div>

              {/* 3.3 Vertical Segmentation */}
              <div id="vertical-segmentation" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-emerald-500" />
                  <span>3.3. Vertical Segmentation: <code>&lt;DinouCacheSlot&gt;</code> &amp; <code>refreshSlot()</code></span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dinou v7 introduces component-level micro-caching inside pages with <code>&lt;DinouCacheSlot&gt;</code>:
                </p>

                <div className="space-y-4 not-prose my-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      Level 1: Micro-ISR of Server Components &amp; SWR
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Wrap expensive Server Components in a cache slot. Stale content is served instantly while an asynchronous background task updates the cache in the active <code>StorageAdapter</code>:
                    </p>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg mt-3">
                      {`// src/analytics/page.tsx
import { DinouCacheSlot } from "dinou/server";

export default function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      {/* Caches this component for 60 seconds; tags allow targeted invalidation */}
      <DinouCacheSlot id="metrics-slot" tag="metrics-tag" revalidate={60}>
        <ExpensiveMetricsGraph />
      </DinouCacheSlot>
    </div>
  );
}`}
                    </CodeBlock>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      Level 2: In-Place Live Refresh from Client (Zero Page Reload)
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Client Components can programmatically trigger a live re-render of a single slot using <code>refreshSlot(id)</code> from <code>&quot;dinou&quot;</code> without reloading the page or touching sibling states:
                    </p>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg mt-3">
                      {`"use client";
import { refreshSlot } from "dinou";

export function LiveRefreshButton() {
  return (
    <button onClick={() => refreshSlot("metrics-slot")}>
      Refresh Metrics Only
    </button>
  );
}`}
                    </CodeBlock>
                  </div>
                </div>
              </div>

              {/* 3.4 Partial Prerendering */}
              <div id="ppr-engine" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>3.4. Partial Prerendering (PPR) Engine</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Partial Prerendering combines the instant delivery of static sites (<strong>0ms TTFB</strong>) with the personalization of dynamic SSR in a single HTTP response:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal pl-5 my-2">
                  <li><strong>Static Shell Prelude:</strong> The outer layout and skeleton placeholders are served at 0ms TTFB directly from edge CDN cache.</li>
                  <li><strong>Streaming Dynamic Holes:</strong> Components wrapped in <code>&lt;Suspense&gt;</code> execute concurrently on the server and stream in as chunks that swap the skeleton with live content.</li>
                </ol>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">
                  Configuring PPR:
                </p>
                <div className="grid gap-3 sm:grid-cols-3 not-prose my-3">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-blue-500 mb-1">1. Global</p>
                    <p className="text-muted-foreground">In <code>dinou.config.mjs</code>:</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1">defineConfig(&#123; ppr: true &#125;)</code>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-purple-500 mb-1">2. Layout Scope</p>
                    <p className="text-muted-foreground">In <code>layout_functions.ts</code>:</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1">export const ppr = true;</code>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-emerald-500 mb-1">3. Page Override</p>
                    <p className="text-muted-foreground">In <code>page_functions.ts</code>:</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1">export const ppr = false;</code>
                  </div>
                </div>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// src/dashboard/page.tsx
import { Suspense } from "react";
import { getContext } from "dinou";

async function UserFeed() {
  const ctx = getContext();
  const user = ctx?.req?.cookies?.user || "Guest";
  const data = await fetchFeedForUser(user);
  return <FeedList items={data} />;
}

export default function DashboardPage() {
  return (
    <div>
      {/* 🚀 Static Shell: Sent at 0ms TTFB */}
      <header><h1>Dashboard</h1></header>

      {/* ⚡ Dynamic Hole: Streamed and replaced on the fly */}
      <Suspense fallback={<div className="skeleton">Loading feed...</div>}>
        <UserFeed />
      </Suspense>
    </div>
  );
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Section 4: Resilience & React 19 Error Handling */}
            <section id="resilience-error-handling" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Resilience &amp; React 19 Error Handling
              </h2>
              <p>
                Dinou v7 incorporates three deep architectural resilience solutions for React 19 streaming SSR and client-side navigation:
              </p>

              <div id="error-double-wrap" className="mt-6 scroll-mt-20">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-500" />
                  <span>4.1. Elimination of HTML Double-Wrapping in Error SSR</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  In earlier versions, when an unhandled server error occurred within a layout, the error handler injected a fallback <code>&lt;html&gt;&lt;body&gt;</code> envelope. Because the layout already produced an HTML shell, this resulted in an invalid nested <code>&lt;html&gt;</code> document, triggering fatal React 19 hydration mismatch crashes on the client.
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou v7 tracks <code>layoutApplied</code> in <code>getErrorJSX</code>. When an application layout is present, error JSX is injected directly into the layout&apos;s active slot (<code>&lt;DinouPageSlot /&gt;</code>). The document structure remains 100% valid HTML, and interactive navigation elements (sidebars, headers) remain operational.
                </p>
              </div>

              <div id="suspense-exception" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span>4.2. Handling <code>SuspenseException</code> in React 19 with <code>use()</code></span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  In React 19, reading pending promises inside component bodies with <code>use(errorPromise)</code> intentionally throws an internal suspension signal (<code>SuspenseException</code>). If executed inside an eager JavaScript <code>try / catch</code> block, the catch intercepted this signal as if it were a fatal crash, preventing custom <code>error.tsx</code> components from ever rendering.
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou v7 decouples <code>SlotErrorRenderer</code> from eager <code>try / catch</code> blocks and wraps it in a native React <code>&lt;Suspense fallback=&#123;null&#125;&gt;</code> boundary. Once the error chunk resolves, React smoothly renders your custom <code>error.tsx</code> component with its <code>error</code> and <code>reset</code> props.
                </p>
              </div>

              <div id="two-level-boundaries" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-emerald-500" />
                  <span>4.3. Two-Level Error Boundaries with Clean Navigation Reset</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Earlier meta-frameworks reset error boundaries on navigation by mutating <code>&lt;ErrorBoundary key=&#123;pathname&#125;&gt;</code>. However, changing <code>key</code> indiscriminately destroys and remounts the DOM on <i>every</i> healthy navigation, wiping form inputs and scroll positions.
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou v7 uses a <strong>Two-Level Error Boundary Architecture</strong>:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 my-2">
                  <li><strong>Level 1 (<code>SlotErrorBoundary</code>):</strong> Preserves DOM and state on healthy navigations. Only when <code>hasError === true</code> does <code>componentDidUpdate</code> check the compound navigation key (<code>resetKey: $&#123;route&#125;::$&#123;navCount&#125;</code>) to reset the error state cleanly.</li>
                  <li><strong>Level 2 (<code>InnerErrorBoundary</code>):</strong> Fail-safe guard that catches bugs or unhandled exceptions inside the developer&apos;s custom <code>error.tsx</code> component, safely displaying <code>DefaultDevError</code> and preventing a white screen of death.</li>
                </ul>
              </div>
            </section>

            {/* Section 5: Dual-Bundle Engine */}
            <section id="dual-bundle-engine" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Dual-Bundle In-Memory Engine (0-Fork) &amp; Pre-Rendering
              </h2>
              <p>
                React 19 imposes a strict module-resolution constraint: Server Components must be imported under the <code>&quot;react-server&quot;</code> condition, while SSR rendering requires client conditions (<code>&quot;browser&quot;</code> / <code>react-dom/server.edge</code>). Importing both in the same module scope throws a fatal conflict.
              </p>
              <p>
                Earlier meta-frameworks circumvented this in Node.js via <code>child_process.fork()</code>. However, this introduced IPC serialization latency, doubled memory usage, and made deployment to edge runtimes (Cloudflare Workers, Deno Deploy) impossible.
              </p>
              <p>
                Dinou v7 introduces an <strong>Ahead-of-Time (AOT) Dual-Bundle In-Memory Pipeline</strong>:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <span>3-Pass In-Memory Compilation (0 Disk I/O)</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                    <li><strong>Pass A (RSC Engine):</strong> Bundled with <code>[&quot;react-server&quot;]</code> conditions. Binds Server Functions and generates client reference descriptors.</li>
                    <li><strong>Pass B (SSR Engine):</strong> Bundled with <code>[&quot;browser&quot;]</code> conditions. Packages <code>react-dom/server.edge</code> and client manifests.</li>
                    <li><strong>Pass C (Orchestrator):</strong> Interconnects Pass A and Pass B via standard W3C <code>ReadableStream</code> and handles static assets. In development, files exist purely in <code>globalThis.__DINOU_MEM_FILES__</code> with &lt;0.5ms response times.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Zap className="h-5 w-5 text-amber-500" />
                    <span>Build-Time Pre-Rendering (Instant Production Server Boot)</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In Dinou v6, static generation ran when starting the production server (<code>dinou start</code>). In Dinou v7, <strong>static generation takes place strictly during <code>dinou build</code></strong>. When you run <code>dinou start</code>, every pre-rendered HTML file and RSC payload is already baked into the <code>StorageAdapter</code>. The production server boots <strong>instantaneously</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Updating Dependencies */}
            <section id="updating-dependencies" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Updating Dependencies, StrictMode &amp; Private Folders
              </h2>
              <p>
                Dinou v7 requires a minimum of <strong>React 19.3.0</strong> (<code>react &gt;= 19.3.0</code> and <code>react-dom &gt;= 19.3.0</code>) as peer dependencies. Update your dependencies:
              </p>

              <CodeBlock language="bash" containerClassName="w-full rounded-lg not-prose my-4">
                {`npm install react@^19.3.0 react-dom@^19.3.0 dinou@latest
npm install -D @types/react@^19.3.0 @types/react-dom@^19.3.0`}
              </CodeBlock>

              <div className="space-y-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    React StrictMode by Default (Configurable via dinou.config.mjs)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    In development mode (<code>dinou dev</code>), client component roots are automatically wrapped in <code>&lt;React.StrictMode&gt;</code> to detect side-effects early and ensure DEV-PROD parity with React Compiler. You can configure or disable it in <code>dinou.config.mjs</code>:
                  </p>
                  <CodeBlock language="javascript" containerClassName="w-full rounded-lg mt-3">
                    {`// dinou.config.mjs
import { defineConfig } from "dinou/config";

export default defineConfig({
  ppr: true,              // Enable Partial Prerendering globally
  reactStrictMode: true, // Default: true in development
});`}
                  </CodeBlock>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    Private Folders with Underscore Prefix (<code>_</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Folders prefixed with an underscore (such as <code>src/_components/</code>, <code>src/_legacy/</code> or <code>src/_drafts/</code>) <strong>completely escape the router scan</strong>. Even if the folder contains <code>page.tsx</code> or <code>layout.tsx</code>, Dinou will never register them as routes or pre-render them.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: CLI Standardization & Scripts */}
            <section id="cli-scripts" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. CLI Standardization &amp; package.json Scripts
              </h2>
              <p>
                Dinou v7 introduces uniform CLI subcommands to select between <strong>esbuild</strong> (default), <strong>Rollup</strong>, and <strong>Webpack</strong> across all runtimes, native binaries, and export modes. Update your <code>package.json</code> scripts:
              </p>

              <CodeBlock language="json" containerClassName="w-full rounded-lg not-prose my-4">
                {`{
  "scripts": {
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
    "start:node": "dinou start:node",
    "build:cloudflare": "dinou build:cloudflare",
    "build:deno": "dinou build:deno",
    "build:deno:compile": "dinou build:deno:compile",
    "start:deno": "dinou start:deno",
    "build:bun": "dinou build:bun",
    "build:bun:pure": "dinou build:bun:pure",
    "build:bun:compile": "dinou build:bun:compile",
    "start:bun": "dinou start:bun",
    "export-static": "dinou export-static",
    "eject": "dinou eject"
  }
}`}
              </CodeBlock>

              <p className="text-sm text-muted-foreground mt-2">
                All three bundlers share 100% feature parity: RSC parsing, client directive splitting, server functions RPC, and CSS Modules.
              </p>
            </section>

            {/* Section 8: Multi-Runtime Deployments */}
            <section id="multi-runtime-binaries" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                8. Multi-Runtime, Serverless &amp; Static Deployments
              </h2>
              <p>
                Dinou v7 decouples cache storage and runtime operations via <code>StorageAdapter</code> (<code>FileSystemStorage</code>, <code>CloudflareKVStorage</code>, <code>DenoKVStorage</code>, <code>MemoryStorage</code>). Deploy to any infrastructure with zero platform lock-in:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Server className="h-4 w-4 text-blue-500" />
                    <span>Node.js Production Server</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deploy to Docker, VPS, AWS EC2, Railway, or Render with <code>dinou build:node</code> and <code>dinou start:node</code>. Full support for streaming SSR, Server Functions (<code>&quot;use server&quot;</code>), and background ISR via <code>FileSystemStorage</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Cloud className="h-4 w-4 text-teal-500" />
                    <span>Serverless Netlify Functions v2</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deploy with official support for Netlify Functions v2 via <code>dinou/adapters/netlify.js</code>. Pre-configured with <code>preferStatic: true</code>, Netlify serves assets directly through its edge CDN, invoking serverless execution only for dynamic SSR and Server Functions.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Globe className="h-4 w-4 text-emerald-500" />
                    <span>Cloudflare Workers (workerd)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Build edge-ready serverless bundles with <code>dinou build:cloudflare</code>. Backed by <code>CloudflareKVStorage</code> and standard Fetch handlers. Deploy with <code>npx wrangler deploy</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Boxes className="h-4 w-4 text-cyan-500" />
                    <span>Deno (Deploy / Edge) &amp; Standalone Binaries</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Build for <strong>Deno Deploy</strong> and edge environments with <code>dinou build:deno</code>, featuring native Deno KV storage integration (<code>Deno.openKv()</code>). Compile single zero-dependency standalone executables with <code>dinou build:deno:compile</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Bun &amp; Bun Compile</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leverage Bun&apos;s native HTTP server with <code>dinou build:bun</code>, build 100% native Node-free servers with <code>dinou build:bun:pure</code>, or compile to single-binary with <code>dinou build:bun:compile</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <FileCode2 className="h-4 w-4 text-amber-500" />
                    <span>Static Export (Surge, GitHub Pages, S3)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Generate pure static HTML and assets inside <code>out/</code> using <code>dinou export-static</code>. Ideal for zero-cost hosting on GitHub Pages, Cloudflare Pages, Surge, or AWS S3.
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2">
                    ⚠️ <strong>Caveat on Server Functions:</strong> In static exports without an active backend server process, Server Functions (<code>&quot;use server&quot;</code> RPC calls) will not execute because there is no backend server listening to process mutations. For interactive server-side RPCs, deploy to a runtime server (Node, Netlify, Bun, Deno, or Cloudflare Workers).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Updating .gitignore */}
            <section id="gitignore-update" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                9. Updating .gitignore
              </h2>
              <p>
                Update your <code>.gitignore</code> to ignore the output directories of the multi-runtime engine:
              </p>

              <CodeBlock language="text" containerClassName="w-full rounded-lg not-prose my-4">
                {`node_modules
.dinou
out
dist
.wrangler
.env`}
              </CodeBlock>

              <ul className="text-xs text-muted-foreground mt-3 space-y-1.5 list-disc pl-4 not-prose">
                <li><code>out/</code> stores static HTML and assets exported via <code>dinou export-static</code>.</li>
                <li><code>dist/</code> holds standalone single-executable binaries (e.g., generated with <code>build:deno:compile</code> or <code>build:bun:compile</code>).</li>
                <li><code>.wrangler/</code> is created automatically by Cloudflare when running local worker previews.</li>
              </ul>
            </section>

            {/* Section 10: Verification */}
            <section id="verification" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                10. Verification &amp; Next Steps
              </h2>
              <p>
                Launch your development server to verify that your routes render with the new v7 engine:
              </p>

              <CodeBlock language="bash" containerClassName="w-full rounded-lg not-prose my-4">
                {`npm run dev`}
              </CodeBlock>

              <p className="mt-4">
                Your application should compile in memory and be available immediately at <code>http://localhost:3000</code>.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose mt-8">
                <Card className="hover:border-blue-500/40 transition-colors group">
                  <Link href="/docs/why-dinou" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      Why Dinou?
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Explore the core philosophy, architectural pillars, and complete feature catalog of Dinou v7.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-purple-500/40 transition-colors group">
                  <Link href="/docs/routing" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                        <Layers className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                      Routing &amp; Layouts
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Learn nested layouts, route groups, parallel slots, and private folder conventions.
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
