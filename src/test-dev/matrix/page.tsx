"use client";

import { useState } from "react";
import { Grid, ArrowLeft, ArrowUpDown, Filter, Sparkles } from "lucide-react";
import { Link } from "dinou";

export default function MatrixArchitecturePageInverted() {
  const [filter, setFilter] = useState<"all" | "optimal" | "instant">("all");
  const [ascending, setAscending] = useState(true);

  const initialBenchmarks = [
    { metric: "Cold Start Dev Rebuild", timeMs: 18, time: "18 ms", status: "optimal" },
    { metric: "Fast Refresh Hook Patch", timeMs: 4, time: "4 ms", status: "instant" },
    { metric: "Server RSC Re-stream", timeMs: 12, time: "12 ms", status: "optimal" },
    { metric: "Route Scan [id] Registration", timeMs: 2, time: "2 ms", status: "instant" },
    { metric: "Multi-Module HMR Propagation", timeMs: 9, time: "9 ms", status: "instant" },
    { metric: "Native Edge SSR Hydration", timeMs: 15, time: "15 ms", status: "optimal" },
  ];

  const filtered = initialBenchmarks
    .filter((b) => filter === "all" || b.status === filter)
    .sort((a, b) => (ascending ? a.timeMs - b.timeMs : b.timeMs - a.timeMs));

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-blue-500/10 backdrop-blur-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Grid className="h-4 w-4" />
            Inverted to Client Component
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
            STATEFUL CLIENT RUNTIME
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Dinou Matrix Live Filter &amp; Sorter
        </h2>
        <p className="text-sm text-muted-foreground">
          This page was flipped from a static Server Component to a reactive Client Component.
        </p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-card border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-semibold">Filter:</span>
          {(["all", "instant", "optimal"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilter(mode)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                filter === mode
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAscending(!ascending)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          {ascending ? "Fastest First" : "Slowest First"}
        </button>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((b) => (
          <div
            key={b.metric}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card flex items-center justify-between transition-all hover:border-cyan-500/40"
          >
            <div>
              <span className="text-xs text-muted-foreground block">{b.metric}</span>
              <strong className="text-lg font-mono text-slate-900 dark:text-slate-100">{b.time}</strong>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border uppercase ${
                b.status === "instant"
                  ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800"
                  : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
              }`}
            >
              {b.status}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/test-dev"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to /test-dev
      </Link>
    </div>
  );
}
