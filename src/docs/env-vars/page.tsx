"use client";

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
  Lock,
  Globe,
  Cpu,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Layers,
  Zap,
  Cloud,
  Server,
  Key,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "overview", title: "Environment Variables in Dinou", level: 2 },
  { id: "server-security-model", title: "The Server-Only Security Model", level: 2 },
  { id: "where-they-work", title: "Where Environment Variables Work", level: 3 },
  { id: "client-safety", title: "Safe Propagation to Client Components", level: 3 },
  { id: "env-files", title: "Defining .env Files", level: 2 },
  { id: "platforms-runtimes", title: "Multi-Platform Runtimes", level: 2 },
  { id: "node-bun", title: "Node.js & Bun (process.env)", level: 3 },
  { id: "cloudflare", title: "Cloudflare Workers (process.env & Bindings)", level: 3 },
  { id: "deno", title: "Deno (process.env & --allow-env)", level: 3 },
  { id: "typed-validation", title: "Type-Safe Environment Validation (Zod)", level: 2 },
  { id: "security-shield", title: "Anti-Leak Security & Bot Shield", level: 2 },
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
                Environment Variables &amp; Secrets
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage database credentials, API tokens, and runtime bindings securely with Dinou&apos;s server-only isolation model across Node.js, Bun, Deno, and Cloudflare Workers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Environment Variables in Dinou</h2>
              <p>
                Dinou isolates all environment variables strictly to the server runtime. Values are never automatically bundled, replaced, or inlined into client-side JavaScript chunks, ensuring secrets like database passwords or private API keys remain 100% on the server.
              </p>

              <div className="grid gap-4 sm:grid-cols-3 not-prose my-6">
                <Card className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Zero Client Inlining</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Bundlers never inject <code>process.env</code> into client chunks. Secrets never reach the browser.
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <Cloud className="h-4 w-4" />
                      <span>Multi-Runtime Ready</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Use <code>process.env</code> across Node, Bun, and Deno, and <code>getContext().env</code> for Cloudflare Workers bindings.
                  </CardContent>
                </Card>

                <Card className="border-slate-500/20 bg-slate-50/50 dark:bg-slate-900/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                      <Lock className="h-4 w-4 text-emerald-500" />
                      <span>Bot Shield Protected</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Dinou&apos;s core HTTP scanner defense immediately rejects external requests targeting <code>.env</code> files.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Server-Only Security Model */}
            <section id="server-security-model" className="mt-12">
              <h2>The Server-Only Security Model</h2>
              <p>
                In Dinou, <strong>Client Components cannot access <code>process.env</code> directly</strong>. If a client component needs a configuration value (such as a public analytics ID or Stripe publishable key), pass it explicitly as a prop from a Server Component.
              </p>

              {/* Sub-section: Where They Work */}
              <div id="where-they-work" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Where Environment Variables Work</h3>
                <p>
                  You can safely access environment variables in any server-side execution context:
                </p>
                <div className="grid gap-3 sm:grid-cols-2 not-prose my-4">
                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <Server className="h-4 w-4 text-emerald-500" />
                      <span>Server Components (RSC)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Read database URLs or CMS tokens while rendering initial HTML on the server.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>Server Functions (&quot;use server&quot;)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Access private payment APIs, database pools, and hashing secrets in RPC mutations.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <FileText className="h-4 w-4 text-emerald-500" />
                      <span>Page Functions (getProps)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Fetch data before page execution in <code>page_functions.ts</code> using backend keys.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border bg-card space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                      <Terminal className="h-4 w-4 text-amber-500" />
                      <span>Plugins &amp; Server Config</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Read environment variables (such as <code>PORT</code> or service keys) in <code>dinou.config.mjs</code> and plugins.
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

// Securely read secret key inside Server Function
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

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

              {/* Sub-section: Client Safety */}
              <div id="client-safety" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Safe Propagation to Client Components</h3>
                <p>
                  When a Client Component requires a public configuration value (such as a public client ID or feature flag), pass it down through props from an enclosing Server Component:
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/page.tsx (Server Component)
import PaymentWidget from "./components/payment-widget"; // Client Component

