"use client";

import { useState } from "react";
import {
  Zap,
  Terminal,
  RefreshCw,
  CheckCircle2,
  Cpu,
  Sparkles,
  ArrowRight,
  Boxes,
  ShieldCheck,
  ShieldAlert,
  Flame,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";
import { CodeWindow } from "./code-window";

type DxTab = "hmr" | "compiler" | "recovery";

interface TabConfig {
  id: DxTab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile: string;
  codeSnippet: string;
  language: string;
  features: {
    icon: typeof Zap;
    title: string;
    desc: string;
  }[];
  stat: string;
  statLabel: string;
}

const tabConfigs: Record<DxTab, TabConfig> = {
  hmr: {
    id: "hmr",
    title: "1. Sub-5ms Hot Reloading",
    badge: "Instant State Preservation",
    badgeColor: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    headline: "Instant HMR That Never Drops Component State",
    description:
      "Dinou's custom WebSocket HMR server and React Refresh integration patch updates into your running application in under 5 milliseconds. Active form fields, counters, and scroll positions stay perfectly intact.",
    codeFile: "src/components/counter.tsx",
    language: "tsx",
    codeSnippet: `"use client";

import { useState } from "react";

export function Counter() {
  // ✅ State is 100% preserved during live component editing!
  const [count, setCount] = useState(42);

  return (
    <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
      <span className="text-3xl font-bold font-mono text-amber-400">{count}</span>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl transition-colors"
      >
        Increment
      </button>
    </div>
  );
}`,
    features: [
      {
        icon: Zap,
        title: "Sub-5ms Hot Patching",
        desc: "WebSocket-driven module replacement pushes changes without full page reloads.",
      },
      {
        icon: CheckCircle2,
        title: "Zero State Loss",
        desc: "React Refresh boundaries preserve component state, timers, and client inputs.",
      },
      {
        icon: Cpu,
        title: "Surgical Cache Invalidation",
        desc: "Dependency manifests track exact module trees to avoid redundant work.",
      },
    ],
    stat: "< 5ms",
    statLabel: "Average HMR Patch Latency",
  },
  compiler: {
    id: "compiler",
    title: "2. Zero-Fork In-Process Dev",
    badge: "150ms Cold Starts",
    badgeColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    headline: "In-Memory Dual-Bundle Architecture",
    description:
      "Eliminate the memory bloat of multi-process dev servers. Dinou compiles client components and server Flight streams in the same process memory space, cutting startup latency to under 150ms.",
    codeFile: "terminal / dinou dev",
    language: "bash",
    codeSnippet: `$ dinou dev

  [dinou v7.0.0] Ready in 142ms
  ▲ Local:   http://localhost:3000
  ▲ Network: http://192.168.1.45:3000

  ✓ Route scanner registered 34 routes (< 2ms)
  ✓ Dual-Bundle AOT compiler initialized in memory
  ✓ WebSocket HMR engine active on :3001
  ✓ React 19 Flight runtime listening for connections

  [HMR] Updated /src/components/counter.tsx in 3.4ms`,
    features: [
      {
        icon: Terminal,
        title: "150ms Cold Start",
        desc: "Instant server readiness without waiting for massive background bundle graphs.",
      },
      {
        icon: Boxes,
        title: "0-Fork Memory Mapping",
        desc: "Client and Server ASTs compile in-process with zero disk thrashing.",
      },
      {
        icon: Sparkles,
        title: "Instant Route Scanner",
        desc: "Adding or removing files updates `.dinou/routes.d.ts` in less than 2ms.",
      },
    ],
    stat: "142ms",
    statLabel: "Cold Server Startup Time",
  },
  recovery: {
    id: "recovery",
    title: "3. Resilient Error Recovery",
    badge: "Auto-Recovering Dev",
    badgeColor: "border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10",
    headline: "Pinpoint Error Diagnostics with Instant Auto-Resume",
    description:
      "Syntax errors and Flight serialization issues are intercepted with exact source-mapped line indicators. Saving your fix immediately dismisses the overlay and resumes execution without a manual browser refresh.",
    codeFile: "src/components/banner.tsx",
    language: "tsx",
    codeSnippet: `// Dinou development overlay intercepts flight serialization errors:
//
// [Dinou Flight Serialization Warning]
// src/components/banner.tsx:14:7
//
//   12 | export function Banner({ onClick }: BannerProps) {
//   13 |   return (
// > 14 |     <div className="banner">
//      |     ^ Functions cannot be passed directly to Server Components.
//      |       Mark the component with 'use client' or convert to a Server Function.
//
// Hot auto-recovering upon save... Resumed in 4.1ms.`,
    features: [
      {
        icon: ShieldAlert,
        title: "Flight Serialization Checks",
        desc: "Immediate feedback when passing non-serializable props across the server-client wire.",
      },
      {
        icon: RefreshCw,
        title: "Instant Auto-Resume",
        desc: "Fixing code clears the dev overlay automatically without touching browser reload.",
      },
      {
        icon: ShieldCheck,
        title: "React StrictMode Parity",
        desc: "Catch side-effects and purity bugs early for seamless React Compiler compliance.",
      },
    ],
    stat: "0 Reloads",
    statLabel: "Required on Error Fixes",
  },
};

export function DxShowcase() {
  const [activeTab, setActiveTab] = useState<DxTab>("hmr");
  const activeConfig = tabConfigs[activeTab];

  return (
    <section
      id="dx"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 backdrop-blur-sm font-medium"
          >
            <Flame className="w-3.5 h-3.5 mr-1.5 inline-block text-amber-500" />
            Developer Velocity
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Lightning-Fast Developer Experience.{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Instant Iteration.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 md:text-lg leading-relaxed">
            Built from scratch for sub-millisecond Hot Module Replacement (HMR), zero-fork in-memory compilation, instant route scanning, and instant terminal feedback.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm gap-1 max-w-full overflow-x-auto">
            {(
              [
                { id: "hmr", label: "1. Sub-5ms HMR", icon: Zap },
                { id: "compiler", label: "2. Zero-Fork In-Process", icon: Terminal },
                { id: "recovery", label: "3. Resilient Error Recovery", icon: RefreshCw },
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
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-bold"
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

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Feature Narrative & Highlights */}
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

            {/* Metric Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Developer Benchmark
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  Verified v7
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-600 dark:text-amber-400">
                  {activeConfig.stat}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {activeConfig.statLabel}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {activeConfig.features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0">
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

            {/* Link to Docs */}
            <div>
              <Button
                variant="link"
                size="sm"
                className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 p-0 h-auto font-medium"
                asChild
              >
                <Link href="/docs/getting-started" className="inline-flex items-center gap-1.5">
                  <span>Start developing with Dinou in 60s</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Window with Syntax Highlighting */}
          <div className="lg:col-span-7">
            <CodeWindow
              filename={activeConfig.codeFile}
              code={activeConfig.codeSnippet}
              language={activeConfig.language}
              statusLeft="Dinou In-Process Dev Server"
              statusRight="WebSocket HMR Active"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
