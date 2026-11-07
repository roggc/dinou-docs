import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
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
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";

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
    title: "1.1. Independent Lifecycles: Layout vs. Page",
    level: 3,
  },
  {
    id: "horizontal-revalidation",
    title: "1.2. Surgical Layout Revalidation & Lazy On-Demand Propagation",
    level: 3,
  },
  {
    id: "horizontal-escape-hatches",
    title: "1.3. Client Navigation & Targeted Refresh (router.refresh)",
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
    title: "4.2. Cross-Route Slot Persistence & Background Refresh",
    level: 3,
  },
  {
    id: "pairwise-hs-ppr",
    title: "5. Pairwise #2: Horizontal + Temporal (Layouts + PPR)",
    level: 2,
  },
  {
    id: "hs-ppr-shells",
    title: "5.1. Independent Layout & Page Static Shells with Parallel Holes",
    level: 3,
  },
  {
    id: "hs-ppr-revalidation",
    title: "5.2. Refresh, Revalidation & Navigation Matrix (Layout vs. Page)",
    level: 3,
  },
  {
    id: "pairwise-slot-ppr",
    title: "6. Pairwise #3: Vertical + Temporal (<DinouCacheSlot> + PPR)",
    level: 2,
  },
  {
    id: "ppr-slot-nesting",
    title: "6.1. Nesting-Order Semantics (<Suspense> vs. <DinouCacheSlot>)",
    level: 3,
  },
  {
    id: "ppr-slot-patterns",
    title: "6.2. Personalized Holes, Nested Slots & Live Holes",
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
    title: "7.2. 4-Way Surgical Invalidation Without Collateral Rebuilds",
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
                    Decouples nested layouts (<code>layout.tsx</code>) from child pages (<code>page.tsx</code>) via <code>layout_functions.ts</code>, giving each segment its own independent data fetching, cache TTL, and surgical revalidation.
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
                    Splits a single HTTP response across time: serves the pre-rendered static shell immediately at 0ms while streaming dynamic <code>&lt;Suspense&gt;</code> holes in parallel.
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
                      <li><strong>#1 Horizontal Only (H):</strong> Independent <code>layout_functions.ts</code> &amp; <code>page_functions.ts</code></li>
                      <li><strong>#2 Vertical Only (V):</strong> <code>&lt;DinouCacheSlot&gt;</code> Micro-ISR</li>
                      <li><strong>#3 Temporal Only (T):</strong> Pure PPR (Static Shell + <code>&lt;Suspense&gt;</code> Holes)</li>
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
                      <li><strong>#7 H + V + T:</strong> Segmented PPR Layouts + PPR/Static Pages + Shell &amp; Hole <code>&lt;DinouCacheSlot&gt;</code>s</li>
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

              {/* 1.1 Independent Lifecycles: Layout vs. Page */}
              <section id="horizontal-artifacts" className="mt-6 scroll-mt-20">
                <h4>1.1. Independent Lifecycles: Layout vs. Page</h4>
                <p>
                  Every <code>layout_functions.ts</code> file supports the <strong>exact same lifecycle functions as <code>page_functions.ts</code></strong> (<code>getProps</code>, <code>revalidate</code>, <code>getCacheTags</code>, <code>validateParams</code>, <code>getStaticPaths</code>, <code>allowISG</code>, and <code>ppr</code>), allowing Dinou to cache and manage layouts and pages independently:
                </p>
                <ul>
                  <li>
                    <strong>Layout Lifecycle (<code>layout_functions.ts</code>):</strong> Controls data fetching, cache duration, and invalidation tags exclusively for <code>layout.tsx</code> (and its parallel <code>@slot</code> routes).
                  </li>
                  <li>
                    <strong>Page Lifecycle (<code>page_functions.ts</code>):</strong> Controls data fetching, cache duration, and invalidation tags exclusively for <code>page.tsx</code>, without affecting or re-running the parent layout.
                  </li>
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>1. Static Layout + Dynamic Page</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Layout has <code>revalidate = false</code> (cached forever); child page has <code>revalidate = 0</code> (live SSR). On every request or SPA navigation, the layout is served from cache in ~1.20ms without re-executing <code>layout.tsx</code>, while <code>page.tsx</code> renders live.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>2. Dynamic Layout + Static Page</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Layout has <code>revalidate = 0</code> (evaluates per request); child page has <code>revalidate = false</code>. The heavy child page stays cached while the layout wrapper updates dynamically on every visit.
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

              {/* 1.2 Surgical Revalidation & Zero Hydration Mismatch */}
              <section id="horizontal-revalidation" className="mt-8 scroll-mt-20">
                <h4>1.2. Surgical Layout Revalidation &amp; Lazy On-Demand Propagation</h4>
                <p>
                  Because layouts and pages are cached independently, you can invalidate just the page (<code>revalidatePage</code>), just the layout (<code>revalidateLayout</code>), both at once (<code>revalidatePath</code>), or target either by tag (<code>revalidateTag</code>):
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`// src/dashboard/actions.ts
"use server";
import {
  revalidateLayout,
  revalidatePage,
  revalidatePath,
  revalidateTag,
} from "dinou/server";

// 1. Revalidates ONLY /dashboard/layout.tsx (child pages are NOT re-executed)
export async function updateWorkspaceNav() {
  await revalidateLayout("/dashboard"); // or await revalidateTag("workspace-nav")
}

// 2. Revalidates ONLY /dashboard/analytics/page.tsx (layout is NOT re-executed)
export async function updateAnalyticsPage() {
  await revalidatePage("/dashboard/analytics");
}

// 3. Revalidates BOTH the layout and the page at /dashboard/analytics
export async function updateEverything() {
  await revalidatePath("/dashboard/analytics");
}`}
                </CodeBlock>

                <p>
                  When you invalidate <strong>only</strong> a layout via <code>await revalidateLayout(&quot;/dashboard&quot;)</code> or <code>await revalidateTag(&quot;workspace-nav&quot;)</code> (or when a layout&apos;s clock TTL expires), Dinou avoids rebuilding your entire site at once:
                </p>
                <ol>
                  <li>
                    <strong>Instant Layout-Only Update (Zero Child Page Re-Execution):</strong> Dinou immediately regenerates <strong>only</strong> <code>/dashboard/layout.tsx</code> without eagerly rebuilding nested sub-layouts or re-running any child <code>page.tsx</code> / <code>page_functions.ts</code> (all cached child pages remain 100% intact).
                  </li>
                  <li>
                    <strong>Lazy On-Demand Sub-Layout Cascade:</strong> If a sub-route has its own nested layout (e.g., <code>/dashboard/settings/layout.tsx</code>), Dinou does <em>not</em> rebuild it upfront when <code>/dashboard</code> is revalidated. Instead, the first time a visitor navigates to or requests <code>/dashboard/settings</code>, Dinou detects that the parent <code>/dashboard</code> layout is newer and <strong>lazily updates the nested sub-layout on demand</strong> so it wraps the fresh parent layout.
                  </li>
                  <li>
                    <strong>Lazy HTML Re-Composition on Reload (<code>F5</code>):</strong> Likewise, when a visitor loads or hard-reloads (<code>F5</code>) any child page after its layout was updated, Dinou lazily combines the updated layout with the <strong>already-cached child page</strong> on the fly (without re-executing the child <code>page.tsx</code>). This guarantees <strong>zero React hydration mismatch</strong> without triggering a rebuild storm across all child pages.
                  </li>
                </ol>
              </section>

              {/* 1.3 Client Navigation & Targeted Refresh */}
              <section id="horizontal-escape-hatches" className="mt-8 scroll-mt-20">
                <h4>1.3. Client Navigation &amp; Targeted Refresh (<code>router.refresh</code>)</h4>
                <p>
                  Horizontal Segmentation also extends to the browser. Because the client router manages the layout and the page as separate segments, you can navigate between pages or refresh the screen without re-fetching or losing state in your layout:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-3 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>How the Client Router Isolates Layouts &amp; Pages</span>
                    </div>
                    <ul className="text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                      <li>
                        <strong>Sibling SPA Navigation (<code>&lt;Link&gt;</code>):</strong> Navigating between pages that share a layout (e.g., <code>/dashboard/overview</code> → <code>/dashboard/analytics</code>) fetches <strong>only</strong> the new page. The layout makes <strong>0 network requests</strong> and keeps 100% of its Client Component state (<code>useState</code>, open sidebars, scroll position, input text).
                      </li>
                      <li>
                        <strong>Client Page Cache &amp; <code>&lt;Link fresh&gt;</code>:</strong> Visited pages are cached in client memory so clicking back/forward is instant (0 network requests). Pass the <code>fresh</code> prop on <code>&lt;Link href=&quot;...&quot; fresh&gt;</code> whenever you want a click to bypass the client cache and fetch fresh page data from the server.
                      </li>
                      <li>
                        <strong><code>router.refresh()</code> (Page Only):</strong> Re-fetches <strong>only</strong> the active page from the server while leaving the parent layout untouched (0 layout requests).
                      </li>
                      <li>
                        <strong><code>router.refresh(&#123; layout: true &#125;)</code> (Layout + Page):</strong> Re-fetches <strong>both</strong> the layout and the active page from the server (for example, after a Server Action updated the layout) and updates the screen in place without unmounting your Client Components or losing their interactive state (such as open menus, form inputs, or <code>useState</code> values).
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1.5 mb-2">
                        <RefreshCw className="h-4 w-4 text-emerald-500" />
                        <span>Client Refresh &amp; Navigation Example</span>
                      </div>
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
      {/* 1. Refreshes ONLY the current page (layout is not re-fetched) */}
      <button onClick={() => router.refresh()}>
        Refresh Page Only
      </button>

      {/* 2. Refreshes BOTH the layout and the page in place
             without resetting interactive Client Component state */}
      <button onClick={() => router.refresh({ layout: true })}>
        Refresh Layout + Page
      </button>

      {/* 3. Forces a fresh server fetch on navigation */}
      <Link href="/dashboard/analytics" fresh>
        Fresh Analytics
      </Link>
    </div>
  );
}`}
                      </CodeBlock>
                    </div>
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
                While Horizontal Segmentation isolates route segments (<code>layout.tsx</code> vs. <code>page.tsx</code>), <strong>Vertical Segmentation</strong> isolates individual <strong>Server Component</strong> subtrees <em>inside</em> a layout or page. When a page contains an expensive database widget, developers in traditional frameworks are often forced to convert it into a Client Component with client-side fetching libraries, introducing bundle bloat, network waterfalls, and layout shifts.
              </p>
              <p>
                Dinou solves this with <code>&lt;DinouCacheSlot&gt;</code> (imported from <code>&quot;dinou/server&quot;</code>). It keeps your widgets on the server as React Server Components (RSC) while giving each wrapped subtree its own independent server cache, expiration time (<code>revalidate</code>), and invalidation tags (<code>tag</code> / <code>tags</code>).
              </p>

              {/* Props Reference Table */}
              <div className="border rounded-lg p-5 bg-card not-prose my-6 space-y-4">
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-500" />
                  <span><code>&lt;DinouCacheSlot&gt;</code> Props Reference (<code>import &#123; DinouCacheSlot &#125; from &quot;dinou/server&quot;</code>)</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Best practice: always assign a unique, descriptive <code>id</code> to each <code>&lt;DinouCacheSlot&gt;</code>, and add <code>tag</code> or <code>tags</code> whenever you want to invalidate it with <code>revalidateTag()</code> or group multiple slots together:
                </p>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b bg-muted/50 text-foreground">
                        <th className="py-2.5 px-3 font-semibold">Prop</th>
                        <th className="py-2.5 px-3 font-semibold">Type</th>
                        <th className="py-2.5 px-3 font-semibold">How It Works</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-semibold text-foreground whitespace-nowrap">id?</td>
                        <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">string</td>
                        <td className="py-2.5 px-3 text-muted-foreground leading-relaxed">
                          Unique identifier for this slot&apos;s cache entry on the server and for targeting it from the client via <code>refreshSlot(id)</code>. <strong>Recommended on every <code>&lt;DinouCacheSlot&gt;</code></strong> using a descriptive string (e.g., <code>id=&quot;dashboard-analytics&quot;</code>—never reuse the same <code>id</code> across different slots). If omitted, Dinou falls back to <code>tag || tags[0]</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-semibold text-foreground whitespace-nowrap">tag?</td>
                        <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">string</td>
                        <td className="py-2.5 px-3 text-muted-foreground leading-relaxed">
                          Assigns a <strong>single</strong> cache tag to invalidate the slot on the server via <code>revalidateTag(tag)</code> (or refresh all slots sharing that tag in the browser via <code>refreshSlot(tag)</code>). Do not combine <code>tag</code> and <code>tags</code> on the same slot—if <code>tags</code> is provided, Dinou uses <code>tags</code> and ignores <code>tag</code>. If <code>id</code> is omitted, <code>tag || tags[0]</code> is used as the slot&apos;s <code>id</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-semibold text-foreground whitespace-nowrap">tags?</td>
                        <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">string[]</td>
                        <td className="py-2.5 px-3 text-muted-foreground leading-relaxed">
                          Array of cache tags when a slot needs <strong>multiple</strong> tags at once (for example, an individual tag plus a shared group tag: <code>tags=&#123;[&quot;sales-chart&quot;, &quot;billing-group&quot;]&#125;</code>). If <code>id</code> is omitted, <code>tags[0]</code> is used as the slot&apos;s <code>id</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-semibold text-foreground whitespace-nowrap">revalidate?</td>
                        <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">number</td>
                        <td className="py-2.5 px-3 text-muted-foreground leading-relaxed space-y-1">
                          <div>Controls how long (in seconds) the rendered Server Component output stays fresh in the server cache:</div>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Omitted (<code>undefined</code>):</strong> Cached indefinitely on the server until invalidated via <code>revalidateTag()</code> on the server or force-revalidated from the client via <code>refreshSlot(..., &#123; fresh: true &#125;)</code>.</li>
                            <li><strong><code>&gt;= 1</code> (e.g., <code>revalidate=&#123;60&#125;</code>):</strong> Cached for that many seconds. Once expired, the next request immediately serves the cached HTML and updates the slot in the background (Stale-While-Revalidate).</li>
                            <li><strong><code>0</code> (<code>revalidate=&#123;0&#125;</code>):</strong> <strong>Strict No-Cache</strong>. Never stores the output in the server cache (always renders fresh on every request), while still mounting a slot boundary in the browser so you can refresh just this widget on demand via <code>refreshSlot()</code>.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-semibold text-foreground whitespace-nowrap">children</td>
                        <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap">ReactNode | (() =&gt; ReactNode | Promise&lt;ReactNode&gt;)</td>
                        <td className="py-2.5 px-3 text-muted-foreground leading-relaxed">
                          The Server Component subtree to render and cache. You can pass standard JSX (an async or synchronous component such as <code>&lt;AsyncWidget /&gt;</code> or <code>&lt;SyncWidget /&gt;</code>) or an <strong>inline async or synchronous function</strong> (<code>&#123;async () =&gt; &#123; ... &#125;&#125;</code> or <code>&#123;() =&gt; &#123; ... &#125;&#125;</code>) to compute or fetch data directly inline without creating a separate component.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expanded Key Developer Patterns */}
              <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4">
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <span>Core Developer Patterns with <code>&lt;DinouCacheSlot&gt;</code></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs min-w-0">
                  <div className="p-3.5 rounded-md bg-background border border-border space-y-1.5 min-w-0">
                    <div className="font-semibold text-foreground">
                      1. Unique <code>id</code> + Optional <code>tag</code> / <code>tags</code>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Always give each slot a unique, descriptive <code>id</code> (e.g., <code>&lt;DinouCacheSlot id=&quot;analytics-widget&quot;&gt;</code>)—this alone lets you cache the slot on the server and refresh it from the client via <code>refreshSlot(&quot;analytics-widget&quot;)</code>. When you also need server-side invalidation with <code>revalidateTag()</code> or want to invalidate several widgets together, add <code>tag</code> or <code>tags</code> (e.g., <code>tags=&#123;[&quot;sales&quot;, &quot;billing-group&quot;]&#125;</code>); if you also want the ability to revalidate by <code>id</code>, place the <code>id</code> in <code>tag || tags[0]</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md bg-background border border-border space-y-1.5 min-w-0">
                    <div className="font-semibold text-foreground">
                      2. Dynamic Route Slots (<code>/products/[slug]</code>)
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      In dynamic routes like <code>/products/[slug]</code>, every product URL renders the same <code>page.tsx</code>. Include the route parameter in the slot&apos;s ID and tags—such as <code>id=&#123;`reviews-$&#123;params.slug&#125;`&#125;</code> and <code>tags=&#123;[`reviews-$&#123;params.slug&#125;`, &quot;all-reviews&quot;]&#125;</code>—so each product caches its own slot separately while still allowing you to purge a single product or all products at once.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md bg-background border border-border space-y-1.5 min-w-0">
                    <div className="font-semibold text-foreground">
                      3. Nested Slots (<code>Outer → Inner</code> Isolation)
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      A slow-changing outer slot (e.g., a category tree with <code>revalidate=&#123;3600&#125;</code>) can wrap a fast-changing inner slot (e.g., a flash-deals banner with <code>revalidate=&#123;30&#125;</code>). When the inner slot expires or is invalidated, Dinou re-runs <strong>only</strong> the inner slot and plugs its fresh output into the already-cached outer slot without re-running the outer query.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-md bg-background border border-border space-y-1.5 min-w-0">
                    <div className="font-semibold text-foreground">
                      4. Client Components &amp; Server Functions Inside a Slot
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Although <code>&lt;DinouCacheSlot&gt;</code> runs on the server, the UI inside it can render interactive <code>&quot;use client&quot;</code> components and pass <code>&quot;use server&quot;</code> functions as props. When <code>refreshSlot()</code> updates that slot in the browser, React updates the server props in place without unmounting those Client Components, preserving open dropdowns, typed text, and local <code>useState</code> values.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-emerald-700 dark:text-emerald-300">5. Automatic Stampede Protection:</strong>{" "}
                  If a slot&apos;s cache is cold (or being force-refreshed) and 100 users request the page at the exact same moment, Dinou runs the Server Component query <strong>only once</strong> and shares that single render across all concurrent requests.
                </div>
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
import { AnalyticsSkeleton, CatalogSkeleton } from "./skeletons";

export default function DashboardPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* 1. Dynamic Component: Evaluated live on every request (reads session/cookies) */}
      <FastUserProfile />

      {/* 2. Smart Cache-Aware <Suspense> + <DinouCacheSlot>:
             - 1st request (cold cache miss): streams <AnalyticsSkeleton /> immediately, then swaps in the widget
             - 2nd+ requests (cache hit & background SWR): embeds the widget directly in initial HTML with 0 fallback! */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <DinouCacheSlot id="analytics-widget" tags={["analytics", "dashboard-group"]} revalidate={300}>
          <SlowAnalyticsWidget />
        </DinouCacheSlot>
      </Suspense>

      {/* 3. Nested Slots (Outer 1h cache -> Inner 30s cache) + Inline async function child:
             Wrapped in <Suspense> so cold cache misses never block TTFB on this Dynamic SSR page */}
      <Suspense fallback={<CatalogSkeleton />}>
        <DinouCacheSlot id="catalog-outer" tag="catalog-tree" revalidate={3600}>
          {async () => {
            const categories = await db.categories.getTree();
            return (
              <section>
                <CategoryList items={categories} />
                {/* Invalidating "flash-deals" re-renders ONLY this inner slot */}
                <DinouCacheSlot id="flash-deals-banner" tag="flash-deals" revalidate={30}>
                  <FlashDealsBanner />
                </DinouCacheSlot>
              </section>
            );
          }}
        </DinouCacheSlot>
      </Suspense>
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
                  <TabbedCodeBlock
                    containerClassName="my-2"
                    tabs={[
                      {
                        id: "page",
                        label: "src/products/[slug]/page.tsx",
                        language: "tsx",
                        code: `import { DinouCacheSlot, type PageProps } from "dinou/server";
import { ProductHero, ProductDescription } from "./static-widgets";
import { LiveStockCounter } from "./stock-widgets";

export default function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <main className="container py-8 space-y-6">
      {/* 1. Heavy Static Content: Cached for 24 hours */}
      <ProductHero slug={params.slug} />
      <ProductDescription slug={params.slug} />

      {/* 2. Static Shell Micro-ISR Slot: Pre-rendered into initial HTML at build time,
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
}`,
                      },
                      {
                        id: "page_functions",
                        label: "src/products/[slug]/page_functions.ts",
                        language: "typescript",
                        code: `import type { PageFunctions } from "dinou/server";

// Slow revalidation for outer page & descriptions (24 hours = 86,400s)
export const revalidate: PageFunctions["revalidate"] = 86400;`,
                      },
                    ]}
                  />
                </div>

                {/* Boundary Placement Box */}
                <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>When to Wrap <code>&lt;DinouCacheSlot&gt;</code> in <code>&lt;Suspense&gt;</code> vs. Unwrapped</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Whether you wrap <code>&lt;DinouCacheSlot&gt;</code> inside an outer <code>&lt;Suspense&gt;</code> depends on whether the route is <strong>Dynamic SSR</strong>, <strong>Static / ISR</strong>, or <strong>PPR</strong>:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                    <div className="p-3.5 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-purple-700 dark:text-purple-300">
                        1. &lt;Suspense&gt; Wrapping &lt;DinouCacheSlot&gt; (Recommended in Dynamic SSR &amp; PPR Holes)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        In <strong>Dynamic SSR pages</strong> (Pattern 1 above), wrap every top-level <code>&lt;DinouCacheSlot&gt;</code> in <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code> so a cold cache miss never blocks the page&apos;s TTFB: Dinou streams the fallback skeleton <strong>only on a cold cache miss</strong> (1st request or after <code>revalidateTag</code>), and once cached (including across expired TTLs via Background SWR), embeds the cached widget directly into the initial HTML with <strong>zero fallback flash</strong>. On <strong><code>ppr = true</code> routes</strong> (Section 6), it becomes a <strong>Cached Dynamic PPR Hole</strong>.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                        2. Unwrapped &lt;DinouCacheSlot&gt; (Recommended in Static / ISR &amp; PPR Static Shell)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        In <strong>Static / ISR pages</strong> (Pattern 2 above, <code>ppr = false</code>) and in the <strong>Static Shell of PPR routes</strong> (<code>ppr = true</code>), leave <code>&lt;DinouCacheSlot&gt;</code> <strong>outside</strong> <code>&lt;Suspense&gt;</code>. The widget is pre-rendered directly into the static HTML at build time (0ms TTFB) and refreshed in the background via SWR whenever its TTL expires. Even when invalidated on-demand via <code>revalidateTag</code>, it <strong>never blocks</strong> incoming requests: visitors always receive a cached response immediately—serving the previous cached version while <code>revalidateTag</code> is still in progress, and the newly updated cached version as soon as <code>revalidateTag</code> resolves.
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
                      Any interactive Client Component (or client module) can trigger a surgical re-render of a specific slot (by <code>id</code> or <code>tag</code>) or all slots via wildcard <code>&quot;*&quot;</code> (updating both the slots currently mounted in the active page/layout and any slots cached in the client SPA session from previously visited pages) without a full page reload or React state loss. Both <code>refreshSlot()</code> and <code>router.refreshSlot()</code> are <strong>identical</strong> and return an <strong>awaitable <code>Promise&lt;void&gt;</code></strong> (ideal for React 19&apos;s <code>useTransition</code>):
                    </p>
                    <CodeBlock
                      language="tsx"
                      containerClassName="w-full overflow-hidden rounded-lg text-xs"
                    >
{`"use client";
import { useTransition } from "react";
import { refreshSlot, useRouter } from "dinou";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      {/* Option 1: Standalone + awaitable inside useTransition (respects server TTL) */}
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await refreshSlot("analytics-widget");
          })
        }
      >
        {isPending ? "Refreshing..." : "Refresh Metrics"}
      </button>

      {/* Option 2: Force fresh (bypasses server slot TTL immediately) */}
      <button onClick={() => router.refreshSlot("analytics-widget", { fresh: true })}>
        Force Fresh
      </button>

      {/* Option 3: Wildcard "*" refreshes all mounted slots + slots cached in client session */}
      <button onClick={() => refreshSlot("*")}>
        Refresh All Slots
      </button>
    </div>
  );
}`}
                    </CodeBlock>
                    <div className="text-[11px] text-muted-foreground bg-background/60 p-2.5 rounded border border-border/60 space-y-1.5 mt-2 break-words min-w-0">
                      <div className="font-semibold text-foreground">How <code>refreshSlot</code> options, <code>router.refreshSlot</code>, and wildcard <code>&quot;*&quot;</code> work:</div>
                      <div>• <strong><code>refreshSlot</code> vs. <code>router.refreshSlot</code> (Identical &amp; Awaitable)</strong>: <code>router.refreshSlot(id, opts)</code> is a direct alias for <code>refreshSlot(id, opts)</code>—both execute the exact same code and return a <code>Promise&lt;void&gt;</code> that resolves when the slot finishes updating. Prefer standalone <strong><code>refreshSlot</code></strong> when your component doesn&apos;t otherwise need <code>useRouter()</code> (avoiding subscribing the component to router context changes) or when calling it <strong>outside React components</strong> (e.g., inside WebSocket/SSE listeners, polling intervals, utility functions, or external state stores like Zustand); use <code>router.refreshSlot</code> for convenience when you already have <code>const router = useRouter()</code> in scope.</div>
                      <div>• <strong><code>refreshSlot(idOrTag)</code> (Default)</strong>: Refreshes the client DOM with the server&apos;s current state. If the slot&apos;s server-side TTL (e.g. <code>revalidate=&#123;300&#125;</code>) has not expired, it returns the cached server UI without touching your database (protecting against button spam and traffic spikes).</div>
                      <div>• <strong><code>refreshSlot(idOrTag, &#123; fresh: true &#125;)</code> (Bypass)</strong>: Hard revalidation. Forces the server to ignore any unexpired TTL, immediately re-run the server component&apos;s queries against your database, update the server cache, and update the client DOM in place.</div>
                      <div>• <strong><code>refreshSlot(&quot;*&quot;)</code> (Wildcard)</strong>: Refreshes all <code>&lt;DinouCacheSlot&gt;</code> instances currently mounted on screen (across the active <code>page.tsx</code>, <code>layout.tsx</code>, and parallel <code>@slot</code> routes) <strong>and</strong> refreshes in the background any slots cached in memory in the client SPA session from previously visited pages, so navigating back to those pages renders updated data immediately. ⚠️ <em>Avoid combining <code>&quot;*&quot;</code> with <code>&#123; fresh: true &#125;</code> in production: it triggers a fan-out of requests for every mounted and session-cached slot while forcing all of them to bypass their server TTL and hit your database simultaneously. Reserve <code>&#123; fresh: true &#125;</code> for specific slot IDs or tags.</em></div>
                      <div>• <strong>Out-of-Order Race Protection (Last-Write-Wins)</strong>: If two calls to <code>refreshSlot()</code> for the <strong>same slot</strong> resolve out of order—for example, a user clicks a filter that triggers a slow query (<code>&quot;all&quot;</code>, taking 500ms) and immediately clicks another filter that triggers a fast query (<code>&quot;favorites&quot;</code>, taking 30ms), or a slow <code>refreshSlot(id, &#123; fresh: true &#125;)</code> is followed by a fast cached <code>refreshSlot(id)</code> after a mutation—Dinou tracks a per-slot request counter so the latest request always wins and a slower earlier response never overwrites newer UI on screen.</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border flex flex-col justify-between min-w-0">
                    <div className="min-w-0">
                      <div className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                        <Database className="h-4 w-4 text-purple-500" />
                        Server-Side Tag Invalidation (<code>revalidateTag</code>)
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Server mutations purge and update cached slots globally via <code>revalidateTag()</code> (imported from <code>&quot;dinou/server&quot;</code>). Any subsequent request or navigation automatically receives the new cached slot—while optionally calling <code>refreshSlot()</code> in the client updates the already-mounted DOM on the current user&apos;s screen in place:
                      </p>

                      <TabbedCodeBlock
                        tabs={[
                          {
                            id: "server",
                            label: "src/feed/actions.ts",
                            language: "typescript",
                            code: `"use server";
import { revalidateTag } from "dinou/server";

export async function publishPost(formData: FormData) {
  const content = formData.get("content") as string;
  await db.posts.insert({ content, createdAt: new Date() });

  // Standalone server invalidation: purges & updates tagged slots/shells
  // so any subsequent page load or navigation gets the fresh cache automatically
  await revalidateTag("feed");
}`,
                          },
                          {
                            id: "client",
                            label: "src/feed/post-creator.tsx",
                            language: "tsx",
                            code: `"use client";
import { refreshSlot } from "dinou";
import { publishPost } from "./actions";

export function PostCreator() {
  const handleSubmit = async (formData: FormData) => {
    // 1. Mutate & update cache on server
    await publishPost(formData);

    // 2. Optional: if the feed slot is already mounted on this screen,
    // update it in place right now without reloading or navigating
    refreshSlot("feed-widget");
  };

  return (
    <form action={handleSubmit}>
      <input name="content" placeholder="What's new?" />
      <button type="submit">Publish</button>
    </form>
  );
}`,
                          },
                        ]}
                      />
                    </div>

                    <div className="text-[11px] text-muted-foreground bg-background/60 p-2.5 rounded border border-border/60 space-y-1.5 mt-2 break-words min-w-0">
                      <div className="font-semibold text-foreground">Standalone <code>revalidateTag</code> vs. Optional <code>refreshSlot</code>:</div>
                      <div>• <strong><code>await revalidateTag(&quot;feed&quot;)</code> (Standalone on Server)</strong>: Purges the slot cache and updates any affected static shells on the server (re-running only the invalidated slot without re-executing <code>page.tsx</code>). You do <strong>not</strong> need <code>refreshSlot()</code> for future page loads or navigations—they automatically receive the new cached version.</div>
                      <div>• <strong><code>refreshSlot(&quot;feed-widget&quot;)</code> (Optional on Client)</strong>: Only needed when the user triggering the Server Function <em>already has that slot mounted on their current screen</em> and you want their open DOM to update in place immediately (without a page reload or navigation, and without needing <code>&#123; fresh: true &#125;</code>).</div>
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
                        <span>1. Static Shell &amp; SSR Slots: Background SWR</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Applies to: <strong>(a)</strong> unwrapped slots (outside <code>&lt;Suspense&gt;</code>, or with <code>noDynamic()</code>) in Static/ISR and PPR Static Shells, and <strong>(b)</strong> <code>&lt;Suspense&gt;</code>-wrapped slots on Dynamic SSR routes (<code>ppr = false</code>, where the fallback is shown <em>only</em> on a cold cache miss). When the TTL expires, the next request serves the cached slot immediately inline (<strong>0ms, no fallback</strong>) and triggers a non-blocking background SWR refresh.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        <span>2. Cached Dynamic Holes (PPR): Fallback + Live Stream</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        For slots wrapped in <code>&lt;Suspense&gt;</code> on <code>ppr = true</code> routes (Cached Dynamic Holes), the 0ms Static Shell always flushes with the <code>&lt;Suspense&gt;</code> skeleton fallback first. While the TTL is valid, the cached hole streams in ~2ms to replace it; when the slot&apos;s TTL expires, instead of serving stale data via SWR, the visitor sees the skeleton fallback while the hole re-executes live in the stream and receives 100% fresh data as soon as the query resolves.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>3. Interactive refreshSlot: Fresh Delivery</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When a user clicks a button calling <code>refreshSlot()</code> on an expired slot (or with <code>&#123; fresh: true &#125;</code>), the server awaits the new slot render, updates the cache, and returns the fresh UI directly while preserving the existing DOM and client state (zero skeleton flash).
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">
                        1. Wrapping the Entire Page
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        Wrapping the entire <code>page.tsx</code> body inside a single slot reinvents route-level ISR. Declare <code>export const revalidate = 300</code> in <code>page_functions.ts</code> instead.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">
                        2. Unparameterized ID for Private User Data
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        Never wrap private per-user data (such as a user&apos;s cart or session profile) with a fixed, unparameterized slot ID (e.g., <code>id=&quot;user-cart&quot;</code>) and <code>revalidate &gt;= 1</code>: because the server caches by <code>id</code>, User B would receive User A&apos;s cached slot. Either include the user identifier in the ID (<code>id=&#123;`cart-$&#123;userId&#125;`&#125;</code>) or use <code>revalidate=&#123;0&#125;</code>.
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
                <strong>Static Shell</strong> instantly at <strong>0ms</strong>, while streaming{" "}
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
                      <span>Outside &lt;Suspense&gt; → Static Shell (0ms TTFB)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Everything outside <code>&lt;Suspense&gt;</code>—including <code>getProps</code>, top-level <code>async</code> Page/Layout components, unwrapped child <code>async</code> Server Components, synchronous <code>&lt;Suspense&gt;</code> boundaries, and unwrapped <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code>—is awaited at build/revalidation time and baked into the initial Static Shell.
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
                      On a <code>ppr = true</code> route, <strong>any <code>async</code> Server Component inside <code>&lt;Suspense&gt;</code></strong> automatically postpones at its very first <code>await</code> (with zero build latency) to become a <strong>Dynamic PPR Hole</strong>—even if it never touches cookies or headers! Reading <code>getContext()</code> (<code>cookies</code>/<code>headers</code>/<code>query</code>), <code>useSearchParams()</code>, or <code>revalidate=&#123;0&#125;</code> inside <code>&lt;Suspense&gt;</code> is likewise quarantined to that hole.
                    </p>
                    <p className="text-[11px] text-muted-foreground pt-1">
                      💡 <strong>Core Takeaway:</strong> The <em>only</em> behavioral difference between <code>ppr = false</code> and <code>ppr = true</code> is inside <code>&lt;Suspense&gt;</code> (where <code>ppr = false</code> resolves <code>async</code> components into static HTML at build time, while <code>ppr = true</code> turns them into streaming holes unless opted out via <code>noDynamic()</code>).
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-card not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <span>The Single HTTP Response Timeline</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>
                      <strong>Instant TTFB (~2.42ms):</strong> The browser immediately receives the cached Static Shell along with the <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code> skeletons for each dynamic hole.
                    </li>
                    <li>
                      <strong>Concurrent Parallel Hole Execution:</strong> Dinou executes only the dynamic <code>&lt;Suspense&gt;</code> holes in parallel on the server (skipping static <code>noDynamic()</code> boundaries in 0ms).
                    </li>
                    <li>
                      <strong>In-Place Streaming Replacement:</strong> As each hole resolves (fastest first), Dinou streams its resolved HTML down the same HTTP connection, swapping the skeleton with live content—even before client React hydration finishes.
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

// 1. Unwrapped async Server Component (OUTSIDE <Suspense>) -> Baked into Static Shell at build time!
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
      {/* Resolved at build time into the Static Shell */}
      <FeaturedCatalogBanner />

      {/* Postponed at first await -> Fallback in Static Shell, streamed live on every request */}
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
                  Suppose a <code>ppr = true</code> page has both a <strong>Dynamic PPR Hole</strong> (e.g., a live user header) and a <strong>heavy static <code>async</code> Server Component</strong> (e.g., compiling Markdown with syntax highlighting). On every request, after flushing the 0ms Static Shell, Dinou traverses <code>page.tsx</code>&apos;s component tree on the server to locate and stream the dynamic holes:
                </p>
                <ul>
                  <li>
                    <strong>If the heavy static <code>async</code> component is unwrapped (outside <code>&lt;Suspense&gt;</code>):</strong> Its HTML is in the Static Shell, but during the runtime tree traversal to reach the dynamic holes, the server still has to <code>await</code> and re-run that unwrapped <code>async</code> component!
                  </li>
                  <li>
                    <strong>If you wrap it in <code>&lt;Suspense&gt;</code> (default):</strong> On a <code>ppr = true</code> route, <code>&lt;Suspense&gt;</code> turns it into a Dynamic PPR Hole instead of baking it into the Static Shell.
                  </li>
                </ul>
                <p>
                  To get the best of both worlds, wrap the static component in <code>&lt;Suspense&gt;</code> and call <strong><code>noDynamic()</code></strong> (exported from both <code>&quot;dinou&quot;</code> and <code>&quot;dinou/server&quot;</code>) synchronously at the top of the component <strong>before its first <code>await</code></strong>:
                </p>
                <ol>
                  <li>
                    <strong>At Build Time (Baked into Static Shell):</strong> <code>noDynamic()</code> opts the enclosing <code>&lt;Suspense&gt;</code> boundary out of becoming a Dynamic Hole, pre-rendering its resolved HTML and RSC payload directly into the Static Shell. Because it is already resolved in the Static Shell, <strong>its <code>&lt;Suspense&gt;</code> fallback is never shown in production</strong> (neither on initial load nor on SPA navigation; it is only used when streaming on demand in <code>dinou dev</code>).
                  </li>
                  <li>
                    <strong>At Request Time (0ms Runtime Short-Circuit):</strong> When Dinou traverses <code>page.tsx</code> to stream the other dynamic holes on the page, as soon as it enters that static <code>&lt;Suspense&gt;</code> boundary and hits <code>noDynamic()</code>, it immediately <strong>aborts and skips that entire subtree in 0ms</strong> without re-executing its async work!
                  </li>
                </ol>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`import { Suspense } from "react";
import { noDynamic } from "dinou/server"; // or from "dinou"
import { LiveUserBookmarkButton } from "./bookmarks";

async function StaticMarkdownArticle({ slug }: { slug: string }) {
  // 1. Build time: opts the enclosing <Suspense> into the Static Shell (no fallback in prod)
  // 2. Runtime: aborts & skips this subtree in 0ms when streaming <LiveUserBookmarkButton />!
  // Must be called synchronously BEFORE the first await!
  noDynamic();

  const markdown = await readMarkdownFromDisk(slug);
  const html = await highlightCodeBlocks(markdown);
  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function DocPage() {
  return (
    <main>
      {/* Dynamic PPR Hole (streams per request) */}
      <Suspense fallback={<span>Loading bookmark status...</span>}>
        <LiveUserBookmarkButton slug="intro" />
      </Suspense>

      {/* Static Shell <Suspense> via noDynamic() (baked at build time, skipped in 0ms at runtime) */}
      <Suspense fallback={<p>Loading article...</p>}>
        <StaticMarkdownArticle slug="intro" />
      </Suspense>
    </main>
  );
}`}
                </CodeBlock>

                <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    <span>Key Rules of <code>noDynamic()</code></span>
                  </div>
                  <ul className="text-muted-foreground space-y-2 pl-4 list-disc leading-relaxed">
                    <li>
                      <strong>Must Precede the First <code>await</code>:</strong> Because Dinou inspects the component&apos;s synchronous execution frame right when it returns its initial Promise, calling <code>noDynamic()</code> <em>after</em> the first <code>await</code> is too late and the boundary will still become a Dynamic Hole.
                    </li>
                    <li>
                      <strong>Subtree Inheritance &amp; Nested Dynamic Holes:</strong> Calling <code>noDynamic()</code> in a parent component inside <code>&lt;Suspense&gt;</code> automatically opts out all child <code>async</code> components inside that same <code>&lt;Suspense&gt;</code> boundary. If that static <code>&lt;Suspense&gt;</code> boundary contains a nested inner <code>&lt;Suspense&gt;</code> boundary without <code>noDynamic()</code>, the outer wrapper bakes into the Static Shell while the inner boundary cleanly streams as a dynamic hole!
                    </li>
                    <li>
                      <strong>Dynamic Bailout Always Wins:</strong> If a component or child inside a <code>noDynamic()</code> boundary reads <code>req.cookies</code>, <code>req.headers</code>, <code>req.query</code>, or renders <code>&lt;DinouCacheSlot revalidate=&#123;0&#125;&gt;</code>, Dinou overrides <code>noDynamic()</code> and turns the boundary into a Dynamic PPR Hole to prevent leaking request data into the shared Static Shell.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3.3 Activation & Specificity */}
              <section id="ppr-activation" className="mt-8 scroll-mt-20">
                <h4>3.3. Enabling PPR, Child Opt-Out (<code>ppr = false</code>) &amp; Specificity Hierarchy</h4>
                <p>
                  In Dinou, <strong><code>ppr</code> is resolved per URL route as a single unified mode</strong> (a given URL route cannot have its layout in PPR mode and its page in non-PPR mode, or vice versa). Instead, you can configure the <code>ppr</code> flag across three hierarchical levels—<strong>Global</strong> (<code>dinou.config.js</code>), <strong>Layout</strong> (<code>layout_functions.ts</code>), and <strong>Page</strong> (<code>page_functions.ts</code>)—and for each URL route, the <strong>most specific declaration wins</strong> for the entire route (layout + page together). This allows a parent layout to enable <code>ppr = true</code> as the default for all its child routes, while a specific child page can opt out that route with <code>export const ppr = false</code>:
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
                      <span>3. <strong>layout_functions.ts</strong> (Root Layout: <code>ppr = true | false</code>)</span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">Section Default</span>
                    </div>
                    <div className="p-2 rounded bg-muted/80 flex items-center justify-between border-l-4 border-slate-500">
                      <span>4. <strong>dinou.config.js</strong> (Global Application: <code>ppr = true | false</code>)</span>
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
                When you combine <strong>Horizontal Segmentation</strong> (independent layouts, parallel <code>@sidebar</code> routes, and pages) with <strong>Vertical Segmentation</strong> (<code>&lt;DinouCacheSlot&gt;</code> &amp; <code>refreshSlot</code>) on standard routes (<code>ppr = false</code>), you can place independent cached slots inside both <code>layout.tsx</code> (or <code>@sidebar</code>) and <code>page.tsx</code>—and any slot updated on screen via <code>refreshSlot()</code> stays updated in the client router&apos;s cache when navigating back and forth between pages.
              </p>

              {/* 4.1 Layout Slots, @sidebar Slots & Cross-Axis Shared Tags */}
              <section id="hs-slot-capabilities" className="mt-6 scroll-mt-20">
                <h4>4.1. Layout Slots, <code>@sidebar</code> Parallel Slots &amp; Cross-Axis Shared Tags</h4>
                <p>
                  Combining Horizontal and Vertical segmentation gives you four high-impact capabilities:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-teal-500" />
                      <span>1. Layout-Level &amp; @sidebar Slots</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Place <code>&lt;DinouCacheSlot&gt;</code> inside <code>layout.tsx</code>, nested sub-layouts, or parallel routes (<code>@sidebar/page.tsx</code>). Calling <code>revalidateTag(&quot;sidebar-slot&quot;)</code> + <code>refreshSlot(&quot;sidebar-slot&quot;)</code> updates that widget in place <strong>without re-executing <code>layout.tsx</code>, <code>layout_functions.ts</code>, or the active <code>page.tsx</code></strong>.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>2. Cross-Axis Shared Tag Invalidation</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      A slot in <code>layout.tsx</code> (e.g., a header credit counter) and a slot in <code>page.tsx</code> (e.g., a usage breakdown table) can share a tag (<code>tags=&#123;[&quot;credits-sync&quot;]&#125;</code>). A single call to <code>await revalidateTag(&quot;credits-sync&quot;)</code> + <code>refreshSlot(&quot;credits-sync&quot;)</code> updates <strong>both</strong> the layout widget and the page widget in unison!
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>3. Dynamic Slot (revalidate=&#123;0&#125;) in Static Page</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      On a <code>ppr = false</code> static page, rendering <code>&lt;DinouCacheSlot id=&quot;live-ticker&quot; revalidate=&#123;0&#125;&gt;</code> bypasses server caching for that widget on every refresh while keeping the surrounding static page and layout cached.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-1.5 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>4. Host Revalidation Reuses Cached Slots</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Conversely, when you call <code>revalidatePage(&quot;/workspace&quot;)</code> or <code>revalidateLayout(&quot;/workspace&quot;)</code> to update the host page or layout, Dinou automatically reuses all unexpired <code>&lt;DinouCacheSlot&gt;</code> caches without re-running their expensive database queries!
                    </p>
                  </div>
                </div>

                <TabbedCodeBlock
                  containerClassName="my-4"
                  tabs={[
                    {
                      id: "layout",
                      label: "src/workspace/layout.tsx",
                      language: "tsx",
                      code: `// Cached for 1h via layout_functions.ts
import { DinouCacheSlot } from "dinou/server";
import { HeaderCreditsBadge } from "./widgets";

export default function WorkspaceLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
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
}`,
                    },
                    {
                      id: "page",
                      label: "src/workspace/page.tsx",
                      language: "tsx",
                      code: `// Cached for 1h via page_functions.ts
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
}`,
                    },
                  ]}
                />
              </section>

              {/* 4.2 Cross-Route Slot Persistence & Background Refresh */}
              <section id="hs-slot-client" className="mt-8 scroll-mt-20">
                <h4>4.2. Cross-Route Slot Persistence &amp; Background Refresh Across Navigation</h4>
                <p>
                  On standard routes, Dinou&apos;s client router caches visited pages in memory so round-trip soft navigation (<code>Page A → Page B → Page A</code>) completes in <strong>0ms with 0 network requests</strong>. Dinou keeps your live-refreshed <code>&lt;DinouCacheSlot&gt;</code> state in sync across those navigations automatically:
                </p>
                <ul>
                  <li>
                    <strong>Refreshed Slot Persistence on Back/Forward Navigation (<code>Page A → Page B → Page A</code>):</strong> If a user refreshes a slot on <code>Page A</code> (e.g., <code>refreshSlot(&quot;page-usage-table&quot;)</code> from the snippet above), navigates to <code>Page B</code>, and clicks back to <code>Page A</code>, Dinou remembers and renders the refreshed slot state immediately (with 0 network requests) instead of reverting to the initial pre-refresh page snapshot.
                  </li>
                  <li>
                    <strong>Refreshing a <code>Page A</code> Slot While Viewing <code>Page B</code>:</strong> If the user has already visited <code>Page A</code>, navigates to <code>Page B</code> (so <code>Page A</code>&apos;s <code>&quot;page-usage-table&quot;</code> slot is not currently on screen), and triggers an action on <code>Page B</code> that calls <code>refreshSlot(&quot;page-usage-table&quot;)</code> (or its tag <code>refreshSlot(&quot;usage-only&quot;)</code>), Dinou automatically refreshes <code>Page A</code>&apos;s slot in the background. When the user navigates back to <code>Page A</code>, the updated widget is already waiting in memory!
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
                When you combine <strong>Horizontal Segmentation</strong> and <strong>Partial Prerendering (PPR)</strong> (even without <code>&lt;DinouCacheSlot&gt;</code>), every layout, parallel route (<code>@sidebar</code>), and page maintains its own independent Static Shell while streaming its own dynamic <code>&lt;Suspense&gt;</code> holes in a single unified HTTP response.
              </p>

              {/* 5.1 Independent Layout & Page Static Shells with Parallel Holes */}
              <section id="hs-ppr-shells" className="mt-6 scroll-mt-20">
                <h4>5.1. Independent Layout &amp; Page Static Shells with Parallel Streaming Holes</h4>
                <p>
                  In a segmented PPR route hierarchy, your layout and your page each have their own independent static shell cache, TTL (<code>revalidate</code>), and invalidation tags (<code>getCacheTags</code>), while any <code>&lt;Suspense&gt;</code> holes inside the layout, <code>@sidebar</code>, and page stream in parallel on every request:
                </p>

                <TabbedCodeBlock
                  containerClassName="my-4"
                  tabs={[
                    {
                      id: "layout",
                      label: "src/dashboard/layout.tsx",
                      language: "tsx",
                      code: `import { Suspense } from "react";
import { getContext } from "dinou/server";

async function LiveUserHeaderHole() {
  // Dynamic Hole in Layout: Streams on every request & on router.refresh({ layout: true })
  const user = getContext()?.req.cookies["session_user"] ?? "guest";
  return <span>Signed in as {user}</span>;
}

export default function DashboardLayout({ children, sidebar, orgName }: any) {
  return (
    <div className="dashboard-shell">
      <header>
        <h1>{orgName}</h1> {/* Pre-rendered in Layout Static Shell for 1h */}
        <Suspense fallback={<span>Loading user...</span>}>
          <LiveUserHeaderHole />
        </Suspense>
      </header>
      <aside>{sidebar}</aside> {/* Can also host its own <Suspense> holes in @sidebar/page.tsx! */}
      <main>{children}</main>
    </div>
  );
}`,
                    },
                    {
                      id: "layout_functions",
                      label: "src/dashboard/layout_functions.ts",
                      language: "typescript",
                      code: `import type { LayoutFunctions } from "dinou/server";

export const ppr: LayoutFunctions["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600; // Layout static shell cached for 1h
export const getCacheTags: LayoutFunctions["getCacheTags"] = ["dashboard-layout-tag"];

export async function getProps() {
  // Runs ONLY at build time or when "dashboard-layout-tag" / revalidateLayout is triggered
  return { orgName: await db.orgs.getDefaultName() };
}`,
                    },
                    {
                      id: "page_functions",
                      label: "src/dashboard/page_functions.ts",
                      language: "typescript",
                      code: `import type { PageFunctions } from "dinou/server";

// ppr = true is inherited automatically from src/dashboard/layout_functions.ts!
export const revalidate: PageFunctions["revalidate"] = 300; // Page static shell cached independently for 5m
export const getCacheTags: PageFunctions["getCacheTags"] = ["dashboard-home-tag"];`,
                    },
                  ]}
                />
              </section>

              {/* 5.2 Refresh, Revalidation & Navigation Matrix (Layout vs. Page) */}
              <section id="hs-ppr-revalidation" className="mt-8 scroll-mt-20">
                <h4>5.2. How Refresh, Revalidation &amp; Navigation Affect Layout vs. Page Shells and Holes</h4>
                <p>
                  Because Horizontal Segmentation separates the <strong>Layout</strong> from the <strong>Page</strong> and PPR separates the <strong>Static Shell</strong> from the <strong>Dynamic <code>&lt;Suspense&gt;</code> Holes</strong>, every route is composed of four independent parts: Layout Shell, Layout Holes, Page Shell, and Page Holes. The table below summarizes how each client refresh, server revalidation, and soft navigation operation targets only the relevant parts without re-executing or re-fetching the rest:
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
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">Untouched (0 layout requests; layout client state preserved)</td>
                        <td className="p-3.5 text-purple-600 dark:text-purple-400">Page static shell stays cached; Page dynamic &lt;Suspense&gt; holes re-execute live with current cookies/query!</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">router.refresh(&#123; layout: true &#125;)</td>
                        <td className="p-3.5 text-purple-600 dark:text-purple-400">Layout static shell stays cached; Layout &amp; @sidebar dynamic &lt;Suspense&gt; holes re-execute live!</td>
                        <td className="p-3.5 text-purple-600 dark:text-purple-400">Page static shell stays cached; Page dynamic &lt;Suspense&gt; holes re-execute live!</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">revalidatePage(&quot;/dashboard&quot;) (or Page Tag / Page TTL)</td>
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">0 layout.tsx executions! Reuses the cached layout shell</td>
                        <td className="p-3.5 text-amber-600 dark:text-amber-400">Regenerates the page static shell while preserving dynamic hole streaming</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">revalidateLayout(&quot;/dashboard&quot;) (or Layout Tag / Layout TTL)</td>
                        <td className="p-3.5 text-amber-600 dark:text-amber-400">Regenerates the layout static shell immediately (and lazily updates nested sub-layouts on demand when visited)</td>
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">0 page.tsx executions! When visited, child PPR pages lazily combine the new layout with their existing cached page shell</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-semibold text-foreground">Soft Nav: PPR Page ↔ Static Opt-Out Page (ppr = false)</td>
                        <td className="p-3.5 text-emerald-600 dark:text-emerald-400">Shared parent PPR layout stays mounted with 0 layout network requests</td>
                        <td className="p-3.5 text-muted-foreground">Seamlessly navigates between streamed PPR pages and 100% static opt-out child pages</td>
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
                With PPR alone, a route only has two parts: the <strong>0ms Static Shell</strong> and <strong>Dynamic <code>&lt;Suspense&gt;</code> Holes</strong> that re-execute from scratch on every request (and can only be refreshed all at once via <code>router.refresh()</code>). Combining all primitives of the <strong>Temporal Axis</strong> (<code>ppr = true</code>, <code>&lt;Suspense&gt;</code>, <code>noDynamic()</code>, request data) with the <strong>Vertical Axis</strong> (<code>&lt;DinouCacheSlot&gt;</code>, <code>revalidate=&#123;N&#125;</code> vs. <code>revalidate=&#123;0&#125;</code>, and nested slots) produces <strong>7 possible combinations</strong>:
              </p>
              <ul>
                <li>
                  <strong>1. <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code> Outside <code>&lt;Suspense&gt;</code> (or Wrapping an Inner <code>&lt;Suspense&gt;</code>):</strong> Resolves at build time into the <strong>Static Shell</strong> (0ms TTFB, no fallback). Unlike the rest of the Static Shell, it has its own independent TTL/tags (updating via <strong>Background SWR</strong> without re-executing <code>page.tsx</code>) and supports in-place client refresh via <code>refreshSlot(id)</code> <em>(Section 6.1, Pattern B)</em>.
                </li>
                <li>
                  <strong>2. <code>&lt;Suspense&gt;</code> Wrapping <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code> + <code>noDynamic()</code>:</strong> Calling <code>noDynamic()</code> prevents the outer <code>&lt;Suspense&gt;</code> from postponing into a PPR hole. The slot stays in the <strong>Static Shell</strong> (same as #1), and Dinou also skips that <code>&lt;Suspense&gt;</code> branch in <strong>0ms</strong> at runtime when streaming other dynamic holes on the route <em>(Section 6.1, Pattern B)</em>.
                </li>
                <li>
                  <strong>3. <code>&lt;Suspense&gt;</code> Wrapping <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code> (Default):</strong> Becomes a <strong>Cached Dynamic PPR Hole</strong>. The Static Shell flushes immediately with the <code>&lt;Suspense&gt;</code> fallback, and the hole streams from the server slot cache in <strong>~2ms</strong> while its TTL is valid—re-executing live in the stream on expiry or <code>revalidateTag</code> without touching the Static Shell <em>(Section 6.1, Pattern A)</em>.
                </li>
                <li>
                  <strong>4. <code>&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt;</code> Inside a Personalized Dynamic <code>&lt;Suspense&gt;</code> Hole:</strong> When a <code>&lt;Suspense&gt;</code> hole must run live on every request because it reads user-specific request data (<code>req.cookies</code>, <code>req.headers</code>, or <code>req.query</code>), placing a parameterized <code>&lt;DinouCacheSlot&gt;</code> <em>inside</em> it caches the expensive shared UI (~2ms) across users who share that parameter <em>(Section 6.2)</em>.
                </li>
                <li>
                  <strong>5. <code>&lt;Suspense&gt;</code> Wrapping <code>&lt;DinouCacheSlot revalidate=&#123;0&#125;&gt;</code> (Surgically Refreshable Live Hole):</strong> With <code>revalidate=&#123;0&#125;</code>, the slot never caches on the server and streams live on every request as a Dynamic PPR Hole (without breaking the Static Shell). Unlike a plain <code>&lt;Suspense&gt;</code> hole (which can only be refreshed by re-running <em>all</em> page holes via <code>router.refresh()</code>), wrapping it in <code>&lt;DinouCacheSlot id=&quot;live-hole&quot; revalidate=&#123;0&#125;&gt;</code> lets you refresh <strong>only that specific hole</strong> from the client with <code>refreshSlot(&quot;live-hole&quot;)</code> <em>(Section 6.2)</em>.
                </li>
                <li>
                  <strong>6. Nested Slots (<code>Outer &lt;DinouCacheSlot&gt; → Inner &lt;DinouCacheSlot&gt;</code>):</strong> You can nest a short-TTL slot (e.g., <code>revalidate=&#123;60&#125;</code>) inside a long-TTL slot (e.g., <code>revalidate=&#123;3600&#125;</code>) in either the Static Shell or a Dynamic Hole. When the inner slot expires or is refreshed, Dinou re-renders only the inner child slot and splices it into the cached parent slot without re-running the parent <em>(Section 6.2)</em>.
                </li>
                <li>
                  <strong>7. <code>&lt;DinouCacheSlot revalidate=&#123;0&#125;&gt;</code> (or Request Data Access) Outside <code>&lt;Suspense&gt;</code> (Full-Page Bailout):</strong> Because there is no outer <code>&lt;Suspense&gt;</code> boundary to isolate it into a PPR hole, placing <code>revalidate=&#123;0&#125;</code> or reading <code>cookies</code>/<code>headers</code>/<code>query</code> outside <code>&lt;Suspense&gt;</code> forces a <strong>Full-Page Dynamic Bailout</strong> (the entire route falls back to per-request SSR).
                </li>
              </ul>

              {/* 6.1 Nesting-Order Semantics */}
              <section id="ppr-slot-nesting" className="mt-6 scroll-mt-20">
                <h4>6.1. Nesting-Order Semantics (<code>&lt;Suspense&gt;</code> vs. <code>&lt;DinouCacheSlot&gt;</code>)</h4>
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
                      <li><strong>Build Time:</strong> Postpones into a PPR hole; the Static Shell includes the skeleton fallback.</li>
                      <li><strong>Runtime Cache Hit:</strong> Streams from the server slot cache in <strong>~2ms</strong> (99.9% DB offload across concurrent visitors).</li>
                      <li><strong>On TTL Expiry / <code>revalidateTag</code>:</strong> Only the slot cache is cleared; the Static Shell stays 100% intact (0ms TTFB) and the hole refreshes live in the stream!</li>
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
                      <li><strong>Build Time:</strong> Resolves completely and bakes the HTML directly into the Static Shell (0ms TTFB, no skeleton flash).</li>
                      <li><strong>Runtime Hole Traversal:</strong> Short-circuits from cache in 0ms when the route streams other dynamic holes.</li>
                      <li><strong>On TTL Expiry / <code>revalidateTag</code>:</strong> Uses <strong>Background SWR</strong> to refresh only that slot and update the Static Shell without re-executing <code>page.tsx</code>.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6.2 Caching Heavy Widgets Inside Personalized Holes & Surgical Live Holes */}
              <section id="ppr-slot-patterns" className="mt-8 scroll-mt-20">
                <h4>6.2. Personalized Holes with Nested Slots &amp; Surgically Refreshable Live Holes</h4>
                <p>
                  What if a dynamic PPR <code>&lt;Suspense&gt;</code> hole reads user-specific request data (<code>req.cookies</code>, <code>req.headers</code>, or <code>req.query</code>), and <em>inside</em> that personalized hole you also need to render an expensive shared calculation or a nested <code>Outer → Inner</code> slot hierarchy? Or what if you have a 100% live uncached hole that you want to refresh individually via <code>refreshSlot(id)</code> without re-running every other hole on the page via <code>router.refresh()</code>?
                </p>
                <p>
                  Simply place parameterized <code>&lt;DinouCacheSlot&gt;</code> boundaries <strong>inside</strong> the personalized component, or wrap a live hole in <code>&lt;DinouCacheSlot revalidate=&#123;0&#125;&gt;</code> inside <code>&lt;Suspense&gt;</code>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg text-xs my-4"
                >
{`// src/feed/page.tsx (with export const ppr = true in page_functions.ts)
import { Suspense } from "react";
import { DinouCacheSlot, getContext } from "dinou/server";

async function PersonalizedDepartmentHole() {
  // Runs live on EVERY request with the user's cookies & query params
  const ctx = getContext();
  const user = ctx?.req.cookies["session_user"] ?? "guest";
  const dept = ctx?.req.cookies["dept_id"] ?? "general";

  return (
    <section className="space-y-4">
      <h2>Welcome back, {user} (Department: {dept})</h2>

      {/* Combination #4: Cached across all users in the same department for 1h */}
      <DinouCacheSlot id={\`dept-outer-\${dept}\`} tag={\`dept-\${dept}\`} revalidate={3600}>
        <div className="dept-panel">
          <QuarterlyDepartmentSummary dept={dept} />

          {/* Combination #6: Nested inner slot with a fast 60s TTL inside the 1h outer slot */}
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
      {/* Combination #1: Static Shell Slot (baked into initial HTML at 0ms TTFB) */}
      <DinouCacheSlot id="announcement-banner" tag="banner" revalidate={3600}>
        <GlobalAnnouncementBanner />
      </DinouCacheSlot>

      {/* Combination #4 & #6: Personalized Dynamic Hole containing nested cached slots */}
      <Suspense fallback={<div>Streaming your department workspace...</div>}>
        <PersonalizedDepartmentHole />
      </Suspense>

      {/* Combination #5: Live uncached PPR hole (revalidate={0}) that can be refreshed
          individually via refreshSlot("live-inbox") without refreshing the other holes! */}
      <Suspense fallback={<div>Loading live inbox...</div>}>
        <DinouCacheSlot id="live-inbox" revalidate={0}>
          <LiveUserInbox />
        </DinouCacheSlot>
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
                  Below, a single route tree combines a segmented PPR Layout (hosting a layout-level <code>&lt;DinouCacheSlot&gt;</code>) with a PPR Page (hosting a Static Shell <code>&lt;DinouCacheSlot&gt;</code>, a Cached Dynamic Hole, and an uncached per-user Dynamic Hole):
                </p>
                <TabbedCodeBlock
                  containerClassName="my-4"
                  tabs={[
                    {
                      id: "layout",
                      label: "src/telemetry/layout.tsx",
                      language: "tsx",
                      code: `import { DinouCacheSlot } from "dinou/server";
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
}`,
                    },
                    {
                      id: "layout_functions",
                      label: "src/telemetry/layout_functions.ts",
                      language: "typescript",
                      code: `import type { LayoutFunctions } from "dinou/server";

export const ppr: LayoutFunctions["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600;
export const getCacheTags: LayoutFunctions["getCacheTags"] = ["telemetry-layout"];`,
                    },
                    {
                      id: "page",
                      label: "src/telemetry/page.tsx",
                      language: "tsx",
                      code: `import { Suspense } from "react";
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
      {/* A. Page Static Shell Micro-ISR Slot: Baked into initial HTML, 300s Background SWR */}
      <DinouCacheSlot id="global-status" tag="status-banner" revalidate={300}>
        <GlobalStatusBanner />
      </DinouCacheSlot>

      {/* B. Cached Dynamic PPR Hole: Skeleton in initial HTML, ~2ms cached stream for 60s */}
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
}`,
                    },
                    {
                      id: "page_functions",
                      label: "src/telemetry/page_functions.ts",
                      language: "typescript",
                      code: `import type { PageFunctions } from "dinou/server";

// ppr = true is inherited automatically from src/telemetry/layout_functions.ts!
export const getCacheTags: PageFunctions["getCacheTags"] = ["telemetry-page"];`,
                    },
                  ]}
                />

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
                      Visitors receive the precalculated slot stream almost instantly over the same HTTP connection.
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

              {/* 7.2 4-Way Surgical Invalidation Without Collateral Rebuilds */}
              <section id="triple-synergy-invalidation" className="mt-8 scroll-mt-20">
                <h4>7.2. 4-Way Surgical Invalidation Without Collateral Rebuilds</h4>
                <p>
                  Because Dinou tracks layout slots, page static-shell slots, and dynamic-hole slots independently, invalidating any piece of a Triple Synergy route never triggers unnecessary work in the rest of the tree:
                </p>
                <ol>
                  <li>
                    <strong>Invalidating a Dynamic-Hole Slot (<code>await revalidateTag(&quot;telemetry&quot;)</code>):</strong> Clears <em>only</em> that slot&apos;s cache. Neither the static page shell, <code>page.tsx</code>, nor <code>layout.tsx</code> is touched—preserving 0ms TTFB while the hole streams fresh data on the next request.
                  </li>
                  <li>
                    <strong>Invalidating a Page Static-Shell Slot (<code>await revalidateTag(&quot;status-banner&quot;)</code>):</strong> Re-renders <em>only</em> <code>&lt;GlobalStatusBanner /&gt;</code> and updates the page&apos;s static shell without re-executing <code>page.tsx</code>, <code>page_functions.ts</code>, or <code>layout.tsx</code>.
                  </li>
                  <li>
                    <strong>Invalidating a Layout Slot (<code>await revalidateTag(&quot;incident-alert&quot;)</code>):</strong> Re-renders <em>only</em> <code>&lt;IncidentAlertBar /&gt;</code> inside the layout without re-executing <code>layout.tsx</code>, and automatically updates both PPR and Static child routes on their next visit without re-executing any child <code>page.tsx</code>.
                  </li>
                  <li>
                    <strong>Live Browser Refresh Across All 3 Layers (<code>refreshSlot</code> &amp; <code>router.refresh</code>):</strong> Calling <code>refreshSlot(&quot;incident-bar&quot;)</code>, <code>refreshSlot(&quot;global-status&quot;)</code>, or <code>refreshSlot(&quot;operations-telemetry&quot;)</code> updates that exact widget in place while preserving Client Component <code>useState</code> across the layout, static shell, and dynamic holes—with zero hydration mismatch on subsequent <code>F5</code> reloads.
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
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">revalidateLayout / revalidatePage + Automatic HTML Re-composition</td>
                      <td className="p-4 text-xs text-muted-foreground">Multi-page workspaces, persistent navbars, dynamic child pages under static layouts</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">2. Vertical Only (V)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">&lt;DinouCacheSlot id tag revalidate&gt;</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.45ms (Static Shell) or ~2ms (SSR Hit)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Background SWR + revalidateTag + live in-place refreshSlot()</td>
                      <td className="p-4 text-xs text-muted-foreground">Isolating heavy SQL/API widgets inside SSR dashboards or slow-ISR catalog pages</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">3. Temporal Only (T / PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr = true + &lt;Suspense&gt; (+ noDynamic)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (0ms Cached Static Shell)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Instant Static Shell + 100% real-time parallel &lt;Suspense&gt; holes</td>
                      <td className="p-4 text-xs text-muted-foreground">Instant landing/store shells with personalized per-user cookie/query holes</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">4. Pairwise #1: H + V (Non-PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">layout_functions.ts + &lt;DinouCacheSlot&gt; in Layout/@sidebar/Page</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.45ms (SSR) / 0ms (Cached Soft Nav)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Cross-axis shared tags + slot state persisted across Page A → B → A</td>
                      <td className="p-4 text-xs text-muted-foreground">Rich SPA apps with header/sidebar widgets, cross-route state, and zero-network back/forward nav</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">5. Pairwise #2: H + T (Layouts + PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">layout_functions.ts + page_functions.ts + ppr = true</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (Independent Layout &amp; Page Shells)</td>
                      <td className="p-4 text-xs text-purple-600 dark:text-purple-400 font-medium">router.refresh() (page holes) vs. &#123; layout: true &#125; + Independent shell revalidation</td>
                      <td className="p-4 text-xs text-muted-foreground">Multi-level portals mixing PPR layouts, @sidebar holes, PPR pages, and static opt-out pages</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">6. Pairwise #3: V + T (Slots + PPR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr = true + &lt;DinouCacheSlot&gt; (in Shell or in &lt;Suspense&gt;)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (Shell) + ~2ms (Cached Hole)</td>
                      <td className="p-4 text-xs text-indigo-600 dark:text-indigo-400 font-medium">Shell slots (SWR) + Cached Dynamic Holes (stream) + Slots inside per-user holes</td>
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
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell (pre-rendered into initial HTML at build time)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static HTML (pre-rendered at build time)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; + async Server Component (default)</td>
                      <td className="p-3.5 text-purple-600 dark:text-purple-400 font-medium">Dynamic PPR Hole (fallback in initial HTML, streams live per request)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static HTML (resolved at build time into initial HTML)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; + async Server Component + noDynamic()</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell (pre-rendered into initial HTML + 0ms runtime skip)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static HTML (resolved at build time into initial HTML)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;DinouCacheSlot revalidate=&#123;N&#125;&gt; outside &lt;Suspense&gt; (or wrapping inner &lt;Suspense&gt;)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell Slot (baked into initial HTML; Background SWR on expiry)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Slot (baked into initial HTML; Background SWR on expiry)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; wrapping &lt;DinouCacheSlot revalidate=&#123;N&#125;&gt; (default)</td>
                      <td className="p-3.5 text-indigo-600 dark:text-indigo-400 font-medium">Cached Dynamic PPR Hole (fallback in initial HTML, ~2ms cached stream; live stream refresh on expiry)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Slot (baked into initial HTML; Background SWR on expiry)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono">&lt;Suspense&gt; wrapping &lt;DinouCacheSlot revalidate=&#123;N&#125;&gt; + noDynamic()</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Shell Slot (baked into initial HTML; Background SWR on expiry)</td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">Static Slot (baked into initial HTML; Background SWR on expiry)</td>
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
