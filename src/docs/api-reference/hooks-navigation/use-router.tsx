"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  ShieldCheck,
  Zap,
  Layers,
  CheckCircle2,
  Code2,
  Sliders,
  ArrowRightLeft,
} from "lucide-react";

export function UseRouterSection() {
  return (
    <section id="userouter" className="scroll-mt-20 mt-8">
      <div className="flex items-center gap-2">
        <h3 className="m-0">
          <code>useRouter()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          "use client"
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Type-Safe Routing
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Provides programmatic navigation, browser history controls, and cache refreshing methods inside Client Components. It enables smooth client-side navigation without full page reloads, letting you redirect users after actions (like form submissions) or refresh server data while keeping your client state intact.
      </p>

      {/* Client-Only Execution Notice */}
      <div className="p-3.5 rounded-lg bg-card border border-border not-prose my-4 space-y-2 text-xs">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Client-Only Execution</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          <code>useRouter()</code> is strictly a <strong>Client Component hook</strong> and must only be used in files with <code>&quot;use client&quot;</code>. Navigation methods (such as <code>push</code> or <code>replace</code>) must be invoked inside browser event handlers (e.g. <code>onClick</code>, <code>onSubmit</code>) or <code>useEffect</code>. To navigate or redirect from <strong>Server Components</strong> or <strong>Server Functions</strong>, use the universal <code>redirect(&quot;/path&quot;)</code> function instead.
        </p>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 1: METHODS REFERENCE */}
      {/* ============================================================= */}
      <div id="userouter-methods" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Code2 className="h-4 w-4 text-emerald-500" />
          <span>Methods Reference</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          All navigation methods are fully typed. Routes are autocompleted and validated at compile time via the <code>DinouRoute</code> union type.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Method</th>
                <th className="p-3">Signature</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">push</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (href: DinouRoute, options?: NavigationOptions) =&gt; void
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Navigates to <code>href</code> and pushes a new entry onto the browser history stack. Validates route patterns via <code>DinouRoute</code>. Pass <code>&#123; fresh: true &#125;</code> to bypass the client-side memory cache and force a new flight request to the server.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">replace</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (href: DinouRoute, options?: NavigationOptions) =&gt; void
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Navigates to <code>href</code> by replacing the current browser history entry (preventing the back button from returning to the previous screen). Also supports <code>&#123; fresh: true &#125;</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">back</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  () =&gt; void
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Navigates back to the preceding entry in the browser history stack (equivalent to executing <code>window.history.back()</code> or clicking the browser&apos;s Back button). Restores saved scroll position automatically.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">forward</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  () =&gt; void
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Navigates forward to the next entry in the browser history stack (equivalent to executing <code>window.history.forward()</code>).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">refresh</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (options?: &#123; layout?: boolean &#125;) =&gt; void
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Performs a <strong>Soft Reload</strong>: purges the active page from the client memory cache, requests a fresh RSC payload from the server, and reconciles the DOM in a transition without reloading the browser or wiping client <code>useState</code>. Pass <code>&#123; layout: true &#125;</code> to invalidate the layout cache and re-render server layouts as well.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">refreshSlot</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  (slotId: string, options?: &#123; fresh?: boolean &#125;) =&gt; void
                </td>
                <td className="p-3 align-top leading-relaxed">
                  Revalidates an isolated <code>&lt;DinouCacheSlot&gt;</code> on the current page without re-rendering or refetching surrounding components or layouts. Pass <code>&#123; fresh: true &#125;</code> to bypass the slot&apos;s server-side storage cache (ignoring any unexpired revalidate TTL) and force an immediate live re-render on the backend. This method is <strong>completely equivalent</strong> to the standalone <a href="#refreshslot" className="text-primary underline"><code>refreshSlot()</code></a> helper exported directly from <code>&quot;dinou&quot;</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 2: CLIENT CACHE & REFRESH OPTIONS */}
      {/* ============================================================= */}
      <div id="userouter-caching" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          <span>Client Cache &amp; Refresh Architecture</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Dinou maintains an in-memory client-side cache (<code>pageCache</code> and <code>layoutCache</code>) to guarantee instant, 0ms latency when users navigate between previously visited routes. Understanding how to manage this cache is essential when mutating data or building real-time dashboards.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>The <code>&#123; fresh: true &#125;</code> Option</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              By default, navigating to a previously visited URL retrieves its cached RSC flight tree. When a user submits an order, changes their profile, or deletes an item, pass <code>&#123; fresh: true &#125;</code> to <code>router.push()</code> or <code>router.replace()</code>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This immediately purges the target route from <code>pageCache</code>, ensuring the client receives updated server-rendered data without relying on stale client memory.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-500" />
              <span>The <code>&#123; layout: true &#125;</code> Option</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To optimize performance, Dinou reuses parent layout Server Components across page transitions. Calling <code>router.refresh()</code> re-runs page components while keeping the layout intact.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If your mutation impacts layout-level elements (such as updating an organization switcher, unread message badges in the global navbar, or user profile headers), pass <code>router.refresh(&#123; layout: true &#125;)</code> to re-evaluate and re-render layout Server Components.
            </p>
          </div>
        </div>

        {/* Soft Reload vs Hard Reload Comparison */}
        <div className="not-prose rounded-lg border border-border bg-card p-4 text-xs space-y-3">
          <div className="font-semibold text-foreground text-sm flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Soft Reload (<code>router.refresh()</code>) vs. Hard Reload (<code>window.location.reload()</code>)</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5 bg-emerald-500/5 p-3 rounded border border-emerald-500/20">
              <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                router.refresh() (Soft Reload)
              </div>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>Fetches updated RSC stream directly from the server.</li>
                <li><strong>Preserves React state:</strong> <code>useState</code>, input cursor, and modal open states remain intact.</li>
                <li>Smooth visual transition without white screen flashes.</li>
                <li>Maintains client-side scroll position.</li>
              </ul>
            </div>
            <div className="space-y-1.5 bg-muted/40 p-3 rounded border border-border">
              <div className="font-semibold text-foreground">
                window.location.reload() (Hard Reload)
              </div>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>Destroys the entire JavaScript execution context.</li>
                <li><strong>Wipes all client state:</strong> forms, focused elements, and in-memory caches are lost.</li>
                <li>Full browser document reload with visible white flash.</li>
                <li>Re-downloads and re-executes all static assets and bundles.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUBSECTION 3: PRODUCTION PATTERNS */}
      {/* ============================================================= */}
      <div id="userouter-examples" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
        <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
          <Sliders className="h-4 w-4 text-emerald-500" />
          <span>Production Implementation Patterns</span>
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Explore canonical implementations for post-mutation redirection, live polling, and targeted slot revalidation.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="mutation"
            tabs={[
              {
                id: "mutation",
                label: "post-mutation.tsx (Form Action)",
                language: "tsx",
                code: `// src/components/create-product-form.tsx (Client Component)
"use client";

import { useTransition, useState } from "react";
import { useRouter } from "dinou";
import { createProductAction } from "@/actions/products";

export function CreateProductForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await createProductAction(formData);
        
        // Navigate with fresh: true to bypass client cache and show live data
        router.push(\`/products/\${result.id}\`, { fresh: true });
      } catch (err: any) {
        setError(err.message || "Failed to create product");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Product name..." required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}`,
              },
              {
                id: "polling",
                label: "live-poller.tsx (Live Dashboard)",
                language: "tsx",
                code: `// src/components/live-metrics-header.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "dinou";

export function LiveMetricsHeader() {
  const router = useRouter();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    // Polls fresh server data every 30 seconds
    const interval = setInterval(() => {
      // Soft reloads server components: local searchFilter and focus are preserved!
      router.refresh();
      setLastRefreshed(new Date());
    }, 30_000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h2 className="font-semibold text-sm">Real-Time Metrics</h2>
        <span className="text-xs text-muted-foreground">
          Last updated: {lastRefreshed.toLocaleTimeString()}
        </span>
      </div>

      {/* Local state is NOT wiped when router.refresh() runs in the background */}
      <input
        type="search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Filter metrics locally..."
        className="text-xs px-2 py-1 border rounded"
      />

      <button
        onClick={() => {
          router.refresh({ layout: true });
          setLastRefreshed(new Date());
        }}
        className="text-xs bg-secondary px-3 py-1.5 rounded hover:bg-secondary/80"
      >
        Refresh All (Including Layout)
      </button>
    </div>
  );
}`,
              },
              {
                id: "slot-refresh",
                label: "cart-drawer.tsx (Slot Revalidation)",
                language: "tsx",
                code: `// src/components/cart-drawer.tsx (Client Component)
"use client";

import { useRouter } from "dinou";
import { updateQuantityAction } from "@/actions/cart";

export function CartItemRow({ item }: { item: { id: string; qty: number } }) {
  const router = useRouter();

  const handleUpdate = async (delta: number) => {
    await updateQuantityAction(item.id, item.qty + delta);

    // Surgically revalidates only the <DinouCacheSlot id="cart-counter" /> and
    // <DinouCacheSlot id="cart-totals" /> without refetching the full page
    router.refreshSlot("cart-counter", { fresh: true });
    router.refreshSlot("cart-totals", { fresh: true });
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handleUpdate(-1)}>-</button>
      <span>{item.qty}</span>
      <button onClick={() => handleUpdate(1)}>+</button>
    </div>
  );
}`,
              },
            ]}
          />
        </div>

        <div className="p-3.5 rounded-lg bg-card border border-border text-xs not-prose space-y-2 mt-4">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Coordination with <code>useNavigationLoading()</code></span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Every call to <code>router.push()</code>, <code>router.replace()</code>, or <code>router.refresh()</code> wraps its state updates in React&apos;s transition engine (<code>startTransition</code>). To show global loading spinners or top progress indicators across transitions, subscribe to the <a href="#usenavigationloading" className="text-primary underline"><code>useNavigationLoading()</code></a> hook.
          </p>
        </div>
      </div>
    </section>
  );
}
