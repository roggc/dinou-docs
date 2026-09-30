import { Badge } from "@/components/ui/badge";
import { Check, X, Gauge, Zap, Flame, ShieldAlert } from "lucide-react";

export function EngineComparison() {
  const comparisonItems = [
    {
      dimension: "RSC Engine",
      v6: "child_process.fork() + Babel JIT IPC across OS boundaries",
      v7: "Dual-Bundle AOT In-Memory via native React 19 Web Streams",
      v7Highlight: true,
    },
    {
      dimension: "Chassis & Core",
      v6: "Monolithic Express + require.extensions hacks (asset/css hooks)",
      v7: "100% W3C Web Standards (Request, Response, ReadableStream)",
      v7Highlight: true,
    },
    {
      dimension: "Memory Footprint",
      v6: "Heavy multi-process memory overhead (risk of fork-bombs)",
      v7: "Flat, predictable RAM with thousands of async streams in-process",
      v7Highlight: true,
    },
    {
      dimension: "Cross-Runtime",
      v6: "Locked to Node.js CJS; impossible on Cloudflare Workers",
      v7: "Deploy Everywhere: Cloudflare, Bun, Deno, Node, and single binaries",
      v7Highlight: true,
    },
    {
      dimension: "Dev Server & HMR",
      v6: "Dual watchers, full page reloads on CSS edits, fork overhead",
      v7: "0-Fork, 100% In-RAM (0 disk I/O), SWC Disk-Mirror, Hot CSS Swap",
      v7Highlight: true,
    },
    {
      dimension: "CI & Test Suite",
      v6: "15-20 min test runs prone to socket IPC timeouts",
      v7: "377 tests passed at 100% in ~4 minutes across 3 browsers",
      v7Highlight: true,
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10 backdrop-blur-sm font-medium"
          >
            Architectural Evolution
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            From Heavy Truck to{" "}
            <span className="bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Formula 1 Ferrari
            </span>
          </h2>
          <p className="max-w-[760px] text-slate-600 dark:text-slate-400 md:text-lg">
            Dinou v7 is not a minor version bump—it is a complete technical metamorphosis. We eliminated child processes, Express, and runtime compilation hacks.
          </p>
        </div>

        {/* Visual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {/* Card v6 */}
          <div className="p-6 rounded-2xl border border-slate-300/80 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚛</span>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                    Dinou v6
                  </h3>
                  <span className="text-xs text-slate-500">The Heavy Utility Truck</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Legacy
              </Badge>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Relied on spawning separate operating system child processes (<code className="text-xs font-mono bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">child_process.fork</code>) to circumvent the React 19 Dual Condition Conflict, incurring heavy serialization latency and disk saturation.
            </p>
            <div className="space-y-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0" />
                <span>Heavy IPC serialization overhead on every request</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0" />
                <span>Express dependency & runtime Babel AST parsing</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0" />
                <span>Cannot execute on Cloudflare Workers or single binaries</span>
              </div>
            </div>
          </div>

          {/* Card v7 */}
          <div className="p-6 rounded-2xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent dark:from-purple-950/30 dark:via-blue-950/20 dark:to-slate-950 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏎️</span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Dinou v7</span>
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 text-[10px] px-2">
                      Modern AOT
                    </Badge>
                  </h3>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">The Formula 1 Ferrari</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                <Gauge className="w-4 h-4" />
                <span>0-Fork</span>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
              Engineered with a universal 3-Pass Ahead-of-Time Dual-Bundle architecture. Pass A (RSC) and Pass B (SSR) interconnect in RAM via standard W3C Web Streams with zero IPC latency.
            </p>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-200 border-t border-purple-500/20 pt-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">Direct RAM stream interconnection (0 forks, 0 IPC)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">100% W3C Standards: zero Express, zero runtime Babel</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">Deploy to Edge, Bun, Deno, Node, Binaries, and SSG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="max-w-5xl mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Architectural Dimension</th>
                  <th className="py-3 px-4 sm:px-6">🚛 Dinou v6 (Truck)</th>
                  <th className="py-3 px-4 sm:px-6 text-purple-600 dark:text-purple-400 font-bold">🏎️ Dinou v7 (Ferrari)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 dark:text-slate-200">
                      {item.dimension}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {item.v6}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-900 dark:text-slate-100 font-medium">
                      <span className="text-emerald-500 font-bold mr-1.5">✓</span>
                      {item.v7}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
