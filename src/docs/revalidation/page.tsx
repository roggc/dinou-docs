"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
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
    title: "1.1. Usage in Server Actions",
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
    title: "6. Pluggable Storage Adapters & Multi-Runtime Parity",
    level: 2,
  },
  {
    id: "distributed-problem",
    title: "6.1. Why Adapters Matter for Revalidation",
    level: 3,
  },
  {
    id: "runtime-parity",
    title: "6.2. Node/Bun Filesystem vs Edge KV Parity",
    level: 3,
  },
  {
    id: "adapter-catalog",
    title: "6.3. Supported Storage Adapters",
    level: 3,
  },
  {
    id: "security-and-webhooks",
    title: "7. Security & Webhook Integrations",
    level: 2,
  },
  {
    id: "strict-rules",
    title: "7.1. Strict Execution Rules",
    level: 3,
  },
  {
    id: "secure-webhooks",
    title: "7.2. Securing Webhook Endpoints",
    level: 3,
  },
  {
    id: "standalone-scripts",
    title: "7.3. Running in Standalone Scripts",
    level: 3,
  },
  {
    id: "strategy-matrix",
    title: "8. Strategy Comparison Matrix",
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

              {/* 1.1 Usage in Server Actions */}
              <section id="revalidate-page-usage" className="mt-6 scroll-mt-20">
                <h4>1.1. Usage in Server Actions</h4>
                <p>
                  Call <code>revalidatePage</code> directly inside your Server Actions or route handlers:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/actions.ts
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
{`// src/dashboard/actions.ts
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
{`// src/dashboard/actions.ts
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
{`// src/products/actions.ts
"use server";

import { revalidatePath, revalidatePage } from "dinou/server";
import db from "@/lib/db";

export async function updateCategory(categoryId: string, data: any) {
  await db.categories.update({ where: { id: categoryId }, data });

  // 1. Absolute path: Revalidates /catalog (page.rsc, index.html, layout.rsc)
  await revalidatePath("/catalog");

  // 2. Relative paths inside Server Actions (resolved via HTTP referer):
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
{`// src/products/actions.ts
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
                  <code>page_functions.ts</code> or <code>layout_functions.ts</code>:
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
                      <CodeBlock language="typescript" hideHeader>
{`// src/blog/page_functions.ts
export const getCacheTags = ["blog", "marketing"];`}
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
                      <CodeBlock language="typescript" hideHeader>
{`// src/products/[id]/page_functions.ts
export function getCacheTags({ id }: { id: string }) {
  return ["products", \`product-\${id}\`];
}`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
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
                  In Dinou v7, <code>revalidateTag(tag)</code> inspects where the tag was defined and executes
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
                      <p>Defined in <code>layout_functions.ts</code> (stored in <code>layout.metadata.json</code>).</p>
                      <p>
                        Dinou runs internal <code>revalidateLayout(path)</code>, regenerating{" "}
                        <strong>exclusively <code>layout.rsc</code></strong>. Child pages and HTML remain untouched!
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
                      <p>Defined in <code>page_functions.ts</code> (stored in <code>metadata.json</code>).</p>
                      <p>
                        Dinou runs internal <code>revalidatePath(path)</code>, regenerating{" "}
                        <strong><code>page.rsc</code> and <code>index.html</code></strong>. Parent layouts remain untouched.
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
                      <p>Defined in <code>&lt;DinouCacheSlot&gt;</code> (stored in <code>slot.metadata.json</code>).</p>
                      <p>
                        Dinou purges <strong>only the slot directory or KV key</strong> without touching the host page.
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
                      <code>[&quot;dashboard-shell&quot;]</code>). Rebuilding the layout shell will not trigger
                      expensive re-rendering of all child pages.
                    </p>
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
                      Use <code>revalidatePath(&quot;/dashboard&quot;, {`{ cascade: true }`})</code> or share the same tag
                      in both <code>layout_functions.ts</code> and child <code>page_functions.ts</code>. This guarantees
                      zero hydration mismatches when structural navigation changes.
                    </p>
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
{`// Inside any page or layout component:
import { DinouCacheSlot } from "dinou";

<DinouCacheSlot id="trending-grid" tag="trending" revalidate={600}>
  <TrendingProducts />
</DinouCacheSlot>

// In your Server Action:
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

    // 2. Or via router instance:
    // router.refreshSlot("analytics-summary");
  };

  return <button onClick={handleUpdate}>Live Refresh Metrics</button>;
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 6. Storage Adapters */}
            <section
              id="storage-adapters"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                6. Pluggable Storage Adapters &amp; Multi-Runtime Parity
              </h3>

              {/* 6.1 Distributed Problem */}
              <section id="distributed-problem" className="mt-6 scroll-mt-20">
                <h4>6.1. Why Adapters Matter for Revalidation</h4>

                <div className="border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 rounded-lg p-4 not-prose my-4">
                  <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    <Database className="h-5 w-5" />
                    <span>The Distributed Multi-Instance Challenge</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      Revalidation (<code>revalidatePage</code>, <code>revalidatePath</code>, <code>revalidateTag</code>)
                      is fundamentally the act of <strong>invalidating, purging, and updating static HTML and RSC payloads</strong>.
                    </p>
                    <p>
                      By default, Dinou stores cached pages on the local filesystem (<code>FileSystemStorage</code>).
                      If you deploy multiple Docker containers, Kubernetes pods, or serverless workers, each replica has its
                      own isolated storage. Without a shared storage adapter, a revalidation request reaching Replica A would
                      leave Replicas B and C serving stale cache.
                    </p>
                    <p>
                      By plugging in a distributed adapter like <strong>RedisStorage</strong> or{" "}
                      <strong>CloudflareKVStorage</strong>, any cache purge or revalidation call is instantly and
                      atomically synchronized across all instances worldwide.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6.2 Runtime Parity */}
              <section id="runtime-parity" className="mt-8 scroll-mt-20">
                <div className="flex items-center gap-3">
                  <h4 className="m-0">
                    6.2. Node/Bun Filesystem vs Edge KV Parity
                  </h4>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    100% Isomorphic
                  </span>
                </div>

                <p className="mt-4">
                  Dinou guarantees 100% feature and behavioral parity between filesystem environments (Node.js, Bun)
                  and Edge key-value environments (Cloudflare Workers KV, Deno KV):
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Operation</TableHead>
                        <TableHead>Node.js / Bun (Filesystem)</TableHead>
                        <TableHead>Cloudflare Workers / Deno (Edge KV)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidatePage(path)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Re-evaluates page and safely renames <code>page.rsc</code> and <code>index.html</code>.
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Updates KV entries for <code>page.rsc</code> and <code>index.html</code> with new timestamp.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidatePath(path)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Regenerates page, HTML, and checks for <code>layout.rsc</code> to recompile.
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Updates page, HTML, and coordinates <code>revalidateLayout</code> if layout key exists.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidatePath(..., {`{ cascade: true }`})</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Discovers child folders via filesystem walk and cascades <code>revalidatePage</code>.
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Scans child KV prefixes and cascades <code>revalidatePage</code> to all matching routes.
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">revalidateTag(tag)</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Inspects <code>metadata.json</code>, <code>layout.metadata.json</code>, and <code>slot.metadata.json</code>.
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          Inspects KV metadata tags to selectively trigger layout, page, or slot purges.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* 6.3 Supported Adapters */}
              <section id="adapter-catalog" className="mt-8 scroll-mt-20">
                <h4>6.3. Supported Storage Adapters</h4>

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
                        <TableCell className="text-xs text-muted-foreground">Globally replicated edge key-value storage with zero cold starts.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">DenoKVStorage</TableCell>
                        <TableCell className="text-xs">Deno Deploy / Deno KV</TableCell>
                        <TableCell className="text-xs text-muted-foreground">Built-in distributed ACID key-value store for Deno runtimes.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs font-semibold">MemoryStorage</TableCell>
                        <TableCell className="text-xs">Testing / CI / Mocks</TableCell>
                        <TableCell className="text-xs text-muted-foreground">In-memory ephemeral Map for unit tests and local mock runs.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// server.mjs or dinou.config.mjs
import { setStorageAdapter, RedisStorage } from "dinou/server";
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// Configure Redis as the cluster-wide cache storage for Dinou
setStorageAdapter(new RedisStorage(redis, "dinou-cache:"));`}
                </CodeBlock>
              </section>
            </section>

            {/* 7. Security & Webhooks */}
            <section
              id="security-and-webhooks"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                7. Security &amp; Webhook Integrations
              </h3>

              {/* 7.1 Strict Rules */}
              <section id="strict-rules" className="mt-6 scroll-mt-20">
                <h4>7.1. Strict Execution Rules</h4>

                <Alert className="not-prose border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10 my-4">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertTitle>Strict Execution Rules</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2 text-sm leading-relaxed">
                      <p>
                        <strong>Only Call in Mutative Event Contexts:</strong> Revalidation APIs are mutative
                        side-effects. They must only be called inside <strong>Server Actions</strong>, HTTP webhook
                        endpoints, or standalone synchronization scripts.
                      </p>
                      <p>
                        <strong>Never Call Inside Components or getProps:</strong> Invoking <code>revalidatePage</code>,{" "}
                        <code>revalidatePath</code>, or <code>revalidateTag</code> during the render phase or inside{" "}
                        <code>getProps</code> creates an <strong>infinite regeneration loop</strong> that will exhaust
                        server CPU and disk I/O.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              </section>

              {/* 7.2 Secure Webhooks */}
              <section id="secure-webhooks" className="mt-8 scroll-mt-20">
                <h4>7.2. Securing Webhook Endpoints</h4>
                <p>
                  Over 90% of on-demand revalidations in production are triggered by external events, such as a Headless
                  CMS (Sanity, Strapi, Contentful) publishing content. Always protect your webhook endpoints with a secret token:
                </p>

                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// server.js (Express / Node.js)
const { revalidateTag, revalidatePage, revalidatePath } = require("dinou/server");

app.post("/api/revalidate", express.json(), async (req, res) => {
  // 1. Verify Authorization Secret Token (prevents DoS attacks)
  const authHeader = req.headers.authorization;
  if (authHeader !== \`Bearer \${process.env.REVALIDATION_SECRET}\`) {
    return res.status(401).json({ error: "Unauthorized revalidation request" });
  }

  const { tag, page, path, cascade } = req.body;

  try {
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
    return res.status(200).json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});`}
                </CodeBlock>
              </section>

              {/* 7.3 Standalone Scripts */}
              <section id="standalone-scripts" className="mt-8 scroll-mt-20">
                <h4>7.3. Running in Standalone Scripts</h4>
                <p>
                  To run a background data sync or inventory update script that purges the Dinou cache outside
                  the HTTP server lifecycle:
                </p>

                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// scripts/sync-catalog.js
const { revalidateTag, revalidatePage } = require("dinou/server");

async function run() {
  console.log("Synchronizing product catalog with warehouse ERP...");
  await syncProductsFromWarehouse();

  console.log("Invalidating catalog cache tags...");
  await revalidateTag("catalog");

  // Revalidate spotlight promo page surgically
  await revalidatePage("/promotions/deal-of-the-day");

  console.log("Revalidation completed successfully.");
}

run().catch(console.error);`}
                </CodeBlock>
              </section>
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
                Reference guide for choosing the optimal invalidation and refresh mechanism in Dinou v7:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mechanism</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Invocation</TableHead>
                      <TableHead>Invalidates Server?</TableHead>
                      <TableHead>Invalidates Client?</TableHead>
                      <TableHead>Preserves Client State?</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">revalidate = N</TableCell>
                      <TableCell className="text-xs">Server</TableCell>
                      <TableCell className="text-xs text-muted-foreground"><code>page_functions.ts</code></TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Time-based SWR)</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-muted-foreground">N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">revalidatePage(path)</TableCell>
                      <TableCell className="text-xs">Server</TableCell>
                      <TableCell className="text-xs text-muted-foreground">Server Action / Webhook</TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (page.rsc + HTML)</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-muted-foreground">N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">revalidatePath(path)</TableCell>
                      <TableCell className="text-xs">Server</TableCell>
                      <TableCell className="text-xs text-muted-foreground">Server Action / Webhook</TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (page + layout segment)</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-muted-foreground">N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">revalidatePath(..., {`{ cascade: true }`})</TableCell>
                      <TableCell className="text-xs">Server</TableCell>
                      <TableCell className="text-xs text-muted-foreground">Server Action / Webhook</TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (layout + child pages)</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-muted-foreground">N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">revalidateTag(tag)</TableCell>
                      <TableCell className="text-xs">Server</TableCell>
                      <TableCell className="text-xs text-muted-foreground">Server Action / Webhook</TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (layout, page, or slot)</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-muted-foreground">N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">&lt;Link fresh&gt;</TableCell>
                      <TableCell className="text-xs">Client</TableCell>
                      <TableCell className="text-xs text-muted-foreground">JSX Link</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Yes (pageCache.delete)</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No (navigates)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">router.refresh()</TableCell>
                      <TableCell className="text-xs">Client</TableCell>
                      <TableCell className="text-xs text-muted-foreground">useRouter() hook</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Yes (pageCache only)</TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (inputs, scroll, layout)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">router.refresh({`{ layout: true }`})</TableCell>
                      <TableCell className="text-xs">Client</TableCell>
                      <TableCell className="text-xs text-muted-foreground">useRouter() hook</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Yes (pageCache + layoutCache)</TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (inputs, scroll)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-xs font-semibold">refreshSlot(slotId)</TableCell>
                      <TableCell className="text-xs">Client</TableCell>
                      <TableCell className="text-xs text-muted-foreground">useRouter() / function</TableCell>
                      <TableCell className="text-xs text-muted-foreground">No</TableCell>
                      <TableCell className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Yes (slot DOM only)</TableCell>
                      <TableCell className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Yes (entire page preserved)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
