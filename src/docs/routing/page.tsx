import { Link } from "dinou";
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
  Split,
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FolderTree,
  ShieldAlert,
  Ghost,
  Info,
  Route,
  Sparkles,
  ArrowRight,
  FolderLock,
  Compass,
  FileCode,
  ShieldCheck,
  RefreshCw,
  Terminal,
  Flag,
  SearchX,
  AlertCircle,
  Zap,
  RefreshCcw,
  Globe,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "overview", title: "1. Overview & Directory Conventions", level: 2 },
  { id: "core-conventions", title: "1.1. Core File Conventions", level: 3 },
  { id: "route-resolution", title: "1.2. In-Process Route Resolution", level: 3 },
  { id: "route-types", title: "2. Route Types & Pattern Matching", level: 2 },
  { id: "static-dynamic", title: "2.1. Static & Dynamic Segments", level: 3 },
  { id: "catch-all", title: "2.2. Catch-All & Optional Catch-All", level: 3 },
  { id: "no-gap-rule", title: "2.3. The Strict No-Gap Rule", level: 3 },
  { id: "route-props", title: "3. Route Parameters & Validation", level: 2 },
  { id: "params-injection", title: "3.1. Dynamic Params Prop Injection", level: 3 },
  { id: "validate-params", title: "3.2. Route Validation (validateParams)", level: 3 },
  { id: "query-params", title: "3.3. Query Parameters Access", level: 3 },
  { id: "layouts-special-files", title: "4. Layouts & Special Files", level: 2 },
  { id: "nested-layouts", title: "4.1. Nested Layouts (layout.tsx)", level: 3 },
  { id: "layout-functions", title: "4.2. Layout Data & Horizontal ISR (layout_functions.ts)", level: 3 },
  { id: "layout-flags", title: "4.3. Layout Control Flags (reset_layout, no_layout)", level: 3 },
  { id: "error-handling", title: "4.4. Route Error Boundaries (error.tsx)", level: 3 },
  { id: "not-found-pages", title: "4.5. Custom 404 Handlers (not_found.tsx)", level: 3 },
  { id: "advanced-patterns", title: "5. Advanced Routing Patterns", level: 2 },
  { id: "route-groups", title: "5.1. Route Groups (folder)", level: 3 },
  { id: "private-folders", title: "5.2. Escaping Route Scanning (_folder)", level: 3 },
  { id: "parallel-routes", title: "5.3. Parallel Routes & Slots (@slot)", level: 3 },
  { id: "error-containment", title: "5.4. Slot Error Containment Architecture", level: 3 },
  { id: "client-navigation", title: "6. Client Navigation & Soft Transitions", level: 2 },
  { id: "link-component", title: "6.1. The <Link> Component & Prefetching", level: 3 },
  { id: "fresh-prop", title: "6.2. The fresh Prop (Cache Busting)", level: 3 },
  { id: "programmatic-navigation", title: "6.3. Programmatic Navigation (useRouter)", level: 3 },
  { id: "navigation-hooks", title: "6.4. Navigation State Hooks", level: 3 },
  { id: "relative-routing", title: "7. Relative Routing Rules", level: 2 },
  { id: "directory-first", title: "7.1. Directory-First URL Resolution", level: 3 },
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
                File-System Architecture
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou v7 Complete Guide
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Routing, Layouts &amp; Navigation
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master Dinou&apos;s file-system router: nested layouts with independent Horizontal ISR, parallel slots with error isolation, layout control flags, and soft client navigation.
            </p>

            {/* Type-Safe Routing Callout */}
            <div className="not-prose rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Looking for Type-Safe Routing?
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Dinou v7 introduces zero-runtime type safety with auto-generated route definitions, IDE autocomplete, and typed <code>PageProps</code> &amp; <code>&lt;Link&gt;</code>.
                  </p>
                </div>
              </div>
              <Link
                href="/docs/type-safe-routing"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
              >
                <span>Type-Safe Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Directory Conventions
              </h2>
              <p>
                Every public route in Dinou maps directly to a folder inside <code>src/</code> containing an entrypoint file (<code>page.tsx</code>, <code>page.jsx</code>, <code>page.ts</code>, or <code>page.js</code>). By default, pages are React Server Components (RSC) rendered natively on the server with zero client bundle overhead.
              </p>

              <div id="core-conventions" className="scroll-mt-20 space-y-4 mt-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FolderTree className="h-5 w-5 text-blue-500" />
                  1.1. Core File Conventions
                </h3>
                <div className="not-prose bg-muted/50 rounded-xl p-5 border border-border flex items-center gap-5">
                  <div className="font-mono text-xs sm:text-sm space-y-2 text-slate-800 dark:text-slate-200">
                    <div>
                      <code>src/page.tsx</code> &rarr;{" "}
                      <span className="text-blue-600 dark:text-blue-400 font-bold">/</span>
                    </div>
                    <div>
                      <code>src/blog/page.tsx</code> &rarr;{" "}
                      <span className="text-blue-600 dark:text-blue-400 font-bold">/blog</span>
                    </div>
                    <div>
                      <code>src/blog/[slug]/page.tsx</code> &rarr;{" "}
                      <span className="text-blue-600 dark:text-blue-400 font-bold">/blog/hello-world</span>
                    </div>
                    <div>
                      <code>src/dashboard/settings/page.tsx</code> &rarr;{" "}
                      <span className="text-blue-600 dark:text-blue-400 font-bold">/dashboard/settings</span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="route-resolution" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-indigo-500" />
                  1.2. In-Process Route Resolution
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dinou resolves routes in-memory with zero subprocess latency. At startup, the engine registers all source files and resolves matching file paths, extracted dynamic parameters (<code>params</code>), nested layout hierarchies, and parallel slots in a single deterministic pass.
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported source file extensions include <code>.tsx</code>, <code>.ts</code>, <code>.jsx</code>, and <code>.js</code> across all routes.
                </p>
              </div>
            </section>

            {/* Section 2: Route Types & Pattern Matching */}
            <section id="route-types" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Route Types &amp; Pattern Matching
              </h2>
              <p>
                Dinou provides expressive pattern matching for static, dynamic, optional, and catch-all URL segments:
              </p>

              <div id="static-dynamic" className="scroll-mt-20 mt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Route className="h-5 w-5 text-cyan-500" />
                  2.1. Static &amp; Dynamic Segments
                </h3>

                <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Pattern</th>
                        <th className="p-3.5">Folder Structure</th>
                        <th className="p-3.5">URL Match Example</th>
                        <th className="p-3.5">Parsed <code>params</code></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs sm:text-sm">
                      <tr>
                        <td className="p-3.5 font-semibold">Static</td>
                        <td className="p-3.5 font-mono text-xs">src/about/page.tsx</td>
                        <td className="p-3.5 font-mono text-xs">/about</td>
                        <td className="p-3.5 font-mono text-xs text-muted-foreground"><code>&#123;&#125;</code></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold">Dynamic</td>
                        <td className="p-3.5 font-mono text-xs">src/blog/[slug]/page.tsx</td>
                        <td className="p-3.5 font-mono text-xs">/blog/hello</td>
                        <td className="p-3.5 font-mono text-xs text-blue-600 dark:text-blue-400"><code>&#123; slug: &quot;hello&quot; &#125;</code></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold">Optional Single</td>
                        <td className="p-3.5 font-mono text-xs">src/shop/[[category]]/page.tsx</td>
                        <td className="p-3.5 font-mono text-xs">/shop or /shop/shoes</td>
                        <td className="p-3.5 font-mono text-xs text-blue-600 dark:text-blue-400"><code>&#123; category: undefined &#125;</code> or <code>&#123; category: &quot;shoes&quot; &#125;</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="catch-all" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  2.2. Catch-All &amp; Optional Catch-All
                </h3>

                <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Pattern</th>
                        <th className="p-3.5">Folder Structure</th>
                        <th className="p-3.5">URL Match Example</th>
                        <th className="p-3.5">Parsed <code>params</code></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs sm:text-sm">
                      <tr>
                        <td className="p-3.5 font-semibold">Catch-all (Required)</td>
                        <td className="p-3.5 font-mono text-xs">src/docs/[...slug]/page.tsx</td>
                        <td className="p-3.5 font-mono text-xs">/docs/routing/params</td>
                        <td className="p-3.5 font-mono text-xs text-purple-600 dark:text-purple-400"><code>&#123; slug: [&quot;routing&quot;, &quot;params&quot;] &#125;</code></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold">Optional Catch-all</td>
                        <td className="p-3.5 font-mono text-xs">src/docs/[[...slug]]/page.tsx</td>
                        <td className="p-3.5 font-mono text-xs">/docs or /docs/a/b</td>
                        <td className="p-3.5 font-mono text-xs text-purple-600 dark:text-purple-400"><code>&#123; slug: [] &#125;</code> or <code>&#123; slug: [&quot;a&quot;, &quot;b&quot;] &#125;</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-muted-foreground">
                  Catch-all segments (<code>[...slug]</code>) consume all remaining path segments into a string array. Because they consume the remainder of the URL, Catch-all segments must always be the <strong>terminal (last) segment</strong> of a path definition.
                </p>
              </div>

              <div id="no-gap-rule" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  2.3. The Strict No-Gap Rule
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dinou enforces a strict <strong>No-Gap Rule</strong> when resolving nested optional segments such as <code>/inventory/[[warehouse]]/[[aisle]]</code>:
                </p>

                <div className="grid gap-4 md:grid-cols-2 not-prose my-4">
                  <Card className="border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Allowed: Trailing Omission</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p className="text-muted-foreground">
                        You can omit optional segments only if they are omitted from the <strong>tail end</strong> of the URL:
                      </p>
                      <div className="font-mono bg-background/80 p-2.5 rounded-lg border text-xs">
                        /inventory/main/a1 ✅ (both provided)<br />
                        /inventory/main ✅ (aisle omitted)<br />
                        /inventory ✅ (both omitted)
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                        <XCircle className="h-4 w-4" />
                        <span>Forbidden: Intercalated Gaps</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p className="text-muted-foreground">
                        You cannot omit an earlier optional parameter while setting a later one:
                      </p>
                      <div className="font-mono bg-background/80 p-2.5 rounded-lg border text-xs">
                        /inventory//a1 ❌ (empty gap)<br />
                        (Skip warehouse, set aisle: ambiguous URL structure)
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Section 3: Route Parameters & Validation */}
            <section id="route-props" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Route Parameters &amp; Validation
              </h2>
              <p>
                Dinou provides a clean, unified data contract. Route parameters are extracted from the URL and injected directly into components and server functions.
              </p>

              <div id="params-injection" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-blue-500" />
                  3.1. Dynamic Params Prop Injection
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In Dinou v7, parameters are strictly typed using <code>PageProps</code>, <code>LayoutProps</code>, and <code>RouteParams</code>:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                  <li><code>page.tsx</code> components: <code>Page(&#123; params &#125;: PageProps&lt;&quot;/blog/[slug]&quot;&gt;)</code></li>
                  <li><code>layout.tsx</code> components: <code>Layout(&#123; params, children &#125;: LayoutProps&lt;&quot;/blog/[slug]&quot;&gt;)</code></li>
                  <li><code>error.tsx</code> boundaries: <code>Error(&#123; error, params &#125;: &#123; error: Error; params: RouteParams&lt;&quot;/blog/[slug]&quot;&gt; &#125;)</code></li>
                  <li><code>not_found.tsx</code> 404 pages: <code>NotFound(&#123; params &#125;)</code></li>
                  <li>Parallel slot pages: <code>SlotPage(&#123; params &#125;)</code></li>
                  <li>Server data fetching: <code>getProps(params: RouteParams&lt;&quot;/blog/[slug]&quot;&gt;)</code> in <code>page_functions.ts</code></li>
                </ul>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg mt-3">
                  {`// src/blog/[slug]/page.tsx
import type { PageProps } from "dinou";

interface BlogPostProps extends PageProps<"/blog/[slug]"> {
  post?: { title: string; content: string };
}

export default function BlogPost({ params, post }: BlogPostProps) {
  // ✅ params.slug is strongly typed as string automatically
  return (
    <article className="p-6">
      <h1 className="text-2xl font-bold">{post?.title ?? params.slug}</h1>
      <p className="mt-2 text-muted-foreground">{post?.content}</p>
    </article>
  );
}`}
                </CodeBlock>

                <Alert className="not-prose mt-4">
                  <AlertCircle className="h-4 w-4 text-indigo-500" />
                  <AlertTitle>Strict Signature Rule</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    In <code>page_functions.ts</code> and <code>layout_functions.ts</code>, Dinou passes the parameters dictionary directly as the <strong>first argument</strong>: use <code>getProps(params)</code> and <code>validateParams(params)</code> (do <strong>not</strong> write <code>getProps(&#123; params &#125;)</code>). However, in React components (<code>page.tsx</code>, <code>layout.tsx</code>, <code>error.tsx</code>), <code>params</code> is passed as a component prop: <code>export default function Page(&#123; params &#125;)</code>.
                  </AlertDescription>
                </Alert>
              </div>

              <div id="validate-params" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  3.2. Route Validation (validateParams)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Exporting a <code>validateParams(params)</code> function from <code>page_functions.ts</code> or <code>layout_functions.ts</code> lets you enforce semantic validation rules before data fetching or rendering begins. Returning <code>false</code> (or a Promise that resolves to <code>false</code>) immediately aborts the request and issues a clean 404 response:
                </p>

                <CodeBlock language="typescript" containerClassName="w-full rounded-lg mt-2">
                  {`// src/product/[id]/page_functions.ts
export function validateParams(params: { id: string }) {
  // Ensure the product ID is strictly numeric; otherwise render 404
  return /^\\d+$/.test(params.id);
}

export async function getProps(params: { id: string }) {
  // Only called if validateParams returned true
  const product = await db.products.findById(params.id);
  return { product };
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Works consistently in dynamic server rendering, Incremental Static Generation (ISG), and static site exports.
                </p>
              </div>

              <div id="query-params" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-emerald-500" />
                  3.3. Query Parameters Access
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Query parameters (e.g. <code>?search=react&amp;sort=asc</code>) are deliberately isolated from static route matching to preserve edge cache stability. Access query strings using the official Dinou utilities:
                </p>

                <div className="grid gap-4 md:grid-cols-2 not-prose mt-3">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                    <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      Client Components (&quot;use client&quot;)
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Use the <code>useSearchParams()</code> hook. It returns a standard Web <code>URLSearchParams</code> instance:
                    </p>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                      {`import { useSearchParams } from "dinou";

export function SearchFilter() {
  const searchParams = useSearchParams();
  const q = searchParams.get("search");
  return <div>Query: {q}</div>;
}`}
                    </CodeBlock>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                    <div className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 mb-1">
                      Server Side (RSC / Functions)
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Access the request query object via <code>getContext().req.query</code>:
                    </p>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                      {`import { getContext } from "dinou";

export default function SearchPage() {
  const { req } = getContext();
  const query = req.query?.search;
  return <div>Search: {query}</div>;
}`}
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Layouts & Special Files */}
            <section id="layouts-special-files" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Layouts &amp; Special Files
              </h2>
              <p>
                Dinou provides special files that cascade down the directory hierarchy. They allow you to compose nested layouts, manage independent ISR lifecycles, isolate errors, and break out of hierarchies using control flags.
              </p>

              <div id="nested-layouts" className="scroll-mt-20 mt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  4.1. Nested Layouts (layout.tsx)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A <code>layout.tsx</code> wraps all child pages and sub-layouts in its directory. On client navigation between sibling pages, parent layouts preserve their React state, input fields, scroll position, and DOM tree without re-mounting.
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  A layout component receives <code>children</code>, <code>params</code>, any parallel slots (e.g. <code>sidebar</code>), and props returned by <code>layout_functions.ts</code>:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                  {`// src/dashboard/layout.tsx
import type { ReactNode } from "react";

export default function DashboardLayout({
  children,
  params,
  sidebar,
}: {
  children: ReactNode;
  params: { teamId?: string };
  sidebar?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">{sidebar}</aside>
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold">Team: {params.teamId}</h1>
        {children}
      </main>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <div id="layout-functions" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  4.2. Layout Data &amp; Horizontal ISR (layout_functions.ts)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In Dinou v7, layouts can declare their own independent data fetching and caching lifecycle via <code>layout_functions.ts</code>. This is <strong>Horizontal Layout ISR</strong>:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                  {`// src/dashboard/layout_functions.ts - Independent Layout ISR
export async function getProps(params: { teamId?: string }) {
  const team = await fetchTeamData(params.teamId);
  return { team };
}

// Layout caches independently for 1 hour (3600 seconds)
// Child pages inside this dashboard can update every 10 seconds without invalidating this layout!
export const revalidate = 3600;`}
                </CodeBlock>
              </div>

              <div id="layout-flags" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Flag className="h-5 w-5 text-amber-500" />
                  4.3. Layout Control Flags (reset_layout, no_layout)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dinou allows you to break out of the nested layout hierarchy using <strong>empty flag files</strong> (files without extensions) placed in the route directory:
                </p>

                <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm mt-3">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Flag File</th>
                        <th className="p-3.5">Applies To</th>
                        <th className="p-3.5">Architectural Effect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs sm:text-sm">
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">reset_layout</td>
                        <td className="p-3.5 font-mono text-xs">layout.tsx</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Resets the layout tree. This layout becomes the new root layout, completely ignoring all parent layouts (including <code>src/layout.tsx</code>). Perfect for marketing landing pages or auth portals.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-purple-600 dark:text-purple-400">no_layout</td>
                        <td className="p-3.5 font-mono text-xs">page.tsx</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Bypasses all layouts entirely. The page renders raw without any parent layout wrapper (ideal for embeddable widgets, checkout modals, or pure HTML canvas views).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-rose-600 dark:text-rose-400">no_layout_error</td>
                        <td className="p-3.5 font-mono text-xs">error.tsx</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Prevents parent layouts from wrapping the error boundary UI.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400">no_layout_not_found</td>
                        <td className="p-3.5 font-mono text-xs">not_found.tsx</td>
                        <td className="p-3.5 text-muted-foreground leading-relaxed">
                          Prevents parent layouts from wrapping the custom 404 page.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 not-prose mt-3">
                  <div className="font-semibold text-xs text-blue-700 dark:text-blue-300 mb-1">
                    Example: Standalone Landing Page
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    src/landing/layout.tsx<br />
                    src/landing/reset_layout (empty file)<br />
                    src/landing/page.tsx<br />
                    &rarr; The landing page ignores the root <code>src/layout.tsx</code> header and navigation bar.
                  </div>
                </div>
              </div>

              <div id="error-handling" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-rose-500" />
                  4.4. Route Error Boundaries (error.tsx)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Create an <code>error.tsx</code> file in any route directory to catch and isolate runtime errors locally. If an exception occurs in a child component, Dinou bubbles up to the closest <code>error.tsx</code>, rendering it while keeping all parent layouts interactive:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                  {`// src/dashboard/error.tsx
"use client"; // Optional: Can be Server or Client Component

export default function DashboardError({
  error,
  params,
}: {
  error: { message: string; name: string; stack?: string };
  params: Record<string, string>;
}) {
  return (
    <div className="p-6 rounded-xl border border-rose-500/20 bg-rose-50/20">
      <h3 className="text-rose-600 font-bold">Failed to load team {params.teamId}</h3>
      <p className="text-xs text-muted-foreground mt-1">{error.message}</p>
      {error.stack && (
        <pre className="mt-3 p-3 bg-slate-900 text-slate-100 rounded text-xs overflow-auto">
          {error.stack}
        </pre>
      )}
    </div>
  );
}`}
                </CodeBlock>

                <p className="text-xs text-muted-foreground">
                  <strong>Security Note:</strong> For production deployments, <code>error.stack</code> is automatically stripped by Dinou to prevent internal file paths and system details from leaking. In development mode, the full cleaned stack trace is provided.
                </p>
              </div>

              <div id="not-found-pages" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Ghost className="h-5 w-5 text-amber-500" />
                  4.5. Custom 404 Handlers (not_found.tsx)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Define custom 404 views by placing <code>not_found.tsx</code> in any route directory. When an unmatched URL segment is requested, Dinou renders the closest 404 boundary inside its enclosing layout.
                </p>
              </div>
            </section>

            {/* Section 5: Advanced Routing Patterns */}
            <section id="advanced-patterns" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Advanced Routing Patterns
              </h2>
              <p>
                Dinou provides advanced structural patterns to organize enterprise codebases cleanly without impacting URL ergonomics:
              </p>

              <div id="route-groups" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-500" />
                  5.1. Route Groups <code>(folder)</code>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Folders wrapped in parentheses are <strong>omitted</strong> from the public URL path. They allow you to organize routes logically, split layouts, or create multiple root layouts without changing URLs:
                </p>

                <div className="not-prose bg-muted/60 p-4 rounded-xl font-mono text-xs space-y-1.5 border">
                  <div>src/(auth)/login/page.tsx &rarr; <span className="font-bold text-blue-600 dark:text-blue-400">/login</span></div>
                  <div>src/(auth)/register/page.tsx &rarr; <span className="font-bold text-blue-600 dark:text-blue-400">/register</span></div>
                  <div>src/(marketing)/about/page.tsx &rarr; <span className="font-bold text-blue-600 dark:text-blue-400">/about</span></div>
                  <div>src/(marketing)/(nested)/pricing/page.tsx &rarr; <span className="font-bold text-blue-600 dark:text-blue-400">/pricing</span></div>
                </div>
              </div>

              <div id="private-folders" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FolderLock className="h-5 w-5 text-slate-500" />
                  5.2. Escaping Route Scanning with Underscore (<code>_folder</code>)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In Dinou, you <strong>do not need</strong> to prefix folders like <code>components/</code>, <code>hooks/</code>, or <code>utils/</code> with an underscore. Any directory that simply does not contain a <code>page.tsx</code> (or <code>page.jsx</code>) is already completely ignored by the router and will never register a route.
                </p>

                <Alert className="not-prose my-4 border-slate-500/20 bg-slate-50/50 dark:bg-slate-900/10">
                  <FolderLock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  <AlertTitle>The Real Purpose of &quot;_&quot;: Legacy Code &amp; Archived Pages</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    The <strong>sole and specific purpose</strong> of prefixing a directory with an underscore (<code>_folderName</code>) is to <strong>escape the in-process route scanner when dealing with legacy code, drafts, or archived folders that actually contain <code>page.tsx</code> / <code>page.jsx</code> files inside them</strong>.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    How it Works in Practice:
                  </p>
                  <div className="not-prose bg-muted/60 p-4 rounded-xl font-mono text-xs space-y-2 border">
                    <div className="text-slate-500 dark:text-slate-400">src/blog/</div>
                    <div className="pl-4">├── page.tsx <span className="text-blue-600 dark:text-blue-400 font-bold">&rarr; /blog (Active public route)</span></div>
                    <div className="pl-4 text-emerald-600 dark:text-emerald-400 font-semibold">├── components/ <span className="text-muted-foreground font-normal">(No page.tsx &rarr; already safe without &quot;_&quot;)</span></div>
                    <div className="pl-8 text-muted-foreground">└── post-card.tsx</div>
                    <div className="pl-4 text-amber-600 dark:text-amber-400 font-semibold">└── _legacy_v1/ <span className="text-muted-foreground font-normal">(Contains page.tsx, but &quot;_&quot; forces scanner to skip it!)</span></div>
                    <div className="pl-8 text-muted-foreground">├── page.tsx <span className="text-red-500 font-semibold">(SKIPPED &mdash; NOT a route)</span></div>
                    <div className="pl-8 text-muted-foreground">└── [slug]/page.tsx <span className="text-red-500 font-semibold">(SKIPPED &mdash; NOT a route)</span></div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Whenever Dinou&apos;s scanner encounters a folder starting with <code>_</code>, it completely bypasses that directory tree, ensuring that stale, archived, or legacy page files are never compiled into the production router.
                </p>
              </div>

              <div id="parallel-routes" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Split className="h-5 w-5 text-purple-500" />
                  5.3. Parallel Routes &amp; Slots (<code>@slot</code>)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Parallel routes allow you to render multiple independent pages simultaneously inside the same parent layout (e.g., <code>@sidebar</code>, <code>@analytics</code>, <code>@modal</code>):
                </p>

                <div className="grid md:grid-cols-2 gap-4 not-prose mt-3">
                  <div className="bg-card border rounded-xl p-4 text-xs">
                    <div className="font-bold mb-2 text-slate-900 dark:text-slate-100">Folder Structure</div>
                    <ul className="space-y-1.5 font-mono text-muted-foreground">
                      <li>src/dashboard/@sidebar/page.tsx</li>
                      <li>src/dashboard/@analytics/page.tsx</li>
                      <li>src/dashboard/page.tsx (main children)</li>
                      <li>src/dashboard/layout.tsx</li>
                    </ul>
                  </div>

                  <div className="bg-card border rounded-xl p-4 text-xs">
                    <div className="font-bold mb-2 text-slate-900 dark:text-slate-100">Layout Prop Injection</div>
                    <p className="text-muted-foreground mb-2">
                      Slots are passed as named props directly alongside <code>children</code>:
                    </p>
                    <code className="text-xs bg-muted p-2 rounded block font-mono">
                      {`export default function Layout({
  children,
  sidebar,
  analytics
}: {
  children: ReactNode;
  sidebar: ReactNode;
  analytics: ReactNode;
})`}
                    </code>
                  </div>
                </div>
              </div>

              <div id="error-containment" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  5.4. Slot Error Containment Architecture
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dinou isolates errors within parallel slots to prevent a single widget failure from crashing the entire page:
                </p>

                <div className="grid gap-4 md:grid-cols-3 not-prose">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <ShieldAlert className="h-4 w-4 text-blue-500" />
                        Slot with error.tsx
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                      If the slot fails, only that specific slot renders its local error UI. The rest of the page and sibling slots remain completely operational.
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-amber-500">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <Ghost className="h-4 w-4 text-amber-500" />
                        Slot without error.tsx
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                      If an unhandled exception occurs in a slot with no <code>error.tsx</code>, Dinou safely falls back to rendering <code>null</code> for that slot without taking down the page.
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <RefreshCw className="h-4 w-4 text-purple-500" />
                        Targeted Slot Refresh
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                      Slots can be refreshed independently from the client using <code>refreshSlot(&quot;sidebar&quot;)</code> or via cache invalidation tags without triggering a full page re-render.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Section 6: Client Navigation & Soft Transitions */}
            <section id="client-navigation" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Client Navigation &amp; Soft Transitions
              </h2>
              <p>
                Dinou provides smooth single-page application (SPA) client navigation with automatic hover prefetching, cache controls, and transition loading states.
              </p>

              <div id="link-component" className="scroll-mt-20 mt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-blue-500" />
                  6.1. The &lt;Link&gt; Component &amp; Prefetching
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use the <code>&lt;Link&gt;</code> component imported from <code>&quot;dinou&quot;</code>. It intercepts click events for instant client-side route transitions and automatically prefetches the target page in the background on mouse hover:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                  {`import { Link } from "dinou";

export function NavigationBar() {
  return (
    <nav className="flex gap-4">
      {/* ✅ Type-Safe href: autocompleted in your IDE via DinouRoute */}
      <Link href="/dashboard">Dashboard</Link>

      {/* ✅ Dynamic interpolation typed against registered routes */}
      <Link href={\`/blog/\${post.slug}\`}>Post</Link>

      {/* Disable prefetch for heavy routes */}
      <Link href="/analytics" prefetch={false}>
        Analytics
      </Link>

      {/* ❌ TypeScript compile error on invalid/dead links */}
      {/* <Link href="/broken-link">Broken</Link> */}
    </nav>
  );
}`}
                </CodeBlock>

                <Alert className="not-prose my-4">
                  <Globe className="h-4 w-4" />
                  <AlertTitle>Native Anchor Elements</AlertTitle>
                  <AlertDescription className="text-xs">
                    Standard HTML <code>&lt;a&gt;</code> tags also trigger client-side soft navigation via global event delegation in Dinou, but they lack smart features like hover prefetching and the <code>fresh</code> prop provided by <code>&lt;Link&gt;</code>.
                  </AlertDescription>
                </Alert>
              </div>

              <div id="fresh-prop" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-blue-500" />
                  6.2. The fresh Prop (Cache Busting)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Passing the <code>fresh</code> prop bypasses the Client Router Cache and forces a fetch of the latest data directly from the server:
                </p>
                <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                  {`// Forces latest server render, bypassing client cache
<Link href="/live-feed" fresh>
  Live Feed
</Link>`}
                </CodeBlock>
              </div>

              <div id="programmatic-navigation" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-indigo-500" />
                  6.3. Programmatic Navigation (useRouter)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To navigate imperatively, use the <code>useRouter()</code> hook inside <strong>Client Components</strong>:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                  {`"use client";

import { useRouter } from "dinou";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    await loginUser();
    // Navigate programmatically
    router.push("/dashboard");
  };

  return <button onClick={handleLogin}>Log In</button>;
}`}
                </CodeBlock>

                <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5 w-48">Method</th>
                        <th className="p-3.5">Behavior &amp; Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs sm:text-sm">
                      <tr>
                        <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">router.push(href, options)</td>
                        <td className="p-3.5 text-muted-foreground">Navigates to the route and adds a new entry to the browser history stack. Supports <code>&#123; fresh: true &#125;</code>.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">router.replace(href, options)</td>
                        <td className="p-3.5 text-muted-foreground">Navigates to the route, replacing the current history entry without pushing a new history state.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">router.back()</td>
                        <td className="p-3.5 text-muted-foreground">Navigates back to the previous page in history (equivalent to clicking the browser Back button).</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">router.forward()</td>
                        <td className="p-3.5 text-muted-foreground">Navigates forward to the next page in the history stack.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">router.refresh()</td>
                        <td className="p-3.5 text-muted-foreground"><strong>Soft Reload:</strong> Re-fetches the current route data from the server and updates server components without losing client React state or scroll position.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">router.refreshSlot(slotId)</td>
                        <td className="p-3.5 text-muted-foreground">Re-fetches and updates an individual parallel slot or cache slot without re-rendering the surrounding page.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="navigation-hooks" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  6.4. Navigation State Hooks
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dinou exports dedicated hooks from <code>&quot;dinou&quot;</code> to inspect active route states:
                </p>

                <div className="grid gap-4 sm:grid-cols-2 not-prose mt-2 text-xs">
                  <div className="p-4 rounded-xl border bg-card">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">usePathname()</span>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed">
                      Returns the current normalized pathname (e.g. <code>&quot;/blog/hello&quot;</code>). Universal: executes seamlessly during server-side SSR and on the client!
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border bg-card">
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm">useSearchParams()</span>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed">
                      Returns a standard Web <code>URLSearchParams</code> instance to inspect active query parameters.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border bg-card">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">useNavigationLoading()</span>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed">
                      Boolean flag indicating whether a client route transition is actively pending in React 19 concurrent mode.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border bg-card">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">refreshSlot(slotId)</span>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed">
                      Utility function to imperatively trigger a background refresh of an isolated parallel slot or <code>&lt;DinouCacheSlot&gt;</code>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Relative Routing Rules */}
            <section id="relative-routing" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Relative Routing Rules
              </h2>
              <p>
                Dinou resolves relative navigation paths using a <strong>Directory-First Convention</strong>. This provides intuitive navigation that mimics your file system.
              </p>

              <div id="directory-first" className="scroll-mt-20 mt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-indigo-500" />
                  7.1. Directory-First URL Resolution
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  In a standard web browser, a URL like <code>/blog/hello</code> (without a trailing slash) treats <code>hello</code> as a file name, so a link to <code>about</code> resolves to <code>/blog/about</code>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>In Dinou, every route is treated as a directory</strong> because each page is a folder containing a <code>page.tsx</code> component (e.g. <code>src/blog/hello/page.tsx</code>). Resolving relatively from a page navigates relative to that route&apos;s folder:
                </p>

                <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5 w-1/3">Current Path</th>
                        <th className="p-3.5 w-1/3">Relative Target</th>
                        <th className="p-3.5 w-1/3">Resolved Path</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card font-mono text-xs">
                      <tr>
                        <td className="p-3.5">/blog/hello</td>
                        <td className="p-3.5 text-indigo-600 dark:text-indigo-400">about</td>
                        <td className="p-3.5 font-bold text-slate-800 dark:text-slate-100">/blog/hello/about</td>
                      </tr>
                      <tr>
                        <td className="p-3.5">/blog/hello</td>
                        <td className="p-3.5 text-indigo-600 dark:text-indigo-400">./about</td>
                        <td className="p-3.5 font-bold text-slate-800 dark:text-slate-100">/blog/hello/about</td>
                      </tr>
                      <tr>
                        <td className="p-3.5">/blog/hello</td>
                        <td className="p-3.5 text-purple-600 dark:text-purple-400">../about</td>
                        <td className="p-3.5 font-bold text-slate-800 dark:text-slate-100">/blog/about</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  This rule applies uniformly across all navigation methods, including the <code>&lt;Link&gt;</code> component and programmatic calls like <code>router.push()</code>.
                </p>
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
