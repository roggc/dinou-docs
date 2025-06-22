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
import { Zap, Code2, Server, Shield, Sparkles, ArrowRight } from "lucide-react";

const tocItems = [
  { id: "introduction", title: "Introduction", level: 2 },
  { id: "features", title: "Features", level: 2 },
  { id: "quick-start", title: "Quick Start", level: 2 },
  { id: "next-steps", title: "Next Steps", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold">dinou</h1>
            <Badge variant="secondary">v1.0</Badge>
          </div>

          <div className="prose">
            <p className="text-xl text-muted-foreground mb-8">
              A minimal React 19 framework with file-based routing, SSR, SSG,
              and more.
            </p>

            <section id="introduction">
              <h2>Introduction</h2>
              <p>
                <strong>dinou</strong> is a minimal React 19 framework. The name
                "dinou" means 19 in Catalan, reflecting its focus on React 19's
                latest features. You can create a dinou app by running:
              </p>
              <pre>
                <code>npx create-dinou@latest my-app</code>
              </pre>
              <p>
                dinou provides a streamlined development experience with zero
                configuration while giving you full control through ejection
                when needed.
              </p>
            </section>

            <section id="features">
              <h2>Features</h2>
              <div className="grid gap-6 md:grid-cols-2 not-prose mb-8">
                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                      <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>File-based Routing</CardTitle>
                    <CardDescription>
                      Intuitive routing system based on your file structure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Static and dynamic routes</li>
                      <li>• Nested layouts</li>
                      <li>• Catch-all routes</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                      <Server className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>React 19 Native</CardTitle>
                    <CardDescription>
                      Built for React 19's server components and concurrent
                      features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Server Components</li>
                      <li>• Server Functions</li>
                      <li>• Suspense support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                      <Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>Rendering Modes</CardTitle>
                    <CardDescription>
                      Multiple rendering strategies for optimal performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SSR (Server Side Rendering)</li>
                      <li>• SSG (Static Site Generation)</li>
                      <li>• ISR (Incremental Static Regeneration)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                      <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <CardTitle>Full Control</CardTitle>
                    <CardDescription>
                      Eject when you need complete customization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• TypeScript or JavaScript</li>
                      <li>• CSS modules & Tailwind</li>
                      <li>• Import aliases</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="quick-start">
              <h2>Quick Start</h2>
              <p>Get started with dinou in just a few steps:</p>

              <h3>1. Create a new project</h3>
              <pre>
                <code>npx create-dinou@latest my-app cd my-app</code>
              </pre>

              <h3>2. Or set up manually</h3>
              <pre>
                <code>
                  # Create an npm project npm init -y # Install dependencies npm
                  i react react-dom dinou
                </code>
              </pre>

              <h3>3. Add scripts to package.json</h3>
              <pre>
                <code>{`{
  "scripts": {
    "dev": "dinou dev",
    "build": "dinou build",
    "start": "dinou start",
    "eject": "dinou eject"
  }
}`}</code>
              </pre>

              <h3>4. Create your first page</h3>
              <p>
                Create <code>src/page.jsx</code> (or <code>.tsx</code>):
              </p>
              <pre>
                <code>{`"use client";

export default function Page() {
  return <>Hello, dinou!</>;
}`}</code>
              </pre>

              <h3>5. Start developing</h3>
              <pre>
                <code>npm run dev</code>
              </pre>
            </section>

            <section id="next-steps">
              <h2>Next Steps</h2>
              <p>
                Now that you have dinou running, explore these key concepts:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 not-prose">
                <Button asChild>
                  <a href="/routing">
                    Learn Routing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/data-fetching">Data Fetching</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/server-components">Server Components</a>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
