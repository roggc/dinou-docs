import { Badge } from "@/components/ui/badge";
import { Check, X, Gauge, Zap, Flame, ShieldAlert } from "lucide-react";

export function EngineComparison() {
  const comparisonItems = [
    {
      dimension: "RSC & SSR Architecture",
      v6: "External child processes with IPC serialization overhead",
      v7: "Native in-process streaming via React 19 Web Streams",
      v7Highlight: true,
    },
    {
      dimension: "Runtime Standards",
      v6: "Monolithic Express + custom runtime hooks",
      v7: "100% standard W3C Web APIs (Request, Response, ReadableStream)",
      v7Highlight: true,
    },
    {
      dimension: "Memory Footprint",
      v6: "Heavy multi-process memory overhead (multiple Node instances)",
      v7: "Flat, predictable RAM with lightweight in-process streams",
      v7Highlight: true,
    },
    {
      dimension: "Deployment Flexibility",
      v6: "Tied to traditional Node.js servers",
      v7: "Universal: Cloudflare Workers, Bun, Deno, Node.js, and native binaries",
      v7Highlight: true,
    },
    {
      dimension: "Dev Server & DX",
      v6: "Frequent process restarts and full-page reloads",
      v7: "Zero-disk I/O dev server with instant HMR and hot CSS updates",
      v7Highlight: true,
    },
    {
      dimension: "Rendering & Caching Model",
      v6: "All-or-nothing page caching (dynamic boolean + revalidate in ms)",
      v7: "2D Layered Segmentation (PPR, layout_functions & <DinouCacheSlot> in seconds)",
      v7Highlight: true,
    },
    {
      dimension: "State Persistence on Navigation",
      v6: "Layouts unmount and lose media playback, input text, and filter state",
      v7: "Total state preservation across sibling routes via <DinouPageSlot />",
      v7Highlight: true,
    },
  ];

  return (
    <section
      id="engine-comparison"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-transparent border-0"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-10 sm:mb-12">
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
              Relied on spawning separate operating system child processes (<code className="text-xs font-mono bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">child_process.fork</code>), causing high memory overhead, inter-process communication bottlenecks, and lock-in to Node.js servers.
            </p>
            <div className="space-y-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0" />
                <span>Heavy subprocess overhead and process synchronization</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0" />
                <span>Coupled to Express and runtime code compilation</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0" />
                <span>Incompatible with Cloudflare Workers or standalone binaries</span>
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
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Streamlined & Universal</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                <Gauge className="w-4 h-4" />
                <span>Modern Core</span>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
              Built as a unified in-process engine using native W3C Web Streams and React 19 standards. Server Components (RSC) and SSR stream directly in memory with instant response times and zero subprocess overhead.
            </p>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-200 border-t border-purple-500/20 pt-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">Direct in-memory streaming with zero subprocess overhead</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">100% W3C Web Standards: zero Express, zero runtime transforms</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">Deploy to Edge, Bun, Deno, Node.js, native binaries, and SSG</span>
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
