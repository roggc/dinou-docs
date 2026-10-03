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
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview & Multi-Tier Invalidation",
    level: 2,
  },
  {
    id: "revalidate-path",
    title: "1. revalidatePath (Route-Level Purge)",
    level: 2,
  },
  {
    id: "absolute-paths",
    title: "1.1. Absolute Route Paths",
    level: 3,
  },
  {
    id: "relative-paths",
    title: "1.2. Relative Paths in Server Actions",
    level: 3,
  },
  {
    id: "revalidate-tag",
    title: "2. revalidateTag (Tag-Based Invalidation)",
    level: 2,
  },
  {
    id: "tag-indexing",
    title: "2.1. Tag Indexing & Atomic Renames",
    level: 3,
  },
  {
    id: "cache-slot-revalidation",
    title: "2.2. Invalidating <DinouCacheSlot> Subtrees",
    level: 3,
  },
  {
    id: "get-cache-tags",
    title: "3. Tag Assignment (getCacheTags)",
    level: 2,
  },
  {
    id: "constant-vs-function-tags",
    title: "3.1. Constant Array vs Function Export",
    level: 3,
  },
  {
    id: "client-side-refresh",
    title: "4. Client-Side Surgical Revalidation",
    level: 2,
  },
  {
    id: "refresh-slot",
    title: "4.1. refreshSlot (Targeted Slot Refresh)",
    level: 3,
  },
  {
    id: "router-refresh",
    title: "4.2. router.refresh() (Soft Page Reload)",
    level: 3,
  },
  {
    id: "storage-adapters",
    title: "5. Pluggable Storage Adapters (Redis, Cloudflare KV)",
    level: 2,
  },
  {
    id: "safety-and-webhooks",
    title: "6. Security & Webhook Integrations",
    level: 2,
  },
  {
    id: "secure-webhooks",
    title: "6.1. Securing Webhook Endpoints",
    level: 3,
  },
  {
    id: "standalone-scripts",
    title: "6.2. Running in Standalone Scripts",
    level: 3,
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
              Purge, regenerate, and promote static page caches and component
              subtrees on-demand in production when mutative events occur,
              without rebuilding or redeploying your site.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview &amp; Multi-Tier Invalidation</h2>
              <p>
                Dinou offers <strong>stale-while-revalidate</strong> background
                regeneration with <code>revalidate</code>. However, when database
                records change or CMS content is published, you need cache purges
                to take effect instantly. Dinou v7 provides a multi-tier
                invalidation system:
              </p>

              <div className="grid gap-6 md:grid-cols-3 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <FolderOpen className="h-5 w-5" />
                      <span>Path-Based</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <code>revalidatePath(path)</code> purges the exact static
                    HTML and RSC payload for a specific URL pathname.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <Tag className="h-5 w-5" />
                      <span>Tag-Based</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <code>revalidateTag(tag)</code> invalidates all routes and
                    all <code>&lt;DinouCacheSlot&gt;</code> subtrees carrying that tag.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Sliders className="h-5 w-5" />
                      <span>Client Slot Refresh</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <code>refreshSlot(slotId)</code> surgically re-renders an
                    isolated component in the browser without reloading the page.
                  </CardContent>
                </Card>
              </div>

              <p>
                Server revalidation APIs are exported from the server-only
                endpoint <code>&quot;dinou/server&quot;</code>, keeping browser
                client bundles clean and secure.
              </p>
            </section>

            {/* 1. revalidatePath */}
            <section
              id="revalidate-path"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                1. <code>revalidatePath</code> (Route-Level Purge)
              </h3>
              <p>
                Purges the cached static files for a given route and immediately
                triggers recompilation to promote the new static output for the
                next incoming visitor:
              </p>

              {/* 1.1 Absolute Paths */}
              <section id="absolute-paths" className="mt-6 scroll-mt-20">
                <h4>1.1. Absolute Route Paths</h4>
                <p>
                  Pass an absolute pathname to invalidate a specific route
                  directly from inside a Server Action:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/products/actions.ts
"use server";

import { revalidatePath } from "dinou/server";
import db from "@/lib/db";

export async function updateProduct(id: string, data: any) {
  await db.products.update({ where: { id }, data });

  // Revalidate the specific product page and the catalog index
  await revalidatePath(\`/products/\${id}\`);
  await revalidatePath("/products");
}`}
                </CodeBlock>
              </section>

              {/* 1.2 Relative Paths */}
              <section id="relative-paths" className="mt-8 scroll-mt-20">
                <h4>1.2. Relative Paths in Server Actions</h4>
                <p>
                  When invoked inside a <strong>Server Action</strong>,{" "}
                  <code>revalidatePath</code> can resolve relative pathnames
                  derived from the calling browser URL (extracted from the HTTP{" "}
                  <code>referer</code> header):
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/demo/isr/actions.ts
"use server";

import { revalidatePath } from "dinou/server";

export async function triggerRevalidate() {
  // Revalidate the page that initiated this action call (e.g. /demo/isr)
  await revalidatePath("./");

  // Revalidate an adjacent route (e.g. /demo/dashboard)
  await revalidatePath("../dashboard");
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 2. revalidateTag */}
            <section
              id="revalidate-tag"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                2. <code>revalidateTag</code> (Tag-Based Invalidation)
              </h3>
              <p>
                Purges all static pages and component subtrees tagged with a
                specific key string. This enables updating hundreds of pages
                simultaneously with a single atomic call:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/products/actions.ts
"use server";

import { revalidateTag } from "dinou/server";
import db from "@/lib/db";

export async function createNewProduct(data: any) {
  await db.products.create({ data });

  // Revalidates all pages and slots carrying the "products" tag
  await revalidateTag("products");
}`}
              </CodeBlock>

              {/* 2.1 Tag Indexing */}
              <section id="tag-indexing" className="mt-6 scroll-mt-20">
                <h4>2.1. Tag Indexing &amp; Atomic Renames</h4>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Tag className="h-5 w-5 text-blue-500" />
                        <span>Tag Indexing</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Cache tags assigned in <code>getCacheTags</code> are
                      indexed during compilation into route metadata and stored in
                      the active cache adapter.
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        <span>Concurrency Safe</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Dinou writes new cache files to unique temporary files and
                      promotes them using atomic filesystem renames or atomic KV
                      transactions.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 2.2 CacheSlot Invalidation */}
              <section id="cache-slot-revalidation" className="mt-8 scroll-mt-20">
                <h4>
                  2.2. Invalidating <code>&lt;DinouCacheSlot&gt;</code> Subtrees
                </h4>
                <p>
                  <code>revalidateTag</code> is not limited to entire pages. In
                  Dinou v7, it also purges isolated component subtrees cached via{" "}
                  <code>&lt;DinouCacheSlot&gt;</code>:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// Component rendered inside any page:
<DinouCacheSlot id="trending-grid" tag="trending" revalidate={600}>
  <TrendingProducts />
</DinouCacheSlot>

// In your Server Action:
await revalidateTag("trending");
// Only the <TrendingProducts> cache is purged; the rest of the page remains intact!`}
                </CodeBlock>
              </section>
            </section>

            {/* 3. getCacheTags */}
            <section
              id="get-cache-tags"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                3. Tag Assignment (<code>getCacheTags</code>)
              </h3>
              <p>
                To attach cache tags to a route segment, export{" "}
                <code>getCacheTags</code> from your <code>page_functions.ts</code>{" "}
                or <code>layout_functions.ts</code> file.
              </p>

              {/* 3.1 Constant vs Function */}
              <section id="constant-vs-function-tags" className="mt-6 scroll-mt-20">
                <h4>3.1. Constant Array vs Function Export</h4>
                <p>
                  Dinou v7 supports declaring tags as a static constant array or
                  as a dynamic function:
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
                        Ideal for fixed tags without dynamic parameters:
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
                        Ideal for parameter-driven tags:
                      </p>
                      <CodeBlock language="typescript" hideHeader>
{`// src/products/[id]/page_functions.ts
export function getCacheTags(params: { id: string }) {
  return ["products", \`product-\${params.id}\`];
}`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* 4. Client-Side Revalidation */}
            <section
              id="client-side-refresh"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                4. Client-Side Surgical Revalidation
              </h3>
              <p>
                In addition to server-side purges, Dinou enables client-side
                revalidation without full-page reloads using specialized hooks
                and functions:
              </p>

              {/* 4.1 refreshSlot */}
              <section id="refresh-slot" className="mt-6 scroll-mt-20">
                <h4>
                  4.1. <code>refreshSlot</code> (Targeted Slot Refresh)
                </h4>
                <p>
                  Refreshes a specific <code>&lt;DinouCacheSlot&gt;</code> without
                  re-evaluating sibling components or parent layouts:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/analytics-refresh.tsx
"use client";

import { refreshSlot, useRouter } from "dinou";

export function RefreshAnalyticsButton() {
  const router = useRouter();

  const handleRefresh = () => {
    // 1. Direct function call
    refreshSlot("analytics-widget", { fresh: true });

    // 2. Or via router instance:
    // router.refreshSlot("analytics-widget");
  };

  return <button onClick={handleRefresh}>Update Widget</button>;
}`}
                </CodeBlock>
              </section>

              {/* 4.2 router.refresh */}
              <section id="router-refresh" className="mt-8 scroll-mt-20">
                <h4>
                  4.2. <code>router.refresh()</code> (Soft Page Reload)
                </h4>
                <p>
                  Performs a &quot;Soft Reload&quot; of the current route. It
                  clears the client cache, fetches a fresh RSC payload from the
                  server, and re-renders the page components while preserving
                  browser scroll position and ephemeral client state:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/comment-box.tsx
"use client";

import { useRouter } from "dinou";
import { addCommentAction } from "@/actions/comments";

export function CommentBox({ postId }: { postId: string }) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addCommentAction(postId, "Great article!");

    // Triggers a soft refresh to display the newly submitted comment
    router.refresh();
  };

  return <form onSubmit={handleSubmit}>...</form>;
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 5. Storage Adapters */}
            <section
              id="storage-adapters"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div className="flex items-center gap-3">
                <h3 className="m-0">
                  5. Pluggable Storage Adapters (Redis, Cloudflare KV)
                </h3>
              </div>

              {/* Rationale Callout */}
              <div className="border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 rounded-lg p-4 not-prose my-6">
                <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  <Database className="h-5 w-5" />
                  <span>Why Storage Adapters are Critical for Revalidation</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Revalidation (<code>revalidatePath</code> and <code>revalidateTag</code>) is
                  fundamentally the operation of <strong>invalidating, purging, and updating
                  the cached HTML and RSC payload</strong>.
                </p>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p>
                    • <strong>The Multi-Instance Problem:</strong> By default, Dinou stores
                    cached pages on the local disk (<code>FileSystemStorage</code>). If you run
                    multiple Docker containers, Kubernetes pods, or serverless instances, each
                    replica has its own isolated filesystem.
                  </p>
                  <p>
                    • <strong>The Stale Cache Bug:</strong> If a revalidation request hits Container A,
                    only Container A&apos;s local disk would be cleared. Containers B and C would
                    continue serving stale cached pages to users.
                  </p>
                  <p>
                    • <strong>The Distributed Solution:</strong> By plugging in a shared storage
                    adapter like <strong>Redis</strong> or <strong>Cloudflare KV</strong>, any
                    call to <code>revalidateTag</code> or <code>revalidatePath</code> is instantly
                    and atomically broadcast across all instances in your cluster.
                  </p>
                </div>
              </div>

              <p>
                Dinou v7 decouples cache storage from the filesystem using an
                abstract <code>StorageAdapter</code> layer. In serverless,
                containerized, or multi-region environments, configure pluggable
                storage adapters:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border my-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Adapter Class</th>
                      <th className="p-4">Environment</th>
                      <th className="p-4">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-mono text-xs font-semibold">FileSystemStorage</td>
                      <td className="p-4 text-xs">Node.js / VPS / Docker</td>
                      <td className="p-4 text-xs text-muted-foreground">Default. Zero config, atomic file writes on local disk.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs font-semibold">RedisStorage</td>
                      <td className="p-4 text-xs">Distributed Clusters</td>
                      <td className="p-4 text-xs text-muted-foreground">Shared cache across multiple Docker containers or Kubernetes pods.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs font-semibold">CloudflareKVStorage</td>
                      <td className="p-4 text-xs">Cloudflare Workers</td>
                      <td className="p-4 text-xs text-muted-foreground">Globally replicated edge storage with ultra-low latency.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs font-semibold">MemoryStorage</td>
                      <td className="p-4 text-xs">Testing / CI</td>
                      <td className="p-4 text-xs text-muted-foreground">Ephemeral in-memory cache for unit tests and local mock runs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// server.js or dinou.config.mjs
import { setStorageAdapter, RedisStorage } from "dinou/server";
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// Configure Redis as the cluster-wide cache storage for Dinou
setStorageAdapter(new RedisStorage(redis, "dinou-cache:"));`}
              </CodeBlock>
            </section>

            {/* 6. Security & Webhook Integrations */}
            <section
              id="safety-and-webhooks"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                6. Security &amp; Webhook Integrations
              </h3>

              {/* Rationale Callout */}
              <div className="border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 rounded-lg p-4 not-prose my-6">
                <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Why Webhooks &amp; Security Belong in Revalidation</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    In production, over 90% of on-demand revalidations are <strong>not triggered
                    by users clicking buttons in the frontend</strong>, but by external events:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>
                      <strong>Headless CMS Publishing (Sanity, Strapi, Contentful, Ghost):</strong>{" "}
                      When content editors publish or update an article in the CMS, the CMS sends an
                      automated HTTP Webhook POST to your Dinou server to purge the stale pages.
                    </li>
                    <li>
                      <strong>DoS &amp; Resource Protection:</strong> Because <code>revalidatePath</code>{" "}
                      re-executes server rendering and writes to cache storage, an unprotected endpoint
                      invites Denial of Service (DoS) attacks. Verifying a shared secret bearer token
                      ensures only authenticated external systems can initiate rebuilds.
                    </li>
                    <li>
                      <strong>Automated ERP &amp; Cron Syncs:</strong> Nightly batch scripts or inventory
                      workers running outside the web server need to programmatically trigger Dinou&apos;s
                      cache purges after updating database stock.
                    </li>
                  </ul>
                </div>
              </div>

              <Alert className="not-prose border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10 my-4">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle>Strict Execution Rules</AlertTitle>
                <AlertDescription>
                  <div className="space-y-2 text-sm leading-relaxed">
                    <p>
                      <strong>Only Call in Mutative Event Contexts:</strong>{" "}
                      Revalidation APIs are mutative side-effects. They must only
                      be called inside <strong>Server Actions</strong>, HTTP webhook
                      endpoints, or standalone sync scripts.
                    </p>
                    <p>
                      <strong>Never Call Inside Components or getProps:</strong>{" "}
                      Invoking <code>revalidatePath</code> or{" "}
                      <code>revalidateTag</code> during the render phase or inside{" "}
                      <code>getProps</code> creates an <strong>infinite regeneration loop</strong>{" "}
                      that will degrade server resources.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              {/* 6.1 Secure Webhooks */}
              <section id="secure-webhooks" className="mt-8 scroll-mt-20">
                <h4>6.1. Securing Webhook Endpoints</h4>
                <p>
                  When triggering revalidation from a headless CMS or external service,
                  always verify a shared secret bearer token:
                </p>

                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// server.js (Express server)
