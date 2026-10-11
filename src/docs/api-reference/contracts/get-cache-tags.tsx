"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { CheckCircle2, Zap, Database, Layers, Code2 } from "lucide-react";

export function GetCacheTagsContract() {
  return (
    <section id="getcachetags" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>getCacheTags</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          On-Demand Invalidation
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          string[] | Function
        </span>
        <span className="inline-flex items-center rounded-md bg-slate-500/10 px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400 ring-1 ring-inset ring-slate-500/20">
          page_functions.ts &amp; layout_functions.ts
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Attaches granular cache tags to pre-rendered HTML documents and RSC payloads stored in the <code>StorageAdapter</code>. Allows targeted purging of related routes via <code>revalidateTag(tag)</code> without needing to enumerate individual paths or parameters.
      </p>

      {/* Formats Grid */}
      <div className="not-prose my-4 grid gap-3 sm:grid-cols-3">
        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <CardTitle className="text-sm font-semibold">1. Constant Array</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Exports a fixed string array for routes with static tags. Executes with zero runtime overhead during build and route registration.
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-semibold">2. Sync Function</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Accepts route parameters synchronously to generate entity-specific tags such as <code>`product-${'{'}params.id{'}'}`</code> or <code>`author-${'{'}params.slug{'}'}`</code>.
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-purple-500" />
              <CardTitle className="text-sm font-semibold">3. Async Function</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Executes an asynchronous query against a database or CMS. Attaches relational tags (such as categories or vendors) that are not present in the URL itself.
          </CardContent>
        </Card>
      </div>

      {/* Targeted Invalidation & Hierarchy Alert */}
      <Alert className="not-prose my-4">
        <Layers className="h-4 w-4 text-primary" />
        <AlertTitle>Surgical Invalidation Targets: page_functions vs layout_functions</AlertTitle>
        <AlertDescription className="space-y-2 text-xs">
          <div>
            <strong>Tags in <code>page_functions.ts</code>.</strong> Targets individual route documents. Invoking <code>revalidateTag(tag)</code> executes a surgical <code>revalidatePage()</code>, regenerating exclusively <code>page.rsc</code> and <code>index.html</code> for matching pages. Parent layouts remain completely untouched in cache, avoiding unnecessary layout recompilations.
          </div>
          <div>
            <strong>Tags in <code>layout_functions.ts</code>.</strong> Targets the shared layout shell across an entire subtree. By default, invoking <code>revalidateTag(tag)</code> executes a surgical <code>revalidateLayout()</code>, regenerating exclusively <code>layout.rsc</code> while child page HTML remains untouched for maximum efficiency. When passed <code>&#123; cascade: true &#125;</code> (e.g. <code>revalidateTag(tag, &#123; cascade: true &#125;)</code>), Dinou regenerates <code>layout.rsc</code> and cascades downward to re-bake the updated layout into all child <code>index.html</code> files.
          </div>
        </AlertDescription>
      </Alert>

      {/* Tabbed Code Block */}
      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-emerald-500" />
          <span>Cache Tagging Implementation Patterns</span>
        </div>
        <TabbedCodeBlock
          defaultTab="sync-tag"
          tabs={[
            {
              id: "sync-tag",
              label: "products/[id]/page_functions.ts",
              language: "typescript",
              code: `// src/app/products/[id]/page_functions.ts
import type { PageFunctions } from "dinou";

// Synchronous tag generation derived directly from route parameters
export const getCacheTags: PageFunctions<"/products/[id]">["getCacheTags"] = (params) => {
  return [
    "products",
    \`product-\${params.id}\`,
  ];
};`,
            },
            {
              id: "async-tag",
              label: "products/[id]/async_page_functions.ts",
              language: "typescript",
              code: `// src/app/products/[id]/page_functions.ts
import type { PageFunctions } from "dinou";
import { db } from "@/lib/database";

// Asynchronous lookup attaching relational tags from a database
export const getCacheTags: PageFunctions<"/products/[id]">["getCacheTags"] = async (params) => {
  const product = await db.products.findUnique({ where: { id: params.id } });

  return [
    "products",
    \`product-\${params.id}\`,
    \`category-\${product?.categorySlug}\`,
    \`vendor-\${product?.vendorId}\`,
  ];
};`,
            },
            {
              id: "constant-tag",
              label: "catalog/page_functions.ts",
              language: "typescript",
              code: `// src/app/catalog/page_functions.ts
import type { PageFunctions } from "dinou";

// Constant string array for static route segments
export const getCacheTags: PageFunctions["getCacheTags"] = [
  "catalog",
  "storefront",
];`,
            },
            {
              id: "layout-tag",
              label: "dashboard/layout_functions.ts",
              language: "typescript",
              code: `// src/app/dashboard/layout_functions.ts
import type { LayoutFunctions } from "dinou";

// Branch-level tagging cascading to all nested child pages
export const getCacheTags: LayoutFunctions["getCacheTags"] = [
  "dashboard",
  "admin-shell",
];`,
            },
            {
              id: "revalidate-trigger",
              label: "actions/update-product.ts",
              language: "typescript",
              code: `// src/actions/update-product.ts
import { revalidateTag } from "dinou/server";
import { db } from "@/lib/database";

export async function updateProduct(id: string, data: any) {
  await db.products.update({ where: { id }, data });

  // 1. Surgical page invalidation (targets page.rsc and index.html)
  await revalidateTag(\`product-\${id}\`);

  // 2. Layout invalidation with cascade to all child documents
  await revalidateTag("admin-shell", { cascade: true });
}`,
            },
          ]}
        />
      </div>
    </section>
  );
}
