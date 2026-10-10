"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Database,
  Server,
  RefreshCw,
  Zap,
  Info,
  Globe,
  Cpu,
  Sparkles,
  Layers,
  Split,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  TrendingDown,
  Boxes,
  Lock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";
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
    id: "timing-ssg-ssr",
    title: "1.1. Static (SSG) vs Dynamic (SSR) Timing",
    level: 3,
  },
  {
    id: "parallel-fetching",
    title: "1.2. Parallel Fetching (Avoiding Waterfalls)",
    level: 3,
  },
  {
    id: "streaming-suspense",
    title: "1.3. Non-Blocking Streaming with <Suspense>",
    level: 3,
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
    id: "client-first-model",
    title: "2.3. The Client-First Model (getProps + Client Page)",
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
    title: "4.1. Granular Component Caching & Props",
    level: 3,
  },
  {
    id: "asymmetric-isr",
    title: "4.2. Asymmetric ISR (Static Page + Fast Slot)",
    level: 3,
  },
  {
    id: "refresh-slot-client",
    title: "4.3. Client-Side Targeted Invalidation (refreshSlot)",
    level: 3,
  },
  {
    id: "ppr-cache-slot-synergy",
    title: "5. High-Traffic Synergy: PPR + <DinouCacheSlot>",
    level: 2,
  },
  {
    id: "synergy-benchmarks",
    title: "5.1. 0ms Edge TTFB + 2ms Cached Hole",
    level: 3,
  },
  {
    id: "synergy-implementation",
    title: "5.2. Peak Performance Implementation",
    level: 3,
  },
  {
    id: "server-functions-streaming",
    title: "6. Reactive Fetching with Server Functions & React 19",
    level: 2,
  },
  {
    id: "react-19-use-hook",
    title: "6.1. Passing Promises to Client use()",
    level: 3,
  },
  {
    id: "server-functions-mutations",
    title: "6.2. User-Driven RPC Mutations vs Initial Mount",
    level: 3,
  },
  {
    id: "strategy-comparison",
    title: "7. Data Fetching & Rendering Strategies Master Matrix",
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
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                React 19 Data Layer
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Multi-Dimensional
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Data Fetching
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features a unified, multi-dimensional data fetching architecture. Fetch data at build time (SSG),
              directly in Server Components (async/await), horizontally via route functions (getProps),
              progressively with Partial Prerendering (PPR), or vertically at the component subtree level with Micro-ISR (&lt;DinouCacheSlot&gt;).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                Overview: Multi-Dimensional Data Fetching
              </h2>
              <p>
                In modern full-stack web applications, no single data fetching strategy fits all use cases.
                Dinou provides five decoupled, complementary paradigms that let you tailor execution timing,
                caching granularity, and latency to each component&apos;s exact requirements:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                      <Server className="h-4 w-4" />
                      <span>1. Direct Async RSC</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Components are <code>async</code> by default. Query databases, ORMs, and private microservices directly with <strong>0kb client JavaScript</strong>.
                  </CardContent>
                </Card>

                <Card className="border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 text-sm">
                      <Split className="h-4 w-4" />
                      <span>2. Horizontal (getProps)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    <code>page_functions.ts</code> and <code>layout_functions.ts</code> pre-fetch data per route segment. Supports SSG, ISR, and the <strong>Client-First Model</strong>.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 text-sm">
                      <Zap className="h-4 w-4" />
                      <span>3. Partial Prerendering</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Combines an instant static shell (0ms TTFB from CDN Edge) with streaming dynamic Suspense holes over the exact same HTTP response.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                      <Layers className="h-4 w-4" />
                      <span>4. Vertical (&lt;DinouCacheSlot&gt;)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Component-level Micro-ISR. Caches rendered RSC subtrees in server storage with dedicated TTLs and tags without re-rendering parent pages.
                  </CardContent>
                </Card>

                <Card className="border-cyan-500/20 bg-cyan-50/30 dark:bg-cyan-950/20 shadow-sm sm:col-span-2 lg:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-cyan-600 dark:text-cyan-400 text-sm">
                      <Sparkles className="h-4 w-4" />
                      <span>5. Reactive Server Functions &amp; React 19 use()</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Pass un-awaited promises from Server Components to Client Components for non-blocking rendering, and invoke secure Server Functions (<code>&quot;use server&quot;</code>) for user-triggered RPC actions.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. Server Components */}
            <section
              id="server-components"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Server Components (Direct Async Fetching)
              </h2>
              <p>
                In Dinou, every component inside the <code>src/</code> directory is a <strong>Server Component</strong> by default.
                You can define components as standard <code>async</code> functions and fetch data directly from databases, ORMs,
                or private APIs without creating boilerplate REST/GraphQL layers:
              </p>

              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`// src/blog/page.tsx (Server Component by default)
import db from "@/lib/db"; // Never bundled to the client!

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

              {/* 1.1 Timing SSG vs SSR */}
              <section id="timing-ssg-ssr" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  1.1. Static (SSG) vs Dynamic (SSR) Timing
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A common misconception is that an <code>async</code> Server Component always executes on every incoming HTTP request.
                  In Dinou, <strong>routes are Static Site Generated (SSG) by default</strong>:
                </p>

                <div className="grid gap-4 md:grid-cols-2 not-prose my-4 text-xs">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/15 p-4 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Static Routes (Default - Build Time)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      During <code>npm run build</code>, Dinou awaits the async component, renders it to static HTML (<code>index.html</code>)
                      and pre-compiles the binary RSC payload (<code>page.rsc</code>). At runtime, requests are served directly from local disk
                      or Edge CDN with <strong>0ms TTFB</strong> and <strong>zero database queries</strong>.
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-500/20 bg-amber-50/20 dark:bg-amber-950/15 p-4 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Dynamic Routes (Per Request)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      When a route accesses request headers, authentication cookies, or exports <code>export const revalidate = 0</code> in{" "}
                      <code>page_functions.ts</code>, the component executes on every request. An un-Suspended top-level <code>await</code> blocks
                      the entire response until the query completes.
                    </p>
                  </div>
                </div>
              </section>

              {/* 1.2 Parallel Fetching */}
              <section id="parallel-fetching" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Split className="h-5 w-5 text-indigo-500" />
                  1.2. Parallel Fetching (Avoiding Waterfalls)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sequential <code>await</code> statements in a single component create unnecessary server waterfalls: Query B cannot start until Query A finishes.
                  Always initiate independent queries concurrently using <code>Promise.all()</code>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/dashboard/page.tsx
import db from "@/lib/db";

export default async function DashboardPage() {
  // Initiates all independent queries concurrently across database connections:
  const [stats, recentOrders, userProfile] = await Promise.all([
    db.analytics.getStats(),
    db.orders.getRecent({ limit: 5 }),
    db.users.getProfile(),
  ]);

  return (
    <div className="grid gap-6">
      <StatsOverview data={stats} />
      <OrdersTable orders={recentOrders} />
      <ProfileSidebar user={userProfile} />
    </div>
  );
}`}
                </CodeBlock>
              </section>

              {/* 1.3 Streaming with Suspense */}
              <section id="streaming-suspense" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  1.3. Non-Blocking Streaming with React &lt;Suspense&gt;
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When a page has one fast query (e.g. user navigation) and one slow query (e.g. heavy analytics taking 2 seconds),
                  doing a top-level <code>await</code> forces the visitor to stare at a blank screen.
                  Delegate the slow query to a child async component wrapped in <code>&lt;Suspense&gt;</code>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/reports/page.tsx
