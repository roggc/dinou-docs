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
  Lock,
  Globe,
  ShieldCheck,
  Terminal,
  Layers,
  Zap,
  Cloud,
  Server,
  FileText,
  RefreshCw,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Environment Variables in Dinou", level: 2 },
  { id: "server-security-model", title: "Server Isolation & DINOU_PUBLIC_*", level: 2 },
  { id: "where-they-work", title: "Private Server Secrets", level: 3 },
  { id: "public-prefix", title: "Public Client Variables (DINOU_PUBLIC_*)", level: 3 },
  { id: "client-safety", title: "Build-Time Prefix vs. Runtime Props", level: 3 },
  { id: "env-files", title: "Defining .env Files", level: 2 },
  { id: "env-hierarchy", title: ".env* Precedence Hierarchy & Hot-Reload", level: 3 },
  { id: "framework-vars", title: "Built-In Framework Variables", level: 3 },
  { id: "platforms-runtimes", title: "Multi-Platform Runtimes", level: 2 },
  { id: "node-bun", title: "Node.js & Bun", level: 3 },
  { id: "cloudflare", title: "Cloudflare Workers & Bindings", level: 3 },
  { id: "deno", title: "Deno (--allow-env & Deno KV)", level: 3 },
  { id: "netlify", title: "Netlify (Functions v2)", level: 3 },
  { id: "typed-validation", title: "TypeScript & Zod Validation", level: 2 },
  { id: "security-shield", title: "Anti-Leak Security & Bot Shield", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Environment Variables | Dinou Docs</title>
      <meta
        name="description"
        content="Manage server secrets, DINOU_PUBLIC_* browser variables, .env* hierarchies, and Cloudflare/Netlify/Edge bindings securely across Esbuild, Rollup, Webpack, Node.js, Bun, Deno, Cloudflare Workers, and Netlify."
      />
      <link rel="canonical" href="https://dinou.dev/docs/env-vars" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Zero-Leak Secrets
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Environment Variables &amp; Secrets
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage database credentials, API tokens, <code>DINOU_PUBLIC_*</code> client constants, and Edge resource bindings securely across Node.js, Bun, Deno, Cloudflare Workers, and Netlify.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Environment Variables in Dinou</h2>
              <p>
                Dinou isolates all environment variables to the server by default across Esbuild, Rollup, and Webpack. Private secrets (such as database passwords or payment API keys) are never bundled into browser JavaScript or leaked during Client Component SSR/SSG, while variables explicitly prefixed with <code>DINOU_PUBLIC_</code> are safely inlined for client use.
              </p>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Private by Default</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Unprefixed variables stay 100% on the server—protected in both client bundles and SSR HTML generation.
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      <Globe className="h-4 w-4" />
                      <span>Explicit DINOU_PUBLIC_*</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Opt-in browser constants via <code>DINOU_PUBLIC_*</code> across Esbuild, Rollup, Webpack, and <code>export-static</code>.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Cloud className="h-4 w-4" />
                      <span>Unified getContext().env</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Read text secrets and Cloudflare KV, D1, and R2 bindings uniformly in local <code>dinou dev</code> and production.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Server Isolation & DINOU_PUBLIC_* */}
            <section id="server-security-model" className="mt-12 scroll-mt-20">
              <h2>Server Isolation &amp; DINOU_PUBLIC_*</h2>
              <p>
                Dinou enforces a strict compile-time and SSR boundary between private server credentials and public browser configuration:
              </p>
              <ul>
                <li>
                  <strong>Unprefixed variables (e.g. <code>DATABASE_URL</code>, <code>STRIPE_SECRET_KEY</code>):</strong> Accessible exclusively on the server. Inside <code>&quot;use client&quot;</code> components, unprefixed <code>process.env.*</code> accesses safely evaluate to <code>undefined</code> during both SSR/SSG and browser execution—never leaking secrets into HTML or throwing <code>ReferenceError: process is not defined</code>.
                </li>
                <li>
                  <strong>Prefixed variables (<code>DINOU_PUBLIC_*</code>):</strong> Embedded at build time into Client Components and SSR across all 3 bundlers.
                </li>
              </ul>

              {/* Sub-section: Private Server Secrets */}
              <div id="where-they-work" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Private Server Secrets</h3>
                <p>
                  Read private environment variables freely in any server-only execution context:
                </p>
                <div className="grid gap-3 sm:grid-cols-2 not-prose my-4">
                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <Server className="h-4 w-4 text-emerald-500" />
                      <span>Server Components (RSC)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Query databases or private CMS APIs directly inside <code>page.tsx</code> and <code>layout.tsx</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>Server Functions (&quot;use server&quot;)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use private payment SDKs, signing keys, and database pools in RPC mutations.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <FileText className="h-4 w-4 text-emerald-500" />
                      <span>Page &amp; Layout Functions</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Access backend credentials in <code>getProps</code>, <code>getStaticPaths</code>, and <code>validateParams</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <Terminal className="h-4 w-4 text-amber-500" />
                      <span>Config &amp; Plugins</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Read service tokens in <code>dinou.config.ts</code>, <code>setupFiles</code>, and <code>plugin.onRequest</code>.
                    </p>
                  </div>
                </div>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/server-functions/checkout.ts
