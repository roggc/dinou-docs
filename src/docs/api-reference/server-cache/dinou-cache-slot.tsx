"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Layers, Zap, ArrowRightLeft, Code2, Sparkles } from "lucide-react";

export function DinouCacheSlotSection() {
  return (
    <section id="dinoucacheslot" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>&lt;DinouCacheSlot&gt;</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Server Primitive
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Returns: Promise&lt;ReactNode&gt;
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        The foundational primitive for <strong>Micro-ISR (Vertical 3D Segmentation)</strong> in React Server Components. Allows isolating, caching, and revalidating independent component subtrees within an active page or layout without re-evaluating the parent route, re-fetching unchanged database queries, or resetting client component state.
      </p>

      {/* Sub-section 1: Props & Micro-ISR Reference */}
      <div id="dinoucacheslot-props" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-500" />
            <span>Props &amp; Micro-ISR Reference</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Configuring TTL revalidation, cache tags, and targeted slot identifiers.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">id</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
                <td className="p-3 align-top leading-relaxed">
                  Unique identifier for targeted client-side slot refreshing via <code>refreshSlot(id)</code> or <code>router.refreshSlot(id)</code>, server-side <code>revalidateTag(id)</code>, and the primary storage key (<code>slots/&lt;id&gt;/slot.json</code> + <code>slot.metadata.json</code>). When caching personalized data, parameterize the ID (e.g. <code>id=&#123;`cart-${"{userId}"}`&#125;</code>). If omitted, Dinou falls back to <code>tag</code> or <code>tags[0]</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">revalidate</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">number | false</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">undefined (Forever)</td>
                <td className="p-3 align-top leading-relaxed">
                  Time-based Micro-ISR TTL in seconds. When <code>&gt;= 1</code>, serves from storage and refreshes in the background once expired. When <code>&lt; 1</code> (e.g. <code>0</code>), bypasses server cache storage (always renders fresh, triggering a Dynamic PPR Hole inside <code>&lt;Suspense&gt;</code> on PPR routes or Automatic Static Bailout on non-PPR routes) while still registering the slot for surgical client-side <code>refreshSlot(id)</code> updates. When <code>false</code> or omitted, caches indefinitely until <code>revalidateTag()</code> or <code>refreshSlot(id, &#123; fresh: true &#125;)</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">tag / tags</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">string / string[]</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">undefined</td>
                <td className="p-3 align-top leading-relaxed">
                  Single cache tag or array of tags for server-side on-demand invalidation via <code>revalidateTag(tag)</code> (if both <code>tag</code> and <code>tags</code> are provided, Dinou merges and deduplicates them automatically alongside <code>id</code>).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">children</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">ReactNode | (() =&gt; Promise&lt;ReactNode&gt; | ReactNode)</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Required</td>
                <td className="p-3 align-top leading-relaxed">
                  The Server Component subtree to isolate, render, and cache independently. Accepts standard JSX elements or a deferred asynchronous render function (<code>() =&gt; Promise&lt;ReactNode&gt;</code>).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Architecture Callout */}
        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-emerald-500" />
              <span>Independent Storage Persistence</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Dinou executes the slot&apos;s child components once (deduplicating concurrent in-flight renders), serializes the resolved JSX tree into <code>slots/&lt;id&gt;/slot.json</code> in your storage backend (Redis, Memory, KV, or FileSystem), and serves that cached payload to subsequent visitors without re-running database queries until TTL expiry or invalidation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <ArrowRightLeft className="h-4 w-4 text-blue-500" />
              <span>Client State &amp; Shell Splicing</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When a slot refreshes (via <code>refreshSlot(id)</code>, time-based Micro-ISR, or <code>revalidateTag</code>), only that specific subtree updates in the browser DOM and in any host Static Shell (<code>shell.html</code> / <code>index.html</code>) without re-executing <code>page.tsx</code> / <code>layout.tsx</code> or resetting the host segment&apos;s own <code>pageGeneratedAt</code> / <code>layoutGeneratedAt</code> ISR countdown.
            </p>
          </div>
        </div>

        <Alert className="not-prose mt-4">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <AlertTitle>PPR &amp; ISG Synergy: Nesting Order with &lt;Suspense&gt;</AlertTitle>
          <AlertDescription>
            Nesting order and route <code>ppr</code> mode determine how a slot integrates with Static Shells and Dynamic Holes:
            <ul className="list-disc pl-4 mt-1.5 space-y-1">
              <li>
                <strong><code>ppr = true</code> + <code>&lt;Suspense&gt;&lt;DinouCacheSlot&gt;...&lt;/DinouCacheSlot&gt;&lt;/Suspense&gt;</code> (Cached Dynamic PPR Hole):</strong> The fallback is sent in the 0ms Static Shell, while the slot resolves asynchronously and streams from the Micro-ISR cache.
              </li>
              <li>
                <strong><code>ppr = false</code> + <code>&lt;Suspense&gt;&lt;DinouCacheSlot revalidate=&#123;60&#125;&gt;...&lt;/DinouCacheSlot&gt;&lt;/Suspense&gt;</code> (Static / ISG Safe):</strong> Stays 100% static without triggering Automatic Static Bailout — both the page and slot cache normally via SSG/ISG unless the slot sets <code>revalidate=&#123;0&#125;</code> or accesses dynamic request data.
              </li>
              <li>
                <strong>Unwrapped <code>&lt;DinouCacheSlot&gt;</code> (or with <code>noDynamic()</code>):</strong> Baked directly into the 0ms Static Shell (<code>shell.html</code>) and surgically spliced in storage whenever invalidated.
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      {/* Sub-section 2: Production Slot Patterns */}
      <div id="dinoucacheslot-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-emerald-500" />
            <span>Production Slot Patterns</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Explore real-world patterns for independent TTLs, parameterized user slots, and multi-slot dashboards.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="ticker-slot"
            tabs={[
              {
                id: "ticker-slot",
                label: "ticker-slot.tsx (Time-based Micro-ISR)",
                language: "tsx",
                code: `// src/components/crypto-ticker-slot.tsx (Server Component)
import { DinouCacheSlot } from "dinou/server";
import { fetchCryptoPrices } from "@/lib/crypto";

export function CryptoTickerSection() {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <h2 className="text-sm font-semibold mb-2">Live Market Watch</h2>
      
      {/* Caches ticker independently for 15 seconds */}
      <DinouCacheSlot id="crypto-ticker" revalidate={15} tag="crypto">
        <LiveCryptoPrices />
      </DinouCacheSlot>
    </div>
  );
}

async function LiveCryptoPrices() {
  const prices = await fetchCryptoPrices();
  return (
    <div className="flex gap-4 font-mono text-xs">
      <span>BTC: \${prices.btc.toLocaleString()}</span>
      <span>ETH: \${prices.eth.toLocaleString()}</span>
      <span>SOL: \${prices.sol.toLocaleString()}</span>
    </div>
  );
}`,
              },
              {
                id: "cart-slot",
                label: "cart-slot.tsx (Parameterized Tag Slot)",
                language: "tsx",
                code: `// src/components/cart-badge-slot.tsx (Server Component)
import { Suspense } from "react";
import { DinouCacheSlot, getContext } from "dinou/server";
import db from "@/lib/db";

export function CartBadgeSlot() {
  // Wrap the component that reads cookies inside <Suspense> so PPR routes
  // keep the surrounding page/layout static while streaming the user's cart!
  return (
    <Suspense fallback={<span className="badge opacity-50">...</span>}>
      <PersonalizedCartSlot />
    </Suspense>
  );
}

function PersonalizedCartSlot() {
  const ctx = getContext();
  const userId = ctx.req.cookies.user_id || "guest";

  return (
    /* Parameterized ID & tags isolate each user's cached cart fragment */
    <DinouCacheSlot
      id={\`header-cart-\${userId}\`}
      tags={[\`cart-\${userId}\`, "cart"]}
    >
      <CartCounter userId={userId} />
    </DinouCacheSlot>
  );
}

async function CartCounter({ userId }: { userId: string }) {
  const count = await db.cart.getItemCount(userId);
  return <span className="badge font-bold">{count} items</span>;
}`,
              },
              {
                id: "dashboard",
                label: "src/dashboard/page.tsx (Multi-Slot Grid)",
                language: "tsx",
                code: `// src/dashboard/page.tsx (Server Component)
import { DinouCacheSlot } from "dinou/server";
import { UserMetrics } from "@/components/metrics";
import { GlobalAnnouncements } from "@/components/announcements";
import { ActivityFeed } from "@/components/activity";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Workspace Overview</h1>
      </header>

      {/* Slot A: Global announcements cached for 1 hour */}
      <DinouCacheSlot id="announcements" revalidate={3600} tag="announcements">
        <GlobalAnnouncements />
      </DinouCacheSlot>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content: High-velocity metrics cached for 30s */}
        <div className="col-span-2">
          <DinouCacheSlot id="metrics" revalidate={30} tag="metrics">
            <UserMetrics />
          </DinouCacheSlot>
        </div>

        {/* Sidebar: Activity feed revalidated on-demand via revalidateTag("activity-feed") */}
        <div>
          <DinouCacheSlot id="activity" tags={["activity-feed"]}>
            <ActivityFeed />
          </DinouCacheSlot>
        </div>
      </div>
    </div>
  );
}`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
