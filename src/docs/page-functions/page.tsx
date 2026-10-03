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
    id: "normalization-guarantee",
    title: "2.8. Normalization Guarantee",
    level: 3,
  },
  {
    id: "async-support",
    title: "2.9. Async Support (CMS & DB)",
    level: 3,
  },
  {
    id: "revalidate",
    title: "3. revalidate (ISR & Dynamic SSR Escape)",
    level: 2,
  },
  {
    id: "ppr",
    title: "4. ppr (Partial Prerendering)",
    level: 2,
  },
  {
    id: "validateparams",
    title: "5. validateParams (Route Parameter Validation)",
    level: 2,
  },
  {
    id: "allowisg",
    title: "6. allowISG (Incremental Static Opt-Out)",
    level: 2,
  },
  {
    id: "getcachetags",
    title: "7. getCacheTags (Cache Tagging)",
    level: 2,
  },
  {
    id: "typescript-reference",
    title: "8. TypeScript Reference (RouteSegmentConfig)",
    level: 2,
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

              <p>
                Both files implement the exact same unified interface:{" "}
                <code>RouteSegmentConfig&lt;TParams, TProps&gt;</code>.
              </p>
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
                  Example: Page Component Loader
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/[slug]/page_functions.ts
export async function getProps(params: { slug: string }) {
  const post = await db.getPost(params.slug);
  // Directly returns the props for page.tsx
  return { post };
}

// src/blog/[slug]/page.tsx
export default function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`}
                </CodeBlock>

                <p className="font-semibold text-sm text-muted-foreground mt-4">
                  Example: Layout Component Loader
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/layout_functions.ts
export async function getProps() {
  const categories = await db.getCategories();
  // Directly returns props for layout.tsx
  return { categories };
}

// src/blog/layout.tsx
export default function BlogLayout({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: string[];
}) {
  return (
    <div className="blog-shell">
      <BlogSidebar categories={categories} />
      <main>{children}</main>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <Alert className="not-prose mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Design Note</AlertTitle>
                <AlertDescription>
                  <code>getProps</code> only receives <code>params</code>. For
                  request-specific dynamic context such as <code>searchParams</code>{" "}
                  or <code>cookies</code>, read them directly within Server
                  Components using React <code>&lt;Suspense&gt;</code> or invoke
                  Server Functions to prevent blocking the initial HTML render.
                </AlertDescription>
              </Alert>
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
                pre-rendered at build/server startup time (SSG). Any dynamic path
                not returned will be generated on-demand when first requested
                (Incremental Static Generation), unless disabled via{" "}
                <code>allowISG</code>.
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
{`// Exported directly as a constant
export const getStaticPaths = ["foo", "bar"];`}
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
{`// Exported as an async function
export async function getStaticPaths() {
  const ids = await db.getTopProductIds();
  return ids;
}`}
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
                          <strong>Nested / Multi-parameter</strong>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>Record&lt;string, any&gt;[]</code>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>
                            {`[{ id: "1", category: "tech" }]`}
                          </code>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2.3 Simple Routes */}
              <section id="simple-routes" className="mt-8 scroll-mt-20">
                <h4>2.3. Simple Dynamic Routes</h4>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/[id]/page_functions.ts

// Constant export:
export const getStaticPaths = ["1", "2", "3"];
// Generates /blog/1, /blog/2, /blog/3`}
                </CodeBlock>
              </section>

              {/* 2.4 Catch-all Routes */}
              <section id="catch-all-routes" className="mt-8 scroll-mt-20">
                <h4>2.4. Catch-all Routes</h4>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/docs/[...slug]/page_functions.ts

export const getStaticPaths = [
  ["intro"],             // Generates /docs/intro
  ["api", "v1", "auth"], // Generates /docs/api/v1/auth
];`}
                </CodeBlock>
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
                  When nesting routes,{" "}
                  <strong>dependency flows strictly downwards</strong>. If an
                  intermediate segment contains a <code>page.tsx</code>, it acts
                  as a mandatory gatekeeper in the static generation chain.
                </p>
                <p>
                  If a parent segment returns an empty array,{" "}
                  <strong>the generator stops at that level</strong>. It will not
                  reach child sub-pages, even if those child pages define their
                  own valid <code>getStaticPaths</code>.
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
                      <CardContent className="text-sm">
                        <p>
                          If <code>src/case3/[slug]/page_functions.ts</code>{" "}
                          returns <code>[]</code>:
                        </p>
                        <ol className="list-decimal pl-4 mt-2 space-y-1">
                          <li>
                            Dinou attempts to build <code>/case3/[slug]</code>.
                          </li>
                          <li>
                            No paths are returned; no parent directory entries
                            exist.
                          </li>
                          <li>
                            <strong>Result:</strong> The build process never
                            attempts to generate child <code>[id]</code>.
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
                      <CardContent className="text-sm">
                        <p>
                          The parent resolves its own level first, enabling
                          children to run:
                        </p>
                        <div className="mt-2">
                          <CodeBlock
                            language="typescript"
                            containerClassName="w-full overflow-hidden rounded-lg text-xs"
                            hideHeader
                          >
{`// src/case3/[slug]/page_functions.ts
export const getStaticPaths = ["foo", "bar"];

