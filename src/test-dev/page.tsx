"use client";

import { useState } from "react";
import { Link } from "dinou";
import { Sparkles, Layers, Activity, ArrowRight, Gauge, Cpu, Flame, CheckCircle, RefreshCcw, Box, HardDrive, Terminal, Wifi } from "lucide-react";
import { DynamicCounter, LiveTelemetry, MiniBadge, LiveCpuIndicator, StatePreserveBox } from "./components/counter";
import { StatsWidget, BenchmarkCard, ClusterHealthBar } from "./components/stats-widget";
import { MemoryGauge, SparklineChart } from "./components/memory-gauge";
import { TerminalConsole, StatusPill } from "./components/terminal-console";
import { RollupBenchmarkGrid, LatencyRadar } from "./components/rollup-benchmark";
import { ClusterMeshViewer } from "./components/cluster-grid";

export default function TestDevPageClientInverted() {
  const [activeTab, setActiveTab] = useState<"controls" | "metrics" | "benchmark" | "mesh" | "telemetry" | "console">("controls");
  const [sliderVal, setSliderVal] = useState(88);
  const [logs, setLogs] = useState<string[]>([
    "Round 2 Active: Edge Stream inverted to Client Component",
    "Deleted /test-dev/new-dynamic route dynamically",
    "Created /test-dev/cluster-mesh RSC + Client mesh viewer",
    "Added ClusterMeshViewer named export to Hub",
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  return (
    <div className="space-y-6">
      {/* Paradigm Inversion Hero */}
      <div className="p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-cyan-500/10 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white shadow-md shadow-amber-500/20">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Stress Test: Rollup Round 2 (Full Spectrum)
              </h2>
              <p className="text-xs text-muted-foreground">
                Inversión RSC &harr; Client, destrucción de rutas y 15+ named exports simultáneos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MiniBadge label="ROLLUP ROUND 2 LIVE" variant="warn" />
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-600 text-white font-bold animate-pulse">
              HOT RELOAD ACTIVE
            </span>
          </div>
        </div>

        {/* Live CPU / Engine load indicator */}
        <LiveCpuIndicator />

        {/* Interactive Tab Controls */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          {(["controls", "metrics", "benchmark", "mesh", "telemetry", "console"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                addLog(`Switched active tab to: ${tab}`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-background text-muted-foreground hover:text-foreground border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Named Export Counter & Sliders & State Preservation */}
      {activeTab === "controls" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DynamicCounter initialCount={10} step={2} />

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-amber-500" />
                  <h4 className="font-bold text-sm text-foreground">Interactive React State Hook</h4>
                </div>
                <span className="text-xs font-mono font-bold text-amber-500">{sliderVal}%</span>
              </div>

              <p className="text-xs text-muted-foreground">
                Ajusta el slider para comprobar la reactividad en Rollup sin pérdida de estado:
              </p>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSliderVal(val);
                  addLog(`Slider updated to ${val}%`);
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />

              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-600 h-2.5 rounded-full transition-all duration-150"
                  style={{ width: `${sliderVal}%` }}
                />
              </div>
            </div>
          </div>

          <StatePreserveBox />
        </div>
      )}

      {/* Tab 2: StatsWidget & MemoryGauge */}
      {activeTab === "metrics" && (
        <div className="space-y-4">
          <ClusterHealthBar health={99.9} />
          <StatsWidget title="Named Export: <StatsWidget />" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MemoryGauge heapMb={74} totalMb={128} />
            <div className="grid grid-cols-2 gap-3">
              <BenchmarkCard label="Rollup HMR" value="< 18" unit="ms" />
              <BenchmarkCard label="Memory Cache" value="100" unit="%" />
              <BenchmarkCard label="Active Routes" value="10" unit="slots" />
              <BenchmarkCard label="Named Modules" value="16" unit="symbols" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Rollup Benchmark Suite */}
      {activeTab === "benchmark" && (
        <RollupBenchmarkGrid />
      )}

      {/* Tab 4: Mesh Topology Viewer */}
      {activeTab === "mesh" && (
        <ClusterMeshViewer />
      )}

      {/* Tab 5: Telemetry & Event Stream */}
      {activeTab === "telemetry" && (
        <div className="space-y-4">
          <LiveTelemetry />
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-400">Live Stress Log Trace:</span>
              <button
                type="button"
                onClick={() => setLogs([])}
                className="text-[10px] text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            </div>
            {logs.length === 0 ? (
              <p className="text-slate-600 italic">No events logged yet.</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-amber-400/90 truncate">
                  &gt; {log}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Interactive Sub-Console */}
      {activeTab === "console" && (
        <TerminalConsole />
      )}

      {/* Subroutes Navigation Bar using Dinou Link */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-3">
        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
          <Box className="h-4 w-4 text-purple-500" />
          Deep &amp; Nested Router Showcase (SPA Link Navigation)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/test-dev/cluster-mesh"
            className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:border-blue-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-blue-500 mb-0.5">CLUSTER MESH (NEW)</div>
            <div className="font-bold text-xs text-foreground">/cluster-mesh &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Multi-node topology test</p>
          </Link>

          <Link
            href="/test-dev/edge-stream"
            className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-cyan-500 mb-0.5">INVERTED CLIENT</div>
            <div className="font-bold text-xs text-foreground">/edge-stream &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Real-time client pipeline</p>
          </Link>

          <Link
            href="/test-dev/rollup-telemetry"
            className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:border-amber-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-amber-500 mb-0.5">ROLLUP RSC</div>
            <div className="font-bold text-xs text-foreground">/rollup-telemetry &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Process metrics under Rollup</p>
          </Link>

          <Link
            href="/test-dev/deep/alpha/beta/gamma"
            className="p-3 rounded-xl border border-purple-500/30 bg-purple-500/5 hover:border-purple-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-purple-500 mb-0.5">CATCH-ALL SLUG</div>
            <div className="font-bold text-xs text-foreground">/deep/alpha/beta/gamma &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">3-segment dynamic catch-all</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
