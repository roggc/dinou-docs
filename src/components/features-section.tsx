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
            Why Dinou?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-100">
            Engineered for{" "}
            <span className="text-blue-600 dark:text-blue-400">Control</span>{" "}
            and{" "}
            <span className="text-purple-600 dark:text-purple-400">Speed</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 dark:text-slate-300 md:text-xl">
            Most frameworks lock you into their build tools. Dinou gives you the
            cutting edge features of React 19 with complete architectural
            freedom.
          </p>
        </div>

        {/* Changed to 2 columns to accommodate 4 distinct pillars comfortably */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: React 19 Core */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
                <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                React 19 Foundation
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Built from the ground up to leverage the new Server Components
                architecture.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "React Server Components (RSC)",
                  "Server Functions",
                  "Suspense Streaming",
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

          {/* Card 2: Rendering Strategies */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30 mb-4">
                <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                Intelligent Rendering
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Static by default, dynamic when needed. Optimized for
                performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Automatic Static Bailout",
                  "Incremental Static Generation (ISG)",
                  "ISR (Revalidation)",
                  "Force Dynamic Mode",
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

          {/* Card 3: Routing & Navigation */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Map className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
                <Map className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                Routing & Navigation
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Intuitive routing with a SPA-like experience for the end user.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "File-based Routing System",
                  "Soft Navigation (SPA Experience)",
                  "Nested Layouts",
                  "Dynamic & Catch-all Routes",
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

          {/* Card 4: Bundler Agnostic */}
          <Card className="relative overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Boxes className="w-24 h-24" />
            </div>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
                <Boxes className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                Bundler Agnostic
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                The only framework that lets you choose your build engine via
                commands.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Switch via script (e.g. npm run dev:rollup)",
                  "Support for Webpack, Rollup & Esbuild",
                  "Full 'Eject' support",
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
        </div>
      </div>
    </section>
  );
}
