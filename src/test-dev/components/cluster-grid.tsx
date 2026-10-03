"use client";

import { useState } from "react";
import { Server, Wifi, CheckCircle2, AlertCircle, RefreshCw, Cpu } from "lucide-react";

export interface ClusterNode {
  id: string;
  name: string;
  region: string;
  pingMs: number;
  status: "healthy" | "busy" | "standby";
}

export function NodePill({ node }: { node: ClusterNode }) {
  const styles = {
    healthy: "border-emerald-500/30 bg-emerald-500/5 text-emerald-500",
    busy: "border-amber-500/30 bg-amber-500/5 text-amber-500",
    standby: "border-slate-500/30 bg-slate-500/5 text-slate-400",
  };

  return (
    <div className={`p-3.5 rounded-xl border space-y-1.5 transition-all ${styles[node.status]}`}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5 text-current" />
          {node.name}
        </span>
        <span className="text-[10px] font-mono font-bold uppercase">{node.status}</span>
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <span>{node.region}</span>
        <span className="font-bold text-foreground">{node.pingMs}ms</span>
      </div>
    </div>
  );
}

export function ClusterMeshViewer() {
  const [nodes, setNodes] = useState<ClusterNode[]>([
    { id: "node-1", name: "Worker-EU-West", region: "Frankfurt", pingMs: 14, status: "healthy" },
    { id: "node-2", name: "Worker-US-East", region: "N. Virginia", pingMs: 82, status: "healthy" },
    { id: "node-3", name: "Worker-AP-South", region: "Singapore", pingMs: 145, status: "busy" },
    { id: "node-4", name: "Edge-Local-Dev", region: "Localhost", pingMs: 1, status: "healthy" },
  ]);

  const recomputePings = () => {
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        pingMs: Math.max(1, n.pingMs + Math.floor(Math.random() * 9) - 4),
      }))
    );
  };

  return (
    <div className="p-5 rounded-2xl border border-blue-500/30 bg-card space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-blue-500" />
          <h4 className="font-bold text-sm text-foreground">Cluster Mesh Topology</h4>
        </div>
        <button
          type="button"
          onClick={recomputePings}
          className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 font-bold transition-all"
        >
          <RefreshCw className="h-3 w-3" />
          Re-probe Mesh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node) => (
          <NodePill key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