// src/case3/[slug]/[id]/page_functions.ts
export const getStaticPaths = ["100", "200"];
// Generates:
// /case3/foo/100, /case3/foo/200
// /case3/bar/100, /case3/bar/200`}
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
                    Every intermediate <code>page.tsx</code> in the hierarchy is
                    responsible for opening the door to its nested descendants.
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
                  <strong>without intermediate pages</strong>, return an{" "}
                  <strong>Object</strong> mapping all parameter names at once:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// Structure: src/shop/[category]/[...specs]/[[brand]]/page_functions.ts
// ([category] and [...specs] do NOT have their own page.tsx)

export function getStaticPaths() {
  return [
    {
      category: "electronics",
      specs: ["m3", "16gb"],
      brand: "apple",
    },
    {
      category: "clothing",
      specs: ["cotton", "white"],
      brand: undefined, // Valid: optional segment at the end of the route
    },
  ];
}`}
                </CodeBlock>
                <Alert className="not-prose mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No-Gap Rule</AlertTitle>
                  <AlertDescription>
                    You can use <code>undefined</code> for an optional segment{" "}
                    <strong>
                      only if all subsequent segments are also <code>undefined</code>
                    </strong>
                    . You cannot leave a gap (an undefined segment followed by a
                    defined one).
                  </AlertDescription>
                </Alert>
              </section>

              {/* 2.8 Normalization Guarantee */}
              <section
                id="normalization-guarantee"
                className="mt-8 scroll-mt-20"
              >
                <h4>2.8. Normalization Guarantee</h4>
                <p>
                  Dinou guarantees that <code>params</code> shapes are 100%
                  consistent between build-time SSG and request-time SSR:
                </p>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Cpu className="h-5 w-5 text-blue-500" />
                        <span>Catch-all Segments</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Always normalized to an <code>Array</code> (e.g.,{" "}
                      <code>undefined</code> becomes <code>[]</code>,{" "}
                      <code>&quot;val&quot;</code> becomes{" "}
                      <code>[&quot;val&quot;]</code>).
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Settings className="h-5 w-5 text-purple-500" />
                        <span>Optional Single Segments</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Consistently remain <code>undefined</code> if omitted.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 2.9 Async Support */}
              <section id="async-support" className="mt-8 scroll-mt-20">
                <h4>2.9. Async Support (CMS &amp; DB)</h4>
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

export async function getStaticPaths() {
  // Only pre-generate the top 50 products at build time
  const featured = await db.getFeaturedProducts({ limit: 50 });
  return featured.map((p) => p.id);
  
  // Any product ID outside the top 50 will be generated
  // on-demand when first requested by a user (ISG).
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 3. revalidate */}
            <section id="revalidate" className="mt-12 pt-8 border-t scroll-mt-20">
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  3. <code>revalidate</code> (ISR &amp; Dynamic SSR Escape)
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
                  Examples: Constant or Function Declaration
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// 1. Force Dynamic SSR on every request (replaces legacy 'dynamic' export)
export const revalidate = 0;

// 2. Incremental Static Regeneration (re-evaluates every 60 seconds)
export const revalidate = 60;

// 3. Or export as a sync or async function
export function revalidate() {
  return 120; // 2 minutes
}`}
                </CodeBlock>
              </div>

              <Alert className="not-prose mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Migration from Legacy dynamic Export</AlertTitle>
                <AlertDescription>
                  In previous versions of Dinou, dynamic rendering was toggled
                  using <code>export function dynamic()</code>. In Dinou v7,{" "}
                  <code>dynamic</code> has been completely removed. Setting{" "}
                  <code>export const revalidate = 0;</code> (or any value &lt; 1)
                  is the official, unified way to escape static generation.
                </AlertDescription>
              </Alert>
            </section>

            {/* 4. ppr */}
            <section id="ppr" className="mt-12 pt-8 border-t scroll-mt-20">
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  4. <code>ppr</code> (Partial Prerendering)
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

              <div className="border rounded-lg p-4 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <span>How PPR Operates in Dinou</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When <code>ppr</code> is enabled in <code>page_functions.ts</code>{" "}
                  or <code>layout_functions.ts</code>, Dinou generates an instant
                  static HTML shell for all non-Suspended elements. Dynamic holes
                  wrapped in React <code>&lt;Suspense&gt;</code> are then streamed
                  as RSC chunks as soon as their server data resolves, without
                  waiting for the whole page.
                </p>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/dashboard/page_functions.ts

// Enable Partial Prerendering as a constant
export const ppr = true;

