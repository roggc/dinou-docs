import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Layers,
  ArrowRight,
  Radio,
  FileCode,
  ArrowRightLeft,
  Sliders,
  Clock,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Configuration & Plugin System", level: 2 },
  { id: "config-file", title: "2. The dinou.config.ts File", level: 2 },
  { id: "config-bundling", title: "2.1 AOT Bundling, Dev Hot-Reload & Path Aliases", level: 3 },
  { id: "config-options", title: "3. Top-Level Configuration Options", level: 2 },
  { id: "ppr-option", title: "3.1 Global Partial Prerendering Default (ppr)", level: 3 },
  { id: "allow-isg-option", title: "3.2 Global ISG Default (allowISG)", level: 3 },
  { id: "react-compiler-option", title: "3.3 React Compiler (reactCompiler)", level: 3 },
  { id: "strict-mode-option", title: "3.4 React StrictMode (reactStrictMode)", level: 3 },
  { id: "asset-extensions-option", title: "3.5 Custom Static Asset Extensions (assetExtensions)", level: 3 },
  { id: "storage-option", title: "3.6 Storage Adapter (storage)", level: 3 },
  { id: "setup-files-option", title: "3.7 Universal Setup Files (setupFiles)", level: 3 },
  { id: "plugins-option", title: "3.8 Plugins Array (plugins)", level: 3 },
  { id: "plugin-architecture", title: "4. Dinou Plugin Architecture", level: 2 },
  { id: "configure-server", title: "5. Low-Level Node Hook: configureServer", level: 2 },
  { id: "configure-server-context", title: "5.1 Context Parameters: server, isDev, use", level: 3 },
  { id: "configure-server-pipeline", title: "5.2 The Node Middleware Pipeline (use)", level: 3 },
  { id: "configure-server-comparison", title: "5.3 configureServer vs. onRequest Decision Matrix", level: 3 },
  { id: "on-request-lifecycle", title: "6. Web Standards Hook: onRequest", level: 2 },
  { id: "context-reference", title: "6.1 The context Object (RequestContextStore)", level: 3 },
  { id: "pattern-intercept", title: "6.2 Pattern 1: Short-Circuit, Webhooks & SPA-Safe Redirects", level: 3 },
  { id: "pattern-context", title: "6.3 Pattern 2: Middleware, Response Headers & Context Mutation", level: 3 },
  { id: "context-server-functions", title: "6.4 Context Sharing with Server Functions", level: 3 },
  { id: "ssg-vs-runtime", title: "6.5 Build-Time SSG vs. Runtime Cached Pages", level: 3 },
  { id: "execution-timeline", title: "7. Deep Dive: Execution Points (configureServer vs. onRequest)", level: 2 },
  { id: "universal-setup-files", title: "8. Compile-Time Setup Files (setupFiles)", level: 2 },
  { id: "setup-hierarchy", title: "8.1 Resolution & Precedence Hierarchy", level: 3 },
  { id: "setup-polyfills", title: "8.2 Environment Polyfills Recipe (DOMMatrix / Geometry)", level: 3 },
  { id: "real-world-examples", title: "9. Real-World Plugin Examples (Socket.IO, Stripe & Auth)", level: 2 },
  { id: "plugin-registration-order", title: "10. Registration & Execution Pipeline Order", level: 2 },
  { id: "fault-isolation", title: "11. Fault Isolation & Error Handling", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Configuration &amp; Plugins | Dinou Docs</title>
      <meta
        name="description"
        content="Customize your Dinou application with dinou.config.ts, configureServer for native Node HTTP and WebSockets, setupFiles for compile-time polyfills, and Web Standards onRequest plugins."
      />
      <link rel="canonical" href="https://dinou.dev/docs/plugins" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Web Standards Pipeline
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou v9.4 Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Configuration &amp; Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Customize your Dinou application with <code>dinou.config.ts</code>, configure project-wide defaults for Partial Prerendering (<code>ppr</code>), Incremental Static Generation (<code>allowISG</code>), the React Compiler, and custom static assets, attach low-level Node.js servers and WebSockets with <code>configureServer</code>, inject compile-time polyfills with <code>setupFiles</code>, and intercept HTTP requests across every runtime using Web Standards plugins.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>1. Configuration &amp; Plugin System</h2>
              <p>
                In <strong>Dinou</strong>, the configuration and extensibility architecture is built around two complementary runtime hooks plus compile-time setup injection:
              </p>
              <ol>
                <li>
                  <strong>Universal Web Standards Layer (<code>onRequest</code>):</strong> Operates identically across <strong>all</strong> supported runtimes (Node.js, Bun, Deno, Cloudflare Workers, and Netlify Functions) using the standard Fetch API <code>Request</code> and <code>Response</code> interfaces.
                </li>
                <li>
                  <strong>Low-Level Node.js Server Hook (<code>configureServer</code>):</strong> Gives Node.js deployments (<code>dinou dev</code>, <code>dinou start</code>, and Node standalone binaries) direct, non-ejected access to the underlying <code>node:http</code> <code>Server</code>, allowing you to attach WebSocket servers (Socket.IO, <code>ws</code>) and Connect-compatible <code>(req, res, next)</code> middlewares.
                </li>
              </ol>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Web Standards First</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Native <code>Request</code> &amp; <code>Response</code> APIs. AOT-bundled across Node, Bun, Deno, Cloudflare Workers, and Netlify.
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      <Radio className="h-4 w-4" />
                      <span>Low-Level Node Hooks</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <code>configureServer</code> grants direct access to Node&apos;s <code>http.Server</code> for WebSockets and <code>(req, res, next)</code> middlewares without ejecting.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                      <FileCode className="h-4 w-4" />
                      <span>Universal Setup Files</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Compile-time <code>setupFiles</code> resolved with full <code>tsconfig.json</code> alias support and injected at Line 1 across all bundles.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Config File */}
            <section id="config-file" className="mt-12">
              <h2>2. The dinou.config.ts File</h2>
              <p>
                Dinou automatically discovers your configuration file in the project root using a deterministic precedence order: <code>dinou.config.ts</code> &rarr; <code>dinou.config.mjs</code> &rarr; <code>dinou.config.js</code> &rarr; <code>dinou.config.cjs</code>. Use the typed <code>defineConfig</code> helper exported from <code>&quot;dinou&quot;</code> (or <code>&quot;dinou/config&quot;</code>):
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// dinou.config.ts
import { defineConfig } from "dinou";
// Optional: import storage adapters if running custom ISR persistence
// import { RedisStorage } from "dinou/server";

