"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Sliders, Flame, Code2 } from "lucide-react";

export function RevalidateTagSection() {
  return (
    <section id="revalidatetag" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>revalidateTag()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Server Function
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Multi-Target Global Revalidation
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Returns: Promise&lt;void&gt;
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Purges and regenerates all route pages, segment layouts, and independent <code>&lt;DinouCacheSlot&gt;</code> fragments matching the specified cache tag across the application.
      </p>

      {/* Sub-section 1: Parameters Table */}
      <div id="revalidatetag-params" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-emerald-500" />
            <span>Parameters &amp; Tag Resolution</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Parameters accepted by <code>revalidateTag(tag)</code>.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Parameter</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">tag</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Required</td>
                <td className="p-3 align-top leading-relaxed">
                  The cache tag identifier to invalidate (e.g. <code>&quot;products&quot;</code>, <code>&quot;site-nav&quot;</code>, or dynamic entity tags like <code>&quot;product-42&quot;</code>). Matches against tags declared via <code>getCacheTags</code> in <code>page_functions.ts</code> and <code>layout_functions.ts</code>, as well as <code>tag</code> / <code>tags</code> props on <code>&lt;DinouCacheSlot&gt;</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-muted-foreground line-through align-top">options</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">&#123; cascade?: boolean &#125;</td>
                <td className="p-3 font-mono text-[11px] text-amber-600 dark:text-amber-400 align-top">Deprecated</td>
                <td className="p-3 align-top leading-relaxed">
                  <strong>Deprecated &amp; ignored since v9.0.3.</strong> Matched layouts automatically trigger lazy on-demand <code>index.html</code> re-composition across child routes to guarantee 0 hydration mismatch without eager cascading.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Multi-Target Mechanics Alert */}
        <Alert className="not-prose mt-4">
          <Flame className="h-4 w-4 text-emerald-500" />
          <AlertTitle>Unified Cross-Tier Invalidation</AlertTitle>
          <AlertDescription>
            Unlike URL-bound invalidators, <code>revalidateTag()</code> resolves storage artifacts across all three segmentation axes simultaneously:
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li>
                <strong>Micro-ISR Slots (<code>&lt;DinouCacheSlot&gt;</code>):</strong> Matching cache slot payloads are immediately regenerated. If a matched slot resides inside a Static Shell (e.g. an unwrapped slot or a <code>&lt;Suspense&gt;</code> + <code>noDynamic()</code> slot on a <code>ppr = true</code> route), Dinou surgically splices the refreshed slot into the host page or layout shell without re-executing <code>page.tsx</code> or <code>layout.tsx</code>.
              </li>
              <li>
                <strong>Route Pages (<code>page_functions.ts</code>):</strong> Routes declaring the tag via <code>export const getCacheTags = [...]</code> (including dynamic routes like <code>/products/[id]</code>) execute <code>revalidatePage()</code>, regenerating <code>page.rsc</code> and <code>index.html</code> while leaving parent layouts cached.
              </li>
              <li>
                <strong>Segment Layouts (<code>layout_functions.ts</code>):</strong> Layouts declaring the tag via <code>export const getCacheTags = [...]</code> execute <code>revalidateLayout()</code> in O(1) time, updating <code>layout.rsc</code> while child routes lazily re-compose their <code>index.html</code> on demand.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Tabbed Code Block */}
        <div className="not-prose my-6 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
            <Code2 className="h-4 w-4 text-emerald-500" />
            <span>Tagged Architecture Pattern</span>
          </div>
          <TabbedCodeBlock
            defaultTab="catalog-functions"
            tabs={[
              {
                id: "catalog-functions",
                label: "src/catalog/page_functions.ts",
                language: "typescript",
                code: `// src/catalog/page_functions.ts
import type { PageFunctions } from "dinou";

// 1. Tag the entire route page for broad invalidation
export const getCacheTags: PageFunctions["getCacheTags"] = [
  "catalog",
  "products",
];

// Background fallback TTL (1 hour)
export const revalidate: PageFunctions["revalidate"] = 3600;`,
              },
              {
                id: "catalog-view",
                label: "src/catalog/page.tsx",
                language: "tsx",
                code: `// src/catalog/page.tsx
import { DinouCacheSlot } from "dinou/server";
import { ProductGrid } from "@/components/product-grid";
import { RealtimeStock } from "@/components/realtime-stock";

export default async function CatalogPage() {
  return (
    <main className="container mx-auto py-8">
      <h1>Product Catalog</h1>

      {/* Static product listings */}
      <ProductGrid />

      {/* 2. Micro-ISR cache slot with granular tags */}
      <DinouCacheSlot
        id="inventory-feed"
        tags={["inventory", "products"]}
        revalidate={60}
      >
        <RealtimeStock />
      </DinouCacheSlot>
    </main>
  );
}`,
              },
              {
                id: "inventory-action",
                label: "src/actions/inventory-actions.ts",
                language: "typescript",
                code: `// src/actions/inventory-actions.ts
"use server";

import { revalidateTag } from "dinou/server";
import { db } from "@/lib/db";

export async function restockItem(productId: string, quantity: number) {
  // 1. Mutate database records
  await db.stock.increment(productId, quantity);

  // 2. Targeted Slot Invalidation:
  // Regenerates only <DinouCacheSlot> components tagged with "inventory"
  // and splices the updated fragment into the cached catalog shell
  // without re-running CatalogPage or ProductGrid.
  await revalidateTag("inventory");

  return { success: true };
}

export async function bulkPriceUpdate(categoryId: string) {
  await db.pricing.applyDiscount(categoryId, 0.15);

  // Broad Multi-Tier Invalidation:
  // Regenerates all catalog pages, layouts, and inventory slots tagged with "products".
  await revalidateTag("products");

  return { success: true };
}`,
              },
            ]}
          />
        </div>
      </div>

      {/* Revalidation Matrix Table */}
      <div className="not-prose my-6 space-y-2">
        <div className="font-semibold text-sm text-foreground">
          Server Revalidation Comparison Matrix
        </div>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Function</th>
                <th className="p-3">Target Scope</th>
                <th className="p-3">Layout Affected?</th>
                <th className="p-3">Child Routes HTML Strategy</th>
                <th className="p-3">Best Used For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">
                  revalidatePage(path)
                </td>
                <td className="p-3 align-top">
                  Single route page artifact (<code>page.rsc</code>, <code>index.html</code> / <code>shell.html</code>)
                </td>
                <td className="p-3 align-top font-semibold text-muted-foreground">
                  No
                </td>
                <td className="p-3 align-top font-semibold text-muted-foreground">
                  None (rebuilds only target URL)
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Specific page mutations, article edits, and single-record updates where shared layouts remain untouched.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">
                  revalidateLayout(path)
                </td>
                <td className="p-3 align-top">
                  Segment layout shell only (<code>layout.rsc</code>, O(1) execution)
                </td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">
                  Yes (O(1))
                </td>
                <td className="p-3 align-top">
                  Lazy on-demand <code>index.html</code> re-composition (0 child <code>page.tsx</code> runs)
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Shared navigation bars, sidebars, user headers, or global announcements shared across many child routes.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">
                  revalidatePath(path)
                </td>
                <td className="p-3 align-top">
                  Segment layout (<code>layout.rsc</code>) AND index page (<code>page.rsc</code>, <code>index.html</code>)
                </td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">
                  Yes (if present)
                </td>
                <td className="p-3 align-top">
                  Immediate for <code>path</code>; lazy on-demand for child subroutes
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Mutations that update both a section&apos;s shared layout and its index landing page simultaneously.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">
                  revalidateTag(tag)
                </td>
                <td className="p-3 align-top">
                  All pages, layouts, and <code>&lt;DinouCacheSlot&gt;</code> fragments matching <code>tag</code>
                </td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">
                  If tagged
                </td>
                <td className="p-3 align-top">
                  Lazy on-demand for tagged layouts; surgical shell splicing for Static Shell slots
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Cross-cutting domain mutations (e.g. inventory stock, product catalog, CMS categories) spanning multiple routes and slots.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
