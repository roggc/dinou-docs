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
  Zap,
  Cpu,
  Boxes,
  RefreshCw,
  Server,
  Code2,
  ArrowRight,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import dinou from "@/docs/images/dinou.png";

const tocItems = [
  { id: "introduction", title: "Introduction", level: 2 },
  { id: "core-concepts", title: "Core Concepts", level: 2 },
  { id: "rendering-strategies", title: "Rendering Strategies", level: 2 },
  { id: "quick-start", title: "Quick Start", level: 2 },
  { id: "next-steps", title: "Next Steps", level: 2 },
];

export default function Page() {
  return (
    // 1. FIX: Añadido w-full y max-w-[100vw] para evitar desbordamiento horizontal en mobile
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        {/* 2. FIX: mx-auto para centrar y mejor padding en mobile */}
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header con wrap para pantallas muy pequeñas */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 rounded-full"></div>
              <img
                src={dinou}
                alt="dinou logo"
                className="h-8 w-8 relative z-10"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Dinou
            </h1>
            <Badge variant="secondary" className="mt-1">
              v1.0.0
            </Badge>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              The Native React 19 Framework. Build with Server Components,
              Actions, and total architectural freedom.
            </p>

            <section id="introduction">
              <h2>Introduction</h2>
              <p>
                <strong>Dinou</strong> (Catalan for <em>19</em>) is built from
                the ground up to leverage the React 19 architecture without the
                weight of legacy abstractions.
              </p>
              <p>
                Unlike other frameworks that adapt old paradigms to new
                features, Dinou treats{" "}
                <strong>React Server Components (RSC)</strong> and{" "}
                <strong>Server Functions</strong> as first-class citizens. It
                offers a standardized Request/Response API and lets you choose
                your underlying build tool.
              </p>
            </section>

            <section id="core-concepts">
              <h2>Core Concepts</h2>
              {/* Grid responsive: 1 columna en mobile, 2 en md */}
              <div className="grid gap-6 md:grid-cols-2 not-prose mb-8">
                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                      <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>Native RSC Architecture</CardTitle>
                    <CardDescription>
                      Async components by default.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Fetch data directly in your components. No{" "}
                      <code>useEffect</code>, no client-side waterfalls. Dinou
                      streams HTML and RSC payload instantly.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                      <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>Server Functions (RPC)</CardTitle>
                    <CardDescription>Type-safe backend logic.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Export functions from the server and call them directly
                      from your UI. Dinou handles the serialization, network,
                      and execution transparently.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                      <Boxes className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Bundler Agnostic</CardTitle>
                    <CardDescription>
                      Webpack, Rollup, or Esbuild.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The only framework that lets you swap the build engine.
                      Use Esbuild for fast dev, and Webpack or Rollup for
                      production optimization.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                      <Code2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <CardTitle>Zero Lock-in</CardTitle>
                    <CardDescription>Full Eject Support.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Need custom webpack config? Run <code>npm run eject</code>
                      . You own the code. Dinou is designed to be a library, not
                      a black box.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="rendering-strategies">
              <h2>Rendering Strategies</h2>

              <p>
                Dinou supports a hybrid model where you can mix and match
                rendering strategies per route:
              </p>
              <div className="not-prose grid gap-4 mt-4">
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <Server className="h-6 w-6 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">
                      SSR (Server-Side Rendering)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Dynamic pages rendered on demand for every request. Ideal
                      for personalized content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <Boxes className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">
                      SSG (Static Site Generation)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Pages generated at build time. Served instantly from CDN.
                      Ideal for blogs and marketing pages.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <RefreshCw className="h-6 w-6 text-orange-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">ISR & ISG</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Incremental Static Regeneration:</strong> Update
                      static pages in the background after a timeout.
                      <br />
                      <strong>Incremental Static Generation:</strong> Generate
                      new static pages on-demand for unknown paths.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="quick-start">
              <h2>Quick Start</h2>
              <p>The fastest way to start is using the CLI:</p>

              {/* 3. FIX: Añadido overflow-hidden y rounded-lg al contenedor del código */}
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >{`npx create-dinou@latest my-app`}</CodeBlock>

              <h3>Manual Setup</h3>
              <p>
                If you prefer to build from scratch to understand the internals:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="m-0 text-base font-semibold">
                    1. Initialize Project
                  </h4>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full my-2 overflow-hidden rounded-lg"
                  >{`mkdir my-app && cd my-app
npm init -y
npm i react react-dom dinou`}</CodeBlock>
                </div>

                <div>
                  <h4 className="m-0 text-base font-semibold">
                    2. Add Scripts
                  </h4>
                  <CodeBlock
                    language="json"
                    containerClassName="w-full my-2 overflow-hidden rounded-lg"
                  >{`// package.json
{
  "scripts": {
    "dev": "dinou dev",
    "build": "dinou build",
    "start": "dinou start"
  }
}`}</CodeBlock>
                </div>

                <div>
                  <h4 className="m-0 text-base font-semibold">
                    3. Create Entry Point
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">
                    Create <code>src/page.tsx</code>. This is a Server Component
                    by default.
                  </p>
                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full my-2 overflow-hidden rounded-lg"
                  >{`export default function Page() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Hello from RSC</h1>
      <p>This is rendered on the server.</p>
    </div>
  );
}`}</CodeBlock>
                </div>
              </div>
            </section>

            <section id="next-steps">
              <h2>Next Steps</h2>
              <p>Dive deeper into Dinou's capabilities:</p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 not-prose">
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
                      File-based Routing <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Layouts, nested routes, and catch-all.
                    </span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 px-6 justify-start w-full sm:w-auto"
                  asChild
                >
                  <a
                    href="/docs/server-functions"
                    className="flex flex-col items-start gap-1"
                  >
                    <span className="font-semibold flex items-center">
                      Server Functions <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="text-xs text-muted-foreground font-normal">
                      RPC calls and form actions.
                    </span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 px-6 justify-start w-full sm:w-auto"
                  asChild
                >
                  <a
                    href="/docs/rendering"
                    className="flex flex-col items-start gap-1"
                  >
                    <span className="font-semibold flex items-center">
                      Rendering Modes <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Configuring SSG, ISR and Hybrid routes.
                    </span>
                  </a>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* 4. FIX: Aside oculto en mobile, visible en XL */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
