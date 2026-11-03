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
  FilePlus2,
  Sparkles,
  Split,
  Timer,
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
    title: "Overview: The 3 Orthogonal Axes",
    level: 2,
  },
  {
    id: "partial-prerendering",
    title: "1. Temporal Axis: Partial Prerendering (PPR)",
    level: 2,
  },
  {
    id: "ppr-architecture",
    title: "1.1. Hybrid Architecture: Static Shell + Dynamic Holes",
    level: 3,
  },
  {
    id: "ppr-activation",
    title: "1.2. Enabling PPR & Specificity Hierarchy",
    level: 3,
  },
  {
    id: "micro-isr",
    title: "2. Vertical Axis: Micro-ISR (<DinouCacheSlot>)",
    level: 2,
  },
  {
    id: "slot-caching",
    title: "2.1. Component Caching: Dynamic vs Static Patterns",
    level: 3,
  },
  {
    id: "slot-invalidation",
    title: "2.2. Interactive Revalidation & Invalidation",
    level: 3,
  },
  {
    id: "slot-anti-patterns",
    title: "2.3. Anti-Patterns: When NOT to Use <DinouCacheSlot>",
    level: 3,
  },
  {
    id: "horizontal-segmentation",
    title: "3. Horizontal Axis: Layout Isolation (layout_functions.ts)",
    level: 2,
  },
  {
    id: "ppr-slot-synergy",
    title: "4. High-Traffic Synergy: PPR + <DinouCacheSlot>",
    level: 2,
  },
  {
    id: "comparison-matrix",
    title: "5. Layered Segmentation Matrix",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>3D Layered Segmentation | Dinou Docs</title>
      <meta
        name="description"
        content="Escape all-or-nothing route rendering with Dinou's 3D Layered Segmentation: Temporal (PPR), Vertical (<DinouCacheSlot>), and Horizontal (layout_functions.ts)."
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
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                3D Layered Segmentation
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Escape the binary &ldquo;all-or-nothing&rdquo; route model. Dinou decomposes caching and rendering across{" "}
              <strong>three independent, orthogonal axes</strong>—<strong>Temporal</strong> (Partial Prerendering),{" "}
              <strong>Vertical</strong> (<code>&lt;DinouCacheSlot&gt;</code>), and{" "}
              <strong>Horizontal</strong> (<code>layout_functions.ts</code>)—which can be combined freely on the same route.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview: The 3 Orthogonal Axes</h2>
              <p>
                Traditional web frameworks treat a URL route as a single monolithic unit: either the entire page is static, or a single dynamic query forces the entire tree (layouts, sibling widgets, and page body) to re-render on every request. Dinou replaces that limitation with three orthogonal segmentation layers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-6 min-w-0">
                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Zap className="h-5 w-5" />
                      <span>1. Temporal (PPR)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Splits a single HTTP response across time: serves the pre-rendered static shell immediately while streaming dynamic <code>&lt;Suspense&gt;</code> holes in parallel.
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
                    Isolates individual Server Component subtrees inside a page with their own server cache TTL, tags, and in-place client refresh (<code>refreshSlot</code>).
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Split className="h-5 w-5" />
                      <span>3. Horizontal (Layouts)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Decouples nested layouts from child pages via <code>layout_functions.ts</code>, giving each layout its own independent cache lifecycle and surgical revalidation.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. Partial Prerendering (PPR) */}
            <section
              id="partial-prerendering"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  1. Temporal Axis: Partial Prerendering (PPR)
                </h3>
              </div>
              <p className="mt-4">
                <strong>Partial Prerendering (PPR)</strong> resolves the dilemma between static and dynamic rendering across the <strong>temporal axis</strong>. Instead of forcing an entire page to be 100% static or 100% dynamic, PPR delivers a{" "}
                <strong>pre-rendered static shell</strong> instantly from Dinou&apos;s cache, while streaming{" "}
                <strong>dynamic holes</strong> in parallel over the same HTTP response.
              </p>

              {/* 1.1 Architecture */}
              <section id="ppr-architecture" className="mt-6 scroll-mt-20">
                <h4>1.1. Hybrid Architecture: Static Shell + Dynamic Holes</h4>
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
                      <strong>Instant TTFB (~2.42ms):</strong> The browser receives
                      the cached static shell with skeleton fallbacks. Visual layout is
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

                {/* Comparison: Pure SSG vs PPR (Data Freshness) */}
                <div className="space-y-4 my-6 not-prose">
                  <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    Data Freshness: Pure SSG vs. Partial Prerendering
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In standard Static Site Generation (without PPR), all server components and database queries execute <strong>exclusively at build time</strong>. The resulting HTML is immutable:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                    <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0">
                      <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                        <Timer className="h-4 w-4 text-amber-500" />
                        <span>Without PPR (Frozen Build Data)</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Data is baked into the build artifact. Live inventory, user carts, or real-time counters are <strong>stale upon deployment</strong>. Historically, applications resorted to legacy client-side <code>useEffect()</code> + <code>fetch()</code> anti-patterns, suffering network waterfalls, layout shifts, and flickering spinners.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4 bg-purple-500/5 space-y-2 border-purple-500/20 min-w-0">
                      <div className="flex items-center gap-2 font-semibold text-xs text-purple-600 dark:text-purple-400">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span>With PPR (Request-Time Fresh Data)</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        The visual shell is delivered immediately from Dinou&apos;s cache, while the component inside <code>&lt;Suspense&gt;</code> executes on the server on <strong>every single incoming HTTP request</strong>. You get 100% fresh, live database data streamed directly to the browser without client waterfalls or legacy <code>useEffect</code> fetching.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PPR as a Bailout Containment Boundary */}
                <div className="space-y-4 my-6 not-prose">
                  <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    PPR as a Bailout Boundary: Containing Dynamic De-optimization
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Without PPR, dynamic data access is infectious. If a single nested component reads request cookies or headers, Dinou triggers an <strong>Automatic Static Bailout for the entire page</strong>, disabling static pre-rendering for the whole route.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    With PPR enabled (<code>ppr: true</code>), React <code>&lt;Suspense&gt;</code> acts as an <strong>isolated sandbox</strong>. Dynamic data consumption inside the boundary does not escape to parent or sibling components:
                  </p>

                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full overflow-hidden rounded-lg text-xs"
                  >
{`// src/store/page.tsx
import { Suspense } from "react";
import { getContext } from "dinou";
import db from "@/lib/db";
import { ProductGallery } from "@/components/gallery";
import { CartBadgeSkeleton } from "@/components/skeletons";

// ⚠️ Dynamic component: reads request-specific session cookie
async function LiveCartBadge() {
  const context = getContext();
  const sessionToken = context?.req.cookies["session_id"];
  const cart = await db.carts.findActive(sessionToken);

  return <div className="cart-badge">Items: {cart?.itemCount ?? 0}</div>;
}

export default function StorePage() {
  return (
    <main className="container">
      {/* 1. Static Shell: Pre-rendered during build */}
      <header className="navbar">
        <h1>Flagship Store</h1>
        
        {/* 2. PPR Boundary: Isolates cookie bailout exclusively to this hole */}
        <Suspense fallback={<CartBadgeSkeleton />}>
          <LiveCartBadge />
        </Suspense>
      </header>

      {/* 3. Static Sibling: Remains 100% static and cached */}
      <ProductGallery />
    </main>
  );
}`}
                  </CodeBlock>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs min-w-0">
                    <div className="p-3.5 rounded-md bg-amber-500/10 border border-amber-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-amber-700 dark:text-amber-300">
                        ❌ Without PPR: Full-Page Bailout
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Reading <code>cookies[&quot;session_id&quot;]</code> triggers an uncontained bailout. The <strong>entire page</strong> (navbar, product gallery, layout) turns into dynamic SSR. The static shell cache is bypassed, and the browser waits until the database query completes.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                        ✅ With PPR: Isolated Hole Bailout
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        The cookie bailout is <strong>quarantined inside <code>&lt;Suspense&gt;</code></strong>. The navbar and product gallery are delivered immediately from the static shell cache. Only the cart badge executes on the server and streams into place.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 1.2 Activation */}
              <section id="ppr-activation" className="mt-8 scroll-mt-20">
                <h4>1.2. Enabling PPR &amp; Specificity Hierarchy</h4>
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
                        <span>4. <strong>dinou.config.js</strong> (Global Application)</span>
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
                      1. Global Configuration (dinou.config.js / .ts)
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
{`// dinou.config.js
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
      {/* 1. Static Shell: pre-rendered at build time and served from cache */}
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

            {/* 2. Micro-ISR */}
            <section id="micro-isr" className="mt-12 pt-8 border-t scroll-mt-20">
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  2. Vertical Axis: Micro-ISR (<code>&lt;DinouCacheSlot&gt;</code>)
                </h3>
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Exclusive to Dinou
                </span>
              </div>
              <p className="mt-4">
                When a dynamic page contains an expensive database widget, developers in traditional frameworks are often forced into an architectural trap: converting the widget to a Client Component with client-side cache libraries (SWR, TanStack Query), introducing bundle bloat, waterfall requests, and layout shifts.
              </p>
              <p>
                Dinou introduces <strong>Vertical Segmentation</strong> with{" "}
                <code>&lt;DinouCacheSlot&gt;</code> from <code>&quot;dinou/server&quot;</code> (or <code>&quot;dinou&quot;</code>). It keeps components securely on the server as React Server Components (RSC) while caching their rendered serialized Flight payload in server storage with dedicated TTLs and invalidation tags.
              </p>

              {/* 2.1 Slot Caching */}
              <section id="slot-caching" className="mt-6 scroll-mt-20">
                <h4>2.1. Component Caching: Dynamic vs. Static Patterns</h4>
                <p>
                  A frequent question is: <em>Is <code>&lt;DinouCacheSlot&gt;</code> meant for dynamic or static pages?</em> The answer is that it functions as a <strong>universal caching primitive</strong> across both dynamic and static/ISR routes:
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
                      A product catalog page has a slow 24-hour page revalidation (<code>revalidate: 86400</code>). Inside it, a real-time inventory badge or flash sale counter uses <code>&lt;DinouCacheSlot revalidate=&#123;60&#125;&gt;</code>. The heavy outer page remains cached for 24h, while the volatile widget updates independently.
                    </p>
                  </div>
                </div>

                {/* Pattern 1 Implementation */}
                <div className="space-y-3 my-6">
                  <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Implementation Pattern 1: Dynamic SSR Dashboard with Cached Slot
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The route runs in Live SSR mode (evaluating user cookies and personal widgets live). The heavy analytics calculation is cached on the server for 300 seconds and wrapped in React <code>&lt;Suspense&gt;</code> to prevent cold-start cache misses from delaying TTFB:
                  </p>
                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full overflow-hidden rounded-lg my-2"
                  >
{`// src/dashboard/page.tsx
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { FastUserProfile, SlowAnalyticsWidget } from "./widgets";
import { AnalyticsSkeleton } from "./skeletons";

export default function DashboardPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* 1. Dynamic Component: Evaluated live on every request (reads session/cookies) */}
      <FastUserProfile />

      {/* 2. Micro-ISR Slot: Cached on the server for 300 seconds */}
      {/* ⚠️ Wrapped in <Suspense> so cache misses stream without blocking TTFB */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <DinouCacheSlot id="analytics-widget" tag="analytics" revalidate={300}>
          <SlowAnalyticsWidget />
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
                    Implementation Pattern 2: Static / ISR Product Page with Asymmetric Slot
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The parent route has a slow revalidation of 24 hours (<code>revalidate: 86400</code>). Inside it, a volatile inventory counter revalidates vertically every 60 seconds (<code>revalidate=&#123;60&#125;</code>) or on-demand when purchases occur:
                  </p>
                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full overflow-hidden rounded-lg my-2"
                  >
{`// src/products/[slug]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

export type ProductParams = RouteParams<"/products/[slug]">;

// 1. Slow revalidation for outer page & descriptions (24 hours = 86,400s)
export const revalidate: PageFunctions["revalidate"] = 86400;

// src/products/[slug]/page.tsx
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import type { PageProps } from "dinou";
import { ProductHero, ProductDescription } from "./static-widgets";
import { LiveStockCounter, StockSkeleton } from "./stock-widgets";

export default function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <main className="container py-8 space-y-6">
      {/* 1. Heavy Static Content: Cached for 24 hours */}
      <ProductHero slug={params.slug} />
      <ProductDescription slug={params.slug} />

      {/* 2. Asymmetric Micro-ISR Slot: Revalidates vertically every 60s */}
      <Suspense fallback={<StockSkeleton />}>
        <DinouCacheSlot 
          id={\`stock-\${params.slug}\`} 
          tag={\`stock-\${params.slug}\`} 
          revalidate={60}
        >
          <LiveStockCounter slug={params.slug} />
        </DinouCacheSlot>
      </Suspense>
    </main>
  );
}`}
                  </CodeBlock>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Is <code>&lt;Suspense&gt;</code> mandatory in Pattern 2?</strong> In pure SSG/ISR, wrapping the slot in <code>&lt;Suspense&gt;</code> is <strong>optional</strong> because the page is pre-rendered at build time (or during background revalidation). However, wrapping it in <code>&lt;Suspense&gt;</code> is considered a best practice because: (1) if an uncached path is generated on demand via <strong>ISG</strong>, it prevents slow database queries from blocking TTFB for the first visitor; (2) it provides a loading state during client-side <code>refreshSlot()</code> transitions; and (3) it ensures seamless compatibility if the route enables <strong>PPR</strong>.
                  </p>
                </div>

                <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>Boundary Placement: Why <code>&lt;Suspense&gt;</code> Must Wrap <code>&lt;DinouCacheSlot&gt;</code></span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A common architectural question is: <em>Can <code>&lt;Suspense&gt;</code> live inside the child component (e.g. inside <code>&lt;SlowAnalyticsWidget&gt;</code>) instead of wrapping <code>&lt;DinouCacheSlot&gt;</code>?</em>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                    <div className="p-3.5 rounded-md bg-amber-500/10 border border-amber-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-amber-700 dark:text-amber-300">
                        ❌ Suspense Inside Child: TTFB is Blocked
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        <code>&lt;DinouCacheSlot&gt;</code> is itself an <strong>async Server Component</strong> (<code>async function DinouCacheSlot</code>). When it awaits storage or renders on a cache miss, React encounters a pending promise in the parent page tree. Without an outer <code>&lt;Suspense&gt;</code>, suspension bubbles to the root, <strong>blocking the entire HTTP response</strong> and delaying fast sibling components like <code>&lt;FastUserProfile&gt;</code>.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                        ✅ Suspense Wrapping Slot: Instant Streaming
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        The outer <code>&lt;Suspense&gt;</code> captures the async execution of <code>&lt;DinouCacheSlot&gt;</code>. The shell and user profile flush to the browser immediately with the skeleton fallback. On a cache hit (~2ms), the slot resolves immediately; on a cache miss, it computes in the background and streams into place.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border/60 pt-3 text-xs space-y-1.5">
                    <p className="font-semibold text-foreground">
                      The Rule of Hierarchy:
                    </p>
                    <div className="p-2.5 rounded bg-background/80 border font-mono text-[11px] text-muted-foreground space-y-1">
                      <div>1. <span className="text-purple-600 dark:text-purple-400">&lt;Suspense fallback=&#123;&lt;Skeleton /&gt;&#125;&gt;</span> <span className="text-foreground">→ Controls browser streaming &amp; instant visual layout</span></div>
                      <div className="pl-4">2. <span className="text-emerald-600 dark:text-emerald-400">&lt;DinouCacheSlot revalidate=&#123;300&#125;&gt;</span> <span className="text-foreground">→ Controls server cache storage, TTL &amp; tags</span></div>
                      <div className="pl-8">3. <span className="text-blue-600 dark:text-blue-400">&lt;SlowAnalyticsWidget /&gt;</span> <span className="text-foreground">→ Executes database queries &amp; business logic</span></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2.2 Interactive Revalidation & Invalidation */}
              <section id="slot-invalidation" className="mt-8 scroll-mt-20">
                <h4>2.2. Interactive Revalidation &amp; On-Demand Purging</h4>
                <p>
                  Dinou provides two specialized mechanisms to refresh or purge <code>&lt;DinouCacheSlot&gt;</code> instances without re-rendering the surrounding page:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border min-w-0">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <RefreshCw className="h-4 w-4 text-emerald-500" />
                      Client-Side In-Place Refresh (<code>refreshSlot</code>)
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Any interactive Client Component can trigger a surgical re-render of only that slot without a full page reload or state loss. You can invoke either the standalone <code>refreshSlot()</code> function or <code>router.refreshSlot()</code> from <code>useRouter()</code>:
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
      {/* Option 1: Standalone (respects server slot TTL / tags) */}
      <button onClick={() => refreshSlot("analytics-widget")}>
        Refresh Metrics
      </button>

      {/* Option 2: Force fresh (bypasses server slot TTL immediately) */}
      <button onClick={() => router.refreshSlot("analytics-widget", { fresh: true })}>
        Force Fresh
      </button>
    </div>
  );
}`}
                    </CodeBlock>
                    <div className="text-[11px] text-muted-foreground bg-background/60 p-2.5 rounded border border-border/60 space-y-1.5 mt-2 break-words min-w-0">
                      <div className="font-semibold text-foreground">Why does <code>fresh: true</code> exist if it is already called <code>refreshSlot</code>?</div>
                      <div>• <strong><code>refreshSlot(id)</code> (Default)</strong>: Refreshes the client DOM with the server&apos;s current state. If the slot&apos;s server-side TTL (e.g. <code>revalidate=&#123;300&#125;</code>) has not expired, it returns the cached server JSX without touching your database (protecting against button spam and traffic spikes).</div>
                      <div>• <strong><code>refreshSlot(id, &#123; fresh: true &#125;)</code> (Bypass)</strong>: Hard revalidation. Forces the server to ignore any unexpired TTL, immediately re-run the server component&apos;s queries/computations against your database, and update both the cache and client.</div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 space-y-2 border-border flex flex-col justify-between min-w-0">
                    <div className="min-w-0">
                      <div className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                        <Database className="h-4 w-4 text-purple-500" />
                        Server-Side Tag Invalidation (<code>revalidateTag</code>)
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Mutations purge slots globally via <code>revalidateTag()</code> on the server, while the client immediately pulls the fresh result via <code>refreshSlot()</code>:
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
{`// src/app/feed/actions.ts
"use server";
import { revalidateTag } from "dinou";

