"use client";

import { useState, useEffect } from "react";
import { Atom, Zap, Compass, RefreshCw, Radio, ShieldCheck, Activity } from "lucide-react";

export function SpinStateIndicator({ spin = 0.5 }: { spin?: number }) {
  const [activeSpin, setActiveSpin] = useState(spin);
  const [isSuperposition, setIsSuperposition] = useState(false);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
      <div className={`p-2 rounded-lg bg-cyan-600 text-white ${isSuperposition ? "animate-spin" : ""}`}>
        <Atom className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-bold text-foreground">Quantum Spin State</div>
        <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
          State: {isSuperposition ? "|ψ⟩ = 1/√2(|↑⟩ + |↓⟩)" : activeSpin > 0 ? "|↑⟩ Spin Up (+½)" : "|↓⟩ Spin Down (-½)"}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsSuperposition(!isSuperposition);
          if (!isSuperposition) setActiveSpin((s) => -s);
        }}
        className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-[10px] font-bold transition-transform active:scale-95"
      >
        {isSuperposition ? "Collapse" : "Entangle"}
      </button>
    </div>
  );
}

export function EntropyMeter() {
  const [entropy, setEntropy] = useState(42.8);

  useEffect(() => {
    const timer = setInterval(() => {
      setEntropy((e) => Number((e + (Math.random() * 0.4 - 0.2)).toFixed(2)));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
          <Activity className="h-3.5 w-3.5" /> Thermodynamic Entropy
        </span>
        <span className="font-mono font-bold text-xs">{entropy} J/K</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-purple-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(10, entropy))}%` }}
        />
      </div>
    </div>
  );
}

export function VectorWaveCard() {
  const [frequency, setFrequency] = useState(144);

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-emerald-500" />
          <h5 className="font-bold text-xs text-foreground">Vector Wave Frequency</h5>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-500">{frequency} MHz</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFrequency((f) => Math.max(10, f - 24))}
          className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-xs font-bold"
        >
          -24
        </button>
        <button
          type="button"
          onClick={() => setFrequency((f) => f + 24)}
          className="px-2 py-1 rounded bg-emerald-600 text-white text-xs font-bold"
        >
          +24 MHz
        </button>
        <button
          type="button"
          onClick={() => setFrequency(144)}
          className="px-2 py-1 rounded text-muted-foreground hover:text-foreground text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export function FluxCapacitorGauge() {
  const [gigawatts, setGigawatts] = useState(1.21);

  return (
    <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
          <Zap className="h-3.5 w-3.5" /> Flux Capacitor
        </span>
        <span className="font-mono font-bold">{gigawatts} GW</span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setGigawatts((g) => Number((g + 0.1).toFixed(2)))}
          className="flex-1 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold transition-all"
        >
          Surge Power
        </button>
        <button
          type="button"
          onClick={() => setGigawatts(1.21)}
          className="px-3 py-1 rounded border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold"
        >
          1.21 GW
        </button>
      </div>
    </div>
  );
}

export function QuantumMeshGrid() {
  const [nodes, setNodes] = useState([
    { id: "Q-Alpha", coherence: 98, status: "locked" },
    { id: "Q-Beta", coherence: 94, status: "entangled" },
    { id: "Q-Gamma", coherence: 89, status: "locked" },
    { id: "Q-Delta", coherence: 99, status: "superconducting" },
  ]);

  const cycleCoherence = () => {
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        coherence: Math.min(100, Math.max(70, n.coherence + (Math.floor(Math.random() * 7) - 3))),
      }))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-cyan-500 animate-pulse" />
          <h4 className="font-bold text-sm text-foreground">Coherent Quantum Nodes</h4>
        </div>
        <button
          type="button"
          onClick={cycleCoherence}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Re-Coherency Pulse
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node) => (
          <div key={node.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-foreground">{node.id}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/20">
                {node.status}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-muted-foreground">Coherence:</span>
              <span className="font-mono font-extrabold text-sm text-cyan-500">{node.coherence}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
