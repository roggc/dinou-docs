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
import { CodeBlock } from "@/docs/components/code-block";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Boxes,
  Globe,
  Terminal,
  Layers,
  Cloud,
  Server,
  FileCode2,
  Zap,
  RefreshCw,
  ShieldCheck,
  Split,
  Sliders,
  XCircle,
} from "lucide-react";

const tocItems = [
  { id: "overview", title: "1. Overview & Architectural Leap", level: 2 },
  { id: "breaking-changes", title: "2. Breaking Changes (v6 vs v7)", level: 2 },
  { id: "breaking-getprops", title: "2.1. getProps Direct Props Return", level: 3 },
  { id: "breaking-revalidate", title: "2.2. revalidate in Seconds (s)", level: 3 },
  { id: "breaking-dynamic", title: "2.3. Elimination of dynamic Keyword", level: 3 },
  { id: "breaking-ssg-lifecycle", title: "2.4. SSG Build-Time vs Startup", level: 3 },
  { id: "breaking-layout-lifecycle", title: "2.5. Layout State Preservation", level: 3 },
  { id: "breaking-onserverinit", title: "2.6. Elimination of onServerInit(app)", level: 3 },
  { id: "breaking-in-memory-dev", title: "2.7. In-Memory Dev Server", level: 3 },
  { id: "layered-segmentation", title: "3. Layered Segmentation Architecture", level: 2 },
  { id: "horizontal-segmentation", title: "3.1. Horizontal Segmentation & Layout Preservation", level: 3 },
  { id: "layout-functions", title: "3.2. layout_functions for Decoupled Layout ISR", level: 3 },
  { id: "revalidate-page-api", title: "3.3. Surgical Revalidation with revalidatePage (New in v7)", level: 3 },
  { id: "vertical-segmentation", title: "3.4. Vertical Segmentation (DinouCacheSlot)", level: 3 },
  { id: "ppr-engine", title: "3.5. Partial Prerendering (PPR) Engine", level: 3 },
  { id: "dual-bundle-engine", title: "4. Dual-Bundle In-Memory Engine (0-Fork)", level: 2 },
  { id: "updating-dependencies", title: "5. Updating Dependencies & StrictMode", level: 2 },
  { id: "cli-scripts", title: "6. CLI Standardization & Scripts", level: 2 },
  { id: "multi-runtime-binaries", title: "7. Multi-Runtime, Serverless & Static Deployments", level: 2 },
  { id: "gitignore-update", title: "8. Updating .gitignore", level: 2 },
];

