"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Info } from "lucide-react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "client-components", title: "With Client Components", level: 2 },
  { id: "server-components", title: "With Server Components", level: 2 },
];

export default function StylesPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Styles & CSS</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to use Tailwind.css, .module.css, and .css styles in
              dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                dinou is ready to use Tailwind.css, <code>.module.css</code>,
                and <code>.css</code> styles. All styles will be generated in a
                file in webpack folder named <code>styles.css</code>. So you
                must include this in your <code>page.tsx</code> or{" "}
                <code>layout.tsx</code> file, in the <code>head</code> tag:
              </p>

              <CodeBlock language="html">{`<link href="/styles.css" rel="stylesheet"></link>`}</CodeBlock>

              <Alert className="not-prose mt-2">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Only styles imported under{" "}
                  <code>"use client"</code> directive will be detected by
                  Webpack and generated in a <code>styles.css</code> in webpack
                  folder.
                </AlertDescription>
              </Alert>
            </section>

            <section id="client-components">
              <h2>Example with Client Components</h2>

              <h3>Layout</h3>
              <CodeBlock language="typescript">
                {`// src/layout.tsx
"use client";

import type { ReactNode } from "react";
import "./global.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>dinou app</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link href="/styles.css" rel="stylesheet"></link>
      </head>
      <body>{children}</body>
    </html>
  );
}`}
              </CodeBlock>

              <h3>Global CSS</h3>
              <CodeBlock language="css">
                {`/* global.css */
@import "tailwindcss";

.test1 {
  background-color: purple;
}`}
              </CodeBlock>

              <h3>Page Component</h3>
              <CodeBlock language="typescript">
                {`// src/page.tsx
"use client";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={\`text-red-500 test1 \${styles.test2}\`}>hi world!</div>
  );
}`}
              </CodeBlock>

              <h3>Module CSS</h3>
              <CodeBlock language="css">
                {`/* src/page.module.css */
.test2 {
  text-decoration: underline;
}`}
              </CodeBlock>

              <h3>CSS Types</h3>
              <CodeBlock language="typescript">
                {`// src/css.d.ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}`}
              </CodeBlock>

              <p>
                The above will produce the text <code>hi world!</code> in red,
                underlined, and with a purple background color.
              </p>
            </section>

            <section id="server-components">
              <h2>Example with Server Components</h2>
              <p>
                If you want to use server components instead of client
                components, then you must create an additional file (e.g.{" "}
                <code>styles.ts</code>) where you use the{" "}
                <code>"use client"</code> directive and import all the{" "}
                <code>.css</code> files used in server components.
              </p>

              <h3>Server Layout</h3>
              <CodeBlock language="typescript">
                {`// src/layout.tsx
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>dinou app</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link href="/styles.css" rel="stylesheet"></link>
      </head>
      <body>{children}</body>
    </html>
  );
}`}
              </CodeBlock>

              <h3>Server Page</h3>
              <CodeBlock language="typescript">
                {`// src/page.tsx
import styles from "./page.module.css";

export default async function Page() {
  return (
    <div className={\`text-red-500 test1 \${styles.test2}\`}>hi world!</div>
  );
}`}
              </CodeBlock>

              <h3>Styles Import File</h3>
              <CodeBlock language="typescript">
                {`// src/styles.ts
"use client"; // <-- This is key.
import "./global.css";
import "./page.module.css";`}
              </CodeBlock>
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
