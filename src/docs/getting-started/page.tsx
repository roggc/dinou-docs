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
  { id: "verification", title: "Verify Installation", level: 2 },
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
                Getting Started
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Start building with Dinou in minutes. Choose between the automated
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

              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Terminal className="h-5 w-5 text-green-500" />
                  <span>Prerequisites</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Node.js 18.0 or later</li>
                  <li>npm, yarn, pnpm, or bun</li>
                  <li>Basic familiarity with terminal/command line</li>
                </ul>
              </div>

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

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <Rocket className="h-5 w-5" />
                      <span>What the CLI Creates</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-1">
                      <li>
                        ✅ Project structure with <code>src/</code> directory
                      </li>
                      <li>✅ Basic routing setup</li>
                      <li>✅ Tailwind CSS configuration</li>
                      <li>✅ Development server scripts</li>
                      <li>✅ TypeScript configuration (if selected)</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span>CLI Options</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <code className="block text-xs">
                      --typescript / --javascript
                    </code>
                    <code className="block text-xs mt-1">
                      --tailwind / --no-tailwind
                    </code>
                    <code className="block text-xs mt-1">--example [name]</code>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Run <code>npx create-dinou@latest --help</code> for all
                      options
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="not-prose mt-4">
                <Cpu className="h-4 w-4" />
                <AlertTitle>Zero Configuration Required</AlertTitle>
                <AlertDescription>
                  The CLI sets up everything you need: routing, bundling, and
                  development environment. You can start coding immediately.
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
echo 'export default function Page() {
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
                  <h4>3. Configure package.json</h4>
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

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Wrench className="h-5 w-5 text-amber-500" />
                      <span>Why Manual Setup?</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-1">
                      <li>• Complete control over project structure</li>
                      <li>• Understanding of how Dinou works internally</li>
                      <li>• Custom configuration from day one</li>
                      <li>• Educational purposes</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Package className="h-5 w-5" />
                      <span>Package Versions</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Ensure you're using compatible versions:</p>
                    <code className="block text-xs mt-1">react: ^19.0.0</code>
                    <code className="block text-xs">react-dom: ^19.0.0</code>
                    <code className="block text-xs">dinou: ^1.0.0</code>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="verification">
              <h2>Verify Installation</h2>
              <p>
                Regardless of your installation method, verify everything is
                working correctly.
              </p>

              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`# Start the development server
npm run dev

# Or using the Dinou CLI directly
npx dinou dev`}
              </CodeBlock>

              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Expected Outcome</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    Server starts on <code>http://localhost:3000</code>{" "}
                    (default)
                  </li>
                  <li>You see "Hello, Dinou!" in your browser</li>
                  <li>
                    Hot reload works – try editing <code>src/page.jsx</code>
                  </li>
                  <li>No errors in the terminal or browser console</li>
                </ul>
              </div>

              <Alert className="not-prose mt-6">
                <Play className="h-4 w-4" />
                <AlertTitle>Troubleshooting</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>
                      <strong>Port already in use:</strong> Set a different port
                      with <code>PORT=3001 npm run dev</code>
                    </li>
                    <li>
                      <strong>Module not found:</strong> Delete{" "}
                      <code>node_modules</code> and{" "}
                      <code>package-lock.json</code>, then run{" "}
                      <code>npm install</code>
                    </li>
                    <li>
                      <strong>React version issues:</strong> Ensure you have
                      React 19+ installed
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            </section>

            <section id="next-steps">
              <h2>Next Steps</h2>
              <p>
                Congratulations! You've successfully set up Dinou. Here's what
                to explore next:
              </p>

              <div className="grid gap-4 md:grid-cols-2 not-prose mt-6">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <a href="/docs/routing" className="block">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                            <FolderPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle>Routing</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Learn file-based routing
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                  </a>
                </Card>

                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <a href="/docs/data-fetching" className="block">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                            <Cpu className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle>Data Fetching</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Server Components & SSR
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                  </a>
                </Card>
              </div>

              <div className="border rounded-lg p-4 bg-card not-prose mt-6">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>Quick Experiment</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Try modifying your <code>src/page.jsx</code> to see hot reload
                  in action:
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg mt-2 text-xs"
                >
                  {`// Try this in src/page.jsx
export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to Dinou!
      </h1>
      <p className="mt-4 text-lg">
        Edit this file and see changes instantly.
      </p>
      <button 
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => alert('Hello!')}
      >
        Click me
      </button>
    </div>
  );
}`}
                </CodeBlock>
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
