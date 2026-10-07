"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Zap,
  RefreshCw,
  Info,
  Layers,
  FilePlus2,
  ServerCog,
  Sparkles,
  CheckCircle2,
  Split,
  Timer,
  ShieldCheck,
  Cpu,
  ArrowRightLeft,
  Server,
  Globe,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview: Static by Default Architecture",
    level: 2,
  },
  {
    id: "static-rendering",
    title: "1. Static Site Generation (SSG) & Bailout",
    level: 2,
  },
  {
    id: "pure-ssg",
    title: "1.1. Pure Static Pre-rendering",
    level: 3,
  },
  {
    id: "automatic-bailout",
    title: "1.2. Automatic Static Bailout",
    level: 3,
  },
  {
    id: "revalidate-strategy",
    title: "2. The Unified revalidate Strategy (Seconds)",
    level: 2,
  },
  {
    id: "forced-dynamic-ssr",
    title: "2.1. Dynamic SSR (revalidate < 1)",
    level: 3,
  },
  {
    id: "isr-regeneration",
    title: "2.2. Incremental Static Regeneration (revalidate >= 1)",
    level: 3,
  },
  {
    id: "partial-prerendering",
    title: "3. Partial Prerendering (PPR)",
    level: 2,
  },
  {
    id: "ppr-architecture",
    title: "3.1. Hybrid Architecture: Static Shell + Dynamic Holes",
    level: 3,
  },
  {
    id: "ppr-activation",
    title: "3.2. Enabling PPR & Specificity Hierarchy",
    level: 3,
  },
  {
    id: "micro-isr",
    title: "4. Vertical Segmentation: Micro-ISR (<DinouCacheSlot>)",
    level: 2,
  },
  {
    id: "slot-caching",
    title: "4.1. Component-Level Caching with TTL & Tags",
    level: 3,
  },
  {
    id: "horizontal-vs-vertical",
    title: "4.2. Horizontal vs Vertical Segmentation",
    level: 3,
  },
  {
    id: "isg",
    title: "5. Incremental Static Generation (ISG on-demand)",
    level: 2,
  },
  {
    id: "on-demand-generation",
    title: "5.1. On-Demand Path Generation",
    level: 3,
  },
  {
    id: "isg-governance",
    title: "5.2. Governance APIs (validateParams & allowISG)",
    level: 3,
  },
  {
    id: "comparison-matrix",
    title: "6. Complete Rendering Strategies Matrix",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Rendering Strategies
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou is <strong>Static by Default</strong>. It provides a
              continuum of rendering strategies—from build-time SSG and
              stale-while-revalidate ISR to real-time Dynamic SSR, revolutionary{" "}
              <strong>Partial Prerendering (PPR)</strong>, and component-level
              Micro-ISR with <code>&lt;DinouCacheSlot&gt;</code>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview: Static by Default Architecture</h2>
              <p>
                In Dinou, every route is assumed to be static until proven
                otherwise. Build-time compilation analyzes route segments,
                components, and server functions to determine the most performant
                delivery model:
              </p>

              <div className="grid gap-6 md:grid-cols-3 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Globe className="h-5 w-5" />
                      <span>Static by Default</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Routes without dynamic dependencies are pre-rendered into
                    static HTML and cached RSC payloads at build time (0ms TTFB).
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Sparkles className="h-5 w-5" />
                      <span>Partial Prerendering (PPR)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Combines static shells with dynamic streaming holes over a
                    single HTTP response stream.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Layers className="h-5 w-5" />
                      <span>Micro-ISR</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Vertical segmentation via <code>&lt;DinouCacheSlot&gt;</code>{" "}
                    isolates component subtree caching independently from the
                    parent page.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. Static Rendering & Bailout */}
            <section
              id="static-rendering"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                1. Static Site Generation (SSG) &amp; Bailout
              </h3>
              <p>
                Pure static rendering pre-generates HTML files during the build phase (<code>dinou build</code>). Production server startup is instantaneous, and static pages achieve the fastest possible Time
                to First Byte (TTFB) and can be cached by edge CDNs globally.
              </p>

              {/* 1.1 Pure SSG */}
              <section id="pure-ssg" className="mt-6 scroll-mt-20">
                <h4>1.1. Pure Static Pre-rendering</h4>
                <p>
                  Any page that does not consume request-specific headers or
                  cookies and does not set <code>revalidate &lt; 1</code> is
                  automatically generated as static HTML:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/about/page.tsx
