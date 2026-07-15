"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  FolderTree,
  Terminal,
  Cpu,
  Globe,
  Settings,
  Boxes,
  Zap,
  RefreshCw,
  Sparkles,
  BookOpen,
} from "lucide-react";

const tocItems = [
  { id: "overview", title: "📂 Overview & Structure", level: 2 },
  { id: "ejected-sections", title: "🗺️ Reference Map", level: 2 },
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
                Ejected Reference Hub
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore the comprehensive, file-by-file documentation of the ejected Dinou framework. Modify and extend everything from the server pipeline to bundler settings.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>This reference map is designed to help you and your AI assistant quickly understand which files control different aspects of the Dinou framework.</strong>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>📂 Overview & Tree Structure</h2>
              <p>
                Ejecting copies all internal configurations, CLI commands, and rendering systems directly into your root <code>./dinou/</code> folder. The directory is structured as follows:
              </p>
              <div className="not-prose my-6 border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50">
                <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre">{`dinou/
├── constants.js            # Global environment settings
├── index.js                # Core package entry point (exports components & hooks)
├── index.mjs               # ESM entry point mapping for modern build imports
├── package.json            # Local dependency overrides for ejected script runners
├── server.js               # Entry point for the parent Node.js server
├── core/                   # ⚙️ Core RSC engine, router, and renderers (47 files)
│   ├── babel-esm-loader.js # Custom ESM loader thread for Babel compilation
│   ├── render-html.js      # Child process HTML compiler (Standard Client SSR)
│   ├── css-require-hook.js # PostCSS CSS Modules require loader
│   ├── client.jsx          # Client hydration entry point (Rollup/esbuild)
│   ├── client-webpack.jsx  # Client hydration entry point (Webpack config)
│   └── ...
├── esbuild/                # ⚡ esbuild compilation scripts
├── rollup/                 # 🔄 Rollup compilation configurations
└── webpack/                # 🕸️ Webpack bundler & hot-reload orchestrators`}</pre>
              </div>

              <div className="border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/10 rounded-lg p-4 bg-card not-prose space-y-3 mb-8">
                <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span>Empowering AI Pair Programming</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  With the entire framework code exposed inside <code>./dinou/</code>, AI coding assistants (like Cursor, Gemini Antigravity, or Copilot) have full context of your fullstack execution path. They can help you write middleware, debug request states, or optimize asset caching directly inside these files.
                </p>
              </div>
            </section>

            <hr className="my-8" />

            {/* REFERENCE MAP */}
            <section id="ejected-sections">
              <h2>🗺️ Reference Map</h2>
              <p>
                Dive deep into the specific subsystems of the ejected folder:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose mt-6">
                <a href="/docs/ejected-reference/server" className="group">
                  <Card className="h-full border hover:border-blue-500/50 hover:bg-blue-50/5 dark:hover:bg-blue-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Terminal className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Server Entry (server.js)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Dissect the core Express server setup, HMR cache invalidation watchers, anti-bot shield middleware, and module resolution hacks.
                    </CardContent>
                  </Card>
                </a>

                <div className="opacity-75 cursor-not-allowed">
                  <Card className="h-full border bg-muted/20">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Cpu className="h-5 w-5 text-purple-500" />
                      <CardTitle className="text-base font-bold text-muted-foreground">Core Engine & SSR (Coming Soon)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      How <code>render-html.js</code> and the RSC graph isolate environments using a two-process architecture.
                    </CardContent>
                  </Card>
                </div>

                <div className="opacity-75 cursor-not-allowed">
                  <Card className="h-full border bg-muted/20">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Globe className="h-5 w-5 text-emerald-500" />
                      <CardTitle className="text-base font-bold text-muted-foreground">Client SPA & Routing (Coming Soon)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Examine client-side hydration, SPA routers, link prefetching, and Server Action post-back channels.
                    </CardContent>
                  </Card>
                </div>

                <div className="opacity-75 cursor-not-allowed">
                  <Card className="h-full border bg-muted/20">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Settings className="h-5 w-5 text-amber-500" />
                      <CardTitle className="text-base font-bold text-muted-foreground">Asset & Style Loading (Coming Soon)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Custom CommonJS require hooks for CSS Modules with PostCSS and hashed static asset loaders.
                    </CardContent>
                  </Card>
                </div>
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
