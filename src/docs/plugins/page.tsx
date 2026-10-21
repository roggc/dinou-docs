import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import {
  Puzzle,
  Server,
  RefreshCw,
  ShieldAlert,
  Cpu,
  Zap,
  Settings,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Layers,
  Lock,
  ArrowRight,
  Flame,
  Radio,
  FileCode,
  ArrowRightLeft,
  Sliders,
  Terminal,
  Clock,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "1. Configuration & Plugin System", level: 2 },
  { id: "config-file", title: "2. The dinou.config.js File", level: 2 },
  { id: "config-bundling", title: "2.1 Esbuild Pre-Bundling & Native Path Aliases", level: 3 },
  { id: "config-options", title: "3. Top-Level Configuration Options", level: 2 },
  { id: "ppr-option", title: "3.1 Global Partial Prerendering (ppr)", level: 3 },
  { id: "strict-mode-option", title: "3.2 React StrictMode (reactStrictMode)", level: 3 },
  { id: "storage-option", title: "3.3 Storage Adapter (storage)", level: 3 },
  { id: "setup-files-option", title: "3.4 Universal Setup Files (setupFiles)", level: 3 },
  { id: "plugins-option", title: "3.5 Plugins Array (plugins)", level: 3 },
  { id: "plugin-architecture", title: "4. Dinou Plugin Architecture", level: 2 },
  { id: "configure-server", title: "5. Low-Level Node Hook: configureServer", level: 2 },
  { id: "configure-server-context", title: "5.1 Context Parameters: server, isDev, use", level: 3 },
  { id: "configure-server-pipeline", title: "5.2 The Node Middleware Pipeline (use)", level: 3 },
  { id: "configure-server-comparison", title: "5.3 configureServer vs. onRequest Decision Matrix", level: 3 },
  { id: "on-request-lifecycle", title: "6. Web Standards Hook: onRequest", level: 2 },
  { id: "context-reference", title: "6.1 The context Object (RequestContextStore)", level: 3 },
  { id: "pattern-intercept", title: "6.2 Pattern 1: Short-Circuit & Webhooks", level: 3 },
  { id: "pattern-context", title: "6.3 Pattern 2: Middleware & Context Mutation", level: 3 },
  { id: "context-server-functions", title: "6.4 Context Sharing with Server Functions", level: 3 },
  { id: "execution-timeline", title: "7. Deep Dive: Execution Points (configureServer vs. onRequest)", level: 2 },
  { id: "universal-setup-files", title: "8. Compile-Time Setup Files (setupFiles)", level: 2 },
  { id: "setup-hierarchy", title: "8.1 Resolution & Precedence Hierarchy", level: 3 },
  { id: "setup-polyfills", title: "8.2 Environment Polyfills Recipe (DOMMatrix / Geometry)", level: 3 },
  { id: "real-world-examples", title: "9. Real-World Plugin Examples (Socket.IO & Redis)", level: 2 },
  { id: "plugin-registration-order", title: "10. Registration & Execution Pipeline Order", level: 2 },
  { id: "fault-isolation", title: "11. Fault Isolation & Error Handling", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Configuration & Plugins | Dinou Docs</title>
      <meta
        name="description"
        content="Customize your Dinou application with dinou.config.js, configureServer for native Node HTTP and WebSockets, setupFiles for compile-time polyfills, and Web Standards onRequest plugins."
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
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Configuration &amp; Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Customize your Dinou application with <code>dinou.config.js</code>, enable global Partial Prerendering (PPR), mount low-level Node.js servers and WebSockets with <code>configureServer</code>, inject compile-time polyfills with <code>setupFiles</code>, and intercept HTTP requests using Web Standards plugins.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>1. Configuration &amp; Plugin System</h2>
              <p>
                In <strong>Dinou</strong>, the configuration and extensibility architecture is designed around two complementary layers:
              </p>
              <ol>
                <li>
                  <strong>Universal Web Standards Layer (<code>onRequest</code>):</strong> Operates across <strong>all</strong> supported runtimes (Node.js, Bun, Deno, and Cloudflare Workers) using the standard Fetch API <code>Request</code> and <code>Response</code> interfaces.
                </li>
                <li>
                  <strong>Low-Level Node.js Server Hook (<code>configureServer</code>):</strong> Gives you direct, non-ejected access to the underlying <code>http.Server</code>, allowing you to attach real-time WebSocket servers (such as Socket.IO or <code>ws</code>) and register Node.js HTTP middlewares <code>(req, res, next)</code>.
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
                    Native <code>Request</code> &amp; <code>Response</code> APIs. Universal execution across Node, Bun, Deno, and Cloudflare Workers.
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
                    <code>configureServer</code> grants direct access to <code>http.Server</code> for WebSockets and Node.js HTTP middlewares <code>(req, res, next)</code> without ejecting.
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
                    Compile-time <code>setupFiles</code> injected at Line 1 via Esbuild <code>inject</code> across all engine passes.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Config File */}
            <section id="config-file" className="mt-12">
              <h2>2. The dinou.config.js File</h2>
              <p>
                Dinou automatically discovers your configuration file at the root of your project. The canonical format is ES Modules (<code>dinou.config.js</code> or <code>dinou.config.ts</code>) using the <code>defineConfig</code> helper:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// dinou.config.js
