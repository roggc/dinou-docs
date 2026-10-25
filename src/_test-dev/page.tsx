"use client";

import { useState } from "react";
import { Link } from "dinou";
import { Sparkles, Layers, Activity, ArrowRight, Gauge, Cpu, Flame, CheckCircle, RefreshCcw, Box, HardDrive, Terminal, Wifi, Atom, Zap, ShieldCheck } from "lucide-react";
import { DynamicCounter, LiveTelemetry, MiniBadge, LiveCpuIndicator, StatePreserveBox, PrecisionTimer, RollupSpeedometer, WebpackStressCard } from "./components/counter";
import { StatsWidget, BenchmarkCard, ClusterHealthBar } from "./components/stats-widget";
import { MemoryGauge, SparklineChart } from "./components/memory-gauge";
import { TerminalConsole, StatusPill } from "./components/terminal-console";
import { RollupBenchmarkGrid, LatencyRadar } from "./components/rollup-benchmark";
import { ClusterMeshViewer } from "./components/cluster-grid";
import { QuantumMeshGrid, EntropyMeter, VectorWaveCard, FluxCapacitorGauge, SpinStateIndicator, SuperconductingRing } from "./components/quantum-grid";
import { LiveStressBox } from "./components/live-stress-box";

export default function TestDevPageClientInverted() {
  const [activeTab, setActiveTab] = useState<"webpack" | "quantum" | "controls" | "metrics" | "benchmark" | "mesh" | "telemetry" | "console">("webpack");
  const [sliderVal, setSliderVal] = useState(99);
  const [edgeLinkClicks, setEdgeLinkClicks] = useState(0);
  const [lastClickedLink, setLastClickedLink] = useState("Ninguno todavía");
  const [logs, setLogs] = useState<string[]>([
    "Webpack 5 Engine Active: In-memory compiler pipeline running",
    "Inverted /test-dev/cluster-mesh to Client Component with scale hooks",
    "Mounted WebpackStressCard & SuperconductingRing",
    "Created /test-dev/webpack-stream dynamic RSC route",
  ]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  return (
    <div className="space-y-6">
      {/* Paradigm Inversion Hero */}
      <div className="p-6 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-cyan-500/10 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md shadow-rose-500/20">
              <Flame className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                ⚡ LIVE HMR TEST: Sesión en Caliente Activa 🚀
              </h2>
              <p className="text-xs text-rose-500 font-semibold dark:text-rose-400">
                Fast Refresh Activo &bull; Sin recarga de página &bull; Edición en tiempo real por el agente
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MiniBadge label="WEBPACK 5 LIVE" variant="warn" />
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-600 text-white font-bold animate-pulse">
              HOT RELOAD ACTIVE
            </span>
          </div>
        </div>

        {/* Live CPU / Engine load indicator */}
        <LiveCpuIndicator />

        {/* Brand new component created live */}
        <LiveStressBox />

        {/* Interactive Tab Controls */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          {(["webpack", "quantum", "controls", "metrics", "benchmark", "mesh", "telemetry", "console"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                addLog(`Switched active tab to: ${tab}`);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-background text-muted-foreground hover:text-foreground border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab === "webpack" ? "🔥 Webpack (New)" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 0: New Webpack Stress Components */}
      {activeTab === "webpack" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WebpackStressCard />
            <SuperconductingRing />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PrecisionTimer />
            <RollupSpeedometer />
          </div>

          {/* Edge Case Link Sandbox */}
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-500" />
                <h4 className="font-bold text-sm text-foreground">
                  Dinou Link Edge Cases Sandbox (v2 Composed Click)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                CLICKS: {edgeLinkClicks}
              </span>
            </div>

            <p className="text-xs text-muted-foreground">
              Comprueba la tolerancia y robustez del componente <code>&lt;Link /&gt;</code> ante props vacías o ausentes. Al hacer clic no debe arrojar error ni recargar la página.
            </p>

            <div className="text-xs font-mono text-foreground">
              Último link clicado: <strong className="text-amber-500">{lastClickedLink}</strong>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <Link
                href=""
                onClick={() => {
                  setEdgeLinkClicks((c) => c + 1);
                  setLastClickedLink('Link 1 (href="")');
                  addLog('Clic en Link con href=""');
                }}
                className="p-3.5 rounded-xl border border-amber-500/30 bg-card hover:bg-amber-500/10 text-center block transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <div className="text-[10px] font-mono font-bold text-amber-500">CASO 1</div>
                <div className="text-xs font-bold text-foreground">Link con href=""</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">String vacía</div>
              </Link>

              <Link
                to=""
                onClick={() => {
                  setEdgeLinkClicks((c) => c + 1);
                  setLastClickedLink('Link 2 (to="")');
                  addLog('Clic en Link con to=""');
                }}
                className="p-3.5 rounded-xl border border-orange-500/30 bg-card hover:bg-orange-500/10 text-center block transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <div className="text-[10px] font-mono font-bold text-orange-500">CASO 2</div>
                <div className="text-xs font-bold text-foreground">Link con to=""</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Alias to vacío</div>
              </Link>

              <Link
                onClick={() => {
                  setEdgeLinkClicks((c) => c + 1);
                  setLastClickedLink('Link 3 (sin href ni to)');
                  addLog('Clic en Link sin href ni to');
                }}
                className="p-3.5 rounded-xl border border-purple-500/30 bg-card hover:bg-purple-500/10 text-center block transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <div className="text-[10px] font-mono font-bold text-purple-500">CASO 3</div>
                <div className="text-xs font-bold text-foreground">Link sin href ni to</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Props ausentes (undefined)</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Quantum Hyper-Stress Components */}
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
        </div>
      )}

      {/* Tab 2: Named Export Counter & Sliders & State Preservation */}
      {activeTab === "controls" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DynamicCounter initialCount={50} step={10} />

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-amber-500" />
                  <h4 className="font-bold text-sm text-foreground">Interactive React State Hook</h4>
                </div>
                <span className="text-xs font-mono font-bold text-amber-500">{sliderVal}%</span>
              </div>

              <p className="text-xs text-muted-foreground">
                Ajusta el slider para comprobar la reactividad en Webpack sin pérdida de estado:
              </p>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
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

      {/* Tab 3: Live Metrics */}
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

      {/* Tab 4: Rollup Dual-Bundle Benchmark */}
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

      {/* Tab 5: Cluster Mesh Topology */}
      {activeTab === "mesh" && (
        <div className="space-y-4">
          <ClusterMeshViewer />
        </div>
      )}

      {/* Tab 6: Telemetry */}
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

      {/* Tab 7: Interactive Console */}
      {activeTab === "console" && (
        <TerminalConsole />
      )}

      {/* Subroutes Navigation Bar using Dinou Link */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-3">
        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
          <Box className="h-4 w-4 text-rose-500" />
          Deep &amp; Nested Router Showcase (SPA Link Navigation)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/test-dev/webpack-stream"
            className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/5 hover:border-rose-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-rose-500 mb-0.5">WEBPACK STREAM (NEW)</div>
            <div className="font-bold text-xs text-foreground">/webpack-stream &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Live in-memory RSC stream</p>
          </Link>

          <Link
            href="/test-dev/cluster-mesh"
            className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:border-blue-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-blue-500 mb-0.5">INVERTED CLIENT MESH</div>
            <div className="font-bold text-xs text-foreground">/cluster-mesh &rarr;</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Inverted to Client Component</p>
          </Link>

          <Link
            href="/test-dev/quantum-vault"
            className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500 transition-all block"
          >
            <div className="text-[10px] font-bold text-cyan-500 mb-0.5">QUANTUM VAULT</div>
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
        </div>
      </div>
    </div>
  );
}