"use server";

import Stripe from "stripe";

// Private secret stays 100% on the server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(amount: number) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price_data: { currency: "usd", unit_amount: amount }, quantity: 1 }],
    mode: "payment",
    success_url: \`\${process.env.APP_URL}/success\`,
    cancel_url: \`\${process.env.APP_URL}/cancel\`,
  });

  return session.url;
}`}
                </CodeBlock>
              </div>

              {/* Sub-section: DINOU_PUBLIC_* */}
              <div id="public-prefix" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Public Client Variables (DINOU_PUBLIC_*)</h3>
                <p>
                  To expose a non-sensitive value (such as an analytics ID, Sentry DSN, Supabase project URL, or Stripe publishable key) directly to <code>&quot;use client&quot;</code> modules without prop-drilling, prefix its name with <code>DINOU_PUBLIC_</code>:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/analytics-banner.tsx
"use client";

export default function AnalyticsBanner() {
  // Inlined at build time across Esbuild, Rollup, and Webpack (both direct & destructured)
  const siteId = process.env.DINOU_PUBLIC_ANALYTICS_ID;
  const { DINOU_PUBLIC_ENABLE_BETA } = process.env;

  if (DINOU_PUBLIC_ENABLE_BETA !== "true") {
    return null; // Dead-code eliminated in production builds
  }

  return <p className="text-xs">Tracking ID: {siteId}</p>;
}`}
                </CodeBlock>
              </div>

              {/* Sub-section: Build-Time Prefix vs Runtime Props */}
              <div id="client-safety" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Build-Time Prefix vs. Runtime Props</h3>
                <p>
                  Dinou supports both ways of delivering public configuration to Client Components—choose the one that matches your deployment workflow:
                </p>
                <ul>
                  <li>
                    <strong>Use <code>DINOU_PUBLIC_*</code></strong> for values known at build time, SDK singletons initialized outside React trees, or standalone static exports (<Link href="/docs/deployment"><code>dinou export-static</code></Link>).
                  </li>
                  <li>
                    <strong>Pass props from a dynamic Server Component</strong> when deploying a single pre-built Docker container image across multiple environments (e.g. staging and production) where values are injected at container startup (<code>dinou start</code>) rather than <code>dinou build</code>:
                  </li>
                </ul>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/checkout/page.tsx (Dynamic Server Component)
import PaymentWidget from "./payment-widget"; // "use client"

export default function CheckoutPage() {
  // Evaluated live on the server at request time (great for Docker runtime config)
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY ?? "";

  return (
    <main className="container max-w-xl mx-auto py-8">
      <h1>Complete Your Order</h1>
      <PaymentWidget publishableKey={publishableKey} />
    </main>
  );
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Defining .env files */}
            <section id="env-files" className="mt-12 scroll-mt-20">
              <h2>Defining .env Files</h2>
              <p>
                Dinou automatically loads <code>.env</code> files from your project root across all bundlers (<code>esbuild</code>, <code>rollup</code>, <code>webpack</code>) and commands (<code>dinou dev</code>, <code>dinou build</code>, <code>dinou start</code>, <code>dinou export-static</code>, and <code>dinou typegen</code>). For most projects, a single <code>.env</code> file is all you need:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# .env
PORT=3000

# Private server-only secrets (NEVER sent to the browser)
DATABASE_URL="postgresql://postgres:password@localhost:5432/my_app_dev"
STRIPE_SECRET_KEY="sk_test_..."

# Public browser-safe variables (inlined into client & SSR bundles)
DINOU_PUBLIC_STRIPE_KEY="pk_test_..."
DINOU_PUBLIC_APP_URL="http://localhost:3000"`}
              </CodeBlock>

              {/* Sub-section: Hierarchy & Hot-Reload */}
              <div id="env-hierarchy" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">.env* Precedence Hierarchy &amp; Live Hot-Reload</h3>
                <p>
                  When separating team defaults from personal machine secrets or testing local development vs. production builds, Dinou resolves variables from highest priority to lowest priority:
                </p>
                <ol>
                  <li>
                    <strong>OS / Shell / Hosting Environment</strong> (e.g. <code>PORT=4000 npx dinou dev</code>, Docker, Railway, Fly.io, Netlify) — <em>always wins; never overwritten by <code>.env*</code> files</em>.
                  </li>
                  <li>
                    <code>.env.development.local</code> (in <code>dinou dev</code>) or <code>.env.production.local</code> (in <code>dinou build</code> / <code>dinou start</code>).
                  </li>
                  <li>
                    <code>.env.local</code> — local machine overrides <em>(skipped when <code>NODE_ENV=test</code> for deterministic tests)</em>.
                  </li>
                  <li>
                    <code>.env.development</code> or <code>.env.production</code> — mode-specific defaults.
                  </li>
                  <li>
                    <code>.env</code> — base project defaults.
                  </li>
                </ol>

                <div className="rounded-xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/10 p-4 not-prose space-y-1.5 my-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-blue-700 dark:text-blue-400">
                    <RefreshCw className="h-4 w-4" />
                    <span>Live Hot-Reload in dinou dev</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    While <code>dinou dev</code> is running, editing any root <code>.env*</code> file automatically reloads server variables in-place, updates TypeScript declarations in <code>.dinou/types/routes.d.ts</code>, and rebuilds client/SSR definitions whenever a <code>DINOU_PUBLIC_*</code> variable changes—no manual server restart required.
                  </p>
                </div>
              </div>

              {/* Sub-section: Built-in Framework Variables */}
              <div id="framework-vars" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Built-In Framework Variables</h3>
                <p>
                  Dinou recognizes the following optional runtime and CLI environment variables out of the box:
                </p>
                <ul>
                  <li><code>PORT</code> — HTTP server port for <code>dinou dev</code> and <code>dinou start*</code> (default: <code>3000</code>).</li>
                  <li><code>HOST</code> — Network interface hostname to bind in production Node, Bun, and Deno servers.</li>
                  <li><code>HMR_PORT</code> — Custom WebSocket HMR port in <code>dinou dev</code> (default: <code>PORT + 1</code>).</li>
                  <li><code>IDLE_TIMEOUT</code> — Keep-alive idle timeout in seconds for the Bun server adapter (default: <code>120</code>).</li>
                  <li><code>DENO_KV_URL</code> / <code>DENO_KV_PATH</code> — Remote Deno Deploy KV endpoint or custom SQLite file path for Deno ISR cache storage.</li>
                  <li><code>DINOU_WRITE_TO_DISK</code> — Set to <code>&quot;true&quot;</code> during <code>dinou dev</code> to mirror in-memory client bundles and manifests to <code>.dinou/public</code> and <code>.dinou/node-dev</code>.</li>
                  <li><code>DINOU_UNVENDORIZED</code> — Set to <code>&quot;true&quot;</code> (equivalent to <code>dinou -u</code>) to resolve dependencies from <code>node_modules</code> instead of Dinou&apos;s pre-compiled vendors.</li>
                </ul>
              </div>

              <Alert className="not-prose mt-4">
                <Lock className="h-4 w-4" />
                <AlertTitle>Git &amp; Secret Hygiene</AlertTitle>
                <AlertDescription className="text-xs space-y-1.5 mt-2">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>
                      <strong>Ignore secret files in Git:</strong> Keep <code>.env.local</code>, <code>.env.*.local</code>, and any <code>.env</code> containing real credentials in <code>.gitignore</code> and <code>.dockerignore</code>.
                    </li>
                    <li>
                      <strong>Commit a <code>.env.example</code>:</strong> Document required variable names with safe placeholder values so teammates get instant TypeScript autocomplete on <code>npx dinou typegen</code>.
                    </li>
                    <li>
                      <strong>Never prefix private keys with <code>DINOU_PUBLIC_</code>:</strong> Anything starting with <code>DINOU_PUBLIC_</code> is intentionally visible in browser DevTools.
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            </section>

            {/* Multi-Platform Runtimes */}
            <section id="platforms-runtimes" className="mt-12 scroll-mt-20">
              <h2>Multi-Platform Runtimes</h2>
              <p>
                Dinou provides a unified environment model across all five server runtimes. Plain-text secrets work via both <code>process.env</code> and <code>getContext().env</code> everywhere on the server:
              </p>

              {/* Sub-section: Node.js & Bun */}
              <div id="node-bun" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Node.js &amp; Bun</h3>
                <p>
                  On Node.js (<code>dinou start</code>) and Bun (<code>dinou start:bun</code>), Dinou loads your <code>.env*</code> hierarchy on startup and exposes variables on both <code>process.env</code> and <code>getContext().env</code>:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`const dbUrl = process.env.DATABASE_URL;
const port = Number(process.env.PORT || 3000);`}
                </CodeBlock>
              </div>

              {/* Sub-section: Cloudflare Workers */}
              <div id="cloudflare" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Cloudflare Workers &amp; Bindings</h3>
                <p>
                  In Cloudflare Workers, configure non-secret variables under <code>[vars]</code> in <code>wrangler.toml</code>, local Worker secrets in <code>.dev.vars</code>, and production secrets via <code>npx wrangler secret put MY_API_SECRET</code>. With <code>compatibility_flags = [&quot;nodejs_compat&quot;]</code>, Dinou automatically bridges text bindings onto <code>process.env</code> and exposes both text secrets and live resource bindings on <code>getContext().env</code>:
                </p>

                <div className="rounded-xl border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/10 p-4 not-prose space-y-2 my-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-amber-700 dark:text-amber-400">
                    <Layers className="h-4 w-4" />
                    <span>Cloudflare Resource Bindings &amp; Local Dev Parity</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Cloudflare <strong>Resource Bindings</strong> (KV namespaces, D1 SQL databases, R2 buckets, Durable Objects) are live JavaScript host objects rather than strings, so they are accessed via <code>getContext().env</code>. Because <code>getContext().env</code> automatically falls back to <code>process.env</code> and <code>Deno.env</code> outside Cloudflare, your server code runs seamlessly in local <code>npx dinou dev</code> and on Cloudflare Edge without conditional checks.
                  </p>
                </div>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/users/[id]/page_functions.ts
