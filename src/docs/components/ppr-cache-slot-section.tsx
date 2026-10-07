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
  Sparkles,
  Zap,
  Layers,
  Database,
  Clock,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

/**
 * PprCacheSlotSection:
 * Standalone, parkable component explaining the synergy between
 * Partial Prerendering (PPR) and <DinouCacheSlot>.
 * Ready to be relocated or included in any documentation page.
 */
export function PprCacheSlotSection() {
  return (
    <div
      id="pattern-ppr-cache-slot"
      className="scroll-mt-20 p-5 rounded-xl border border-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/10 space-y-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-mono">
            5
          </span>
          <h3 className="text-base font-bold">
            6.5. The Synergy: Partial Prerendering (PPR) + &lt;DinouCacheSlot&gt;
          </h3>
        </div>
        <Badge
          variant="secondary"
          className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-800"
        >
          High-Traffic Pattern
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        What happens when you nest <code>&lt;DinouCacheSlot&gt;</code> inside a React{" "}
        <code>&lt;Suspense&gt;</code> boundary on a page with{" "}
        <strong>Partial Prerendering (PPR)</strong>? You unlock the highest performance profile possible in full-stack web engineering: <strong>zero-delay initial delivery paired with near-zero streaming delay and 99.9% database query offloading</strong>.
      </p>

      {/* Before vs After Grid */}
      <div className="grid gap-4 md:grid-cols-2 text-xs not-prose my-2">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500" />
                PPR Alone (Without Slot)
              </CardTitle>
              <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-500/30">
                Live Query Per Request
              </Badge>
            </div>
            <CardDescription className="text-[11px]">
              Static shell + on-demand dynamic execution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5 text-muted-foreground leading-relaxed">
            <p>
              • <strong>TTFB:</strong> 0ms from CDN edge (instant outer layout).
            </p>
            <p>
              • <strong>Skeleton Duration:</strong> The user waits the full query duration (e.g. 1,200ms) on <em>every single request</em> while the server executes the query.
            </p>
            <p>
              • <strong>Database Load:</strong> 10,000 visitors per minute = <strong>10,000 database queries</strong> executed on the server.
            </p>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-indigo-500" />
                PPR + &lt;DinouCacheSlot&gt;
              </CardTitle>
              <Badge variant="outline" className="text-[10px] text-indigo-600 dark:text-indigo-400 border-indigo-500/40">
                Cached Streamed Hole
              </Badge>
            </div>
            <CardDescription className="text-[11px]">
              Instant shell + cached streaming hole
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5 text-muted-foreground leading-relaxed">
            <p>
              • <strong>TTFB:</strong> 0ms from CDN edge (instant outer layout).
            </p>
            <p>
              • <strong>Skeleton Duration:</strong> ~5ms! Subsequent visitors receive the cached RSC stream chunk almost immediately; the skeleton barely blinks.
            </p>
            <p>
              • <strong>Database Load:</strong> 10,000 visitors per minute with <code>duration=&#123;60&#125;</code> = <strong>1 database query</strong> per minute (99.99% reduction).
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Implementation Example
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Wrap the slow asynchronous Server Component with <code>&lt;DinouCacheSlot&gt;</code>, and then enclose both inside React <code>&lt;Suspense&gt;</code>:
        </p>
      </div>

      <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
        {`// src/dashboard/page.tsx - High-traffic operational dashboard
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou";
import { db } from "@/lib/db";
import { MetricsSkeleton } from "./MetricsSkeleton";
import { InteractiveMetricsChart } from "./InteractiveMetricsChart"; // "use client"

// Heavy async Server Component
async function HeavyMetricsSubtree() {
  // Heavy aggregation across millions of database rows (e.g. 1.5 seconds)
  const aggregatedStats = await db.telemetry.aggregateOperations();
  return <InteractiveMetricsChart data={aggregatedStats} />;
}

export default function DashboardPage() {
  return (
    <main className="p-8 space-y-6 max-w-5xl mx-auto">
      {/* 1. PPR Static Shell: Delivered instantly with 0ms TTFB from edge CDN */}
      <header className="border-b pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Operations Command Center</h1>
        <p className="text-sm text-muted-foreground">Real-time system telemetry and infrastructure health.</p>
      </header>

      {/* 2. PPR Dynamic Boundary + Cache Slot:
             - Fallback skeleton sent immediately in initial layout
             - Dynamic hole streams from server cache in ~5ms for subsequent users
             - Database query executes only ONCE every 60 seconds */}
      <Suspense fallback={<MetricsSkeleton />}>
        <DinouCacheSlot id="operations-telemetry" duration={60} tags={["telemetry"]}>
          <HeavyMetricsSubtree />
        </DinouCacheSlot>
      </Suspense>
    </main>
  );
}`}
      </CodeBlock>

      <div className="grid gap-3 sm:grid-cols-3 pt-2 text-xs">
        <div className="p-3 rounded-lg border bg-background/80 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
            <Zap className="h-4 w-4 text-amber-500" />
            Instant TTFB
          </div>
          <p className="text-[11px] text-muted-foreground">
            Outer shell and fallback skeleton arrive at 0ms from CDN edge.
          </p>
        </div>

        <div className="p-3 rounded-lg border bg-background/80 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
            <TrendingDown className="h-4 w-4 text-emerald-500" />
            99.9% Query Relief
          </div>
          <p className="text-[11px] text-muted-foreground">
            Caches the dynamic stream chunk on the server during the TTL window.
          </p>
        </div>

        <div className="p-3 rounded-lg border bg-background/80 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            Surgical Invalidation
          </div>
          <p className="text-[11px] text-muted-foreground">
            Call <code>revalidateTag(&quot;telemetry&quot;)</code> or <code>refreshSlot()</code> to update without full-page reloads.
          </p>
        </div>
      </div>
    </div>
  );
}