export default defineConfig({
  // Project-wide Partial Prerendering default across all segments (defaults to false)
  ppr: false,

  // Project-wide Incremental Static Generation default on dynamic segments (defaults to true)
  allowISG: true,

  // Automatic React Compiler optimization in production builds (defaults to true)
  reactCompiler: true,

  // React StrictMode in development (defaults to true)
  reactStrictMode: true,

  // Extra static media/binary extensions fingerprinted into /assets/[name]-[hash].[ext]
  assetExtensions: ["glb", "hdr", "wasm"],

  // Pluggable ISR / cache slot storage adapter (defaults to FileSystemStorage in Node/Bun)
  // storage: new RedisStorage(redisClient),

  // Compile-time setup scripts injected at Line 1 across all target runtimes
  setupFiles: ["@/polyfills"],

  // Array of Dinou plugins
  plugins: [],
});`}
              </CodeBlock>

              <div id="config-bundling" className="mt-6 space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-blue-500" />
                  <span>2.1 AOT Bundling, Dev Hot-Reload &amp; Path Aliases</span>
                </h3>
                <p>
                  Dinou compiles <code>dinou.config.*</code> seamlessly across every bundler (<code>esbuild</code>, <code>rollup</code>, <code>webpack</code>) and target runtime:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5">
                  <li>
                    <strong>Native <code>tsconfig.json</code> &amp; <code>jsconfig.json</code> Path Aliases:</strong> Import plugin factories, shared constants, or polyfills using your configured aliases (for example, <code>import &#123; authPlugin &#125; from &quot;@/_plugins/auth&quot;;</code>)—including recursive <code>&quot;extends&quot;</code> chains—without Node <code>ERR_MODULE_NOT_FOUND</code> errors. See <Link href="/docs/alias">Path Aliases</Link> for details.
                  </li>
                  <li>
                    <strong>Ahead-of-Time (AOT) Production Embedding:</strong> During <code>dinou build</code>, your configuration and plugins are statically bundled directly into the generated server artifacts (<code>.dinou/node/</code>, <code>.dinou/cloudflare/worker.js</code>, <code>.dinou/bun/server.js</code>, <code>.dinou/deno/main.js</code>, and <code>.dinou/dist1/server/</code>). Production containers (<code>npm ci --omit=dev</code>), Edge Workers, and single-file compiled binaries never require <code>esbuild</code> or raw <code>.ts</code> source files at runtime.
                  </li>
                  <li>
                    <strong>Live Development Hot-Reload:</strong> During <code>dinou dev</code>, editing <code>dinou.config.*</code> or root <code>dinou.setup.*</code> automatically reloads plugins, re-applies <code>configureServer</code> middlewares and listeners, refreshes <code>setupFiles</code>, regenerates route types, and triggers a clean browser reload without restarting the terminal process.
                  </li>
                </ul>
              </div>
            </section>

            {/* Top-Level Config Options */}
            <section id="config-options" className="mt-12">
              <h2>3. Top-Level Configuration Options</h2>
              <p>
                The <code>DinouConfig</code> interface provides eight top-level controls for rendering, compilation, assets, caching, and plugins:
              </p>

              {/* PPR Option */}
              <div id="ppr-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.1 Global Partial Prerendering Default (<code>ppr</code>)</h3>
                <p>
                  Sets the project-wide default value for <strong>Partial Prerendering (PPR)</strong> across every route segment (<code>layout</code> and <code>page</code>). <strong>Defaults to <code>false</code>.</strong>
                </p>
                <ul>
                  <li>
                    <strong>When omitted (or <code>false</code>):</strong> Every layout and page defaults to standard rendering unless that specific segment explicitly opts in via <code>export const ppr = true</code> in its own <code>layout_functions.ts</code> or <code>page_functions.ts</code>.
                  </li>
                  <li>
                    <strong>When set to <code>true</code>:</strong> Every static-eligible layout and page defaults to PPR—pre-rendering an instant static HTML shell at build/ISR time while streaming dynamic React <code>&lt;Suspense&gt;</code> holes per request.
                  </li>
                </ul>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.ts
export default defineConfig({
  ppr: true,
});`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Because Dinou resolves <code>ppr</code> per segment without parent-to-child inheritance, any individual page or layout can override this global default in its own <code>page_functions.ts</code> or <code>layout_functions.ts</code>.
                </p>
              </div>

              {/* allowISG Option */}
              <div id="allow-isg-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.2 Global ISG Default (<code>allowISG</code>)</h3>
                <p>
                  Controls whether dynamic route segments (<code>[id]</code>, <code>[slug]</code>, <code>[...catchAll]</code>) not pre-rendered at build time by <code>getStaticPaths</code> are generated and cached on-demand at runtime. <strong>Defaults to <code>true</code>.</strong>
                </p>
                <ul>
                  <li>
                    <strong>When omitted (or <code>true</code>):</strong> On-demand Incremental Static Generation (ISG) is enabled by default across all dynamic layouts and pages unless a segment opts out with <code>export const allowISG = false</code>.
                  </li>
                  <li>
                    <strong>When set to <code>false</code>:</strong> Switches dynamic segments to <strong>strict SSG-only mode</strong> by default—returning <code>404 Not Found</code> for any parameter not pre-rendered at build time unless explicitly re-enabled on that segment.
                  </li>
                </ul>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.ts
