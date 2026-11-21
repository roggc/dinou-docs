import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Link } from "dinou";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Zap,
  RefreshCw,
  Info,
  Layers,
  ServerCog,
  Timer,
  ShieldCheck,
  Server,
  Globe,
  ArrowRight,
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
    id: "isg",
    title: "3. Incremental Static Generation (ISG on-demand)",
    level: 2,
  },
  {
    id: "on-demand-generation",
    title: "3.1. On-Demand Path Generation",
    level: 3,
  },
  {
    id: "isg-governance",
    title: "3.2. Governance APIs (validateParams & allowISG)",
    level: 3,
  },
  {
    id: "comparison-matrix",
    title: "4. Route-Level Rendering Strategies Matrix",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Static &amp; Dynamic Rendering | Dinou Docs</title>
      <meta
        name="description"
        content="Dinou is Static by Default. Explore route-level build-time SSG, background ISR, on-demand ISG, and dynamic SSR streaming."
      />
      <link rel="canonical" href="https://dinou.dev/docs/rendering" />

      <div className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Static by Default
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Static &amp; Dynamic Rendering Strategies
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou is <strong>Static by Default</strong>. At the route level, it provides a clean continuum from build-time{" "}
              <strong>SSG</strong>, stale-while-revalidate <strong>ISR</strong>, and on-demand{" "}
              <strong>ISG</strong> to real-time <strong>Dynamic SSR</strong>.
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
                      <span>1. Static by Default (SSG)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Routes without dynamic dependencies are pre-rendered into
                    immutable HTML and RSC payloads at build time, serving in ~1.45ms from Dinou&apos;s cache.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <RefreshCw className="h-5 w-5" />
                      <span>2. Background ISR &amp; ISG</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Refresh cached pages in the background with <code>revalidate &gt;= 1</code> (ISR) or generate long-tail dynamic paths on their first visit (ISG).
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                      <Server className="h-5 w-5" />
                      <span>3. Dynamic Bailout (SSR)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    When a page reads cookies, request headers, or sets <code>revalidate = 0</code>, Dinou automatically transitions the route to <strong>Live SSR</strong> on every request.
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-50/40 dark:bg-purple-950/20 not-prose flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-purple-500" />
                    <span>Beyond All-or-Nothing Route Rendering</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Need to combine static shells, cached subtrees, and independent layout TTLs on the same route? Explore Dinou&apos;s{" "}
                    <strong>3D Layered Segmentation</strong> (PPR, <code>&lt;DinouCacheSlot&gt;</code>, and <code>layout_functions.ts</code>).
                  </p>
                </div>
                <Link
                  href="/docs/3d-segmentation"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 transition-colors shrink-0"
                >
                  <span>3D Segmentation Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
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
                Pure static rendering pre-generates HTML and RSC Flight files during the build phase (<code>dinou build</code>). Production server startup is instantaneous, and static pages achieve the fastest possible Time
                to First Byte (TTFB) directly from Dinou&apos;s built-in cache.
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
                  In standard route-level rendering (without Partial Prerendering), if a Server Component reads request-specific data at render
                  time, Dinou automatically &ldquo;bails out&rdquo; of static generation and
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

  // ⚠️ Reading cookies triggers an Automatic Static Bailout
  // This page will now be rendered dynamically on every incoming request
  const sessionToken = context.req.cookies["session_token"];
  const user = await db.users.findByToken(sessionToken);

  return <h1>Welcome back, {user?.name}</h1>;
}`}
                </CodeBlock>

                <Alert className="not-prose mt-4">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <AlertTitle>Bailout Triggers on the Server</AlertTitle>
                  <AlertDescription>
                    Automatic bailout occurs when reading properties on <code>context.req.cookies</code>,{" "}
                    <code>context.req.headers</code>, or <code>context.req.query</code>, calling{" "}
                    <code>useSearchParams()</code> inside a <strong>Server Component</strong>, or mutating the response (<code>context.res.cookie()</code>,{" "}
                    <code>clearCookie()</code>, <code>setHeader()</code>, <code>status()</code>, <code>redirect()</code>) during Server Component or <code>getProps</code> execution. Calling{" "}
                    <code>getContext()</code> alone (or reading <code>context.req.path</code>, <code>context.req.method</code>, or <code>context.env</code>) preserves static rendering. (To isolate a bailout to a single <code>&lt;Suspense&gt;</code> hole without de-optimizing the rest of the page, see{" "}
                    <Link href="/docs/3d-segmentation#partial-prerendering" className="underline font-medium">
                      Partial Prerendering (PPR)
                    </Link>
                    ).
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg p-5 bg-muted/20 not-prose mt-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>What about Client Components and <code>useSearchParams()</code>?</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Client Components (<code>&quot;use client&quot;</code>) that call <code>useSearchParams()</code> <strong>never trigger dynamic bailout</strong>. The route remains 100% eligible for static pre-rendering (SSG), on-demand ISG caching, background ISR regeneration, static PPR shells, and pure static exports (<code>export-static</code>).
                  </p>

                  <div className="border-t border-border/60 pt-3 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <span className="text-emerald-500">✅</span>
                        <span>Zero-Boilerplate Hydration Safety</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Dinou&apos;s <code>useSearchParams()</code> hook automatically prevents React hydration mismatches on cached static and PPR pages. During static HTML generation and the browser&apos;s initial hydration pass, it deterministically returns an empty <code>URLSearchParams</code> instance (matching the cached HTML), and immediately re-renders on the client with the live URL query string—no manual <code>useState</code> or <code>useEffect</code> wrapper needed:
                      </p>
                    </div>

                    <CodeBlock
                      language="tsx"
                      containerClassName="w-full overflow-hidden rounded-lg text-xs"
                    >
{`// src/components/search-filter.tsx
"use client";