export default function MigrationV6ToV7Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Migration from v6 to v7 | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Complete migration specification for upgrading to Dinou v7: breaking changes in data fetching contracts, horizontal segmentation, and layout functions."
      />
      <link rel="canonical" href="https://dinou.dev/docs/migration/v6-to-v7" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
                Migration Guide
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                v6 &rarr; v7
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Migration from v6 to v7
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Complete migration specification for upgrading to Dinou v7: breaking changes in data fetching contracts, horizontal and vertical layered segmentation (<code>layout_functions</code> and <code>DinouCacheSlot</code>), Partial Prerendering (PPR), 0-Fork Dual-Bundle in-memory compilation, and multi-runtime edge deployments.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Architectural Leap
              </h2>
              <p>
                Dinou v7 represents a quantum leap in the framework&apos;s lifecycle. It shifts from a Node-centric development server reliant on subprocess forking and disk manifests to a <strong>universal, 0-fork in-memory Dual-Bundle engine</strong> that runs identically across Node.js, Bun, Deno, Cloudflare Workers, and Netlify Functions.
              </p>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden not-prose my-6 shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="min-w-[640px]">
                  <TableHeader className="bg-slate-50 dark:bg-slate-900/60">
                    <TableRow>
                      <TableHead className="w-[24%] font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Dimension
                      </TableHead>
                      <TableHead className="w-[38%] font-semibold text-slate-500 text-xs">
                        Dinou v6 (Legacy)
                      </TableHead>
                      <TableHead className="w-[38%] font-semibold text-blue-600 dark:text-blue-400 text-xs">
                        Dinou v7 (Current)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        <code>getProps</code> Contract
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Required nested wrapper: <code>&#123; page: &#123; ... &#125; &#125;</code>
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        Direct top-level props: <code>&#123; user, title &#125;</code>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        <code>revalidate</code> Unit
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Declared in <strong>milliseconds</strong> (e.g. <code>60000</code> ms)
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        Strictly in <strong>seconds</strong> (e.g. <code>60</code> s)
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Route Mode &amp; Source of Truth
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        <code>dynamic</code> was the source of truth (<code>dynamic = true</code> for SSR). <code>revalidate === 0</code> meant static forever.
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        <code>revalidate</code> is the single source of truth: <code>revalidate = 0</code> (SSR), <code>&gt;= 1</code> (ISR), <code>false</code> (SSG). <code>dynamic</code> is removed.
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        SSG Generation &amp; Startup
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Generated at <strong>server startup</strong> (crawled on <code>npm start</code>, delaying server boot)
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        Generated at <strong>compilation</strong> (<code>npm run build</code>); production server boot is <strong>instantaneous (0ms)</strong>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Engine Architecture
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Subprocess <code>child_process.fork()</code> with IPC serialization &amp; double RAM
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        <strong>0-Fork Dual-Bundle</strong> in-memory engine via native React 19 W3C Web Streams
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Layouts &amp; Navigation
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Monolithic tree: layouts re-evaluated &amp; re-mounted on navigation
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        <strong>Horizontal Segmentation:</strong> 100% layout state preservation (zero remounts)
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Component Micro-Cache
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Not supported (caching strictly tied to full page)
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        <strong>Vertical Segmentation:</strong> <code>&lt;DinouCacheSlot&gt;</code> Micro-ISR &amp; client <code>refreshSlot()</code>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        TTFB &amp; Dynamic Routes
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Blocked until slowest database query settles (no streaming shell)
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        <strong>0ms TTFB with PPR:</strong> Instant static shell prelude + streaming dynamic <code>&lt;Suspense&gt;</code>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        Deployment Targets
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        Restricted to Node.js environments (due to <code>fork()</code> and Express)
                      </TableCell>
                      <TableCell className="text-xs text-foreground font-medium bg-blue-50/20 dark:bg-blue-950/10">
                        <strong>Universal "Deploy Everywhere":</strong> Node, Bun, Deno, Cloudflare Workers, Netlify v2 &amp; Static SSG
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>

            {/* Section 2: Breaking Changes */}
            <section id="breaking-changes" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Breaking Changes (v6 vs v7)
              </h2>
              <p>
                Before launching your migrated application, audit your <code>page_functions.ts</code> (or <code>.js</code>) files, build pipelines, plugins, and development workflows against these seven breaking changes and architectural shifts:
              </p>

              {/* 2.1 getProps */}
              <div id="breaking-getprops" className="mt-8 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.1
                  </span>
                  <span><code>getProps</code> Contract: Direct Props Object Return</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, <code>getProps</code> required wrapping the returned data under a <code>page</code> key. In Dinou v7, this artificial wrapper is completely eliminated. <code>getProps</code> directly returns the object that will be passed as props to your page component:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4 min-w-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5 break-words">
                      ❌ Dinou v6 (Deprecated)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/users/[id]/page_functions.ts
