import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/docs/components/ui/tabs";
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
  Database,
  Clock,
  XCircle,
  TrendingDown,
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
    title: "4.1. Component Caching: Dynamic vs Static Patterns",
    level: 3,
  },
  {
    id: "slot-invalidation",
    title: "4.2. Interactive Revalidation & Invalidation",
    level: 3,
  },
  {
    id: "horizontal-vs-vertical",
    title: "4.3. Horizontal vs Vertical & Anti-Patterns",
    level: 3,
  },
  {
    id: "ppr-slot-synergy",
    title: "5. High-Traffic Synergy: PPR + <DinouCacheSlot>",
    level: 2,
  },
  {
    id: "isg",
    title: "6. Incremental Static Generation (ISG on-demand)",
    level: 2,
  },
  {
    id: "on-demand-generation",
    title: "6.1. On-Demand Path Generation",
    level: 3,
  },
  {
    id: "isg-governance",
    title: "6.2. Governance APIs (validateParams & allowISG)",
    level: 3,
  },
  {
    id: "comparison-matrix",
    title: "7. Complete Rendering Strategies Matrix",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Rendering Strategies | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Dinou is Static by Default. Explore build-time SSG, background ISR, on-demand ISG, dynamic SSR streaming, and Partial Prerendering (PPR)."
      />
      <link rel="canonical" href="https://dinou.dev/docs/rendering" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Static &amp; Dynamic Rendering Strategies
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
                otherwise. During <code>dinou build</code>, the compiler analyzes your route
                segments, components, and loader functions to evaluate whether a route can
                be pre-rendered or if it requires real-time request data:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-6 min-w-0">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Globe className="h-5 w-5" />
                      <span>1. Static by Default</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Routes without dynamic dependencies are pre-rendered into
                    immutable HTML and RSC payloads at build time, achieving <strong>0ms TTFB</strong> at the CDN edge.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                      <Server className="h-5 w-5" />
                      <span>2. Dynamic Bailout</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    When a page reads cookies, request headers, or sets <code>revalidate: 0</code>, Dinou automatically bails out to <strong>Live SSR</strong> on every request.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Sparkles className="h-5 w-5" />
                      <span>3. Hybrid Continuum</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Escape the binary choice: stream dynamic components into a static shell with <strong>PPR</strong>, or isolate component caching with <code>&lt;DinouCacheSlot&gt;</code>.
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
                  Any page that does not consume request-specific headers,
                  cookies, or query parameters (<code>context.req.query</code>) and does not set <code>revalidate &lt; 1</code> is
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
                  time without wrapping it inside a dynamic streaming boundary (React <code>&lt;Suspense&gt;</code> with Partial Prerendering / PPR enabled), Dinou
                  automatically &quot;bails out&quot; of static generation and
                  transitions the entire page into <strong>Dynamic SSR</strong> for that
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

  // ⚠️ Reading cookies outside <Suspense> triggers an Automatic Static Bailout
  // This page will now be rendered dynamically on every incoming request
  const sessionToken = context?.req.cookies["session_token"];
  const user = await db.users.findByToken(sessionToken);

  return <h1>Welcome back, {user?.name}</h1>;
}`}
                </CodeBlock>

                <Alert className="not-prose mt-4">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <AlertTitle>Bailout Triggers in Server Components</AlertTitle>
                  <AlertDescription>
                    Automatic bailout occurs when reading <code>context.req.cookies</code>,{" "}
                    <code>context.req.headers</code>, or <code>context.req.query</code> (URL search parameters)
                    during server component execution without wrapping the access in a React <code>&lt;Suspense&gt;</code> boundary.
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg p-5 bg-muted/20 not-prose mt-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>What about Client Components and <code>useSearchParams()</code>?</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Client Components (<code>&quot;use client&quot;</code>) that call <code>useSearchParams()</code> <strong>do not trigger dynamic bailout</strong>. The page remains 100% static (SSG). During build time, the component is pre-rendered with an empty parameter set, and live URL parameters are synchronized in the browser upon hydration.
                  </p>

                  <div className="border-t border-border/60 pt-3 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <span className="text-amber-500">⚠️</span>
                        <span>Understanding and Preventing Hydration Mismatches</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        If a Client Component immediately renders <code>searchParams.get(&quot;q&quot;)</code> in its initial JSX markup, the server-generated static HTML (where the query was empty at build time) will differ from the live browser DOM (e.g. <code>?q=react</code>), triggering a React hydration mismatch error.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-foreground">
                        Recommended Fix: Deferred Synchronization with <code>useEffect</code>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Keep the initial render deterministic (matching the static build HTML), then read and apply the live search parameters inside <code>useEffect()</code> after the component mounts in the browser:
                      </p>
                      <CodeBlock
                        language="tsx"
                        containerClassName="w-full overflow-hidden rounded-lg text-xs"
                      >
{`// src/components/search-filter.tsx
"use client";

