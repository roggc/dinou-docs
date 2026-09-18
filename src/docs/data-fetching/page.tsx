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
  Database,
  Server,
  RefreshCw,
  Smartphone,
  Zap,
  Info,
  Globe,
  Code,
  Cpu,
  ArrowRightLeft,
  FunctionSquare,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "without-suspense", title: "Without Suspense", level: 2 },
  {
    id: "server-components",
    title: "Server Components (Async Data)",
    level: 3,
  },
  { id: "getprops", title: "Using getProps", level: 3 },
  { id: "with-suspense", title: "With Suspense & Server Functions", level: 2 },
  {
    id: "client-reactive",
    title: "Client Components (Reactive Updates)",
    level: 3,
  },
  { id: "server-streaming", title: "Server Components (Streaming)", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Data Fetching
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou offers two main strategies for data fetching: traditional
              with Server Components and advanced with Suspense combined with
              Server Functions for reactive experiences.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Section 1: Without Suspense */}
            <section id="without-suspense">
              <h2>Without Suspense (Traditional Strategy)</h2>
              <p className="text-lg">
                Ideal for static pages or data that doesn't change frequently.
                This strategy blocks rendering until all data is available.
              </p>

              {/* Subsection: Server Components */}
              <section id="server-components">
                <h3>Server Components (Async Data)</h3>
                <p>
                  Define async functions to fetch data directly in Server
                  Components without sending logic to the client.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/blog/page.jsx
import db from "@/lib/db";

export default async function Page() {
  const posts = await db.query("SELECT * FROM posts");

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}
                </CodeBlock>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Database className="h-5 w-5 text-blue-500" />
                    <span>Direct Data Access</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Fetch data on the server for security and performance. No
                    client-side fetching needed.
                  </p>
                </div>
              </section>

              {/* New Subsection: getProps */}
              <section id="getprops" className="mt-8">
                <h3>Using getProps (Data Injection)</h3>
                <p>
                  For static pages or route-based data, use{" "}
                  <code>getProps</code>
                  in <code>page_functions.ts</code> to inject data into your
                  pages and layouts.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/blog/[slug]/page_functions.ts