export default defineConfig({
  allowISG: false,
});`}
                </CodeBlock>
              </div>

              {/* React Compiler Option */}
              <div id="react-compiler-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.3 React Compiler (<code>reactCompiler</code>)</h3>
                <p>
                  Enables or disables automatic memoization via <code>babel-plugin-react-compiler</code> during production client builds across Esbuild, Rollup, and Webpack. <strong>Defaults to <code>true</code>.</strong> Individual components or hooks can also opt out locally with the <code>&quot;use no memo&quot;</code> directive. See <Link href="/docs/compiler">React Compiler</Link>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.ts
export default defineConfig({
  // Enabled by default in production builds. Set to false to disable project-wide:
  reactCompiler: false,
});`}
                </CodeBlock>
              </div>

              {/* Strict Mode Option */}
              <div id="strict-mode-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.4 React StrictMode (<code>reactStrictMode</code>)</h3>
                <p>
                  Controls whether Dinou wraps your hydrated client tree in <code>&lt;React.StrictMode&gt;</code> during development. <strong>Defaults to <code>true</code>.</strong>
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.ts
export default defineConfig({
  reactStrictMode: false,
});`}
                </CodeBlock>
              </div>

              {/* Asset Extensions Option */}
              <div id="asset-extensions-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.5 Custom Static Asset Extensions (<code>assetExtensions</code>)</h3>
                <p>
                  Extends Dinou&apos;s 26 built-in media and font formats with custom binary or data extensions (with or without a leading dot, such as <code>[&quot;glb&quot;, &quot;gltf&quot;, &quot;hdr&quot;, &quot;wasm&quot;]</code>). Custom extensions are emitted to <code>/assets/[name]-[8hex].[ext]</code> across RSC, SSR, Client Components, and CSS <code>url(...)</code> in all three bundlers, and Dinou automatically generates ambient TypeScript module declarations in <code>.dinou/types/routes.d.ts</code>. See <Link href="/docs/assets">Static Assets</Link>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.ts
export default defineConfig({
  assetExtensions: ["glb", "hdr", "wasm"],
});`}
                </CodeBlock>
              </div>

              {/* Storage Option */}
              <div id="storage-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.6 Storage Adapter (<code>storage</code>)</h3>
                <p>
                  Supplies a custom ISR, ISG, and 3D cache-slot persistence adapter (implementing <code>StorageAdapter</code> from <code>&quot;dinou/server&quot;</code>). When omitted, Dinou defaults to <code>FileSystemStorage</code> (Node.js &amp; Bun), <code>CloudflareKVStorage</code> / <code>MemoryStorage</code> (Cloudflare Workers), or <code>DenoKVStorage</code> (Deno).
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.ts
import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

