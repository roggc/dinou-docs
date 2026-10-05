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
  ShieldCheck,
  Zap,
  Route,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FolderTree,
  Cpu,
  ArrowRight,
  Code2,
  FileCode,
  Compass,
  Layers,
  Terminal,
  MousePointerClick,
  Info,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "1. Overview & Zero-Runtime Guarantee", level: 2 },
  { id: "core-pillars", title: "1.1. Outward Navigation vs. Inward Consumption", level: 3 },
  { id: "zero-cost", title: "1.2. Zero-Runtime Cost (0 Extra Bytes)", level: 3 },
  { id: "quick-start", title: "2. Quick Start for Developers", level: 2 },
  { id: "level-1-navigation", title: "2.1. Level 1: Links & Navigation", level: 3 },
  { id: "level-2-components", title: "2.2. Level 2: Typed Pages, Layouts & Server Functions", level: 3 },
  { id: "param-mapping", title: "3. Parameter Mapping Reference Table", level: 2 },
  { id: "positional-optionals", title: "3.1. Positional Optional Segments", level: 3 },
  { id: "architecture", title: "4. Technical Architecture: Under the Hood", level: 2 },
  { id: "route-scanner", title: "4.1. Ultra-Fast Route Scanner", level: 3 },
  { id: "generated-definitions", title: "4.2. Auto-Generated Module Augmentation", level: 3 },
  { id: "core-types-table", title: "4.3. The 4 Core Types vs Compiler Plumbing", level: 3 },
  { id: "dinou-env", title: "4.4. Automatic Project Integration (dinou-env.d.ts)", level: 3 },
  { id: "lifecycle", title: "5. Lifecycle: Dev Server & Production Builds", level: 2 },
  { id: "dev-watcher", title: "5.1. Real-Time Hot Regeneration (< 2ms)", level: 3 },
  { id: "prod-builds", title: "5.2. Deterministic CI/CD Build Pipelines", level: 3 },
  { id: "advanced-recipes", title: "6. Advanced Usage & Real-World Recipes", level: 2 },
  { id: "query-search-params", title: "6.1. Query Parameters with useSearchParams", level: 3 },
  { id: "route-pattern-picking", title: "6.2. IDE Autocomplete Workflow (Ctrl + Space)", level: 3 },
  { id: "error-boundaries", title: "6.3. Typed Error Boundaries with RouteParams", level: 3 },
  { id: "custom-components", title: "6.4. Custom Navigation Components with DinouRoute", level: 3 },
  { id: "dynamic-interpolation", title: "6.5. Dynamic Navigation with Typed Interpolation", level: 3 },
  { id: "trailing-slash-caveat", title: "6.6. Trailing Slashes & Template Literal Caveat", level: 3 },
  { id: "backward-compat", title: "7. Backward Compatibility Guarantee", level: 2 },
];

