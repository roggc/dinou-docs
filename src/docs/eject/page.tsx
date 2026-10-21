import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Download,
  Hammer,
  Sparkles,
  Terminal,
  FolderTree,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Code,
  RefreshCw,
  FileCode2,
  Layers,
  Settings,
  Server,
  Cloud,
  RotateCcw,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Badge } from "@/docs/components/ui/badge";

const tocItems = [
  { id: "eject-dinou", title: "Ejecting Dinou: Framework Sovereignty", level: 2 },
  { id: "how-to-eject", title: "How to Eject (CLI & Scripts)", level: 2 },
  { id: "what-happens", title: "What Happens When You Eject?", level: 2 },
  { id: "directory-anatomy", title: "Anatomy of the Ejected dinou/ Directory", level: 2 },
  { id: "when-to-eject", title: "When to Consider Ejecting", level: 2 },
  { id: "agentic-era", title: "Ejection in the Agentic Era", level: 2 },
  { id: "customization-examples", title: "Practical Customization Examples", level: 2 },
  { id: "custom-middleware", title: "1. Adding Custom Server Middleware", level: 3 },
  { id: "custom-bundler", title: "2. Extending the Bundler Pipeline", level: 3 },
  { id: "reverting-eject", title: "Reverting an Eject (100% Reversible)", level: 2 },
  { id: "best-practices", title: "Best Practices for Ejected Projects", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Eject Dinou | Dinou Docs</title>
      <meta
        name="description"
        content="Gain complete ownership over your technology stack. Eject Dinou to unpack the entire dual-engine React 19 compiler and server runtime logic."
      />
      <link rel="canonical" href="https://dinou.dev/docs/eject" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Framework Sovereignty
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Eject Dinou
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Gain complete ownership over your technology stack. Eject Dinou to unpack the entire dual-engine React 19 compiler, runtime adapters, and server runtime logic directly into your repository.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview & Philosophy */}
            <section id="eject-dinou">
              <h2>Ejecting Dinou: Framework Sovereignty</h2>
              <p>
                In most modern web frameworks, the server runtime, bundling logic, and React Server Component compiler are hidden behind opaque <code>node_modules</code> dependencies. If you encounter an edge-case bug, need a bespoke compilation transform, or want to deploy to an unsupported infrastructure, you are forced to wait for upstream releases or battle monkey-patching hacks.
              </p>
              <div className="rounded-xl border p-4 bg-card not-prose space-y-2 my-6">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>100% Configurable &amp; Hackable</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ejecting extracts the entire framework into a <code>dinou/</code> folder at the root of your project, making your tech stack 100% configurable and hackable—while continuing to work seamlessly out of the box.
                </p>
              </div>
            </section>

            {/* How to Eject */}
            <section id="how-to-eject" className="mt-12">
              <h2>How to Eject (CLI &amp; Scripts)</h2>
              <p>
                You can eject Dinou at any point in your project lifecycle with a single command:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`# Using the Dinou CLI directly
npx dinou eject

# Or using an npm script (if defined in your package.json)
npm run eject`}
              </CodeBlock>
              <p className="text-xs text-muted-foreground mt-2">
                Ejection is instantaneous and leaves your existing application code in <code>src/</code> completely untouched.
              </p>
            </section>

            {/* What Happens When You Eject */}
            <section id="what-happens" className="mt-12">
              <h2>What Happens When You Eject?</h2>
              <p>
                When you execute <code>dinou eject</code>, the framework performs four automated steps:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose space-y-4 my-4">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Framework Source Extraction</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Copies the complete, production-grade Dinou engine into a local <code>dinou/</code> folder at the root of your project. This includes the universal HTTP handler, the RSC streaming engine, SSR HTML renderer, all three bundlers (esbuild, Rollup, Webpack), and all platform adapters.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Direct Script Re-routing</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Updates your <code>package.json</code> scripts so they point directly to your local files (e.g. <code>node dinou/node/dev.js</code> and <code>node dinou/node/build.js</code>) instead of opaque global CLI binary shims.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Automatic Ejected Mode Detection (<code>isEjected</code>)</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      All bundler configurations automatically check for the existence of the local <code>dinou/</code> directory. When detected, imports like <code>import &#123; Link &#125; from &quot;dinou&quot;</code> resolve directly to your local <code>./dinou</code> code rather than <code>node_modules/dinou</code>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Zero Application Disruption</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Your application components, pages, layouts, API routes, and styles in <code>src/</code> remain 100% identical. Your app boots and builds immediately with zero regressions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Anatomy of Ejected Directory */}
            <section id="directory-anatomy" className="mt-12">
              <h2>Anatomy of the Ejected dinou/ Directory</h2>
              <p>
                Once ejected, your project root contains a clean, well-organized <code>dinou/</code> folder:
              </p>

              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`dinou/
├── core/                           # Universal Framework Engine
│   ├── handler.js                  # Web Standards HTTP request pipeline
│   ├── rsc-renderer.js             # React 19 Server Components wire-format serializer
│   ├── render-html.js              # Server-Side Rendering (SSR) HTML streaming
│   ├── get-file-path-and-dynamic-params.js  # File-system router & param extractor
│   ├── slot.js                     # Parallel routes (@slot) & layout resolution
│   ├── storage-adapter.js          # Multi-backend ISR & KV caching abstraction
│   ├── generate-static.js          # SSG pre-generation & static export
│   └── revalidating.js             # Background ISR revalidator & cache purger
│
├── adapters/                       # Deployment Runtime Adapters
│   ├── node.js                     # Standalone Node.js HTTP server (Docker, VPS)
│   ├── bun.js                      # High-speed Bun runtime adapter
│   ├── deno.js                     # Multi-region Deno & Deno Deploy (deno-edge) adapter
│   ├── cloudflare.js               # Cloudflare Workers & Pages edge worker
│   └── netlify.js                  # Netlify Functions v2 serverless adapter
│
├── esbuild/                        # esbuild compilation & dev configurations
│   ├── build.js                    # Dual-bundle production build pipeline
│   └── dev.js                      # Client-side bundle orchestrator
│
├── rollup/                         # Rollup production bundler setup
│   └── rollup.config.js            # Dual-bundle Tree-shaking pipeline
│
├── webpack/                        # Webpack bundler setup
│   └── webpack.config.js           # Enterprise-grade Webpack 5 pipeline
│
└── node/                           # Node.js development & build scripts
    ├── dev.js                      # Multi-engine development server & HMR
    └── build.js                    # Production bundle compiler`}
              </CodeBlock>

              <div className="mt-4 p-4 rounded-xl border bg-card not-prose flex items-start gap-3">
                <FolderTree className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Eject and explore with your AI agent:</strong> Every module inside the <code>dinou/</code> directory is clean, standard JavaScript written with native Web Standards. Have your AI coding assistant (like Gemini Antigravity, Cursor, or Claude) explore the architecture, explain execution flows, or implement custom runtime features directly in your repo.
                </div>
              </div>
            </section>

            {/* When to Eject */}
            <section id="when-to-eject" className="mt-12">
              <h2>When to Consider Ejecting</h2>
              <p>
                Ejection is not required for typical applications; Dinou out of the box provides multi-bundler compilation, edge adapters, and plugin support. However, ejecting is invaluable when you need:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Layers className="h-4 w-4 text-emerald-500" />
                    <span>Custom Compilers &amp; Assets</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Add support for custom file types, specialized loaders (SVGs, WebAssembly, 3D models), or custom bundler plugins directly into <code>dinou/esbuild/</code>, <code>dinou/rollup/</code>, or <code>dinou/webpack/</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Server className="h-4 w-4 text-amber-500" />
                    <span>Server Logic Control</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Inspect and customize how HTTP requests are handled, add low-level metrics, or modify streaming responses directly in <code>dinou/core/handler.js</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Cloud className="h-4 w-4 text-emerald-500" />
                    <span>Run on Any Platform</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Deploy Dinou anywhere—from Electron and Tauri desktop apps to custom AWS Lambda microVMs—by creating a custom runtime adapter in <code>dinou/adapters/</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Hammer className="h-4 w-4 text-amber-500" />
                    <span>Transparent Error Diagnosis</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Stack traces point directly to readable source files in your repo instead of minified <code>node_modules</code>. You and your AI agent can inspect the exact code that failed and fix it immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* Ejection in the Agentic Era */}
            <section id="agentic-era" className="mt-12">
              <h2>Ejection in the Agentic Era</h2>
              <p>
                In the era of autonomous coding agents (such as <strong>Gemini Antigravity</strong>, <strong>Claude Code</strong>, <strong>Cursor</strong>, and <strong>Copilot</strong>), framework ejection transitions from a legacy last resort to a <strong>core architectural advantage</strong>.
              </p>

              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-5 bg-card not-prose space-y-4 my-6">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                  <span>Unlocking End-to-End Agent Autonomy</span>
                </div>
                <div className="text-xs leading-relaxed text-muted-foreground space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Breaking the node_modules Boundary:</strong> Autonomous agents only have read/write access within your repository boundaries. In closed frameworks, agents hit a hard wall whenever a requirement involves server internals, bundling pipelines, or runtime flags. Ejecting places your entire stack inside the agent&apos;s actionable workspace.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Grounded Reasoning, Zero Hallucinations:</strong> Instead of guessing how a proprietary, black-box framework routes requests or serializes state under the hood, your agent reads clean, readable Web Standards source code. Transparent files eliminate LLM hallucinations and enable surgical, confident refactoring.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Autonomous End-to-End Problem Solving:</strong> Your AI partner can evolve the framework alongside your application—adapting streaming pipelines, crafting custom caching layers, or writing new runtime adapters on the fly without waiting for upstream releases.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Customization Examples */}
            <section id="customization-examples" className="mt-12">
              <h2>Practical Customization Examples</h2>
              <p>
                Here are two common ways teams customize their ejected Dinou framework:
              </p>

              {/* Example 1 */}
              <section id="custom-middleware" className="my-6">
                <h3>1. Adding Custom Server Middleware &amp; Guards</h3>
                <p>
                  To intercept incoming traffic, inject custom healthchecks, or authenticate protected routes before waking up React, simply edit <code>handleRequest</code> in <code>dinou/core/handler.js</code>:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou/core/handler.js
