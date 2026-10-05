import { Badge } from "@/components/ui/badge";
import { Check, Gauge, Sparkles } from "lucide-react";

export function EngineComparison() {
  const v7Features = [
    {
      dimension: "RSC & SSR Architecture",
      v7: "Native in-process streaming via React 19 Web Streams",
    },
    {
      dimension: "Runtime Standards",
      v7: "100% W3C Web APIs (Request, Response, ReadableStream) — zero Express",
    },
    {
      dimension: "Process & Memory Model",
      v7: "Single-process unified memory-mapped engine with flat, predictable RAM",
    },
    {
      dimension: "Deployment Flexibility",
      v7: "Universal: Cloudflare Workers, Bun, Deno, Node.js & native single binaries",
    },
    {
      dimension: "Dev Server & DX",
      v7: "In-memory 0-fork compilation with sub-5ms WebSocket HMR (< 150ms startup)",
    },
    {
      dimension: "Rendering & Caching Model",
      v7: "2D Layered Segmentation (PPR, layout_functions & <DinouCacheSlot>)",
    },
    {
      dimension: "State Persistence on Navigation",
      v7: "Persistent nested layouts across sibling transitions (zero layout remounting)",
    },
  ];

  return (
    <section
      id="engine-comparison"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10 backdrop-blur-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block text-purple-500" />
            Architectural Metamorphosis
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Not Just a Version Bump.{" "}
            <span className="bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              A Ground-Up Metamorphosis.
            </span>
          </h2>
          <p className="max-w-[760px] text-slate-600 dark:text-slate-400 md:text-lg leading-relaxed">
            Dinou v7 is not an incremental update—it is an entirely re-engineered foundation. We eliminated child processes, Express, and runtime compilation hacks in favor of pure in-process Web Standards.
          </p>
        </div>

        {/* Featured v7 Architecture Card */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent dark:from-purple-950/30 dark:via-blue-950/20 dark:to-slate-950 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏎️</span>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Dinou v7</span>
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 text-xs px-2.5 py-0.5">
                      Modern AOT
                    </Badge>
                  </h3>
                  <span className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium">
                    Streamlined &amp; Universal
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs sm:text-sm px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Gauge className="w-4 h-4" />
                <span>Modern Core</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              Built as a unified in-process engine using native W3C Web Streams and React 19 standards. Server Components (RSC) and SSR stream directly in memory with instant response times and zero subprocess overhead.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 border-t border-purple-500/20 pt-4">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">Direct in-memory streaming with zero subprocess overhead</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">100% W3C Web Standards: zero Express, zero runtime transforms</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">Deploy to Edge, Bun, Deno, Node.js, native binaries, and SSG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Specifications Table (2 Columns) */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xl">
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Dinou v7 Architectural Specifications
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              Verified v7 Standard
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/70 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <tr>
                  <th className="py-3 px-5 sm:px-6 sm:w-1/3">Architectural Dimension</th>
                  <th className="py-3 px-5 sm:px-6 text-purple-600 dark:text-purple-400">
                    Dinou v7 Implementation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-slate-600 dark:text-slate-400">
                {v7Features.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-900 dark:text-slate-200 whitespace-nowrap">
                      {item.dimension}
                    </td>
                    <td className="py-3.5 px-5 sm:px-6 text-slate-800 dark:text-slate-200 font-medium">
                      <span className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item.v7}</span>
                      </span>
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
