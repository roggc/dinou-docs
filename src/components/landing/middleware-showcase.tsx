"use client";

import { useState } from "react";
import {
  Webhook,
  Sliders,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Database,
  ArrowRight,
  Globe,
  Sparkles,
  Layers,
  Cpu,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "dinou";
import { CodeWindow } from "./code-window";

type MiddlewareTab = "webhooks" | "auth" | "config";

interface TabConfig {
  id: MiddlewareTab;
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

const tabConfigs: Record<MiddlewareTab, TabConfig> = {
  webhooks: {
    id: "webhooks",
    title: "1. Fast-Path Webhooks",
    badge: "0ms React Overhead",
    badgeColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    headline: "Short-Circuit Webhooks with Zero SSR Overhead",
    description:
      "Handle high-frequency webhooks (Stripe, Clerk, GitHub) directly at the HTTP layer. Returning a standard Web Response short-circuits the request pipeline and completely bypasses React component rendering.",
    codeFile: "dinou.config.mjs",
    language: "javascript",
    codeSnippet: `import { defineConfig } from "dinou";

export default defineConfig({
  plugins: [
    {
      name: "stripe-webhooks",
      async onRequest(request) {
        const url = new URL(request.url);

        // Fast-path webhooks: short-circuit before React renders
        if (url.pathname === "/api/webhooks/stripe") {
          const signature = request.headers.get("stripe-signature");
          const payload = await request.text();
          await stripe.events.verify(payload, signature);

          // Returns pure Web Standard Response in < 2ms
          return Response.json({ received: true }, { status: 200 });
        }
      },
    },
  ],
});`,
    features: [
      {
        icon: Zap,
        title: "Bypass React Rendering",
        desc: "Return a standard Web Response instance to abort SSR execution immediately.",
      },
      {
        icon: ShieldCheck,
        title: "Raw Body Verification",
        desc: "Read pristine unparsed request streams for HMAC and cryptographic webhook checks.",
      },
      {
        icon: Globe,
        title: "Universal Runtime",
        desc: "Runs with identical behavior across Cloudflare, Node.js, Bun, and Deno.",
      },
    ],
    stat: "< 2ms",
    statLabel: "Webhook Processing Time",
  },
  auth: {
    id: "auth",
    title: "2. Global Auth & Context",
    badge: "AsyncLocalStorage Context",
    badgeColor: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10",
    headline: "Route Protection & Request Context Injection",
    description:
      "Inspect session cookies, verify JWTs, and mutate Dinou's request context store before React begins rendering. Access authenticated user records in any Server Component with getContext().",
    codeFile: "plugins/auth-guard.ts",
    language: "typescript",
    codeSnippet: `import type { DinouPlugin } from "dinou";

export const authPlugin: DinouPlugin = {
  name: "auth-guard",
  async onRequest(request, context) {
    const url = new URL(request.url);

    // Redirect unauthenticated visitors away from /dashboard
    if (url.pathname.startsWith("/dashboard")) {
      const token = context.req.cookies["session_token"];
      if (!token) {
        return Response.redirect(new URL("/login", request.url), 302);
      }

      // Injects user into AsyncLocalStorage context
      context.user = await verifySession(token);
    }
  },
};`,
    features: [
      {
        icon: Lock,
        title: "Edge Route Guards",
        desc: "Redirect unauthorized visitors at the network edge before HTML generation starts.",
      },
      {
        icon: Layers,
        title: "Zero Prop Drilling",
        desc: "Attached context properties are globally accessible in Server Components via `getContext()`.",
      },
      {
        icon: CheckCircle2,
        title: "Multi-Environment Binding",
        desc: "Context automatically binds across SSR, Flight streams, and Server Functions.",
      },
    ],
    stat: "0 B",
    statLabel: "Client Bundle Footprint",
  },
  config: {
    id: "config",
    title: "3. Framework Extensibility",
    badge: "dinou.config.mjs",
    badgeColor: "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10",
    headline: "Centralized Runtime & Compiler Control",
    description:
      "A single type-safe configuration file controls global Partial Prerendering (PPR), React StrictMode development parity, pluggable ISR cache backends, and sequential plugin chains.",
    codeFile: "dinou.config.mjs",
    language: "javascript",
    codeSnippet: `import { defineConfig } from "dinou";
import { redisStorage } from "./src/lib/redis-storage";
import { authPlugin } from "./plugins/auth-guard";

export default defineConfig({
  // 1. Global Partial Prerendering (v7)
  ppr: true,

  // 2. StrictMode development enforcement for React Compiler
  reactStrictMode: true,

  // 3. Pluggable distributed ISR cache adapter (Redis, Cloudflare KV)
  storage: redisStorage,

  // 4. Sequential middleware and lifecycle plugins
  plugins: [authPlugin],
});`,
    features: [
      {
        icon: Database,
        title: "Pluggable Storage Adapters",
        desc: "Swap local filesystem for Redis or edge KV with a single configuration option.",
      },
      {
        icon: Sparkles,
        title: "Global PPR Toggle",
        desc: "Enable instant static shell generation across all eligible routes by default.",
      },
      {
        icon: Cpu,
        title: "React Compiler Parity",
        desc: "Enforce StrictMode in development to catch side-effects and hydration mismatches early.",
      },
    ],
    stat: "100%",
    statLabel: "Web Standards Compliance",
  },
};

export function MiddlewareShowcase() {
  const [activeTab, setActiveTab] = useState<MiddlewareTab>("webhooks");
  const activeConfig = tabConfigs[activeTab];

  return (
    <section
      id="middleware"
      className="w-full pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-24 scroll-mt-16 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center space-y-4 text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 backdrop-blur-sm font-medium"
          >
            <Webhook className="w-3.5 h-3.5 mr-1.5 inline-block text-cyan-500" />
            Universal Lifecycle &amp; Middleware
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
            Universal Middleware &amp; Webhooks.{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Zero SSR Overhead.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 md:text-lg leading-relaxed">
            Configure global runtime behavior, intercept webhooks, inject request contexts, and enforce security policies with standard Web APIs in <code className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-cyan-600 dark:text-cyan-400">dinou.config.mjs</code>.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm gap-1 max-w-full overflow-x-auto">
            {(
              [
                { id: "webhooks", label: "1. Fast-Path Webhooks", icon: Zap },
                { id: "auth", label: "2. Auth Guards & Context", icon: Lock },
                { id: "config", label: "3. dinou.config.mjs", icon: Sliders },
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
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/25 font-semibold"
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
                    Performance Guarantee
                  </span>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                      activeTab === "webhooks"
                        ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                        : activeTab === "auth"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    Verified v7
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                      activeTab === "webhooks"
                        ? "text-cyan-600 dark:text-cyan-400"
                        : activeTab === "auth"
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
                            activeTab === "webhooks"
                              ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                              : activeTab === "auth"
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
                  activeTab === "webhooks"
                    ? "text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
                    : activeTab === "auth"
                    ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    : "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                }`}
                asChild
              >
                <Link href="/docs/plugins" className="inline-flex items-center gap-1.5">
                  <span>Explore plugin &amp; middleware specifications</span>
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
              language={activeConfig.language}
              statusLeft="Dinou Plugin Pipeline"
              statusRight="Standard Request / Response"
              className="h-[500px] sm:h-[540px] lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
