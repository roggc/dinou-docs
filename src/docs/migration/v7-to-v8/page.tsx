import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";
import { Badge } from "@/docs/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Boxes,
  Globe,
  Terminal,
  Layers,
  FileCode2,
  Zap,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  FolderTree,
  ArrowRight,
  Server,
  Lock,
  Binary,
  Check,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "migration-guide", title: "1. Migration Guide: Zero-Config & Transparent Upgrade", level: 2 },
  { id: "standard-apps", title: "1.1 Standard Applications (Zero Changes)", level: 3 },
  { id: "ejected-projects", title: "1.2 Ejected Projects (dinou eject)", level: 3 },
  { id: "handler-fix", title: "2. Critical Handler Fix: allowISG: false in Layouts", level: 2 },
  { id: "bug-context", title: "2.1 Context of the Bug in v7.3.0", level: 3 },
  { id: "handler-code-fix", title: "2.2 The Fix in handler.js (Exact Code)", level: 3 },
  { id: "under-the-hood-esm", title: "3. Under the Hood: Pure ESM Architecture", level: 2 },
  { id: "source-extensions", title: "3.1 Source Extensions Unification (.js)", level: 3 },
  { id: "exports-map", title: "3.2 Modernized Exports Map", level: 3 },
  { id: "cli-eject", title: "3.3 ESM CLI & Modular Ejector", level: 3 },
  { id: "config-cleanup", title: "3.4 Canonical Config Resolution", level: 3 },
  { id: "edge-renderer-singleton", title: "4. Under the Hood: Universal Edge Renderer Singleton", level: 2 },
  { id: "verification-checklist", title: "5. Production Health & Verification Checklist", level: 2 },
];

