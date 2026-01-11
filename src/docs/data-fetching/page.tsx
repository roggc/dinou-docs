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
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "server-components",
    title: "Server Components (Async Data)",
    level: 2,
  },
  { id: "client-reactive", title: "Client Components (Reactive)", level: 2 },
  { id: "server-streaming", title: "Server Components (Streaming)", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Data Fetching & Rendering
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou leverages React 19 Server Components for direct server-side
              data access, with hybrid rendering strategies for optimal
              performance.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="server-components">
              <h2>Server Components (Async Data)</h2>
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

            <section id="client-reactive">
              <h2>Usage in Client Components (Reactive)</h2>
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
                <AlertTitle>react-enhanced-suspense Behavior</AlertTitle>
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
                  The <code>resourceId</code> acts as a cache key. Change it to
                  trigger fresh data fetching without manual cleanup or effect
                  dependencies.
                </p>
              </div>
            </section>

            <section id="server-streaming">
              <h2>Usage in Server Components (Streaming)</h2>
              <p>
                In Server Components, wrap async Server Function calls to stream
                results to the client as they become available.
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
                      <span>Progressive Loading</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Content streams to the browser incrementally, improving
                    perceived performance.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Smartphone className="h-5 w-5 text-purple-500" />
                      <span>Consistent API</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Same <code>Suspense</code> component works identically in
                    Server and Client Components for predictable behavior.
                  </CardContent>
                </Card>
              </div>
              <Alert className="not-prose mt-4">
                <Zap className="h-4 w-4" />
                <AlertTitle>Performance Tip</AlertTitle>
                <AlertDescription>
                  Combine Server Functions with Dinou's hybrid rendering. Static
                  pages can use Server Functions for dynamic parts while
                  maintaining overall static performance.
                </AlertDescription>
              </Alert>
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
