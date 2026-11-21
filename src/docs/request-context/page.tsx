import { Link } from "dinou";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Badge } from "@/docs/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  ArrowLeftRight,
  Cloud,
  Sparkles,
  Server,
  Layers,
  Lock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const tocItems = [
  { id: "overview", title: "1. Overview & AsyncLocalStorage", level: 2 },
  { id: "where-it-works", title: "1.1 Where getContext() Works", level: 3 },
  { id: "store-shape", title: "2. The RequestContextStore Shape", level: 2 },
  { id: "reading-request", title: "3. Reading Request Data (req)", level: 2 },
  { id: "mutating-response", title: "4. Mutating Responses (res)", level: 2 },
  { id: "ssg-ppr-bailout", title: "5. SSG, PPR & Static Bailout Rules", level: 2 },
  { id: "env-plugins-augmentation", title: "6. Unified env, ctx & Plugin State", level: 2 },
  { id: "ts-augmentation", title: "6.1 TypeScript Augmentation (dinou-env.d.ts)", level: 3 },
  { id: "server-only-boundary", title: "7. Server-Only Boundary & Client Props", level: 2 },
];

export default function RequestContextPage() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Request Context (getContext) | Dinou Docs</title>
      <meta
        name="description"
        content="Access cookies, HTTP headers, normalized paths, query parameters, outgoing response cookies/headers/status, unified multi-runtime env bindings, and plugin state synchronously anywhere on the server with getContext()."
      />
      <link rel="canonical" href="https://dinou.dev/docs/request-context" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Server Runtime
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Request Context (<code>getContext</code>)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Read incoming cookies, HTTP headers, normalized paths, and multi-runtime environment bindings—or set response cookies, headers, status codes, and redirects—synchronously anywhere in your server tree without prop drilling.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; <code>AsyncLocalStorage</code>
              </h2>
              <p>
                In Dinou, every incoming HTTP request, RSC payload fetch, and Server Function call runs inside an isolated <strong><code>AsyncLocalStorage</code></strong> scope. Calling <code>getContext()</code> (exported identically from <code>&quot;dinou&quot;</code>, <code>&quot;dinou/server&quot;</code>, and route-contextual <code>&quot;./dinou&quot;</code>) synchronously retrieves the active <code>RequestContextStore</code> for the current execution without passing <code>req</code> or <code>res</code> down through component props.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/10 dark:bg-blue-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                      <ArrowLeftRight className="h-4 w-4 shrink-0" />
                      <span>Zero Prop Drilling</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Read cookies, headers, and plugin auth state from deeply nested Server Components, data loaders, and Server Functions with a single synchronous call.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                      <Cloud className="h-4 w-4 shrink-0" />
                      <span>5-Runtime Parity</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Works identically across Node.js, Bun, Deno, Cloudflare Workers (<code>workerd</code>), and Netlify Functions v2—including live KV/D1/R2 bindings via <code>env</code>.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/10 dark:bg-purple-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 text-sm">
                      <Layers className="h-4 w-4 shrink-0" />
                      <span>Stream-Safe Isolation</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Context remains strictly isolated across concurrent requests, deferred <code>&lt;Suspense&gt;</code> streams, PPR dynamic holes, and Server Components returned by Server Functions.
                  </CardContent>
                </Card>
              </div>

              <div id="where-it-works" className="space-y-3 mt-6 scroll-mt-20">
                <h3 className="text-lg font-bold">1.1 Where <code>getContext()</code> Works</h3>
                <ul className="list-disc pl-6 space-y-1.5 text-sm">
                  <li>
                    <strong>Server Components</strong> (<code>page.tsx</code>, <code>layout.tsx</code>, <code>@slot/page.tsx</code>, nested async RSCs, and <code>&lt;Suspense&gt;</code> holes).
                  </li>
                  <li>
                    <strong>Route Lifecycle Files</strong> (<code>getProps</code>, <code>validateParams</code>, <code>getCacheTags</code>, <code>getStaticPaths</code> in <code>page_functions.ts</code> and <code>layout_functions.ts</code>).
                  </li>
                  <li>
                    <strong>Server Functions</strong> (<code>&quot;use server&quot;</code> module-level and inline actions—including streamed JSX returned from an action).
                  </li>
                  <li>
                    <strong>Web Standards Plugins</strong> (<code>onRequest(request, context)</code> in <code>dinou.config.ts</code> receives the same store as its second argument and also runs inside <code>AsyncLocalStorage</code>).
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. Store Shape */}
            <section id="store-shape" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. The <code>RequestContextStore</code> Shape
              </h2>
              <p>
                <code>getContext()</code> always returns a non-nullable <code>RequestContextStore</code> on the server (falling back to a safe server context with <code>env</code> populated if called outside an active HTTP request, such as in unit tests or build scripts):
              </p>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden not-prose my-6 shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="min-w-[640px]">
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/60">
                      <TableRow>
                        <TableHead className="w-[24%] font-semibold text-xs">Property</TableHead>
                        <TableHead className="w-[26%] font-semibold text-xs">Type</TableHead>
                        <TableHead className="w-[50%] font-semibold text-xs">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.cookies</td>
                        <td className="p-3 font-mono text-muted-foreground">Record&lt;string, string&gt;</td>
                        <td className="p-3 text-muted-foreground">Parsed incoming HTTP cookies for the current request.</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.headers</td>
                        <td className="p-3 font-mono text-muted-foreground">IncomingHttpHeaders</td>
                        <td className="p-3 text-muted-foreground">Lowercased incoming HTTP headers (e.g. <code>authorization</code>, <code>accept-language</code>, <code>x-dinou-current-path</code>).</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.query</td>
                        <td className="p-3 font-mono text-muted-foreground">Record&lt;string, string | string[] | undefined&gt;</td>
                        <td className="p-3 text-muted-foreground">Parsed URL query parameters (preserves multi-value arrays like <code>?tag=a&amp;tag=b</code> and empty values like <code>?flag=</code>).</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.path</td>
                        <td className="p-3 font-mono text-muted-foreground">string</td>
                        <td className="p-3 text-muted-foreground">Normalized logical route pathname (e.g. <code>&quot;/dashboard&quot;</code> even during internal <code>/____rsc_page____/dashboard</code> SPA fetches).</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.rawPath</td>
                        <td className="p-3 font-mono text-muted-foreground">string | undefined</td>
                        <td className="p-3 text-muted-foreground">Raw wire HTTP pathname before RSC prefix normalization (e.g. <code>&quot;/____rsc_page____/dashboard&quot;</code>).</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.isRscRequest</td>
                        <td className="p-3 font-mono text-muted-foreground">boolean | undefined</td>
                        <td className="p-3 text-muted-foreground"><code>true</code> when serving an internal React Server Components wire fetch (<code>/____rsc_*</code>).</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.method</td>
                        <td className="p-3 font-mono text-muted-foreground">&quot;GET&quot; | &quot;POST&quot; | string</td>
                        <td className="p-3 text-muted-foreground">HTTP verb of the incoming request.</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">res</td>
                        <td className="p-3 font-mono text-muted-foreground">ResponseProxy</td>
                        <td className="p-3 text-muted-foreground">Methods to mutate the outgoing HTTP response: <code>cookie()</code>, <code>clearCookie()</code>, <code>setHeader()</code>, <code>status()</code>, <code>redirect()</code>.</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">env</td>
                        <td className="p-3 font-mono text-muted-foreground">DinouEnv</td>
                        <td className="p-3 text-muted-foreground">Zero-copy unified proxy across Cloudflare bindings (KV, D1, R2), <code>Netlify.env</code>, <code>process.env</code>, and <code>Deno.env</code>.</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">ctx</td>
                        <td className="p-3 font-mono text-muted-foreground">any</td>
                        <td className="p-3 text-muted-foreground">Platform execution context (e.g. Cloudflare/Netlify <code>ctx.waitUntil(promise)</code>).</td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">[customKey]</td>
                        <td className="p-3 font-mono text-muted-foreground">any</td>
                        <td className="p-3 text-muted-foreground">Arbitrary request-scoped properties attached by <code>plugin.onRequest</code> (e.g. <code>userId</code>, <code>locale</code>, <code>tenant</code>).</td>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>

            {/* 3. Reading Request Data */}
            <section id="reading-request" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Reading Request Data (<code>req</code>)
              </h2>
              <p>
                Access cookies, HTTP headers, or request metadata directly inside any Server Component or <code>page_functions.ts</code> loader:
              </p>

              <div className="not-prose my-4">
                <TabbedCodeBlock
                  defaultTab="rsc"
                  tabs={[
                    {
                      id: "rsc",
                      label: "Server Component (page.tsx)",
                      language: "tsx",
                      code: `// src/account/page.tsx
import { getContext, redirect } from "dinou";
import { verifySession } from "@/lib/auth";

export default async function AccountPage() {
  const { req } = getContext();
  const token = req.cookies.session_id;
  const userAgent = req.headers["user-agent"] ?? "unknown";

  if (!token) {
    return redirect("/login");
  }

  const user = await verifySession(token);
  if (!user) {
    return redirect("/login");
  }

  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <p>Active route: {req.path}</p>
      <p>Client: {userAgent}</p>
    </main>
  );
}`,
                    },
                    {
                      id: "page-functions",
                      label: "page_functions.ts (Client-First)",
                      language: "typescript",
                      code: `// src/account/page_functions.ts
import { getContext, redirect } from "dinou";
import { verifySession } from "@/lib/auth";

export const revalidate = 0;

export async function getProps() {
  const { req } = getContext();
  const user = await verifySession(req.cookies.session_id);

  if (!user) {
    return redirect("/login");
  }

  return { user };
}`,
                    },
                  ]}
                />
              </div>

              <div className="not-prose my-4">
                <Alert>
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <AlertTitle>Tip: Prefer Universal Hooks for Path &amp; Query Strings</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    When you only need the current pathname or URL query parameters inside UI components, prefer <Link href="/docs/navigation#url-hooks" className="text-blue-500 hover:underline font-medium"><code>usePathname()</code> and <code>useSearchParams()</code></Link> — they work identically in both Server Components and Client Components and automatically re-render on client-side SPA transitions. Use <code>getContext().req</code> when you need cookies, HTTP headers, HTTP method, or server-only metadata.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* 4. Mutating Responses */}
            <section id="mutating-response" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Mutating HTTP Responses (<code>res</code>)
              </h2>
              <p>
                <code>getContext().res</code> exposes a portable <code>ResponseProxy</code> that translates cleanly into native HTTP headers and <code>Set-Cookie</code> directives across Node.js, Bun, Deno, Cloudflare Workers, and Netlify:
              </p>

              <div className="not-prose my-4">
                <TabbedCodeBlock
                  defaultTab="action"
                  tabs={[
                    {
                      id: "action",
                      label: "Server Function (Cookies)",
                      language: "typescript",
                      code: `// src/actions/auth.ts
"use server";

import { getContext } from "dinou";

export async function signIn(email: string, password: string) {
  const { res, env } = getContext();
  const token = await createSignedSession(email, password, env.AUTH_SECRET);

  res.cookie("session_id", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days (in seconds)
  });

  return { ok: true };
}

export async function signOut() {
  const { res } = getContext();
  res.clearCookie("session_id", { path: "/" });
}`,
                    },
                    {
                      id: "headers-status",
                      label: "Custom Headers & Status",
                      language: "tsx",
                      code: `// src/articles/[slug]/page.tsx
import { getContext } from "dinou";
import type { PageProps } from "./dinou";

export default async function ArticlePage({ params }: PageProps) {
  const { res } = getContext();
  const article = await fetchArticle(params.slug);

  if (article?.archived) {
    res.status(410); // HTTP 410 Gone
    return <main><h1>This article has been archived.</h1></main>;
  }

  // Override outgoing CDN cache headers before streaming starts
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
  return <article>{article?.body}</article>;
}`,
                    },
                  ]}
                />
              </div>

              <div className="not-prose my-4">
                <Alert className="border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-700 dark:text-amber-300 font-semibold text-xs">
                    Streaming Timing &amp; Redirection
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Mutations on <code>res</code> (<code>status</code>, <code>setHeader</code>, <code>cookie</code>) must execute <strong>before</strong> HTTP headers are flushed (i.e., outside deferred <code>&lt;Suspense&gt;</code> streaming holes or inside <code>onRequest</code> / Server Functions). For page redirects in Server Components or <code>getProps()</code>, prefer <Link href="/docs/navigation#universal-redirect" className="text-blue-500 hover:underline font-medium"><code>return redirect(&quot;/login&quot;)</code></Link>, which handles HTTP 302, SPA <code>x-rsc-redirect</code>, and post-stream <code>&lt;ClientRedirect /&gt;</code> fallbacks automatically.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* 5. SSG, PPR & Static Bailout */}
            <section id="ssg-ppr-bailout" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. SSG, PPR &amp; Automatic Static Bailout Rules
              </h2>
              <p>
                Because Dinou is <strong>Static by Default</strong>, it wraps request-specific fields in an internal <code>BailoutProxy</code> during build-time SSG and on-demand ISG/PPR builds. Knowing which properties trigger dynamic execution lets you keep static shells fast without accidental de-optimizations:
              </p>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden not-prose my-6 shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="min-w-[640px]">
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/60">
                      <TableRow>
                        <TableHead className="w-[26%] font-semibold text-xs">Context Access</TableHead>
                        <TableHead className="w-[37%] font-semibold text-xs">Standard Route (<code>ppr = false</code>)</TableHead>
                        <TableHead className="w-[37%] font-semibold text-xs">PPR Route (<code>ppr = true</code>)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">req.cookies<br />req.headers<br />req.query</td>
                        <td className="p-3 text-muted-foreground">
                          <span className="font-semibold text-amber-600 dark:text-amber-400">Triggers Automatic Static Bailout</span> &rarr; route switches to Dynamic SSR.
                        </td>
                        <td className="p-3 text-muted-foreground">
                          Inside <code>&lt;Suspense&gt;</code>: registers a <strong>Dynamic PPR Hole</strong> (static shell stays cached). Outside <code>&lt;Suspense&gt;</code>: full-route bailout.
                        </td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">env<br />req.path</td>
                        <td className="p-3 text-muted-foreground">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% SSG-Safe</span> &rarr; does <strong>not</strong> trigger dynamic bailout.
                        </td>
                        <td className="p-3 text-muted-foreground">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Shell-Safe</span> &rarr; baked into <code>shell.html</code> at build time.
                        </td>
                      </TableRow>
                      <TableRow>
                        <td className="p-3 font-mono font-semibold text-foreground">Custom plugin fields<br />(e.g. <code>ctx.userId</code>)</td>
                        <td className="p-3 text-muted-foreground">
                          <code>plugin.onRequest</code> is <strong>skipped during build-time SSG</strong> (<code>undefined</code> at build time, populated on every runtime HTTP request).
                        </td>
                        <td className="p-3 text-muted-foreground">
                          Populated at request time inside dynamic PPR holes; always guard or provide a fallback if read in the static shell.
                        </td>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                See <Link href="/docs/rendering" className="text-blue-500 hover:underline font-medium">Static &amp; Dynamic Rendering</Link> and <Link href="/docs/3d-segmentation" className="text-blue-500 hover:underline font-medium">3D Layered Segmentation</Link> for full PPR and <code>noDynamic()</code> details.
              </p>
            </section>

            {/* 6. Unified env, ctx & Plugin State */}
            <section id="env-plugins-augmentation" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Unified <code>env</code>, <code>ctx</code> &amp; Custom Plugin State
              </h2>
              <p>
                <code>getContext().env</code> is a live zero-copy <code>Proxy</code> unifying Cloudflare Workers bindings (KV, D1, R2, secrets), <code>Netlify.env</code>, <code>process.env</code> (including <code>.env*</code> hot-reload in <code>dinou dev</code>), and <code>Deno.env.get()</code>. Meanwhile, any property assigned in a plugin&apos;s <Link href="/docs/plugins#on-request-lifecycle" className="text-blue-500 hover:underline font-medium"><code>onRequest(request, context)</code></Link> hook flows automatically to Server Components, <code>page_functions.ts</code>, and Server Functions:
              </p>

              <div className="not-prose my-4">
                <TabbedCodeBlock
                  defaultTab="plugin"
                  tabs={[
                    {
                      id: "plugin",
                      label: "1. Attach in Plugin (onRequest)",
                      language: "typescript",
                      code: `// src/plugins/tenant.ts
import type { DinouPlugin } from "dinou";

export function tenantPlugin(): DinouPlugin {
  return {
    name: "tenant-resolver",
    async onRequest(request, context) {
      const host = request.headers.get("host") ?? "localhost";
      context.tenantId = host.split(".")[0];

      // Schedule non-blocking background telemetry on Cloudflare / Netlify
      context.ctx?.waitUntil?.(
        logEdgeHit(context.req.path, context.env.ANALYTICS_TOKEN)
      );
    },
  };
}`,
                    },
                    {
                      id: "consume",
                      label: "2. Consume via getContext()",
                      language: "tsx",
                      code: `// src/dashboard/page.tsx
import { getContext } from "dinou";

export default async function DashboardPage() {
  const { tenantId, env } = getContext();

  // Works across Node/Bun/Deno/Netlify (.env) AND Cloudflare Workers (KV/D1/secrets)
  const cachedSummary = env.TENANT_KV
    ? await env.TENANT_KV.get(\`summary:\${tenantId}\`)
    : null;

  return (
    <main>
      <h1>Tenant: {tenantId}</h1>
      <p>{cachedSummary ?? "Live summary"}</p>
    </main>
  );
}`,
                    },
                  ]}
                />
              </div>

              <div id="ts-augmentation" className="space-y-3 mt-8 scroll-mt-20">
                <h3 className="text-lg font-bold">6.1 TypeScript Module Augmentation (<code>dinou-env.d.ts</code>)</h3>
                <p>
                  To get strict autocomplete and type checking for your Cloudflare bindings and custom plugin properties on <code>getContext()</code>, augment <code>DinouEnv</code> and <code>RequestContextStore</code> in your root <code>dinou-env.d.ts</code>:
                </p>
                <div className="not-prose my-4">
                  <CodeBlock language="typescript">{`// dinou-env.d.ts
/// <reference types="dinou/env" />

declare module "dinou" {
  interface DinouEnv {
    AUTH_SECRET: string;
    ANALYTICS_TOKEN?: string;
    TENANT_KV?: KVNamespace;
  }

  interface RequestContextStore {
    tenantId?: string;
    userId?: string | null;
  }
}`}</CodeBlock>
                </div>
              </div>
            </section>

            {/* 7. Server-Only Boundary */}
            <section id="server-only-boundary" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Server-Only Boundary &amp; Passing Data to Client Components
              </h2>
              <p>
                <code>getContext()</code> is strictly <strong>server-only</strong>. If invoked inside a <code>&quot;use client&quot;</code> component running in the browser, Dinou logs a console error and returns a safe empty fallback (<code>env: &#123;&#125;</code>, empty <code>cookies</code>/<code>headers</code>, no-op <code>res</code>).
              </p>

              <div className="not-prose my-4">
                <Alert className="border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle className="text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
                    How to Pass Server Context Values to Client Components Safely
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Read only the non-sensitive fields you need in a parent Server Component (or <code>getProps()</code> in <code>page_functions.ts</code>) using <code>getContext()</code>, and pass them explicitly as serializable props into your <code>&quot;use client&quot;</code> component. Never forward the entire <code>env</code> object or secret tokens to the browser. For build-time public client constants, use <Link href="/docs/env-vars#public-prefix" className="text-blue-500 hover:underline font-medium"><code>process.env.DINOU_PUBLIC_*</code></Link>.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <Server className="h-4 w-4 text-blue-500" />
                    <span>Related Guides</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                    <li><Link href="/docs/api-reference#getcontext" className="text-blue-500 hover:underline">API Reference: <code>getContext()</code></Link></li>
                    <li><Link href="/docs/server-functions#request-context" className="text-blue-500 hover:underline">Server Functions &amp; Cookies</Link></li>
                    <li><Link href="/docs/plugins#on-request-lifecycle" className="text-blue-500 hover:underline">Plugins: <code>onRequest(request, context)</code></Link></li>
                    <li><Link href="/docs/env-vars" className="text-blue-500 hover:underline">Environment Variables &amp; Bindings</Link></li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-xs text-foreground">
                    <Lock className="h-4 w-4 text-emerald-500" />
                    <span>Security Checklist</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                    <li>Always set <code>httpOnly: true</code> and <code>sameSite: &quot;lax&quot;</code> on session cookies.</li>
                    <li>Verify JWT cookies cryptographically (never trust raw Base64 cookie claims).</li>
                    <li>Never pass <code>getContext().env</code> directly to a <code>&quot;use client&quot;</code> prop.</li>
                    <li>Keep <code>getContext()</code> calls inside Server Components, loaders, plugins, or Server Functions.</li>
                  </ul>
                </div>
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