// Automatically rendered as static HTML during build time
export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About Us</h1>
      <p>This page is pre-rendered once and served statically forever.</p>
    </article>
  );
}`}
                </CodeBlock>
              </section>

              {/* 1.2 Automatic Static Bailout */}
              <section id="automatic-bailout" className="mt-8 scroll-mt-20">
                <h4>1.2. Automatic Static Bailout</h4>
                <p>
                  If a Server Component reads request-specific data at render
                  time without wrapping it in a dynamic boundary, Dinou
                  automatically &quot;bails out&quot; of static generation and
                  transitions the route into <strong>Dynamic SSR</strong> for that
                  request:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/profile/page.tsx
import { getContext } from "dinou";
import db from "@/lib/db";

export default async function ProfilePage() {
  const context = getContext();

  // ⚠️ Reading cookies triggers an Automatic Static Bailout
  // This page will now be rendered dynamically on every incoming request
  const sessionToken = context?.req.cookies["session_token"];
  const user = await db.users.findByToken(sessionToken);

  return <h1>Welcome back, {user?.name}</h1>;
}`}
                </CodeBlock>

                <Alert className="not-prose mt-4">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <AlertTitle>Bailout Triggers</AlertTitle>
                  <AlertDescription>
                    Automatic bailout occurs when reading <code>context.req.cookies</code>,{" "}
                    <code>context.req.headers</code>, or un-Suspended dynamic
                    search parameters during server component execution.
                  </AlertDescription>
                </Alert>
              </section>
            </section>

            {/* 2. Unified revalidate Strategy */}
            <section
              id="revalidate-strategy"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                2. The Unified <code>revalidate</code> Strategy (Seconds)
              </h3>
              <p>
                In Dinou v7, the <code>revalidate</code> export in{" "}
                <code>page_functions.ts</code> (or <code>layout_functions.ts</code>)
                serves as the <strong>single source of truth</strong> for the
                route segment&apos;s rendering mode. It is measured strictly in{" "}
                <strong>seconds (s)</strong>.
              </p>

              {/* 2.1 Forced Dynamic SSR */}
              <section id="forced-dynamic-ssr" className="mt-6 scroll-mt-20">
                <h4>
                  2.1. Dynamic SSR (<code>revalidate &lt; 1</code> or <code>0</code>)
                </h4>
                <p>
                  To force a page to render dynamically on every single request
                  (escaping the default static generation), set <code>revalidate</code>{" "}
                  to <code>0</code> (or any number &lt; 1):
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/analytics/live/page_functions.ts