export async function getProps(params) {
  const user = await fetchUser(params.id);
  return {
    page: {
      user,
      title: \`Profile of \${user.name}\`,
    },
  };
}`}
                    </CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5 break-words">
                      ✅ Dinou v7 (Current)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/users/[id]/page_functions.ts
export async function getProps(params) {
  const user = await fetchUser(params.id);
  return {
    user,
    title: \`Profile of \${user.name}\`,
  };
}`}
                    </CodeBlock>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  The corresponding Page component receives <code>user</code> and <code>title</code> directly as top-level props:
                </p>
                <CodeBlock language="tsx" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// src/users/[id]/page.tsx
export default function UserProfilePage({ user, title }: { user: User; title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}`}
                </CodeBlock>
              </div>

              {/* 2.2 revalidate Unit */}
              <div id="breaking-revalidate" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.2
                  </span>
                  <span><code>revalidate</code> Time Unit: Strictly Seconds (<code>s</code>)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, cache revalidation intervals were specified in milliseconds (<code>ms</code>). In Dinou v7, <code>revalidate</code> is <strong>strictly defined in seconds (<code>s</code>)</strong>. This aligns with HTTP standards (RFC 7234 <code>Cache-Control: max-age=N</code>), edge CDN providers, and component-level cache slots:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4 min-w-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5 break-words">
                      ❌ Dinou v6 (Milliseconds)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// 60,000 milliseconds (1 minute)
export const revalidate = 60000;

// or function form
export function revalidate() {
  return 60000;
}`}
                    </CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5 break-words">
                      ✅ Dinou v7 (Seconds)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// 60 seconds (1 minute)
export const revalidate = 60;

// or function form
export function revalidate() {
  return 60;
}`}
                    </CodeBlock>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  💡 <strong>Tip:</strong> If you leave <code>revalidate = 60000</code> in v7, your route will be cached for 60,000 seconds (over 16 hours) instead of 1 minute! Be sure to divide existing millisecond numbers by <code>1000</code>.
                </p>
              </div>

              {/* 2.3 Elimination of dynamic */}
              <div id="breaking-dynamic" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.3
                  </span>
                  <span>Elimination of <code>dynamic</code>: Single Source of Truth via <code>revalidate</code></span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, <code>dynamic</code> was the single source of truth for on-demand SSR (<code>dynamic = true</code>), and <code>revalidate === 0</code> (or omitted) meant static forever (SSG). In Dinou v7, the <code>dynamic</code> keyword is completely removed in favor of unifying route execution and caching under <code>revalidate</code> as the single source of truth:
                </p>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden not-prose my-4 shadow-xs">
                  <div className="overflow-x-auto">
                    <Table className="w-full text-xs">
                      <TableHeader className="bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300">
                        <TableRow>
                          <TableHead className="p-3 text-left font-semibold">Value of <code>revalidate</code></TableHead>
                          <TableHead className="p-3 text-left font-semibold">Rendering Strategy</TableHead>
                          <TableHead className="p-3 text-left font-semibold">Runtime Behavior</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-slate-200 dark:divide-slate-800 text-muted-foreground">
                        <TableRow>
                          <TableCell className="p-3 font-mono font-semibold text-blue-600 dark:text-blue-400">0 (or &lt; 1)</TableCell>
                          <TableCell className="p-3 font-medium text-slate-900 dark:text-slate-100">Dynamic (Live SSR)</TableCell>
                          <TableCell className="p-3">Rendered on every incoming request. Bypasses static and ISR cache.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="p-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">&gt;= 1 (e.g. 60, 300)</TableCell>
                          <TableCell className="p-3 font-medium text-slate-900 dark:text-slate-100">Incremental Static (ISR)</TableCell>
                          <TableCell className="p-3">Cached with background stale-while-revalidate expiring after <i>N</i> seconds.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="p-3 font-mono font-semibold text-purple-600 dark:text-purple-400">false (or omitted)</TableCell>
                          <TableCell className="p-3 font-medium text-slate-900 dark:text-slate-100">Static Forever (SSG)</TableCell>
                          <TableCell className="p-3">Pre-rendered at build time. Cached indefinitely until on-demand revalidation.</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4 min-w-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5 break-words">
                      ❌ Dinou v6 (dynamic was source of truth)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/random/page_functions.ts
export function dynamic() {
  return true; // Deprecated!
}`}
                    </CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5 break-words">
                      ✅ Dinou v7 (Unified revalidate)
                    </span>
                    <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                      {`// src/random/page_functions.ts
export const revalidate = 0; // Live SSR on every request`}
                    </CodeBlock>
                  </div>
                </div>
              </div>

              {/* 2.4 SSG Lifecycle */}
              <div id="breaking-ssg-lifecycle" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.4
                  </span>
                  <span>SSG Lifecycle: Build-Time Generation (<code>dinou build</code>) vs Server Startup</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, static site generation (SSG) was deferred until the production server started (<code>dinou start</code>). The server crawled routes, generated static HTML and RSC payloads, and delayed server readiness. In Dinou v7, <strong>static generation occurs strictly Ahead-of-Time during compilation (<code>dinou build</code>)</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4 min-w-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5 break-words">
                      ❌ Dinou v6 (SSG on Server Startup)
                    </span>
                    <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                      {`# v6: Build only packaged client assets
npm run build

# v6: Server crawl & SSG ran at startup (delayed boot)
npm run start`}
                    </CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5 break-words">
                      ✅ Dinou v7 (AOT SSG on Compilation)
                    </span>
                    <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                      {`# v7: All static HTML & RSC payloads pre-rendered here
npm run build

# v7: Instant boot (0ms) from pre-compiled storage
npm run start`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10 rounded-lg p-4 not-prose my-3 text-xs text-muted-foreground space-y-1.5">
                  <div className="font-semibold text-amber-700 dark:text-amber-300 text-sm">
                    ⚠️ Breaking Consequence for CI/CD Pipelines
                  </div>
                  <p>
                    If your deployment pipeline (e.g. Dockerfile or GitHub Actions) executed <code>npm run build</code> without backend database or CMS environment variables, expecting <code>npm start</code> to generate static pages inside the production container, your static pages will be missing.
                  </p>
                  <p>
                    <strong>Action Required:</strong> Ensure that your build environment (<code>npm run build</code>) has full network and credential access to any data sources required by <code>getStaticPaths</code> and static <code>getProps</code>.
                  </p>
                </div>
              </div>

              {/* 2.5 Layout Lifecycle */}
              <div id="breaking-layout-lifecycle" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.5
                  </span>
                  <span>Layout Lifecycle: 100% State Preservation (Zero Remounts on Navigation)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, navigation was monolithic: navigating between sibling routes that shared a layout (e.g., from <code>/dashboard/analytics</code> to <code>/dashboard/settings</code>) caused the layout component tree to re-evaluate and re-mount. In Dinou v7, <strong>Horizontal Segmentation</strong> separates the layout shell from dynamic child pages: layouts <strong>never unmount or re-execute</strong> during client-side navigation between sibling routes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4 min-w-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5 break-words">
                      ❌ Dinou v6 (Layout Re-mounts on Navigation)
                    </span>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                      {`// src/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  // In v6: Re-fired on every sibling page navigation
  // because the entire layout re-mounted!
  useEffect(() => {
    trackPageView();
  }, []);

  return <section>{children}</section>;
}`}
                    </CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5 break-words">
                      ✅ Dinou v7 (Layout State 100% Preserved)
                    </span>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                      {`// src/dashboard/layout.tsx
import { usePathname } from "dinou";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // In v7: Layout never unmounts. Listen to pathname
  // or place page-level tracking directly in page.tsx!
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return <section>{children}</section>;
}`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10 rounded-lg p-4 not-prose my-3 text-xs text-muted-foreground space-y-1.5">
                  <div className="font-semibold text-amber-700 dark:text-amber-300 text-sm">
                    ⚠️ Breaking Behavioral Change for Layout Logic
                  </div>
                  <p>
                    Any logic inside <code>layout.tsx</code> (such as <code>useEffect</code> without dependencies, search input states, or video players) will <strong>not</strong> re-initialize or reset when navigating across pages sharing that layout.
                  </p>
                  <p>
                    <strong>Action Required:</strong> If you relied on layout re-mounting to reset local UI state or trigger analytics, move that logic into the companion <code>page.tsx</code> or subscribe to route changes via <code>usePathname()</code>.
                  </p>
                </div>
              </div>

              {/* 2.6 Elimination of Express onServerInit(app) in Plugins */}
              <div id="breaking-onserverinit" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.6
                  </span>
                  <span>Elimination of Express <code>onServerInit(app)</code> in Plugins</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v5.2.0 and v6, plugins registered custom Express middlewares or webhook endpoints by receiving the Express application instance via <code>onServerInit(app)</code>. In Dinou v7, <strong>Express has been completely eliminated</strong> in favor of pure W3C Web Standards (<code>Request</code>, <code>Response</code>, <code>ReadableStream</code>). As a result, <code>onServerInit(app)</code> is <strong>no longer invoked or supported</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4 min-w-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5 break-words">
                      ❌ Dinou v6 (Express-based onServerInit)
                    </span>
                    <CodeBlock language="javascript" containerClassName="w-full rounded-lg">
                      {`// dinou.config.js (v6)
module.exports = {
  plugins: [
    {
      name: "custom-api",
      onServerInit(app) {
        // Deprecated! Express app no longer exists in v7
        app.get("/api/health", (req, res) => {
          res.json({ ok: true });
        });
      },
    },
  ],
};`}
                    </CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5 break-words">
                      ✅ Dinou v7 (Web Standards onRequest)
                    </span>
                    <CodeBlock language="javascript" containerClassName="w-full rounded-lg">
                      {`// dinou.config.mjs (v7)
import { defineConfig } from "dinou/config";

export default defineConfig({
  plugins: [
    {
      name: "custom-api",
      async onRequest(request, context) {
        const url = new URL(request.url);
        if (url.pathname === "/api/health") {
          return Response.json({ ok: true });
        }
      },
    },
  ],
});`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10 rounded-lg p-4 not-prose my-3 text-xs text-muted-foreground space-y-1.5">
                  <div className="font-semibold text-amber-700 dark:text-amber-300 text-sm">
                    ⚠️ Required Migration for Custom Middleware & Endpoints
                  </div>
                  <p>
                    Any custom routes, webhooks, or route guards registered through Express must be rewritten using the <code>onRequest(request, context)</code> hook. Returning a standard <code>Response</code> short-circuits the pipeline and immediately responds to the client with zero overhead.
                  </p>
                </div>
              </div>

              {/* 2.7 In-Memory Dev Server */}
              <div id="breaking-in-memory-dev" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    2.7
                  </span>
                  <span>Development Mode Assets: 100% In-Memory by Default (No <code>.dinou/public</code> on Disk)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, <code>dinou dev</code> continuously wrote JavaScript chunks, CSS stylesheets, sourcemaps, and manifests to disk inside the <code>.dinou/public/</code> directory. In Dinou v7, the development engine operates <strong>100% in RAM</strong> via <code>globalThis.__DINOU_MEM_FILES__</code> to eliminate disk I/O bottlenecks and Windows antivirus penalties. The <code>.dinou/public/</code> directory is <strong>never created on disk</strong> during normal development.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4 min-w-0">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block mb-1.5 break-words">
                      ❌ Dinou v6 (Heavy Disk Writes in Dev)
                    </span>
                    <CodeBlock language="text" containerClassName="w-full rounded-lg">
                      {`# In v6, dev server continuously writes to disk:
my-app/
└── .dinou/
    └── public/             # Created on disk
        ├── client.js
        ├── styles.css
        └── manifest.json`}
                    </CodeBlock>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1.5 break-words">
                      ✅ Dinou v7 (100% In-Memory RAM Registry)
                    </span>
                    <CodeBlock language="text" containerClassName="w-full rounded-lg">
                      {`# In v7, served instantly from memory (<0.5ms):
globalThis.__DINOU_MEM_FILES__
├── /client.js       (in-memory Buffer)
├── /styles.css      (in-memory Buffer)
└── manifest.json    (in-memory Buffer)
# (.dinou/public is NOT created on disk)`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10 rounded-lg p-4 not-prose my-3 text-xs text-muted-foreground space-y-1.5">
                  <div className="font-semibold text-amber-700 dark:text-amber-300 text-sm">
                    ⚠️ Breaking Consequence for External Tools & Inspection Scripts
                  </div>
                  <p>
                    If your local development scripts, reverse proxies (e.g. Nginx), or automated test runners expected physical files inside <code>.dinou/public/</code> while <code>npm run dev</code> is running, they will find that the folder does not exist.
                  </p>
                  <p>
                    <strong>Action Required:</strong> If you need physical assets written to disk during development, set the <code>DINOU_WRITE_TO_DISK=true</code> environment variable:
                  </p>
                  <CodeBlock language="bash" containerClassName="w-full rounded-lg mt-2">
                    {`DINOU_WRITE_TO_DISK=true npm run dev`}
                  </CodeBlock>
                  <p className="mt-1">
                    <em>Note: In production builds (<code>npm run build</code>), optimized assets are always written to disk inside <code>.dinou/dist3/</code> and <code>.dinou/dist2/</code>.</em>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Layered Segmentation Architecture */}
            <section id="layered-segmentation" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Layered Segmentation Architecture
              </h2>
              <p>
                Dinou v7 introduces a two-dimensional rendering model: <strong>Horizontal Segmentation</strong> (decoupling layout shells from dynamic child pages) and <strong>Vertical Segmentation</strong> (micro-caching individual components inside a page with <code>&lt;DinouCacheSlot&gt;</code> and PPR).
              </p>

              {/* 3.1 Horizontal Segmentation */}
              <div id="horizontal-segmentation" className="mt-8 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Split className="h-5 w-5 text-blue-500" />
                  <span>3.1. Horizontal Segmentation &amp; Layout State Preservation</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In earlier meta-frameworks, navigating between sibling routes (e.g. <code>/dashboard/analytics</code> to <code>/dashboard/settings</code>) frequently caused the entire layout to re-evaluate, resetting video playback, collapsing open menus, and wiping sidebar search inputs.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dinou v7 splits client requests into two decoupled endpoints:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 my-2">
                  <li><strong>Layout Plane:</strong> Renders exclusively the outer layout shell and parallel slots, establishing the boundary where child content will reside.</li>
                  <li><strong>Page Plane:</strong> Renders exclusively the leaf page component (<code>&lt;Page /&gt;</code>).</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">
                  When navigating between sibling routes sharing a layout, the layout <strong>never unmounts or re-executes</strong>. State is 100% preserved. Furthermore, the layout cache is query-string aware (<code>searchPart</code>), so modifying query parameters (e.g. <code>?tab=billing</code>) updates layout slots in real time without tearing down the shell.
                </p>
              </div>

              {/* 3.2 layout_functions */}
              <div id="layout-functions" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  <span>3.2. <code>layout_functions</code> for Decoupled Layout ISR</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Layouts can now declare independent cache lifetimes, cache tags, and parameter validations via <code>layout_functions.ts</code> (or <code>layout.functions.ts</code>):
                </p>

                <CodeBlock language="typescript" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// src/dashboard/layout_functions.ts
export const revalidate = 3600; // Cache the layout shell for 1 hour
export const getCacheTags = ["dashboard-shell", "nav-links"];
export const allowISG = true;

export async function validateParams(params) {
  return true;
}`}
                </CodeBlock>

                <p className="text-xs text-muted-foreground">
                  🚀 <strong>Granular Purging:</strong> Calling <code>revalidateTag(&quot;dashboard-shell&quot;)</code> purges only the layout shell without forcing the re-rendering of all nested sub-pages. To cascade layout invalidation down to all child pages, pass <code>&#123; cascade: true &#125;</code>.
                </p>
              </div>

              {/* 3.3 revalidatePage API */}
              <div id="revalidate-page-api" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileCode2 className="h-5 w-5 text-teal-500" />
                  <span>3.3. Surgical Page Revalidation: <code>revalidatePage</code> (New in v7 API)</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  In Dinou v6, <code>revalidatePage</code> did not exist: on-demand revalidation was limited to <code>revalidatePath</code>, which re-rendered the entire monolithic route tree. Because Dinou v7 completely decouples layouts from child pages, it introduces the <strong><code>revalidatePage(path)</code></strong> API in <code>&quot;dinou/server&quot;</code>:
                </p>

                <CodeBlock language="typescript" containerClassName="w-full rounded-lg not-prose my-3">
                  {`// Inside a Server Function ("use server") or CMS Webhook
import { revalidatePage, revalidatePath } from "dinou/server";

export async function updateArticle(slug: string) {
  await db.articles.update({ where: { slug }, data: { ... } });

  // ⚡ New in v7: Regenerates strictly page.rsc and index.html
  // Leaves parent layout.rsc completely untouched, saving significant CPU and DB queries!
  await revalidatePage(\`/blog/\${slug}\`);
}`}
                </CodeBlock>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-3 text-xs min-w-0">
                  <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-card space-y-1 min-w-0">
                    <span className="font-semibold text-teal-600 dark:text-teal-400 block break-words">
                      <code>revalidatePage(path)</code> (New in v7)
                    </span>
                    <p className="text-muted-foreground">
                      Surgically revalidates only the leaf page (<code>page.rsc</code>) and its static HTML. Does not re-render or touch any layout shell.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-card space-y-1 min-w-0">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block break-words">
                      <code>revalidatePath(path, &#123; cascade?: boolean &#125;)</code>
                    </span>
                    <p className="text-muted-foreground">
                      Revalidates both the page and layout in that route. When <code>cascade: true</code> is passed, propagates downward to all nested child pages to guarantee 0 hydration mismatch.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3.4 Vertical Segmentation */}
              <div id="vertical-segmentation" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-emerald-500" />
                  <span>3.4. Vertical Segmentation: <code>&lt;DinouCacheSlot&gt;</code> &amp; <code>refreshSlot()</code></span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dinou v7 introduces component-level micro-caching inside pages with <code>&lt;DinouCacheSlot&gt;</code>:
                </p>

                <div className="space-y-4 not-prose my-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      Level 1: Micro-ISR of Server Components &amp; SWR
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Wrap expensive Server Components in a cache slot. Stale content is served instantly while an asynchronous background task updates the cache in the active <code>StorageAdapter</code>:
                    </p>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg mt-3">
                      {`// src/analytics/page.tsx
import { DinouCacheSlot } from "dinou/server";

export default function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      {/* Caches this component for 60 seconds; tags allow targeted invalidation */}
      <DinouCacheSlot id="metrics-slot" tag="metrics-tag" revalidate={60}>
        <ExpensiveMetricsGraph />
      </DinouCacheSlot>
    </div>
  );
}`}
                    </CodeBlock>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      Level 2: In-Place Live Refresh from Client (Zero Page Reload)
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Client Components can programmatically trigger a live re-render of a single slot using <code>refreshSlot(id)</code> from <code>&quot;dinou&quot;</code> without reloading the page or touching sibling states:
                    </p>
                    <CodeBlock language="tsx" containerClassName="w-full rounded-lg mt-3">
                      {`"use client";
import { refreshSlot } from "dinou";

export function LiveRefreshButton() {
  return (
    <button onClick={() => refreshSlot("metrics-slot")}>
      Refresh Metrics Only
    </button>
  );
}`}
                    </CodeBlock>
                  </div>
                </div>
              </div>

              {/* 3.5 Partial Prerendering */}
              <div id="ppr-engine" className="mt-10 scroll-mt-20">
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>3.5. Partial Prerendering (PPR) Engine</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Partial Prerendering combines the instant delivery of static sites (<strong>0ms TTFB</strong>) with the personalization of dynamic SSR in a single HTTP response:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal pl-5 my-2">
                  <li><strong>Static Shell Prelude:</strong> The outer layout and skeleton placeholders are served at 0ms TTFB directly from edge CDN cache.</li>
                  <li><strong>Streaming Dynamic Holes:</strong> Components wrapped in <code>&lt;Suspense&gt;</code> execute concurrently on the server and stream in as chunks that swap the skeleton with live content.</li>
                </ol>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">
                  Configuring PPR:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 not-prose my-3 min-w-0">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs min-w-0">
                    <p className="font-semibold text-blue-500 mb-1">1. Global</p>
                    <p className="text-muted-foreground">In <code>dinou.config.mjs</code>:</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1 break-words">defineConfig(&#123; ppr: true &#125;)</code>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs min-w-0">
                    <p className="font-semibold text-purple-500 mb-1">2. Layout Scope</p>
                    <p className="text-muted-foreground">In <code>layout_functions.ts</code>:</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1 break-words">export const ppr = true;</code>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-xs min-w-0">
                    <p className="font-semibold text-emerald-500 mb-1">3. Page Override</p>
                    <p className="text-muted-foreground">In <code>page_functions.ts</code>:</p>
                    <code className="text-slate-800 dark:text-slate-200 block mt-1 break-words">export const ppr = false;</code>
                  </div>
                </div>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg not-prose my-3">
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
            </section>

            {/* Section 4: Dual-Bundle Engine */}
            <section id="dual-bundle-engine" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Dual-Bundle In-Memory Engine (0-Fork) &amp; Pre-Rendering
              </h2>
              <p>
                React 19 imposes a strict module-resolution constraint: Server Components must be imported under the <code>&quot;react-server&quot;</code> package export condition, while SSR rendering requires client export conditions (such as <code>&quot;browser&quot;</code> / <code>react-dom/server.edge</code>). Importing both in the same module scope throws a fatal conflict.
              </p>
              <p>
                Earlier meta-frameworks circumvented this in Node.js via <code>child_process.fork()</code>. However, this introduced IPC serialization latency, doubled memory usage, and made deployment to edge runtimes (Cloudflare Workers, Deno Deploy) impossible.
              </p>
              <p>
                Dinou v7 introduces an <strong>Ahead-of-Time (AOT) Dual-Bundle In-Memory Pipeline</strong>:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <span>3-Pass In-Memory Compilation (0 Disk I/O)</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                    <li><strong>Pass A (RSC Engine):</strong> Bundled via bundler with <code>[&quot;react-server&quot;]</code> package export conditions. Binds Server Functions and generates client reference descriptors.</li>
                    <li><strong>Pass B (SSR Engine):</strong> Bundled via bundler with <code>[&quot;browser&quot;]</code> package export conditions. Packages <code>react-dom/server.edge</code>, resolves Client Component hooks (<code>useState</code>, <code>useEffect</code>), and client manifests.</li>
                    <li><strong>Pass C (Orchestrator):</strong> Interconnects Pass A and Pass B via standard W3C <code>ReadableStream</code> and handles static assets. In development, files exist purely in <code>globalThis.__DINOU_MEM_FILES__</code> with &lt;0.5ms response times.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-card space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Zap className="h-5 w-5 text-amber-500" />
                    <span>Build-Time Pre-Rendering (Instant Production Server Boot)</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In Dinou v6, static generation ran when starting the production server (<code>dinou start</code>). In Dinou v7, <strong>static generation takes place strictly during <code>dinou build</code></strong>. When you run <code>dinou start</code>, every pre-rendered HTML file and RSC payload is already baked into the <code>StorageAdapter</code>. The production server boots <strong>instantaneously</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Updating Dependencies */}
            <section id="updating-dependencies" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Updating Dependencies, StrictMode &amp; Private Folders
              </h2>
              <p>
                Dinou v7 requires a minimum of <strong>React 19.3.0</strong> (<code>react &gt;= 19.3.0</code> and <code>react-dom &gt;= 19.3.0</code>) as peer dependencies. Update your dependencies:
              </p>

              <CodeBlock language="bash" containerClassName="w-full rounded-lg not-prose my-4">
                {`npm install react@^19.3.0 react-dom@^19.3.0 dinou@latest
npm install -D @types/react@^19.3.0 @types/react-dom@^19.3.0`}
              </CodeBlock>

              <div className="space-y-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    React StrictMode by Default (Configurable via dinou.config.mjs)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    In development mode (<code>dinou dev</code>), client component roots are automatically wrapped in <code>&lt;React.StrictMode&gt;</code> to detect side-effects early and ensure DEV-PROD parity with React Compiler. You can configure or disable it in <code>dinou.config.mjs</code>:
                  </p>
                  <CodeBlock language="javascript" containerClassName="w-full rounded-lg mt-3">
                    {`// dinou.config.mjs
import { defineConfig } from "dinou/config";

export default defineConfig({
  ppr: true,              // Enable Partial Prerendering globally
  reactStrictMode: true, // Default: true in development
});`}
                  </CodeBlock>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    Private Folders with Underscore Prefix (<code>_</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Folders prefixed with an underscore (such as <code>src/_components/</code>, <code>src/_legacy/</code> or <code>src/_drafts/</code>) <strong>completely escape the router scan</strong>. Even if the folder contains <code>page.tsx</code> or <code>layout.tsx</code>, Dinou will never register them as routes or pre-render them.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: CLI Standardization & Scripts */}
            <section id="cli-scripts" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. CLI Standardization &amp; package.json Scripts
              </h2>
              <p>
                Dinou v7 introduces uniform CLI subcommands to select between <strong>esbuild</strong> (default), <strong>Rollup</strong>, and <strong>Webpack</strong> across all runtimes, native binaries, and export modes. Update your <code>package.json</code> scripts:
              </p>

              <CodeBlock language="json" containerClassName="w-full rounded-lg not-prose my-4">
                {`{
  "scripts": {
    "dev": "dinou dev",
    "build": "dinou build",
    "start": "dinou start",
    "dev:esbuild": "dinou dev:esbuild",
    "dev:rollup": "dinou dev:rollup",
    "dev:webpack": "dinou dev:webpack",
    "build:node": "dinou build:node",
    "build:node:esbuild": "dinou build:node:esbuild",
    "build:node:rollup": "dinou build:node:rollup",
    "build:node:webpack": "dinou build:node:webpack",
    "start:node": "dinou start:node",
    "build:cloudflare": "dinou build:cloudflare",
    "build:deno": "dinou build:deno",
    "build:deno:compile": "dinou build:deno:compile",
    "start:deno": "dinou start:deno",
    "build:bun": "dinou build:bun",
    "build:bun:pure": "dinou build:bun:pure",
    "build:bun:compile": "dinou build:bun:compile",
    "start:bun": "dinou start:bun",
    "export-static": "dinou export-static",
    "eject": "dinou eject"
  }
}`}
              </CodeBlock>

              <p className="text-sm text-muted-foreground mt-2">
                All three bundlers share 100% feature parity: RSC parsing, client directive splitting, server functions RPC, and CSS Modules.
              </p>
            </section>

            {/* Section 7: Multi-Runtime Deployments */}
            <section id="multi-runtime-binaries" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Multi-Runtime, Serverless &amp; Static Deployments
              </h2>
              <p>
                Dinou v7 decouples cache storage and runtime operations via <code>StorageAdapter</code> (<code>FileSystemStorage</code>, <code>CloudflareKVStorage</code>, <code>DenoKVStorage</code>, <code>MemoryStorage</code>). Deploy to any infrastructure with zero platform lock-in:
              </p>

              <div className="space-y-4 not-prose my-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Server className="h-4 w-4 text-blue-500" />
                    <span>Node.js Production Server</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deploy to Docker, VPS, AWS EC2, Railway, or Render with <code>dinou build:node</code> and <code>dinou start:node</code>. Full support for streaming SSR, Server Functions (<code>&quot;use server&quot;</code>), and background ISR via <code>FileSystemStorage</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Cloud className="h-4 w-4 text-teal-500" />
                    <span>Serverless Netlify Functions v2</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Deploy with official support for Netlify Functions v2 via <code>dinou/adapters/netlify.js</code>. Pre-configured with <code>preferStatic: true</code>, Netlify serves assets directly through its edge CDN, invoking serverless execution only for dynamic SSR and Server Functions.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Globe className="h-4 w-4 text-emerald-500" />
                    <span>Cloudflare Workers (workerd)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Build edge-ready serverless bundles with <code>dinou build:cloudflare</code>. Backed by <code>CloudflareKVStorage</code> and standard Fetch handlers. Deploy with <code>npx wrangler deploy</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Boxes className="h-4 w-4 text-cyan-500" />
                    <span>Deno (Deploy / Edge) &amp; Standalone Binaries</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Build for <strong>Deno Deploy</strong> and edge environments with <code>dinou build:deno</code>, featuring native Deno KV storage integration (<code>Deno.openKv()</code>). Compile single zero-dependency standalone executables with <code>dinou build:deno:compile</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Bun &amp; Bun Compile</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leverage Bun&apos;s native HTTP server with <code>dinou build:bun</code>, build 100% native Node-free servers with <code>dinou build:bun:pure</code>, or compile to single-binary with <code>dinou build:bun:compile</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    <FileCode2 className="h-4 w-4 text-amber-500" />
                    <span>Static Export (Surge, GitHub Pages, S3)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Generate pure static HTML and assets inside <code>out/</code> using <code>dinou export-static</code>. Ideal for zero-cost hosting on GitHub Pages, Cloudflare Pages, Surge, or AWS S3.
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2">
                    ⚠️ <strong>Caveat on Server Functions:</strong> In static exports without an active backend server process, Server Functions (<code>&quot;use server&quot;</code> RPC calls) will not execute because there is no backend server listening to process mutations. For interactive server-side RPCs, deploy to a runtime server (Node, Netlify, Bun, Deno, or Cloudflare Workers).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Updating .gitignore */}
            <section id="gitignore-update" className="scroll-mt-20 mt-12 sm:mt-16">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                8. Updating .gitignore
              </h2>
              <p>
                Update your <code>.gitignore</code> to ignore the output directories of the multi-runtime engine:
              </p>

              <CodeBlock language="text" containerClassName="w-full rounded-lg not-prose my-4">
                {`node_modules
.dinou
out
dist
.wrangler
.env`}
              </CodeBlock>

              <ul className="text-xs text-muted-foreground mt-3 space-y-1.5 list-disc pl-4 not-prose">
                <li><code>out/</code> stores static HTML and assets exported via <code>dinou export-static</code>.</li>
                <li><code>dist/</code> holds standalone single-executable binaries (e.g., generated with <code>build:deno:compile</code> or <code>build:bun:compile</code>).</li>
                <li><code>.wrangler/</code> is created automatically by Cloudflare when running local worker previews.</li>
              </ul>
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
