"use client";

import { useState } from "react";
import { Link } from "dinou";
import { Sparkles, Layers, Activity, ArrowRight, Gauge, Cpu, Flame, CheckCircle, RefreshCcw, Box, HardDrive, Terminal, Wifi, Atom, Zap, ShieldCheck } from "lucide-react";
import { DynamicCounter, LiveTelemetry, MiniBadge, LiveCpuIndicator, StatePreserveBox, PrecisionTimer, RollupSpeedometer } from "./components/counter";
import { StatsWidget, BenchmarkCard, ClusterHealthBar } from "./components/stats-widget";
import { MemoryGauge, SparklineChart } from "./components/memory-gauge";
import { TerminalConsole, StatusPill } from "./components/terminal-console";
import { RollupBenchmarkGrid, LatencyRadar } from "./components/rollup-benchmark";
import { ClusterMeshViewer } from "./components/cluster-grid";
import { QuantumMeshGrid, EntropyMeter, VectorWaveCard, FluxCapacitorGauge, SpinStateIndicator } from "./components/quantum-grid";

export default function TestDevPageClientInverted() {
  const [activeTab, setActiveTab] = useState<"controls" | "metrics" | "benchmark" | "mesh" | "quantum" | "telemetry" | "console">("quantum");
  const [sliderVal, setSliderVal] = useState(94);
  const [logs, setLogs] = useState<string[]>([
    "Round 3 Hyper-Stress: Quantum Vault RSC + Client registered",
    "Inverted /test-dev/server-data to Client Component with hook",
    "Compiled QuantumMeshGrid, EntropyMeter, VectorWaveCard",
    "PrecisionTimer & RollupSpeedometer mounted via HMR",
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  return (
    <div className="space-y-6">
      {/* Paradigm Inversion Hero */}
      <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-amber-500/10 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-md shadow-cyan-500/20">
              <Atom className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Stress Test: Rollup Round 3 (Hyper-Stress Engine)
              </h2>
              <p className="text-xs text-muted-foreground">
                Doble inversión RSC &harr; Client, rutas dinámicas calientes y 20+ named exports concurrentes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MiniBadge label="ROLLUP ROUND 3 LIVE" variant="success" />
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-600 text-white font-bold animate-pulse">
              HOT RELOAD ACTIVE
            </span>
          </div>
        </div>

        {/* Live CPU / Engine load indicator */}
        <LiveCpuIndicator />

        {/* Interactive Tab Controls */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          {(["quantum", "controls", "metrics", "benchmark", "mesh", "telemetry", "console"] as const).map((tab) => (
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
              {tab === "quantum" ? "⚛ Quantum (New)" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 0: New Quantum Hyper-Stress Components */}
      {activeTab === "quantum" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpinStateIndicator spin={0.5} />
            <FluxCapacitorGauge />
          </div>

          <QuantumMeshGrid />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EntropyMeter />
            <VectorWaveCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PrecisionTimer />
            <RollupSpeedometer />
          </div>
        </div>
      )}

      {/* Tab 1: Named Export Counter & Sliders & State Preservation */}
      {activeTab === "controls" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DynamicCounter initialCount={25} step={5} />

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
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>0% Safe</span>
                <span>50% Balanced</span>
                <span>100% Extreme</span>
              </div>
            </div>
          </div>

          <StatePreserveBox />
        </div>
      )}

      {/* Tab 2: Live Metrics */}
      {activeTab === "metrics" && (
        <div className="space-y-4">
          <ClusterHealthBar />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsWidget />
            <MemoryGauge />
          </div>
          <SparklineChart />
        </div>
      )}

      {/* Tab 3: Rollup Dual-Bundle Benchmark */}
      {activeTab === "benchmark" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RollupBenchmarkGrid />
            </div>
            <div>
              <LatencyRadar />
            </div>
          </div>
          <BenchmarkCard />
        </div>
      )}

      {/* Tab 4: Cluster Mesh Topology */}
      {activeTab === "mesh" && (
        <div className="space-y-4">
          <ClusterMeshViewer />
        </div>
      )}

      {/* Tab 5: Telemetry */}
      {activeTab === "telemetry" && (
        <div className="space-y-4">
          <LiveTelemetry />
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
            <h5 className="font-bold text-xs text-foreground flex items-center gap-2">
              <Wifi className="h-4 w-4 text-emerald-500" />
              Dynamic In-Memory Socket Telemetry
            </h5>
            <p className="text-xs text-muted-foreground">
              Broadcast channel synchronizes Fast Refresh updates in under 12ms.
            </p>
          </div>
        </div>
      )}

      {/* Tab 6: Interactive Console */}
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
            href="/test-dev/quantum-vault"
            className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-cyan-500 mb-0.5">QUANTUM VAULT (ROUND 3)</div>
            <div className="font-bold text-xs text-foreground">/quantum-vault &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">RSC + embedded client hooks</p>
          </Link>

          <Link
            href="/test-dev/server-data"
            className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-emerald-500 mb-0.5">INVERTED SERVER-DATA</div>
            <div className="font-bold text-xs text-foreground">/server-data &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">RSC &rarr; Client inversion</p>
          </Link>

          <Link
            href="/test-dev/cluster-mesh"
            className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:border-blue-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-blue-500 mb-0.5">CLUSTER MESH</div>
            <div className="font-bold text-xs text-foreground">/cluster-mesh &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Multi-node topology test</p>
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