// Escapes static generation: executes dynamic SSR on every request
export const revalidate = 0;`}
                </CodeBlock>

                <Alert className="not-prose mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Migration from Legacy dynamic Export</AlertTitle>
                  <AlertDescription>
                    In older versions of Dinou, dynamic rendering was toggled
                    via <code>export function dynamic()</code>. In Dinou v7, the{" "}
                    <code>dynamic</code> export has been removed. Setting{" "}
                    <code>export const revalidate = 0;</code> is the official
                    unified mechanism to escape static generation.
                  </AlertDescription>
                </Alert>
              </section>

              {/* 2.2 Incremental Static Regeneration */}
              <section id="isr-regeneration" className="mt-8 scroll-mt-20">
                <h4>
                  2.2. Incremental Static Regeneration (<code>revalidate &gt;= 1</code>)
                </h4>
                <p>
                  When <code>revalidate &gt;= 1</code>, Dinou serves pre-rendered
                  static HTML/RSC payloads while regenerating the page in the
                  background at most once every <code>N</code> seconds
                  (stale-while-revalidate):
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/page_functions.ts

// Rebuilds the cached page in the background at most once every 60 seconds
export const revalidate = 60;

// Or as a sync/async function:
// export function revalidate() { return 60; }`}
                </CodeBlock>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                  <Card className="bg-muted/50 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <RefreshCw className="h-5 w-5 text-blue-500" />
                        <span>Background Revalidation Flow</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      The first request after the 60s window receives the
                      cached page immediately. Dinou re-executes the server render
                      in the background. Subsequent visitors see the fresh
                      version.
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50 border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Timer className="h-5 w-5 text-emerald-500" />
                        <span>Seconds-Based Precision</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Values are in seconds (e.g. <code>60</code> for 1 minute,{" "}
                      <code>3600</code> for 1 hour). If <code>false</code> or
                      omitted, the page remains static forever until purged.
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* 3. Partial Prerendering (PPR) */}
            <section
              id="partial-prerendering"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  3. Partial Prerendering (PPR)
                </h3>
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  Breakthrough in v7
                </span>
              </div>
              <p className="mt-4">
                <strong>Partial Prerendering (PPR)</strong> resolves the decades-old
                dilemma between static and dynamic rendering. Instead of forcing
                an entire page to be 100% static or 100% dynamic, PPR delivers a{" "}
                <strong>pre-rendered static shell</strong> instantly, while streaming{" "}
                <strong>dynamic holes</strong> in parallel over the same HTTP response.
              </p>

              {/* 3.1 Architecture */}
              <section id="ppr-architecture" className="mt-6 scroll-mt-20">
                <h4>3.1. Hybrid Architecture: Static Shell + Dynamic Holes</h4>
                <p>
                  At build time, Dinou compiles the layout, navigation, and static
                  components into an immutable HTML shell. Any dynamic component
                  wrapped in React <code>&lt;Suspense&gt;</code> is saved as a
                  streaming placeholder (hole).
                </p>

                <div className="border rounded-lg p-4 bg-card not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <span>The Single HTTP Response Timeline</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>
                      <strong>0ms (Instant TTFB):</strong> The browser receives
                      the static shell with skeleton fallbacks. Visual layout is
                      rendered immediately.
                    </li>
                    <li>
                      <strong>Request Processing:</strong> Dinou executes async
                      Server Components inside <code>&lt;Suspense&gt;</code> on the
                      server.
                    </li>
                    <li>
                      <strong>Streaming In-Place:</strong> As each Suspense
                      promise resolves, the HTML chunk and RSC payload are
                      streamed down the same HTTP connection, replacing the
                      skeleton with real content without full page reloads.
                    </li>
                  </ol>
                </div>
              </section>

              {/* 3.2 Activation */}
              <section id="ppr-activation" className="mt-8 scroll-mt-20">
                <h4>3.2. Enabling PPR &amp; Specificity Hierarchy</h4>
                <p>
                  Dinou provides granular control over Partial Prerendering
                  across three hierarchical levels: <strong>Global</strong> (application-wide),{" "}
                  <strong>Layout</strong> (segment subtree), and <strong>Page</strong> (individual route).
                </p>

                {/* Specificity Rule Box */}
                <div className="border rounded-lg p-4 bg-card not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Split className="h-5 w-5 text-purple-500" />
                    <span>Specificity Hierarchy (Most Specific Always Wins)</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Configuration cascades strictly from general to specific. A more
                      specific level always overrides a less specific one:
                    </p>
                    <div className="grid gap-2 font-mono text-xs mt-3">
                      <div className="p-2 rounded bg-muted/80 flex items-center justify-between border-l-4 border-purple-500">
                        <span>1. <strong>page_functions.ts</strong> (Page Level)</span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400">Highest Priority</span>
                      </div>
                      <div className="p-2 rounded bg-muted/80 flex items-center justify-between border-l-4 border-indigo-500">
                        <span>2. <strong>layout_functions.ts</strong> (Nested Layouts)</span>
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
                </div>

                <div className="space-y-6">
                  {/* Level 1: Global */}
                  <div>
                    <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      1. Global Configuration (dinou.config.js / .mjs)
                    </h5>
                    <p className="text-sm text-muted-foreground my-2">
                      When enabled globally, all static-eligible routes in your application
                      will automatically generate static shells and stream dynamic Suspense holes
                      unless explicitly disabled at the layout or page level:
                    </p>
                    <CodeBlock
                      language="javascript"
                      containerClassName="w-full overflow-hidden rounded-lg"
                    >
{`// dinou.config.mjs
import { defineConfig } from "dinou";

export default defineConfig({
  // Enables Partial Prerendering globally for the entire app
  ppr: true,
});`}
                    </CodeBlock>
                  </div>

                  {/* Level 2: Layout */}
                  <div>
                    <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <Layers className="h-4 w-4 text-indigo-500" />
                      2. Layout Level (layout_functions.ts) — Subtree Cascading
                    </h5>
                    <p className="text-sm text-muted-foreground my-2">
                      A setting in <code>layout_functions.ts</code> applies to that layout and{" "}
                      <strong>cascades to all its descendant subroutes</strong>. For example, if PPR
                      is enabled globally, you can opt out an entire authenticated admin section:
                    </p>
                    <CodeBlock
                      language="typescript"
                      containerClassName="w-full overflow-hidden rounded-lg"
                    >
{`// src/admin/layout_functions.ts

// Overrides global ppr: true.
// Disables PPR for /admin and ALL subroutes (/admin/users, /admin/settings, etc.)
export const ppr = false;`}
                    </CodeBlock>
                  </div>

                  {/* Level 3: Page */}
                  <div>
                    <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <FilePlus2 className="h-4 w-4 text-purple-500" />
                      3. Page Level (page_functions.ts) — Maximum Specificity
                    </h5>
                    <p className="text-sm text-muted-foreground my-2">
                      A page can override both its parent layout and the global configuration.
                      This allows enabling PPR on a specific high-traffic marketing page or turning
                      it off on an individual volatile checkout page:
                    </p>
                    <CodeBlock
                      language="typescript"
                      containerClassName="w-full overflow-hidden rounded-lg"
                    >
{`// src/shop/products/[slug]/page_functions.ts

// Overrides any parent setting to guarantee PPR on product details
export const ppr = true;`}
                    </CodeBlock>
                  </div>

                  {/* Implementation Example */}
                  <div>
                    <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Component Implementation Pattern
                    </h5>
                    <p className="text-sm text-muted-foreground my-2">
                      Once PPR is active, wrap dynamic data fetching components in React{" "}
                      <code>&lt;Suspense&gt;</code> to create the streaming holes:
                    </p>
                    <CodeBlock
                      language="tsx"
                      containerClassName="w-full overflow-hidden rounded-lg"
                    >
{`// src/shop/products/[slug]/page.tsx
import { Suspense } from "react";
import { ProductGallery, ProductDetails } from "./static-components";
import { RealtimeStock, StockSkeleton } from "./dynamic-components";

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="product-layout">
      {/* 1. Static Shell: pre-rendered at build time and served in 0ms */}
      <ProductGallery slug={params.slug} />
      <ProductDetails slug={params.slug} />

      {/* 2. Dynamic Hole: streamed in real-time over the same HTTP response */}
      <Suspense fallback={<StockSkeleton />}>
        <RealtimeStock slug={params.slug} />
      </Suspense>
    </div>
  );
}`}
                    </CodeBlock>
                  </div>
                </div>
              </section>
            </section>

            {/* 4. Micro-ISR */}
            <section id="micro-isr" className="mt-12 pt-8 border-t scroll-mt-20">
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  4. Vertical Segmentation: Micro-ISR (<code>&lt;DinouCacheSlot&gt;</code>)
                </h3>
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Exclusive to Dinou
                </span>
              </div>
              <p className="mt-4">
                Traditional frameworks only offer <em>Horizontal Segmentation</em>{" "}
                (routing-level caching). Dinou v7 introduces{" "}
                <strong>Vertical Segmentation</strong> with{" "}
                <code>&lt;DinouCacheSlot&gt;</code>, allowing fine-grained caching
                at the component level.
              </p>

              {/* 4.1 Slot Caching */}
              <section id="slot-caching" className="mt-6 scroll-mt-20">
                <h4>4.1. Component-Level Caching with TTL &amp; Tags</h4>
                <p>
                  Wrap heavy subtrees with <code>DinouCacheSlot</code> from{" "}
                  <code>&quot;dinou/server&quot;</code> to cache their rendered
                  output independently:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/dashboard/page.tsx
