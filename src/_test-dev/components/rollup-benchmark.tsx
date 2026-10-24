"use client";

import { useState, useEffect } from "react";
import { Zap, Gauge, Flame, Cpu, BarChart2, CheckCircle2, RotateCw } from "lucide-react";

export function LatencyRadar({ initialMs = 12 }: { initialMs?: number }) {
  const [latency, setLatency] = useState(initialMs);
  const [history, setHistory] = useState<number[]>([12, 14, 11, 15, 13, 10, 12, 11]);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = Math.floor(Math.random() * 8) + 8;
      setLatency(next);
      setHistory((prev) => [...prev.slice(-9), next]);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-rose-500" />
          <span className="font-bold text-xs text-foreground">Rollup HMR Latency Radar</span>
        </div>
        <span className="font-mono text-xs font-bold text-rose-500">{latency} ms</span>
      </div>

      <div className="flex items-end gap-1.5 h-10 pt-1">
        {history.map((val, idx) => (
          <div
            key={idx}
            className="flex-1 bg-gradient-to-t from-rose-600 to-amber-500 rounded-t transition-all duration-300"
            style={{ height: `${Math.min(100, Math.max(15, (val / 20) * 100))}%` }}
            title={`${val}ms`}
          />
        ))}
      </div>
    </div>
  );
}

export function WorkerThreadCard({ id, name, status = "active" }: { id: number; name: string; status?: string }) {
  const [ops, setOps] = useState(1240);

  useEffect(() => {
    const timer = setInterval(() => {
      setOps((prev) => prev + Math.floor(Math.random() * 50) + 10);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-indigo-500" />
          <span className="font-bold text-xs text-foreground">{name}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
          {status}
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">Throughput:</span>
        <span className="font-mono text-xs font-bold text-indigo-500">{ops.toLocaleString()} ops/s</span>
      </div>
    </div>
  );
}

export function RollupBenchmarkGrid() {
  const [cycle, setCycle] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">Rollup Engine Stress Test Suite</h4>
            <p className="text-xs text-muted-foreground">SWC transpiler + Rollup Watcher + ESM HMR WebSocket</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCycle((c) => c + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
        >
          <RotateCw className="h-3.5 w-3.5" />
          Cycle #{cycle}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LatencyRadar />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <WorkerThreadCard id={1} name="AST Transformer" />
          <WorkerThreadCard id={2} name="ESM Chunker" />
          <WorkerThreadCard id={3} name="Flight Serializer" />
          <WorkerThreadCard id={4} name="HMR Broadcaster" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PerformanceDial />
        <MemoryTrendChart />
      </div>
    </div>
  );
}

export function PerformanceDial({ initialScore = 98 }: { initialScore?: number }) {
  const [score, setScore] = useState(initialScore);

  return (
    <div className="p-4 rounded-2xl border border-indigo-500/20 bg-card flex items-center justify-between">
      <div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Rollup Health Index</span>
        <h5 className="font-bold text-sm text-foreground mt-0.5">Dual-Bundle Sync Fidelity</h5>
        <p className="text-xs text-muted-foreground mt-1">Zero dropped frames on slot switch</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-black font-mono text-indigo-500">{score}%</span>
        <button
          type="button"
          onClick={() => setScore(Math.floor(Math.random() * 5) + 95)}
          className="text-[10px] text-muted-foreground hover:text-indigo-400 underline mt-1"
        >
          Re-test
        </button>
      </div>
    </div>
  );
}

export function MemoryTrendChart() {
  const [samples] = useState([64, 68, 65, 72, 70, 74, 71, 75]);

  return (
    <div className="p-4 rounded-2xl border border-cyan-500/20 bg-card space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-foreground">Heap Trend (Rollup Dev Mode)</span>
        <span className="font-mono text-cyan-500 font-bold">{samples[samples.length - 1]} MB</span>
      </div>
      <div className="flex items-end gap-1.5 h-12 pt-2">
        {samples.map((val, idx) => (
          <div
            key={idx}
            className="flex-1 bg-cyan-500/80 hover:bg-cyan-400 rounded-t transition-all"
            style={{ height: `${(val / 80) * 100}%` }}
            title={`${val} MB`}
          />
        ))}
      </div>
    </div>
  );
}

