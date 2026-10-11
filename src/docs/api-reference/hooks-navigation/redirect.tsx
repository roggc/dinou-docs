"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Server,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Layers,
  Code2,
  Globe,
  ArrowRightLeft,
} from "lucide-react";

export function RedirectSection() {
  return (
    <section id="redirect" className="scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>redirect()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Universal Primitive
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Returns: &lt;ClientRedirect /&gt;
        </span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Dinou&apos;s universal, polymorphic redirection primitive. It safely interrupts the current execution pipeline and redirects the browser or crawler to the destination path. Rather than relying on rigid browser-only APIs or uncatchable exceptions, <code>redirect()</code> automatically adapts its underlying transport mechanism to the active runtime context (Initial SSR, Active Streaming, RSC Flight, Server Functions, or Client Components).
      </p>

      {/* Always Return Pattern Callout */}
      <div className="my-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 not-prose">
        <div className="flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-300 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>Architectural Contract: Always Use the &quot;return redirect(...)&quot; Pattern</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground space-y-2 leading-relaxed">
          <p>
            Rather than throwing an internal JavaScript exception to abruptly interrupt execution, Dinou&apos;s <code>redirect(destination)</code> <strong>returns a valid React element</strong> (<code>&lt;ClientRedirect to=&#123;destination&#125; /&gt;</code> of type <code>ReactNode</code>).
          </p>
          <p>
            Because it does not throw an exception, calling <code>redirect(&quot;/path&quot;)</code> without <code>return</code> will <strong>not</strong> stop subsequent lines of code from executing. You must always precede it with <code>return</code>:
          </p>
          <div className="grid sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
              <span className="font-bold">❌ Incorrect:</span>
              <div className="mt-1 text-muted-foreground">
                <code>redirect(&quot;/login&quot;);</code>
                <br />
                <code>// Subsequent code STILL runs!</code>
              </div>
            </div>
            <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <span className="font-bold">✅ Correct:</span>
              <div className="mt-1 text-muted-foreground">
                <code>return redirect(&quot;/login&quot;);</code>
                <br />
                <code>// Exits immediately &amp; returns ReactNode</code>
              </div>
            </div>
          </div>
          <div className="pt-2 text-[11px] text-muted-foreground space-y-1.5">
            <p className="font-semibold text-foreground">Why this design?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Clean TypeScript types:</strong> Satisfies <code>Promise&lt;ReactNode&gt;</code> in async Server Components without requiring type assertions or casting.
              </li>
              <li>
                <strong>Safe inside <code>try/catch</code>:</strong> Because it is a normal declarative element and not an unhandled exception, your application error boundaries and <code>catch</code> blocks won&apos;t accidentally intercept or cancel the navigation.
              </li>
              <li>
                <strong>Works inside <code>&lt;Suspense&gt;</code>:</strong> When an async component redirects after the HTTP stream has already started (<code>200 OK</code>), Dinou safely streams <code>&lt;ClientRedirect /&gt;</code> down to the browser to navigate upon hydration, avoiding unexpected Error Boundary crashes.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5 Runtime Execution Modes */}
      <div className="my-6 space-y-4 not-prose">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <ArrowRightLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>The 5 Polymorphic Runtime Execution Modes</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-xs">
          {/* Mode 1 */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>1. Initial SSR &amp; Pre-flight (Headers Unsent)</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                HTTP 302
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Occurs when called inside <code>getProps()</code> in <code>page_functions.ts</code>, at the top level of the root <code>page.tsx</code> Server Component (before stream initialization), or inside a global plugin hook (<code>onRequest</code>).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because zero HTML bytes have reached the wire (<code>headersSent === false</code>), Dinou issues an immediate <strong>HTTP 302 Found</strong> with a <code>Location</code> header. <strong>Critical for SEO crawlers and search indexers.</strong>
            </p>
          </div>

          {/* Mode 2 */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>2. RSC Flight Navigation</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                x-rsc-redirect
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Occurs during client-side SPA route transitions when the client browser requests a React Server Component flight payload via Dinou&apos;s internal flight endpoint.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dinou responds with an <code>x-rsc-redirect: /dest</code> header with status <code>200 OK</code>. Dinou&apos;s client router intercepts this header and transitions to the target route smoothly without destroying client application state.
            </p>
          </div>

          {/* Mode 3 */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>3. Server Functions (<code>&quot;use server&quot;</code>)</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                Soft SPA Navigation
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Invoked from browser form actions or event handlers via a dedicated HTTP <code>POST</code> request.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The server executes the mutation and returns redirection metadata. The client RPC proxy intercepts it and drives an SPA router transition (<code>router.replace()</code>) <strong>without a full page reload</strong>, preserving client state and scroll position.
            </p>
          </div>

          {/* Mode 4 */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>4. Deferred Streaming SSR (&lt;Suspense&gt;)</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                Hydration Fallback
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Occurs when an async component wrapped in <code>&lt;Suspense&gt;</code> redirects after React has already opened the HTTP connection with status <code>200 OK</code> to stream the document shell.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because an open <code>200 OK</code> stream cannot turn into a <code>302</code>, Dinou injects <code>&lt;ClientRedirect /&gt;</code> into the stream and writes an inline script fallback, completing the transition upon browser mount without aborting the connection.
            </p>
          </div>

          {/* Mode 5 (Full Width) */}
          <div className="md:col-span-2 p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>5. Client Components In-Render (0ms Client Dispatch)</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                router.replace() (0ms)
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When called inside a Client Component during browser rendering, no network roundtrip is initiated. Dinou returns <code>&lt;ClientRedirect /&gt;</code> whose <code>useEffect</code> hook immediately invokes <code>router.replace()</code> in the client SPA router, updating the view instantaneously.
            </p>
          </div>
        </div>
      </div>

      {/* Server Component Equivalence Principle & Security Sandbox */}
      <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-2 text-xs">
          <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>The Equivalence Principle in Server Components</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Calling <code>redirect()</code> directly inside a Server Component vs. calling an imported Server Function (e.g. <code>await requireAuth()</code>) from that Server Component is <strong>functionally identical</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Because both execute inside the exact same Node.js SSR worker during the same request lifecycle, they share the identical <code>AsyncLocalStorage</code> context store and streaming pipeline.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-card border border-border space-y-2 text-xs">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Shield className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Built-in Open-Redirect Protection</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Dinou&apos;s runtime includes automatic path sanitization. Target paths must resolve to a valid internal route (starting with a single <code>/</code>).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Protocol-relative targets (e.g. <code>//evil.com</code>) or unauthorized external schemes are sanitized, safeguarding your application against open-redirect phishing vulnerabilities.
          </p>
        </div>
      </div>

      {/* Full Execution Reference Matrix */}
      <div className="not-prose my-6 space-y-2">
        <div className="font-semibold text-sm text-foreground">
          Runtime Execution Reference Matrix
        </div>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Invocation Context</th>
                <th className="p-3">Headers Sent?</th>
                <th className="p-3">HTTP Status / Header</th>
                <th className="p-3">Client Transition</th>
                <th className="p-3">Best Used For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground align-top">
                  Root SSR / <code>page_functions.ts</code> / Plugin
                </td>
                <td className="p-3 align-top">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">No</span>
                </td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  HTTP 302 Found<br />
                  <span className="text-muted-foreground font-sans">Location: /url</span>
                </td>
                <td className="p-3 align-top">
                  Full browser navigation (hard reload)
                </td>
                <td className="p-3 align-top">
                  Auth walls, root route guards, SEO canonicals
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">
                  RSC Flight Navigation
                </td>
                <td className="p-3 align-top">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">No</span>
                </td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  HTTP 200 OK<br />
                  <span className="text-muted-foreground font-sans">x-rsc-redirect: /url</span>
                </td>
                <td className="p-3 align-top">
                  Soft SPA navigation (zero full reload)
                </td>
                <td className="p-3 align-top">
                  Client-side Link clicks to guarded server routes
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">
                  Server Functions (<code>&quot;use server&quot;</code>)
                </td>
                <td className="p-3 align-top">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">No</span> (dedicated POST)
                </td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  HTTP 200 OK<br />
                  <span className="text-muted-foreground font-sans">RPC redirect payload</span>
                </td>
                <td className="p-3 align-top">
                  Soft SPA navigation (<code>router.replace</code>)
                </td>
                <td className="p-3 align-top">
                  Form mutations, cart checkout, login actions
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">
                  Deferred SSR (Inside <code>&lt;Suspense&gt;</code>)
                </td>
                <td className="p-3 align-top">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">Yes</span> (200 stream open)
                </td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  HTTP 200 OK (Chunked)<br />
                  <span className="text-muted-foreground font-sans">&lt;ClientRedirect /&gt;</span>
                </td>
                <td className="p-3 align-top">
                  SPA transition upon browser hydration
                </td>
                <td className="p-3 align-top">
                  Late permission checks inside streamed async UI
                </td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground align-top">
                  Client Components (In-render)
                </td>
                <td className="p-3 align-top">
                  <span className="font-mono text-muted-foreground">N/A</span> (in-browser)
                </td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  None (0ms local dispatch)
                </td>
                <td className="p-3 align-top">
                  Immediate <code>router.replace()</code>
                </td>
                <td className="p-3 align-top">
                  Declarative client state gates, wizard step navigation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Practical Implementation Examples */}
      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Implementation Examples Across Architectures</span>
        </div>
        <TabbedCodeBlock
          defaultTab="server-component"
          tabs={[
            {
              id: "server-component",
              label: "page.tsx (Server Component)",
              language: "tsx",
              code: `// src/admin/page.tsx (React Server Component)
import { Suspense } from "react";
import { redirect, getContext } from "dinou";

// 1. Root pre-flight check (Headers unsent -> HTTP 302 for crawlers)
export default async function AdminPage() {
  const { req } = getContext();
  if (!req.cookies.auth_token) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Admin Management</h1>
      <Suspense fallback={<p>Verifying advanced permissions...</p>}>
        <RestrictedMetrics />
      </Suspense>
    </div>
  );
}

// 2. Deferred check inside Suspense (Headers already sent -> <ClientRedirect />)
async function RestrictedMetrics() {
  const hasAccess = await checkSuperAdmin();
  if (!hasAccess) {
    return redirect("/admin/insufficient-permissions");
  }
  return <div>Superadmin Metrics Content</div>;
}`,
            },
            {
              id: "server-function",
              label: "actions.ts (Server Function)",
              language: "typescript",
              code: `// src/actions/checkout.ts
"use server";

import { redirect } from "dinou";
import db from "@/lib/db";

export async function processPayment(formData: FormData) {
  const cartId = formData.get("cartId") as string;
  const order = await db.orders.charge(cartId);

  // Dedicated POST mutation:
  // Dinou returns redirect metadata; client executes a smooth SPA transition
  // without losing React state or reloading the entire browser window!
  return redirect(\`/orders/\${order.id}/confirmed\`);
}`,
            },
            {
              id: "page-functions",
              label: "page_functions.ts (getProps)",
              language: "typescript",
              code: `// src/settings/page_functions.ts
import { redirect, getContext } from "dinou";

export async function getProps() {
  const { req } = getContext();

  // Evaluated before any JSX rendering begins:
  // Short-circuits the pipeline with an immediate HTTP 302 Found
  if (!req.cookies.session_id) {
    return redirect("/login?from=/settings");
  }

  const profile = await fetchUserProfile(req.cookies.session_id);
  return { profile };
}`,
            },
            {
              id: "client-component",
              label: "client-guard.tsx (Client Component)",
              language: "tsx",
              code: `// src/components/client-guard.tsx
"use client";

import { redirect } from "dinou";

interface GuardProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export function ClientAuthGuard({ isAuthenticated, children }: GuardProps) {
  if (!isAuthenticated) {
    // Evaluates in browser render: dispatches router.replace() in 0ms!
    return redirect("/auth/sign-in");
  }

  return <>{children}</>;
}`,
            },
            {
              id: "custom-status",
              label: "dinou.config.mjs (Custom 301 / Plugin)",
              language: "javascript",
              code: `// dinou.config.mjs (Global Plugin / Middleware)
import { defineConfig } from "dinou/config";

export default defineConfig({
  plugins: [
    {
      name: "legacy-redirects",
      // Universal Web Standards hook (runs on Edge, Workers, Node & Bun)
      async onRequest(request, context) {
        const url = new URL(request.url);

        // Permanent 301 SEO redirection for legacy URLs
        if (url.pathname === "/old-docs" || url.pathname.startsWith("/docs/v1")) {
          return Response.redirect(new URL("/docs", request.url), 301);
        }

        // Temporary 307 redirect preserving HTTP method
        if (url.pathname === "/legacy-api/upload") {
          return Response.redirect(new URL("/api/v2/upload", request.url), 307);
        }
      },
    },
  ],
});`,
            },
          ]}
        />
      </div>

      {/* Response.redirect vs context.res.redirect Callout */}
      <div className="border rounded-lg p-4 bg-card not-prose mt-4 text-xs space-y-2 border-border">
        <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
          <ArrowRightLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Choosing the Right Redirection Mechanism</span>
        </div>
        <div className="text-muted-foreground space-y-1.5 leading-relaxed">
          <p>
            <strong>In Plugins &amp; Middlewares (<code>onRequest</code> in <code>dinou.config.mjs</code>):</strong> Return a native Web Standards <code>Response.redirect(url, status)</code>. Dinou detects <code>result instanceof Response</code> and terminates the request immediately (&lt;1ms) before route matching, file I/O, or React rendering starts.
          </p>
          <p>
            <strong>In Server Components &amp; <code>page_functions.ts</code>:</strong> Use the universal <code>return redirect(&quot;/path&quot;)</code> helper (which automatically defaults to HTTP 302 on unsent headers). If you require an explicit status code (such as a permanent <code>301 Moved Permanently</code> for SEO canonical URLs), obtain the context via <code>const &#123; res &#125; = getContext();</code> and invoke <code>res.redirect(301, &quot;/path&quot;)</code>.
          </p>
        </div>
      </div>
    </section>
  );
}