export default function TypeSafeRoutingPage() {
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
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-blue-500" />
                Type Safety
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou v7 Native
              </Badge>
              <Badge
                variant="secondary"
                className="font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900"
              >
                0 Runtime Overhead
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Type-Safe Routing System
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Experience end-to-end type safety across your entire application. Dinou combines sub-2ms compile-time route generation with intelligent TypeScript module augmentation, delivering instant IDE autocomplete and dead-link prevention with zero runtime cost.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Zero-Runtime Guarantee
              </h2>
              <p>
                Dinou v7 introduces a built-in, two-level <strong>Type-Safe Routing</strong> system designed from the ground up to give developers full confidence when building and refactoring applications. Unlike traditional routing setups that require external schema validators or proprietary bundler plugins, Dinou generates strict TypeScript declaration files directly from your <code>src/</code> filesystem conventions.
              </p>

              <div id="core-pillars" className="scroll-mt-20 space-y-4 mt-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-blue-500" />
                  1.1. Outward Navigation vs. Inward Consumption
                </h3>
                <p>
                  The type system elevates developer experience across two fundamental dimensions:
                </p>

                <div className="grid gap-4 sm:grid-cols-2 not-prose my-4">
                  <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="h-5 w-5 text-indigo-500" />
                        <CardTitle className="text-base">Level 1: Outward Navigation</CardTitle>
                      </div>
                      <CardDescription className="text-xs">
                        Navigating from components to destinations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-2">
                      <p>
                        Instant autocomplete for all valid project paths inside <code>&lt;Link href=&quot;...&quot;&gt;</code> and <code>router.push(&quot;...&quot;)</code>.
                      </p>
                      <p>
                        Catches typos, deleted routes, and broken URLs at compile-time before code ever reaches production.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-emerald-500" />
                        <CardTitle className="text-base">Level 2: Inward Consumption</CardTitle>
                      </div>
                      <CardDescription className="text-xs">
                        Reading dynamic route parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-2">
                      <p>
                        Strict parameter typing inside <code>page.tsx</code>, <code>layout.tsx</code>, and server-side <code>page_functions.ts</code> via <code>PageProps</code>, <code>LayoutProps</code>, and <code>RouteParams</code>.
                      </p>
                      <p>
                        Completely eliminates untyped <code>params: any</code> and prevents runtime access to non-existent route parameters.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div id="zero-cost" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  1.2. Zero-Runtime Cost (0 Extra Bytes)
                </h3>
                <p>
                  Everything in Dinou&apos;s type-safe routing exists strictly at the TypeScript layer inside auto-generated <code>.d.ts</code> declaration files.
                </p>
                <div className="not-prose bg-muted/50 rounded-xl p-4 border border-border flex items-center gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <strong>Zero Bundle Overhead:</strong> Production client JavaScript bundles and SSR server outputs contain <strong>0 extra bytes</strong>. No runtime regex engines, no runtime validators, and no performance penalty.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Quick Start */}
            <section id="quick-start" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Quick Start for Developers
              </h2>

              <div id="level-1-navigation" className="scroll-mt-20 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Route className="h-5 w-5 text-blue-500" />
                  2.1. Level 1: Links &amp; Navigation
                </h3>
                <p>
                  Import <code>Link</code> or <code>useRouter</code> from <code>&quot;dinou&quot;</code>. Your IDE will immediately suggest all valid static routes, parameterized dynamic routes, relative paths, queries, and hashes:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import { Link, useRouter } from "dinou";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex gap-4">
      {/* ✅ Instant autocompletion in your IDE */}
      <Link href="/docs/routing">Routing Guide</Link>

      {/* ✅ Dynamic routes with typed template strings */}
      <Link href={\`/blog/\${post.slug}\`}>View Post</Link>

      {/* ✅ Seamless support for queries, hashes, relative paths, and external URLs */}
      <Link href="/demo?tab=settings#section-1">Settings</Link>
      <Link href="../contact">Relative</Link>
      <Link href="https://github.com/roggc/dinou">GitHub</Link>

      {/* ❌ TypeScript compile-time error when pointing to a non-existent route */}
      {/* <Link href="/unknown-route" /> */}

      <button onClick={() => router.push("/docs/api-reference")}>
        View API Reference
      </button>
    </nav>
  );
}`}
                </CodeBlock>
              </div>

              <div id="level-2-components" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-500" />
                  2.2. Level 2: Typed Pages, Layouts &amp; Server Functions
                </h3>
                <p>
                  Pass your route pattern as a generic argument to <code>PageProps</code>, <code>LayoutProps</code>, or <code>RouteParams</code>. Dinou infers the exact shape of <code>params</code> without manual interface declarations:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import type { PageProps, LayoutProps, RouteParams } from "dinou";

// 1. src/blog/[slug]/page.tsx
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  // ✅ params.slug is strongly typed as string
  return <h1>Post: {params.slug}</h1>;

  // ❌ TypeScript error: Property 'id' does not exist on type '{ slug: string }'
  // return <h1>{params.id}</h1>;
}

// 2. src/blog/[slug]/layout.tsx
export function BlogLayout({ children, params }: LayoutProps<"/blog/[slug]">) {
  // ✅ params.slug is strongly typed; children is typed as ReactNode
  return (
    <section>
      <header>Category: {params.slug}</header>
      <main>{children}</main>
    </section>
  );
}

