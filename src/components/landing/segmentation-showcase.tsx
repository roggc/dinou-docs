"use client";

import { useState } from "react";
import {
  Layers,
  Split,
  Sparkles,
  RefreshCw,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  Gauge,
  Box,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";
import { CodeWindow } from "./code-window";

type SegmentationTab = "ppr" | "vertical" | "horizontal";

interface TabConfig {
  id: SegmentationTab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile: string;
  codeSnippet: string;
  features: {
    icon: typeof Zap;
    title: string;
    desc: string;
  }[];
  visualPreview: {
    shellTitle: string;
    shellDesc: string;
    streamTitle: string;
    streamDesc: string;
    stat: string;
    statLabel: string;
  };
}

const tabConfigs: Record<SegmentationTab, TabConfig> = {
  ppr: {
    id: "ppr",
    title: "Partial Prerendering (PPR)",
    badge: "0ms TTFB + Live Streaming",
    badgeColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    headline: "Instant Static Shell Delivery with Live Dynamic Streaming",
    description:
      "Dinou v7 unifies static delivery and dynamic personalization in a single request. The static shell is served in under 20ms while personalized Suspense holes stream live in the background.",
    codeFile: "src/dashboard/page_functions.ts",
    codeSnippet: `// 1. Enable Partial Prerendering on the route
export const ppr = true;
export const revalidate = 300; // Static shell refreshes every 5m

// src/dashboard/page.tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LiveUserFeed from "./user-feed";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ⚡ Static Shell: Pre-rendered & served instantly (< 20ms) */}
      <h1 className="text-2xl font-bold">Analytics Overview</h1>
      
      {/* 🌊 Dynamic Hole: Streamed over the wire when ready */}
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <LiveUserFeed />
      </Suspense>
    </div>
  );
}`,
    features: [
      {
        icon: Zap,
        title: "Sub-20ms Global TTFB",
        desc: "Edge CDNs serve the static layout shell instantly without waiting for database queries.",
      },
      {
        icon: RefreshCw,
        title: "Atomic DOM Replacement",
        desc: "React 19 streaming chunks resolve Suspense boundaries and swap fallbacks seamlessly.",
      },
      {
        icon: ShieldCheck,
        title: "Inheritable or Granular",
        desc: "Toggle globally in dinou.config.mjs, inherit across layouts, or override per page.",
      },
    ],
    visualPreview: {
      shellTitle: "Static Prelude (Instant)",
      shellDesc: "Headers, navigation, layout cards and Suspense skeletons served from CDN cache.",
      streamTitle: "Dynamic Stream (Live)",
      streamDesc: "Real-time user balances, personalized notifications and dynamic metrics stream in.",
      stat: "< 15ms",
      statLabel: "Time to First Byte (TTFB)",
    },
  },
  vertical: {
    id: "vertical",
    title: "Vertical Segmentation",
    badge: "<DinouCacheSlot> Micro-ISR",
    badgeColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    headline: "Component-Level Micro-Caching & In-Place Client Refresh",
    description:
      "Stop invalidating entire pages when only one widget changes. Wrap expensive Server Components in <DinouCacheSlot> for independent TTL caching and in-place client refreshes without page reloads.",
    codeFile: "src/dashboard/page.tsx",
    codeSnippet: `import { DinouCacheSlot } from "dinou";
import LiveStockTicker from "./stock-ticker";
import RefreshButton from "./refresh-button";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 🎯 Micro-ISR: Cached independently for 60 seconds */}
      <DinouCacheSlot id="stock-ticker" tag="stocks" revalidate={60}>
        <LiveStockTicker />
      </DinouCacheSlot>

      {/* 🔄 In-place client refresh button (Zero page reload) */}
      <RefreshButton slotId="stock-ticker" />
    </div>
  );
}

// Client Component: Refresh only this component!
// import { refreshSlot } from "dinou";
// <button onClick={() => refreshSlot("stock-ticker")}>Update Ticker</button>`,
    features: [
      {
        icon: Box,
        title: "Independent Micro-ISR",
        desc: "Set component-specific revalidate windows (in seconds) within any page or layout.",
      },
      {
        icon: RefreshCw,
        title: "In-Place Client Refresh",
        desc: "Call refreshSlot('id') to re-fetch and re-render only that widget without reloading the page.",
      },
      {
        icon: Split,
        title: "Granular Tag Purging",
        desc: "Purge specific slot tags via revalidateTag('stocks') without touching the rest of the page.",
      },
    ],
    visualPreview: {
      shellTitle: "Slot Isolation Boundary",
      shellDesc: "Surrounding components remain interactive while the target slot updates in-place.",
      streamTitle: "Zero Full-Page Reloads",
      streamDesc: "DOM reconciliation updates only the target subtree via /____rsc_slot____/:id.",
      stat: "100%",
      statLabel: "Sibling State Preserved",
    },
  },
  horizontal: {
    id: "horizontal",
    title: "Horizontal Segmentation",
    badge: "Decoupled layout_functions",
    badgeColor: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10",
    headline: "Decoupled Layout ISR with Persistent Navigation State",
    description:
      "Layouts can declare their own data fetching and revalidation rules via layout_functions.ts. Changing routes never re-renders cached parent layouts, keeping media playback and search inputs alive.",
    codeFile: "src/dashboard/layout_functions.ts",
    codeSnippet: `// Independent layout caching: Shell cached for 1 hour
export const revalidate = 3600;
export const tags = ["dashboard-shell", "nav-links"];

export async function getProps() {
  const navStats = await fetchGlobalStats();
  return { navStats };
}

// src/dashboard/layout.tsx
export default function DashboardLayout({ children, navStats }: any) {
  return (
    <div className="flex min-h-screen">
      <Sidebar stats={navStats} />
      {/* 🛡️ Persistent Layout: Children swap without remounting this layout */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}`,
    features: [
      {
        icon: Layers,
        title: "Decoupled Layout ISR",
        desc: "Invalidate layout data without forcing re-renders across dozens of child pages.",
      },
      {
        icon: Gauge,
        title: "Total State Persistence",
        desc: "Sidebar inputs, active filters, and audio/video players persist smoothly during softnav.",
      },
      {
        icon: Clock,
        title: "Query-String Aware",
        desc: "Propagates URL query modifications (e.g. ?tab=billing) to layout slots in real time.",
      },
    ],
    visualPreview: {
      shellTitle: "Persistent Layout Shell",
      shellDesc: "Sidebar navigation, breadcrumbs, and user profiles stay mounted during navigation.",
      streamTitle: "Independent Revalidation",
      streamDesc: "Layout revalidates on its own 3600s timer without re-triggering page-level APIs.",
      stat: "0ms",
      statLabel: "Layout Re-render Overhead",
    },
  },
};

export function SegmentationShowcase() {
  const [activeTab, setActiveTab] = useState<SegmentationTab>("ppr");

  const activeConfig = tabConfigs[activeTab];

  return (
    <section
      id="segmentation"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 backdrop-blur-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Dinou v7 Breakthrough
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Two-Dimensional{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Layered Segmentation
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 md:text-lg leading-relaxed">
            Eliminate all-or-nothing caching. Dinou v7 breaks rendering and caching into independent horizontal and vertical dimensions for ultra-fast, granular web applications.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm gap-1 max-w-full overflow-x-auto">
            {(
              [
                { id: "ppr", label: "Partial Prerendering (PPR)", icon: Zap },
                { id: "vertical", label: "Vertical (<DinouCacheSlot>)", icon: Box },
                { id: "horizontal", label: "Horizontal (layout_functions)", icon: Layers },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Grid: Info & Visual Left, Code Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Feature Narrative & Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="space-y-3">
              <Badge variant="outline" className={`px-3 py-1 font-medium ${activeConfig.badgeColor}`}>
                {activeConfig.badge}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {activeConfig.headline}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                {activeConfig.description}
              </p>
            </div>

            {/* Visual Metric Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Real-World Benchmark
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  Verified v7
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
                  {activeConfig.visualPreview.stat}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {activeConfig.visualPreview.statLabel}
                </span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">
                      {activeConfig.visualPreview.shellTitle}:
                    </strong>{" "}
                    {activeConfig.visualPreview.shellDesc}
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">
                      {activeConfig.visualPreview.streamTitle}:
                    </strong>{" "}
                    {activeConfig.visualPreview.streamDesc}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Zero Database Blocking</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Atomic UI Replacement</span>
              </div>
            </div>

            {/* Link to docs */}
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto font-medium"
                asChild
              >
                <Link href="/docs/rendering" className="inline-flex items-center gap-1.5">
                  <span>Explore full segmentation specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Editor Preview (7 cols) */}
          <div className="lg:col-span-7">
            <CodeWindow
              filename={activeConfig.codeFile}
              code={activeConfig.codeSnippet}
              language="tsx"
              statusLeft="Native React 19 RSC Pipeline"
              statusRight="TypeScript 5+ Ready"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
