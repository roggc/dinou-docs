"use client";

import { useState, type ReactNode } from "react";
import {
  FileCheck,
  Zap,
  RefreshCw,
  Globe,
  CheckCircle2,
  Tag,
  Timer,
  Cpu,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";
import { CodeWindow, type CodeFile } from "./code-window";

type SsgTab = "ssg" | "isr" | "isg";

interface TabConfig {
  id: SsgTab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile?: string;
  codeSnippet?: string;
  files?: CodeFile[];
  language?: string;
  features: {
    icon: typeof Zap;
    title: string;
    desc: ReactNode;
  }[];
  stat: string;
  statLabel: string;
}

const tabConfigs: Record<SsgTab, TabConfig> = {
  ssg: {
    id: "ssg",
    title: "1. Pure Static (SSG)",
    badge: "Build-Time Pre-rendering",
    badgeColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    headline: "Maximum Velocity with Zero Component Re-Execution",
    description:
      "Dinou is Static by Default: static routes compile into HTML and React Flight wire payloads at build time automatically, while getStaticPaths pre-renders specific pages on dynamic routes for instant delivery.",
    codeFile: "src/blog/[slug]/page_functions.ts",
    language: "typescript",
    codeSnippet: `// 1. Pre-render known slugs at build time (Static by default)
export async function getStaticPaths() {
  const posts = await db.posts.findMany({ select: { slug: true } });
  return posts.map((post) => post.slug);
}

// 2. Fetch post data at build time and pass as props to page.tsx
export async function getProps(params) {
  const post = await db.posts.findUnique({ where: { slug: params.slug } });
  return { post };
}`,
    features: [
      {
        icon: Zap,
        title: "Instant Static Delivery",
        desc: "Dinou serves pre-rendered HTML and RSC payloads directly from disk, memory, or KV without re-running React.",
      },
      {
        icon: Globe,
        title: "Pre-Built HTML & RSC Payloads",
        desc: "Generates both full HTML for initial page loads and Flight payloads for instant client-side navigation.",
      },
      {
        icon: CheckCircle2,
        title: "Rendered Once at Build Time",
        desc: "Components and database queries run only during the build, never on incoming user requests.",
      },
    ],
    stat: "1.45ms",
    statLabel: "TTFB p50 (1,432 req/s @ 200 conns)",
  },
  isr: {
    id: "isr",
    title: "2. Revalidation (ISR)",
    badge: "Stale-While-Revalidate",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "Fresh Content Without Slowing Down Visitors",
    description:
      "Set a simple numeric revalidate in seconds. Dinou serves stale cached assets instantly, triggers a background re-render, and performs an atomic swap without dropping incoming requests.",
    files: [
      {
        filename: "src/products/[id]/page_functions.ts",
        badge: "ISR",
        language: "typescript",
        code: `
// 1. Time-based background revalidation (seconds)
export const revalidate = 60; // Refreshes in background every 1m

// 2. Assign cache tags for programmatic webhook invalidation
export const getCacheTags = (params) => [
  \`product-\${params.id}\`,
  "catalog",
];`,
      },
      {
        filename: "src/products/actions.ts",
        badge: '"use server"',
        language: "typescript",
        code: `
"use server";

import { revalidateTag, revalidatePath } from "dinou/server";

// Trigger instant on-demand purge from Server Actions or webhooks
export async function purgeCatalogCache(productId: string) {
  await revalidateTag("catalog");
  await revalidatePath(\`/products/\${productId}\`);
}`,
      },
    ],
    features: [
      {
        icon: RefreshCw,
        title: "Atomic Safe Swap",
        desc: "New HTML compiles in the background and commits atomically with zero downtime.",
      },
      {
        icon: Tag,
        title: "Tag-Based Purges",
        desc: (
          <>
            Invalidate single records or entire collections instantly using{" "}
            <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">
              revalidateTag()
            </code>
            .
          </>
        ),
      },
      {
        icon: Timer,
        title: "Unified Revalidate Contract",
        desc: "Set >= 1 seconds for background ISR, 0 for dynamic SSR, or omit for permanent static caching.",
      },
    ],
    stat: "1.18ms",
    statLabel: "Cached SWR Response Time",
  },
  isg: {
    id: "isg",
    title: "3. On-Demand (ISG)",
    badge: "Infinite Catalogs",
    badgeColor: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10",
    headline: "Generate Long-Tail Pages on First Access",
    description:
      "Eliminate hours of build time on massive catalogs. Pre-render your top pages at build time, and let Incremental Static Generation (ISG) compile remaining pages on first visit with built-in parameter validation.",
    codeFile: "src/docs/[...slug]/page_functions.ts",
    language: "typescript",
    codeSnippet: `// 1. Pre-render only top popular articles at build time
export async function getStaticPaths() {
  return popularDocs.map((doc) => doc.slug.split("/"));
}

// 2. allowISG defaults to true (configurable globally in dinou.config.js or per segment)
// export const allowISG = false;

// 3. Validate params to reject invalid routes & prevent cache poisoning
export async function validateParams(params) {
  return db.docs.exists({ slug: params.slug.join("/") });
}`,
    features: [
      {
        icon: Cpu,
        title: "Lean Build Times",
        desc: "Pre-render critical routes at build; let ISG generate the long tail on demand.",
      },
      {
        icon: ShieldCheck,
        title: "Anti-Poisoning Guard",
        desc: (
          <>
            <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">
              validateParams
            </code>{" "}
            checks route existence before wasting CPU or disk space.
          </>
        ),
      },
      {
        icon: Layers,
        title: "Instant Promotion to Cache",
        desc: "Once compiled, the page is cached and served statically to all subsequent visitors.",
      },
    ],
    stat: "0ms",
    statLabel: "Build-Time Cost for Long-Tail Routes",
  },
};

export function SsgShowcase() {
  const [activeTab, setActiveTab] = useState<SsgTab>("ssg");
  const activeConfig = tabConfigs[activeTab];

  return (
    <section
      id="ssg"
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 scroll-mt-16 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 backdrop-blur-sm font-medium"
          >
            <FileCheck className="w-3.5 h-3.5 mr-1.5 inline-block text-emerald-500" />
            Static by Default Architecture
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Static by Default.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Incremental at Scale.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 md:text-lg leading-relaxed">
            Every route compiles to pre-rendered HTML and Flight payloads by default. Seamlessly scale with build-time SSG, time-based ISR, on-demand ISG, and tag-based cache purges.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm gap-1 max-w-full overflow-x-auto">
            {(
              [
                { id: "ssg", label: "1. Pure Static (SSG)", icon: Zap },
                { id: "isr", label: "2. Revalidation (ISR)", icon: RefreshCw },
                { id: "isg", label: "3. On-Demand (ISG)", icon: Cpu },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Feature Narrative & Highlights (No outer card, scrollable if overflowing) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:h-[630px] overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-6">
              <div className="space-y-3">
                <Badge variant="outline" className={`px-3 py-1 font-medium ${activeConfig.badgeColor}`}>
                  {activeConfig.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {activeConfig.headline}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                  {activeConfig.description}
                </p>
              </div>

              {/* Metric Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Cache Metric
                  </span>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                      activeTab === "ssg"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : activeTab === "isr"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    Verified Standard
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                      activeTab === "ssg"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : activeTab === "isr"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {activeConfig.stat}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    {activeConfig.statLabel}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {activeConfig.features.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`p-1 rounded-md mt-0.5 shrink-0 ${
                            activeTab === "ssg"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : activeTab === "isr"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-xs sm:text-sm">
                          <strong className="text-slate-900 dark:text-white">{feat.title}:</strong>{" "}
                          <span className="text-slate-600 dark:text-slate-300">{feat.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Link to Docs */}
            <div className="pt-2 shrink-0">
              <Button
                variant="link"
                size="sm"
                className={`p-0 h-auto font-medium ${
                  activeTab === "ssg"
                    ? "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    : activeTab === "isr"
                    ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    : "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                }`}
                asChild
              >
                <Link href="/docs/rendering" className="inline-flex items-center gap-1.5">
                  <span>Explore rendering &amp; revalidation specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Window with Syntax Highlighting */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-[630px]">
            <CodeWindow
              filename={activeConfig.codeFile}
              code={activeConfig.codeSnippet}
              files={activeConfig.files}
              language={activeConfig.language}
              statusLeft="Dinou Static &amp; ISR Engine"
              statusRight="1.18ms–1.45ms p50 TTFB"
              className="h-[500px] sm:h-[540px] lg:h-[630px] w-full shrink-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
