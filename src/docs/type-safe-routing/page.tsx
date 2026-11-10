import { Link } from "dinou";
import { DocsPager } from "@/docs/components/docs-pager";
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
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";

const tocItems = [
  { id: "overview", title: "1. Overview & Zero-Runtime Guarantee", level: 2 },
  { id: "core-pillars", title: "1.1. Outward Navigation vs. Inward Consumption", level: 3 },
  { id: "zero-cost", title: "1.2. Zero Generated Route Table Overhead", level: 3 },
  { id: "quick-start", title: "2. Quick Start for Developers", level: 2 },
  { id: "level-1-navigation", title: "2.1. Level 1: Links & Navigation", level: 3 },
  { id: "level-2-components", title: "2.2. Level 2: Pages, Horizontal Layouts & Parallel Slots", level: 3 },
  { id: "core-types-table", title: "2.3. Quick Reference: Core Types", level: 3 },
  { id: "param-mapping", title: "3. Parameter Mapping Reference Table", level: 2 },
  { id: "advanced-recipes", title: "4. Advanced Usage & Real-World Recipes", level: 2 },
  { id: "route-pattern-picking", title: "4.1. IDE Autocomplete Workflow (Ctrl + Space)", level: 3 },
  { id: "typed-error-pages", title: "4.2. Error & Not-Found Pages (ErrorProps & NotFoundProps)", level: 3 },
  { id: "custom-components", title: "4.3. Custom Navigation Components with DinouRoute", level: 3 },
  { id: "dynamic-interpolation", title: "4.4. Dynamic Navigation: Pattern + params vs. Template Strings", level: 3 },
  { id: "relative-navigation", title: "4.5. Strict Relative Navigation with from", level: 3 },
  { id: "architecture", title: "5. Technical Architecture: Under the Hood", level: 2 },
  { id: "route-scanner", title: "5.1. Ultra-Fast Route Scanner", level: 3 },
  { id: "generated-definitions", title: "5.2. Module Augmentation", level: 3 },
  { id: "compiler-plumbing", title: "5.3. Internal Compiler Plumbing", level: 3 },
  { id: "tsconfig-wiring", title: "5.4. tsconfig.json Integration", level: 3 },
  { id: "lifecycle", title: "6. Lifecycle: Dev, Typegen CLI & Production Builds", level: 2 },
  { id: "dev-watcher", title: "6.1. Local Dev: Hot Watcher", level: 3 },
  { id: "typegen-cli", title: "6.2. Standalone CLI: npm run typegen", level: 3 },
  { id: "prod-builds", title: "6.3. Production: Deterministic Builds", level: 3 },
  { id: "backward-compat", title: "7. Backward Compatibility Guarantee", level: 2 },
];

