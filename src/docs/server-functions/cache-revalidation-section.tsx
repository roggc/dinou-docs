import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import { FileCode, RefreshCw } from "lucide-react";

export function CacheRevalidationSection() {
  return (
    <section id="cache-revalidation" className="mt-12 pt-8 border-t scroll-mt-20">
      <h3>
        5. Cache Revalidation (<code>revalidatePath</code> &amp;{" "}
        <code>revalidateTag</code>)
      </h3>
      <p>
        When a Server Action mutates data in a database, static SSG pages
        and ISR caches might still hold stale content. Dinou provides
        on-demand invalidation utilities exported from{" "}
        <code>&quot;dinou/server&quot;</code>:
      </p>

      <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
              <FileCode className="h-5 w-5" />
              <span>revalidatePath(path)</span>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Purges the cached HTML and RSC payload for a specific route
            path (e.g. <code>/blog</code> or <code>/products/12</code>),
            forcing it to regenerate.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
              <RefreshCw className="h-5 w-5" />
              <span>revalidateTag(tag)</span>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Purges all routes and <code>&lt;DinouCacheSlot&gt;</code>{" "}
            components associated with that tag (defined via{" "}
            <code>getCacheTags</code>).
          </CardContent>
        </Card>
      </div>

      <CodeBlock
        language="typescript"
        containerClassName="w-full overflow-hidden rounded-lg"
      >
{`// src/actions/update-product.ts
"use server";

import { revalidatePath, revalidateTag } from "dinou/server";
import db from "@/lib/db";

export async function updateProductPrice(id: string, newPrice: number) {
  // 1. Mutate database
  await db.products.update({ where: { id }, data: { price: newPrice } });

  // 2. Invalidate specific product path
  await revalidatePath(\`/products/\${id}\`);

  // 3. Invalidate all catalog pages tagged with "catalog"
  await revalidateTag("catalog");

  return { success: true };
}`}
      </CodeBlock>
    </section>
  );
}
