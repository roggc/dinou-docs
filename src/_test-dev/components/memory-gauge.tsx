"use client";

import { useState, useEffect } from "react";
import { Activity, HardDrive, BarChart3, Wifi } from "lucide-react";

export function SparklineChart({ points = [12, 18, 14, 25, 30, 22, 28, 35] }: { points?: number[] }) {
  const max = Math.max(...points, 40);
  const min = Math.min(...points, 0);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-1.5 h-12 pt-2">
      {points.map((val, idx) => {
        const heightPct = Math.round(((val - min) / range) * 100);
        return (
          <div
            key={idx}
            className="flex-1 bg-gradient-to-t from-cyan-600 to-indigo-500 rounded-t transition-all duration-300"
            style={{ height: `${Math.max(15, heightPct)}%` }}
            title={`Sample ${idx + 1}: ${val}ms`}
          />
        );
      })}
    </div>
  );
}

export function MemoryGauge({ heapMb = 64, totalMb = 128 }: { heapMb?: number; totalMb?: number }) {
  const [val, setVal] = useState(heapMb);

  useEffect(() => {
    const timer = setInterval(() => {
      setVal((v) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(30, Math.min(110, v + delta));
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const pct = Math.round((val / totalMb) * 100);

  return (
    <div className="p-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="h-4 w-4 text-cyan-500" />
          <span className="font-bold text-xs text-foreground">Heap Allocation</span>
        </div>
        <span className="font-mono text-xs font-bold text-cyan-500">{val} / {totalMb} MB</span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <SparklineChart points={[val - 10, val - 4, val + 2, val - 1, val + 5, val]} />
    </div>
  );
}
