"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Database,
  Server,
  RefreshCw,
  Zap,
  Info,
  Globe,
  Cpu,
  ArrowRightLeft,
  Sparkles,
  Layers,
  Split,
  Timer,
  CheckCircle2,
  Table,
  XCircle,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview: Multi-Dimensional Data Fetching",
    level: 2,
  },
  {
    id: "server-components",
    title: "1. Server Components (Direct Async Fetching)",
    level: 2,
  },
  {
    id: "page-layout-functions",
    title: "2. Page & Layout Functions (getProps)",
    level: 2,
  },
  {
    id: "getprops-contract",
    title: "2.1. Direct Props Return Contract",
    level: 3,
  },
  {
    id: "horizontal-data-split",
    title: "2.2. Page vs Layout Segmentation",
    level: 3,
  },
  {
    id: "partial-prerendering",
    title: "3. Partial Prerendering (PPR) Data Fetching",
    level: 2,
  },
  {
    id: "ppr-how-it-works",
    title: "3.1. Static Shell + Dynamic Holes",
    level: 3,
  },
  {
    id: "ppr-example",
    title: "3.2. PPR Implementation Example",
    level: 3,
  },
  {
    id: "dinou-cache-slot",
    title: "4. Vertical Segmentation: <DinouCacheSlot> (Micro-ISR)",
    level: 2,
  },
  {
    id: "cache-slot-props",
    title: "4.1. Granular Component Caching & Tags",
    level: 3,
  },
  {
    id: "refresh-slot-client",
    title: "4.2. Client-Side Targeted Invalidation (refreshSlot)",
    level: 3,
  },
  {
    id: "server-functions-streaming",
    title: "5. Reactive Fetching with Server Functions & React 19",
    level: 2,
  },
  {
    id: "react-19-use-hook",
    title: "5.1. Client Components with Native use()",
    level: 3,
  },
  {
    id: "strategy-comparison",
    title: "6. Data Fetching Strategies Decision Matrix",
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
                Data Fetching
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou v7 features a unified, multi-dimensional data fetching
              architecture. Fetch data at build time, synchronously in Server
              Components, progressively with Partial Prerendering (PPR), or
              granularly with component-level Micro-ISR (<code>&lt;DinouCacheSlot&gt;</code>).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview: Multi-Dimensional Data Fetching</h2>
              <p>
                In modern fullstack applications, no single data fetching strategy
                fits all requirements. Dinou provides four complementary paradigms:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Server className="h-5 w-5" />
                      <span>Direct Async Server Components</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Async components fetch data directly using standard Node.js
                    APIs, ORMs, and database drivers right where it is needed.
                  </CardContent>
                </Card>

                <Card className="border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                      <Split className="h-5 w-5" />
                      <span>Horizontal Segmentation (getProps)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <code>page_functions.ts</code> and <code>layout_functions.ts</code>{" "}
                    pre-fetch data based on route parameters for SSG, ISR, and
                    layout shells.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Zap className="h-5 w-5" />
                      <span>Partial Prerendering (PPR)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Pre-renders static shells instantly while streaming dynamic
                    Suspense holes over the exact same HTTP response stream.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Layers className="h-5 w-5" />
                      <span>Vertical Segmentation (&lt;DinouCacheSlot&gt;)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Micro-ISR caching at the component subtree level. Independent
                    TTL and on-demand cache tag purges without re-rendering the
                    parent page.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. Server Components */}
            <section
              id="server-components"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                1. Server Components (Direct Async Fetching)
              </h3>
              <p>
                In Dinou, every component inside the <code>src/</code> directory is
                a <strong>Server Component</strong> by default. You can define
                components as <code>async</code> functions and fetch data directly
                with zero client-side JavaScript cost:
              </p>

              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/blog/page.tsx
import db from "@/lib/db";