export default defineConfig({
  storage: new RedisStorage(new Redis(process.env.REDIS_URL!)),
});`}
              </CodeBlock>
              </div>

              {/* Setup Files Option */}
              <div id="setup-files-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.7 Universal Setup Files (<code>setupFiles</code>)</h3>
                <p>
                  An array of module specifiers (supporting relative paths, extensionless paths, <code>tsconfig.json</code> aliases like <code>&quot;@/polyfills&quot;</code>, and npm package subpaths) injected at <strong>Line 1</strong> across every server compilation pass before any application code evaluates.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.ts
export default defineConfig({
  setupFiles: ["@/polyfills"],
});`}
                </CodeBlock>
              </div>

              {/* Plugins Option */}
              <div id="plugins-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.8 Plugins Array (<code>plugins</code>)</h3>
                <p>
                  An ordered array of <code>DinouPlugin</code> objects executed sequentially during server bootstrap (<code>configureServer</code>) and on every runtime HTTP request (<code>onRequest</code>).
                </p>
              </div>
            </section>

            {/* Plugin Architecture */}
            <section id="plugin-architecture" className="mt-12">
              <h2>4. Dinou Plugin Architecture</h2>
              <p>
                A Dinou plugin is a plain object (or factory returning an object) conforming to the <code>DinouPlugin</code> interface:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`export interface DinouPlugin {
  /** Descriptive identifier used in logging and fault attribution */
  name?: string;

  /** Compile-time setup scripts (relative, extensionless, @/* alias, or package subpath) */
  setupFiles?: string[];

  /**
   * Low-level Node.js HTTP server configuration hook.
   * Runs in Node.js environments (dinou dev, dinou start, and Node standalone binaries)
   * before server.listen().
   */
  configureServer?(context: ServerHookContext): void | Promise<void>;

  /**
   * Universal Web Standards request interceptor.
   * Runs at runtime across Node.js, Bun, Deno, Cloudflare Workers, and Netlify Functions
   * on every incoming HTTP request (skipped during build-time SSG).
   */
  onRequest?(
    request: Request,
    context: RequestContextStore
  ): Promise<Response | void> | Response | void;
}`}
              </CodeBlock>
            </section>

            {/* configureServer */}
            <section id="configure-server" className="mt-12">
              <h2>5. Low-Level Node Hook: <code>configureServer</code></h2>
              <p>
                Applications requiring direct access to Node.js HTTP primitives—attaching WebSocket servers, reusing existing Connect/Express-style <code>(req, res, next)</code> middlewares like <code>cors</code> or <code>helmet</code>, or serving sub-millisecond <code>/healthz</code> probes—can use <code>configureServer</code> without ejecting Dinou.
              </p>
              <p>
                <code>configureServer</code> runs in <strong>Node.js</strong> environments (<code>dinou dev</code>, <code>dinou start</code>, and <code>build:node:compile</code> standalone binaries) where an underlying <code>node:http</code> <code>Server</code> exists. Non-Node runtimes that use native fetch servers (<code>Bun.serve</code>, <code>Deno.serve</code>, Cloudflare Workers, Netlify Functions) ignore <code>configureServer</code> and execute <code>onRequest</code> directly.
              </p>

              <div id="configure-server-context" className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">5.1 Context Parameters: <code>&#123; server, isDev, use &#125;</code></h3>
                <p>
                  The hook receives a <code>ServerHookContext</code> object:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`export interface ServerHookContext {
  /** The native Node.js http.Server instance */
  server: import("node:http").Server;

  /** Whether the server is running in development mode (dinou dev) */
  isDev: boolean;

  /** Registers a low-level Node.js HTTP middleware (req, res, next) before Dinou route handlers */
  use(middleware: NodeMiddleware): void;
}`}
                </CodeBlock>

                <div className="grid gap-4 sm:grid-cols-3 not-prose my-4">
                  <div className="p-3.5 rounded-lg border bg-card text-xs space-y-1">
                    <p className="font-mono font-semibold text-foreground">server</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Bind WebSocket engines (<code>new Server(server)</code>), listen to <code>upgrade</code> events, or configure socket timeouts.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg border bg-card text-xs space-y-1">
                    <p className="font-mono font-semibold text-foreground">isDev</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Toggle dev-only logging, configure permissive local CORS, or attach development inspection endpoints.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg border bg-card text-xs space-y-1">
                    <p className="font-mono font-semibold text-foreground">use(fn)</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Register sync, <code>async</code> Promise, or callback-async <code>(req, res, next)</code> middlewares ahead of Dinou.
                    </p>
                  </div>
                </div>
              </div>

              <div id="configure-server-pipeline" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">5.2 The Node Middleware Pipeline (<code>use</code>)</h3>
                <p>
                  Middlewares registered via <code>use</code> follow the standard Node/Connect signature <code>(req, res, next)</code>:
                </p>
                <div className="not-prose my-3 p-3 rounded-lg border border-border bg-muted/40 text-xs text-muted-foreground leading-relaxed">
                  <strong>Architectural Note:</strong> Dinou runs directly on Node&apos;s native <code>http.createServer()</code> with zero Express dependency. Its middleware runner natively awaits Promise-returning middlewares, callback-async middlewares (such as <code>cors</code> with an async origin callback), and <code>next(err)</code> error propagation.
                </div>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`export type NodeMiddleware = (
  req: import("node:http").IncomingMessage,
  res: import("node:http").ServerResponse,
  next: (err?: any) => void
) => void | Promise<void>;`}
                </CodeBlock>
                <p>
                  For each incoming Node HTTP request, registered middlewares can:
                </p>
                <ul>
                  <li>
                    <strong>Call <code>next()</code> (sync or async):</strong> Hand off control to the next middleware in line and ultimately to Dinou&apos;s static asset server, <code>onRequest</code> plugins, and React SSR engine.
                  </li>
                  <li>
                    <strong>Call <code>next(err)</code>:</strong> Abort the middleware chain and propagate a <code>500 Internal Server Error</code> response.
                  </li>
                  <li>
                    <strong>Send a Response via <code>res.end()</code>:</strong> Serve Kubernetes probes (<code>/healthz</code>) or metrics (<code>/metrics</code>) directly; Dinou detects <code>res.headersSent</code> / <code>res.writableEnded</code> and halts immediately.
                  </li>
                  <li>
                    <strong>Defer to an External Server Listener:</strong> When another <code>server.on(&quot;request&quot;)</code> listener (such as Socket.IO on <code>/socket.io/*</code>) handles and ends <code>res</code>, returning without calling <code>next()</code> cleanly bypasses Dinou&apos;s router without triggering a 404.
                  </li>
                </ul>
              </div>

              <div id="configure-server-comparison" className="mt-8 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-emerald-500" />
                  <span>5.3 configureServer vs. onRequest Decision Matrix</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Choose the right hook based on portability and protocol requirements:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Feature</th>
                        <th className="p-3">configureServer(&#123; server, isDev, use &#125;)</th>
                        <th className="p-3">onRequest(request, context)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Target Runtime</td>
                        <td className="p-3 font-mono text-blue-600 dark:text-blue-400">Node.js (<code>dinou dev</code> / <code>dinou start</code>)</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">Universal (Node, Bun, Deno, Cloudflare, Netlify)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">API Standard</td>
                        <td className="p-3">Node Streams (<code>IncomingMessage</code>, <code>ServerResponse</code>)</td>
                        <td className="p-3">Web Standards Fetch API (<code>Request</code>, <code>Response</code>)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Execution Point</td>
                        <td className="p-3">At Node HTTP entry, before static files &amp; Dinou router</td>
                        <td className="p-3">Inside Dinou handler, before dynamic &amp; cached SSG routes</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">WebSockets &amp; TCP</td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Yes (Socket.IO, <code>ws</code>, <code>upgrade</code> events)</td>
                        <td className="p-3">No (HTTP request/response lifecycle)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Server Context</td>
                        <td className="p-3">Operates prior to <code>RequestContextStore</code> creation</td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Enriches <code>context</code> for <code>getContext()</code> in RSC &amp; Actions</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Best Used For</td>
                        <td className="p-3">WebSockets, Connect middlewares (<code>cors</code>, <code>helmet</code>), <code>/healthz</code></td>
                        <td className="p-3">Auth guards, webhooks, i18n redirects, security headers, <code>context.user</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* onRequest Lifecycle */}
            <section id="on-request-lifecycle" className="mt-12">
              <h2>6. Web Standards Hook: <code>onRequest</code></h2>
              <p>
                The <code>onRequest</code> hook receives the standard WHATWG <code>Request</code> object and Dinou&apos;s mutable <code>RequestContextStore</code>, running inside <code>AsyncLocalStorage</code> so <code>getContext()</code> is also available inside any helper function called by your plugin.
              </p>

              {/* The context Object */}
              <div id="context-reference" className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">6.1 The context Object (RequestContextStore)</h3>
                <p>
                  The <code>context</code> parameter exposes normalized request metadata, outgoing response helpers, unified environment variables/bindings, and custom request-scoped state:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`export interface RequestContextStore {
  /** Parsed incoming request metadata */
  req: {
    path: string;                    // Logical route pathname (e.g. "/dashboard", even on /____rsc_* SPA fetches!)
    rawPath?: string;                // Raw HTTP wire pathname (e.g. "/____rsc_page____/dashboard")
    isRscRequest?: boolean;          // True when serving an internal client-router RSC payload
    method: string;                  // HTTP method ("GET", "POST", etc.)
    cookies: Record<string, string>; // Parsed cookie key-value pairs
    headers: IncomingHttpHeaders;    // Lowercased incoming HTTP headers
    query: Query;                    // Parsed URL search parameters (string | string[] | undefined)
    env: DinouEnv;                   // Unified env secrets + Edge bindings (KV, D1, R2)
    ctx?: any;                       // Platform execution context
  };

  /** Outgoing response mutation helpers */
  res: {
    cookie(name: string, value: string, options?: CookieOptions): void;
    clearCookie(name: string, options?: CookieOptions): void;
    setHeader(name: string, value: string | ReadonlyArray<string>): void;
    status(code: number): void;
    redirect(url: string): void;
    redirect(status: number, url: string): void;
  };

  /** Unified server environment (process.env / Deno.env + Cloudflare KV, D1, R2 bindings) */
  env: DinouEnv;

  /** Platform runtime context (e.g. ctx.waitUntil for background tasks) */
  ctx?: { waitUntil(promise: Promise<any>): void };

  /** Custom state attached by plugins (context.user, context.tenant, etc.) */
  [key: string]: any;
}`}
                </CodeBlock>

                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Property</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.req.path</td>
                        <td className="p-3 font-mono text-[11px]">string</td>
                        <td className="p-3">
                          Normalized logical route pathname (e.g. <code>&quot;/dashboard&quot;</code>). Automatically strips internal <code>/____rsc_page____</code> and <code>/____rsc_layout____</code> prefixes during <code>&lt;Link&gt;</code> SPA navigations—<strong>always use <code>context.req.path</code> for route guards</strong>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.req.rawPath</td>
                        <td className="p-3 font-mono text-[11px]">string</td>
                        <td className="p-3">
                          Unmodified HTTP wire pathname before RSC normalization, paired with <code>context.req.isRscRequest</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.res</td>
                        <td className="p-3 font-mono text-[11px]">ResponseProxy</td>
                        <td className="p-3">
                          Response mutation helpers (<code>cookie()</code>, <code>clearCookie()</code>, <code>setHeader()</code>, <code>status()</code>, <code>redirect()</code>). Preserved across dynamic SSR, cached SSG/ISR/PPR pages, and merged onto returned <code>Response</code> objects.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.env</td>
                        <td className="p-3 font-mono text-[11px]">DinouEnv</td>
                        <td className="p-3">
                          Unified server secrets and live Edge bindings (Cloudflare KV, D1, R2). See <Link href="/docs/env-vars">Environment Variables</Link>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.ctx</td>
                        <td className="p-3 font-mono text-[11px]">ExecutionContext</td>
                        <td className="p-3">
                          Platform execution context providing <code>ctx.waitUntil(promise)</code> for non-blocking background work.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context[key]</td>
                        <td className="p-3 font-mono text-[11px]">any</td>
                        <td className="p-3">
                          Custom properties attached to <code>context</code> (e.g. <code>context.user</code>) propagate automatically via <code>AsyncLocalStorage</code> to Server Components, <code>page_functions.ts</code>, and Server Functions via <code>getContext()</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pattern 1 */}
              <div id="pattern-intercept" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">6.2 Pattern 1: Short-Circuit, Webhooks &amp; SPA-Safe Redirects</h3>
                <p>
                  If <code>onRequest</code> returns a Web <code>Response</code> (or calls <code>context.res.redirect(...)</code>), Dinou <strong>immediately terminates the pipeline</strong> and skips downstream plugins and React rendering:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`import type { DinouPlugin } from "dinou";

export const apiAndGuardPlugin: DinouPlugin = {
  name: "api-and-guard",
  onRequest(request, context) {
    // 1. Custom JSON API / webhook endpoint
    if (context.req.path === "/api/ping") {
      return Response.json({ status: "pong", timestamp: Date.now() });
    }

    // 2. SPA-safe route guard: context.req.path matches both hard loads AND <Link> navigations!
    if (context.req.path.startsWith("/dashboard") && !context.req.cookies.session) {
      return Response.redirect(new URL("/login", request.url), 302);
    }
  },
};`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  <strong>Automatic RSC Redirect Translation:</strong> When an unauthenticated user clicks <code>&lt;Link href=&quot;/dashboard&quot;&gt;</code>, the browser fetches <code>/____rsc_page____/dashboard</code>. Dinou normalizes <code>context.req.path</code> to <code>&quot;/dashboard&quot;</code> and automatically converts any <code>3xx</code> <code>Response.redirect(...)</code> (or <code>context.res.redirect(...)</code>) into an <code>x-rsc-redirect</code> instruction (preserving any <code>Set-Cookie</code> headers) so the client router navigates cleanly without feeding HTML into the React Flight parser.
                </p>
              </div>

              {/* Pattern 2 */}
              <div id="pattern-context" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">6.3 Pattern 2: Middleware, Response Headers &amp; Context Mutation</h3>
                <p>
                  If <code>onRequest</code> returns <code>void</code> (<code>undefined</code>), Dinou continues to route resolution. Any headers, cookies, status codes, or custom context properties set during <code>onRequest</code> are preserved on the outgoing response (including explicit <code>Cache-Control</code> and custom HTTP status codes):
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`import type { DinouPlugin } from "dinou";

export const securityAndSessionPlugin: DinouPlugin = {
  name: "security-and-session",
  async onRequest(_request, context) {
    // Applied to every dynamic, SSG, ISR, PPR, and webhook response
    context.res.setHeader("X-Frame-Options", "DENY");
    context.res.setHeader("X-Content-Type-Options", "nosniff");

    const sessionId = context.req.cookies["session_id"];
    if (sessionId) {
      context.user = await validateSession(sessionId);
    }
  },
};`}
                </CodeBlock>
              </div>

              {/* Context in Server Functions */}
              <div id="context-server-functions" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>6.4 Context Sharing with Server Functions</span>
                </h3>
                <p>
                  When a client invokes a <code>&quot;use server&quot;</code> Server Function (<code>POST /____server_function____</code>), Dinou:
                </p>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1.5">
                  <li>Runs all registered plugin <code>onRequest</code> hooks first (short-circuiting immediately if a plugin returns a <code>401</code>/<code>403</code> <code>Response</code> or calls <code>context.res.redirect()</code>).</li>
                  <li>Instantiates the Server Function context and copies all custom properties attached to <code>context</code> during <code>onRequest</code>.</li>
                </ol>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/actions/update-profile.ts
