"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, RotateCcw, Sparkles, Activity, Tag } from "lucide-react";

export function MiniBadge({ label, variant = "info" }: { label: string; variant?: "info" | "success" | "warn" }) {
  const styles = {
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warn: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${styles[variant]}`}>
      <Tag className="h-3 w-3" />
      {label}
    </span>
  );
}

export function LiveTelemetry() {
  const [ticks, setTicks] = useState(0);

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
        <span>Telemetry Ticks: <strong className="text-emerald-400">{ticks}</strong></span>
      </div>
      <button
        type="button"
        onClick={() => setTicks((t) => t + 1)}
        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] transition-all"
      >
        Ping Engine
      </button>
    </div>
  );
}

export function DynamicCounter({ initialCount = 0, step = 2 }: { initialCount?: number; step?: number }) {
  const [count, setCount] = useState(initialCount);
  const [multiplier, setMultiplier] = useState(1);

  return (
    <div className="p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Named Export: &lt;DynamicCounter /&gt;
          </h4>
        </div>
        <MiniBadge label={`Step: ${step}`} variant="info" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 min-w-[70px]">
          {count}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCount((c) => c + step * multiplier)}
            className="flex items-center justify-center h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-transform active:scale-95 shadow-sm"
          >
            <Plus className="h-4 w-4 mr-1" /> +{step * multiplier}
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => c - step * multiplier)}
            className="flex items-center justify-center h-10 w-10 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMultiplier((m) => (m === 1 ? 5 : 1))}
            className={`h-10 px-3 rounded-lg font-bold text-xs transition-all ${
              multiplier === 5
                ? "bg-amber-500 text-white"
                : "border border-slate-300 dark:border-slate-700 text-muted-foreground"
            }`}
          >
            {multiplier === 5 ? "Boost x5 Active!" : "Boost x5"}
          </button>
          <button
            type="button"
            onClick={() => { setCount(0); setMultiplier(1); }}
            className="flex items-center justify-center h-10 w-10 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function LiveCpuIndicator() {
  const [load, setLoad] = useState(24);
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border-2 border-fuchsia-500/50 bg-gradient-to-r from-purple-950/40 via-fuchsia-950/20 to-indigo-950/40 font-mono text-xs shadow-xl transition-all">
      <div className="flex items-center gap-2.5">
        <div className="w-3.5 h-3.5 rounded-full bg-fuchsia-400 animate-bounce" />
        <span className="font-extrabold text-fuchsia-400 tracking-wide">🎉 ¡ESTADO PRESERVADO CON ÉXITO!</span>
        <span className="text-slate-300">Load:</span>
        <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-200 font-black text-sm">{load}%</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          onClick={() => setClickCount((c) => c + 1)}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-extrabold text-xs shadow-md shadow-rose-500/30 transition-transform active:scale-95"
        >
          🔥 Conservado en: {clickCount} (¡Haz clic para sumar!)
        </button>
        <button
          type="button"
          onClick={() => setLoad(Math.floor(Math.random() * 60) + 20)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-fuchsia-300 font-bold border border-fuchsia-500/40 transition-all text-[11px]"
        >
          Re-sample Load
        </button>
      </div>
    </div>
  );
}

export function StatePreserveBox() {
  const [text, setText] = useState("Rollup HMR preserves this input text without reset");

  return (
    <div className="p-3.5 rounded-xl border border-indigo-500/20 bg-card space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-foreground">State Preservation Probe:</span>
        <span className="text-[10px] font-mono text-indigo-500 font-bold">REACT FAST REFRESH</span>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
}

export function PrecisionTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((e) => e + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Precision Frame Chronometer</span>
        <span className="font-mono text-sm font-extrabold text-foreground">{(elapsed / 1000).toFixed(2)}s</span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 py-1 rounded text-xs font-bold text-white transition-all ${
            isRunning ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => { setIsRunning(false); setElapsed(0); }}
          className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export function RollupSpeedometer() {
  const [speed, setSpeed] = useState(120);

  return (
    <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Transform Velocity</span>
        <span className="font-mono text-sm font-bold text-foreground">{speed} ops/sec</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="10"
          max="500"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-cyan-600"
        />
      </div>
    </div>
  );
}

export function WebpackStressCard() {
  const [bundlesCount, setBundlesCount] = useState(42);
  const [cacheHits, setCacheHits] = useState(99.4);

  return (
    <div className="p-6 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-rose-500" />
          <h4 className="font-bold text-sm text-foreground">Webpack 5 Dual-Bundle In-Memory Probe</h4>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
          REACT SERVER DOM WEBPACK
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        Comprueba la reactividad de hooks en caliente mientras Webpack gestiona el React Server Plugin.
      </p>
      <div className="flex items-center justify-between pt-1">
        <div className="text-xs font-mono">
          Chunks en memoria: <strong className="text-rose-500">{bundlesCount}</strong>
        </div>
        <div className="text-xs font-mono">
          Cache hit ratio: <strong className="text-emerald-500">{cacheHits}%</strong>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setBundlesCount((b) => b + 1);
            setCacheHits((c) => Number(Math.min(99.9, c + 0.1).toFixed(1)));
          }}
          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all active:scale-95"
        >
          Simulate Hot Update (+1 Chunk)
        </button>
      </div>
    </div>
  );
}



