import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Server,
  Laptop,
  Layers,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Cpu,
  Zap,
  Split,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Boxes,
  Lock,
  Globe,
  Database,
  Code2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/docs/components/ui/table";
import { CodeBlock } from "@/docs/components/code-block";
import { CacheSlotGuideSection } from "@/docs/components/cache-slot-guide-section";
import { PprCacheSlotSection } from "@/docs/components/ppr-cache-slot-section";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "overview", title: "1. Overview & Dual-Component Model", level: 2 },
  { id: "mental-model", title: "1.1. The RSC Mental Model", level: 3 },
  { id: "server-components", title: "2. Server Components (RSC)", level: 2 },
  { id: "rsc-capabilities", title: "2.1. Capabilities & Backend Access", level: 3 },
  { id: "rsc-constraints", title: "2.2. Constraints & Limitations", level: 3 },
  { id: "client-components", title: "3. Client Components", level: 2 },
  { id: "client-capabilities", title: "3.1. Interactivity & Browser APIs", level: 3 },
  { id: "ssr-prerender-notice", title: "3.2. Server Pre-Rendering Notice", level: 3 },
  { id: "use-client-directive", title: "4. The 'use client' Directive", level: 2 },
  { id: "boundary-rules", title: "4.1. Establishing Module Boundaries", level: 3 },
  { id: "import-cascading", title: "4.2. Import Cascading Behavior", level: 3 },
  { id: "serialization-boundary", title: "5. Data Serialization Boundary", level: 2 },
  { id: "serializable-types", title: "5.1. Supported Data Types", level: 3 },
  { id: "passing-promises", title: "5.2. Passing Promises & React 19 use()", level: 3 },
  { id: "best-practices", title: "6. Architectural Patterns & Best Practices", level: 2 },
  { id: "pattern-leaves", title: "6.1. Interactive Leaves at the Edges (Recommended)", level: 3 },
  { id: "pattern-composition", title: "6.2. Composition: Server Components as Children", level: 3 },
  { id: "pattern-client-first", title: "6.3. Client-First with Server Data (getProps)", level: 3 },
  { id: "pattern-cache-slots", title: "6.4. Granular Caching with <DinouCacheSlot>", level: 3 },
  { id: "pattern-ppr-cache-slot", title: "6.5. The Synergy: PPR + <DinouCacheSlot>", level: 3 },
  { id: "pattern-cache-slot-guide", title: "6.6. When to Use <DinouCacheSlot>", level: 3 },
  { id: "anti-patterns", title: "6.7. Common Traps & Anti-Patterns to Avoid", level: 3 },
  { id: "rendering-strategies-matrix", title: "7. Data Fetching & Rendering Strategies Matrix", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Component Architecture | Dinou Docs</title>
      <meta
        name="description"
        content="Master the React 19 dual-component model, serializable flight boundaries, component micro-caching with DinouCacheSlot, and Partial Prerendering."
      />
      <link rel="canonical" href="https://dinou.dev/docs/server-client-components" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                React 19 Architecture
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                RSC &amp; Client Boundaries
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Component Architecture
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master the React 19 dual-component model, serializable flight boundaries, component-level micro-caching with &lt;DinouCacheSlot&gt;, Partial Prerendering (PPR), and high-performance rendering strategies in Dinou.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Overview &amp; Dual-Component Model
              </h2>
              <p>
                Dinou is built natively on the <strong>React 19 Server Components (RSC)</strong> specification. Rather than treating your entire application as a single monolithic client-side bundle, Dinou partitions components into two distinct execution environments:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-500/5 shadow-sm">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-2">
                      <Server className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base text-slate-900 dark:text-slate-100">
                      Server Components (RSC)
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Default component type in Dinou.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Rendered to HTML on the server (SSR) with zero client JavaScript. Never hydrated in the browser, eliminating bundle overhead while providing direct access to databases, filesystem, and private secrets.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-500/5 shadow-sm">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 mb-2">
                      <Laptop className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base text-slate-900 dark:text-slate-100">
                      Client Components
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Opt-in with <code>&quot;use client&quot;</code>.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Also pre-rendered to HTML on the server (SSR), and then hydrated in the browser. Shipped in the client JavaScript bundle to enable state (<code>useState</code>), event listeners (<code>onClick</code>), and browser APIs.
                  </CardContent>
                </Card>
              </div>

              <div id="mental-model" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  1.1. The RSC Mental Model
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Think of Server Components as the backbone of your application that orchestrates data fetching, layouts, and non-interactive UI (rendering pure HTML with zero client JavaScript). Client Components act as interactive &quot;islands&quot; or leaves embedded inside the server tree.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The server streams HTML and React Flight JSON representations across an open HTTP stream. The browser consumes this stream without ever downloading the JavaScript source code of your Server Components.
                </p>
              </div>
            </section>

            {/* Section 2: Server Components */}
            <section id="server-components" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Server Components (RSC)
              </h2>
              <p>
                In Dinou, <strong>every component is a Server Component by default</strong> unless explicitly marked with <code>&quot;use client&quot;</code>. They execute exclusively on the server and never ship their implementation code to the browser.
              </p>

              <div id="rsc-capabilities" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  2.1. Capabilities &amp; Backend Access
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li>
                    <strong>Direct Async Execution:</strong> Server Components can be <code>async</code> functions. You can <code>await</code> database queries, microservices, or files directly inside the component body.
                  </li>
                  <li>
                    <strong>Zero Client Bundle Impact:</strong> Large dependencies imported into Server Components (e.g., Markdown parsers, SQL drivers, encryption packages) are never downloaded or executed by the browser.
                  </li>
                  <li>
                    <strong>Secure Secret Access:</strong> Database credentials, private API keys, and environment variables stay strictly on the server without risk of client exposure.
                  </li>
                  <li>
                    <strong>Automatic Streaming with &lt;Suspense&gt;:</strong> When slow asynchronous operations are wrapped in React <code>&lt;Suspense&gt;</code>, the layout shell and fallback UI can be delivered immediately without waiting for slow queries, while data streams progressively into the HTTP response.
                  </li>
                </ul>

                <CodeBlock language="tsx" containerClassName="rounded-lg mt-4">
                  {`// src/users/page.tsx (Server Component by default)
import { getContext } from "dinou";
import { db } from "@/lib/db"; // Never bundled to the client!

export default async function UsersPage() {
  // Direct backend query without an intermediary REST API
  const users = await db.user.findMany({ take: 10 });

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Registered Users</h1>
      <ul className="mt-4 divide-y">
        {users.map((user) => (
          <li key={user.id} className="py-2 flex justify-between">
            <span>{user.name}</span>
            <span className="text-xs font-mono text-muted-foreground">{user.email}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}`}
                </CodeBlock>

                <Alert className="not-prose my-4 border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 font-bold">
                    TTFB &amp; Execution Timing Note
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1 space-y-2">
                    <p>
                      <strong>Static by Default (SSG):</strong> In Dinou, this page is pre-rendered at build time by default. The database query runs during <code>npm run build</code>, serving static HTML to visitors with <strong>instant TTFB (0ms server wait)</strong>.
                    </p>
                    <p>
                      <strong>Dynamic Routes:</strong> If the route is marked dynamic (e.g. <code>revalidate = 0</code> in <code>page_functions.ts</code> or reading cookies), a top-level <code>await</code> blocks the entire HTTP response until the query finishes. To preserve instant TTFB on dynamic routes, delegate the <code>await</code> to a child component wrapped in React <code>&lt;Suspense&gt;</code>.
                    </p>
                  </AlertDescription>
                </Alert>

                {/* Non-blocking Suspense Pattern & Strategy Comparison */}
                <div className="not-prose mt-6 space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Non-Blocking Streaming with React &lt;Suspense&gt;
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    By delegating asynchronous queries to child components wrapped in <code>&lt;Suspense&gt;</code>, the outer layout and fallback UI are sent immediately:
                  </p>

                  <CodeBlock language="tsx" containerClassName="rounded-lg">
                    {`// src/users/page.tsx - Non-blocking streaming layout
import { Suspense } from "react";
import { db } from "@/lib/db";
import { UsersSkeleton } from "./skeleton";

export default function UsersPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      {/* 1. The outer shell is sent immediately (instant TTFB) */}
      <h1 className="text-2xl font-bold">Registered Users</h1>

      {/* 2. Displays fallback while the child query resolves */}
      <Suspense fallback={<UsersSkeleton />}>
        <UsersList />
      </Suspense>
    </main>
  );
}

// Child component handles the async query independently
async function UsersList() {
  const users = await db.user.findMany({ take: 10 });
  return (
    <ul className="mt-4 divide-y">
      {users.map((u) => (
        <li key={u.id} className="py-2 flex justify-between">
          <span>{u.name}</span>
          <span className="text-xs font-mono text-muted-foreground">{u.email}</span>
        </li>
      ))}
    </ul>
  );
}`}
                  </CodeBlock>

                  <div className="mt-6 space-y-2">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      How &lt;Suspense&gt; Behaves Across Rendering Strategies
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The behavior of <code>&lt;Suspense&gt;</code> and fallback skeletons changes fundamentally depending on whether your route is static, dynamic, or hybrid:
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            Pure SSG
                          </CardTitle>
                          <Badge variant="outline" className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                            Static Build
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-muted-foreground">
                          Static Site Generation
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                        <p>
                          <strong>Build-Time Resolution:</strong> During <code>npm run build</code>, the compiler awaits the <code>&lt;Suspense&gt;</code> promise to resolve completely and writes the final resolved HTML directly into the static file.
                        </p>
                        <p>
                          <strong>Fallback Behavior:</strong> Visitors <strong>never</strong> see the loading skeleton because the fallback is eliminated once the build finishes.
                        </p>
                        <p>
                          <strong>Trade-off:</strong> 0ms TTFB from CDN edge, but data reflects build-time state (stale until next build/revalidation).
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-500/20 bg-amber-50/20 dark:bg-amber-950/10 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            Pure Dynamic SSR
                          </CardTitle>
                          <Badge variant="outline" className="text-[10px] font-mono text-amber-600 dark:text-amber-400 border-amber-500/30">
                            Per Request
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-muted-foreground">
                          On-Demand Streaming
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                        <p>
                          <strong>On-Demand Streaming:</strong> On every HTTP request, the server executes the route and immediately streams the shell and <code>&lt;Suspense fallback=&#123;&lt;Skeleton /&gt;&#125;&gt;</code> skeleton over the open HTTP connection.
                        </p>
                        <p>
                          <strong>Fallback Behavior:</strong> The user sees the skeleton while waiting, and React streams the resolved HTML chunk when the query finishes.
                        </p>
                        <p>
                          <strong>Trade-off:</strong> 100% fresh data and non-blocking layout, but incurs continuous server compute costs, DB load, and request-time latency.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-purple-50/20 dark:bg-purple-950/10 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            Partial Prerendering (PPR)
                          </CardTitle>
                          <Badge variant="outline" className="text-[10px] font-mono text-purple-600 dark:text-purple-400 border-purple-500/30">
                            Hybrid
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-muted-foreground">
                          Static Shell + Live Holes
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-2">
                        <p>
                          <strong>Static Shell Prerender:</strong> The outer layout shell and the fallback skeleton are pre-rendered at build time and served immediately with <strong>0ms TTFB</strong> from the CDN edge.
                        </p>
                        <p>
                          <strong>Fallback Behavior:</strong> The skeleton renders instantly from static cache, while the server concurrently executes only the dynamic query and streams live data into the hole.
                        </p>
                        <p>
                          <strong>Trade-off:</strong> Combines the instant delivery of SSG with the fresh, live data of dynamic SSR at minimal server compute cost.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div id="rsc-constraints" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rose-500" />
                  2.2. Constraints &amp; Limitations
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Because Server Components do not execute in the browser, they cannot use browser-specific or client-interactive features:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                  <li>Cannot use state or lifecycle hooks (<code>useState</code>, <code>useEffect</code>, <code>useReducer</code>).</li>
                  <li>Cannot add interactive client DOM event listeners (e.g. <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>).</li>
                  <li>Cannot access browser-only globals (<code>window</code>, <code>document</code>, <code>localStorage</code>, <code>navigator</code>).</li>
                  <li>
                    Cannot consume (read) React Context with <code>useContext()</code> or <code>use(Context)</code>. (While Server Components can render <code>&lt;Context&gt;</code> providers for client children, they cannot read context values themselves).
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Client Components */}
            <section id="client-components" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Client Components
              </h2>
              <p>
                Client Components provide rich, real-time client-side interactivity. They enable event handlers, local component state, animations, and access to browser APIs.
              </p>

              <div id="client-capabilities" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  3.1. Interactivity &amp; Browser APIs
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Client Components have complete access to the client-side React ecosystem:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                  <li>Full state management with <code>useState</code>, <code>useReducer</code>, and React 19 <code>useActionState</code>.</li>
                  <li>Side effects, timers, and DOM subscriptions via <code>useEffect</code> and <code>useLayoutEffect</code>.</li>
                  <li>DOM event handling (clicks, hovers, drags, keystrokes, form submissions).</li>
                  <li>Browser Web APIs (<code>localStorage</code>, <code>Geolocation</code>, <code>IntersectionObserver</code>, <code>Audio</code>).</li>
                  <li>Consuming React Context providers created on the client.</li>
                </ul>
              </div>

              <div id="ssr-prerender-notice" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  3.2. Server Pre-Rendering Notice
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A common point of confusion is assuming Client Components execute exclusively in the browser. <strong>Client Components are pre-rendered on the server to HTML</strong> during initial page load to ensure fast First Contentful Paint (FCP) and SEO indexing.
                </p>
                <Alert className="not-prose my-3 border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 font-bold">
                    SSR Execution Safety Rule
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Because Client Components run on the server during pre-rendering, accessing browser globals directly in the root of the component function (e.g. <code>const token = localStorage.getItem(&quot;token&quot;)</code>) will throw a server runtime error. Defer browser-only access inside a <code>useEffect</code> hook or guard it with <code>if (typeof window !== &quot;undefined&quot;)</code>.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Section 4: The 'use client' Directive */}
            <section id="use-client-directive" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. The &quot;use client&quot; Directive
              </h2>
              <p>
                To declare a component as a Client Component, add the <code>&quot;use client&quot;</code> directive at the very top of the file, before any import statements or comments.
              </p>

              <div id="boundary-rules" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-500" />
                  4.1. Establishing Module Boundaries
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The directive is not a runtime function call—it is an instruction to the bundler (esbuild, Rollup, Webpack) that defines the network split point:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-lg">
                  {`"use client"; // Must be at the very top of the file!

import { useState } from "react";

export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
    >
      Count: {count}
    </button>
  );
}`}
                </CodeBlock>
              </div>

              <div id="import-cascading" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-500" />
                  4.2. Import Cascading Behavior
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Once a file declares <code>&quot;use client&quot;</code>, all components, utility modules, and third-party libraries imported by that file are automatically treated as part of the client bundle. You do not need to add <code>&quot;use client&quot;</code> to child modules imported by a Client Component.
                </p>
              </div>
            </section>

            {/* Section 5: Data Serialization Boundary */}
            <section id="serialization-boundary" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Data Serialization Boundary
              </h2>
              <p>
                When passing props from a Server Component to a Client Component, data crosses the network boundary (serialized as React Flight JSON). Props passed across this boundary must be <strong>serializable</strong>.
              </p>

              <div id="serializable-types" className="scroll-mt-20 mt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-cyan-500" />
                  5.1. Supported Data Types
                </h3>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-4">
                  <div className="border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Serializable (Allowed across boundary)</span>
                    </div>
                    <ul className="text-xs space-y-2 list-disc pl-4 text-muted-foreground">
                      <li><strong>Primitives:</strong> <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>.</li>
                      <li><strong>Plain Objects &amp; Arrays:</strong> Objects with serializable values (e.g. <code>&#123; id: 1, name: &quot;Dinou&quot; &#125;</code>).</li>
                      <li><strong>Dates:</strong> <code>Date</code> objects are serialized and reconstructed by React.</li>
                      <li><strong>React Elements (JSX):</strong> Server Components passed as <code>children</code> or named slots.</li>
                      <li><strong>Promises:</strong> Passed directly from Server to Client (read with React 19 <code>use()</code>).</li>
                      <li><strong>Server Functions:</strong> Bound actions declared with <code>&quot;use server&quot;</code>.</li>
                    </ul>
                  </div>

                  <div className="border border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-400 text-sm">
                      <XCircle className="h-5 w-5" />
                      <span>Non-Serializable (Blocked across boundary)</span>
                    </div>
                    <ul className="text-xs space-y-2 list-disc pl-4 text-muted-foreground">
                      <li><strong>Client Functions:</strong> Cannot pass client callbacks (e.g. <code>onClick=&#123;() =&gt; ...&#125;</code>) from Server Components.</li>
                      <li><strong>Class Instances:</strong> Complex prototypes, database connections, and class instances (e.g. Prisma models with methods) will lose their prototype.</li>
                      <li><strong>Symbols &amp; WeakMaps:</strong> Non-enumerable or memory-bound JavaScript data structures.</li>
                      <li><strong>Browser DOM Elements:</strong> Native HTML DOM nodes (<code>window</code>, <code>document.body</code>).</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="passing-promises" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-indigo-500" />
                  5.2. Passing Promises &amp; React 19 use()
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  React 19 supports passing an unresolved <strong>Promise</strong> as a prop from a Server Component to a Client Component. The Client Component reads the promise synchronously using the <code>use()</code> hook, automatically triggering Suspense fallbacks until the promise settles:
                </p>

                <CodeBlock language="tsx" containerClassName="rounded-lg">
                  {`// Server Component
import { Suspense } from "react";
import { UserProfile } from "./user-profile"; // "use client"

export default function Page() {
  // Start fetching without awaiting!
  const userPromise = fetchUserData();

  return (
    <Suspense fallback={<div>Loading profile skeleton...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Client Component (user-profile.tsx)
"use client";
import { use } from "react";

export function UserProfile({ userPromise }: { userPromise: Promise<{ name: string }> }) {
  // Unwraps the promise value seamlessly
  const user = use(userPromise);
  return <h2>Hello, {user.name}</h2>;
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Section 6: Architectural Patterns & Best Practices */}
            <section id="best-practices" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Architectural Patterns &amp; Best Practices
              </h2>
              <p>
                Dinou empowers you to choose the exact architectural balance between server performance and client ergonomics. Follow these battle-tested patterns for optimal architecture:
              </p>

              <div className="space-y-10 not-prose mt-6">
                {/* 6.1 Interactive Leaves */}
                <div id="pattern-leaves" className="scroll-mt-20 p-5 rounded-xl border border-blue-500/20 bg-blue-50/20 dark:bg-blue-950/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">1</span>
                    <h3 className="text-base font-bold">
                      6.1. Interactive Leaves at the Edges (Recommended)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Keep your layouts, route pages, and static wrappers as Server Components. Only push the <code>&quot;use client&quot;</code> boundary down to the small, interactive &quot;leaf&quot; components (such as an upvote button, search box, or dropdown menu).
                  </p>

                  <div className="bg-background/80 p-3.5 rounded-lg border font-mono text-xs space-y-1 text-slate-700 dark:text-slate-300">
                    <div>src/dashboard/layout.tsx &rarr; <span className="text-blue-600 dark:text-blue-400 font-bold">Server Component</span> (zero client JS)</div>
                    <div>src/dashboard/page.tsx &rarr; <span className="text-blue-600 dark:text-blue-400 font-bold">Server Component</span> (fetches data directly)</div>
                    <div>src/dashboard/_components/search-bar.tsx &rarr; <span className="text-purple-600 dark:text-purple-400 font-bold">&quot;use client&quot;</span> (interactive leaf)</div>
                    <div>src/dashboard/_components/action-button.tsx &rarr; <span className="text-purple-600 dark:text-purple-400 font-bold">&quot;use client&quot;</span> (interactive leaf)</div>
                  </div>
                </div>

                {/* 6.2 Composition Pattern */}
                <div id="pattern-composition" className="scroll-mt-20 p-5 rounded-xl border border-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-mono">2</span>
                    <h3 className="text-base font-bold">
                      6.2. Composition: Server Components as Children
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    A Client Component <strong>cannot directly import a Server Component</strong> (because bundling a Server Component into the client module would defeat the RSC boundary). However, a Client Component can receive Server Components as <code>children</code> or via named props!
                  </p>

                  <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                    {`// Client Component: ModalContainer.tsx
"use client";
import { useState, type ReactNode } from "react";

export function ModalContainer({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div className="modal-backdrop">
          {/* children is rendered on the server and passed as pre-rendered JSX! */}
          {children}
        </div>
      )}
    </div>
  );
}

// Server Component: page.tsx
import { ModalContainer } from "./ModalContainer";
import { HeavyServerProfile } from "./HeavyServerProfile"; // Server Component

export default function Page() {
  return (
    <ModalContainer>
      {/* HeavyServerProfile remains 100% on the server! */}
      <HeavyServerProfile />
    </ModalContainer>
  );
}`}
                  </CodeBlock>
                </div>

                {/* 6.3 Client-First Model */}
                <div id="pattern-client-first" className="scroll-mt-20 p-5 rounded-xl border border-purple-500/20 bg-purple-50/20 dark:bg-purple-950/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-xs font-mono">3</span>
                    <h3 className="text-base font-bold">
                      6.3. Client-First with Server Data (getProps)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    If you are building an interactive canvas, video editor, or complex SPA dashboard and prefer traditional React where you can use <code>useState</code> and <code>onClick</code> anywhere in the page without boundary splitting, use Dinou&apos;s <strong>Client-First Model</strong>:
                  </p>

                  <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                    {`// src/canvas/page_functions.ts - Runs securely on the server
export async function getProps(params: { id: string }) {
  const project = await db.projects.findById(params.id);
  return { project };
}

// src/canvas/page.tsx - Entire page is a Client Component
"use client";
import { useState } from "react";

export default function CanvasPage({ project }: { project: any }) {
  // Full access to state, effects, and events everywhere in the file!
  const [layers, setLayers] = useState(project.initialLayers);

  return (
    <div onClick={() => console.log("clicked")}>
      <Toolbar onAddLayer={(l) => setLayers([...layers, l])} />
      <Stage layers={layers} />
    </div>
  );
}`}
                  </CodeBlock>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Advantage:</strong> Fast development speed, traditional React ergonomics, with secure backend data fetching and SSR pre-rendering intact.
                  </p>
                </div>

                {/* 6.4 Granular Caching */}
                <div id="pattern-cache-slots" className="scroll-mt-20 p-5 rounded-xl border border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-4">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-mono">4</span>
                    <h3 className="text-base font-bold">
                      6.4. Granular Caching with &lt;DinouCacheSlot&gt; (Vertical Micro-ISR)
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A common architectural trap in dynamic RSC applications is converting heavy server widgets into Client Components just to gain client-side memory caching (such as SWR or TanStack Query). In Dinou, <code>&lt;DinouCacheSlot&gt;</code> provides <strong>component-level server caching (Vertical Segmentation)</strong> directly in the RSC layer.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2 text-xs">
                    <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20">
                      <div className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                        The Common Mistake (Demoting to Client)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        To avoid running an expensive 2-second database query on every dynamic page load, developers often convert the widget to <code>&quot;use client&quot;</code> with a client cache. This bloats the client JS bundle, loses direct database access, exposes internal API endpoints, and introduces client-side network waterfalls.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                      <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                        Dinou&apos;s Solution (&lt;DinouCacheSlot&gt;)
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Keep the component on the server! <code>&lt;DinouCacheSlot&gt;</code> caches the rendered RSC Flight payload of that specific subtree on the server for a designated TTL (e.g. 300s). The rest of the page remains 100% dynamic, while the expensive subtree serves in 0ms.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Can a &lt;DinouCacheSlot&gt; Contain Client Components?
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong>Yes, absolutely.</strong> While <code>&lt;DinouCacheSlot&gt;</code> itself is an async Server Component that executes exclusively on the server, its children can freely render interactive Client Components. Dinou caches the <strong>Client Component reference along with its pre-computed props</strong>. The client hydrates it normally with full interactivity (events, state, animations):
                    </p>
                  </div>

                  <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                    {`// 1. Client Component: interactive-chart.tsx (Hydrates with 100% interactivity)
"use client";
import { useState } from "react";

export function InteractiveChart({ data }: { data: any }) {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold">Metrics (Zoom: {zoom}x)</span>
        <button 
          onClick={() => setZoom((z) => z + 1)}
          className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded"
        >
          Zoom In
        </button>
      </div>
      <canvas data-zoom={zoom} />
    </div>
  );
}