export async function getProps(params) {
  // 1. Fetch data based on the URL path (e.g., /blog/my-post)
  const post = await db.getPost(params.slug);

  // 2. Return data.
  // 'page' props go to page.jsx
  // 'layout' props go to layout.jsx (useful for setting document titles dynamically)
  return {
    page: { post },
    layout: { title: post.title },
  };
}`}
                </CodeBlock>

                <Alert className="not-prose mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Design Note: Parameter vs. Server Context</AlertTitle>
                  <AlertDescription>
                    <p>
                      While <code>getProps</code> only receives the route <code>params</code> as its parameter, you can still read cookies, headers, or query parameters by calling <code>getContext()</code> since the function executes on the server.
                    </p>
                    <p className="mt-2 font-semibold">
                      Performance Trade-off:
                    </p>
                    <p className="mt-0.5">
                      Because <code>getProps</code> blocks the rendering process at request time, the server waits for it to resolve before starting the render. Keep it fast for dynamic routes; pre-rendered static pages (SSG) are unaffected since their data is fetched at server startup. In Incremental Static Generation (ISG), it only blocks the very first request by the first visitor before the page is cached. If you need slow dynamic fetches on dynamic routes, defer them to a <code>Suspense</code> boundary wrapping a Server Function.
                    </p>
                  </AlertDescription>
                </Alert>

                 <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Server className="h-5 w-5 text-blue-500" />
                        <span>For Static Pages (SSG / ISG)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Ideal for generating static pages at server startup (SSG) or on-demand via Incremental Static Generation (ISG).
                    </CardContent>
                  </Card>
                  <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                        <Globe className="h-5 w-5" />
                        <span>Root Layout Injection</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Allows injecting props directly into the resolved Root Layout for that route, in addition to the page itself.
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* Section 2: With Suspense */}
            <section id="with-suspense" className="mt-12">
              <h2>
                With Suspense &amp; Server Functions (React 19 Reactive Strategy)
              </h2>
              <p className="text-lg">
                For fluid user experiences with progressive loading and
                automatic updates when dependencies change. This strategy
                combines React 19&apos;s native <code>&lt;Suspense&gt;</code> and <code>use()</code> primitives with Server Functions for optimal performance &mdash; with zero external libraries.
              </p>

              {/* Subsection: Client Components */}
              <section id="client-reactive">
                <h3>
                  Client Components with Server Functions (Reactive Updates)
                </h3>
                <p>
                  In Client Components, use React 19&apos;s native <code>use()</code> hook inside a <code>&lt;Suspense&gt;</code> boundary. Stabilizing the Server Function promise with <code>useMemo</code> avoids re-fetching on every render, while changing the <code>key</code> prop (or <code>id</code>) triggers the Suspense fallback smoothly without full-page reloads.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/[id]/page.jsx
"use client";
import { Suspense, use, useMemo } from "react";
import { getPost } from "@/server-functions/get-post";

function PostContent({ promise }) {
  // Pure React 19: unroll the Flight promise inside Suspense
  const post = use(promise);
  return <>{post}</>;
}

export default function Page({ params: { id } }) {
  // Pure React 19: stabilize the Server Function promise across renders based on 'id'
  const postPromise = useMemo(() => getPost(id), [id]);

  return (
    <Suspense key={id} fallback={<p>Loading post...</p>}>
      <PostContent promise={postPromise} />
    </Suspense>
  );
}`}
                </CodeBlock>
                <Alert className="not-prose mt-4">
                  <RefreshCw className="h-4 w-4" />
                  <AlertTitle>
                    React 19 Native Suspense &amp; <code>use()</code>
                  </AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>
                        <strong>Zero External Libraries:</strong> React 19 eliminates the need for third-party enhanced suspense packages. By pairing the native <code>use()</code> hook with <code>useMemo</code> and a keyed <code>&lt;Suspense key=&#123;id&#125;&gt;</code>, React handles the full async lifecycle and pending state automatically.
                      </p>
                      <p>
                        <strong>Key-Driven Invalidation:</strong> Changing the <code>key</code> prop resets the Suspense boundary and re-triggers the fallback smoothly whenever parameters change.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Cpu className="h-5 w-5 text-green-500" />
                    <span>Native Dependency Invalidation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Using React&apos;s standard <code>key</code> prop on <code>&lt;Suspense&gt;</code> acts as the native invalidation boundary. When <code>id</code> changes, React cleanly unmounts the previous view and displays the fallback while the new promise resolves.
                  </p>
                </div>
              </section>

              {/* Subsection: Server Components with Streaming */}
              <section id="server-streaming" className="mt-8">
                <h3>Server Components with Server Functions (Streaming)</h3>
                <p>
                  In Server Components, wrap Server Function calls in native <code>&lt;Suspense&gt;</code> to stream
                  results to the client as they become available. Server
                  Functions execute on the server in Node.js, and Suspense streams the
                  results incrementally.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/[id]/page.jsx
// Server Component
import { Suspense } from "react";
import { getPost } from "@/server-functions/get-post";

async function Post({ id }) {
  // Executes on the server and returns a rendered Component
  return await getPost(id);
}

export default function Page({ params: { id } }) {
  return (
    <div>
      <Suspense fallback={<p>Loading post...</p>}>
        <Post id={id} />
      </Suspense>
    </div>
  );
}`}
                </CodeBlock>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <ArrowRightLeft className="h-5 w-5" />
                        <span>Server Function Streaming</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Server Functions execute on the server, and Suspense
                      streams the results to the browser incrementally.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <FunctionSquare className="h-5 w-5 text-purple-500" />
                        <span>React 19 Primitives: Server vs. Client</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <div>
                        <strong>Client Components:</strong> Reads the Flight promise using the native <code>use(promise)</code> hook inside <code>&lt;Suspense key=&#123;id&#125;&gt;</code>, reacting cleanly when dependencies change without manual effects.
                      </div>
                      <div>
                        <strong>Server Components:</strong> Calls <code>await getPost(id)</code> directly within an async child component wrapped in native <code>&lt;Suspense&gt;</code> to stream HTML chunks progressively over the wire.
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Alert className="not-prose mt-4 border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/10">
                  <Zap className="h-4 w-4 text-indigo-500" />
                  <AlertTitle>Performance Tip: Static Shell + Dynamic Fetching</AlertTitle>
                  <AlertDescription>
                    If a page is statically generated (SSG), you can still fetch dynamic or user-specific data on the client (like inventory stock or shopping carts) using a Server Function wrapped in <code>Suspense</code>. The browser downloads the static page shell instantly, and the Server Function fetches the dynamic parts on-demand.
                  </AlertDescription>
                </Alert>
              </section>
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