export default function MigrationV7ToV8Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Migration from v7 to v8 | Dinou Docs</title>
      <meta
        name="description"
        content="Migrating from Dinou v7 to v8 is 100% transparent with zero code changes required. Complete guide for standard apps, ejected projects with handler.js fix, and pure ESM internals."
      />
      <link rel="canonical" href="https://dinou.dev/docs/migration/v7-to-v8" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900">
                Transparent Upgrade
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                v7 &rarr; v8
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migration from v7 to v8
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Upgrading from Dinou v7 to v8 is <strong>completely transparent and requires zero application code changes</strong>. All route signatures, React Server Components (RSC), and Server Functions work out of the box.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Migration Guide */}
            <section id="migration-guide" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Migration Guide: Zero-Config &amp; Transparent Upgrade
              </h2>
              
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/10 p-5 not-prose my-6 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>Zero Code Changes for Consumer Applications</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For standard projects consuming Dinou as a dependency, migrating to v8 simply consists of updating the package version. Your application routes, data fetching contracts, component trees, and Server Functions require no modification whatsoever.
                </p>
              </div>

              {/* 1.1 Standard Applications */}
              <div id="standard-apps" className="space-y-4 mt-6">
                <h3 className="text-lg font-bold">1.1 Standard Applications (dependencies: &#123; &quot;dinou&quot;: &quot;^8.0.0&quot; &#125;)</h3>
                
                <p>
                  To upgrade an existing Dinou v7 project, update the dependency in your <code>package.json</code>:
                </p>
                <CodeBlock language="bash" containerClassName="w-full overflow-hidden rounded-lg">
{`# Using npm
npm install dinou@latest

# Using Bun
bun add dinou@latest

# Using pnpm
pnpm add dinou@latest`}
                </CodeBlock>

                <div className="space-y-3 mt-4">
                  <h4 className="font-semibold text-sm">Optional Best Practice: Declare &quot;type&quot;: &quot;module&quot;</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Because Dinou v8 is fully compiled as pure ECMAScript Modules (ESM), it is recommended to ensure your project&apos;s <code>package.json</code> declares <code>&quot;type&quot;: &quot;module&quot;</code>:
                  </p>
                  <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`{
  "name": "my-dinou-app",
  "type": "module",
  "dependencies": {
    "dinou": "^8.0.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0"
  }
}`}
                  </CodeBlock>
                  <p className="text-xs text-muted-foreground">
                    With <code>&quot;type&quot;: &quot;module&quot;</code> active, you can optionally rename <code>dinou.config.mjs</code> to <code>dinou.config.js</code> or <code>dinou.config.ts</code>. Both are fully supported:
                  </p>
                  <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`// dinou.config.js (or dinou.config.ts)
import { defineConfig } from "dinou/config"; // or import { defineConfig } from "dinou";

export default defineConfig({
  // Your Dinou configuration
});`}
                  </CodeBlock>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="font-semibold text-sm">Full Backwards Compatibility:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-xs text-muted-foreground">
                    <li><strong>Routes &amp; Conventions:</strong> <code>page.tsx</code>, <code>layout.tsx</code>, <code>page_functions.ts</code>, and <code>layout_functions.ts</code> remain 100% unchanged.</li>
                    <li><strong>React 19 Server Components:</strong> RSC streaming, Suspense boundaries, and Client Components (<code>&quot;use client&quot;</code>) remain fully compatible.</li>
                    <li><strong>Server Functions:</strong> Action mutations (<code>&quot;use server&quot;</code>) work identically without changes.</li>
                    <li><strong>Routing &amp; Cache APIs:</strong> <code>useRouter</code>, <code>usePathname</code>, <code>useSearchParams</code>, and <code>&lt;DinouCacheSlot&gt;</code> are 100% preserved.</li>
                  </ul>
                </div>
              </div>

              {/* 1.2 Ejected Projects */}
              <div id="ejected-projects" className="space-y-4 mt-10">
                <h3 className="text-lg font-bold">1.2 Ejected Projects (dinou eject)</h3>
                
                <p>
                  If you have previously ejected the Dinou framework into your local codebase (having a local <code>./dinou/</code> folder), review the following scenarios:
                </p>

                <div className="space-y-4 text-xs not-prose">
                  {/* Scenario A */}
                  <div className="rounded-xl border p-4 bg-card space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs">A</span>
                      <span>Scenario A: Your ejected project works smoothly and you don&apos;t need layout fixes</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-7">
                      <strong>You do not need to do anything.</strong> Ejected Dinou projects are completely standalone and autonomous. You do not need to transform your local files into ESM or touch your project.
                    </p>
                  </div>

                  {/* Scenario B */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10 p-4 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs">B</span>
                      <span>Scenario B: You have custom changes in ./dinou/ AND want the layout bug fix</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-7">
                      <strong>Do NOT re-eject</strong> (re-ejecting with <code>npx dinou eject</code> would overwrite your custom modifications!). Instead, apply the surgical bug fix directly to your local <code>./dinou/core/handler.js</code> file as detailed in <a href="#handler-fix" className="text-emerald-600 dark:text-emerald-400 underline font-medium">Section 2</a> below.
                    </p>
                  </div>

                  {/* Scenario C */}
                  <div className="rounded-xl border p-4 bg-card space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs">C</span>
                      <span>Scenario C: You want to upgrade to the new v8 pure ESM core</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-7">
                      Commit or back up your local <code>./dinou/</code> directory, update your dependency to <code>&quot;dinou&quot;: &quot;^8.0.0&quot;</code>, run <code>npx dinou eject</code>, and re-apply your custom tweaks on the clean v8 ESM foundation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Handler Fix */}
            <section id="handler-fix" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Critical Handler Fix: allowISG: false in Layouts
              </h2>

              {/* 2.1 Context of the Bug */}
              <div id="bug-context" className="space-y-3 mt-6">
                <h3 className="text-lg font-bold">2.1 Context of the Bug in v7.3.0</h3>
                <p>
                  In Dinou, layouts can define static optimization policies via <code>layout_functions.ts</code> / <code>layout_functions.js</code>:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li><code>revalidate = false</code>: Complete static pre-rendering (SSG).</li>
                  <li><code>allowISG = false</code>: Prevents dynamic on-demand generation for paths that were not authorized by <code>getStaticPaths</code>.</li>
                </ul>

                <p>
                  In v7.3.0, the request handler (<code>dinou/core/handler.js</code>) executed an overly aggressive check:
                </p>
                <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`// ❌ Buggy condition in v7.3.0:
if (!isDevelopment && lConfig.allowISG === false) {
  return new Response("Not Found", { status: 404 });
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This caused <strong>any request to a route descending from a layout with <code>allowISG: false</code> to return an immediate 404</strong>, even when the route was explicitly authorized in <code>getStaticPaths</code> and its pre-rendered <code>layout.rsc</code> payload was already present in <code>.dinou/dist2/</code>.
                </p>
              </div>

              {/* 2.2 The Fix in handler.js */}
              <div id="handler-code-fix" className="space-y-4 mt-8">
                <h3 className="text-lg font-bold">2.2 The Fix in handler.js (Exact Code Replacement)</h3>
                <p>
                  If you maintain an ejected project, open <code>./dinou/core/handler.js</code>. Locate the <code>if (isLayoutReq)</code> block (around line 1383) and replace the legacy 404 check with the comprehensive verification logic below:
                </p>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <span>❌ Code in Dinou v7.3.0 (Lines to replace):</span>
                  </div>
                  <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`if (isLayoutReq) {
  if (layouts && Array.isArray(layouts)) {
    for (const [lPath, lParams] of layouts) {
      const lConfig = await resolveLayoutFunctionsConfig(lPath, lParams);
      if (!isDevelopment && lConfig.allowISG === false) {
        return new Response("Not Found", { status: 404 });
      }
      if (lConfig.validateParams) {
        const isValid = await lConfig.validateParams(lParams);
        if (!isValid) {
          isPathBlocked = true;
          break;
        }
      }
    }
  } else {
    if (!layoutConfig) {
      layoutConfig = await resolveLayoutFunctionsConfig(layoutPath, layoutParams);
    }
    if (!isDevelopment && layoutConfig.allowISG === false) {
      return new Response("Not Found", { status: 404 });
    }
    if (layoutConfig.validateParams) {
      const isValid = await layoutConfig.validateParams(layoutParams);
      if (!isValid) {
        isPathBlocked = true;
      }
    }
  }
  if (isPathBlocked) {
    return new Response("Not Found", { status: 404 });
  }
} else if (!pageConfig) {
  pageConfig = await resolvePageFunctionsConfig(
    pagePath,
    reqSegments,
    queryObj,
    dynamicParams,
    reqPath,
  );
  isPathBlocked = pageConfig.isPathBlocked;
}`}
                  </CodeBlock>
                </div>

                <div className="space-y-2 mt-6">
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span>✅ Correct Code in Dinou v8.0.0 (Replacement):</span>
                  </div>
                  <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`if (isLayoutReq) {
  if (layouts && Array.isArray(layouts)) {
    for (const [lPath, lParams] of layouts) {
      const lConfig = await resolveLayoutFunctionsConfig(lPath, lParams);
      if (!isDevelopment && lConfig.allowISG === false) {
        let isPathAllowed = false;
        if (lConfig.staticPathsSet) {
          const sortedEntries = Object.entries(lParams || {})
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([k, v]) => {
              if (Array.isArray(v)) return [k, v.join(",")];
              return [k, String(v)];
            });
          const serializedQuery = JSON.stringify(sortedEntries);
          const singleVal = Object.values(lParams || {})[0];
          const singleValStr = Array.isArray(singleVal) ? singleVal.join(",") : String(singleVal);
          isPathAllowed = lConfig.staticPathsSet.has(serializedQuery) || lConfig.staticPathsSet.has(singleValStr);
        }
        if (!isPathAllowed) {
          const cleanReq = reqPath.replace(/^\\//, "").replace(/\\/$/, "");
          const rscPath = path.join(process.cwd(), ".dinou/dist2", cleanReq, "layout.rsc");
          if (!existsSync(rscPath)) {
            isPathBlocked = true;
            break;
          }
        }
      }
      if (lConfig.validateParams) {
        const isValid = await lConfig.validateParams(lParams);
        if (!isValid) {
          isPathBlocked = true;
          break;
        }
      }
    }
  } else {
    if (!layoutConfig) {
      layoutConfig = await resolveLayoutFunctionsConfig(layoutPath, layoutParams);
    }
    if (!isDevelopment && layoutConfig.allowISG === false) {
      let isPathAllowed = false;
      if (layoutConfig.staticPathsSet) {
        const sortedEntries = Object.entries(layoutParams || {})
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([k, v]) => {
            if (Array.isArray(v)) return [k, v.join(",")];
            return [k, String(v)];
          });
        const serializedQuery = JSON.stringify(sortedEntries);
        const singleVal = Object.values(layoutParams || {})[0];
        const singleValStr = Array.isArray(singleVal) ? singleVal.join(",") : String(singleVal);
        isPathAllowed = layoutConfig.staticPathsSet.has(serializedQuery) || layoutConfig.staticPathsSet.has(singleValStr);
      }
      if (!isPathAllowed) {
        const cleanReq = reqPath.replace(/^\\//, "").replace(/\\/$/, "");
        const rscPath = path.join(process.cwd(), ".dinou/dist2", cleanReq, "layout.rsc");
        if (!existsSync(rscPath)) {
          isPathBlocked = true;
        }
      }
    }
    if (layoutConfig.validateParams) {
      const isValid = await layoutConfig.validateParams(layoutParams);
      if (!isValid) {
        isPathBlocked = true;
      }
    }
  }
  if (isPathBlocked) {
    return new Response("Not Found", { status: 404 });
  }
} else if (!pageConfig) {
  pageConfig = await resolvePageFunctionsConfig(
    pagePath,
    reqSegments,
    queryObj,
    dynamicParams,
    reqPath,
  );
  isPathBlocked = pageConfig.isPathBlocked;
}`}
                  </CodeBlock>
                </div>

                <div className="rounded-xl border p-4 bg-emerald-500/10 border-emerald-500/20 not-prose space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>What This Fix Achieves</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    By checking <code>staticPathsSet</code> and verifying whether <code>layout.rsc</code> exists on disk, valid routes render smoothly through the entire <strong>SSR &rarr; Loading &rarr; Streaming &rarr; Client Hydration</strong> pipeline. Client Components invoking Server Functions inside static layouts resolve with 100% reliability.
                  </p>
                </div>
              </div>
            </section>

            {/* Note divider */}
            <div className="p-4 rounded-xl border bg-muted/30 not-prose my-12 text-xs text-muted-foreground space-y-1.5">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-blue-500" />
                Under the Hood: Technical Architecture in Dinou v8
              </span>
              <p>
                The following sections detail the internal refactorings implemented in the Dinou framework core for v8. <strong>They do not require any action from users</strong> and are documented here for architectural curiosity and technical reference.
              </p>
            </div>

            {/* Section 3: Under the Hood - ESM */}
            <section id="under-the-hood-esm" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Under the Hood: Pure ESM Architecture
              </h2>

              <p>
                Dinou v8 adopts pure ECMAScript Modules (<code>&quot;type&quot;: &quot;module&quot;</code>) natively across the entire framework repository, eliminating CommonJS artifacts and legacy bridge scripts.
              </p>

              {/* 3.1 Source Extensions */}
              <div id="source-extensions" className="space-y-3 mt-6">
                <h3 className="text-lg font-bold">3.1 Source Extensions Unification (.mjs &rarr; .js)</h3>
                <p>
                  All source files within the framework have been unified from <code>.mjs</code> to standard <code>.js</code>:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium text-xs">
                      <tr>
                        <th className="p-3">Dinou v7 (Legacy Path)</th>
                        <th className="p-3">Dinou v8 (Standard ESM)</th>
                        <th className="p-3">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-xs">
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/node/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/node/build.js</td>
                        <td className="p-3">Production bundler for Node.js orchestrator</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/cloudflare/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/cloudflare/build.js</td>
                        <td className="p-3">Production bundler for Cloudflare Workers</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/deno/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/deno/build.js</td>
                        <td className="p-3">Production bundler for Deno Deploy</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/bun/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/bun/build.js</td>
                        <td className="p-3">Production bundler for Bun runtime</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/esbuild/build.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/esbuild/build.js</td>
                        <td className="p-3">Client compiler for esbuild</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/core/export-static.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/core/export-static.js</td>
                        <td className="p-3">Static SSG export pipeline</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/adapters/node.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/adapters/node.js</td>
                        <td className="p-3">Node.js HTTP server adapter</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/index.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/index.js</td>
                        <td className="p-3">Unified framework entry point</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-muted-foreground">dinou/server.mjs</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">dinou/server.js</td>
                        <td className="p-3">Server utilities and on-demand revalidation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-muted-foreground">
                  <em>Deliberate Exception:</em> The compiled output file at <code>.dinou/node/server.mjs</code> deliberately retains <code>.mjs</code> so that Node and Bun execute it in ESM mode irrespective of the consumer project&apos;s setup.
                </p>
              </div>

              {/* 3.2 Exports Map */}
              <div id="exports-map" className="space-y-3 mt-8">
                <h3 className="text-lg font-bold">3.2 Modernized Exports Map</h3>
                <p>
                  All subpath exports resolve directly to ESM <code>.js</code> files without conditional CommonJS splits:
                </p>
                <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`"exports": {
  ".": {
    "types": "./dinou/index.d.ts",
    "import": "./dinou/index.js",
    "default": "./dinou/index.js"
  },
  "./env": {
    "types": "./dinou/env.d.ts"
  },
  "./server": {
    "types": "./dinou/server.d.ts",
    "import": "./dinou/server.js",
    "default": "./dinou/server.js"
  },
  "./config": {
    "types": "./dinou/index.d.ts",
    "import": "./dinou/core/config.js",
    "default": "./dinou/core/config.js"
  },
  "./adapters/node": "./dinou/adapters/node.js",
  "./adapters/bun": "./dinou/adapters/bun.js",
  "./adapters/deno": "./dinou/adapters/deno.js",
  "./adapters/cloudflare": "./dinou/adapters/cloudflare.js",
  "./adapters/netlify": "./dinou/adapters/netlify.js"
}`}
                </CodeBlock>
              </div>

              {/* 3.3 CLI & Ejector */}
              <div id="cli-eject" className="space-y-3 mt-8">
                <h3 className="text-lg font-bold">3.3 ESM CLI &amp; Modular Ejector</h3>
                <p>
                  <code>cli.js</code> utilizes static ESM imports (<code>import &#123; program &#125; from &quot;commander&quot;</code>). <code>eject.js</code> encapsulates its logic into an explicit export (<code>export function eject()</code>) called dynamically by the CLI when invoked.
                </p>
              </div>

              {/* 3.4 Config Cleanup */}
              <div id="config-cleanup" className="space-y-3 mt-8">
                <h3 className="text-lg font-bold">3.4 Canonical Config Resolution</h3>
                <p>
                  The legacy bridge file <code>dinou/config.js</code> has been removed. The sole canonical configuration source is <code>dinou/core/config.js</code>. Both <code>import &#123; defineConfig &#125; from &quot;dinou/config&quot;</code> and <code>import &#123; defineConfig &#125; from &quot;dinou&quot;</code> remain fully supported and typed.
                </p>
              </div>
            </section>

            {/* Section 4: Edge Renderer Singleton */}
            <section id="edge-renderer-singleton" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Under the Hood: Universal Edge Renderer Singleton
              </h2>
              <div className="space-y-3">
                <p>
                  In Node.js development mode, Dinou runs a <strong>0-Fork Dual-Bundle</strong> in-memory engine where both the RSC and SSR HTML engines run inside the same Node process.
                </p>
                <p>
                  Under pure ESM, dynamic resolution of <code>react-server-dom-webpack/server.edge</code> could create subtle context discrepancies during hot-reload recompilations. Dinou v8 solves this by importing the native edge renderer once at startup and caching it as a shared global singleton:
                </p>
                <CodeBlock language="javascript" containerClassName="w-full overflow-hidden rounded-lg">
{`import * as edgeRenderer from "react-server-dom-webpack/server.edge";
globalThis.__DINOU_EDGE_RENDERER__ = edgeRenderer;`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  The internal server bundle accesses the singleton instantly with zero latency, ensuring guaranteed single-context execution across Windows and Linux.
                </p>
              </div>
            </section>

            {/* Section 5: Verification Checklist */}
            <section id="verification-checklist" className="scroll-mt-20 mt-12">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Production Health &amp; Verification Checklist
              </h2>
              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Dinou v8 Verification Checklist</span>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Standard Upgrade:</strong> Run <code>npm install dinou@latest</code> (zero code changes needed).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Ejected Layout Fix:</strong> If ejected and maintaining custom core changes, verify <code>handler.js</code> has the <code>staticPathsSet</code> &amp; <code>layout.rsc</code> check.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Optional ESM:</strong> Add <code>&quot;type&quot;: &quot;module&quot;</code> to your <code>package.json</code> and use <code>dinou.config.js</code> or <code>.ts</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Local Validation:</strong> Run <code>npm run build:node &amp;&amp; npm run start:node</code> to verify compilation and production server startup.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </main>

      {/* Sidebar TOC */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
