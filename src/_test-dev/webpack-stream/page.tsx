import { Link } from "dinou";
import { ArrowLeft, Layers, Server, Activity, Database, Flame } from "lucide-react";
import { WebpackStressCard } from "../components/counter";

interface WebpackStreamProps {
  streamSource?: string;
  timestamp?: string;
  compilerStats?: {
    tool: string;
    mode: string;
    memoryFiles: number;
    activeSockets: number;
  };
}

export default function WebpackStreamPage({
  streamSource = "Webpack",
  timestamp = "",
  compilerStats = { tool: "webpack", mode: "dev", memoryFiles: 0, activeSockets: 0 },
}: WebpackStreamProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/test-dev"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Test Hub
        </Link>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold">
          NEW WEBPACK ROUTE
        </span>
      </div>

      <div className="p-6 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Webpack Live In-Memory Pipeline ({compilerStats.tool.toUpperCase()})
            </h2>
            <p className="text-xs text-muted-foreground">
              RSC renderizado mediante react-server-dom-webpack con cero escrituras a disco.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Genesis (SSR)</div>
            <div className="font-mono text-xs font-bold truncate">{timestamp || "Live"}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Compiler Mode</div>
            <div className="font-mono text-xs font-bold text-rose-500">
              {compilerStats.mode}
            </div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Memory Files</div>
            <div className="font-mono text-xs font-bold">{compilerStats.memoryFiles} files</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Sockets</div>
            <div className="font-mono text-xs font-bold">{compilerStats.activeSockets} active</div>
          </div>
        </div>
      </div>

      <WebpackStressCard />
    </div>
  );
}
