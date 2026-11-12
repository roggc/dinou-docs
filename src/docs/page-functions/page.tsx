import { Link } from "dinou";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Badge } from "@/docs/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  FileCode,
  FolderTree,
  Layers,
  Zap,
  Cpu,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Settings,
  Database,
  ShieldCheck,
  Tag,
  Sparkles,
  Split,
  Timer,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";

const tocItems = [
  {
    id: "overview",
    title: "Overview & Horizontal Segmentation",
    level: 2,
  },
  {
    id: "getprops",
    title: "1. getProps (Direct Component Props)",
    level: 2,
  },
  {
    id: "getstaticpaths",
    title: "2. getStaticPaths (Static Generation)",
    level: 2,
  },
  {
    id: "constant-vs-function",
    title: "2.1. Constant Array vs Function Export",
    level: 3,
  },
  {
    id: "return-formats",
    title: "2.2. Return Formats",
    level: 3,
  },
  {
    id: "simple-routes",
    title: "2.3. Simple Dynamic Routes",
    level: 3,
  },
  {
    id: "catch-all-routes",
    title: "2.4. Catch-all Routes",
    level: 3,
  },
  {
    id: "route-propagation",
    title: "2.5. Automatic Route Propagation (Recursion)",
    level: 3,
  },
  {
    id: "chain-of-responsibility",
    title: "2.6. Nested Pages & 'Chain of Responsibility'",
    level: 3,
  },
  {
    id: "nested-complex-routes",
    title: "2.7. Nested & Pass-through Segments",
    level: 3,
  },
  {
    id: "async-support",
    title: "2.8. Async Support (CMS & DB)",
    level: 3,
  },
  {
    id: "validateparams",
    title: "3. validateParams (Segment Parameter Validation)",
    level: 2,
  },
  {
    id: "allowisg",
    title: "4. allowISG (On-Demand ISG Control)",
    level: 2,
  },
  {
    id: "revalidate",
    title: "5. revalidate (ISR & Dynamic SSR Escape)",
    level: 2,
  },
  {
    id: "getcachetags",
    title: "6. getCacheTags (Cache Tagging)",
    level: 2,
  },
  {
    id: "ppr",
    title: "7. ppr (Partial Prerendering)",
    level: 2,
  },
  {
    id: "consolidated-config",
    title: "8. Consolidated Config Object (export default)",
    level: 2,
  },
  {
    id: "config-advantages",
    title: "8.1. Developer Experience & Advantages",
    level: 3,
  },
  {
    id: "config-precedence",
    title: "8.2. Hybrid Model & Precedence Rules",
    level: 3,
  },
  {
    id: "config-generics",
    title: "8.3. Flexible Generics Typing",
    level: 3,
  },
  {
    id: "config-layout",
    title: "8.4. Applicability to layout_functions",
    level: 3,
  },
  {
    id: "type-safe-example",
    title: "9. End-to-End Type-Safe Example",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Page & Layout Functions | Dinou Docs</title>
      <meta
        name="description"
        content="Dinou features 3D Horizontal Layered Segmentation. Route configuration and server lifecycles are decoupled into page_functions.ts and layout_functions.ts."
      />
      <link rel="canonical" href="https://dinou.dev/docs/page-functions" />

      <div className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                3D Horizontal Segmentation
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Page & Layout Functions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou features{" "}
              <strong>3D Horizontal Layered Segmentation</strong>. Route
              configuration and server lifecycle functions are cleanly decoupled
              into <code>page_functions.ts</code> (for <code>page.tsx</code>) and{" "}
              <code>layout_functions.ts</code> (for <code>layout.tsx</code>).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview &amp; Horizontal Segmentation</h2>
              <p>
                In Dinou, every route segment can independently configure its
                data fetching, static pre-rendering, cache lifecycles, and
                validation without cluttering component UI code.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6 min-w-0">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <FileCode className="h-5 w-5" />
                      <span>page_functions.ts</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>
                      Placed alongside <code>page.tsx</code>. Configures data
                      fetching (<code>getProps</code>), static paths, ISR, PPR,
                      and validation specifically for that page.
                    </p>
                    <div className="font-mono text-xs text-muted-foreground bg-muted p-2 rounded">
                      src/blog/[slug]/page_functions.ts
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                      <Split className="h-5 w-5" />
                      <span>layout_functions.ts</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>
                      Placed alongside <code>layout.tsx</code> (also supports{" "}
                      <code>layout.functions.ts</code>). Supplies data
                      directly to the layout component and manages segment-level
                      cache strategy independently from child pages.
                    </p>
                    <div className="font-mono text-xs text-muted-foreground bg-muted p-2 rounded">
                      src/blog/layout_functions.ts
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="my-6 p-5 sm:p-6 rounded-xl border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 not-prose space-y-4">
                <div className="flex items-center gap-2 font-bold text-base text-blue-700 dark:text-blue-300">
                  <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>The Unified Architectural Contract: RouteSegmentConfig&lt;TParams, TProps&gt;</span>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In Dinou, every server-side configuration file implements the exact same foundational contract: <strong><code>RouteSegmentConfig</code></strong>. 
                  This is the framework&apos;s underlying &quot;abstract&quot; interface defining all segment capabilities. For day-to-day application code, Dinou exports two concrete, role-based aliases—<strong><code>PageFunctions</code></strong> (for pages) and <strong><code>LayoutFunctions</code></strong> (for layouts)—available both from <code>&quot;dinou&quot;</code> (with explicit route pattern strings) and from each route directory&apos;s auto-generated <code>&quot;./dinou&quot;</code> module (with <code>params</code> pre-bound automatically):
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// Exported from "dinou" (dinou/index.d.ts):

/**
 * Foundational "abstract" interface governing all route segments in Dinou.
 */
export interface RouteSegmentConfig<
  TParams = any,
  TProps = any,
  TStaticPathParams = TParams
> {
  // Partial Prerendering (PPR) configuration
  ppr?: boolean | (() => boolean | Promise<boolean>);

  // Cache & revalidation strategy (< 1 = Dynamic SSR, >= 1 = ISR, false = Static)
  revalidate?: number | false | (() => number | false | Promise<number | false>);

  // Cache tags for on-demand invalidation via revalidateTag(tag)
  getCacheTags?: string[] | ((params?: TParams) => string[] | Promise<string[]>);

  // Path generator for SSG (constant array or sync/async function)
  getStaticPaths?:
    | StaticPathItem<TStaticPathParams>[]
    | (() => StaticPathsResult<TStaticPathParams>);

  // Server loader providing direct props to the component
  getProps?: (params?: TParams) => TProps | Promise<TProps>;

  // Parameter validator guard (returns false to halt and return 404)
  validateParams?: (params?: TParams) => boolean | Promise<boolean>;

  // Controls whether Incremental Static Generation (ISG) is allowed for ungenerated paths
  allowISG?: boolean | (() => boolean | Promise<boolean>);
}

/**
 * Concrete semantic alias for 'page_functions.ts' (imported from "dinou").
 * Accepts a route pattern string (e.g. "/blog/[slug]") or a params dictionary.
 * (Or import PageFunctions<TProps> from "./dinou" with RouteParams pre-bound!)
 */
export type PageFunctions<
  TRouteOrParams extends DinouRoutePattern | object = any,
  TProps = any
> = RouteSegmentConfig<
  0 extends 1 & TRouteOrParams
    ? any
    : [TRouteOrParams] extends [DinouRoutePattern]
      ? RouteParams<Extract<TRouteOrParams, DinouRoutePattern>>
      : TRouteOrParams,
  TProps,
  0 extends 1 & TRouteOrParams
    ? any
    : [TRouteOrParams] extends [DinouRoutePattern]
      ? StaticPathParams<Extract<TRouteOrParams, DinouRoutePattern>>
      : ToStaticPathParams<TRouteOrParams>
>;

/**
 * Concrete semantic alias for 'layout_functions.ts' (imported from "dinou").
 * Accepts any DinouLayoutPattern (including intermediate layouts without a sibling page.tsx,
 * e.g. "/[org]" or "/workspace/[org]") or a params dictionary.
 * (Or import LayoutFunctions<TProps> from "./dinou" with LayoutParams pre-bound!)
 */
export type LayoutFunctions<
  TRouteOrParams extends DinouLayoutPattern | object = any,
  TProps = any
> = RouteSegmentConfig<
  0 extends 1 & TRouteOrParams
    ? any
    : [TRouteOrParams] extends [DinouLayoutPattern]
      ? LayoutParams<Extract<TRouteOrParams, DinouLayoutPattern>>
      : TRouteOrParams,
  TProps,
  0 extends 1 & TRouteOrParams
    ? any
    : [TRouteOrParams] extends [DinouLayoutPattern]
      ? StaticPathParams<Extract<TRouteOrParams, DinouLayoutPattern>>
      : ToStaticPathParams<TRouteOrParams>
>;`}
                </CodeBlock>

                {/* Practical Quick Rule */}
                <div className="rounded-lg border bg-background/80 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="w-1/3 text-xs font-semibold">Where to use</TableHead>
                        <TableHead className="w-1/3 text-xs font-semibold">Type to import</TableHead>
                        <TableHead className="text-xs font-semibold">Purpose</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                          src/.../page_functions.ts
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-foreground">
                          PageFunctions <span className="font-normal text-muted-foreground">(<code>&quot;./dinou&quot;</code> or <code>&quot;dinou&quot;</code>)</span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Types data loading (<code>getProps</code>), static paths, and cache for the <strong>page</strong>.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          src/.../layout_functions.ts
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-foreground">
                          LayoutFunctions <span className="font-normal text-muted-foreground">(<code>&quot;./dinou&quot;</code> or <code>&quot;dinou&quot;</code>)</span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Types data loading (<code>getProps</code>) and independent cache for the <strong>layout</strong> shell.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                          Plugins &amp; Shared Utils
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-foreground">
                          RouteSegmentConfig <span className="font-normal text-muted-foreground">(<code>&quot;dinou&quot;</code>)</span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Base &quot;abstract&quot; interface for generic utilities that process arbitrary route segments.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* 3 Architectural Reasons for Separation */}
                <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
                  <Card className="border-blue-500/20 bg-background/60 min-w-0">
                    <CardHeader className="pb-2">
                      <div className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                        <FileCode className="h-4 w-4 text-blue-500" />
                        1. Semantic Intent
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed">
                      Seeing <code>import type &#123; PageFunctions &#125;</code> in a page file immediately clarifies intent and self-documents that the functions belong to the page tier.
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-500/20 bg-background/60 min-w-0">
                    <CardHeader className="pb-2">
                      <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                        <Split className="h-4 w-4 text-indigo-500" />
                        2. Mental Separation
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed">
                      Reinforces Dinou&apos;s horizontal segment isolation: layouts have independent cacheLifetimes and props from child pages.
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-500/20 bg-background/60 min-w-0">
                    <CardHeader className="pb-2">
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        3. Future Extensibility
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed">
                      If future Dinou versions introduce layout-only properties (e.g. scroll boundaries) or page-only hooks, your application code remains completely decoupled and non-breaking.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* 1. getProps */}
            <section id="getprops" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                1. <code>getProps</code> (Direct Component Props)
              </h3>
              <p>
                Use <code>getProps</code> to load data on the server based on route{" "}
                <code>params</code> and pass it directly to your component.
              </p>

              <Alert className="not-prose my-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle>Direct Return Contract</AlertTitle>
                <AlertDescription>
                  In Dinou, <code>getProps</code> directly returns the props
                  object (<code>{`{ ... }`}</code>). The legacy wrapper{" "}
                  <code>{`{ page: { ... }, layout: { ... } }`}</code> has been
                  deprecated because pages and layouts now have their own
                  dedicated configuration files.
                </AlertDescription>
              </Alert>

              <div className="border rounded-lg p-4 bg-card not-prose my-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <FileCode className="h-5 w-5 text-blue-500" />
                  <span>Signature &amp; Behavior</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <strong>Arguments:</strong> <code>params?: TParams</code>{" "}
                    (The normalized dynamic route parameters)
                  </li>
                  <li>
                    <strong>Returns:</strong> <code>TProps | Promise&lt;TProps&gt;</code>{" "}
                    (Injected directly as the component's props)
                  </li>
                  <li>
                    <strong>Streaming Un-Awaited Promises (React 19 <code>use()</code>):</strong>{" "}
                    <code>getProps</code> can also start non-critical queries{" "}
                    <strong>without <code>await</code></strong> and return raw{" "}
                    <code>Promise</code> properties (e.g.{" "}
                    <code>&#123; post, commentsPromise &#125;</code>) so a Client
                    Component wrapped in <code>&lt;Suspense&gt;</code> can unwrap
                    them via React 19&apos;s <code>use(commentsPromise)</code>{" "}
                    without blocking initial TTFB.
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-2">
                    Example: Type-Safe Page Component &amp; Props
                  </p>
                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "page_functions",
                        label: "page_functions.ts",
                        language: "typescript",
                        code: `// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "./dinou";
import { db, type Post } from "@/lib/db";

export interface BlogPostData {
  post: Post;
}

// "./dinou" pre-binds { slug: string } automatically for this directory
// (or import from "dinou" and write PageFunctions<"/blog/[slug]", BlogPostData>["getProps"])
export const getProps: PageFunctions<BlogPostData>["getProps"] = async (params) => {
  const post = await db.getPost(params?.slug);
  // Directly returns BlogPostData for page.tsx
  return { post };
};`,
                      },
                      {
                        id: "page",
                        label: "page.tsx",
                        language: "tsx",
                        code: `// src/blog/[slug]/page.tsx
import type { PageProps } from "./dinou";
import type { BlogPostData } from "./page_functions";

// PageProps<BlogPostData> merges pre-bound { params: { slug: string } } with BlogPostData
// (or import PageProps from "dinou" and write PageProps<"/blog/[slug]", BlogPostData>)
export default function BlogPost({ params, post }: PageProps<BlogPostData>) {
  return (
    <article>
      <span className="text-xs text-muted-foreground">Route: /blog/{params.slug}</span>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`,
                      },
                    ]}
                  />
                </div>

                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-2">
                    Example: Type-Safe Layout Component &amp; Props
                  </p>
                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "layout_functions",
                        label: "layout_functions.ts",
                        language: "typescript",
                        code: `// src/blog/layout_functions.ts
import type { LayoutFunctions } from "./dinou";
import { db } from "@/lib/db";

export interface BlogLayoutData {
  categories: string[];
}

// "./dinou" pre-binds layout params automatically
// (or import from "dinou" and write LayoutFunctions<"/blog", BlogLayoutData>["getProps"])
export const getProps: LayoutFunctions<BlogLayoutData>["getProps"] = async () => {
  const categories = await db.getCategories();
  // Directly returns props for layout.tsx
  return { categories };
};`,
                      },
                      {
                        id: "layout",
                        label: "layout.tsx",
                        language: "tsx",
                        code: `// src/blog/layout.tsx
import type { LayoutProps } from "./dinou";
import type { BlogLayoutData } from "./layout_functions";

// LayoutProps<BlogLayoutData> types children, params, @slots, and BlogLayoutData
// (or import LayoutProps from "dinou" and write LayoutProps<"/blog", BlogLayoutData>)
export default function BlogLayout({
  children,
  categories,
}: LayoutProps<BlogLayoutData>) {
  return (
    <div className="blog-shell">
      <BlogSidebar categories={categories} />
      <main>{children}</main>
    </div>
  );
}`,
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="not-prose my-8 rounded-xl border border-blue-500/20 bg-gradient-to-b from-blue-50/40 via-background to-muted/20 dark:from-blue-950/20 dark:via-background dark:to-muted/10 p-5 sm:p-6 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
                        <Cpu className="h-4 w-4" />
                      </span>
                      <h4 className="text-base font-bold text-foreground">
                        Deep-Dive Architecture: Why <code>getProps</code> Only Receives <code>params</code> &amp; The Dynamic Bailout Mechanism
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Learn why Dinou separates route parameters (<code>params</code>) from dynamic request data (<code>cookies</code>, <code>headers</code>, and <code>query params</code>), how accessing them in <code>getProps</code> triggers an automatic switch to dynamic rendering (bailout), and how to stream cookie- or auth-dependent components with React <code>&lt;Suspense&gt;</code> without delaying the initial HTML delivery.
                    </p>
                  </div>
                </div>

                {/* The Core Architectural Reason: Resource Identity vs Connection Data */}
                <div className="rounded-lg border bg-card p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Resource Identity &amp; Cache Integrity</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Route <code>params</code> (e.g. <code>/blog/[slug]</code>) identify the <em>resource</em>, not the visitor. Because the content for a given route is identical for everyone, Dinou can run <code>getProps</code> in advance—at build time (SSG) or on first request (ISR)—and safely pre-render and cache the HTML (in static storage, server memory, reverse proxies, or CDNs). In contrast, <code>cookies</code>, <code>headers</code>, and <code>query params</code> belong to a specific HTTP connection. If <code>getProps</code> relied on them, the output could contain private user data, making shared caching impossible and forcing the server to render every request on demand.
                  </p>
                </div>

                {/* Grid 2: What triggers Bailout */}
                <div className="rounded-lg border overflow-hidden bg-card">
                  <div className="bg-muted/50 px-4 py-3 border-b flex items-center justify-between">
                    <div className="text-xs font-semibold text-foreground flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>The Dynamic Bailout Mechanism: Why It Exists &amp; When It Triggers</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">Cache Protection</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Dinou features an automatic <strong>bailout mechanism</strong> that is essential for cache integrity: it guarantees that personalized or per-request data is never accidentally baked into public static HTML or shared caches. Calling <code>getContext()</code> itself <strong>does NOT</strong> trigger a bailout; the switch to Dynamic SSR happens only when your code actually reads request-specific properties:
                    </p>

                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/20">
                          <TableHead className="w-1/3 text-xs">Property Accessed</TableHead>
                          <TableHead className="w-1/4 text-xs">Behavior</TableHead>
                          <TableHead className="text-xs">Why?</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400 font-semibold">
                            req.cookies
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                              Bailout to Dynamic
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            Session tokens and user identity vary per request; cannot be cached statically.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400 font-semibold">
                            req.headers
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                              Bailout to Dynamic
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            Request headers (e.g. <code>authorization</code>, <code>user-agent</code>) are unique per connection.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400 font-semibold">
                            req.query / RSC useSearchParams()
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                              Bailout to Dynamic
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            URL query parameters (<code>?q=...</code>) read on the server are unconstrained runtime inputs.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                            req.path, req.method
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                              Preserves Static
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            The normalized segment path is deterministic and safe during SSG/ISR generation.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Grid 3: Why PPR Cannot Save getProps */}
                <div className="rounded-lg border bg-amber-500/10 border-amber-500/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>Why Partial Prerendering (PPR) Cannot Prevent getProps Bailout</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Inside Server Components, Partial Prerendering (PPR) can isolate dynamic accesses inside <code>&lt;Suspense&gt;</code> boundaries while preserving the static shell. However, <strong><code>getProps</code> executes outside React before component rendering begins</strong>. Because <code>getProps</code> is never wrapped by a <code>&lt;Suspense&gt;</code> boundary, reading <code>cookies</code> or <code>query</code> inside <code>getProps</code> forces the entire route to bail out from static generation directly into Dynamic SSR.
                  </p>
                </div>

                {/* Practical Architecture: Where to Handle Each Data Type */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>The Recommended Pattern: Where Each Type of Data Belongs</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      With Partial Prerendering (<code>ppr = true</code>), keep the page shell pre-rendered and instant (0ms TTFB) by organizing each data source into its natural layer: route data in <code>getProps</code>, session cookies inside <code>&lt;Suspense&gt;</code>, and query parameters via the universal <code>useSearchParams()</code> hook (in Server Components inside <code>&lt;Suspense&gt;</code>, or in Client Components inside the static shell):
                    </p>
                  </div>

                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "page_functions",
                        label: "page_functions.ts (Route)",
                        language: "typescript",
                        code: `// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";
import { db, type Post } from "@/lib/db";

export interface BlogPostData {
  post: Post;
}

// Enable PPR so <Suspense> isolates cookies/query holes while preserving the Static Shell
export const ppr: PageFunctions["ppr"] = true;

// 1. Pure route loader: depends solely on params
// Pre-rendered & cached statically for all visitors (SSG / ISR)
export const getProps: PageFunctions<"/blog/[slug]", BlogPostData>["getProps"] = async (params) => {
  const post = await db.getPost(params?.slug);
  return { post };
};`,
                      },
                      {
                        id: "page",
                        label: "page.tsx (Page Shell)",
                        language: "tsx",
                        code: `// src/blog/[slug]/page.tsx
import { Suspense } from "react";
import type { PageProps } from "./dinou";
import type { BlogPostData } from "./page_functions";
import { UserSession } from "./user-session";
import { RelatedPosts } from "./related-posts";
import { SearchFilter } from "./search-filter";

export default function BlogPostPage({ params, post }: PageProps<BlogPostData>) {
  return (
    <article className="post-container">
      {/* 1. Instant static shell: delivered immediately from cache (0ms TTFB) */}
      <header>
        <span className="text-xs text-muted-foreground">Route: /blog/{params.slug}</span>
        <h1>{post.title}</h1>
        {/* Client Component using useSearchParams(): stays in Static Shell, syncs in browser */}
        <SearchFilter />
      </header>

      <div className="post-body">{post.content}</div>

      {/* 2. Dynamic cookie component quarantined & streamed via Suspense (with ppr = true) */}
      <Suspense fallback={<div className="text-xs text-muted-foreground">Loading session...</div>}>
        <UserSession />
      </Suspense>

      {/* 3. Server Component using useSearchParams() streamed via Suspense (with ppr = true) */}
      <Suspense fallback={<div className="text-xs text-muted-foreground">Filtering articles...</div>}>
        <RelatedPosts />
      </Suspense>
    </article>
  );
}`,
                      },
                      {
                        id: "user_session",
                        label: "user-session.tsx (Cookies)",
                        language: "tsx",
                        code: `// src/blog/[slug]/user-session.tsx (Server Component)
import { getContext } from "dinou";
import { auth } from "@/lib/auth";

// With ppr = true, isolating cookie & auth access inside <Suspense>
// streams user state per request while keeping getProps & the post shell static!
export async function UserSession() {
  const sessionToken = getContext()?.req.cookies.session;
  const user = sessionToken ? await auth.verify(sessionToken) : null;

  if (!user) {
    return <a href="/login" className="text-xs font-semibold">Sign In</a>;
  }

  return (
    <aside className="user-badge">
      <span>Welcome back, <strong>{user.name}</strong>!</span>
    </aside>
  );
}`,
                      },
                      {
                        id: "related_posts",
                        label: "related-posts.tsx (Server Query)",
                        language: "tsx",
                        code: `// src/blog/[slug]/related-posts.tsx (Server Component)
import { useSearchParams } from "dinou";
import { db } from "@/lib/db";

// Universal hook in a Server Component (sync or async):
// Reads ctx.req.query on the server. With ppr = true, wrapping it in <Suspense>
// turns this boundary into a Dynamic PPR Hole so the post shell stays static!
export async function RelatedPosts() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") ?? "featured";
  const articles = await db.getPostsByTag(tag);

  return (
    <section className="related-posts">
      <h3>Articles matching "?tag={tag}"</h3>
      <ul>
        {articles.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </section>
  );
}`,
                      },
                      {
                        id: "search_filter",
                        label: "search-filter.tsx (Client Query)",
                        language: "tsx",
                        code: `// src/blog/[slug]/search-filter.tsx (Client Component)
"use client";

import { useSearchParams } from "dinou";

// Universal hook in a Client Component:
// Stays baked in the Static Shell (does NOT open a server hole), hydrates cleanly
// on any ?tag=... URL, and syncs query params immediately in the browser!
export function SearchFilter() {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") ?? "";

  return (
    <input
      key={currentTag}
      type="search"
      defaultValue={currentTag}
      placeholder="Filter by tag (?tag=...)..."
      className="text-xs border rounded px-2 py-1"
    />
  );
}`,
                      },
                    ]}
                  />

                  {/* Key Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 min-w-0">
                    <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                      <span className="text-xs font-bold text-foreground">1. Route Data (Params)</span>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Handled in <code>getProps</code>. Pure and cacheable for all visitors (SSG/ISR).
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                      <span className="text-xs font-bold text-foreground">2. Cookies &amp; Headers</span>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        With <code>ppr = true</code>, read in Server Components inside <code>&lt;Suspense&gt;</code> to stream without bailing out the static shell.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                      <span className="text-xs font-bold text-foreground">3. Universal useSearchParams()</span>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Works in <strong>Server Components</strong> (streamed hole inside <code>&lt;Suspense&gt;</code> with <code>ppr = true</code>) and in <strong>Client Components</strong> (stays in static shell, syncs in browser).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. getStaticPaths */}
            <section
              id="getstaticpaths"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                2. <code>getStaticPaths</code> (Static Generation)
              </h3>
              <p>
                Defines which dynamic parameter combinations should be
                pre-rendered at build time (SSG) in both{" "}
                <code>page_functions.ts</code> and{" "}
                <code>layout_functions.ts</code> (for dynamic layouts). By
                default, any dynamic path not returned is generated on-demand
                when first requested and{" "}
                <strong>cached statically for all subsequent visitors</strong>{" "}
                (Incremental Static Generation / ISG), unless disabled via{" "}
                <code>allowISG: false</code>—either per segment or globally in{" "}
                <code>dinou.config.ts</code>—which strictly restricts that
                segment to its pre-rendered list and returns <code>404</code>{" "}
                for any other path.
              </p>

              {/* 2.1 Constant vs Function */}
              <section
                id="constant-vs-function"
                className="mt-6 scroll-mt-20"
              >
                <h4>2.1. Constant Array vs Function Export</h4>
                <p>
                  In Dinou, <code>getStaticPaths</code> supports both a{" "}
                  <strong>constant array export</strong> (for known, fixed paths)
                  and a <strong>synchronous or asynchronous function export</strong>{" "}
                  (for dynamic data sources like databases or headless CMSs):
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-4 min-w-0">
                  <Card className="min-w-0">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Constant Array Export</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Ideal for fixed sets of routes, locales, or documentation
                        sections without extra function execution overhead:
                      </p>
                      <CodeBlock language="typescript">
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";

// Best Practice: Type-safe constant array
export const getStaticPaths: PageFunctions<"/blog/[slug]">["getStaticPaths"] = [
  "foo",
  "bar",
];`}
                      </CodeBlock>
                    </CardContent>
                  </Card>

                  <Card className="min-w-0">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                        <Database className="h-5 w-5" />
                        <span>Function Export (Sync/Async)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Ideal for fetching IDs or slugs from external APIs or
                        databases at build time:
                      </p>
                      <CodeBlock language="typescript">
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";
import { db } from "@/lib/db";

// Best Practice: Type-safe async function loader
export const getStaticPaths: PageFunctions<"/blog/[slug]">["getStaticPaths"] = async () => {
  const ids = await db.getTopProductIds();
  return ids;
};`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 2.2 Return Formats */}
              <section id="return-formats" className="mt-8 scroll-mt-20">
                <h4>2.2. Return Formats</h4>
                <p>
                  Dinou accommodates simple, catch-all, and multi-segment
                  architectures with flexible item formats:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Route Type</th>
                        <th className="p-4">Accepted Format</th>
                        <th className="p-4">Example Return</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Simple</strong> (<code>[id]</code> or{" "}
                          <code>[slug]</code>)
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>string[]</code> | <code>number[]</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>[&quot;foo&quot;, &quot;bar&quot;]</code> or{" "}
                          <code>[1, 2, 3]</code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Optional Simple</strong> (<code>[[id]]</code> or{" "}
                          <code>[[slug]]</code>)
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>(string | number | undefined)[]</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>[undefined, &quot;foo&quot;, &quot;bar&quot;]</code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Catch-all</strong> (<code>[...slug]</code>)
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>string[][]</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>
                            [[&quot;a&quot;, &quot;b&quot;], [&quot;c&quot;]]
                          </code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Optional Catch-all</strong> (<code>[[...slug]]</code>)
                          <span className="block text-[11px] text-muted-foreground font-sans mt-0.5">
                            * Use <code>[]</code> (empty array) to pre-render the root path
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>(string[] | undefined)[]</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>
                            [[], [&quot;a&quot;], [&quot;a&quot;, &quot;b&quot;]]
                          </code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Nested / Multi-parameter</strong> (<code>[category]/[id]</code>)
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>Record&lt;string, string | number&gt;[]</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>
                            {`[{ category: "tech", id: "1" }]`}
                          </code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Complex Nested + Catch-all</strong> (<code>[lang]/[category]/[...slug]</code>)
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>Record&lt;string, string | string[]&gt;[]</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>
                            {`[{ lang: "en", category: "api", slug: ["v2", "auth"] }]`}
                          </code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>All-Inclusive Matrix</strong> (<code>shop/[category]/[id]/[[format]]/[[...tags]]</code>)
                          <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-sans mt-0.5">
                            * Respects Dinou&apos;s No-Gap Rule (optionals must be trailing)
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>Record&lt;string, string | number | string[] | undefined&gt;[]</code>
                        </td>
                        <td className="p-4 font-mono text-xs space-y-1.5">
                          <div>
                            <code>{`{ category: "shoes", id: 42, format: undefined, tags: undefined }`}</code>
                            <span className="block text-[11px] text-muted-foreground font-sans">→ Pre-renders: <code>/shop/shoes/42</code></span>
                          </div>
                          <div>
                            <code>{`{ category: "shoes", id: 42, format: "pdf", tags: ["sale", "pro"] }`}</code>
                            <span className="block text-[11px] text-muted-foreground font-sans">→ Pre-renders: <code>/shop/shoes/42/pdf/sale/pro</code></span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2.3 Simple Dynamic Routes */}
              <section id="simple-routes" className="mt-8 scroll-mt-20">
                <h4>2.3. Simple Dynamic Routes</h4>
                <p>
                  Simple dynamic routes match a single URL segment. Dinou supports both required segments (<code>[id]</code>) and optional segments (<code>[[category]]</code>):
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "standard-simple",
                        label: "Standard [id]",
                        language: "typescript",
                        code: `// src/blog/[id]/page_functions.ts
import type { PageFunctions } from "dinou";

// Best Practice: Type-safe constant array (string[] or number[])
export const getStaticPaths: PageFunctions<"/blog/[id]">["getStaticPaths"] = [
  "1",
  "2",
  "3",
];
// Generates /blog/1, /blog/2, /blog/3`,
                      },
                      {
                        id: "optional-simple",
                        label: "Optional [[category]]",
                        language: "typescript",
                        code: `// src/shop/[[category]]/page_functions.ts
import type { PageFunctions } from "dinou";

// Pass undefined to pre-render the base route without the segment
export const getStaticPaths: PageFunctions<"/shop/[[category]]">["getStaticPaths"] = [
  undefined,     // Generates /shop (root path, params.category will be undefined)
  "electronics", // Generates /shop/electronics
  "clothing",    // Generates /shop/clothing
];`,
                      },
                    ]}
                  />
                </div>

                <Alert className="not-prose mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Optional Simple: Root Path &amp; ES6 Default Values</AlertTitle>
                  <AlertDescription className="space-y-1.5 text-xs">
                    <div>
                      <strong>What to return in <code>getStaticPaths</code>:</strong> Return <code>undefined</code> to pre-render the base route without the optional segment (e.g. <code>/shop</code>).
                    </div>
                    <div>
                      <strong>What <code>page.tsx</code> receives:</strong> When visiting the root route, <code>params.category</code> is strictly <code>undefined</code> (never an empty string <code>&quot;&quot;</code> or <code>null</code>). This allows native JavaScript ES6 default destructuring to kick in seamlessly: <code>{`export default function Page({ params: { category = "all" } }: PageProps)`}</code>.
                    </div>
                  </AlertDescription>
                </Alert>
              </section>

              {/* 2.4 Catch-all Routes */}
              <section id="catch-all-routes" className="mt-8 scroll-mt-20">
                <h4>2.4. Catch-all Routes</h4>
                <p>
                  Catch-all routes match multiple dynamic path segments. Dinou supports both standard catch-alls (<code>[...slug]</code>) and optional catch-alls (<code>[[...slug]]</code>):
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "standard-catchall",
                        label: "Standard [...slug]",
                        language: "typescript",
                        code: `// src/docs/[...slug]/page_functions.ts
import type { PageFunctions } from "dinou";

// Best Practice: Type-safe catch-all segments (string[][])
// Each entry represents an array of path segments
export const getStaticPaths: PageFunctions<"/docs/[...slug]">["getStaticPaths"] = [
  ["intro"],             // Generates /docs/intro
  ["api", "v1", "auth"], // Generates /docs/api/v1/auth
];`,
                      },
                      {
                        id: "optional-catchall",
                        label: "Optional [[...slug]]",
                        language: "typescript",
                        code: `// src/docs/[[...slug]]/page_functions.ts
import type { PageFunctions } from "dinou";

// Pass an empty array [] to pre-render the root route (/docs)
export const getStaticPaths: PageFunctions<"/docs/[[...slug]]">["getStaticPaths"] = [
  [],                    // Generates /docs (root path)
  ["intro"],             // Generates /docs/intro
  ["api", "v1", "auth"], // Generates /docs/api/v1/auth
];`,
                      },
                    ]}
                  />
                </div>

                <Alert className="not-prose mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Optional Catch-all: Root Path &amp; Param Guarantee</AlertTitle>
                  <AlertDescription className="space-y-1.5 text-xs">
                    <div>
                      <strong>What to return in <code>getStaticPaths</code>:</strong> To pre-render the root page without any segments (e.g. <code>/docs</code>), return an empty array <code>[]</code> (or <code>undefined</code>). <em>Never</em> return <code>[undefined]</code> or <code>[[undefined]]</code>.
                    </div>
                    <div>
                      <strong>What <code>page.tsx</code> receives:</strong> In Dinou, <code>params.slug</code> is <strong>guaranteed to always be an array</strong> (<code>string[]</code>) at both runtime and compile time (<code>PageProps</code>, <code>LayoutProps</code>, and <code>getProps</code>)—while remaining optional when constructing links (<code>&lt;Link href=&quot;/docs/[[...slug]]&quot; /&gt;</code>) or object entries in <code>getStaticPaths</code>. For the root page, it receives an empty array <code>[]</code> (length 0). It is <strong>never</strong> <code>undefined</code>, <strong>never</strong> <code>[undefined]</code>, and <strong>never</strong> a bare string. You can safely call <code>params.slug.join(&quot;/&quot;)</code> or <code>params.slug.length</code> directly under TypeScript <code>strict: true</code> without defensive checks.
                    </div>
                  </AlertDescription>
                </Alert>
              </section>

              {/* 2.5 Route Propagation */}
              <section id="route-propagation" className="mt-8 scroll-mt-20">
                <h4>2.5. Automatic Route Propagation (Recursion)</h4>
                <p>
                  Static parameters automatically{" "}
                  <strong>propagate downwards</strong> through the directory tree.
                  If you define values for a segment, Dinou will recursively
                  generate all nested static sub-pages under those values.
                </p>

                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <FolderTree className="h-5 w-5 text-green-500" />
                    <span>Propagation Hierarchy Example</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="font-mono">
                      - <code>src/blog/[slug]/page.tsx</code> (+{" "}
                      <code>page_functions.ts</code>)
                    </div>
                    <div className="font-mono">
                      - <code>src/blog/[slug]/details/page.tsx</code> (Nested
                      static page)
                    </div>
                    <p className="mt-2">
                      If <code>getStaticPaths</code> in <code>blog/[slug]</code>{" "}
                      returns <code>[&quot;post-a&quot;, &quot;post-b&quot;]</code>,
                      Dinou automatically generates <strong>4 static pages</strong>:
                    </p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>
                        <code>/blog/post-a</code>
                      </li>
                      <li>
                        <code>/blog/post-a/details</code>
                      </li>
                      <li>
                        <code>/blog/post-b</code>
                      </li>
                      <li>
                        <code>/blog/post-b/details</code>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* 2.6 Chain of Responsibility */}
              <section
                id="chain-of-responsibility"
                className="mt-8 scroll-mt-20"
              >
                <h4>2.6. Nested Pages &amp; The &quot;Chain of Responsibility&quot;</h4>
                <p>
                  When nesting routes where <strong>both the parent and the child segment have their own <code>page.tsx</code></strong>, static generation follows a strict top-down &quot;chain of responsibility&quot;:
                </p>

                {/* Route Tree Diagram */}
                <div className="border rounded-lg p-4 bg-muted/30 not-prose my-4 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <FolderTree className="h-4 w-4 text-primary" />
                    <span>Example Project Structure: <code>/shop/[category]/[id]</code></span>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground space-y-1 pl-6 border-l-2 border-border ml-2">
                    <div>📁 <code>src/shop/[category]/</code></div>
                    <div className="pl-4">├── 📄 <code>page.tsx</code> <span className="text-foreground font-sans text-[11px]">(Parent page: <code>/shop/[category]</code>)</span></div>
                    <div className="pl-4">├── ⚙️ <code>page_functions.ts</code> <span className="text-foreground font-sans text-[11px]">(Parent gatekeeper)</span></div>
                    <div className="pl-4">└── 📁 <code>[id]/</code></div>
                    <div className="pl-8">├── 📄 <code>page.tsx</code> <span className="text-foreground font-sans text-[11px]">(Child page: <code>/shop/[category]/[id]</code>)</span></div>
                    <div className="pl-8">└── ⚙️ <code>page_functions.ts</code> <span className="text-foreground font-sans text-[11px]">(Child loader)</span></div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Because the parent folder contains a <code>page.tsx</code>, Dinou must generate valid parent pages first before it can traverse down to the child level. The parent acts as a <strong>mandatory gatekeeper</strong>:
                </p>

                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6 not-prose my-6 min-w-0">
                  {/* Broken Chain */}
                  <div className="w-full min-w-0 mb-6 md:mb-0">
                    <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-900/10 h-full min-w-0">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                          <XCircle className="h-5 w-5 flex-shrink-0" />
                          <span>❌ Broken Chain</span>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p>
                          If <code>src/shop/[category]/page_functions.ts</code> returns an empty array <code>[]</code>:
                        </p>
                        <ol className="list-decimal pl-4 space-y-1 text-xs text-muted-foreground">
                          <li>
                            Dinou attempts to build parent category routes (<code>/shop/[category]</code>).
                          </li>
                          <li>
                            Since <code>[]</code> is returned, no parent category folders or HTML files are created.
                          </li>
                          <li>
                            <strong>Result:</strong> Dinou halts at the parent level. It never invokes the child <code>[id]/page_functions.ts</code>, so no child product pages are generated.
                          </li>
                        </ol>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Functional Chain */}
                  <div className="w-full min-w-0">
                    <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10 h-full min-w-0">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                          <span>✅ Functional Chain</span>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <p>
                          The parent resolves its own categories first, unlocking the child level:
                        </p>
                        <div className="mt-2">
                          <CodeBlock
                            language="typescript"
                            containerClassName="w-full overflow-hidden rounded-lg text-xs"
                          >
{`// 1. Parent: src/shop/[category]/page_functions.ts
import type { PageFunctions } from "dinou";

export const getStaticPaths: PageFunctions<"/shop/[category]">["getStaticPaths"] = [
  "shoes",
  "shirts",
];

// 2. Child: src/shop/[category]/[id]/page_functions.ts
import type { PageFunctions } from "dinou";

export const getStaticPaths: PageFunctions<"/shop/[category]/[id]">["getStaticPaths"] = [
  "100",
  "200",
];

// Automatically generates 4 static pages:
// /shop/shoes/100, /shop/shoes/200
// /shop/shirts/100, /shop/shirts/200`}
                          </CodeBlock>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Alert className="not-prose">
                  <ArrowRight className="h-4 w-4" />
                  <AlertTitle>Rule of Thumb</AlertTitle>
                  <AlertDescription>
                    Every intermediate dynamic segment with its own <code>page.tsx</code> is responsible for opening the door to its descendants. (If an intermediate segment does <em>not</em> have a <code>page.tsx</code>, see Section 2.7 for pass-through segments).
                  </AlertDescription>
                </Alert>
              </section>

              {/* 2.7 Nested Complex Routes */}
              <section
                id="nested-complex-routes"
                className="mt-8 scroll-mt-20"
              >
                <h4>2.7. Nested &amp; Pass-through Segments</h4>
                <p>
                  When you have multiple dynamic segments in a path{" "}
                  <strong>without intermediate pages</strong> (the intermediate folders do not have a <code>page.tsx</code>), the leaf segment returns an{" "}
                  <strong>Object</strong> mapping all parameter names at once:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "passthrough-catchall",
                        label: "1. Pass-Through with Catch-all",
                        language: "typescript",
                        code: `// Structure: src/shop/[category]/[brand]/[...specs]/page_functions.ts
// ([category] and [brand] do NOT have their own page.tsx; [...specs] is terminal)
import type { PageFunctions } from "dinou";

export const getStaticPaths: PageFunctions<"/shop/[category]/[brand]/[...specs]">["getStaticPaths"] = [
  {
    category: "electronics",
    brand: "apple",
    specs: ["m3", "16gb"],
    // → Pre-renders: /shop/electronics/apple/m3/16gb
  },
  {
    category: "clothing",
    brand: "nike",
    specs: ["running", "shoes", "air"],
    // → Pre-renders: /shop/clothing/nike/running/shoes/air
  },
];`,
                      },
                      {
                        id: "passthrough-optional",
                        label: "2. Pass-Through with Optional Segment",
                        language: "typescript",
                        code: `// Structure: src/shop/[category]/[id]/[[format]]/page_functions.ts
// ([category] and [id] do NOT have their own page.tsx; [[format]] is terminal)
import type { PageFunctions } from "dinou";

export const getStaticPaths: PageFunctions<"/shop/[category]/[id]/[[format]]">["getStaticPaths"] = [
  {
    category: "electronics",
    id: "macbook-pro",
    format: "json",
    // → Pre-renders: /shop/electronics/macbook-pro/json
  },
  {
    category: "clothing",
    id: "hoodie",
    format: undefined, // Valid: trailing optional segment without trailing gap
    // → Pre-renders: /shop/clothing/hoodie
  },
];`,
                      },
                    ]}
                  />
                </div>

                <div className="space-y-3 mt-4">
                  <Alert className="not-prose">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Terminal Catch-all &amp; No-Gap Rules</AlertTitle>
                    <AlertDescription className="space-y-1 text-xs">
                      <div>
                        <strong>1. Catch-all must be terminal:</strong> A catch-all segment (<code>[...slug]</code>) greedily absorbs all remaining path segments to the end of the URL, so it must always be the final folder of a route.
                      </div>
                      <div>
                        <strong>2. No-Gap Rule for optionals:</strong> An optional segment (<code>[[format]]</code>) can be set to <code>undefined</code> <strong>only if all subsequent segments are also <code>undefined</code></strong>. You cannot have an undefined segment followed by a defined one.
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </section>

              {/* 2.8 Async Support */}
              <section id="async-support" className="mt-8 scroll-mt-20">
                <h4>2.8. Async Support (CMS &amp; DB)</h4>
                <p>
                  <code>getStaticPaths</code> can be an <code>async</code>{" "}
                  function, allowing you to query external headless CMSs,
                  databases, or REST APIs during the build:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg mt-4"
                >
{`// src/products/[id]/page_functions.ts
import type { PageFunctions } from "dinou";
import { db } from "@/lib/db";

// Best Practice: Type-safe async generator querying a database or CMS
export const getStaticPaths: PageFunctions<"/products/[id]">["getStaticPaths"] = async () => {
  // Only pre-generate the top 50 products at build time
  const featured = await db.getFeaturedProducts({ limit: 50 });
  return featured.map((p) => p.id);
  
  // Any product ID outside the top 50 will be generated
  // on-demand when first requested and cached statically (ISG).
};`}
                </CodeBlock>
              </section>
            </section>

            {/* 3. validateParams */}
            <section
              id="validateparams"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                3. <code>validateParams</code> (Segment Parameter Validation)
              </h3>
              <p>
                Validates dynamic parameters (such as <code>[id]</code> or{" "}
                <code>[...slug]</code>) on the server prior to rendering, in
                both <code>page_functions.ts</code> and{" "}
                <code>layout_functions.ts</code>. If <code>validateParams</code>{" "}
                returns <code>false</code> (or a falsy value), Dinou immediately
                terminates request processing and issues a{" "}
                <strong>404 Not Found</strong> response on both direct URL loads
                and client-side navigations.
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Function Signature &amp; Parameter Scoping</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Arguments:</strong> <code>params?: TParams</code>{" "}
                    — Normalized dynamic parameters accumulated{" "}
                    <strong>up to that specific segment</strong> (a layout only
                    receives its own accumulated parameters, never deeper child
                    parameters; the leaf page receives all route parameters).
                  </li>
                  <li>
                    <strong>Returns:</strong>{" "}
                    <code>boolean | Promise&lt;boolean&gt;</code> (Return{" "}
                    <code>false</code> to abort rendering and return{" "}
                    <code>404 Not Found</code>; supports <code>async</code>{" "}
                    database or tenant checks).
                  </li>
                </ul>
              </div>

              <div className="not-prose my-6">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "single-page",
                      label: "1. Page Validation",
                      language: "typescript",
                      code: `// src/posts/[id]/page_functions.ts
import type { PageFunctions } from "dinou";

// Best Practice: Type-safe segment parameter validation
export const validateParams: PageFunctions<"/posts/[id]">["validateParams"] = (params) => {
  // Only allow positive integer IDs; reject malformed requests with 404
  return typeof params?.id === "string" && /^\\d+$/.test(params.id);
};`,
                    },
                    {
                      id: "multi-segment-chain",
                      label: "2. Multi-Segment Hierarchy (Layouts + Page)",
                      language: "typescript",
                      code: `// 1. Outer Layout: src/[org]/layout_functions.ts
// Receives ONLY { org }
import type { LayoutFunctions } from "dinou";

export const validateParams: LayoutFunctions<"/[org]">["validateParams"] = async (params) => {
  return Boolean(params?.org && await db.orgs.exists(params.org));
};

// 2. Nested Layout: src/[org]/projects/[project]/layout_functions.ts
// Receives { org, project } (never deeper child params)
export const validateParams: LayoutFunctions<"/[org]/projects/[project]">["validateParams"] = (params) => {
  return Boolean(params?.project && /^[a-z0-9-]+$/.test(params.project));
};

// 3. Leaf Page: src/[org]/projects/[project]/tasks/[task]/page_functions.ts
// Receives all accumulated params: { org, project, task }
import type { PageFunctions } from "dinou";

export const validateParams: PageFunctions<"/[org]/projects/[project]/tasks/[task]">["validateParams"] = (params) => {
  return typeof params?.task === "string" && /^\\d+$/.test(params.task);
};`,
                    },
                  ]}
                />
              </div>

              <div className="border rounded-lg p-5 bg-card not-prose my-6 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>Universal Gatekeeper: Authority Across All Rendering Modes</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <code>validateParams</code> is the <strong>first line of defense</strong> executed by the Dinou server engine on every incoming request. It has ultimate veto power regardless of whether the route uses pure static (SSG), on-demand (ISG), Partial Prerendering (PPR), or dynamic (SSR) rendering:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs min-w-0">
                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1.5">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block">
                      1. With ISG (&quot;allowISG: true&quot;)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Rejects malformed or invalid IDs <strong>before</strong> on-demand generation starts. Prevents wasteful database queries and stops bots from polluting disk/KV cache with junk pages.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1.5">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 block">
                      2. With Strict SSG (&quot;allowISG: false&quot;)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Ultimate veto: even if a static page was pre-rendered by <code>getStaticPaths</code> at build time, returning <code>false</code> immediately blocks delivery with 404, preventing obsolete or revoked pages from being served.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1.5">
                    <span className="font-semibold text-purple-600 dark:text-purple-400 block">
                      3. With Dynamic SSR (revalidate &lt; 1)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Protects your live server from malicious parameter inputs. Rendering halts and returns 404 <strong>before</strong> <code>getProps</code> or your layout/page components run.
                    </p>
                  </div>
                </div>
              </div>

              {/* Per-Segment Validation Chain & Layout Escape Hatches */}
              <div className="not-prose my-6 rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-50/40 via-background to-muted/20 dark:from-emerald-950/20 dark:via-background dark:to-muted/10 p-5 sm:p-6 space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-base text-foreground">
                    <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Per-Segment Validation Chain, Scoping &amp; Layout Escape Hatches</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Just like <code>allowISG</code>, Dinou evaluates{" "}
                    <code>validateParams</code>{" "}
                    <strong>independently per segment</strong> along the{" "}
                    <strong>active layout chain</strong>:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
                      1. Strict Cumulative Parameter Scope
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      In <code>/[org]/projects/[project]/tasks/[task]</code>, the{" "}
                      <code>[org]</code> layout receives only{" "}
                      <code>&#123; org &#125;</code>, the <code>[project]</code>{" "}
                      layout receives <code>&#123; org, project &#125;</code>, and
                      the <code>[task]</code> page receives{" "}
                      <code>&#123; org, project, task &#125;</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block">
                      2. Subtree Gatekeeping Without Sibling Bleed
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      If a nested layout rejects its parameter, every route inside
                      that subtree returns <code>404 Not Found</code> (on both
                      direct loads and SPA navigations), while sibling routes
                      outside that layout continue responding normally.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 block">
                      3. Leaf Page Failure Preserves Parent Routes
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      When all active layouts pass validation and only the leaf
                      page&apos;s <code>validateParams</code> returns{" "}
                      <code>false</code>, only that leaf page returns{" "}
                      <code>404 Not Found</code>; parent routes and shared layouts
                      remain unaffected.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 block">
                      4. Respects no_layout &amp; reset_layout
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Because Dinou walks only the <strong>active</strong> layout
                      chain, ancestor layouts bypassed via{" "}
                      <code>no_layout</code> or above a{" "}
                      <code>reset_layout</code> boundary do not run{" "}
                      <code>validateParams</code> and never block the route (only
                      the active <code>reset_layout</code> / leaf page validators
                      apply).
                    </p>
                  </div>
                </div>

                {/* Multi-Segment Behavior Matrix */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-foreground">
                    Example Matrix: <code>/[org]/projects/[project]/tasks/[task]</code>
                  </div>
                  <div className="rounded-lg border bg-card overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/40">
                          <TableHead className="text-xs font-semibold">
                            Scenario
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            <code>params</code> Received by Failing / Active Validator
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Result
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-xs">
                            All 3 segments return <code>true</code>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            &#123; org &#125; → &#123; org, project &#125; → &#123; org, project, task &#125;
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-emerald-600 dark:text-emerald-400">200 OK</strong> — Route renders (or caches via SSG/ISG) normally.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">
                            Outer <code>[org]</code> layout returns <code>false</code>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            &#123; org: &quot;bad-org&quot; &#125;
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-rose-600 dark:text-rose-400">404 Not Found</strong> — Entire <code>/bad-org/*</code> subtree is blocked on direct loads &amp; SPA navigations.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">
                            Nested <code>[project]</code> layout returns <code>false</code>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            &#123; org: &quot;acme&quot;, project: &quot;bad-proj&quot; &#125;
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-rose-600 dark:text-rose-400">404 Not Found</strong> on <code>/acme/projects/bad-proj/*</code>; sibling <code>/acme</code> stays <strong className="text-emerald-600 dark:text-emerald-400">200 OK</strong>.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">
                            Leaf <code>[task]</code> page returns <code>false</code>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            &#123; org: &quot;acme&quot;, project: &quot;web&quot;, task: &quot;bad&quot; &#125;
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-rose-600 dark:text-rose-400">404 Not Found</strong> on that task page; parent <code>/acme/projects/web</code> stays <strong className="text-emerald-600 dark:text-emerald-400">200 OK</strong>.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-xs">
                            Subroute uses <code>no_layout</code> or <code>reset_layout</code> under <code>bad-org</code>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            Bypassed <code>[org]</code> validator is skipped; active <code>reset_layout</code> / page runs
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-emerald-600 dark:text-emerald-400">200 OK</strong> if the active <code>reset_layout</code> / page validator passes (<strong className="text-rose-600 dark:text-rose-400">404</strong> if its own validator fails).
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. allowISG */}
            <section id="allowisg" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                4. <code>allowISG</code> (On-Demand ISG Control)
              </h3>
              <p>
                Controls whether dynamic route segments (<code>[id]</code>,{" "}
                <code>[slug]</code>, <code>[...catchAll]</code>) that were not
                pre-rendered at build time (via <code>getStaticPaths</code> during{" "}
                <code>dinou build</code>) are allowed to be generated and cached
                on-demand on the first incoming user request. It is supported in
                both <code>page_functions.ts</code> and{" "}
                <code>layout_functions.ts</code>, as well as globally in{" "}
                <code>dinou.config.ts</code>.
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-4 space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Settings className="h-5 w-5 text-blue-500" />
                  <span>Resolution Precedence &amp; Global Default</span>
                </div>
                <div className="font-mono text-xs bg-muted/60 p-2.5 rounded-md text-blue-700 dark:text-blue-300 break-words">
                  effectiveAllowISG(segment) = segmentConfig.allowISG ?? (dinouConfig.allowISG ?? true)
                </div>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Default (<code>true</code>):</strong> Unless overridden
                    in the segment or in <code>dinou.config.ts</code>, any valid
                    dynamic path not pre-generated at build time is generated
                    on-demand and cached statically (ISG).
                  </li>
                  <li>
                    <strong>Global Strict SSG (<code>dinou.config.ts</code>):</strong>{" "}
                    Setting <code>allowISG: false</code> inside{" "}
                    <code>defineConfig(&#123; allowISG: false &#125;)</code>{" "}
                    switches the entire project to strict SSG-only mode by default,
                    while allowing individual dynamic segments to explicitly opt in
                    with <code>export const allowISG = true</code>.
                  </li>
                  <li>
                    <strong>Segment Strict SSG (<code>false</code>):</strong>{" "}
                    Returning <code>false</code> disables on-demand generation for
                    that segment&apos;s dynamic parameters. Any unlisted parameter
                    returns <code>404 Not Found</code> immediately.
                  </li>
                  <li>
                    <strong>Programmatic / Async Kill-Switch:</strong> Accepting{" "}
                    <code>() =&gt; boolean | Promise&lt;boolean&gt;</code> lets you
                    dynamically evaluate feature flags, environment stages, or
                    upstream load before permitting on-demand generation.
                  </li>
                </ul>

                <div className="rounded-lg border bg-background/80 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="text-xs font-semibold">
                          <code>dinou.config.ts</code> <code>allowISG</code>
                        </TableHead>
                        <TableHead className="text-xs font-semibold">
                          Segment <code>allowISG</code> (<code>page_functions</code> / <code>layout_functions</code>)
                        </TableHead>
                        <TableHead className="text-xs font-semibold">
                          Effective <code>allowISG</code>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em> (or <code>true</code>)
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">true</span>{" "}
                          <span className="text-muted-foreground">(on-demand ISG enabled by default)</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em> (or <code>true</code>)
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                          false
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-rose-600 dark:text-rose-400">false</span>{" "}
                          <span className="text-muted-foreground">(segment opts out of ISG; build-time paths only)</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                          false
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-rose-600 dark:text-rose-400">false</span>{" "}
                          <span className="text-muted-foreground">(strict SSG-only by default across the project)</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                          false
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          true
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">true</span>{" "}
                          <span className="text-muted-foreground">(segment explicitly opts into on-demand ISG)</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="not-prose my-6">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "segment-opt-out",
                      label: "1. Segment Opt-Out (Strict SSG)",
                      language: "typescript",
                      code: `// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";

export const getStaticPaths: PageFunctions<"/blog/[slug]">["getStaticPaths"] = [
  "hello-world",
  "dinou-9-4",
];

// Strictly serve build-time pre-rendered paths; any other slug returns 404
export const allowISG: PageFunctions["allowISG"] = false;`,
                    },
                    {
                      id: "global-default-opt-in",
                      label: "2. Global Default + Opt-In",
                      language: "typescript",
                      code: `// 1. dinou.config.ts — Disable on-demand ISG project-wide by default
import { defineConfig } from "dinou";

export default defineConfig({
  allowISG: false,
});

// 2. src/products/[id]/page_functions.ts — Explicitly opt in for long-tail products
import type { PageFunctions } from "dinou";

export const allowISG: PageFunctions["allowISG"] = true;`,
                    },
                    {
                      id: "async-kill-switch",
                      label: "3. Async Kill-Switch",
                      language: "typescript",
                      code: `// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";
import { getFeatureFlag } from "@/lib/flags";

// Protect origin database during maintenance or traffic spikes
export const allowISG: PageFunctions["allowISG"] = async () => {
  const isgAllowed = await getFeatureFlag("allow_ondemand_rendering");
  return isgAllowed;
};`,
                    },
                    {
                      id: "nested-layout-page",
                      label: "4. Locked Layout + ISG Child",
                      language: "typescript",
                      code: `// 1. Parent Layout: src/team/[team]/layout_functions.ts
import type { LayoutFunctions } from "dinou";

export const getStaticPaths: LayoutFunctions<"/team/[team]">["getStaticPaths"] = ["alpha"];
export const allowISG: LayoutFunctions["allowISG"] = false; // Only "alpha" is valid

// 2. Child Page: src/team/[team]/posts/[postId]/page_functions.ts
import type { PageFunctions } from "dinou";

export const getStaticPaths: PageFunctions<"/team/[team]/posts/[postId]">["getStaticPaths"] = [
  { team: "alpha", postId: "post-1" },
];
export const allowISG: PageFunctions["allowISG"] = true; // New posts under "alpha" can use ISG!`,
                    },
                  ]}
                />
              </div>

              {/* Per-Segment Architecture Deep-Dive */}
              <div className="not-prose my-6 rounded-xl border border-blue-500/20 bg-gradient-to-b from-blue-50/40 via-background to-muted/20 dark:from-blue-950/20 dark:via-background dark:to-muted/10 p-5 sm:p-6 space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-base text-foreground">
                    <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>Per-Segment Evaluation Rules Across Layouts &amp; Nested Routes</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    In Dinou, <code>allowISG</code> (just like{" "}
                    <code>validateParams</code>) is evaluated{" "}
                    <strong>independently per segment</strong> along the active
                    layout chain rather than overwriting a single route-wide
                    boolean:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block">
                      1. Segment-Scoped Parameter Checks
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Each layout validates <strong>only</strong> the dynamic URL
                      parameters accumulated up to its own directory. When a
                      parent dynamic layout&apos;s parameter is valid, it{" "}
                      <strong>never overwrites</strong> a child dynamic page&apos;s{" "}
                      <code>allowISG = true</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
                      2. Static Layouts Ignore allowISG = false
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      If a parent layout has <strong>no dynamic parameters of its own</strong>{" "}
                      (e.g. <code>src/blog/layout_functions.ts</code>), setting{" "}
                      <code>allowISG = false</code> on that layout is a safe no-op
                      and never blocks dynamic child pages (<code>src/blog/[slug]</code>).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 block">
                      3. Respects no_layout &amp; reset_layout
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Checks run strictly along the <strong>active</strong> layout
                      chain. Any ancestor layout bypassed via{" "}
                      <code>no_layout</code> or <code>reset_layout</code> will
                      never block its child routes.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 block">
                      4. Consistent 404 on Direct Loads &amp; SPA Navigations
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      When any active layout or page rejects a parameter via{" "}
                      <code>allowISG = false</code> or <code>validateParams</code>,
                      Dinou returns <code>404 Not Found</code> consistently on
                      both direct URL loads and client-side navigations.
                    </p>
                  </div>
                </div>

                {/* Nested Behavior Matrix */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-foreground">
                    Example Matrix: <code>/team/[team]/posts/[postId]</code>{" "}
                    <span className="font-normal text-muted-foreground">
                      (assuming <code>team = &quot;alpha&quot;</code> and{" "}
                      <code>postId = &quot;post-1&quot;</code> were pre-rendered at build time)
                    </span>
                  </div>
                  <div className="rounded-lg border bg-card overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/40">
                          <TableHead className="text-xs font-semibold">
                            Layout <code>/team/[team]</code>
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Page <code>posts/[postId]</code>
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Request URL
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Result
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400">
                            allowISG: false
                          </TableCell>
                          <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                            allowISG: true
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            /team/alpha/posts/post-1
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-emerald-600 dark:text-emerald-400">200 OK</strong> — Served directly from build-time static cache.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400">
                            allowISG: false
                          </TableCell>
                          <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                            allowISG: true
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            /team/alpha/posts/post-2
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-emerald-600 dark:text-emerald-400">200 OK</strong> — <code>team = &quot;alpha&quot;</code> passes layout check; new <code>post-2</code> is generated and cached via ISG.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400">
                            allowISG: false
                          </TableCell>
                          <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                            allowISG: true
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            /team/beta/posts/post-1
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-rose-600 dark:text-rose-400">404 Not Found</strong> — <code>team = &quot;beta&quot;</code> is rejected by layout <code>allowISG = false</code>.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                            allowISG: true
                          </TableCell>
                          <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400">
                            allowISG: false
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            /team/beta/posts/post-1
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-rose-600 dark:text-rose-400">404 Not Found</strong> — <code>team = &quot;beta&quot;</code> is allowed by layout, but <code>/team/beta/posts/post-1</code> was not pre-rendered for the page.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                            allowISG: true
                          </TableCell>
                          <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                            allowISG: true
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            /team/beta/posts/post-1
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong className="text-emerald-600 dark:text-emerald-400">200 OK</strong> — Both <code>team = &quot;beta&quot;</code> and <code>/team/beta/posts/post-1</code> are generated and cached on-demand via ISG.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. revalidate */}
            <section id="revalidate" className="mt-12 pt-8 border-t scroll-mt-20">
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  5. <code>revalidate</code> (ISR &amp; Dynamic SSR Escape)
                </h3>
              </div>
              <p className="mt-4">
                The <code>revalidate</code> export is Dinou&apos;s{" "}
                <strong>single source of truth</strong> for segment caching and
                rendering behavior in both <code>page_functions.ts</code> and{" "}
                <code>layout_functions.ts</code> (where layouts and child pages
                maintain independent cache timers). It is measured in{" "}
                <strong>seconds (s)</strong>.
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold mb-3">
                  <Timer className="h-5 w-5 text-amber-500" />
                  <span>Cache Strategy Rules</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-md bg-muted/60">
                    <span className="font-mono font-bold text-red-500">
                      revalidate &lt; 1 (or 0)
                    </span>
                    <p className="text-muted-foreground mt-1">
                      <strong>Dynamic SSR:</strong> Escapes static generation
                      (which is the default). The page is rendered dynamically on
                      every incoming request with live database reads.
                    </p>
                  </div>

                  <div className="p-3 rounded-md bg-muted/60">
                    <span className="font-mono font-bold text-blue-500">
                      revalidate &gt;= 1
                    </span>
                    <p className="text-muted-foreground mt-1">
                      <strong>Incremental Static Regeneration (ISR):</strong>{" "}
                      The pre-rendered HTML/RSC payload is served from static cache
                      and re-evaluated in the background at most once every <code>N</code>{" "}
                      seconds (stale-while-revalidate).
                    </p>
                  </div>

                  <div className="p-3 rounded-md bg-muted/60">
                    <span className="font-mono font-bold text-emerald-500">
                      revalidate = false (or omitted)
                    </span>
                    <p className="text-muted-foreground mt-1">
                      <strong>Pure Static (SSG):</strong> Pre-rendered at build
                      time and cached indefinitely until explicit on-demand
                      invalidation via <code>revalidatePage()</code>,{" "}
                      <code>revalidateLayout()</code>,{" "}
                      <code>revalidatePath()</code>, or{" "}
                      <code>revalidateTag()</code>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-semibold text-sm text-muted-foreground">
                  Type-Safe Examples: Constant or Function Declaration
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/posts/[id]/page_functions.ts
import type { PageFunctions } from "dinou";
import { getArticleStatus } from "@/lib/articles";

