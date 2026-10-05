"use client";

import {
  Boxes,
  Zap,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Server,
  Laptop,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";

const bundlerCards = [
  {
    id: "esbuild",
    name: "esbuild",
    badge: "Default & Lightning Fast",
    badgeColor: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    engineBadge: "Go Binary",
    headline: "Instant Local Development",
    description: "Sub-millisecond build cycles and instant HMR feedback loops for your everyday dev server.",
    speedMetric: "< 5ms",
    speedLabel: "Rebuild Latency",
    sampleCommand: "dinou dev",
    idealFor: "Ultra-fast local iteration",
  },
  {
    id: "rollup",
    name: "Rollup",
    badge: "Optimized Tree-Shaking",
    badgeColor: "border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10",
    engineBadge: "Rust / TypeScript",
    headline: "Pristine ES Module Output",
    description: "Surgical code-splitting and dead-code elimination. The optimal choice for Cloudflare Workers and Edge Isolates.",
    speedMetric: "0% Unused",
    speedLabel: "Bundle Stripping",
    sampleCommand: "dinou build:rollup",
    idealFor: "Edge isolates & serverless",
  },
  {
    id: "webpack",
    name: "Webpack",
    badge: "Enterprise Ecosystem",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    engineBadge: "Enterprise Battle-Tested",
    headline: "Maximum Package Compatibility",
    description: "Full compatibility with legacy npm dependencies and seamless native React Compiler pipeline integration.",
    speedMetric: "100%",
    speedLabel: "Ecosystem Coverage",
    sampleCommand: "dinou build:webpack",
    idealFor: "Enterprise & React Compiler",
  },
];

export function TriBundlerShowcase() {
  return (
    <section
      id="bundlers"
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 scroll-mt-16 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 backdrop-blur-sm font-medium"
          >
            <Boxes className="w-3.5 h-3.5 mr-1.5 inline-block text-amber-500" />
            Multi-Bundler Freedom
          </Badge>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Choose Your Bundler.{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Swap Whenever You Want.
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Never be locked into a single proprietary compiler. Dinou v7 supports pre-configured,
            zero-config pipelines for the three premier JavaScript bundlers.
          </p>
        </div>

        {/* 3-Card Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {bundlerCards.map((b) => (
            <div
              key={b.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-xs px-2.5 py-0.5 font-medium ${b.badgeColor}`}>
                    {b.badge}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">
                    {b.engineBadge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                    {b.name}
                  </h3>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {b.headline}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                {/* Metric Box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-baseline justify-between">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                    {b.speedMetric}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {b.speedLabel}
                  </span>
                </div>
              </div>

              {/* Bottom Script & Target */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg">
                  <Terminal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{b.sampleCommand}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300">Best for:</strong> {b.idealFor}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dual-Bundle Footer Guarantee */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold shrink-0">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Identical Dual-Bundle Output Across All Three Engines
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Swap bundlers anytime without refactoring application components or routing.
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs shrink-0" asChild>
            <Link href="/docs/bundlers">
              <span>Bundlers Guide</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
