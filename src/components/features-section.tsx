import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cpu,
  Boxes,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRightLeft,
  Gauge,
  Globe,
  Sliders,
  Sparkles,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Gauge,
      color: "blue",
      title: "Universal Streaming Engine",
      description: "In-process orchestration using native React 19 Web Streams and standard W3C primitives.",
      bullets: [
        "Native React Server Components (RSC) and asynchronous Suspense streaming",
        "Edge-ready SSR with react-dom/server streaming pipelines",
        "Standard W3C Request, Response, and ReadableStream architecture",
        "Flat, predictable memory footprint with zero subprocess overhead",
      ],
    },
    {
      icon: Globe,
      color: "purple",
      title: "Deploy Everywhere",
      description: "Write your application once. Dinou compiles it to any production runtime in the world.",
      bullets: [
        "Cloudflare Workers: V8 isolates with Cloudflare KV at the edge",
        "Bun: Ultra-fast standalone or single self-contained executable binary",
        "Deno: Native TypeScript with embedded Deno KV & Deno Deploy",
        "Node.js AOT in-process (Docker/K8s) & 100% Static Site Generation (SSG)",
      ],
    },
    {
      icon: Zap,
      color: "amber",
      title: "Fast Developer Experience (DX)",
      description: "Rapid hot reloading with in-memory serving and instant feedback.",
      bullets: [
        "In-memory development server with zero-disk I/O latency",
        "Fast incremental rebuilds powered by SWC and modern bundlers",
        "Instant Hot CSS swapping without full page reloads",
        "Seamless workflow with standard React 19 ergonomics",
      ],
    },
    {
      icon: Boxes,
      color: "emerald",
      title: "Symmetric Bundler Freedom",
      description: "True bundler agnosticism with identical semantics and performance parity.",
      bullets: [
        "esbuild (default): Sub-second builds for high-speed day-to-day work",
        "Rollup: Precision tree-shaking and production chunk optimization",
        "Webpack: Full compatibility for enterprise ecosystems and plugins",
        "Switch seamlessly via npm scripts (e.g. npm run dev:rollup)",
      ],
    },
    {
      icon: Sliders,
      color: "indigo",
      title: "Universal Middleware & Webhooks",
      description: "Native W3C Web Standards request interception and context sharing.",
      bullets: [
        "onRequest(request, context) hook in dinou.config.js",
        "Sub-millisecond early return for Stripe, Clerk, or Svix webhooks",
        "Route guards with instant redirects before React component evaluation",
        "Synchronous context enrichment accessible anywhere via getContext()",
      ],
    },
    {
      icon: Sparkles,
      color: "rose",
      title: "Pure React 19 Core Foundation",
      description: "Direct integration with core React 19 primitives with zero proprietary lock-in.",
      bullets: [
        "React Server Components (RSC) and asynchronous Suspense streaming",
        "Server Functions ('use server') RPC with O(1) discovery fast-path",
        "React StrictMode development parity with React Compiler (Babel)",
        "SPA navigation with Link prefetching and View Transitions support",
      ],
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-24 sm:py-32 md:py-36 bg-slate-50/80 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 relative"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-14 sm:mb-16">
          <Badge
            variant="outline"
            className="px-3.5 py-1 border-slate-300 dark:border-slate-700 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-medium"
          >
            Dinou v7 Architecture
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100">
            Engineered for Absolute Freedom & Speed
          </h2>
          <p className="mx-auto max-w-[720px] text-slate-600 dark:text-slate-300 md:text-xl">
            Discover the six core architectural pillars that make Dinou v7 the fastest, most flexible React 19 framework in the ecosystem.
          </p>
        </div>

        {/* 3 columns on large screens, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="relative overflow-hidden bg-white/90 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-3 text-slate-900 dark:text-slate-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-100 font-bold">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2.5">
                      {feature.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                          <CheckCircle2 className="mr-2 h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
