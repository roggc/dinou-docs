import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  RefreshCw,
  Tag,
  FolderOpen,
  Info,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Database,
  Lock,
  ArrowRight,
  Server,
  Sparkles,
  Sliders,
  FileCode,
  CheckCircle2,
  GitCompare,
  Workflow,
  Cpu,
  Globe,
  FileText,
  LayoutGrid,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
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
    title: "Overview & Multi-Tier Architecture",
    level: 2,
  },
  {
    id: "revalidate-page",
    title: "1. revalidatePage (Surgical Page Invalidation)",
    level: 2,
  },
  {
    id: "revalidate-page-usage",
    title: "1.1. Usage in Server Functions",
    level: 3,
  },
  {
    id: "revalidate-path",
    title: "2. revalidatePath (Route & Segment Purge)",
    level: 2,
  },
  {
    id: "cascade-revalidation",
    title: "2.1. Cascading Revalidation ({ cascade: true })",
    level: 3,
  },
  {
    id: "granularity-and-resolution",
    title: "3. Granularity & Path Resolution (Page vs Segment)",
    level: 2,
  },
  {
    id: "revalidate-page-vs-path",
    title: "3.1. revalidatePage vs revalidatePath",
    level: 3,
  },
  {
    id: "absolute-and-relative",
    title: "3.2. Absolute & Relative Route Paths",
    level: 3,
  },
  {
    id: "revalidate-tag",
    title: "4. revalidateTag (Cross-Cutting Invalidation)",
    level: 2,
  },
  {
    id: "tag-assignment",
    title: "4.1. Tag Assignment (getCacheTags)",
    level: 3,
  },
  {
    id: "targeted-tag-resolution",
    title: "4.2. Targeted Resolution (Layout vs Page vs Slot)",
    level: 3,
  },
  {
    id: "golden-rules",
    title: "4.3. Golden Rules of Invalidation",
    level: 3,
  },
  {
    id: "cache-slot-revalidation",
    title: "4.4. Invalidating <DinouCacheSlot> Subtrees",
    level: 3,
  },
  {
    id: "client-side-refresh",
    title: "5. Client-Side Surgical Revalidation",
    level: 2,
  },
  {
    id: "router-caches",
    title: "5.1. The Router Caches (pageCache & layoutCache)",
    level: 3,
  },
  {
    id: "link-fresh",
    title: "5.2. Bypassing Client Cache with <Link fresh>",
    level: 3,
  },
  {
    id: "router-refresh",
    title: "5.3. router.refresh() & Layout Invalidation",
    level: 3,
  },
  {
    id: "refresh-slot",
    title: "5.4. refreshSlot & router.refreshSlot",
    level: 3,
  },
  {
    id: "storage-adapters",
    title: "6. Pluggable Storage Adapters",
    level: 2,
  },
  {
    id: "distributed-problem",
    title: "6.1. Why Adapters Matter for Revalidation",
    level: 3,
  },
  {
    id: "adapter-catalog",
    title: "6.2. Supported Storage Adapters & Configuration",
    level: 3,
  },
  {
    id: "security-and-webhooks",
    title: "7. Webhook Integrations (Headless CMS)",
    level: 2,
  },
  {
    id: "strategy-matrix",
    title: "8. Strategy Comparison Matrix",
    level: 2,
  },
  {
    id: "server-matrix",
    title: "8.1. Server-Side Invalidation",
    level: 3,
  },
  {
    id: "client-matrix",
    title: "8.2. Client-Side Router Refresh",
    level: 3,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>On-Demand Revalidation | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Purge, regenerate, and promote static page caches, layout shells, and component subtrees on-demand in production when mutative events occur."
      />
      <link rel="canonical" href="https://dinou.dev/docs/revalidation" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                On-Demand Revalidation
              </h1>
              <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">
                Dinou v7
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Purge, regenerate, and promote static page caches, layout shells, and
              component subtrees on-demand in production when mutative events occur,
              with zero hydration mismatches and full Edge/Node runtime parity.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview &amp; Multi-Tier Architecture</h2>
              <p>
                Dinou implements a strictly decoupled <strong>two-tier caching architecture</strong>:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Server className="h-5 w-5" />
                      <span>1. Server Tier (Persistence &amp; Artifacts)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Controls pre-rendered static artifacts (<code>page.rsc</code>,{" "}
                      <code>index.html</code>, <code>layout.rsc</code>) stored on disk (
                      <code>.dinou/dist2/</code>) or Edge KV storage (Cloudflare Workers, Deno KV).
                    </p>
                    <p>
                      Managed via <code>revalidate</code> (time-based ISR) and server APIs:{" "}
                      <code>revalidatePage</code>, <code>revalidatePath</code>, and{" "}
                      <code>revalidateTag</code>.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Globe className="h-5 w-5" />
                      <span>2. Client Tier (In-Memory SPA Router)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Caches React Server Component (RSC) payloads and layout segments in the browser tab
                      memory (<code>pageCache</code> and <code>layoutCache</code>) for instant 0ms navigations
                      and state-preserving transitions.
                    </p>
                    <p>
                      Controlled via <code>&lt;Link fresh&gt;</code>,{" "}
                      <code>router.refresh()</code>, and <code>refreshSlot()</code> without full browser
                      reloads.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* 4 Invalidation Levels */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 not-prose my-6">
                <Card className="border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 text-sm">
                      <FileText className="h-4 w-4" />
                      <span>Surgical Page</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <code>revalidatePage(path)</code> regenerates only <code>page.rsc</code> and{" "}
                    <code>index.html</code>, leaving all layouts intact.
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                      <FolderOpen className="h-4 w-4" />
                      <span>Route Segment</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <code>revalidatePath(path)</code> purges page, HTML, and any layout in that segment,
                    supporting <code>{`{ cascade: true }`}</code>.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                      <Tag className="h-4 w-4" />
                      <span>Cross-Cutting Tag</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <code>revalidateTag(tag)</code> selectively updates layouts, pages, or micro-slots based
                    on where the tag was defined.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 text-sm">
                      <Sliders className="h-4 w-4" />
                      <span>Micro-Slot</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <code>&lt;DinouCacheSlot&gt;</code> isolates component subtrees refreshed via{" "}
                    <code>refreshSlot()</code> or <code>revalidateTag()</code>.
                  </CardContent>
                </Card>
              </div>

              <p>
                Server revalidation APIs are exported from the server-only endpoint{" "}
                <code>&quot;dinou/server&quot;</code>, keeping browser client bundles clean, lightweight,
                and secure.
              </p>

              <Alert className="not-prose border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 my-6">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <AlertTitle className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                  Strict Execution Rules: Where to Call Revalidation APIs
                </AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground mt-2 space-y-2 leading-relaxed">
                  <p>
                    <strong>Only in Mutative Event Contexts:</strong> Revalidation APIs (<code>revalidatePage</code>,{" "}
                    <code>revalidatePath</code>, <code>revalidateTag</code>) are mutative side-effects. They must only be invoked
                    inside <strong>Server Functions</strong> (<code>&quot;use server&quot;</code>) or <strong>HTTP Webhook endpoints</strong> (such as Headless CMS publishing events).
                  </p>
                  <p>
                    <strong>Never Inside Components or <code>getProps</code>:</strong> Calling revalidation during the component render phase or within{" "}
                    <code>getProps</code> creates an <strong>infinite regeneration loop</strong>, causing severe CPU exhaustion and server crashes.
                  </p>
                </AlertDescription>
              </Alert>
            </section>

            {/* 1. revalidatePage */}
            <section
              id="revalidate-page"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  1. <code>revalidatePage</code> (Surgical Page Invalidation)
                </h3>
                <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  New in Dinou v7
                </span>
              </div>

              <p className="mt-4">
                Exported from <code>&quot;dinou/server&quot;</code>, <code>revalidatePage(path)</code> is
                specifically designed for scenarios where <strong>only the leaf page content has changed</strong>.
                It provides two critical advantages:
              </p>
              <ul>
                <li>
                  <strong>Maximum Performance:</strong> It avoids the CPU and disk/KV I/O costs of re-rendering and recompiling unaffected parent layouts.
                </li>
                <li>
                  <strong>Architectural Safety:</strong> By leaving all <code>layout.rsc</code> files untouched, it guarantees that parent layout definitions remain completely stable, eliminating any danger of introducing accidental <strong>Hydration Mismatches</strong> into child routes.
                </li>
              </ul>

              {/* Hydration Mismatch Hazard Callout */}
              <div className="border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20 rounded-lg p-4 not-prose my-6">
                <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>The Layout Revalidation Trap: Preventing Hydration Mismatches</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <p>
                    In full-stack React frameworks, revalidating a layout is an operation that carries subtle architectural risks.
                    When a layout (<code>layout.rsc</code>) is regenerated, all underlying child routes still have their static pre-rendered <code>index.html</code> baked with the <strong>previous layout markup</strong>.
                  </p>
                  <p>
                    If a user performs a <strong>hard reload (F5)</strong> or accesses a child route directly by URL, the browser first displays the stale <code>index.html</code> shell. When the incoming streaming RSC resolves with the newly regenerated <code>layout.rsc</code>, React 19 detects conflicting DOM trees and triggers a <strong>Hydration Mismatch error</strong> accompanied by visible UI flashes.
                  </p>
                  <p>
                    <strong>Why <code>revalidatePage</code> is safe:</strong> It only updates the leaf <code>page.rsc</code> and that page&apos;s specific <code>index.html</code>. Because parent layouts remain completely untouched, zero child routes are put at risk. (When a layout <em>does</em> need to change, use <code>revalidatePath(path, {`{ cascade: true }`})</code> to propagate fresh HTML to all children).
                  </p>
                </div>
              </div>

              {/* 1.1 Usage in Server Functions */}
              <section id="revalidate-page-usage" className="mt-6 scroll-mt-20">
                <h4>1.1. Usage in Server Functions</h4>
                <p>
                  Call <code>revalidatePage</code> directly inside your Server Functions or route handlers:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/server-functions.ts
"use server";

import { revalidatePage } from "dinou/server";
import db from "@/lib/db";

export async function updateArticle(slug: string, newContent: string) {
  await db.articles.update({
    where: { slug },
    data: { content: newContent, updatedAt: new Date() },
  });

  // Regenerates ONLY page.rsc and index.html for this blog post
  // Parent layout.rsc is NOT touched!
  await revalidatePage(\`/blog/\${slug}\`);
}`}
                </CodeBlock>

                <div className="border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20 rounded-lg p-4 not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400 mb-2">
                    <Sparkles className="h-5 w-5" />
                    <span>What does revalidatePage do internally?</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                    <li>
                      <strong>Regenerates <code>page.rsc</code>:</strong> Runs the server component renderer
                      for that route and atomically promotes the new binary RSC stream.
                    </li>
                    <li>
                      <strong>Regenerates <code>index.html</code>:</strong> Re-renders the complete HTML for
                      initial visits and SEO crawlers.
                    </li>
                    <li>
                      <strong>Zero Layout Overhead:</strong> Leaves all layout files (<code>layout.rsc</code>)
                      completely untouched, saving valuable CPU cycles on complex or shared layouts.
                    </li>
                    <li>
                      <strong>Full Edge KV Parity:</strong> In Edge runtimes (Cloudflare Workers, Deno KV),
                      it updates the KV keys for <code>page.rsc</code> and <code>index.html</code> atomically.
                    </li>
                  </ul>
                </div>
              </section>
            </section>

            {/* 2. revalidatePath */}
            <section
              id="revalidate-path"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                2. <code>revalidatePath</code> (Route &amp; Segment Purge)
              </h3>
              <p>
                Exported from <code>&quot;dinou/server&quot;</code>, <code>revalidatePath</code> is the
                comprehensive segment revalidation method. It rebuilds the static files in that directory,
                including any <code>layout.tsx</code> residing in that folder:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`// src/dashboard/server-functions.ts
"use server";

import { revalidatePath } from "dinou/server";

export async function refreshDashboard() {
  // Revalidates /dashboard (page.rsc, index.html, and layout.rsc if present in that folder)
  await revalidatePath("/dashboard");
}`}
              </CodeBlock>

              {/* 2.1 Cascading Revalidation */}
              <section id="cascade-revalidation" className="mt-8 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <h4 className="m-0">
                    2.1. Cascading Revalidation (<code>{`{ cascade: true }`}</code>)
                  </h4>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Layout Propagation
                  </span>
                </div>

                <p className="mt-4">
                  When updating a shared layout (such as a dashboard shell with dynamic sidebar menus, breadcrumbs,
                  or notifications), simply revalidating the layout is not enough for full static consistency. Pass{" "}
                  <code>{`{ cascade: true }`}</code>:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/dashboard/server-functions.ts
"use server";

import { revalidatePath } from "dinou/server";

export async function updateDashboardNavigation() {
  // Revalidates /dashboard and cascades revalidatePage to ALL child routes
  await revalidatePath("/dashboard", { cascade: true });
}`}
                </CodeBlock>

                <div className="border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 rounded-lg p-4 not-prose my-6">
                  <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    <Workflow className="h-5 w-5" />
                    <span>How Cascading Revalidation Operates Internally</span>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-5">
                    <li>
                      <strong>Primary Revalidation:</strong> Dinou revalidates the target route{" "}
                      <code>/dashboard</code> (<code>layout.rsc</code>, <code>page.rsc</code>, and{" "}
                      <code>index.html</code>).
                    </li>
                    <li>
                      <strong>Safety Guard Condition:</strong> The cascade <strong>only activates if a layout
                      in that route was actually revalidated</strong>. If the route contains no layout, no
                      unnecessary cascade is triggered.
                    </li>
                    <li>
                      <strong>Recursive Propagation:</strong> Dinou discovers all child sub-routes (e.g.{" "}
                      <code>/dashboard/analytics</code>, <code>/dashboard/settings</code>,{" "}
                      <code>/dashboard/users</code>) and automatically invokes{" "}
                      <code>revalidatePage(childPath)</code> on each one in parallel.
                    </li>
                  </ol>
                </div>
              </section>


            </section>

            {/* 3. Granularity & Path Resolution (Page vs Segment) */}
            <section
              id="granularity-and-resolution"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                3. Granularity &amp; Path Resolution (Page vs Segment)
              </h3>
              <p>
                Having introduced both <code>revalidatePage</code> and <code>revalidatePath</code>,
                this section contrasts their architectural scopes and details how paths are resolved
                in server execution contexts.
              </p>

              {/* 3.1 revalidatePage vs revalidatePath */}
              <section id="revalidate-page-vs-path" className="mt-6 scroll-mt-20">
                <h4>3.1. revalidatePage vs revalidatePath</h4>
                <p>
                  Understanding when to use <code>revalidatePage</code> versus <code>revalidatePath</code>{" "}
                  is essential for optimal server performance and avoiding unintended layout invalidation:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Feature</TableHead>
                        <TableHead><code>revalidatePage(path)</code></TableHead>
                        <TableHead><code>revalidatePath(path)</code></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold text-xs">Page RSC (<code>page.rsc</code>)</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Regenerated</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Regenerated</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold text-xs">HTML (<code>index.html</code>)</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Regenerated</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Regenerated</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold text-xs">Segment Layout (<code>layout.rsc</code>)</TableCell>
                        <TableCell className="text-xs text-muted-foreground font-medium">Untouched (0ms CPU)</TableCell>
                        <TableCell className="text-xs text-blue-600 dark:text-blue-400 font-medium">Regenerated (if layout exists)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold text-xs">Cascade Option</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Not applicable (single leaf)</TableCell>
                        <TableCell className="text-xs font-mono">{`{ cascade: true }`}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold text-xs">Ideal Use Case</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Article updates, product price edits, comment additions</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Section navigation updates, module-wide changes, layout alterations</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* 3.2 Absolute and Relative Paths */}
              <section id="absolute-and-relative" className="mt-8 scroll-mt-20">
                <h4>3.2. Absolute &amp; Relative Route Paths</h4>
                <p>
                  Both <code>revalidatePage</code> and <code>revalidatePath</code> accept absolute route pathnames
                  or relative paths resolved from the calling browser URL:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/products/server-functions.ts
"use server";

import { revalidatePath, revalidatePage } from "dinou/server";
import db from "@/lib/db";

export async function updateCategory(categoryId: string, data: any) {
  await db.categories.update({ where: { id: categoryId }, data });

  // 1. Absolute path: Revalidates /catalog (page.rsc, index.html, layout.rsc)
  await revalidatePath("/catalog");

  // 2. Relative paths inside Server Functions (resolved via HTTP referer):
  // Revalidate the current invoking leaf page surgically (e.g. /catalog/edit)
  await revalidatePage("./");

  // Revalidate an adjacent route segment (e.g. /catalog/featured)
  await revalidatePath("../featured");
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 4. revalidateTag */}
            <section
              id="revalidate-tag"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                4. <code>revalidateTag</code> (Cross-Cutting Invalidation)
              </h3>
              <p>
                Purges all static pages, layouts, and component subtrees tagged with a specific key string across
                your entire application with a single call:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/products/server-functions.ts
"use server";

import { revalidateTag } from "dinou/server";
import db from "@/lib/db";

export async function syncInventory() {
  // Invalidates all routes and slots carrying the "products" tag
  await revalidateTag("products");
}`}
              </CodeBlock>

              {/* 4.1 Tag Assignment */}
              <section id="tag-assignment" className="mt-6 scroll-mt-20">
                <h4>4.1. Tag Assignment (<code>getCacheTags</code>)</h4>
                <p>
                  To attach cache tags to a route, export <code>getCacheTags</code> from your{" "}
                  <code>page_functions.ts</code> (using <code>PageFunctions</code>) or{" "}
                  <code>layout_functions.ts</code> (using <code>LayoutFunctions</code>):
                </p>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                        <Tag className="h-5 w-5" />
                        <span>Constant Array Export</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Ideal for fixed tags on static routes:
                      </p>
                      <CodeBlock language="typescript">
{`// src/blog/page_functions.ts
import type { PageFunctions } from "dinou";

export const getCacheTags: PageFunctions["getCacheTags"] = [
  "blog",
  "marketing",
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
                        Ideal for dynamic, parameter-driven tags:
                      </p>
                      <CodeBlock language="typescript">
{`// src/products/[id]/page_functions.ts
import type { RouteParams } from "dinou";

export function getCacheTags(params: RouteParams<"/products/[id]">) {
  return ["products", \`product-\${params.id}\`];
}`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 not-prose">
                  <p className="text-sm text-muted-foreground mb-2">
                    You can also type the full contract using <code>PageFunctions</code> (or <code>LayoutFunctions</code>) together with <code>RouteParams</code>:
                  </p>
                  <CodeBlock language="typescript">
{`// src/products/[id]/page_functions.ts
import type { PageFunctions, RouteParams } from "dinou";

export const getCacheTags: PageFunctions<
  RouteParams<"/products/[id]">
>["getCacheTags"] = (params) => {
  return ["products", \`product-\${params?.id}\`];
};`}
                  </CodeBlock>

                  <Alert className="border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 mt-4">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertTitle className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                      Transparent Sync and Async Support
                    </AlertTitle>
                    <AlertDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      The type declaration remains identical whether <code>getCacheTags</code> is synchronous or <code>async</code> (such as querying a database or CMS with <code>await</code>). Dinou&apos;s return contract (<code>string[] | Promise&lt;string[]&gt;</code>) and <code>RouteParams</code> polymorphically accommodate both forms without requiring separate types.
                    </AlertDescription>
                  </Alert>
                </div>
              </section>

              {/* 4.2 Targeted Tag Resolution */}
              <section id="targeted-tag-resolution" className="mt-8 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <h4 className="m-0">
                    4.2. Targeted Resolution (Layout vs Page vs Slot)
                  </h4>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Intelligent Purge
                  </span>
                </div>

                <p className="mt-4">
                  In Dinou, <code>revalidateTag(tag, options?)</code> inspects where the tag was defined and executes
                  the most surgical revalidation action possible:
                </p>

                <div className="grid gap-4 md:grid-cols-3 not-prose my-6">
                  <Card className="border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 text-sm">
                        <Layers className="h-4 w-4" />
                        <span>Tag in Layout</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-1.5">
                      <p>Defined in <code>layout_functions.ts</code>.</p>
                      <p>
                        <strong>Default (<code>revalidateTag(tag)</code>):</strong> Dinou runs internal <code>revalidateLayout(path)</code>, regenerating{" "}
                        <strong>exclusively <code>layout.rsc</code></strong>. Child pages and HTML remain untouched for maximum speed!
                      </p>
                      <p>
                        <strong>With cascade (<code>revalidateTag(tag, {`{ cascade: true }`})</code>):</strong> Dinou executes <code>revalidatePath(path, {`{ cascade: true }`})</code>, regenerating <code>layout.rsc</code> and cascading to all child pages to bake the new layout into their <code>index.html</code> (eliminating hydration mismatches).
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                        <FileCode className="h-4 w-4" />
                        <span>Tag in Page</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-1.5">
                      <p>Defined in <code>page_functions.ts</code>.</p>
                      <p>
                        Dinou executes <strong><code>revalidatePage(path)</code></strong>, regenerating{" "}
                        <strong>exclusively <code>page.rsc</code> and <code>index.html</code></strong>.
                      </p>
                      <p>
                        Parent layouts remain completely untouched—even if the page shares a folder with a <code>layout.tsx</code>—avoiding unnecessary layout recompilations.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20">
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 text-sm">
                        <Sliders className="h-4 w-4" />
                        <span>Tag in Slot</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-1.5">
                      <p>Defined in <code>&lt;DinouCacheSlot&gt;</code>.</p>
                      <p>
                        Dinou purges <strong>only the slot directory or KV key</strong> without touching the host page or layouts.
                      </p>
                      <p>
                        The component fragment is re-rendered on the next visit or updated in-place via client <code>refreshSlot</code>.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 4.3 Golden Rules */}
              <section id="golden-rules" className="mt-8 scroll-mt-20">
                <h4>4.3. Golden Rules of Invalidation</h4>
                <p>
                  Follow these best practices to maintain optimal cache hit rates and minimum server CPU usage:
                </p>

                <div className="space-y-4 not-prose my-4">
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Rule 1: Surgical Shell Revalidation</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Declare the tag <strong>only in <code>layout_functions.ts</code></strong> (e.g.{" "}
                      <code>[&quot;dashboard-shell&quot;]</code>). Rebuilding the layout shell regenerates only{" "}
                      <code>layout.rsc</code> and does not trigger expensive re-rendering of all child pages.
                    </p>

                    <Alert className="mt-3 border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <AlertTitle className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                        Critical Scale Alert: Hydration Mismatch vs. Server Crash (100k+ Pages)
                      </AlertTitle>
                      <AlertDescription className="text-xs text-muted-foreground mt-2 space-y-2 leading-relaxed">
                        <p>
                          <strong>The Hydration Mismatch Hazard:</strong> Because surgical layout revalidation updates only{" "}
                          <code>layout.rsc</code>, existing static <code>index.html</code> files remain unchanged. While SPA client navigation stays instant and perfectly synchronized, a hard browser reload (F5 or direct link) will receive the older static HTML with the prior layout markup, which can trigger a <strong>Hydration Mismatch</strong> when React 19 hydrates against the fresh <code>layout.rsc</code> stream.
                        </p>
                        <p>
                          <strong>Why NOT use <code>cascade: true</code> at scale?</strong> If your application features a large product catalog (e.g. 100,000+ pre-rendered pages), running <code>cascade: true</code> on a shared or root layout will attempt to regenerate 100,000 static HTML files simultaneously. This causes sudden CPU saturation, memory exhaustion, and catastrophic server crashes or gateway timeouts.
                        </p>
                        <p className="font-semibold text-foreground pt-1">
                          Scale-Safe Architectural Solutions (Without Cascading):
                        </p>
                        <ul className="list-disc pl-4 space-y-1.5">
                          <li>
                            <strong>Defer Volatile State to Client Components:</strong> Keep the server layout shell structurally invariant. Mutable or fast-changing UI elements (e.g. promo banners, flash deals, cart badges, user session data) should be Client Components (<code>&quot;use client&quot;</code>) that render an invariant placeholder or container in SSR and populate fresh data on the client. Because the static HTML never changes, there is zero risk of Hydration Mismatch on hard reloads (F5), and zero child pages need regeneration.
                          </li>
                          <li>
                            <strong>Leverage Partial Prerendering (PPR) with <code>&lt;Suspense&gt;</code>:</strong> Wrap dynamic layout sections in <code>&lt;Suspense fallback=&#123;&lt;Skeleton /&gt;&#125;&gt;</code>. Dinou serves the static shell instantly (0ms TTFB) and streams live, personalized server chunks down the open HTTP connection, avoiding stale baked HTML in <code>index.html</code> without re-rendering child pages.
                          </li>
                          <li>
                            <strong>Scope Cascading Tags to Bounded Sub-Layouts:</strong> Never attach layout revalidation tags to root or large-catalog wrappers. Keep root shells purely static, and reserve layout tagging with <code>cascade: true</code> strictly for bounded feature modules (such as <code>/dashboard</code> or <code>/account</code>) where child routes are limited to a small, predictable number of pages.
                          </li>
                          <li>
                            <strong>Rely on Lazy Time-Based ISR for Catalog Pages:</strong> When child pages define <code>revalidate = N</code>, they naturally re-render their full static HTML on demand upon the next user visit, absorbing layout updates gradually in the background without any upfront mass-regeneration spike.
                          </li>
                        </ul>

                        <p className="text-muted-foreground pt-1 italic text-[11px]">
                          <strong>Note on <code>&lt;DinouCacheSlot&gt;</code>:</strong> Micro-ISR slots optimize dynamic SSR routes (<code>revalidate: 0</code>) and SPA client refreshes (via <code>refreshSlot</code>) by avoiding redundant server work. However, in pure static SSG pages where <code>index.html</code> was baked at build time, slots alone cannot rewrite the physical HTML file on disk or CDN during hard reloads (F5).
                        </p>
                      </AlertDescription>
                    </Alert>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Rule 2: Surgical Page Revalidation</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Use <code>revalidatePage(&quot;/path&quot;)</code> or declare the tag <strong>only in{" "}
                      <code>page_functions.ts</code></strong> (e.g. <code>[&quot;post-view&quot;]</code>). Only that
                      concrete page and its HTML will recompile.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Rule 3: Full Module Invalidation (Layout + Children)</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Use <code>revalidatePath(&quot;/dashboard&quot;, {`{ cascade: true }`})</code>, call <code>revalidateTag(&quot;dashboard&quot;, {`{ cascade: true }`})</code>, or share the same tag
                      in both <code>layout_functions.ts</code> and child <code>page_functions.ts</code>. This guarantees
                      zero hydration mismatches when structural navigation changes.
                    </p>
                    <div className="mt-2.5 pt-2.5 border-t border-border/60">
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        <span>High-Scale Caution: Reserve strictly for bounded modules</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                        Never apply <code>cascade: true</code> or shared tags to root layouts or large catalogs wrapping thousands of pages (e.g. 100k+ products). Doing so triggers a simultaneous regeneration avalanche that will saturate server CPU and RAM, risking service degradation or fatal server crashes. At massive scale, use the architectural alternatives detailed in the Scale Alert above (Client Components, PPR, or lazy time-based ISR).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4.4 CacheSlot Invalidation */}
              <section id="cache-slot-revalidation" className="mt-8 scroll-mt-20">
                <h4>
                  4.4. Invalidating <code>&lt;DinouCacheSlot&gt;</code> Subtrees
                </h4>
                <p>
                  <code>revalidateTag</code> works seamlessly with micro-cached component subtrees created via{" "}
                  <code>&lt;DinouCacheSlot&gt;</code>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// Inside any page or layout Server Component:
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";
import { TrendingProducts, TrendingSkeleton } from "@/components/trending";

<Suspense fallback={<TrendingSkeleton />}>
  <DinouCacheSlot id="trending-grid" tag="trending" revalidate={600}>
    <TrendingProducts />
  </DinouCacheSlot>
</Suspense>

// In your Server Function:
"use server";

import { revalidateTag } from "dinou/server";

export async function refreshTrends() {
  await revalidateTag("trending");
  // Only the <TrendingProducts> slot payload is purged; the parent page stays cached!
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 5. Client-Side Revalidation */}
            <section
              id="client-side-refresh"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                5. Client-Side Surgical Revalidation &amp; Router Caching
              </h3>
              <p>
                Dinou provides a seamless SPA router experience with in-memory caching and granular refresh capabilities
                directly in the browser:
              </p>

              {/* 5.1 Router Caches */}
              <section id="router-caches" className="mt-6 scroll-mt-20">
                <h4>5.1. The Router Caches (<code>pageCache</code> &amp; <code>layoutCache</code>)</h4>
                <p>
                  The Dinou client router maintains two internal in-memory maps in the browser tab:
                </p>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                        <FileCode className="h-5 w-5" />
                        <span>pageCache (Page RSC Map)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        Stores RSC payloads for previously visited routes. Repeat navigations or back/forward clicks
                        resolve in <strong>0ms network time</strong> directly from memory.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                        <Layers className="h-5 w-5" />
                        <span>layoutCache (Layout Preservation)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <p>
                        When navigating between sibling pages sharing a layout (e.g. from <code>/dashboard/analytics</code>{" "}
                        to <code>/dashboard/settings</code>), the layout is <strong>neither re-fetched nor re-mounted</strong>.
                        Video players keep playing, inputs keep focus, and sidebar scroll positions persist unbroken.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 5.2 Link fresh */}
              <section id="link-fresh" className="mt-8 scroll-mt-20">
                <h4>5.2. Bypassing Client Cache with <code>&lt;Link fresh&gt;</code></h4>
                <p>
                  Add the <code>fresh</code> prop to any <code>&lt;Link&gt;</code> component to bypass the client-side
                  cache for that navigation:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`import { Link } from "dinou";

// Clicking this link deletes pageCache for /feed before navigating,
// guaranteeing a real HTTP request to fetch fresh data from the server.
<Link href="/feed" fresh>
  View Latest Feed
</Link>`}
                </CodeBlock>

                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> <code>&lt;Link fresh&gt;</code> deletes the client in-memory cache for that
                  destination; it does not clear static files on the server. If the server route is static, the server
                  will return the compiled static RSC payload.
                </p>
              </section>

              {/* 5.3 router.refresh */}
              <section id="router-refresh" className="mt-8 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <h4 className="m-0">
                    5.3. <code>router.refresh()</code> &amp; Layout Invalidation
                  </h4>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    layout: true
                  </span>
                </div>

                <p className="mt-4">
                  The <code>useRouter()</code> hook provides a powerful <code>refresh()</code> method that reconciles
                  React components without losing ephemeral client state (such as input focus, form draft text, or scroll position):
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`"use client";

import { useRouter } from "dinou";

export function RefreshControl() {
  const router = useRouter();

  // 1. Standard Soft Refresh (Default)
  // Clears only pageCache; leaves layoutCache intact (1 network request, 0 layout flicker)
  const handlePageRefresh = () => {
    router.refresh();
  };

  // 2. Full Refresh (Including Layout Shell)
  // Clears pageCache AND purges active layoutCache (fetches both fresh layout & page)
  const handleGlobalRefresh = () => {
    router.refresh({ layout: true });
  };

  return (
    <div className="flex gap-2">
      <button onClick={handlePageRefresh}>Refresh Page</button>
      <button onClick={handleGlobalRefresh}>Refresh All (Shell + Page)</button>
    </div>
  );
}`}
                </CodeBlock>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Method Call</TableHead>
                        <TableHead><code>pageCache</code></TableHead>
                        <TableHead><code>layoutCache</code></TableHead>
                        <TableHead>RSC Network Requests</TableHead>
                        <TableHead>Best For</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">router.refresh()</TableCell>
                        <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-medium">Deleted</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Preserved</TableCell>
                        <TableCell className="text-xs font-semibold">1 (page only)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Post-mutation updates, comment submissions, data table refreshes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">router.refresh({`{ layout: true }`})</TableCell>
                        <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-medium">Deleted</TableCell>
                        <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-medium">Deleted</TableCell>
                        <TableCell className="text-xs font-semibold">2 (layout + page)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Tenant switching, avatar changes, global theme or org updates in navbar</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* 5.4 refreshSlot */}
              <section id="refresh-slot" className="mt-8 scroll-mt-20">
                <h4>
                  5.4. <code>refreshSlot</code> &amp; <code>router.refreshSlot</code>
                </h4>
                <p>
                  To refresh an isolated component without re-rendering sibling components or parent pages, use{" "}
                  <code>refreshSlot</code>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`"use client";

import { refreshSlot, useRouter } from "dinou";

export function LiveAnalyticsButton() {
  const router = useRouter();

  const handleUpdate = () => {
    // 1. Direct standalone function:
    refreshSlot("analytics-summary", { fresh: true });

    // 2. Or via router instance (identical signature and options):
    // router.refreshSlot("analytics-summary", { fresh: true });
  };

  return <button onClick={handleUpdate}>Live Refresh Metrics</button>;
}`}
                </CodeBlock>

                <div className="grid gap-4 md:grid-cols-2 not-prose my-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <RefreshCw className="h-4 w-4 text-blue-500" />
                        <span>Default (Omitted or <code>fresh: false</code>)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                      <p>
                        Respects the server storage cache. If the slot has not exceeded its <code>revalidate</code> TTL, the server returns the cached JSX directly without re-executing the component.
                      </p>
                      <p>
                        <strong>Use Case:</strong> Bringing the client DOM in sync with existing server state (for instance, after a Server Function or background task has already executed <code>revalidateTag</code>).
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 font-semibold text-sm text-indigo-600 dark:text-indigo-400">
                        <Zap className="h-4 w-4" />
                        <span>With <code>fresh: true</code> (Forced Server Recomputation)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                      <p>
                        Bypasses and ignores any unexpired server cache. Forces Dinou to immediately re-evaluate the Server Component, generate new JSX, overwrite the storage cache with the fresh timestamp, and stream it to the client.
                      </p>
                      <p>
                        <strong>Use Case:</strong> Explicit user-initiated refresh triggers (such as clicking a &quot;Live Sync&quot; button) where the user explicitly demands live data regardless of remaining TTL.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* 6. Storage Adapters */}
            <section
              id="storage-adapters"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                6. Pluggable Storage Adapters
              </h3>

              {/* 6.1 Distributed Problem */}
              <section id="distributed-problem" className="mt-6 scroll-mt-20">
                <h4>6.1. Why Adapters Matter for Revalidation</h4>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Revalidation (<code className="text-foreground">revalidatePage</code>, <code className="text-foreground">revalidatePath</code>,{" "}
                  <code className="text-foreground">revalidateTag</code>) is fundamentally the process of{" "}
                  <strong>purging and rebuilding static cache artifacts</strong>. To understand why storage adapters exist,
                  it helps to see what Dinou actually stores and where those files live.
                </p>

                {/* What Dinou Stores Box */}
                <div className="not-prose my-6 rounded-xl border border-border/70 bg-gradient-to-br from-card/80 via-card to-muted/20 p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 font-semibold text-sm text-foreground mb-3">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      <Layers className="h-4 w-4" />
                    </div>
                    <span>What Dinou Persists in the Cache Layer</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3 text-xs">
                    <div className="rounded-lg border border-border/50 bg-background/60 p-3 space-y-1">
                      <div className="font-semibold font-mono text-primary text-[13px]">index.html</div>
                      <p className="text-muted-foreground leading-relaxed">
                        Pre-rendered static HTML delivered immediately to web crawlers and initial browser page loads.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-background/60 p-3 space-y-1">
                      <div className="font-semibold font-mono text-primary text-[13px]">page.rsc / layout.rsc</div>
                      <p className="text-muted-foreground leading-relaxed">
                        Serialized React Server Components streams consumed by Dinou&apos;s client router during SPA transitions.
                      </p>
                    </div>
                    <div className="rounded-lg border border-border/50 bg-background/60 p-3 space-y-1">
                      <div className="font-semibold font-mono text-primary text-[13px]">Tag Metadata</div>
                      <p className="text-muted-foreground leading-relaxed">
                        Expiration timestamps, ISR time-to-live (TTL), and assigned cache tags for surgical resolution.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Real-World Challenges Grid */}
                <div className="not-prose grid gap-4 sm:grid-cols-3 my-6">
                  {/* Challenge 1: Single Node vs Clusters */}
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.03] dark:bg-blue-500/[0.06] p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-sm text-blue-600 dark:text-blue-400 mb-2">
                        <Server className="h-4 w-4" />
                        <span>Clustered Deployments</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        By default, Dinou writes to local disk (<code className="text-foreground">FileSystemStorage</code>).
                        If you scale to 4 Kubernetes pods or Docker containers behind a load balancer, each pod has an isolated disk.
                        Without a shared adapter, a purge on Pod A leaves Pods B, C, and D serving stale cache.
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-500/15 text-[11px] font-medium text-blue-600 dark:text-blue-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Solved by RedisStorage (shared cluster state)</span>
                    </div>
                  </div>

                  {/* Challenge 2: Edge Serverless */}
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] dark:bg-amber-500/[0.06] p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-sm text-amber-600 dark:text-amber-400 mb-2">
                        <Globe className="h-4 w-4" />
                        <span>Edge &amp; Serverless (Zero-Config)</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        In serverless runtimes like Cloudflare Workers, there is no writable filesystem. Dinou auto-binds to your{" "}
                        <code className="text-foreground font-mono">DINOU_CACHE</code> KV namespace at runtime.
                        You <strong>never configure dinou.config.mjs</strong>—simply add the KV binding to{" "}
                        <code className="text-foreground font-mono">wrangler.toml</code>. Deno Deploy works identically with zero-config Deno KV.
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-amber-500/15 text-[11px] font-medium text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Zero-config auto-activation (Edge KV)</span>
                    </div>
                  </div>

                  {/* Challenge 3: CI / Testing */}
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.06] p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                        <Cpu className="h-4 w-4" />
                        <span>Fast Testing &amp; Mocking</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Unit tests, CI pipelines, and ephemeral mock runs require ultra-fast execution without disk clutter
                        or external database infrastructure dependencies.
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-emerald-500/15 text-[11px] font-medium text-emerald-600 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Solved by MemoryStorage (ephemeral RAM Map)</span>
                    </div>
                  </div>
                </div>

                {/* Zero Code Modifications Takeaway */}
                <div className="not-prose my-6 rounded-xl border border-border/80 bg-card p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground mb-1.5">
                    <Database className="h-4 w-4 text-primary" />
                    <span>Zero Code Modifications Across Infrastructures</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Because your application code only interacts with high-level revalidation functions like{" "}
                    <code className="text-foreground font-mono">revalidateTag(&quot;products&quot;)</code> or{" "}
                    <code className="text-foreground font-mono">revalidatePath(&quot;/catalog&quot;)</code>, your UI and
                    server components remain 100% identical whether you run on a single local Node.js VPS (<code className="text-foreground font-mono">FileSystemStorage</code>),
                    scale to a multi-pod Kubernetes cluster (<code className="text-foreground font-mono">RedisStorage</code> in <code className="text-foreground font-mono">dinou.config.mjs</code>),
                    or deploy to global Cloudflare Workers (automatic <code className="text-foreground font-mono">CloudflareKVStorage</code> via <code className="text-foreground font-mono">wrangler.toml</code>).
                  </p>
                </div>
              </section>

              {/* 6.2 Supported Adapters */}
              <section id="adapter-catalog" className="mt-8 scroll-mt-20">
                <h4>6.2. Supported Storage Adapters &amp; Configuration</h4>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Adapter Class</TableHead>
                        <TableHead>Target Environment</TableHead>
                        <TableHead>Characteristics</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">FileSystemStorage</TableCell>
                        <TableCell className="text-xs">Node.js / Bun / Docker</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Default. Zero config, atomic file writes on local disk.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">RedisStorage</TableCell>
                        <TableCell className="text-xs">Distributed Clusters</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Shared cluster cache across Kubernetes pods or multi-container VPS.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">CloudflareKVStorage</TableCell>
                        <TableCell className="text-xs">Cloudflare Workers</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Globally replicated edge key-value storage. Auto-bound via DINOU_CACHE in wrangler.toml (zero config).</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">DenoKVStorage</TableCell>
                        <TableCell className="text-xs">Deno Deploy / Deno KV</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Built-in distributed ACID key-value store. Auto-bound via Deno.openKv() (zero config).</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">MemoryStorage</TableCell>
                        <TableCell className="text-xs">Testing / CI / Mocks</TableCell>
                        <TableCell className="text-xs text-muted-foreground">In-memory ephemeral Map for unit tests and local mock runs.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  In Node.js / Bun environments, override the default local disk storage by declaring a distributed adapter
                  (such as <code className="text-foreground font-mono">RedisStorage</code>) in{" "}
                  <code className="text-foreground font-semibold">dinou.config.mjs</code>. Dinou binds it
                  automatically to the internal revalidation and ISR pipeline on startup (edge environments like Cloudflare Workers
                  and Deno Deploy activate automatically without editing this file):
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.mjs
import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

