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
  Palette,
  Globe,
  Lock,
  FileCode,
  Image,
  FolderTree,
  Zap,
  Cpu,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "favicons", title: "🎨 Favicons", level: 2 },
  {
    id: "environment-variables",
    title: "🔐 Environment Variables (.env)",
    level: 2,
  },
  {
    id: "styles",
    title: "💅 Styles (Tailwind, CSS Modules, & Global CSS)",
    level: 2,
  },
  { id: "link-stylesheet", title: "1. Link the Stylesheet", level: 3 },
  {
    id: "full-example",
    title: "2. Full Example (Layout + Global CSS + Modules)",
    level: 3,
  },
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
                Favicons, Environment Variables & Styles
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Configure branding, manage secrets, and style your application
              with Tailwind, CSS Modules, and global CSS in Dinou.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="favicons">
              <h2>🎨 Favicons</h2>
              <p>
                Add a favicon and app icons to your Dinou application for proper
                branding across browsers and devices.
              </p>
              <ol>
                <li>
                  Generate assets using a tool like{" "}
                  <a href="https://favicon.io" target="_blank">
                    favicon.io
                  </a>
                  .
                </li>
                <li>Unzip the downloaded folder.</li>
                <li>
                  Rename it to <code>favicons</code> and place it in your
                  project <strong>root</strong>.
                </li>
                <li>
                  Update your root layout to include the references in the{" "}
                  <code>&lt;head&gt;</code> tag.
                </li>
              </ol>
              <CodeBlock
                language="tsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`"use client";

import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Dinou App</title>
        {/* Favicon references */}
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Don't forget your stylesheet! */}
        <link href="/styles.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}`}
              </CodeBlock>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Image className="h-5 w-5 text-blue-500" />
                  <span>Asset Placement</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The <code>favicons</code> folder should be at the same level
                  as your <code>src</code> directory. Dinou automatically serves
                  files from the root at <code>/</code>.
                </p>
              </div>
            </section>

            <section id="environment-variables">
              <h2>🔐 Environment Variables (`.env`)</h2>
              <p>
                Dinou automatically loads environment variables from a{" "}
                <code>.env</code> file for server-side code.
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`# .env
API_SECRET=my_secret_value
DB_HOST=localhost
DATABASE_URL=postgresql://user:pass@localhost:5432/db`}
              </CodeBlock>
              <Alert className="not-prose mt-4">
                <Lock className="h-4 w-4" />
                <AlertTitle>Security Best Practices</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>
                      Always add <code>.env</code> to your{" "}
                      <code>.gitignore</code>
                    </li>
                    <li>
                      Use different <code>.env</code> files for development,
                      staging, and production
                    </li>
                    <li>Never commit secrets or API keys to version control</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <Globe className="h-5 w-5" />
                      <span>Where They Work</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Available in Server Components, Server Functions, and
                    `getProps`. Not accessible in Client Components for
                    security.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Cpu className="h-5 w-5 text-purple-500" />
                      <span>Runtime Access</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Use `process.env.VARIABLE_NAME` in server-side code.
                    Variables are injected at runtime.
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="styles">
              <h2>💅 Styles (Tailwind, CSS Modules, & Global CSS)</h2>
              <p>
                Dinou supports multiple styling approaches out of the box:
                Tailwind CSS, CSS Modules, and global CSS. All styles are
                bundled into a single file served at <code>/styles.css</code>.
              </p>

              <section id="link-stylesheet">
                <h3>1. Link the Stylesheet</h3>
                <p>
                  You <strong>must</strong> manually link the bundled stylesheet
                  in your root layout or page.
                </p>
                <CodeBlock
                  language="html"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`<link href="/styles.css" rel="stylesheet" />`}
                </CodeBlock>
              </section>

              <section id="full-example">
                <h3>2. Full Example (Layout + Global CSS + Modules)</h3>
                <p>
                  Complete example showing all styling approaches working
                  together.
                </p>

                <h4>Root Layout (`src/layout.tsx`)</h4>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";

import type { ReactNode } from "react";
import "./globals.css"; // Import global styles

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Dinou App</title>
        <link href="/styles.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}`}
                </CodeBlock>

                <h4>Global CSS (`src/globals.css`)</h4>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`@import "tailwindcss";

/* Custom global styles */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.custom-bg {
  background-color: purple;
}

/* Tailwind directives */
@layer base {
  h1 {
    @apply text-4xl font-bold;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
}`}
                </CodeBlock>

                <h4>Page with CSS Modules (`src/page.tsx`)</h4>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={\`text-red-500 custom-bg \${styles.underlined}\`}>
      <h1>Hello World!</h1>
      <button className="btn-primary">Click me</button>
    </div>
  );
}`}
                </CodeBlock>

                <h4>CSS Module (`src/page.module.css`)</h4>
                <CodeBlock
                  language="css"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`.underlined {
  text-decoration: underline;
  border-bottom: 2px solid currentColor;
}`}
                </CodeBlock>

                <h4>TypeScript Declarations (`src/css.d.ts`)</h4>
                <p>For TypeScript support with CSS Modules:</p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}`}
                </CodeBlock>

                <div className="grid gap-6 md:grid-cols-3 not-prose my-6">
                  <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <Palette className="h-5 w-5" />
                        <span>Tailwind CSS</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Utility-first framework. Configure via{" "}
                      <code>tailwind.config.js</code>.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <FileCode className="h-5 w-5 text-purple-500" />
                        <span>CSS Modules</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Locally scoped CSS with <code>.module.css</code>{" "}
                      extension.
                    </CardContent>
                  </Card>
                  <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                        <Globe className="h-5 w-5" />
                        <span>Global CSS</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Traditional CSS files imported in components.
                    </CardContent>
                  </Card>
                </div>
              </section>
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
