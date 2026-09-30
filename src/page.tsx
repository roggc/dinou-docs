import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Github,
  BookOpen,
  Sparkles,
  ArrowRight,
  Zap,
  Gauge,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { Link } from "dinou";
import { TerminalTabs } from "@/components/landing/terminal-tabs";
import { DeployMatrix } from "@/components/landing/deploy-matrix";
import { EngineComparison } from "@/components/landing/engine-comparison";
import { FeaturesSection } from "@/components/features-section";

export default function Page() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Background Gradients & Grid */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]" />

      {/* Hero Section */}
      <section id="main" className="w-full py-16 md:py-24 lg:py-28 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
            {/* Version Badge */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-xs sm:text-sm border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 backdrop-blur-md font-medium"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5 text-blue-500 animate-pulse" />
                <span>Dinou v7: Universal Architecture & Deploy Everywhere</span>
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white leading-tight">
              Build Once with React 19.
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
                Deploy Everywhere.
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-[760px] text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
              The high-performance, ejectable React 19 framework powered by a 0-fork Dual-Bundle AOT engine. Compile effortlessly to Cloudflare Workers, standalone native binaries in Bun or Deno, Node.js, and static SSG with zero vendor lock-in.
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

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">0-Fork</span>
                <span className="text-xs text-slate-500">Dual-Bundle in RAM</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400">&lt;80ms</span>
                <span className="text-xs text-slate-500">Incremental HMR</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-extrabold text-purple-600 dark:text-purple-400">5+ Targets</span>
                <span className="text-xs text-slate-500">Deploy Everywhere</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">100% Green</span>
                <span className="text-xs text-slate-500">377 Cross-Browser Tests</span>
              </div>
            </div>

            {/* Terminal Tabs Component */}
            <div className="w-full pt-4">
              <TerminalTabs />
            </div>
          </div>
        </div>
      </section>

      {/* Deploy Everywhere Interactive Showcase */}
      <DeployMatrix />

      {/* From Truck to Formula 1 Engine Comparison */}
      <EngineComparison />

      {/* 6 Architectural Pillars */}
      <FeaturesSection />

      {/* Final Call to Action */}
      <section id="ready" className="w-full py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-transparent to-slate-100/70 dark:to-slate-900/60">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="flex flex-col items-center space-y-6 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="px-3.5 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 backdrop-blur-sm"
            >
              Start Building Today
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
              Ready to build without boundaries?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 md:text-lg max-w-xl">
              Experience the power of React 19 Server Components, Streaming SSR, and Server Functions with total freedom of infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
              <Button size="lg" className="text-base rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" asChild>
                <Link href="/docs">
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base rounded-full px-8 bg-white/70 dark:bg-slate-950/60 border-slate-300 dark:border-slate-800"
                asChild
              >
                <Link href="/docs/why-dinou">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read the Architecture
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
