"use client";

import { Link } from "dinou";

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
  Rocket,
  Wrench,
  Terminal,
  FolderPlus,
  Package,
  Play,
  CheckCircle2,
  ArrowRight,
  Zap,
  Cpu,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "prerequisites", title: "Prerequisites", level: 2 },
  { id: "quick-start", title: "Quick Start (CLI)", level: 2 },
  { id: "manual-setup", title: "Manual Setup", level: 2 },
  { id: "next-steps", title: "Next Steps", level: 2 },
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
                Getting Started
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Start building with Dinou in seconds. Choose between the automated
              CLI or manual setup for full control.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="prerequisites">
              <h2>Prerequisites</h2>
              <p>
                Before getting started, ensure you have the following requirements installed:
              </p>
              <ul>
                <li>
                  <strong>Node.js:</strong> Version <strong>20.6.0</strong> or higher is required. Dinou uses the native ES module loader hook registration (via the <code>--import</code> flag) introduced in Node.js v20.6.0 to compile TSX/JSX, resolve aliases, and load static assets in real-time on the server.
                </li>
              </ul>
            </section>

            <section id="quick-start" className="mt-8">
              <h2>Quick Start (CLI)</h2>
              <p>
                The fastest way to scaffold a new Dinou application is using the
                official CLI generator. This creates a fully configured project
                with the recommended structure.
              </p>

              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg mt-6"
              >
                {`# Create a new Dinou application
npx create-dinou@latest my-app

# Navigate to your project
cd my-app

# Start the development server
npm run dev`}
              </CodeBlock>

              <Alert className="not-prose mt-6 border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10">
                <Zap className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-700 dark:text-amber-400 font-bold">
                  ⚡ When is the project ready in dev?
                </AlertTitle>
                <AlertDescription className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  Dinou runs two concurrent tasks in development: the server process <code>[0]</code> and the bundler compiler <code>[1]</code>. 
                  <strong>Wait until both logs are fully initialized</strong> (showing that compilation has finished and the server is listening) before opening the page in your browser. Opening too early can result in hydration mismatches or connection errors.
                </AlertDescription>
              </Alert>
            </section>

            <section id="manual-setup">
              <h2>Manual Setup</h2>
              <p>
                Prefer to set up everything manually? Follow these steps for
                complete control over your project configuration.
              </p>

              <div className="space-y-6">
                <div>
                  <h4>1. Install Dependencies</h4>
                  <p>
                    Create a new directory and install the required packages:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    {`# Create your project directory
mkdir my-dinou-app
cd my-dinou-app

# Initialize package.json
npm init -y

# Install core dependencies
npm install react react-dom dinou`}
                  </CodeBlock>
                </div>

                <div>
                  <h4>2. Create Project Structure</h4>
                  <p>
                    Create a <code>src</code> directory in the root of your project, and create a file named <code>page.jsx</code> (or <code>page.tsx</code>) inside it:
                  </p>
                  <CodeBlock
                    language="javascript"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    {`// src/page.jsx
export default function Page() {
  return <h1>Hello, Dinou!</h1>;
}`}
                  </CodeBlock>

                  <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                    <div className="flex items-center gap-2 font-semibold mb-2">
                      <FolderPlus className="h-5 w-5 text-purple-500" />
                      <span>File Structure</span>
                    </div>
                    <pre className="text-xs font-mono text-muted-foreground">
                      {`my-dinou-app/
├── node_modules/
├── src/
│   └── page.jsx
├── package.json
└── package-lock.json`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4>3. Configure package.json (Optional)</h4>
                  <p>
                    Add the necessary scripts to your <code>package.json</code>:
                  </p>
                  <CodeBlock
                    language="json"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    {`{
  "scripts": {
    "dev": "dinou dev",
    "dev:rollup": "dinou dev:rollup",
    "dev:webpack": "dinou dev:webpack",
    "build": "dinou build",
    "build:rollup": "dinou build:rollup",
    "build:webpack": "dinou build:webpack",
    "start": "dinou start",
    "eject": "dinou eject"
  }
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h4>4. Run the Development Server</h4>
                  <p>
                    Start the development server using the configured scripts:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    {`# Start development server (esbuild default)
npm run dev

# Or start with a specific bundler
npm run dev:rollup
npm run dev:webpack`}
                  </CodeBlock>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    Alternatively, you can run the CLI tool directly without adding scripts to your <code>package.json</code> using <code>npx</code>:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg mt-2"
                  >
                    {`# Run the development server (esbuild default)
npx dinou dev
 
# Or run with a specific bundler
npx dinou dev:rollup
npx dinou dev:webpack`}
                  </CodeBlock>
                </div>

                <div>
                  <h4>5. Configure .gitignore (Recommended)</h4>
                  <p>
                    Dinou generates temporary cache manifests, build outputs, and development directories that should not be committed to version control. Add the following folders to your <code>.gitignore</code> file:
                  </p>
                  <CodeBlock
                    language="text"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    {`# Dinou build & cache directories
dist2/
dist3/
public/
react_client_manifest/
server_functions_manifest/`}
                  </CodeBlock>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                    These folders contain compilation outputs (such as development files in <code>public/</code> and production builds in <code>dist3/</code>) or client/server manifests mapped dynamically during server execution.
                  </p>
                </div>
              </div>
            </section>

            <section id="next-steps">
              <h2>Next Steps</h2>
              <p>
                Congratulations! You've successfully set up Dinou. Here's what
                to explore next:
              </p>

              <div className="grid gap-4 md:grid-cols-3 not-prose mt-6">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <Link href="/docs/routing" className="block h-full">
                    <CardHeader>
                      <div className="flex flex-col gap-4">
                        {/* Fila Superior: Icono (Izq) y Flecha (Der) */}
                        <div className="flex items-start justify-between w-full">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                            <FolderPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                        </div>

                        {/* Fila Inferior: Texto */}
                        <div>
                          <CardTitle className="mb-1">Routing</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Learn file-based routing
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>

                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <Link href="/docs/data-fetching" className="block h-full">
                    <CardHeader>
                      <div className="flex flex-col gap-4">
                        {/* Fila Superior: Icono (Izq) y Flecha (Der) */}
                        <div className="flex items-start justify-between w-full">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                            <Cpu className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                        </div>

                        {/* Fila Inferior: Texto */}
                        <div>
                          <CardTitle className="mb-1">Data Fetching</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            With Suspense + Server Functions Or Without Suspense
                            (Server Components and/or <code>getProps</code>)
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>

                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <Link href="/docs/bundlers" className="block h-full">
                    <CardHeader>
                      <div className="flex flex-col gap-4">
                        {/* Fila Superior: Icono (Izq) y Flecha (Der) */}
                        <div className="flex items-start justify-between w-full">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                            <Wrench className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                        </div>

                        {/* Fila Inferior: Texto */}
                        <div>
                          <CardTitle className="mb-1">Bundlers & Eject</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Configure Webpack, Rollup, or esbuild, and customize logic via Eject.
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
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
