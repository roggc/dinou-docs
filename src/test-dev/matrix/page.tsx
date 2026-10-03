import { Grid, CheckCircle2, ArrowLeft, Layers, ShieldCheck, Zap } from "lucide-react";

export default function MatrixArchitecturePage() {
  const benchmarks = [
    { metric: "Cold Start Dev Rebuild", time: "18 ms", status: "Optimal" },
    { metric: "Fast Refresh Hook Patch", time: "4 ms", status: "Instant" },
    { metric: "Server RSC Re-stream", time: "12 ms", status: "Optimal" },
    { metric: "Route Scan [id] Registration", time: "2 ms", status: "Instant" },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-blue-500/10 backdrop-blur-sm space-y-3">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <Grid className="h-4 w-4" />
          Benchmark &amp; Matrix Route
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Dinou Runtime Dev Performance
        </h2>
        <p className="text-sm text-muted-foreground">
          Real-time measurement and execution characteristics under stress.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benchmarks.map((b) => (
          <div
            key={b.metric}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-muted-foreground block">{b.metric}</span>
              <strong className="text-lg font-mono text-slate-900 dark:text-slate-100">{b.time}</strong>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
              {b.status}
            </span>
          </div>
        ))}
      </div>

      <a
        href="/test-dev"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to /test-dev
      </a>
    </div>
  );
}