// 2. Server Component: page.tsx (Dynamic page with an isolated cached slot)
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou";
import { db } from "@/lib/db";
import { UserGreeting } from "./UserGreeting"; // Reads user session/cookies
import { GreetingSkeleton, AnalyticsSkeleton } from "./skeletons";
import { InteractiveChart } from "./interactive-chart"; // Client Component

// Server Component performing the heavy query
async function HeavyAnalyticsWidget() {
  const analyticsData = await db.analytics.aggregateBigData(); // 2-second query
  return <InteractiveChart data={analyticsData} />;
}

export default function DashboardPage() {
  return (
    <main className="space-y-6 p-8">
      {/* Dynamic personal component: reads cookies/session without blocking initial layout delivery (preserves fast TTFB) */}
      <Suspense fallback={<GreetingSkeleton />}>
        <UserGreeting />
      </Suspense>

      {/* Micro-ISR hole: wrapped in Suspense so cache misses stream without blocking TTFB */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <DinouCacheSlot id="analytics-slot" duration={300} tags={["analytics"]}>
          <HeavyAnalyticsWidget />
        </DinouCacheSlot>
      </Suspense>
    </main>
  );
}`}
                  </CodeBlock>

                  <div className="pt-2 text-xs text-muted-foreground space-y-1.5">
                    <p>
                      <strong>Why wrap in &lt;Suspense&gt;?</strong> While <code>&lt;DinouCacheSlot&gt;</code> works without it on cache hits, on a <em>cache miss</em> (cold start or expired TTL) an unwrapped slot would block the entire HTTP response during the heavy query. Wrapping it in <code>&lt;Suspense&gt;</code> guarantees instant TTFB by streaming the layout and skeleton immediately.
                    </p>
                    <p>
                      <strong>What about UserGreeting?</strong> In dynamic SSR, wrapping <code>UserGreeting</code> in <code>&lt;Suspense&gt;</code> ensures that reading user session or auth cookies does not delay the initial response, keeping TTFB fast. In PPR, it also prevents dynamic request data from de-optimizing the build-time static shell.
                    </p>
                    <p>
                      <strong>In-Place Client Refresh:</strong> Any Client Component can trigger an on-demand re-render of only this slot using <code>refreshSlot(&quot;analytics-slot&quot;)</code> from <code>&quot;dinou&quot;</code> without reloading the page or resetting state in other components.
                    </p>
                    <p>
                      <strong>On-Demand Invalidation:</strong> Server Functions and webhooks can invalidate the slot cache immediately via <code>revalidateTag(&quot;analytics&quot;)</code>.
                    </p>
                  </div>
                </div>

                {/* 6.5 The Synergy: PPR + DinouCacheSlot */}
                <PprCacheSlotSection />

                {/* 6.6 When to Use DinouCacheSlot */}
                <CacheSlotGuideSection />

                {/* 6.7 Anti-Patterns */}
                <div id="anti-patterns" className="scroll-mt-20 p-5 rounded-xl border border-rose-500/20 bg-rose-50/20 dark:bg-rose-950/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-mono">7</span>
                    <h3 className="text-base font-bold">
                      6.7. Common Traps &amp; Anti-Patterns to Avoid
                    </h3>
                  </div>

                  <div className="space-y-4 mt-3 text-xs leading-relaxed text-muted-foreground">
                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20">
                      <div className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">
                        Trap 1: Placing &quot;use client&quot; at the root layout
                      </div>
                      <p>
                        Marking <code>src/layout.tsx</code> as a Client Component cascades the client boundary to every single page in your application. Root layouts should always be Server Components to protect secrets and enable streaming.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20">
                      <div className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">
                        Trap 2: Direct Server Component imports in Client files
                      </div>
                      <p>
                        Never write <code>import ServerComponent from &quot;./ServerComponent&quot;</code> inside a file containing <code>&quot;use client&quot;</code>. Use the Composition Pattern (Section 6.2) and pass it as <code>children</code> instead.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20">
                      <div className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">
                        Trap 3: Accessing browser APIs in component body during SSR
                      </div>
                      <p>
                        Calling <code>window.innerWidth</code> or <code>localStorage.getItem()</code> outside of a <code>useEffect</code> in a Client Component causes server pre-rendering crashes. Always wrap browser calls in <code>useEffect</code> or an event handler.
                      </p>
                    </div>

                    <div className="p-3 bg-background/80 rounded-lg border border-rose-500/20">
                      <div className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">
                        Trap 4: Passing non-serializable objects across boundaries
                      </div>
                      <p>
                        Do not pass callback functions or ORM model class instances with methods as props to Client Components. Extract plain JavaScript objects or use Server Functions (<code>&quot;use server&quot;</code>) for actions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Data Fetching & Rendering Strategies Matrix */}
            <section id="rendering-strategies-matrix" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Data Fetching &amp; Rendering Strategies Matrix
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To help you choose the ideal pattern for each route and component, the following matrix compares the data fetching and rendering strategies available in Dinou, their execution timing, TTFB, streaming resolution latency, database/server pressure, and network round-trip characteristics:
              </p>

              <div className="not-prose my-6 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-card shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="w-full text-xs">
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/60 border-b">
                      <TableRow>
                        <TableHead className="w-10 text-center font-bold">#</TableHead>
                        <TableHead className="min-w-[190px] font-bold">Strategy / Pattern</TableHead>
                        <TableHead className="min-w-[140px] font-bold">Execution Context</TableHead>
                        <TableHead className="min-w-[115px] font-bold">TTFB (First Byte)</TableHead>
                        <TableHead className="min-w-[125px] font-bold">Stream / Content Ready</TableHead>
                        <TableHead className="min-w-[125px] font-bold">Server &amp; DB Load</TableHead>
                        <TableHead className="min-w-[90px] font-bold text-center">Network Waterfall?</TableHead>
                        <TableHead className="min-w-[105px] font-bold">Data Freshness</TableHead>
                        <TableHead className="min-w-[200px] font-bold">Ideal Use Case</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {/* Row 1 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">1</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC Direct await (SSG)</div>
                          <div className="text-[11px] text-muted-foreground">Top-level <code>await</code> or <code>getProps</code> in Server Component</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (<code>npm run build</code>)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (0ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Zero (Build Time)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                        <TableCell className="text-muted-foreground">Blogs, documentation, static marketing pages.</TableCell>
                      </TableRow>

                      {/* Row 2 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">2</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC Direct await (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground">Top-level <code>await</code> or <code>getProps</code> without <code>&lt;Suspense&gt;</code></div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Server)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Blocked)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground font-mono text-[11px]">N/A (Blocks TTFB)</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Private views where entire UI requires a single critical query and waiting is acceptable.</TableCell>
                      </TableRow>

                      {/* Row 3 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">3</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; (SSG)</div>
                          <div className="text-[11px] text-muted-foreground">Static route with async component boundary</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (Compiler awaits)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (0ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Zero (Build Time)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                        <TableCell className="text-muted-foreground">Decoupled async components in static pages; outputs final HTML without showing fallback.</TableCell>
                      </TableRow>

                      {/* Row 4 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">4</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground">Streaming SSR on demand (without PPR)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Server streaming)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Fast (Early Layout)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Waits 1-3s DB)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Dynamic routes on runtimes without edge caching or when PPR is disabled.</TableCell>
                      </TableRow>

                      {/* Row 5 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">5</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Static / Asymmetric ISR)</div>
                          <div className="text-[11px] text-muted-foreground">Pre-rendered static shell with decoupled slot TTL or <code>refreshSlot()</code></div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (Pre-rendered) + On-Demand Slot Reval</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (~0-2ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Near-Zero (Decoupled)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-amber-600 dark:text-amber-400 font-medium">Decoupled TTL / refreshSlot()</TableCell>
                        <TableCell className="text-muted-foreground">Static/ISR pages (e.g. 24h page revalidate) containing a widget (stock, pricing) needing fast updates (60s) or surgical in-place client refreshes.</TableCell>
                      </TableRow>

                      {/* Row 6 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">6</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">RSC with &lt;Suspense&gt; + &lt;DinouCacheSlot&gt; (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground">Dynamic streaming with vertical Micro-ISR (TTL cache)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Cache hit: ~2ms / Miss: async query)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Fast (Early Layout)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (~2ms Cache)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Near-Zero (99% Offload)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-amber-600 dark:text-amber-400 font-medium">TTL / Tag Reval</TableCell>
                        <TableCell className="text-muted-foreground">Dynamic routes (with session/cookies) containing heavy widgets (analytics, feeds). Flushes layout instantly; slot streams from cache without DB load.</TableCell>
                      </TableRow>

                      {/* Row 7 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 bg-blue-50/20 dark:bg-blue-950/10">
                        <TableCell className="font-mono text-center text-blue-600 dark:text-blue-400 font-bold">7</TableCell>
                        <TableCell>
                          <div className="font-bold text-blue-700 dark:text-blue-300">RSC with &lt;Suspense&gt; (PPR Hybrid)</div>
                          <div className="text-[11px] text-muted-foreground">Partial Prerendering (Static Shell + Live Uncached Hole)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Static Shell (Build) + Live Hole (Server on every request)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (Shell from Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Hole waits for DB)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% Hole queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground font-medium text-slate-800 dark:text-slate-200">Instant static layout from Edge with zero-delay live streamed data for real-time personalization.</TableCell>
                      </TableRow>

                      {/* Row 8 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 bg-gradient-to-r from-indigo-50/40 via-purple-50/30 to-blue-50/20 dark:from-indigo-950/25 dark:via-purple-950/20 dark:to-blue-950/15 border-l-2 border-indigo-500">
                        <TableCell className="font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">8</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
                            <span>PPR + &lt;DinouCacheSlot&gt; (PPR Hybrid Synergy)</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider">Synergy</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground">Static Edge Shell + Cached Streamed Hole (Max Concurrency)</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Edge CDN (Shell) + Server Cache Storage (Slot)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (Edge) + ~5ms (Slot)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (~2-5ms Cache)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Near-Zero (99.9% Offload)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-amber-600 dark:text-amber-400 font-medium">TTL / Tag Reval</TableCell>
                        <TableCell className="text-muted-foreground font-medium text-slate-800 dark:text-slate-200">
                          <strong className="text-indigo-600 dark:text-indigo-400">Peak Performance:</strong> Instant CDN paint (0ms TTFB) with 99.9% database query offload. Ideal for high-traffic stores, trending catalog pages, and viral portals.
                        </TableCell>
                      </TableRow>

                      {/* Row 9 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 bg-purple-50/20 dark:bg-purple-950/10">
                        <TableCell className="font-mono text-center text-purple-600 dark:text-purple-400 font-bold">9</TableCell>
                        <TableCell>
                          <div className="font-bold text-purple-700 dark:text-purple-300">RSC Promise ➔ Client use() (Dynamic / PPR)</div>
                          <div className="text-[11px] text-muted-foreground">RSC initiates un-awaited Promise; Client unwraps via <code>use()</code></div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Server starts query; Client suspends</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (with PPR)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Waits for Promise
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (Live query)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground font-medium text-slate-800 dark:text-slate-200">Interactive stateful widgets (charts, canvas, filters) needing fresh streaming data.</TableCell>
                      </TableRow>

                      {/* Row 10 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">10</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client-First getProps (SSG)</div>
                          <div className="text-[11px] text-muted-foreground"><code>page_functions.ts</code> + Client Component</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Build Time (<code>npm run build</code>)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            0ms (CDN Edge)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Instant (0ms)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[10px]">
                            Zero (Build Time)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-muted-foreground">Fixed at build</TableCell>
                        <TableCell className="text-muted-foreground">Dinou Client-First model for highly interactive static web applications.</TableCell>
                      </TableRow>

                      {/* Row 11 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">11</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client-First getProps (Dynamic)</div>
                          <div className="text-[11px] text-muted-foreground"><code>page_functions.ts</code> + Client Component in SSR</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Per Request (Server awaits <code>getProps</code>)</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Slow (Blocked)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground font-mono text-[11px]">N/A (Blocks TTFB)</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Complex SPAs where developers prefer classic React hooks and tolerate TTFB wait.</TableCell>
                      </TableRow>

                      {/* Row 12 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">12</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client Calling Server Function (Initial Mount - Dynamic RPC)</div>
                          <div className="text-[11px] text-muted-foreground">Client Component calls <code>&quot;use server&quot;</code> during initial mount</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Client RPC on mount</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-[10px]">
                            Fast (Shell Only)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Delayed (Waterfall)
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
                            Heavy (100% RPC queries)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-rose-600 dark:text-rose-400">Yes (Waterfall)</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Supported, but sub-optimal compared to pattern 9 (RSC Promise streaming) due to the second HTTP round trip.</TableCell>
                      </TableRow>

                      {/* Row 13 */}
                      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-mono text-center text-muted-foreground font-bold">13</TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900 dark:text-slate-100">Client Calling Server Function (User Action - Dynamic RPC)</div>
                          <div className="text-[11px] text-muted-foreground">Invoked on user button click, form submission, or mutation</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">Client on user action (POST RPC)</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs text-muted-foreground">N/A (Post-Load)</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground font-mono text-[11px]">N/A (User Event)</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                            On-Demand (Per Action)
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">None</TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium">100% Live</TableCell>
                        <TableCell className="text-muted-foreground">Form submissions, state persistence, on-demand data refreshes, and RPC actions.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="not-prose grid gap-4 md:grid-cols-2 mt-4">
                <Alert className="border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 font-bold text-xs">
                    Server Components with getProps
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Using Dinou&apos;s <code>getProps</code> with a Server Component is functionally equivalent to doing top-level <code>await</code> in the component body (Patterns 1 &amp; 2): both run on the server before rendering the component and block TTFB on dynamic routes unless wrapped in <code>&lt;Suspense&gt;</code>.
                  </AlertDescription>
                </Alert>

                <Alert className="border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20">
                  <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-700 dark:text-amber-300 font-bold text-xs">
                    Legacy useEffect Fetching Omitted
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Traditional client-side data fetching via <code>useEffect</code> + <code>fetch()</code> is intentionally omitted from the primary strategies. In React 19 and modern RSC architectures, fetching on mount via <code>useEffect</code> is considered a legacy anti-pattern that creates network waterfalls, causes layout shifts, and misses server streaming.
                  </AlertDescription>
                </Alert>
              </div>
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
