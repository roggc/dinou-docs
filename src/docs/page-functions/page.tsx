"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
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
  RefreshCw,
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
    title: "3. validateParams (Route Parameter Validation)",
    level: 2,
  },
  {
    id: "allowisg",
    title: "4. allowISG (Incremental Static Opt-Out)",
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
    id: "type-safe-example",
    title: "8. End-to-End Type-Safe Example",
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
                Page & Layout Functions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou v7 introduces{" "}
              <strong>2D Horizontal Layered Segmentation</strong>. Route
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

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
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

                <Card className="border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                      <Split className="h-5 w-5" />
                      <span>layout_functions.ts</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>
                      Placed alongside <code>layout.tsx</code>. Supplies data
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
                  This is the framework&apos;s underlying &quot;abstract&quot; interface defining all segment capabilities. For day-to-day application code, Dinou exports two concrete, role-based aliases: <strong><code>PageFunctions</code></strong> (for pages) and <strong><code>LayoutFunctions</code></strong> (for layouts):
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// Exported directly from "dinou" (dinou/index.d.ts):

/**
 * Foundational "abstract" interface governing all route segments in Dinou.
 */
export interface RouteSegmentConfig<TParams = any, TProps = any> {
  // Partial Prerendering (PPR) configuration
  ppr?: boolean | (() => boolean | Promise<boolean>);

  // Cache & revalidation strategy (< 1 = Dynamic SSR, >= 1 = ISR, false = Static)
  revalidate?: number | false | (() => number | false | Promise<number | false>);

  // Cache tags for on-demand invalidation via revalidateTag(tag)
  getCacheTags?: string[] | ((params?: TParams) => string[] | Promise<string[]>);

  // Path generator for SSG (constant array or sync/async function)
  getStaticPaths?: StaticPathItem<TParams>[] | (() => StaticPathsResult<TParams>);

  // Server loader providing direct props to the component
  getProps?: (params?: TParams) => TProps | Promise<TProps>;

  // Parameter validator guard (returns false to halt and return 404)
  validateParams?: (params?: TParams) => boolean | Promise<boolean>;

  // Controls whether Incremental Static Generation (ISG) is allowed for ungenerated paths
  allowISG?: boolean | (() => boolean | Promise<boolean>);
}

/**
 * Concrete semantic alias to import and use in 'page_functions.ts'
 */
export type PageFunctions<TParams = any, TProps = any> = RouteSegmentConfig<TParams, TProps>;

/**
 * Concrete semantic alias to import and use in 'layout_functions.ts'
 */
export type LayoutFunctions<TParams = any, TProps = any> = RouteSegmentConfig<TParams, TProps>;`}
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
                          PageFunctions
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
                          LayoutFunctions
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
                          RouteSegmentConfig
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Base &quot;abstract&quot; interface for generic utilities that process arbitrary route segments.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* 3 Architectural Reasons for Separation */}
                <div className="pt-2 grid gap-4 md:grid-cols-3">
                  <Card className="border-blue-500/20 bg-background/60">
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

                  <Card className="border-indigo-500/20 bg-background/60">
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

                  <Card className="border-emerald-500/20 bg-background/60">
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
                <AlertTitle>v7 Direct Return Contract</AlertTitle>
                <AlertDescription>
                  In Dinou v7, <code>getProps</code> directly returns the props
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
                </ul>
              </div>

              <div className="space-y-4">
                <p className="font-semibold text-sm text-muted-foreground">
                  Example: Type-Safe Page Component Loader
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";
import { db, type Post } from "@/lib/db";

export interface BlogPostData {
  post: Post;
}

// Best Practice: Type getProps using PageFunctions for strict parameters & return contract
export const getProps: PageFunctions<RouteParams<"/blog/[slug]">, BlogPostData>["getProps"] = async (params) => {
  const post = await db.getPost(params?.slug);
  // Directly returns BlogPostData for page.tsx
  return { post };
};

// src/blog/[slug]/page.tsx
import type { PageProps } from "dinou";
import type { BlogPostData } from "./page_functions";

// Best Practice: Extend PageProps with the loader's returned BlogPostData
interface BlogPostProps extends PageProps<"/blog/[slug]">, BlogPostData {}

export default function BlogPost({ params, post }: BlogPostProps) {
  return (
    <article>
      <span className="text-xs text-muted-foreground">Route: /blog/{params.slug}</span>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`}
                </CodeBlock>

                <p className="font-semibold text-sm text-muted-foreground mt-6">
                  Example: Type-Safe Layout Component Loader
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/layout_functions.ts
import type { LayoutFunctions } from "dinou";
import { db } from "@/lib/db";

