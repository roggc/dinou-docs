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
  docHref: string;
  docLabel: string;
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
    docHref: "/docs/rendering#partial-prerendering",
    docLabel: "PPR Guide",
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
    docHref: "/docs/rendering#micro-isr",
    docLabel: "Micro-ISR Guide",
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
    docHref: "/docs/routing#layout-functions",
    docLabel: "Layout Functions Guide",
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
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 scroll-mt-16 relative bg-transparent"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Card with Context, Visual Benchmark & Features */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm lg:h-[630px] overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5">
              <div className="space-y-3">
                <Badge variant="outline" className={`text-xs px-3 py-1 font-mono ${activeConfig.badgeColor}`}>
                  {activeConfig.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {activeConfig.headline}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeConfig.description}
                </p>
              </div>

              {/* Real-World Benchmark Card */}
              <div className="p-4 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-slate-800/60 mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Real-World Benchmark
                  </span>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] px-2 py-0.5">
                    Verified v7
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`text-3xl font-black font-mono ${
                      activeTab === "ppr"
                        ? "text-cyan-600 dark:text-cyan-400"
                        : activeTab === "vertical"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {activeConfig.visualPreview.stat}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {activeConfig.visualPreview.statLabel}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">
                        {activeConfig.visualPreview.shellTitle}:
                      </strong>{" "}
                      {activeConfig.visualPreview.shellDesc}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">
                        {activeConfig.visualPreview.streamTitle}:
                      </strong>{" "}
                      {activeConfig.visualPreview.streamDesc}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Feature Highlights */}
              <div className="space-y-2.5 pt-1">
                {activeConfig.features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start gap-3"
                    >
                      <div
                        className={`p-1 rounded-md mt-0.5 shrink-0 ${
                          activeTab === "ppr"
                            ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                            : activeTab === "vertical"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-slate-900 dark:text-white">{feat.title}:</strong>{" "}
                        <span className="text-slate-600 dark:text-slate-300">{feat.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                React 19 Segment Engine
              </span>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs sm:text-sm ${
                  activeTab === "ppr"
                    ? "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10"
                    : activeTab === "vertical"
                    ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                    : "border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
                }`}
                asChild
              >
                <Link href={activeConfig.docHref}>
                  <span>{activeConfig.docLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Editor Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-[630px]">
            <CodeWindow
              filename={activeConfig.codeFile}
              code={activeConfig.codeSnippet}
              language="tsx"
              statusLeft="Native React 19 RSC Pipeline"
              statusRight="TypeScript 5+ Ready"
              className="h-[500px] sm:h-[540px] lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