import { Suspense } from "react";
import db from "@/lib/db";
import { ReportSkeleton } from "./skeleton";

export default function ReportsPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      {/* 1. Delivered immediately to the browser (instant TTFB) */}
      <header>
        <h1 className="text-2xl font-bold">Annual Financial Reports</h1>
        <p className="text-muted-foreground text-sm">Shell delivered in 0ms.</p>
      </header>

      {/* 2. Streams fallback skeleton while child query runs asynchronously */}
      <Suspense fallback={<ReportSkeleton />}>
        <HeavyReportList />
      </Suspense>
    </main>
  );
}

// Child Server Component handles the slow async query independently
async function HeavyReportList() {
  const reports = await db.reports.aggregateAnnualStats(); // 2-second computation
  return (
    <div className="divide-y border rounded-lg p-4">
      {reports.map((r) => (
        <div key={r.id} className="py-2 flex justify-between">
          <span>{r.title}</span>
          <span className="font-mono">\${r.totalRevenue}</span>
        </div>
      ))}
    </div>
  );
}`}
                </CodeBlock>

                <Alert className="not-prose my-4 border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 font-bold text-xs">
                    How &lt;Suspense&gt; Behaves: SSG vs Dynamic SSR vs PPR
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1.5 leading-relaxed">
                    <p>
                      • <strong>Pure SSG:</strong> During <code>npm run build</code>, the compiler awaits all Suspense boundaries to settle and bakes the final resolved HTML. Visitors never see the skeleton.
                    </p>
                    <p>
                      • <strong>Dynamic SSR:</strong> On every request, the server streams the layout shell and skeleton immediately, then replaces it with the resolved HTML chunk once the query finishes.
                    </p>
                    <p>
                      • <strong>Partial Prerendering (PPR):</strong> The shell and skeleton are pre-rendered at build time (0ms TTFB from Edge CDN), while the dynamic hole executes and streams live data into the open connection.
                    </p>
                  </AlertDescription>
                </Alert>
              </section>

              {/* Pros & Cons Grid */}
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/30 dark:bg-green-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>RSC Advantages</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1.5 text-muted-foreground">
                    <p>• <strong>Zero Bundle Impact:</strong> DB drivers, Prisma, SQL libraries, and secret keys stay 100% on the server.</p>
                    <p>• <strong>Colocated Execution:</strong> Runs directly next to your database with microsecond internal latency.</p>
                    <p>• <strong>No Client Waterfalls:</strong> Eliminates client-side <code>useEffect</code> fetching cascades.</p>
                    <p>• <strong>Full SEO by Default:</strong> HTML delivers pre-rendered content for crawlers.</p>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                      <XCircle className="h-5 w-5" />
                      <span>Trade-offs to Manage</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1.5 text-muted-foreground">
                    <p>• <strong>TTFB Latency (Un-Suspended):</strong> Top-level <code>await</code> delays the first byte on dynamic routes unless wrapped in <code>&lt;Suspense&gt;</code>.</p>
                    <p>• <strong>No Direct DOM Events:</strong> Server Components cannot handle <code>onClick</code> or hold <code>useState</code>. Delegate interactivity to Client Components.</p>
                    <p>• <strong>Database Load:</strong> Dynamic SSR hits the database on every request unless protected by <code>&lt;DinouCacheSlot&gt;</code> or ISR.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Page & Layout Functions */}
            <section
              id="page-layout-functions"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Page &amp; Layout Functions (<code>getProps</code>)
              </h2>
              <p>
                In addition to direct component fetching, Dinou provides route-level data contracts via{" "}
                <code>page_functions.ts</code> and <code>layout_functions.ts</code>. This enables segment-level pre-fetching,
                cache tagging, time-based ISR, and the <strong>Client-First Architecture</strong>.
              </p>

              {/* 2.1 Direct Props Return */}
              <section id="getprops-contract" className="mt-6 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  2.1. Direct Props Return Contract
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In Dinou, <code>getProps</code> directly returns the object that is passed as props to the component.
                  Route parameters are strictly typed using <code>RouteParams</code>:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/products/[id]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";
import db from "@/lib/db";

// Strictly typed parameter contract
export const getProps: PageFunctions<
  RouteParams<"/products/[id]">
>["getProps"] = async (params) => {
  const product = await db.products.findById(params.id);
  // Directly returns props for page.tsx
  return { product };
};

// Time-based ISR: regenerate in the background every 60 seconds (RFC max-age)
export const revalidate = 60;

// On-demand invalidation tags
export function getCacheTags(params: RouteParams<"/products/[id]">) {
  return ["products", \`product-\${params.id}\`];
}`}
                </CodeBlock>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/products/[id]/page.tsx
