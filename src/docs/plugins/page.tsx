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
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Configuration & Plugin System", level: 2 },
  { id: "config-file", title: "The dinou.config.mjs File", level: 2 },
  { id: "config-options", title: "Top-Level Configuration Options", level: 2 },
  { id: "ppr-option", title: "Global Partial Prerendering (ppr)", level: 3 },
  { id: "strict-mode-option", title: "React StrictMode (reactStrictMode)", level: 3 },
  { id: "storage-option", title: "Storage Adapter (storage)", level: 3 },
  { id: "plugins-option", title: "Plugins Array (plugins)", level: 3 },
  { id: "plugin-architecture", title: "Dinou Plugin Architecture (onRequest)", level: 2 },
  { id: "context-reference", title: "The context Object (RequestContextStore)", level: 3 },
  { id: "pattern-intercept", title: "Pattern 1: Short-Circuit & Webhooks (Returning Response)", level: 3 },
  { id: "pattern-context", title: "Pattern 2: Middleware & Context Mutation (getContext)", level: 3 },
  { id: "real-world-examples", title: "Real-World Plugin Examples", level: 2 },
  { id: "plugin-registration-order", title: "Registration & Execution Pipeline Order", level: 2 },
  { id: "fault-isolation", title: "Fault Isolation & Error Handling", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Configuration & Plugins | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Customize your Dinou application with dinou.config.mjs, enable global Partial Prerendering (PPR), and hook into request lifecycle events."
      />
      <link rel="canonical" href="https://dinou.dev/docs/plugins" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Configuration &amp; Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Customize your Dinou application with <code>dinou.config.mjs</code>, enable global Partial Prerendering (PPR), configure React StrictMode, and hook into the request lifecycle using Web Standards plugins.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Configuration &amp; Plugin System</h2>
              <p>
                In <strong>Dinou v7</strong>, the configuration and plugin architecture is built entirely on modern <strong>Web Standards</strong> (the standard <code>Request</code> and <code>Response</code> interfaces).
              </p>
              <p>
                Through <code>dinou.config.mjs</code>, you can:
              </p>
              <ul>
                <li>
                  <strong>Enable Global PPR:</strong> Automatically generate static shells with dynamic streaming Suspense holes for all static-eligible routes.
                </li>
                <li>
                  <strong>Configure React StrictMode:</strong> Ensure dev-time safety and compiler compatibility across your component tree.
                </li>
                <li>
                  <strong>Mount Universal Middlewares:</strong> Intercept incoming HTTP requests, enforce security policies, or handle webhooks without ejecting.
                </li>
                <li>
                  <strong>Propagate Server Context:</strong> Attach session, user, or localization data to <code>context</code>, instantly accessible in Server Components and Server Functions via <code>getContext()</code>.
                </li>
              </ul>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Web Standards First</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Native <code>Request</code> &amp; <code>Response</code> APIs. Zero dependency on legacy Node.js Express wrappers.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Flame className="h-4 w-4" />
                      <span>PPR &amp; Rendering Flags</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Control global Partial Prerendering and React StrictMode from a single configuration source.
                  </CardContent>
                </Card>

                <Card className="border-slate-500/20 bg-slate-50/50 dark:bg-slate-900/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      <span>Context Propagation</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Inject authenticated user or tenant data into RSC via <code>AsyncLocalStorage</code> and <code>getContext()</code>.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Config File */}
            <section id="config-file" className="mt-12">
              <h2>The dinou.config.mjs File</h2>
              <p>
                Dinou automatically discovers your configuration file at the root of your project. The recommended format is ES Modules (<code>dinou.config.mjs</code> or <code>dinou.config.ts</code>) using the <code>defineConfig</code> helper:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// dinou.config.mjs
import { defineConfig } from "dinou";
// Optional: import storage adapters if running custom ISR persistence
// import { CloudflareKVStorage } from "dinou/server";

export default defineConfig({
  // Global Partial Prerendering default (can be overridden per route)
  ppr: false,

  // React StrictMode in development (defaults to true in v7)
  reactStrictMode: true,

  // Custom storage adapter for ISR / route caching (defaults to FileSystemStorage in Node / KV in Deno)
  // storage: new CloudflareKVStorage(env.MY_KV),

  // Array of Web Standards plugins
  plugins: [],
});`}
              </CodeBlock>
              <p className="text-xs text-muted-foreground mt-2">
                Dinou also supports <code>dinou.config.js</code>, <code>dinou.config.cjs</code>, and <code>dinou.config.ts</code>.
              </p>
            </section>

            {/* Top-Level Config Options */}
            <section id="config-options" className="mt-12">
              <h2>Top-Level Configuration Options</h2>
              <p>
                The <code>DinouConfig</code> schema provides top-level controls for runtime behavior and compilation:
              </p>

              {/* PPR Option */}
              <div id="ppr-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">1. Global Partial Prerendering (<code>ppr</code>)</h3>
                <p>
                  <strong>Dinou v7</strong> introduces first-class <strong>Partial Prerendering (PPR)</strong>. When <code>ppr: true</code> is configured globally in <code>dinou.config.mjs</code>:
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
{`// dinou.config.mjs
export default defineConfig({
  ppr: true, // Enables Partial Prerendering across all eligible routes
});`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  You can still override PPR on a per-route or per-layout basis inside <code>page_functions.ts</code> or <code>layout_functions.ts</code> by exporting <code>export const ppr = false;</code>.
                </p>
              </div>

              {/* Strict Mode Option */}
              <div id="strict-mode-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">2. React StrictMode (<code>reactStrictMode</code>)</h3>
                <p>
                  In Dinou v7, <code>reactStrictMode</code> defaults to <code>true</code>. When active in development mode, React intentionally invokes components and effects twice to identify unintended side effects and ensure strict compliance with the React Compiler.
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.mjs
export default defineConfig({
  // Enabled by default (recommended). Set to false to disable:
  reactStrictMode: false,
});`}
                </CodeBlock>
              </div>

              {/* Storage Option */}
              <div id="storage-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">3. Storage Adapter (<code>storage</code>)</h3>
                <p>
                  Dinou&apos;s ISR and ISG caching engine uses a pluggable storage adapter. By default, Dinou uses the local filesystem (in Node.js/Bun) or Deno KV (in Deno). You can supply a custom storage adapter (such as Redis or Cloudflare KV) in <code>dinou.config.mjs</code>:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou.config.mjs
