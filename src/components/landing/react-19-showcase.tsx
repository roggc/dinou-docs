"use client";

import { useState } from "react";
import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Server,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";
import { CodeWindow } from "./code-window";

type React19Tab = "actions" | "rsc";

interface TabConfig {
  id: React19Tab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile: string;
  codeSnippet: string;
  benefits: string[];
}

const configs: Record<React19Tab, TabConfig> = {
  actions: {
    id: "actions",
    title: "1. Server Functions ('use server')",
    badge: "Direct RPC",
    badgeColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    headline: "Backend Logic Directly in Your Components",
    description:
      "Execute backend mutations directly from your React components without writing manual API endpoints, fetch boilerplate, or serialization layers. 100% native React 19.",
    codeFile: "src/components/newsletter.tsx",
    codeSnippet: `// 1. Direct Server Function (runs securely on backend)
async function subscribe(formData: FormData) {
  "use server";
  const email = formData.get("email");
  await db.subscribers.insert({ email });
  return { success: true };
}

// 2. Client Component using React 19 native action hook
export function Newsletter() {
  const [state, formAction, isPending] = useActionState(
    async (_prev, fd) => await subscribe(fd),
    null
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" placeholder="you@domain.com" />
      <button disabled={isPending}>
        {isPending ? "Subscribing..." : "Join"}
      </button>
    </form>
  );
}`,
    benefits: [
      "Zero manual API routes or fetch wrappers needed",
      "Native React 19 useActionState and useOptimistic support",
    ],
  },
  rsc: {
    id: "rsc",
    title: "2. Server Components (RSC)",
    badge: "0kb Client Bundle",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "0kb JavaScript Shipped for Server Code",
    description:
      "Render markdown parsers, database queries, and heavy backend dependencies on the server. Dinou streams progressive React Flight chunks over standard W3C Web Streams.",
    codeFile: "src/dashboard/page.tsx",
    codeSnippet: `// Pure Server Component: 0kb sent to browser
import { db } from "@/lib/db";
import { MarkdownParser } from "@/lib/heavy-parser";
import { InteractiveChart } from "./client-chart"; // "use client"

export default async function DashboardPage() {
  // Direct database query on server
  const reports = await db.reports.findLatest();
  const summaryHtml = MarkdownParser.render(reports.raw);

  return (
    <main className="space-y-6">
      <h1>Production Analytics</h1>
      <div dangerouslySetInnerHTML={{ __html: summaryHtml }} />

      {/* Only this interactive leaf downloads client JS */}
      <InteractiveChart data={reports.metrics} />
    </main>
  );
}`,
    benefits: [
      "Heavy dependencies stay 100% on the server",
      "Progressive streaming over standard W3C ReadableStream",
    ],
  },
};

export function React19Showcase() {
  const [activeTab, setActiveTab] = useState<React19Tab>("actions");

  const current = configs[activeTab];

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

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Dinou was engineered from the ground up for React 19 primitives: native Server Components,
            direct Server Functions, and streaming Web standards.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-2 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 mt-4">
            {(["actions", "rsc"] as React19Tab[]).map((tabId) => {
              const tab = configs[tabId];
              const isSelected = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-white dark:bg-slate-950 text-cyan-600 dark:text-cyan-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tabId === "actions" ? <Zap className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left: Overview & Key Benefits */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge className={current.badgeColor}>
                  {current.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                  {current.headline}
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Architectural Guarantees
                </span>
                <div className="space-y-2.5">
                  {current.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                W3C Web Standards
              </span>
              <Button size="sm" variant="outline" className="text-xs sm:text-sm border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10" asChild>
                <Link href="/docs/server-client-components">
                  <span>RSC Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Code Viewer */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <CodeWindow
              filename={current.codeFile}
              code={current.codeSnippet}
              language="tsx"
              statusLeft="React 19 Native Primitives"
              statusRight="W3C Web Streams"
            />
            <div className="pt-4 text-xs text-slate-500 dark:text-slate-400 text-center font-mono">
              100% compliant with React 19 specification &bull; Zero vendor-specific patches
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
