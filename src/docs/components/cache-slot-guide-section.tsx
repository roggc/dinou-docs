import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Split,
  RefreshCw,
  Clock,
  Database,
  ShieldAlert,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

/**
 * CacheSlotGuideSection:
 * Standalone, parkable component explaining when to use <DinouCacheSlot>,
 * its core architectural scenarios, anti-patterns, and decision criteria.
 */
export function CacheSlotGuideSection() {
  return (
    <div
      id="pattern-cache-slot-guide"
      className="scroll-mt-20 p-5 rounded-xl border border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
            6
          </span>
          <h3 className="text-base font-bold">
            6.6. When Should You Use &lt;DinouCacheSlot&gt;?
          </h3>
        </div>
        <Badge
          variant="secondary"
          className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800"
        >
          Architectural Decision Guide
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        A common question in full-stack architecture is: <em>Does <code>&lt;DinouCacheSlot&gt;</code> only make sense for dynamic components or subtrees?</em>
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        <strong>The short answer:</strong> While dynamic routes and PPR are where it delivers exponential returns, it also unlocks unique capabilities for static pages (such as <strong>asymmetric revalidation</strong> and <strong>in-place client slot refreshes</strong>). Understanding when to use it boils down to the distinction between <strong>Horizontal Segmentation</strong> (route/layout-level) and <strong>Vertical Segmentation</strong> (component-level).
      </p>

      {/* Red Box: When NOT to use it */}
      <div className="rounded-xl border border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/15 p-4 space-y-3">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wide">
          <XCircle className="h-4 w-4" />
          <span>When NOT to Use &lt;DinouCacheSlot&gt; (Redundant or Anti-Patterns)</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 text-xs space-y-1.5">
            <span className="font-bold text-rose-600 dark:text-rose-400 block">
              1. 100% Static Pages (SSG)
            </span>
            <p className="text-muted-foreground leading-normal">
              If an entire route is pre-rendered at build time with no revalidation, it is already cached as immutable HTML at the CDN Edge. Wrapping parts of it in a slot adds zero caching benefit.
            </p>
          </div>

          <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 text-xs space-y-1.5">
            <span className="font-bold text-rose-600 dark:text-rose-400 block">
              2. Wrapping the Entire Page
            </span>
            <p className="text-muted-foreground leading-normal">
              Wrapping your entire <code>page.tsx</code> body inside a slot reinvents horizontal caching. Use <code>export const revalidate = 300</code> in <code>page_functions.ts</code> instead.
            </p>
          </div>

          <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20 text-xs space-y-1.5">
            <span className="font-bold text-rose-600 dark:text-rose-400 block">
              3. Unpartitioned Private Data
            </span>
            <p className="text-muted-foreground leading-normal">
              Wrapping personal user data (e.g. private user carts or session tokens) with a static slot ID will cache that private data for the first user and leak it to subsequent visitors.
            </p>
          </div>
        </div>
      </div>

      {/* Green Box: Where it Shines (3 Core Scenarios) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wide">
          <CheckCircle2 className="h-4 w-4" />
          <span>The 3 High-Value Architectural Scenarios</span>
        </div>

        {/* Scenario 1 */}
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-background/80 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                1
              </span>
              <span>Dynamic SSR Routes with Heavy Shared Widgets (The Primary Scenario)</span>
            </div>
            <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
              Dynamic Routes (SSR)
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Dynamic pages (reading cookies, auth tokens, or search params) <strong>cannot be cached at the CDN or route level</strong> because each user receives a customized response. However, many widgets on that page (stock tickers, trending feeds, heavy SQL analytics) are identical across users. <code>&lt;DinouCacheSlot&gt;</code> isolates the expensive widget with its own TTL:
          </p>

          <CodeBlock language="tsx" containerClassName="rounded-lg overflow-hidden">
{`// src/routes/dashboard/page.tsx (Dynamic authenticated SSR)
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou";
import { getSession } from "@/lib/auth";
import { GlobalMetricsWidget } from "./metrics";

export default async function DashboardPage() {
  const session = await getSession(); // Evaluated dynamically per user

  return (
    <div className="p-6">
      <h1>Welcome back, {session.user.name}</h1> {/* 100% Live & personal */}

      {/* Global widget: cached for 10 minutes on the server across all users */}
      <Suspense fallback={<div>Loading global telemetry...</div>}>
        <DinouCacheSlot id="global-metrics" duration={600} tags={["metrics"]}>
          <GlobalMetricsWidget />
        </DinouCacheSlot>
      </Suspense>
    </div>
  );
}`}
          </CodeBlock>
        </div>

        {/* Scenario 2 */}
        <div className="p-4 rounded-xl border border-indigo-500/20 bg-background/80 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-mono">
                2
              </span>
              <span>Dynamic Holes in Partial Prerendering (PPR) — The Ultimate Synergy</span>
            </div>
            <Badge variant="outline" className="text-[10px] text-indigo-600 dark:text-indigo-400 border-indigo-500/30">
              PPR Synergy
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            In PPR, the static shell ships instantly from CDN (0ms TTFB), while dynamic holes stream in via React Suspense. Without a slot, <strong>100,000 visitors trigger 100,000 database hits</strong>. Placing <code>&lt;DinouCacheSlot&gt;</code> inside the hole means only the first request queries the DB; the other 99,999 stream the cached RSC Flight payload in <strong>~2-5ms</strong>:
          </p>

          <div className="p-3 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-lg border border-indigo-500/20 text-xs text-muted-foreground">
            👉 <em>See full breakdown and benchmark diagrams in Section 6.5 above.</em>
          </div>
        </div>

        {/* Scenario 3 */}
        <div className="p-4 rounded-xl border border-blue-500/20 bg-background/80 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-mono">
                3
              </span>
              <span>Static or ISR Pages with Asymmetric Lifecycles &amp; Targeted Refreshes</span>
            </div>
            <Badge variant="outline" className="text-[10px] text-blue-600 dark:text-blue-400 border-blue-500/30">
              Static / ISR Routes
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            This is where <code>&lt;DinouCacheSlot&gt;</code> proves it is <strong>not limited to dynamic pages</strong>. You can use it in static/ISR pages for two critical architectural advantages:
          </p>

          <div className="grid gap-3 sm:grid-cols-2 pt-1">
            <div className="p-3 bg-muted/40 rounded-lg border text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                A. Asymmetric Revalidation Lifecycles
              </span>
              <p className="text-muted-foreground leading-normal">
                Suppose a product page has heavy media and specifications that rarely change (cached for 24 hours: <code>revalidate = 86400</code>). But live stock pricing fluctuates every 60 seconds. A slot lets the pricing widget expire every 60s without re-rendering the whole page!
              </p>
            </div>

            <div className="p-3 bg-muted/40 rounded-lg border text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                B. Surgical In-Place Client Refresh (refreshSlot)
              </span>
              <p className="text-muted-foreground leading-normal">
                A Client Component can trigger an on-demand re-render of <em>only this Server Component</em> using <code>refreshSlot(slotId)</code> without refreshing the browser page or losing client state (scroll position, inputs, audio):
              </p>
            </div>
          </div>

          <CodeBlock language="tsx" containerClassName="rounded-lg overflow-hidden mt-2">
{`// 1. In your Page (Server Component): Asymmetric slot inside static route
<DinouCacheSlot id={\`price-\${product.id}\`} duration={60} tags={["pricing"]}>
  <LivePriceCalculator productId={product.id} />
</DinouCacheSlot>

// 2. In an interactive Client Component: refresh ONLY that slot
"use client";
import { refreshSlot } from "dinou";

export function RefreshPriceButton({ productId }: { productId: string }) {
  return (
    <button onClick={() => refreshSlot(\`price-\${productId}\`, { fresh: true })}>
      Check Latest Stock & Price
    </button>
  );
}`}
          </CodeBlock>
        </div>
      </div>

      {/* Decision Checklist Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-card p-4 space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wide text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <HelpCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Quick Decision Checklist
        </h4>

        <div className="grid gap-2 text-xs">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-500/20">
            <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Dynamic or PPR route with heavy queries?</strong> Wrap it with <code>&lt;DinouCacheSlot&gt;</code> inside <code>&lt;Suspense&gt;</code> to protect your database and stream instantly.
            </span>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-500/20">
            <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Asymmetric expiration?</strong> If a widget needs a different TTL than the surrounding page (e.g. 60s widget vs 24h page), use a slot.
            </span>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-500/20">
            <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Need targeted client refreshes?</strong> If you want <code>refreshSlot()</code> to update just that server subtree in-place, use a slot.
            </span>
          </div>

          <div className="flex items-start gap-2 p-2 rounded-lg bg-rose-50/30 dark:bg-rose-950/20 border border-rose-500/20 text-rose-900 dark:text-rose-300">
            <X className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>
              <strong>Pure SSG with uniform expiration?</strong> Do <strong>not</strong> use <code>&lt;DinouCacheSlot&gt;</code>. Let build-time SSG and CDN Edge caching handle the entire page with zero runtime overhead.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