// Or as a function (sync or async)
// export function ppr() { return true; }`}
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

      {/* 2. Dynamic hole streamed in over HTTP once server data is ready */}
      <Suspense fallback={<UserStatsSkeleton />}>
        <UserStats />
      </Suspense>
    </div>
  );
}`}
              </CodeBlock>
            </section>

            {/* 5. validateParams */}
            <section
              id="validateparams"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                5. <code>validateParams</code> (Route Parameter Validation)
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

export async function validateParams(params: { id: string }) {
  // Only allow positive integer IDs; reject malformed requests with 404
  return typeof params.id === "string" && /^\\d+$/.test(params.id);
}`}
              </CodeBlock>
            </section>

            {/* 6. allowISG */}
            <section id="allowisg" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                6. <code>allowISG</code> (Incremental Static Opt-Out)
              </h3>
              <p>
                Controls whether dynamic paths that were not pre-rendered during
                server startup (via <code>getStaticPaths</code>) are allowed to be
                generated on-demand on the first incoming user request.
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
                </ul>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
{`// src/blog/[slug]/page_functions.ts

// Disable on-demand generation; only serve pre-rendered paths
export const allowISG = false;

// Or as a function
// export function allowISG() { return false; }`}
              </CodeBlock>
            </section>

            {/* 7. getCacheTags */}
            <section
              id="getcachetags"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  7. <code>getCacheTags</code> (Cache Tagging)
                </h3>
              </div>
              <p className="mt-4">
                Assigns custom tags to the static page cache files, allowing the
                page to be purged and regenerated on-demand using{" "}
                <code>revalidateTag(tag)</code>.
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
                    <strong>Function (Sync/Async):</strong>{" "}
                    <code>getCacheTags(params) =&gt; string[] | Promise&lt;string[]&gt;</code>
                  </li>
                </ul>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
{`// src/products/[id]/page_functions.ts

export function getCacheTags(params: { id: string }) {
  // Associate the generated page with a general tag and a product tag
  return [
    "products",
    \`product-\${params.id}\`
  ];
}`}
              </CodeBlock>
            </section>

            {/* 8. TypeScript Reference */}
            <section
              id="typescript-reference"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                8. TypeScript Reference (<code>RouteSegmentConfig</code>)
              </h3>
              <p>
                Both <code>PageFunctions</code> and <code>LayoutFunctions</code>{" "}
                export types are governed by <code>RouteSegmentConfig</code> in{" "}
                <code>dinou</code>:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
{`import type { PageFunctions, LayoutFunctions, RouteSegmentConfig } from "dinou";

export interface RouteSegmentConfig<TParams = any, TProps = any> {
  // Partial Prerendering toggle
  ppr?: boolean | (() => boolean | Promise<boolean>);

  // Cache & revalidation strategy in seconds (< 1 = Dynamic SSR, >= 1 = ISR, false = Static)
  revalidate?: number | false | (() => number | false | Promise<number | false>);

  // Cache tags for on-demand invalidation via revalidateTag(tag)
  getCacheTags?: string[] | ((params?: TParams) => string[] | Promise<string[]>);

  // Path generator for SSG (constant array or sync/async function)
  getStaticPaths?:
    | StaticPathItem<TParams>[]
    | (() => StaticPathsResult<TParams>);

  // Direct component props loader
  getProps?: (params?: TParams) => TProps | Promise<TProps>;

  // Route parameter validator (returns false to 404)
  validateParams?: (params?: TParams) => boolean | Promise<boolean>;

  // Incremental Static Generation opt-out
  allowISG?: boolean | (() => boolean | Promise<boolean>);
}`}
              </CodeBlock>
            </section>

            {/* 9. End-to-End Type-Safe Example */}
            <section
              id="type-safe-example"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  9. End-to-End Type-Safe Example (<code>page_functions.ts</code>)
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
import type { PageFunctions } from "dinou";

// 1. Define route parameter types
export interface BlogParams {
  slug: string;
}

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
  views: number;
}

// 3. Static Paths (constant array or function)
export const getStaticPaths: PageFunctions<BlogParams>["getStaticPaths"] = [
  "getting-started",
  "building-with-dinou-v7",
];

// 4. Props loader with strict parameter and return type checking
export const getProps: PageFunctions<BlogParams, BlogPageProps>["getProps"] = async (params) => {
  // params?.slug is strongly typed as string | undefined
  const post = await db.posts.findUnique({ where: { slug: params?.slug } });
  const views = await db.analytics.getViews(params?.slug);

  // Directly returns BlogPageProps (type error if shape doesn't match!)
  return { post, views };
};

// 5. Caching Strategy & PPR configuration
export const revalidate: PageFunctions["revalidate"] = 60; // ISR 60s
export const ppr: PageFunctions["ppr"] = true;             // Partial Prerendering

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
import type { BlogPageProps } from "./page_functions";

export default function BlogPostPage({ post, views }: BlogPageProps) {
  return (
    <article className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-sm text-muted-foreground my-2">
        By {post.author} • {views.toLocaleString()} views
      </div>
      <div className="prose mt-6">{post.content}</div>
    </article>
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
                    <code>PageFunctions&lt;BlogParams, BlogPageProps&gt;</code> and
                    export its properties directly:
                    <div className="mt-2">
                      <CodeBlock language="typescript" hideHeader>
{`const config: PageFunctions<BlogParams, BlogPageProps> = {
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

export const { ppr, revalidate, getStaticPaths, getProps, validateParams, getCacheTags } = config;`}
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