export default function ProductPage({ product }: { product: Product }) {
  return (
    <article className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg text-emerald-600 font-mono">\${product.price}</p>
    </article>
  );
}`}
                </CodeBlock>
              </section>

              {/* 2.2 Horizontal Segmentation */}
              <section id="horizontal-data-split" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Split className="h-5 w-5 text-indigo-500" />
                  2.2. Page vs Layout Segmentation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Through <strong>2D Horizontal Layered Segmentation</strong>, layouts fetch their own data independently in{" "}
                  <code>layout_functions.ts</code>. When a user navigates between sibling pages within the same layout,
                  the layout data is <strong>never re-fetched</strong>:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/shop/layout_functions.ts
import db from "@/lib/db";

export async function getProps() {
  const categories = await db.categories.findMany();
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
    <div className="flex">
      <aside className="w-64 p-4 border-r">
        <CategoryNav categories={categories} />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}`}
                </CodeBlock>
              </section>

              {/* 2.3 Client-First Model */}
              <section id="client-first-model" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-purple-500" />
                  2.3. The Client-First Model (getProps + Client Page)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you are building an interactive application (such as an image editor, canvas, or complex analytical tool)
                  where you want full access to React hooks (<code>useState</code>, <code>useEffect</code>, <code>onClick</code>) everywhere in the page,
                  use Dinou&apos;s <strong>Client-First Model</strong>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// 1. src/canvas/page_functions.ts - Runs securely on the server
import db from "@/lib/db";

export async function getProps(params: { id: string }) {
  const project = await db.projects.findById(params.id);
  return { project };
}

// 2. src/canvas/page.tsx - Entire page is a Client Component
"use client";

import { useState } from "react";

