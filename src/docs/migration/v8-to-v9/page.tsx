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
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Sparkles,
  CheckCircle2,
  Zap,
  RefreshCw,
  ShieldCheck,
  Layers,
  Terminal,
  FileCode,
  Boxes,
  Cpu,
  Globe,
  ArrowRight,
  Lock,
  Check,
  X,
  Sliders,
  Server,
} from "lucide-react";
import { Link } from "dinou";

const tocItems = [
  { id: "user-upgrade-implications", title: "1. Upgrade Implications: Zero Code Changes", level: 2 },
  { id: "standard-upgrade-steps", title: "1.1 Upgrading Your Dependencies", level: 3 },
  { id: "zero-breaking-changes", title: "1.2 100% Backwards Compatibility", level: 3 },
  { id: "what-is-v9", title: "2. What's New: Dual-Mode Additive Vendoring", level: 2 },
  { id: "problems-solved", title: "2.1 Solved: Cold Starts, FS Overhead & Drift", level: 3 },
  { id: "subpath-imports", title: "2.2 Native Node.js Subpath Imports (#...)", level: 3 },
  { id: "dual-mode-usage", title: "3. How to Use Dinou v9: The Two Modes", level: 2 },
  { id: "vendorized-mode", title: "3.1 Default Mode: Pre-Compiled Fast Vendors", level: 3 },
  { id: "unvendorized-mode", title: "3.2 Unvendorized Mode (-u / --unvendorized)", level: 3 },
  { id: "ci-env-vars", title: "3.3 Environment Variable (DINOU_UNVENDORIZED)", level: 3 },
  { id: "ejected-apps", title: "4. Ejected Applications: build:vendors Script", level: 2 },
  { id: "vendor-catalog", title: "5. Vendor Catalog: Compiled Tools vs. Exceptions", level: 2 },
  { id: "quick-reference", title: "6. Quick Reference & Verification Checklist", level: 2 },
];