import { defineConfig } from "dinou";
// Optional: import storage adapters if running custom ISR persistence
// import { RedisStorage } from "dinou/server";

export default defineConfig({
  // Global Partial Prerendering default (can be overridden per route)
  ppr: false,

  // React StrictMode in development (defaults to true)
  reactStrictMode: true,

  // Pluggable ISR / cache slot storage adapter (defaults to FileSystemStorage in Node/Bun)
  // storage: new RedisStorage(redisClient),

  // Compile-time setup scripts injected at Line 1 across all target runtimes
  setupFiles: ["./src/polyfills.ts"],

  // Array of Dinou plugins
  plugins: [],
});`}
              </CodeBlock>

              <div id="config-bundling" className="mt-6 space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-blue-500" />
                  <span>2.1 Esbuild Pre-Bundling &amp; Native Path Aliases</span>
                </h3>
                <p>
                  When Dinou loads <code>dinou.config.js</code> or <code>dinou.config.ts</code>, it automatically bundles the configuration file on the fly using <strong>Esbuild</strong> (&lt;20ms) before execution:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5">
                  <li>
                    <strong>Native <code>tsconfig.json</code> Path Aliases:</strong> You can freely import shared models, utilities, or plugin factories using path aliases (e.g. <code>import &#123; authPlugin &#125; from &quot;@/server/plugins/auth&quot;;</code>) without encountering Node&apos;s runtime <code>ERR_MODULE_NOT_FOUND</code>.
                  </li>
                  <li>
                    <strong>First-Class TypeScript Support:</strong> You can author your configuration in <code>dinou.config.ts</code> without installing extra transpilers or ts-node runners.
                  </li>
                  <li>
                    <strong>External Dependencies:</strong> All third-party packages (such as <code>ioredis</code>, <code>socket.io</code>, <code>stripe</code>) remain clean external references.
                  </li>
                </ul>
              </div>
            </section>

            {/* Top-Level Config Options */}
            <section id="config-options" className="mt-12">
              <h2>3. Top-Level Configuration Options</h2>
              <p>
                The <code>DinouConfig</code> schema provides top-level controls for runtime behavior and compilation:
              </p>

              {/* PPR Option */}
              <div id="ppr-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.1 Global Partial Prerendering (<code>ppr</code>)</h3>
                <p>
                  Dinou introduces first-class <strong>Partial Prerendering (PPR)</strong>. When <code>ppr: true</code> is configured globally in <code>dinou.config.js</code>:
                </p>
                <ul>
                  <li>
                    All static-eligible routes pre-render an instant static HTML shell at build/ISR time.
                  </li>
                  <li>
                    Dynamic components wrapped in React <code>&lt;Suspense&gt;</code> leave streaming placeholder holes that resume and stream from the server upon request.
                  </li>
                </ul>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.js
export default defineConfig({
  ppr: true, // Enables Partial Prerendering across all eligible routes
});`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  You can override PPR on a per-route or per-layout basis inside <code>page_functions.ts</code> or <code>layout_functions.ts</code> by exporting <code>export const ppr = false;</code>.
                </p>
              </div>

              {/* Strict Mode Option */}
              <div id="strict-mode-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.2 React StrictMode (<code>reactStrictMode</code>)</h3>
                <p>
                  In Dinou, <code>reactStrictMode</code> defaults to <code>true</code>. When active in development mode, React intentionally invokes components and effects twice to identify unintended side effects and ensure strict compliance with the React Compiler.
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.js
export default defineConfig({
  // Enabled by default (recommended). Set to false to disable:
  reactStrictMode: false,
});`}
                </CodeBlock>
              </div>

              {/* Storage Option */}
              <div id="storage-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.3 Storage Adapter (<code>storage</code>)</h3>
                <p>
                  Dinou&apos;s ISR and ISG caching engine uses a pluggable storage adapter. By default, Dinou uses the local filesystem (in Node.js/Bun) or Deno KV (in Deno). You can supply a custom storage adapter (such as Redis or Cloudflare KV) in <code>dinou.config.js</code>:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.js
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

export default defineConfig({
  storage: new RedisStorage(new Redis(process.env.REDIS_URL)),
});`}
                </CodeBlock>
              </div>

              {/* Setup Files Option */}
              <div id="setup-files-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.4 Universal Setup Files (<code>setupFiles</code>)</h3>
                <p>
                  An array of file paths to execute before any application code runs. Injected at <strong>Line 1</strong> of every compilation stage across all target runtimes via Esbuild&apos;s native <code>inject</code> mechanism.
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.js
export default defineConfig({
  // Global polyfills or early APM initialization (e.g. Sentry, Datadog)
  setupFiles: ["./src/polyfills.ts"],
});`}
                </CodeBlock>
              </div>

              {/* Plugins Option */}
              <div id="plugins-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3.5 Plugins Array (<code>plugins</code>)</h3>
                <p>
                  An array of plugin objects conforming to the <code>DinouPlugin</code> interface, executed sequentially on every incoming request.
                </p>
              </div>
            </section>

            {/* Plugin Architecture */}
            <section id="plugin-architecture" className="mt-12">
              <h2>4. Dinou Plugin Architecture</h2>
              <p>
                In Dinou, a plugin is an object containing an optional <code>name</code> and hooks for both low-level Node server configuration and universal Web Standards request interception:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`export interface DinouPlugin {
  /** Descriptive identifier used in logging and fault attribution */
  name?: string;

  /** Compile-time setup scripts injected at Line 1 across all target bundles */
  setupFiles?: string[];

  /**
   * Low-level Node.js HTTP/HTTPS server configuration hook.
   * Runs in Node.js and Bun environments before server.listen().
   */
  configureServer?(context: ServerHookContext): void | Promise<void>;

  /**
   * Universal Web Standards request interceptor.
   * Runs on Node.js, Bun, Deno, and Cloudflare Workers on every incoming HTTP request.
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
                Prior to this hook, applications requiring raw access to Node.js HTTP primitives (attaching WebSockets, integrating standard <code>(req, res, next)</code> middlewares like <code>cors</code> or <code>helmet</code>, or handling sub-millisecond health probes) were forced to <strong>eject</strong> the framework.
              </p>
              <p>
                The <code>configureServer</code> plugin hook solves this problem completely. It gives you direct access to the Node.js HTTP/HTTPS server instance and the middleware pipeline in both <strong>Development</strong> (<code>dinou dev</code>) and <strong>Production</strong> (<code>dinou start</code> or standalone compiled binaries).
              </p>

              <div id="configure-server-context" className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">5.1 Context Parameters: <code>&#123; server, isDev, use &#125;</code></h3>
                <p>
                  The hook receives a single context object:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`export interface ServerHookContext {
  /** The native Node.js HTTP/HTTPS server instance */
  server: http.Server | https.Server;

  /** Boolean indicating whether the server is running in development mode (dinou dev) */
  isDev: boolean;

  /** Registers a low-level Node.js HTTP middleware (req, res, next) before Dinou route handlers */
  use: (middleware: NodeMiddleware) => void;
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
                      Toggle dev-only logging, configure permissive CORS during local testing, or enable development inspect tools.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg border bg-card text-xs space-y-1">
                    <p className="font-mono font-semibold text-foreground">use(fn)</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Register classic <code>(req, res, next)</code> middlewares for instant sub-millisecond probes or third-party packages.
                    </p>
                  </div>
                </div>
              </div>

              <div id="configure-server-pipeline" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">5.2 The Node Middleware Pipeline (<code>use</code>)</h3>
                <p>
                  Middlewares registered via <code>use</code> adopt the standard Node.js middleware signature <code>(req, res, next)</code> (compatible with utilities like <code>cors</code> or <code>helmet</code>):
                </p>
                <div className="not-prose my-3 p-3 rounded-lg border border-border bg-muted/40 text-xs text-muted-foreground leading-relaxed">
                  <strong>Architectural Note:</strong> Dinou uses a lightweight native <code>http.createServer()</code> runner and does <strong>not</strong> include or depend on Express. The <code>use</code> helper accepts functions operating directly on native Node <code>IncomingMessage</code> and <code>ServerResponse</code> streams.
                </div>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`type NodeMiddleware = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: () => void
) => void | Promise<void>;`}
                </CodeBlock>
                <p>
                  When a request arrives at the Node server, Dinou passes <code>req</code> and <code>res</code> through each registered middleware. The middleware can:
                </p>
                <ul>
                  <li>
                    <strong>Call <code>next()</code>:</strong> Hand off control to the next middleware in line, and ultimately to Dinou&apos;s page routing and React SSR engine.
                  </li>
                  <li>
                    <strong>Omit calling <code>next()</code> (Short-Circuit):</strong> If an external library (like Socket.IO) handles the HTTP request, return without calling <code>next()</code>. Dinou bypasses page routing and will <strong>not</strong> produce a 404 error.
                  </li>
                  <li>
                    <strong>Send Response via <code>res.end()</code>:</strong> For Kubernetes health checks (<code>/healthz</code>) or Prometheus metrics (<code>/metrics</code>), write headers and send the response directly. Dinou detects that headers were sent and halts the pipeline immediately with zero rendering overhead.
                  </li>
                </ul>
              </div>

              <div id="configure-server-comparison" className="mt-8 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-emerald-500" />
                  <span>5.3 configureServer vs. onRequest Decision Matrix</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Choose the appropriate plugin hook based on the runtime requirements of your task:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Feature</th>
                        <th className="p-3">configureServer(&#123; use &#125;)</th>
                        <th className="p-3">onRequest(request, context)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Target Runtime</td>
                        <td className="p-3 font-mono text-blue-600 dark:text-blue-400">Node.js &amp; Bun</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">Universal (Node, Bun, Deno, Cloudflare)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">API Standard</td>
                        <td className="p-3">Low-Level Node (<code>IncomingMessage</code>, <code>ServerResponse</code>)</td>
                        <td className="p-3">Web Standards Fetch API (<code>Request</code>, <code>Response</code>)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Execution Point</td>
                        <td className="p-3">At the Node HTTP server entry, before Dinou router</td>
                        <td className="p-3">Inside Dinou pipeline, before route rendering</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">WebSockets &amp; TCP</td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Yes (Socket.IO, ws, upgrade events)</td>
                        <td className="p-3">No (HTTP request/response only)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Server Context</td>
                        <td className="p-3">Can mutate <code>req</code></td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Attaches to <code>context</code> (for <code>getContext()</code>)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-foreground">Best Used For</td>
                        <td className="p-3">WebSockets, (req, res, next) middlewares (cors, helmet), /healthz probes, raw body buffers</td>
                        <td className="p-3">Auth redirects, i18n routing, custom response headers, RSC context enrichment</td>
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
                The <code>onRequest</code> hook receives the standard Web <code>Request</code> object and Dinou&apos;s mutable <code>RequestContextStore</code>.
              </p>

              {/* The context Object */}
              <div id="context-reference" className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">6.1 The context Object (RequestContextStore)</h3>
                <p>
                  The <code>context</code> parameter provides access to parsed request metadata, response mutation helpers, platform edge bindings, and custom shared state:
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`export interface RequestContextStore {
  /** Parsed incoming request metadata */
  req: {
    path: string;                    // Normalized URL pathname (e.g. "/admin/settings")
    method: string;                  // HTTP method ("GET", "POST", etc.)
    cookies: Record<string, string>; // Parsed cookie key-value pairs
    headers: Record<string, string>; // Lowercased incoming HTTP headers
    query: Record<string, string>;   // Parsed URL search parameters
    env?: Record<string, any>;       // Platform environment bindings
    ctx?: any;                       // Platform execution context
  };

  /** Outgoing response mutation helpers */
  res: {
    cookie(name: string, value: string, options?: CookieOptions): void;
    clearCookie(name: string, options?: CookieOptions): void;
    setHeader(name: string, value: string): void;
    status(code: number): void;
    redirect(url: string): void;
    redirect(status: number, url: string): void;
  };

  /** Direct platform bindings (Cloudflare Workers KV, D1, R2, etc.) */
  env?: Record<string, any>;

  /** Platform runtime context (e.g. ctx.waitUntil for background execution) */
  ctx?: { waitUntil(promise: Promise<any>): void };

  /** Custom state attached by plugins (context.user, context.session, etc.) */
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
                        <td className="p-3 font-mono font-semibold text-foreground">context.req</td>
                        <td className="p-3 font-mono text-[11px]">Object</td>
                        <td className="p-3">
                          Parsed request helpers: <code>cookies</code>, <code>headers</code>, <code>query</code>, <code>path</code>, and <code>method</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.res</td>
                        <td className="p-3 font-mono text-[11px]">ResponseProxy</td>
                        <td className="p-3">
                          Response mutation helpers: <code>cookie()</code>, <code>clearCookie()</code>, <code>setHeader()</code>, <code>status()</code>, and <code>redirect()</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.env</td>
                        <td className="p-3 font-mono text-[11px]">Record&lt;string, any&gt;</td>
                        <td className="p-3">
                          Direct platform bindings in serverless/edge runtimes (e.g. Cloudflare KV, D1 databases, R2 buckets).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.ctx</td>
                        <td className="p-3 font-mono text-[11px]">ExecutionContext</td>
                        <td className="p-3">
                          Platform execution context, allowing <code>ctx.waitUntil(promise)</code> for non-blocking background tasks without delaying the HTTP response.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context[key]</td>
                        <td className="p-3 font-mono text-[11px]">any</td>
                        <td className="p-3">
                          Any custom property attached directly to <code>context</code> (e.g. <code>context.user</code>, <code>context.session</code>) is preserved in <code>AsyncLocalStorage</code> and accessible via <code>getContext()</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pattern 1 */}
              <div id="pattern-intercept" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">6.2 Pattern 1: Short-Circuit &amp; Webhooks (Returning Response)</h3>
                <p>
                  If <code>onRequest</code> returns a Web <code>Response</code> instance, Dinou <strong>immediately returns that response to the client</strong> and aborts further processing. React Server Component rendering is completely bypassed:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`const apiProbePlugin = {
  name: "api-probe",
  onRequest(request) {
    const url = new URL(request.url);
    if (url.pathname === "/api/ping") {
      return Response.json({ status: "pong", timestamp: Date.now() });
    }
  },
};`}
                </CodeBlock>
              </div>

              {/* Pattern 2 */}
              <div id="pattern-context" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">6.3 Pattern 2: Middleware &amp; Context Mutation (getContext)</h3>
                <p>
                  If <code>onRequest</code> returns <code>void</code> (or <code>undefined</code>), request processing continues normally. Any property attached to <code>context</code> is preserved in <code>AsyncLocalStorage</code> and becomes accessible in any server-side module:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`const userSessionPlugin = {
  name: "user-session",
  async onRequest(request, context) {
    const sessionCookie = context.req.cookies["session_id"];
    if (sessionCookie) {
      // Validate session and attach user object
      const user = await validateSession(sessionCookie);
      context.user = user;
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
                  When a client invokes a Server Function, Dinou:
                </p>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1.5">
                  <li>Executes all registered plugin <code>onRequest</code> hooks for the incoming RPC request.</li>
                  <li>Instantiates the isolated Server Function execution context.</li>
                  <li>Automatically copies all custom properties from the root context to the action context.</li>
                </ol>
                <p className="text-xs text-muted-foreground">
                  This means any authentication claims, multi-tenant IDs, or shared services attached during <code>onRequest</code> are immediately accessible inside <code>&quot;use server&quot;</code> actions via <code>getContext()</code>:
                </p>
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

  // user is cryptographically verified from the plugin onRequest hook
  await db.user.update({ where: { id: user.id }, data: { name: formData.get("name") } });
}`}
                </CodeBlock>
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
                      Understanding the fundamental distinction between one-time server startup and per-request lifecycles.
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
                        <td className="p-3 font-semibold text-foreground">Server Startup / Bootstrap</td>
                        <td className="p-3">
                          <span className="inline-flex items-center rounded bg-blue-500/10 px-2 py-0.5 font-medium text-blue-600 dark:text-blue-400">
                            1 time (on boot)
                          </span>
                        </td>
                        <td className="p-3">
                          <code>http.Server</code>, <code>isDev</code>, <code>use(fn)</code>
                        </td>
                        <td className="p-3">
                          Configure server infrastructure (WebSockets, socket listeners, timeouts, Node middleware queue).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">onRequest</td>
                        <td className="p-3 font-semibold text-foreground">Per-Request Runtime</td>
                        <td className="p-3">
                          <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                            N times (every request)
                          </span>
                        </td>
                        <td className="p-3">
                          Web Standards <code>Request</code>, <code>RequestContextStore</code>
                        </td>
                        <td className="p-3">
                          Handle incoming user traffic (cookies, auth checks, 302/401 short-circuit redirects, <code>context</code> mutation).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Chronological Flow */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-semibold text-foreground m-0 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    <span>Chronological Execution Flow: From Startup to Page Render</span>
                  </h4>

                  <div className="grid gap-4 md:grid-cols-2 text-xs">
                    {/* Phase 1 */}
                    <div className="p-4 rounded-lg border bg-background/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px]">
                          Phase 1: Server Startup
                        </span>
                        <span className="text-[10px] rounded bg-muted px-1.5 py-0.5 font-mono text-muted-foreground">
                          Runs 1 time
                        </span>
                      </div>
                      <ol className="list-decimal pl-4 space-y-1.5 text-muted-foreground leading-relaxed">
                        <li>
                          <strong>Process Boot:</strong> Command <code>dinou start</code> or <code>dinou dev</code> initializes Node&apos;s native <code>http.createServer()</code>.
                        </li>
                        <li>
                          <strong>configureServer Hook Invoked:</strong> Dinou executes all plugin <code>configureServer</code> hooks before <code>server.listen()</code>.
                          <ul className="list-disc pl-4 mt-1 space-y-0.5">
                            <li>WebSocket engines (Socket.IO, <code>ws</code>) bind to <code>server</code>.</li>
                            <li>Redis/Valkey pub/sub adapters establish connection.</li>
                            <li>Node middlewares register in the internal pipeline queue via <code>use((req, res, next) =&gt; ...)</code>.</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Port Listening:</strong> The server starts accepting connections via <code>server.listen(port)</code>.
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
                          Runs on every HTTP request
                        </span>
                      </div>
                      <ol className="list-decimal pl-4 space-y-1.5 text-muted-foreground leading-relaxed" start={4}>
                        <li>
                          <strong>HTTP Hit:</strong> A client makes a request (e.g. <code>GET /dashboard</code>).
                        </li>
                        <li>
                          <strong>Node Middlewares Execute:</strong> Registered <code>use</code> functions run. If handling <code>/healthz</code> or <code>/socket.io</code>, they respond via <code>res.end()</code> and bypass Dinou completely. Otherwise, they invoke <code>next()</code>.
                        </li>
                        <li>
                          <strong>Web Standards Conversion:</strong> Dinou constructs standard <code>Request</code> and <code>context</code> objects.
                        </li>
                        <li>
                          <strong>onRequest Hooks Execute:</strong> Plugins run sequentially. If returning a <code>Response</code>, Dinou terminates early. If mutating <code>context</code>, data is preserved for <code>getContext()</code>.
                        </li>
                        <li>
                          <strong>Page &amp; RSC Rendering:</strong> Dinou resolves route contracts and renders React Server Components.
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
                In standard ECMAScript Modules (ESM), all static <code>import</code> statements are resolved and executed <strong>before</strong> module bodies evaluate. When third-party packages (such as <code>pdfjs-dist</code> or telemetry agents like Sentry and Datadog) expect globals on <code>globalThis</code>, attempting to assign polyfills inside application components or <code>dinou.config.js</code> runs too late and results in runtime <code>ReferenceError</code> exceptions.
              </p>
              <p>
                Dinou&apos;s universal <strong>Setup Files</strong> architecture guarantees that your polyfill or instrumentation scripts execute at <strong>Line 1</strong> of every engine bundle across all environments.
              </p>

              <div id="setup-hierarchy" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">8.1 Resolution &amp; Precedence Hierarchy</h3>
                <p>
                  Dinou resolves setup files using an unambiguous hierarchy:
                </p>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2">
                  <li>
                    <strong>1. Plugin Setup Files (<code>plugin.setupFiles: string[]</code>):</strong> Run first. Allows infrastructure plugins (APM, distributed tracing, metrics) to initialize before user code.
                  </li>
                  <li>
                    <strong>2. Explicit User Config (<code>config.setupFiles: string[]</code>):</strong> Defined in <code>dinou.config.js</code>. When specified, this completely replaces any zero-config convention files.
                  </li>
                  <li>
                    <strong>3. Zero-Config Convention:</strong> If <code>config.setupFiles</code> is omitted, Dinou automatically checks for <code>./dinou.setup.js</code> or <code>./dinou.setup.ts</code> strictly in the project root directory.
                  </li>
                </ol>
              </div>

              <div id="setup-polyfills" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">8.2 Environment Polyfills Recipe (DOMMatrix / Geometry)</h3>
                <p>
                  To polyfill W3C geometry interfaces (required by <code>pdfjs-dist</code>) in headless Node, Bun, and standalone compiled binaries without native C++ compilation:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.setup.js (Project Root)
import { DOMMatrix, DOMPoint, DOMRect } from "@napi-rs/canvas/geometry";

// 1. W3C Geometry Interfaces (Pure JS, zero C++ native compilation bindings)
if (typeof globalThis.DOMMatrix === "undefined") {
  globalThis.DOMMatrix = DOMMatrix;
  globalThis.DOMPoint = DOMPoint;
  globalThis.DOMRect = DOMRect;
}

// 2. Minimal stubs for headless server environments
if (typeof globalThis.ImageData === "undefined") {
  globalThis.ImageData = class ImageData {
    constructor(width, height) {
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
              <h2>9. Real-World Plugin Examples (Socket.IO &amp; Redis)</h2>
              <p>
                The following complete production example demonstrates combining <code>configureServer</code> for real-time WebSockets and Redis clustering with <code>onRequest</code> for authentication guards and webhooks:
              </p>

              <TabbedCodeBlock
                containerClassName="w-full overflow-hidden rounded-lg my-6"
                tabs={[
                  {
                    id: "config-example",
                    label: "dinou.config.js",
                    language: "javascript",
                    code: `// dinou.config.js
import { defineConfig } from "dinou";
import { socketServerPlugin } from "./src/plugins/socket-server.js";
import { authGuardPlugin } from "./src/plugins/auth-guard.js";
import { stripeWebhookPlugin } from "./src/plugins/stripe-webhook.js";

export default defineConfig({
  ppr: true,
  reactStrictMode: true,
  plugins: [
    // 1. WebSocket Engine & Node Middlewares
    socketServerPlugin(),

    // 2. Short-Circuit Webhook Interceptor
    stripeWebhookPlugin(),

    // 3. User Session & Route Authentication Guard
    authGuardPlugin(),
  ],
});`,
                  },
                  {
                    id: "socket-plugin",
                    label: "src/plugins/socket-server.js",
                    language: "javascript",
                    code: `// src/plugins/socket-server.js
import { Server as SocketIOServer } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

export function socketServerPlugin() {
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

      // 2. Intercept Socket.IO polling paths so Dinou doesn't return 404
      use((req, res, next) => {
        if (req.url && (req.url === "/socket.io" || req.url.startsWith("/socket.io/"))) {
          return; // Socket.IO internal listener handles this
        }
        next();
      });

      // 3. Bind Socket.IO to the native Node HTTP Server
      const io = new SocketIOServer(server, {
        cors: { origin: isDev ? "*" : false },
      });

      // 4. Multi-instance horizontal scaling with Redis
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
                    label: "src/plugins/stripe-webhook.js",
                    language: "javascript",
                    code: `// src/plugins/stripe-webhook.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export function stripeWebhookPlugin() {
  return {
    name: "stripe-webhook",
    async onRequest(request) {
      const url = new URL(request.url);

      // Short-circuit: Handle raw webhook and bypass React SSR rendering completely
      if (url.pathname === "/api/webhooks/stripe" && request.method === "POST") {
        const sig = request.headers.get("stripe-signature");
        const rawBody = await request.text();

        try {
          const event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
          );

          if (event.type === "checkout.session.completed") {
            // Fulfill the customer's purchase in the database
          }

          return Response.json({ received: true });
        } catch (err) {
          return new Response(\`Webhook Error: \${err.message}\`, { status: 400 });
        }
      }
    },
  };
}`,
                  },
                  {
                    id: "auth-plugin",
                    label: "src/plugins/auth-guard.js",
                    language: "javascript",
                    code: `// src/plugins/auth-guard.js
export function authGuardPlugin() {
  return {
    name: "auth-guard",
    async onRequest(request, context) {
      const url = new URL(request.url);

      // Protect /dashboard routes
      if (url.pathname.startsWith("/dashboard")) {
        const token = context.req.cookies["auth_token"];
        if (!token) {
          return Response.redirect(new URL("/login", request.url), 302);
        }

        const user = await verifyToken(token);
        if (!user) {
          return Response.redirect(new URL("/login", request.url), 302);
        }

        // Attach verified user to context for getContext() in RSC & Server Functions
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
                Plugins declared in the <code>plugins</code> array of <code>defineConfig</code> execute sequentially according to their order:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Layers className="h-4 w-4 text-amber-500" />
                  <span>Pipeline Execution Rules</span>
                </div>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>
                    <strong>Strict Sequential Execution:</strong> Plugins execute top-to-bottom in the exact order declared (<code>plugins[0]</code> &rarr; <code>plugins[1]</code> &rarr; <code>plugins[2]</code>). Dinou awaits each plugin&apos;s <code>onRequest</code> promise before evaluating the next.
                  </li>
                  <li>
                    <strong>Short-Circuit Precedence:</strong> If a plugin returns a <code>Response</code> instance (e.g. returning <code>Response.json()</code> from a webhook or <code>Response.redirect()</code> from a guard), the pipeline terminates <strong>immediately</strong>. Subsequent plugins and React rendering are skipped.
                  </li>
                  <li>
                    <strong>Cumulative Context Sharing:</strong> Context mutations are cumulative. A downstream plugin receives the exact <code>context</code> object enriched by upstream plugins.
                  </li>
                </ol>
              </div>

              <div className="space-y-2 mt-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground text-sm">Recommended Layering Order:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Layer 1 (Node Server &amp; WebSockets):</strong> Plugins declaring <code>configureServer</code> (e.g. Socket.IO, Node HTTP middlewares).</li>
                  <li><strong>Layer 2 (Public Webhooks &amp; Probes):</strong> Request interceptors returning early <code>Response</code> (e.g. Stripe webhooks, ping checks).</li>
                  <li><strong>Layer 3 (Session &amp; Tenant Resolution):</strong> Cookie decoders and auth token validators attaching <code>context.user</code>.</li>
                  <li><strong>Layer 4 (Route Guards &amp; Access Control):</strong> Plugins verifying permissions and issuing 302 redirects.</li>
                </ul>
              </div>
            </section>

            {/* Fault Isolation */}
            <section id="fault-isolation" className="mt-12">
              <h2>11. Fault Isolation &amp; Error Handling</h2>
              <p>
                Dinou provides built-in try-catch fault isolation for all active plugins:
              </p>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Cpu className="h-4 w-4" />
                      <span>Plugin Attribution</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Plugins are identified by their <code>name</code> property. If an unhandled exception occurs inside <code>onRequest</code>, Dinou logs an informative error attributing the failure to that specific plugin name:
                    <code className="block mt-2 p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-foreground">
                      [Dinou Plugin Error: &quot;my-plugin&quot;]: TypeError ...
                    </code>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Graceful Fallback</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    If an unhandled exception is thrown by a plugin, Dinou catches it safely and returns a standard <code>500 Internal Server Error</code> response, preventing server crash or zombie process states.
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