// 1. Force Dynamic SSR on every request (< 1 or 0, replaces legacy 'dynamic' export)
export const revalidate: PageFunctions["revalidate"] = 0;

// 2. Incremental Static Regeneration (re-evaluates every 60 seconds)
// export const revalidate: PageFunctions["revalidate"] = 60;

// 3. Pure Static (SSG): Cached indefinitely until on-demand invalidation
// export const revalidate: PageFunctions["revalidate"] = false;

// 4. Type-safe async function: adjust TTL dynamically based on content volatility
// export const revalidate: PageFunctions["revalidate"] = async () => {
//   const status = await getArticleStatus();
//   return status.isBreakingNews ? 15 : 3600; // 15s for breaking news, 1h for standard stories
// };`}
                </CodeBlock>
              </div>

              <Alert className="not-prose mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Migration from Legacy dynamic Export</AlertTitle>
                <AlertDescription>
                  In previous versions of Dinou, dynamic rendering was toggled
                  using <code>export function dynamic()</code>. In Dinou,{" "}
                  <code>dynamic</code> has been completely removed. Setting{" "}
                  <code>export const revalidate: PageFunctions[&quot;revalidate&quot;] = 0;</code> (or any value &lt; 1)
                  is the official, unified way to escape static generation.
                </AlertDescription>
              </Alert>
            </section>

            {/* 6. getCacheTags */}
            <section
              id="getcachetags"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  6. <code>getCacheTags</code> (Cache Tagging)
                </h3>
              </div>
              <p className="mt-4">
                Assigns custom invalidation tags to a cached{" "}
                <code>page_functions.ts</code> or{" "}
                <code>layout_functions.ts</code> segment (receiving the dynamic
                parameters accumulated up to that segment), allowing individual
                pages or layouts to be surgically purged and regenerated
                on-demand using{" "}
                <Link
                  href="/docs/revalidation#revalidatetag"
                  className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
                >
                  <code>revalidateTag(tag)</code> (On-Demand Revalidation)
                </Link>
                .
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Tag className="h-5 w-5 text-blue-500" />
                  <span>Declaration Formats</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <strong>Constant Array:</strong>{" "}
                    <code>export const getCacheTags = [&quot;catalog&quot;];</code>
                  </li>
                  <li>
                    <strong>Sync Function:</strong>{" "}
                    Derives tags directly from route parameters (e.g. <code>`product-${'{'}params?.id{'}'}`</code>).
                  </li>
                  <li>
                    <strong>Async Function:</strong>{" "}
                    Awaits database or CMS metadata to attach relational tags (e.g. categories, vendors) that do not appear in the URL.
                  </li>
                </ul>
              </div>

              <TabbedCodeBlock
                containerClassName="mt-4"
                tabs={[
                  {
                    id: "sync",
                    label: "Sync (Param-Based)",
                    language: "typescript",
                    code: `// src/products/[id]/page_functions.ts
import type { PageFunctions } from "dinou";

// Best Practice: Type-safe synchronous cache tags
export const getCacheTags: PageFunctions<"/products/[id]">["getCacheTags"] = (params) => {
  // Associate the generated page with a general tag and a product tag
  return [
    "products",
    \`product-\${params?.id}\`
  ];
};`,
                  },
                  {
                    id: "async",
                    label: "Async (Database / Metadata Lookup)",
                    language: "typescript",
                    code: `// src/products/[id]/page_functions.ts
import type { PageFunctions } from "dinou";
import { db } from "@/lib/db";

// Best Practice: Type-safe async tag resolver
export const getCacheTags: PageFunctions<"/products/[id]">["getCacheTags"] = async (params) => {
  // Query product relationships to attach category and brand tags not present in URL
  const product = await db.products.findById(params?.id);

  return [
    "products",
    \`product-\${params?.id}\`,
    \`category-\${product.categorySlug}\`,
    \`brand-\${product.brandSlug}\`,
  ];
};`,
                  },
                ]}
              />
            </section>

            {/* 7. ppr */}
            <section id="ppr" className="mt-12 pt-8 border-t scroll-mt-20">
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  7. <code>ppr</code> (Partial Prerendering)
                </h3>
              </div>
              <p className="mt-4">
                Partial Prerendering (PPR) combines the instant TTFB (Time to
                First Byte) of a static page with the real-time capabilities of
                dynamic server-side rendering over a single HTTP response. It
                can be configured per segment in <code>page_functions.ts</code>{" "}
                and <code>layout_functions.ts</code>, or globally in{" "}
                <code>dinou.config.ts</code>.
              </p>

              <div className="border rounded-lg p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <span>How PPR Works: Instant Shell + Progressive Streaming</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  PPR eliminates the traditional trade-off between static and dynamic rendering by dividing delivery into two phases over a <strong>single HTTP connection</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
                      1. Instant Static Shell (0ms TTFB)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      All static UI (layouts, headers, navigation) along with the skeleton placeholders defined in <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code> are pre-rendered at build time and delivered immediately with zero server wait time.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1">
                    <span className="font-semibold text-purple-600 dark:text-purple-400 block">
                      2. Parallel Suspense Streaming
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Inside <code>&lt;Suspense&gt;</code>, <code>async</code> Server Components, Server Components (sync or <code>async</code>) reading <code>cookies</code>, <code>headers</code>, <code>query</code>, or <code>useSearchParams()</code>, and Client Components receiving un-awaited <code>Promise</code> props stream concurrently at request time, replacing each fallback skeleton in-place as data resolves. (To resolve a build-time <code>async</code> Server Component directly into the Static Shell instead of opening a dynamic hole, call <code>noDynamic()</code> from <code>&quot;dinou&quot;</code> synchronously before its first <code>await</code>.)
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-card not-prose my-4 space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Settings className="h-5 w-5 text-purple-500" />
                  <span>Declaration Formats, Global Default &amp; Strict Per-Segment Resolution</span>
                </div>
                <div className="font-mono text-xs bg-muted/60 p-2.5 rounded-md text-purple-700 dark:text-purple-300 space-y-1 break-words">
                  <div>type PPRConfig = boolean | (() =&gt; boolean | Promise&lt;boolean&gt;);</div>
                  <div className="text-muted-foreground">
                    effectivePpr(segment) = segmentConfig.ppr ?? Boolean(dinouConfig.ppr) ?? false
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Default (<code>false</code>):</strong> Every{" "}
                    <code>layout</code> and <code>page</code> defaults to{" "}
                    <code>ppr = false</code> unless explicitly enabled in its
                    own configuration file or globally in{" "}
                    <code>dinou.config.ts</code>.
                  </li>
                  <li>
                    <strong>Global Opt-In (<code>dinou.config.ts</code>):</strong>{" "}
                    Setting <code>defineConfig(&#123; ppr: true &#125;)</code>{" "}
                    enables PPR across all layouts and pages by default, while
                    allowing individual segments to opt out with{" "}
                    <code>export const ppr = false</code>.
                  </li>
                  <li>
                    <strong>No Parent-to-Child Inheritance:</strong> Each
                    segment (<code>layout</code>, nested <code>layout</code>, or{" "}
                    <code>page</code>) resolves <code>ppr</code> strictly from
                    its own <code>layout_functions.ts</code> or{" "}
                    <code>page_functions.ts</code>, falling back directly to{" "}
                    <code>dinou.config.ts</code>. Enabling <code>ppr = true</code>{" "}
                    on a parent layout never cascades automatically to child
                    layouts or pages.
                  </li>
                  <li>
                    <strong>Sync / Async Function:</strong> Supports{" "}
                    <code>() =&gt; boolean | Promise&lt;boolean&gt;</code> to
                    evaluate environment variables or remote feature flags.
                  </li>
                </ul>

                <div className="rounded-lg border bg-background/80 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="text-xs font-semibold">
                          <code>dinou.config.ts</code> <code>ppr</code>
                        </TableHead>
                        <TableHead className="text-xs font-semibold">
                          Segment <code>ppr</code> (<code>page_functions</code> / <code>layout_functions</code>)
                        </TableHead>
                        <TableHead className="text-xs font-semibold">
                          Effective <code>ppr</code> for That Segment
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em> (or <code>false</code>)
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-slate-600 dark:text-slate-400">false</span>{" "}
                          <span className="text-muted-foreground">(standard SSG / ISR / Dynamic SSR by default)</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em> (or <code>false</code>)
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                          true
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">true</span>{" "}
                          <span className="text-muted-foreground">(PPR enabled exclusively for that segment)</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                          true
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          <em>omitted</em>
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">true</span>{" "}
                          <span className="text-muted-foreground">(PPR enabled by default across all segments)</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                          true
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                          false
                        </TableCell>
                        <TableCell className="text-xs">
                          <span className="font-mono font-bold text-slate-600 dark:text-slate-400">false</span>{" "}
                          <span className="text-muted-foreground">(segment explicitly opts out of PPR)</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="not-prose my-6">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "page_functions",
                      label: "1. Segment Opt-In",
                      language: "typescript",
                      code: `// src/dashboard/page_functions.ts
import type { PageFunctions } from "dinou";
import { getFeatureFlag } from "@/lib/flags";

// 1. Static Boolean (Standard): Enable PPR for this page segment
export const ppr: PageFunctions["ppr"] = true;

// 2. Dynamic Async Function: Evaluate remote rollout flags or A/B testing
// export const ppr: PageFunctions["ppr"] = async () => {
//   const isPPREnabled = await getFeatureFlag("enable_ppr_dashboard");
//   return isPPREnabled;
// };`,
                    },
                    {
                      id: "global-ppr-opt-out",
                      label: "2. Global Default + Opt-Out",
                      language: "typescript",
                      code: `// 1. dinou.config.ts — Enable PPR globally across all layouts and pages
import { defineConfig } from "dinou";

export default defineConfig({
  ppr: true,
});

// 2. src/about/page_functions.ts — Opt out on a purely static page
import type { PageFunctions } from "dinou";

export const ppr: PageFunctions["ppr"] = false;`,
                    },
                    {
                      id: "mixed-segments",
                      label: "3. Independent Layout & Page",
                      language: "typescript",
                      code: `// 1. Parent Layout: src/dashboard/layout_functions.ts
import type { LayoutFunctions } from "dinou";

// Enables PPR ONLY for src/dashboard/layout.tsx (and its parallel @slots).
// Child layouts and pages do NOT inherit this automatically!
export const ppr: LayoutFunctions["ppr"] = true;

// 2. Child Page: src/dashboard/page_functions.ts
import type { PageFunctions } from "dinou";

// If dinou.config.ts omits ppr, this page would default to ppr = false
// unless it explicitly opts in as well:
export const ppr: PageFunctions["ppr"] = true;`,
                    },
                  ]}
                />
              </div>

              {/* Per-Segment PPR Scopes & Mixed Routes Deep-Dive */}
              <div className="not-prose my-6 rounded-xl border border-purple-500/20 bg-gradient-to-b from-purple-50/40 via-background to-muted/20 dark:from-purple-950/20 dark:via-background dark:to-muted/10 p-5 sm:p-6 space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-base text-foreground">
                    <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>Independent Per-Segment Scopes on Mixed Routes</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Because layouts and pages are independent segments, Dinou
                    evaluates each segment inside its own isolated PPR execution
                    scope without bleeding across boundaries:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs min-w-0">
                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-purple-600 dark:text-purple-400 block">
                      1. Isolated Segment Scopes
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Defining <code>ppr = true</code> in{" "}
                      <code>src/dashboard/layout_functions.ts</code> applies
                      exclusively to <code>src/dashboard/layout.tsx</code> and
                      its parallel <code>@slots</code>. Child layouts and child
                      pages resolve their own <code>ppr</code> setting independently.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block">
                      2. Suspense in &quot;ppr: false&quot; Segments Stays Static
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      On mixed routes (e.g. a <code>ppr = true</code> layout
                      wrapping a <code>ppr = false</code> page),{" "}
                      <code>&lt;Suspense&gt;</code> boundaries inside the{" "}
                      <code>ppr = false</code> segment resolve statically at
                      build time instead of deferring to runtime streaming.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 block">
                      3. Dynamic Bailout Rules Are Preserved
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Reading <code>req.cookies</code>, <code>req.headers</code>,{" "}
                      <code>req.query</code>, calling <code>useSearchParams()</code>{" "}
                      in a Server Component, or rendering{" "}
                      <code>&lt;DinouCacheSlot revalidate=&#123;0&#125;&gt;</code>{" "}
                      inside a <code>&quot;ppr: false&quot;</code> segment (even
                      inside <code>&lt;Suspense&gt;</code>)—or{" "}
                      <strong>outside</strong> <code>&lt;Suspense&gt;</code> in a{" "}
                      <code>&quot;ppr: true&quot;</code> segment—triggers a
                      Dynamic SSR bailout to protect cache integrity.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
                      4. Zero Redundant Layout Work on Navigation
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      During client-side page navigations, Dinou renders only the
                      target page segment in isolation without re-evaluating
                      ancestor layouts or their <code>@slots</code> on the server.
                    </p>
                  </div>
                </div>

                {/* Mixed Segments Matrix */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-foreground">
                    Behavior Matrix Across Mixed Layout &amp; Page Segments
                  </div>
                  <div className="rounded-lg border bg-card overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/40">
                          <TableHead className="text-xs font-semibold">
                            Layout <code>ppr</code>
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Page <code>ppr</code>
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Route Rendering Behavior
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-400">
                            false
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-400">
                            false
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong>Standard SSG / ISR</strong> (or Dynamic SSR if a dynamic request API is read).
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold">
                            true
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-400">
                            false
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong>Composite PPR:</strong> The layout streams its <code>&lt;Suspense&gt;</code> boundaries at request time, while the page is statically pre-rendered inside the instant shell.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-400">
                            false
                          </TableCell>
                          <TableCell className="font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold">
                            true
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong>Composite PPR:</strong> The layout is statically pre-rendered in the shell, while the page streams its <code>&lt;Suspense&gt;</code> boundaries at request time.
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold">
                            true
                          </TableCell>
                          <TableCell className="font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold">
                            true
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            <strong>Full PPR:</strong> Both layout and page deliver their static shells immediately (0ms TTFB) and stream their respective <code>&lt;Suspense&gt;</code> boundaries in parallel.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Consolidated Config Object (export default) */}
            <section
              id="consolidated-config"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  8. Consolidated Config Object (<code>export default</code>)
                </h3>
              </div>

              <p className="mt-4 leading-relaxed">
                You can declare and export a single
                consolidated configuration object via <code>export default pageConfig</code> in{" "}
                <code>page_functions.ts</code> (or <code>export default layoutConfig</code> in{" "}
                <code>layout_functions.ts</code>).
              </p>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Both models&mdash;traditional named exports (<code>export const revalidate = ...</code>)
                and the consolidated default export&mdash;are fully interchangeable, can be mixed
                across routes, and even combined in the same file.
              </p>

              <div className="mt-6 space-y-4">
                <p className="font-semibold text-sm text-muted-foreground">
                  Modern Pattern: Consolidated <code>page_functions.ts</code>
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "./dinou";

