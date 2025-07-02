"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Info } from "lucide-react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "layout-update", title: "Updating the Layout", level: 2 },
];

export default function FaviconsPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Favicons</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to add a favicon and related icons to your dinou app.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                To add a favicon to your app, you can use an online tool such as{" "}
                <a href="https://favicon.io" target="_blank">
                  favicon.io
                </a>{" "}
                to generate all the required icons.
              </p>

              <p>
                After downloading the icons, unzip the folder and rename it to{" "}
                <code>favicons</code>. Then, move this folder to the root of
                your project.
              </p>

              <Alert className="not-prose">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Make sure the favicons folder is placed at the root level.
                </AlertDescription>
              </Alert>
            </section>

            <section id="layout-update">
              <h2>Updating the Layout</h2>
              <p>
                Update your <code>layout.tsx</code> (or <code>page.tsx</code> if
                you're not using layouts) to include the favicon and related
                icons in the <code>&lt;head&gt;</code> tag:
              </p>

              <CodeBlock language="typescript">{`"use client";

import type { ReactNode } from "react";

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
      </head>
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>

              <p>
                Once you've added the icons and updated your layout, your web
                app will show the favicon across all pages and devices.
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
