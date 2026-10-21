"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Server, FileText, Layers, Zap, Shield, Code2 } from "lucide-react";

export function GetContextSection() {
  return (
    <section id="getcontext" className="scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>getContext()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Server-Only Primitive
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Returns: RequestContextStore | undefined
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Synchronously accesses the active HTTP request and response context via Node.js / V8 <code>AsyncLocalStorage</code>. In Dinou, <code>getContext()</code> operates across <strong>Server Components (RSC)</strong>, <strong>Server Functions (<code>&quot;use server&quot;</code>)</strong>, and route segment contracts in <strong><code>page_functions.ts</code></strong> and <strong><code>layout_functions.ts</code></strong> without prop drilling.
      </p>

      {/* Sub-section 1: Request & Response Store Reference */}
      <div id="getcontext-store" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Server className="h-4 w-4 text-blue-500" />
            <span>Request &amp; Response Store Reference</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Overview of the read-only request metadata (<code>ctx.req</code>) and server response mutation proxies (<code>ctx.res</code>).
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          {/* Request Store */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-3">
            <div className="font-semibold text-foreground flex items-center gap-1.5 pb-2 border-b border-border">
              <FileText className="h-4 w-4 text-blue-500" />
              <span>Request Store (<code>ctx.req</code>)</span>
            </div>
            <div className="space-y-2 text-muted-foreground leading-relaxed">
              <div>
                <strong className="text-foreground font-mono">req.query:</strong>
                <div className="text-[11px]">Parsed URL query parameters (e.g. <code>Record&lt;string, string | string[]&gt;</code>).</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">req.cookies:</strong>
                <div className="text-[11px]">Incoming client cookies parsed into a key-value record (<code>Record&lt;string, string&gt;</code>).</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">req.headers:</strong>
                <div className="text-[11px]">Normalized incoming HTTP request headers (<code>IncomingHttpHeaders</code>).</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">req.path:</strong>
                <div className="text-[11px]">Normalized request URL pathname (e.g. <code>&quot;/dashboard&quot;</code>).</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">req.method:</strong>
                <div className="text-[11px]">HTTP method (e.g. <code>&quot;GET&quot;</code>, <code>&quot;POST&quot;</code>).</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">req.env:</strong>
                <div className="text-[11px]">Platform host bindings (Cloudflare D1, KV, R2, environment variables).</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">req.ctx:</strong>
                <div className="text-[11px]">Execution context for background work (e.g. <code>ctx.waitUntil()</code>).</div>
              </div>
            </div>
          </div>

          {/* Response Proxy */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-3">
            <div className="font-semibold text-foreground flex items-center gap-1.5 pb-2 border-b border-border">
              <Server className="h-4 w-4 text-emerald-500" />
              <span>Response Proxy (<code>ctx.res</code>)</span>
            </div>
            <div className="space-y-2 text-muted-foreground leading-relaxed">
              <div>
                <strong className="text-foreground font-mono">res.cookie(name, val, options?):</strong>
                <div className="text-[11px]">Sets an outgoing HTTP cookie. Supports <code>httpOnly</code>, <code>secure</code>, <code>sameSite</code>, <code>maxAge</code>, <code>expires</code>, and <code>path</code>.</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">res.clearCookie(name, options?):</strong>
                <div className="text-[11px]">Expires and clears an existing HTTP cookie.</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">res.setHeader(name, value):</strong>
                <div className="text-[11px]">Sets an outgoing HTTP header before the initial stream begins.</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">res.status(code):</strong>
                <div className="text-[11px]">Sets the HTTP response status code (e.g. <code>200</code>, <code>201</code>, <code>404</code>).</div>
              </div>
              <div>
                <strong className="text-foreground font-mono">res.redirect(status?, url):</strong>
                <div className="text-[11px]">Executes a native HTTP redirect (defaults to status <code>302</code>).</div>
              </div>
            </div>
          </div>
        </div>

        {/* Plugin Shared State & Direct Host Bindings */}
        <div className="p-4 rounded-lg bg-card border border-border not-prose text-xs my-4 space-y-2">
          <div className="font-semibold text-foreground flex items-center gap-1.5 pb-2 border-b border-border">
            <Layers className="h-4 w-4 text-purple-500" />
            <span>Plugin Shared State &amp; Direct Platform Bindings</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <strong className="text-foreground font-mono">ctx[customKey] (Plugin State Sharing):</strong>
              <p className="text-muted-foreground leading-relaxed">
                Any custom data attached to <code>context</code> inside a plugin&apos;s <code>onRequest(request, context)</code> hook (such as <code>context.user</code>, <code>context.session</code>, or <code>context.tenant</code>) is preserved across the entire request lifecycle and can be read synchronously via <code>getContext()</code> in any Server Component or Server Function.
              </p>
            </div>
            <div className="space-y-1.5">
              <strong className="text-foreground font-mono">ctx.env &amp; ctx.ctx (Direct Host Bindings):</strong>
              <p className="text-muted-foreground leading-relaxed">
                In addition to <code>ctx.req.env</code>, platform host resources (Cloudflare D1 databases, KV namespaces, R2 buckets) and execution context methods (such as <code>ctx.waitUntil()</code>) are accessible directly at the root of the context object.
              </p>
            </div>
          </div>
        </div>

        {/* Streaming & Headers Timing Callout */}
        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Streaming &amp; Headers Sent Timing</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              HTTP headers, status codes, and HTTP-only cookies can only be sent before the server flushes the initial response stream. In streaming Server Components or deferred <code>&lt;Suspense&gt;</code> blocks, invoke <code>return redirect(&quot;/path&quot;)</code> to trigger client-side SPA navigation instead of modifying raw headers.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 space-y-2">
            <div className="font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span>Server-Only Security Sandbox</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Never invoke <code>getContext()</code> directly inside a Client Component running in the browser. In browser environments, Dinou logs an error and returns an empty object. Always read confidential cookies or database records in Server Components or <code>getProps</code>, sanitize the data, and pass only safe props to Client Components.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-section 2: Production Patterns */}
      <div id="getcontext-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-blue-500" />
            <span>Production Implementation Patterns</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Explore real-world patterns for Server Components, Server Functions, route segment lifecycle hooks, and plugin state retrieval.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="server-component"
            tabs={[
              {
                id: "server-component",
                label: "profile.tsx (Server Component)",
                language: "tsx",
                code: `// src/app/profile/page.tsx (Server Component)
import { getContext, redirect } from "dinou";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const ctx = getContext();
  if (!ctx) return null;

  // Read authenticated session cookie securely on the server
  const sessionToken = ctx.req.cookies.auth_session;
  if (!sessionToken) {
    return redirect("/login?from=/profile");
  }

  // Extract client IP and user agent for security logging
  const clientIp = ctx.req.headers["x-forwarded-for"] || "127.0.0.1";
  const userAgent = ctx.req.headers["user-agent"] || "unknown";

  const user = await db.users.findByToken(sessionToken);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="text-sm text-muted-foreground">Session active from IP: {clientIp}</p>
    </div>
  );
}`,
              },
              {
                id: "server-function",
                label: "theme.ts (Server Function)",
                language: "typescript",
                code: `// src/actions/preferences.ts
"use server";

import { getContext } from "dinou";

export async function updateThemePreference(theme: "light" | "dark" | "system") {
  const ctx = getContext();
  if (!ctx) throw new Error("Context unavailable");

  // Mutate an outgoing HTTP response cookie from the server action
  ctx.res.cookie("preferred_theme", theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true, theme };
}`,
              },
              {
                id: "page-functions",
                label: "page_functions.ts (Route Lifecycle)",
                language: "typescript",
                code: `// src/app/dashboard/page_functions.ts
import { getContext, redirect } from "dinou";

// Evaluated before any JSX component rendering begins
export async function getProps() {
  const ctx = getContext();
  if (!ctx) return { tenant: null };

  const tenantSlug = ctx.req.query.tenant as string;
  if (!tenantSlug) {
    return redirect("/onboarding");
  }

  // Read environment variable or platform binding
  const apiSecret = ctx.req.env?.TENANT_API_KEY || process.env.TENANT_API_KEY;

  return {
    tenantSlug,
    hasApiKey: Boolean(apiSecret),
  };
}`,
              },
              {
                id: "plugin-state",
                label: "plugin-state.tsx (Plugin Injected State)",
                language: "tsx",
                code: `// 1. Plugin attaches authenticated user to context (dinou.config.js)
export const authPlugin = {
  name: "auth-guard",
  async onRequest(request, context) {
    const token = request.headers.get("Authorization");
    if (token) {
      // Injected directly into the request context store
      context.user = await verifySession(token);
    }
  },
};

// 2. Server Component retrieves plugin state with zero prop-drilling
// src/app/dashboard/page.tsx (Server Component)
import { getContext } from "dinou";

export default async function DashboardPage() {
  const ctx = getContext();
  
  // Directly access custom plugin properties from the store
  const currentUser = ctx?.user;

  return (
    <div>
      <h1>Welcome back, {currentUser?.name || "Guest"}</h1>
      <p>Role: {currentUser?.role || "anonymous"}</p>
    </div>
  );
}`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