export default function CanvasPage({ project }: { project: any }) {
  // Full traditional React ergonomics with state, effects, and events!
  const [layers, setLayers] = useState(project.initialLayers);

  return (
    <div className="canvas-wrapper">
      <Toolbar onAddLayer={(l) => setLayers([...layers, l])} />
      <Stage layers={layers} />
    </div>
  );
}`}
                </CodeBlock>

                <div className="border border-purple-500/20 bg-purple-50/20 dark:bg-purple-950/15 rounded-lg p-4 not-prose my-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">
                    How Client-First Rendering Works:
                  </span>
                  Data is fetched on the server by <code>getProps</code> and serialized into the initial HTML document.
                  The browser renders the complete HTML immediately (FCP), and React hydrates the tree into a fully interactive client SPA without an extra round-trip.
                  Supports both build-time static generation (Pattern 10) and on-demand SSR (Pattern 11).
                </div>
              </section>
            </section>

            {/* 3. Partial Prerendering */}
            <section
              id="partial-prerendering"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Partial Prerendering (PPR) Data Fetching
              </h2>
              <p>
                Historically, data fetching forced a binary compromise: either fetch at build time (static SSG, blazing fast 0ms TTFB, but stale data)
                or fetch on every request (dynamic SSR, 100% fresh data, but high latency and server load).
                <strong> Partial Prerendering (PPR)</strong> unifies both in a single HTTP response.
              </p>

              {/* 3.1 Static Shell + Dynamic Holes */}
              <section id="ppr-how-it-works" className="mt-6 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  3.1. Static Shell + Dynamic Holes
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  With PPR enabled, Dinou generates a static HTML shell for the navigation, outer headers, and component skeletons during the build.
                  Static data is baked into immutable CDN artifacts. Dynamic data fetches wrapped in React <code>&lt;Suspense&gt;</code> remain
                  as &quot;holes&quot; that stream live HTML over the exact same HTTP response stream as soon as their backend promises resolve:
                </p>

                <div className="border rounded-xl p-4 bg-card not-prose my-4 shadow-sm">
                  <div className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <span>How the HTTP Stream Flows in PPR</span>
                  </div>
                  <ol className="text-xs text-muted-foreground space-y-2 list-decimal pl-4 leading-relaxed">
                    <li>
                      <strong>0ms (CDN Edge Delivery):</strong> The visitor instantly receives the pre-rendered static shell (layout, headers, sidebars, skeleton placeholders) with 0ms server compute delay.
                    </li>
                    <li>
                      <strong>Concurrent Server Execution:</strong> The server executes the dynamic database queries inside <code>&lt;Suspense&gt;</code> concurrently in the background.
                    </li>
                    <li>
                      <strong>Progressive HTML Flush:</strong> As each dynamic query resolves, React streams the replacement HTML chunk down the open connection, swapping the skeleton in-place without hydration flicker.
                    </li>
                  </ol>
                </div>
              </section>

              {/* 3.2 PPR Example */}
              <section id="ppr-example" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  3.2. PPR Implementation Example
                </h3>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/store/page_functions.ts
// Enable Partial Prerendering for this route
export const ppr = true;`}
                </CodeBlock>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/store/page.tsx
import { Suspense } from "react";
import db from "@/lib/db";
import { StockSkeleton } from "./skeletons";

// 1. Static fetch: pre-rendered at build time directly into the static shell
async function StaticProductCatalog() {
  const products = await db.products.findFeatured();
  return <ProductGrid products={products} />;
}

