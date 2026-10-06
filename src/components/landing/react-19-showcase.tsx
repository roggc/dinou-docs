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
import { CodeWindow, type CodeFile } from "./code-window";

type React19Tab = "actions" | "rsc";

interface TabConfig {
  id: React19Tab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile?: string;
  codeSnippet?: string;
  files?: CodeFile[];
  benefits: string[];
  docLink: string;
  docLabel: string;
}

const configs: Record<React19Tab, TabConfig> = {
  rsc: {
    id: "rsc",
    title: "1. Server Components (RSC)",
    badge: "0kb Client Bundle",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "0kb JavaScript Shipped for Server Code",
    description:
      "Render markdown parsers, database queries, and heavy backend dependencies on the server. Dinou streams progressive React Flight chunks over standard W3C Web Streams.",
    files: [
      {
        filename: "src/dashboard/page.tsx",
        badge: "RSC",
        language: "tsx",
        code: `// Pure Server Component: 0kb sent to browser
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
      },
    ],
    benefits: [
      "Heavy dependencies stay 100% on the server",
      "Progressive streaming over standard W3C ReadableStream",
    ],
    docLink: "/docs/server-client-components",
    docLabel: "RSC Guide",
  },
  actions: {
    id: "actions",
    title: "2. Server Functions ('use server')",
    badge: "Direct RPC",
    badgeColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    headline: "Dedicated 'use server' Modules with Zero Boilerplate",
    description:
      "In Dinou, Server Functions are declared in dedicated modules starting with 'use server' at the file level. Client components import and call them as seamless RPCs with automatic type safety.",
    files: [
      {
        filename: "src/actions/newsletter.ts",
        badge: '"use server"',
        language: "typescript",
        code: `"use server";

import { db } from "@/lib/db";

// 1. File-level "use server" directive:
// Every exported function becomes a secure Server Function (RPC)
export async function subscribe(formData: FormData) {
  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    throw new Error("Valid email is required");
  }

  await db.subscribers.insert({ email, createdAt: new Date() });
  return { success: true };
}`,
      },
      {
        filename: "src/components/newsletter.tsx",
        badge: '"use client"',
        language: "tsx",
        code: `"use client";

import { useActionState } from "react";
import { subscribe } from "@/actions/newsletter";

// 2. Client Component importing the Server Function directly
export function Newsletter() {
  const [state, formAction, isPending] = useActionState(
    async (_prev, fd) => await subscribe(fd),
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <input name="email" type="email" placeholder="you@domain.com" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Subscribing..." : "Join Newsletter"}
      </button>
      {state?.success && (
        <p className="text-emerald-400 text-sm font-medium">Subscribed successfully!</p>
      )}
    </form>
  );
}`,
      },
    ],
    benefits: [
      "File-level 'use server' ensures strict separation of backend logic",
      "Native React 19 useActionState and useOptimistic support",
    ],
    docLink: "/docs/server-functions",
    docLabel: "Server Functions Guide",
  },
};

export function React19Showcase() {
  const [activeTab, setActiveTab] = useState<React19Tab>("rsc");

  const current = configs[activeTab];

  return (
    <section
      id="react-19"
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 scroll-mt-16 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
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
            {(["rsc", "actions"] as React19Tab[]).map((tabId) => {
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
                  {tabId === "rsc" ? <Server className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
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
                <Link href={current.docLink}>
                  <span>{current.docLabel}</span>
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
              files={current.files}
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