export async function publishPost(formData: FormData) {
  const content = formData.get("content") as string;
  await db.posts.insert({ content, createdAt: new Date() });

  // 1. Purges cache globally for ALL future visitors
  await revalidateTag("feed");
}`}
                          </CodeBlock>
                        </TabsContent>

                        <TabsContent value="client" className="mt-0 min-w-0">
                          <CodeBlock
                            language="tsx"
                            containerClassName="w-full overflow-hidden rounded-lg text-xs"
                          >
{`// src/app/feed/post-creator.tsx
"use client";
import { refreshSlot } from "dinou";
import { publishPost } from "./actions";

export function PostCreator() {
  const handleSubmit = async (formData: FormData) => {
    // 1. Mutate & purge cache on server
    await publishPost(formData);

    // 2. Surgically re-render feed in local DOM
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
                      <div>• <strong><code>revalidateTag(&quot;feed&quot;)</code></strong>: Evicts and purges the server cache globally for <em>all future users</em>.</div>
                      <div>• <strong><code>refreshSlot(&quot;feed-widget&quot;)</code></strong>: Pulls the fresh JSX immediately into the <em>current user&apos;s screen</em> without needing <code>&#123; fresh: true &#125;</code> (since the cache is already purged).</div>
                    </div>
                  </div>
                </div>

                {/* Deep Dive Callout Box */}
                <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Deep Dive: How Revalidation Works in <code>refreshSlot()</code> vs. Route-Level SWR</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A key architectural question when adopting Micro-ISR is: <em>When a slot&apos;s TTL expires, does <code>refreshSlot()</code> serve stale cache first and revalidate in the background (like traditional SWR)? And does the user see a jarring skeleton flash?</em>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs min-w-0">
                    <div className="p-3.5 rounded-md bg-blue-500/10 border border-blue-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5" />
                        <span>1. Page Navigation: Stale-While-Revalidate (SWR)</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        During initial SSR or SPA page navigation, <code>&lt;DinouCacheSlot&gt;</code> prioritizes <strong>instant TTFB</strong>. If a slot&apos;s TTL has expired, the server serves the stale cache immediately and triggers an asynchronous background revalidation so subsequent visitors receive fresh content.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>2. Interactive refreshSlot: Synchronous Fresh Delivery</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When a user explicitly clicks a refresh button, SWR would deliver a confusing UX (showing old data again). Therefore, Dinou&apos;s granular slot refresh <strong>awaits the server component execution</strong>, writes the updated result to cache, and returns the fresh RSC payload in that single HTTP response.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-2 text-xs">
                    <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Zero Skeleton Flash (React startTransition + Stale-Preserving Fallback)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      While the server re-renders the expired slot, <strong>the user does NOT see a blank skeleton flash or layout shift</strong>. Dinou&apos;s internal client boundary (<code>DinouCacheSlotBoundary</code>) wraps slot updates in <code>React.startTransition</code> and sets <code>fallback: children</code> (the previous DOM content). The existing widget stays interactive and visible until the new server stream arrives, then swaps seamlessly.
                    </p>
                  </div>

                  <div className="border-t border-border/60 pt-3 text-xs space-y-2">
                    <p className="font-semibold text-foreground">
                      Client-Side Pending State Pattern:
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      If you want your button or UI to show an inline spinner or disabled state while <code>refreshSlot()</code> resolves the fresh server data, wrap the call in React&apos;s standard <code>useTransition()</code> hook:
                    </p>
                    <CodeBlock
                      language="tsx"
                      containerClassName="w-full overflow-hidden rounded-lg text-xs"
                    >
{`"use client";
import { useTransition } from "react";
import { refreshSlot } from "dinou";

export function RefreshAnalyticsButton() {
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      // Server awaits execution on expired TTL; UI keeps current widget visible
      refreshSlot("analytics-widget");
    });
  };

  return (
    <button onClick={handleRefresh} disabled={isPending} className="flex items-center gap-2">
      {isPending ? "Refreshing Metrics..." : "Refresh Metrics"}
    </button>
  );
}`}
                    </CodeBlock>
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
                        1. 100% Static Pages (SSG)
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        If an entire route is pre-rendered at build time with no revalidation, it is already cached as immutable HTML. Slots add zero benefit.
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
                        3. Private User Data
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        Never wrap private user data (such as a specific user&apos;s cart or auth session) with a shared static slot ID. This would cache user A&apos;s private data and serve it to user B.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            {/* 3. Horizontal Axis: Layout Isolation */}
            <section
              id="horizontal-segmentation"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  3. Horizontal Axis: Layout Isolation (<code>layout_functions.ts</code>)
                </h3>
              </div>
              <p className="mt-4">
                Along the <strong>horizontal axis</strong>, Dinou decouples the caching and data-fetching lifecycle of every nested <code>layout.tsx</code> from its child <code>page.tsx</code> via companion <code>layout_functions.ts</code> files.
              </p>
              <p>
                A parent layout (such as a root navigation shell or workspace sidebar) can cache its data for 1 hour (<code>revalidate = 3600</code>), while a child page revalidates every 10 seconds (<code>revalidate = 10</code>) or renders dynamically on every request (<code>revalidate = 0</code>). When the child page re-renders or when the user navigates between sibling routes, the cached parent layout is reused in ~1.20ms with <strong>zero redundant layout database queries</strong>, and surgical layout updates via <code>revalidateLayout()</code> re-compose lazily without hydration mismatches.
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`// src/dashboard/layout_functions.ts
// Parent layout caches independently for 1 hour (3,600s)
export const revalidate = 3600;

export async function getProps() {
  const workspaceNav = await db.workspaces.getNavigationTree();
  return { layout: { workspaceNav } };
}`}
              </CodeBlock>
            </section>

            {/* 4. High-Traffic Synergy: PPR + DinouCacheSlot */}
            <section
              id="ppr-slot-synergy"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  4. High-Traffic Synergy: PPR + <code>&lt;DinouCacheSlot&gt;</code>
                </h3>
                <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  Maximum Concurrency
                </span>
              </div>
              <p className="mt-4">
                What happens when you nest <code>&lt;DinouCacheSlot&gt;</code> inside a React{" "}
                <code>&lt;Suspense&gt;</code> boundary on a route with{" "}
                <strong>Partial Prerendering (PPR)</strong>? You combine Temporal and Vertical segmentation to achieve <strong>instant static shell delivery (~2.42ms TTFB) paired with ~2ms cached hole resolution and 99.9% database query offloading</strong>.
              </p>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                <div className="border rounded-lg p-4 bg-card border-border space-y-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-amber-500" />
                      PPR Alone (Uncached Dynamic Hole)
                    </span>
                    <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-500/30">
                      Query Per Request
                    </Badge>
                  </div>
                  <ul className="text-muted-foreground space-y-1.5 pl-4 list-disc leading-relaxed">
                    <li><strong>TTFB:</strong> Instant cached static shell.</li>
                    <li><strong>Hole Resolution:</strong> The user waits the full database query time (e.g. 1,500ms) on <em>every single request</em> while the server executes the query.</li>
                    <li><strong>Database Pressure:</strong> 10,000 visitors/min = <strong>10,000 live database queries</strong>.</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 bg-indigo-500/5 border-indigo-500/20 space-y-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-indigo-500" />
                      PPR + &lt;DinouCacheSlot&gt; (Cached Streamed Hole)
                    </span>
                    <Badge variant="outline" className="text-[10px] text-indigo-600 dark:text-indigo-400 border-indigo-500/40">
                      Cached Streamed Hole
                    </Badge>
                  </div>
                  <ul className="text-muted-foreground space-y-1.5 pl-4 list-disc leading-relaxed">
                    <li><strong>TTFB:</strong> Instant cached static shell.</li>
                    <li><strong>Hole Resolution:</strong> Resolves from server cache in <strong>~2ms</strong> (the user barely perceives the skeleton fallback).</li>
                    <li><strong>Database Pressure:</strong> 10,000 visitors/min = <strong>1 database query</strong> per 300s TTL (99.9% database offload).</li>
                  </ul>
                </div>
              </div>

              {/* Implementation Example */}
              <div className="space-y-3 my-6">
                <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  Implementation Pattern: High-Traffic Telemetry Dashboard
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The page shell is pre-rendered at build time with PPR enabled (<code>ppr: true</code>). The dynamic metrics calculation is wrapped in <code>&lt;DinouCacheSlot&gt;</code> inside React <code>&lt;Suspense&gt;</code>:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-2"
                >
{`// src/telemetry/page_functions.ts
import type { PageFunctions } from "dinou";

// Enable Partial Prerendering on this high-traffic route
export const ppr: PageFunctions["ppr"] = true;

// src/telemetry/page.tsx
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { TelemetryHeader, TelemetryFooter } from "./static-shell";
import { HeavyMetricsGraph, GraphSkeleton } from "./graph-widgets";

export default function TelemetryPage() {
  return (
    <main className="container py-8 space-y-6">
      {/* 1. Static Shell: Delivered immediately from Dinou's cache */}
      <TelemetryHeader />

      {/* 2. PPR Dynamic Hole + Micro-ISR Slot:
             - Fallback skeleton sent immediately in initial layout
             - Hole streams from server cache in ~2ms for subsequent visitors
             - Database query runs only ONCE every 60 seconds */}
      <Suspense fallback={<GraphSkeleton />}>
        <DinouCacheSlot id="operations-telemetry" tag="telemetry" revalidate={60}>
          <HeavyMetricsGraph />
        </DinouCacheSlot>
      </Suspense>

      <TelemetryFooter />
    </main>
  );
}`}
                </CodeBlock>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs not-prose min-w-0">
                <div className="p-3.5 rounded-lg border bg-card space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-foreground">
                    <Zap className="h-4 w-4 text-amber-500" />
                    ~2.42ms Shell TTFB
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Outer shell and fallback skeleton arrive immediately from Dinou&apos;s cache.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border bg-card space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-foreground">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    ~2ms Hole Delivery
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Subsequent visitors receive the precalculated RSC Flight stream almost instantly.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border bg-card space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-foreground">
                    <TrendingDown className="h-4 w-4 text-emerald-500" />
                    99.9% Query Relief
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    High concurrency surges no longer overwhelm primary databases with duplicate queries.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Layered Segmentation Matrix */}
            <section
              id="comparison-matrix"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                5. Layered Segmentation Matrix
              </h3>
              <p>
                Summary of the layered segmentation strategies across the Temporal, Vertical, and Horizontal axes:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Axis / Strategy</th>
                      <th className="p-4">How to Configure</th>
                      <th className="p-4">TTFB</th>
                      <th className="p-4">Freshness</th>
                      <th className="p-4">Database Load</th>
                      <th className="p-4">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Temporal: PPR</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr = true + &lt;Suspense&gt;</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (Cached Shell)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">100% Real-time (Holes)</td>
                      <td className="p-4 text-xs text-rose-600 dark:text-rose-400 font-medium">100% Hole queries per request</td>
                      <td className="p-4 text-xs text-muted-foreground">E-commerce, dashboards with static shells &amp; live user holes</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Vertical: Micro-ISR (Static/ISR Route)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">&lt;DinouCacheSlot&gt; in Static/ISR page</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.45ms (Cached Route)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Decoupled Slot TTL / Tags</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Low: Isolated to expired slots</td>
                      <td className="p-4 text-xs text-muted-foreground">Catalog pages with volatile stock/price widgets</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Vertical: Micro-ISR (Dynamic SSR Route)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">&lt;DinouCacheSlot&gt; in Dynamic SSR page</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Fast (Streamed / Slot-cached)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Component TTL / Tags</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Low: Isolated to expired slots</td>
                      <td className="p-4 text-xs text-muted-foreground">Dynamic user dashboards with heavy SQL widgets</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Horizontal: Layout Isolation</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">layout_functions.ts (revalidate = N)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.20ms (0 Layout Re-fetches)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Independent Layout TTL</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0 layout queries on child navigation</td>
                      <td className="p-4 text-xs text-muted-foreground">Persistent workspace shells, multi-level navigation</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Synergy: PPR + Micro-ISR (+ Layouts)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr: true + &lt;DinouCacheSlot&gt; + layout_functions</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~2.42ms (Shell) + ~2ms (Hole)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">3D Orthogonal TTLs</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Near-Zero: 1 query per slot/layout TTL</td>
                      <td className="p-4 text-xs text-muted-foreground">High-concurrency e-commerce, telemetry dashboards</td>
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

