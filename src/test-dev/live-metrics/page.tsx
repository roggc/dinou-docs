import { Link } from "dinou";
import { Cpu, Server, Activity, ArrowLeft, Clock, HardDrive, ShieldCheck } from "lucide-react";

interface LiveMetricsProps {
  serverTimestamp: string;
  uptimeSeconds: number;
  nodeVersion: string;
  platform: string;
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
}

export default function LiveMetricsPage(props: LiveMetricsProps) {
  const {
    serverTimestamp = new Date().toISOString(),
    uptimeSeconds = 0,
    nodeVersion = "unknown",
    platform = "win32",
    memoryUsage = { rss: 0, heapTotal: 0, heapUsed: 0, external: 0 },
  } = props || {};

  const heapUsedMb = Math.round((memoryUsage.heapUsed || 0) / 1024 / 1024);
  const heapTotalMb = Math.round((memoryUsage.heapTotal || 0) / 1024 / 1024);
  const rssMb = Math.round((memoryUsage.rss || 0) / 1024 / 1024);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/test-dev"
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Test Dev Hub
        </Link>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <ShieldCheck className="h-3.5 w-3.5" />
          RSC Server Rendered
        </span>
      </div>

      <div className="p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Dinou Server Metrics (RSC + page_functions)
            </h1>
            <p className="text-xs text-muted-foreground">
              Datos resueltos en Node.js mediante <code>getProps()</code> y entregados como Flight Payload.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Uptime del Proceso</span>
            <Clock className="h-4 w-4 text-emerald-500" />
          </div>
          <div suppressHydrationWarning className="text-2xl font-black text-foreground">{uptimeSeconds}s</div>
          <p className="text-[11px] text-muted-foreground">Segundos continuos sin reinicio</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Heap Usado</span>
            <HardDrive className="h-4 w-4 text-cyan-500" />
          </div>
          <div suppressHydrationWarning className="text-2xl font-black text-foreground">{heapUsedMb} <span className="text-sm font-normal text-muted-foreground">/ {heapTotalMb} MB</span></div>
          <p className="text-[11px] text-muted-foreground">RSS total: {rssMb} MB</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Node Version</span>
            <Cpu className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">{nodeVersion}</div>
          <p className="text-[11px] text-muted-foreground">Plataforma: {platform}</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Server Timestamp</span>
            <Activity className="h-4 w-4 text-indigo-500" />
          </div>
          <div suppressHydrationWarning className="text-xs font-mono text-foreground truncate">{serverTimestamp}</div>
          <p className="text-[11px] text-muted-foreground">Snapshot exacto del render</p>
        </div>
      </div>
    </div>
  );
}
