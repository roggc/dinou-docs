"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "how-to-eject", title: "How to Eject", level: 2 },
];

export default function EjectingPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Ejecting</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to eject dinou for full control and customization.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                You can eject dinou with the command <code>npm run eject</code>{" "}
                (or <code>npx dinou eject</code>). This will copy the files
                defining dinou in the root folder of the project (grouped in a{" "}
                <code>dinou</code> folder). You will have full control and
                customization capabilities.
              </p>
            </section>

            <section id="how-to-eject">
              <h2>How to Eject</h2>
              <p>Run one of the following commands:</p>

              <CodeBlock language="bash">npm run eject</CodeBlock>

              <p>Or:</p>

              <CodeBlock language="bash">npx dinou eject</CodeBlock>

              <p>
                After ejecting, the dinou framework files will be copied to a{" "}
                <code>dinou</code> folder in your project root, giving you
                complete control over the build process and configuration.
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
