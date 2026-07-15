"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Boxes, Zap, RefreshCw, Layers } from "lucide-react";

const tocItems = [
  { id: "overview", title: "📂 Overview", level: 2 },
  { id: "bundler-map", title: "🗺️ Bundler Reference Map", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bundlers Integration Hub
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore, modify, and extend the compilation settings, development servers, and HMR watchers for esbuild, Rollup, and Webpack inside the ejected framework.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Dinou splits compilation rules across different build scripts. Ejecting exposes these settings, allowing complete freedom to optimize code trees or write custom loaders.</strong>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>📂 Overview</h2>
              <p>
                To support server and client modules simultaneously, the framework orchestrates separate compilation targets. Each bundler integration contains configurations to handle:
              </p>
              <ul>
                <li><strong>Client Entry bundling:</strong> Bundles the hydration scripts (<code>client.jsx</code>) and extracts lazy client component chunks.</li>
                <li><strong>PostCSS Styles extraction:</strong> Runs style processors and exports class dictionaries.</li>
                <li><strong>RSC Manifest generation:</strong> Outputs module reference graphs so that server runtimes can resolve module paths.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* REFERENCE MAP */}
            <section id="bundler-map">
              <h2>🗺️ Bundler Reference Map</h2>
              <p>
                Select a compilation system to view its file structure and configurations:
              </p>

              <div className="grid gap-4 sm:grid-cols-3 not-prose mt-6">
                <a href="/docs/ejected-reference/bundlers/esbuild" className="group">
                  <Card className="h-full border hover:border-yellow-500/50 hover:bg-yellow-50/5 dark:hover:bg-yellow-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Zap className="h-5 w-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">esbuild Setup</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Fast development compilation scripts, hot-reload WebSockets, PostCSS plugins, and ESM React Refresh boundary configurations.
                    </CardContent>
                  </Card>
                </a>

                <a href="/docs/ejected-reference/bundlers/rollup" className="group">
                  <Card className="h-full border hover:border-orange-500/50 hover:bg-orange-50/5 dark:hover:bg-orange-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <RefreshCw className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Rollup Setup</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Production compiling configurations, asset file hash generators, and client module graph manifest builders.
                    </CardContent>
                  </Card>
                </a>

                <a href="/docs/ejected-reference/bundlers/webpack" className="group">
                  <Card className="h-full border hover:border-cyan-500/50 hover:bg-cyan-50/5 dark:hover:bg-cyan-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Boxes className="h-5 w-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Webpack Setup</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      React 19's official React Server Components plugins binding, dynamic chunk split maps, and loaders for Server Actions.
                    </CardContent>
                  </Card>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
