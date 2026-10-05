"use client";

import { useState } from "react";
import {
  FolderTree,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Code2,
  LockOpen,
  Copy,
  Check,
  Server,
  Zap,
  Bot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";

const coreEjectedModules = [
  {
    name: "compiler/",
    role: "Dual-Bundle AOT Compiler",
    desc: "Pluggable build pipelines for esbuild, Rollup, and Webpack.",
  },
  {
    name: "server/",
    role: "Universal Server Adapters",
    desc: "Multi-runtime server loop for Cloudflare, Bun, Node, and Deno.",
  },
  {
    name: "client/",
    role: "Hydration & Navigation",
    desc: "Progressive client hydration runtime, <Link>, and router.",
  },
  {
    name: "rsc-context/",
    role: "React Flight Wire Protocol",
    desc: "Serializes Server Components and dispatches Server Functions.",
  },
  {
    name: "static-isr/",
    role: "Hybrid Cache & ISR Engine",
    desc: "Static site generation and granular layout revalidation.",
  },
];

export function EjectShowcase() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx dinou eject");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="eject"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-transparent"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 backdrop-blur-sm font-medium"
          >
            <LockOpen className="w-3.5 h-3.5 mr-1.5 inline-block text-emerald-500" />
            Framework Sovereignty
          </Badge>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Eject Anytime.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Own Your Entire Stack.
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Zero vendor lock-in. A single command extracts Dinou&apos;s complete compiler, server runtime,
            and React 19 flight pipeline directly into your project.
          </p>
        </div>

        {/* 2-Column Direct Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left Column: Generated File Structure */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-emerald-500" />
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                    ./dinou/
                  </span>
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">
                  Full Source Code
                </Badge>
              </div>

              {/* Module List */}
              <div className="space-y-3">
                {coreEjectedModules.map((mod) => (
                  <div
                    key={mod.name}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {mod.name}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {mod.role}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {mod.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CLI Command */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">$</span>
                  <span>npx dinou eject</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy command"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: The Sovereignty Advantage */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Why Ejection Matters
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Freedom to Evolve Your Architecture
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Zero Risk of Abandonment
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      You are never at the mercy of closed cloud vendors or breaking meta-framework changes. Your codebase is 100% self-contained.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <Zap className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Custom Server &amp; Middleware Control
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      Add custom HTTP headers, edge telemetry, WebSockets, or caching policies directly inside your server loop with standard Node or web APIs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <Bot className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Built for Modern AI Workflows
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      AI coding assistants can inspect and modify your exact compiler and streaming code directly, eliminating black-box roadblocks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Learn more about framework sovereignty.
              </span>
              <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm" asChild>
                <Link href="/docs/eject">
                  <span>Eject Documentation</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
