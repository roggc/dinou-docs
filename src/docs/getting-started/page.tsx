import { Link } from "dinou";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
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
import { Badge } from "@/docs/components/ui/badge";
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
  Boxes,
  Layers,
  Sparkles,
  ShieldCheck,
  Server,
  Cloud,
  Globe,
  FileCode,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "prerequisites", title: "1. Prerequisites", level: 2 },
  { id: "runtime-requirements", title: "1.1. Runtime Requirements", level: 3 },
  { id: "quick-start", title: "2. Quick Start (CLI)", level: 2 },
  { id: "cli-scaffolding", title: "2.1. CLI Scaffolding", level: 3 },
  { id: "manual-setup", title: "3. Manual Project Setup", level: 2 },
  { id: "step-dependencies", title: "3.1. Install Dependencies", level: 3 },
  { id: "step-structure", title: "3.2. Project Structure & Files", level: 3 },
  { id: "step-typescript", title: "3.3. TypeScript Configuration", level: 3 },
  { id: "step-scripts", title: "3.4. Package Scripts", level: 3 },
  { id: "step-gitignore", title: "3.5. Configure .gitignore", level: 3 },
  { id: "step-dev-server", title: "3.6. Start Development Server", level: 3 },
  { id: "production-runtimes", title: "4. Building for Production & Runtimes", level: 2 },
  { id: "bundler-selection", title: "4.1. Bundler Flexibility (esbuild, Rollup, Webpack)", level: 3 },
  { id: "production-targets", title: "4.2. First-Class Multi-Runtime Targets", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Getting Started | Dinou Docs</title>
      <meta
        name="description"
        content="Start building modern, full-stack React 19 applications in seconds. Choose between the automated CLI generator or manual configuration."
      />
      <link rel="canonical" href="https://dinou.dev/docs/getting-started" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="inline-flex items-center gap-2">
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 text-xs font-mono font-medium border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 rounded-full"
              >
                <Sparkles className="w-3 h-3 mr-1 text-blue-500" />
                Dinou Setup
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                Installation &amp; Project Guide
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Getting Started with Dinou
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Start building modern, full-stack React 19 applications in seconds.
              Choose between the automated CLI generator or manual configuration for full architectural control.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: Prerequisites */}
            <section id="prerequisites" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Prerequisites
              </h2>
              <p>
                Before getting started, ensure your local environment meets the minimum requirements.
                Dinou is engineered to leverage modern JavaScript standards with zero transpile overhead.
              </p>

              <div id="runtime-requirements" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  1.1. Runtime Requirements
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <strong>Node.js 20.6.0+ (Required):</strong> Dinou utilizes Node&apos;s modern native ES module
                    customization hooks (<code>module.register</code>) for zero-fork server execution and Web Standard APIs
                    (<code>Request</code>, <code>Response</code>, <code>ReadableStream</code>, <code>Headers</code>) natively
                    supported in modern Node.js versions.
                  </li>
                  <li>
                    <strong>Bun 1.1+ (Optional):</strong> If you plan to run on Bun or compile self-contained standalone
                    native executables using <code>npm run build:bun:compile</code>.
                  </li>
                  <li>
                    <strong>Deno 2.0+ (Optional):</strong> If you target Deno or cross-compile single-file binaries
                    for Linux, macOS, or Windows using <code>npm run build:deno:compile</code>.
                  </li>
                  <li>
                    <strong>Cloudflare Wrangler (Optional):</strong> Required if you deploy to Cloudflare Workers with
                    <code>npm run build:cloudflare</code> and preview locally with <code>wrangler dev</code>.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2: Quick Start */}
            <section id="quick-start" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. Quick Start (CLI)
              </h2>
              <p>
                The fastest way to scaffold a ready-to-code Dinou application is using the official CLI starter.
                It sets up TypeScript, Tailwind CSS, sample Server Components, and the recommended directory layout:
              </p>

              <div id="cli-scaffolding" className="scroll-mt-20 mt-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-blue-500" />
                  2.1. CLI Scaffolding
                </h3>

                <CodeBlock
                  language="bash"
                  containerClassName="w-full overflow-hidden rounded-lg mt-2"
                >
                  {`# 1. Initialize a new Dinou application
npx create-dinou@latest my-app
# or
npm create dinou@latest my-app

# 2. Enter project directory
cd my-app

# 3. Launch development server (default: esbuild)
npm run dev`}
                </CodeBlock>

                <Alert className="not-prose mt-6 border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20">
                  <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 font-bold">
                    ⚡ Single-Process Incremental Dual-Engine
                  </AlertTitle>
                  <AlertDescription className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    In Dinou, the development server runs in a unified in-process architecture with zero
                    subprocess overhead. The Dual-Bundle engine compiles your entire application into memory at startup,
                    meaning navigation across all routes is instant with zero on-demand compilation delays. Incremental changes
                    are updated in milliseconds with React Fast Refresh and hot CSS injection.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Section 3: Manual Setup */}
            <section id="manual-setup" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Manual Project Setup
              </h2>
              <p>
                Prefer to wire up everything manually? Follow these step-by-step instructions to configure Dinou
                from scratch with complete transparency:
              </p>

              <div className="space-y-10 not-prose mt-6">
                {/* Step 3.1 */}
                <div id="step-dependencies" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">1</span>
                    3.1. Install Dependencies
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Initialize your project folder and install React 19, React DOM, and the <code>dinou</code> framework package:
                  </p>
                  <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                    {`# Create and enter directory
mkdir my-dinou-app
cd my-dinou-app

# Initialize package.json
npm init -y

# Install React 19 and Dinou
npm install react react-dom dinou

# Install TypeScript definitions for IDE intellisense
npm install -D @types/react @types/react-dom`}
                  </CodeBlock>
                </div>

                {/* Step 3.2 */}
                <div id="step-structure" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">2</span>
                    3.2. Project Structure &amp; Files
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create the <code>src/</code> directory with a root page (<code>src/page.tsx</code>) and the recommended root document layout (<code>src/layout.tsx</code>):
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        src/page.tsx (React Server Component)
                      </div>
                      <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                        {`// src/page.tsx - React Server Component (RSC)
export default function Page() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">
        Hello from Dinou!
      </h1>
      <p className="text-muted-foreground">
        Rendered natively on the server with React 19 and zero client JavaScript overhead.
      </p>
    </main>
  );
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        src/layout.tsx (Recommended - Root Layout)
                      </div>
                      <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                        {`// src/layout.tsx - Root document layout
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Dinou App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}`}
                      </CodeBlock>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        The root <code>layout.tsx</code> defines the shared <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> document shell, metadata, and global providers so you don&apos;t have to repeat them on each page.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm mt-4">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/60 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-2 font-medium">Recommended Directory Layout</span>
                      </div>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre
                        className="!bg-transparent !p-0 !m-0 font-mono text-xs leading-relaxed"
                        style={{ color: "#e2e8f0", backgroundColor: "transparent" }}
                      >
                        <code
                          className="!bg-transparent !p-0 !m-0 font-mono text-xs leading-relaxed"
                          style={{ color: "#e2e8f0", backgroundColor: "transparent" }}
                        >{`my-dinou-app/
