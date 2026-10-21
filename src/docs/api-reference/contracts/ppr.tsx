"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Zap, ArrowRightLeft, Layers, AlertTriangle, Code2 } from "lucide-react";

export function PprContract() {
  return (
    <section id="ppr-config" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>ppr</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Partial Prerendering
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          PPRConfig
        </span>
        <span className="inline-flex items-center rounded-md bg-slate-500/10 px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400 ring-1 ring-inset ring-slate-500/20">
          Default: false (Inherited)
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Configures <strong>Partial Prerendering (PPR)</strong> for a route segment, layout subtree, or global application. PPR combines the instantaneous response time of static delivery with the flexibility of server-rendered dynamic data. Dinou immediately transmits a pre-rendered static HTML shell and streams dynamic <code>&lt;Suspense&gt;</code> holes concurrently over the same HTTP response stream as they resolve.
      </p>

      {/* Architecture Highlights */}
      <div className="not-prose my-4 grid gap-3 sm:grid-cols-2">
        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-sm font-semibold">1. Instant Shell Delivery (0ms TTFB)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Static elements, navigational layouts, and Suspense fallback skeletons are pre-rendered at build time or during initial generation and persisted in storage. Visitors receive the complete static shell instantly without waiting for backend databases or third-party APIs.
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-semibold">2. Progressive Streaming Holes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Dynamic React Server Components execute asynchronously on the server in parallel. As each Suspense boundary resolves its data, Dinou pushes lightweight replacement chunks down the open HTTP connection to swap fallback skeletons with final content seamlessly.
          </CardContent>
        </Card>
      </div>

      {/* Resolution & Cascade Hierarchy */}
      <div className="not-prose my-4 border rounded-lg overflow-hidden bg-card">
        <div className="px-4 py-2.5 bg-muted/50 border-b flex items-center gap-2 font-semibold text-xs text-foreground">
          <Layers className="h-4 w-4 text-primary" />
          <span>Configuration Resolution &amp; Inheritance Hierarchy</span>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="p-3 font-medium">Scope</th>
              <th className="p-3 font-medium">Declaration Location</th>
              <th className="p-3 font-medium">Behavior &amp; Precedence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                1. Global Config
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>dinou.config.js</code>
              </td>
              <td className="p-3 align-top leading-relaxed text-muted-foreground">
                Sets application-wide default via <code>defineConfig(&#123; ppr: true &#125;)</code>. Serves as the fallback baseline for all routes when no segment defines an override.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                2. Layout Subtree
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>layout_functions.ts</code>
              </td>
              <td className="p-3 align-top leading-relaxed text-muted-foreground">
                Cascades downward to all nested layouts and child pages in that directory subtree. Enables activating PPR across entire feature sections such as <code>/dashboard/*</code>.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                3. Page Override
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>page_functions.ts</code>
              </td>
              <td className="p-3 align-top leading-relaxed text-muted-foreground">
                Provides granular control. Explicitly opts into PPR (<code>true</code>) or opts out (<code>false</code>), taking final precedence over parent layouts and global settings.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Critical Boundary Alert */}
      <Alert className="not-prose my-4">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle>Critical Architectural Boundary (getProps vs React Suspense)</AlertTitle>
        <AlertDescription>
          <code>getProps()</code> executes on the server before React rendering commences, operating entirely outside of React <code>&lt;Suspense&gt;</code> boundaries. Accessing dynamic request parameters, headers, or cookies directly inside <code>getProps()</code> prevents the generation of a static shell, causing Dinou to bail out into Dynamic SSR. To maximize PPR performance, return only deterministic or static shell data from <code>getProps()</code>, and isolate dynamic personalized data inside asynchronous Server Components wrapped with <code>&lt;Suspense fallback=&#123;&lt;Skeleton /&gt;&#125;&gt;</code>.
        </AlertDescription>
      </Alert>

      {/* Tabbed Code Block */}
      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-blue-500" />
          <span>Partial Prerendering Implementation Patterns</span>
        </div>
        <TabbedCodeBlock
          defaultTab="page-ppr"
          tabs={[
            {
              id: "page-ppr",
              label: "dashboard/page_functions.ts",
              language: "typescript",
              code: `// src/app/dashboard/page_functions.ts
import type { PageFunctions } from "dinou";

// 1. Literal boolean activation
export const ppr: PageFunctions["ppr"] = true;

// 2. Programmatic evaluation (sync or async function)
// export const ppr: PageFunctions["ppr"] = async () => {
//   return process.env.ENABLE_PPR === "true";
// };`,
            },
            {
              id: "page-markup",
              label: "dashboard/page.tsx",
              language: "tsx",
              code: `// src/app/dashboard/page.tsx
import { Suspense } from "react";
import { UserGreeting, UserStatsSkeleton } from "@/components/skeletons";
import { RealtimeMetrics } from "@/components/realtime-metrics";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* 1. Static Shell: Rendered at build time and served in 0ms */}
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Overview of workspace activities and live metrics.
        </p>
      </header>

      {/* 2. Dynamic Streaming Hole: Fallback sent in shell, resolved asynchronously */}
      <Suspense fallback={<UserStatsSkeleton />}>
        <RealtimeMetrics />
      </Suspense>
    </div>
  );
}`,
            },
            {
              id: "layout-branch",
              label: "admin/layout_functions.ts",
              language: "typescript",
              code: `// src/app/admin/layout_functions.ts
import type { LayoutFunctions } from "dinou";

// Branch-level enablement
// Automatically enables PPR for all nested pages under /admin/*
export const ppr: LayoutFunctions["ppr"] = true;`,
            },
            {
              id: "page-optout",
              label: "admin/audit/page_functions.ts",
              language: "typescript",
              code: `// src/app/admin/audit/page_functions.ts
import type { PageFunctions } from "dinou";

// Explicit opt-out
// Overrides the parent /admin layout and disables PPR for this specific route
export const ppr: PageFunctions["ppr"] = false;

// Force fresh Dynamic SSR rendering on every request
export const revalidate: PageFunctions["revalidate"] = 0;`,
            },
          ]}
        />
      </div>
    </section>
  );
}
