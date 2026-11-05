import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/docs/components/ui/tabs";
import {
  Zap,
  RefreshCw,
  Info,
  Layers,
  Sparkles,
  Split,
  ShieldCheck,
  Globe,
  Database,
  Clock,
  XCircle,
  TrendingDown,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview: The 3 Axes & 7 Combinations",
    level: 2,
  },
  {
    id: "horizontal-segmentation",
    title: "1. Horizontal Axis: Layout Isolation (layout_functions.ts)",
    level: 2,
  },
  {
    id: "horizontal-artifacts",
    title: "1.1. Independent Artifacts & Asymmetric Lifecycles",
    level: 3,
  },
  {
    id: "horizontal-revalidation",
    title: "1.2. Surgical Revalidation & Lazy HTML Re-Composition",
    level: 3,
  },
  {
    id: "horizontal-escape-hatches",
    title: "1.3. Dynamic Layout Guardrails, Escape Hatches & Client Refresh",
    level: 3,
  },
  {
    id: "micro-isr",
    title: "2. Vertical Axis: Micro-ISR (<DinouCacheSlot>)",
    level: 2,
  },
  {
    id: "slot-caching",
    title: "2.1. Component Caching: Dynamic vs Static & Key Patterns",
    level: 3,
  },
  {
    id: "slot-invalidation",
    title: "2.2. Interactive Refresh, Tag Purging & Background SWR",
    level: 3,
  },
  {
    id: "slot-anti-patterns",
    title: "2.3. Anti-Patterns: When NOT to Use <DinouCacheSlot>",
    level: 3,
  },
  {
    id: "partial-prerendering",
    title: "3. Temporal Axis: Partial Prerendering (PPR)",
    level: 2,
  },
  {
    id: "ppr-architecture",
    title: "3.1. Hybrid Architecture & The <Suspense> Boundary Rule",
    level: 3,
  },
  {
    id: "ppr-no-dynamic",
    title: "3.2. Static <Suspense> Opt-Out (noDynamic) & Runtime Performance",
    level: 3,
  },
  {
    id: "ppr-activation",
    title: "3.3. Enabling PPR, Child Opt-Out & Specificity Hierarchy",
    level: 3,
  },
  {
    id: "pairwise-hs-slot",
    title: "4. Pairwise #1: Horizontal + Vertical (Layouts + <DinouCacheSlot>)",
    level: 2,
  },
  {
    id: "hs-slot-capabilities",
    title: "4.1. Layout Slots, @sidebar Slots & Cross-Axis Shared Tags",
    level: 3,
  },
  {
    id: "hs-slot-client",
    title: "4.2. Cross-Route Slot Persistence & Unmounted Slot Refresh",
    level: 3,
  },
  {
    id: "pairwise-hs-ppr",
    title: "5. Pairwise #2: Horizontal + Temporal (Layouts + PPR)",
    level: 2,
  },
  {
    id: "hs-ppr-shells",
    title: "5.1. Dual Frozen Static Shells & Unified Hole Streaming",
    level: 3,
  },
  {
    id: "hs-ppr-revalidation",
    title: "5.2. Surgical Layout vs Page Revalidation & router.refresh()",
    level: 3,
  },
  {
    id: "pairwise-slot-ppr",
    title: "6. Pairwise #3: Vertical + Temporal (<DinouCacheSlot> + PPR)",
    level: 2,
  },
  {
    id: "ppr-slot-nesting",
    title: "6.1. Nesting-Order Semantics & The 3-Tier Hybrid Architecture",
    level: 3,
  },
  {
    id: "ppr-slot-patterns",
    title: "6.2. Micro-ISR Inside Personalized Holes & Surgical Tag Invalidation",
    level: 3,
  },
  {
    id: "ppr-slot-synergy",
    title: "7. The Triple Synergy: Horizontal + Vertical + Temporal",
    level: 2,
  },
  {
    id: "triple-synergy-example",
    title: "7.1. Full-Stack 3D Composition Example",
    level: 3,
  },
  {
    id: "triple-synergy-invalidation",
    title: "7.2. 4-Way Surgical Invalidation & Synergy Invariants",
    level: 3,
  },
  {
    id: "comparison-matrix",
    title: "8. Complete 7-Combination & PPR Decision Matrices",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>3D Layered Segmentation | Dinou Docs</title>
      <meta
        name="description"
        content="Escape all-or-nothing route rendering with Dinou's 3D Layered Segmentation across all 7 combinations: Horizontal (layout_functions.ts), Vertical (<DinouCacheSlot>), Temporal (PPR), their 3 pairwise synergies, and full Triple Synergy."
      />
      <link rel="canonical" href="https://dinou.dev/docs/3d-segmentation" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900"
              >
                3D Layered Architecture
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                7 Architectural Combinations (2³ − 1)
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                3D Layered Segmentation
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Escape the binary &ldquo;all-or-nothing&rdquo; route model. Dinou decomposes caching and rendering across{" "}
              <strong>three independent, orthogonal axes</strong>—<strong>Horizontal</strong> (<code>layout_functions.ts</code>),{" "}
              <strong>Vertical</strong> (<code>&lt;DinouCacheSlot&gt;</code>), and{" "}
              <strong>Temporal</strong> (Partial Prerendering / PPR)—which work{" "}
              <strong>standalone (3)</strong>, in all{" "}
              <strong>3 pairwise combinations</strong>, or in full{" "}
              <strong>Triple Synergy (1)</strong> on the same route, yielding{" "}
              <strong>7 distinct architectural combinations</strong> (<code>2³ − 1 = 7</code>).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview: The 3 Orthogonal Axes &amp; 7 Combinations</h2>
              <p>
                Traditional web frameworks treat a URL route as a single monolithic unit: either the entire page is static, or a single dynamic query forces the entire tree (layouts, sibling widgets, and page body) to re-render on every request. Dinou replaces that limitation with three orthogonal segmentation layers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-6 min-w-0">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Split className="h-5 w-5" />
                      <span>1. Horizontal (Layouts)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Decouples nested layouts (<code>layout.rsc</code>) from child pages (<code>page.rsc</code>) via <code>layout_functions.ts</code>, giving each segment its own independent cache lifecycle and surgical revalidation.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Layers className="h-5 w-5" />
                      <span>2. Vertical (&lt;DinouCacheSlot&gt;)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Isolates individual Server Component subtrees inside a layout or page with their own server cache TTL, tags, non-blocking background SWR, and live client refresh (<code>refreshSlot</code>).
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Zap className="h-5 w-5" />
                      <span>3. Temporal (PPR)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Splits a single HTTP response across time: serves the pre-rendered static shell (<code>shell.html</code>) immediately at 0ms while streaming dynamic <code>&lt;Suspense&gt;</code> holes in parallel.
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-3 text-xs">
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span>The Complete Boolean Cube: All 7 Architectural Combinations (2³ − 1 = 7)</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Because the three axes are 100% orthogonal, you can adopt them incrementally—using a single axis, any pairwise combination, or all three together:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                  <div className="p-3 rounded-md bg-background/80 border space-y-1">
                    <div className="font-bold text-foreground">3 Standalone Axes</div>
                    <ul className="text-muted-foreground space-y-1 pl-3.5 list-disc">
                      <li><strong>#1 Horizontal Only (H):</strong> <code>layout.rsc</code> vs. <code>page.rsc</code></li>
                      <li><strong>#2 Vertical Only (V):</strong> <code>&lt;DinouCacheSlot&gt;</code> Micro-ISR</li>
                      <li><strong>#3 Temporal Only (T):</strong> Pure PPR (<code>shell.html</code> + holes)</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-md bg-background/80 border space-y-1">
                    <div className="font-bold text-foreground">3 Pairwise Synergies</div>
                    <ul className="text-muted-foreground space-y-1 pl-3.5 list-disc">
                      <li><strong>#4 H + V (Non-PPR):</strong> Layouts + <code>&lt;DinouCacheSlot&gt;</code></li>
                      <li><strong>#5 H + T (No Slots):</strong> Segmented Layouts + PPR</li>
                      <li><strong>#6 V + T:</strong> <code>&lt;DinouCacheSlot&gt;</code> + PPR</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-md bg-background/80 border space-y-1">
                    <div className="font-bold text-foreground">1 Triple Synergy</div>
                    <ul className="text-muted-foreground space-y-1 pl-3.5 list-disc">
                      <li><strong>#7 H + V + T:</strong> Multi-level PPR Layouts + PPR/Static Pages + Shell &amp; Hole <code>&lt;DinouCacheSlot&gt;</code>s</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 1. Horizontal Axis: Layout Isolation */}
            <section
              id="horizontal-segmentation"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  1. Horizontal Axis (Standalone): Layout Isolation (<code>layout_functions.ts</code>)
                </h3>
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Combination #1 (H)
                </span>
              </div>
              <p className="mt-4">
                Along the <strong>horizontal axis</strong>, Dinou decouples the caching, data-fetching, and rendering lifecycle of every nested <code>layout.tsx</code> (and parallel <code>@slot</code> routes) from its child <code>page.tsx</code> via companion <code>layout_functions.ts</code> files.
              </p>

              {/* 1.1 Independent Artifacts & Asymmetric Lifecycles */}
              <section id="horizontal-artifacts" className="mt-6 scroll-mt-20">
                <h4>1.1. Independent Artifacts &amp; Asymmetric Lifecycles</h4>
                <p>
                  Instead of baking layouts and pages into a single indivisible payload, Dinou persists independent segment artifacts in storage:
                </p>
                <ul>
                  <li>
                    <strong>Layout Artifacts:</strong> <code>layout.rsc</code> + <code>layout.metadata.json</code> (containing the active hierarchy of ancestor layouts and parallel <code>@slot</code> routes, terminating at an internal <code>&lt;DinouPageSlot /&gt;</code> placeholder, with its own <code>revalidate</code> TTL, <code>getCacheTags</code>, <code>getProps</code>, <code>validateParams</code>, <code>getStaticPaths</code>, <code>allowISG</code>, and <code>ppr</code>).
                  </li>
                  <li>
                    <strong>Page Artifacts:</strong> <code>page.rsc</code> + <code>index.html</code> (or <code>shell.html</code>) + <code>metadata.json</code> (with its own independent <code>revalidate</code> TTL, <code>getCacheTags</code>, <code>getProps</code>, and <code>ppr</code>).
                  </li>
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>1. Static Layout + Dynamic Page</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Layout has <code>revalidate = false</code> (cached forever); child page has <code>revalidate = 0</code> (live SSR). On every request or SPA navigation, <code>layout.rsc</code> is served from cache in ~1.20ms without re-executing <code>layout.tsx</code>, while <code>page.tsx</code> renders live.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>2. Dynamic Layout + Static Page</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Layout has <code>revalidate = 0</code> (evaluates per request); child page has <code>revalidate = false</code>. The heavy child page payload (<code>page.rsc</code>) stays cached while the layout wrapper updates dynamically.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      <span>3. Independent ISR Timers</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      A workspace layout caches navigation for 1 hour (<code>revalidate = 3600</code>) while a child metrics page revalidates every 10 seconds (<code>revalidate = 10</code>), or vice versa, eliminating redundant database queries.
                    </p>
                  </div>
                </div>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-4"
                >
{`// src/dashboard/layout_functions.ts
import type { LayoutFunctions } from "dinou/server";

// Parent layout caches independently for 1 hour (3,600s) with its own tag
export const revalidate: LayoutFunctions["revalidate"] = 3600;
export const getCacheTags: LayoutFunctions["getCacheTags"] = ["workspace-nav"];

export async function getProps() {
  const workspaceNav = await db.workspaces.getNavigationTree();
  return { workspaceNav };
}`}
                </CodeBlock>
              </section>

              {/* 1.2 Surgical Revalidation & Lazy HTML Re-Composition */}
              <section id="horizontal-revalidation" className="mt-8 scroll-mt-20">
                <h4>1.2. Surgical Layout Revalidation &amp; Lazy HTML Re-Composition</h4>
                <p>
                  When you invalidate <strong>only</strong> a layout via <code>await revalidateLayout(&quot;/dashboard&quot;)</code> or <code>await revalidateTag(&quot;workspace-nav&quot;)</code> from a Server Function (or when a layout&apos;s clock TTL expires):
                </p>
                <ol>
                  <li>
                    <strong>Zero Child Page Re-Execution:</strong> Dinou regenerates <strong>only</strong> <code>layout.rsc</code> and <code>layout.metadata.json</code> without re-running any child <code>page.tsx</code> or <code>page_functions.ts</code> (preserving all cached child <code>page.rsc</code> payloads). If an ancestor <code>L1</code> layout is revalidated above a nested <code>L2</code> layout, Dinou automatically cascades the update to <code>L2</code>&apos;s <code>layout.rsc</code> on demand.
                  </li>
                  <li>
                    <strong>Lazy HTML Re-Composition (Zero Hydration Mismatch):</strong> Whenever a hard request (<code>GET /dashboard/analytics</code> or browser <code>F5</code> reload) arrives and detects that an ancestor <code>layout.rsc</code> has a newer <code>generatedAt</code> timestamp than the child&apos;s cached <code>index.html</code> (or <code>shell.html</code>), Dinou <strong>lazily re-composes the HTML in O(1)</strong> from the fresh <code>layout.rsc</code> + the existing cached <code>page.rsc</code> and updates <code>window.__DINOU_BUILD_ID__</code>. This guarantees <strong>zero React hydration mismatch</strong> without triggering an O(N) rebuild storm across child pages.
                  </li>
                </ol>
              </section>

              {/* 1.3 Dynamic Layout Guardrails, Escape Hatches & Client Refresh */}
              <section id="horizontal-escape-hatches" className="mt-8 scroll-mt-20">
                <h4>1.3. Dynamic Layout Guardrails, Hierarchy Escape Hatches &amp; Client Refresh</h4>
                <p>
                  From a developer&apos;s perspective, Horizontal Segmentation also provides fine-grained control over layout routing boundaries, client caches (<code>layoutCache</code> &amp; <code>pageCache</code>), and targeted refreshes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>Dynamic Layout Params &amp; Escape Hatches</span>
                    </div>
                    <ul className="text-muted-foreground space-y-1.5 pl-4 list-disc leading-relaxed">
                      <li>
                        <strong>Dynamic Layout Guardrails (<code>src/dept/[deptId]/layout_functions.ts</code>):</strong> Supports <code>validateParams(params)</code>, <code>getStaticPaths()</code>, and <code>allowISG = false</code>. Navigating from <code>/dept/eng</code> to <code>/dept/eng/members</code> preserves the layout instance (<code>0</code> layout fetches); navigating to <code>/dept/invalid</code> returns HTTP <code>404</code> on both HTML and <code>/____rsc_layout____</code>.
                      </li>
                      <li>
                        <strong><code>reset_layout</code> (Branch Root Reset):</strong> Creating an empty <code>reset_layout</code> marker file (or exporting <code>reset_layout = true</code> in <code>layout_functions.ts</code>) detaches that branch from all ancestor layouts and starts a brand-new root <code>&lt;html&gt;&lt;body&gt;</code> layout shell for that directory and its subroutes.
                      </li>
                      <li>
                        <strong><code>no_layout</code> (Standalone Page):</strong> Creating an empty <code>no_layout</code> marker file (or exporting <code>no_layout = true</code> in <code>page_functions.ts</code>) renders <code>page.tsx</code> as a standalone root document with zero ancestor layouts.
                      </li>
                      <li>
                        <strong>Page &amp; Parallel <code>@slot</code> Error Containment:</strong> Errors thrown in a child <code>page.tsx</code> or inside a parallel route (<code>@brokenSlot/page.tsx</code>) are caught by their nearest <code>error.tsx</code> inside <code>&lt;DinouPageSlot /&gt;</code> without unmounting the surrounding layout shell.
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <RefreshCw className="h-4 w-4 text-emerald-500" />
                      <span>Client Navigation &amp; Refresh Controls</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      During sibling SPA navigation, <code>layoutCache</code> keeps ancestor layouts mounted with <strong>0 network requests</strong>, while <code>pageCache</code> serves previously visited pages instantly unless bypassed with <code>&lt;Link fresh&gt;</code>:
                    </p>
                    <CodeBlock
                      language="tsx"
                      containerClassName="w-full overflow-hidden rounded-lg text-xs"
                    >
{`"use client";
import { Link, useRouter } from "dinou";

export function WorkspaceControls() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {/* 1. Re-fetches ONLY page.rsc (0 layout requests) */}
      <button onClick={() => router.refresh()}>
        Refresh Page Only
      </button>

      {/* 2. Re-fetches BOTH layout.rsc and page.rsc
             while preserving mounted Client Component useState! */}
      <button onClick={() => router.refresh({ layout: true })}>
        Refresh Layout + Page
      </button>

      {/* 3. Bypasses client pageCache on navigation */}
      <Link href="/dashboard/analytics" fresh>
        Fresh Analytics
      </Link>
    </div>
  );
}`}
                    </CodeBlock>
                  </div>
                </div>
              </section>
            </section>

            {/* 2. Vertical Axis: Micro-ISR */}
            <section id="micro-isr" className="mt-12 pt-8 border-t scroll-mt-20">
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  2. Vertical Axis (Standalone): Micro-ISR (<code>&lt;DinouCacheSlot&gt;</code>)
                </h3>
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Combination #2 (V)
                </span>
              </div>
              <p className="mt-4">
                While Horizontal Segmentation isolates route segments (<code>layout.tsx</code> vs. <code>page.tsx</code>), <strong>Vertical Segmentation</strong> isolates individual component subtrees <em>inside</em> a layout or page. When a page contains an expensive database widget, developers in traditional frameworks are often forced to convert it into a Client Component with client-side fetching libraries, introducing bundle bloat, network waterfalls, and layout shifts.
              </p>
              <p>
                Dinou solves this with <code>&lt;DinouCacheSlot&gt;</code> (imported from <code>&quot;dinou/server&quot;</code>). It keeps components on the server as React Server Components (RSC) while caching their resolved Client JSX payload (<code>slot.json</code>) in server storage with dedicated TTLs (<code>revalidate</code>) and invalidation tags (<code>tag</code> / <code>tags</code>).
              </p>

              {/* Key Capabilities Summary */}
              <div className="border rounded-lg p-4 bg-card not-prose my-6 text-xs space-y-2">
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-500" />
                  <span>Core Capabilities &amp; Developer Patterns of <code>&lt;DinouCacheSlot&gt;</code></span>
                </div>
                <ul className="text-muted-foreground space-y-1.5 pl-4 list-disc leading-relaxed">
                  <li>
                    <strong>Props &amp; Tag-Only Shorthand:</strong> <code>id?: string</code> (optional—defaults to <code>tag || tags[0]</code>), <code>tag?: string</code> / <code>tags?: string[]</code> (supports multi-tag group invalidation, e.g. <code>tags=&#123;[&quot;sales&quot;, &quot;billing-group&quot;]&#125;</code>), <code>revalidate?: number</code> (<code>0</code> = strict no-cache bypass that still mounts a client-refreshable boundary; <code>&gt;= 1</code> = TTL in seconds; omitted = cached until invalidated), and <code>children</code> (standard JSX <code>&lt;AsyncWidget /&gt;</code> or an inline async function <code>&#123;async () =&gt; &#123; ... &#125;&#125;</code>).
                  </li>
                  <li>
                    <strong>Parameterized Dynamic Route Slots:</strong> In dynamic routes like <code>/products/[slug]</code>, interpolate the parameter into <code>id=&#123;`reviews-$&#123;params.slug&#125;`&#125;</code> and <code>tags=&#123;[`reviews-$&#123;params.slug&#125;`, &quot;all-reviews&quot;]&#125;</code> for per-item caching with bulk eviction support.
                  </li>
                  <li>
                    <strong>Nested Slot Isolation (<code>Outer → Inner</code>):</strong> A slow-changing outer <code>&lt;DinouCacheSlot revalidate=&#123;3600&#125;&gt;</code> can wrap a fast-changing inner <code>&lt;DinouCacheSlot revalidate=&#123;30&#125;&gt;</code>. Invalidating or refreshing the inner slot re-evaluates <strong>only</strong> the inner slot via <code>refreshNestedSlotsInTree</code> while the outer slot stays cached!
                  </li>
                  <li>
                    <strong>Client Components &amp; Server Actions Inside Slots (In-Place Fiber Reconciliation):</strong> Slots can render <code>&quot;use client&quot;</code> components and pass <code>&quot;use server&quot;</code> functions as props. When <code>refreshSlot()</code> updates a slot, React reconciles the subtree in place via <code>React.startTransition</code>—updating server props while <strong>preserving all local <code>useState</code> hooks</strong> inside the slot&apos;s Client Components!
                  </li>
                  <li>
                    <strong>Stampede Protection:</strong> Concurrent cache-miss or <code>?fresh=1</code> requests for the same slot key are deduplicated in-flight onto a single render promise.
                  </li>
                </ul>
              </div>

              {/* 2.1 Slot Caching */}
              <section id="slot-caching" className="mt-6 scroll-mt-20">
                <h4>2.1. Component Caching: Dynamic vs. Static &amp; Key Patterns</h4>
                <p>
                  A frequent question is: <em>Is <code>&lt;DinouCacheSlot&gt;</code> meant for dynamic or static pages?</em> It functions as a <strong>universal caching primitive</strong> across both dynamic SSR and static/ISR routes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-foreground">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span>Pattern 1: In Dynamic SSR Pages (Dashboard)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      The outer route is dynamic (reading session cookies, auth tokens, or <code>revalidate = 0</code>). Without a slot, every user request re-executes all expensive queries. With <code>&lt;DinouCacheSlot&gt;</code>, the personalized user greeting renders live, while the 2-second analytics calculation is served from server cache in ~2ms.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-foreground">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      <span>Pattern 2: In Static / ISR Pages (Asymmetric ISR)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      A product catalog page has a slow 24-hour page revalidation (<code>revalidate = 86400</code>). Inside it, a volatile inventory counter uses <code>&lt;DinouCacheSlot revalidate=&#123;60&#125;&gt;</code>. The heavy outer page remains cached for 24h, while the volatile widget updates independently via background SWR.
                    </p>
                  </div>
                </div>

                {/* Pattern 1 Implementation */}
                <div className="space-y-3 my-6">
                  <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Implementation Pattern 1: Dynamic SSR Dashboard with Cached, Nested &amp; Inline-Async Slots
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The route runs in Live SSR mode (evaluating user cookies and personal widgets live). Heavy calculations are cached on the server, including multi-tag slots, inline async function children, and nested Outer → Inner slots:
                  </p>
                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full overflow-hidden rounded-lg my-2"
                  >
{`// src/dashboard/page.tsx
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { FastUserProfile, SlowAnalyticsWidget, FlashDealsBanner } from "./widgets";
import { AnalyticsSkeleton } from "./skeletons";

export default function DashboardPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* 1. Dynamic Component: Evaluated live on every request (reads session/cookies) */}
      <FastUserProfile />

      {/* 2. Micro-ISR Slot with multi-tag group invalidation */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <DinouCacheSlot id="analytics-widget" tags={["analytics", "dashboard-group"]} revalidate={300}>
          <SlowAnalyticsWidget />
        </DinouCacheSlot>
      </Suspense>

      {/* 3. Nested Slots (Outer 1h cache -> Inner 30s cache) + Inline async function child */}
      <DinouCacheSlot id="catalog-outer" tag="catalog-tree" revalidate={3600}>
        {async () => {
          const categories = await db.categories.getTree();
          return (
            <section>
              <CategoryList items={categories} />
              {/* Invalidating "flash-deals" re-renders ONLY this inner slot! */}
              <DinouCacheSlot tag="flash-deals" revalidate={30}>
                <FlashDealsBanner />
              </DinouCacheSlot>
            </section>
          );
        }}
      </DinouCacheSlot>
    </main>
  );
}`}
                  </CodeBlock>
                </div>

                {/* Pattern 2 Implementation */}
                <div className="space-y-3 my-6">
                  <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-500" />
                    Implementation Pattern 2: Static / ISR Product Page with Parameterized Slot
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The parent route has a slow revalidation of 24 hours (<code>revalidate = 86400</code>). Inside it, a volatile inventory counter revalidates vertically every 60 seconds (<code>revalidate=&#123;60&#125;</code>) or on-demand when purchases occur:
                  </p>
                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full overflow-hidden rounded-lg my-2"
                  >
{`// src/products/[slug]/page_functions.ts
import type { PageFunctions } from "dinou/server";

// 1. Slow revalidation for outer page & descriptions (24 hours = 86,400s)
export const revalidate: PageFunctions["revalidate"] = 86400;

// src/products/[slug]/page.tsx
import { DinouCacheSlot, type PageProps } from "dinou/server";
import { ProductHero, ProductDescription } from "./static-widgets";
import { LiveStockCounter } from "./stock-widgets";

export default function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <main className="container py-8 space-y-6">
      {/* 1. Heavy Static Content: Cached for 24 hours */}
      <ProductHero slug={params.slug} />
      <ProductDescription slug={params.slug} />

      {/* 2. Static Shell Micro-ISR Slot: Baked into index.html at build time,
             and refreshed every 60s via non-blocking Background SWR (0ms TTFB) */}
      <DinouCacheSlot
        id={\`stock-\${params.slug}\`}
        tags={[\`stock-\${params.slug}\`, "all-stock"]}
        revalidate={60}
      >
        <LiveStockCounter slug={params.slug} />
      </DinouCacheSlot>
    </main>
  );
}`}
                  </CodeBlock>
                </div>

                {/* Boundary Placement Box */}
                <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>When to Wrap <code>&lt;DinouCacheSlot&gt;</code> in <code>&lt;Suspense&gt;</code> vs. Unwrapped</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Whether you wrap <code>&lt;DinouCacheSlot&gt;</code> inside an outer <code>&lt;Suspense&gt;</code> depends on whether you want the slot to be <strong>baked into the initial HTML shell</strong> or <strong>streamed as a dynamic hole</strong>:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                        1. Unwrapped &lt;DinouCacheSlot&gt; (Static Shell Slot)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        In Static/ISR pages (<code>ppr = false</code>) and in the Static Shell of PPR routes (<code>ppr = true</code>), leaving <code>&lt;DinouCacheSlot revalidate=&#123;60&#125;&gt;</code> <strong>outside</strong> <code>&lt;Suspense&gt;</code> (or wrapping an inner <code>&lt;Suspense&gt;</code> inside the slot) bakes the resolved widget directly into <code>index.html</code> / <code>shell.html</code>. Visitors see the complete content at 0ms with zero skeleton flash, and expired TTLs refresh in the background via SWR without blocking TTFB.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-purple-700 dark:text-purple-300">
                        2. &lt;Suspense&gt; Wrapping &lt;DinouCacheSlot&gt; (Streamed Hole)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        In Dynamic SSR pages (<code>revalidate = 0</code>) or when you want a <strong>Cached Dynamic PPR Hole</strong> on a <code>ppr = true</code> route, place <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code> <strong>outside</strong> <code>&lt;DinouCacheSlot&gt;</code>. The outer shell flushes immediately with the fallback skeleton, while the cached slot resolves from <code>slot.json</code> in ~2ms (or streams live on a cache miss without blocking TTFB).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2.2 Interactive Revalidation & Invalidation */}
              <section id="slot-invalidation" className="mt-8 scroll-mt-20">
                <h4>2.2. Interactive Refresh (<code>refreshSlot</code>), Tag Purging (<code>revalidateTag</code>) &amp; Background SWR</h4>
                <p>
                  Dinou provides surgical mechanisms to refresh or purge <code>&lt;DinouCacheSlot&gt;</code> instances without re-rendering the surrounding page:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <RefreshCw className="h-4 w-4 text-emerald-500" />
                      Client-Side In-Place Refresh (<code>refreshSlot</code>)
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Any interactive Client Component can trigger a surgical re-render of a specific slot (by <code>id</code> or <code>tag</code>) or all mounted slots (via wildcard <code>&quot;*&quot;</code>) without a full page reload or React state loss:
                    </p>
                    <CodeBlock
                      language="tsx"
                      containerClassName="w-full overflow-hidden rounded-lg text-xs"
                    >
{`"use client";
import { refreshSlot, useRouter } from "dinou";

export function RefreshButton() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {/* Option 1: Standalone by ID or shared Tag (respects server slot TTL) */}
      <button onClick={() => refreshSlot("analytics-widget")}>
        Refresh Metrics
      </button>

      {/* Option 2: Force fresh (bypasses server slot TTL immediately) */}
      <button onClick={() => router.refreshSlot("analytics-widget", { fresh: true })}>
        Force Fresh
      </button>

      {/* Option 3: Wildcard "*" refreshes all mounted slots on screen */}
      <button onClick={() => refreshSlot("*", { fresh: true })}>
        Refresh All Slots
      </button>
    </div>
  );
}`}
                    </CodeBlock>
                    <div className="text-[11px] text-muted-foreground bg-background/60 p-2.5 rounded border border-border/60 space-y-1.5 mt-2 break-words min-w-0">
                      <div className="font-semibold text-foreground">Why does <code>fresh: true</code> exist if it is already called <code>refreshSlot</code>?</div>
                      <div>• <strong><code>refreshSlot(idOrTag)</code> (Default)</strong>: Refreshes the client DOM with the server&apos;s current state. If the slot&apos;s server-side TTL (e.g. <code>revalidate=&#123;300&#125;</code>) has not expired, it returns the cached server JSX without touching your database (protecting against button spam and traffic spikes).</div>
                      <div>• <strong><code>refreshSlot(idOrTag, &#123; fresh: true &#125;)</code> (Bypass)</strong>: Hard revalidation. Forces the server to ignore any unexpired TTL, immediately re-run the server component&apos;s queries against your database, and update both <code>slot.json</code> (plus any affected static shells in the background) and the client DOM.</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border flex flex-col justify-between min-w-0">
                    <div className="min-w-0">
                      <div className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                        <Database className="h-4 w-4 text-purple-500" />
                        Server-Side Tag Invalidation (<code>revalidateTag</code>)
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Mutations purge slots globally via <code>revalidateTag()</code> (imported from <code>&quot;dinou/server&quot;</code>), while the client immediately pulls the fresh result via <code>refreshSlot()</code>:
                      </p>

                      <Tabs defaultValue="server" className="w-full not-prose min-w-0">
                        <TabsList className="grid grid-cols-2 h-7 p-0.5 bg-muted/60 text-[11px] mb-2">
                          <TabsTrigger value="server" className="h-6 text-[11px]">
                            actions.ts (Server)
                          </TabsTrigger>
                          <TabsTrigger value="client" className="h-6 text-[11px]">
                            post-creator.tsx (Client)
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="server" className="mt-0 min-w-0">
                          <CodeBlock
                            language="typescript"
                            containerClassName="w-full overflow-hidden rounded-lg text-xs"
                          >
{`// src/feed/actions.ts
"use server";
import { revalidateTag } from "dinou/server";

export async function publishPost(formData: FormData) {
  const content = formData.get("content") as string;
  await db.posts.insert({ content, createdAt: new Date() });

  // 1. Purges & regenerates tagged slots/shells for ALL future visitors
  await revalidateTag("feed");
}`}
                          </CodeBlock>
                        </TabsContent>

                        <TabsContent value="client" className="mt-0 min-w-0">
                          <CodeBlock
                            language="tsx"
                            containerClassName="w-full overflow-hidden rounded-lg text-xs"
                          >
{`// src/feed/post-creator.tsx
"use client";
import { refreshSlot } from "dinou";
import { publishPost } from "./actions";

export function PostCreator() {
  const handleSubmit = async (formData: FormData) => {
    // 1. Mutate & revalidate cache on server
    await publishPost(formData);

    // 2. Surgically re-render feed slot in local DOM
    refreshSlot("feed-widget");
  };

  return (
    <form action={handleSubmit}>
      <input name="content" placeholder="What's new?" />
      <button type="submit">Publish</button>
    </form>
  );
}`}
                          </CodeBlock>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="text-[11px] text-muted-foreground bg-background/60 p-2.5 rounded border border-border/60 space-y-1.5 mt-2 break-words min-w-0">
                      <div className="font-semibold text-foreground">The Synergy of <code>revalidateTag</code> + <code>refreshSlot</code>:</div>
                      <div>• <strong><code>await revalidateTag(&quot;feed&quot;)</code></strong>: Purges the slot cache and updates any affected static shells on disk/KV (via <code>onlyRefreshSlots: true</code> without re-executing <code>page.tsx</code>) for <em>all future users</em> before resolving.</div>
                      <div>• <strong><code>refreshSlot(&quot;feed-widget&quot;)</code></strong>: Pulls the freshly regenerated JSX immediately into the <em>current user&apos;s screen</em> without needing <code>&#123; fresh: true &#125;</code>.</div>
                    </div>
                  </div>
                </div>

                {/* Deep Dive Callout Box */}
                <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Deep Dive: Slot TTL Expiration Lifecycle (Static Shell SWR vs. Dynamic Hole Stream vs. <code>refreshSlot</code>)</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When a <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code> TTL expires, Dinou adapts its revalidation strategy to the context so TTFB is <strong>never</strong> blocked:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs min-w-0">
                    <div className="p-3.5 rounded-md bg-blue-500/10 border border-blue-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5" />
                        <span>1. Static Shell Slots: Background SWR</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        For slots baked into <code>index.html</code> / <code>shell.html</code> (or <code>layout.rsc</code>), an expired TTL serves the cached HTML/RSC immediately (<strong>0ms TTFB</strong>) and triggers background revalidation (<code>onlyRefreshSlots: true</code>) that re-executes only the expired slot and recomposes the host HTML/RSC.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        <span>2. Cached Dynamic Holes: Live Stream</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        For slots wrapped in <code>&lt;Suspense&gt;</code> on <code>ppr = true</code> routes (Cached Dynamic Holes), <code>shell.html</code> with the skeleton fallback is already flushed in <strong>0ms TTFB</strong>. When the slot&apos;s TTL expires, the hole re-executes live in the stream so that visitor immediately receives 100% fresh data.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>3. Interactive refreshSlot: Fresh Delivery</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When a user clicks a button calling <code>refreshSlot()</code> on an expired slot (or with <code>&#123; fresh: true &#125;</code>), the endpoint awaits the new slot render, updates <code>slot.json</code>, and returns the fresh RSC payload directly while <code>DinouCacheSlotBoundary</code> preserves the existing DOM via <code>React.startTransition</code> (zero skeleton flash).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2.3 Anti-Patterns */}
              <section id="slot-anti-patterns" className="mt-8 scroll-mt-20">
                <h4>2.3. Anti-Patterns: When NOT to Use <code>&lt;DinouCacheSlot&gt;</code></h4>

                <div className="border border-rose-500/20 bg-rose-50/20 dark:bg-rose-950/10 rounded-xl p-5 not-prose space-y-3 my-4">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>When NOT to Use &lt;DinouCacheSlot&gt;</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs min-w-0">
                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">
                        1. 100% Immutable Static Pages
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        If an entire route is pre-rendered at build time with no revalidation and no dynamic holes, it is already cached as immutable HTML. Slots add zero benefit unless you need live client <code>refreshSlot()</code>.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">
                        2. Wrapping the Entire Page
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        Wrapping the entire <code>page.tsx</code> body inside a slot reinvents route-level ISR. Declare <code>export const revalidate = 300</code> in <code>page_functions.ts</code> instead.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">
                        3. Shared Static ID for Private Data
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        Never wrap private user data (such as a specific user&apos;s cart or auth session) with a shared static slot ID and <code>revalidate &gt;= 1</code>, as that would cache User A&apos;s data for User B.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            {/* 3. Temporal Axis: Partial Prerendering (PPR) */}
            <section
              id="partial-prerendering"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  3. Temporal Axis (Standalone): Partial Prerendering (PPR)
                </h3>
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  Combination #3 (T)
                </span>
              </div>
              <p className="mt-4">
                <strong>Partial Prerendering (PPR)</strong> is Dinou&apos;s <strong>Temporal Segmentation</strong> axis: instead of forcing a route to be 100% build-time static or 100% request-time dynamic, PPR splits a single route across <em>time</em>. It delivers the pre-rendered{" "}
                <strong>Static Shell (<code>shell.html</code>)</strong> instantly at <strong>0ms</strong>, while streaming{" "}
                <strong>Dynamic <code>&lt;Suspense&gt;</code> Holes</strong> in parallel over the same HTTP response connection.
              </p>

              {/* 3.1 Architecture & The <Suspense> Boundary Rule */}
              <section id="ppr-architecture" className="mt-6 scroll-mt-20">
                <h4>3.1. Hybrid Architecture &amp; The <code>&lt;Suspense&gt;</code> Boundary Rule</h4>
                <p>
                  In Dinou, <strong>React <code>&lt;Suspense&gt;</code> is the single syntactic boundary</strong> separating the build-time Static Shell from request-time Dynamic PPR Holes on a <code>ppr = true</code> route:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-emerald-500/5 border-emerald-500/20 space-y-2 min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      <span>Outside &lt;Suspense&gt; → Static Shell (shell.html)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Everything outside <code>&lt;Suspense&gt;</code>—including <code>getProps</code>, top-level <code>async</code> Page/Layout components, unwrapped child <code>async</code> Server Components, synchronous <code>&lt;Suspense&gt;</code> boundaries, and unwrapped <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code>—is awaited at build/revalidation time and baked into <code>shell.html</code>.
                    </p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300 pt-1">
                      ⚠️ Reading <code>req.cookies</code>, <code>req.headers</code>, <code>req.query</code>, or rendering <code>&lt;DinouCacheSlot revalidate=&#123;0&#125;&gt;</code> <strong>outside</strong> <code>&lt;Suspense&gt;</code> triggers a Full-Page Dynamic Bailout (rendering the whole page dynamically per request).
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-purple-500/5 border-purple-500/20 space-y-2 min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-purple-700 dark:text-purple-300">
                      <Zap className="h-4 w-4 text-purple-500" />
                      <span>Inside &lt;Suspense&gt; → Dynamic PPR Hole by Default</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      On a <code>ppr = true</code> route, <strong>any <code>async</code> Server Component inside <code>&lt;Suspense&gt;</code></strong> automatically postpones at its very first <code>await</code> (with zero build latency) to become a <strong>Dynamic PPR Hole</strong> (<code>data-ppr-hole=&quot;ppr-hole-N&quot;</code>)—even if it never touches cookies or headers! Reading <code>getContext()</code> (<code>cookies</code>/<code>headers</code>/<code>query</code>), <code>useSearchParams()</code>, or <code>revalidate=&#123;0&#125;</code> inside <code>&lt;Suspense&gt;</code> is likewise quarantined to that hole.
                    </p>
                    <p className="text-[11px] text-muted-foreground pt-1">
                      💡 <strong>Core Takeaway:</strong> The <em>only</em> behavioral difference between <code>ppr = false</code> and <code>ppr = true</code> is inside <code>&lt;Suspense&gt;</code> (where <code>ppr = false</code> resolves <code>async</code> components into <code>index.html</code> at build time, while <code>ppr = true</code> turns them into streaming holes unless opted out via <code>noDynamic()</code>).
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-card not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <span>The Single HTTP Response Timeline &amp; Pre-Hydration DOM Replacement</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>
                      <strong>Instant TTFB (~2.42ms):</strong> The browser immediately receives the cached <code>shell.html</code> containing the resolved Static Shell and the <code>&lt;div data-ppr-hole=&quot;ppr-hole-N&quot;&gt;</code> fallback skeletons.
                    </li>
                    <li>
                      <strong>Concurrent Out-of-Order Hole Execution:</strong> Dinou executes only the registered <code>metadata.holes</code> in parallel on the server (unwrapping <code>React.memo</code> / <code>React.forwardRef</code>, deduplicating nested <code>&lt;Suspense&gt;</code> boundaries inside outer holes, and skipping static <code>noDynamic()</code> boundaries and cached Static Shell slots in 0ms).
                    </li>
                    <li>
                      <strong>Pre-Hydration In-Place Streaming Replacement:</strong> As each hole resolves (fastest first), Dinou streams an HTML <code>&lt;template id=&quot;ppr-content-ppr-hole-N&quot;&gt;</code> + self-cleaning inline <code>&lt;script&gt;</code> down the same HTTP connection, swapping the skeleton with live content <strong>even before client React hydration completes</strong>.
                    </li>
                  </ol>
                </div>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`// src/store/page.tsx (with export const ppr = true in page_functions.ts)
import { Suspense } from "react";
import { getContext } from "dinou/server";
import db from "@/lib/db";
import { CartBadgeSkeleton, StockSkeleton } from "@/components/skeletons";

// 1. Unwrapped async Server Component (OUTSIDE <Suspense>) -> Baked into shell.html at build time!
async function FeaturedCatalogBanner() {
  const banner = await db.catalog.getFeaturedBanner();
  return <section className="banner">{banner.title}</section>;
}

// 2. Async Server Component (INSIDE <Suspense>, no cookies) -> Dynamic PPR Hole by default!
async function RealtimeInventoryTicker() {
  const stock = await db.inventory.getGlobalCount();
  return <div className="stock-ticker">In Stock Now: {stock}</div>;
}

// 3. Request-aware Component (INSIDE <Suspense>, reads cookies) -> Dynamic PPR Hole!
async function LiveCartBadge() {
  const sessionToken = getContext()?.req.cookies["session_id"];
  const cart = await db.carts.findActive(sessionToken);
  return <div className="cart-badge">Items: {cart?.itemCount ?? 0}</div>;
}

export default async function StorePage() {
  return (
    <main className="container">
      {/* Resolved at build time into shell.html */}
      <FeaturedCatalogBanner />

      {/* Postponed at first await -> Fallback in shell.html, streamed live on every request */}
      <Suspense fallback={<StockSkeleton />}>
        <RealtimeInventoryTicker />
      </Suspense>

      {/* Cookie access quarantined inside <Suspense> -> Streamed per user without full-page bailout */}
      <Suspense fallback={<CartBadgeSkeleton />}>
        <LiveCartBadge />
      </Suspense>
    </main>
  );
}`}
                </CodeBlock>
              </section>

              {/* 3.2 Static <Suspense> Opt-Out via noDynamic() & Runtime Performance */}
              <section id="ppr-no-dynamic" className="mt-8 scroll-mt-20">
                <h4>3.2. Static <code>&lt;Suspense&gt;</code> Opt-Out (<code>noDynamic()</code>) &amp; Runtime Performance</h4>
                <p>
                  What if you wrap an <code>async</code> Server Component in <code>&lt;Suspense&gt;</code> on a <code>ppr = true</code> route (for example, to show a fallback during SPA client transitions or while rendering static Markdown/syntax highlighting), and you want it <strong>baked into the Static Shell (<code>shell.html</code>) at build time</strong> instead of becoming a Dynamic PPR Hole?
                </p>
                <p>
                  Call <strong><code>noDynamic()</code></strong> (exported from both <code>&quot;dinou&quot;</code> and <code>&quot;dinou/server&quot;</code>) synchronously at the top of your <code>async</code> Server Component <strong>before its first <code>await</code></strong>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`import { Suspense } from "react";
import { noDynamic } from "dinou/server"; // or from "dinou"

async function StaticMarkdownArticle({ slug }: { slug: string }) {
  // Opts the enclosing <Suspense> boundary into the Static Shell (shell.html)
  // Must be called synchronously BEFORE the first await!
  noDynamic();

  const markdown = await readMarkdownFromDisk(slug);
  const html = await highlightCodeBlocks(markdown);
  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function DocPage() {
  return (
    <Suspense fallback={<p>Loading article...</p>}>
      <StaticMarkdownArticle slug="intro" />
    </Suspense>
  );
}`}
                </CodeBlock>

                <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    <span>Rules &amp; Runtime Performance Advantage of <code>noDynamic()</code></span>
                  </div>
                  <ul className="text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                    <li>
                      <strong>Must Precede the First <code>await</code>:</strong> Because Dinou inspects the component&apos;s synchronous execution frame right when it returns its initial Promise, calling <code>noDynamic()</code> <em>after</em> the first <code>await</code> is too late and the boundary will still become a Dynamic Hole.
                    </li>
                    <li>
                      <strong>Subtree Inheritance &amp; Nested Dynamic Holes:</strong> Calling <code>noDynamic()</code> in a parent component inside <code>&lt;Suspense&gt;</code> automatically opts out all child <code>async</code> components inside that same <code>&lt;Suspense&gt;</code> boundary. If that static <code>&lt;Suspense&gt;</code> boundary contains a nested inner <code>&lt;Suspense&gt;</code> boundary without <code>noDynamic()</code>, the outer wrapper bakes into <code>shell.html</code> while the inner boundary cleanly streams as a dynamic hole!
                    </li>
                    <li>
                      <strong>Dynamic Bailout Always Wins:</strong> If a component or child inside a <code>noDynamic()</code> boundary reads <code>req.cookies</code>, <code>req.headers</code>, <code>req.query</code>, or renders <code>&lt;DinouCacheSlot revalidate=&#123;0&#125;&gt;</code>, Dinou overrides <code>noDynamic()</code> and turns the boundary into a Dynamic PPR Hole to prevent leaking request data into <code>shell.html</code>.
                    </li>
                    <li>
                      <strong>0ms Runtime Short-Circuit on Routes with Dynamic Holes:</strong> When a <code>ppr = true</code> route has at least one Dynamic PPR Hole, Dinou traverses the component tree at request time to locate and stream the dynamic holes. Any <em>unwrapped</em> <code>async</code> Server Component in the Static Shell is awaited during that traversal, whereas a static <code>&lt;Suspense&gt;</code> with <code>noDynamic()</code> (or a cached <code>&lt;DinouCacheSlot id=&quot;...&quot;&gt;</code>) <strong>short-circuits in 0ms with zero re-execution</strong>! Therefore, on <code>ppr = true</code> pages that mix static async I/O with dynamic holes, always wrap heavy static async components in either <code>&lt;Suspense&gt;</code> + <code>noDynamic()</code> or <code>&lt;DinouCacheSlot id=&quot;...&quot;&gt;</code>.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3.3 Activation & Specificity */}
              <section id="ppr-activation" className="mt-8 scroll-mt-20">
                <h4>3.3. Enabling PPR, Child Opt-Out (<code>ppr = false</code>) &amp; Specificity Hierarchy</h4>
                <p>
                  Dinou provides granular control over Partial Prerendering across three hierarchical levels: <strong>Global</strong> (<code>dinou.config.mjs</code>), <strong>Layout</strong> (<code>layout_functions.ts</code>), and <strong>Page</strong> (<code>page_functions.ts</code>). A child page or nested layout can also explicitly opt out with <code>export const ppr = false</code> even when a parent layout enables PPR:
                </p>

                <div className="border rounded-lg p-4 bg-card not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Split className="h-5 w-5 text-purple-500" />
                    <span>Specificity Hierarchy (Most Specific Always Wins)</span>
                  </div>
                  <div className="grid gap-2 font-mono text-xs mt-3">
                    <div className="p-2 rounded bg-muted/80 flex items-center justify-between border-l-4 border-purple-500">
                      <span>1. <strong>page_functions.ts</strong> (Page Level: <code>ppr = true | false</code>)</span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400">Highest Priority</span>
                    </div>
                    <div className="p-2 rounded bg-muted/80 flex items-center justify-between border-l-4 border-indigo-500">
                      <span>2. <strong>layout_functions.ts</strong> (Nested Layouts: <code>ppr = true | false</code>)</span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">Cascades to subroutes</span>
                    </div>
                    <div className="p-2 rounded bg-muted/80 flex items-center justify-between border-l-4 border-blue-500">
                      <span>3. <strong>layout_functions.ts</strong> (Root Layout)</span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">Section Default</span>
                    </div>
                    <div className="p-2 rounded bg-muted/80 flex items-center justify-between border-l-4 border-slate-500">
                      <span>4. <strong>dinou.config.mjs</strong> (Global Application)</span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Global Fallback</span>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            {/* 4. Pairwise Synergy #1: Horizontal + Vertical */}
            <section
              id="pairwise-hs-slot"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  4. Pairwise Synergy #1: Horizontal + Vertical (<code>layout_functions.ts</code> + <code>&lt;DinouCacheSlot&gt;</code>)
                </h3>
                <span className="inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-600 dark:text-teal-400 ring-1 ring-inset ring-teal-500/20">
                  Combination #4 (H + V)
                </span>
              </div>
              <p className="mt-4">
                When you combine <strong>Horizontal Segmentation</strong> (<code>layout.rsc</code> + <code>page.rsc</code> + parallel <code>@sidebar</code> routes) with <strong>Vertical Segmentation</strong> (<code>&lt;DinouCacheSlot&gt;</code> &amp; <code>refreshSlot</code>) on standard routes (<code>ppr = false</code>), you unlock surgical component-level caching across multi-level layouts, parallel slots, and sibling pages—complete with client-side memory persistence across SPA navigations.
              </p>

              {/* 4.1 Layout Slots, @sidebar Slots & Cross-Axis Shared Tags */}
              <section id="hs-slot-capabilities" className="mt-6 scroll-mt-20">
                <h4>4.1. Layout Slots, <code>@sidebar</code> Parallel Slots &amp; Cross-Axis Shared Tags</h4>
                <p>
                  From a developer&apos;s perspective, combining Horizontal and Vertical segmentation enables four powerful patterns:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-teal-500" />
                      <span>1. Layout-Level &amp; @sidebar Slots</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Place <code>&lt;DinouCacheSlot&gt;</code> inside <code>layout.tsx</code>, nested <code>L2</code> layouts, or parallel routes (<code>@sidebar/page.tsx</code>). Calling <code>revalidateTag(&quot;sidebar-slot-tag&quot;)</code> + <code>refreshSlot(&quot;sidebar-slot-tag&quot;)</code> updates the widget inside the layout or <code>@sidebar</code> in place (via <code>onlyRefreshSlots: true</code>) <strong>without re-executing <code>layout.tsx</code>, <code>layout_functions.ts</code>, or the active <code>page.tsx</code></strong>.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>2. Cross-Axis Shared Tag Invalidation</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      A slot in <code>layout.tsx</code> (e.g., a header cart counter) and a slot in <code>page.tsx</code> (e.g., an order summary table) can share a tag (<code>tags=&#123;[&quot;cart-sync&quot;]&#125;</code>). A single call to <code>await revalidateTag(&quot;cart-sync&quot;)</code> + <code>refreshSlot(&quot;cart-sync&quot;)</code> updates <strong>both</strong> the layout slot and the page slot simultaneously!
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>3. Dynamic Slot (revalidate=&#123;0&#125;) in Static Page</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      On a <code>ppr = false</code> static page, rendering <code>&lt;DinouCacheSlot id=&quot;live-ticker&quot; revalidate=&#123;0&#125;&gt;</code> bypasses disk caching for that slot on every refresh while keeping the surrounding static page and layout cached.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>4. Host Revalidation Reuses Cached Slots</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Conversely, when you call <code>revalidatePage(&quot;/workspace&quot;)</code> or <code>revalidateLayout(&quot;/workspace&quot;)</code> to update the host page or layout, Dinou automatically reuses all unexpired <code>&lt;DinouCacheSlot&gt;</code> entries from <code>slots/&lt;id&gt;/slot.json</code> without re-running their expensive queries!
                    </p>
                  </div>
                </div>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`// 1. src/workspace/layout.tsx (Cached for 1h via layout_functions.ts)
import { DinouCacheSlot } from "dinou/server";
import { HeaderCreditsBadge } from "./widgets";

export default function WorkspaceLayout({ children, sidebar }: { children: React.ReactNode; sidebar: React.ReactNode }) {
  return (
    <div className="workspace-shell">
      <header>
        {/* Cross-axis shared tag "credits-sync": updates alongside page slot! */}
        <DinouCacheSlot id="header-credits" tags={["credits-sync", "header-only"]} revalidate={300}>
          <HeaderCreditsBadge />
        </DinouCacheSlot>
      </header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

// 2. src/workspace/page.tsx (Cached for 1h via page_functions.ts)
import { DinouCacheSlot } from "dinou/server";
import { UsageBreakdownTable, RealtimePingWidget } from "./widgets";

export default function WorkspacePage() {
  return (
    <section className="space-y-6">
      {/* Shares "credits-sync" tag with the layout header slot */}
      <DinouCacheSlot id="page-usage-table" tags={["credits-sync", "usage-only"]} revalidate={300}>
        <UsageBreakdownTable />
      </DinouCacheSlot>

      {/* Always-fresh slot (revalidate={0}) inside a static host page */}
      <DinouCacheSlot id="realtime-ping" revalidate={0}>
        <RealtimePingWidget />
      </DinouCacheSlot>
    </section>
  );
}`}
                </CodeBlock>
              </section>

              {/* 4.2 Cross-Route Slot Persistence & Unmounted Slot Refresh */}
              <section id="hs-slot-client" className="mt-8 scroll-mt-20">
                <h4>4.2. Cross-Route Slot Persistence (<code>slotOverrideCache</code>) &amp; Unmounted Slot Refresh</h4>
                <p>
                  On non-PPR routes, Dinou&apos;s client router caches resolved pages in <code>pageCache</code> so round-trip soft navigation (<code>Page A → Page B → Page A</code>) completes in <strong>0ms with 0 network requests</strong>. Dinou synchronizes <code>&lt;DinouCacheSlot&gt;</code> state with <code>pageCache</code> automatically:
                </p>
                <ul>
                  <li>
                    <strong>Refreshed Slot Persistence Across Soft Navigation (<code>slotOverrideCache</code>):</strong> If a user refreshes a slot on <code>Page A</code> via <code>refreshSlot(&quot;page-usage-table&quot;)</code>, navigates to <code>Page B</code>, and clicks back to <code>Page A</code>, <code>DinouCacheSlotBoundary</code> restores the refreshed slot tree from <code>slotOverrideCache</code> instead of reverting to the initial pre-refresh <code>pageCache</code> tree—while automatically yielding to newer server payloads when <code>router.refresh()</code> or <code>&lt;Link fresh&gt;</code> is used.
                  </li>
                  <li>
                    <strong>Refreshing an Unmounted Slot From a Sibling Route (<code>knownClientSlots</code>):</strong> If the user is currently on <code>Page B</code> (so <code>Page A</code>&apos;s slots are <em>unmounted</em>) and triggers an action that calls <code>refreshSlot(&quot;usage-only&quot;)</code>, Dinou&apos;s global slot registry detects that <code>page-usage-table</code> belongs to <code>Page A</code> and refreshes it in the background with <code>currentPath: &quot;/workspace&quot;</code>. When the user navigates back to <code>Page A</code>, the updated slot is already waiting in memory!
                  </li>
                  <li>
                    <strong>Out-of-Order Race Protection (Last-Write-Wins):</strong> If a slow <code>refreshSlot(id, &#123; fresh: true &#125;)</code> is followed immediately by a fast <code>refreshSlot(id, &#123; fresh: true &#125;)</code> (whether mounted or unmounted), monotonic request and render generation counters guarantee that the slower earlier response never overwrites the newer state on either the client or the server.
                  </li>
                </ul>
              </section>
            </section>

            {/* 5. Pairwise Synergy #2: Horizontal + Temporal (PPR) */}
            <section
              id="pairwise-hs-ppr"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  5. Pairwise Synergy #2: Horizontal + Temporal (<code>layout_functions.ts</code> + PPR)
                </h3>
                <span className="inline-flex items-center rounded-md bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-600 dark:text-sky-400 ring-1 ring-inset ring-sky-500/20">
                  Combination #5 (H + T)
                </span>
              </div>
              <p className="mt-4">
                When you combine <strong>Horizontal Segmentation</strong> and <strong>Partial Prerendering (PPR)</strong> (even without <code>&lt;DinouCacheSlot&gt;</code>), every layout, parallel route (<code>@sidebar</code>), and page maintains its own frozen Static Shell while streaming its own dynamic <code>&lt;Suspense&gt;</code> holes in a single unified response.
              </p>

              {/* 5.1 Dual Frozen Static Shells & Unified Hole Streaming */}
              <section id="hs-ppr-shells" className="mt-6 scroll-mt-20">
                <h4>5.1. Dual Frozen Static Shells (<code>shell.layout.json</code> + <code>shell.page.json</code>) &amp; Unified Hole Streaming</h4>
                <p>
                  In a segmented PPR route hierarchy, Dinou separates the static shell into two independent artifacts—<strong><code>shell.layout.json</code> / <code>layout.rsc</code></strong> (for the layout chain and <code>@sidebar</code>) and <strong><code>shell.page.json</code> / <code>shell.rsc</code></strong> (for the leaf page)—while numbering all dynamic <code>&lt;Suspense&gt;</code> holes in unified pre-order (<code>L1 Layout → @sidebar → L2 Layout → Page</code>):
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`// 1. src/dashboard/layout_functions.ts
import type { LayoutFunctions } from "dinou/server";
export const ppr: LayoutFunctions["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600; // Layout static shell cached for 1h
export const getCacheTags: LayoutFunctions["getCacheTags"] = ["dashboard-layout-tag"];

export async function getProps() {
  // Runs ONLY at build time or when "dashboard-layout-tag" / revalidateLayout is triggered
  return { orgName: await db.orgs.getDefaultName() };
}

// 2. src/dashboard/layout.tsx
import { Suspense } from "react";
import { getContext } from "dinou/server";

async function LiveUserHeaderHole() {
  // PPR Hole #1 (in Layout): Streams on every request & on router.refresh({ layout: true })
  const user = getContext()?.req.cookies["session_user"] ?? "guest";
  return <span>Signed in as {user}</span>;
}

export default function DashboardLayout({ children, sidebar, orgName }: any) {
  return (
    <div className="dashboard-shell">
      <header>
        <h1>{orgName}</h1> {/* Frozen in shell.layout.json for 1h */}
        <Suspense fallback={<span>Loading user...</span>}>
          <LiveUserHeaderHole />
        </Suspense>
      </header>
      <aside>{sidebar}</aside> {/* Can also host PPR Hole #2 in @sidebar/page.tsx! */}
      <main>{children}</main>
    </div>
  );
}

// 3. src/dashboard/page_functions.ts
import type { PageFunctions } from "dinou/server";
export const ppr: PageFunctions["ppr"] = true;
export const revalidate: PageFunctions["revalidate"] = 300; // Page static shell cached independently for 5m
export const getCacheTags: PageFunctions["getCacheTags"] = ["dashboard-home-tag"];`}
                </CodeBlock>
              </section>

              {/* 5.2 Surgical Layout vs Page Revalidation & router.refresh() */}
              <section id="hs-ppr-revalidation" className="mt-8 scroll-mt-20">
                <h4>5.2. Surgical Layout vs. Page Revalidation, Cross-Mode Soft Nav &amp; <code>router.refresh()</code></h4>
                <p>
                  Combining Horizontal Segmentation with PPR gives you surgical control over both server-side shell invalidation and client-side hole refreshing:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3.5">Operation / API</th>
                        <th className="p-3.5">Effect on Layout Shell &amp; Layout Holes</th>
                        <th className="p-3.5">Effect on Page Shell &amp; Page Holes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">router.refresh()</td>
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">Untouched (0 /____rsc_layout____ requests; layout state preserved)</td>
                        <td className="p-3.5 text-purple-600 dark:text-purple-400">Page static shell stays frozen (from shell.page.json); Page dynamic &lt;Suspense&gt; holes re-execute live with current cookies/query!</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">router.refresh(&#123; layout: true &#125;)</td>
                        <td className="p-3.5 text-purple-600 dark:text-purple-400">Layout static shell stays frozen (from shell.layout.json); Layout &amp; @sidebar dynamic &lt;Suspense&gt; holes re-execute live!</td>
                        <td className="p-3.5 text-purple-600 dark:text-purple-400">Page static shell stays frozen (from shell.page.json); Page dynamic &lt;Suspense&gt; holes re-execute live!</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">revalidatePage(&quot;/dashboard&quot;) (or Page Tag / Page TTL)</td>
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">0 layout.tsx executions! Reuses cached layout.rsc to compose new shell.html</td>
                        <td className="p-3.5 text-amber-600 dark:text-amber-400">Regenerates page static shell (shell.page.json, shell.rsc, shell.html) while preserving dynamic hole streaming</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">revalidateLayout(&quot;/dashboard&quot;) (or Layout Tag / Layout TTL)</td>
                        <td className="p-3.5 text-amber-600 dark:text-amber-400">Regenerates layout.rsc &amp; shell.layout.json (and cascades to nested L2 layouts)</td>
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">0 page.tsx executions! Next GET lazily re-composes shell.html from fresh layout.rsc + frozen shell.rsc</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">Soft Nav: PPR Page ↔ Static Opt-Out Page (ppr = false)</td>
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">Shared parent PPR layout stays mounted with 0 layout network requests</td>
                        <td className="p-3.5 text-muted-foreground">Seamlessly switches between streamed PPR pages and 100% static opt-out child pages</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            {/* 6. Pairwise Synergy #3: Vertical + Temporal (<DinouCacheSlot> + PPR) */}
            <section
              id="pairwise-slot-ppr"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  6. Pairwise Synergy #3: Vertical + Temporal (<code>&lt;DinouCacheSlot&gt;</code> + PPR)
                </h3>
                <span className="inline-flex items-center rounded-md bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-600 dark:text-violet-400 ring-1 ring-inset ring-violet-500/20">
                  Combination #6 (V + T)
                </span>
              </div>
              <p className="mt-4">
                Combining <strong>Vertical Segmentation (<code>&lt;DinouCacheSlot&gt;</code>)</strong> and <strong>Temporal Segmentation (PPR)</strong> on the same route unlocks a <strong>3-Tier Hybrid Rendering Architecture</strong>: you can place slots in the 0ms Static Shell, turn a slot into a ~2ms Cached Dynamic Hole, or embed cached slots <em>inside</em> a personalized per-user dynamic hole.
              </p>

              {/* 6.1 Nesting-Order Semantics */}
              <section id="ppr-slot-nesting" className="mt-6 scroll-mt-20">
                <h4>6.1. Nesting-Order Semantics &amp; The 3-Tier Hybrid Architecture</h4>
                <p>
                  On a <code>ppr = true</code> route, the nesting order between <code>&lt;Suspense&gt;</code> and <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code> (where <code>N &gt;= 1</code> or omitted) determines whether the slot becomes a <strong>Cached Dynamic PPR Hole</strong> or a <strong>Static Shell Slot</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-indigo-500/5 border-indigo-500/20 space-y-2 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-indigo-500" />
                        Pattern A: &lt;Suspense&gt; Outside &lt;DinouCacheSlot&gt;
                      </span>
                      <Badge variant="outline" className="text-[10px] text-indigo-600 dark:text-indigo-400 border-indigo-500/40">
                        Cached Dynamic Hole
                      </Badge>
                    </div>
                    <p className="font-mono text-[11px] bg-background/80 p-2 rounded border">
                      &lt;Suspense fallback=&#123;...&#125;&gt;{"\n"}
                      {"  "}&lt;DinouCacheSlot id=&quot;metrics&quot; revalidate=&#123;60&#125;&gt;{"\n"}
                      {"    "}&lt;HeavyMetricsGraph /&gt;{"\n"}
                      {"  "}&lt;/DinouCacheSlot&gt;{"\n"}
                      &lt;/Suspense&gt;
                    </p>
                    <ul className="text-muted-foreground space-y-1 pl-4 list-disc leading-relaxed">
                      <li><strong>Build Time:</strong> Postpones into a PPR hole; <code>shell.html</code> bakes the skeleton fallback.</li>
                      <li><strong>Runtime Cache Hit:</strong> Streams from <code>slot.json</code> in <strong>~2ms</strong> (99.9% DB offload across concurrent visitors).</li>
                      <li><strong>On TTL Expiry / <code>revalidateTag</code>:</strong> Evicts only <code>slots/metrics</code>; <code>shell.html</code> stays 100% intact (0ms TTFB) and the hole refreshes live in the stream!</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 bg-emerald-500/5 border-emerald-500/20 space-y-2 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Layers className="h-4 w-4 text-emerald-500" />
                        Pattern B: &lt;DinouCacheSlot&gt; Outside (or + noDynamic)
                      </span>
                      <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/40">
                        Static Shell Slot
                      </Badge>
                    </div>
                    <p className="font-mono text-[11px] bg-background/80 p-2 rounded border">
                      &lt;DinouCacheSlot id=&quot;pricing&quot; revalidate=&#123;60&#125;&gt;{"\n"}
                      {"  "}&lt;PricingTable /&gt; {/* or inner <Suspense> */}{"\n"}
                      &lt;/DinouCacheSlot&gt;
                    </p>
                    <ul className="text-muted-foreground space-y-1 pl-4 list-disc leading-relaxed">
                      <li><strong>Build Time:</strong> Resolves completely into <code>slot.json</code> (<code>inStaticShell: true</code>) and bakes the HTML directly into <code>shell.html</code> (0ms, no skeleton).</li>
                      <li><strong>Runtime Hole Traversal:</strong> Short-circuits from <code>slot.json</code> in 0ms while preserving any inner <code>&lt;Suspense&gt;</code> nodes so hole indices never drift.</li>
                      <li><strong>On TTL Expiry / <code>revalidateTag</code>:</strong> Uses <strong>Background SWR</strong> (<code>onlyRefreshSlots: true</code>) to update <code>slot.json</code> + <code>shell.html</code> without re-executing <code>page.tsx</code>.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6.2 Micro-ISR Inside Personalized Holes & Surgical Tag Differentiation */}
              <section id="ppr-slot-patterns" className="mt-8 scroll-mt-20">
                <h4>6.2. Micro-ISR Inside Personalized Holes &amp; Surgical Tag Invalidation</h4>
                <p>
                  What if a dynamic PPR <code>&lt;Suspense&gt;</code> hole reads user-specific request data (<code>req.cookies</code>, <code>req.headers</code>, or <code>req.query</code>), and <em>inside</em> that personalized hole you also need to render an expensive shared calculation or a nested <code>Outer → Inner</code> slot hierarchy?
                </p>
                <p>
                  Simply place <code>&lt;DinouCacheSlot&gt;</code> <strong>inside</strong> the personalized component! Thanks to Dinou&apos;s transactional <code>&lt;Suspense&gt;</code> effect frames, any slot inside a boundary that postpones is marked <code>inStaticShell: false</code>. At request time, the outer hole executes per user with live cookies/query, while the inner <code>&lt;DinouCacheSlot&gt;</code> hits <code>slot.json</code> in sub-millisecond time:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`// src/feed/page.tsx (with export const ppr = true in page_functions.ts)
import { Suspense } from "react";
import { DinouCacheSlot, getContext } from "dinou/server";

async function PersonalizedDepartmentHole() {
  // 1. Runs live on EVERY request with the user's cookies & query params
  const ctx = getContext();
  const user = ctx?.req.cookies["session_user"] ?? "guest";
  const dept = ctx?.req.cookies["dept_id"] ?? "general";

  return (
    <section className="space-y-4">
      <h2>Welcome back, {user} (Department: {dept})</h2>

      {/* 2. Cached across all users in the same department for 1h (or until revalidateTag) */}
      <DinouCacheSlot id={\`dept-outer-\${dept}\`} tag={\`dept-\${dept}\`} revalidate={3600}>
        <div className="dept-panel">
          <QuarterlyDepartmentSummary dept={dept} />

          {/* 3. Nested inner slot with a fast 60s TTL inside the 1h outer slot */}
          <DinouCacheSlot id={\`dept-ticker-\${dept}\`} tag="live-kpi" revalidate={60}>
            <DepartmentKpiTicker dept={dept} />
          </DinouCacheSlot>
        </div>
      </DinouCacheSlot>
    </section>
  );
}

export default function FeedPage() {
  return (
    <main>
      {/* Tier 1: Static Shell Slot (baked into shell.html at 0ms TTFB, refreshable via refreshSlot) */}
      <DinouCacheSlot id="announcement-banner" tag="banner" revalidate={3600}>
        <GlobalAnnouncementBanner />
      </DinouCacheSlot>

      {/* Tier 2 & 3: Per-request personalized hole containing nested Micro-ISR slots */}
      <Suspense fallback={<div>Streaming your department workspace...</div>}>
        <PersonalizedDepartmentHole />
      </Suspense>
    </main>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 7. The Triple Synergy: Horizontal + Vertical + Temporal */}
            <section
              id="ppr-slot-synergy"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  7. The Triple Synergy: Horizontal + Vertical + Temporal (PPR)
                </h3>
                <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  Combination #7 (H + V + T)
                </span>
              </div>
              <p className="mt-4">
                In <strong>Triple Synergy</strong>, all three dimensions operate simultaneously on the same route tree: multi-level <strong>Horizontal Layouts</strong> (<code>layout_functions.ts</code>), <strong>Temporal PPR Pages</strong> (<code>ppr = true</code> alongside <code>ppr = false</code> static sibling routes), and <strong>Vertical <code>&lt;DinouCacheSlot&gt;</code></strong> boundaries placed inside layout shells, page static shells, and streamed dynamic <code>&lt;Suspense&gt;</code> holes.
              </p>

              {/* 7.1 High-Traffic Telemetry & Full-Stack 3D Composition Example */}
              <section id="triple-synergy-example" className="mt-6 scroll-mt-20">
                <h4>7.1. Full-Stack 3D Composition Example (Layout + Page + Slots + PPR)</h4>
                <p>
                  Below, a single route tree combines a segmented PPR Layout (hosting a layout-level <code>&lt;DinouCacheSlot&gt;</code> and a layout dynamic hole) with a PPR Page (hosting a Static Shell <code>&lt;DinouCacheSlot&gt;</code>, a Cached Dynamic Hole, and an uncached per-user Dynamic Hole):
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-4 text-xs"
                >
{`// 1. src/telemetry/layout_functions.ts (Horizontal Axis + PPR Inheritance)
import type { LayoutFunctions } from "dinou/server";
export const ppr: LayoutFunctions["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600;
export const getCacheTags: LayoutFunctions["getCacheTags"] = ["telemetry-layout"];

// 2. src/telemetry/layout.tsx (Layout Shell + Layout Slot + Layout Hole)
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { ClusterRegionSelector, IncidentAlertBar } from "./layout-widgets";

export default function TelemetryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="telemetry-workspace">
      <header className="flex items-center justify-between">
        {/* Layout-level Static Shell Slot: shared across all /telemetry/* routes */}
        <DinouCacheSlot id="incident-bar" tag="incident-alert" revalidate={120}>
          <IncidentAlertBar />
        </DinouCacheSlot>
        <ClusterRegionSelector /> {/* Client Component: state preserved across soft nav */}
      </header>
      {children}
    </div>
  );
}

// 3. src/telemetry/page_functions.ts
import type { PageFunctions } from "dinou/server";
export const ppr: PageFunctions["ppr"] = true;
export const getCacheTags: PageFunctions["getCacheTags"] = ["telemetry-page"];

// 4. src/telemetry/page.tsx (Page Shell Slot + Cached Hole + Personalized Hole)
import { Suspense } from "react";
import { DinouCacheSlot, getContext } from "dinou/server";
import { GlobalStatusBanner, HeavyMetricsGraph, GraphSkeleton } from "./widgets";

async function UserAuditTrail() {
  const userId = getContext()?.req.cookies["user_id"] ?? "anon";
  const logs = await db.audit.getRecentForUser(userId);
  return <pre>{JSON.stringify(logs, null, 2)}</pre>;
}

export default function TelemetryPage() {
  return (
    <main className="container py-8 space-y-6">
      {/* A. Page Static Shell Micro-ISR Slot: Baked into shell.html, 300s Background SWR */}
      <DinouCacheSlot id="global-status" tag="status-banner" revalidate={300}>
        <GlobalStatusBanner />
      </DinouCacheSlot>

      {/* B. Cached Dynamic PPR Hole: Skeleton in shell.html, ~2ms cached stream for 60s */}
      <Suspense fallback={<GraphSkeleton />}>
        <DinouCacheSlot id="operations-telemetry" tag="telemetry" revalidate={60}>
          <HeavyMetricsGraph />
        </DinouCacheSlot>
      </Suspense>

      {/* C. Uncached Per-User PPR Hole: Streamed live per request */}
      <Suspense fallback={<div>Loading your audit trail...</div>}>
        <UserAuditTrail />
      </Suspense>
    </main>
  );
}`}
                </CodeBlock>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs not-prose min-w-0">
                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-foreground">
                      <Zap className="h-4 w-4 text-amber-500" />
                      ~2.42ms Shell TTFB
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Outer layout shell, page shell, static slots, and fallback skeletons arrive immediately from Dinou&apos;s cache.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-foreground">
                      <Clock className="h-4 w-4 text-indigo-500" />
                      ~2ms Cached Hole Delivery
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Visitors receive the precalculated RSC Flight stream from <code>slot.json</code> almost instantly.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-foreground">
                      <TrendingDown className="h-4 w-4 text-emerald-500" />
                      99.9% Query Relief
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      10,000 concurrent visitors/min trigger only 1 shared telemetry DB query per 60s TTL.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7.2 4-Way Surgical Invalidation & Synergy Invariants */}
              <section id="triple-synergy-invalidation" className="mt-8 scroll-mt-20">
                <h4>7.2. 4-Way Surgical Invalidation &amp; Synergy Invariants</h4>
                <p>
                  Because Dinou tracks layout slot tags (<code>_layoutSlotTags</code> in <code>layout.metadata.json</code>), page static-shell slot tags (<code>_pageSlotTags</code> in <code>metadata.json</code>), and dynamic-hole slots (<code>inStaticShell: false</code>) separately, invalidating any layer in Triple Synergy never causes collateral rebuilds in other layers:
                </p>
                <ol>
                  <li>
                    <strong>Invalidating a Dynamic-Hole Slot (<code>await revalidateTag(&quot;telemetry&quot;)</code>):</strong> Deletes <em>only</em> <code>slots/operations-telemetry/slot.json</code>. Neither <code>shell.html</code>, <code>page.tsx</code>, nor <code>layout.tsx</code> is touched—preserving 0ms TTFB while the hole streams fresh data on the next request.
                  </li>
                  <li>
                    <strong>Invalidating a Page Static-Shell Slot (<code>await revalidateTag(&quot;status-banner&quot;)</code>):</strong> Runs <code>revalidatePage(&quot;/telemetry&quot;, &#123; onlyRefreshSlots: true &#125;)</code>—refreshing only <code>global-status</code> inside <code>shell.page.json</code> and recomposing <code>shell.html</code> with the cached <code>layout.rsc</code> without re-executing <code>page.tsx</code> or <code>layout.tsx</code>.
                  </li>
                  <li>
                    <strong>Invalidating a Layout Slot (<code>await revalidateTag(&quot;incident-alert&quot;)</code>):</strong> Runs <code>revalidateLayout(&quot;/telemetry&quot;, &#123; onlyRefreshSlots: true &#125;)</code>—updating <code>layout.rsc</code> without re-executing <code>layout.tsx</code>, and lazily re-composing both PPR (<code>shell.html</code>) and Static (<code>index.html</code>) child routes on their next visit without re-executing any child <code>page.tsx</code>.
                  </li>
                  <li>
                    <strong>Live Browser Refresh Across All 3 Layers (<code>refreshSlot</code> &amp; <code>router.refresh</code>):</strong> Calling <code>refreshSlot(&quot;incident-bar&quot;)</code>, <code>refreshSlot(&quot;global-status&quot;)</code>, or <code>refreshSlot(&quot;operations-telemetry&quot;)</code> updates that exact boundary in place while preserving Client Component <code>useState</code> across the layout, static shell, and dynamic holes—and updating <code>window.__DINOU_BUILD_ID__</code> so subsequent <code>F5</code> reloads hydrate with zero mismatch.
                  </li>
                </ol>
              </section>
            </section>

            {/* 8. Complete 7-Combination & PPR Decision Matrices */}
            <section
              id="comparison-matrix"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                8. Complete 7-Combination &amp; PPR Decision Matrices
              </h3>
              <p>
                Summary of all <strong>7 non-empty architectural combinations (<code>2³ − 1 = 7</code>)</strong> across the Horizontal (H), Vertical (V), and Temporal (T) axes:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4"># / Combination</th>
                      <th className="p-4">How to Configure</th>
                      <th className="p-4">TTFB</th>
                      <th className="p-4">Surgical Refresh &amp; Expiry</th>
                      <th className="p-4">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold text-foreground">1. Horizontal Only (H)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">layout_functions.ts + page_functions.ts</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.20ms (0 Layout Re-fetches on Soft Nav)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">revalidateLayout / revalidatePage + Lazy index.html Re-composition</td>
                      <td className="p-4 text-xs text-muted-foreground">Multi-page workspaces, persistent navbars, dynamic child pages under static layouts</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">2. Vertical Only (V)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">&lt;DinouCacheSlot id tag revalidate&gt;</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.45ms (Static Shell) or ~2ms (SSR Hit)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Background SWR (onlyRefreshSlots) + revalidateTag + live refreshSlot()</td>
                      <td className="p-4 text-xs text-muted-foreground">Isolating heavy SQL/API widgets inside SSR dashboards or slow-ISR catalog pages</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">3. Temporal Only (T / PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr = true + &lt;Suspense&gt; (+ noDynamic)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (0ms Cached shell.html)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Instant Static Shell + 100% real-time parallel &lt;Suspense&gt; holes</td>
                      <td className="p-4 text-xs text-muted-foreground">Instant landing/store shells with personalized per-user cookie/query holes</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">4. Pairwise #1: H + V (Non-PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">layout_functions.ts + &lt;DinouCacheSlot&gt; in Layout/@sidebar/Page</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.45ms (SSR) / 0ms (pageCache Soft Nav)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Cross-axis shared tags + slotOverrideCache across Page A → B → A + unmounted refresh</td>
                      <td className="p-4 text-xs text-muted-foreground">Rich SPA apps with header/sidebar widgets, cross-route state, and zero-network back/forward nav</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">5. Pairwise #2: H + T (Layouts + PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">layout_functions.ts + page_functions.ts + ppr = true</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (Dual Frozen Shells + Unified Holes)</td>
                      <td className="p-4 text-xs text-purple-600 dark:text-purple-400 font-medium">router.refresh() (page holes) vs. &#123; layout: true &#125; + Lazy shell.html Re-composition</td>
                      <td className="p-4 text-xs text-muted-foreground">Multi-level portals mixing PPR layouts, @sidebar holes, PPR pages, and static opt-out pages</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">6. Pairwise #3: V + T (Slots + PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr = true + &lt;DinouCacheSlot&gt; (in Shell or in &lt;Suspense&gt;)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (Shell) + ~2ms (Cached Hole)</td>
                      <td className="p-4 text-xs text-indigo-600 dark:text-indigo-400 font-medium">3-Tier Hybrid: Shell slots (SWR) + Cached Holes (live stream refresh) + Slots inside user holes</td>
                      <td className="p-4 text-xs text-muted-foreground">Pages combining 0ms static shell widgets, shared heavy dynamic holes, and personalized feeds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">7. Triple Synergy: H + V + T</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">layout_functions.ts + ppr = true + &lt;DinouCacheSlot&gt; everywhere</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (Shell) + ~2ms (Cached Hole) + 0 Layout Fetches</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">4-Way Surgical Invalidation (Layout, Page, Shell Slot, Hole Slot) with 0 collateral rebuilds</td>
                      <td className="p-4 text-xs text-muted-foreground">Large-scale, high-concurrency e-commerce and real-time telemetry platforms</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4>
                Complete <code>&lt;Suspense&gt;</code> + <code>&lt;DinouCacheSlot&gt;</code> + <code>noDynamic()</code> Behavior Matrix
              </h4>
              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3.5">Component Pattern</th>
                      <th className="p-3.5">Behavior when <code>ppr = true</code></th>
                      <th className="p-3.5">Behavior when <code>ppr = false</code></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-3.5 font-mono">Unwrapped async Server Component (outside &lt;Suspense&gt;)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell (baked into shell.html at build time)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static HTML (baked into index.html at build time)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; + async Server Component (default)</td>
                      <td className="p-3.5 text-purple-600 dark:text-purple-400 font-medium">Dynamic PPR Hole (fallback in shell.html, streams live per request)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static HTML (resolved at build time into index.html)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; + async Server Component + noDynamic()</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell (baked into shell.html + 0ms runtime skip)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static HTML (resolved at build time into index.html)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt; outside &lt;Suspense&gt; (or wrapping inner &lt;Suspense&gt;)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell Slot (baked into shell.html + slot.json; Background SWR on expiry)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Slot (baked into index.html + slot.json; Background SWR on expiry)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; wrapping &lt;DinouCacheSlot revalidate=&#123;N&#125;&gt; (default)</td>
                      <td className="p-3.5 text-indigo-600 dark:text-indigo-400 font-medium">Cached Dynamic PPR Hole (fallback in shell.html, ~2ms stream from slot.json; live stream refresh on expiry)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Slot (baked into index.html + slot.json; Background SWR on expiry)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; wrapping &lt;DinouCacheSlot revalidate=&#123;N&#125;&gt; + noDynamic()</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell Slot (baked into shell.html + slot.json; Background SWR on expiry)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Slot (baked into index.html + slot.json; Background SWR on expiry)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">Reading cookies/headers/query or revalidate=&#123;0&#125; inside &lt;Suspense&gt; (even with noDynamic)</td>
                      <td className="p-3.5 text-purple-600 dark:text-purple-400 font-medium">Dynamic PPR Hole (quarantined to hole; overrides noDynamic)</td>
                      <td className="p-3.5 text-amber-600 dark:text-amber-400 font-medium">Full-Page Dynamic Bailout (entire route renders dynamically per request)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">Reading cookies/headers/query or revalidate=&#123;0&#125; outside &lt;Suspense&gt;</td>
                      <td className="p-3.5 text-amber-600 dark:text-amber-400 font-medium">Full-Page Dynamic Bailout (entire route renders dynamically per request)</td>
                      <td className="p-3.5 text-amber-600 dark:text-amber-400 font-medium">Full-Page Dynamic Bailout (entire route renders dynamically per request)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
