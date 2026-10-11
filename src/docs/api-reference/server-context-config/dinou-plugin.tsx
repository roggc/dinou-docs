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
        Plugins execute sequentially on the web server entrypoint for every incoming HTTP request before React route matching or component rendering begins. Built on standard Web <code>Request</code> and <code>Response</code> primitives, plugins provide unified middleware capabilities across Node.js, Bun, Cloudflare Workers, and Edge platforms.
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
                Descriptive plugin identifier used for telemetry, developer diagnostics, and error reporting in logs.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">onRequest</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">
                (request: Request, context: RequestContextStore) =&gt; Promise&lt;Response | void&gt; | Response | void
              </td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
              <td className="p-3 align-top leading-relaxed">
                Universal Web Standards middleware hook executed sequentially on every incoming HTTP request before React rendering. Returning a standard Web <code>Response</code> aborts the request immediately (&lt;1ms). Returning <code>void</code> continues execution and preserves any custom properties attached to <code>context</code> for downstream Server Components.
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
          Understanding early exit vs. pipeline pass-through in <code>onRequest</code>.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Early Exit (<code>Response</code> Returned)</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              If <code>onRequest</code> returns an instance of <code>Response</code> (such as <code>Response.redirect()</code>, <code>Response.json()</code>, or a custom <code>Response</code>), Dinou terminates the request immediately (&lt;1ms).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              It completely bypasses React component rendering, routing matches, and server-side database lookups. This is optimal for authentication walls, health check endpoints, and bot blocking.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-500" />
              <span>Pass-Through &amp; Context Enrichment (<code>void</code>)</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              If <code>onRequest</code> returns nothing (or <code>undefined</code>), execution proceeds seamlessly to the React rendering pipeline.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Any custom properties attached to the <code>context</code> parameter (e.g. <code>context.user = session</code>) are preserved in <code>AsyncLocalStorage</code> and accessible synchronously in Server Components via <code>getContext()</code>.
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
          Practical implementations for API security, geolocation enrichment, and server-timing telemetry.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="api-guard"
            tabs={[
              {
                id: "api-guard",
                label: "auth-guard.ts (Early Exit)",
                language: "typescript",
                code: `// src/plugins/auth-guard.ts
import type { DinouPlugin } from "dinou";

export const authGuardPlugin: DinouPlugin = {
  name: "auth-guard",
  async onRequest(request, context) {
    const url = new URL(request.url);

    // Intercept secured API endpoints before React loads
    if (url.pathname.startsWith("/api/admin")) {
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
    // Extract Edge CDN headers (Cloudflare, Vercel, AWS CloudFront)
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
                label: "server-timing.ts (Telemetry & Latency)",
                language: "typescript",
                code: `// src/plugins/server-timing.ts
import type { DinouPlugin } from "dinou";

export const telemetryPlugin: DinouPlugin = {
  name: "server-timing",
  async onRequest(request, context) {
    const start = performance.now();

    // Fast-path health check endpoint
    if (new URL(request.url).pathname === "/healthz") {
      const duration = (performance.now() - start).toFixed(2);
      return Response.json({
        status: "healthy",
        uptime: process.uptime ? process.uptime() : 0,
        latencyMs: Number(duration),
      });
    }

    // Attach request start timestamp for downstream telemetry
    context.startTime = start;
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
