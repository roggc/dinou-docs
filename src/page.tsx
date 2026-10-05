import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Github,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "dinou";
import { TerminalTabs } from "@/components/landing/terminal-tabs";
import { SegmentationShowcase } from "@/components/landing/segmentation-showcase";
import { DeployMatrix } from "@/components/landing/deploy-matrix";
import { TypeSafeShowcase } from "@/components/landing/type-safe-showcase";
import { EngineComparison } from "@/components/landing/engine-comparison";
import { FeaturesSection } from "@/components/features-section";

export default function Page() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Background Gradients & Grid */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]" />

      {/* Hero Section */}
      <section id="main" className="w-full pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-24 scroll-mt-20 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-6 sm:space-y-8 text-center max-w-4xl mx-auto">
            {/* Version Badge */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-xs sm:text-sm border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 backdrop-blur-md font-medium rounded-full shadow-sm"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5 text-blue-500" />
                <span>Dinou v7 — React 19 Framework</span>
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white leading-[1.12]">
              <span className="text-blue-600 dark:text-blue-500">Dinou</span> — Build with React 19.
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
                Deploy Everywhere.
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-[780px] text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
              The modern, ejectable React 19 framework built on web standards. Build with Server Components, Partial Prerendering (PPR), 2D layered segmentation, and server actions — then deploy seamlessly to Cloudflare Workers, Netlify Serverless, Bun or Deno binaries, Node.js, or static HTML with zero vendor lock-in.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
              <Button
                size="lg"
                className="text-base h-12 px-8 rounded-full shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                asChild
              >
                <Link href="/docs">
                  <Rocket className="mr-2 h-5 w-5" />
                  Explore Documentation
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base h-12 px-8 rounded-full bg-white/70 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 backdrop-blur-sm"
                asChild
              >
                <a
                  href="https://github.com/roggc/dinou"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </a>
              </Button>
            </div>

            {/* Key Value Props (4 Pillars in v7) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex flex-col items-center p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">React 19 Native</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">RSC, Actions & Streaming SSR</span>
              </div>
              <div className="flex flex-col items-center p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm sm:text-base font-bold text-cyan-600 dark:text-cyan-400">PPR & Segmentation</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">PPR, Slots & Layout ISR</span>
              </div>
              <div className="flex flex-col items-center p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">Deploy Everywhere</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cloudflare, Netlify, Bun & Node</span>
              </div>
              <div className="flex flex-col items-center p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm sm:text-base font-bold text-purple-600 dark:text-purple-400">Zero Lock-In</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">100% Ejectable Dual-Bundle</span>
              </div>
            </div>

            {/* Terminal Tabs Component */}
            <div className="w-full pt-6 sm:pt-8">
              <TerminalTabs />
            </div>
          </div>
        </div>
      </section>

      {/* Deploy Everywhere Interactive Showcase */}
      <DeployMatrix />

      {/* Layered Segmentation & PPR Showcase */}
      <SegmentationShowcase />

      {/* Zero-Runtime Type-Safe Routing Showcase */}
      <TypeSafeShowcase />

      {/* From Heavy Truck to Formula 1 Engine Comparison */}
      <EngineComparison />

      {/* 6 Architectural Pillars */}
      <FeaturesSection />

      {/* Final Call to Action */}
      <section id="ready" className="w-full py-20 sm:py-24 md:py-28 lg:py-32 scroll-mt-20 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-slate-50/90 via-white/80 to-slate-50/90 dark:from-slate-900/70 dark:via-slate-950/60 dark:to-slate-900/70 p-8 sm:p-12 md:p-14 max-w-4xl mx-auto shadow-2xl backdrop-blur-md overflow-hidden">
            {/* Subtle glow effect behind CTA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
              <Badge
                variant="outline"
                className="px-3.5 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 backdrop-blur-sm font-medium"
              >
                Start Building Today
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
                Ready to build without boundaries?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 md:text-lg max-w-xl">
                Experience the power of React 19 Server Components, Streaming SSR, and Server Functions with total freedom of infrastructure.
              </p>
              <div className="flex justify-center pt-2">
                <Button size="lg" className="text-base rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" asChild>
                  <Link href="/docs">
                    <span>Get Started Now</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
