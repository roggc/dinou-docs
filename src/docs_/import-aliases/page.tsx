"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "typescript", title: "TypeScript Configuration", level: 2 },
  { id: "javascript", title: "JavaScript Configuration", level: 2 },
];

export default function ImportAliasesPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Import Aliases</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to use import aliases like "@/..." in Dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Dinou is ready to support import alias, as{" "}
                <code>import some from "@/..."</code>. If you want to use them
                just define the options in <code>tsconfig.json</code>.
              </p>
            </section>

            <section id="typescript">
              <h2>TypeScript Configuration</h2>
              <CodeBlock language="json">
                {`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "allowJs": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}`}
              </CodeBlock>
            </section>

            <section id="javascript">
              <h2>JavaScript Configuration</h2>
              <CodeBlock language="json">
                {`// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "allowJs": true,
    "noEmit": true
  },
  "include": ["src"]
}`}
              </CodeBlock>
              <h3>Usage Example</h3>
              <CodeBlock language="typescript">
                {`// Instead of relative imports
import Component from "../../../components/Component";

// Use alias imports
import Component from "@/components/Component";`}
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
