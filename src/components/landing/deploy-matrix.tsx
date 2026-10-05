"use client";

import { useState } from "react";
import { Check, Copy, Zap, Server, Globe, Cpu, Terminal, ArrowUpRight, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "dinou";

interface TargetInfo {
  id: string;
  name: string;
  icon: typeof Zap;
  badge: string;
  tagline: string;
  buildCommand: string;
  runCommand: string;
  highlights: string[];
  docLink: string;
  terminalOutput: string[];
}

const targets: TargetInfo[] = [
  {
    id: "cloudflare",
    name: "Cloudflare Workers",
    icon: Zap,
    badge: "Edge Isolates",
    tagline: "Sub-millisecond global cold starts across 300+ cities with native Cloudflare KV integration.",
    buildCommand: "npm run build:cloudflare",
    runCommand: "npx wrangler deploy",
    highlights: [
      "Pure W3C Web Streams (ReadableStream / TransformStream)",
      "Zero Node.js dependency runtime (workerd isolates)",
      "Static assets routed straight to Cloudflare global CDN",
      "Dynamic pages persisted in Cloudflare KV via StorageAdapter",
    ],
    docLink: "/docs/deployment",
    terminalOutput: [
      "$ npm run build:cloudflare",
      "✔ Compiling Server Components and Edge SSR...",
      "✔ Cloudflare Worker bundle generated (.dinou/cloudflare/worker.js)",
      "$ npx wrangler deploy",
      "🚀 Published to https://my-app.workers.dev (300+ edge locations)",
    ],
  },
  {
    id: "netlify",
    name: "Netlify Serverless",
    icon: Cloud,
    badge: "Functions v2",
    tagline: "Native Netlify Functions v2 adapter with zero-config edge routing and static CDN caching.",
    buildCommand: "npm run build:node",
    runCommand: "npx netlify deploy --prod",
    highlights: [
      "Official Netlify Functions v2 adapter (dinou/adapters/netlify)",
      "Built-in preferStatic: true serves assets directly from global CDN edge",
      "Dynamic SSR streaming & Server Functions invoked serverless",
      "Zero-config routing with standard netlify.toml setup",
    ],
    docLink: "/docs/deployment",
    terminalOutput: [
      "$ npm run build:node",
      "✔ Pre-bundled Server Components and SSR engines...",
      "✔ Static assets ready in .dinou/dist3",
      "$ npx netlify deploy --prod",
      "🚀 Published to https://my-app.netlify.app (Global Edge CDN)",
    ],
  },
  {
    id: "bun",
    name: "Bun Standalone & Binaries",
    icon: Cpu,
    badge: "Zero Node & Exe",
    tagline: "Ultra-fast standalone server or a single self-contained binary executable with zero host dependencies.",
    buildCommand: "npm run build:bun:compile",
    runCommand: "./dist/server",
    highlights: [
      "Package everything into a single standalone native binary",
      "Pure Bun mode: 100% Bun builds, zero Node.js on the host",
      "Instant startup with zero-copy kernel streaming",
      "Cross-compilation for Linux (x64/ARM), macOS, and Windows",
    ],
    docLink: "/docs/deployment",
    terminalOutput: [
      "$ npm run build:bun:compile",
      "✔ Compiling application for Bun standalone runtime...",
      "✔ Bundling assets into native executable binary...",
      "✔ Single executable binary emitted at ./dist/server",
      "$ ./dist/server",
      "🚀 Bun server listening on http://localhost:3000 (0 host dependencies)",
    ],
  },
  {
    id: "deno",
    name: "Deno & Deno Deploy",
    icon: Server,
    badge: "Deno KV & Edge",
    tagline: "Granular security permissions, native TypeScript, and global edge persistence powered by Deno KV.",
    buildCommand: "npm run build:deno:compile",
    runCommand: "./dist/deno-server",
    highlights: [
      "Out-of-the-box Deno KV storage adapter for ISR page caching",
      "Self-contained executable binary via 'deno compile'",
      "Deploy seamlessly to Deno Deploy global edge cloud",
      "Strict sandbox permission architecture",
    ],
    docLink: "/docs/deployment",
    terminalOutput: [
      "$ npm run build:deno:compile",
      "✔ Compiling application with embedded Deno KV adapter...",
      "✔ Generating self-contained executable with deno compile...",
      "✔ Output: ./dist/deno-server (self-contained binary)",
      "$ ./dist/deno-server",
      "🚀 Deno server listening on http://localhost:3000 (Deno KV enabled)",
    ],
  },
  {
    id: "node",
    name: "Node.js AOT In-Process",
    icon: Server,
    badge: "In-Process AOT",
    tagline: "Runs React Server Components and SSR directly in-process with standard Web Streams and flat memory footprint.",
    buildCommand: "npm run build:node",
    runCommand: "npm run start:node",
    highlights: [
      "Direct in-process execution with zero child processes",
      "Native Web Streams piped directly through HTTP response",
      "Docker & Kubernetes lightweight container friendly",
      "Zero Express and zero runtime Babel overhead",
    ],
    docLink: "/docs/deployment",
    terminalOutput: [
      "$ npm run build:node",
      "✔ Server and client bundles compiled successfully",
      "✔ Static assets optimized in .dinou/public",
      "$ npm run start:node",
      "🚀 Node.js server listening on http://localhost:3000 (Flat memory)",
    ],
  },
  {
    id: "ssg",
    name: "Pure Static Site (SSG)",
    icon: Globe,
    badge: "100% Serverless",
    tagline: "Pre-render all pages and RSC payloads at build time and deploy for free to GitHub Pages, Surge, or S3.",
    buildCommand: "npm run export-static",
    runCommand: "npx surge out my-app.surge.sh",
    highlights: [
      "Exports self-contained HTML and .rsc Flight binary payloads",
      "Client-side soft SPA transitions without any backend server",
      "Deploy for free on GitHub Pages, Cloudflare Pages, or AWS S3",
      "Automatic dynamic bailout detection",
    ],
    docLink: "/docs/deployment",
    terminalOutput: [
      "$ npm run export-static",
      "✔ Pre-rendering 163 documentation routes and RSC payloads...",
      "✔ Static export completed in 3.2s -> ./out",
      "$ npx surge out my-docs.surge.sh",
      "🚀 Deployed static site: https://my-docs.surge.sh (0 compute cost)",
    ],
  },
];

export function DeployMatrix() {
  const [selectedTarget, setSelectedTarget] = useState<TargetInfo>(targets[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = selectedTarget.icon;

  return (
    <section
      id="deploy-everywhere"
      className="w-full py-16 sm:py-20 md:py-24 bg-slate-50/80 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 scroll-mt-20 relative"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 backdrop-blur-sm font-medium"
          >
            Universal Runtime Architecture
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Deploy Everywhere.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Zero Platform Lock-in.
            </span>
          </h2>
          <p className="max-w-[760px] text-slate-600 dark:text-slate-400 md:text-lg">
            Build your application once with React 19 Server Components. Dinou compiles it ahead-of-time to any production infrastructure in the world.
          </p>
        </div>

        {/* Target Buttons Pill Nav */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8 sm:mb-10 max-w-4xl mx-auto">
          {targets.map((target) => {
            const TargetIcon = target.icon;
            const isSelected = selectedTarget.id === target.id;
            return (
              <button
                key={target.id}
                type="button"
                onClick={() => setSelectedTarget(target)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border ${
                  isSelected
                    ? "bg-slate-900 text-white border-blue-500/50 shadow-md dark:bg-white dark:text-slate-950"
                    : "bg-white/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <TargetIcon className={`w-4 h-4 ${isSelected ? "text-blue-400 dark:text-blue-600" : "text-slate-400"}`} />
                <span>{target.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isSelected
                      ? "bg-blue-500/20 text-blue-200 dark:text-blue-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {target.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Target Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Left: Target Details & Commands */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedTarget.name}
                  </h3>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                    {selectedTarget.badge}
                  </span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed">
                {selectedTarget.tagline}
              </p>

              <div className="pt-2 space-y-2.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Key Advantages
                </span>
                <ul className="space-y-2">
                  {selectedTarget.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium">One-Command Build</span>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedTarget.buildCommand)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium inline-flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 flex items-center justify-between border border-slate-800">
                <code>{selectedTarget.buildCommand}</code>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-2 text-sm" asChild>
                <Link href={selectedTarget.docLink}>
                  <span>Read Deployment Guide</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Simulated Live Terminal */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] text-slate-200 shadow-2xl flex flex-col font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-xs text-slate-400 ml-2">deploy-{selectedTarget.id}.sh</span>
              </div>
              <span className="text-[11px] text-slate-500 uppercase tracking-widest font-sans">
                Universal Runtime
              </span>
            </div>

            <div className="p-6 space-y-4 overflow-x-auto flex-1 flex flex-col justify-center">
              {selectedTarget.terminalOutput.map((line, idx) => {
                if (line.startsWith("$")) {
                  return (
                    <div key={idx} className="flex items-center text-slate-100 font-semibold text-sm">
                      <span className="text-emerald-400 mr-2.5 select-none">$</span>
                      <span>{line.slice(2)}</span>
                    </div>
                  );
                }
                if (line.startsWith("✔")) {
                  return (
                    <div key={idx} className="text-emerald-400/90 pl-4 border-l-2 border-emerald-500/40 text-xs sm:text-sm">
                      {line}
                    </div>
                  );
                }
                if (line.startsWith("🚀")) {
                  return (
                    <div key={idx} className="text-blue-400 font-medium pl-4 border-l-2 border-blue-500/50 pt-1 text-xs sm:text-sm">
                      {line}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="text-slate-400 pl-4 border-l border-slate-800">
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
