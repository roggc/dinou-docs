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
          Target: Segment Layout + Page
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Returns: Promise&lt;void&gt;
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Asynchronously invalidates and regenerates <strong>both the segment layout</strong> (<code>layout.rsc</code>, if a <code>layout.tsx</code> exists at that path) <strong>and the route page</strong> (<code>page.rsc</code> and <code>index.html</code> / <code>shell.html</code>) for the specified URL. Internally, it executes <code>revalidateLayout(path)</code> followed by <code>revalidatePage(path)</code>.
      </p>

      {/* Sub-section 1: Parameters & Lazy Re-composition */}
      <div id="revalidatepath-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-purple-500" />
            <span>Parameters &amp; Segment Scope</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Parameters accepted by <code>revalidatePath(path)</code>.
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
                  The target route path to revalidate (e.g. <code>&quot;/docs&quot;</code>, <code>&quot;/store&quot;</code>, or <code>&quot;./&quot;</code> relative to the active request). Regenerates that segment&apos;s <code>layout.rsc</code> (if present) and its <code>page.rsc</code> + <code>index.html</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-muted-foreground line-through align-top">options</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">&#123; cascade?: boolean &#125;</td>
                <td className="p-3 font-mono text-[11px] text-amber-600 dark:text-amber-400 align-top">Deprecated</td>
                <td className="p-3 align-top leading-relaxed">
                  <strong>Deprecated &amp; ignored since v9.0.3.</strong> Zero hydration mismatch across child routes is now guaranteed automatically via lazy on-demand <code>index.html</code> re-composition. For layout-only invalidation without re-executing the index page, use <code>revalidateLayout(path)</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert className="not-prose mt-4">
          <Layers className="h-4 w-4 text-purple-500" />
          <AlertTitle>Choosing Between revalidatePath, revalidatePage, and revalidateLayout</AlertTitle>
          <AlertDescription>
            Use <code>revalidatePath(path)</code> when a mutation updates <strong>both</strong> a segment&apos;s layout (<code>layout.tsx</code>) and its index page (<code>page.tsx</code>) simultaneously. If only the page content changed, prefer <code>revalidatePage(path)</code> to avoid regenerating the layout. If only the shared layout changed, prefer <code>revalidateLayout(path)</code> for O(1) layout regeneration; all child subroutes sharing that layout will automatically re-compose their <code>index.html</code> lazily on demand using their cached <code>page.rsc</code> payloads.
          </AlertDescription>
        </Alert>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="segment-and-page"
            tabs={[
              {
                id: "segment-and-page",
                label: "store-actions.ts (Segment Layout + Page)",
                language: "typescript",
                code: `// src/actions/store-actions.ts
"use server";

import { revalidatePath } from "dinou/server";
import { db } from "@/lib/db";

export async function launchSeasonalCampaign(campaignId: string) {
  // 1. Activate campaign in database (affects both banner layout and featured grid)
  await db.campaigns.activate(campaignId);

  // 2. Revalidate both src/store/layout.tsx (layout.rsc) AND src/store/page.tsx (page.rsc + index.html).
  // Child product routes (/store/shoes, /store/hats) lazily re-compose their index.html
  // on demand with the new store layout without re-running their page queries.
  await revalidatePath("/store");

  return { success: true };
}`,
              },
              {
                id: "relative-path",
                label: "workspace-actions.ts (Relative Path)",
                language: "typescript",
                code: `// src/actions/workspace-actions.ts
"use server";

import { revalidatePath } from "dinou/server";
import { db } from "@/lib/db";

export async function renameWorkspace(workspaceId: string, name: string) {
  await db.workspaces.update({ where: { id: workspaceId }, data: { name } });

  // Revalidates both the active URL's segment layout and page
  // using relative path resolution from the current request context
  await revalidatePath("./");

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