import { getContext } from "dinou";
import type { PageFunctions } from "./dinou";

export const getProps: PageFunctions["getProps"] = async (params) => {
  // 1. Plain-text secrets work via process.env OR getContext().env across all runtimes:
  const { env } = getContext();
  const apiSecret = env.MY_API_SECRET;

  // 2. Cloudflare Resource Bindings (KV, D1, R2 live instances):
  const kv = env.MY_KV_NAMESPACE;
  const cachedProfile = kv && params?.id ? await kv.get(\`user:\${params.id}\`, "json") : null;

  return { cachedProfile, hasSecret: Boolean(apiSecret) };
};`}
                </CodeBlock>

                <p className="text-xs text-muted-foreground">
                  To get full TypeScript autocompletion for Cloudflare bindings on <code>getContext().env</code>, augment Dinou&apos;s <code>DinouEnv</code> interface in <code>dinou-env.d.ts</code>:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou-env.d.ts
/// <reference types="dinou/env" />

declare module "dinou" {
  interface DinouEnv {
    MY_KV_NAMESPACE?: KVNamespace;
    DB?: D1Database;
    MY_API_SECRET?: string;
  }
}`}
                </CodeBlock>
              </div>

              {/* Sub-section: Deno */}
              <div id="deno" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Deno (--allow-env &amp; Deno KV)</h3>
                <p>
                  Deno sandboxes environment access behind the <code>--allow-env</code> flag. Dinou&apos;s CLI passes the required permissions automatically when running <code>npx dinou start:deno</code> (or standalone binaries compiled with <code>npx dinou build:deno:compile</code>):
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`# Recommended via Dinou CLI (includes --unstable-kv and --allow-env)
npx dinou start:deno

# Or running the generated Deno orchestrator directly
deno run --unstable-kv --allow-net --allow-read --allow-write --allow-env --allow-sys .dinou/deno/main.js`}
                </CodeBlock>
                <p className="mt-2 text-xs text-muted-foreground">
                  Dinou loads your <code>.env*</code> hierarchy into both <code>Deno.env</code> and <code>process.env</code>, so <code>process.env.KEY</code>, <code>Deno.env.get(&quot;KEY&quot;)</code>, and <code>getContext().env.KEY</code> all behave identically.
                </p>
              </div>

              {/* Sub-section: Netlify */}
              <div id="netlify" className="mt-8 space-y-3 scroll-mt-20">
                <h3 className="text-lg font-bold">Netlify (Functions v2)</h3>
                <p>
                  On Netlify, configure environment variables in the Netlify Dashboard, <code>netlify.toml</code>, or via <code>netlify env:set MY_API_SECRET &quot;...&quot;</code>. Dinou&apos;s Functions v2 bundle automatically merges <code>process.env</code> with <code>Netlify.env.toObject()</code> on every request, making both build-time <code>DINOU_PUBLIC_*</code> constants and runtime secrets available via <code>process.env</code> and <code>getContext().env</code>.
                </p>
              </div>
            </section>

            {/* Typed Validation (Zod) */}
            <section id="typed-validation" className="mt-12 scroll-mt-20">
              <h2>TypeScript &amp; Zod Validation</h2>
              <p>
                Dinou&apos;s type generator (<code>dinou dev</code>, <code>dinou build</code>, and <Link href="/docs/type-safe-routing"><code>dinou typegen</code></Link>) automatically scans variable names in your root <code>.env*</code> and <code>.env.example</code> files and augments <code>NodeJS.ProcessEnv</code> inside <code>.dinou/types/routes.d.ts</code>—giving you instant IDE autocomplete on <code>process.env.*</code> without ever writing secret values to disk.
              </p>
              <p>
                To also guarantee at runtime that required variables are present and well-formed when your server boots, validate <code>getContext().env</code> (or <code>process.env</code>) with a schema library such as <strong>Zod</strong>:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/lib/env.ts (import ONLY in Server Components, page_functions, or Server Functions)
import { z } from "zod";
import { getContext } from "dinou";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid connection string"),
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  DINOU_PUBLIC_STRIPE_KEY: z.string().min(1, "DINOU_PUBLIC_STRIPE_KEY is required"),
});

export function getServerEnv() {
  const parsed = envSchema.safeParse(getContext().env);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid server environment configuration.");
  }
  return parsed.data;
}`}
              </CodeBlock>
            </section>

            {/* Security Shield & Bot Protection */}
            <section id="security-shield" className="mt-12 scroll-mt-20">
              <h2>Anti-Leak Security &amp; Bot Shield</h2>
              <p>
                Automated vulnerability scanners routinely probe web servers for exposed environment files using direct, nested, and percent-encoded paths:
              </p>
              <CodeBlock
                language="text"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`GET /.env
GET /.env.production
GET /api/.env.local
GET /%2eenv`}
              </CodeBlock>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-3 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Multi-Layer Defense in Depth</span>
                </div>
                <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>
                    <strong>HTTP Anti-Bot Shield:</strong> Dinou&apos;s request handler inspects both raw and URL-decoded request paths and immediately terminates probes targeting <code>.env</code>, <code>.env.*</code>, <code>.git</code>, <code>.sql</code>, and <code>.bak</code> with <code>404 Not Found</code> before plugins, dynamic routes, or ISG caching can run.
                  </li>
                  <li>
                    <strong>Static Dotfile Confinement:</strong> Dinou&apos;s static asset resolver blocks all hidden dotfile requests (except RFC 8615 <code>/.well-known/*</code>).
                  </li>
                  <li>
                    <strong>Physical Build Exclusion:</strong> Even if a <code>.env</code> or <code>.env.*</code> file is accidentally placed inside <code>public/</code>, Dinou&apos;s Esbuild, Rollup, Webpack, Cloudflare, and <code>export-static</code> pipelines refuse to copy it into <code>.dinou/dist3</code>, <code>.dinou/cloudflare/assets</code>, or <code>out/</code>.
                  </li>
                </ul>
              </div>

              <div className="space-y-2 mt-4 text-sm">
                <p className="font-semibold text-foreground">Production Deployment Checklist:</p>
                <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                  <li>Verify <code>.env</code>, <code>.env.local</code>, and <code>.env.*.local</code> are listed in <code>.gitignore</code> and <code>.dockerignore</code>.</li>
                  <li>Inject production secrets via your host&apos;s secret manager (e.g. <code>wrangler secret put</code>, <code>netlify env:set</code>, <code>fly secrets set</code>, <code>railway variables set</code>).</li>
                  <li>Use <code>DINOU_PUBLIC_*</code> strictly for public browser configuration—never for private credentials.</li>
                  <li>Validate required server secrets with a schema validator such as Zod.</li>
                </ul>
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
