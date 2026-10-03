"use client";

import { useState, useEffect } from "react";
import { Zap, Flame, Cpu, ArrowLeft, RefreshCw } from "lucide-react";

export default function StressTestPage() {
  const [ticks, setTicks] = useState(0);
  const [items, setItems] = useState<string[]>(["Batch Alpha", "Batch Beta"]);

  useEffect(() => {
    const timer = setInterval(() => setTicks((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const addBatch = () => {
    const name = `Live Item #${items.length + 1} (${new Date().toLocaleTimeString()})`;
    setItems((prev) => [name, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-purple-500/10 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-xs tracking-wider uppercase">
            <Flame className="h-4 w-4" />
            Newly Created Route: /test-dev/stress-test
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-500 text-white font-bold animate-pulse">
            LIVE TICK: {ticks}s
          </span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Client Reactivity Stress Lab
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          This route was created in real-time while you were browsing. It tests rapid state generation, timer intervals, and DOM updates in Dinou&apos;s dev server environment.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={addBatch}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-transform flex items-center gap-1.5"
          >
            <Zap className="h-3.5 w-3.5" />
            Inject New Live Item
          </button>
          <span className="text-xs font-mono text-muted-foreground">
            Items in memory: {items.length}
          </span>
        </div>
      </div>

      {/* Rendered Items */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-3">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Real-time Injected Elements ({items.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between"
            >
              <span>{item}</span>
              <span className="text-[10px] text-rose-500 font-bold">READY</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="/test-dev"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to /test-dev
      </a>
    </div>
  );
}
