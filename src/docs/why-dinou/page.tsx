"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Brain,
  Rocket,
  Shield,
  Layers,
  Cpu,
  Zap,
  Globe,
  Settings,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const tocItems = [
  { id: "philosophy", title: "💡 Core Philosophy", level: 2 },
  { id: "why-ai", title: "🤖 AI-Friendly by Design", level: 2 },
  { id: "features", title: "📦 Feature Catalog", level: 2 },
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
                Why Dinou?
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the core philosophy, architectural pillars, and complete feature catalog of the Dinou framework.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Dinou is a lightweight, ejectable, bundler-agnostic React framework built on React primitives.</strong>
            </blockquote>

            <p className="lead">
              Instead of wrapping React in layers of proprietary abstractions and complex configuration files, Dinou embraces React as it is. It aims to remain transparent, understandable, and under your absolute control.
            </p>

            <hr className="my-8" />

            <section id="philosophy">
              <h2>💡 Core Philosophy</h2>
              <p>
                Dinou is built around four fundamental architectural pillars designed to give developers maximum flexibility without sacrificing the power of modern React.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Cpu className="h-5 w-5" />
                      <span>React Primitives First</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Dinou utilizes official React APIs instead of building a parallel ecosystem of proprietary abstractions. It integrates Server Components, Server Functions, Suspense, and Streaming natively. If you understand React, you understand Dinou.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Zap className="h-5 w-5" />
                      <span>Lightweight by Design</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    A minimal core with less complexity, fewer dependencies, and zero "magic". We keep the framework codebase small and approachable so that any developer can read, understand, and explain its entire pipeline.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold">
                      <Shield className="h-5 w-5" />
                      <span>Fully Ejectable</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    No vendor lock-in or black-box servers. With a single command (<code>npm run eject</code>), the entire framework server, compiler setup, and asset pipelines are copied directly into your repository, turning Dinou into a standard, fully customizable Express.js app.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <Layers className="h-5 w-5" />
                      <span>Bundler Agnostic</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    You choose the compiler that best fits your target environment. Dinou features first-class, built-in integrations for <strong>Webpack, Rollup, and Esbuild</strong>, allowing you to compile the exact same application with different bundlers seamlessly.
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="why-ai">
              <h2>🤖 AI-Friendly by Design</h2>
              <p>
                In the era of AI coding assistants, framework architecture needs to be re-evaluated. Large, black-box frameworks with massive abstractions require excessive context exploration and often lead to hallucinations when asking AI to debug or extend them.
              </p>
              <p>
                <strong>Dinou is designed to be easily analyzed by both humans and AI agents.</strong> Because the codebase is small and adheres strictly to standard React and Node.js primitives:
              </p>

              <div className="border rounded-lg p-5 bg-card not-prose my-6 border-l-4 border-l-blue-500">
                <div className="flex items-center gap-2 font-semibold mb-3">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <span>How Transparency Empowers AI Pair Programming</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li><strong>Fast Context Window Loading:</strong> AI agents can read and understand the entire core routing, server, and build files within a single conversation session.</li>
                  <li><strong>Accurate Bug Fixing:</strong> Standard Express middleware and React primitives make it easy for AI to trace execution paths and propose patches without breaking hidden framework internals.</li>
                  <li><strong>Autonomous Ejected Refactoring:</strong> Once you eject, an AI agent can help you seamlessly add custom server logic (like custom Auth middlewares or i18n routing rewrites) directly in your <code>server.js</code>.</li>
                </ul>
              </div>
            </section>

            <section id="features">
              <h2>📦 Feature Catalog</h2>
              <p>
                Dinou provides a complete, modern stack for building full-stack web applications with high performance.
              </p>

              <div className="space-y-6 mt-6">
                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /></div>
                  <div>
                    <h4 className="font-semibold text-lg my-0">React Server Components (RSC)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Render React components on the server for faster initial page loads and smaller client bundles. Safely fetch database queries and write secure, server-side code directly inside your React components.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /></div>
                  <div>
                    <h4 className="font-semibold text-lg my-0">Server Functions (&quot;use server&quot;)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Call server-side methods directly from client-side interactive buttons and forms. Dinou handles the RPC networking automatically, allowing you to return rich data, database mutations, or streaming React components back to the browser.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /></div>
                  <div>
                    <h4 className="font-semibold text-lg my-0">Hybrid Rendering Engine</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Combine <strong>Server-Side Rendering (SSR)</strong>, <strong>Static Site Generation (SSG)</strong>, <strong>Incremental Static Generation (ISG)</strong>, and background <strong>Incremental Static Regeneration (ISR)</strong> seamlessly in the same application.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /></div>
                  <div>
                    <h4 className="font-semibold text-lg my-0">On-Demand Cache Invalidation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Purge and regenerate static pages instantly on demand using <code>revalidatePath(path)</code> or tag-based queries with <code>revalidateTag(tag)</code>. Perfect for blogs, e-commerce, and real-time inventory updates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /></div>
                  <div>
                    <h4 className="font-semibold text-lg my-0">Granular Slot Error Boundaries</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Parallel slot layouts isolated by directories starting with <code>@</code> can fail gracefully. If a specific slot throws an error, it is caught locally by its local <code>error.tsx</code> without crashing the rest of the page layout or halting compiler builds.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /></div>
                  <div>
                    <h4 className="font-semibold text-lg my-0">Client-Side Router (SPA transitions)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Soft navigation transitions with prefetching on hover, cache busting via the <code>fresh</code> prop, and active loading indicators with the <code>useNavigationLoading</code> hook.
                    </p>
                  </div>
                </div>
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
