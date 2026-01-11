"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Image, Globe } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "favicons", title: "🎨 Favicons", level: 2 },
  { id: "asset-placement", title: "Asset Placement", level: 3 },
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
                Favicons
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Configure favicons and app icons for proper branding across
              browsers and devices in Dinou.
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
              <section id="asset-placement">
                <h3>Asset Placement</h3>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Image className="h-5 w-5 text-blue-500" />
                    <span>Directory Structure</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The <code>favicons</code> folder should be at the same level
                    as your <code>src</code> directory. Dinou automatically
                    serves files from the root at <code>/</code>.
                  </p>
                </div>
              </section>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
