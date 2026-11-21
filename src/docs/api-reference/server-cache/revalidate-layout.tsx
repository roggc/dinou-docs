"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Layers, Zap, RefreshCw } from "lucide-react";

export function RevalidateLayoutSection() {
  return (
    <section id="revalidatelayout" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>revalidateLayout()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          dinou/server
        </span>
        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
          Target: Layout Segment Only (O(1))
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Returns: Promise&lt;boolean&gt;
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Asynchronously invalidates and regenerates <strong>only the targeted layout segment</strong> (<code>layout.rsc</code> and <code>layout.metadata.json</code>) in <strong>O(1) time</strong> without re-executing any child <code>page.tsx</code> components. Concurrent calls to the same layout are automatically deduplicated in-flight, previous snapshots are backed up to <code>layout._old.rsc</code>, and affected child <code>index.html</code> documents and nested sub-layouts are lazily re-composed on demand when next visited — guaranteeing <strong>zero hydration mismatches</strong> on hard browser reloads (F5).
      </p>

      {/* Sub-section 1: O(1) Scope & Lazy Re-composition */}
      <div id="revalidatelayout-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-500" />
            <span>O(1) Layout Invalidation &amp; Lazy HTML Re-composition</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          How Dinou updates shared layouts across thousands of child routes with zero page re-executions.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>1. O(1) Layout Regeneration (0 Child Pages Executed)</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When a shared sidebar, header, or segment layout changes, calling <code>revalidateLayout(path)</code> re-runs strictly that segment&apos;s <code>layout_functions.ts</code> (<code>getProps</code>, <code>getCacheTags</code>) and <code>layout.tsx</code> to persist a fresh <code>layout.rsc</code> with monotonic <code>generatedAt</code> and <code>layoutGeneratedAt</code> timestamps.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On <code>ppr = true</code> routes, it regenerates only the <strong>Layout Static Shell</strong> while keeping dynamic <code>&lt;Suspense&gt;</code> holes in the layout streaming live per request.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4 text-emerald-500" />
              <span>2. Lazy On-Demand HTML Re-composition</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Soft SPA navigations immediately consume the fresh <code>layout.rsc</code>. When a child route (e.g. <code>/docs/routing</code>) is next requested via a hard reload (F5), Dinou detects that an ancestor layout&apos;s <code>generatedAt</code> is newer than the child&apos;s cached <code>generatedAt</code>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dinou then <strong>lazily re-composes</strong> the child&apos;s <code>index.html</code> on the fly by splicing its existing cached <code>page.rsc</code> into the fresh <code>layout.rsc</code> — without re-running the child&apos;s <code>page.tsx</code> or resetting its own <code>pageGeneratedAt</code> ISR countdown.
            </p>
          </div>
        </div>

        {/* Parameters Table */}
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
                  The route segment path whose layout should be revalidated (e.g. <code>&quot;/&quot;</code> for the root layout, <code>&quot;/docs&quot;</code>, <code>&quot;/dashboard&quot;</code>, or relative paths like <code>&quot;./&quot;</code>, <code>&quot;..&quot;</code>, <code>&quot;../billing&quot;</code> inside Server Functions). Trailing slashes, <code>?query</code>, and <code>#hash</code> are automatically stripped. Resolves to <code>true</code> if a layout existed at that segment and was regenerated/evicted, or <code>false</code> otherwise.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert className="not-prose mt-4">
          <Layers className="h-4 w-4 text-purple-500" />
          <AlertTitle>Nested Sub-Layout Propagation</AlertTitle>
          <AlertDescription>
            If an ancestor layout (e.g. <code>/</code> or <code>/dashboard</code>) is invalidated via <code>revalidateLayout()</code>, any deeper nested sub-layouts (e.g. <code>/dashboard/settings/layout.tsx</code>) also lazily update their cumulative <code>layout.rsc</code> on demand the next time a route in that sub-branch is visited.
          </AlertDescription>
        </Alert>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="sidebar-action"
            tabs={[
              {
                id: "sidebar-action",
                label: "sidebar-actions.ts (Segment Layout)",
                language: "typescript",
                code: `// src/actions/sidebar-actions.ts
"use server";

import { revalidateLayout } from "dinou/server";
import { db } from "@/lib/db";

export async function reorderDocsSidebar(newOrder: string[]) {
  // 1. Persist the updated sidebar navigation order
  await db.navigation.updateOrder("docs-sidebar", newOrder);

  // 2. O(1) Surgical Layout Invalidation:
  // Regenerates ONLY /docs/layout.rsc (0 child doc pages are re-executed).
  // All child routes (/docs/routing, /docs/rendering, etc.) lazily re-compose
  // their index.html on demand using their cached page.rsc payloads.
  await revalidateLayout("/docs");

  return { success: true };
}`,
              },
              {
                id: "root-layout-webhook",
                label: "announcement-webhook.ts (Root Layout)",
                language: "typescript",
                code: `// src/plugins/announcement-webhook.ts
import type { DinouPlugin } from "dinou";
import { revalidateLayout } from "dinou/server";

export const announcementWebhookPlugin: DinouPlugin = {
  name: "announcement-webhook",
  async onRequest(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/webhooks/banner" && request.method === "POST") {
      // Regenerate the global root layout (src/layout.tsx) in O(1) time
      // without rebuilding every page across the application
      const updated = await revalidateLayout("/");
      return Response.json({ revalidated: updated, scope: "root-layout" });
    }
  },
};`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

