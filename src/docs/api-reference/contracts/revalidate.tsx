"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Layers, Code2 } from "lucide-react";

export function RevalidateContract() {
  return (
    <section id="revalidate-config" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>revalidate</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
          Rendering Strategy
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          number | false | Function
        </span>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Default: false (Static SSG)
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        The single source of truth for route caching and rendering modes. In <code>page_functions.ts</code>, it defines the rendering strategy of that specific page route. In <code>layout_functions.ts</code>, it establishes a baseline caching policy inherited and reconciled across all descendant routes rendered within that layout branch.
      </p>

      <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
        <table className="w-full text-xs text-left border-collapse min-w-[650px]">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Value</th>
              <th className="p-3">Rendering Strategy</th>
              <th className="p-3">Lifecycle &amp; Caching Behavior</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card text-muted-foreground">
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">
                <code>0</code> (or &lt; 1)
              </td>
              <td className="p-3 font-semibold text-xs text-blue-600 dark:text-blue-400 align-top">
                Dynamic SSR
              </td>
              <td className="p-3 align-top leading-relaxed">
                Bypasses the server static storage cache entirely. Dinou renders the component tree fresh on every incoming HTTP request and sends <code>Cache-Control: no-store, no-cache, must-revalidate</code> headers to downstream proxies and browsers.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">
                <code>&gt;= 1</code> (e.g. <code>60</code>)
              </td>
              <td className="p-3 font-semibold text-xs text-green-600 dark:text-green-400 align-top">
                ISR (Incremental Static Regeneration)
              </td>
              <td className="p-3 align-top leading-relaxed">
                Cached in the configured StorageAdapter for the specified duration in seconds. While valid, requests receive instantaneous cache hits. The first visitor request after TTL expiration receives the stale cache item while Dinou triggers background revalidation without blocking the response.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">
                <code>false</code> (or omitted)
              </td>
              <td className="p-3 font-semibold text-xs text-purple-600 dark:text-purple-400 align-top">
                Static (SSG)
              </td>
              <td className="p-3 align-top leading-relaxed">
                Pre-rendered during build time (or on first demand via ISG) and persisted indefinitely in storage. The static document is served forever until purged explicitly via <code>revalidatePath()</code>, <code>revalidatePage()</code>, or <code>revalidateTag()</code>.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">
                <code>Function</code> (sync or async)
              </td>
              <td className="p-3 font-semibold text-xs text-amber-600 dark:text-amber-400 align-top">
                Dynamic Strategy Evaluation
              </td>
              <td className="p-3 align-top leading-relaxed">
                An executable function returning <code>number | false</code>. Dinou executes this function on the server at runtime, enabling conditional rendering strategies based on environment variables, CMS flags, or runtime configuration.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Hierarchical Segment Reconciliation Alert */}
      <Alert className="not-prose my-4">
        <Layers className="h-4 w-4 text-amber-500" />
        <AlertTitle>Hierarchical Segment Reconciliation (Math.min)</AlertTitle>
        <AlertDescription>
          When multiple segments along the active route hierarchy (e.g. a parent <code>layout_functions.ts</code> and a nested <code>page_functions.ts</code>) export <code>revalidate</code>, Dinou reconciles the values using <code>Math.min()</code>. The segment specifying the shortest revalidation interval takes precedence. If any layout or page in the active branch sets <code>revalidate: 0</code>, the entire route becomes Dynamic SSR.
        </AlertDescription>
      </Alert>

      {/* Tabbed Code Block */}
      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-amber-500" />
          <span>Revalidation Strategy Patterns</span>
        </div>
        <TabbedCodeBlock
          defaultTab="time-isr"
          tabs={[
            {
              id: "time-isr",
              label: "products/page_functions.ts",
              language: "typescript",
              code: `// src/app/products/page_functions.ts
import type { PageFunctions } from "dinou";

// Time-based ISR: Cache rendered HTML for 60 seconds
// Next request after 60s triggers asynchronous background revalidation
export const revalidate: PageFunctions["revalidate"] = 60;`,
            },
            {
              id: "dynamic-ssr",
              label: "cart/page_functions.ts",
              language: "typescript",
              code: `// src/app/cart/page_functions.ts
import type { PageFunctions } from "dinou";

// Dynamic SSR: Bypasses static cache completely
// Freshly renders on every request with Cache-Control: no-store headers
export const revalidate: PageFunctions["revalidate"] = 0;`,
            },
            {
              id: "dynamic-fn",
              label: "pricing/page_functions.ts",
              language: "typescript",
              code: `// src/app/pricing/page_functions.ts
import type { PageFunctions } from "dinou";

// Dynamic evaluation: Switch caching strategy based on runtime environment
export const revalidate: PageFunctions["revalidate"] = async () => {
  // Disable caching during local development or staging audits
  if (process.env.NODE_ENV !== "production") {
    return 0; // Dynamic SSR
  }

  // Cache for 10 minutes in production
  return 600; // ISR 10m
};`,
            },
            {
              id: "layout-reconcile",
              label: "dashboard/layout_functions.ts",
              language: "typescript",
              code: `// src/app/dashboard/layout_functions.ts
import type { LayoutFunctions } from "dinou";

// Sets a baseline 5-minute cache for all routes within /dashboard
// Child pages can shorten this interval (e.g. 60s) or force SSR (0) via Math.min()
export const revalidate: LayoutFunctions["revalidate"] = 300;`,
            },
          ]}
        />
      </div>
    </section>
  );
}