export default function TypeSafeRoutingPage() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Type-Safe Routing | Dinou Docs</title>
      <meta
        name="description"
        content="Experience end-to-end static TypeScript route safety across your entire application with instant dev-time IDE autocomplete, typegen CLI, and typed Link components."
      />
      <link rel="canonical" href="https://dinou.dev/docs/type-safe-routing" />

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
                Dinou Native
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
              Experience end-to-end static type safety across your entire application. Dinou combines sub-2ms route type generation with intelligent TypeScript module augmentation, delivering instant dev-time IDE autocomplete and dead-link prevention with zero runtime cost.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Zero-Runtime Guarantee
              </h2>
              <p>
                Dinou introduces a built-in, two-level <strong>Type-Safe Routing</strong> system designed from the ground up to give developers full confidence when building and refactoring applications. Unlike traditional routing setups that require external schema validators or proprietary bundler plugins, Dinou generates strict TypeScript declaration files directly from your <code>src/</code> filesystem conventions.
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
                        Instant autocomplete for all valid project paths inside <code>&lt;Link href=&quot;...&quot;&gt;</code> (or <code>to=&quot;...&quot;</code>), <code>router.push(&quot;...&quot;)</code>, and <code>router.replace(&quot;...&quot;)</code>.
                      </p>
                      <p>
                        Catches typos, deleted routes, and broken URLs in your IDE at dev time and via <code>npm run typegen &amp;&amp; npx tsc --noEmit</code> before code ever reaches production.
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
                        Strict parameter &amp; slot typing across <code>page.tsx</code>, intermediate <code>layout.tsx</code>, parallel <code>@slot/page.tsx</code>, <code>error.tsx</code>, <code>not_found.tsx</code>, and <code>page_functions.ts</code> / <code>layout_functions.ts</code> via <code>PageProps</code>, <code>LayoutProps</code>, <code>SlotProps</code>, <code>ErrorProps</code>, <code>NotFoundProps</code>, <code>PageFunctions</code>, <code>LayoutFunctions</code>, and <code>RouteParams</code>.
                      </p>
                      <p>
                        Supports Dinou&apos;s Horizontal Segmentation natively: intermediate layouts without a sibling <code>page.tsx</code> and parallel <code>@slots</code> are fully typed without exposing non-page folders or <code>@slots</code> as valid <code>&lt;Link&gt;</code> URLs.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div id="zero-cost" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  1.2. Zero Generated Route Table Overhead
                </h3>
                <p>
                  Dinou&apos;s route registry lives exclusively at the TypeScript layer inside auto-generated <code>.d.ts</code> declaration files—shipping <strong>0 bytes of generated route manifests</strong> regardless of whether your project has 10 routes or 1,000 routes.
                </p>
                <div className="not-prose bg-muted/50 rounded-xl p-4 border border-border flex items-center gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <strong>Zero Per-Route Bundle Growth:</strong> Static and template-interpolated URLs pass straight through at runtime with zero allocations, while optional <code>params=&#123;&#123; ... &#125;&#125;</code> substitution uses a tiny built-in segment interpolator in Dinou&apos;s core navigation helper—no generated runtime route tables or validators.
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
                  Import <code>Link</code> or <code>useRouter</code> from <code>&quot;dinou&quot;</code>. Your IDE immediately suggests (<code>Ctrl + Space</code>) and strictly validates all navigable <strong>static routes</strong>, <strong>dynamic route patterns</strong> (with required typed <code>params</code>), and <strong>relative paths anchored with <code>from</code></strong> (both <code>&quot;sub&quot;</code> and <code>&quot;./sub&quot;</code>, plus <code>&quot;../...&quot;</code>) across <code>&lt;Link href=&quot;...&quot;&gt;</code> (and its <code>to</code> alias), <code>router.push()</code>, and <code>router.replace()</code>. It also validates dynamic template strings (<code>`/blog/&#36;&#123;slug&#125;`</code>) and route suffixes (<code>?query</code>, <code>#hash</code>), while permitting standalone queries/hashes (<code>?tab=1</code>, <code>#top</code>) and external protocols (<code>http://</code>, <code>https://</code>, <code>mailto:</code>, <code>tel:</code>):
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="link"
                    tabs={[
                      {
                        id: "link",
                        label: "src/components/navbar.tsx (Declarative <Link>)",
                        language: "tsx",
                        code: `import { Link } from "dinou";

export function Navbar({ post }: { post: { slug: string } }) {
  return (
    <nav className="flex gap-4">
      {/* ✅ Instant Ctrl + Space autocompletion for BOTH static & dynamic routes */}
      <Link href="/docs/routing">Routing Guide</Link>

      {/* ✅ Option A: Autocompleted dynamic pattern + required typed params */}
      <Link href="/blog/[slug]" params={{ slug: post.slug }}>
        View Post
      </Link>

      {/* ✅ Option B: Direct template string interpolation (no params prop needed) */}
      <Link to={\`/blog/\${post.slug}\`}>View Post (Template)</Link>

      {/* ✅ Strict relative navigation anchored with from ("sub", "./sub", "../...") */}
      <Link from="/docs/routing" to="../navigation">
        Navigation Guide (Relative)
      </Link>

      {/* ✅ Seamless support for queries, hashes, and external URLs */}
      <Link href="/demo?tab=settings#section-1">Settings</Link>
      <Link href="https://github.com/roggc/dinou">GitHub</Link>
      <Link href="mailto:hello@example.com">Contact</Link>

      {/* ❌ TypeScript error: [slug] pattern cannot be used without params! */}
      {/* <Link href="/blog/[slug]">Forgot params</Link> */}

      {/* ❌ TypeScript error: relative paths require from (catches "./subs" typos!) */}
      {/* <Link to="./subs">Unanchored Relative</Link> */}

      {/* ❌ TypeScript error when pointing to a non-existent route */}
      {/* <Link href="/unknown-route" /> */}
    </nav>
  );
}`,
                      },
                      {
                        id: "router",
                        label: "src/components/nav-actions.tsx (Programmatic useRouter)",
                        language: "tsx",
                        code: `"use client";

import { useRouter } from "dinou";

export function NavActions({ slug }: { slug: string }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {/* ✅ Autocompletes static & dynamic route patterns */}
      <button onClick={() => router.push("/docs/api-reference")}>
        View API Reference
      </button>

      {/* ✅ Option A: Dynamic route pattern + required typed { params } */}
      <button
        onClick={() =>
          router.push("/blog/[slug]", { params: { slug }, fresh: true })
        }
      >
        Reload Post Fresh
      </button>

      {/* ✅ Option B: Direct template string interpolation */}
      <button onClick={() => router.replace(\`/blog/\${slug}\`)}>
        Replace Post URL
      </button>

      {/* ✅ Strict relative navigation anchored with { from } */}
      <button
        onClick={() => router.push("../navigation", { from: "/docs/routing" })}
      >
        Relative Push
      </button>

      {/* ❌ TypeScript error: missing { params: { slug } } */}
      {/* <button onClick={() => router.push("/blog/[slug]")} /> */}

      {/* ❌ TypeScript error: relative path without { from } */}
      {/* <button onClick={() => router.push("./subs")} /> */}

      {/* ❌ TypeScript error: unknown route */}
      {/* <button onClick={() => router.push("/typo-route")} /> */}
    </div>
  );
}`,
                      },
                    ]}
                  />
                </div>
              </div>

              <div id="level-2-components" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-500" />
                  2.2. Level 2: Pages, Horizontal Layouts &amp; Parallel Slots
                </h3>
                <p>
                  Pass your segment pattern as a generic argument to <code>PageProps</code>, <code>LayoutProps</code>, <code>SlotProps</code>, <code>PageFunctions</code>, <code>LayoutFunctions</code>, or <code>RouteParams</code>. Both <code>PageProps&lt;TRoute, TProps&gt;</code> and <code>LayoutProps&lt;TLayout, TProps&gt;</code> also accept an optional second generic argument for custom props returned by <code>getProps</code>:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="page"
                    tabs={[
                      {
                        id: "page",
                        label: "src/blog/[slug]/page.tsx",
                        language: "tsx",
                        code: `import type { PageProps } from "dinou";
import type { BlogPostData } from "./page_functions";

export default function BlogPost({
  params,
  postTitle,
}: PageProps<"/blog/[slug]", BlogPostData>) {
  // ✅ params.slug is string; postTitle is inferred from BlogPostData
  return <h1>{postTitle} ({params.slug})</h1>;

  // ❌ TypeScript error: Property 'id' does not exist on type '{ slug: string }'
  // return <h1>{params.id}</h1>;
}`,
                      },
                      {
                        id: "layout",
                        label: "src/blog/[slug]/layout.tsx",
                        language: "tsx",
                        code: `import type { LayoutProps } from "dinou";

export default function BlogLayout({
  children,
  params,
}: LayoutProps<"/blog/[slug]">) {
  // ✅ params.slug is strongly typed; children is typed as ReactNode
  return (
    <section>
      <header>Post: {params.slug}</header>
      <main>{children}</main>
    </section>
  );
}`,
                      },
                      {
                        id: "page-functions",
                        label: "src/blog/[slug]/page_functions.ts",
                        language: "ts",
                        code: `import type { PageFunctions } from "dinou";

export interface BlogPostData {
  postTitle: string;
}

// ✅ Types both params?.slug and the returned BlogPostData contract
export const getProps: PageFunctions<
  "/blog/[slug]",
  BlogPostData
>["getProps"] = async (params) => {
  return {
    postTitle: \`Post: \${params?.slug}\`,
  };
};

export const validateParams: PageFunctions<
  "/blog/[slug]"
>["validateParams"] = (params) => {
  return Boolean(params?.slug && /^[a-z0-9-]+$/.test(params.slug));
};`,
                      },
                      {
                        id: "helper",
                        label: "src/lib/posts.ts",
                        language: "ts",
                        code: `import type { RouteParams } from "dinou";

// ✅ Directly types standalone helpers, data loaders, or services
export async function loadPostByRoute(params: RouteParams<"/blog/[slug]">) {
  return fetchPost(params.slug);
}`,
                      },
                    ]}
                  />
                </div>

                <p>
                  Because Dinou features <strong>Horizontal Segmentation</strong> (independent lifecycles for layouts, parallel <code>@slots</code>, and pages), the route topology scanner indexes intermediate layouts—even when a folder has <strong>no sibling <code>page.tsx</code></strong>—and automatically infers parallel <code>@slot</code> props on <code>LayoutProps</code>:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="interm-layout"
                    tabs={[
                      {
                        id: "interm-layout",
                        label: "src/workspace/[org]/layout.tsx (No sibling page.tsx)",
                        language: "tsx",
                        code: `import type { LayoutProps } from "dinou";
import type { OrgLayoutData } from "./layout_functions";

// Folder has layout.tsx + @sidebar/page.tsx + @analytics/page.tsx,
// and NO sibling page.tsx (leaf pages live under projects/[projectId]/page.tsx)
export default function WorkspaceLayout({
  children,
  params,
  sidebar,
  analytics,
  orgPlan,
}: LayoutProps<"/workspace/[org]", OrgLayoutData>) {
  // ✅ params.org is string (child projectId does NOT leak into parent layout!)
  // ✅ sidebar?: ReactNode & analytics?: ReactNode are auto-inferred from @slots!
  return (
    <div className="grid grid-cols-[240px_1fr_320px]" data-plan={orgPlan}>
      <aside>{sidebar}</aside>
      <main data-org={params.org}>{children}</main>
      <aside>{analytics}</aside>
    </div>
  );
}`,
                      },
                      {
                        id: "interm-layout-fn",
                        label: "src/workspace/[org]/layout_functions.ts",
                        language: "ts",
                        code: `import type { LayoutFunctions } from "dinou";

export interface OrgLayoutData {
  orgPlan: "free" | "pro";
}

// ✅ Intermediate layout_functions.ts works even without a sibling page.tsx
export const getProps: LayoutFunctions<
  "/workspace/[org]",
  OrgLayoutData
>["getProps"] = async (params) => {
  // params?.org is typed as string | undefined
  return { orgPlan: params?.org === "acme" ? "pro" : "free" };
};

export const validateParams: LayoutFunctions<
  "/workspace/[org]"
>["validateParams"] = (params) => Boolean(params?.org);`,
                      },
                      {
                        id: "parallel-slot",
                        label: "src/workspace/[org]/@analytics/page.tsx",
                        language: "tsx",
                        code: `import type { SlotProps } from "dinou";

// ✅ SlotProps (or PageProps<"/workspace/[org]/@analytics">) types cumulative params
export default async function AnalyticsSlot({
  params,
}: SlotProps<"/workspace/[org]/@analytics">) {
  // params.org is string — propagated at runtime & statically typed in TypeScript!
  return <section>Live metrics for {params.org}</section>;
}`,
                      },
                      {
                        id: "leaf-page",
                        label: "src/workspace/[org]/projects/[projectId]/page.tsx",
                        language: "tsx",
                        code: `import { Link, type PageProps } from "dinou";

export default function ProjectPage({
  params,
}: PageProps<"/workspace/[org]/projects/[projectId]">) {
  // ✅ Leaf page receives cumulative { org: string; projectId: string }
  return (
    <article>
      <h1>{params.org} / Project #{params.projectId}</h1>
      <Link href={\`/workspace/\${params.org}/projects/\${params.projectId}\`}>
        Permalink
      </Link>

      {/* ❌ TypeScript error: /workspace/[org] has no page.tsx, so it is NOT navigable! */}
      {/* <Link href={\`/workspace/\${params.org}\`}>Invalid Workspace Root</Link> */}
    </article>
  );
}`,
                      },
                    ]}
                  />
                </div>
              </div>

              <div id="core-types-table" className="scroll-mt-20 mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  2.3. Quick Reference: Core Types
                </h3>
                <p>
                  To keep application code clean and expressive, Dinou distills routing type-safety down to primary types exported directly from <code>&quot;dinou&quot;</code>:
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
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">PageProps&lt;T, P?&gt;</td>
                        <td className="p-3 text-muted-foreground">Page components (<code>page.tsx</code>, <code>not_found.tsx</code>, or <code>@slot/page.tsx</code>) + optional <code>getProps</code> payload <code>P</code></td>
                        <td className="p-3 font-mono">Page(&#123; params &#125;: PageProps&lt;&quot;/blog/[slug]&quot;, Data&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">LayoutProps&lt;T, P?&gt;</td>
                        <td className="p-3 text-muted-foreground">Layouts (including intermediate folders without <code>page.tsx</code>) with auto-inferred <code>@slot</code> props + optional <code>P</code></td>
                        <td className="p-3 font-mono">Layout(&#123; children, params, sidebar &#125;: LayoutProps&lt;&quot;/workspace/[org]&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">SlotProps&lt;T&gt;</td>
                        <td className="p-3 text-muted-foreground">Parallel Slot Page components (<code>@slot/page.tsx</code>)</td>
                        <td className="p-3 font-mono">Slot(&#123; params &#125;: SlotProps&lt;&quot;/workspace/[org]/@analytics&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">ErrorProps&lt;T&gt;</td>
                        <td className="p-3 text-muted-foreground">Error boundaries across routes, intermediate folders &amp; <code>@slot/error.tsx</code></td>
                        <td className="p-3 font-mono">Error(&#123; error, params &#125;: ErrorProps&lt;&quot;/workspace/[org]/@analytics&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">NotFoundProps&lt;T, P?&gt;</td>
                        <td className="p-3 text-muted-foreground">404 boundaries (<code>not_found.tsx</code>) across root, routes &amp; intermediate folders + optional <code>P</code></td>
                        <td className="p-3 font-mono">NotFound(&#123; params &#125;: NotFoundProps&lt;&quot;/workspace/[org]&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">PageFunctions&lt;T, P&gt;</td>
                        <td className="p-3 text-muted-foreground">Page lifecycle &amp; data contracts (<code>page_functions.ts</code>)</td>
                        <td className="p-3 font-mono">const getProps: PageFunctions&lt;&quot;/blog/[slug]&quot;, Data&gt;[&quot;getProps&quot;]</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">LayoutFunctions&lt;T, P&gt;</td>
                        <td className="p-3 text-muted-foreground">Layout lifecycle &amp; data contracts (<code>layout_functions.ts</code>, including intermediate layouts)</td>
                        <td className="p-3 font-mono">const validateParams: LayoutFunctions&lt;&quot;/workspace/[org]&quot;&gt;[&quot;validateParams&quot;]</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">RouteParams&lt;T&gt;</td>
                        <td className="p-3 text-muted-foreground">Standalone helpers across page, layout, or <code>@slot</code> segments</td>
                        <td className="p-3 font-mono">loadPost(params: RouteParams&lt;&quot;/blog/[slug]&quot;&gt;)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">DinouRoute</td>
                        <td className="p-3 text-muted-foreground">Resolved navigable URLs for custom navigation props, menus &amp; redirect helpers</td>
                        <td className="p-3 font-mono">interface NavProps &#123; href: DinouRoute &#125;</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">LinkProps&lt;TFrom, THref&gt;</td>
                        <td className="p-3 text-muted-foreground">Powers <code>&lt;Link&gt;</code> &amp; <code>useRouter()</code> with static/dynamic pattern autocomplete, conditional <code>params</code>, and strict relative <code>from</code></td>
                        <td className="p-3 font-mono">&lt;Link from=&quot;/blog/[slug]&quot; to=&quot;comments&quot;&gt;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="not-prose bg-muted/40 rounded-xl p-4 border border-border text-xs text-muted-foreground space-y-2 my-4">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-blue-500 shrink-0" />
                    <span>When to use <code>PageProps</code> vs. Semantic Aliases vs. Dedicated Types</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
                    <li>
                      <strong>Semantic Aliases (<code>NotFoundProps</code> &amp; <code>SlotProps</code>):</strong> Both <code>not_found.tsx</code> and <code>@slot/page.tsx</code> receive the exact same <code>&#123; params &#125;</code> runtime contract as <code>page.tsx</code>. You can freely use <code>PageProps</code> in all three files, or use <code>NotFoundProps</code> / <code>SlotProps</code> for semantic clarity and narrower <code>Ctrl + Space</code> autocomplete (e.g., <code>SlotProps</code> filters suggestions strictly to <code>@slot</code> folders, while <code>NotFoundProps</code> hides <code>@slot</code> paths and already recognizes intermediate layout folders).
                    </li>
                    <li>
                      <strong>Dedicated Non-Alias Types (<code>LayoutProps</code> &amp; <code>ErrorProps</code>):</strong> These are <strong>not</strong> aliases of <code>PageProps</code>—always use them for their respective files:
                      <ul className="list-disc pl-4 mt-1 space-y-1">
                        <li>
                          <strong><code>LayoutProps</code> in <code>layout.tsx</code>:</strong> Injects <code>children: ReactNode</code>, auto-infers sibling parallel <code>@slot</code> props (<code>sidebar?: ReactNode</code>, etc.), and validates against <code>DinouLayoutParamsMap</code>—allowing intermediate layouts without a sibling <code>page.tsx</code> (where <code>PageProps</code> intentionally errors).
                        </li>
                        <li>
                          <strong><code>ErrorProps</code> in <code>error.tsx</code> &amp; <code>@slot/error.tsx</code>:</strong> Injects <code>error: Error</code> alongside <code>params</code> (which <code>PageProps</code> does not include) and validates against <code>DinouErrorParamsMap</code> (supporting error-only intermediate folders).
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
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

              <div className="not-prose bg-muted/40 rounded-xl p-4 border border-border text-xs text-muted-foreground space-y-1.5 my-4">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>Positional Optional Segments:</span>
                </div>
                <p>
                  For routes containing optional segments (<code>[[slug]]</code> or <code>[[...opt]]</code>), Dinou automatically registers both the parameterized path and the base route where the segment is omitted.
                </p>
                <p>
                  For example, with <code>src/products/[[category]]/page.tsx</code>, both <code>&lt;Link href=&quot;/products&quot; /&gt;</code> and <code>&lt;Link href=&quot;/products/electronics&quot; /&gt;</code> are valid, autocompleted routes.
                </p>
              </div>

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
                    <strong>Best Practice:</strong> Always avoid trailing slashes when building dynamic URLs. Written without the trailing slash (<code>`/posts/$&#123;id&#125;`</code>), TypeScript accurately flags the missing parameter in your IDE and when running <code>npm run typegen &amp;&amp; npx tsc --noEmit</code>.
                  </p>
                </AlertDescription>
              </Alert>
            </section>

            {/* Section 4: Advanced Recipes */}
            <section id="advanced-recipes" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Advanced Usage &amp; Real-World Recipes
              </h2>

              <div id="route-pattern-picking" className="scroll-mt-20 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  4.1. IDE Autocomplete Workflow (Ctrl + Space)
                </h3>
                <p>
                  Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border">Ctrl + Space</kbd> (or <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border border-border">Cmd + Space</kbd>) inside quotes across navigation props (<code>&lt;Link from=&quot;&quot; to=&quot;&quot;&gt;</code>, <code>&lt;Link href=&quot;&quot;&gt;</code>, <code>router.push(&quot;&quot;)</code>) and segment prop generics (<code>PageProps&lt;&quot;&quot;&gt;</code>, <code>LayoutProps&lt;&quot;&quot;&gt;</code>):
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`import { Link, type PageProps } from "dinou";

// 1. Trigger Ctrl + Space inside PageProps<""> to pick any route pattern
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  return (
    <article>
      <h1>{params.slug}</h1>
      {/* 2. Trigger Ctrl + Space inside to="" — lists BOTH static routes AND
             dynamic patterns like "/blog/[slug]", then autocompletes params! */}
      <Link to="/blog/[slug]" params={{ slug: "next-article" }}>
        Next Article
      </Link>

      {/* 3. Trigger Ctrl + Space inside from="" (picks the source folder),
             then inside to="" (suggests "comments", "./comments", ".", "../..", etc.) */}
      <Link from="/blog/[slug]" to="comments">
        View Comments
      </Link>
    </article>
  );
}`}
                </CodeBlock>
              </div>

              <div id="typed-error-pages" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  4.2. Typed Error &amp; Not-Found Pages (ErrorProps &amp; NotFoundProps)
                </h3>
                <p>
                  Error boundaries (<code>error.tsx</code> and <code>@slot/error.tsx</code>) receive <code>error: Error</code> and <code>params</code> via <code>ErrorProps&lt;T&gt;</code>, while custom 404 boundaries (<code>not_found.tsx</code>—including intermediate directory 404 boundaries without a sibling <code>page.tsx</code>) receive cumulative <code>params</code> (plus any sibling <code>page_functions.ts</code> <code>getProps</code> data) via <code>NotFoundProps&lt;T, P?&gt;</code>:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="route-error"
                    tabs={[
                      {
                        id: "route-error",
                        label: "src/blog/[slug]/error.tsx",
                        language: "tsx",
                        code: `"use client";

import { useRouter, type ErrorProps } from "dinou";

export default function BlogPostError({
  params,
  error,
}: ErrorProps<"/blog/[slug]">) {
  const router = useRouter();

  return (
    <div className="error-card p-6 border rounded-xl bg-destructive/10">
      <h2>Failed to load post: {params.slug}</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      {/* Soft reload via Dinou client router */}
      <button onClick={() => router.refresh()}>Try Again</button>
    </div>
  );
}`,
                      },
                      {
                        id: "slot-error",
                        label: "src/dashboard/[org]/@analytics/error.tsx",
                        language: "tsx",
                        code: `"use client";

import { useRouter, type ErrorProps } from "dinou";

export default function AnalyticsSlotError({
  params,
  error,
}: ErrorProps<"/dashboard/[org]/@analytics">) {
  const router = useRouter();

  return (
    <aside className="p-4 border rounded-lg bg-amber-500/10">
      <h3>Analytics unavailable for {params.org}</h3>
      <p className="text-xs text-muted-foreground">{error.message}</p>
      {/* Re-fetch layout & parallel slots without full browser reload */}
      <button onClick={() => router.refresh({ layout: true })}>
        Retry Widget
      </button>
    </aside>
  );
}`,
                      },
                      {
                        id: "interm-error",
                        label: "src/workspace/[org]/error.tsx (Intermediate folder)",
                        language: "tsx",
                        code: `"use client";

import { useRouter, type ErrorProps } from "dinou";

// Catches unhandled errors thrown by any nested child route under /workspace/[org]/*
export default function WorkspaceError({
  params,
  error,
}: ErrorProps<"/workspace/[org]">) {
  const router = useRouter();

  return (
    <div className="p-6 border rounded-xl bg-destructive/10">
      <h2>Workspace error in {params.org}</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <button onClick={() => router.refresh()}>Retry</button>
    </div>
  );
}`,
                      },
                      {
                        id: "not-found",
                        label: "src/workspace/[org]/not_found.tsx",
                        language: "tsx",
                        code: `import { Link, type NotFoundProps } from "dinou";

// Catches 404s under /workspace/[org]/* (or validateParams returning false),
// even when /workspace/[org] has NO sibling page.tsx!
export default function WorkspaceNotFound({
  params,
}: NotFoundProps<"/workspace/[org]">) {
  return (
    <section className="p-6 border rounded-xl">
      <h2>Nothing found in workspace &ldquo;{params.org}&rdquo;</h2>
      <Link href="/">Back to Home</Link>
    </section>
  );
}`,
                      },
                    ]}
                  />
                </div>
              </div>

              <div id="custom-components" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-500" />
                  4.3. Custom Navigation Components with DinouRoute
                </h3>
                <p>
                  When building reusable UI components (custom buttons, navigation tabs, or breadcrumb menus), type their destination props with <code>DinouRoute</code> to give your design system native static link validation in your IDE and <code>tsc</code>:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="component"
                    tabs={[
                      {
                        id: "component",
                        label: "src/components/nav-button.tsx",
                        language: "tsx",
                        code: `import { Link, type DinouRoute } from "dinou";

interface NavButtonProps {
  href: DinouRoute; // 👈 Inherits full autocompletion and route validation
  label: string;
}

export function NavButton({ href, label }: NavButtonProps) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
    >
      {label}
    </Link>
  );
}`,
                      },
                      {
                        id: "consumer",
                        label: "src/components/sidebar.tsx",
                        language: "tsx",
                        code: `import type { DinouRoute } from "dinou";
import { NavButton } from "./nav-button";

const menu: { label: string; href: DinouRoute }[] = [
  { label: "Overview", href: "/docs" },              // ✅ Autocompleted
  { label: "Routing", href: "/docs/routing" },       // ✅ Autocompleted
  // { label: "Broken", href: "/non-existent-page" }, // ❌ TypeScript error!
];

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-2">
      {menu.map((item) => (
        <NavButton key={item.href} href={item.href} label={item.label} />
      ))}
    </aside>
  );
}`,
                      },
                    ]}
                  />
                </div>
              </div>

              <div id="dynamic-interpolation" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-emerald-500" />
                  4.4. Dynamic Navigation: Pattern + params vs. Template Strings
                </h3>
                <p>
                  Dinou supports <strong>two coexisting, type-safe styles</strong> for navigating to dynamic routes in <code>&lt;Link&gt;</code> (<code>href</code> and <code>to</code>), <code>router.push()</code>, and <code>router.replace()</code>:
                </p>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Pattern + <code>params</code>:</strong> Gives you full <code>Ctrl + Space</code> IDE autocomplete for dynamic routes too (because TypeScript only displays finite string literals in completion menus), auto-encodes values via <code>encodeURIComponent</code>, supports catch-all arrays (<code>[...slug]</code>) and optional segments (<code>[[lang]]</code>), and <strong>strictly requires <code>params</code></strong> whenever a required <code>[param]</code> bracket appears in the pattern.
                  </li>
                  <li>
                    <strong>Template String Interpolation:</strong> Lets you build URLs inline (<code>`/products/&#36;&#123;product.id&#125;`</code>) with zero <code>params</code> prop, verified against generated template literal route types while still blocking accidentally uninterpolated <code>[param]</code> placeholders.
                  </li>
                </ul>

                <CodeBlock language="tsx" containerClassName="rounded-xl overflow-hidden my-4">
                  {`"use client";

import { Link, useRouter } from "dinou";

interface Product {
  id: string;
  name: string;
}

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="card p-4 border rounded-xl space-y-2">
      {/* ✅ Style 1: Autocompleted dynamic pattern + required typed params */}
      <Link to="/products/[id]" params={{ id: product.id }}>
        {product.name}
      </Link>

      {/* ✅ Catch-all & optional segments with params */}
      <Link to="/docs/[...slug]" params={{ slug: ["guides", "routing"] }}>
        Routing Docs
      </Link>
      <Link to="/i18n/[[lang]]">Default Locale</Link>

      {/* ✅ Style 2: Direct template string interpolation (no params needed) */}
      <Link href={\`/products/\${product.id}\`}>{product.name} (Direct)</Link>

      {/* ✅ Both styles work identically in router.push() and router.replace() */}
      <button
        onClick={() =>
          router.push("/products/[id]", { params: { id: product.id }, fresh: true })
        }
      >
        View Details
      </button>
      <button onClick={() => router.replace(\`/products/\${product.id}\`)}>
        Quick Replace
      </button>

      {/* ❌ Compile-time error: [id] can NEVER slip into the URL without params! */}
      {/* <Link to="/products/[id]">Broken</Link> */}
      {/* <button onClick={() => router.push("/products/[id]")} /> */}
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <div id="relative-navigation" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-indigo-500" />
                  4.5. Strict Relative Navigation with <code>from</code>
                </h3>
                <p>
                  At static analysis time, TypeScript cannot infer which URL is currently mounted in the browser—especially inside shared components, persistent layouts, or parallel <code>@slots</code>. To guarantee <strong>zero unvalidated relative links</strong>, Dinou rejects unanchored relative paths (such as <code>to=&quot;./subs&quot;</code>, <code>to=&quot;./sub&quot;</code>, or <code>to=&quot;sub&quot;</code> without <code>from</code>) and unlocks exact, filesystem-grade relative routing whenever you specify <code>from</code>:
                </p>
                <ul className="text-sm space-y-1.5">
                  <li>
                    <strong><code>Ctrl + Space</code> Autocomplete on Both <code>from</code> and <code>to</code> / <code>href</code>:</strong> Inside <code>from=&quot;&quot;</code>, your IDE suggests every route and intermediate directory prefix in your project (e.g., <code>&quot;/workspace&quot;</code>, <code>&quot;/workspace/[org]&quot;</code>, <code>&quot;/workspace/[org]/contact&quot;</code>, also accepting patterns without a leading slash like <code>&quot;workspace/[org]/contact&quot;</code>). Once <code>from</code> is set, <code>to=&quot;&quot;</code> / <code>href=&quot;&quot;</code> suggests only the exact finite set of valid navigable relative paths from that folder.
                  </li>
                  <li>
                    <strong>Both <code>&quot;sub&quot;</code> and <code>&quot;./sub&quot;</code> + Non-Page Parent Exclusion:</strong> Just like <code>cd sub</code> and <code>cd ./sub</code> in a terminal, Dinou treats every route as a directory. Both <code>&quot;sub&quot;</code> and <code>&quot;./sub&quot;</code> (plus <code>&quot;.&quot;</code>, <code>&quot;../..&quot;</code>, and valid siblings) appear in autocomplete, while typos (<code>&quot;subs&quot;</code>, <code>&quot;./subs&quot;</code>) and intermediate parent directories without a <code>page.tsx</code> (e.g., <code>&quot;..&quot;</code> when <code>/workspace/[org]</code> only has a <code>layout.tsx</code>) are automatically excluded and rejected!
                  </li>
                  <li>
                    <strong>Automatic Parent Param Inheritance:</strong> Navigating relatively within a dynamic subtree (e.g., <code>from=&quot;/workspace/[org]/contact&quot;</code> to <code>to=&quot;sub&quot;</code>) reuses the active <code>[org]</code> value already in the browser URL at runtime—no <code>params</code> prop needed! You only pass <code>params</code> when the relative target itself enters a <em>new</em> dynamic child segment (e.g., <code>from=&quot;/workspace&quot;</code> + <code>to=&quot;[org]/contact/sub&quot;</code>).
                  </li>
                  <li>
                    <strong>Deterministic Inside <code>layout.tsx</code> &amp; Parallel <code>@slots</code>:</strong> Because <code>@slot</code> folders (like <code>@sidebar</code>) do not appear in browser URLs, anchor relative links inside <code>src/workspace/[org]/@sidebar/page.tsx</code> to their URL segment <code>from=&quot;/workspace/[org]&quot;</code>. Even when the browser is on a deeper child route like <code>/workspace/acme/contact/sub</code>, Dinou slices the runtime base pathname back to <code>/workspace/acme</code> so <code>to=&quot;contact&quot;</code> always resolves cleanly to <code>/workspace/acme/contact</code>.
                  </li>
                  <li>
                    <strong>Identical Support in <code>useRouter()</code>:</strong> Both <code>router.push(relativeHref, &#123; from &#125;)</code> and <code>router.replace(relativeHref, &#123; from, fresh &#125;)</code> share the exact same autocomplete, parameter rules, and runtime base slicing.
                  </li>
                </ul>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="leaf-relative"
                    tabs={[
                      {
                        id: "leaf-relative",
                        label: "src/workspace/[org]/contact/page.tsx (Page & useRouter)",
                        language: "tsx",
                        code: `"use client";

import { Link, useRouter } from "dinou";

// Assuming src/workspace/page.tsx, src/workspace/[org]/contact/page.tsx,
// and src/workspace/[org]/contact/sub/page.tsx exist (no page.tsx at /workspace/[org]):
export function ContactActions({ nextOrg }: { nextOrg: string }) {
  const router = useRouter();

  return (
    <nav className="flex flex-wrap gap-3">
      {/* ✅ Bare child ("sub") and dot-slash ("./sub") both autocomplete & validate! */}
      {/*    Active [org] is inherited from the browser URL — no params needed */}
      <Link from="/workspace/[org]/contact" to="sub">
        Subpage (cd sub)
      </Link>
      <Link from="/workspace/[org]/contact" to="./sub">
        Subpage (cd ./sub)
      </Link>

      {/* ✅ Parent navigation: "../.." resolves to /workspace (has page.tsx) */}
      <Link from="/workspace/[org]/contact" to="../..">
        Back to Workspace Hub
      </Link>

      {/* ✅ Entering a NEW dynamic child segment from a parent route requires params */}
      <Link from="/workspace" to="[org]/contact/sub" params={{ org: nextOrg }}>
        Switch Org Subpage
      </Link>

      {/* ✅ Programmatic push() and replace() support { from } identically */}
      <button
        onClick={() => router.push("sub", { from: "/workspace/[org]/contact" })}
      >
        Push Subpage
      </button>
      <button
        onClick={() =>
          router.replace("../..", { from: "/workspace/[org]/contact", fresh: true })
        }
      >
        Replace to Hub
      </button>

      {/* ❌ Compile-time error: ".." points to /workspace/[org], which has NO page.tsx! */}
      {/* <Link from="/workspace/[org]/contact" to="..">Missing parent page</Link> */}

      {/* ❌ Compile-time error: typo in relative target */}
      {/* <Link from="/workspace/[org]/contact" to="subs">Typo</Link> */}
      {/* <Link from="/workspace/[org]/contact" to="./subs">Typo</Link> */}

      {/* ❌ Compile-time error: unanchored relative path without from */}
      {/* <Link to="./sub">Missing from</Link> */}
      {/* <Link to="sub">Missing from</Link> */}
    </nav>
  );
}`,
                      },
                      {
                        id: "slot-relative",
                        label: "src/workspace/[org]/@sidebar/page.tsx (Layout & @slot)",
                        language: "tsx",
                        code: `import { Link, type SlotProps } from "dinou";

export default function WorkspaceSidebar({
  params,
}: SlotProps<"/workspace/[org]/@sidebar">) {
  return (
    <aside className="space-y-2">
      <h3>Org: {params.org}</h3>

      {/* ✅ @sidebar is not part of the URL, so anchor from="/workspace/[org]"!
             Even if the user is deep inside /workspace/acme/contact/sub,
             Dinou slices the base pathname to /workspace/acme -> /workspace/acme/contact */}
      <Link from="/workspace/[org]" to="contact">
        Contact Overview
      </Link>
      <Link from="/workspace/[org]" to="contact/sub">
        Contact Subpage
      </Link>
    </aside>
  );
}`,
                      },
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* Section 5: Technical Architecture */}
            <section id="architecture" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Technical Architecture: Under the Hood
              </h2>
              <p className="text-muted-foreground">
                Dinou coordinates compilation, route scanning, and TypeScript declarations through a zero-dependency architecture:
              </p>

              {/* Compilation Pipeline Flow */}
              <div className="not-prose bg-muted/40 rounded-xl p-4 sm:p-5 border border-border my-6 space-y-3">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold font-sans text-sm">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  <span>Compilation &amp; Type Generation Pipeline</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1 text-xs font-sans">
                  <div className="bg-card border border-border/80 rounded-lg p-3 space-y-1">
                    <span className="text-[11px] font-mono text-blue-500 font-semibold">01. Filesystem</span>
                    <p className="font-semibold text-foreground">src/ Directory</p>
                    <p className="text-[11px] text-muted-foreground leading-normal">Single-pass scan of <code>src/</code> across pages, horizontal layouts, <code>@slots</code>, and error boundaries.</p>
                  </div>
                  <div className="bg-card border border-border/80 rounded-lg p-3 space-y-1">
                    <span className="text-[11px] font-mono text-emerald-500 font-semibold">02. Scanner</span>
                    <p className="font-semibold text-foreground">generate-route-types</p>
                    <p className="text-[11px] text-muted-foreground leading-normal">In-memory scanner completes in &lt; 2ms.</p>
                  </div>
                  <div className="bg-card border border-border/80 rounded-lg p-3 space-y-1">
                    <span className="text-[11px] font-mono text-indigo-500 font-semibold">03. Declaration</span>
                    <p className="font-semibold text-foreground">routes.d.ts</p>
                    <p className="text-[11px] text-muted-foreground leading-normal">Augments <code>&quot;dinou&quot;</code> module contract.</p>
                  </div>
                  <div className="bg-card border border-border/80 rounded-lg p-3 space-y-1">
                    <span className="text-[11px] font-mono text-purple-500 font-semibold">04. IDE &amp; CI</span>
                    <p className="font-semibold text-foreground">tsconfig.json</p>
                    <p className="text-[11px] text-muted-foreground leading-normal">Includes <code>.dinou/types/**/*.d.ts</code> for autocompletion.</p>
                  </div>
                </div>
              </div>

              {/* 4 Architectural Pillars in a 2x2 Grid */}
              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Card id="route-scanner" className="scroll-mt-20 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-emerald-500" />
                        <CardTitle className="text-base">5.1. Ultra-Fast Route Scanner</CardTitle>
                      </div>
                      <Badge variant="outline" className="font-mono text-[10px]">&lt; 2ms</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Implemented in <code className="text-foreground">dinou/core/generate-route-types.js</code>. Pure filesystem parsing without executing user code, importing components, or launching test servers.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 pt-1">
                      <li>Ignores private folders (<code>_*</code>) and transparently unwraps route groups (<code>(group)</code>).</li>
                      <li>Separates navigable <code>page.*</code> URLs from intermediate <code>layout.*</code> / <code>layout_functions.*</code> and parallel <code>@slot</code> segments.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card id="generated-definitions" className="scroll-mt-20 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-indigo-500" />
                        <CardTitle className="text-base">5.2. Module Augmentation</CardTitle>
                      </div>
                      <Badge variant="outline" className="font-mono text-[10px]">routes.d.ts</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Generates <code>.dinou/types/routes.d.ts</code> augmenting the core <code>&quot;dinou&quot;</code> module with:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 pt-1">
                      <li><code>DinouStaticRoutes</code> &amp; <code>DinouDynamicRoutes</code>: Navigable <code>page.*</code> URL unions.</li>
                      <li><code>DinouNavigableParamsMap</code>: Navigable <code>page.*</code> dynamic patterns powering <code>&lt;Link&gt;</code> &amp; <code>useRouter()</code> autocomplete and <code>params</code> typing.</li>
                      <li><code>DinouRouteParamsMap</code>: Page &amp; <code>not_found.*</code> param dictionaries.</li>
                      <li><code>DinouLayoutParamsMap</code> &amp; <code>DinouLayoutSlotsMap</code>: Intermediate &amp; leaf layout params plus auto-inferred <code>@slot</code> props.</li>
                      <li><code>DinouSlotParamsMap</code> &amp; <code>DinouErrorParamsMap</code>: Parallel <code>@slot</code> and error boundary params.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card id="compiler-plumbing" className="scroll-mt-20 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-purple-500" />
                        <CardTitle className="text-base">5.3. Internal Compiler Plumbing</CardTitle>
                      </div>
                      <Badge variant="outline" className="font-mono text-[10px]">TS4058 Safe</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Types like <code>DinouRouter.Register</code>, <code>DinouRoutePattern</code>, <code>DinouLayoutPattern</code>, <code>DinouSlotPattern</code>, <code>DinouErrorPattern</code>, and <code>ExtractRouteParams&lt;T&gt;</code> are exported to satisfy TypeScript declaration emit rules.
                    </p>
                    <p>
                      They allow module augmentation to wire seamlessly into the global type contract without polluting your daily application code.
                    </p>
                  </CardContent>
                </Card>

                <Card id="tsconfig-wiring" className="scroll-mt-20 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-base">5.4. tsconfig.json Integration</CardTitle>
                      </div>
                      <Badge variant="outline" className="font-mono text-[10px]">tsconfig.json</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Generated definitions under <code>.dinou/types/routes.d.ts</code> are discovered by TypeScript via the <code>include</code> array in your root <code>tsconfig.json</code>:
                    </p>
                    <div className="font-mono text-[11px] bg-muted/80 p-2 rounded border border-border/60">
                      {`"include": ["src", "dinou-env.d.ts", ".dinou/types/**/*.d.ts"]`}
                    </div>
                    <p>
                      Ensures IDEs and CI discover route typings immediately without manual triple-slash references in <code>dinou-env.d.ts</code>.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 6: Lifecycle */}
            <section id="lifecycle" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Lifecycle: Dev Server, Typegen CLI &amp; Production Builds
              </h2>
              <p className="text-muted-foreground">
                How Dinou keeps your route typings strictly synchronized across local development, standalone type-checking, and deployment pipelines:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Card id="dev-watcher" className="scroll-mt-20 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-500" />
                        <CardTitle className="text-base">6.1. Local Dev: Hot Watcher</CardTitle>
                      </div>
                      <Badge variant="secondary" className="font-mono text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                        &lt; 2ms Hot Reload
                      </Badge>
                    </div>
                    <CardDescription className="text-xs font-mono">
                      npm run dev
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Runs immediately at boot, then arms a low-overhead filesystem watcher on <code>src/</code>:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Detects added, renamed, or deleted <code>page</code>, <code>page_functions</code>, <code>layout</code>, <code>layout_functions</code>, <code>error</code>, and <code>not_found</code> files (including inside <code>@slot</code> folders).</li>
                      <li>Regenerates <code>.dinou/types/routes.d.ts</code> in under 2ms.</li>
                      <li>IDE autocomplete reflects changes instantly with <strong>no server restarts</strong>.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card id="typegen-cli" className="scroll-mt-20 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-emerald-500" />
                        <CardTitle className="text-base">6.2. Standalone CLI: On-Demand Typegen</CardTitle>
                      </div>
                      <Badge variant="secondary" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                        Instant CLI
                      </Badge>
                    </div>
                    <CardDescription className="text-xs font-mono">
                      npm run typegen / npx dinou typegen
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Generates <code>.dinou/types/routes.d.ts</code> on demand in milliseconds without launching the dev server or running bundlers:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Fresh repo clones:</strong> Populate IDE autocomplete right after <code>npm install</code> (since <code>.dinou/</code> is gitignored).</li>
                      <li><strong>Offline route scaffolding:</strong> Refresh route, intermediate layout, <code>not_found</code>, and <code>@slot</code> types while the dev server is stopped.</li>
                      <li><strong>Fast CI type-checks:</strong> Run <code>npm run typegen &amp;&amp; npx tsc --noEmit</code> in lightweight PR checks without waiting for a full production build.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card id="prod-builds" className="scroll-mt-20 sm:col-span-2 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-indigo-500" />
                        <CardTitle className="text-base">6.3. Production: Deterministic Builds</CardTitle>
                      </div>
                      <Badge variant="secondary" className="font-mono text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                        Step 0 Build Hook
                      </Badge>
                    </div>
                    <CardDescription className="text-xs font-mono">
                      npm run build
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      All bundlers and target pipelines (esbuild, Rollup, Webpack, Node, Bun, Deno, Cloudflare) automatically invoke the topology scanner before bundling:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Generates <code>.dinou/types/routes.d.ts</code> deterministically as Step 0 of <code>npm run build</code>.</li>
                      <li><strong>Type-stripping vs. Type-checking:</strong> Because Dinou&apos;s bundlers perform fast type-stripping without invoking <code>tsc</code>, <code>npm run build</code> alone will not fail on broken route types. Enforce strict verification in CI/CD (or pre-commit hooks) by running <code>npm run typegen &amp;&amp; npx tsc --noEmit</code> (before or independently of the build) or <code>npm run build &amp;&amp; npx tsc --noEmit</code>.</li>
                    </ul>
                  </CardContent>
                </Card>
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
