import { Server, Database, Cpu, ArrowLeft, RefreshCw } from "lucide-react";

interface ServerDataProps {
  serverTimestamp?: string;
  systemInfo?: {
    nodeVersion: string;
    platform: string;
    arch: string;
    pid: number;
    uptimeSeconds: number;
  };
  mockDatabaseItems?: Array<{
    id: string;
    name: string;
    status: string;
    latencyMs: number;
  }>;
}

export default function ServerDataPage({
  serverTimestamp = "N/A",
  systemInfo,
  mockDatabaseItems = [],
}: ServerDataProps) {
  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="p-6 rounded-2xl border border-emerald-500/20 bg-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Page 3: Server Component with getProps()
            </h2>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            src/test-dev/server-data/page_functions.ts
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          This page receives its data exclusively through <code>page_functions.ts</code> via <code>getProps()</code> on the server.
        </p>
      </div>

      {/* Server Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
            <RefreshCw className="h-3.5 w-3.5 text-emerald-500" />
            Server Timestamp (SSR)
          </div>
          <div className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
            {serverTimestamp}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
            <Cpu className="h-3.5 w-3.5 text-blue-500" />
            Node.js Runtime
          </div>
          <div className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            {systemInfo?.nodeVersion || process.version} ({systemInfo?.platform || process.platform})
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
            <Database className="h-3.5 w-3.5 text-purple-500" />
            Process PID / Uptime
          </div>
          <div className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            PID {systemInfo?.pid} &bull; {systemInfo?.uptimeSeconds}s
          </div>
        </div>
      </div>

      {/* Mock Items Table */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Server-Fetched Items ({mockDatabaseItems.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-muted-foreground">
                <th className="py-2 px-3 font-semibold">ID</th>
                <th className="py-2 px-3 font-semibold">Feature Component</th>
                <th className="py-2 px-3 font-semibold">Status</th>
                <th className="py-2 px-3 font-semibold">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {mockDatabaseItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                  <td className="py-2 px-3 text-muted-foreground">{item.id}</td>
                  <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-200">{item.name}</td>
                  <td className="py-2 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">{item.latencyMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-2">
        <a
          href="/test-dev"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to /test-dev Overview
        </a>
      </div>
    </div>
  );
}
