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

export async function getProps({ params }) {
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
                  <AlertTitle>Design Note</AlertTitle>
                  <AlertDescription>
                    <p>
                      <code>getProps</code> only receives <code>params</code>.
                      For request-specific data like <code>searchParams</code>{" "}
                      or <code>cookies</code>, fetch data directly inside your
                      components using <code>Suspense</code> with Server
                      Functions to avoid blocking the initial HTML render.
                    </p>
                  </AlertDescription>
                </Alert>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Server className="h-5 w-5 text-blue-500" />
                        <span>For Static Pages</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Ideal for generating static pages during build or with
                      incremental regeneration.
                    </CardContent>
                  </Card>
                  <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                        <Globe className="h-5 w-5" />
                        <span>Layout Injection</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      You can inject data to layout (page titles, metadata,
                      etc.) in addition to the page itself.
                    </CardContent>
                  </Card>
                </div>
              </section>
            </section>

            {/* Section 2: With Suspense */}
            <section id="with-suspense" className="mt-12">
              <h2>
                With Suspense (<code>react-enhanced-suspense</code>) & Server
                Functions (Reactive Strategy)
              </h2>
              <p className="text-lg">
                For fluid user experiences with progressive loading and
                automatic updates when dependencies change. This strategy
                combines Suspense with Server Functions for optimal performance.
              </p>

              {/* Subsection: Client Components */}
              <section id="client-reactive">
                <h3>
                  Client Components with Server Functions (Reactive Updates)
                </h3>
                <p>
                  In Client Components, use <code>react-enhanced-suspense</code>{" "}
                  to automatically re-fetch Server Functions when dependencies
                  change via the <code>resourceId</code> prop.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/[id]/page.jsx
"use client";
import { getPost } from "@/server-functions/get-post";
import Suspense from "react-enhanced-suspense";

export default function Page({ params: { id } }) {
  return (
    <Suspense fallback="Loading post..." resourceId={\`get-post-\${id}\`}>
      {() => getPost(id)}
    </Suspense>
  );
}`}
                </CodeBlock>
                <Alert className="not-prose mt-4">
                  <RefreshCw className="h-4 w-4" />
                  <AlertTitle>
                    <code>react-enhanced-suspense</code> Behavior
                  </AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>
                        <strong>Standard Mode:</strong> With only{" "}
                        <code>children</code> (React Nodes) and{" "}
                        <code>fallback</code>, behaves like React's native
                        Suspense.
                      </p>
                      <p>
                        <strong>Enhanced Mode:</strong> With{" "}
                        <code>resourceId</code> and <code>children</code> as a
                        function, automatically re-evaluates when{" "}
                        <code>resourceId</code> changes. No useEffect needed!
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Cpu className="h-5 w-5 text-green-500" />
                    <span>Automatic Dependency Tracking</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The <code>resourceId</code> acts as a cache key. Change it
                    to trigger fresh data fetching without manual cleanup or
                    effect dependencies.
                  </p>
                </div>
              </section>

              {/* Subsection: Server Components with Streaming */}
              <section id="server-streaming" className="mt-8">
                <h3>Server Components with Server Functions (Streaming)</h3>
                <p>
                  In Server Components, wrap Server Function calls to stream
                  results to the client as they become available. Server
                  Functions execute on the server, and Suspense streams the
                  results.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/[id]/page.jsx
import { getPost } from "@/server-functions/get-post";
import Suspense from "react-enhanced-suspense";

export default async function Page({ params: { id } }) {
  return (
    <div>
      <Suspense fallback="Loading post...">
        {getPost(id)}
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
                        <span>Consistent Server Function API</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      The same Server Functions work identically in both Server
                      and Client Components when wrapped with Suspense.
                    </CardContent>
                  </Card>
                </div>
                <Alert className="not-prose mt-4">
                  <Zap className="h-4 w-4" />
                  <AlertTitle>Performance Tip with Server Functions</AlertTitle>
                  <AlertDescription>
                    Combine Server Functions with Dinou's hybrid rendering.
                    Static pages can use Server Functions for dynamic parts
                    while maintaining overall static performance. Server
                    Functions ensure server-side execution with client-side
                    reactivity when needed.
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