├── public/                    # Static root assets (served directly at /)
│   ├── favicon.ico
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── page.tsx               # Root page component (RSC)
│   ├── layout.tsx             # Root document layout (<html/head/body>)
│   └── globals.css            # Styles / Tailwind CSS
├── dinou.config.ts            # Framework configuration (optional: ppr, plugins)
├── dinou-env.d.ts             # Ambient framework typings
├── tsconfig.json              # TypeScript configuration
├── package.json
└── .gitignore`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Step 3.3 */}
                <div id="step-typescript" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">3</span>
                    3.3. TypeScript Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Dinou does <strong>not force you to use TypeScript</strong>—you are completely free to write your application in standard JavaScript (<code>.js</code> / <code>.jsx</code>). However, even for pure JavaScript projects, defining a <code>tsconfig.json</code> in your project root is strongly recommended:
                  </p>

                  <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 p-3.5 mb-4 not-prose">
                    <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">
                      💡 Why define tsconfig.json even when using JavaScript?
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4 leading-relaxed">
                      <li>
                        <strong>Import Aliases:</strong> Dinou&apos;s build engines (esbuild, Rollup, Webpack) automatically read <code>compilerOptions.paths</code> from <code>tsconfig.json</code> to resolve clean path aliases like <code>@/*</code> into <code>src/*</code>.
                      </li>
                      <li>
                        <strong>IDE Autocomplete:</strong> With <code>&quot;allowJs&quot;: true</code>, code editors (VS Code, Cursor) use <code>tsconfig.json</code> to provide full autocomplete, auto-imports, and path resolution across all <code>.js</code> and <code>.jsx</code> files.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        tsconfig.json
                      </div>
                      <CodeBlock language="json" containerClassName="w-full rounded-lg">
                        {`{
  "compilerOptions": {
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "allowJs": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": [
    "src",
    "dinou-env.d.ts",
    ".dinou/types/**/*.d.ts"
  ]
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        dinou-env.d.ts
                      </div>
                      <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                        {`/// <reference types="dinou/env" />`}
                      </CodeBlock>
                      <p className="mt-2 text-xs text-muted-foreground">
                        The <code>dinou/env</code> reference automatically declares ambient typings for static assets
                        (SVGs, images, web fonts) and CSS modules without manual type boilerplate.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3.4 */}
                <div id="step-scripts" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">4</span>
                    3.4. Package Scripts
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add the complete set of Dinou scripts to your <code>package.json</code> to control development, multi-runtime production builds (Node, Cloudflare, Deno, Bun), binary compilation, static exports, and ejecting (scroll through the block below to view all target combinations):
                  </p>
                  <CodeBlock
                    language="json"
                    containerClassName="w-full rounded-lg border border-slate-200 dark:border-slate-800"
                    className="max-h-80 !overflow-y-auto"
                  >
                    {`"scripts": {
  "dev": "dinou dev",
  "build": "dinou build",
  "start": "dinou start",
  "dev:esbuild": "dinou dev:esbuild",
  "dev:rollup": "dinou dev:rollup",
  "dev:webpack": "dinou dev:webpack",
  "build:node": "dinou build:node",
  "build:node:esbuild": "dinou build:node:esbuild",
  "build:node:rollup": "dinou build:node:rollup",
  "build:node:webpack": "dinou build:node:webpack",
  "build:node:compile": "dinou build:node:compile",
  "build:node:compile:esbuild": "dinou build:node:compile:esbuild",
  "build:node:compile:rollup": "dinou build:node:compile:rollup",
  "build:node:compile:webpack": "dinou build:node:compile:webpack",
  "build:node:compile:linux": "dinou build:node:compile:linux",
  "build:node:compile:linux:esbuild": "dinou build:node:compile:linux:esbuild",
  "build:node:compile:linux:rollup": "dinou build:node:compile:linux:rollup",
  "build:node:compile:linux:webpack": "dinou build:node:compile:linux:webpack",
  "build:node:compile:linux_arm": "dinou build:node:compile:linux_arm",
  "build:node:compile:linux_arm:esbuild": "dinou build:node:compile:linux_arm:esbuild",
  "build:node:compile:linux_arm:rollup": "dinou build:node:compile:linux_arm:rollup",
  "build:node:compile:linux_arm:webpack": "dinou build:node:compile:linux_arm:webpack",
  "build:node:compile:mac": "dinou build:node:compile:mac",
  "build:node:compile:mac:esbuild": "dinou build:node:compile:mac:esbuild",
  "build:node:compile:mac:rollup": "dinou build:node:compile:mac:rollup",
  "build:node:compile:mac:webpack": "dinou build:node:compile:mac:webpack",
  "build:node:compile:win": "dinou build:node:compile:win",
  "build:node:compile:win:esbuild": "dinou build:node:compile:win:esbuild",
  "build:node:compile:win:rollup": "dinou build:node:compile:win:rollup",
  "build:node:compile:win:webpack": "dinou build:node:compile:win:webpack",
  "build:node:pure": "dinou build:node:pure",
  "build:node:pure:esbuild": "dinou build:node:pure:esbuild",
  "build:node:pure:rollup": "dinou build:node:pure:rollup",
  "build:node:pure:webpack": "dinou build:node:pure:webpack",
  "build:node:pure:compile": "dinou build:node:pure:compile",
  "build:node:pure:compile:esbuild": "dinou build:node:pure:compile:esbuild",
  "build:node:pure:compile:rollup": "dinou build:node:pure:compile:rollup",
  "build:node:pure:compile:webpack": "dinou build:node:pure:compile:webpack",
  "build:node:pure:compile:linux": "dinou build:node:pure:compile:linux",
  "build:node:pure:compile:linux:esbuild": "dinou build:node:pure:compile:linux:esbuild",
  "build:node:pure:compile:linux:rollup": "dinou build:node:pure:compile:linux:rollup",
  "build:node:pure:compile:linux:webpack": "dinou build:node:pure:compile:linux:webpack",
  "build:node:pure:compile:linux_arm": "dinou build:node:pure:compile:linux_arm",
  "build:node:pure:compile:linux_arm:esbuild": "dinou build:node:pure:compile:linux_arm:esbuild",
  "build:node:pure:compile:linux_arm:rollup": "dinou build:node:pure:compile:linux_arm:rollup",
  "build:node:pure:compile:linux_arm:webpack": "dinou build:node:pure:compile:linux_arm:webpack",
  "build:node:pure:compile:mac": "dinou build:node:pure:compile:mac",
  "build:node:pure:compile:mac:esbuild": "dinou build:node:pure:compile:mac:esbuild",
  "build:node:pure:compile:mac:rollup": "dinou build:node:pure:compile:mac:rollup",
  "build:node:pure:compile:mac:webpack": "dinou build:node:pure:compile:mac:webpack",
  "build:node:pure:compile:win": "dinou build:node:pure:compile:win",
  "build:node:pure:compile:win:esbuild": "dinou build:node:pure:compile:win:esbuild",
  "build:node:pure:compile:win:rollup": "dinou build:node:pure:compile:win:rollup",
  "build:node:pure:compile:win:webpack": "dinou build:node:pure:compile:win:webpack",
  "start:node": "dinou start:node",
  "start:node:esbuild": "dinou start:node:esbuild",
  "start:node:rollup": "dinou start:node:rollup",
  "start:node:webpack": "dinou start:node:webpack",
  "build:cloudflare": "dinou build:cloudflare",
  "build:cloudflare:esbuild": "dinou build:cloudflare:esbuild",
  "build:cloudflare:rollup": "dinou build:cloudflare:rollup",
  "build:cloudflare:webpack": "dinou build:cloudflare:webpack",
  "build:deno": "dinou build:deno",
  "build:deno:esbuild": "dinou build:deno:esbuild",
  "build:deno:rollup": "dinou build:deno:rollup",
  "build:deno:webpack": "dinou build:deno:webpack",
  "build:deno:compile": "dinou build:deno:compile",
  "build:deno:compile:esbuild": "dinou build:deno:compile:esbuild",
  "build:deno:compile:rollup": "dinou build:deno:compile:rollup",
  "build:deno:compile:webpack": "dinou build:deno:compile:webpack",
  "build:deno:compile:linux": "dinou build:deno:compile:linux",
  "build:deno:compile:linux:esbuild": "dinou build:deno:compile:linux:esbuild",
  "build:deno:compile:linux:rollup": "dinou build:deno:compile:linux:rollup",
  "build:deno:compile:linux:webpack": "dinou build:deno:compile:linux:webpack",
  "build:deno:compile:linux_arm": "dinou build:deno:compile:linux_arm",
  "build:deno:compile:linux_arm:esbuild": "dinou build:deno:compile:linux_arm:esbuild",
  "build:deno:compile:linux_arm:rollup": "dinou build:deno:compile:linux_arm:rollup",
  "build:deno:compile:linux_arm:webpack": "dinou build:deno:compile:linux_arm:webpack",
  "build:deno:compile:mac": "dinou build:deno:compile:mac",
  "build:deno:compile:mac:esbuild": "dinou build:deno:compile:mac:esbuild",
  "build:deno:compile:mac:rollup": "dinou build:deno:compile:mac:rollup",
  "build:deno:compile:mac:webpack": "dinou build:deno:compile:mac:webpack",
  "build:deno:compile:win": "dinou build:deno:compile:win",
  "build:deno:compile:win:esbuild": "dinou build:deno:compile:win:esbuild",
  "build:deno:compile:win:rollup": "dinou build:deno:compile:win:rollup",
  "build:deno:compile:win:webpack": "dinou build:deno:compile:win:webpack",
  "start:deno": "dinou start:deno",
  "build:bun": "dinou build:bun",
  "build:bun:esbuild": "dinou build:bun:esbuild",
  "build:bun:rollup": "dinou build:bun:rollup",
  "build:bun:webpack": "dinou build:bun:webpack",
  "build:bun:compile": "dinou build:bun:compile",
  "build:bun:compile:esbuild": "dinou build:bun:compile:esbuild",
  "build:bun:compile:rollup": "dinou build:bun:compile:rollup",
  "build:bun:compile:webpack": "dinou build:bun:compile:webpack",
  "build:bun:compile:linux": "dinou build:bun:compile:linux",
  "build:bun:compile:linux:esbuild": "dinou build:bun:compile:linux:esbuild",
  "build:bun:compile:linux:rollup": "dinou build:bun:compile:linux:rollup",
  "build:bun:compile:linux:webpack": "dinou build:bun:compile:linux:webpack",
  "build:bun:compile:linux_arm": "dinou build:bun:compile:linux_arm",
  "build:bun:compile:linux_arm:esbuild": "dinou build:bun:compile:linux_arm:esbuild",
  "build:bun:compile:linux_arm:rollup": "dinou build:bun:compile:linux_arm:rollup",
  "build:bun:compile:linux_arm:webpack": "dinou build:bun:compile:linux_arm:webpack",
  "build:bun:compile:mac": "dinou build:bun:compile:mac",
  "build:bun:compile:mac:esbuild": "dinou build:bun:compile:mac:esbuild",
  "build:bun:compile:mac:rollup": "dinou build:bun:compile:mac:rollup",
  "build:bun:compile:mac:webpack": "dinou build:bun:compile:mac:webpack",
  "build:bun:compile:win": "dinou build:bun:compile:win",
  "build:bun:compile:win:esbuild": "dinou build:bun:compile:win:esbuild",
  "build:bun:compile:win:rollup": "dinou build:bun:compile:win:rollup",
  "build:bun:compile:win:webpack": "dinou build:bun:compile:win:webpack",
  "build:bun:pure": "dinou build:bun:pure",
  "build:bun:pure:esbuild": "dinou build:bun:pure:esbuild",
  "build:bun:pure:rollup": "dinou build:bun:pure:rollup",
  "build:bun:pure:webpack": "dinou build:bun:pure:webpack",
  "build:bun:pure:compile": "dinou build:bun:pure:compile",
  "build:bun:pure:compile:esbuild": "dinou build:bun:pure:compile:esbuild",
  "build:bun:pure:compile:rollup": "dinou build:bun:pure:compile:rollup",
  "build:bun:pure:compile:webpack": "dinou build:bun:pure:compile:webpack",
  "build:bun:pure:compile:linux": "dinou build:bun:pure:compile:linux",
  "build:bun:pure:compile:linux:esbuild": "dinou build:bun:pure:compile:linux:esbuild",
  "build:bun:pure:compile:linux:rollup": "dinou build:bun:pure:compile:linux:rollup",
  "build:bun:pure:compile:linux:webpack": "dinou build:bun:pure:compile:linux:webpack",
  "build:bun:pure:compile:linux_arm": "dinou build:bun:pure:compile:linux_arm",
  "build:bun:pure:compile:linux_arm:esbuild": "dinou build:bun:pure:compile:linux_arm:esbuild",
  "build:bun:pure:compile:linux_arm:rollup": "dinou build:bun:pure:compile:linux_arm:rollup",
  "build:bun:pure:compile:linux_arm:webpack": "dinou build:bun:pure:compile:linux_arm:webpack",
  "build:bun:pure:compile:mac": "dinou build:bun:pure:compile:mac",
  "build:bun:pure:compile:mac:esbuild": "dinou build:bun:pure:compile:mac:esbuild",
  "build:bun:pure:compile:mac:rollup": "dinou build:bun:pure:compile:mac:rollup",
  "build:bun:pure:compile:mac:webpack": "dinou build:bun:pure:compile:mac:webpack",
  "build:bun:pure:compile:win": "dinou build:bun:pure:compile:win",
  "build:bun:pure:compile:win:esbuild": "dinou build:bun:pure:compile:win:esbuild",
  "build:bun:pure:compile:win:rollup": "dinou build:bun:pure:compile:win:rollup",
  "build:bun:pure:compile:win:webpack": "dinou build:bun:pure:compile:win:webpack",
  "start:bun": "dinou start:bun",
  "start:bun:esbuild": "dinou start:bun:esbuild",
  "start:bun:rollup": "dinou start:bun:rollup",
  "start:bun:webpack": "dinou start:bun:webpack",
  "export-static": "dinou export-static",
  "export-static:esbuild": "dinou export-static:esbuild",
  "export-static:rollup": "dinou export-static:rollup",
  "export-static:webpack": "dinou export-static:webpack",
  "eject": "dinou eject"
}`}
                  </CodeBlock>
                </div>

                {/* Step 3.5 */}
                <div id="step-gitignore" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">5</span>
                    3.5. Configure .gitignore
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create a <code>.gitignore</code> file to ignore dependencies, environment variables, build outputs, and Dinou caches:
                  </p>
                  <CodeBlock language="text" containerClassName="w-full rounded-lg">
                    {`node_modules
.dinou
out
dist
.wrangler
.env`}
                  </CodeBlock>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <code>.dinou/</code> holds internal dev artifacts and runtime builds; <code>out/</code> contains pages generated by <code>export-static</code>; <code>dist/</code> stores compiled single-executable binaries (Deno / Bun); and <code>.wrangler/</code> stores local state when testing Cloudflare Workers.
                  </p>
                </div>

                {/* Step 3.6 */}
                <div id="step-dev-server" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">6</span>
                    3.6. Start Development Server
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Run the development server with the fast esbuild bundler (default), or choose Rollup or Webpack:
                  </p>
                  <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                    {`# Start with default ultra-fast esbuild
npm run dev

# Or start with Rollup or Webpack
npm run dev:rollup
npm run dev:webpack`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* Section 4: Building for Production & Runtimes */}
            <section id="production-runtimes" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Building for Production &amp; Runtimes
              </h2>
              <p>
                Dinou provides both <strong>bundler freedom</strong> (esbuild, Rollup, Webpack) and <strong>universal runtime deployment</strong> (Node.js, Cloudflare Workers, Deno, Bun, or Static SSG) from a single codebase in <code>src/</code> with zero code changes.
              </p>

              {/* 4.1 Bundler Selection */}
              <div id="bundler-selection" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-purple-500" />
                  4.1. Bundler Selection (esbuild, Rollup, Webpack)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By default, Dinou uses <strong>esbuild</strong> for lightning-fast production bundling. When enterprise plugins or custom loaders are required, you can compile with <strong>Rollup</strong> or <strong>Webpack</strong> with 100% feature parity:
                </p>
                <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                  {`# Build for production with your preferred bundler
npm run build                 # Default production build (esbuild)
npm run build:node:esbuild    # Explicit esbuild production build
npm run build:node:rollup     # Dedicated Rollup production build
npm run build:node:webpack    # Dedicated Webpack production build`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  For advanced compiler tuning, custom plugins, and SWC options, visit the <Link href="/docs/bundlers" className="text-blue-500 hover:underline font-medium">Bundlers Guide &rarr;</Link>
                </p>
              </div>

              {/* 4.2 Target Runtimes */}
              <div id="production-targets" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  4.2. Target Runtimes (Deploy Anywhere)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compile your application for any execution environment without altering component logic:
                </p>

                <div className="grid gap-3 sm:grid-cols-2 not-prose my-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      <Server className="h-4 w-4 text-blue-500" />
                      Node.js Server
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Production server with HTTP/2 and native streaming.</p>
                    <code className="text-xs font-mono block p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      npm run build:node &amp;&amp; npm run start:node
                    </code>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      <Cloud className="h-4 w-4 text-orange-500" />
                      Cloudflare Workers Edge
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Edge worker with 0ms cold starts and global distribution.</p>
                    <code className="text-xs font-mono block p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      npm run build:cloudflare &amp;&amp; npx wrangler dev
                    </code>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      <Cpu className="h-4 w-4 text-emerald-500" />
                      Standalone Binaries (Deno / Bun)
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Self-contained executable binary output directly to <code>dist/</code>.</p>
                    <code className="text-xs font-mono block p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      npm run build:deno:compile # or build:bun:compile
                    </code>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                      <Globe className="h-4 w-4 text-cyan-500" />
                      Static Site Export (SSG)
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Pre-rendered HTML and RSC payloads output to <code>out/</code>.</p>
                    <code className="text-xs font-mono block p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      npm run export-static
                    </code>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  For complete deployment guides, Docker setups, and cloud hosting instructions, see the <Link href="/docs/deployment" className="text-blue-500 hover:underline font-medium">Deployment Guide &rarr;</Link>
                </p>
              </div>
            </section>

            {/* Page Navigation Pager */}
            <DocsPager />
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
