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
                Running the eject command copies the entire framework source code—including the web server, bundler scripts, client runtime, and core React Server Components engine—directly into the <code>./dinou/</code> folder at your project root. This grants you total ownership and control over how your pages are built, rendered, and served.
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
                {/* 1. VFS & BOOTSTRAP */}
                <a href="/docs/ejected-reference/bootstrap-vfs" className="group">
                  <Card className="h-full border hover:border-teal-500/50 hover:bg-teal-50/5 dark:hover:bg-teal-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <FolderTree className="h-5 w-5 text-teal-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Virtual Filesystem & Bootstrap</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Analyze the bootstrapping pipeline, virtual file mapping engines, and runtime path registration utilities.
                    </CardContent>
                  </Card>
                </a>

                {/* 2. SERVER ENTRY */}
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

                {/* 3. HTML RENDERER PIPELINE */}
                <a href="/docs/ejected-reference/render-html" className="group">
                  <Card className="h-full border hover:border-purple-500/50 hover:bg-purple-50/5 dark:hover:bg-purple-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Cpu className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">HTML Renderer Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Analyze the isolated two-process architecture, JSX-to-client Flight Stream deserializer, and React 19 SSR stdout compilers.
                    </CardContent>
                  </Card>
                </a>

                {/* 4. ROUTING RESOLVERS */}
                <a href="/docs/ejected-reference/routing-resolvers" className="group">
                  <Card className="h-full border hover:border-sky-500/50 hover:bg-sky-50/5 dark:hover:bg-sky-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Globe className="h-5 w-5 text-sky-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Routing Resolvers</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Inspect route parameter matching engines, URL path normalization helpers, and static asset resolution logic.
                    </CardContent>
                  </Card>
                </a>

                {/* 5. RSC CONTEXT & CONCURRENCY */}
                <a href="/docs/ejected-reference/rsc-context" className="group">
                  <Card className="h-full border hover:border-indigo-500/50 hover:bg-indigo-50/5 dark:hover:bg-indigo-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Boxes className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">RSC Context & Concurrency</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Explore Server-side AsyncLocalStorage request store contexts, layout component composition trees, and RSC concurrent error isolation boundaries.
                    </CardContent>
                  </Card>
                </a>

                {/* 6. ESM LOADER & RESOLVER */}
                <a href="/docs/ejected-reference/loader" className="group">
                  <Card className="h-full border hover:border-amber-500/50 hover:bg-amber-50/5 dark:hover:bg-amber-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Zap className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">ESM Loader & Resolver</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Tweak dynamic JSX/TS transpilation worker threads, TSConfig path resolves, and custom "use client" / "use server" registers.
                    </CardContent>
                  </Card>
                </a>

                {/* 7. STATIC & ISR ENGINES */}
                <a href="/docs/ejected-reference/static-isr" className="group">
                  <Card className="h-full border hover:border-orange-500/50 hover:bg-orange-50/5 dark:hover:bg-orange-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <RefreshCw className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Static & ISR Engines</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Pre-rendering SSG page crawlers, cache metadata manifests, and asynchronous background ISR/ISG revalidation locks.
                    </CardContent>
                  </Card>
                </a>

                {/* 8. CLIENT SPA & ROUTING */}
                <a href="/docs/ejected-reference/client-runtime" className="group">
                  <Card className="h-full border hover:border-emerald-500/50 hover:bg-emerald-50/5 dark:hover:bg-emerald-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Globe className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Client SPA & Routing</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Examine client-side hydration, dynamic SPA transitions, history routers, scroll preservation, and Server Function fetch channels.
                    </CardContent>
                  </Card>
                </a>

                {/* 9. ASSET & STYLE LOADING */}
                <a href="/docs/ejected-reference/assets-styling" className="group">
                  <Card className="h-full border hover:border-slate-500/50 hover:bg-slate-50/5 dark:hover:bg-slate-900/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Settings className="h-5 w-5 text-slate-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Asset & Style Loading</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Custom CommonJS require hooks for CSS Modules with PostCSS and hashed static asset loaders.
                    </CardContent>
                  </Card>
                </a>

                {/* 10. ESBUILD INTEGRATION */}
                <a href="/docs/ejected-reference/bundlers/esbuild" className="group">
                  <Card className="h-full border hover:border-yellow-500/50 hover:bg-yellow-50/5 dark:hover:bg-yellow-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Zap className="h-5 w-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">esbuild Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Explore development compile contexts, WebSocket HMR server setups, SWC React Refresh boundaries, and custom esbuild compilation plugins.
                    </CardContent>
                  </Card>
                </a>

                {/* 11. ROLLUP INTEGRATION */}
                <a href="/docs/ejected-reference/bundlers/rollup" className="group">
                  <Card className="h-full border hover:border-orange-500/50 hover:bg-orange-50/5 dark:hover:bg-orange-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <RefreshCw className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Rollup Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Explore production output tree-shaking plugins, client module graphs manifests, asset copiers, and CSS compiler options.
                    </CardContent>
                  </Card>
                </a>

                {/* 12. WEBPACK INTEGRATION */}
                <a href="/docs/ejected-reference/bundlers/webpack" className="group">
                  <Card className="h-full border hover:border-cyan-500/50 hover:bg-cyan-50/5 dark:hover:bg-cyan-950/5 transition-all">
                    <CardHeader className="flex flex-row items-center gap-3 py-4">
                      <Boxes className="h-5 w-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-base font-bold">Webpack Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Explore official React Server Components plugins binding, dynamic chunk loaders, and Server Functions whitelist manifest plugins.
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