import { useSearchParams } from "dinou";
import { useState, useEffect } from "react";

export function SearchFilter() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    // Synchronize client-side only after mounting -> eliminates hydration mismatch
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Initial render matches static HTML perfectly
  if (query === null) {
    return <span className="text-muted-foreground">Loading filter...</span>;
  }

  return <span>Filter: <strong>{query}</strong></span>;
}`}
                      </CodeBlock>
                    </div>

                    <div className="bg-background/80 rounded-md p-3 border text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Alternative (Live SSR): </span>
                      If the initial HTML sent over the wire <em>must</em> contain search parameters (e.g. for SEO or zero-layout-shift server pre-rendering), switch the page to Live SSR by setting <code>export const revalidate: PageFunctions[&quot;revalidate&quot;] = 0;</code> in <code>page_functions.ts</code>, or read <code>context.req.query</code> inside a dynamic Server Component.
                    </div>
                  </div>
                </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6 min-w-0">
                  <Card className="bg-muted/50 border-border min-w-0">
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

                  <Card className="bg-muted/50 border-border min-w-0">
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

                {/* 1. Comparison: Pure SSG vs PPR (Data Freshness) */}
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
                        The visual shell is delivered at <strong>0ms TTFB</strong> from the edge, while the component inside <code>&lt;Suspense&gt;</code> executes on the server on <strong>every single incoming HTTP request</strong>. You get 100% fresh, live database data streamed directly to the browser without client waterfalls or legacy <code>useEffect</code> fetching.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. PPR as a Bailout Containment Boundary */}
                <div className="space-y-4 my-6 not-prose">
                  <h5 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    PPR as a Bailout Boundary: Containing Dynamic De-optimization
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Without PPR, dynamic data access is infectious. If a single nested component reads request cookies or headers, Dinou triggers an <strong>Automatic Static Bailout for the entire page</strong>, destroying static pre-rendering and edge caching for the whole route.
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
      {/* 1. Static Shell: 0ms TTFB, pre-rendered during build */}
      <header className="navbar">
        <h1>Flagship Store</h1>
        
        {/* 2. PPR Boundary: Isolates cookie bailout exclusively to this hole */}
        <Suspense fallback={<CartBadgeSkeleton />}>
          <LiveCartBadge />
        </Suspense>
      </header>

      {/* 3. Static Sibling: Remains 100% static and edge-cached */}
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
                        Reading <code>cookies[&quot;session_id&quot;]</code> triggers an uncontained bailout. The <strong>entire page</strong> (navbar, product gallery, layout) turns into dynamic SSR. The edge cache is bypassed, and the browser receives 0 bytes until the database query completes.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                        ✅ With PPR: Isolated Hole Bailout
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        The cookie bailout is <strong>quarantined inside <code>&lt;Suspense&gt;</code></strong>. The navbar and product gallery are delivered instantly at <strong>0ms TTFB</strong>. Only the cart badge executes on the server and streams into place.
                      </p>
                    </div>
                  </div>
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
                (caching an entire URL route or layout shell). When a dynamic page contains an expensive database widget, developers are often forced into an architectural trap: converting the widget to a Client Component with client-side cache libraries (SWR, TanStack Query), introducing bundle bloat, waterfall requests, and layout shifts.
              </p>
              <p>
                Dinou v7 introduces <strong>Vertical Segmentation</strong> with{" "}
                <code>&lt;DinouCacheSlot&gt;</code> from <code>&quot;dinou/server&quot;</code>. It keeps components securely on the server as React Server Components (RSC) while caching their rendered serialized Flight payload in server storage with dedicated TTLs and invalidation tags.
              </p>

              {/* 4.1 Slot Caching */}
              <section id="slot-caching" className="mt-6 scroll-mt-20">
                <h4>4.1. Component Caching: Dynamic vs. Static Patterns</h4>
                <p>
                  A frequent question is: <em>Is <code>&lt;DinouCacheSlot&gt;</code> meant for dynamic or static pages?</em> The answer is that it functions as a <strong>universal caching primitive</strong> across three core patterns:
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
                      A product catalog page has a slow 24-hour page revalidation (<code>revalidate: 86400</code>). Inside it, a real-time inventory badge or flash sale counter uses <code>&lt;DinouCacheSlot revalidate={60}&gt;</code>. The heavy layout remains cached at the edge, while the volatile widget updates independently.
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
                    The parent route has a slow horizontal revalidation of 24 hours (<code>revalidate: 86400</code>). Inside it, a volatile inventory counter revalidates vertically every 60 seconds (<code>revalidate={60}</code>) or on-demand when purchases occur:
                  </p>
                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full overflow-hidden rounded-lg my-2"
                  >
{`// src/products/[slug]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

