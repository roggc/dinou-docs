"use client";

import { useState } from "react";
import { Check, Copy, Zap, Server, Globe, Cpu, Terminal, ArrowUpRight, Cloud, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "dinou";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";

const cleanOneDark = {
  ...oneDark,
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
    textShadow: "none",
  },
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
    textShadow: "none",
  },
  table: {
    display: "inline",
  },
};

interface ConfigFile {
  filename: string;
  code: string;
  language: string;
  badge?: string;
}

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
  configFile?: ConfigFile;
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
      "Native workerd runtime with zero Node.js server dependencies",
      "Static assets served directly via Cloudflare global CDN (env.ASSETS)",
      "Automatic ISR route caching & revalidation backed by Cloudflare KV",
    ],
    docLink: "/docs/deployment#cloudflare-workers",
    terminalOutput: [
      "$ npm run build:cloudflare",
      "⚡ Bundling Pass A (RSC workerd) & Pass B (SSR workerd)...",
      "⚡ Bundling Pass C: Worker Orchestrator (.dinou/cloudflare/worker.js)...",
      "✔ Cloudflare Workers build complete (.dinou/cloudflare/worker.js)",
      "$ npx wrangler deploy",
      "🚀 Published to https://my-app.workers.dev (300+ edge locations)",
    ],
    configFile: {
      filename: "wrangler.toml",
      language: "toml",
      badge: "Config",
      code: `# wrangler.toml - Cloudflare Workers Configuration
name = "my-dinou-app"
main = ".dinou/cloudflare/worker.js"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# Serve client bundles, CSS, and static assets directly via Cloudflare CDN
[assets]
directory = ".dinou/dist3"

# Optional: Bind KV namespace for persistent ISR route caching
# [[kv_namespaces]]
# binding = "DINOU_CACHE"
# id = "<your-kv-namespace-id>"`,
    },
  },
  {
    id: "netlify",
    name: "Netlify Serverless",
    icon: Cloud,
    badge: "Functions v2",
    tagline: "Native Netlify Functions v2 adapter with zero-config edge routing and static CDN caching.",
    buildCommand: "npm run build",
    runCommand: "git push origin main",
    highlights: [
      "Native Netlify Functions v2 pre-bundled at .dinou/dist3/server",
      "Built-in preferStatic: true serves assets directly from global CDN edge",
      "Dynamic SSR streaming & Server Functions invoked serverless",
      "Zero-config routing with node_bundler = 'none' in netlify.toml",
    ],
    docLink: "/docs/deployment#netlify-serverless",
    terminalOutput: [
      "$ git push origin main",
      "⚡ Netlify CI build triggered: executing \"npm run build\"...",
      "⚡ Pre-bundling Netlify Functions v2 adapter (.dinou/dist3/server)...",
      "✔ Assets published from .dinou/dist3 (preferStatic: true)",
      "🚀 Published to https://my-app.netlify.app (Global Edge CDN)",
    ],
    configFile: {
      filename: "netlify.toml",
      language: "toml",
      badge: "Config",
      code: `[build]
  command = "npm run build"
  publish = ".dinou/dist3"

[build.environment]
  NODE_VERSION = "22"

[environment]
  NODE_ENV = "production"

[functions]
  directory = ".dinou/dist3/server"
  node_bundler = "none"
  included_files = [
    "package.json",
    "tsconfig.json",
    "dinou.config.*",
    "src/**",
    "dinou/**",
    ".dinou/**",
    "node_modules/**",
    "!node_modules/@swc/**",
    "!node_modules/typescript/**",
    "!node_modules/webpack*/**",
    "!node_modules/@esbuild/**",
    "!node_modules/esbuild/**",
    "!node_modules/@rollup/**",
    "!node_modules/rollup/**",
    "!node_modules/.cache/**",
    "!node_modules/@types/**"
  ]`,
    },
  },
  {
    id: "bun",
    name: "Bun Runtime & Binaries",
    icon: Cpu,
    badge: "4 Build Modes",
    tagline: "Ultra-fast standalone server or single self-contained binary executable with zero host dependencies.",
    buildCommand: "npm run build:bun:compile",
    runCommand: "./dist/server",
    highlights: [
      "4 Flexible Modes: Standard Bun, Pure Bun (0 Node.js), and Compiled Binaries",
      "Self-contained native binary (bun build --compile) emitted at ./dist/server",
      "Zero-copy asset streaming directly via native Bun.file() kernel bindings",
      "Cross-compilation targets: Linux x64/ARM64, macOS Apple Silicon, and Windows",
    ],
    docLink: "/docs/deployment#bun-runtime-compile",
    terminalOutput: [
      "$ npm run build:bun:compile",
      "⚡ Bundling Pass A (RSC bun) & Pass B (SSR bun)...",
      "⚡ Bundling Pass C: Bun Orchestrator (.dinou/bun/server.js)...",
      "⚡ Compiling native binary: bun build --compile...",
      "✔ Single executable binary emitted at ./dist/server",
      "$ ./dist/server",
      "🚀 Bun server listening on http://localhost:3000 (0 host dependencies)",
    ],
    configFile: {
      filename: "package.json",
      language: "json",
      badge: "Scripts",
      code: `{
  "scripts": {
    "build:bun": "dinou build:bun",
    "build:bun:pure": "dinou build:bun:pure",
    "build:bun:compile": "dinou build:bun:compile",
    "build:bun:pure:compile": "dinou build:bun:pure:compile",
    "start:bun": "dinou start:bun",
    "build:bun:compile:linux": "dinou build:bun:compile:linux",
    "build:bun:compile:linux_arm": "dinou build:bun:compile:linux_arm",
    "build:bun:compile:mac": "dinou build:bun:compile:mac",
    "build:bun:compile:win": "dinou build:bun:compile:win"
  }
}`,
    },
  },
  {
    id: "deno",
    name: "Deno & Deno Deploy",
    icon: Server,
    badge: "Edge & Binaries",
    tagline: "Deploy across 35+ global edge regions with native Deno KV, or compile to a single standalone binary.",
    buildCommand: "npm run build:deno:compile",
    runCommand: "./dist/deno-server",
    highlights: [
      "Native Deno KV persistence across Deno Deploy edge network",
      "Zero-dependency executable binary emitted via 'deno compile' (./dist/deno-server)",
      "Strict sandbox security architecture with granular permissions",
      "Cross-compilation targets: Linux x64/ARM64, macOS Apple Silicon, and Windows",
    ],
    docLink: "/docs/deployment#deno-deploy-compile",
    terminalOutput: [
      "$ npm run build:deno:compile",
      "⚡ Bundling Pass A (RSC deno) & Pass B (SSR deno)...",
      "⚡ Bundling Pass C: Deno Orchestrator (.dinou/deno/main.js)...",
      "⚡ Compiling native binary: deno compile...",
      "✔ Single executable binary emitted at ./dist/deno-server",
      "$ ./dist/deno-server",
      "🚀 Deno server listening on http://localhost:3000 (Deno KV enabled)",
    ],
    configFile: {
      filename: "deno.json",
      language: "json",
      badge: "Config",
      code: `{
  "tasks": {
    "build": "dinou build:deno",
    "start": "deno run --unstable-kv -A dinou/adapters/deno.js",
    "compile": "dinou build:deno:compile",
    "deploy": "deployctl deploy --project=my-app .dinou/deno/main.js"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}`,
    },
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
  const [activeRightTab, setActiveRightTab] = useState<"terminal" | "config">("terminal");
  const [copiedConfig, setCopiedConfig] = useState(false);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyConfig = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    } catch (e) {}
  };

  const currentConfigFile = selectedTarget.configFile;
  const effectiveTab = activeRightTab === "config" && !currentConfigFile ? "terminal" : activeRightTab;

  const Icon = selectedTarget.icon;

  return (
    <section
      id="deploy-everywhere"
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 bg-transparent scroll-mt-16 relative"
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
                  {selectedTarget.highlights.map((h) => (
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

          {/* Right: Interactive Terminal & Config Viewer */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] text-slate-200 shadow-2xl flex flex-col font-mono text-xs sm:text-sm min-h-[440px]">
            {/* Header with Traffic Lights and Tabs */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-2.5 min-w-0 overflow-x-auto py-0.5">
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1.5 ml-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveRightTab("terminal")}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      effectiveTab === "terminal"
                        ? "bg-[#0d1117] text-white border border-slate-700 font-medium shadow-xs"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>deploy-{selectedTarget.id}.sh</span>
                  </button>

                  {currentConfigFile && (
                    <button
                      type="button"
                      onClick={() => setActiveRightTab("config")}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        effectiveTab === "config"
                          ? "bg-[#0d1117] text-white border border-slate-700 font-medium shadow-xs"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 text-blue-400" />
                      <span>{currentConfigFile.filename}</span>
                      {currentConfigFile.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-sans font-medium bg-blue-500/20 text-blue-300">
                          {currentConfigFile.badge}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Right side of header */}
              <div className="flex items-center gap-2 shrink-0">
                {effectiveTab === "config" && currentConfigFile ? (
                  <button
                    type="button"
                    onClick={() => handleCopyConfig(currentConfigFile.code)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-sans text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
                  >
                    {copiedConfig ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500 uppercase tracking-widest font-sans hidden sm:inline">
                    Universal Runtime
                  </span>
                )}
              </div>
            </div>

            {/* Body: Terminal or Config File */}
            {effectiveTab === "terminal" ? (
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
                  if (line.startsWith("⚡")) {
                    return (
                      <div key={idx} className="text-amber-400/90 pl-4 border-l-2 border-amber-500/40 text-xs sm:text-sm">
                        {line}
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
            ) : (
              <div className="p-4 sm:p-6 overflow-x-auto flex-1 flex flex-col justify-center text-xs sm:text-sm">
                <SyntaxHighlighter
                  language={currentConfigFile!.language}
                  style={cleanOneDark}
                  showLineNumbers
                  wrapLines={false}
                  wrapLongLines={false}
                  lineNumberStyle={{
                    color: "#4b5563",
                    fontSize: "11px",
                    paddingRight: "16px",
                    userSelect: "none",
                  }}
                  customStyle={{
                    background: "transparent",
                    margin: 0,
                    padding: 0,
                    fontSize: "12px",
                    lineHeight: "1.65",
                  }}
                >
                  {currentConfigFile!.code.trim()}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