interface BlogProps {
  post: { title: string; content: string };
}

// "./dinou" pre-binds { slug: string } automatically
// (or import PageFunctions from "dinou" and write PageFunctions<"/blog/[slug]", BlogProps>)
const pageConfig: PageFunctions<BlogProps> = {
  ppr: true,
  revalidate: 60,
  allowISG: true,
  getStaticPaths: ["getting-started", "page-functions"],
  validateParams: (params) => Boolean(params?.slug),
  getCacheTags: (params) => ["blog", \`post-\${params?.slug}\`],
  getProps: async (params) => {
    const post = await fetchPost(params?.slug ?? "");
    return { post };
  },
};

export default pageConfig;`}
                </CodeBlock>
              </div>

              {/* 8.1 Developer Experience & Advantages */}
              <div id="config-advantages" className="mt-10 scroll-mt-20">
                <h4 className="text-xl font-bold">
                  8.1. Developer Experience &amp; Key Advantages
                </h4>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Consolidating route lifecycles into a single typed object offers major ergonomics
                  improvements over declaring multiple separate exports:
                </p>

                <div className="flex flex-col gap-4 mt-6 w-full min-w-0">
                  <div className="border rounded-lg p-4 sm:p-5 bg-card/50 w-full min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 font-semibold text-base mb-1 min-w-0">
                      <Sparkles className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="break-words">1. Cascading Type Inference (Single Point of Truth)</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed break-words [overflow-wrap:anywhere]">
                      Typing the object once with <code className="break-all sm:break-normal">PageFunctions&lt;&quot;/blog/[slug]&quot;, BlogProps&gt;</code>{" "}
                      automatically propagates parameter types to <code>getProps(params)</code>,{" "}
                      <code>validateParams(params)</code>, and <code>getCacheTags(params)</code>, while
                      validating that <code>getProps</code> returns <code>BlogProps</code>. There is zero need
                      to import <code>RouteParams</code> or repeat signatures across separate functions.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 sm:p-5 bg-card/50 w-full min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 font-semibold text-base mb-1 min-w-0">
                      <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                      <span className="break-words">2. Full IDE Autocomplete &amp; Discoverability</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed break-words [overflow-wrap:anywhere]">
                      Pressing <kbd className="px-1.5 py-0.5 text-xs bg-muted border rounded">Ctrl + Space</kbd>{" "}
                      inside the config object instantly reveals every supported Dinou contract (<code>ppr</code>,{" "}
                      <code>revalidate</code>, <code>allowISG</code>, <code>getStaticPaths</code>,{" "}
                      <code>validateParams</code>, <code>getCacheTags</code>, <code>getProps</code>). This prevents typos
                      and catches unrecognized options at compile-time.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 sm:p-5 bg-card/50 w-full min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 font-semibold text-base mb-1 min-w-0">
                      <ShieldCheck className="h-4 w-4 text-violet-500 shrink-0" />
                      <span className="break-words">3. Higher-Order Wrappers &amp; Composition</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 break-words [overflow-wrap:anywhere]">
                      Because <code>pageConfig</code> is a plain JavaScript object, you can compose reusable
                      higher-order functions to apply shared caching, security, or telemetry policies across
                      multiple routes:
                    </p>
                    <div className="w-full min-w-0 overflow-hidden">
                      <TabbedCodeBlock
                      tabs={[
                        {
                          id: "wrapper",
                          label: "route-helpers.ts",
                          language: "typescript",
                          code: `// src/utils/route-helpers.ts (shared helper: import from "dinou")
import type { DinouRoutePattern, PageFunctions } from "dinou";

// Reusable higher-order wrapper with optional default generics
export function withProtectedCache<
  TRouteOrParams extends DinouRoutePattern | object = any,
  TProps = any
>(
  config: PageFunctions<TRouteOrParams, TProps>
): PageFunctions<TRouteOrParams, TProps> {
  return {
    ...config,
    revalidate: 120,
    getCacheTags: async (params) => [
      "tenant-global",
      ...(typeof config.getCacheTags === "function"
        ? await config.getCacheTags(params)
        : config.getCacheTags ?? []),
    ],
  };
}`,
                        },
                        {
                          id: "page",
                          label: "page_functions.ts",
                          language: "typescript",
                          code: `// src/dashboard/page_functions.ts
import { withProtectedCache } from "@/utils/route-helpers";

interface DashboardProps {
  stats: { usersCount: number; activeSessions: number };
}

// Pass explicit generics for strict validation, or omit them for auto-inference
export default withProtectedCache<"/dashboard", DashboardProps>({
  getProps: async () => {
    const stats = await fetchStats();
    return { stats }; // Validated strictly against DashboardProps
  },
});`,
                        },
                      ]}
                    />
                    </div>
                  </div>
                </div>
              </div>

              {/* 8.2 Hybrid Model & Precedence Rules */}
              <div id="config-precedence" className="mt-10 scroll-mt-20">
                <h4 className="text-xl font-bold">
                  8.2. Hybrid Model &amp; Precedence Rules
                </h4>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  You do not need to choose exclusively between named exports and <code>export default</code>.
                  Both can coexist seamlessly in the same file.
                </p>

                <Alert className="not-prose my-4 border-amber-500/30 bg-amber-500/5">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertTitle className="text-amber-600 dark:text-amber-400 font-semibold">
                    Dinou Resolution Precedence
                  </AlertTitle>
                  <AlertDescription className="text-sm text-muted-foreground mt-1">
                    <strong>Named exports take absolute precedence over the default export.</strong> When
                    resolving each contract (<code>revalidate</code>, <code>ppr</code>, <code>getProps</code>,{" "}
                    <code>validateParams</code>, <code>allowISG</code>, <code>getStaticPaths</code>,{" "}
                    <code>getCacheTags</code>), Dinou first looks for an explicit named export on the module.
                    If absent, it falls back to the corresponding property on <code>export default</code>.
                  </AlertDescription>
                </Alert>

                <p className="font-semibold text-sm text-muted-foreground mt-6">
                  Pattern: Shared Base Preset with Granular Override
                </p>
                <p className="text-sm text-muted-foreground mt-1 mb-3 leading-relaxed">
                  This resolution rule enables a powerful architectural pattern: you can export a shared
                  base preset across multiple routes, and use a named export only when a specific page needs
                  to deviate from the default policy (such as opting out of caching for real-time SSR):
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/[slug]/page_functions.ts
import baseBlogConfig from "@/config/base-blog.config";

// 1. Export the shared preset (getProps, validateParams, getStaticPaths, cache tags)
export default baseBlogConfig;

// 2. Granular override: While baseBlogConfig specifies revalidate = 3600 (ISR),
// this specific breaking-news page requires real-time SSR:
export const revalidate = 0;`}
                </CodeBlock>
              </div>

              {/* 8.3 Flexible Generics Typing */}
              <div id="config-generics" className="mt-10 scroll-mt-20">
                <h4 className="text-xl font-bold">
                  8.3. Flexible Generics Typing
                </h4>
                <p className="mt-2 text-muted-foreground leading-relaxed break-words [overflow-wrap:anywhere]">
                  Inside a route directory, importing <code>PageFunctions&lt;TProps&gt;</code> from{" "}
                  <code>&quot;./dinou&quot;</code> pre-binds that folder&apos;s <code>RouteParams</code> automatically.
                  When importing from <code>&quot;dinou&quot;</code>, the signature is{" "}
                  <code className="break-all sm:break-normal">PageFunctions&lt;TRouteOrParams = any, TProps = any&gt;</code>—and
                  all type arguments remain optional:
                </p>

                <div className="flex flex-col gap-4 mt-6 w-full min-w-0">
                  <div className="border rounded-lg p-4 bg-card w-full min-w-0 overflow-hidden border-emerald-500/30">
                    <p className="font-semibold text-sm mb-1 break-words">
                      1. Contextual Zero-Boilerplate (Recommended in Route Files): <code>import type &#123; PageFunctions &#125; from &quot;./dinou&quot;</code>
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 break-words">
                      Pre-binds the current route directory&apos;s parameters automatically without repeating route string patterns:
                    </p>
                    <div className="w-full min-w-0 overflow-hidden">
                      <CodeBlock language="typescript" containerClassName="w-full min-w-0 overflow-hidden">
{`// src/shop/[id]/page_functions.ts
import type { PageFunctions } from "./dinou";

interface ShopProps {
  item: { id: string; name: string; price: number };
}

// RouteParams ({ id: string }) is pre-bound automatically!
const pageConfig: PageFunctions<ShopProps> = {
  getProps: async (params) => {
    const item = await fetchItem(params?.id ?? "");
    return { item }; // Validated strictly against ShopProps
  },
};

export default pageConfig;`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-card w-full min-w-0 overflow-hidden">
                    <p className="font-semibold text-sm mb-1 break-words">
                      2. Zero Generics: <code>PageFunctions</code>
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 break-words">
                      When the route only defines segment-level directives without dynamic parameter validation or <code>getProps</code>:
                    </p>
                    <div className="w-full min-w-0 overflow-hidden">
                      <CodeBlock language="typescript" containerClassName="w-full min-w-0 overflow-hidden">
{`import type { PageFunctions } from "dinou";

// No generics required
const pageConfig: PageFunctions = {
  ppr: true,
  revalidate: 86400, // 24h ISR cache
};

export default pageConfig;`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-card w-full min-w-0 overflow-hidden">
                    <p className="font-semibold text-sm mb-1 break-words">
                      3. Explicit Route Pattern Only: <code className="break-all sm:break-normal">PageFunctions&lt;TRoute&gt;</code>
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 break-words">
                      When importing from <code>&quot;dinou&quot;</code> with dynamic parameters used in <code>validateParams</code>, <code>getCacheTags</code>, or <code>getStaticPaths</code>, while data fetching lives directly inside the <code>page.tsx</code> Server Component:
                    </p>
                    <div className="w-full min-w-0 overflow-hidden">
                      <CodeBlock language="typescript" containerClassName="w-full min-w-0 overflow-hidden">
{`import type { PageFunctions } from "dinou";

// Route string infers { section: string; slug: string }
const pageConfig: PageFunctions<"/docs/[section]/[slug]"> = {
  revalidate: 3600,
  validateParams: (params) => params?.section === "guides",
  getCacheTags: (params) => ["docs", \`section-\${params?.section}\`],
  getStaticPaths: [
    { section: "guides", slug: "get-started" },
    { section: "guides", slug: "installation" },
  ],
};

export default pageConfig;`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-card w-full min-w-0 overflow-hidden">
                    <p className="font-semibold text-sm mb-1 break-words">
                      4. Explicit Route &amp; Props Generics: <code className="break-all sm:break-normal">PageFunctions&lt;TRoute, TProps&gt;</code>
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 break-words">
                      When importing from <code>&quot;dinou&quot;</code> and validating both explicit route parameters and returned props:
                    </p>
                    <div className="w-full min-w-0 overflow-hidden">
                      <CodeBlock language="typescript" containerClassName="w-full min-w-0 overflow-hidden">
{`import type { PageFunctions } from "dinou";

interface ShopProps {
  item: { id: string; name: string; price: number };
}

const pageConfig: PageFunctions<"/shop/[id]", ShopProps> = {
  getProps: async (params) => {
    const item = await fetchItem(params?.id ?? "");
    return { item }; // Strictly validated against ShopProps
  },
};

export default pageConfig;`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8.4 Applicability to layout_functions */}
              <div id="config-layout" className="mt-10 scroll-mt-20">
                <h4 className="text-xl font-bold">
                  8.4. Applicability to <code>layout_functions.ts</code>
                </h4>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  All features, type inference rules, composition patterns, and precedence behaviors apply
                  identically to layouts using <code>LayoutFunctions</code> (including intermediate layouts without a sibling <code>page.tsx</code>) and <code>export default layoutConfig</code>:
                </p>

                <div className="mt-4">
                  <CodeBlock
                    language="typescript"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`// src/workspace/[org]/layout_functions.ts
import type { LayoutFunctions } from "./dinou";
import { db } from "@/lib/db";

interface WorkspaceLayoutProps {
  workspace: { name: string; plan: string };
}

// "./dinou" pre-binds { org: string } automatically for this layout directory
// (or import LayoutFunctions from "dinou" and write LayoutFunctions<"/workspace/[org]", WorkspaceLayoutProps>)
const layoutConfig: LayoutFunctions<WorkspaceLayoutProps> = {
  ppr: true,        // Enables PPR for this layout shell (without cascading to child pages)
  revalidate: 3600, // Cache layout static shell independently for 1 hour
  validateParams: (params) => Boolean(params?.org && /^[a-z0-9-]+$/.test(params.org)),
  getCacheTags: (params) => ["workspaces", \`workspace-\${params?.org}\`],
  getProps: async (params) => {
    const workspace = await db.workspaces.findBySlug(params?.org ?? "");
    return { workspace };
  },
};

export default layoutConfig;`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* 9. End-to-End Type-Safe Example */}
            <section
              id="type-safe-example"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  9. End-to-End Type-Safe Example
                </h3>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A complete, end-to-end example demonstrating how page and layout configurations seamlessly connect server lifecycles with their corresponding React components using zero-boilerplate contextual types from <code>&quot;./dinou&quot;</code>:
              </p>

              <div className="mt-6">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "page_functions",
                      label: "page_functions.ts",
                      language: "typescript",
                      code: `// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "./dinou";
import { db } from "@/lib/db";

// 1. Define page props types
export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  author: string;
  publishedAt: string;
}

export interface BlogPageProps {
  post: BlogPost;
}

// 2. Consolidated, strongly-typed page configuration
// ("./dinou" pre-binds { slug: string } automatically)
const pageConfig: PageFunctions<BlogPageProps> = {
  // Caching Strategy & PPR configuration
  revalidate: 60, // ISR 60s
  ppr: true,      // PPR: Static shell + Suspense streaming

  // Static Paths for pre-rendering at build time
  getStaticPaths: [
    "getting-started",
    "building-with-dinou",
  ],

  // Parameter validation hook (returns false to abort with 404)
  validateParams: (params) => {
    return typeof params?.slug === "string" && params.slug.length >= 3;
  },

  // Cache tags for on-demand revalidation via revalidateTag("blog")
  getCacheTags: (params) => {
    return ["blog", \`post-\${params?.slug}\`];
  },

  // Props loader: loads article data for the 0ms static shell
  getProps: async (params) => {
    // params?.slug is automatically inferred as string | undefined
    const post = await db.posts.findUnique({ where: { slug: params?.slug } });
    if (!post) throw new Error("Post not found");

    // Strictly validated against BlogPageProps
    return { post };
  },
};

export default pageConfig;`,
                    },
                    {
                      id: "page",
                      label: "page.tsx",
                      language: "tsx",
                      code: `// src/blog/[slug]/page.tsx
import { Suspense } from "react";
import type { PageProps } from "./dinou";
import type { BlogPageProps } from "./page_functions";
import { RealtimeViews, ViewsSkeleton } from "./components";

// PageProps<BlogPageProps> combines pre-bound { params: { slug: string } } with BlogPageProps
export default function BlogPostPage({ params, post }: PageProps<BlogPageProps>) {
  return (
    <article className="max-w-2xl mx-auto py-8">
      {/* 1. Static shell (pre-rendered at build time, delivered with 0ms TTFB) */}
      <span className="text-xs text-muted-foreground font-mono">/blog/{params.slug}</span>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-sm text-muted-foreground my-2">
        By {post.author} • published {post.publishedAt}
      </div>
      <div className="prose mt-6">{post.content}</div>

      {/* 2. PPR Dynamic Stream: Real-time analytics streamed in via Suspense */}
      <Suspense fallback={<ViewsSkeleton />}>
        <RealtimeViews slug={params.slug} />
      </Suspense>
    </article>
  );
}`,
                    },
                    {
                      id: "layout_functions",
                      label: "layout_functions.ts",
                      language: "typescript",
                      code: `// src/blog/layout_functions.ts
import type { LayoutFunctions } from "./dinou";
import { db } from "@/lib/db";

// 1. Define layout data contract
export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

export interface BlogLayoutData {
  categories: BlogCategory[];
  featuredSlug: string;
}

// 2. Consolidated, strongly-typed layout configuration
const layoutConfig: LayoutFunctions<BlogLayoutData> = {
  // Segment-level caching strategy for the layout shell
  revalidate: 300, // Layout revalidates every 5 mins
  ppr: true,

  // Dedicated layout loader typed via LayoutFunctions
  getProps: async () => {
    const categories = await db.categories.findMany();
    const featured = await db.posts.findFirst({ where: { featured: true } });

    // Injected directly as props into layout.tsx
    return {
      categories,
      featuredSlug: featured?.slug ?? "welcome",
    };
  },
};

export default layoutConfig;`,
                    },
                    {
                      id: "layout",
                      label: "layout.tsx",
                      language: "tsx",
                      code: `// src/blog/layout.tsx
import type { LayoutProps } from "./dinou";
import type { BlogLayoutData } from "./layout_functions";

// LayoutProps<BlogLayoutData> injects children, params, @slots, and BlogLayoutData
export default function BlogLayout({
  children,
  categories,
  featuredSlug,
}: LayoutProps<BlogLayoutData>) {
  return (
    <div className="blog-container">
      <aside className="blog-sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map((c) => (
            <li key={c.id}>{c.name} ({c.count})</li>
          ))}
        </ul>
      </aside>
      <main className="blog-content">
        {children}
      </main>
    </div>
  );
}`,
                    },
                  ]}
                />
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </div>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