import { myCustomRedisStorage } from "./src/lib/storage-redis";

export default defineConfig({
  storage: myCustomRedisStorage,
});`}
                </CodeBlock>
              </div>

              {/* Plugins Option */}
              <div id="plugins-option" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">4. Plugins Array (<code>plugins</code>)</h3>
                <p>
                  An array of plugin objects conforming to the <code>DinouPlugin</code> interface, executed sequentially on every incoming request.
                </p>
              </div>
            </section>

            {/* Plugin Architecture */}
            <section id="plugin-architecture" className="mt-12">
              <h2>Dinou Plugin Architecture (onRequest)</h2>
              <p>
                In Dinou v7, a plugin is an object containing an optional <code>name</code> and the <code>onRequest</code> lifecycle hook:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`export interface DinouPlugin {
  name?: string;
  onRequest?(
    request: Request,
    context: RequestContextStore
  ): Promise<Response | void> | Response | void;
}`}
              </CodeBlock>

              <p className="mt-4">
                The <code>onRequest</code> hook receives the standard Web <code>Request</code> object and Dinou&apos;s mutable <code>RequestContextStore</code>.
              </p>

              {/* The context Object */}
              <div id="context-reference" className="mt-8 space-y-4">
                <h3 className="text-lg font-bold">The context Object (RequestContextStore)</h3>
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
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3">Property</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.req</td>
                        <td className="p-3 font-mono text-muted-foreground">Object</td>
                        <td className="p-3 text-muted-foreground">
                          Parsed request helpers: <code>cookies</code>, <code>headers</code>, <code>query</code>, <code>path</code>, and <code>method</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.res</td>
                        <td className="p-3 font-mono text-muted-foreground">ResponseProxy</td>
                        <td className="p-3 text-muted-foreground">
                          Response mutation helpers: <code>cookie()</code>, <code>clearCookie()</code>, <code>setHeader()</code>, <code>status()</code>, and <code>redirect()</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.env</td>
                        <td className="p-3 font-mono text-muted-foreground">Record&lt;string, any&gt;</td>
                        <td className="p-3 text-muted-foreground">
                          Direct platform bindings in serverless/edge runtimes (e.g. Cloudflare KV, D1 databases, R2 buckets).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context.ctx</td>
                        <td className="p-3 font-mono text-muted-foreground">ExecutionContext</td>
                        <td className="p-3 text-muted-foreground">
                          Platform execution context, allowing <code>ctx.waitUntil(promise)</code> for non-blocking background tasks without delaying the HTTP response.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-foreground">context[key]</td>
                        <td className="p-3 font-mono text-muted-foreground">any</td>
                        <td className="p-3 text-muted-foreground">
                          Any custom property attached directly to <code>context</code> (e.g. <code>context.user</code>, <code>context.session</code>) is preserved in <code>AsyncLocalStorage</code> and accessible anywhere via <code>getContext()</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="mt-8">
                The <code>onRequest</code> hook can execute in two distinct operational patterns:
              </p>

              {/* Pattern 1 */}
              <div id="pattern-intercept" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Pattern 1: Short-Circuit &amp; Webhooks (Returning Response)</h3>
                <p>
                  If <code>onRequest</code> returns a Web <code>Response</code> instance, Dinou <strong>immediately returns that response to the client</strong> and aborts further processing. React Server Component rendering is completely bypassed:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`const healthCheckPlugin = {
  name: "health-check",
  onRequest(request) {
    const url = new URL(request.url);
    if (url.pathname === "/healthz") {
      return Response.json({ status: "ok", timestamp: Date.now() });
    }
  },
};`}
                </CodeBlock>
              </div>

              {/* Pattern 2 */}
              <div id="pattern-context" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Pattern 2: Middleware &amp; Context Mutation (getContext)</h3>
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

                <p className="mt-3">
                  In your Server Components or Server Functions, consume the attached data using <code>getContext()</code>:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/app/profile/page.tsx (Server Component)
import { getContext } from "dinou";

export default function ProfilePage() {
  const context = getContext();
  const user = context?.user;

  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  return <h1>Welcome back, {user.name}!</h1>;
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Real-World Examples */}
            <section id="real-world-examples" className="mt-12">
              <h2>Real-World Plugin Examples</h2>
              <p>
                In production applications, plugins allow you to keep authentication guards, raw webhook endpoints, and pipeline registration cleanly separated and composable:
              </p>

              <TabbedCodeBlock
                containerClassName="w-full overflow-hidden rounded-lg my-6"
                tabs={[
                  {
                    id: "auth-guard",
                    label: "plugins/auth-guard.ts",
                    language: "typescript",
                    code: `// plugins/auth-guard.ts
