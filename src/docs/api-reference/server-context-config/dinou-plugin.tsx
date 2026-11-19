"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { ArrowRightLeft, CheckCircle2, Layers, Code2 } from "lucide-react";

export function DinouPluginSection() {
  return (
    <section id="dinouplugin" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>DinouPlugin</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Web Standards Middleware
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
          Edge &amp; Node.js Compatible
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Plugins execute sequentially on the server entrypoint for every incoming HTTP request before route matching, cache lookups, or React rendering begins. Built on standard Web <code>Request</code> and <code>Response</code> primitives, plugins provide unified middleware capabilities across Node.js, Bun, Deno, Cloudflare Workers, and Netlify Functions (plus low-level Node/Bun server access via <code>configureServer</code>).
      </p>

      {/* Interface Properties Table */}
      <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
        <table className="w-full text-xs text-left border-collapse min-w-[650px]">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th className="p-3">Property</th>
              <th className="p-3">Type</th>
              <th className="p-3">Required</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card text-muted-foreground">
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">name</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
              <td className="p-3 align-top leading-relaxed">
                Descriptive plugin identifier used for telemetry, developer diagnostics, and per-plugin error reporting in logs.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">setupFiles</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">string[]</td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
              <td className="p-3 align-top leading-relaxed">
                Array of setup or polyfill file paths injected at Line 1 across all bundler engines before user <code>setupFiles</code> and application modules load. Supports relative paths, <code>@/*</code> aliases, and npm package subpaths.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">configureServer</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">
                (context: ServerHookContext) =&gt; void | Promise&lt;void&gt;
              </td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
              <td className="p-3 align-top leading-relaxed">
                Low-level HTTP/HTTPS server hook invoked before <code>server.listen()</code> in Node.js and Bun (both <code>dinou dev</code> and production). Receives <code>&#123; server, isDev, use &#125;</code> to attach WebSockets (Socket.IO, <code>ws</code>), listeners, or Connect/Express <code>NodeMiddleware</code> handlers (supporting synchronous <code>next()</code>, Promise-returning <code>async</code>, callback-async, and <code>next(err)</code> propagation) with per-plugin error isolation.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">onRequest</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">
                (request: Request, context: RequestContextStore) =&gt; Promise&lt;Response | void&gt; | Response | void
              </td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
              <td className="p-3 align-top leading-relaxed">
                Universal Web Standards middleware hook executed sequentially on every incoming HTTP request (including dynamic SSR, cached SSG/ISR/PPR routes, Server Functions, and <code>/____rsc_*</code> SPA fetches; automatically skipped during build-time SSG). Returning a Web <code>Response</code> aborts immediately (&lt;1ms); returning <code>void</code> continues execution and preserves custom properties and <code>context.res</code> mutations for downstream Server Components and Server Functions.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sub-section 1: Lifecycle & Early Exit */}
      <div id="dinouplugin-lifecycle" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-emerald-500" />
            <span>Execution Lifecycle &amp; Response Contract</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Understanding early exit, RSC SPA redirect translation, route normalization, and pipeline pass-through in <code>onRequest</code>.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Early Exit (<code>Response</code> Returned) &amp; SPA Redirects</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              If <code>onRequest</code> returns a Web <code>Response</code> (e.g. <code>Response.redirect()</code>, <code>Response.json()</code>, or a custom <code>Response</code>), Dinou terminates the request immediately (&lt;1ms), bypassing cache reads and React rendering while merging any headers/cookies already queued on <code>context.res</code>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When an <code>onRequest</code> plugin returns a <code>3xx</code> redirect during an internal <code>/____rsc_*</code> SPA fetch, Dinou automatically translates it into a <code>200</code> response with an <code>x-rsc-redirect</code> header while preserving all <code>Set-Cookie</code> headers so client-side navigation redirects cleanly without CORS/opaque-redirect issues. Uncaught exceptions in <code>onRequest</code> are isolated per plugin and return a safe <code>500 Internal Server Error</code>.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-500" />
              <span>Pass-Through, Route Normalization &amp; Build-Time SSG</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              If <code>onRequest</code> returns <code>void</code> (<code>undefined</code>), execution proceeds to route resolution, cached SSG/ISR/PPR delivery, or React rendering. Any custom properties attached to <code>context</code> (e.g. <code>context.user = session</code>) are preserved in <code>AsyncLocalStorage</code> and accessible synchronously via <code>getContext()</code>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Prefer checking <code>context.req.path</code> instead of raw <code>new URL(request.url).pathname</code> when guarding pages: Dinou normalizes <code>context.req.path</code> to the logical route pathname (e.g. <code>&quot;/admin&quot;</code>) even on internal <code>/____rsc_page____/admin</code> SPA fetches (exposing the raw wire path in <code>context.req.rawPath</code> and <code>context.req.isRscRequest</code>). <code>onRequest</code> is automatically skipped during build-time SSG.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-section 2: Production Plugins */}
      <div id="dinouplugin-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-emerald-500" />
            <span>Production Plugin Patterns</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Practical implementations for route/API guards, geolocation enrichment, server-timing telemetry, and Node.js/Bun <code>configureServer</code> integration.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="api-guard"
            tabs={[
              {
                id: "api-guard",
                label: "auth-guard.ts (Early Exit & SPA Guard)",
                language: "typescript",
                code: `// src/plugins/auth-guard.ts
import type { DinouPlugin } from "dinou";

export const authGuardPlugin: DinouPlugin = {
  name: "auth-guard",
  async onRequest(request, context) {
    // 1. Protect both SSR HTML and SPA RSC navigations using normalized context.req.path
    if (context.req.path.startsWith("/admin") && !context.req.cookies.session) {
      // Automatically becomes HTTP 302 on SSR and x-rsc-redirect on SPA fetches!
      return Response.redirect(new URL("/login", request.url), 302);
    }

    // 2. Intercept secured API endpoints before React loads
    if (context.req.path.startsWith("/api/admin")) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer secret_admin_token")) {
        // Fast-path early exit: terminates request in <1ms
        return Response.json(
          { error: "Forbidden: invalid administrative token" },
          { status: 403, headers: { "Cache-Control": "no-store" } }
        );
      }
    }
  },
};`,
              },
              {
                id: "geo-context",
                label: "geo-enrichment.ts (Context Enrichment)",
                language: "typescript",
                code: `// src/plugins/geo-enrichment.ts
import type { DinouPlugin } from "dinou";

export const geoPlugin: DinouPlugin = {
  name: "geo-enrichment",
  async onRequest(request, context) {
    // Extract Edge CDN headers (Cloudflare, Netlify, AWS CloudFront)
    const country = request.headers.get("cf-ipcountry") || "US";
    const city = request.headers.get("cf-ipcity") || "San Francisco";

    // Enrich the request context object with geo metadata
    context.geo = {
      country,
      city,
      isEu: ["DE", "FR", "ES", "IT", "NL"].includes(country),
    };

    // Return nothing (void) -> execution proceeds to React rendering
    // Downstream Server Components can read context.geo via getContext()!
  },
};`,
              },
              {
                id: "server-timing",
                label: "server-timing.ts (Telemetry & Health Check)",
                language: "typescript",
                code: `// src/plugins/server-timing.ts
import type { DinouPlugin } from "dinou";

export const telemetryPlugin: DinouPlugin = {
  name: "server-timing",
  async onRequest(request, context) {
    const start = performance.now();

    // Fast-path health check endpoint
    if (context.req.path === "/healthz") {
      const duration = (performance.now() - start).toFixed(2);
      return Response.json({
        status: "healthy",
        uptime: typeof process !== "undefined" && process.uptime ? process.uptime() : 0,
        latencyMs: Number(duration),
      });
    }

    // Attach request start timestamp for downstream telemetry
    context.startTime = start;
  },
};`,
              },
              {
                id: "configure-server",
                label: "realtime.ts (configureServer Hook)",
                language: "typescript",
                code: `// src/plugins/realtime.ts (Node.js & Bun runtimes)
import type { DinouPlugin } from "dinou";
import { WebSocketServer } from "ws";

export const realtimePlugin: DinouPlugin = {
  name: "realtime-ws",
  configureServer({ server, isDev, use }) {
    // 1. Attach WebSockets directly to the underlying http.Server
    const wss = new WebSocketServer({ noServer: true });
    server.on("upgrade", (req, socket, head) => {
      if (req.url === "/ws") {
        wss.handleUpgrade(req, socket, head, (ws) => {
          ws.send(JSON.stringify({ ready: true, isDev }));
        });
      }
    });

    // 2. Register Connect/Express-style raw Node middlewares
    use((req, res, next) => {
      res.setHeader("X-Powered-By", "Dinou");
      next();
    });
  },
};`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