import { useSearchParams } from "dinou";

export function SearchFilter() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  if (!query) {
    return <span className="text-muted-foreground">Showing all items</span>;
  }

  return (
    <span>
      Filter: <strong>{query}</strong>
    </span>
  );
}`}
                    </CodeBlock>

                    <div className="bg-background/80 rounded-md p-3 border text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Alternative (Live SSR or PPR Hole): </span>
                      If the initial server HTML sent over the wire <em>must</em> already contain the query value (e.g. for search engine crawlers or server-filtered database queries), call <code>useSearchParams()</code> (or read <code>context.req.query</code>) inside a <strong>Server Component</strong>—either on a full Live SSR route (<code>export const revalidate: PageFunctions[&quot;revalidate&quot;] = 0;</code>) or wrapped in <code>&lt;Suspense&gt;</code> with <code>export const ppr = true;</code>.
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
                In Dinou, the <code>revalidate</code> export in{" "}
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
import type { PageFunctions } from "./dinou";

// Escapes static generation: executes dynamic SSR on every request
export const revalidate: PageFunctions["revalidate"] = 0;`}
                </CodeBlock>

                <Alert className="not-prose mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Migration from Legacy dynamic Export</AlertTitle>
                  <AlertDescription>
                    In older versions of Dinou, dynamic rendering was toggled
                    via <code>export function dynamic()</code>. In Dinou, the{" "}
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
import type { PageFunctions } from "./dinou";

// Rebuilds the cached page in the background at most once every 60 seconds
export const revalidate: PageFunctions["revalidate"] = 60;

// Or as a sync/async function:
// export const revalidate: PageFunctions["revalidate"] = () => 60;`}
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
                      omitted, the page remains cached until purged on demand via{" "}
                      <Link href="/docs/revalidation" className="underline font-medium">
                        <code>revalidatePage</code>, <code>revalidateLayout</code>, <code>revalidatePath</code>, or <code>revalidateTag</code>
                      </Link>
                      .
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* 3. ISG */}
            <section id="isg" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                3. Incremental Static Generation (ISG on-demand)
              </h3>
              <p>
                While ISR updates <em>existing</em> pre-rendered pages,{" "}
                <strong>ISG (Incremental Static Generation)</strong> generates{" "}
                <em>new</em> pages on demand that were not included in the initial
                build-time <code>getStaticPaths</code> list.
              </p>

              {/* 3.1 On-demand */}
              <section id="on-demand-generation" className="mt-6 scroll-mt-20">
                <h4>3.1. On-Demand Path Generation</h4>
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
import type { PageFunctions } from "./dinou";

