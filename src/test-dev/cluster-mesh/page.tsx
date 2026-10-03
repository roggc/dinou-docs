import { Link } from "dinou";
import { ArrowLeft, Server, Activity, ShieldCheck, Wifi } from "lucide-react";
import { ClusterMeshViewer } from "../components/cluster-grid";

interface ClusterMeshProps {
  meshId?: string;
  activePeers?: number;
  packetLoss?: string;
  consensusState?: string;
  meshTimestamp?: string;
}

export default function ClusterMeshPage(props: ClusterMeshProps) {
  const {
    meshId = "mesh-primary",
    activePeers = 8,
    packetLoss = "0.0%",
    consensusState = "STABLE",
    meshTimestamp = "N/A",
  } = props || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/test-dev"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Test Dev Hub
        </Link>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
          MESH ROUTE
        </span>
      </div>

      <div className="p-6 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Wifi className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Cluster Mesh Routing Engine
            </h1>
            <p className="text-xs text-muted-foreground">
              Ruta recién generada en caliente combinando RSC Server Props con componentes interactivos cliente.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-1">
          <span className="text-xs text-muted-foreground">Topology ID</span>
          <div className="font-mono text-xs font-bold text-foreground">{meshId}</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-1">
          <span className="text-xs text-muted-foreground">Active Peers</span>
          <div className="font-mono text-xs font-bold text-blue-500">{activePeers} nodes</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-1">
          <span className="text-xs text-muted-foreground">Packet Loss</span>
          <div className="font-mono text-xs font-bold text-emerald-500">{packetLoss}</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-1">
          <span className="text-xs text-muted-foreground">Consensus</span>
          <div className="font-mono text-xs font-bold text-indigo-500">{consensusState}</div>
        </div>
      </div>

      <ClusterMeshViewer />
    </div>
  );
}
