import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader, CardTitle } from "@/docs/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";
import { Badge } from "@/docs/components/ui/badge";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Cpu,
  Boxes,
  Zap,
  Server,
  ShieldCheck,
  RefreshCw,
  Layers,
  ArrowRight,
  Cloud,
  Globe,
  FileCode2,
  Terminal,
  Database,
  Sparkles,
  GitBranch,
  Split,
  Eye,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { Link } from "dinou";
import { DocsPager } from "@/docs/components/docs-pager";

const tocItems = [
  { id: "overview", title: "1. Architectural Paradigm & Blueprint", level: 2 },
  { id: "dual-bundle-pipeline", title: "2. 0-Fork Dual-Bundle Compilation Pipeline", level: 2 },
  { id: "react-19-conditions", title: "2.1. The React 19 Dual Condition Conflict", level: 3 },
  { id: "three-pass-model", title: "2.2. The 3-Pass Compilation Model (Pass A, B, C)", level: 3 },
  { id: "in-memory-dev", title: "2.3. In-Memory Dev Server & SWC Disk-Mirror", level: 3 },
  { id: "horizontal-segmentation", title: "3. Horizontal Segmentation: Layout & Page Decoupling", level: 2 },
  { id: "layout-preservation", title: "3.1. 100% State Preservation & Zero Remounts", level: 3 },
  { id: "layout-functions", title: "3.2. layout_functions for Independent Layout ISR", level: 3 },
  { id: "surgical-revalidation", title: "4. Surgical Invalidation: revalidatePage vs revalidatePath", level: 2 },
  { id: "vertical-segmentation", title: "5. Vertical Segmentation: <DinouCacheSlot>", level: 2 },
  { id: "micro-isr", title: "5.1. Micro-ISR of Server Components & SWR", level: 3 },
  { id: "live-refresh", title: "5.2. In-Place Client Live Refresh (refreshSlot)", level: 3 },
  { id: "ppr-engine", title: "6. Partial Prerendering (PPR) Engine", level: 2 },
  { id: "ppr-lifecycle", title: "6.1. Static Prelude (0ms TTFB) & Streaming Holes", level: 3 },
  { id: "ppr-configuration", title: "6.2. Configuration Hierarchy (Global, Layout, Page)", level: 3 },
  { id: "react-19-resilience", title: "7. React 19 Resilience, Isolation & Error Boundaries", level: 2 },
  { id: "no-double-html", title: "7.1. Elimination of HTML Double-Wrapping in Error SSR", level: 3 },
  { id: "suspense-exception", title: "7.2. Handling SuspenseException with use()", level: 3 },
  { id: "two-level-boundaries", title: "7.3. Two-Level Error Boundaries with Clean Navigation Reset", level: 3 },
  { id: "storage-adapter", title: "8. StorageAdapter & Multi-Runtime Edge Portability", level: 2 },
  { id: "multi-bundler", title: "9. Multi-Bundler Parity (esbuild, Rollup, Webpack)", level: 2 },
  { id: "request-pipeline", title: "10. Universal Request Pipeline (onRequest & W3C Standards)", level: 2 },
];

