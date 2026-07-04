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
  Map,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRightLeft,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-16">
          <Badge
            variant="outline"
            className="px-3 py-1 border-slate-200 dark:border-slate-700 backdrop-blur-sm"
          >
            Core Architecture
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100">
            Architectural Freedom by Design
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 dark:text-slate-300 md:text-xl">
            Choose your own bundler, customize the build process, or eject the entire framework core directly into your repository.
          </p>
        </div>

        {/* 2 columns layout to accommodate 4 distinct pillars comfortably */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Bundler Agnostic */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Boxes className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
                <Boxes className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                Bundler Agnostic Integration
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Build with the engine of your choice. Full support for three major bundlers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "esbuild (default) for blazing fast development startup",
                  "Rollup for highly optimized production bundling",
                  "Webpack for legacy plugin support and ecosystem maturity",
                  "Seamless switching via script commands (e.g. dev:rollup)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4 text-purple-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Card 2: 100% Ejectable Core */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ArrowRightLeft className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
                <ArrowRightLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                Lightweight & Ejectable
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                No framework lock-in. Extract the entire codebase and customize it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Extract core code to a local dinou/ folder in one command",
                  "Take complete ownership of build scripts and routing logic",
                  "Evolve your own fork or tweak internal configurations directly",
                  "Clean, minimal, lightweight codebase with zero magic black boxes",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4 text-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Card 3: React 19 Core Foundation */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
                <Cpu className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                React 19 Core Foundation
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Deep integration with the React core architecture and modern APIs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Native React Server Components (RSC) support",
                  "Server Functions ('use server') for seamless client-to-server calls",
                  "HTML Streaming with Suspense for fast load times",
                  "Clean client state sync using custom Jotai & Suspense utilities",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Card 4: Rendering & Routing Controls */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30 mb-4">
                <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                Rendering & Routing Controls
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Fine-grained control over layout rendering and static/dynamic states.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Static site generation (SSG) with automatic dynamic bailout (SSR)",
                  "Incremental Static Regeneration (ISR) & dynamic-demand generation (ISG)",
                  "File-based routing with layout isolation flags (no_layout, reset_layout)",
                  "SPA experience with client-side soft navigation & link prefetching",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4 text-yellow-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