export interface BlogLayoutData {
  categories: string[];
}

// Best Practice: Type layout server functions with LayoutFunctions
export const getProps: LayoutFunctions<any, BlogLayoutData>["getProps"] = async () => {
  const categories = await db.getCategories();
  // Directly returns props for layout.tsx
  return { categories };
};

// src/blog/layout.tsx
import type { LayoutProps } from "dinou";
import type { BlogLayoutData } from "./layout_functions";

// Best Practice: Extend LayoutProps for automatic typing of children and params
interface BlogLayoutProps extends LayoutProps, BlogLayoutData {}

export default function BlogLayout({
  children,
  categories,
}: BlogLayoutProps) {
  return (
    <div className="blog-shell">
      <BlogSidebar categories={categories} />
      <main>{children}</main>
    </div>
  );
}`}
                </CodeBlock>
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
                            req.query
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                              Bailout to Dynamic
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            URL query parameters (<code>?q=...</code>) are unconstrained runtime inputs.
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
                      To keep pages pre-renderable (SSG/ISR) and instant to load, organize your data into its natural layer: route data in <code>getProps</code>, session cookies inside <code>&lt;Suspense&gt;</code>, and query parameters via the universal <code>useSearchParams()</code> hook (in Server Components with <code>&lt;Suspense&gt;</code> or in Client Components):
                    </p>
                  </div>

                  <TabbedCodeBlock
                    tabs={[
                      {
                        id: "page_functions",
                        label: "page_functions.ts (Route)",
                        language: "typescript",
                        code: `// src/blog/[slug]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";
import { db, type Post } from "@/lib/db";

export interface BlogPostData {
  post: Post;
}