export default function ArchitecturePage() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Architecture & Runtime Engine | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Comprehensive architectural specification of Dinou v7: the 0-Fork Ahead-of-Time Dual-Bundle Pipeline, Layered Segmentation, and Virtual Filesystem."
      />
      <link rel="canonical" href="https://dinou.dev/docs/architecture" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
                Core Architecture
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou v7
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Dinou Architecture &amp; Runtime Engine
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive architectural specification of Dinou v7: the 0-Fork Ahead-of-Time (AOT) Dual-Bundle Pipeline, Horizontal &amp; Vertical Layered Segmentation, Partial Prerendering (PPR), React 19 resilience primitives, and universal multi-runtime deployment across Node.js, Bun, Deno, and Edge Isolates.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Architectural Paradigm &amp; High-Level Blueprint
              </h2>
              <p>
                Dinou v7 is engineered around a single foundational philosophy: <strong>Universal React 19 Portability without Platform Lock-in</strong>. While early React Server Components (RSC) implementations relied heavily on proprietary serverless hosting environments or heavy, dual-process Node.js architectures (spawning <code>child_process.fork()</code>), Dinou v7 introduces a <strong>universal, 0-fork in-memory Dual-Bundle engine</strong> based strictly on standard W3C Web primitives (<code>Request</code>, <code>Response</code>, and <code>ReadableStream</code>).
              </p>
              <p>
                The exact same compiled application runs without modification across <strong>Node.js</strong>, <strong>Bun</strong>, <strong>Deno</strong>, <strong>Cloudflare Workers</strong>, <strong>Netlify Functions v2</strong>, self-contained single-binary executables, or 100% static hosting (GitHub Pages, AWS S3).
              </p>

              <div className="not-prose my-6">
                <CodeBlock language="mermaid" minWidth="1000px">{`flowchart TB
    subgraph Client["🌐 Client / Edge Network"]
        Browser["User Browser"]
        EdgeCDN["Edge CDN / Cache"]
    end

    subgraph Runtime["⚡ Universal Runtime (Node / Bun / Deno / Cloudflare / Netlify)"]
        Orchestrator["Target Orchestrator (Pass C)<br/>W3C Fetch Handler & Middleware Pipeline"]
        StorageAdapter["StorageAdapter Layer<br/>(FileSystem / CloudflareKV / DenoKV / Memory)"]

        subgraph DualBundle["AOT Dual-Bundle Engine (In-Memory Streams)"]
            direction LR
            PassA["Pass A: RSC Engine<br/><code>['react-server']</code> condition<br/>• Server Components Tree<br/>• Server Functions RPC<br/>• Client Component Proxies"]
            PassB["Pass B: SSR Engine<br/><code>['browser']</code> condition<br/>• react-dom/server.edge<br/>• Physical Client Manifest<br/>• Streaming HTML Renderer"]
            StreamBridge["W3C ReadableStream<br/>0-Fork Pipe (0.0ms IPC)"]

            PassA -->|RSC Flight Stream| StreamBridge
            StreamBridge -->|Flight Payload| PassB
        end
    end

    Browser -->|HTTP Request| EdgeCDN
    EdgeCDN -->|Fetch Event| Orchestrator
    Orchestrator -->|Check ISR / SSG| StorageAdapter
    Orchestrator -->|Evaluate Dynamic Route| PassA
    PassB -->|Streaming HTML Response| Orchestrator
    Orchestrator -->|Direct Stream| EdgeCDN
    EdgeCDN -->|Rendered Stream| Browser
`}</CodeBlock>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden not-prose my-6 shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-900/60">
                    <TableRow>
                      <TableHead className="w-[25%] font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Architectural Dimension
                      </TableHead>
                      <TableHead className="w-[37%] font-semibold text-slate-500 text-xs">
                        Legacy Meta-Frameworks (v6)
                      </TableHead>
                      <TableHead className="w-[38%] font-semibold text-blue-600 dark:text-blue-400 text-xs">
                        Dinou v7 Architecture
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Process Architecture
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        2 separate OS processes via <code>child_process.fork()</code> (Parent CJS + Child ESM) with pipe serialization.
                      </TableCell>
                      <TableCell className="text-xs text-slate-900 dark:text-slate-100">
                        <strong>0-Fork AOT Dual-Bundle</strong> in the same OS process via W3C <code>ReadableStream</code> memory pipes.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Runtime Portability
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Node.js only (due to <code>child_process</code> and Express API dependencies).
                      </TableCell>
                      <TableCell className="text-xs text-slate-900 dark:text-slate-100">
                        <strong>Universal (W3C Fetch)</strong>: Node.js, Bun, Deno, Cloudflare Workers, Netlify Functions, Standalone Exe.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Layout Lifecycle
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Monolithic route payload. Navigating between sibling routes re-mounted the layout and destroyed UI state.
                      </TableCell>
                      <TableCell className="text-xs text-slate-900 dark:text-slate-100">
                        <strong>Horizontal Segmentation</strong>: Layouts never re-render on sibling navigations. 100% state preserved.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Component Micro-Caching
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Whole-page caching only.
                      </TableCell>
                      <TableCell className="text-xs text-slate-900 dark:text-slate-100">
                        <strong>Vertical Segmentation (<code>&lt;DinouCacheSlot&gt;</code>)</strong>: Micro-ISR of individual Server Components + live client refresh.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Pre-Rendering Timing
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Executed at server startup (<code>dinou start</code>), causing slow, blocked boot times in production.
                      </TableCell>
                      <TableCell className="text-xs text-slate-900 dark:text-slate-100">
                        Executed strictly during <code>dinou build</code>. Production server boots <strong>instantaneously</strong>.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Dev Server Storage
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Continuously writes chunks and manifests to disk in <code>.dinou/public/</code> (high disk I/O on Windows).
                      </TableCell>
                      <TableCell className="text-xs text-slate-900 dark:text-slate-100">
                        <strong>100% In-Memory (<code>__DINOU_MEM_FILES__</code>)</strong> with &lt;0.5ms asset response times.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Section 2: Dual-Bundle Pipeline */}
            <section id="dual-bundle-pipeline" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. 0-Fork Dual-Bundle Compilation Pipeline
              </h2>

              <div id="react-19-conditions" className="scroll-mt-20 mt-6">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span>2.1. The React 19 Dual Condition Conflict</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  React 19 imposes a strict module-resolution constraint: Server Components must be imported under the <code>&quot;react-server&quot;</code> export condition (which disables client-only hooks such as <code>useState</code> and <code>useEffect</code>, as well as <code>react-dom/server</code>). Conversely, SSR rendering requires client conditions (<code>&quot;browser&quot;</code> or <code>react-dom/server.edge</code>).
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Importing both engines within the same unisolated module graph throws a fatal runtime panic:
                </p>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg p-3 not-prose my-3 text-xs font-mono text-red-600 dark:text-red-400">
                  Error: ReactServer has been imported outside of react-server condition.
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Earlier meta-frameworks circumvented this in Node.js by spawning an external child process via <code>child_process.fork()</code>. However, this introduced process serialization latency, doubled server memory consumption, and made deployment to Edge runtimes (Cloudflare Workers, Deno Deploy) impossible because Edge V8 isolates do not support spawning OS processes.
                </p>
              </div>

              <div id="three-pass-model" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  <span>2.2. The 3-Pass Compilation Model (Pass A, Pass B, Pass C)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou v7 resolves this conflict Ahead-of-Time (AOT) through an isolated, in-memory 3-pass compilation pipeline:
                </p>

                <div className="grid gap-4 sm:grid-cols-3 not-prose my-4">
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <Server className="h-4 w-4" />
                      <span>Pass A: RSC Engine</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Bundled with <code>[&quot;react-server&quot;]</code> conditions. Replaces Client Components (<code>&quot;use client&quot;</code>) with client reference descriptors via <code>createClientModuleProxy</code>. Binds Server Functions (<code>&quot;use server&quot;</code>) and generates the RSC Flight stream.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-50/40 dark:bg-purple-950/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
                      <Globe className="h-4 w-4" />
                      <span>Pass B: SSR Engine</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Bundled with <code>[&quot;browser&quot;]</code> client conditions. Packages <code>react-dom/server.edge</code> (<code>renderToReadableStream</code>) and client manifests containing the physical component implementations needed to produce static HTML and client hydration.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Zap className="h-4 w-4" />
                      <span>Pass C: Orchestrator</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Connects Pass A and Pass B in memory using standard W3C <code>ReadableStream</code> pipes. In Edge and Serverless runtimes, Pass C serves as the single unified fetch entry point, executing with zero OS-level serialization overhead.
                    </p>
                  </div>
                </div>
              </div>

              <div id="in-memory-dev" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-amber-500" />
                  <span>2.3. In-Memory Dev Server &amp; SWC Disk-Mirror</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  During development, Dinou v7 stores all generated chunks, manifests, sourcemaps, and CSS in a global in-memory buffer:
                </p>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card not-prose my-3 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span>RAM Buffer: <code>globalThis.__DINOU_MEM_FILES__</code></span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Assets are served directly from RAM with response latencies under <strong>0.5ms</strong>. This eliminates Windows antivirus real-time indexing contention and prevents drive wear. If you need physical files on disk for external proxies or inspection tools, start the server with <code>DINOU_WRITE_TO_DISK=true npm run dev</code>.
                  </p>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      SWC Disk-Mirror Architecture for Massive Projects:
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      In large-scale codebases with hundreds of routes, running JavaScript-based transforms on every file over esbuild Go-to-Node IPC creates bottlenecks. Dinou mirrors modified files into <code>.dinou/swc/</code> using Rust-based SWC in <strong>~5ms</strong>. esbuild reads them with native Go loaders, preserving the in-memory AST cache and slashing incremental rebuild times by nearly 4x.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Horizontal Segmentation */}
            <section id="horizontal-segmentation" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Horizontal Segmentation: Layout &amp; Page Decoupling
              </h2>
              <p>
                In monolithic SSR architectures, every navigation request forces the server to evaluate and serialize both the layout and the target page together. Navigating between sibling routes inevitably forces the client to tear down and recreate the layout DOM tree.
              </p>
              <p>
                Dinou v7 introduces <strong>Horizontal Segmentation</strong>, decomposing the route hierarchy into two independent execution planes:
              </p>

              <div className="not-prose my-6">
                <CodeBlock language="mermaid" minWidth="900px">{`sequenceDiagram
    autonumber
    actor User as User Browser
    participant Router as Dinou Client SPA Router
    participant Server as Dinou Server (AOT Engine)
    participant Cache as StorageAdapter (Cache Plane)

    Note over User,Router: Initial Visit: /dashboard/analytics
    User->>Server: GET /dashboard/analytics
    Server-->>User: 1. Full HTML Shell (Layout + Page SSR)
    Server-->>User: 2. Layout RSC (____rsc_layout____) & Page RSC (____rsc_page____)

    Note over User,Router: Sibling Navigation: Clicking /dashboard/settings
    User->>Router: Click Link: /dashboard/settings
    Note over Router: Layout is identical!<br/>Preserve layout DOM & React state
    Router->>Server: GET /____rsc_page____/dashboard/settings
    Server->>Cache: Fetch page.rsc
    Cache-->>Server: Return page payload
    Server-->>Router: Return ONLY Page Flight Stream (3 KB)
    Note over Router: Reconciles <DinouPageSlot /> in place.<br/>Sidebar, Audio Player, Inputs STAY MOUNTED!
`}</CodeBlock>
              </div>

              <div id="layout-preservation" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <span>3.1. 100% State Preservation &amp; Zero Remounts</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Horizontal segmentation guarantees that layout components <strong>never unmount or re-execute</strong> during client-side navigation between sibling routes:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5 my-2">
                  <li><strong>Active media playback:</strong> Audio and video players embedded in the layout continue playing seamlessly with 0 interruption.</li>
                  <li><strong>Form &amp; filter states:</strong> Sidebar filters, search queries, and collapsible menus retain their exact state.</li>
                  <li><strong>Scroll position:</strong> Layout-level containers maintain their scroll coordinates across page transitions.</li>
                </ul>
              </div>

              <div id="layout-functions" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  <span>3.2. <code>layout_functions</code> for Independent Layout ISR</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Layouts can declare their own independent caching, validation, and metadata lifecycle using <code>layout_functions.ts</code> (or named exports in <code>layout.tsx</code>):
                </p>
                <CodeBlock language="typescript" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// src/dashboard/layout_functions.ts
