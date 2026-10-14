"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Sliders, Layers } from "lucide-react";

export function RevalidatePathSection() {
  return (
    <section id="revalidatepath" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>revalidatePath()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Server Function
        </span>
        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
          Target: Route &amp; Layout
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Asynchronously invalidates and regenerates the targeted page <strong>and its segment layout</strong> (<code>layout.rsc</code>). When invoked with <code>&#123; cascade: true &#125;</code> on a route that defines a layout, it recursively invalidates all child subroutes beneath that route segment.
      </p>

      {/* Sub-section 1: Options & Cascade Behavior */}
      <div id="revalidatepath-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-purple-500" />
            <span>Parameters &amp; Cascade Hierarchy</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Options accepted by <code>revalidatePath(path, options?)</code>.
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
                <td className="p-3 font-mono font-semibold text-primary align-top">path</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Required</td>
                <td className="p-3 align-top leading-relaxed">
                  The target route path to revalidate (e.g. <code>&quot;/docs&quot;</code> or <code>&quot;/products&quot;</code>).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">options.cascade</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">false</td>
                <td className="p-3 align-top leading-relaxed">
                  When <code>true</code> and the targeted route defines a layout (<code>layout.tsx</code>), Dinou revalidates that layout and automatically cascades down to all child subroutes inheriting it (e.g. revalidating <code>/docs</code> with cascade also purges <code>/docs/routing</code>, <code>/docs/rendering</code>, etc.). If no layout exists at that segment, it revalidates only the page and skips cascading.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert className="not-prose mt-4">
          <Layers className="h-4 w-4 text-purple-500" />
          <AlertTitle>Cascade Invalidation Requires a Segment Layout</AlertTitle>
          <AlertDescription>
            The <code>cascade: true</code> option only activates if the specified route segment defines an active <code>layout.tsx</code>. Cascading in Dinou is fundamentally tied to invalidating a shared ancestor layout payload. If a targeted path does not contain a layout, Dinou revalidates only that single page and skips traversing child subroutes.
          </AlertDescription>
        </Alert>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="single-route"
            tabs={[
              {
                id: "single-route",
                label: "store-actions.ts (Segment & Layout)",
                language: "typescript",
                code: `// src/actions/store-actions.ts
"use server";

import { revalidatePath } from "dinou/server";
import { db } from "@/lib/db";

export async function updateStoreBanner(bannerText: string) {
  // 1. Update promotional banner in database
  await db.settings.set("store_banner", bannerText);

  // 2. Revalidate /store page AND /store layout (layout.rsc)
  // Essential because the promotional banner lives in src/app/store/layout.tsx
  await revalidatePath("/store");

  return { success: true };
}`,
              },
              {
                id: "cascade-route",
                label: "docs-actions.ts (Cascade Invalidation)",
                language: "typescript",
                code: `// src/actions/docs-actions.ts
"use server";

import { revalidatePath } from "dinou/server";
import { cms } from "@/lib/cms";

export async function publishDocSection(sectionId: string) {
  // 1. Publish new section in CMS
  await cms.navigation.publish(sectionId);

  // 2. Invalidate /docs layout AND cascade down to all child routes
  // Purges /docs/routing, /docs/rendering, /docs/api-reference, etc.
  // Guarantees all nested pages display the updated sidebar with zero hydration mismatch
  await revalidatePath("/docs", { cascade: true });

  return { success: true };
}`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
