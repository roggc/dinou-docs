"use client";

import { useState } from "react";
import {
  FolderTree,
  Layers,
  Route,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Split,
  Globe,
  ShieldAlert,
  Boxes,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";
import { CodeWindow } from "./code-window";

type RoutingTab = "conventions" | "dynamic" | "advanced";

interface TabConfig {
  id: RoutingTab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile: string;
  codeSnippet: string;
  features: {
    icon: typeof Route;
    title: string;
    desc: string;
  }[];
  stat: string;
  statLabel: string;
}

const tabConfigs: Record<RoutingTab, TabConfig> = {
  conventions: {
    id: "conventions",
    title: "1. Nested Layouts & Pages",
    badge: "Persistent Layout State",
    badgeColor: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    headline: "Nested Layouts with Zero Remounting",
    description:
      "Every folder in src/ maps directly to a clean route. Nested layout.tsx files wrap child pages without remounting during navigation, preserving client state, audio playback, and scroll positions.",
    codeFile: "src/dashboard/layout.tsx",
    codeSnippet: `import { Link } from "dinou";

// Nested layout wraps all /dashboard/* child pages
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Persistent sidebar: never remounts across child route changes */}
      <aside className="w-64 border-r border-slate-800 p-4">
        <nav className="space-y-2">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/analytics">Analytics</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      {/* Dynamic page content transitions smoothly */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}`,
    features: [
      {
        icon: Layers,
        title: "Zero Remount Overhead",
        desc: "Parent layouts persist on client transitions; only changing page segments re-render.",
      },
      {
        icon: CheckCircle2,
        title: "Automatic Root Scaffolding",
        desc: "The root `src/layout.tsx` wraps every route with shared HTML and body shells.",
      },
      {
        icon: Sparkles,
        title: "Layout Escape Hatches",
        desc: "Use `reset_layout` or `no_layout` flags to instantly opt out of parent layout trees.",
      },
    ],
    stat: "100%",
    statLabel: "Layout State Preserved",
  },
  dynamic: {
    id: "dynamic",
    title: "2. Dynamic & Catch-All Routes",
    badge: "Parametric Resolution",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "Parametric & Wildcard URL Matching",
    description:
      "Handle dynamic parameters with [id] and multi-segment wildcards with [...slug]. Parameters and query strings are parsed and injected directly into your server component props.",
    codeFile: "src/shop/[category]/[id]/page.tsx",
    codeSnippet: `interface PageProps {
  params: {
    category: string;
    id: string;
  };
  searchParams: Record<string, string | string[]>;
}

// Automatically matches URL: /shop/:category/:id
export default async function ProductPage({ params, searchParams }: PageProps) {
  const { category, id } = params;
  const product = await db.products.findById(id);

  return (
    <article className="space-y-4">
      <span className="text-xs uppercase text-slate-400">{category}</span>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-slate-300">{product.description}</p>
    </article>
  );
}`,
    features: [
      {
        icon: Route,
        title: "Direct Prop Injection",
        desc: "`params` and `searchParams` are cleanly passed to page functions without extra hooks.",
      },
      {
        icon: Globe,
        title: "Catch-All Wildcards",
        desc: "Use `[...slug]` to capture deep paths like docs or CMS trees as a string array.",
      },
      {
        icon: ShieldCheck,
        title: "Sanitized URL Decoding",
        desc: "Dynamic segments are automatically decoded and validated before component execution.",
      },
    ],
    stat: "< 1ms",
    statLabel: "Route Match Resolution",
  },
  advanced: {
    id: "advanced",
    title: "3. Route Groups & Parallel Slots",
    badge: "Modular Architecture",
    badgeColor: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10",
    headline: "Organize Without Polluting URLs",
    description:
      "Organize routes into (group) folders without affecting the public URL path. Render parallel routes with @slot folders for simultaneous views, overlays, and isolated error boundaries.",
    codeFile: "src/(app)/dashboard/layout.tsx",
    codeSnippet: `// Directory layout:
// src/
// ├── (marketing)/          <- Route group: URL is /
// │   └── page.tsx
// ├── (app)/                <- Route group: URL is /dashboard
// │   └── dashboard/
// │       ├── @modal/       <- Parallel slot: rendered in layout
// │       │   └── settings/page.tsx
// │       ├── layout.tsx
// │       └── page.tsx

export default function AppLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Parallel slot rendered concurrently with its own error boundary */}
      {modal}
    </>
  );
}`,
    features: [
      {
        icon: FolderTree,
        title: "Clean Route Groups",
        desc: "Wrap routes in `(folder)` to organize auth, marketing, or app views without path prefixes.",
      },
      {
        icon: Split,
        title: "Parallel Route Slots",
        desc: "Mount multiple pages simultaneously in the same view using `@slot` directory conventions.",
      },
      {
        icon: ShieldAlert,
        title: "Isolated Error Boundaries",
        desc: "Pair slots with localized `error.tsx` so unexpected failures in one widget never crash the page.",
      },
    ],
    stat: "0 URL Impact",
    statLabel: "Route Group Cleanliness",
  },
};

export function RoutingShowcase() {
  const [activeTab, setActiveTab] = useState<RoutingTab>("conventions");
  const activeConfig = tabConfigs[activeTab];

  return (
    <section
      id="routing"
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 scroll-mt-16 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 backdrop-blur-sm font-medium"
          >
            <FolderTree className="w-3.5 h-3.5 mr-1.5 inline-block text-indigo-500" />
            File-System Architecture
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Intuitive File-Based Routing.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Zero Boilerplate.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 md:text-lg leading-relaxed">
            Every folder in <code className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">src/</code> maps directly to a clean route. Nested persistent layouts, dynamic params, route groups, and parallel slots work right out of the box.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm gap-1 max-w-full overflow-x-auto">
            {(
              [
                { id: "conventions", label: "1. Nested Layouts & Pages", icon: Layers },
                { id: "dynamic", label: "2. Dynamic & Catch-All", icon: Route },
                { id: "advanced", label: "3. Route Groups & Slots", icon: Split },
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
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 font-semibold"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Feature Narrative & Highlights */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
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
                  Routing Convention
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                  Dinou Standard
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
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
                      <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0">
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

            {/* Link to Docs */}
            <div>
              <Button
                variant="link"
                size="sm"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-0 h-auto font-medium"
                asChild
              >
                <Link href="/docs/routing" className="inline-flex items-center gap-1.5">
                  <span>Explore full routing specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Window with Syntax Highlighting */}
          <div className="lg:col-span-7">
            <CodeWindow
              filename={activeConfig.codeFile}
              code={activeConfig.codeSnippet}
              language="tsx"
              statusLeft="Dinou File-System Router"
              statusRight="Zero Runtime Overhead"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
