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
        Type-safe configuration helper providing autocomplete, IntelliSense, and schema validation for your application&apos;s root configuration file. Dinou discovers configuration files in deterministic precedence order: <code>dinou.config.ts</code> &rarr; <code>dinou.config.mjs</code> &rarr; <code>dinou.config.js</code> &rarr; <code>dinou.config.cjs</code>, compiles them ahead-of-time across Node.js, Bun, Deno, Cloudflare Workers, and Netlify (supporting TypeScript and <code>@/*</code> path aliases), and live hot-reloads changes in <code>dinou dev</code>. You can import <code>defineConfig</code> from <code>&quot;dinou&quot;</code> or the lightweight <code>&quot;dinou/config&quot;</code> subpath.
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
          All options defined on the <code>DinouConfig</code> interface accepted by <code>defineConfig()</code>.
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
                <td className="p-3 font-mono font-semibold text-primary align-top">reactCompiler</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">true</td>
                <td className="p-3 align-top leading-relaxed">
                  Enables or disables the React Compiler (<code>babel-plugin-react-compiler</code>) during production builds across Esbuild, Rollup, and Webpack. Individual components or hooks can also opt out locally using the <code>&quot;use no memo&quot;</code> directive.
                </td>
              </tr>
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
                <td className="p-3 font-mono font-semibold text-primary align-top">allowISG</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">true</td>
                <td className="p-3 align-top leading-relaxed">
                  Global default controlling whether dynamic route segments may generate and cache un-prerendered paths on demand via Incremental Static Generation (ISG). Set to <code>false</code> to restrict dynamic routes strictly to paths returned by <code>getStaticPaths</code> unless overridden per route or layout.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">storage</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">StorageAdapter</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Runtime default</td>
                <td className="p-3 align-top leading-relaxed">
                  Configures the storage backend for ISR/ISG HTML pages, RSC flight payloads, and <code>DinouCacheSlot</code> records. Defaults to <code>FileSystemStorage</code> on Node.js/Bun/Deno filesystem runtimes (<code>DenoKVStorage</code> on Deno Edge), <code>MemoryStorage(&#123; hydrateFromDisk: true &#125;)</code> on Netlify Functions, and <code>CloudflareKVStorage(env.DINOU_CACHE)</code> (or <code>MemoryStorage</code>) on Cloudflare Workers. Accepts built-in adapters (such as <code>RedisStorage</code>) or custom <code>StorageAdapter</code> implementations.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">setupFiles</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">string[]</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">undefined</td>
                <td className="p-3 align-top leading-relaxed">
                  Array of setup or polyfill file paths injected at Line 1 across all bundler engines before any application modules load. Executed in deduplicated <code>[...pluginSetupFiles, ...userSetupFiles]</code> order. Supports relative paths, extensionless paths, <code>tsconfig.json</code>/<code>jsconfig.json</code> aliases (<code>@/*</code>), and npm package subpaths. When explicitly provided (including <code>setupFiles: []</code>), overrides the root <code>dinou.setup.(mjs|js|ts)</code> auto-discovery convention.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">assetExtensions</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">string[]</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">[]</td>
                <td className="p-3 align-top leading-relaxed">
                  Additional file extensions (with or without leading dot, e.g. <code>[&quot;glb&quot;, &quot;hdr&quot;, &quot;wasm&quot;, &quot;pdf&quot;]</code>) beyond Dinou&apos;s 26 built-in media/font formats recognized as static binary imports across Server Components, Client Components, and CSS <code>url(...)</code>. Automatically content-hashed into <code>/assets/[name]-[hash].[ext]</code> across Esbuild, Rollup, and Webpack with ambient <code>declare module &quot;*.&lt;ext&gt;&quot;</code> declarations emitted in <code>.dinou/types/routes.d.ts</code>.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary align-top">plugins</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouPlugin[]</td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">[]</td>
                <td className="p-3 align-top leading-relaxed">
                  Array of universal plugins providing <code>onRequest</code> Web Standards middleware, <code>configureServer</code> Node/Bun server hooks, and <code>setupFiles</code> injection.
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
          Complete production configuration files for TypeScript and ES Modules projects.
        </p>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="ts-config"
            tabs={[
              {
                id: "ts-config",
                label: "dinou.config.ts (TypeScript)",
                language: "typescript",
                code: `// dinou.config.ts
import { defineConfig, type DinouPlugin } from "dinou/config";

const apiAuthPlugin: DinouPlugin = {
  name: "api-guard",
  async onRequest(request, context) {
    // context.req.path is normalized even on /____rsc_* SPA fetches
    if (context.req.path.startsWith("/api/protected")) {
      const apiKey = request.headers.get("x-api-key");
      if (!apiKey || apiKey !== context.env.INTERNAL_API_KEY) {
        return Response.json(
          { error: "Unauthorized access: invalid or missing API key" },
          { status: 401 }
        );
      }
    }
  },
};

export default defineConfig({
  reactCompiler: true,
  reactStrictMode: true,
  ppr: true,
  allowISG: true,
  assetExtensions: ["glb", "hdr", "wasm"],
  setupFiles: ["@/setup/polyfills"],
  plugins: [apiAuthPlugin],
});`,
              },
              {
                id: "esm-config",
                label: "dinou.config.js (Production ESM)",
                language: "javascript",
                code: `// dinou.config.js
import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

export default defineConfig({
  // React Compiler & React 19 StrictMode defaults
  reactCompiler: true,
  reactStrictMode: true,
  // Global Partial Prerendering & Dynamic ISG defaults
  ppr: false,
  allowISG: true,

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
      async onRequest(request) {
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
            ]}
          />
        </div>
      </div>
    </section>
  );
}