export default async function BlogPage() {
  // Direct ORM or database query executed exclusively on the server
  const posts = await db.posts.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Latest Articles</h1>
      <ul className="divide-y divide-border">
        {posts.map((post) => (
          <li key={post.id} className="py-3">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
              </CodeBlock>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                {/* Pros */}
                <Card className="border-green-500/20 bg-green-50/30 dark:bg-green-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Pros (Advantages)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
                      <li>
                        <strong>Zero Bundle Size:</strong> Database clients (Prisma, Drizzle, etc.) and secret API keys stay strictly on the server.
                      </li>
                      <li>
                        <strong>Colocated Low Latency:</strong> Queries execute in the local network/datacenter right next to your database.
                      </li>
                      <li>
                        <strong>Simple Mental Model:</strong> No client-side <code>useEffect</code>, <code>isLoading</code> flags, or manual state management.
                      </li>
                      <li>
                        <strong>SEO by Default:</strong> Rendered HTML contains all data immediately upon delivery.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Cons / Trade-offs */}
                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                      <XCircle className="h-5 w-5" />
                      <span>Cons &amp; Trade-offs</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
                      <li>
                        <strong>Blocks Initial TTFB (Without Suspense):</strong> An un-Suspended top-level <code>await</code> delays the entire HTML response until the slowest query resolves.
                      </li>
                      <li>
                        <strong>Waterfall Risk:</strong> Sequential <code>await</code> calls in nested parent-child Server Components compound latency unless parallelized.
                      </li>
                      <li>
                        <strong>No Client Interactivity:</strong> Cannot attach event listeners (<code>onClick</code>), browser state (<code>useState</code>), or DOM effects.
                      </li>
                      <li>
                        <strong>Database Load on Every Request:</strong> In dynamic SSR routes, every navigation hits the database unless cached via <code>&lt;DinouCacheSlot&gt;</code> or ISR.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert className="not-prose my-4">
                <Info className="h-4 w-4" />
                <AlertTitle>How Dinou Mitigates These Trade-offs</AlertTitle>
                <AlertDescription className="space-y-1 text-sm">
                  <p>
                    • Use <strong>React 19 <code>&lt;Suspense&gt;</code></strong> or <strong>PPR</strong> to prevent TTFB blocking and stream slow queries progressively.
                  </p>
                  <p>
                    • Use <strong><code>&lt;DinouCacheSlot&gt;</code></strong> to cache expensive queries at the component level with Micro-ISR, protecting your database from repeated traffic.
                  </p>
                  <p>
                    • Pass fetched data down as props to interactive Client Components (<code>&quot;use client&quot;</code>) at the leaves of the tree.
                  </p>
                </AlertDescription>
              </Alert>
            </section>

            {/* 2. Page & Layout Functions */}
            <section
              id="page-layout-functions"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                2. Page &amp; Layout Functions (<code>getProps</code>)
              </h3>
              <p>
                For static generation (SSG), Incremental Static Generation (ISG),
                or segment-level pre-fetching, Dinou provides{" "}
                <code>getProps</code> inside <code>page_functions.ts</code> and{" "}
                <code>layout_functions.ts</code>.
              </p>

              {/* 2.1 Direct Props Return */}
              <section id="getprops-contract" className="mt-6 scroll-mt-20">
                <h4>2.1. Direct Props Return Contract</h4>
                <p>
                  In Dinou v7, <code>getProps</code> directly returns the props
                  object passed to the component (no legacy <code>page</code> or{" "}
                  <code>layout</code> wrappers):
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/products/[id]/page_functions.ts
export async function getProps(params: { id: string }) {
  const product = await db.products.findById(params.id);
  // Directly returns props for page.tsx
  return { product };
}

// src/products/[id]/page.tsx
export default function ProductPage({ product }: { product: Product }) {
  return <h1>{product.name} - \${product.price}</h1>;
}`}
                </CodeBlock>
              </section>

              {/* 2.2 Horizontal Segmentation */}
              <section id="horizontal-data-split" className="mt-8 scroll-mt-20">
                <h4>2.2. Page vs Layout Segmentation</h4>
                <p>
                  Thanks to 2D Horizontal Layered Segmentation, layouts fetch
                  their own data independently in <code>layout_functions.ts</code>.
                  This ensures that navigating between sub-pages does not re-fetch
                  layout data:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/shop/layout_functions.ts
export async function getProps() {
  const categories = await db.categories.findMany();
  // Directly returns props for layout.tsx
  return { categories };
}

// src/shop/layout.tsx
export default function ShopLayout({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: Category[];
}) {
  return (
    <div className="shop-grid">
      <ShopSidebar categories={categories} />
      <main>{children}</main>
    </div>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 3. Partial Prerendering (PPR) */}
            <section
              id="partial-prerendering"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  3. Partial Prerendering (PPR) Data Fetching
                </h3>
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  Dinou v7
                </span>
              </div>
              <p className="mt-4">
                Historically, data fetching forced a binary choice: either fetch
                at build time (static SSG, blazing fast TTFB, but stale data) or
                fetch on every request (dynamic SSR, fresh data, but high latency).
                <strong> Partial Prerendering (PPR)</strong> unifies both.
              </p>

              {/* 3.1 Static Shell + Dynamic Holes */}
              <section id="ppr-how-it-works" className="mt-6 scroll-mt-20">
                <h4>3.1. Static Shell + Dynamic Holes</h4>
                <p>
                  With PPR enabled, Dinou generates a static HTML shell for the
                  entire layout and page structure during the build. Static data
                  is baked in instantly. Dynamic data fetches wrapped in React{" "}
                  <code>&lt;Suspense&gt;</code> remain as &quot;holes&quot; that
                  stream their HTML payload over HTTP as soon as their asynchronous
                  promises resolve.
                </p>

                <div className="border rounded-lg p-4 bg-card not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    <span>How the HTTP Stream Flows</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>
                      <strong>0ms (Instant):</strong> The browser receives the
                      pre-rendered static shell (navigation, headers, sidebars,
                      skeleton placeholders).
                    </li>
                    <li>
                      <strong>Request Time:</strong> Node.js server executes
                      dynamic database queries inside <code>&lt;Suspense&gt;</code>.
                    </li>
                    <li>
                      <strong>Streaming:</strong> When the dynamic query resolves,
                      the server sends the replacement chunk down the open HTTP
                      connection, seamlessly swapping the skeleton.
                    </li>
                  </ol>
                </div>
              </section>

              {/* 3.2 PPR Example */}
              <section id="ppr-example" className="mt-8 scroll-mt-20">
                <h4>3.2. PPR Implementation Example</h4>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/store/page_functions.ts
// Enable PPR for this route segment
export const ppr = true;`}
                </CodeBlock>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg mt-4"
                >
{`// src/store/page.tsx
import { Suspense } from "react";
import db from "@/lib/db";

// 1. Static fetch: pre-rendered at build time into the shell
async function StaticProductCatalog() {
  const products = await db.products.findFeatured();
  return <ProductGrid products={products} />;
}

// 2. Dynamic fetch: executed on every request and streamed
async function LiveInventory({ productId }: { productId: string }) {
  const stock = await db.inventory.getRealtimeStock(productId);
  return <Badge status={stock > 0 ? "in-stock" : "out-of-stock"} count={stock} />;
}

export default function StorePage() {
  return (
    <div>
      <header className="p-6 border-b">
        <h1>Flagship Store</h1>
        <p>Instant static shell delivered immediately.</p>
      </header>

      {/* Static content rendered at build time */}
      <StaticProductCatalog />

      {/* Dynamic streaming hole */}
      <Suspense fallback={<div className="animate-pulse h-8 bg-muted rounded" />}>
        <LiveInventory productId="prod-99" />
      </Suspense>
    </div>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 4. DinouCacheSlot */}
            <section
              id="dinou-cache-slot"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  4. Vertical Segmentation: <code>&lt;DinouCacheSlot&gt;</code> (Micro-ISR)
                </h3>
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Exclusive to Dinou
                </span>
              </div>
              <p className="mt-4">
                While Page Functions handle page-level caching (Horizontal
                Segmentation), <strong><code>&lt;DinouCacheSlot&gt;</code></strong>{" "}
                introduces <strong>Vertical Segmentation</strong>. It isolates
                and caches specific component subtrees inside a page with their
                own TTL and cache tags, without forcing the parent page to
                re-render or re-run heavy queries.
              </p>

              {/* 4.1 Props & Usage */}
              <section id="cache-slot-props" className="mt-6 scroll-mt-20">
                <h4>4.1. Granular Component Caching &amp; Tags</h4>
                <p>
                  Import <code>DinouCacheSlot</code> from <code>&quot;dinou/server&quot;</code>:
                </p>

                <div className="border rounded-lg p-4 bg-card not-prose my-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Layers className="h-5 w-5 text-emerald-500" />
                    <span>DinouCacheSlotProps</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>
                      <code>id</code>: Unique slot identifier (e.g. <code>&quot;trending-posts&quot;</code>).
                    </li>
                    <li>
                      <code>revalidate</code>: Cache expiration duration in{" "}
                      <strong>seconds (s)</strong> for this component alone.
                    </li>
                    <li>
                      <code>tag</code> / <code>tags</code>: Cache tag(s) for
                      targeted invalidation via <code>revalidateTag(tag)</code>.
                    </li>
                  </ul>
                </div>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/dashboard/page.tsx
import { DinouCacheSlot } from "dinou/server";
import { HeavyAnalytics, FastProfile, RealtimeAlerts } from "./components";

export default function DashboardPage() {
  return (
    <div className="dashboard-grid">
      {/* 1. Fast profile: evaluated dynamically without cache */}
      <FastProfile />

      {/* 2. Heavy analytics: cached for 300 seconds (Micro-ISR) */}
      <DinouCacheSlot id="analytics-slot" tag="analytics" revalidate={300}>
        <HeavyAnalytics />
      </DinouCacheSlot>

      {/* 3. Realtime alerts: always dynamic */}
      <RealtimeAlerts />
    </div>
  );
}`}
                </CodeBlock>
              </section>

              {/* 4.2 Client Targeted Invalidation */}
              <section id="refresh-slot-client" className="mt-8 scroll-mt-20">
                <h4>4.2. Client-Side Targeted Invalidation (<code>refreshSlot</code>)</h4>
                <p>
                  When data changes on the client (or after a mutation), you can
                  re-fetch <strong>only that specific cache slot</strong> without
                  re-rendering the entire route or re-fetching sibling components:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/dashboard/refresh-button.tsx
"use client";

import { refreshSlot, useRouter } from "dinou";

export function RefreshAnalyticsButton() {
  const router = useRouter();

  const handleRefresh = () => {
    // Re-fetches only the "analytics-slot" subtree from the server!
    refreshSlot("analytics-slot", { fresh: true });
    
    // Or via router instance:
    // router.refreshSlot("analytics-slot");
  };

  return (
    <button onClick={handleRefresh} className="btn-secondary">
      Refresh Analytics Only
    </button>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 5. Server Functions & React 19 */}
            <section
              id="server-functions-streaming"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                5. Reactive Fetching with Server Functions &amp; React 19
              </h3>
              <p>
                When data fetching requires client reactivity, pagination, or
                dynamic search filters, pair Server Functions (<code>&quot;use server&quot;</code>)
                with React 19&apos;s native primitives.
              </p>

              {/* 5.1 Native use() */}
              <section id="react-19-use-hook" className="mt-6 scroll-mt-20">
                <h4>5.1. Client Components with Native <code>use()</code></h4>
                <p>
                  In React 19, Client Components unroll Flight RPC promises using
                  the native <code>use()</code> hook inside <code>&lt;Suspense&gt;</code>.
                  Key-driven invalidation guarantees smooth updates without full
                  page reloads:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/search-results.tsx
"use client";

import { use, Suspense } from "react";
import { searchCatalogAction } from "@/actions/search";

function ResultsList({ promise }: { promise: Promise<Product[]> }) {
  // Unrolls the Flight RPC promise directly
  const products = use(promise);
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

export function SearchCatalog({ query }: { query: string }) {
  // Generate the server promise directly
  const searchPromise = searchCatalogAction(query);

  return (
    <Suspense key={query} fallback={<p>Searching catalog...</p>}>
      <ResultsList promise={searchPromise} />
    </Suspense>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 6. Strategy Comparison */}
            <section
              id="strategy-comparison"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                6. Data Fetching Strategies Decision Matrix
              </h3>
              <p>
                Choose the optimal strategy based on data volatility, SEO, and
                performance needs:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Strategy</th>
                      <th className="p-4">Where It Runs</th>
                      <th className="p-4">TTFB</th>
                      <th className="p-4">Data Freshness</th>
                      <th className="p-4">Ideal Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold">Server Component Async</td>
                      <td className="p-4 text-xs font-mono">Server (SSR)</td>
                      <td className="p-4 text-xs">Dynamic</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">100% Real-time</td>
                      <td className="p-4 text-xs">Standard pages, personalized feeds, authenticated views</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">getProps (SSG / ISG)</td>
                      <td className="p-4 text-xs font-mono">Build / On-demand</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">Instant (Static)</td>
                      <td className="p-4 text-xs">Cached / Stale-while-revalidate</td>
                      <td className="p-4 text-xs">Documentation, marketing pages, blogs, catalog</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Partial Prerendering (PPR)</td>
                      <td className="p-4 text-xs font-mono">Hybrid (Build + Stream)</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">Instant (Shell)</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">100% Real-time (Holes)</td>
                      <td className="p-4 text-xs">E-commerce, dashboards with static shells and live data</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">&lt;DinouCacheSlot&gt;</td>
                      <td className="p-4 text-xs font-mono">Component Subtree</td>
                      <td className="p-4 text-xs">Fast (Slot-cached)</td>
                      <td className="p-4 text-xs">Per-component TTL</td>
                      <td className="p-4 text-xs">Heavy SQL queries, widget feeds, analytics cards</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Server Functions + use()</td>
                      <td className="p-4 text-xs font-mono">Client Flight RPC</td>
                      <td className="p-4 text-xs">On-demand</td>
                      <td className="p-4 text-xs text-emerald-500 font-medium">Interactive Real-time</td>
                      <td className="p-4 text-xs">Search filters, paginated tables, live modals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
