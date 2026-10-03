"use client";

import { useState } from "react";
import { Terminal, Send, CheckCircle2, AlertTriangle, Zap } from "lucide-react";

export function StatusPill({ status, label }: { status: "ready" | "busy" | "warn"; label: string }) {
  const styles = {
    ready: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    busy: "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse",
    warn: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${styles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function TerminalConsole() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Dinou HMR Stress Terminal initialized.",
    "Ready for user input commands.",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal.trim();
    setInputVal("");

    let reply = `Command not recognized: "${cmd}"`;
    if (cmd === "ping") reply = "pong! latency: <1ms";
    if (cmd === "status") reply = "All subsystems operational (Rollup + SWC + Dual-Bundle Engine).";
    if (cmd === "rollup") reply = "Rollup v4 watcher active. Tree-shaking enabled. ESM chunks live.";
    if (cmd === "clear") {
      setHistory(["Terminal cleared."]);
      return;
    }
    if (cmd === "turbo") reply = "Turbo mode toggled: 120 FPS Flight render cycle.";

    setHistory((prev) => [...prev.slice(-8), `$ ${cmd}`, `> ${reply}`]);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span className="font-bold text-[11px] text-white">Interactive Sub-Console (Named Export)</span>
        </div>
        <StatusPill status="ready" label="HOT_REFRESH_ACTIVE" />
      </div>

      <div className="h-32 overflow-y-auto space-y-1 font-mono text-[11px] pr-1">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={line.startsWith("$") ? "text-indigo-400" : line.startsWith(">") ? "text-emerald-400" : "text-slate-500"}
          >
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
        <span className="text-emerald-500 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Try 'ping', 'status', 'turbo' or 'clear'..."
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs"
        />
        <button
          type="submit"
          className="p-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 transition-colors"
          title="Send"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
