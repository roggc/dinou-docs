"use client";

import { useState } from "react";
import {
  Sparkles,
  Server,
  Zap,
  Layers,
  ArrowRight,
  Code2,
  Copy,
  Check,
  CheckCircle2,
  Split,
  Laptop,
  Radio,
  Workflow,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";

type React19Tab = "actions" | "flight" | "pipeline";

interface TabConfig {
  id: React19Tab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile: string;
  codeSnippet: string;
  highlights: {
    title: string;
    desc: string;
  }[];
}

const configs: Record<React19Tab, TabConfig> = {
  actions: {
    id: "actions",
    title: "1. Server Functions",
    badge: "Direct Server Actions",
    badgeColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    headline: "Direct Server-Side Execution with 'use server'",
    description:
      "Execute backend logic directly from your React components without writing manual API routes, serialization boilerplate, or state synchronizers. Fully compatible with React 19 useActionState and useOptimistic.",
    codeFile: "src/components/newsletter.tsx",
    codeSnippet: `// 1. Direct Server Function (runs securely on backend)
async function subscribeUser(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  await db.subscribers.insert({ email, date: new Date() });
  return { success: true, email };
}

// 2. React 19 Client Component using standard Action hooks
export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: any, fd: FormData) => await subscribeUser(fd),
    null
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" placeholder="you@example.com" required />
      <button disabled={isPending}>
        {isPending ? "Subscribing..." : "Join Newsletter"}
      </button>
      {state?.success && <p>Subscribed: {state.email}</p>}
    </form>
  );
}`,
    highlights: [
      {
        title: "Zero API Routes Needed",
        desc: "Calls backend functions transparently over secure, typed HTTP POST dispatches.",
      },
      {
        title: "React 19 Native Hooks",
        desc: "First-class integration with useActionState, useOptimistic, and useFormStatus.",
      },
      {
        title: "Automatic Revalidation",
        desc: "Server mutations can trigger immediate cache invalidation and UI streaming updates.",
      },
    ],
  },
  flight: {
    id: "flight",
    title: "2. RSC Flight Wire Protocol",
    badge: "0kb Client Bundle",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "Streaming React Flight Protocol over W3C Streams",
    description:
      "Server Components never send JavaScript to the client. Dinou serializes your React component tree into React Flight chunks, streaming them over native Web Streams for instant progressive rendering.",
    codeFile: "network/flight-stream.txt",
    codeSnippet: `// Raw React Flight Stream emitted by Dinou over W3C ReadableStream:
1:I["dinou/client/link.js",["Link"],""]
2:{"name":"Dinou v7","stars":1240,"status":"online"}
0:["$","main",null,{"children":[
  ["$","h1",null,{"children":"Dinou Dashboard"}],
  ["$","p",null,{"children":["Live Stars: ",["$","b",null,{"children":"1,240"}]]}],
  ["$","$L1",null,{"href":"/docs","children":"Explore Docs"}]
]}]`,
    highlights: [
      {
        title: "0kb JavaScript for Server Code",
        desc: "Heavy libraries (markdown parsers, date formatters, DB drivers) never reach the browser.",
      },
      {
        title: "W3C Web Standards",
        desc: "Streamed via standard ReadableStream across Cloudflare, Netlify, Bun, and Node.",
      },
      {
        title: "Interactive Client Leaves",
        desc: "Only interactive components (buttons, forms, modals) download client JavaScript.",
      },
    ],
  },
  pipeline: {
    id: "pipeline",
    title: "3. Dual-Process SSR Engine",
    badge: "Process Isolation",
    badgeColor: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10",
    headline: "Collision-Free V8 RSC Isolation",
    description:
      "React 19 contains two conflicting module registries: 'react-server' and 'react-dom/server'. Dinou cleanly isolates RSC compilation and HTML SSR deserialization, communicating via high-performance IPC pipes.",
    codeFile: "dinou/server/main-server.js",
    codeSnippet: `// Dinou Dual-Process IPC Pipeline Architecture:
// -------------------------------------------------------------
// Process A: RSC Flight Generator (react-server condition)
//   └─ Evaluates Server Components, executes DB queries
//   └─ Emits React Flight Wire Stream via IPC Pipe (fd:4)
//
// Process B: HTML SSR Deserializer (react-dom/server)
//   └─ Receives Flight stream from IPC
//   └─ Renders progressive HTML with renderToPipeableStream
//   └─ Streams final HTML directly to the browser
// -------------------------------------------------------------`,
    highlights: [
      {
        title: "No V8 Module Collisions",
        desc: "Guarantees zero memory corruption between server-only and client-only React globals.",
      },
      {
        title: "Sub-Millisecond IPC",
        desc: "Streams Flight buffers across file descriptors with minimal CPU and memory overhead.",
      },
      {
        title: "Portable Everywhere",
        desc: "Compiles down into single-threaded isolates on Cloudflare Workers and multi-threaded Node.",
      },
    ],
  },
};

export function React19Showcase() {
  const [activeTab, setActiveTab] = useState<React19Tab>("actions");
  const [copied, setCopied] = useState(false);

  const current = configs[activeTab];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="react-19"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 backdrop-blur-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block text-cyan-500" />
            100% React 19 Native Architecture
          </Badge>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            React Server Components.{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Zero Black-Box Magic.
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 md:text-lg max-w-2xl leading-relaxed">
            Dinou is not an old framework retrofitted for React 19. It was engineered from day one
            around React 19 primitives: native RSC, Server Functions, and streaming Web standards.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 backdrop-blur-sm mt-4">
            {(["actions", "flight", "pipeline"] as React19Tab[]).map((tabId) => {
              const tab = configs[tabId];
              const isSelected = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-white dark:bg-slate-950 text-cyan-600 dark:text-cyan-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tabId === "actions" && <Zap className="w-4 h-4" />}
                  {tabId === "flight" && <Radio className="w-4 h-4" />}
                  {tabId === "pipeline" && <Workflow className="w-4 h-4" />}
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto">
          {/* Left: Overview & Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <Badge className={current.badgeColor}>
                  {current.badge}
                </Badge>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  React 19 Standards
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {current.headline}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {current.description}
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Architectural Guarantees
                </span>
                <div className="space-y-2.5">
                  {current.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{h.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 pl-5 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                W3C Streams &bull; React Flight
              </span>
              <Button size="sm" variant="outline" className="text-xs border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10" asChild>
                <Link href="/docs/server-client-components">
                  <span>RSC Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Code Viewer */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
                    {current.codeFile}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(current.codeSnippet)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Code Box */}
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs p-4 sm:p-5">
                <pre className="text-slate-200 leading-relaxed overflow-x-auto whitespace-pre">
                  {current.codeSnippet}
                </pre>
              </div>
            </div>

            <div className="pt-4 mt-4 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              100% compliant with React 19 specification &bull; Zero vendor-specific patches
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