import { DinouCacheSlot } from "dinou/server";
import { FastUserProfile, SlowAnalyticsWidget } from "./widgets";

export default function DashboardPage() {
  return (
    <main className="grid grid-cols-2 gap-4">
      {/* Dynamic: evaluated on every request */}
      <FastUserProfile />

      {/* Micro-ISR: cached for 300 seconds and tagged with "analytics" */}
      <DinouCacheSlot id="analytics-widget" tag="analytics" revalidate={300}>
        <SlowAnalyticsWidget />
      </DinouCacheSlot>
    </main>
  );
}`}
                </CodeBlock>
              </section>

              {/* 4.2 Horizontal vs Vertical */}
              <section id="horizontal-vs-vertical" className="mt-8 scroll-mt-20">
                <h4>4.2. Horizontal vs Vertical Segmentation</h4>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                        <Split className="h-5 w-5" />
                        <span>Horizontal Segmentation</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Configured in <code>page_functions.ts</code> and{" "}
                        <code>layout_functions.ts</code>. Governs route-level SSG,
                        ISR, and PPR.
                      </p>
                      <div className="font-mono text-xs bg-muted p-2 rounded">
                        Route / Segment Level (URL based)
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                        <Layers className="h-5 w-5" />
                        <span>Vertical Segmentation</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Configured via <code>&lt;DinouCacheSlot&gt;</code>.
                        Isolates component subtrees with independent revalidation
                        and on-demand tag purging.
                      </p>
                      <div className="font-mono text-xs bg-muted p-2 rounded">
                        Component Subtree Level (Widget based)
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* 5. ISG */}
            <section id="isg" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                5. Incremental Static Generation (ISG on-demand)
              </h3>
              <p>
                While ISR updates <em>existing</em> pre-rendered pages,{" "}
                <strong>ISG (Incremental Static Generation)</strong> generates{" "}
                <em>new</em> pages on demand that were not included in the initial
                build-time <code>getStaticPaths</code> list.
              </p>

              {/* 5.1 On-demand */}
              <section id="on-demand-generation" className="mt-6 scroll-mt-20">
                <h4>5.1. On-Demand Path Generation</h4>
                <p>
                  Any route path omitted from <code>getStaticPaths</code> will be
                  generated dynamically when the first visitor requests it,
                  cached, and then served as static HTML to subsequent visitors:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/products/[id]/page_functions.ts

// Pre-render only the top 10 products at build time
export const getStaticPaths = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// Any other ID (e.g. /products/452) will be generated on-demand
// on its first visitor and cached permanently.`}
                </CodeBlock>
              </section>

              {/* 5.2 Governance APIs */}
              <section id="isg-governance" className="mt-8 scroll-mt-20">
                <h4>5.2. Governance APIs (<code>validateParams</code> &amp; <code>allowISG</code>)</h4>
                <p>
                  Dinou provides strict server-side governance exports to secure
                  dynamic generation against abuse:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        <span>validateParams(params)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Validates parameters before generation. Returning{" "}
                        <code>false</code> halts rendering and returns 404
                        immediately.
                      </p>
                      <CodeBlock language="typescript" hideHeader>
{`export function validateParams(params) {
  return /^\\d+$/.test(params.id); // Only allow numeric IDs
}`}
                      </CodeBlock>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <ServerCog className="h-5 w-5 text-blue-500" />
                        <span>allowISG</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Disables on-demand generation. If set to <code>false</code>,
                        any path not in <code>getStaticPaths</code> returns 404
                        instantly.
                      </p>
                      <CodeBlock language="typescript" hideHeader>
{`export const allowISG = false; // Strict SSG only`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* 6. Comparison Matrix */}
            <section
              id="comparison-matrix"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                6. Complete Rendering Strategies Matrix
              </h3>
              <p>
                Summary of all rendering strategies supported natively by Dinou v7:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Strategy</th>
                      <th className="p-4">How to Configure</th>
                      <th className="p-4">TTFB</th>
                      <th className="p-4">Freshness</th>
                      <th className="p-4">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold">Pure SSG</td>
                      <td className="p-4 text-xs font-mono">Default / revalidate = false</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">0ms (Instant)</td>
                      <td className="p-4 text-xs">Build-time</td>
                      <td className="p-4 text-xs">Landing pages, marketing, documentation</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">ISR</td>
                      <td className="p-4 text-xs font-mono">revalidate = N (N &gt;= 1)</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">0ms (Cached)</td>
                      <td className="p-4 text-xs">Stale-while-revalidate</td>
                      <td className="p-4 text-xs">Blogs, catalogs, news feeds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Dynamic SSR</td>
                      <td className="p-4 text-xs font-mono">revalidate = 0</td>
                      <td className="p-4 text-xs">Request-time</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">100% Real-time</td>
                      <td className="p-4 text-xs">User settings, banking, checkout</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">PPR (Partial Prerendering)</td>
                      <td className="p-4 text-xs font-mono">ppr = true + &lt;Suspense&gt;</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">0ms (Shell)</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">100% Real-time (Holes)</td>
                      <td className="p-4 text-xs">E-commerce, dashboards with static shells</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Micro-ISR</td>
                      <td className="p-4 text-xs font-mono">&lt;DinouCacheSlot&gt;</td>
                      <td className="p-4 text-xs">Fast (Slot-cached)</td>
                      <td className="p-4 text-xs">Component TTL</td>
                      <td className="p-4 text-xs">Heavy SQL widgets, live pricing blocks</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">ISG</td>
                      <td className="p-4 text-xs font-mono">getStaticPaths (un-prerendered)</td>
                      <td className="p-4 text-xs">0ms (after 1st hit)</td>
                      <td className="p-4 text-xs">Cached permanently</td>
                      <td className="p-4 text-xs">Long-tail e-commerce products</td>
                    </tr>
                  </tbody>
                </table>
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
