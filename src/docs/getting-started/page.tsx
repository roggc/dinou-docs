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
  { id: "step-dev-server", title: "3.5. Start Development Server", level: 3 },
  { id: "step-gitignore", title: "3.6. Configure .gitignore", level: 3 },
  { id: "bundler-options", title: "4. Bundler Options & Parity", level: 2 },
  { id: "bundler-esbuild", title: "4.1. Esbuild (Default Engine)", level: 3 },
  { id: "bundler-rollup-webpack", title: "4.2. Rollup & Webpack Dev", level: 3 },
  { id: "production-targets", title: "5. Multi-Runtime Production", level: 2 },
  { id: "target-node", title: "5.1. Node.js Production Server", level: 3 },
  { id: "target-cloudflare", title: "5.2. Cloudflare Workers Edge", level: 3 },
  { id: "target-deno-bun", title: "5.3. Deno & Bun Compilation", level: 3 },
  { id: "target-static", title: "5.4. Static Site Generation (SSG)", level: 3 },
  { id: "next-steps", title: "6. Next Steps & Architecture", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
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
                Dinou v7 Setup
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                Installation &amp; Project Guide
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Getting Started with Dinou v7
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
                  {`# 1. Initialize a new Dinou v7 application
npx create-dinou-app@latest my-app

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
                    In Dinou v7, the development server runs in a unified in-process architecture with zero
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

# Install React 19 and Dinou v7
npm install react react-dom dinou

# Install TypeScript definitions for IDE intellisense
npm install -D @types/react @types/react-dom typescript`}
                  </CodeBlock>
                </div>

                {/* Step 3.2 */}
                <div id="step-structure" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">2</span>
                    3.2. Project Structure &amp; Files
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create the <code>src/</code> directory with a root page (<code>src/page.tsx</code>), optional server data fetching (<code>src/page_functions.ts</code>), and the root document layout (<code>src/layout.tsx</code>):
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        src/page.tsx (React Server Component)
                      </div>
                      <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                        {`// src/page.tsx - React Server Component (RSC)
export default function Page({ data }: { data?: { title: string; views: number } }) {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">
        {data?.title ?? "Hello from Dinou v7!"}
      </h1>
      <p className="text-muted-foreground">
        Rendered natively on the server with React 19 and zero client JavaScript overhead.
      </p>
      {data && (
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
          Dynamic views: <span className="font-mono font-bold">{data.views}</span>
        </div>
      )}
    </main>
  );
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        src/page_functions.ts (Optional Server Data &amp; ISR Caching)
                      </div>
                      <CodeBlock language="typescript" containerClassName="w-full rounded-lg">
                        {`// src/page_functions.ts - Server data contract
export async function getProps() {
  // Directly returns props to page.tsx - no wrapper object needed
  return {
    data: {
      title: "Welcome to Dinou v7",
      views: 1420,
    },
  };
}

// Optional: ISR revalidation window in seconds (direct number)
export const revalidate = 60;`}
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
├── src/
│   ├── page.tsx               # Root page component (RSC)
│   ├── page_functions.ts      # Server data fetching (getProps, revalidate)
│   ├── layout.tsx             # Root document layout (<html/head/body>)
│   ├── layout_functions.ts    # Layout-level caching & data (optional)
│   └── globals.css            # Styles / Tailwind CSS
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
                    Configure <code>tsconfig.json</code> and the ambient reference <code>dinou-env.d.ts</code>:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        tsconfig.json
                      </div>
                      <CodeBlock language="json" containerClassName="w-full rounded-lg">
                        {`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
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
    "dinou-env.d.ts"
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
                    Add the complete set of Dinou scripts to your <code>package.json</code> to control development, multi-runtime production builds (Node, Cloudflare, Deno, Bun), binary compilation, static exports, and ejecting:
                  </p>
                  <CodeBlock language="json" containerClassName="w-full rounded-lg">
                    {`{
  "scripts": {
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
  }
}`}
                  </CodeBlock>
                </div>

                {/* Step 3.5 */}
                <div id="step-dev-server" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">5</span>
                    3.5. Start Development Server
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

                {/* Step 3.6 */}
                <div id="step-gitignore" className="scroll-mt-20">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-mono">6</span>
                    3.6. Configure .gitignore
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
              </div>
            </section>

            {/* Section 4: Bundler Options & Parity */}
            <section id="bundler-options" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Bundler Options &amp; Parity
              </h2>
              <p>
                Dinou is built with a vendor-neutral bundler architecture. You can switch between Esbuild, Rollup, and Webpack with complete feature parity and zero application code changes.
              </p>

              <div id="bundler-esbuild" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  4.1. Esbuild (Default Engine)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Esbuild is the default bundler in Dinou. Written in Go, it delivers sub-second cold starts, instant in-memory bundling, and near-zero latency incremental compilation with React Fast Refresh:
                </p>
                <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                  {`npm run dev
# or explicitly:
npm run dev:esbuild`}
                </CodeBlock>
              </div>

              <div id="bundler-rollup-webpack" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-purple-500" />
                  4.2. Rollup &amp; Webpack Dev
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Need deep ecosystem plugin integration or enterprise Webpack configurations? Dinou features dedicated Rollup and Webpack dev engines with full in-memory caching and React Fast Refresh support:
                </p>
                <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                  {`# Run with Rollup
npm run dev:rollup

# Run with Webpack
npm run dev:webpack`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Every engine implements the identical React 19 RSC streaming contract, CSS module processing, and asset resolution rules.
                </p>
              </div>
            </section>

            {/* Section 5: Multi-Runtime Production Targets */}
            <section id="production-targets" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Multi-Runtime Production
              </h2>
              <p>
                Dinou v7 treats execution runtimes as first-class compilation targets. From a single codebase in <code>src/</code>, you can build optimized production bundles for Node.js, Cloudflare Workers, Deno, Bun, or fully static sites.
              </p>

              <div id="target-node" className="scroll-mt-20 mt-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Server className="h-5 w-5 text-blue-500" />
                  5.1. Node.js Production Server
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compile an optimized production server targeting Node.js with native HTTP/2 and streaming support:
                </p>
                <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                  {`# Build for Node.js
npm run build:node

# Start the production server
npm run start:node`}
                </CodeBlock>
              </div>

              <div id="target-cloudflare" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-orange-500" />
                  5.2. Cloudflare Workers Edge
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Build a lightweight edge worker that runs on Cloudflare Workers with zero cold starts and global edge distribution:
                </p>
                <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                  {`# Build for Cloudflare Workers
npm run build:cloudflare

# Preview locally with Wrangler
npx wrangler dev`}
                </CodeBlock>
              </div>

              <div id="target-deno-bun" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-emerald-500" />
                  5.3. Deno &amp; Bun Compilation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compile your full-stack Dinou app into a self-contained, single-file native executable with zero external dependencies:
                </p>
                <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                  {`# Compile standalone binary with Deno
npm run build:deno:compile

# Cross-compile for Linux, macOS, or Windows
npm run build:deno:compile:linux
npm run build:deno:compile:mac
npm run build:deno:compile:win

# Compile standalone binary with Bun
npm run build:bun:compile`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Binaries are output directly to <code>dist/</code>, ready for distribution, Docker containers, or zero-config deployment.
                </p>
              </div>

              <div id="target-static" className="scroll-mt-20 mt-8 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-500" />
                  5.4. Static Site Generation (SSG)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pre-render your entire application into static HTML and RSC payloads for hosting on GitHub Pages, AWS S3, or any static CDN:
                </p>
                <CodeBlock language="bash" containerClassName="w-full rounded-lg">
                  {`# Export fully static site
npm run export-static`}
                </CodeBlock>
                <p className="text-xs text-muted-foreground">
                  Output is written to <code>out/</code>, complete with static assets, pre-rendered HTML documents, and client JavaScript chunks.
                </p>
              </div>
            </section>

            {/* Section 6: Next Steps */}
            <section id="next-steps" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Next Steps &amp; Architecture
              </h2>
              <p>
                Now that your project is running, explore these core guides to master the Dinou v7 architecture:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 not-prose mt-6">
                <Card className="hover:border-blue-500/40 transition-colors group">
                  <Link href="/docs/routing" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <FolderPlus className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      Routing &amp; Layouts
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Learn file-system routing, nested layouts, route groups, and private folders.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-purple-500/40 transition-colors group">
                  <Link href="/docs/server-client-components" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                      Server vs Client Components
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Master React Server Components (RSC) and define explicit client boundaries.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-cyan-500/40 transition-colors group">
                  <Link href="/docs/bundlers" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                        <Boxes className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                      Triple-Bundler Freedom
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Switch between esbuild, Rollup, and Webpack with complete feature parity.
                    </p>
                  </Link>
                </Card>

                <Card className="hover:border-emerald-500/40 transition-colors group">
                  <Link href="/docs/internals" className="block h-full p-5">
                    <div className="flex items-start justify-between w-full mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <Layers className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <CardTitle className="text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
                      Architecture &amp; Internals
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Explore the Dual-Bundle engine, SSR streaming pipeline, and multi-runtime compilation.
                    </p>
                  </Link>
                </Card>
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