"use server";

import { getContext } from "dinou";

export async function updateProfile(formData: FormData) {
  const { user } = getContext();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.user.update({
    where: { id: user.id },
    data: { name: String(formData.get("name") ?? "") },
  });
}`}
                </CodeBlock>
              </div>

              {/* SSG vs Runtime */}
              <div id="ssg-vs-runtime" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">6.5 Build-Time SSG vs. Runtime Cached Pages</h3>
                <p>
                  Dinou maintains a clean boundary between build-time static generation and live runtime traffic:
                </p>
                <ul>
                  <li>
                    <strong>During Build-Time SSG (<code>dinou build</code>):</strong> <code>onRequest</code> is <strong>not executed</strong> when pre-rendering static HTML and RSC payloads into <code>.dinou/dist2/</code>, ensuring authentication redirects, rate limiters, and request loggers never block or pollute static builds.
                  </li>
                  <li>
                    <strong>At Runtime (<code>dinou start</code> / Edge / Serverless):</strong> <code>onRequest</code> <strong>always executes on every incoming HTTP request before serving both dynamic pages and pre-rendered/cached SSG, ISR, and PPR pages</strong>. A statically pre-rendered page can still be protected by a runtime cookie/JWT guard or enriched with custom security headers in <code>onRequest</code>. (In pure serverless static exports generated via <code>dinou export-static</code>, no Dinou runtime server exists, so host-level rules handle routing.)
                  </li>
                </ul>
              </div>
            </section>

            {/* Deep Dive: Execution Points & Lifecycle Timeline */}
            <section id="execution-timeline" className="mt-12">
              <div className="rounded-xl border border-blue-500/25 bg-blue-50/30 dark:bg-blue-950/20 p-6 not-prose space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground m-0">
                      7. Deep Dive: Execution Points (configureServer vs. onRequest)
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Understanding the distinction between one-time Node server bootstrap and per-request runtime execution.
                    </p>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-lg border border-border bg-card">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Plugin Hook</th>
                        <th className="p-3">Execution Phase</th>
                        <th className="p-3">Frequency</th>
                        <th className="p-3">Scope &amp; Inputs</th>
                        <th className="p-3">Primary Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-blue-600 dark:text-blue-400">configureServer</td>
                        <td className="p-3 font-semibold text-foreground">Node Server Bootstrap</td>
                        <td className="p-3">
                          <span className="inline-flex items-center rounded bg-blue-500/10 px-2 py-0.5 font-medium text-blue-600 dark:text-blue-400">
                            1 time on boot (hot-reloaded in dev)
                          </span>
                        </td>
                        <td className="p-3">
                          <code>http.Server</code>, <code>isDev</code>, <code>use(fn)</code>
                        </td>
                        <td className="p-3">
                          Attach WebSockets, socket listeners, and raw Node <code>(req, res, next)</code> middlewares.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">onRequest</td>
                        <td className="p-3 font-semibold text-foreground">Per-Request Runtime</td>
                        <td className="p-3">
                          <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                            Every runtime HTTP request
                          </span>
                        </td>
                        <td className="p-3">
                          Web Standards <code>Request</code>, <code>RequestContextStore</code>
                        </td>
                        <td className="p-3">
                          Webhooks, auth guards, SPA-safe redirects, response headers/cookies, and <code>context</code> enrichment.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Chronological Flow */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-semibold text-foreground m-0 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    <span>Chronological Execution Flow: From Startup to Page Delivery</span>
                  </h4>

                  <div className="grid gap-4 md:grid-cols-2 text-xs">
                    {/* Phase 1 */}
                    <div className="p-4 rounded-lg border bg-background/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px]">
                          Phase 1: Server Startup
                        </span>
                        <span className="text-[10px] rounded bg-muted px-1.5 py-0.5 font-mono text-muted-foreground">
                          Boot time
                        </span>
                      </div>
                      <ol className="list-decimal pl-4 space-y-1.5 text-muted-foreground leading-relaxed">
                        <li>
                          <strong>Setup Injection:</strong> Plugin and user <code>setupFiles</code> evaluate first at Line 1.
                        </li>
                        <li>
                          <strong>configureServer (Node.js):</strong> Each plugin&apos;s <code>configureServer</code> hook runs before <code>server.listen()</code>:
                          <ul className="list-disc pl-4 mt-1 space-y-0.5">
                            <li>WebSocket engines (Socket.IO, <code>ws</code>) bind to <code>server</code>.</li>
                            <li>Node middlewares register via <code>use((req, res, next) =&gt; ...)</code>.</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Port Listening:</strong> Server begins accepting HTTP and WebSocket connections.
                        </li>
                      </ol>
                    </div>

                    {/* Phase 2 */}
                    <div className="p-4 rounded-lg border bg-background/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
                          Phase 2: Incoming Client Request
                        </span>
                        <span className="text-[10px] rounded bg-muted px-1.5 py-0.5 font-mono text-muted-foreground">
                          Per request
                        </span>
                      </div>
                      <ol className="list-decimal pl-4 space-y-1.5 text-muted-foreground leading-relaxed" start={4}>
                        <li>
                          <strong>Node Middlewares (Node.js):</strong> Registered <code>use()</code> functions run; if they end <code>res</code>, Dinou stops immediately.
                        </li>
                        <li>
                          <strong>Static Public Assets:</strong> Requests matching <code>.dinou/dist3</code> (or <code>public/</code> in dev) stream directly with byte-range support.
                        </li>
                        <li>
                          <strong>Context Normalization:</strong> Dinou creates <code>RequestContextStore</code> and normalizes <code>context.req.path</code>.
                        </li>
                        <li>
                          <strong>onRequest Hooks:</strong> Plugins execute sequentially. Returning a <code>Response</code> or calling <code>context.res.redirect()</code> short-circuits immediately.
                        </li>
                        <li>
                          <strong>Cached SSG/ISR/PPR or Dynamic RSC/SSR:</strong> Dinou serves cached artifacts from <code>.dinou/dist2</code> / storage or streams fresh React 19 RSC &amp; SSR HTML.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Universal Setup Files */}
            <section id="universal-setup-files" className="mt-12">
              <h2>8. Compile-Time Setup Files (<code>setupFiles</code>)</h2>
              <p>
                In ECMAScript Modules (ESM), static <code>import</code> graphs evaluate before module bodies execute. Libraries that expect globals such as <code>DOMMatrix</code> or OpenTelemetry SDK hooks at module evaluation time will fail with a <code>ReferenceError</code> if polyfilled inside a component or <code>dinou.config.ts</code>.
              </p>
              <p>
                Dinou&apos;s <strong>Setup Files</strong> pipeline guarantees your initialization modules run at <strong>Line 1</strong> across Node.js, Cloudflare Workers, Bun, Deno, and Netlify Functions.
              </p>

              <div id="setup-hierarchy" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">8.1 Resolution &amp; Precedence Hierarchy</h3>
                <p>
                  Setup file paths support relative paths (<code>&quot;./src/polyfills.ts&quot;</code>), extensionless paths (<code>&quot;./src/polyfills&quot;</code>), <code>tsconfig.json</code> / <code>jsconfig.json</code> path aliases (<code>&quot;@/polyfills&quot;</code>), and npm package subpaths (<code>&quot;my-plugin/setup&quot;</code>), deduplicated in exact execution order:
                </p>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2">
                  <li>
                    <strong>Plugin Setup Files (<code>plugin.setupFiles: string[]</code>):</strong> Always execute first, in plugin registration order, so tracing/APM plugins instrument globals before user code runs.
                  </li>
                  <li>
                    <strong>Explicit User Config (<code>config.setupFiles: string[]</code>):</strong> Defined in <code>dinou.config.*</code>. When provided, it acts as the sole source of truth for user setup files (pass <code>setupFiles: []</code> to explicitly disable the root convention file).
                  </li>
                  <li>
                    <strong>Zero-Config Root Convention:</strong> When <code>config.setupFiles</code> is omitted, Dinou automatically checks the project root in precedence order: <code>dinou.setup.mjs</code> &rarr; <code>dinou.setup.js</code> &rarr; <code>dinou.setup.ts</code>.
                  </li>
                </ol>
              </div>

              <div id="setup-polyfills" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">8.2 Environment Polyfills Recipe (DOMMatrix / Geometry)</h3>
                <p>
                  To polyfill W3C geometry interfaces (required by packages like <code>pdfjs-dist</code>) in headless server runtimes and standalone compiled binaries:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.setup.ts (Project Root)
import { DOMMatrix, DOMPoint, DOMRect } from "@napi-rs/canvas/geometry.js";

if (typeof globalThis.DOMMatrix === "undefined") {
  (globalThis as any).DOMMatrix = DOMMatrix;
  (globalThis as any).DOMPoint = DOMPoint;
  (globalThis as any).DOMRect = DOMRect;
}

if (typeof globalThis.ImageData === "undefined") {
  (globalThis as any).ImageData = class ImageData {
    width: number;
    height: number;
    data: Uint8ClampedArray;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.data = new Uint8ClampedArray(width * height * 4);
    }
  };
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Real-World Examples */}
            <section id="real-world-examples" className="mt-12">
              <h2>9. Real-World Plugin Examples (Socket.IO, Stripe &amp; Auth)</h2>
              <p>
                Place internal plugin modules inside an underscore-prefixed directory such as <code>src/_plugins/</code> so Dinou&apos;s file-system router ignores them as URL routes while keeping full <code>@/*</code> alias support (see <Link href="/docs/routing">Routing</Link>):
              </p>

              <TabbedCodeBlock
                containerClassName="w-full overflow-hidden rounded-lg my-6"
                tabs={[
                  {
                    id: "config-example",
                    label: "dinou.config.ts",
                    language: "typescript",
                    code: `// dinou.config.ts
