"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Layers, Code2, Sparkles, ShieldCheck, ArrowRightLeft } from "lucide-react";

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
        <AlertTitle>Initial HTML Document Reconciliation (Math.min)</AlertTitle>
        <AlertDescription>
          When serving the initial unified HTML document (<code>index.html</code> on first load or hard refresh), Dinou reconciles multiple <code>revalidate</code> exports along the route hierarchy using <code>Math.min()</code>. The segment specifying the shortest interval takes precedence so the composite HTML shell never serves stale page content. In contrast, during client-side SPA navigation, <strong>Horizontal Layered Segmentation</strong> keeps <code>layout.rsc</code> and <code>page.rsc</code> on completely decoupled, independent caching planes. If any segment sets <code>revalidate: 0</code>, the initial HTML response is served via Dynamic SSR.
        </AlertDescription>
      </Alert>

      {/* Deep Dive Callout Box: Revalidation Asymmetry */}
      <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4 min-w-0">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span>Deep Dive: Revalidation Asymmetry &amp; Lifecycle Casuistics</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Why does Dinou treat Hard Reloads differently from SPA Soft Navigations, and why does route-level regeneration re-render <code>page.rsc</code> while leaving <code>layout.rsc</code> untouched? The answers stem from two architectural principles: <strong>HTML is a monolithic composite file</strong>, and <strong>React 19 client hydration requires strict atomic parity</strong> between the server-rendered HTML DOM and its twin Flight RSC payload.
        </p>

        {/* The 2 Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs min-w-0">
          {/* Case 1: Page TTL < Layout TTL */}
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-3 min-w-0 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <ArrowRightLeft className="h-3.5 w-3.5" />
                <span>Case 1: Page TTL &lt; Layout TTL (Most Common)</span>
              </div>
              <p className="text-muted-foreground font-mono text-[11px]">
                e.g. <code>page: 10s</code> vs. <code>layout: 3600s (1h)</code>
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-emerald-500/10 text-muted-foreground">
              <div>
                <strong className="text-foreground">Hard Reload (F5 / Direct Link):</strong>
                <p className="mt-0.5 leading-relaxed">
                  <code>Math.min()</code> stores a 10s TTL in the route&apos;s <code>metadata.json</code>. When expired, Dinou atomically regenerates <code>index.html</code> (baking fresh page data) and <code>page.rsc</code> (for client hydration parity). <code>layout.rsc</code> remains <strong>100% untouched</strong> in storage.
                </p>
              </div>
              <div>
                <strong className="text-foreground">SPA Soft Navigation:</strong>
                <p className="mt-0.5 leading-relaxed">
                  The client router retains <code>layout.rsc</code> in memory for the full 1h. Page transitions only fetch the lightweight <code>page.rsc</code>. <strong>Zero Layout Overhead</strong> — 0ms server CPU is spent recalculating layouts on page transitions.
                </p>
              </div>
              <div>
                <strong className="text-foreground">Scope:</strong>
                <p className="mt-0.5 leading-relaxed">
                  Only the specific URL (<code>/blog/post-1</code>) expires at 10s. Sibling pages sharing that layout maintain their own independent TTLs.
                </p>
              </div>
            </div>
          </div>

          {/* Case 2: Layout TTL < Page TTL */}
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-3 min-w-0 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>Case 2: Layout TTL &lt; Page TTL (Volatile Shell)</span>
              </div>
              <p className="text-muted-foreground font-mono text-[11px]">
                e.g. <code>layout: 10s</code> vs. <code>page: 3600s (1h)</code>
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-blue-500/10 text-muted-foreground">
              <div>
                <strong className="text-foreground">Hard Reload (F5 / Direct Link):</strong>
                <p className="mt-0.5 leading-relaxed">
                  <code>Math.min()</code> forces <code>index.html</code> to regenerate every 10s so the layout shell stays fresh. Crucially, <strong><code>page.rsc</code> is also regenerated</strong>: because SSR executes the full tree at the moment of build, emitting a fresh <code>page.rsc</code> snapshot guarantees zero hydration mismatch.
                </p>
              </div>
              <div>
                <strong className="text-foreground">SPA Soft Navigation:</strong>
                <p className="mt-0.5 leading-relaxed">
                  <code>layout.rsc</code> expires every 10s on its own segmented endpoint. When a client performs a cross-segment transition, the server re-renders the layout without forcing re-renders on already-cached child pages.
                </p>
              </div>
              <div>
                <strong className="text-foreground">Scope:</strong>
                <p className="mt-0.5 leading-relaxed">
                  The layout&apos;s 10s interval <strong>cascades downward</strong>: no child route under this branch can serve an <code>index.html</code> older than 10s.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Atomic Parity Guarantee Banner */}
        <div className="p-3.5 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-1.5 text-xs">
          <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>The Atomic Parity Guarantee (Hydration Mismatch Prevention)</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            In full-stack React Server Components, pre-rendered HTML and client Flight streams cannot drift out of sync. Whenever Dinou&apos;s route-level ISR engine (<code>revalidating.js</code>) rebuilds an <code>index.html</code>, it <strong>always produces a synchronized <code>page.rsc</code> twin</strong>. This ensures that when React 19 calls <code>hydrateRoot()</code> in the browser, the virtual component tree exactly matches the serialized DOM, completely eliminating hydration crashes and layout flashes.
          </p>
        </div>
      </div>

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
