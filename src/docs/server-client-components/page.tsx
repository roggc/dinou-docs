import { TableOfContents } from "@/docs/components/table-of-contents";
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
import { CodeBlock } from "@/docs/components/code-block";

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
  { id: "anti-patterns", title: "6.5. Common Traps & Anti-Patterns to Avoid", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
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
              Server vs. Client Components
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the dual-component architecture of React 19 and how Dinou blends server-side data access, zero-JS payloads, and high-performance client interactivity.
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
                    Executes strictly on the server. Zero impact on browser bundle size, secure by design, with direct access to databases, filesystem, and private secrets.
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
                    Pre-rendered to HTML on the server and hydrated in the browser. Supports React state hooks (<code>useState</code>), event listeners (<code>onClick</code>), and browser APIs.
                  </CardContent>
                </Card>
              </div>

              <div id="mental-model" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  1.1. The RSC Mental Model
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Think of Server Components as the backbone of your application that orchestrates data fetching, layouts, and static content. Client Components act as interactive &quot;islands&quot; or leaves embedded inside the server tree.
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
                    <strong>Automatic Streaming:</strong> When wrapped in React <code>&lt;Suspense&gt;</code>, slow asynchronous data streams into the open HTTP response progressively without blocking initial layout delivery.
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
                  <li>Cannot consume client-side React Context providers directly.</li>
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
                <div id="pattern-cache-slots" className="scroll-mt-20 p-5 rounded-xl border border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-mono">4</span>
                    <h3 className="text-base font-bold">
                      6.4. Granular Caching with &lt;DinouCacheSlot&gt;
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    In Server Components, wrap heavy or slow sub-trees with <code>&lt;DinouCacheSlot&gt;</code> to isolate their caching lifecycle vertically. You do not need to turn components into Client Components just to avoid re-fetching:
                  </p>

                  <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                    {`// Inside a Server Component (page.tsx)
import { DinouCacheSlot } from "dinou";
import { SlowAnalyticsChart } from "./SlowAnalyticsChart";

export default function Dashboard() {
  return (
    <div>
      <h1>Live User Dashboard</h1>
      {/* Caches this heavy RSC subtree for 5 minutes (300s) independently */}
      <DinouCacheSlot duration={300} tags={["analytics-slot"]}>
        <SlowAnalyticsChart />
      </DinouCacheSlot>
    </div>
  );
}`}
                  </CodeBlock>
                </div>

                {/* 6.5 Anti-Patterns */}
                <div id="anti-patterns" className="scroll-mt-20 p-5 rounded-xl border border-rose-500/20 bg-rose-50/20 dark:bg-rose-950/10">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-mono">5</span>
                    <h3 className="text-base font-bold">
                      6.5. Common Traps &amp; Anti-Patterns to Avoid
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
