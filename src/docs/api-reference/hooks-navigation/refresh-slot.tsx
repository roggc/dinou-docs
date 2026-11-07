"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Zap,
  Layers,
  CheckCircle2,
  Code2,
  Sliders,
  ArrowRightLeft,
} from "lucide-react";

export function RefreshSlotSection() {
  return (
    <section id="refreshslot" className="scroll-mt-20 mt-8">
      <div className="flex items-center gap-2">
        <h3 className="m-0">
          <code>refreshSlot()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          "use client"
        </span>
        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
          Micro-ISR Primitives
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        A standalone client-side helper that triggers targeted, isolated revalidation of one or all <code>&lt;DinouCacheSlot&gt;</code> components on the active page. Because it is a pure JavaScript function rather than a React hook, it can be called from anywhere in your client application—including React components, external event listeners, WebSocket handlers, and state management stores.
      </p>

      {/* Equivalence Callout */}
      <div className="p-3.5 rounded-lg bg-card border border-border not-prose my-4 space-y-1.5 text-xs">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>Awaitable <code>Promise&lt;void&gt;</code> &amp; Equivalence with <code>router.refreshSlot()</code></span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          <code>refreshSlot(slotId, options): Promise&lt;void&gt;</code> is <strong>100% equivalent</strong> to <code>router.refreshSlot(slotId, options)</code> from <code>useRouter()</code>. Both return an awaitable <code>Promise&lt;void&gt;</code> that resolves once the network request completes and the new slot JSX is committed, so you can <code>await</code> it directly or pass it to React&apos;s <code>useTransition</code> (<code>startTransition(async () =&gt; &#123; await refreshSlot(...); &#125;)</code>) for exact loading indicators. Prefer the standalone <code>refreshSlot</code> export when calling from outside React components (WebSockets, stores, timers) or in Client Components that do not otherwise need <code>useRouter()</code>.
        </p>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 1: PARAMETERS & WILDCARDS */}
      {/* ============================================================= */}
      <div id="refreshslot-parameters" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Code2 className="h-4 w-4 text-emerald-500" />
          <span>Parameters, Return Type &amp; Wildcard Support</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Signature: <code>refreshSlot(slotId: string, options?: &#123; fresh?: boolean &#125;): Promise&lt;void&gt;</code>. Accepts a specific slot <code>id</code>, a shared slot <code>tag</code>, or the <code>&quot;*&quot;</code> wildcard.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Parameter / Return</th>
                <th className="p-3">Type</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">slotId</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  string
                </td>
                <td className="p-3 align-top leading-relaxed space-y-1">
                  <p>
                    The unique identifier matching the <code>id</code> or <code>tag</code>/<code>tags</code> prop of a <code>&lt;DinouCacheSlot&gt;</code> (e.g. <code>&quot;cart-counter&quot;</code>, <code>&quot;stock-aapl&quot;</code>).
                  </p>
                  <p className="text-[11px] text-foreground font-semibold">
                    Wildcard <code>&quot;*&quot;</code> Support:
                  </p>
                  <p>
                    Passing <code>&quot;*&quot;</code> targets <strong>every active slot</strong> mounted on screen (active page, parent layouts, and <code>@slot</code> routes) and also refreshes in the background any slots cached in memory in the client SPA session from previously visited pages.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">options.fresh</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  boolean (optional)
                </td>
                <td className="p-3 align-top leading-relaxed space-y-1">
                  <p>
                    Controls whether the server can return cached slot storage:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>
                      <strong><code>false</code> (default):</strong> Checks the server-side cache. If the slot&apos;s revalidation TTL has not expired, returns the cached result.
                    </li>
                    <li>
                      <strong><code>true</code>:</strong> Bypasses the server-side cache entirely (even if the TTL is still valid), forces an immediate live re-render on the backend, updates the storage cache, and delivers fresh UI to the client.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">Returns</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  Promise&lt;void&gt;
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Resolves when the target slot(s) have finished re-fetching and updating in the client. Can be awaited with <code>await refreshSlot(...)</code> or passed inside an async <code>startTransition(async () =&gt; &#123; await refreshSlot(...); &#125;)</code> callback.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 2: TARGETED REVALIDATION ARCHITECTURE */}
      {/* ============================================================= */}
      <div id="refreshslot-architecture" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-500" />
          <span>Targeted Revalidation Architecture</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          How client-side slot refreshing delivers surgical UI updates without full page or route re-rendering.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Surgical Component-Level Updates</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Unlike full route reloads (which re-run page Server Components), <code>refreshSlot()</code> communicates directly with the specific mounted <code>&lt;DinouCacheSlot&gt;</code> sub-tree.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Surrounding components, parent layouts, and sibling elements are completely untouched. Local client state (input focus, scroll position, and open modals) remains completely stable.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <ArrowRightLeft className="h-4 w-4 text-emerald-500" />
              <span>Client vs. Server Revalidation</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Server-Side (<code>revalidateTag</code> / <code>revalidatePath</code> / <code>revalidatePage</code>):</strong> Purges cached HTML/JSON in storage during background jobs or server actions. Affects future incoming visits.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Client-Side (<code>refreshSlot</code>):</strong> Actively pulls and renders the new UI into the user&apos;s current browser session in real time without refreshing the page.
            </p>
          </div>

          <div className="md:col-span-2 p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Wildcard <code>refreshSlot(&quot;*&quot;)</code> vs. <code>router.refresh()</code></span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Calling <code>refreshSlot(&quot;*&quot;)</code> refreshes every mounted <code>&lt;DinouCacheSlot&gt;</code> on screen (active page, parent layouts, and <code>@slot</code> routes) and also updates in the background any slots cached in memory in the client SPA session from previously visited pages.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Production Caution:</strong> Avoid combining <code>&quot;*&quot;</code> with <code>&#123; fresh: true &#125;</code> in production unless strictly needed, as it triggers one parallel HTTP request per mounted and in-memory cached slot and forces every one of them to bypass its server TTL simultaneously.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 3: PRODUCTION PATTERNS */}
      {/* ============================================================= */}
      <div id="refreshslot-examples" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Sliders className="h-4 w-4 text-emerald-500" />
          <span>Production Implementation Patterns</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Explore real-world patterns for real-time WebSocket events, awaitable <code>useTransition</code> wildcard refreshing, and external state stores.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="websocket"
            tabs={[
              {
                id: "websocket",
                label: "realtime-socket.ts (Pure JS Listener)",
                language: "typescript",
                code: `// src/services/realtime-socket.ts (Pure TypeScript / Non-React)
import { refreshSlot } from "dinou";

// Initialize WebSocket connection outside the React component tree
const socket = new WebSocket("wss://api.example.com/realtime");

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.type === "PRICE_UPDATE") {
    // Surgically revalidates only the specific ticker slot in the active page
    refreshSlot(\`ticker-\${message.symbol.toLowerCase()}\`, { fresh: true });
  }

  if (message.type === "NOTIFICATION_RECEIVED") {
    // Updates the unread counter badge slot
    refreshSlot("notifications-badge", { fresh: true });
  }
};`,
              },
              {
                id: "wildcard",
                label: "dashboard-toolbar.tsx (useTransition + await)",
                language: "tsx",
                code: `// src/components/dashboard-toolbar.tsx (Client Component)
"use client";

import { useTransition } from "react";
import { refreshSlot } from "dinou";

export function DashboardToolbar() {
  const [isRefreshing, startTransition] = useTransition();

  const handleRefreshAll = () => {
    // Because refreshSlot returns a Promise<void>, awaiting it inside
    // startTransition keeps isRefreshing === true until all slots finish updating!
    startTransition(async () => {
      await refreshSlot("*");
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
      <h2 className="text-sm font-semibold">Analytics Overview</h2>
      <button
        onClick={handleRefreshAll}
        disabled={isRefreshing}
        className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
      >
        {isRefreshing ? "Updating all slots..." : "Refresh All Widgets"}
      </button>
    </div>
  );
}`,
              },
              {
                id: "mutation-store",
                label: "cart-store.ts (Awaitable Store Action)",
                language: "typescript",
                code: `// src/stores/cart-store.ts (Client Action / Store)
import { refreshSlot } from "dinou";

export async function onCartItemAdded(productId: string) {
  await fetch(\`/api/cart/items\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity: 1 }),
  });

  // Await both slot refreshes in parallel until the UI is updated
  await Promise.all([
    refreshSlot("cart-summary", { fresh: true }),
    refreshSlot("checkout-totals", { fresh: true }),
  ]);
}`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