// Pre-render only the top 10 products at build time
export const getStaticPaths: PageFunctions["getStaticPaths"] = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
];

// Any other ID (e.g. /products/452) will be generated on-demand
// on its first visitor and cached permanently.`}
                </CodeBlock>
              </section>

              {/* 3.2 Governance APIs */}
              <section id="isg-governance" className="mt-8 scroll-mt-20">
                <h4>3.2. Governance APIs (<code>validateParams</code> &amp; <code>allowISG</code>)</h4>
                <p>
                  Dinou provides strict server-side governance exports in{" "}
                  <code>page_functions.ts</code> and <code>layout_functions.ts</code> to secure
                  dynamic generation against abuse (see{" "}
                  <Link href="/docs/page-functions#validateparams">
                    Page &amp; Layout Functions
                  </Link>{" "}
                  for full details):
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
                        Validates dynamic parameters before generation. Returning{" "}
                        <code>false</code> halts rendering and returns 404
                        immediately.
                      </p>
                      <CodeBlock
                        language="typescript"
                        containerClassName="w-full overflow-hidden rounded-lg text-xs"
                      >
{`import type { PageFunctions } from "./dinou";

export const validateParams: PageFunctions["validateParams"] = (params) => {
  return typeof params?.id === "string" && /^\\d+$/.test(params.id);
};`}
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
                        Controls on-demand generation (accepts a <code>boolean</code> or sync/async function, and can also be defaulted globally in <code>dinou.config.ts</code>). When <code>false</code>, any path omitted from <code>getStaticPaths</code> returns 404 instantly.
                      </p>
                      <CodeBlock
                        language="typescript"
                        containerClassName="w-full overflow-hidden rounded-lg text-xs"
                      >
{`import type { PageFunctions } from "./dinou";

export const allowISG: PageFunctions["allowISG"] = false; // Strict SSG only`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* 4. Comparison Matrix */}
            <section
              id="comparison-matrix"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                4. Route-Level Rendering Strategies Matrix
              </h3>
              <p>
                Summary of the route-level rendering strategies supported natively by Dinou:
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
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.45ms (Cached)</td>
                      <td className="p-4 text-xs text-muted-foreground">Build-time</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">0 queries (Build-time only)</td>
                      <td className="p-4 text-xs text-muted-foreground">Landing pages, marketing, documentation</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">ISR</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">revalidate = N (N &gt;= 1)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">~1.18ms (Cached SWR)</td>
                      <td className="p-4 text-xs text-amber-600 dark:text-amber-400 font-medium">Stale-while-revalidate</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">1 query per TTL (0 on cache hits)</td>
                      <td className="p-4 text-xs text-muted-foreground">Blogs, catalogs, news feeds</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">ISG (Incremental Static)</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">allowISG = true (default)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Cached (after 1st hit)</td>
                      <td className="p-4 text-xs text-muted-foreground">Cached permanently (or per ISR TTL)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">1 query on 1st generation (0 thereafter)</td>
                      <td className="p-4 text-xs text-muted-foreground">Long-tail e-commerce products, dynamic paths</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-foreground">Dynamic SSR</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">revalidate = 0 (or request data access)</td>
                      <td className="p-4 text-xs text-rose-600 dark:text-rose-400 font-medium">Request-time (Streams via &lt;Suspense&gt;)</td>
                      <td className="p-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">100% Real-time</td>
                      <td className="p-4 text-xs text-rose-600 dark:text-rose-400 font-medium">Heavy: 100% queries on every request</td>
                      <td className="p-4 text-xs text-muted-foreground">User settings, banking, checkout</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </div>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