import type { DinouPlugin } from "dinou";

export function authGuardPlugin(): DinouPlugin {
  return {
    name: "auth-guard",
    async onRequest(request, context) {
      const url = new URL(request.url);

      // Protect /admin routes
      if (url.pathname.startsWith("/admin")) {
        const token = context.req.cookies["auth_token"];
        if (!token) {
          // Redirect unauthorized visitors immediately
          return Response.redirect(new URL("/login", request.url), 302);
        }

        const user = await verifyToken(token);
        if (!user || user.role !== "admin") {
          return new Response("Forbidden", { status: 403 });
        }

        // Attach verified user to context
        context.user = user;
      }
    },
  };
}`,
                  },
                  {
                    id: "stripe-webhook",
                    label: "plugins/stripe-webhook.ts",
                    language: "typescript",
                    code: `// plugins/stripe-webhook.ts
import type { DinouPlugin } from "dinou";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export function stripeWebhookPlugin(): DinouPlugin {
  return {
    name: "stripe-webhook",
    async onRequest(request) {
      const url = new URL(request.url);
      if (url.pathname === "/api/webhooks/stripe" && request.method === "POST") {
        const sig = request.headers.get("stripe-signature");
        const rawBody = await request.text();

        try {
          const event = stripe.webhooks.constructEvent(
            rawBody,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
          );

          if (event.type === "checkout.session.completed") {
            // Process payment event
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
                    id: "dinou-config",
                    label: "dinou.config.mjs",
                    language: "typescript",
                    code: `// dinou.config.mjs
import { defineConfig } from "dinou";
import { requestLoggerPlugin } from "./plugins/logger";
import { stripeWebhookPlugin } from "./plugins/stripe-webhook";
import { authGuardPlugin } from "./plugins/auth-guard";

export default defineConfig({
  ppr: true,
  reactStrictMode: true,
  plugins: [
    // 1. Observability: Runs first on every incoming request
    requestLoggerPlugin(),

    // 2. Webhooks: Intercepts /api/webhooks/* and short-circuits early
    stripeWebhookPlugin(),

    // 3. Auth Guard: Validates credentials and enriches context.user
    authGuardPlugin(),
  ],
});`,
                  },
                ]}
              />
            </section>

            {/* Registration & Execution Pipeline Order */}
            <section id="plugin-registration-order" className="mt-12">
              <h2>Registration &amp; Execution Pipeline Order</h2>
              <p>
                To register your plugins, pass them into the <code>plugins</code> array of <code>defineConfig</code> in <code>dinou.config.mjs</code> (as shown in the configuration tab above). Dinou executes plugins sequentially according to their position in the array:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Layers className="h-4 w-4 text-amber-500" />
                  <span>Pipeline Execution Rules</span>
                </div>
                <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>
                    <strong>Strict Sequential Execution:</strong> Plugins execute top-to-bottom in the exact order they are declared in the array (<code>plugins[0]</code> &rarr; <code>plugins[1]</code> &rarr; <code>plugins[2]</code>). Dinou awaits each plugin&apos;s <code>onRequest</code> promise before evaluating the next.
                  </li>
                  <li>
                    <strong>Short-Circuit Precedence:</strong> If a plugin returns a <code>Response</code> instance (e.g. returning <code>Response.json()</code> from a webhook or <code>Response.redirect()</code> from a guard), the pipeline terminates <strong>immediately</strong>. Subsequent plugins in the array and React page rendering are completely skipped.
                  </li>
                  <li>
                    <strong>Cumulative Context Sharing:</strong> Context mutations are cumulative. A plugin downstream in the array receives the exact <code>context</code> object enriched by previous upstream plugins.
                  </li>
                </ol>
              </div>

              <div className="space-y-2 mt-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground text-sm">Recommended Layering Order:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Layer 1 (Global Observability &amp; Headers):</strong> Request logging, performance metrics, and CORS headers.</li>
                  <li><strong>Layer 2 (Public Webhooks &amp; Health Checks):</strong> Webhook listeners that must bypass authentication (e.g., Stripe, Clerk, <code>/healthz</code>).</li>
                  <li><strong>Layer 3 (Session &amp; Tenant Identification):</strong> Cookie parsers, auth token validation, and multi-tenant resolution that mutate <code>context</code>.</li>
                  <li><strong>Layer 4 (Route Guards &amp; Permissions):</strong> Access-control checks that inspect <code>context.user</code> and issue redirects if unauthorized.</li>
                </ul>
              </div>
            </section>

            {/* Fault Isolation */}
            <section id="fault-isolation" className="mt-12">
              <h2>Fault Isolation &amp; Error Handling</h2>
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
