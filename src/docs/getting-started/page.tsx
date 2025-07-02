"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Lightbulb } from "lucide-react";

const tocItems = [
  { id: "installation", title: "Installation", level: 2 },
  { id: "manual-setup", title: "Manual Setup", level: 2 },
  { id: "project-structure", title: "Project Structure", level: 2 },
  { id: "development", title: "Development", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Getting Started</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to install and set up your first dinou application.
            </p>
          </div>

          <div className="prose overflow-hidden max-w-full">
            <section id="installation">
              <h2>Installation</h2>
              <p>
                The fastest way to get started with dinou is using the create
                command:
              </p>
              <CodeBlock language="bash" containerClassName="w-full">
                npx create-dinou@latest my-app
              </CodeBlock>
              <p>
                This will create a new dinou application with all the necessary
                files and dependencies.
              </p>
            </section>

            <section id="manual-setup">
              <h2>Manual Setup</h2>
              <p>You can also set up a dinou project manually:</p>

              <h3>1. Create an npm project</h3>
              <CodeBlock language="bash" containerClassName="w-full">
                npm init -y
              </CodeBlock>

              <h3>2. Install dependencies</h3>
              <CodeBlock language="bash" containerClassName="w-full">
                npm i react react-dom dinou
              </CodeBlock>

              <h3>3. Create scripts in package.json (optional)</h3>
              <CodeBlock language="json" containerClassName="w-full">
                {`{
  "scripts": {
    "dev": "dinou dev",
    "build": "dinou build", 
    "start": "dinou start",
    "eject": "dinou eject"
  }
}`}
              </CodeBlock>

              <h3>4. Create your first page</h3>
              <p>
                Create an <code>src</code> folder with a <code>page.jsx</code>{" "}
                (or <code>.tsx</code>):
              </p>
              <CodeBlock language="typescript" containerClassName="w-full">
                {`"use client";

export default function Page() {
  return <>hi world!</>;
}`}
              </CodeBlock>

              <h3>5. Start development</h3>
              <CodeBlock language="bash" containerClassName="w-full">
                npm run dev
              </CodeBlock>
              <p>
                Wait for the logs of Webpack and the server and navigate to your
                browser to see the page in action (localhost:3000).
              </p>
            </section>

            <section id="project-structure">
              <h2>Project Structure</h2>
              <p>A typical dinou project structure looks like this:</p>
              <CodeBlock language="text" containerClassName="w-full">
                {`my-app/
├── src/
│   ├── page.tsx          # Home page (/)
│   ├── about/
│   │   └── page.tsx      # About page (/about)
│   └── blog/
│       ├── layout.tsx    # Blog layout
│       ├── page.tsx      # Blog index (/blog)
│       └── [id]/
│           └── page.tsx  # Dynamic blog post (/blog/[id])
├── package.json
└── tsconfig.json`}
              </CodeBlock>

              <Alert className="not-prose mt-2">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  Routes are defined by creating <code>page.tsx</code> files in
                  folders. The route "/" corresponds to the <code>src</code>{" "}
                  folder.
                </AlertDescription>
              </Alert>
            </section>

            <section id="development">
              <h2>Development</h2>
              <p>Once your project is set up, you can use these commands:</p>

              <h3>Development server</h3>
              <CodeBlock language="bash" containerClassName="w-full">
                npm run dev
              </CodeBlock>
              <p>Starts the development server with hot reloading.</p>
              <Alert className="not-prose mt-2">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  In development, webpack will emit his files in{" "}
                  <code>____public____</code> folder.
                </AlertDescription>
              </Alert>
              <Alert className="not-prose mt-2">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  In development, all pages are rendered dynamically.
                </AlertDescription>
              </Alert>

              <h3>Build for production</h3>
              <CodeBlock language="bash" containerClassName="w-full">
                npm run build
              </CodeBlock>
              <p>Creates an optimized production build.</p>
              <Alert className="not-prose mt-2">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  In production, webpack will emit his files in{" "}
                  <code>dist3</code> folder.
                </AlertDescription>
              </Alert>

              <h3>Start production server</h3>
              <CodeBlock language="bash" containerClassName="w-full">
                npm run start
              </CodeBlock>
              <p>Starts the production server (run after build).</p>
              <Alert className="not-prose mt-2">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  At this point, all SSG pages will be generated.
                </AlertDescription>
              </Alert>

              <h3>Eject configuration</h3>
              <CodeBlock language="bash" containerClassName="w-full">
                npm run eject
              </CodeBlock>
              <p>
                Copies dinou's configuration files to your project for full
                customization.
              </p>
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
