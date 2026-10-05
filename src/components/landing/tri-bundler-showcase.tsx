"use client";

import { useState } from "react";
import {
  Boxes,
  Zap,
  Package,
  Cpu,
  Layers,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Code2,
  Split,
  Server,
  Laptop,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";

type BundlerId = "esbuild" | "rollup" | "webpack";

interface BundlerInfo {
  id: BundlerId;
  name: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  writtenIn: string;
  idealFor: string;
  speed: string;
  sampleScript: string;
  scriptDescription: string;
  keyStrengths: string[];
}

const bundlers: Record<BundlerId, BundlerInfo> = {
  esbuild: {
    id: "esbuild",
    name: "esbuild",
    badge: "Default & Lightning Fast",
    badgeColor: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    tagline: "Ultra-fast Go-powered compilation delivering instant dev feedback loops.",
    writtenIn: "Go (Native Binary)",
    idealFor: "Local development (dinou dev) & sub-second test suites",
    speed: "10×–100× faster than Node-based tools",
    sampleScript: `"dev": "dinou dev --bundler=esbuild"`,
    scriptDescription: "Instant dev server startup with sub-millisecond hot module replacement.",
    keyStrengths: [
      "Sub-millisecond JSX and TypeScript transpilation",
      "Instant cold-starts in local development",
      "Zero configuration required out-of-the-box",
      "Native parallel core utilization in Go",
    ],
  },
  rollup: {
    id: "rollup",
    name: "Rollup",
    badge: "Optimized Tree-Shaking",
    badgeColor: "border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10",
    tagline: "The industry benchmark for surgical code splitting and pristine ES Modules.",
    writtenIn: "TypeScript & Rust (Rollup/Rolldown)",
    idealFor: "Cloudflare Workers, Edge Isolates & production deployments",
    speed: "Deep static AST analysis & optimal payload sizing",
    sampleScript: `"build:cloudflare": "dinou build --bundler=rollup --target=cloudflare"`,
    scriptDescription: "Compiles ultra-compact ESM bundles stripped of all unused exports.",
    keyStrengths: [
      "Unmatched dead-code elimination and tree-shaking",
      "Pristine, human-readable ES Module output",
      "Optimal code-splitting for serverless isolates",
      "Native W3C Web Streams integration",
    ],
  },
  webpack: {
    id: "webpack",
    name: "Webpack",
    badge: "Enterprise & React Compiler",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    tagline: "The battle-tested enterprise bundler with universal package compatibility.",
    writtenIn: "JavaScript & C++",
    idealFor: "Complex monorepos, legacy dependencies & React Compiler integration",
    speed: "Persistent disk caching & exhaustive plugin ecosystem",
    sampleScript: `"build:node": "dinou build --bundler=webpack --target=node"`,
    scriptDescription: "Maximum package compatibility with full React Compiler pipeline support.",
    keyStrengths: [
      "100% compatibility with legacy CJS and ESM packages",
      "Native React Compiler optimization integration",
      "Massive ecosystem of battle-tested plugins & loaders",
      "Enterprise-grade asset caching & module federation ready",
    ],
  },
};

export function TriBundlerShowcase() {
  const [selectedBundler, setSelectedBundler] = useState<BundlerId>("esbuild");
  const [copied, setCopied] = useState(false);

  const current = bundlers[selectedBundler];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="bundlers"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-transparent"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 backdrop-blur-sm font-medium"
          >
            <Boxes className="w-3.5 h-3.5 mr-1.5 inline-block text-amber-500" />
            Agnostic Multi-Bundler Architecture
          </Badge>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Choose Your Bundler.{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Swap Whenever You Want.
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 md:text-lg max-w-2xl leading-relaxed">
            Never be bound to a single compiler. Dinou v7 provides first-class, pre-configured pipelines
            for <strong>esbuild</strong>, <strong>Rollup</strong>, and <strong>Webpack</strong>, all feeding into
            the same Dual-Bundle AOT engine.
          </p>

          {/* Bundler Switcher Buttons */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-4">
            {(["esbuild", "rollup", "webpack"] as BundlerId[]).map((id) => {
              const b = bundlers[id];
              const isSelected = selectedBundler === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedBundler(id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-800"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className="font-mono">{b.name}</span>
                  <Badge variant="outline" className={`text-[10px] hidden sm:inline-flex ${b.badgeColor}`}>
                    {b.id === "esbuild" ? "Default" : b.id === "rollup" ? "ESM" : "Enterprise"}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Bundler Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto mb-12">
          {/* Left Column: Bundler Overview */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                    {current.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Written in {current.writtenIn}
                  </p>
                </div>
                <Badge className={current.badgeColor}>
                  {current.badge}
                </Badge>
              </div>

              <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {current.tagline}
              </p>

              <div className="space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Capabilities in Dinou v7
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keyStrengths.map((strength, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-amber-600 dark:text-amber-400">Ideal For: </span>
                {current.idealFor}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Speed: {current.speed}
              </span>
              <Button size="sm" variant="outline" className="text-xs border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10" asChild>
                <Link href="/docs/bundlers">
                  <span>Bundlers Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Snippet & Dual-Bundle Pipeline */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    package.json Script Integration
                  </span>
                </div>
                <Badge variant="outline" className="text-[11px] font-mono border-slate-300 dark:border-slate-700">
                  Zero Config
                </Badge>
              </div>

              {/* Code Snippet */}
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>scripts section</span>
                  <button
                    onClick={() => handleCopy(current.sampleScript)}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <pre className="text-amber-400 leading-relaxed overflow-x-auto">
{current.sampleScript}
                </pre>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {current.scriptDescription}
              </p>

              {/* The Dual-Bundle Diagram */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Split className="w-3.5 h-3.5 text-amber-500" />
                    <span>The Dual-Bundle Engine</span>
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    AOT Compilation
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Server className="w-3.5 h-3.5 text-blue-500" />
                      <span>Server Bundle</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Executes React Server Components (RSC) and emits Flight wire streams.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Laptop className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Client Bundle</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Progressively hydrates interactive boundaries in the browser.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              All 3 bundlers compile identical Dual-Bundle artifacts. Swap bundlers with 0 code refactoring.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
