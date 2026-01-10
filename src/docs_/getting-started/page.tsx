"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Lightbulb, Terminal, FolderTree } from "lucide-react";

const tocItems = [
  { id: "installation", title: "Installation", level: 2 },
  { id: "manual-setup", title: "Manual Setup", level: 2 },
  { id: "project-structure", title: "Project Structure", level: 2 },
  { id: "development-workflow", title: "Development Workflow", level: 2 },
];

export default function Page() {
  return (
    // FIX MOBILE: Layout flex-col en móvil, w-full y overflow hidden
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Getting Started
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Learn how to install, configure, and ship your first Dinou
              application using React 19.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="installation">
              <h2>Installation</h2>
              <p>
                The fastest way to get started with Dinou is using the CLI tool.
                It will scaffold a project configured with TypeScript and your
                bundler of choice.
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                npx create-dinou@latest my-app
              </CodeBlock>
              <p>
                Follow the interactive prompts to select your preferred bundler
                (Webpack, Rollup, or Esbuild) and style preferences.
              </p>
            </section>

            <section id="manual-setup">
              <h2>Manual Setup</h2>
              <p>
                If you prefer to understand the magic under the hood, you can
                set up a project manually:
              </p>

              <h3>1. Initialize Project</h3>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                npm init -y
              </CodeBlock>

              <h3>2. Install Dependencies</h3>
              <p>You only need React and the Dinou core package.</p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                npm i react react-dom dinou
              </CodeBlock>

              <h3>3. Configure Scripts</h3>
              <p>
                Add the following scripts to your <code>package.json</code>.
                These commands leverage the Dinou CLI to handle the complex
                build configurations for you.
              </p>
              <CodeBlock
                language="json"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`{
  "scripts": {
    "dev": "dinou dev",
    "build": "dinou build", 
    "start": "dinou start",
    "eject": "dinou eject"
  }
}`}
              </CodeBlock>

              <h3>4. Create your first Page</h3>
              <p>
                Dinou uses <strong>React Server Components (RSC)</strong> by
                default. Create an <code>src</code> folder and add a{" "}
                <code>page.tsx</code> file. Note that you can make it{" "}
                <code>async</code> to fetch data directly on the server.
              </p>
              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/page.tsx
export default async function Page() {
  // Server-side logic happens here!
  const date = new Date().toISOString();

  return (
    <main>
      <h1>Hello, Server World!</h1>
      <p>Server time: {date}</p>
    </main>
  );
}`}
              </CodeBlock>
            </section>

            <section id="project-structure">
              <h2>Project Structure</h2>
              <p>
                A typical Dinou project relies on file-system routing within the{" "}
                <code>src</code> directory.
              </p>

              <div className="not-prose bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-2 font-semibold text-foreground">
                  <FolderTree className="h-4 w-4" />
                  <span>File Structure</span>
                </div>
                <CodeBlock
                  language="text"
                  containerClassName="w-full overflow-hidden rounded-lg border-0 bg-transparent p-0"
                  showLineNumbers={false}
                >
                  {`my-app/
├── src/
│   ├── page.tsx          # Home page (/) - Server Component
│   ├── layout.tsx        # Root layout
│   ├── client-comp.tsx   # Client Component ("use client")
│   ├── about/
│   │   └── page.tsx      # About page (/about)
│   └── blog/
│       ├── [slug]/       # Dynamic Route parameter
│       │   └── page.tsx  # /blog/my-post
│       └── layout.tsx    # Nested layout for blog
├── package.json
└── tsconfig.json`}
                </CodeBlock>
              </div>

              <Alert className="not-prose mt-6">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Tip</AlertTitle>
                <AlertDescription>
                  Any file named <code>page.tsx</code> becomes a route. Files
                  named <code>layout.tsx</code> wrap the pages in their
                  directory and subdirectories.
                </AlertDescription>
              </Alert>
            </section>

            <section id="development-workflow">
              <h2>Development Workflow</h2>

              <div className="space-y-6">
                <div>
                  <h3>Development Server</h3>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    npm run dev
                  </CodeBlock>
                  <p>
                    Starts the development server with{" "}
                    <strong>Fast Refresh</strong> and streaming support. In this
                    mode, build artifacts are typically emitted to the{" "}
                    <code>public</code> folder (depending on your bundler
                    config) to serve assets quickly.
                  </p>
                </div>

                <div>
                  <h3>Production Build</h3>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    npm run build
                  </CodeBlock>
                  <p>
                    Creates an optimized production build. This process will:
                  </p>
                  <ul>
                    <li>Generate static HTML for SSG pages.</li>
                    <li>Bundle Client Components.</li>
                    <li>
                      Output server artifacts to the <code>dist3</code> (or{" "}
                      <code>dist</code>) folder.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3>Production Start</h3>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    npm start
                  </CodeBlock>
                  <p>
                    Boots up the production Node.js server to handle SSR
                    requests and serve static assets.
                  </p>
                </div>

                <div>
                  <h3>Ejecting</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">
                      Advanced
                    </span>
                  </div>
                  <CodeBlock
                    language="bash"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
                    npm run eject
                  </CodeBlock>
                  <p>
                    If you need full control over the Webpack, Rollup, or
                    Esbuild configuration, run this command. It will copy all
                    configuration files (like <code>webpack.config.js</code>)
                    into your project root and update your{" "}
                    <code>package.json</code> scripts.
                    <strong>This action is one-way.</strong>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* FIX MOBILE: Sidebar oculto en móvil, visible en XL */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
