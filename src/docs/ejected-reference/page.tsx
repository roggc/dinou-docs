"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  FolderTree,
  FileCode,
  Terminal,
  Cpu,
  Globe,
  Settings,
  Boxes,
  Zap,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "📂 Overview", level: 2 },
  { id: "root-files", title: "🌱 Root Files", level: 2 },
  { id: "server-rsc", title: "⚙️ Server & RSC Engine", level: 2 },
  { id: "client-runtime", title: "⚛️ Client SPA & Routing", level: 2 },
  { id: "styling-assets", title: "🎨 Styling & Asset Loading", level: 2 },
  { id: "ssg-isr", title: "💾 SSG & ISR Builds", level: 2 },
  { id: "bundler-configs", title: "📦 Bundler Architectures", level: 2 },
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
                Ejected Folder Reference
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An exhaustive analysis of every file and folder generated inside your local <code>./dinou/</code> directory when you eject the framework.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>This guide acts as a map for developers and AI assistants. Every file listed here is fully editable, allowing you to custom-tailor your rendering pipeline, build configuration, or server middleware.</strong>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>📂 Overview & Tree Structure</h2>
              <p>
                When you run <code>npm run eject</code>, Dinou copies its entire source code directly into a <code>dinou/</code> folder at the root of your project. The structure looks like this:
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

              <div className="border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/10 rounded-lg p-4 bg-card not-prose space-y-3 mb-6">
                <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span>AI and Ejected Customizations</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Because these files live in your project root, your AI assistant can parse them directly to resolve issues or add features. For example, if you want to support a new style syntax (like SASS), you or your AI co-pilot can directly tweak the code in <code>dinou/core/css-require-hook.js</code> and the corresponding bundler configs.
                </p>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROOT FILES */}
            <section id="root-files">
              <h2>🌱 Root Files</h2>
              <p>
                These files establish the global framework environment, exports, and server bootstrap processes.
              </p>

              <div className="grid gap-4 not-prose mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <FileCode className="h-6 w-6 text-emerald-500" />
                    <div>
                      <CardTitle className="text-base font-bold">constants.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Contains shared constant declarations utilized by both the CLI scripts and the runtime engines (e.g. paths, default build directories, and fallback flags).
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Boxes className="h-6 w-6 text-emerald-500" />
                    <div>
                      <CardTitle className="text-base font-bold">index.js / index.mjs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Exposes the public API of Dinou to your application code. This includes standard components and hooks like <code>Link</code>, <code>useRouter</code>, <code>useParams</code>, and <code>useSearchParams</code>.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Terminal className="h-6 w-6 text-emerald-500" />
                    <div>
                      <CardTitle className="text-base font-bold">server.js / server.mjs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Initializes the environment flags and starts the Express production/development server by calling the core loader pipeline.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* CORE SERVER & RSC ENGINE */}
            <section id="server-rsc">
              <h2>⚙️ Server & RSC Engine (<code>dinou/core/</code>)</h2>
              <p>
                The server engine handles React Server Components execution, process communication, routing maps, and dynamic imports.
              </p>

              <div className="grid gap-4 not-prose mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Cpu className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/server.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    The core Express application. It registers all routes, serves static assets, processes API endpoints, overrides Node's module resolver to route imports to their <code>.react-server</code> counterparts, and orchestrates the two-process architecture by spinning up the HTML generator sub-process.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <RefreshCw className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/render-html.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Executed as a decoupled child process. It is a standard client-side React environment that receives the <strong>React Server Flight Stream</strong> via file descriptor <code>fd:4</code>, deserializes the nodes, embeds the root document layout shell, compiles the HTML output using <code>renderToPipeableStream</code>, and writes the stream to <code>stdout</code>.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Zap className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/babel-esm-loader.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    A custom Node.js ESM loader. It intercepts ESM import chains on-the-fly, loads TypeScript configurations for path resolution mapping, compiles raw JSX/TSX/TS code using Babel, and registers functions prefixed with <code>"use server"</code> as Server Functions.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <FileCode className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/import-module.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Acts as the boundary bridge. It dynamically imports ES modules from a CommonJS context while ensuring that physical and memory cache registries are cleared in development to support hot-reloading (HMR).
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Boxes className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/register-paths.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Reads <code>tsconfig.json</code> or <code>jsconfig.json</code> at server startup and maps absolute alias specifiers (e.g. <code>@/components/XYZ</code>) so Node's CJS environment can locate them without path-resolution errors.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* CLIENT SPA & ROUTING */}
            <section id="client-runtime">
              <h2>⚛️ Client SPA & Routing (<code>dinou/core/</code>)</h2>
              <p>
                These files establish the client-side SPA (Single Page Application) hydration runtime, DOM mount, history router, and interactive controls.
              </p>

              <div className="grid gap-4 not-prose mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Globe className="h-6 w-6 text-purple-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/client.jsx / core/client-webpack.jsx</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    The entry point for browser bundling. It hydrates the static SSR HTML template using React 19's <code>hydrateRoot</code>, links the React Flight deserializer to handle asynchronous streaming navigation, and spawns the history route listeners. (The webpack version relies on webpack's custom modules registry).
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <FileCode className="h-6 w-6 text-purple-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/navigation.js / core/link.jsx</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Exposes the navigation hooks (<code>useRouter</code>, <code>usePathname</code>, <code>useParams</code>) and the <code>Link</code> component. The component intercepts standard anchor clicks to fetch RSC flight updates and switch routes seamlessly without refreshing the page.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Settings className="h-6 w-6 text-purple-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/server-function-proxy.js / server-function-proxy-webpack.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Client-side proxies generated dynamically. When a client triggers an asynchronous action bound to a server-reference, these proxies send a `POST` request back to the server and stream the updated RSC tree.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* STYLING & ASSETS */}
            <section id="styling-assets">
              <h2>🎨 Styling & Asset Loading (<code>dinou/core/</code>)</h2>
              <p>
                Dinou intercepts import loaders at runtime to let you import CSS files, CSS Modules, or binary media assets directly.
              </p>

              <div className="grid gap-4 not-prose mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Zap className="h-6 w-6 text-amber-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/css-require-hook.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Intercepts <code>require()</code> targets with a <code>.css</code> suffix. In production/development, it uses **PostCSS** to process styles, hashes local class names, and returns a key-value JSON map for CSS Modules.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Boxes className="h-6 w-6 text-amber-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/asset-require-hook.js / asset-extensions.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Hooks into requirements for non-code files (images, audio, video). It extracts assets, calculates content hashes, and returns public URL paths (e.g. <code>/assets/image-abcdef.png</code>) to render them in your components.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* SSG & ISR BUILDS */}
            <section id="ssg-isr">
              <h2>💾 Static Site Generation & ISR (<code>dinou/core/</code>)</h2>
              <p>
                These files handle pre-rendering static routes at build time (SSG) and re-compiling them dynamically in the background (ISR/ISG).
              </p>

              <div className="grid gap-4 not-prose mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Terminal className="h-6 w-6 text-red-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/build-static-pages.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Orchestrates static compiling during `npm run build`. It crawls eligible routes, runs their RSC lifecycle, feeds the flight output into the child process HTML generator, and writes the compiled assets to the build output directory.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <RefreshCw className="h-6 w-6 text-red-500" />
                    <div>
                      <CardTitle className="text-base font-bold">core/cache-revalidate.js / revalidating.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Manages ISR (Incremental Static Revalidation) cache states. It maps revalidation timelines, controls lock keys to prevent parallel regeneration conflicts, and handles background page rendering when a cached page expires.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* BUNDLER CONFIGS */}
            <section id="bundler-configs">
              <h2>📦 Bundler Architectures</h2>
              <p>
                Dinou provides separate compilation setups depending on your chosen bundler integration. The bundler directories contain all the build configurations.
              </p>

              <div className="grid gap-4 not-prose mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    <div>
                      <CardTitle className="text-base font-bold">esbuild/</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    A ultra-fast bundling option using esbuild. It has files like <code>esbuild.config.js</code> to compile server references, build browser scripts, and setup the dev server.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <RefreshCw className="h-6 w-6 text-orange-500" />
                    <div>
                      <CardTitle className="text-base font-bold">rollup/</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Uses Rollup for production tree-shaking optimization. Contains configs to handle CSS transpiling, asset resolving, client-side entry bundling, and development source-mapping.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <Boxes className="h-6 w-6 text-cyan-500" />
                    <div>
                      <CardTitle className="text-base font-bold">webpack/</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Configures Webpack for client-side and server-side graph builds. Uses Webpack's official RSC plugins to resolve client components and handles Hot Module Replacement (HMR) seamlessly in dev mode.
                  </CardContent>
                </Card>
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
