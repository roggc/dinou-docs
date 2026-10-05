"use client";

import { useState } from "react";
import {
  ShieldCheck,
  MousePointerClick,
  Layers,
  Zap,
  Check,
  Copy,
  ArrowRight,
  Code2,
  Cpu,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";

type TypeSafeTab = "navigation" | "params" | "architecture";

interface TabConfig {
  id: TypeSafeTab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile: string;
  codeSnippet: string;
  features: {
    icon: typeof Zap;
    title: string;
    desc: string;
  }[];
  stat: string;
  statLabel: string;
}

const tabConfigs: Record<TypeSafeTab, TabConfig> = {
  navigation: {
    id: "navigation",
    title: "1. Navigation Autocomplete",
    badge: "Level 1: Outward Navigation",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "Instant IDE Autocomplete & Dead-Link Prevention",
    description:
      "Dinou generates TypeScript route definitions in real time. Your IDE automatically autocompletes all project paths inside <Link> and useRouter(), catching broken URLs at compile-time before reaching production.",
    codeFile: "src/components/navigation.tsx",
    codeSnippet: `import { Link, useRouter } from "dinou";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex gap-4">
      {/* ✅ Instant autocompletion of all project routes */}
      <Link href="/docs/routing">Routing Guide</Link>

      {/* ✅ Typed template strings for dynamic segments */}
      <Link href={\`/blog/\${post.slug}\`}>View Post</Link>

      {/* ✅ Relative paths, query parameters & hashes */}
      <Link href="/demo?tab=settings#profile">Settings</Link>
      <Link href="../about">About</Link>

      {/* ❌ TypeScript compile error on invalid/dead links */}
      {/* <Link href="/unknown-route">Broken Link</Link> */}

      <button onClick={() => router.push("/docs/api-reference")}>
        API Reference
      </button>
    </nav>
  );
}`,
    features: [
      {
        icon: MousePointerClick,
        title: "IntelliSense Autocomplete",
        desc: "Type `<Link href=\"` and immediately see every registered route in your project.",
      },
      {
        icon: CheckCircle2,
        title: "Compile-Time Dead Link Detection",
        desc: "Renaming or deleting a folder triggers immediate TypeScript errors where links are broken.",
      },
      {
        icon: Code2,
        title: "Dynamic Template Literals",
        desc: "Interpolated paths like `/blog/${slug}` are verified against known route pattern literals.",
      },
    ],
    stat: "0",
    statLabel: "Broken Links in Production",
  },
  params: {
    id: "params",
    title: "2. Strictly Typed Parameters",
    badge: "Level 2: Inward Consumption",
    badgeColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    headline: "End-to-End Parameter Inference Without Any",
    description:
      "Pass your route pattern to PageProps, LayoutProps, or RouteParams. Dinou automatically infers the exact TypeScript types for all dynamic segments ([id], [...slug], [[lang]], [[...opt]]) with zero manual interfaces.",
    codeFile: "src/blog/[slug]/page.tsx",
    codeSnippet: `import type { PageProps, LayoutProps, RouteParams } from "dinou";

// 1. Page Component: Inferred params.slug is strongly typed as string
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  return <h1>Post: {params.slug}</h1>;
  // ❌ TypeScript Error: Property 'id' does not exist on type '{ slug: string }'
  // return <h1>{params.id}</h1>;
}

// 2. Layout Component: Strictly types children and params
export function BlogLayout({ children, params }: LayoutProps<"/blog/[slug]">) {
  return (
    <section>
      <header>Category: {params.slug}</header>
      <main>{children}</main>
    </section>
  );
}

// 3. Server Functions (page_functions.ts): Typed without React props
export async function getProps(params: RouteParams<"/blog/[slug]">) {
  return { postTitle: \`Post \${params.slug}\` };
}`,
    features: [
      {
        icon: Layers,
        title: "Automatic Parameter Inference",
        desc: "Converts `[id]` to string, `[...slug]` to string[], and `[[lang]]` to string | undefined.",
      },
      {
        icon: Sparkles,
        title: "IDE Suggestion Workflow",
        desc: "Type `PageProps<\"\">` and press Ctrl+Space to pick your route from a dropdown list.",
      },
      {
        icon: ShieldCheck,
        title: "Safe Server Functions & Error Boundaries",
        desc: "Type `getProps` and `error.tsx` parameters cleanly with standalone `RouteParams<T>`.",
      },
    ],
    stat: "100%",
    statLabel: "Typesafe Components (No 'any')",
  },
  architecture: {
    id: "architecture",
    title: "3. Zero-Runtime Architecture",
    badge: "Zero-Cost TypeScript Engine",
    badgeColor: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10",
    headline: "Sub-2ms Hot In-Memory Scanner & Module Augmentation",
    description:
      "Everything lives strictly within auto-generated .d.ts files. Dinou's file-system scanner runs in under 2ms without importing code or spinning up test servers, keeping production bundles completely clean.",
    codeFile: ".dinou/types/routes.d.ts",
    codeSnippet: `// Auto-generated by Dinou. Do not edit directly.
import "dinou";

declare module "dinou" {
  export type DinouStaticRoutes = "/" | "/docs" | "/docs/routing" | "/blog";
  export type DinouDynamicRoutes = \`/blog/\${string | number}\` | \`/docs/\${string}\`;

  export interface DinouRouteParamsMap {
    "/": Record<string, never>;
    "/blog/[slug]": { slug: string };
    "/docs/[...slug]": { slug: string[] };
  }

  namespace DinouRouter {
    interface Register {
      route: DinouGeneratedRoute;
      params: DinouRouteParamsMap;
    }
  }
}`,
    features: [
      {
        icon: Zap,
        title: "< 2ms In-Memory Scanner",
        desc: "Synchronous readdirSync scans src/ without executing code or launching subprocesses.",
      },
      {
        icon: Cpu,
        title: "Real-Time Dev Watcher",
        desc: "Adding or deleting a page.tsx regenerates types instantly without server restarts.",
      },
      {
        icon: CheckCircle2,
        title: "0 Runtime Bundle Overhead",
        desc: "0 bytes added to client or server bundles. Pure TypeScript declaration augmentation.",
      },
    ],
    stat: "0 B",
    statLabel: "Extra Runtime Overhead",
  },
};

export function TypeSafeShowcase() {
  const [activeTab, setActiveTab] = useState<TypeSafeTab>("navigation");
  const [copied, setCopied] = useState(false);

  const activeConfig = tabConfigs[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeConfig.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="type-safe"
      className="w-full py-16 sm:py-20 md:py-24 scroll-mt-20 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 backdrop-blur-sm font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            Dinou v7 Developer Experience
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Zero-Runtime{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Type-Safe Routing
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 md:text-lg leading-relaxed">
            Eliminate dead links, catch typos at compile-time, and get instant IDE autocompletion for all your routes and parameters with zero bundle cost.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm max-w-xl">
            {(["navigation", "params", "architecture"] as TypeSafeTab[]).map((tab) => {
              const cfg = tabConfigs[tab];
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cfg.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Context, Features & Stat */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className={`text-xs px-3 py-1 font-mono ${activeConfig.badgeColor}`}
              >
                {activeConfig.badge}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {activeConfig.headline}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeConfig.description}
              </p>
            </div>

            {/* Key Stat & Promise Card */}
            <div className="p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {activeConfig.stat}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                  {activeConfig.statLabel}
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-blue-500/30 text-xs sm:text-sm" asChild>
                <Link href="/docs/type-safe-routing">
                  <span>Routing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </div>

            {/* Clear, readable benefits */}
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span>Instant autocompletion on all project routes and dynamic paths</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Zero client bundle weight — resolved entirely by TypeScript compiler</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code Showcase with simulated IDE chrome */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {activeConfig.codeFile}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="h-7 text-xs text-slate-400 hover:text-white hover:bg-slate-800 px-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-200">
                <pre tabIndex={0} className="focus:outline-none">
                  <code>{activeConfig.codeSnippet}</code>
                </pre>
              </div>

              {/* Bottom IDE Status Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>TypeScript 5.x</span>
                  <span>•</span>
                  <span>Dinou Route Scanner (&lt;2ms)</span>
                </div>
                <span className="text-slate-500">UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