// 3. src/blog/[slug]/page_functions.ts
export async function getProps(params: RouteParams<"/blog/[slug]">) {
  // ✅ Directly types the raw params object without params: any
  return {
    postTitle: \`Post: \${params.slug}\`,
  };
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Section 3: Parameter Mapping Reference Table */}
            <section id="param-mapping" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Parameter Mapping Reference Table
              </h2>
              <p>
                Dinou deterministically transforms your file-system folder naming conventions into strict TypeScript definitions:
              </p>

              <div className="not-prose overflow-x-auto rounded-xl border border-border my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-3.5">Filesystem Convention</th>
                      <th className="p-3.5">Inferred Parameter Type</th>
                      <th className="p-3.5">Route Example</th>
                      <th className="p-3.5">Type of <code>params</code></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card font-mono text-xs">
                    <tr>
                      <td className="p-3.5 font-bold font-sans text-foreground">Static Route</td>
                      <td className="p-3.5 text-muted-foreground font-sans">No parameters</td>
                      <td className="p-3.5 text-blue-600 dark:text-blue-400">src/about/page.tsx</td>
                      <td className="p-3.5 text-muted-foreground">Record&lt;string, never&gt;</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-sans text-foreground">Single Dynamic <code>[id]</code></td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400">string</td>
                      <td className="p-3.5 text-blue-600 dark:text-blue-400">src/blog/[id]/page.tsx</td>
                      <td className="p-3.5">&#123; id: string &#125;</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-sans text-foreground">Catch-All <code>[...slug]</code></td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400">string[]</td>
                      <td className="p-3.5 text-blue-600 dark:text-blue-400">src/docs/[...slug]/page.tsx</td>
                      <td className="p-3.5">&#123; slug: string[] &#125;</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-sans text-foreground">Optional Dynamic <code>[[lang]]</code></td>
                      <td className="p-3.5 text-indigo-600 dark:text-indigo-400">string | undefined</td>
                      <td className="p-3.5 text-blue-600 dark:text-blue-400">src/[[lang]]/page.tsx</td>
                      <td className="p-3.5">&#123; lang?: string &#125;</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-sans text-foreground">Optional Catch-All <code>[[...opt]]</code></td>
                      <td className="p-3.5 text-indigo-600 dark:text-indigo-400">string[] | undefined</td>
                      <td className="p-3.5 text-blue-600 dark:text-blue-400">src/shop/[[...opt]]/page.tsx</td>
                      <td className="p-3.5">&#123; opt?: string[] &#125;</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-sans text-foreground">Multiple Dynamic Segments</td>
                      <td className="p-3.5 text-muted-foreground font-sans">Combined by segment</td>
                      <td className="p-3.5 text-blue-600 dark:text-blue-400">src/users/[uId]/posts/[pId]</td>
                      <td className="p-3.5">&#123; uId: string; pId: string &#125;</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold font-sans text-foreground">Nested Optionals</td>
                      <td className="p-3.5 text-muted-foreground font-sans">Positional dependent</td>
                      <td className="p-3.5 text-blue-600 dark:text-blue-400">src/inv/[[wh]]/[[aisle]]</td>
                      <td className="p-3.5">&#123; wh?: string; aisle?: string &#125;</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="positional-optionals" className="scroll-mt-20 space-y-3 mt-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  3.1. Positional Optional Segments
                </h3>
                <p>
                  For routes containing optional segments (<code>[[slug]]</code> or <code>[[...opt]]</code>), Dinou automatically registers both the parameterized path and the base route where the segment is omitted.
                </p>
                <p className="text-sm text-muted-foreground">
                  For example, with <code>src/products/[[category]]/page.tsx</code>, both <code>&lt;Link href=&quot;/products&quot; /&gt;</code> and <code>&lt;Link href=&quot;/products/electronics&quot; /&gt;</code> are valid, autocompleted routes.
                </p>
              </div>
            </section>

            {/* Section 4: Technical Architecture */}
            <section id="architecture" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Technical Architecture: Under the Hood
              </h2>
              <p>
                Dinou&apos;s type system coordinates four decoupled components with zero external dependencies:
              </p>

              <div className="not-prose bg-muted/40 rounded-xl p-5 border border-border font-mono text-xs space-y-3 my-6">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold font-sans text-sm">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  <span>Compilation &amp; Type Generation Pipeline</span>
                </div>
                <div className="pl-4 border-l-2 border-blue-500/40 space-y-2 text-muted-foreground">
                  <div>1. <span className="text-blue-600 dark:text-blue-400 font-semibold">src/</span> (Filesystem pages &amp; layouts)</div>
                  <div>&darr; <code>dinou/core/generate-route-types.js</code> (In-memory scanner, &lt; 2ms)</div>
                  <div>2. <span className="text-indigo-600 dark:text-indigo-400 font-semibold">.dinou/types/routes.d.ts</span> (Generated module augmentation)</div>
                  <div>&darr; Referenced by <code>dinou-env.d.ts</code></div>
                  <div>3. <span className="text-purple-600 dark:text-purple-400 font-semibold">dinou/index.d.ts</span> (Extends DinouRouter.Register)</div>
                  <div>&darr; Project-wide TypeScript IntelliSense &amp; <code>tsc</code> compiler verification</div>
                </div>
              </div>

              <div id="route-scanner" className="scroll-mt-20 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-emerald-500" />
                  4.1. Ultra-Fast Route Scanner
                </h3>
                <p>
                  Implemented in <code>dinou/core/generate-route-types.js</code>, the scanner reads the <code>src/</code> directory using synchronous filesystem operations:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li><strong>Zero code execution:</strong> It does not import user files, evaluate React components, or spin up test servers. Total execution time is under <strong>2 milliseconds</strong>.</li>
                  <li><strong>Private folder handling:</strong> Automatically ignores private folders starting with <code>_*</code> and parallel route slots (<code>@*</code>).</li>
                  <li><strong>Route Groups:</strong> Transparently unpacks route groups <code>(group)</code>, omitting them from public URL paths.</li>
                </ul>
              </div>

              <div id="generated-definitions" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-indigo-500" />
                  4.2. Auto-Generated Module Augmentation
                </h3>
                <p>
                  The engine emits <code>.dinou/types/routes.d.ts</code> in the root of your project, applying TypeScript <strong>Module Augmentation</strong> onto the <code>&quot;dinou&quot;</code> package:
                </p>

                <CodeBlock language="typescript" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import "dinou";

declare module "dinou" {
  export type DinouStaticRoutes = "/" | "/docs" | "/docs/routing" | "/blog";
  export type DinouDynamicRoutes = \`/blog/\${string | number}\` | \`/docs/\${string}\`;
  
  export interface DinouRouteParamsMap {
    "/": Record<string, never>;
    "/blog/[slug]": { slug: string };
    "/docs/[...slug]": { slug: string[] };
  }

  namespace DinouRouter {
    interface Register {
      route: DinouGeneratedRoute;
      params: DinouRouteParamsMap;
    }
  }
}`}
                </CodeBlock>
              </div>

              <div id="core-types-table" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  4.3. The 4 Core Types vs Compiler Plumbing
                </h3>
                <p>
                  To keep your code clean, Dinou cleanly delineates between types intended for everyday developer use and internal compiler plumbing:
                </p>

                <div className="not-prose overflow-x-auto rounded-xl border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Exported Type</th>
                        <th className="p-3">Primary Purpose</th>
                        <th className="p-3">Canonical Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">PageProps&lt;T&gt;</td>
                        <td className="p-3 text-muted-foreground">React Page components (<code>page.tsx</code>)</td>
                        <td className="p-3 font-mono">Page(&#123; params &#125;: PageProps&lt;&quot;/blog/[slug]&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">LayoutProps&lt;T&gt;</td>
                        <td className="p-3 text-muted-foreground">React Layout components (<code>layout.tsx</code>)</td>
                        <td className="p-3 font-mono">Layout(&#123; children, params &#125;: LayoutProps&lt;&quot;/blog/[slug]&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">RouteParams&lt;T&gt;</td>
                        <td className="p-3 text-muted-foreground">Pure functions, services &amp; error boundaries (<code>getProps</code>, <code>error.tsx</code>)</td>
                        <td className="p-3 font-mono">getProps(params: RouteParams&lt;&quot;/blog/[slug]&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">DinouRoute</td>
                        <td className="p-3 text-muted-foreground">URL props, <code>&lt;Link&gt;</code>, <code>router.push()</code> &amp; custom navigation components</td>
                        <td className="p-3 font-mono">interface NavProps &#123; href: DinouRoute &#125;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border border-border/80 rounded-xl p-4 bg-muted/30 not-prose text-xs space-y-2 text-muted-foreground">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>Compiler Plumbing Types (Internal):</span>
                  </div>
                  <p>
                    Types like <code>DinouRouter.Register</code>, <code>DinouRoutePattern</code>, and <code>ExtractRouteParams&lt;T&gt;</code> are exported from <code>dinou</code> to satisfy TypeScript compiler rules (such as TS4058 private name exports and module augmentation). You do not need to import or manage them in your day-to-day code.
                  </p>
                </div>
              </div>

              <div id="dinou-env" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  4.4. Automatic Project Integration (dinou-env.d.ts)
                </h3>
                <p>
                  At startup, Dinou ensures that your root <code>dinou-env.d.ts</code> contains the triple-slash reference directive:
                </p>
                <CodeBlock language="typescript" containerClassName="rounded-xl overflow-hidden my-3">
                  {`/// <reference types="dinou/env" />
/// <reference path="./.dinou/types/routes.d.ts" />`}
                </CodeBlock>
                <p className="text-sm text-muted-foreground">
                  Combined with <code>&quot;include&quot;: [&quot;src&quot;, &quot;dinou-env.d.ts&quot;]</code> in your <code>tsconfig.json</code>, this guarantees that all type definitions are discovered automatically by your IDE and CI without custom configuration.
                </p>
              </div>
            </section>

            {/* Section 5: Lifecycle */}
            <section id="lifecycle" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Lifecycle: Dev Server &amp; Production Builds
              </h2>

              <div id="dev-watcher" className="scroll-mt-20 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  5.1. Real-Time Hot Regeneration (&lt; 2ms)
                </h3>
                <p>
                  In development (<code>npm run dev</code>), Dinou&apos;s development server runs <code>generateRouteTypes()</code> immediately at boot. A lightweight file watcher monitors additions and deletions of <code>page.(tsx|jsx|ts|js)</code> files.
                </p>
                <p className="text-sm text-muted-foreground">
                  Whenever a page is added, renamed, or deleted, <code>.dinou/types/routes.d.ts</code> regenerates instantly on the fly (under 2ms). Your IDE autocomplete updates immediately without having to restart the dev server or rebuild.
                </p>
              </div>

              <div id="prod-builds" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-500" />
                  5.2. Deterministic CI/CD Build Pipelines
                </h3>
                <p>
                  In production builds (<code>npm run build</code>), all Dinou target bundlers (esbuild, Rollup, Webpack, Bun, Deno, and Cloudflare Workers) invoke <code>generateRouteTypes()</code> as the very first step of initialization.
                </p>
                <p className="text-sm text-muted-foreground">
                  Because <code>.dinou/</code> is gitignored, this guarantees that fresh CI/CD environments (GitHub Actions, Docker, Vercel, Netlify) generate the full route contract before running <code>tsc --noEmit</code> or bundling production assets.
                </p>
              </div>
            </section>

            {/* Section 6: Advanced Recipes */}
            <section id="advanced-recipes" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Advanced Usage &amp; Real-World Recipes
              </h2>

              <div id="query-search-params" className="scroll-mt-20 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-blue-500" />
                  6.1. Query Parameters with useSearchParams
                </h3>
                <p>
                  In Dinou, pages receive dynamic route parameters via props, while URL query strings (e.g. <code>?q=react</code>) are read via the official <code>useSearchParams()</code> hook or on the server via <code>getContext()</code>:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import { useSearchParams, type PageProps } from "dinou";

export default function SearchPage({ params }: PageProps<"/search">) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // string | null

  return <div>Searching for: {query}</div>;
}`}
                </CodeBlock>
              </div>

              <div id="route-pattern-picking" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  6.2. IDE Autocomplete Workflow (Ctrl + Space)
                </h3>
                <p>
                  When typing a component, type <code>PageProps&lt;&quot;&quot;&gt;</code> and press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border">Ctrl + Space</kbd> (or <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border">Cmd + Space</kbd>). Your editor will list every registered route pattern in the project:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import type { PageProps } from "dinou";

// Trigger Ctrl + Space inside "" to pick from project routes
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  return <h1>{params.slug}</h1>;
}`}
                </CodeBlock>
              </div>

              <div id="error-boundaries" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  6.3. Typed Error Boundaries with RouteParams
                </h3>
                <p>
                  In Dinou, error boundary components (<code>error.tsx</code> and parallel slot errors <code>@slot/error.tsx</code>) receive two props: <code>error: Error</code> and <code>params</code>. You can strictly type them using <code>RouteParams&lt;T&gt;</code>:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`"use client";

import { useRouter, type RouteParams } from "dinou";

interface BlogPostErrorProps {
  error: Error;
  params: RouteParams<"/blog/[slug]">;
}

export default function BlogPostError({ params, error }: BlogPostErrorProps) {
  const router = useRouter();

  return (
    <div className="error-card p-6 border rounded-xl bg-destructive/10">
      <h2>Failed to load post: {params.slug}</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      {/* Soft reload via Dinou client router */}
      <button onClick={() => router.refresh()}>Try Again</button>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <div id="custom-components" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-500" />
                  6.4. Custom Navigation Components with DinouRoute
                </h3>
                <p>
                  When building reusable UI components (custom buttons, navigation tabs, or breadcrumb menus), type their destination props with <code>DinouRoute</code> to give your design system native compile-time link validation:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import type { DinouRoute } from "dinou";
import { Link } from "dinou";

interface NavButtonProps {
  href: DinouRoute; // 👈 Inherits full autocompletion and route validation
  label: string;
}

export function NavButton({ href, label }: NavButtonProps) {
  return (
    <Link href={href} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium">
      {label}
    </Link>
  );
}

// In your application code:
const menu: { label: string; href: DinouRoute }[] = [
  { label: "Overview", href: "/docs" },              // ✅ Autocompleted
  { label: "Routing", href: "/docs/routing" },        // ✅ Autocompleted
  // { label: "Broken", href: "/non-existent-page" }, // ❌ TypeScript compile error!
];`}
                </CodeBlock>
              </div>

              <div id="dynamic-interpolation" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-emerald-500" />
                  6.5. Dynamic Navigation with Typed Interpolation
                </h3>
                <p>
                  Template string URLs are verified against parameterized literal types:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import { Link, useRouter } from "dinou";

interface Product {
  id: string;
  name: string;
}

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="card p-4 border rounded-xl">
      {/* String interpolation verified against \`/products/\${string | number}\` */}
      <Link href={\`/products/\${product.id}\`}>{product.name}</Link>

      <button onClick={() => router.push(\`/products/\${product.id}\`)}>
        View Details
      </button>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <div id="trailing-slash-caveat" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  6.6. Trailing Slashes &amp; Template Literal Caveat
                </h3>

                <Alert className="not-prose my-4 border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-700 dark:text-amber-300 font-semibold">
                    Be cautious with trailing slashes in dynamic links!
                  </AlertTitle>
                  <AlertDescription className="text-xs sm:text-sm text-muted-foreground mt-2 space-y-2">
                    <p>
                      In TypeScript, template literal types evaluate <code>&#36;&#123;string&#125;</code> as matching <em>any</em> string, including the empty string <code>&quot;&quot;</code> (because <code>&quot;&quot; extends string</code> is true).
                    </p>
                    <p>
                      <strong>The scenario:</strong> Consider a nested route such as <code>src/posts/[id]/[slug]/page.tsx</code>, whose generated template literal type is <code>`/posts/$&#123;string | number&#125;/$&#123;string | number&#125;`</code>.
                    </p>
                    <p>
                      If a developer accidentally leaves off the second parameter but appends a trailing slash:
                    </p>
                    <div className="font-mono text-xs bg-muted/80 p-2 rounded">
                      &lt;Link href=&#123;`/posts/$&#123;id&#125;/`&#125;&gt;View&lt;/Link&gt; {/* ⚠️ Compiles without TS error */}
                    </div>
                    <p>
                      TypeScript matches the first parameter with <code>id</code>, the slash with literal <code>/</code>, and the second parameter with empty string <code>&quot;&quot;</code>. However, at runtime Dinou normalizes trailing slashes, requesting <code>/posts/123</code> (which results in a <strong>404 Not Found</strong> because no <code>page.tsx</code> exists at the parent segment).
                    </p>
                    <p>
                      <strong>Best Practice:</strong> Always avoid trailing slashes when building dynamic URLs. Written without the trailing slash (<code>`/posts/$&#123;id&#125;`</code>), TypeScript accurately flags the missing parameter at compile-time.
                    </p>
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Section 7: Backward Compatibility */}
            <section id="backward-compat" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Backward Compatibility Guarantee
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <CardTitle className="text-base">100% Backward Compatible</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Existing components without explicit generic parameters continue to work without modification.
                    </p>
                    <p>
                      You can continue using <code>export default function Page(&#123; params &#125;: any)</code> or generic <code>PageProps</code> during progressive migrations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-base">Graceful Fallback Mode</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      If <code>.dinou/types/routes.d.ts</code> has not been generated yet or if a project operates in untyped JavaScript, <code>DinouRoute</code> gracefully falls back to standard <code>string</code>.
                    </p>
                    <p>
                      Zero breaking changes to existing setups or non-TypeScript workflows.
                    </p>
                  </CardContent>
                </Card>
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