export default function MigrationV8ToV9Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Migration from v8 to v9 | Dinou Docs</title>
      <meta
        name="description"
        content="Migrating from Dinou v8 to v9 is 100% transparent with zero code changes required. Complete guide to the new Dual-Mode Additive Vendoring system, instant cold starts, and unvendorized debugging with -u."
      />
      <link rel="canonical" href="https://dinou.dev/docs/migration/v8-to-v9" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Transparent Upgrade
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                v8 &rarr; v9
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migration from v8 to v9
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Upgrading from Dinou v8 to v9 is <strong>100% transparent and requires zero application code changes</strong>. Dinou v9 introduces a high-performance <strong>Dual-Mode Additive Vendoring System</strong> powered by native Node.js Subpath Imports (<code>#...</code>), bringing instant cold starts, zero dependency drift, and on-demand unvendorized debugging.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: User Upgrade Implications */}
            <section id="user-upgrade-implications" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Upgrade Implications: Zero Code Changes Required
              </h2>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 p-5 not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-base">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>100% Backwards Compatible: Zero Code Changes</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As an application developer, <strong>you do not need to rewrite, refactor, or adjust a single line of code</strong>. All route contracts, Server Components (RSC), Flight RPC Server Functions, CSS modules, Tailwind styling, and multi-bundler builds operate identically to v8.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Routes &amp; Layouts (page.tsx, layout.tsx)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Data Contracts (page_functions, layout_functions)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Server Functions (&quot;use server&quot;, forms, closures)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Client Components (&quot;use client&quot; hooks)</span>
                  </div>
                </div>
              </div>

              {/* 1.1 Standard Upgrade Steps */}
              <div id="standard-upgrade-steps" className="space-y-4 mt-6">
                <h3 className="text-lg font-bold">1.1 Upgrading Your Dependencies</h3>
                <p>
                  To upgrade any standard Dinou project, simply update the <code>dinou</code> package to <code>^9.0.0</code>:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="npm"
                    tabs={[
                      {
                        id: "npm",
                        label: "npm",
                        language: "bash",
                        code: "npm install dinou@latest",
                      },
                      {
                        id: "bun",
                        label: "bun",
                        language: "bash",
                        code: "bun add dinou@latest",
                      },
                      {
                        id: "pnpm",
                        label: "pnpm",
                        language: "bash",
                        code: "pnpm add dinou@latest",
                      },
                      {
                        id: "yarn",
                        label: "yarn",
                        language: "bash",
                        code: "yarn add dinou@latest",
                      },
                    ]}
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  Your <code>package.json</code> will reflect the new major version (note that Dinou v9 requires <code>react</code> and <code>react-dom</code> at version <strong>19.3.1</strong> or higher):
                </p>

                <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`{
  "name": "my-dinou-app",
  "type": "module",
  "dependencies": {
    "dinou": "^9.0.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  }
}`}
                </CodeBlock>
              </div>

              {/* 1.2 Backwards Compatibility */}
              <div id="zero-breaking-changes" className="space-y-4 mt-6">
                <h3 className="text-lg font-bold">1.2 100% Backwards Compatibility</h3>
                <p>
                  Every feature from Dinou v8 is fully preserved in v9 with zero deprecations:
                </p>

                <div className="border rounded-lg overflow-x-auto bg-background not-prose">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/40 font-semibold text-foreground">
                        <th className="p-3">Framework Feature</th>
                        <th className="p-3">Dinou v8 Status</th>
                        <th className="p-3">Dinou v9 Status</th>
                        <th className="p-3">Action Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="p-3 font-medium text-foreground">Route Signatures (page.tsx / layout.tsx)</td>
                        <td className="p-3">Supported</td>
                        <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">Identical</td>
                        <td className="p-3">None</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Data Contracts (page_functions.ts)</td>
                        <td className="p-3">Supported</td>
                        <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">Identical</td>
                        <td className="p-3">None</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Server Functions (Module &amp; Function Level)</td>
                        <td className="p-3">Supported (v8.1)</td>
                        <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">Identical</td>
                        <td className="p-3">None</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Multi-Engine Bundlers (esbuild, Rollup, Webpack)</td>
                        <td className="p-3">Supported</td>
                        <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">Accelerated</td>
                        <td className="p-3">None</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Universal Deployment (Node, Bun, Deno, Cloudflare)</td>
                        <td className="p-3">Supported</td>
                        <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">Identical</td>
                        <td className="p-3">None</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 2: What's New */}
            <section id="what-is-v9" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. What&apos;s New: Dual-Mode Additive Vendoring
              </h2>
              <p>
                Although application code remains 100% unchanged, Dinou v9 completely overhauls how internal build dependencies and compiler plugins are loaded and executed.
              </p>

              {/* 2.1 Problems Solved */}
              <div id="problems-solved" className="space-y-4 mt-6">
                <h3 className="text-lg font-bold">2.1 Solved: Cold Starts, FS Overhead &amp; Dependency Drift</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-4 min-w-0">
                  <Card className="border-blue-500/20 bg-blue-50/10 dark:bg-blue-950/10 min-w-0">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400 text-sm">
                        <Zap className="h-4 w-4" />
                        <span>Instant Cold Starts</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed">
                      Eliminates scanning and parsing thousands of small files across deep <code>node_modules</code> directories during framework startup.
                    </CardContent>
                  </Card>

                  <Card className="border-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/10 min-w-0">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Zero Upstream Drift</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed">
                      Guarantees identical, deterministic behavior across machines and CI runners without subtle bugs caused by transitive dependency updates.
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20 bg-purple-50/10 dark:bg-purple-950/10 min-w-0">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 text-sm">
                        <Boxes className="h-4 w-4" />
                        <span>Seamless ESM Interop</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed">
                      Pre-compiled, standalone ESM modules eliminate costly runtime CommonJS bridges and dynamic require shims.
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 2.2 Subpath Imports */}
              <div id="subpath-imports" className="space-y-4 mt-6">
                <h3 className="text-lg font-bold">2.2 Native Node.js Subpath Imports (<code>#...</code>)</h3>
                <p>
                  Rather than using ad-hoc file aliases or complex module linkers, Dinou v9 implements the native Node.js <strong>Subpath Imports</strong> standard. In Dinou&apos;s internal configuration, dependencies are mapped with conditional resolution:
                </p>

                <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`{
  "imports": {
    "#babel/core": {
      "unvendorized": "@babel/core",
      "default": "./compiled/babel-core/index.js"
    },
    "#postcss": {
      "unvendorized": "postcss",
      "default": "./compiled/postcss/index.js"
    },
    "#chokidar": {
      "unvendorized": "chokidar",
      "default": "./compiled/chokidar/index.js"
    }
  }
}`}
                </CodeBlock>

                <div className="p-4 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground space-y-1.5 not-prose">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>The Additive Principle</span>
                  </div>
                  <p className="leading-relaxed">
                    Vendoring in Dinou v9 is strictly <strong>additive and non-destructive</strong>: all 36 vendorized dependencies remain declared in <code>package.json</code> and installed in <code>node_modules</code>. If you ever need to inspect or patch an upstream library, you can switch off vendoring on-demand with a single flag.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Dual-Mode Usage */}
            <section id="dual-mode-usage" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. How to Use Dinou v9: The Two Modes
              </h2>
              <p>
                Dinou provides two execution modes that require no complex configuration:
              </p>

              {/* 3.1 Vendorized Mode */}
              <div id="vendorized-mode" className="space-y-4 mt-6">
                <h3 className="text-lg font-bold">3.1 Default Mode: Pre-Compiled Fast Vendors</h3>
                <p>
                  When you develop or build your application normally:
                </p>
                <CodeBlock language="bash" containerClassName="w-full overflow-hidden rounded-lg">
{`# Starts the development server in default vendorized mode
npm run dev

# Compiles for production using pre-bundled vendors
npm run build`}
                </CodeBlock>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dinou runs in <strong>Vendorized Mode</strong> by default. All 36 internal compiler and bundler utilities resolve directly to optimized bundles in <code>dinou/compiled/</code>, providing instant startup times with zero configuration.
                </p>
              </div>

              {/* 3.2 Unvendorized Mode */}
              <div id="unvendorized-mode" className="space-y-4 mt-8">
                <h3 className="text-lg font-bold">3.2 Unvendorized Mode (<code>-u</code> / <code>--unvendorized</code>)</h3>
                <p>
                  If you need to debug an upstream library in <code>node_modules</code>, test a patch, or inspect raw dependencies, Dinou provides a single, uniform opt-out mechanism: the <strong><code>-u</code></strong> flag.
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="npm-run"
                    tabs={[
                      {
                        id: "npm-run",
                        label: "npm run (argument forwarding)",
                        language: "bash",
                        code: `# Forward the -u flag to the development script
npm run dev -- -u

# Build using unvendorized node_modules packages
npm run build:node:esbuild -- -u

# Run production server in unvendorized mode
npm start -- -u`,
                      },
                      {
                        id: "cli",
                        label: "npx dinou (direct CLI)",
                        language: "bash",
                        code: `# Development server with -u
npx dinou dev -u

# Production build with -u
npx dinou build:node:esbuild -u`,
                      },
                    ]}
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground space-y-1.5 not-prose">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-blue-500" />
                    <span>Transparent Execution via <code>ensureVendorMode</code></span>
                  </div>
                  <p className="leading-relaxed">
                    You do not need to memorize verbose Node.js flags like <code>--conditions=unvendorized</code>. Dinou&apos;s runtime hook transparently intercepts the <code>-u</code> flag, spawns a child process with Node&apos;s native conditional resolution, pipes stdio, and forwards process signals automatically.
                  </p>
                </div>
              </div>

              {/* 3.3 CI & Environment Variables */}
              <div id="ci-env-vars" className="space-y-4 mt-8">
                <h3 className="text-lg font-bold">3.3 Environment Variable (<code>DINOU_UNVENDORIZED</code>)</h3>
                <p>
                  For CI/CD pipelines, Docker environments, or terminal sessions where passing CLI arguments is inconvenient, set the environment variable:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="bash"
                    tabs={[
                      {
                        id: "bash",
                        label: "Bash / macOS / Linux",
                        language: "bash",
                        code: `export DINOU_UNVENDORIZED=true
npm run build`,
                      },
                      {
                        id: "powershell",
                        label: "Windows PowerShell",
                        language: "powershell",
                        code: `$env:DINOU_UNVENDORIZED="true"
npm run build`,
                      },
                      {
                        id: "cross-env",
                        label: "cross-env (inline)",
                        language: "bash",
                        code: "npx cross-env DINOU_UNVENDORIZED=true npm run build",
                      },
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Ejected Applications */}
            <section id="ejected-apps" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Ejected Applications: The <code>build:vendors</code> Script
              </h2>
              <p>
                In Dinou, developers can eject their application at any time with <code>dinou eject</code> to gain direct, unrestricted access to the framework source code in <code>./dinou</code>.
              </p>

              <p>
                In an ejected Dinou v9 application:
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
                <li>Pre-compiled vendor modules are located in <code>./dinou/compiled/</code>.</li>
                <li>Your root <code>package.json</code> automatically includes the maintenance script:</li>
              </ul>

              <CodeBlock language="json" containerClassName="w-full overflow-hidden rounded-lg">
{`"scripts": {
  "build:vendors": "node dinou/scripts/build-vendors.js"
}`}
              </CodeBlock>

              <div className="p-4 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground space-y-2 not-prose my-4">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4 text-emerald-500" />
                  <span>When Should You Run <code>npm run build:vendors</code>?</span>
                </div>
                <p className="leading-relaxed">
                  If you update a framework dependency in your root <code>package.json</code> (for instance, bumping <code>@babel/core</code> or <code>postcss</code> to a new patch release):
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Your app will automatically use the updated package from <code>node_modules</code> whenever running with <code>-u</code>.</li>
                  <li>To also update the <strong>default vendorized cache</strong> (<code>./dinou/compiled/</code>) to the new version, simply run <code>npm run build:vendors</code>.</li>
                  <li>In ~5 seconds, all 36 vendor bundles are recompiled with full ESM interop wrappers and <code>vendors-manifest.json</code> is updated.</li>
                </ol>
              </div>
            </section>

            {/* Section 5: Vendor Catalog */}
            <section id="vendor-catalog" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Vendor Catalog: Compiled Tools vs. External Exceptions
              </h2>
              <p>
                Dinou implements a strict architectural separation between packages that benefit from pre-compilation and dependencies that must remain external:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6 min-w-0">
                <Card className="border-blue-500/20 bg-blue-50/10 dark:bg-blue-950/10 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Boxes className="h-5 w-5" />
                      <span>36 Compiled Packages (in dinou/compiled/)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p className="font-medium text-foreground">Pre-bundled into standalone ESM:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Babel AST Toolchain:</strong> <code>@babel/core</code>, <code>@babel/parser</code>, <code>@babel/traverse</code>, <code>@babel/generator</code>, <code>@babel/types</code>, <code>@babel/template</code>, <code>babel-plugin-react-compiler</code></li>
                      <li><strong>Rollup Plugins:</strong> <code>@rollup/plugin-babel</code>, <code>commonjs</code>, <code>node-resolve</code>, <code>replace</code>, <code>json</code></li>
                      <li><strong>Webpack Loaders:</strong> <code>babel-loader</code>, <code>css-loader</code>, <code>mini-css-extract-plugin</code>, <code>copy-webpack-plugin</code>, <code>terser-webpack-plugin</code></li>
                      <li><strong>CSS &amp; Styling:</strong> <code>postcss</code>, <code>autoprefixer</code>, <code>@tailwindcss/postcss</code>, <code>postcss-modules-*</code></li>
                      <li><strong>Utilities:</strong> <code>chokidar</code>, <code>commander</code>, <code>dotenv</code>, <code>picocolors</code>, <code>ws</code></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-50/10 dark:bg-amber-950/10 min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                      <Lock className="h-5 w-5" />
                      <span>External Exceptions (Never Vendorized)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p className="font-medium text-foreground">Kept strictly in standard node_modules:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Native Platform Binaries:</strong> <code>esbuild</code> (Go executable) and <code>@swc/core</code> (native Node-API <code>.node</code> binary bindings). Pre-compiling native platform binaries breaks architecture-specific resolution.</li>
                      <li><strong>React Singletons:</strong> <code>react</code>, <code>react-dom</code>, and <code>@roggc/react-server-dom-esm</code> must share an identical instance across client and server.</li>
                      <li><strong>Core Bundler Engines:</strong> <code>webpack</code> and <code>rollup</code> orchestrate dynamic user configurations and plugins at build time.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 6: Quick Reference */}
            <section id="quick-reference" className="mt-12 pt-8 border-t scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Quick Reference &amp; Verification Checklist
              </h2>

              <div className="border rounded-lg overflow-x-auto bg-background not-prose my-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/40 font-semibold text-foreground">
                      <th className="p-3">Scenario / Workflow</th>
                      <th className="p-3">Command</th>
                      <th className="p-3">Active Resolution Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted-foreground">
                    <tr>
                      <td className="p-3 font-medium text-foreground">Standard development</td>
                      <td className="p-3 font-mono text-[11px]">npm run dev</td>
                      <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">Vendorized Mode (Default, fast)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Standard production build</td>
                      <td className="p-3 font-mono text-[11px]">npm run build</td>
                      <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">Vendorized Mode (Default, fast)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Debug upstream packages</td>
                      <td className="p-3 font-mono text-[11px]">npm run dev -- -u</td>
                      <td className="p-3 font-medium text-blue-600 dark:text-blue-400">Unvendorized Mode (node_modules)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Build with raw dependencies</td>
                      <td className="p-3 font-mono text-[11px]">npm run build -- -u</td>
                      <td className="p-3 font-medium text-blue-600 dark:text-blue-400">Unvendorized Mode (node_modules)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Recompile local vendors (ejected)</td>
                      <td className="p-3 font-mono text-[11px]">npm run build:vendors</td>
                      <td className="p-3">Regenerates ./dinou/compiled/</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-border p-4 bg-muted/20 text-xs text-muted-foreground space-y-2 not-prose my-6">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Dinou v9 Verification Checklist</span>
                </div>
                <ul className="space-y-1 list-disc pl-4">
                  <li>Updated <code>&quot;dinou&quot;: &quot;^9.0.0&quot;</code> in <code>package.json</code> and ran <code>npm install</code>.</li>
                  <li>Confirmed <code>npm run dev</code> boots cleanly in default vendorized mode.</li>
                  <li>(Optional) Tested <code>npm run dev -- -u</code> to confirm unvendorized fallback operates as expected.</li>
                  <li>Confirmed production build succeeds: <code>npm run build</code>.</li>
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
