"use client";

import { useState } from "react";
import {
  ShieldCheck,
  MousePointerClick,
  Layers,
  Zap,
  ArrowRight,
  Code2,
  Cpu,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";
import { CodeWindow, type CodeFile } from "./code-window";

type TypeSafeTab = "navigation" | "params" | "architecture";

interface TabConfig {
  id: TypeSafeTab;
  title: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  codeFile?: string;
  codeSnippet?: string;
  files?: CodeFile[];
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
      "Dinou generates TypeScript route definitions in real time. Your IDE autocompletes static routes, dynamic [param] patterns with validated params, and strict relative targets inside <Link> and useRouter().",
    codeFile: "src/components/navigation.tsx",
    codeSnippet: `import { Link, useRouter } from "dinou";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex gap-4">
      {/* ✅ Instant autocompletion of static & dynamic routes */}
      <Link href="/docs/routing">Routing Guide</Link>
      <Link to="/blog/[slug]" params={{ slug: post.slug }}>View Post</Link>

      {/* ✅ Strict relative paths with from, queries & hashes */}
      <Link href="/demo?tab=settings#profile">Settings</Link>
      <Link from="/docs/routing" to="../navigation">Navigation</Link>

      {/* ❌ TypeScript error in IDE on invalid/dead links */}
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
        desc: 'Type `<Link href="` or `to="` to autocomplete static routes, `[param]` patterns, and relative targets.',
      },
      {
        icon: CheckCircle2,
        title: "Dead-Link & Escaped-Route Detection",
        desc: "Renaming, deleting, or parking a folder with `_folder` flags broken links immediately.",
      },
      {
        icon: Code2,
        title: "Validated Dynamic `params` & URL Encoding",
        desc: "Passing `to=\"/blog/[slug]\"` enforces a typed `params` object and URL-encodes segments safely.",
      },
    ],
    stat: "0",
    statLabel: "Broken Links in Production",
  },
  params: {
    id: "params",
    title: "2. Contextual ./dinou & Params",
    badge: "Level 2: Zero-Boilerplate Segments",
    badgeColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    headline: "Zero-Boilerplate Segment Types via Contextual ./dinou",
    description:
      'Import directly from "./dinou" in any route folder (or pass a pattern to PageProps<T> from "dinou"). Dinou pre-binds dynamic params, sibling @slot ReactNode props, and relative navigation automatically.',
    files: [
      {
        filename: "src/blog/[slug]/page.tsx",
        badge: "./dinou (0 Boilerplate)",
        language: "tsx",
        code: `
// Contextual "./dinou" pre-binds PageProps, Link & useRouter to this folder!
import { Link, type PageProps } from "./dinou";

export default function BlogPost({ params, postTitle }: PageProps<{ postTitle: string }>) {
  // ✅ params.slug is string & relative <Link> needs no "from" prop!
  return <Link to="comments">{postTitle} ({params.slug})</Link>;

  // ❌ TypeScript Error: Property 'id' does not exist on type '{ slug: string }'
  // return <h1>{params.id}</h1>;
}`,
      },
      {
        filename: "src/blog/[slug]/layout.tsx",
        badge: "Layout + @Slot",
        language: "tsx",
        code: `
import type { LayoutProps } from "./dinou";
// (Or globally: import type { LayoutProps } from "dinou" -> LayoutProps<"/blog/[slug]">)

// Auto-infers params.slug AND any sibling @sidebar parallel slot!
export default function BlogLayout({
  children,
  params,
  sidebar,
}: LayoutProps) {
  return (
    <section className="flex gap-6">
      <aside>{sidebar}</aside>
      <main>
        <header>Slug: {params.slug}</header>
        {children}
      </main>
    </section>
  );
}`,
      },
      {
        filename: "src/blog/[slug]/page_functions.ts",
        badge: "PageFunctions",
        language: "typescript",
        code: `
import type { PageFunctions } from "./dinou";

type PostPage = PageFunctions<{ postTitle: string }>;

// Zero route-string repetition — rename the folder and types update automatically!
export const getProps: PostPage["getProps"] = async (params) => {
  return { postTitle: \`Post \${params.slug}\` };
};`,
      },
    ],
    features: [
      {
        icon: Sparkles,
        title: "Contextual `./dinou` Virtual Modules",
        desc: "Pre-binds `PageProps`, `LayoutProps`, `SlotProps`, `Link`, and `useRouter` to each route folder.",
      },
      {
        icon: Layers,
        title: "Automatic Parameter & `@slot` Inference",
        desc: "Infers `[id]`, `[...slug]`, `[[opt]]`, and sibling `@slot` props with zero manual interfaces.",
      },
      {
        icon: ShieldCheck,
        title: "Full Lifecycle & Server Coverage",
        desc: "Types `page_functions.ts`, `layout_functions.ts`, `error.tsx`, and `not_found.tsx` (also in `dinou/server`).",
      },
    ],
    stat: "100%",
    statLabel: "Typesafe Segments (No 'any')",
  },
  architecture: {
    id: "architecture",
    title: "3. Typegen & rootDirs Engine",
    badge: "CLI + Live Dev Watcher",
    badgeColor: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10",
    headline: "Full Topology Declarations Without Polluting src/",
    description:
      'Run npx dinou typegen (or let dinou dev / dinou build sync automatically). Dinou writes global topology maps to .dinou/types/routes.d.ts and contextual shims to .dinou/routes/, mapped cleanly onto src/ via TypeScript rootDirs.',
    files: [
      {
        filename: ".dinou/types/routes.d.ts",
        badge: "Auto-Generated",
        language: "typescript",
        code: `// Auto-generated by Dinou (npx dinou typegen). Do not edit directly.
import "dinou";

declare module "dinou" {
  export interface DinouRouteParamsMap {
    "/": Record<string, never>;
    "/blog/[slug]": { slug: string };
    "/docs/[...slug]": { slug: string[] };
  }

  export interface DinouLayoutSlotsMap {
    "/": {};
    "/blog/[slug]": { sidebar?: React.ReactNode };
  }

  namespace DinouRouter {
    interface Register {
      route: DinouGeneratedRoute;
      navigableParams: DinouNavigableParamsMap;
      params: DinouRouteParamsMap;
      layoutParams: DinouLayoutParamsMap;
      layoutSlots: DinouLayoutSlotsMap;
      slotParams: DinouSlotParamsMap;
      errorParams: DinouErrorParamsMap;
    }
  }
}`,
      },
      {
        filename: "tsconfig.json",
        badge: "rootDirs",
        language: "json",
        code: `{
  "compilerOptions": {
    "rootDirs": ["src", ".dinou/routes"],
    "paths": { "@/*": ["./src/*"] },
    "strict": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["src", "dinou-env.d.ts", ".dinou/types/**/*.d.ts"]
}`,
      },
    ],
    features: [
      {
        icon: Zap,
        title: "< 2ms Topology Scanner & `dinou typegen`",
        desc: "Scans pages, intermediate layouts, `@slots`, `(groups)`, and boundaries in memory.",
      },
      {
        icon: Cpu,
        title: "Clean `src/` via TypeScript `rootDirs`",
        desc: "Generated `.dinou/routes/**/dinou.d.ts` files overlay onto `src/` without cluttering your tree.",
      },
      {
        icon: CheckCircle2,
        title: "Zero Type-Declaration Bundle Cost",
        desc: "Pure `.d.ts` declarations vanish at compile time across esbuild, Rollup, and Webpack.",
      },
    ],
    stat: "0 B",
    statLabel: "Type Declaration Bundle Cost",
  },
};

