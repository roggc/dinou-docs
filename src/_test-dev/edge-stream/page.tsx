"use client";

import { useState, useEffect } from "react";
import { Link } from "dinou";
import { ArrowLeft, Zap, Sparkles, Layers, Box, Play, Pause, RefreshCw, Radio } from "lucide-react";

interface StreamItem {
  id: string;
  channel: string;
  payload: string;
  timestamp: string;
  latencyMs: number;
}

export default function EdgeStreamPageInverted() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [activeChannel, setActiveChannel] = useState<"all" | "rsc" | "flight" | "hmr">("all");
  const [items, setItems] = useState<StreamItem[]>([
    { id: "pkt-1", channel: "flight", payload: "React 19 Flight boundary serialized", timestamp: "00:01", latencyMs: 4 },
    { id: "pkt-2", channel: "rsc", payload: "Node SSR stream chunk received", timestamp: "00:02", latencyMs: 7 },
    { id: "pkt-3", channel: "hmr", payload: "Rollup WebSocket heartbeat acknowledged", timestamp: "00:03", latencyMs: 2 },
  ]);

  useEffect(() => {
    if (!isStreaming) return;
    const timer = setInterval(() => {
      const channels = ["rsc", "flight", "hmr"] as const;
      const ch = channels[Math.floor(Math.random() * channels.length)];
      const payloads = [
        "Chunk hash validated",
        "Slot boundary hydrated",
        "Micro-task cycle completed",
        "Memory file read from cache",
      ];
      const nextItem: StreamItem = {
        id: `pkt-${Date.now().toString().slice(-4)}`,
        channel: ch,
        payload: payloads[Math.floor(Math.random() * payloads.length)],
        timestamp: new Date().toLocaleTimeString(),
        latencyMs: Math.floor(Math.random() * 12) + 2,
      };

      setItems((prev) => [nextItem, ...prev.slice(0, 15)]);
    }, 1500);

    return () => clearInterval(timer);
  }, [isStreaming]);

  const filteredItems = items.filter((item) => activeChannel === "all" || item.channel === activeChannel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/test-dev"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:text-cyan-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Test Dev Hub
        </Link>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
          PARADIGM INVERTED: USE CLIENT
        </span>
      </div>

      <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-600 text-white shadow-md shadow-cyan-500/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Edge Stream: Client Inverted Pipeline
              </h1>
              <p className="text-xs text-muted-foreground">
                Invertido de Server Component a Client Component con simulación en tiempo real.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsStreaming(!isStreaming)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isStreaming
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-background border border-slate-200 dark:border-slate-800 text-muted-foreground"
              }`}
            >
              {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {isStreaming ? "Streaming Live" : "Stream Paused"}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          {(["all", "rsc", "flight", "hmr"] as const).map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => setActiveChannel(ch)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold capitalize transition-all ${
                activeChannel === ch
                  ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Stream List */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-slate-200 dark:border-slate-800 pb-2">
          <span>Captured Packets: {filteredItems.length}</span>
          <span className="font-mono text-[10px] text-cyan-500 font-bold">BUFFER CAPACITY: 16 SLOTS</span>
        </div>

        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                  {item.channel}
                </span>
                <span className="font-mono text-muted-foreground text-[11px]">{item.id}</span>
                <span className="text-foreground font-medium ml-2">{item.payload}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground font-mono">{item.timestamp}</span>
                <span className="font-mono text-[10px] font-bold text-emerald-500">{item.latencyMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