const { revalidateTag, revalidatePath } = require("dinou/server");

app.post("/api/revalidate", express.json(), async (req, res) => {
  // 1. Verify Authorization Secret Token (prevents DoS attacks)
  const authHeader = req.headers.authorization;
  if (authHeader !== \`Bearer \${process.env.REVALIDATION_SECRET}\`) {
    return res.status(401).json({ error: "Unauthorized revalidation request" });
  }

  const { tag, path } = req.body;

  try {
    if (tag) {
      await revalidateTag(tag);
    }
    if (path) {
      await revalidatePath(path);
    }
    return res.status(200).json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});`}
                </CodeBlock>
              </section>

              {/* 6.2 Standalone Scripts */}
              <section id="standalone-scripts" className="mt-8 scroll-mt-20">
                <h4>6.2. Running in Standalone Scripts</h4>
                <p>
                  To run a local sync or migration script that purges the Dinou
                  cache outside the main HTTP server process:
                </p>

                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// scripts/sync-catalog.js
const { revalidateTag } = require("dinou/server");

async function run() {
  console.log("Synchronizing product catalog with ERP...");
  await syncProductsWithERP();

  console.log("Invalidating Dinou catalog cache...");
  await revalidateTag("products");

  console.log("Revalidation completed successfully.");
}

run().catch(console.error);`}
                </CodeBlock>
              </section>
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
