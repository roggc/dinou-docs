"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Settings, Code2 } from "lucide-react";

export function DefineConfigSection() {
  return (
    <section id="defineconfig" className="scroll-mt-20 mt-12 pt-8 border-t">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>defineConfig()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
          Configuration Helper
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          Root Configuration
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Type-safe configuration helper providing autocomplete, IntelliSense, and schema validation for your application&apos;s root configuration file (<code>dinou.config.js</code>, <code>dinou.config.ts</code>, or <code>dinou.config.mjs</code>).
      </p>

      {/* Sub-section 1: Schema Reference */}
      <div id="defineconfig-schema" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Settings className="h-4 w-4 text-purple-500" />
            <span>Configuration Schema Reference</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Options accepted by the <code>defineConfig()</code> wrapper.
        </p>

        <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-3">Option</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">reactStrictMode</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">true</td>
                <td className="p-3 align-top leading-relaxed">
                  Enables React 19 StrictMode double-rendering in development mode. Helps detect unexpected side effects and ensures strict concurrent rendering compatibility with React Compiler.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">ppr</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">false</td>
                <td className="p-3 align-top leading-relaxed">
                  Global default for Partial Prerendering. When enabled, static-eligible routes pre-render an instant static HTML shell while streaming dynamic <code>&lt;Suspense&gt;</code> holes. Can be configured per layout branch in <code>layout_functions.ts</code> or overridden per route in <code>page_functions.ts</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">storage</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">StorageAdapter</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">FileSystemStorage</td>
                <td className="p-3 align-top leading-relaxed">
                  Configures the storage backend for ISR HTML pages, RSC flight payloads, and cache slot records. Accepts built-in adapters (such as <code>RedisStorage</code> or <code>MemoryStorage</code>) or custom implementations.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">plugins</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouPlugin[]</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">[]</td>
                <td className="p-3 align-top leading-relaxed">
                  Array of Web Standards lifecycle middleware plugins executed on every incoming HTTP request before route matching or React rendering.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sub-section 2: Production Configuration */}
      <div id="defineconfig-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-purple-500" />
            <span>Production Configuration Patterns</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Complete production configuration files for ES Modules and TypeScript projects.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="esm-config"
            tabs={[
              {
                id: "esm-config",
                label: "dinou.config.js (Production ESM)",
                language: "javascript",
                code: `// dinou.config.js
import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

export default defineConfig({
  // Guarantee concurrent compatibility with React 19 StrictMode in dev
  reactStrictMode: true,
  // Global Partial Prerendering default
  ppr: false,

  // Distributed multi-region ISR cache storage
  storage: new RedisStorage(
    new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
    })
  ),

  // Universal Web Standards request plugins
  plugins: [
    {
      name: "security-headers",
      async onRequest(request, context) {
        // Enforce HTTPS in production environments
        const proto = request.headers.get("x-forwarded-proto");
        if (process.env.NODE_ENV === "production" && proto === "http") {
          const httpsUrl = request.url.replace("http://", "https://");
          return Response.redirect(httpsUrl, 301);
        }
      },
    },
  ],
});`,
              },
              {
                id: "ts-config",
                label: "dinou.config.ts (TypeScript)",
                language: "typescript",
                code: `// dinou.config.ts
import { defineConfig, type DinouPlugin } from "dinou";

const apiAuthPlugin: DinouPlugin = {
  name: "api-guard",
  async onRequest(request, context) {
    const url = new URL(request.url);

    // Fast-path edge authorization for protected API routes
    if (url.pathname.startsWith("/api/protected")) {
      const apiKey = request.headers.get("x-api-key");
      if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
        return Response.json(
          { error: "Unauthorized access: invalid or missing API key" },
          { status: 401 }
        );
      }
    }
  },
};

export default defineConfig({
  reactStrictMode: true,
  ppr: true,
  plugins: [apiAuthPlugin],
});`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
