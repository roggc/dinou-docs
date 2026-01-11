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
  Zap,
  Code,
  Cpu,
  RefreshCw,
  ArrowRightLeft,
  Server,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "server-functions", title: "Server Functions (use server)", level: 2 },
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
                Server Functions & Smart Suspense
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Call server-side logic directly from components with RPC-like
              functions. Dinou uniquely allows Server Functions to return
              rendered Components, not just JSON data.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="server-functions">
              <h2>Server Functions (`"use server"`)</h2>
              <p>
                Define functions with the <code>"use server"</code> directive to
                execute server-side logic directly from your components. Unlike
                traditional RPC, these functions can return fully rendered React
                Components.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/server-functions/get-post.jsx
"use server";
import db from "./db";
import Post from "@/components/post.jsx";

export async function getPost(postId) {
  const data = await db.query("SELECT * FROM posts WHERE id = ?", [postId]);
  
  // 🪄 Returns a rendered Component, not just JSON
  return <Post post={data} />;
}`}
              </CodeBlock>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Sparkles className="h-5 w-5" />
                      <span>Component Returns</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Server Functions can return both Server and Client
                    Components, enabling powerful rendering patterns.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Server className="h-5 w-5 text-blue-500" />
                      <span>Direct Database Access</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Access databases, APIs, and sensitive logic securely on the
                    server without exposing it to the client.
                  </CardContent>
                </Card>
              </div>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Server className="h-5 w-5 text-orange-500" />
                  <span>Server-Side Execution Guarantee</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Server Functions always execute on the server, even when
                  called from Client Components. This keeps sensitive logic and
                  database credentials secure.
                </p>
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