export function TypeSafeShowcase() {
  const [activeTab, setActiveTab] = useState<TypeSafeTab>("navigation");

  const activeConfig = tabConfigs[activeTab];

  return (
    <section
      id="type-safe"
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 scroll-mt-16 relative bg-transparent"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 backdrop-blur-sm font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            Dinou Developer Experience
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Zero-Boilerplate{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Type-Safe Routing
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 md:text-lg leading-relaxed">
            Eliminate dead links, catch route typos at compile time, and get instant IDE autocompletion for routes, parameters, parallel slots, and relative navigation.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center mt-4">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 backdrop-blur-sm max-w-full overflow-x-auto">
              {(["navigation", "params", "architecture"] as TypeSafeTab[]).map((tab) => {
                const cfg = tabConfigs[tab];
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Context, Features & Stat (No outer card, scrollable if overflowing) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:h-[630px] overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5">
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
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeConfig.description}
                </p>
              </div>

              {/* Key Stat & Promise Card */}
              <div className="p-4 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                    {activeConfig.stat}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                    {activeConfig.statLabel}
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-[10px] px-2 py-0.5">
                  Compile-Time
                </Badge>
              </div>

              {/* Dynamic Per-Tab Feature Highlights */}
              <div className="space-y-2.5 pt-0.5">
                {activeConfig.features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start gap-3"
                    >
                      <div className="p-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-slate-900 dark:text-white">{feat.title}:</strong>{" "}
                        <span className="text-slate-600 dark:text-slate-300">
                          {feat.desc.split(/(`[^`]+`)/g).map((p, idx) =>
                            p.startsWith("`") && p.endsWith("`") ? (
                              <code
                                key={idx}
                                className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs"
                              >
                                {p.slice(1, -1)}
                              </code>
                            ) : (
                              p
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Link to Docs */}
            <div className="pt-2 shrink-0">
              <Button
                variant="link"
                size="sm"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto font-medium"
                asChild
              >
                <Link href="/docs/type-safe-routing" className="inline-flex items-center gap-1.5">
                  <span>Explore type-safe routing specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Showcase with simulated IDE chrome */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-[630px]">
            <CodeWindow
              filename={activeConfig.codeFile}
              code={activeConfig.codeSnippet}
              files={activeConfig.files}
              language="tsx"
              statusLeft="Dinou Route Scanner (<2ms)"
              statusRight="TypeScript 5+ Ready"
              className="h-[500px] sm:h-[540px] lg:h-[630px] w-full shrink-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