export default function CheckoutPage() {
  // Explicitly extract ONLY the safe public key to send to the browser
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  return (
    <main className="container max-w-xl mx-auto py-8">
      <h1>Complete Your Order</h1>
      <PaymentWidget publishableKey={publishableKey} />
    </main>
  );
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  By making data transfer across the server-client boundary explicit, code reviews immediately flag any sensitive secrets inadvertently sent to the client.
                </p>
              </div>
            </section>

            {/* Defining .env files */}
            <section id="env-files" className="mt-12">
              <h2>Defining .env Files</h2>
              <p>
                In local development, Dinou loads variables from your project root <code>.env</code> file:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# .env (Local development template)
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/my_app_dev"

# Third-party credentials
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
GITHUB_CLIENT_ID="Iv1..."
GITHUB_CLIENT_SECRET="ghs_..."

# Application URLs
APP_URL="http://localhost:3000"`}
              </CodeBlock>

              <Alert className="not-prose mt-4">
                <Lock className="h-4 w-4" />
                <AlertTitle>Security Best Practices</AlertTitle>
                <AlertDescription className="text-xs space-y-1.5 mt-2">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>
                      <strong>Never commit .env to git:</strong> Always ensure <code>.env</code> and <code>.env.*</code> are in your <code>.gitignore</code> file (except <code>.env.example</code>).
                    </li>
                    <li>
                      <strong>Commit a .env.example:</strong> Maintain a clean <code>.env.example</code> containing required variable names with placeholder values to onboard new team members.
                    </li>
                    <li>
                      <strong>Production Environments:</strong> In production (Fly.io, Railway, AWS, Docker), inject secrets via the host provider&apos;s native environment configuration dashboard rather than shipping a file.
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            </section>

            {/* Multi-Platform Runtimes */}
            <section id="platforms-runtimes" className="mt-12">
              <h2>Multi-Platform Runtimes</h2>
              <p>
                Dinou is runtime-agnostic. For standard environment variables and secrets (like <code>DATABASE_URL</code> or <code>API_SECRET</code>), you can write <code>process.env</code> uniformly across all deployment targets:
              </p>

              {/* Sub-section: Node.js & Bun */}
              <div id="node-bun" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Node.js &amp; Bun (process.env)</h3>
                <p>
                  In Node.js and Bun server adapters, environment variables reside natively on the global <code>process.env</code> object:
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`const dbUrl = process.env.DATABASE_URL;
const port = Number(process.env.PORT || 3000);`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Bun also provides <code>Bun.env</code> as an alias, but <code>process.env</code> is fully supported across both runtimes.
                </p>
              </div>

              {/* Sub-section: Cloudflare Workers */}
              <div id="cloudflare" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Cloudflare Workers (process.env &amp; Bindings)</h3>
                <p>
                  In Cloudflare Workers, standard text secrets and environment variables configured in <code>wrangler.toml</code> or the Cloudflare dashboard are available via <code>process.env</code> (when <code>compatibility_flags = [&quot;nodejs_compat&quot;]</code> is enabled) or via <code>getContext().env</code>:
                </p>

                <div className="rounded-xl border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/10 p-4 not-prose space-y-2 my-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-amber-700 dark:text-amber-400">
                    <Layers className="h-4 w-4" />
                    <span>Cloudflare Resource Bindings vs. Environment Variables</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By definition, <code>.env</code> files and <code>process.env</code> only store plain text strings. However, Cloudflare also provides <strong>Resource Bindings</strong> (live JavaScript instances with async methods for KV, D1 SQL databases, and R2 buckets) through its runtime <code>env</code> object. In Dinou, you can access both text secrets and live resource bindings uniformly anywhere on the server via <code>getContext().env</code>.
                  </p>
                </div>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`import { getContext } from "dinou";

// Inside page_functions.ts (getProps), Server Components, or Server Functions:
export async function getProps(params) {
  // 1. Text secrets (work via process.env or getContext().env):
  const apiSecret = process.env.MY_API_SECRET;

  // 2. Cloudflare Resource Bindings (KV, D1, R2 live objects):
  const { env } = getContext();
  const kv = env?.MY_KV_NAMESPACE;
  const user = kv ? await kv.get("user:123") : null;

  return { user };
}`}
                </CodeBlock>

                <p className="text-xs text-muted-foreground">
                  Inside Server Functions (<code>&quot;use server&quot;</code>), call <code>getContext()</code> directly to access D1 databases (<code>env.DB</code>) or KV namespaces for database queries and mutations.
                </p>
              </div>

              {/* Sub-section: Deno */}
              <div id="deno" className="mt-8 space-y-3">
                <h3 className="text-lg font-bold">Deno (process.env &amp; --allow-env)</h3>
                <p>
                  In Deno, environment variable access is protected by Deno&apos;s security sandbox. When launching Dinou on Deno, enable the <code>--allow-env</code> permission flag:
                </p>
                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`deno run --allow-net --allow-read --allow-write --allow-env dinou/adapters/deno.js`}
                </CodeBlock>
                <p className="mt-2 text-xs text-muted-foreground">
                  With <code>--allow-env</code> active, Deno&apos;s native Node compatibility allows you to read variables via <code>process.env.KEY</code> uniformly, or via <code>Deno.env.get(&quot;KEY&quot;)</code>.
                </p>
              </div>
            </section>

            {/* Typed Validation (Zod) */}
            <section id="typed-validation" className="mt-12">
              <h2>Type-Safe Environment Validation (Zod)</h2>
              <p>
                Missing environment variables in production are notorious for causing silent failures or runtime crashes. We recommend validating your environment variables at application startup using a lightweight schema validator such as <strong>Zod</strong>:
              </p>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid connection string"),
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1, "STRIPE_PUBLISHABLE_KEY is required"),
});

// Parse and validate process.env
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  throw new Error("Invalid configuration. Check terminal output for details.");
}

export const env = parsed.data;`}
              </CodeBlock>

              <p className="mt-4 text-sm">
                Now you can import the validated <code>env</code> object in your Server Components and Server Functions with full TypeScript autocompletion and compile-time type safety:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// Full TypeScript autocomplete and guaranteed presence:
import { env } from "@/lib/env";

const db = connectToDatabase(env.DATABASE_URL);`}
              </CodeBlock>
            </section>

            {/* Security Shield & Bot Protection */}
            <section id="security-shield" className="mt-12">
              <h2>Anti-Leak Security &amp; Bot Shield</h2>
              <p>
                Malicious web crawlers and vulnerability scanners frequently search for exposed <code>.env</code> files on web servers by issuing requests like:
              </p>
              <CodeBlock
                language="text"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`GET /.env
GET /api/.env
GET /public/.env`}
              </CodeBlock>

              <div className="rounded-xl border p-4 bg-card not-prose space-y-3 my-4">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Dinou Core Scanner Defense</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dinou includes a built-in <strong>Anti-Bot Shield</strong> in <code>dinou/core/handler.js</code>. The framework automatically matches incoming request paths against common bot attack patterns (including <code>/\.env$/i</code>, <code>/\.git\b/i</code>, <code>/\.sql$/i</code>, etc.) and immediately terminates them before any static file resolver or server route can be triggered.
                </p>
              </div>

              <div className="space-y-2 mt-4 text-sm">
                <p className="font-semibold text-foreground">Production Deployment Checklist:</p>
                <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                  <li>Verify <code>.env</code> is listed in <code>.gitignore</code> and <code>.dockerignore</code>.</li>
                  <li>Configure platform secrets via your host&apos;s dashboard or CLI (e.g. <code>railway variables set</code>, <code>fly secrets set</code>, <code>wrangler secret put</code>).</li>
                  <li>Ensure sensitive API credentials are only referenced inside Server Components or Server Functions.</li>
                  <li>Use schema validation (like Zod) to catch missing variables immediately on server boot.</li>
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