export default defineConfig({
  // Cluster-wide distributed cache storage for ISR and revalidation
  storage: new RedisStorage(redis, "dinou-cache:"),
});`}
                </CodeBlock>

                {/* MemoryStorage Deep Dive Box */}
                <div className="not-prose my-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                      <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <span>Why Use MemoryStorage? Key Benefits &amp; Use Cases</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold ring-1 ring-inset ring-emerald-500/20">
                      RAM Map • Zero Disk I/O
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Unlike <code className="text-foreground font-mono">FileSystemStorage</code> (which writes physical files to disk)
                    or <code className="text-foreground font-mono">RedisStorage</code> (which communicates over network TCP),{" "}
                    <code className="text-foreground font-mono">MemoryStorage</code> keeps all cached HTML, RSC streams, and tag
                    metadata exclusively inside a JavaScript <code className="text-foreground font-mono">Map</code> in process memory.
                    When the process exits, memory is instantly freed with zero disk traces.
                  </p>

                  {/* 4 Practical Advantages Grid */}
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-lg border border-border/60 bg-card/60 p-3 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground text-[12px]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>1. Instant, Pollution-Free Unit Tests</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[11px]">
                        Writing to disk in Vitest/Jest causes test cross-talk (Test 1 leaves cache files that break Test 2).
                        Calling <code className="text-foreground font-mono">setStorageAdapter(new MemoryStorage())</code> gives every
                        test a pristine, isolated store in 0 microseconds without cleaning temp folders.
                      </p>
                    </div>

                    <div className="rounded-lg border border-border/60 bg-card/60 p-3 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground text-[12px]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>2. Zero-Infra CI Pipelines (GitHub Actions)</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[11px]">
                        Validate full ISR and revalidation lifecycles (<code className="text-foreground font-mono">revalidateTag</code>,{" "}
                        <code className="text-foreground font-mono">revalidatePath</code>) in automated CI runners without provisioning
                        or maintaining external Redis service containers.
                      </p>
                    </div>

                    <div className="rounded-lg border border-border/60 bg-card/60 p-3 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground text-[12px]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>3. Hardened Read-Only Docker Containers</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[11px]">
                        In high-security enterprise environments running with <code className="text-foreground font-mono">docker --read-only</code>,
                        local filesystem writes fail with <code className="text-foreground font-mono">EROFS</code>. MemoryStorage
                        enables full caching and revalidation purely inside container RAM.
                      </p>
                    </div>

                    <div className="rounded-lg border border-border/60 bg-card/60 p-3 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground text-[12px]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>4. Resilient Edge Worker Fallback</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[11px]">
                        In Cloudflare Workers deployments where a <code className="text-foreground font-mono">DINOU_CACHE</code> KV
                        binding is omitted, Dinou automatically falls back to MemoryStorage inside the isolate RAM without crashing.
                      </p>
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-foreground">Implementation Examples:</span>
                    <CodeBlock
                      language="typescript"
                      containerClassName="w-full overflow-hidden rounded-lg text-xs"
                    >
{`// 1. In dinou.config.mjs (conditional for CI / test environment)
import { defineConfig } from "dinou";
import { MemoryStorage, RedisStorage } from "dinou/server";

