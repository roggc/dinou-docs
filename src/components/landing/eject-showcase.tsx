"use client";

import { useState } from "react";
import {
  Download,
  Terminal,
  FolderTree,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Code2,
  Layers,
  Settings,
  Server,
  Sparkles,
  Bot,
  Copy,
  Check,
  LockOpen,
  Boxes,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";

type EjectTab = "anatomy" | "comparison" | "ai";

interface FileNode {
  path: string;
  name: string;
  type: "folder" | "file";
  desc: string;
  details: string;
  badge: string;
}

const ejectedFiles: FileNode[] = [
  {
    path: "dinou/compiler/",
    name: "compiler/",
    type: "folder",
    badge: "AOT Build",
    desc: "The dual-bundle compiler core supporting esbuild, Rollup, and Webpack pipelines.",
    details:
      "Generates separate server and client bundles. Handles JSX/TS transpilation, virtual file system mapping, and code-splitting with zero closed-source binaries.",
  },
  {
    path: "dinou/server/",
    name: "server/",
    type: "folder",
    badge: "Multi-Runtime",
    desc: "Universal HTTP request handlers and server adapters for Cloudflare, Bun, Node, and Deno.",
    details:
      "Houses the main server loop, streaming HTML renderer, and runtime adapters. You can inject custom Express/Hono middlewares, custom auth, and edge cache headers.",
  },
  {
    path: "dinou/client/",
    name: "client/",
    type: "folder",
    badge: "React 19 Runtime",
    desc: "The browser hydration runtime, <Link>, useRouter, and client navigation router.",
    details:
      "Contains the progressive hydration coordinator and client-side router. Completely unminified TypeScript code that you can inspect, debug, and extend.",
  },
  {
    path: "dinou/rsc-context/",
    name: "rsc-context/",
    type: "folder",
    badge: "Flight Protocol",
    desc: "React 19 Flight wire serialization, request context proxies, and stream resolvers.",
    details:
      "Serializes Server Components into React 19 Flight wire streams. Handles async request boundaries, cookies, headers, and Server Functions dispatching.",
  },
  {
    path: "dinou/static-isr/",
    name: "static-isr/",
    type: "folder",
    badge: "Cache Engine",
    desc: "Static Site Generation (SSG), Incremental Static Generation (ISG), and Layout-level ISR.",
    details:
      "Generates static HTML and RSC payloads at build time or on-demand. Manages filesystem cache manifests, revalidation tags, and partial pre-rendering.",
  },
];

export function EjectShowcase() {
  const [activeTab, setActiveTab] = useState<EjectTab>("anatomy");
  const [selectedFile, setSelectedFile] = useState<FileNode>(ejectedFiles[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="eject"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 backdrop-blur-sm font-medium"
          >
            <LockOpen className="w-3.5 h-3.5 mr-1.5 inline-block text-emerald-500" />
            Framework Sovereignty &amp; Zero Lock-in
          </Badge>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Eject Anytime.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Own Your Entire Runtime.
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 md:text-lg max-w-2xl leading-relaxed">
            Never get trapped by opaque closed-source frameworks. With a single command, extract
            Dinou&apos;s complete dual-bundle compiler, RSC flight streaming, and multi-runtime server
            directly into your project.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 backdrop-blur-sm mt-4">
            <button
              onClick={() => setActiveTab("anatomy")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "anatomy"
                  ? "bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>1. Ejected Anatomy</span>
            </button>

            <button
              onClick={() => setActiveTab("comparison")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "comparison"
                  ? "bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>2. Locked vs. Sovereign</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "ai"
                  ? "bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>3. AI Era &amp; Vibe-Coding</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Ejected Anatomy */}
        {activeTab === "anatomy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto">
            {/* Left: Interactive File Tree */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Generated Root Directory
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[11px] font-mono border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    dinou/
                  </Badge>
                </div>

                <div className="mt-4 space-y-2">
                  {ejectedFiles.map((file) => {
                    const isSelected = selectedFile.path === file.path;
                    return (
                      <button
                        key={file.path}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                          isSelected
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                            : "bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <FolderTree className={`w-4 h-4 ${isSelected ? "text-emerald-500" : "text-slate-400"}`} />
                          <span className="font-mono text-sm font-semibold">{file.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0.5">
                          {file.badge}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CLI Command Box */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <span>npx dinou eject</span>
                  </div>
                  <button
                    onClick={() => handleCopy("npx dinou eject")}
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Copy command"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Extracts complete compiler and runtime source code into <code>./dinou/</code>
                </p>
              </div>
            </div>

            {/* Right: Selected File Detail Card */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white">
                        {selectedFile.path}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Zero Black-Box Binaries &bull; 100% Readable TypeScript
                      </span>
                    </div>
                  </div>

                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-xs">
                    {selectedFile.badge}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Architecture Role
                    </h4>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {selectedFile.desc}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      What You Gain by Ejecting
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedFile.details}
                    </p>
                  </div>
                </div>

                {/* Live Code Preview snippet */}
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                    <span>package.json after ejecting</span>
                    <span className="text-emerald-400">100% Sovereign</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`"scripts": {
  "dev": "node ./dinou/server/main-server.js",
  "build": "node ./dinou/compiler/build.js",
  "start": "node ./dinou/server/main-server.js"
}`}
                  </pre>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Inspect the complete ejected reference in documentation.
                </span>
                <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs" asChild>
                  <Link href="/docs/eject">
                    <span>Eject Documentation</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Locked Meta-Frameworks vs. Dinou Sovereignty */}
        {activeTab === "comparison" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Locked Meta-Frameworks Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-red-500/20 shadow-sm relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Typical Meta-Frameworks
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Opaque internals &amp; vendor lock-in
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>No Eject Option:</strong> You are permanently bound to the framework maintainers&apos; decisions and closed binaries.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Proprietary Bundler:</strong> Forced into proprietary tools without freedom to choose standard Rollup, Webpack, or esbuild.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Cloud Vendor Traps:</strong> Primitives optimized for a specific hosting platform rather than portable W3C standards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Black-Box Debugging:</strong> When the RSC stream breaks or memory leaks occur, internals are buried deep in node_modules.</span>
                </li>
              </ul>
            </div>

            {/* Dinou Sovereignty Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/30 shadow-sm relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Dinou Sovereignty
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    100% Ejectable Dual-Bundle Architecture
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Total Framework Sovereignty:</strong> Run <code>npx dinou eject</code> and the full framework source code belongs to you.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>3 Battle-Tested Bundlers:</strong> Full support for standard esbuild, Rollup, and Webpack with zero proprietary constraints.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Deploy Everywhere:</strong> Native W3C ReadableStreams run seamlessly on Cloudflare Workers, Netlify, Bun, Node, or Deno.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Risk of Abandonment:</strong> Even if Dinou stopped being maintained tomorrow, your project runs forever independently.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: AI Era & Vibe-Coding */}
        {activeTab === "ai" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Supercharging AI Coding Agents
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Why readable ejected architecture changes the game for modern developers
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-purple-500/30 text-purple-600 dark:text-purple-400 font-mono text-xs">
                Context Window Sovereignty
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                  <Code2 className="w-4 h-4" />
                  <span>Inspectable Internals</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  AI coding assistants can directly read your ejected <code>./dinou/server</code> and <code>./dinou/compiler</code>, understanding your exact server pipeline.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Custom Middleware</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Instruct your agent to add custom HTTP headers, edge telemetry, or WebSockets directly inside your server without waiting for upstream framework releases.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Never Hit a Dead End</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  No more &quot;this feature is unsupported by the framework&quot; roadblocks. Modify any step of the bundling and streaming lifecycle at will.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
