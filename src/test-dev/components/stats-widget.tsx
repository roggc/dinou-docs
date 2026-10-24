"use client";

import { useState } from "react";
import { Zap, Cpu, HardDrive, Radio, ShieldCheck, Play, Pause } from "lucide-react";

export function QuickActionButton({
  label,
  onTrigger,
}: {
  label: string;
  onTrigger?: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setPressed(true);
        onTrigger?.();
        setTimeout(() => setPressed(false), 300);
      }}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border ${
        pressed
          ? "bg-emerald-600 text-white border-emerald-500 scale-95"
          : "bg-card text-foreground border-slate-200 dark:border-slate-800 hover:border-emerald-500/50"
      }`}
    >
      {label}
    </button>
  );
}

export function StatsWidget({ title = "Dual-Engine Telemetry" }: { title?: string }) {
  const [load, setLoad] = useState(48);
  const [active, setActive] = useState(true);

  return (
    <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-emerald-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{title}</h4>
        </div>
        <button
          type="button"
          onClick={() => setActive(!active)}
          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-all ${
            active
              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
              : "bg-slate-200 dark:bg-slate-800 text-muted-foreground"
          }`}
        >
          {active ? "ONLINE" : "PAUSED"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Cpu className="h-3.5 w-3.5 text-cyan-500" />
            <span>Load simulation</span>
          </div>
          <span className="text-xl font-bold font-mono text-foreground">{load}%</span>
          <div className="mt-2 flex gap-1">
            <button
              type="button"
              onClick={() => setLoad((l) => Math.min(100, l + 15))}
              className="px-2 py-0.5 rounded bg-cyan-600 hover:bg-cyan-700 text-white text-[10px] font-bold"
            >
              +15%
            </button>
            <button
              type="button"
              onClick={() => setLoad((l) => Math.max(0, l - 15))}
              className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-bold"
            >
              -15%
            </button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <HardDrive className="h-3.5 w-3.5 text-amber-500" />
            <span>Zero-Disk Buffer</span>
          </div>
          <span className="text-xl font-bold font-mono text-foreground">In-Memory</span>
          <p className="text-[10px] text-muted-foreground mt-1">__DINOU_MEM_FILES__</p>
        </div>
      </div>
    </div>
  );
}

export function BenchmarkCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  const [pinned, setPinned] = useState(false);

  return (
    <div
      onClick={() => setPinned(!pinned)}
      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
        pinned
          ? "border-purple-500 bg-purple-500/10 shadow-sm"
          : "border-slate-200 dark:border-slate-800 bg-card hover:border-slate-400 dark:hover:border-slate-700"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        {pinned && <ShieldCheck className="h-3.5 w-3.5 text-purple-500" />}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-black font-mono text-foreground">{value}</span>
        <span className="text-[10px] font-mono text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

export function ClusterHealthBar({ health = 99.8 }: { health?: number }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs font-mono">
      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
      <span className="text-foreground font-bold">Cluster Sync Integrity:</span>
      <span className="text-blue-500 font-bold ml-auto">{health}%</span>
    </div>
  );
}
