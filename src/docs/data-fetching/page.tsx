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
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "server-components",
    title: "Server Components (Async Data)",
    level: 2,
  },
  { id: "hybrid-rendering", title: "Hybrid Rendering Engine", level: 2 },
  { id: "isr", title: "Incremental Static Regeneration (ISR)", level: 2 },
  { id: "client-components", title: "Client Components", level: 2 },
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

            <section id="hybrid-rendering">
              <h2>Hybrid Rendering Engine</h2>
              <p>
                Dinou uses a zero-config hybrid model: Static (SSG) by default,
                switching to Dynamic (SSR) when request-specific data is used.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`import { getContext } from "dinou";

export default async function Profile() {
  const ctx = getContext();
  if (!ctx) return null;

  // Accessing cookies switches to SSR
  const token = ctx.req.cookies.session_token;

  const user = await fetchUser(token);
  return <h1>Hello, {user.name}</h1>;
}`}
              </CodeBlock>
              <Alert className="not-prose mt-4">
                <Zap className="h-4 w-4" />
                <AlertTitle>Automatic Detection</AlertTitle>
                <AlertDescription>
                  No manual configuration needed. Dinou detects usage of
                  cookies, headers, or search params to opt into dynamic
                  rendering.
                </AlertDescription>
              </Alert>
            </section>

            <section id="isr">
              <h2>Incremental Static Regeneration (ISR)</h2>
              <p>
                Update static pages in the background without full rebuilds
                using the <code>revalidate</code> function in{" "}
                <code>page_functions.ts</code>.
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/blog/page_functions.ts
export function revalidate() {
  return 60000; // Regenerate every 60 seconds
}`}
              </CodeBlock>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <RefreshCw className="h-5 w-5" />
                      <span>Background Updates</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Regenerate stale pages on-demand or at intervals without
                    affecting other pages.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Info className="h-5 w-5 text-blue-500" />
                      <span>Cache Lifetime</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Specify time in milliseconds. Use 0 for indefinite static
                    caching.
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="client-components">
              <h2>Client Components</h2>
              <p>
                Add interactivity with the <code>"use client"</code> directive
                for hooks like useState and useEffect.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}`}
              </CodeBlock>
              <Alert className="not-prose mt-4">
                <Smartphone className="h-4 w-4" />
                <AlertTitle>Client-Side Interactivity</AlertTitle>
                <AlertDescription>
                  Use for event handlers, state management, and browser APIs.
                  Server Components handle static content.
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