export async function handleRequest(request, platformContext = {}) {
  const url = new URL(request.url);

  // 1. Instant zero-compute healthcheck without invoking React
  if (url.pathname === "/healthz") {
    return Response.json({ status: "ok", uptime: process.uptime() });
  }

  // 2. Pre-flight authentication guard before React Server Components run
  if (url.pathname.startsWith("/admin")) {
    const token = request.headers.get("x-admin-token");
    if (!token || token !== process.env.ADMIN_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  // ...continue standard Dinou routing, ISR caching, and RSC/SSR streaming
}`}
                </CodeBlock>
              </section>

              {/* Example 2 */}
              <section id="custom-bundler" className="my-6">
                <h3>2. Extending the Bundler Pipeline</h3>
                <p>
                  To add a custom esbuild plugin (such as a specialized SVG compiler or asset loader), edit <code>dinou/esbuild/build.js</code>:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou/esbuild/build.js
import { myCustomPlugin } from "./plugins/my-plugin.js";

// ...after collecting entryPoints:
const buildConfig = getConfigEsbuildProd({
  entryPoints,
  manifest,
  outdir,
});

// Inject your custom plugin into the production build pipeline:
buildConfig.plugins.push(myCustomPlugin());

await esbuild.build(buildConfig);`}
                </CodeBlock>
              </section>
            </section>

            {/* Reverting an Eject */}
            <section id="reverting-eject" className="mt-12">
              <h2>Reverting an Eject (100% Reversible)</h2>
              <p>
                In many traditional frameworks, ejecting is an irreversible one-way door. In Dinou, <strong>reverting an eject is completely possible at any time</strong>.
              </p>
              <p>
                Because Dinou keeps your application code (pages, components, layouts, and server functions) strictly isolated inside <code>src/</code>, returning to the upstream managed package takes only three quick steps:
              </p>

              <div className="border rounded-xl p-5 bg-card not-prose space-y-4 my-6">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-semibold text-foreground">Restore package.json Scripts</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Change the scripts in your <code>package.json</code> back to the original Dinou scripts:
                    </p>
                    <CodeBlock
                      language="json"
                      containerClassName="w-full overflow-hidden rounded-lg"
                    >
{`"scripts": {
  "dev": "dinou dev",
  "build": "dinou build",
  "start": "dinou start"
}`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-semibold text-foreground">Reinstall the Dinou Package</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Ensure <code>dinou</code> is installed as a regular dependency:
                    </p>
                    <CodeBlock
                      language="bash"
                      containerClassName="w-full overflow-hidden rounded-lg"
                    >
{`npm install dinou@latest`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-semibold text-foreground">Remove the Local dinou/ Folder</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Delete or archive the local <code>dinou/</code> folder from your project root:
                    </p>
                    <CodeBlock
                      language="bash"
                      containerClassName="w-full overflow-hidden rounded-lg"
                    >
{`rm -rf dinou`}
                    </CodeBlock>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Once the <code>dinou/</code> folder is removed, the bundler automatically disables <code>isEjected</code> mode and resolves all <code>dinou</code> imports directly from <code>node_modules/dinou</code>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 not-prose flex items-start gap-3 my-6">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    True Zero Lock-In &amp; Framework Sovereignty
                  </p>
                  <p>
                    You can eject at will to inspect an internal flow, benchmark custom compiler tweaks, or explore the runtime with your AI coding agent, and then revert back to the upstream release whenever you choose. You never risk getting trapped in a dead-end fork.
                  </p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mt-12">
              <h2>Best Practices for Ejected Projects</h2>
              <div className="border rounded-xl p-5 bg-card not-prose my-6 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Ejected Project Recommendations</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Commit <code>dinou/</code> to Git:</strong> Treat your ejected <code>dinou/</code> directory as first-class source code in your repository so your entire team shares identical build and runtime logic.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Keep Edits Modular:</strong> When adding custom features, create dedicated files (such as <code>dinou/core/my-feature.js</code>) rather than stuffing thousands of lines into single files.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Validate Across Bundlers:</strong> If your project uses multiple bundlers, test that your modifications work cleanly in your target bundler (e.g. <code>npm run build:node:esbuild</code>).</span>
                  </li>
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
