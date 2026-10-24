import { Link } from "dinou";
import { ArrowLeft, Box, Server, Activity, Cpu, HardDrive } from "lucide-react";

interface TelemetryProps {
  bundlerName?: string;
  rssMb?: number;
  heapUsedMb?: number;
  heapTotalMb?: number;
  pid?: number;
  nodeVersion?: string;
  platform?: string;
  timestamp?: string;
}

export default function RollupTelemetryPage(props: TelemetryProps) {
  const {
    bundlerName = "Rollup",
    rssMb = 0,
    heapUsedMb = 0,
    heapTotalMb = 0,
    pid = 0,
    nodeVersion = "unknown",
    platform = "win32",
    timestamp = "N/A",
  } = props || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/test-dev"
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Test Dev Hub
        </Link>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
          ROLLUP RSC SERVER ROUTE
        </span>
      </div>

      <div className="p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-md shadow-amber-500/20">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Rollup Engine Telemetry (Freshly Added Route)
            </h1>
            <p className="text-xs text-muted-foreground">
              Datos generados en servidor mediante <code>getProps()</code> y transmitidos con React 19 Flight Payload.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Motor Activo</span>
            <Box className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-lg font-black text-foreground">{bundlerName}</div>
          <p className="text-[11px] text-muted-foreground">PID: {pid}</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Heap Usado</span>
            <HardDrive className="h-4 w-4 text-rose-500" />
          </div>
          <div suppressHydrationWarning className="text-2xl font-black text-foreground">{heapUsedMb} <span className="text-sm font-normal text-muted-foreground">/ {heapTotalMb} MB</span></div>
          <p className="text-[11px] text-muted-foreground">RSS total: {rssMb} MB</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Node Version</span>
            <Cpu className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">{nodeVersion}</div>
          <p className="text-[11px] text-muted-foreground">Plataforma: {platform}</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Server Timestamp</span>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <div suppressHydrationWarning className="text-xs font-mono text-foreground truncate">{timestamp}</div>
          <p className="text-[11px] text-muted-foreground">Snapshot exacto del render</p>
        </div>
      </div>
    </div>
  );
}
