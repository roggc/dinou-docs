"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Download,
  Hammer,
  AlertTriangle,
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
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { Link } from "dinou";

const tocItems = [
  { id: "eject-dinou", title: "Ejecting Dinou: Framework Sovereignty", level: 2 },
  { id: "how-to-eject", title: "How to Eject (CLI & Scripts)", level: 2 },
  { id: "what-happens", title: "What Happens When You Eject?", level: 2 },
  { id: "directory-anatomy", title: "Anatomy of the Ejected dinou/ Directory", level: 2 },
  { id: "when-to-eject", title: "When to Consider Ejecting", level: 2 },
  { id: "ai-era", title: "Ejection in the AI Era (Vibe-Coding)", level: 2 },
  { id: "customization-examples", title: "Practical Customization Examples", level: 2 },
  { id: "custom-middleware", title: "1. Adding Custom Server Middleware", level: 3 },
  { id: "custom-bundler", title: "2. Extending the Bundler Pipeline", level: 3 },
  { id: "best-practices", title: "Best Practices for Ejected Projects", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Eject Dinou
              </h1>
              <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                100% Hackable
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Gain complete ownership over your technology stack. Eject Dinou to unpack the entire dual-engine React 19 compiler, runtime adapters, and server pipelines directly into your repository.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview & Philosophy */}
            <section id="eject-dinou">
              <h2>Ejecting Dinou: Framework Sovereignty</h2>
              <p>
                In most modern web frameworks, the server runtime, bundling logic, and React Server Component compiler are hidden behind opaque <code>node_modules</code> dependencies. If you encounter an edge-case bug, need a bespoke compilation transform, or want to deploy to an unsupported infrastructure, you are forced to wait for upstream releases or battle monkey-patching hacks.
              </p>
              <p>
                <strong>Dinou is designed with Framework Sovereignty as a fundamental principle</strong>:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <Card className="border-red-500/20 bg-red-50/30 dark:bg-red-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Legacy Eject (e.g. Create React App)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Dumps thousands of lines of unmaintainable, monolithic configuration scripts into your project root. Breaks future upgrade paths and saddles your team with technical debt.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Dinou v7 Eject</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Extracts a clean, modular, and elegant architecture into a local <code>dinou/</code> directory. Clean ES modules, readable Web Standards code, and zero black-box magic.
                  </CardContent>
                </Card>
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
                  <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Direct Script Re-routing</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Updates your <code>package.json</code> scripts so they point directly to your local files (e.g. <code>node dinou/node/dev.mjs</code> and <code>node dinou/node/build.mjs</code>) instead of opaque global CLI binary shims.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
│   ├── node.mjs                    # Standalone Node.js HTTP server (Docker, VPS)
│   ├── bun.js                      # High-speed Bun runtime adapter
│   ├── deno.js                     # Multi-region Deno & Deno Deploy (deno-edge) adapter
│   ├── cloudflare.js               # Cloudflare Workers & Pages edge worker
│   └── netlify.js                  # Netlify Functions v2 serverless adapter
│
├── esbuild/                        # esbuild compilation & dev configurations
│   ├── build.mjs                   # Dual-bundle production build pipeline
│   └── build-client.mjs            # Client-side bundle orchestrator
│
├── rollup/                         # Rollup production bundler setup
│   └── rollup.config.js            # Dual-bundle Tree-shaking pipeline
│
├── webpack/                        # Webpack bundler setup
│   └── webpack.config.js           # Enterprise-grade Webpack 5 pipeline
│
└── node/                           # Node.js development & build scripts
    ├── dev.mjs                     # Multi-engine development server & HMR
    └── build.mjs                   # Production bundle compiler`}
              </CodeBlock>

              <div className="mt-4 p-4 rounded-xl border bg-muted/30 not-prose flex items-start gap-3">
                <FolderTree className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Looking for a detailed breakdown of every single internal module? Explore our comprehensive{" "}
                  <Link href="/docs/internals" className="font-semibold text-primary underline hover:text-primary/80">
                    Dinou Internals &amp; Architecture Reference
                  </Link>.
                </div>
              </div>
            </section>

            {/* When to Eject */}
            <section id="when-to-eject" className="mt-12">
              <h2>When to Consider Ejecting</h2>
              <p>
                Ejection is not required for typical applications; Dinou v7 out of the box provides multi-bundler compilation, edge adapters, and plugin support. However, ejecting is invaluable when you need:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Layers className="h-4 w-4 text-blue-500" />
                    <span>Custom Asset &amp; Build Tooling</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Integrate proprietary Babel/SWC transforms, custom WebAssembly loaders, CSS-in-JS compilers, or specialized SVG optimization pipelines directly into <code>dinou/esbuild/</code>, <code>dinou/rollup/</code>, or <code>dinou/webpack/</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Server className="h-4 w-4 text-purple-500" />
                    <span>Custom Middleware &amp; Edge Protocols</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Inject enterprise authorization reverse-proxies, custom WebSockets, streaming analytics, or specialized CORS/rate-limiting headers directly into <code>dinou/core/handler.js</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Cloud className="h-4 w-4 text-emerald-500" />
                    <span>Proprietary / Embedded Runtimes</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Deploy Dinou into unique target environments like Electron desktop apps, Tauri webviews, AWS Lambda custom microVMs, or private cloud environments by writing a custom adapter in <code>dinou/adapters/</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Hammer className="h-4 w-4 text-amber-500" />
                    <span>Deep Debugging &amp; Performance Tuning</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Place breakpoints inside the React 19 RSC stream serializer, inspect raw wire-format payloads, or fine-tune HTTP/2 and chunked transfer encoding parameters with zero indirection.
                  </p>
                </div>
              </div>
            </section>

            {/* AI Era & Vibe Coding */}
            <section id="ai-era" className="mt-12">
              <h2>Ejection in the AI Era (Vibe-Coding)</h2>
              <p>
                In the era of modern AI coding assistants (such as <strong>Cursor</strong>, <strong>Gemini Antigravity</strong>, <strong>Claude Code</strong>, and <strong>Copilot</strong>), framework ejection transitions from a rare edge-case to a <strong>superpower</strong>.
              </p>

              <div className="border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/10 rounded-xl p-5 bg-card not-prose space-y-4 my-6">
                <div className="flex items-center gap-2 font-semibold text-sm text-purple-600 dark:text-purple-400">
                  <Sparkles className="h-5 w-5" />
                  <span>Why Ejected Dinou Amplifies AI-Assisted Development</span>
                </div>
                <div className="text-xs leading-relaxed text-muted-foreground space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Full Context Window Visibility:</strong> Traditional frameworks are compiled blobs hidden in <code>node_modules/</code>. AI agents cannot inspect how they route requests or serialize components, leading to hallucinations. When ejected, the AI reads the clean source code directly and understands 100% of your architecture.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Autonomous Bug Fixing &amp; Feature Creation:</strong> Want to support a new experimental React 19 hook, custom cache invalidation strategy, or an emerging edge runtime? Prompt your AI co-pilot, and it will implement the exact modifications directly in your <code>dinou/</code> folder.
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">Fluid Vibe-Coding:</strong> The artificial boundary between &quot;framework code&quot; and &quot;user application code&quot; disappears. You and your AI companion can sculpt your web platform from UI components down to the HTTP socket level with total freedom.
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
                <h3>1. Adding Custom Server Middleware</h3>
                <p>
                  To inject a global response header (such as a <code>Server-Timing</code> metric) into every incoming request, simply open <code>dinou/core/handler.js</code> and update <code>handleRequest</code>:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou/core/handler.js
export async function handleRequest(request) {
  const startTime = performance.now();

  // 1. Execute standard Dinou request processing
  const response = await internalRequestHandler(request);

  // 2. Clone or modify response headers
  const duration = (performance.now() - startTime).toFixed(2);
  const headers = new Headers(response.headers);
  headers.set("Server-Timing", \`app;dur=\${duration}\`);
  headers.set("X-Powered-By", "Dinou-Ejected");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}`}
                </CodeBlock>
              </section>

              {/* Example 2 */}
              <section id="custom-bundler" className="my-6">
                <h3>2. Extending the Bundler Pipeline</h3>
                <p>
                  To add a custom esbuild plugin (for instance, an image inliner or environment replacer), edit <code>dinou/esbuild/build.mjs</code>:
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// dinou/esbuild/build.mjs
import esbuild from "esbuild";
import { myCustomPlugin } from "./plugins/my-plugin.mjs";

export async function buildClient(options) {
  return await esbuild.build({
    entryPoints: ["./src/entry-client.tsx"],
    bundle: true,
    plugins: [
      myCustomPlugin(), // <- Your custom plugin running in the build pipeline!
      ...defaultDinouPlugins,
    ],
    // ...other esbuild configuration
  });
}`}
                </CodeBlock>
              </section>
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
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Explore the Internals Guide:</strong> Use the <Link href="/docs/internals" className="text-primary underline font-medium">Internals Reference</Link> whenever you want to understand the exact lifecycle of RSC, SSR, and dynamic parameters.</span>
                  </li>
                </ul>
              </div>
            </section>
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
