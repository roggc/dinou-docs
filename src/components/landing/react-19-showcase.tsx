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
  statusLeft?: string;
  statusRight?: string;
}

const configs: Record<React19Tab, TabConfig> = {
  rsc: {
    id: "rsc",
    title: "1. Server Components (RSC)",
    badge: "0kb Client Bundle",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "0kb JavaScript Shipped for Server Code",
    description:
      "Render markdown parsers, database queries, and heavy backend dependencies exclusively on the server. Dinou streams progressive React Flight chunks over standard W3C Web Streams directly into the DOM.",
    files: [
      {
        filename: "src/dashboard/page.tsx",
        badge: "RSC",
        language: "tsx",
        code: `// src/dashboard/page.tsx
// Pure Server Component: 0kb sent to browser
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
      {
        filename: "src/dashboard/client-chart.tsx",
        badge: '"use client"',
        language: "tsx",
        code: `// src/dashboard/client-chart.tsx
"use client";

import { useState } from "react";

interface Metric {
  label: string;
  value: number;
}

// Interactive leaf component receiving pre-fetched server data
export function InteractiveChart({ data }: { data: Metric[] }) {
  const [activeRange, setActiveRange] = useState("7d");

  return (
    <div className="p-4 rounded-xl border border-slate-700 bg-slate-900/60 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-slate-400">Range: {activeRange}</span>
        <button
          onClick={() => setActiveRange((r) => (r === "7d" ? "30d" : "7d"))}
          className="text-xs text-cyan-400 hover:underline"
        >
          Toggle Range
        </button>
      </div>
      <div className="flex gap-2 items-end h-24 pt-2">
        {data.map((m, i) => (
          <div
            key={i}
            className="flex-1 bg-cyan-500/80 rounded-t"
            style={{ height: \`\${m.value}%\` }}
          />
        ))}
      </div>
    </div>
  );
}`,
      },
    ],
    benefits: [
      "Heavy dependencies (parsers, ORMs, DB clients) stay 100% on the server",
      "Progressive streaming over standard W3C ReadableStream",
      "Direct database and file-system queries with zero API latency",
      "Seamless composition with Client Components at interactive leaves",
    ],
    docLink: "/docs/server-client-components",
    docLabel: "RSC Guide",
    statusLeft: "Pure Server Component (0kb JS)",
    statusRight: "React Flight Stream",
  },
  actions: {
    id: "actions",
    title: "2. Server Functions ('use server')",
    badge: "Returns React Components & Data",
    badgeColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    headline: "Server Functions Returning React Components",
    description:
      "Dinou Server Functions run over React Flight RPC, executing secure backend logic and returning Client and Server Components with server-fetched props. Client components stream them directly with React 19 use() and <Suspense> without REST boilerplate.",
    files: [
      {
        filename: "src/actions/get-product.tsx",
        badge: '"use server"',
        language: "tsx",
        code: `// src/actions/get-product.tsx
"use server";

import { db } from "@/lib/db";
import { ProductCard } from "@/components/product-card"; // "use client"

// Dinou Server Functions can return full React component trees (Client & Server)
export async function getFeaturedProduct(id: string) {
  // 1. Secure backend execution (direct DB queries, secret APIs)
  const product = await db.products.findById(id);
  if (!product) throw new Error("Product not found");

  // 2. Returns an interactive Client Component over React Flight RPC!
  // Fetched data is passed directly as props with 0kb JSON parsing boilerplate.
  return <ProductCard item={product} />;
}`,
      },
      {
        filename: "src/components/product-feed.tsx",
        badge: '"use client"',
        language: "tsx",
        code: `// src/components/product-feed.tsx
"use client";

import { useState, use, Suspense } from "react";
import { getFeaturedProduct } from "@/actions/get-product";

// Unwraps the Server Function promise with React 19 native use()
function ProductSlot({ promise }: { promise: Promise<React.ReactNode> }) {
  // Suspends automatically until the Flight RPC stream resolves
  const Component = use(promise);
  return <>{Component}</>;
}

export function ProductFeed() {
  const [productPromise, setProductPromise] = useState(() =>
    getFeaturedProduct("prod_01")
  );

  return (
    <div className="space-y-4">
      <button
        onClick={() => setProductPromise(getFeaturedProduct("prod_02"))}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Stream Next Product
      </button>

      {/* Wrapped in Suspense: component streaming without route revalidations */}
      <Suspense fallback={<div className="h-32 bg-slate-800/60 animate-pulse rounded-xl" />}>
        <ProductSlot promise={productPromise} />
      </Suspense>
    </div>
  );
}`,
      },
      {
        filename: "src/components/product-card.tsx",
        badge: '"use client"',
        language: "tsx",
        code: `// src/components/product-card.tsx
"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
}

// Interactive Client Component returned by the Server Function with server props
export function ProductCard({ item }: { item: Product }) {
  const [likes, setLikes] = useState(0);

  return (
    <article className="p-5 rounded-xl border border-slate-700 bg-slate-900/80 space-y-3">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-white">{item.name}</h4>
        <button
          onClick={() => setLikes((l) => l + 1)}
          className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>{likes}</span>
        </button>
      </div>

      <p className="text-xl font-mono text-cyan-400 font-bold">\${item.price} USD</p>

      <button className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-white">
        <ShoppingBag className="w-3.5 h-3.5" /> Quick Order
      </button>
    </article>
  );
}`,
      },
    ],
    benefits: [
      "Return Client & Server Components directly over the Flight RPC wire",
      "Stream interactive UI with native React 19 use() and <Suspense>",
      "Pass server-fetched data as props with zero manual JSON boilerplate",
      "Also fully supports standard mutations with useActionState & useOptimistic",
    ],
    docLink: "/docs/server-functions",
    docLabel: "Server Functions Guide",
    statusLeft: "Flight RPC Component Streaming",
    statusRight: "React 19 use() + Suspense",
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
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm lg:h-[650px] overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5">
              <div className="space-y-3">
                <Badge className={current.badgeColor}>
                  {current.badge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                  {current.headline}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3 pt-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Architectural Guarantees
                </span>
                <div className="space-y-2.5">
                  {current.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between shrink-0">
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
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-[650px]">
            <CodeWindow
              filename={current.codeFile}
              code={current.codeSnippet}
              files={current.files}
              language="tsx"
              statusLeft={current.statusLeft || "React 19 Native Primitives"}
              statusRight={current.statusRight || "W3C Web Streams"}
              className="h-[500px] sm:h-[540px] lg:h-full"
            />
            <div className="pt-3 text-xs text-slate-500 dark:text-slate-400 text-center font-mono shrink-0">
              100% compliant with React 19 specification &bull; Zero vendor-specific patches
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