// ⚡ Cache the layout shell for 1 hour independently of child pages:
export const revalidate = 3600;

// Assign tags for granular invalidation:
export const tags = ["dashboard-shell", "user-nav"];

export async function validateParams(params) {
  // Validate route parameters before evaluating layout
  return true;
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground mt-2">
                  This separation means that a child page with live SSR (<code>revalidate = 0</code>) can be rendered inside a layout shell that is cached statically or regenerated every hour.
                </p>
              </div>
            </section>

            {/* Section 4: Surgical Invalidation */}
            <section id="surgical-revalidation" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Surgical Invalidation: <code>revalidatePage</code> vs <code>revalidatePath</code>
              </h2>
              <p>
                Because Dinou v7 decouples layouts from leaf pages, it introduces surgical invalidation control through two dedicated server APIs in <code>&quot;dinou/server&quot;</code>:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/10 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-blue-600 dark:text-blue-400">
                    <Sparkles className="h-4 w-4" />
                    <span><code>revalidatePage(path)</code> (New in v7)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Surgically revalidates strictly the leaf page</strong> (<code>page.rsc</code> and <code>index.html</code>). Leaves the parent layout (<code>layout.rsc</code>) completely untouched in cache.
                  </p>
                  <div className="text-[11px] font-mono bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">
                    ⚡ Use case: Updating a blog post or CMS article. Regenerates the article content without re-evaluating the site-wide navigation bar or footer.
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-50/40 dark:bg-purple-950/10 space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-purple-600 dark:text-purple-400">
                    <RefreshCw className="h-4 w-4" />
                    <span><code>revalidatePath(path, options?)</code></span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Revalidates both the page and the layout</strong> at the given route path. When <code>&#123; cascade: true &#125;</code> is provided, invalidation propagates downward across all nested child pages.
                  </p>
                  <div className="text-[11px] font-mono bg-purple-100/50 dark:bg-purple-900/30 p-2 rounded border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200">
                    🔄 Use case: Updating user permissions or header navigation links that must reflect across all sub-routes immediately.
                  </div>
                </div>
              </div>

              <CodeBlock language="typescript" containerClassName="w-full rounded-lg not-prose my-4">
                {`// Inside a Server Function ("use server") or CMS Webhook
import { revalidatePage, revalidatePath } from "dinou/server";

export async function publishArticle(slug: string) {
  await db.articles.update({ where: { slug }, data: { status: "published" } });

  // 1. Surgical: Invalidate ONLY the single article page (0 layout re-render)
  await revalidatePage(\`/blog/\${slug}\`);

  // 2. Full Tree Cascade: Invalidate the blog listing and all nested children
  // await revalidatePath("/blog", { cascade: true });
}`}
              </CodeBlock>
            </section>

            {/* Section 5: Vertical Segmentation */}
            <section id="vertical-segmentation" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Vertical Segmentation: <code>&lt;DinouCacheSlot&gt;</code>
              </h2>
              <p>
                While Horizontal Segmentation decouples pages from layouts, <strong>Vertical Segmentation</strong> brings micro-caching directly inside individual components within a single page using <code>&lt;DinouCacheSlot&gt;</code>.
              </p>

              <div id="micro-isr" className="scroll-mt-20 mt-6">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-500" />
                  <span>5.1. Micro-ISR of Server Components &amp; SWR</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Wrap expensive Server Components in a cache slot. Stale content is served instantly while an asynchronous background task (via <code>waitUntil</code>) evaluates the component and updates the cache in the active <code>StorageAdapter</code>:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// src/analytics/page.tsx
import { DinouCacheSlot } from "dinou/server";

export default function AnalyticsPage() {
  return (
    <div className="dashboard-grid">
      <h1>Live Analytics</h1>
      
      {/* Caches this heavy Server Component for 60 seconds */}
      <DinouCacheSlot id="metrics-widget" tag="metrics-tag" revalidate={60}>
        <ExpensiveMetricsGraph />
      </DinouCacheSlot>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <div id="live-refresh" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-500" />
                  <span>5.2. In-Place Client Live Refresh (<code>refreshSlot</code>)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Every <code>&lt;DinouCacheSlot&gt;</code> is automatically wrapped in a <code>DinouCacheSlotBoundary</code>. Client Components can programmatically re-render a single slot in place by calling <code>refreshSlot(id)</code> from <code>&quot;dinou&quot;</code> without triggering a full page reload:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg not-prose my-3">
                  {`"use client";
import { refreshSlot } from "dinou";

export function LiveRefreshButton() {
  return (
    <button 
      onClick={() => refreshSlot("metrics-widget")}
      className="btn-refresh"
    >
      Refresh Metrics Only
    </button>
  );
}`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground mt-2">
                  When <code>refreshSlot(&quot;metrics-widget&quot;)</code> fires, the client requests <code>/____rsc_slot____/metrics-widget</code> directly from the server and reconciles only that DOM subtree.
                </p>
              </div>
            </section>

            {/* Section 6: PPR Engine */}
            <section id="ppr-engine" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Partial Prerendering (PPR) Engine
              </h2>
              <p>
                Partial Prerendering (PPR) bridges the divide between static site generation (0ms TTFB) and dynamic server-side rendering in a single HTTP response.
              </p>

              <div id="ppr-lifecycle" className="scroll-mt-20 mt-6">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>6.1. Static Prelude (0ms TTFB) &amp; Streaming Dynamic Holes</span>
                </h3>

                <div className="not-prose my-4">
                  <CodeBlock language="mermaid" minWidth="900px">{`sequenceDiagram
    autonumber
    actor Browser as User / Browser
    participant Server as Dinou Server (AOT Dual-Bundle)
    participant DB as Database / External API
    
    Browser->>Server: GET /dashboard (Cookie: session=xyz)
    Server-->>Browser: [0ms TTFB] Static Shell Prelude (HTML + Suspense Skeletons)
    Note over Browser: User sees the layout and skeletons instantly
    par Async Dynamic Evaluation in Runtime
        Server->>DB: Fetch user profile & feed concurrently
        DB-->>Server: Return live personalized data
    end
    Server-->>Browser: [Stream Chunk 1] <div id="ppr-dynamic">...</div> + Atomic replacement script
    Note over Browser: DOM instantly swaps skeleton with live content
    Server-->>Browser: [Postlude] </body></html> (Connection closes)
`}</CodeBlock>
                </div>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg not-prose my-4">
                  {`// src/dashboard/page.tsx
import { Suspense } from "react";
import { getContext } from "dinou";

async function UserFeed() {
  const ctx = getContext();
  const user = ctx?.req?.cookies?.user || "Guest";
  const data = await fetchFeedForUser(user);
  return <FeedList items={data} />;
}

export default function DashboardPage() {
  return (
    <div>
      {/* 🚀 Static Shell: Sent at 0ms TTFB */}
      <header><h1>Dashboard</h1></header>

      {/* ⚡ Dynamic Hole: Streamed and replaced on the fly */}
      <Suspense fallback={<div className="skeleton">Loading feed...</div>}>
        <UserFeed />
      </Suspense>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              <div id="ppr-configuration" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Split className="h-5 w-5 text-blue-500" />
                  <span>6.2. Configuration Hierarchy (Global, Layout, Page)</span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-3 not-prose my-3">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-blue-500 mb-1">1. Global (dinou.config.mjs)</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1">defineConfig(&#123; ppr: true &#125;)</code>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-purple-500 mb-1">2. Layout Scope</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1">export const ppr = true;</code>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs">
                    <p className="font-semibold text-emerald-500 mb-1">3. Page Override (Max Priority)</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1">export const ppr = false;</code>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: React 19 Resilience */}
            <section id="react-19-resilience" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. React 19 Resilience, Isolation &amp; Error Boundaries
              </h2>
              <p>
                During multi-browser E2E testing across Windows, Linux, and Edge runtimes, three critical resilience challenges were identified in React 19 streaming and engineered directly into Dinou&apos;s core engine:
              </p>

              <div id="no-double-html" className="scroll-mt-20 mt-6">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-500" />
                  <span>7.1. Elimination of HTML Double-Wrapping in Error SSR</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  When a route crashed during Server-Side Rendering, earlier implementations checked whether the root JSX was an <code>&lt;html&gt;</code> element. When an application layout was applied, the root was the layout function, prompting the server to blindly inject an emergency <code>&lt;html&gt;&lt;body&gt;</code> shell outside the layout. This produced nested <code>&lt;html&gt;</code> tags, triggering fatal hydration mismatches in React 19.
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou v7 tracks <code>layoutApplied</code> in <code>getErrorJSX</code>. When an application layout is present, error JSX is injected directly into the layout&apos;s active content area. The document structure remains valid HTML, and interactive navigation elements (sidebars, headers) remain fully operational.
                </p>
              </div>

              <div id="suspense-exception" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-amber-500" />
                  <span>7.2. Handling <code>SuspenseException</code> with <code>use()</code></span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  In React 19, reading pending promises inside component bodies with <code>use(errorPromise)</code> intentionally throws an internal suspension signal (<code>SuspenseException</code>). If executed inside an eager JavaScript <code>try / catch</code> block, the catch intercepted this signal as if it were a fatal runtime crash, preventing custom <code>error.tsx</code> components from ever rendering.
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou v7 decouples <code>SlotErrorRenderer</code> from eager <code>try / catch</code> blocks and wraps it in a native React <code>&lt;Suspense fallback=&#123;null&#125;&gt;</code> boundary. Once the error chunk resolves, React smoothly renders your custom <code>error.tsx</code> component with its <code>error</code> and <code>reset</code> props.
                </p>
              </div>

              <div id="two-level-boundaries" className="scroll-mt-20 mt-8">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-emerald-500" />
                  <span>7.3. Two-Level Error Boundaries with Clean Navigation Reset</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Earlier frameworks reset error boundaries on navigation by mutating <code>&lt;ErrorBoundary key=&#123;pathname&#125;&gt;</code>. However, mutating <code>key</code> indiscriminately destroys and remounts the DOM on <i>every</i> healthy navigation, wiping form inputs and scroll positions.
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou v7 implements a <strong>Two-Level Error Boundary Architecture</strong> in <code>dinou/core/slot.js</code>:
                </p>

                <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs my-3 leading-relaxed overflow-x-auto not-prose">
                  <pre>{`┌────────────────────────────────────────────────────────┐
│  SlotErrorBoundary (Level 1 - State-Preserving Reset)  │
│  - Healthy navigation: Key unchanged, state intact.    │
│  - On error: Listens to resetKey & resets state.       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  InnerErrorBoundary (Level 2 - Error Guard)      │  │
│  │  - Guards against bugs inside custom error.tsx   │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  <Suspense fallback={null}>                │  │  │
│  │  │    <SlotErrorRenderer /> (use(errorPromise)│  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘`}</pre>
                </div>

                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5 my-2">
                  <li><strong>Level 1 (<code>SlotErrorBoundary</code>):</strong> Preserves DOM and state on healthy navigations. Only when <code>hasError === true</code> does <code>componentDidUpdate</code> check the compound navigation key (<code>resetKey: $&#123;route&#125;::$&#123;navCount&#125;</code>) to reset the error state cleanly.</li>
                  <li><strong>Level 2 (<code>InnerErrorBoundary</code>):</strong> Fail-safe guard that catches bugs or unhandled exceptions inside the developer&apos;s custom <code>error.tsx</code> component, safely displaying <code>DefaultDevError</code> and preventing a white screen of death.</li>
                </ul>
              </div>
            </section>

            {/* Section 8: StorageAdapter */}
            <section id="storage-adapter" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                8. StorageAdapter &amp; Multi-Runtime Edge Portability
              </h2>
              <p>
                Dinou v7 decouples cache storage and runtime operations via the <code>StorageAdapter</code> interface:
              </p>

              <div className="grid gap-3 sm:grid-cols-2 not-prose my-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-xs text-blue-600 dark:text-blue-400">
                    <Server className="h-4 w-4" />
                    <span>FileSystemStorage (Node.js &amp; Bun)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Stores pre-rendered HTML and RSC payloads on disk under <code>.dinou/dist2/</code> with atomic writes.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-xs text-teal-600 dark:text-teal-400">
                    <Globe className="h-4 w-4" />
                    <span>CloudflareKVStorage (Cloudflare Workers)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Integrates with Cloudflare KV (<code>DINOU_CACHE</code>) for low-latency worldwide edge ISR.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-xs text-cyan-600 dark:text-cyan-400">
                    <Boxes className="h-4 w-4" />
                    <span>DenoKVStorage (Deno &amp; Deno Deploy)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Backed by <code>Deno.openKv()</code> for distributed, zero-configuration key-value caching.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-xs text-purple-600 dark:text-purple-400">
                    <Cpu className="h-4 w-4" />
                    <span>MemoryStorage (Tests &amp; Ephemeral)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pure in-memory LRU cache for unit test suites and ephemeral serverless containers.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Multi-Bundler */}
            <section id="multi-bundler" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                9. Multi-Bundler Parity (esbuild, Rollup, Webpack)
              </h2>
              <p>
                Dinou v7 treats bundlers as interchangeable compilation backends. You are never locked into a single bundler:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5 my-3">
                <li><strong>esbuild (Default):</strong> Ultra-fast day-to-day development server and production builds.</li>
                <li><strong>Rollup:</strong> Advanced chunk optimization, tree-shaking, and enterprise ESM output via <code>rollup-plugin-swc.js</code>.</li>
                <li><strong>Webpack:</strong> Maximum enterprise compatibility with legacy Webpack loaders and plugins.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                All three bundlers share <strong>100% feature parity</strong>: RSC Flight stream generation, client directive splitting, server functions RPCs, CSS Modules, and Fast Refresh.
              </p>
            </section>

            {/* Section 10: Request Pipeline */}
            <section id="request-pipeline" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                10. Universal Request Pipeline (<code>onRequest</code> &amp; W3C Standards)
              </h2>
              <p>
                With the elimination of Express in Dinou v7, the entire middleware and plugin execution pipeline operates on standard W3C <code>Request</code> and <code>Response</code> primitives:
              </p>

              <CodeBlock language="javascript" containerClassName="w-full rounded-lg not-prose my-4">
                {`// dinou.config.mjs
import { defineConfig } from "dinou/config";

export default defineConfig({
  ppr: true,
  plugins: [
    {
      name: "auth-guard",
      async onRequest(request, context) {
        const url = new URL(request.url);
        if (url.pathname.startsWith("/admin")) {
          const token = request.headers.get("Authorization");
          if (!token) {
            return Response.redirect(new URL("/login", request.url), 302);
          }
        }
      },
    },
  ],
});`}
              </CodeBlock>

            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