export default defineConfig({
  // Use in-memory cache during tests to avoid external database dependencies
  storage: process.env.NODE_ENV === "test"
    ? new MemoryStorage()
    : new RedisStorage(redisClient, "dinou-cache:"),
});

// 2. Or directly in your test suite (Vitest / Jest) for total test isolation
import { setStorageAdapter, MemoryStorage, revalidateTag } from "dinou/server";
import { beforeEach, test, expect } from "vitest";

beforeEach(() => {
  // Reset cache state with a clean, isolated in-memory store before every test
  setStorageAdapter(new MemoryStorage());
});`}
                    </CodeBlock>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  <strong>Note for external worker scripts:</strong> If you run standalone background scripts or CLI tools outside
                  the Dinou web server that need to perform cache purges, you can imperatively bind the storage adapter using{" "}
                  <code className="text-foreground font-mono">setStorageAdapter(adapter)</code> from{" "}
                  <code className="text-foreground font-mono">"dinou/server"</code>.
                </p>
              </section>
            </section>

            {/* 7. Webhook Integrations */}
            <section
              id="security-and-webhooks"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                7. Webhook Integrations (Headless CMS)
              </h3>
              <p>
                External events, such as a Headless CMS (Sanity, Strapi, Contentful) publishing content or an e-commerce inventory sync, can trigger on-demand revalidation in Dinou. Webhook endpoints are created via{" "}
                <strong>Web Standards Plugins</strong> using the <code>onRequest</code> hook in <code className="text-foreground font-semibold">dinou.config.mjs</code>:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg my-4"
              >
{`// dinou.config.mjs
import { defineConfig } from "dinou";
import { revalidateTag, revalidatePage, revalidatePath } from "dinou/server";

