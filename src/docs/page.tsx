"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Badge } from "@/docs/components/ui/badge";
import { Button } from "@/docs/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Cpu,
  Zap,
  Route,
  Database,
  FolderTree,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const tocItems = [
  { id: "what-is-dinou", title: "What is Dinou?", level: 2 },
  { id: "key-features", title: "Key Features", level: 2 },
  { id: "rendering-philosophy", title: "Rendering Philosophy", level: 2 },
  { id: "next-steps", title: "Next Steps", level: 2 },
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
                Introduction
              </h1>
              <Badge variant="secondary">v1.0.0</Badge>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A Full-Stack React 19 Framework built for the modern web.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="what-is-dinou">
              <h2>What is Dinou?</h2>
              <p>
                <strong>Dinou</strong> is a framework designed to leverage the
                full power of <strong>React 19</strong>. It provides native
                support for React Server Components (RSC), Server-Side Rendering
                (SSR), Static Generation (SSG), and advanced Incremental Static
                strategies (ISG and ISR).
              </p>
              <p>
                It is built to leverage Suspense and Streaming for optimal
                performance, offering a modern development experience with a
                hybrid rendering engine that adapts to your needs.
              </p>
            </section>

            <section id="key-features">
              <h2>Key Features</h2>
              <div className="grid gap-6 md:grid-cols-2 not-prose mb-8">
                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                      <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>Native React Server Components</CardTitle>
                    <CardDescription>Built on React 19 core.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Leverages Suspense and Streaming for optimal performance.
                      Fetch data directly in your components without client-side
                      waterfalls.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                      <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>Hybrid Rendering Engine</CardTitle>
                    <CardDescription>
                      Static by default, Dynamic on demand.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Automatically switches to Dynamic Rendering (SSR) when
                      request-specific data like cookies, headers, or search
                      params are detected.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                      <Route className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Full-Featured Router</CardTitle>
                    <CardDescription>
                      Soft navigation & Smart Links.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Client-side soft navigation including <code>push</code>,{" "}
                      <code>replace</code>, <code>back</code>, and{" "}
                      <code>refresh</code>. The <code>&lt;Link&gt;</code>{" "}
                      component supports automatic prefetching.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                      <RefreshCw className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <CardTitle>Generation Strategies</CardTitle>
                    <CardDescription>
                      Comprehensive ISR & ISG support.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Update static content after deployment with Incremental
                      Static Regeneration (ISR) and generate new pages on demand
                      with Incremental Static Generation (ISG).
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20">
                      <Database className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle>Data Fetching & State</CardTitle>
                    <CardDescription>
                      Seamless server-client sync.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Optimized patterns using{" "}
                      <code>react-enhanced-suspense</code> and{" "}
                      <code>jotai-wrapper</code> for seamless state
                      synchronization and mutations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <FolderTree className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <CardTitle>File-System Routing</CardTitle>
                    <CardDescription>
                      Intuitive project structure.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Automatic routing based on{" "}
                      <code>page.&#123;jsx,tsx&#125;</code> files located within
                      the <code>src</code> directory structure.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="rendering-philosophy">
              <h2>Rendering Philosophy</h2>
              <p>
                Dinou prioritizes a <strong>Static First</strong> approach. By
                default, pages are pre-rendered as Static Site Generation (SSG).
                However, the engine is smart enough to "bail out" to Server-Side
                Rendering (SSR) instantly if your code accesses dynamic data
                sources.
              </p>
              <p>
                This ensures you get the performance of a static site where
                possible, and the flexibility of a dynamic server when needed,
                without complex configuration files.
              </p>
            </section>

            <section id="next-steps">
              <h2>Next Steps</h2>
              <p>Ready to start building?</p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 not-prose">
                <Button
                  className="h-auto py-4 px-6 justify-start w-full sm:w-auto"
                  asChild
                >
                  <a
                    href="/docs/getting-started"
                    className="flex flex-col items-start gap-1"
                  >
                    <span className="font-semibold flex items-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="text-xs text-blue-100 font-normal">
                      Install and run your first app.
                    </span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 px-6 justify-start w-full sm:w-auto"
                  asChild
                >
                  <a
                    href="/docs/routing"
                    className="flex flex-col items-start gap-1"
                  >
                    <span className="font-semibold flex items-center">
                      Routing Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Learn how the file system works.
                    </span>
                  </a>
                </Button>
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
