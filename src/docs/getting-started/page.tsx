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
            <section id="quick-start">
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

              <Alert className="not-prose mt-4">
                <Cpu className="h-4 w-4" />
                <AlertTitle>Zero Configuration Required</AlertTitle>
                <AlertDescription>
                  The CLI sets up everything you need. You can start coding
                  immediately.
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
                    Create the <code>src</code> directory and your first page:
                  </p>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    {`# Create the source directory
mkdir src

# Create your first page
echo 'export default async function Page() {
  return <h1>Hello, Dinou!</h1>;
}' > src/page.jsx`}
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
    "build": "dinou build",
    "start": "dinou start"
  }
}`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            <section id="next-steps">
              <h2>Next Steps</h2>
              <p>
                Congratulations! You've successfully set up Dinou. Here's what
                to explore next:
              </p>

              <div className="grid gap-4 md:grid-cols-2 not-prose mt-6">
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