// 2. Dynamic fetch: executed on every request and streamed over the connection
async function LiveInventory({ productId }: { productId: string }) {
  const stock = await db.inventory.getRealtimeStock(productId);
  return (
    <span className={stock > 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
      {stock > 0 ? \`\${stock} in stock\` : "Out of stock"}
    </span>
  );
}

export default function StorePage() {
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold">Flagship Store</h1>
        <p className="text-sm text-muted-foreground">Static shell delivered instantly from CDN Edge.</p>
      </header>

      {/* Static catalog: instant 0ms render */}
      <StaticProductCatalog />

      {/* Dynamic hole: streams live inventory without blocking initial shell */}
      <Suspense fallback={<StockSkeleton />}>
        <LiveInventory productId="prod-99" />
      </Suspense>
    </main>
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
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Vertical Segmentation: <code>&lt;DinouCacheSlot&gt;</code> (Micro-ISR)
              </h2>
              <p>
                While Page Functions handle route-level caching (Horizontal Segmentation), <strong><code>&lt;DinouCacheSlot&gt;</code></strong> introduces{" "}
                <strong>Vertical Segmentation</strong>. It isolates and caches specific component subtrees inside a page with their own TTL and cache tags,
                preventing heavy database queries from re-executing on every request.
              </p>

              {/* 4.1 Props & Usage */}
              <section id="cache-slot-props" className="mt-6 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-emerald-500" />
                  4.1. Granular Component Caching &amp; Props
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Import <code>DinouCacheSlot</code> from <code>&quot;dinou/server&quot;</code>:
                </p>

                <div className="border rounded-xl p-4 bg-card not-prose my-3 text-xs leading-relaxed space-y-1.5 shadow-sm">
                  <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Database className="h-4 w-4 text-emerald-500" />
                    <span>DinouCacheSlot Props Contract</span>
                  </div>
                  <ul className="list-disc pl-4 text-muted-foreground space-y-1">
                    <li><code>id</code> (string): Unique identifier for the slot across the application.</li>
                    <li><code>revalidate</code> or <code>duration</code> (number): Cache expiration TTL in <strong>seconds</strong>.</li>
                    <li><code>tag</code> or <code>tags</code> (string | string[]): Cache tags for targeted on-demand invalidation via <code>revalidateTag(tag)</code>.</li>
                  </ul>
                </div>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/dashboard/page.tsx
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { FastProfile, HeavyAnalytics, RealtimeAlerts } from "./components";
import { AnalyticsSkeleton } from "./skeletons";

export default function DashboardPage() {
  return (
    <div className="dashboard-grid space-y-6">
      {/* 1. Fast profile: evaluated dynamically per request */}
      <FastProfile />

      {/* 2. Heavy analytics: cached for 300s in server memory/KV (Micro-ISR) */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <DinouCacheSlot id="analytics-slot" tag="analytics" revalidate={300}>
          <HeavyAnalytics />
        </DinouCacheSlot>
      </Suspense>

      {/* 3. Realtime alerts: evaluated dynamically */}
      <RealtimeAlerts />
    </div>
  );
}`}
                </CodeBlock>

                <Alert className="not-prose my-3 border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/15">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle className="text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    Can &lt;DinouCacheSlot&gt; Contain Client Components?
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    <strong>Yes, absolutely.</strong> While <code>&lt;DinouCacheSlot&gt;</code> is a Server Component, its children can freely render interactive Client Components (e.g. charts with zoom buttons). Dinou caches the Client Component reference and its pre-computed props. The browser hydrates it normally with full client interactivity (state, animations, DOM events).
                  </AlertDescription>
                </Alert>
              </section>

              {/* 4.2 Asymmetric ISR */}
              <section id="asymmetric-isr" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Split className="h-5 w-5 text-blue-500" />
                  4.2. Asymmetric ISR (Static Page + Fast Slot)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In traditional frameworks, cache invalidation is all-or-nothing: if one widget updates every minute, the entire page must be revalidated every minute.
                  With Dinou, a product catalog page can have a <strong>24-hour page revalidation</strong> (<code>revalidate: 86400</code>) while an inner flash sale ticker
                  uses <code>&lt;DinouCacheSlot revalidate=&#123;60&#125;&gt;</code>. The heavy layout remains cached at the Edge CDN, while the volatile widget updates independently.
                </p>
              </section>

              {/* 4.3 Client Invalidation */}
              <section id="refresh-slot-client" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-indigo-500" />
                  4.3. Client-Side Targeted Invalidation (<code>refreshSlot</code>)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  After a client mutation or user interaction, you can re-fetch <strong>only that specific cache slot</strong> without re-rendering the parent page or resetting sibling component state:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/dashboard/refresh-button.tsx
"use client";

import { refreshSlot, useRouter } from "dinou";

export function RefreshAnalyticsButton() {
  const router = useRouter();

  const handleRefresh = () => {
    // 1. Direct standalone function:
    refreshSlot("analytics-slot", { fresh: true });

    // 2. Or via router instance:
    // router.refreshSlot("analytics-slot", { fresh: true });
  };

  return (
    <button onClick={handleRefresh} className="btn-secondary">
      Live Refresh Metrics
    </button>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 5. High-Traffic Synergy: PPR + DinouCacheSlot */}
            <section
              id="ppr-cache-slot-synergy"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. High-Traffic Synergy: PPR + &lt;DinouCacheSlot&gt;
              </h2>
              <p>
                Nesting <code>&lt;DinouCacheSlot&gt;</code> inside a React <code>&lt;Suspense&gt;</code> boundary on a page with{" "}
                <strong>Partial Prerendering (PPR)</strong> unlocks the highest performance profile possible in full-stack web engineering:
                <strong> zero-delay initial delivery paired with near-zero streaming delay and 99.9% database query offloading</strong>.
              </p>

              {/* 5.1 Synergy Benchmarks */}
              <section id="synergy-benchmarks" className="mt-6 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-indigo-500" />
                  5.1. 0ms Edge TTFB + 2ms Cached Hole
                </h3>

                <div className="grid gap-4 md:grid-cols-2 text-xs not-prose my-4">
                  <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-amber-500" />
                          PPR Alone (Without Slot)
                        </CardTitle>
                        <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-500/30">
                          Live Query Per Request
                        </Badge>
                      </div>
                      <CardDescription className="text-[11px]">
                        Static shell + on-demand dynamic execution
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1.5 text-muted-foreground leading-relaxed">
                      <p>• <strong>TTFB:</strong> 0ms from CDN Edge (instant outer layout).</p>
                      <p>• <strong>Skeleton Duration:</strong> The user waits the full database query time (e.g. 1,200ms) on <em>every single request</em>.</p>
                      <p>• <strong>Database Load:</strong> 10,000 visitors per minute = <strong>10,000 database queries</strong>.</p>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                          <Zap className="h-4 w-4 text-indigo-500" />
                          PPR + &lt;DinouCacheSlot&gt; (Synergy)
                        </CardTitle>
                        <Badge variant="outline" className="text-[10px] text-indigo-600 dark:text-indigo-400 border-indigo-500/40">
                          Cached Streamed Hole
                        </Badge>
                      </div>
                      <CardDescription className="text-[11px]">
                        Static shell + memory/KV cached stream
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1.5 text-muted-foreground leading-relaxed">
                      <p>• <strong>TTFB:</strong> 0ms from CDN Edge (instant outer layout).</p>
                      <p>• <strong>Skeleton Duration:</strong> Near-zero (~2-5ms)! The server flushes the cached RSC flight chunk from memory/KV immediately.</p>
                      <p>• <strong>Database Load:</strong> 10,000 visitors per minute = <strong>1 query per TTL window (99.9% offload)</strong>.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 5.2 Synergy Implementation */}
              <section id="synergy-implementation" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  5.2. Peak Performance Implementation
                </h3>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// src/trending/page_functions.ts
export const ppr = true;

// src/trending/page.tsx
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { TrendingGrid, TrendingSkeleton } from "./components";

export default function TrendingPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      {/* 1. Static Layout: delivered immediately with 0ms TTFB from CDN Edge */}
      <header>
        <h1 className="text-3xl font-bold">Trending Products</h1>
        <p className="text-muted-foreground text-sm">Ultra-high traffic viral catalog.</p>
      </header>

      {/* 2. Micro-ISR Slot: resolves in ~2ms from server memory/KV cache without DB query */}
      <Suspense fallback={<TrendingSkeleton />}>
        <DinouCacheSlot id="viral-trending" revalidate={120} tag="trending">
          <TrendingGrid />
        </DinouCacheSlot>
      </Suspense>
    </main>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 6. Reactive Fetching with Server Functions */}
            <section
              id="server-functions-streaming"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Reactive Fetching with Server Functions &amp; React 19
              </h2>
              <p>
                When data fetching requires client reactivity, live search filters, or user-triggered mutations,
                pair Server Functions (<code>&quot;use server&quot;</code>) with React 19&apos;s native primitives.
              </p>

              {/* 6.1 Native use() */}
              <section id="react-19-use-hook" className="mt-6 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-500" />
                  6.1. Passing Promises to Client <code>use()</code>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  React 19 allows Server Components to initiate a promise without <code>await</code> and pass it directly across the flight boundary to a Client Component.
                  The Client Component unwraps it synchronously using React 19&apos;s native <code>use()</code> hook inside <code>&lt;Suspense&gt;</code>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
{`// 1. Server Component: src/search/page.tsx
import { Suspense } from "react";
import { searchCatalog } from "./server-functions";
import { SearchResults } from "./search-results";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";

  // Start query on server WITHOUT awaiting! Returns an un-awaited Promise:
  const searchPromise = searchCatalog(query);

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Search Catalog</h1>
      <Suspense key={query} fallback={<p className="text-muted-foreground">Searching catalog...</p>}>
        <SearchResults promise={searchPromise} />
      </Suspense>
    </main>
  );
}

// 2. Client Component: src/search/search-results.tsx
"use client";

import { use } from "react";

export function SearchResults({ promise }: { promise: Promise<Product[]> }) {
  // Unwraps the Flight RPC promise directly inside the client component
  const products = use(promise);

  return (
    <ul className="divide-y border rounded-lg p-4">
      {products.map((p) => (
        <li key={p.id} className="py-2 flex justify-between">
          <span>{p.name}</span>
          <span className="font-mono text-emerald-600">\${p.price}</span>
        </li>
      ))}
    </ul>
  );
}`}
                </CodeBlock>
              </section>

              {/* 6.2 RPC Mutations vs Initial Mount */}
              <section id="server-functions-mutations" className="mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-indigo-500" />
                  6.2. User-Driven RPC Mutations vs Initial Mount
                </h3>

                <div className="grid gap-4 md:grid-cols-2 not-prose my-4 text-xs">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/15 p-4 space-y-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm block">
                      Recommended: User-Triggered Actions (Pattern 13)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Invoke Server Functions on button clicks, form submissions, and mutation events.
                      They provide type-safe RPC endpoints, execute server mutations securely, and trigger on-demand cache revalidation via <code>revalidateTag</code>.
                    </p>
                  </div>

                  <div className="rounded-xl border border-rose-500/20 bg-rose-50/20 dark:bg-rose-950/15 p-4 space-y-2">
                    <span className="font-bold text-rose-700 dark:text-rose-400 text-sm block">
                      Anti-Pattern: Calling Server Functions on Initial Mount (Pattern 12)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Calling a Server Function inside a Client Component&apos;s <code>useEffect</code> on mount creates an avoidable client-side network waterfall:
                      the browser must download the JS bundle, parse it, and then send a second HTTP POST request to fetch data that could have been streamed during initial SSR.
                    </p>
                  </div>
                </div>
              </section>
            </section>

            {/* 7. Master Comparison Matrix */}
            <section
              id="strategy-comparison"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Data Fetching &amp; Rendering Strategies Master Matrix
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To help you choose the ideal pattern for every route and component, the following matrix compares the 13 data fetching
                and rendering strategies available in Dinou, their execution timing, TTFB, streaming resolution latency, database/server pressure,
                and network round-trip characteristics:
              </p>

              <div className="not-prose my-6 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-card shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="w-full text-xs">
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/60 border-b">
                      <TableRow>
                        <TableHead className="w-10 text-center font-bold">#</TableHead>
                        <TableHead className="min-w-[190px] font-bold">Strategy / Pattern</TableHead>
                        <TableHead className="min-w-[140px] font-bold">Execution Context</TableHead>
                        <TableHead className="min-w-[115px] font-bold">TTFB (First Byte)</TableHead>
                        <TableHead className="min-w-[125px] font-bold">Stream / Content Ready</TableHead>
                        <TableHead className="min-w-[125px] font-bold">Server &amp; DB Load</TableHead>
                        <TableHead className="min-w-[90px] font-bold text-center">Network Waterfall?</TableHead>
                        <TableHead className="min-w-[105px] font-bold">Data Freshness</TableHead>
                        <TableHead className="min-w-[200px] font-bold">Ideal Use Case</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {/* Row 1 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">1</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC Direct await (SSG)</div>
                          <div className="text-[11px] text-muted-foreground">Top-level <code>await</code> or <code>getProps</code> in Server Component</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (<code>npm run build</code>)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (0ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Zero (Build Time)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                        <TableCell className="text-muted-foreground">Blogs, documentation, static marketing pages.</TableCell>
                      </TableRow>

                      {/* Row 2 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">2</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC Direct await (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground">Top-level <code>await</code> or <code>getProps</code> without <code>&lt;Suspense&gt;</code></div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Server)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Blocked)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground font-mono text-[11px]">N/A (Blocks TTFB)</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Private views where entire UI requires a single critical query and waiting is acceptable.</TableCell>
                      </TableRow>

                      {/* Row 3 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">3</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; (SSG)</div>
                          <div className="text-[11px] text-muted-foreground">Static route with async component boundary</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (Compiler awaits)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (0ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Zero (Build Time)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                        <TableCell className="text-muted-foreground">Decoupled async components in static pages; outputs final HTML without showing fallback.</TableCell>
                      </TableRow>

                      {/* Row 4 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">4</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground">Streaming SSR on demand (without PPR)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Server streaming)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Fast (Early Layout)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Waits 1-3s DB)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Dynamic routes on runtimes without edge caching or when PPR is disabled.</TableCell>
                      </TableRow>

                      {/* Row 5 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">5</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Static / Asymmetric ISR)</div>
                          <div className="text-[11px] text-muted-foreground">Pre-rendered static shell with decoupled slot TTL or <code>refreshSlot()</code></div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (Pre-rendered) + On-Demand Slot Reval</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (~0-2ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Near-Zero (Decoupled)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-amber-600 dark:text-amber-400 font-medium">Decoupled TTL / refreshSlot()</TableCell>
                        <TableCell className="text-muted-foreground">Static/ISR pages (e.g. 24h page revalidate) containing a widget (stock, pricing) needing fast updates (60s) or surgical in-place client refreshes.</TableCell>
                      </TableRow>

                      {/* Row 6 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">6</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground">Dynamic streaming with vertical Micro-ISR (TTL cache)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Cache hit: ~2ms / Miss: async query)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Fast (Early Layout)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (~2ms Cache)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Near-Zero (99% Offload)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-amber-600 dark:text-amber-400 font-medium">TTL / Tag Reval</TableCell>
                        <TableCell className="text-muted-foreground">Dynamic routes (with session/cookies) containing heavy widgets (analytics, feeds). Flushes layout instantly; slot streams from cache without DB load.</TableCell>
                      </TableRow>

                      {/* Row 7 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 bg-blue-50/20 dark:bg-blue-950/10">
                        <TableCell className="font-mono text-center text-blue-600 dark:text-blue-400 font-bold">7</TableCell>
                        <TableCell>
                          <div className="font-bold text-blue-700 dark:text-blue-300">RSC with &lt;Suspense&gt; (PPR Hybrid)</div>
                          <div className="text-[11px] text-muted-foreground">Partial Prerendering (Static Shell + Live Uncached Hole)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Static Shell (Build) + Live Hole (Server on every request)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (Shell from Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Hole waits for DB)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% Hole queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground font-medium text-slate-800 dark:text-slate-200">Instant static layout from Edge with zero-delay live streamed data for real-time personalization.</TableCell>
                      </TableRow>

                      {/* Row 8 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 bg-gradient-to-r from-indigo-50/40 via-purple-50/30 to-blue-50/20 dark:from-indigo-950/25 dark:via-purple-950/20 dark:to-blue-950/15 border-l-2 border-indigo-500">
                        <TableCell className="font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">8</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
                            <span>PPR + &lt;DinouCacheSlot&gt; (PPR Hybrid Synergy)</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider">Synergy</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground">Static Edge Shell + Cached Streamed Hole (Max Concurrency)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Edge CDN (Shell) + Server Cache Storage (Slot)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (Edge) + ~5ms (Slot)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (~2-5ms Cache)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Near-Zero (99.9% Offload)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-amber-600 dark:text-amber-400 font-medium">TTL / Tag Reval</TableCell>
                        <TableCell className="text-muted-foreground font-medium text-slate-800 dark:text-slate-200">
                          <strong className="text-indigo-600 dark:text-indigo-400">Peak Performance:</strong> Instant CDN paint (0ms TTFB) with 99.9% database query offload. Ideal for high-traffic stores, trending catalog pages, and viral portals.
                        </TableCell>
                      </TableRow>

                      {/* Row 9 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 bg-purple-50/20 dark:bg-purple-950/10">
                        <TableCell className="font-mono text-center text-purple-600 dark:text-purple-400 font-bold">9</TableCell>
                        <TableCell>
                          <div className="font-bold text-purple-700 dark:text-purple-300">RSC Promise ➔ Client use() (Dynamic / PPR)</div>
                          <div className="text-[11px] text-muted-foreground">RSC initiates un-awaited Promise; Client unwraps via <code>use()</code></div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Server starts query; Client suspends</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (with PPR)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Waits for Promise
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (Live query)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground font-medium text-slate-800 dark:text-slate-200">Interactive stateful widgets (charts, canvas, filters) needing fresh streaming data.</TableCell>
                      </TableRow>

                      {/* Row 10 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">10</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client-First getProps (SSG)</div>
                          <div className="text-[11px] text-muted-foreground"><code>page_functions.ts</code> + Client Component</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (<code>npm run build</code>)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (0ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Zero (Build Time)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                        <TableCell className="text-muted-foreground">Dinou Client-First model for highly interactive static web applications.</TableCell>
                      </TableRow>

                      {/* Row 11 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">11</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client-First getProps (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground"><code>page_functions.ts</code> + Client Component in SSR</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Server awaits <code>getProps</code>)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Blocked)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground font-mono text-[11px]">N/A (Blocks TTFB)</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Complex SPAs where developers prefer classic React hooks and tolerate TTFB wait.</TableCell>
                      </TableRow>

                      {/* Row 12 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">12</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client Calling Server Function (Initial Mount - Dynamic RPC)</div>
                          <div className="text-[11px] text-muted-foreground">Client Component calls <code>&quot;use server&quot;</code> during initial mount</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Client RPC on mount</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Fast (Shell Only)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Delayed (Waterfall)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% RPC queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-rose-600 dark:text-rose-400">Yes (Waterfall)</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Supported, but sub-optimal compared to pattern 9 (RSC Promise streaming) due to the second HTTP round trip.</TableCell>
                      </TableRow>

                      {/* Row 13 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">13</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client Calling Server Function (User Action - Dynamic RPC)</div>
                          <div className="text-[11px] text-muted-foreground">Invoked on user button click, form submission, or mutation</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Client on user action (POST RPC)</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs text-muted-foreground">N/A (Post-Load)</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground font-mono text-[11px]">N/A (User Event)</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                            On-Demand (Per Action)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Form submissions, state persistence, on-demand data refreshes, and RPC actions.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="not-prose grid gap-4 md:grid-cols-2 mt-4">
                <Alert className="border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 font-bold text-xs">
                    Server Components with getProps
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Using Dinou&apos;s <code>getProps</code> with a Server Component is functionally equivalent to doing top-level <code>await</code> in the component body (Patterns 1 &amp; 2): both run on the server before rendering the component and block TTFB on dynamic routes unless wrapped in <code>&lt;Suspense&gt;</code>.
                  </AlertDescription>
                </Alert>

                <Alert className="border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20">
                  <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-700 dark:text-amber-300 font-bold text-xs">
                    Legacy useEffect Fetching Omitted
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Traditional client-side data fetching via <code>useEffect</code> + <code>fetch()</code> is intentionally omitted from the primary strategies. In React 19 and modern RSC architectures, fetching on mount via <code>useEffect</code> is considered a legacy anti-pattern that creates network waterfalls, causes layout shifts, and misses server streaming.
                  </AlertDescription>
                </Alert>
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
