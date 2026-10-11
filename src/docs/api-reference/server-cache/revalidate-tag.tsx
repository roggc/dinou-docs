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
        Purges and marks for on-demand background regeneration all route pages, segment layouts, and independent <code>&lt;DinouCacheSlot&gt;</code> fragments matching the specified cache tag across the application.
      </p>

      {/* Sub-section 1: Parameters Table */}
      <div id="revalidatetag-params" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-emerald-500" />
            <span>Parameters &amp; Tagged Cascade</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Options accepted by <code>revalidateTag(tag, options?)</code>.
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
                  The cache tag identifier to invalidate (e.g. <code>&quot;products&quot;</code>, <code>&quot;site-nav&quot;</code>, or dynamic entity tags like <code>&quot;product-42&quot;</code>). Matches against tags declared on pages, layouts, and slot fragments.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">options.cascade</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">false</td>
                <td className="p-3 align-top leading-relaxed">
                  When <code>true</code>, if any matched artifact is a route layout (<code>layout.tsx</code>), Dinou initiates a cascading revalidation across all downstream child subroutes inheriting that layout. If <code>false</code>, matched layouts are revalidated individually without traversing child routes.
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
            Unlike URL-bound invalidators, <code>revalidateTag()</code> traverses storage artifacts regardless of where they reside in the route tree:
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li>
                <strong>Micro-ISR Slots:</strong> Direct cache slot records matching the tag are immediately purged from storage so the next incoming request resolves fresh server JSX.
              </li>
              <li>
                <strong>Route Pages:</strong> HTML and RSC page payloads declaring the tag in <code>page_functions = &#123; tags: [...] &#125;</code> (including parameterized routes such as <code>/products/[id]</code>) are marked stale and regenerated.
              </li>
              <li>
                <strong>Layouts:</strong> Layouts declaring the tag in <code>layout_functions = &#123; tags: [...] &#125;</code> are updated, with optional downward cascade when <code>cascade: true</code> is passed.
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
            defaultTab="catalog-view"
            tabs={[
              {
                id: "catalog-view",
                label: "catalog/page.tsx (Tagged Page & Slot)",
                language: "typescript",
                code: `// src/app/catalog/page.tsx
import { DinouCacheSlot } from "dinou/server";
import { ProductGrid } from "@/components/product-grid";
import { RealtimeStock } from "@/components/realtime-stock";

// 1. Tag the entire route page
export const page_functions = {
  tags: ["catalog", "products"],
  revalidate: 3600, // Background fallback
};

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
                label: "inventory-actions.ts (Granular Purging)",
                language: "typescript",
                code: `// src/actions/inventory-actions.ts
"use server";

import { revalidateTag } from "dinou/server";
import { db } from "@/lib/db";

export async function restockItem(productId: string, quantity: number) {
  // 1. Mutate database records
  await db.stock.increment(productId, quantity);

  // 2. Targeted Invalidation:
  // Purges only <DinouCacheSlot> components tagged with "inventory",
  // keeping the heavy parent catalog page cached and untouched.
  await revalidateTag("inventory");

  return { success: true };
}

export async function bulkPriceUpdate(categoryId: string) {
  await db.pricing.applyDiscount(categoryId, 0.15);

  // Broad Invalidation:
  // Purges all catalog pages, search feeds, and inventory slots tagged with "products".
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
                <th className="p-3">Cascade to Children?</th>
                <th className="p-3">Best Used For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">
                  revalidatePage(path)
                </td>
                <td className="p-3 align-top">
                  Single route page artifact (<code>index.html</code>, <code>page.rsc</code>)
                </td>
                <td className="p-3 align-top font-semibold text-muted-foreground">
                  No
                </td>
                <td className="p-3 align-top font-semibold text-muted-foreground">
                  No
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Specific page mutations, content edits, single-record updates where shared layouts remain untouched.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">
                  revalidatePath(path, options?)
                </td>
                <td className="p-3 align-top">
                  Page component and its segment layout (<code>layout.rsc</code>)
                </td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">
                  Yes
                </td>
                <td className="p-3 align-top">
                  Optional (<code>&#123; cascade: true &#125;</code>, requires layout)
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Segment-level updates, navigation breadcrumbs, sidebar menus, and branch-wide refreshes.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">
                  revalidateTag(tag, options?)
                </td>
                <td className="p-3 align-top">
                  All pages, layouts, and <code>&lt;DinouCacheSlot&gt;</code> fragments tagged with matching key
                </td>
                <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">
                  If tagged
                </td>
                <td className="p-3 align-top">
                  Optional (<code>&#123; cascade: true &#125;</code> for matched layouts)
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Cross-cutting domain entity mutations (e.g. inventory stock, product catalog, global banners) affecting multiple disjoint routes and slots simultaneously.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
