import type { ReactNode } from "react";
import { Layers, Server, Sparkles, Activity } from "lucide-react";

export default function TestDevLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Lab Header */}
        <div className="p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 backdrop-blur-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Activity className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Dinou Dev &amp; HMR Lab
                </h1>
                <p className="text-xs text-muted-foreground">
                  Testing Zero-Disk I/O, esbuild live rebuilds, Server &amp; Client Components
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live esbuild dev
              </span>
            </div>
          </div>

          {/* Subnavigation Bar */}
          <nav className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <a
              href="/test-dev"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-background text-foreground border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors flex items-center gap-1.5"
            >
              <Layers className="h-3.5 w-3.5 text-blue-500" />
              Overview
            </a>
            <a
              href="/test-dev/client-counter"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:border-amber-500 transition-colors flex items-center gap-1.5"
            >
              <Server className="h-3.5 w-3.5 text-amber-500" />
              Counter (Now Server)
            </a>
            <a
              href="/test-dev/server-data"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-background text-foreground border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors flex items-center gap-1.5"
            >
              <Server className="h-3.5 w-3.5 text-emerald-500" />
              Server Data
            </a>
            <a
              href="/test-dev/new-dynamic/stress-v2-live"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 hover:border-purple-500 transition-colors flex items-center gap-1.5 font-mono"
            >
              <span className="font-bold">#</span>
              [id] 3-Lvl Layout
            </a>
            <a
              href="/test-dev/matrix"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 hover:border-cyan-500 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
              Matrix
            </a>
            <a
              href="/test-dev/stress-test"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:border-rose-500 transition-colors flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              Stress Test
            </a>
          </nav>
        </div>

        {/* Child Route Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
