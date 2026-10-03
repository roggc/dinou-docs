"use client";

import { useState } from "react";
import { Sparkles, Layers, Activity, ArrowRight, Gauge, Cpu, Flame, CheckCircle, RefreshCcw } from "lucide-react";
import { Counter } from "./components/counter";

export default function TestDevPageClientInverted() {
  const [activeTab, setActiveTab] = useState<"controls" | "matrix" | "logs">("controls");
  const [sliderVal, setSliderVal] = useState(75);
  const [logs, setLogs] = useState<string[]>([
    "Paradigm Inverted: /test-dev converted to 'use client'",
    "Component mounted successfully in browser runtime",
    "Dual-bundle client compiler active",
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  return (
    <div className="space-y-6">
      {/* Paradigm Inversion Hero */}
      <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-md shadow-cyan-500/20">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Page 1: INVERTED to Client Component!
              </h2>
              <p className="text-xs text-muted-foreground">
                Originally an RSC, this root page was flipped to <code>&quot;use client&quot;</code> in live dev.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500 text-white font-bold animate-pulse self-start sm:self-auto">
            LIVE CLIENT STATE ACTIVE
          </span>
        </div>

        {/* Interactive Tab Controls */}
        <div className="flex gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          {(["controls", "matrix", "logs"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                addLog(`Switched active tab to: ${tab}`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-background text-muted-foreground hover:text-foreground border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content 1: Controls */}
      {activeTab === "controls" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Gauge className="h-4 w-4 text-cyan-500" />
                Live Slider Stress Value: <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black">{sliderVal}%</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  const next = Math.floor(Math.random() * 100);
                  setSliderVal(next);
                  addLog(`Randomized slider to: ${next}%`);
                }}
                className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <RefreshCcw className="h-3 w-3" />
                Randomize
              </button>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-600"
            />

            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${sliderVal}%` }}
              />
            </div>
          </div>

          {/* Embedded Counter component */}
          <Counter initialCount={sliderVal} />
        </div>
      )}

      {/* Tab Content 2: Matrix Overview */}
      {activeTab === "matrix" && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-500" />
            Active Route Architecture Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-muted-foreground block text-[10px]">ROOT PAGE (/test-dev)</span>
              <strong className="text-cyan-600 dark:text-cyan-400">Client Component (&quot;use client&quot;)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-muted-foreground block text-[10px]">COUNTER PAGE (/test-dev/client-counter)</span>
              <strong className="text-amber-600 dark:text-amber-400">Server Component (RSC)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-muted-foreground block text-[10px]">DYNAMIC PAGE (/test-dev/new-dynamic/[id])</span>
              <strong className="text-purple-600 dark:text-purple-400">Nested Layout + Server Dynamic</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-muted-foreground block text-[10px]">STRESS TEST (/test-dev/stress-test)</span>
              <strong className="text-rose-600 dark:text-rose-400">Live Client Interval Ticks</strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Realtime Logs */}
      {activeTab === "logs" && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Event Stream ({logs.length})
            </h3>
            <button
              type="button"
              onClick={() => addLog("Manual ping event fired")}
              className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-mono"
            >
              + Send Ping
            </button>
          </div>
          <div className="space-y-1 font-mono text-xs">
            {logs.map((log, i) => (
              <div
                key={`${log}-${i}`}
                className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Route Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        <a
          href="/test-dev/client-counter"
          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-amber-500/60 transition-all block group"
        >
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">INVERTED TO RSC</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
            /client-counter &rarr;
          </h4>
          <p className="text-[11px] text-muted-foreground mt-1">Now pure server-rendered</p>
        </a>

        <a
          href="/test-dev/new-dynamic/stress-v2-live"
          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-purple-500/60 transition-all block group"
        >
          <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">DYNAMIC [id]</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-500 transition-colors">
            /new-dynamic/[id] &rarr;
          </h4>
          <p className="text-[11px] text-muted-foreground mt-1">3-level nested sublayout</p>
        </a>

        <a
          href="/test-dev/stress-test"
          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-rose-500/60 transition-all block group"
        >
          <div className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">REACTIVE INTERVAL</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-500 transition-colors">
            /stress-test &rarr;
          </h4>
          <p className="text-[11px] text-muted-foreground mt-1">Live second counters</p>
        </a>

        <a
          href="/test-dev/server-data"
          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card hover:border-emerald-500/60 transition-all block group"
        >
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">SERVER METRICS</div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
            /server-data &rarr;
          </h4>
          <p className="text-[11px] text-muted-foreground mt-1">getProps() inspection</p>
        </a>
      </div>
    </div>
  );
}