// 1. Pure route loader: depends solely on params
// Cached statically for all visitors (SSG / ISR)
export const getProps: PageFunctions<RouteParams<"/blog/[slug]">, BlogPostData>["getProps"] = async (params) => {
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
import type { PageProps } from "dinou";
import type { BlogPostData } from "./page_functions";
import { UserSession } from "./user-session";
import { RelatedPosts } from "./related-posts";
import { SearchFilter } from "./search-filter";

interface BlogPostProps extends PageProps<"/blog/[slug]">, BlogPostData {}

export default function BlogPostPage({ params, post }: BlogPostProps) {
  return (
    <article className="post-container">
      {/* 1. Instant static shell: delivered immediately from cache */}
      <header>
        <span className="text-xs text-muted-foreground">Route: /blog/{params.slug}</span>
        <h1>{post.title}</h1>
        {/* Client Component using useSearchParams() for instant input sync */}
        <SearchFilter />
      </header>

      <div className="post-body">{post.content}</div>

      {/* 2. Dynamic cookie component streamed via Suspense */}
      <Suspense fallback={<div className="text-xs text-muted-foreground">Loading session...</div>}>
        <UserSession />
      </Suspense>

      {/* 3. Server Component using useSearchParams() streamed via Suspense */}
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

// Cookie & auth access isolated inside Suspense:
// Streaming this component prevents getProps from bailing out to Dynamic SSR!
export async function UserSession() {
  const { req } = getContext();
  const sessionToken = req?.cookies?.session;
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

// Universal hook in a Server Component:
// Reads ctx.req.query to fetch filtered data from the DB on the server.
// Because it reads query, wrap it in <Suspense> in page.tsx so the post shell stays static!
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
// Reads URL params on the browser for reactive input state without contacting the server
export function SearchFilter() {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") ?? "";

  return (
    <input
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
                  <div className="grid gap-2 sm:grid-cols-3 pt-1">
                    <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                      <span className="text-xs font-bold text-foreground">1. Route Data (Params)</span>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Handled in <code>getProps</code>. Pure and cacheable for all visitors (SSG/ISR).
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                      <span className="text-xs font-bold text-foreground">2. Cookies &amp; Headers</span>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Handled in Server Components inside <code>&lt;Suspense&gt;</code> to stream without bailing out the whole page.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/20 p-3 space-y-1">
                      <span className="text-xs font-bold text-foreground">3. Universal useSearchParams()</span>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Works in <strong>Server Components</strong> (streamed with <code>&lt;Suspense&gt;</code>) and in <strong>Client Components</strong> (for instant UI state).
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
                pre-rendered at build time (SSG). By default, any dynamic path
                not returned is generated on-demand when first requested and <strong>cached
                statically for all subsequent visitors</strong> (Incremental Static Generation / ISG),
                unless disabled via <code>allowISG: false</code> (which strictly restricts routes to the pre-rendered list and returns <code>404</code> for any other path).
              </p>

              {/* 2.1 Constant vs Function */}
              <section
                id="constant-vs-function"
                className="mt-6 scroll-mt-20"
              >
                <h4>2.1. Constant Array vs Function Export</h4>
                <p>
                  In Dinou v7, <code>getStaticPaths</code> supports both a{" "}
                  <strong>constant array export</strong> (for known, fixed paths)
                  and a <strong>synchronous or asynchronous function export</strong>{" "}
                  (for dynamic data sources like databases or headless CMSs):
                </p>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-4">
                  <Card>
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
                      <CodeBlock language="typescript" hideHeader>
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

// Best Practice: Type-safe constant array
export const getStaticPaths: PageFunctions<RouteParams<"/blog/[slug]">]["getStaticPaths"] = [
  "foo",
  "bar",
];`}
                      </CodeBlock>
                    </CardContent>
                  </Card>

                  <Card>
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
                      <CodeBlock language="typescript" hideHeader>
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";
import { db } from "@/lib/db";

// Best Practice: Type-safe async function loader
export const getStaticPaths: PageFunctions<RouteParams<"/blog/[slug]">]["getStaticPaths"] = async () => {
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
import type { PageFunctions, RouteParams } from "dinou";

// Best Practice: Type-safe constant array (string[] or number[])
export const getStaticPaths: PageFunctions<RouteParams<"/blog/[id]">]["getStaticPaths"] = [
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
import type { PageFunctions, RouteParams } from "dinou";

// Pass undefined to pre-render the base route without the segment
export const getStaticPaths: PageFunctions<
  RouteParams<"/shop/[[category]]">
>["getStaticPaths"] = [
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
import type { PageFunctions, RouteParams } from "dinou";

// Best Practice: Type-safe catch-all segments (string[][])
// Each entry represents an array of path segments
export const getStaticPaths: PageFunctions<RouteParams<"/docs/[...slug]">]["getStaticPaths"] = [
  ["intro"],             // Generates /docs/intro
  ["api", "v1", "auth"], // Generates /docs/api/v1/auth
];`,
                      },
                      {
                        id: "optional-catchall",
                        label: "Optional [[...slug]]",
                        language: "typescript",
                        code: `// src/docs/[[...slug]]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

// Pass an empty array [] to pre-render the root route (/docs)
export const getStaticPaths: PageFunctions<RouteParams<"/docs/[[...slug]]">>["getStaticPaths"] = [
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
                      <strong>What <code>page.tsx</code> receives:</strong> In Dinou, <code>params.slug</code> is <strong>guaranteed to always be an array</strong> (<code>string[]</code>). For the root page, it receives an empty array <code>[]</code> (length 0). It is <strong>never</strong> <code>undefined</code>, <strong>never</strong> <code>[undefined]</code>, and <strong>never</strong> a bare string. You can safely call <code>params.slug.join(&quot;/&quot;)</code> or <code>params.slug.length</code> without defensive <code>Array.isArray()</code> checks.
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

                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6 not-prose my-6">
                  {/* Broken Chain */}
                  <div className="w-full mb-6 md:mb-0">
                    <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-900/10 h-full">
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
                  <div className="w-full">
                    <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10 h-full">
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
                            hideHeader
                          >
{`// 1. Parent: src/shop/[category]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

export const getStaticPaths: PageFunctions<RouteParams<"/shop/[category]">]["getStaticPaths"] = [
  "shoes",
  "shirts",
];

// 2. Child: src/shop/[category]/[id]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

export const getStaticPaths: PageFunctions<RouteParams<"/shop/[category]/[id]">]["getStaticPaths"] = [
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
import type { PageFunctions, RouteParams } from "dinou";

export const getStaticPaths: PageFunctions<
  RouteParams<"/shop/[category]/[brand]/[...specs]">
>["getStaticPaths"] = [
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
import type { PageFunctions, RouteParams } from "dinou";

export const getStaticPaths: PageFunctions<
  RouteParams<"/shop/[category]/[id]/[[format]]">
>["getStaticPaths"] = [
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
import type { PageFunctions, RouteParams } from "dinou";
import { db } from "@/lib/db";

// Best Practice: Type-safe async generator querying a database or CMS
export const getStaticPaths: PageFunctions<RouteParams<"/products/[id]">]["getStaticPaths"] = async () => {
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
                3. <code>validateParams</code> (Route Parameter Validation)
              </h3>
              <p>
                Validates dynamic parameters (such as <code>[id]</code> or{" "}
                <code>[...slug]</code>) on the server prior to rendering. If{" "}
                <code>validateParams</code> returns <code>false</code> (or a
                falsy value), Dinou immediately terminates request processing and
                issues a <strong>404 Not Found</strong> response.
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Function Signature</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <strong>Arguments:</strong> <code>params?: TParams</code>{" "}
                    (The normalized route parameters object)
                  </li>
                  <li>
                    <strong>Returns:</strong> <code>boolean | Promise&lt;boolean&gt;</code>{" "}
                    (Return <code>false</code> to abort rendering and return 404)
                  </li>
                </ul>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
{`// src/posts/[id]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

// Best Practice: Type-safe route parameter validation
export const validateParams: PageFunctions<
  RouteParams<"/posts/[id]">
>["validateParams"] = (params) => {
  // Only allow positive integer IDs; reject malformed requests with 404
  return typeof params?.id === "string" && /^\\d+$/.test(params.id);
};`}
              </CodeBlock>

              <div className="border rounded-lg p-5 bg-card not-prose my-6 space-y-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>Universal Gatekeeper: Authority Across All Rendering Modes</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <code>validateParams</code> is the <strong>first line of defense</strong> executed by the Dinou server engine on every incoming request. It has ultimate veto power regardless of whether the route is pure static (SSG), on-demand (ISG), or dynamic (SSR):
                </p>

                <div className="grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1.5">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block">
                      1. With ISG (allowISG: true)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Rejects malformed or invalid IDs <strong>before</strong> on-demand generation starts. Prevents wasteful database queries and stops bots from polluting disk/KV cache with junk pages.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1.5">
                    <span className="font-semibold text-amber-600 dark:text-amber-400 block">
                      2. With Strict SSG (allowISG: false)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Ultimate veto: even if a static HTML file was pre-rendered by <code>getStaticPaths</code> at build time, returning <code>false</code> immediately blocks delivery with 404, preventing obsolete or revoked pages from being served.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1.5">
                    <span className="font-semibold text-purple-600 dark:text-purple-400 block">
                      3. With Dynamic SSR (revalidate &lt; 1)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Protects your live server from malicious parameter inputs. Rendering halts and returns 404 <strong>before</strong> <code>getProps</code> or your page component runs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. allowISG */}
            <section id="allowisg" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                4. <code>allowISG</code> (Incremental Static Opt-Out)
              </h3>
              <p>
                Controls whether dynamic paths that were not pre-rendered at
                build time (via <code>getStaticPaths</code> during <code>dinou build</code>) are allowed to be
                generated on-demand on the first incoming user request. In Dinou v7, pre-rendering happens strictly during the build phase, ensuring production server startup is instantaneous.
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Settings className="h-5 w-5 text-blue-500" />
                  <span>Opt-Out Behavior</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <strong>Default:</strong> <code>true</code>. Any valid path
                    not pre-generated at build time is generated on-demand and
                    cached.
                  </li>
                  <li>
                    <strong>Strict SSG (false):</strong> Returning <code>false</code>{" "}
                    disables on-demand generation. Any request to a path not
                    included in <code>getStaticPaths</code> returns 404 immediately.
                  </li>
                  <li>
                    <strong>Async Kill-Switch:</strong> Returning a <code>Promise&lt;boolean&gt;</code> dynamically evaluates runtime flags or system load before permitting on-demand generation.
                  </li>
                </ul>
              </div>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Static Boolean (Strict SSG)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-muted-foreground">
                      Disables on-demand generation permanently. Any path not returned by <code>getStaticPaths</code> returns 404 immediately:
                    </p>
                    <CodeBlock language="typescript" hideHeader>
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";

// Strictly serve build-time pre-rendered paths
export const allowISG: PageFunctions["allowISG"] = false;`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Zap className="h-5 w-5" />
                      <span>Async Function (Dynamic Kill-Switch)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-muted-foreground">
                      Dynamically toggles ISG via remote config or feature flags (e.g. Redis, LaunchDarkly) to protect upstream databases:
                    </p>
                    <CodeBlock language="typescript" hideHeader>
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";
import { getFeatureFlag } from "@/lib/flags";

// Protect origin database during maintenance or traffic spikes
export const allowISG: PageFunctions["allowISG"] = async () => {
  const isgAllowed = await getFeatureFlag("allow_ondemand_rendering");
  return isgAllowed;
};`}
                    </CodeBlock>
                  </CardContent>
                </Card>
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
                <strong>single source of truth</strong> for route caching and
                rendering behavior. It is measured in <strong>seconds (s)</strong>.
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
                      invalidation via <code>revalidatePath()</code> or{" "}
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
                  using <code>export function dynamic()</code>. In Dinou v7,{" "}
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
                Assigns custom tags to the static page cache files, allowing the
                page to be purged and regenerated on-demand using{" "}
                <a
                  href="/docs/revalidation#revalidatetag"
                  className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
                >
                  <code>revalidateTag(tag)</code> (On-Demand Revalidation)
                </a>
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
import type { PageFunctions, RouteParams } from "dinou";

// Best Practice: Type-safe synchronous cache tags
export const getCacheTags: PageFunctions<
  RouteParams<"/products/[id]">
>["getCacheTags"] = (params) => {
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
import type { PageFunctions, RouteParams } from "dinou";
import { db } from "@/lib/db";

// Best Practice: Type-safe async tag resolver
export const getCacheTags: PageFunctions<
  RouteParams<"/products/[id]">
>["getCacheTags"] = async (params) => {
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
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  New in v7
                </span>
              </div>
              <p className="mt-4">
                Partial Prerendering (PPR) combines the instant TTFB (Time to
                First Byte) of a static page with the real-time capabilities of
                dynamic server-side rendering over a single HTTP response.
              </p>

              <div className="border rounded-lg p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <span>How PPR Works: Instant Shell + Progressive Streaming</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  PPR eliminates the traditional trade-off between static and dynamic rendering by dividing the page into two phases over a <strong>single HTTP connection</strong>:
                </p>
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
                      1. Instant Static Shell (0ms TTFB)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      All static UI (layouts, headers, navigation) along with the skeleton placeholders defined in <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code> are delivered immediately to the browser with zero server wait time.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-muted/40 space-y-1">
                    <span className="font-semibold text-purple-600 dark:text-purple-400 block">
                      2. Parallel Component Streaming
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Async Server Components wrapped in <code>&lt;Suspense&gt;</code> execute concurrently on the server. As each component resolves its database or API queries, its HTML/RSC chunk is streamed down to replace the skeleton in-place.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-card not-prose my-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  <span>Declaration Formats &amp; Type Signature</span>
                </div>
                <div className="font-mono text-xs bg-muted/60 p-2.5 rounded-md mb-3 text-purple-700 dark:text-purple-300">
                  type PPRConfig = boolean | (() =&gt; boolean | Promise&lt;boolean&gt;);
                </div>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Boolean Flag:</strong> <code>export const ppr: PageFunctions[&quot;ppr&quot;] = true;</code> (or <code>false</code> to opt out).
                  </li>
                  <li>
                    <strong>Sync Function:</strong> <code>() =&gt; boolean</code> (e.g. evaluate environment variables or server conditions).
                  </li>
                  <li>
                    <strong>Async Function:</strong> <code>() =&gt; Promise&lt;boolean&gt;</code> (e.g. await remote feature flags or rollout gates).
                  </li>
                </ul>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
{`// src/dashboard/page_functions.ts
import type { PageFunctions } from "dinou";
import { getFeatureFlag } from "@/lib/flags";

// 1. Static Boolean (Standard): Enable PPR for this route
export const ppr: PageFunctions["ppr"] = true;

// 2. Dynamic Async Function: Evaluate remote rollout flags or A/B testing
// export const ppr: PageFunctions["ppr"] = async () => {
//   const isPPREnabled = await getFeatureFlag("enable_ppr_dashboard");
//   return isPPREnabled;
// };`}
              </CodeBlock>

              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
{`// src/dashboard/page.tsx
import { Suspense } from "react";
import { UserStatsSkeleton, UserStats } from "./components";

export default function DashboardPage() {
  return (
    <div>
      {/* 1. Static shell rendered and delivered instantly */}
      <header className="p-6 border-b">
        <h1>Dashboard Overview</h1>
      </header>

      {/* 2. Dynamic component streamed over HTTP once server data resolves */}
      <Suspense fallback={<UserStatsSkeleton />}>
        <UserStats />
      </Suspense>
    </div>
  );
}`}
              </CodeBlock>
            </section>

            {/* 8. End-to-End Type-Safe Example */}
            <section
              id="type-safe-example"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  8. End-to-End Type-Safe Example (<code>page_functions.ts</code>)
                </h3>
              </div>
              <p className="mt-4">
                To achieve complete type safety, autocompletion, and compile-time
                validation in your routes, import <code>PageFunctions</code> (or{" "}
                <code>LayoutFunctions</code>) from <code>&quot;dinou&quot;</code>{" "}
                and pass your parameter and props types:
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>How TypeScript Inference Works</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li>
                    <strong><code>PageFunctions&lt;TParams, TProps&gt;</code></strong>:
                    Defines the contract for all functions in <code>page_functions.ts</code>.
                  </li>
                  <li>
                    <strong>Indexed Access Typing:</strong> Annotating exports with{" "}
                    <code>PageFunctions&lt;TParams, TProps&gt;[&quot;getProps&quot;]</code> ensures{" "}
                    <code>params</code> is typed automatically as <code>TParams</code> and the returned
                    object is validated against <code>TProps</code>.
                  </li>
                  <li>
                    <strong>Unified Interface:</strong> Both <code>page_functions.ts</code> and{" "}
                    <code>layout_functions.ts</code> share the exact same structural types.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="font-semibold text-sm text-muted-foreground">
                  1. Defining <code>src/blog/[slug]/page_functions.ts</code>
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/[slug]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

// 1. Route parameters automatically inferred from the route string pattern
type BlogParams = RouteParams<"/blog/[slug]">; // Inferred as: { slug: string }

// 2. Define page props types
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

// 3. Static Paths (constant array or function)
export const getStaticPaths: PageFunctions<BlogParams>["getStaticPaths"] = [
  "getting-started",
  "building-with-dinou-v7",
];

// 4. Props loader: loads static article content for the 0ms shell
export const getProps: PageFunctions<BlogParams, BlogPageProps>["getProps"] = async (params) => {
  // params?.slug is strongly typed as string | undefined
  const post = await db.posts.findUnique({ where: { slug: params?.slug } });
  if (!post) throw new Error("Post not found");

  // Directly returns BlogPageProps (type error if shape doesn't match!)
  return { post };
};

// 5. Caching Strategy & PPR configuration
export const revalidate: PageFunctions["revalidate"] = 60; // ISR 60s
export const ppr: PageFunctions["ppr"] = true;             // PPR: Static shell + Suspense streaming

// 6. Parameter validation hook (returns false to abort with 404)
export const validateParams: PageFunctions<BlogParams>["validateParams"] = (params) => {
  return typeof params?.slug === "string" && params.slug.length >= 3;
};

// 7. Cache tags for on-demand revalidation via revalidateTag("blog")
export const getCacheTags: PageFunctions<BlogParams>["getCacheTags"] = (params) => {
  return ["blog", \`post-\${params?.slug}\`];
};`}
                </CodeBlock>

                <p className="font-semibold text-sm text-muted-foreground mt-6">
                  2. Consuming Props in <code>src/blog/[slug]/page.tsx</code>
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/[slug]/page.tsx
import { Suspense } from "react";
import type { PageProps } from "dinou";
import type { BlogPageProps } from "./page_functions";
import { RealtimeViews, ViewsSkeleton } from "./components";

// Extend PageProps to receive both route params and loader data with full type safety
interface BlogPostPageProps extends PageProps<"/blog/[slug]">, BlogPageProps {}

export default function BlogPostPage({ params, post }: BlogPostPageProps) {
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
}`}
                </CodeBlock>

                <p className="font-semibold text-sm text-muted-foreground mt-8">
                  3. Defining <code>src/blog/layout_functions.ts</code>
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/layout_functions.ts
import type { LayoutFunctions, RouteParams } from "dinou";
import { db } from "@/lib/db";

// 1. Layout parameters for /blog (static route segment without dynamic params = {})
type BlogLayoutParams = RouteParams<"/blog">;

// 2. Define layout data contract
export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

export interface BlogLayoutData {
  categories: BlogCategory[];
  featuredSlug: string;
}

// 3. Dedicated layout loader typed via LayoutFunctions
export const getProps: LayoutFunctions<BlogLayoutParams, BlogLayoutData>["getProps"] = async () => {
  const categories = await db.categories.findMany();
  const featured = await db.posts.findFirst({ where: { featured: true } });

  // Injected directly as props into layout.tsx
  return {
    categories,
    featuredSlug: featured?.slug ?? "welcome",
  };
};

// 4. Segment-level caching strategy for the layout shell
export const revalidate: LayoutFunctions["revalidate"] = 300; // Layout revalidates every 5 mins
export const ppr: LayoutFunctions["ppr"] = true;`}
                </CodeBlock>

                <p className="font-semibold text-sm text-muted-foreground mt-6">
                  4. Consuming Props in <code>src/blog/layout.tsx</code>
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/layout.tsx
import type { LayoutProps } from "dinou";
import type { BlogLayoutData } from "./layout_functions";

// Extend LayoutProps to receive children, segment params, and layout loader data
interface BlogLayoutComponentProps extends LayoutProps<"/blog">, BlogLayoutData {}

export default function BlogLayout({
  children,
  categories,
  featuredSlug,
}: BlogLayoutComponentProps) {
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
}`}
                </CodeBlock>
              </div>

              <div className="mt-6">
                <Alert className="not-prose">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <AlertTitle>Alternative Object Destructuring Pattern</AlertTitle>
                  <AlertDescription>
                    You can also declare a single config object typed with{" "}
                    <code>PageFunctions&lt;BlogParams, BlogPageProps&gt;</code> (for pages) or{" "}
                    <code>LayoutFunctions&lt;any, BlogLayoutData&gt;</code> (for layouts) and
                    export its properties directly:
                    <div className="mt-2 space-y-3">
                      <CodeBlock language="typescript" hideHeader>
{`// 1. Page Config Object in src/blog/[slug]/page_functions.ts
const pageConfig: PageFunctions<BlogParams, BlogPageProps> = {
  ppr: true,
  revalidate: 60,
  getStaticPaths: ["welcome", "announcement"],
  getProps: async (params) => {
    const post = await fetchPost(params?.slug);
    return { post, views: 100 };
  },
  validateParams: (params) => Boolean(params?.slug),
  getCacheTags: (params) => ["blog", \`post-\${params?.slug}\`],
};

export const { ppr, revalidate, getStaticPaths, getProps, validateParams, getCacheTags } = pageConfig;

// 2. Layout Config Object in src/blog/layout_functions.ts
const layoutConfig: LayoutFunctions<any, BlogLayoutData> = {
  revalidate: 300,
  ppr: true,
  getProps: async () => ({
    categories: await fetchCategories(),
    featuredSlug: "welcome",
  }),
};

export const { revalidate: layoutRevalidate, ppr: layoutPpr, getProps: layoutGetProps } = layoutConfig;`}
                      </CodeBlock>
                    </div>
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