export type ProductParams = RouteParams<"/products/[slug]">;

// 1. Slow horizontal revalidation for outer layout & descriptions (24 hours = 86,400s)
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
      {/* 1. Heavy Static Content: Cached at the CDN edge for 24 hours */}
      <ProductHero slug={params.slug} />
      <ProductDescription slug={params.slug} />

      {/* 2. Asymmetric Micro-ISR Slot: Revalidates vertically every 60s */}
      {/* 💡 In pure SSG/ISR, <Suspense> is optional at build time, but recommended for ISG on-demand hits & refreshSlot() */}
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
                        The outer <code>&lt;Suspense&gt;</code> captures the async execution of <code>&lt;DinouCacheSlot&gt;</code>. The shell and user profile flush to the browser in <strong>0ms TTFB</strong> with the skeleton fallback. On a cache hit (~2ms), the slot resolves immediately; on a cache miss, it computes in the background and streams into place.
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

              {/* 4.2 Interactive Revalidation & Invalidation */}
              <section id="slot-invalidation" className="mt-8 scroll-mt-20">
                <h4>4.2. Interactive Revalidation &amp; On-Demand Purging</h4>
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
                      <div>• <strong><code>refreshSlot(id)</code> (Default)</strong>: Refreshes the client DOM with the server&apos;s current state. If the slot&apos;s server-side TTL (e.g. <code>revalidate={300}</code>) has not expired, it returns the cached server JSX without touching your database (protecting against button spam and traffic spikes).</div>
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
                        During initial SSR or SPA page navigation, <code>&lt;DinouCacheSlot&gt;</code> prioritizes <strong>instant TTFB</strong>. If a slot&apos;s TTL has expired, the server serves the stale cache in <strong>0ms</strong> and triggers an asynchronous background revalidation so subsequent visitors receive fresh content.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 min-w-0">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>2. Interactive refreshSlot: Synchronous Fresh Delivery</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When a user explicitly clicks a refresh button, SWR would deliver a confusing UX (showing old data again). Therefore, the granular endpoint (<code>/____rsc_slot____/:id</code>) <strong>awaits the server component execution</strong>, writes the updated result to cache, and returns the fresh RSC payload in that single HTTP response.
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

              {/* 4.3 Horizontal vs Vertical & Anti-Patterns */}
              <section id="horizontal-vs-vertical" className="mt-8 scroll-mt-20">
                <h4>4.3. Horizontal vs. Vertical Segmentation &amp; Anti-Patterns</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6 min-w-0">
                  <Card className="min-w-0">
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
                        Route / Segment Level (URL based, Coarse)
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="min-w-0">
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
                        Component Subtree Level (Widget based, Fine-Grained)
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Anti-Patterns Box */}
                <div className="border border-rose-500/20 bg-rose-50/20 dark:bg-rose-950/10 rounded-xl p-5 not-prose space-y-3">
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
                        If an entire route is pre-rendered at build time with no revalidation, it is already cached as immutable HTML at the CDN. Slots add zero benefit.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">
                        2. Wrapping the Entire Page
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        Wrapping the entire <code>page.tsx</code> body inside a slot reinvents horizontal caching. Declare <code>export const revalidate = 300</code> in <code>page_functions.ts</code> instead.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block">
                        3. Private User Data
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        Never wrap private user data (such as a specific user&apos;s cart or auth session) with a static slot ID. This would cache user A&apos;s private data and leak it to user B.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            {/* 5. High-Traffic Synergy: PPR + DinouCacheSlot */}
            <section
              id="ppr-slot-synergy"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  5. High-Traffic Synergy: PPR + <code>&lt;DinouCacheSlot&gt;</code>
                </h3>
                <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  Maximum Concurrency
                </span>
              </div>
              <p className="mt-4">
                What happens when you nest <code>&lt;DinouCacheSlot&gt;</code> inside a React{" "}
                <code>&lt;Suspense&gt;</code> boundary on a route with{" "}
                <strong>Partial Prerendering (PPR)</strong>? You unlock the highest performance profile possible in full-stack web engineering: <strong>zero-delay initial delivery (0ms TTFB) paired with near-zero streaming delay (~2ms) and 99.9% database query offloading</strong>.
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
                    <li><strong>TTFB:</strong> 0ms from CDN Edge (instant static shell).</li>
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
                    <li><strong>TTFB:</strong> 0ms from CDN Edge (instant static shell).</li>
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
      {/* 1. Static Shell: Delivered instantly in 0ms TTFB from edge CDN */}
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
                    Instant 0ms TTFB
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Outer shell and fallback skeleton arrive at 0ms from the CDN edge cache.
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

            {/* 6. ISG */}
            <section id="isg" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                6. Incremental Static Generation (ISG on-demand)
              </h3>
              <p>
                While ISR updates <em>existing</em> pre-rendered pages,{" "}
                <strong>ISG (Incremental Static Generation)</strong> generates{" "}
                <em>new</em> pages on demand that were not included in the initial
                build-time <code>getStaticPaths</code> list.
              </p>

              {/* 6.1 On-demand */}
              <section id="on-demand-generation" className="mt-6 scroll-mt-20">
                <h4>6.1. On-Demand Path Generation</h4>
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

              {/* 6.2 Governance APIs */}
              <section id="isg-governance" className="mt-8 scroll-mt-20">
                <h4>6.2. Governance APIs (<code>validateParams</code> &amp; <code>allowISG</code>)</h4>
                <p>
                  Dinou provides strict server-side governance exports to secure
                  dynamic generation against abuse:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-4 min-w-0">
                  <Card className="min-w-0">
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

                  <Card className="min-w-0">
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

            {/* 7. Comparison Matrix */}
            <section
              id="comparison-matrix"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                7. Complete Rendering Strategies Matrix
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
                      <th className="p-4">Database Load</th>
                      <th className="p-4">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Pure SSG</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">Default / revalidate = false</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0ms (Instant)</td>
                      <td className="p-4 text-xs text-muted-foreground">Build-time</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0 queries (Build-time only)</td>
                      <td className="p-4 text-xs text-muted-foreground">Landing pages, marketing, documentation</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">ISR</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">revalidate = N (N &gt;= 1)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0ms (Cached)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Stale-while-revalidate</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">1 query per TTL (0 on cache hits)</td>
                      <td className="p-4 text-xs text-muted-foreground">Blogs, catalogs, news feeds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Dynamic SSR</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">revalidate = 0</td>
                      <td className="p-4 text-xs text-rose-600 dark:text-rose-400 font-medium">Request-time (Blocked)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">100% Real-time</td>
                      <td className="p-4 text-xs text-rose-600 dark:text-rose-400 font-medium">Heavy: 100% queries on every request</td>
                      <td className="p-4 text-xs text-muted-foreground">User settings, banking, checkout</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">PPR (Partial Prerendering)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr = true + &lt;Suspense&gt;</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0ms (Shell from Edge)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">100% Real-time (Holes)</td>
                      <td className="p-4 text-xs text-rose-600 dark:text-rose-400 font-medium">Heavy: 100% Hole queries on every request</td>
                      <td className="p-4 text-xs text-muted-foreground">E-commerce, dashboards with static shells</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Micro-ISR (Static / Asymmetric ISR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">&lt;DinouCacheSlot&gt; (in Static/ISR page)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0ms (CDN Edge)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Decoupled Slot TTL / Tags</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Low: Isolated to expired slots</td>
                      <td className="p-4 text-xs text-muted-foreground">Static product/catalog pages with volatile widgets (stock, prices)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Micro-ISR (Dynamic SSR)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">&lt;DinouCacheSlot&gt; (in Dynamic SSR page)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Fast (Early Layout / Slot-cached)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Component TTL / Tags</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Low: Isolated to expired slots</td>
                      <td className="p-4 text-xs text-muted-foreground">Dynamic user dashboards with heavy SQL calculations</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">PPR + Micro-ISR (Synergy)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">ppr: true + &lt;DinouCacheSlot&gt;</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0ms (Edge) + ~2ms (Hole)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Cached Streamed Hole</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Near-Zero: 1 query per slot TTL (99.9% reduction)</td>
                      <td className="p-4 text-xs text-muted-foreground">High-concurrency e-commerce, telemetry dashboards</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">ISG (Incremental Static)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">allowISG = true (default)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0ms (after 1st hit)</td>
                      <td className="p-4 text-xs text-muted-foreground">Cached permanently</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">1 query on 1st generation (0 thereafter)</td>
                      <td className="p-4 text-xs text-muted-foreground">Long-tail e-commerce products, dynamic paths</td>
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
