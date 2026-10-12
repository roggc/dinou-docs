"use client";

import { useState } from "react";
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
import { CodeWindow } from "./code-window";

type SsgTab = "ssg" | "isr" | "isg";

interface TabConfig {
  id: SsgTab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile: string;
  codeSnippet: string;
  language: string;
  features: {
    icon: typeof Zap;
    title: string;
    desc: string;
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
    headline: "Maximum Velocity with Zero Origin Execution",
    description:
      "Dinou is Static by Default. Routes compile into static HTML and React Flight wire payloads at build time. Use getStaticPaths to pre-render marketing pages, blogs, and documentation for instant 0ms TTFB edge delivery.",
    codeFile: "src/blog/[slug]/page_functions.ts",
    language: "typescript",
    codeSnippet: `// 1. Pre-render known slugs at build time
export async function getStaticPaths() {
  const posts = await db.posts.findMany({ select: { slug: true } });

  return posts.map((post) => ({
    params: { slug: post.slug },
  }));
}

// 2. Pure static route: served permanently from edge cache
export const revalidate = false; // Never expires automatically`,
    features: [
      {
        icon: Zap,
        title: "0ms Time-to-First-Byte",
        desc: "Served directly as static files from memory or CDN with zero runtime execution.",
      },
      {
        icon: Globe,
        title: "Global Edge Distribution",
        desc: "Deploy statically to Cloudflare Workers, Netlify, or any standard static host.",
      },
      {
        icon: CheckCircle2,
        title: "Zero Origin Load",
        desc: "Traffic spikes and viral surges never touch your origin server or database.",
      },
    ],
    stat: "0ms",
    statLabel: "Origin Server Execution",
  },
  isr: {
    id: "isr",
    title: "2. Revalidation (ISR)",
    badge: "Stale-While-Revalidate",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "Fresh Content Without Slowing Down Visitors",
    description:
      "Set a simple numeric revalidate in seconds. Dinou serves stale cached assets in under 5ms, triggers a background re-render, and performs an atomic swap without dropping incoming requests.",
    codeFile: "src/products/[id]/page_functions.ts",
    language: "typescript",
    codeSnippet: `// 1. Time-based background revalidation (seconds)
export const revalidate = 60; // Refreshes in background every 1m

// 2. Assign cache tags for programmatic webhook invalidation
export const getCacheTags = ({ params }) => [
  \`product-\${params.id}\`,
  "catalog",
];

// 3. Trigger instant on-demand purge from headless CMS or Server Actions:
// await revalidateTag("catalog");
// await revalidatePath("/products/laptop");`,
    features: [
      {
        icon: RefreshCw,
        title: "Atomic Safe Swap",
        desc: "New HTML compiles in the background and commits atomically with zero downtime.",
      },
      {
        icon: Tag,
        title: "Tag-Based Purges",
        desc: "Invalidate single records or entire collections instantly using `revalidateTag()`.",
      },
      {
        icon: Timer,
        title: "Intuitive Seconds API",
        desc: "Clear numeric durations without complex cron strings or cache headers.",
      },
    ],
    stat: "< 5ms",
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
  return popularDocs.map((doc) => ({
    params: { slug: doc.slug.split("/") },
  }));
}

// 2. Allow on-demand static generation for the long tail
export const allowISG = true;

// 3. Validate params to reject invalid routes & prevent cache poisoning
export async function validateParams({ params }) {
  return db.docs.exists({ slug: params.slug.join("/") });
}`,
    features: [
      {
        icon: Cpu,
        title: "10x Faster Build Times",
        desc: "Pre-render critical routes at build; let ISG generate the long tail on demand.",
      },
      {
        icon: ShieldCheck,
        title: "Anti-Poisoning Guard",
        desc: "`validateParams` checks route existence before wasting CPU or disk space.",
      },
      {
        icon: Layers,
        title: "Instant Promotion to Cache",
        desc: "Once compiled, the page is cached and served statically to all subsequent visitors.",
      },
    ],
    stat: "10x",
    statLabel: "Build Time Acceleration",
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
          {/* Left Column: Card with Context, Stat & Features */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm lg:h-[630px] overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5">
              <div className="space-y-3">
                <Badge variant="outline" className={`text-xs px-3 py-1 font-mono ${activeConfig.badgeColor}`}>
                  {activeConfig.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {activeConfig.headline}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeConfig.description}
                </p>
              </div>

              {/* Key Stat & Cache Metric Card */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {activeConfig.stat}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                    {activeConfig.statLabel}
                  </div>
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] px-2 py-0.5">
                  Verified v7
                </Badge>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2.5 pt-1">
                {activeConfig.features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start gap-3"
                    >
                      <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
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

            {/* Card Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Incremental Static Engine
              </span>
              <Button size="sm" variant="outline" className="text-xs sm:text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10" asChild>
                <Link href="/docs/rendering">
                  <span>SSG &amp; ISR Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Window with Syntax Highlighting */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-[630px]">
            <CodeWindow
              filename={activeConfig.codeFile}
              code={activeConfig.codeSnippet}
              language={activeConfig.language}
              statusLeft="Dinou Static &amp; ISR Engine"
              statusRight="0ms TTFB Edge Cache"
              className="h-[500px] sm:h-[540px] lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