export default defineConfig({
  plugins: [
    {
      name: "revalidation-webhook",
      async onRequest(request) {
        const url = new URL(request.url);

        // Intercept POST requests to /api/revalidate
        if (url.pathname === "/api/revalidate" && request.method === "POST") {
          try {
            const { tag, page, path, cascade } = await request.json();

            if (tag) {
              await revalidateTag(tag);
            }
            if (page) {
              // Surgical page-only revalidation
              await revalidatePage(page);
            }
            if (path) {
              // Route revalidation with optional layout cascade
              await revalidatePath(path, { cascade: Boolean(cascade) });
            }

            return Response.json({ revalidated: true, timestamp: Date.now() });
          } catch (err: any) {
            return Response.json({ error: err.message }, { status: 500 });
          }
        }
      },
    },
  ],
});`}
              </CodeBlock>

              <div className="border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 rounded-lg p-4 not-prose my-6">
                <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  <Info className="h-5 w-5" />
                  <span>Production Tip: Securing Public Webhook Endpoints</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In production, verify an authorization header (such as <code>request.headers.get(&quot;authorization&quot;) === `Bearer ...`</code>) or a cryptographic HMAC webhook signature from your CMS provider to ensure only authorized callers can trigger revalidation cycles.
                </p>
              </div>
            </section>

            {/* 8. Strategy Comparison Matrix */}
            <section
              id="strategy-matrix"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                8. Strategy Comparison Matrix
              </h3>
              <p>
                Comprehensive reference guide for choosing the optimal invalidation and refresh mechanism in Dinou:
              </p>

              {/* 8.1 Server Matrix */}
              <section id="server-matrix" className="mt-8 scroll-mt-20">
                <h4>8.1. Server-Side Invalidation Mechanisms</h4>
                <p className="text-sm text-muted-foreground">
                  Executed inside Server Functions, Webhook plugins, or route configurations to purge server-side HTML,
                  React Server Component payloads, and storage caches:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[230px]">Mechanism</TableHead>
                        <TableHead>Invocation Context</TableHead>
                        <TableHead>Invalidation Scope (Server)</TableHead>
                        <TableHead>Primary Use Case</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidate = N</TableCell>
                        <TableCell className="text-xs text-muted-foreground"><code>page / layout_functions.ts</code></TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Time-based SWR cache TTL</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Automatic background freshness for low-to-medium dynamic content.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidatePage(path)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Server Function / Webhook Plugin</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Target page only (HTML + RSC)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Surgical route mutation; guarantees zero impact on parent layout shells.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidatePath(path)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Server Function / Webhook Plugin</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Target page + layout segment</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Standard route mutation when both page content and layout segment update.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidatePath(path, {`{ cascade: true }`})</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Server Function / Webhook Plugin</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Layout shell + all descendant child pages</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Deep structural invalidation; recursively purges and rebuilds all children.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidateTag(tag)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Server Function / Webhook Plugin</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Matching layout, page, or &lt;DinouCacheSlot&gt;</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Surgical multi-route purge without touching parent layout shells.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidateTag(tag, {`{ cascade: true }`})</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Server Function / Webhook Plugin</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Tagged layout shell + all child pages</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Full module invalidation when layout structural dependencies affect all children.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* 8.2 Client Matrix */}
              <section id="client-matrix" className="mt-10 scroll-mt-20">
                <h4>8.2. Client-Side Router Refresh Mechanisms</h4>
                <p className="text-sm text-muted-foreground">
                  Executed inside Client Components and user interactions to invalidate browser router caches
                  without triggering a full browser window reload (F5):
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[230px]">Mechanism</TableHead>
                        <TableHead>Invocation Context</TableHead>
                        <TableHead>Client Cache Impact</TableHead>
                        <TableHead>Preserves UI State?</TableHead>
                        <TableHead>Bypasses Server Storage?</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">&lt;Link fresh&gt;</TableCell>
                        <TableCell className="text-xs text-muted-foreground"><code>&lt;Link&gt;</code> navigation</TableCell>
                        <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Bypasses &amp; evicts <code>pageCache</code></TableCell>
                        <TableCell className="text-xs text-muted-foreground">No (navigates to route)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">No (serves server storage cache)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">router.refresh()</TableCell>
                        <TableCell className="text-xs text-muted-foreground"><code>useRouter()</code> hook</TableCell>
                        <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Evicts <code>pageCache</code> for current URL</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (inputs, scroll, layout preserved)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">No (serves server storage cache)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">router.refresh({`{ layout: true }`})</TableCell>
                        <TableCell className="text-xs text-muted-foreground"><code>useRouter()</code> hook</TableCell>
                        <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Evicts both <code>pageCache</code> &amp; <code>layoutCache</code></TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (inputs &amp; scroll preserved; layout re-renders)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">No (serves server storage cache)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">refreshSlot(id, [options])</TableCell>
                        <TableCell className="text-xs text-muted-foreground"><code>refreshSlot</code> / <code>useRouter()</code></TableCell>
                        <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Re-fetches and replaces slot DOM only</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (entire page, layout &amp; scroll preserved)</TableCell>
                        <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Only with <code>{`{ fresh: true }`}</code></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