import { defineConfig } from "dinou";
import { socketServerPlugin } from "@/_plugins/socket-server";
import { stripeWebhookPlugin } from "@/_plugins/stripe-webhook";
import { authGuardPlugin } from "@/_plugins/auth-guard";

export default defineConfig({
  ppr: true,
  reactStrictMode: true,
  plugins: [
    // 1. Node HTTP / WebSocket Engine & Health Probe
    socketServerPlugin(),

    // 2. Short-Circuit Stripe Webhook + On-Demand Cache Revalidation
    stripeWebhookPlugin(),

    // 3. Session Resolution & SPA-Safe Route Guard
    authGuardPlugin(),
  ],
});`,
                  },
                  {
                    id: "socket-plugin",
                    label: "src/_plugins/socket-server.ts",
                    language: "typescript",
                    code: `// src/_plugins/socket-server.ts
import type { DinouPlugin } from "dinou";
import { Server as SocketIOServer } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

export function socketServerPlugin(): DinouPlugin {
  return {
    name: "socket-io-redis",
    async configureServer({ server, isDev, use }) {
      // 1. Sub-millisecond Kubernetes health probe (bypasses Dinou SSR)
      use((req, res, next) => {
        if (req.url === "/healthz") {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("OK");
          return;
        }
        next();
      });

      // 2. Yield /socket.io/* requests to Socket.IO's own server listener
      use((req, _res, next) => {
        if (req.url && (req.url === "/socket.io" || req.url.startsWith("/socket.io/"))) {
          return;
        }
        next();
      });

      // 3. Bind Socket.IO to the native Node HTTP Server
      const io = new SocketIOServer(server, {
        cors: { origin: isDev ? "*" : false },
      });

      // 4. Optional horizontal scaling with Redis pub/sub
      const redisUrl = process.env.REDIS_URL;
      if (redisUrl) {
        const pubClient = createClient({ url: redisUrl });
        const subClient = pubClient.duplicate();
        await pubClient.connect();
        await subClient.connect();
        io.adapter(createAdapter(pubClient, subClient));
      }

      io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
      });
    },
  };
}`,
                  },
                  {
                    id: "stripe-plugin",
                    label: "src/_plugins/stripe-webhook.ts",
                    language: "typescript",
                    code: `// src/_plugins/stripe-webhook.ts
