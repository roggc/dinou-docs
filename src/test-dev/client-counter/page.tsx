import { Cpu, Server, Calculator, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

interface ServerInvertedProps {
  serverTimestamp?: string;
  calculationEngine?: string;
  serverCalculations?: Array<{
    operation: string;
    result: string | number;
    executionMicroseconds: number;
  }>;
  serverHost?: {
    pid: number;
    nodeVersion: string;
    platform: string;
  };
}

export default function InvertedServerCounterPage({
  serverTimestamp = "N/A",
  calculationEngine = "Node.js Server",
  serverCalculations = [],
  serverHost,
}: ServerInvertedProps) {
  return (
    <div className="space-y-6">
      {/* Paradigm Inversion Banner */}
      <div className="p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-purple-500/10 backdrop-blur-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Server className="h-4 w-4" />
            PARADIGM INVERTED: Pure Server Component
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500 text-white font-bold">
            NO CLIENT JS
          </span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Client Page Was Converted to Server-Side Execution!
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          This route previously ran as a <code>&quot;use client&quot;</code> component with hooks and client bundle scripts. In this stress round, it has been <strong>completely converted into an asynchronous Server Component</strong> powered by <code>page_functions.ts</code>.
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground pt-1">
          <span className="px-2.5 py-1 rounded-md bg-background border border-slate-200 dark:border-slate-800">
            Engine: {calculationEngine}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-background border border-slate-200 dark:border-slate-800">
            PID: {serverHost?.pid}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-background border border-slate-200 dark:border-slate-800">
            Timestamp: {serverTimestamp}
          </span>
        </div>
      </div>

      {/* Server Calculations Table */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Pre-computed Server Workload
          </h3>
        </div>

        <div className="space-y-2">
          {serverCalculations.map((calc, i) => (
            <div
              key={calc.operation}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block sm:inline">
                  {calc.operation}
                </span>
                <span className="text-muted-foreground font-mono sm:ml-3 break-all">
                  &rarr; {calc.result}
                </span>
              </div>
              <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold shrink-0">
                {calc.executionMicroseconds} &micro;s
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="/test-dev"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to /test-dev
      </a>
    </div>
  );
}