import type { DinouPlugin } from "dinou";
import { revalidateTag } from "dinou/server";
import Stripe from "stripe";

export function stripeWebhookPlugin(): DinouPlugin {
  return {
    name: "stripe-webhook",
    async onRequest(request, context) {
      if (context.req.path === "/api/webhooks/stripe" && request.method === "POST") {
        const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
        const sig = request.headers.get("stripe-signature") ?? "";
        const rawBody = await request.text();

        try {
          const event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            context.env.STRIPE_WEBHOOK_SECRET
          );

          if (event.type === "checkout.session.completed") {
            await revalidateTag("orders");
          }

          return Response.json({ received: true });
        } catch (err: any) {
          return new Response(\`Webhook Error: \${err.message}\`, { status: 400 });
        }
      }
    },
  };
}`,
                  },
                  {
                    id: "auth-plugin",
                    label: "src/_plugins/auth-guard.ts",
                    language: "typescript",
                    code: `// src/_plugins/auth-guard.ts
import type { DinouPlugin } from "dinou";

declare function verifyToken(token: string): Promise<{ id: string; email: string } | null>;

export function authGuardPlugin(): DinouPlugin {
  return {
    name: "auth-guard",
    async onRequest(request, context) {
      // context.req.path is normalized on both hard loads (/dashboard)
      // and <Link> SPA navigations (/____rsc_page____/dashboard)
      if (context.req.path.startsWith("/dashboard")) {
        const token = context.req.cookies["auth_token"];
        if (!token) {
          return Response.redirect(new URL("/login", request.url), 302);
        }

        const user = await verifyToken(token);
        if (!user) {
          context.res.clearCookie("auth_token", { path: "/" });
          return Response.redirect(new URL("/login", request.url), 302);
        }

        // Accessible in Server Components, page_functions.ts, & Server Functions via getContext()
        context.user = user;
      }
    },
  };
}`,
                  },
                ]}
              />
            </section>

            {/* Registration & Execution Pipeline Order */}
            <section id="plugin-registration-order" className="mt-12">
              <h2>10. Registration &amp; Execution Pipeline Order</h2>
              <p>
                Plugins declared in the <code>plugins</code> array of <code>defineConfig</code> execute deterministically from top to bottom:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Layers className="h-4 w-4 text-amber-500" />
                  <span>Pipeline Execution Rules</span>
                </div>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>
                    <strong>Strict Sequential Execution:</strong> Dinou awaits each plugin&apos;s <code>onRequest</code> hook in array order (<code>plugins[0]</code> &rarr; <code>plugins[1]</code> &rarr; <code>plugins[2]</code>) before evaluating the next.
                  </li>
                  <li>
                    <strong>Short-Circuit Precedence:</strong> Returning a <code>Response</code> or calling <code>context.res.redirect(...)</code> terminates the pipeline immediately, merging any headers or cookies accumulated on <code>context.res</code> by earlier plugins onto the outgoing response.
                  </li>
                  <li>
                    <strong>Cumulative Context Enrichment:</strong> Downstream plugins, route functions, Server Components, and Server Functions receive the exact custom properties attached by upstream plugins.
                  </li>
                </ol>
              </div>

              <div className="space-y-2 mt-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground text-sm">Recommended Layering Order:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Layer 1 (Node Infrastructure &amp; WebSockets):</strong> Plugins declaring <code>configureServer</code> (Socket.IO, <code>cors</code>, <code>/healthz</code>).</li>
                  <li><strong>Layer 2 (Security Headers &amp; Public Webhooks):</strong> Global headers (<code>CSP</code>, <code>X-Frame-Options</code>) and webhook endpoints returning early <code>Response</code> objects.</li>
                  <li><strong>Layer 3 (Session &amp; Tenant Resolution):</strong> Cookie/JWT decoders attaching <code>context.user</code> and <code>context.tenant</code>.</li>
                  <li><strong>Layer 4 (Route Guards &amp; Access Control):</strong> Plugins enforcing authorization on <code>context.req.path</code> and issuing redirects.</li>
                </ul>
              </div>
            </section>

            {/* Fault Isolation */}
            <section id="fault-isolation" className="mt-12">
              <h2>11. Fault Isolation &amp; Error Handling</h2>
              <p>
                Dinou wraps both server-startup and per-request plugin hooks in isolated error boundaries:
              </p>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Cpu className="h-4 w-4" />
                      <span>Per-Plugin Startup Isolation</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Each plugin&apos;s <code>configureServer</code> hook runs in its own isolated boundary. If one plugin throws during startup, Dinou logs an attributed diagnostic and continues registering all remaining plugins:
                    <code className="block mt-2 p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-foreground">
                      [Dinou Plugin Error: &quot;my-plugin&quot; (configureServer)]: Error ...
                    </code>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Safe Runtime Fallback</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Unhandled exceptions thrown inside <code>onRequest</code> are logged with <code>[Dinou Plugin Error: &quot;name&quot;]:</code> and safely converted into a <code>500 Internal Server Error</code> HTTP response without crashing the worker or server process.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
